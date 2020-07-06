import React from "react";
import {
  getWholeDayTimeFormat,
  getUTCDateMonthFormat
} from "../../lib/dateTimeFunction";
import styles from "./CliqCashExpiring.css";
import { RUPEE_SYMBOL } from "../../lib/constants.js";

class CliqCashExpiring extends React.Component {
  render() {
    let dateTimeFormat = getWholeDayTimeFormat(
      "",
      this.props.cliqCashExpiringDetails.expiryTime
    );
    let monthSortnameFormat = getUTCDateMonthFormat(
      this.props.cliqCashExpiringDetails.expiryDate,
      true,
      true,
      true,
      true
    );
    let isDateToday = false;
    let formatedDate = "";
    if (monthSortnameFormat.match(/\bToday|Tomorrow/g)) {
      isDateToday = true;
      formatedDate =
        dateTimeFormat.replace(",", " ") + ", " + monthSortnameFormat;
    } else {
      let splitDate = monthSortnameFormat.split(" ");
      formatedDate = splitDate[1] + " " + splitDate[0] + ", " + splitDate[3];
    }
    return (
      <div className={styles.cliqCashExpireBox}>
        <div className={styles.cliqCashExpire}>
          <span className={styles.cliqCashExpireBalance}>
            <span className={styles.rupee}>{RUPEE_SYMBOL}</span>
            {this.props.cliqCashExpiringDetails.value}
          </span>
          <span className={styles.cliqCashExpireText}>
            {" "}
            {isDateToday
              ? "CLiQ Cash is expiring at "
              : "CLiQ Cash will expire on"}{" "}
          </span>
          <span className={styles.cliqCashExpireDate}>{formatedDate}</span>
        </div>
      </div>
    );
  }
}

export default CliqCashExpiring;
