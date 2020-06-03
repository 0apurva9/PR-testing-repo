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
import { Link } from "react-router-dom";
import giftCardImg from "./img/gift_card.jpg";

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

  openPopUp = () => {
    if (
      this.props.redeemCliqVoucher &&
      this.props.checkBalanceDetails &&
      this.props.checkBalanceDetails.cardNumber &&
      this.props.checkBalanceDetails.cardPin
    ) {
      this.props.redeemCliqVoucher({
        cardNumber: this.props.checkBalanceDetails.cardNumber,
        pinNumber: this.props.checkBalanceDetails.cardPin
      });
    } else {
      const obj = {};
      obj.addCard = true;
      obj.btnLabel = "Add card";
      if (this.props && this.props.showCliqCashModule) {
        this.props.showCliqCashModule(obj);
      }
    }
  };

  render() {
    let cardNumber = "";
    let originalValue = 0;
    let expiryDate = "";
    let loading = false;
    if (this.props.checkBalanceDetails === null) {
      loading = true;
    } else {
      cardNumber = this.props.checkBalanceDetails.cardNumber;
      originalValue = this.props.checkBalanceDetails.amount.value;
      expiryDate = this.getExpiredDate(
        this.props.checkBalanceDetails.expiryDate
      );
    }
    let userData;
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);

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
              <div className={styles.cliqCashDetailWithHolderCheckBal}>
                <div className={styles.heading}>
                  <span className={styles.checkBalLeftText}>And it's here</span>
                  <span className={styles.checkBalRightText}>
                    <Link
                      to={`/my-account/cliq-cash`}
                      className={styles.checkBalRightTextLink}
                    >
                      Back to CLiQ Cash
                    </Link>
                  </span>
                </div>
                <div className={styles.cardImage}>
                  <img
                    src={giftCardImg}
                    alt=""
                    className={styles.cardImageImg}
                  />
                </div>
              </div>
              <ExpiringCard
                loading={loading}
                expiryDate={expiryDate}
                openPopUp={this.openPopUp}
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
  transactionDetails: PropTypes.array,
  showCliqCashModule: PropTypes.func,
  userAddress: PropTypes.object,
  redeemCliqVoucher: PropTypes.func
};
