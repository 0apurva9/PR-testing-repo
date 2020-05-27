import React, { Component } from "react";
import styles from "./CliqCashPromos.css";
import {
  CLIQ_CASH,
  RUPEE_SYMBOL,
  LOGGED_IN_USER_DETAILS
} from "../../lib/constants.js";
import Promos from "./Promos.js";
import * as Cookie from "../../lib/Cookie";
import DesktopOnly from "../../general/components/DesktopOnly";
import ProfileMenu from "./ProfileMenu";
import { default as MyAccountStyles } from "./MyAccountDesktop.css";
import UserProfile from "./UserProfile";

export default class CliqCashPromos extends Component {
  componentDidMount() {
    this.props.setHeaderText(CLIQ_CASH);
    if (this.props.getPromotionalCashStatement) {
      this.props.getPromotionalCashStatement();
    }
  }
  filteredOnlyPromos(promo) {
    if (
      promo.transactionType == "Received" ||
      promo.transactionType == "Paid" ||
      promo.transactionsType == "Utilized" ||
      promo.transactionType == "Expired" ||
      promo.transactionType == "Expired/Paid"
    ) {
      return promo;
    }
  }
  render() {
    let userData;
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);

    if (userDetails) {
      userData = JSON.parse(userDetails);
    }
    if (this.props.loading) {
      this.props.showSecondaryLoader();
    } else {
      this.props.hideSecondaryLoader();
    }
    var items = [];

    let transactions =
      this.props.promotionalCashStatementDetails &&
      this.props.promotionalCashStatementDetails.transactions;
    transactions &&
      transactions.forEach(transaction => items.push(transaction.items));

    let newTransactions = [].concat.apply([], items);
    let realItems =
      newTransactions && newTransactions.filter(this.filteredOnlyPromos);

    let promotionalAmount =
      this.props.promotionalCashStatementDetails &&
      this.props.promotionalCashStatementDetails.promotionalAmount
        ? this.props.promotionalCashStatementDetails.promotionalAmount
        : 0;
    return (
      <div className={styles.base}>
        <div className={MyAccountStyles.holder}>
          <DesktopOnly>
            <div className={MyAccountStyles.profileMenu}>
              <ProfileMenu {...this.props} />
            </div>
            <div className={styles.cliqCashDetail}>
              <div className={styles.banner}>
                <div className={styles.promoCliqCashText}>Promo Cliq Cash</div>
                <div className={styles.amountText}>
                  <span
                    className={styles.amountSubset}
                  >{`${RUPEE_SYMBOL}`}</span>
                  {`${promotionalAmount}`}.
                  <span className={styles.amountSubset}>00</span>
                </div>
              </div>
              <div className={styles.boxContainer}>
                {realItems &&
                  realItems.map(item => {
                    return <Promos item={item} />;
                  })}
              </div>
            </div>
            <div className={MyAccountStyles.userProfile}>
              <UserProfile
                image={userData && userData.imageUrl}
                userLogin={userData && userData.userName}
                loginType={userData && userData.loginType}
                onClick={() => this.renderToAccountSetting()}
                firstName={
                  userData &&
                  userData.firstName &&
                  userData.firstName.trim().charAt(0)
                }
                heading={
                  userData && userData.firstName && `${userData.firstName} `
                }
                lastName={
                  userData && userData.lastName && `${userData.lastName}`
                }
                userAddress={this.props.userAddress}
              />
            </div>
          </DesktopOnly>
        </div>
      </div>
    );
  }
}
