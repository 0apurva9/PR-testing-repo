import React, { Component } from "react";
import styles from "./Promos.css";
// import Received from "./img/utilized.svg";
import ExpiredImg from "./img/expired.svg";
import ExpiringImg from "./img/expiring.svg";
import Paid from "./img/utilized.svg";
import format from "date-fns/format";
import PropTypes from "prop-types";
import { RECEIVED, PAID, EXPIRED, Expiring } from "../../lib/constants";
const dateFormat = "DD MMM YYYY";

export default class Promos extends Component {
  promo = (promoType, date, expiryDate, transactionStatus) => {
    if (promoType === "Expired" || transactionStatus == "CANCELLED") {
      return <img src={ExpiredImg} className={styles.rewardsTypeImg} />;
    } else if (promoType === "Paid") {
      return <img src={Paid} className={styles.rewardsTypeImg} />;
    } else if (promoType === Expiring) {
      return <img src={ExpiringImg} className={styles.rewardsTypeImg} />;
    } else if (promoType === RECEIVED && expiryDate < date) {
      return <img src={ExpiringImg} className={styles.rewardsTypeImg} />;
    } else {
      return null;
    }
  };
  promoText = item => {
    let today = new Date().getTime();

    let expiringDate = new Date(item.expiryDate).getTime();

    let transactionType = item.transactionType;
    let transactionStatus = item.transactionStatus;

    let time = format(item.transactionDate, dateFormat);
    let formattedExpriry = format(expiringDate, dateFormat);
    if (item.transactionType === "Paid") {
      return <p className={styles.rewardExpDate}>Utilised: {time}</p>;
    } else if (item.transactionType === "Expired" || expiringDate < today) {
      return <p className={styles.rewardExpDate}>Expired on: {time}</p>;
    } else if (item.transactionType === "Expiring") {
      return <p className={styles.rewardExpDate}>Expiring on: {time}</p>;
    } else if (transactionType == "Received" && expiringDate > today) {
      return (
        <p className={styles.rewardExpDate}>Expiring on: {formattedExpriry}</p>
      );
    } else if (transactionStatus == "CANCELLED" && expiringDate < 0) {
      return <p className={styles.rewardExpDate}> Cancelled: {time}</p>;
    } else return null;
  };

  render() {
    let promotype = this.props.item.transactionType;

    let amount = this.props.item.amount.formattedValue;
    let transactionStatus = this.props.item.transactionStatus;

    let redeemStartDate = Date.parse(this.props.item.redeemStartDate);

    let date = new Date().getTime();

    return (
      <React.Fragment>
        {" "}
        {promotype !== RECEIVED && (
          <div className={styles.promoContainer}>
            {this.promo(promotype, date, redeemStartDate, transactionStatus)}
            <p className={styles.rewardAmt}>{amount}</p>
            {this.promoText(this.props.item)}
          </div>
        )}
        {promotype == RECEIVED &&
          redeemStartDate > date && (
            <div className={styles.availFromBlock}>
              <div className={styles.availTxtBlock}>
                <p className={styles.availFromtxt}>Available from</p>
                <p className={styles.availFromDate}>{redeemStartDate}</p>
              </div>
            </div>
          )}
        {promotype == "Received" && (
          <div className={styles.promoContainer}>
            {this.promo(promotype, date, redeemStartDate, transactionStatus)}
            <p className={styles.rewardAmt}>{amount}</p>
            {this.promoText(this.props.item)}
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
