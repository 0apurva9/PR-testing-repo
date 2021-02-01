import React from "react";
import { RouterPropTypes } from "../../general/router-prop-types";
import styles from "./CustomerQueryPopUp.css";
import PropTypes from "prop-types";

import Button from "../../general/components/Button.js";
import Icon from "../../xelpmoc-core/Icon";
import format from "date-fns/format";
import raisedTicket from "../components/img/raisedTicket.svg";
import cancleSvg from "../components/img/cancleSvg.svg";
import raiseTicketDuplicate from "../components/img/raiseTicketDuplicate.svg";
import { HOME_ROUTER } from "../../lib/constants";
const DATE_FORMAT = "Do MMMM";
export default class CustomerQueryPopUp extends React.Component {
  constructor() {
    super();
    this.clickedOnSubmitButton = false;
  }

  submit() {
    this.clickedOnSubmitButton = true;
    this.props.history.push(HOME_ROUTER);
  }

  componentWillUnmount() {
    if (!this.clickedOnSubmitButton) {
      this.props.history.push(HOME_ROUTER);
    }
  }

  closeModal() {
    this.props.closeModal();
  }

  render() {
    let { sla, ticketId } = this.props;
    let isTicketDuplicate = false;
    if (ticketId == "duplicate") {
      isTicketDuplicate = true;
    }
    let formattedDate = "";
    if (sla) {
      let modifiedDate = new Date(
        sla.split(" ")[0].replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3")
      );
      formattedDate = modifiedDate ? format(modifiedDate, DATE_FORMAT) : "";
    }
    return (
      <div className={styles.base}>
        <div className={styles.closeModal} onClick={() => this.closeModal()}>
          <Icon image={cancleSvg} size={17} />
        </div>
        <div
          className={
            isTicketDuplicate ? styles.headerTextDuplicate : styles.headerText
          }
        >
          {isTicketDuplicate ? "Duplicate Ticket" : "Your Ticket Details"}
        </div>
        <div className={styles.image}>
          {isTicketDuplicate ? (
            <div className={styles.duplicateIcon}>
              <Icon image={raiseTicketDuplicate} width={232} height={160} />
            </div>
          ) : (
            <Icon image={raisedTicket} size={214} />
          )}
        </div>
        {isTicketDuplicate ? (
          <div className={styles.duplicate}>
            <div className={styles.duplicateTxt}>
              A ticket has already been raised for the
              <br />
              same issue previously.
            </div>
          </div>
        ) : (
          <div>
            <div className={styles.expTime}>
              <div className={styles.txt}>
                {" "}
                Our team is working on priority to resolve the problem. We will
                get back to you by.
              </div>
              <div className={styles.expDateTime}>{`${formattedDate}`}</div>
            </div>
            <div className={styles.ticketIdBox}>
              <div className={styles.txt}>Your ticket reference number is</div>
              <div className={styles.ticketId}>{ticketId}</div>
            </div>
          </div>
        )}
        <div
          className={[
            styles.buttonHolder,
            isTicketDuplicate ? styles.marginTop : null
          ].join(" ")}
        >
          <Button
            type="primary"
            backgroundColor="#da1c5c"
            height={40}
            borderRadius={6}
            label={"CONTINUE SHOPPING"}
            width={204}
            textStyle={{ color: "#FFF", fontSize: 14 }}
            onClick={() => this.submit()}
          />
        </div>
      </div>
    );
  }
}
CustomerQueryPopUp.propTypes = {
  ticketId: PropTypes.string,
  sla: PropTypes.string,
  closeModal:PropTypes.func,
  ...RouterPropTypes
};
