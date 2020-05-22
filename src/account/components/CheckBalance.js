import React, { Component } from "react";
import styles from "./CliqCashDesktop.css";
import { default as MyAccountStyles } from "./MyAccountDesktop.css";
import ProfileMenu from "./ProfileMenu";
import {
  getUTCDateMonthFormat,
  oridinalNumberDateFormat
} from "../../lib/dateTimeFunction";
import * as Cookie from "../../lib/Cookie";

import FaqAndTcBase from "./FaqAndTcBase";
import UserProfile from "./UserProfile";
import { LOGGED_IN_USER_DETAILS } from "../../lib/constants";
import ExpiringCard from "./ExpiringCard";
import PropTypes from "prop-types";

export default class CheckBalance extends Component {
  componentDidMount() {
    const obj = {};
    obj.isCheckBalance = true;
    obj.btnLabel = "Check Card Value";
    if (
      this.props.showCliqCashModule &&
      this.props.checkBalanceDetails === null
    ) {
      this.props.showCliqCashModule(obj);
    }
  }

  getExpiredDate(date) {
    const dateFormated = getUTCDateMonthFormat(date, false, true, true, true);
    if (dateFormated.match(/\bToday|Tomorrow/g)) {
      return "Expiring: " + dateFormated;
    } else {
      const oridinalDate = oridinalNumberDateFormat(dateFormated);
      const splitDate = oridinalDate.split(" ");
      return (
        "Expiring on: " +
        splitDate[0] +
        " of " +
        splitDate[1] +
        " " +
        splitDate[3]
      );
    }
  }

  render() {
    let cardNumber = "";
    let originalValue = 0;
    let expiryDate = "";
    let loading = false;
    if (this.props.checkBalanceDetails === null) {
      loading = true;
    } else {
      cardNumber = this.props.checkBalanceDetails.amount.cardNumber;
      originalValue = this.props.checkBalanceDetails.amount.value;
      expiryDate = this.getExpiredDate(
        this.props.checkBalanceDetails.expiryDate
      );
    }

    let totalBalance =
      this.props.cliqCashUserDetails &&
      this.props.cliqCashUserDetails.totalCliqCashBalance &&
      this.props.cliqCashUserDetails.totalCliqCashBalance.value &&
      this.props.cliqCashUserDetails.totalCliqCashBalance.value > 0
        ? parseFloat(
            Math.round(
              this.props.cliqCashUserDetails.totalCliqCashBalance.value * 100
            ) / 100
          )
            .toFixed(2)
            .toLocaleString("hi-IN")
        : "0.00";
    let userData;
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    let transactions = [];
    this.props.transactionDetails &&
      this.props.transactionDetails.map(data => {
        if (data.items) {
          return transactions.push(...data.items);
        }
      });
    if (userDetails) {
      userData = JSON.parse(userDetails);
    }

    return (
      <div className={styles.base}>
        <div className={MyAccountStyles.holder}>
          <div className={MyAccountStyles.profileMenu}>
            <ProfileMenu {...this.props} />
          </div>
          <div className={styles.cliqCashDetail}>
            <div>
              <div className={styles.cliqCashDetailWithHolder}>
                <div className={styles.cliqCashBalanceContainer}>
                  <div className={styles.cliqCashBalanceHeader}>
                    CLiQ Cash Wallet
                  </div>
                  <div className={styles.totalBalanceHolder}>
                    <div className={styles.totalBalance}>
                      <div className={styles.balanceHeader}>
                        Total Available Balance
                      </div>
                      <div className={styles.balance}>
                        <span className={styles.rupee}>₹</span>
                        {totalBalance}
                      </div>
                    </div>

                    <div className={styles.infoBase}>
                      <div className={styles.spacing} />
                      <div className={styles.info}>
                        A quick and convenient way for faster checkout and
                        refund.
                        <div
                          className={styles.knowMore}
                          onClick={this.cliqCashKnowMore}
                        >
                          Know More.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <ExpiringCard
                loading={loading}
                expiryDate={expiryDate}
                openPopUp={this.props.openPopUp}
                cardNumber={cardNumber}
                originalValue={originalValue}
              />
            </div>

            <div className={styles.faqAndTcHolder}>
              <FaqAndTcBase history={this.props.history} />
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
              lastName={userData && userData.lastName && `${userData.lastName}`}
              userAddress={this.props.userAddress}
            />
          </div>
        </div>
      </div>
    );
  }
}
CheckBalance.defaultProps = {
  isModal: true
};
CheckBalance.propTypes = {
  loading: PropTypes.bool,
  cardNumber: PropTypes.string,
  originalValue: PropTypes.number,
  expiryDate: PropTypes.string,
  cliqCashUserDetails: PropTypes.object,
  checkBalanceDetails: PropTypes.object,
  transactionDetails: PropTypes.array
};
