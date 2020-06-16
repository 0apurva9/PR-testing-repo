import React from "react";
import styles from "./CustomerQueryPopUp.css";
import PropTypes from "prop-types";
import Button from "../../general/components/Button.js";
import Icon from "../../xelpmoc-core/Icon";
// import orderSuccess from "../components/img/orderSuccess.svg";
import raisedTicket from "../components/img/raisedTicket.svg";
import cancleSvg from "../components/img/cancleSvg.svg";
import raiseTicketDuplicate from "../components/img/raiseTicketDuplicate.svg";
import { MY_ACCOUNT_PAGE, HOME_ROUTER } from "../../lib/constants";
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
    this.props.history.push(HOME_ROUTER);
  }
  // duplicateTicket() {

  // }
  componentWillUnmount() {
    if (!this.clickedOnSubmitButton) {
      this.props.history.push(HOME_ROUTER);
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
    // Hiding time as per SSQ-114
    // let displayTime = this.hoursToMeridiem(
    //   queryDate.getHours(),
    //   queryDate.getMinutes()
    // );

    return (
      <div className={styles.base}>
        <div className={styles.closeModal} onClick={() => this.closeModal()}>
          <Icon image={cancleSvg} size={12}></Icon>
        </div>
        <div className={styles.headerText}>
          {isTicketDuplicate ? "Duplicate Ticket" : "Your Ticket Details"}
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
              A ticket has already been raised for the
              <br />
              same issue previously.
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
                Our team is working on priority to resolve the problem. We will
                get back to you by.
              </div>
              <div className={styles.expDateTime}>{`${displayDate}`}</div>
            </div>
            {/* <div className={styles.ticketIdBox}>
              <div className={styles.txt}>Your ticket reference number is</div>
              <div className={styles.ticketId}>{ticketID}</div>
            </div> */}
          </div>
        )}
        <div className={styles.buttonHolder}>
          <Button
            type="primary"
            backgroundColor="#da1c5c"
            height={40}
            borderRadius={6}
            label={"CONTINUE SHOPPING"}
            width={204}
            textStyle={{ color: "#FFF", fontSize: 14 }}
            // disabled={true}
            onClick={() => this.submit()}
          />
        </div>
      </div>
    );
  }
}
