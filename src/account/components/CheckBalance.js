import React, { Component } from "react";
import { RouterPropTypes } from "../../general/router-prop-types";
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
import { LOGGED_IN_USER_DETAILS, SUCCESS } from "../../lib/constants";
import ExpiringCard from "./ExpiringCard";
import PropTypes, { string, number } from "prop-types";
import BackToCliqCashSection from "./BackToCliqCashSection";

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
        "Expiring on " +
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
        cardPin: this.props.checkBalanceDetails.cardPin
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

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      // this.state.redeemCliqVoucherCalled !== nextState.redeemCliqVoucherCalled &&
      nextProps.cliqCashVoucherDetailsStatus &&
      this.props.cliqCashVoucherDetailsStatus !==
        nextProps.cliqCashVoucherDetailsStatus &&
      nextProps.cliqCashVoucherDetailsStatus.toLowerCase() === SUCCESS
    ) {
      this.props.cliqCashSuccessModule({
        cliqCashVoucherDetails: nextProps.cliqCashVoucherDetails
      });
      this.setState({ redeemCliqVoucherCalled: true });
    } else if (nextProps.cliqCashVoucherDetailsStatus === "failure") {
      this.props.displayToast(nextProps.cliqCashVoucherDetailsError);
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
              <BackToCliqCashSection />
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
  cliqCashVoucherDetailsStatus:PropTypes.string,
  cliqCashSuccessModule:PropTypes.func,
  displayToast:PropTypes.func,
  checkBalanceDetails: PropTypes.shape({
    cardNumber: string,
    cardPin: string,
    expiryDate: string,
    amount: PropTypes.shape({
      value: number
    })
  }),
  showCliqCashModule: PropTypes.func.isRequired,
  userAddress: PropTypes.object,
  redeemCliqVoucher: PropTypes.func.isRequired,
  ...RouterPropTypes
};
