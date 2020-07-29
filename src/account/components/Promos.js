import React, { Component } from "react";
import styles from "./Promos.css";
// import Received from "./img/utilized.svg";
import Expired from "./img/expired.svg";
import Expiring from "./img/expiring.svg";
import Paid from "./img/utilized.svg";
import format from "date-fns/format";
import PropTypes from "prop-types";
const dateFormat = "DD MMM YYYY";

export default class Promos extends Component {
  promo = (promoType, date, expiryDate, transactionStatus) => {
    if (promoType === "Expired" || transactionStatus == "CANCELLED") {
      return <img src={Expired} className={styles.rewardsTypeImg} />;
    } else if (promoType === "Paid") {
      return <img src={Paid} className={styles.rewardsTypeImg} />;
    } else if (promoType === "Expiring") {
      return <img src={Expiring} className={styles.rewardsTypeImg} />;
    } else if (promoType === "Received" && expiryDate < date) {
      return <img src={Expiring} className={styles.rewardsTypeImg} />;
    } else {
      return null;
    }
  };
  promoText = (promoType, time, expiringDate, date, transactionStatus) => {
    let dateTime = new Date().toISOString();
    if (promoType === "Paid") {
      return <p className={styles.rewardExpDate}>Utilised: {time}</p>;
    } else if (
      promoType === "Expired" ||
      Date.parse(dateTime) > Date.parse(expiringDate)
    ) {
      return <p className={styles.rewardExpDate}>Expired on: {time}</p>;
    } else if (promoType === "Expiring" || expiringDate < date) {
      return <p className={styles.rewardExpDate}>Expiring on: {time}</p>;
    } else if (transactionStatus == "CANCELLED" && expiringDate < 0) {
      return <p className={styles.rewardExpDate}> Cancelled: {time}</p>;
    } else return null;
  };

  render() {
    let promotype = this.props.item.transactionType;
    let time = format(this.props.item.transactionDate, dateFormat);

    let amount = this.props.item.amount.formattedValue;
    let transactionStatus = this.props.item.transactionStatus;
    let expiringDate = this.props.item.expiryDate;
    let redeemStartDate = Date.parse(this.props.item.redeemStartDate);
    let expirignDateFormatted = format(expiringDate, dateFormat);
    let date = new Date().getTime();
    let dateTime = new Date().toISOString();

    return (
      <React.Fragment>
        {" "}
        {promotype !== "Received" && (
          <div className={styles.promoContainer}>
            {this.promo(promotype, date, redeemStartDate, transactionStatus)}
            <p className={styles.rewardAmt}>{amount}</p>
            {this.promoText(
              promotype,
              time,
              redeemStartDate,
              date,
              transactionStatus
            )}
          </div>
        )}
        {promotype == "Received" &&
          redeemStartDate > date && (
            <div className={styles.availFromBlock}>
              <div className={styles.availTxtBlock}>
                <p className={styles.availFromtxt}>Available from</p>
                <p className={styles.availFromDate}>{time}</p>
              </div>
            </div>
          )}
        {promotype == "Received" &&
          redeemStartDate < date && (
            <div className={styles.promoContainer}>
              {this.promo(promotype, date, redeemStartDate, transactionStatus)}
              <p className={styles.rewardAmt}>{amount}</p>
              {this.promoText(
                promotype,
                time,
                redeemStartDate,
                date,
                transactionStatus
              )}
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
