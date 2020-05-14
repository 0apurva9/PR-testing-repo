import React from "react";
import styles from "./CustomerQueryPopUp.css";
import PropTypes from "prop-types";
import Button from "../../general/components/Button.js";
import Icon from "../../xelpmoc-core/Icon";
import orderSuccess from "../components/img/orderSuccess.svg";
import { MY_ACCOUNT_PAGE } from "../../lib/constants";
export default class CustomerQueryPopUp extends React.Component {
  constructor() {
    super();
    this.clickedOnSubmitButton = false;
  }

  getDayNumberSuffix(d) {
    let newDate = new Date(d);
    let date = newDate.getDate();
    let month = newDate.getMonth();
    let year = newDate.getFullYear();
    let monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    switch (date) {
      case 1:
      case 21:
      case 31:
        return "" + date + "st " + monthNames[month] + " " + year;
      case 2:
      case 22:
        return "" + date + "nd " + monthNames[month] + " " + year;
      case 3:
      case 23:
        return "" + date + "rd " + monthNames[month] + " " + year;
      default:
        return "" + date + "th " + monthNames[month] + " " + year;
    }
  }
  // hoursToMeridiem = (hour, minute) => {
  //   //const min = minute === 0 ? "00" : minute.toString();
  //   if (minute !== 0) {
  //     hour += 1;
  //   }
  //   if (hour > 12) {
  //     return `${hour - 12}:00 PM`;
  //   }
  //   if (hour === 0) {
  //     return `${12}:00 AM`;
  //   }
  //   if (hour === 12) {
  //     return `${12}:00 PM`;
  //   }
  //   if (hour < 12) {
  //     return `${hour}:00 AM`;
  //   }
  // };

  submit() {
    this.clickedOnSubmitButton = true;
    this.props.history.push(MY_ACCOUNT_PAGE);
  }
  componentWillUnmount() {
    if (!this.clickedOnSubmitButton) {
      this.props.history.push(MY_ACCOUNT_PAGE);
    }
  }
  render() {
    let { tat, issueCategory, ticketID, issue, emailId } = this.props;
    let today = new Date();
    let extraDays = !isNaN(parseInt(tat)) ? Math.round(parseInt(tat) / 24) : 0;
    let queryDate = new Date();
    let displayDate = this.getDayNumberSuffix(
      queryDate.setDate(today.getDate() + extraDays)
    );
    // Hiding time as per SSQ-114
    // let displayTime = this.hoursToMeridiem(
    //   queryDate.getHours(),
    //   queryDate.getMinutes()
    // );

    return (
      <div className={styles.base}>
        <div className={styles.headerTextWithIcon}>
          <Icon image={orderSuccess} size={38} />
          <div className={styles.headerText}>
            Your Query is Submitted Successfully
          </div>
        </div>
        <div className={(styles.subText, styles.blackBorderBottom)}>
          We have noted your concern and will update you by{" "}
          <div className={styles.colorRed}> {`${displayDate}`}</div>
        </div>
        <div className={styles.userDetails}>
          {/* <div className={styles.userDetailsHeaderWithText}>
            <div className={styles.userDetailsHeader}>Ticket ID</div>
            <div className={styles.userDetailsText}>{this.props.ticketID}</div>
          </div> */}
          {issueCategory && (
            <div className={styles.userDetailsHeaderWithText}>
              <div className={styles.userDetailsHeader}>Issue Category</div>
              <div className={styles.userDetailsText}>{issueCategory}</div>
            </div>
          )}
          {issue && (
            <div className={styles.userDetailsHeaderWithText}>
              <div className={styles.userDetailsHeader}>Issue</div>
              <div className={styles.userDetailsText}>{issue}</div>
            </div>
          )}
        </div>
        <div className={styles.submittedText}>
          <div className={styles.subText}>
            A summary of your query has been sent to your email ID
            <span className={styles.colorRed}> {emailId}</span>
          </div>
        </div>

        <div className={styles.buttonHolder}>
          <div className={styles.button}>
            <Button
              backgroundColor="#000"
              height={36}
              label={"DONE"}
              borderRadius={"4"}
              width={96}
              textStyle={{ color: "#fff", fontSize: 14, borderRadius: 4 }}
              onClick={() => this.submit()}
            />
          </div>
        </div>
      </div>
    );
  }
}
