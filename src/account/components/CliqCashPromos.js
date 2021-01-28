import React, { Component } from "react";
import styles from "./CliqCashPromos.css";
import {
  CLIQ_CASH,
  RUPEE_SYMBOL,
  LOGGED_IN_USER_DETAILS,
  LOGIN_PATH
} from "../../lib/constants.js";
import { Redirect } from "react-router-dom";
import Promos from "./Promos.js";
import * as Cookie from "../../lib/Cookie";
import DesktopOnly from "../../general/components/DesktopOnly";
import ProfileMenu from "./ProfileMenu";
import SecondaryLoader from "../../general/components/SecondaryLoader";
import { default as MyAccountStyles } from "./MyAccountDesktop.css";
import UserProfile from "./UserProfile";
import { getCustomerAccessToken } from "../../common/services/common.services";
import PropTypes from "prop-types";

const Loader = () => {
  return (
    <div>
      <SecondaryLoader />
    </div>
  );
};
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

  navigateToLogin() {
    const url = this.props.location.pathname;
    this.props.setUrlToRedirectToAfterAuth(url);
    return <Redirect to={LOGIN_PATH} />;
  }

  render() {
    let userData;
    let kycUnavailable = true;
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    if (!this.props.showKycVerification) {
      kycUnavailable = false;
    }
    const customerAccessToken = getCustomerAccessToken();
    if (!userDetails || !customerAccessToken) {
      return this.navigateToLogin();
    }
    if (userDetails) {
      userData = JSON.parse(userDetails);
    }
    if (this.props.loading) {
      this.props.showSecondaryLoader();
    } else {
      this.props.hideSecondaryLoader();
    }
    let items = [];

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
          .doubleValue
        : 0;
    if (!kycUnavailable && !this.props.promotionalCashStatementDetails) {
      return Loader();
    }
    if (kycUnavailable) {
      return (
        <div className={styles.base}>
          <div className={MyAccountStyles.holder}>
            <DesktopOnly>
              <div className={MyAccountStyles.profileMenu}>
                <ProfileMenu {...this.props} />
              </div>
              <div className={styles.cliqCashDetail}>
                <div className={styles.banner}>
                  <div className={styles.promoCliqCashText}>
                    Promo Cliq Cash
                  </div>
                  <div className={styles.amountText}>
                    <span
                      className={styles.amountSubset}
                    >{`${RUPEE_SYMBOL}`}</span>
                    <span className={styles.actualAmount}>
                      {`${String(promotionalAmount)}`}.
                    </span>
                    <span className={styles.amountSubset}>00</span>
                  </div>
                </div>
                <div className={styles.boxContainer}>
                  {realItems &&
                    realItems.map((item, index) => {
                      return <Promos item={item} key={`key${index}`} />;
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
    } else {
      return (
        <div className={styles.base}>
          <div className={MyAccountStyles.holder}>
            <DesktopOnly>
              <div className={MyAccountStyles.profileMenu}>
                <ProfileMenu {...this.props} />
              </div>
              <div className={styles.cliqCashDetail}>
                <div className={styles.banner}>
                  <div className={styles.promoCliqCashText}>
                    Promo Cliq Cash
                  </div>
                  <div className={styles.amountText}>
                    <span
                      className={styles.amountSubset}
                    >{`${RUPEE_SYMBOL}`}</span>
                    {`${String(promotionalAmount)}`}.
                    <span className={styles.amountSubset}>00</span>
                  </div>
                </div>
                <div className={styles.boxContainer}>
                  {realItems &&
                    realItems.map((item, index) => {
                      return <Promos item={item} key={`key${index}`} />;
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
}

CliqCashPromos.propsTypes = {
  transactions: PropTypes.object,
  promotionalCashStatementDetails: PropTypes.object.isRequired,
  promotionalAmount: PropTypes.object,
  setHeaderText: PropTypes.func,
  getPromotionalCashStatement: PropTypes.func,
  setUrlToRedirectToAfterAuth: PropTypes.func,
  showKycVerification: PropTypes.bool,
  loading: PropTypes.bool,
  hideSecondaryLoader: PropTypes.func,
  showSecondaryLoader: PropTypes.func,
  userAddress: PropTypes.object
};
