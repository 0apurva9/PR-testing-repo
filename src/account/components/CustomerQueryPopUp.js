import React from "react";
import styles from "./CustomerQueryPopUp.css";
import PropTypes from "prop-types";
import Button from "../../general/components/Button.js";
import Icon from "../../xelpmoc-core/Icon";
import checkBlack from "../../general/components/img/checkBlack.svg";
import { MY_ACCOUNT_PAGE } from "../../lib/constants";
export default class CustomerQueryPopUp extends React.Component {
  submit() {
    this.props.history.push(MY_ACCOUNT_PAGE);
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
        <div className={styles.subText}>
          A summary of your query has been sent to your email ID
          {this.props.emailId} .We have noted your concern and will update you
          within 48 hours.
        </div>
        <div className={styles.userDetails}>
          <div className={styles.userDetailsHeaderWithText}>
            <div className={styles.userDetailsHeader}>Issue</div>
            <div className={styles.userDetailsText}>{this.props.issue}</div>
          </div>
          <div className={styles.userDetailsHeaderWithText}>
            <div className={styles.userDetailsHeader}>Sub-issue</div>
            <div className={styles.userDetailsText}>{this.props.subIssue}</div>
          </div>
          <div className={styles.userDetailsHeaderWithCommentText}>
            <div className={styles.userDetailsHeader}>Comment</div>
            <div className={styles.userDetailsText}>{this.props.comment}</div>
          </div>
        </div>
        <div className={styles.submittedText}>
          <div className={styles.userDetailsHeaderWithText}>
            <div className={styles.userDetailsHeader}>Submitted by:</div>
            <div className={styles.userDetailsText}>
              {this.props.name}, {this.props.mobileNumber}
            </div>
          </div>
        </div>
        <div className={styles.buttonHolder}>
          <div className={styles.button}>
            <Button
              backgroundColor="#000"
              height={50}
              label={"DONE"}
              width={150}
              textStyle={{ color: "#fff", fontSize: 14 }}
              onClick={() => this.submit()}
            />
          </div>
        </div>
      </div>
    );
  }
}
CustomerQueryPopUp.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  mobileNumber: PropTypes.string,
  generateOtp: PropTypes.func,
  onCancel: PropTypes.func
};
