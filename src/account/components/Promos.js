import React, { Component } from "react";
import styles from "./Promos.css";
import Received from "./img/available_soon.svg";
import Expired from "./img/expired.svg";
import Expiring from "./img/expiring.svg";
import Paid from "./img/utilized.svg";
import format from "date-fns/format";
const dateFormat = "DD MMM YYYY";

export default class Promos extends Component {
  // EnumState({state}){
  //     return({PromoType[state]}
  // }
  promo = promotype => {
    let PromoType = {
      Received: "Received",
      Expired: "Expired",
      Paid: "Paid",
      Expiring: "Expiring"
    };
    // let img;
    switch (promotype) {
      // case PromoType.Received:
      //   return <img src={Received} className={styles.rewardsTypeImg} />;
      case PromoType.Expired:
        return <img src={Expired} className={styles.rewardsTypeImg} />;
      case PromoType.Paid:
        return <img src={Paid} className={styles.rewardsTypeImg} />;
      case PromoType.Expiring:
        return <img src={Expiring} className={styles.rewardsTypeImg} />;
    }
  };
  render() {
    let promotype = this.props.item.transactionType;

    console.log("this.props", this.props);
    let time = format(this.props.item.transactionDate, dateFormat);
    return (
      <React.Fragment>
        {" "}
        {promotype === "Paid" && (
          <div className={styles.promoContainer}>
            {this.promo(promotype)}
            <p className={styles.rewardAmt}>₹250.00</p>
            <p className={styles.rewardExpDate}>Utilised: {time}</p>
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
