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
  promo = (promoType, date, expiryDate) => {
    if (promoType === EXPIRED) {
      return <img src={ExpiredImg} className={styles.rewardsTypeImg} />;
    } else if (promoType === PAID) {
      return <img src={Paid} className={styles.rewardsTypeImg} />;
    } else if (promoType === Expiring) {
      return <img src={ExpiringImg} className={styles.rewardsTypeImg} />;
    } else if (promoType === RECEIVED && expiryDate < date) {
      return <img src={ExpiringImg} className={styles.rewardsTypeImg} />;
    } else {
      return null;
    }
  };
  promoText = (promoType, time, expiringDate, date) => {
    let dateTime = new Date().toISOString();
    if (promoType === PAID) {
      return <p className={styles.rewardExpDate}>Utilised: {time}</p>;
    } else if (
      promoType === EXPIRED ||
      Date.parse(dateTime) > Date.parse(expiringDate)
    ) {
      return <p className={styles.rewardExpDate}>Expired on: {time}</p>;
    } else if (promoType === Expiring || expiringDate < date) {
      return <p className={styles.rewardExpDate}>Expiring on: {time}</p>;
    } else return null;
  };

  render() {
    let promotype = this.props.item.transactionType;
    let time = format(this.props.item.transactionDate, dateFormat);
    let amount = this.props.item.amount.formattedValue;
    let expiringDate = this.props.item.expiryDate;
    let redeemStartDate = Date.parse(this.props.item.redeemStartDate);
    let expirignDateFormatted = format(expiringDate, dateFormat);
    let date = new Date().getTime();
    let dateTime = new Date().toISOString();

    return (
      <React.Fragment>
        {" "}
        {promotype !== RECEIVED && (
          <div className={styles.promoContainer}>
            {this.promo(promotype)}
            <p className={styles.rewardAmt}>{amount}</p>
            {this.promoText(promotype, time)}
          </div>
        )}
        {promotype == RECEIVED && redeemStartDate > date && (
          <div className={styles.availFromBlock}>
            <div className={styles.availTxtBlock}>
              <p className={styles.availFromtxt}>Available from</p>
              <p className={styles.availFromDate}>{time}</p>
            </div>
          </div>
        )}
        {promotype == RECEIVED && redeemStartDate < date && (
          <div className={styles.promoContainer}>
            {this.promo(promotype, date, redeemStartDate)}
            <p className={styles.rewardAmt}>{amount}</p>
            {this.promoText(
              promotype,
              expirignDateFormatted,
              redeemStartDate,
              date
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
