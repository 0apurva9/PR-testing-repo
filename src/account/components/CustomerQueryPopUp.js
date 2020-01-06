import React from "react";
import styles from "./CustomerQueryPopUp.css";
import PropTypes from "prop-types";
import Button from "../../general/components/Button.js";
import Icon from "../../xelpmoc-core/Icon";
import checkBlack from "../../general/components/img/checkBlack.svg";
import { MY_ACCOUNT_PAGE } from "../../lib/constants";
export default class CustomerQueryPopUp extends React.Component {
  constructor() {
    super();
    this.clickedOnSubmitButton = false;
  }
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
    return (
      <div className={styles.base}>
        <div className={styles.headerTextWithIcon}>
          <div className={styles.headerText}>
            Your Query is Submitted Successfully
          </div>
          <div className={styles.icon}>
            <Icon image={checkBlack} size={30} />
          </div>
        </div>
        <div className={(styles.subText, styles.blackBorderBottom)}>
          We have noted your concern and will update you before{" "}
          <span className={styles.colorRed}> 03:57 PM, 16th December 2019</span>
        </div>
        <div className={styles.userDetails}>
          {this.props.ticketId ||
            (true && (
              <div className={styles.userDetailsHeaderWithText}>
                <div className={styles.userDetailsHeader}>Ticket ID</div>
                <div className={styles.userDetailsText}>
                  {this.props.ticketId}
                </div>
              </div>
            ))}
          {this.props.issueCategory ||
            (true && (
              <div className={styles.userDetailsHeaderWithText}>
                <div className={styles.userDetailsHeader}>Issue Category</div>
                <div className={styles.userDetailsText}>
                  {this.props.issueCategory}
                </div>
              </div>
            ))}
          {this.props.issue ||
            (true && (
              <div className={styles.userDetailsHeaderWithText}>
                <div className={styles.userDetailsHeader}>Issue</div>
                <div className={styles.userDetailsText}>{this.props.issue}</div>
              </div>
            ))}
        </div>
        <div className={styles.submittedText}>
          <div className={styles.subText}>
            A summary of your query has been sent to your email ID<span
              className={styles.colorRed}
            >
              {" "}
              {this.props.emailId}
            </span>
          </div>
        </div>

        <div className={styles.buttonHolder}>
          <div className={styles.button}>
            <Button
              backgroundColor="#000"
              height={36}
              label={"DONE"}
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
