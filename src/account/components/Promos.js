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
  promo = promoType => {
    if (promoType === "Expired") {
      return <img src={Expired} className={styles.rewardsTypeImg} />;
    } else if (promoType === "Paid") {
      return <img src={Paid} className={styles.rewardsTypeImg} />;
    } else if (promoType === "Expiring") {
      return <img src={Expiring} className={styles.rewardsTypeImg} />;
    } else {
      return null;
    }
  };
  promoText = (promoType, time) => {
    if (promoType === "Paid") {
      return <p className={styles.rewardExpDate}>Utilised: {time}</p>;
    } else if (promoType === "Expired") {
      return <p className={styles.rewardExpDate}>Expired: {time}</p>;
    } else if (promoType === "Expiring") {
      return <p className={styles.rewardExpDate}>Expiring: {time}</p>;
    } else return null;
  };

  render() {
    let promotype = this.props.item.transactionType;
    let time = format(this.props.item.transactionDate, dateFormat);
    let amount = this.props.item.amount.formattedValue;
    return (
      <React.Fragment>
        {" "}
        {promotype !== "Received" && (
          <div className={styles.promoContainer}>
            {this.promo(promotype)}
            <p className={styles.rewardAmt}>{amount}</p>
            {this.promoText(promotype, time)}
          </div>
        )}
        {promotype == "Received" && (
          <div className={styles.availFromBlock}>
            <div className={styles.availTxtBlock}>
              <p className={styles.availFromtxt}>Available from</p>
              <p className={styles.availFromDate}>{time}</p>
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
  formattedValue: PropTypes.string
};
