import React from "react";
import styles from "./CustomerQueryPopUp.css";
import PropTypes from "prop-types";
import Button from "../../general/components/Button.js";
import Icon from "../../xelpmoc-core/Icon";
// import orderSuccess from "../components/img/orderSuccess.svg";
import raisedTicket from "../components/img/raisedTicket.svg";
import cancleSvg from "../components/img/cancleSvg.svg";
import raiseTicketDuplicate from "../components/img/raiseTicketDuplicate.svg";
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
  duplicateTicket() {}
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
    const isTicketDuplicate = ticketID == "duplicate";
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
          <Icon image={cancleSvg} size={12}></Icon>
        </div>
        <div className={styles.headerText}>
          {isTicketDuplicate ? "Duplicate Ticket" : "Your Ticket Detials"}
        </div>
        <div className={styles.image}>
          {isTicketDuplicate ? (
            <div className={styles.duplicateIcon}>
              <Icon
                image={raiseTicketDuplicate}
                width={232}
                height={160}
              ></Icon>
            </div>
          ) : (
            <Icon image={raisedTicket} size={214}></Icon>
          )}
        </div>
        {isTicketDuplicate ? (
          <div className={styles.duplicate}>
            <div className={styles.duplicateTxt}>
              This looks like a duplicate of an existing ticket
              <br />
              for the same issue.
              {/* <span className={styles.ticketId}>Ticket ID:</span>{" "}
              <span className={styles.colorRed}>1285673980</span> */}
            </div>
            {/* <div className={styles.ticketIdBox}>
              <div className={styles.txt}>We will get back to you by </div>
              <div className={styles.expDateTime}>
                {`${displayTime}, ${displayDate}`}
              </div>
            </div> */}
          </div>
        ) : (
          <div>
            <div className={styles.expTime}>
              <div className={styles.txt}>
                {" "}
                Our team is working on priority to resolve it. We will get back
                to you within
              </div>
              <div className={styles.expDateTime}>
                {`${displayTime}, ${displayDate}`}
              </div>
            </div>
            <div className={styles.ticketIdBox}>
              <div className={styles.txt}>Your ticket reference number is</div>
              <div className={styles.ticketId}>{ticketID}</div>
            </div>
          </div>
        )}
        <div className={styles.buttonHolder}>
          <Button
            type="primary"
            backgroundColor="#da1c5c"
            height={40}
            borderRadius={6}
            label={isTicketDuplicate ? "Go to Lorem Ipsum" : "Ok"}
            width={isTicketDuplicate ? 204 : 165}
            textStyle={{ color: "#FFF", fontSize: 14 }}
            // disabled={true}
            onClick={() =>
              isTicketDuplicate ? this.duplicateTicket() : this.submit()
            }
          />
        </div>
      </div>
    );
  }
}
