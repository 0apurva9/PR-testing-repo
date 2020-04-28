import React from "react";
import styles from "./CustomerQueryPopUp.css";
import PropTypes from "prop-types";
import Button from "../../general/components/Button.js";
import Icon from "../../xelpmoc-core/Icon";
// import orderSuccess from "../components/img/orderSuccess.svg";
import raisedTicket from "../components/img/raisedTicket.svg";
import cancleSvg from "../components/img/cancleSvg.svg";
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
  hoursToMeridiem = (hour, minute) => {
    const min = minute === 0 ? "00" : minute.toString();
    if (hour > 12) {
      return `${hour - 12}:${min} PM`;
    }
    if (hour === 0) {
      return `${12}:${min} AM`;
    }
    if (hour === 12) {
      return `${12}:${min} PM`;
    }
    if (hour < 12) {
      return `${hour}:${min} AM`;
    }
  };

  submit() {
    this.clickedOnSubmitButton = true;
    this.props.history.push(MY_ACCOUNT_PAGE);
  }
  componentWillUnmount() {
    if (!this.clickedOnSubmitButton) {
      this.props.history.push(MY_ACCOUNT_PAGE);
    }
  }
  closeModal() {
    this.props.closeModal();
  }
  render() {
    let { tat, issueCategory, ticketID, issue, emailId } = this.props;
    let today = new Date();
    let extraDays = !isNaN(parseInt(tat)) ? Math.round(parseInt(tat) / 24) : 0;
    let queryDate = new Date();
    let displayDate = this.getDayNumberSuffix(
      queryDate.setDate(today.getDate() + extraDays)
    );
    let displayTime = this.hoursToMeridiem(
      queryDate.getHours(),
      queryDate.getMinutes()
    );

    return (
      <div className={styles.base}>
        <div className={styles.closeModal} onClick={() => this.closeModal()}>
          <Icon image={cancleSvg} size={20}></Icon>
        </div>
        <div className={styles.headerText}>Your Ticket Detials</div>
        <div className={styles.image}>
          <Icon image={raisedTicket} size={214}></Icon>
        </div>
        <div className={styles.expTime}>
          <div className={styles.txt}>
            {" "}
            Our team is working on priority to resolve it. We will get back to
            you within
          </div>
          <div className={styles.expDateTime}>
            {`${displayTime}, ${displayDate}`}
          </div>
        </div>
        <div className={styles.ticketIdBox}>
          <div className={styles.txt}>Your ticket reference number is</div>
          <div className={styles.ticketId}>142364413</div>
        </div>
        {/* <div className={(styles.subText, styles.blackBorderBottom)}>
          We have noted your concern and will update you before{" "}
          <div className={styles.colorRed}>
            {" "}
            {`${displayTime}, ${displayDate}`}
          </div>
        </div> */}

        {/* <div className={styles.userDetails}> */}
        {/* <div className={styles.userDetailsHeaderWithText}>
            <div className={styles.userDetailsHeader}>Ticket ID</div>
            <div className={styles.userDetailsText}>{this.props.ticketID}</div>
          </div> */}
        {/* {this.props.issueCategory && (
            <div className={styles.userDetailsHeaderWithText}>
              <div className={styles.userDetailsHeader}>Issue Category</div>
              <div className={styles.userDetailsText}>
                {this.props.issueCategory}
              </div>
            </div>
          )}
          {this.props.issue && (
            <div className={styles.userDetailsHeaderWithText}>
              <div className={styles.userDetailsHeader}>Issue</div>
              <div className={styles.userDetailsText}>{this.props.issue}</div>
            </div>
          )}
        </div> */}
        {/* <div className={styles.submittedText}>
          <div className={styles.subText}>
            A summary of your query has been sent to your email ID
            <span className={styles.colorRed}> {this.props.emailId}</span>
          </div>
        </div> */}

        <div className={styles.buttonHolder}>
          <Button
            type="primary"
            backgroundColor="#da1c5c"
            height={40}
            label={"Ok"}
            width={165}
            textStyle={{ color: "#FFF", fontSize: 14 }}
            // disabled={true}
            onClick={() => this.submit()}
          />
        </div>
      </div>
    );
  }
}
