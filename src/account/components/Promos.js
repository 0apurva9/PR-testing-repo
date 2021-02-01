import React, { Component } from "react";
import styles from "./Promos.css";
// import Received from "./img/utilized.svg";
import Expired from "./img/expired.svg";
import Expiring from "./img/expiring.svg";
import Paid from "./img/utilized.svg";
import format from "date-fns/format";
import PropTypes from "prop-types";
import { RECEIVED } from "../../lib/constants";
const dateFormat = "DD MMM YYYY";

export default class Promos extends Component {
  promo = item => {
    let transactionType = item.transactionType;
    if (transactionType == "Expired" || transactionType == "CANCELLED") {
      return <img src={Expired} className={styles.rewardsTypeImg} />;
    } else if (transactionType == "Paid") {
      return <img src={Paid} className={styles.rewardsTypeImg} />;
    } else if (transactionType == "Expiring") {
      return <img src={Expiring} className={styles.rewardsTypeImg} />;
    } else if (
      transactionType == "Received" ||
      transactionType == "RECEIVED REFUND" ||
      transactionType == "ADDED"
    ) {
      return <img src={Expiring} className={styles.rewardsTypeImg} />;
    } else {
      return null;
    }
  };

  promoText = item => {
    let today = new Date().getTime();
    let expiringDate = new Date(item.expiryDate).getTime();
    let transactionType = item.transactionType;
    let transactionStatus = item.transactionStatus;
    let transactionDateFormatted = format(item.transactionDate, dateFormat);
    let time = format(item.transactionDate, dateFormat);
    let formattedExpriry = format(expiringDate, dateFormat);
    if (item.transactionType === "Paid") {
      return <p className={styles.rewardExpDate}>Utilised: {time}</p>;
    } else if (item.transactionType === "Expired") {
      return <p className={styles.rewardExpDate}>Expired on: {time}</p>;
    } else if (item.transactionType === "Expiring") {
      return <p className={styles.rewardExpDate}>Expiring on: {time}</p>;
    } else if (transactionType == "Received" && expiringDate > today) {
      return (
        <p className={styles.rewardExpDate}>Expiring on: {formattedExpriry}</p>
      );
    } else if (transactionType == "Received" && expiringDate < today) {
      return (
        <p className={styles.rewardExpDate}>
          Recieved on: {transactionDateFormatted}
        </p>
      );
    } else if (transactionStatus == "CANCELLED") {
      return <p className={styles.rewardExpDate}> Cancelled: {time}</p>;
    } else return null;
  };

  render() {
    let promotype = this.props.item.transactionType;

    let amount = this.props.item.amount.formattedValue;

    let redeemStartDate = Date.parse(this.props.item.redeemStartDate);
    let formattedRedeemStartDate = format(
      this.props.item.redeemStartDate,
      dateFormat
    );
    let date = new Date().getTime();

    return (
      <React.Fragment>
        {" "}
        {promotype !== RECEIVED && (
          <div className={styles.promoContainer}>
            <div className={styles.promo}>
              {this.promo(this.props.item)}
              <p className={styles.rewardAmt}>{amount}</p>
              {this.promoText(this.props.item)}
            </div>
          </div>
        )}
        {promotype == RECEIVED &&
          redeemStartDate > date && (
            <div className={styles.availFromBlock}>
              <div className={styles.recievedPromo}>
                <div className={styles.availTxtBlock}>
                  <p className={styles.availFromtxt}>Available from</p>
                  <p className={styles.availFromDate}>
                    {formattedRedeemStartDate}
                  </p>
                </div>
              </div>
            </div>
          )}
        {promotype == RECEIVED &&
          redeemStartDate < date && (
            <div className={styles.promoContainer}>
              <div className={styles.promo}>
                {this.promo(this.props.item)}
                <p className={styles.rewardAmt}>{amount}</p>
                {this.promoText(this.props.item)}
              </div>
            </div>
          )}
      </React.Fragment>
    );
  }
}
Promos.propTypes = {
  transactionType: PropTypes.string,
  transactionDate: PropTypes.string,
  formattedValue: PropTypes.string,
  item: PropTypes.object
};
