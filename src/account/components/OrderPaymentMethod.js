import React from "react";
import styles from "./OrderPaymentMethod.css";
import PropTypes from "prop-types";
import UnderLinedButton from "../../general/components/UnderLinedButton";
import each from "lodash.foreach";
import { HELP_URL } from "../../lib/constants";

export default class OrderPaymentMethod extends React.Component {
  request() {
    if (this.props.request) {
      this.props.request();
    }
  }
  redirectToHelp() {
    if (this.props.redirectToHelp) {
      this.props.redirectToHelp();
    }
  }
  render() {
    let isDelivered = false;
    each(this.props.statusDisplay, (status, i) => {
      each(status.value.statusList, statusNew => {
        if (statusNew.responseCode === "DELIVERED") {
          isDelivered = true;
        }
      });
    });
    return (
      <div className={styles.base}>
        {(this.props.paymentMethod || this.props.isInvoiceAvailable) && (
          <div className={styles.paymentHolder}>
            {this.props.paymentMethod && (
              <div className={styles.paymentMethod}>
                Payment Mode:{this.props &&
                  this.props.paymentMethod && (
                    <span className={styles.cashText}>
                      {" "}
                      {this.props.paymentMethod}
                    </span>
                  )}
              </div>
            )}
            <div
              className={styles.helpHolder}
              onClick={() => this.redirectToHelp()}
            >
              Help & Support
            </div>
          </div>
        )}
        {/* {(this.props.paymentMethod || this.props.phoneNumber) && (
          <div className={styles.cashAndMobileHolder}>
            {this.props.paymentMethod && (
              <div className={styles.cashText}>{this.props.paymentMethod}</div>
            )}

            {this.props.phoneNumber && (
              <div className={styles.mobileNumber}>
                {`Ph: +${this.props.phoneNumber}`}
              </div>
            )}
          </div>
        )} */}
      </div>
    );
  }
}
OrderPaymentMethod.propTypes = {
  underlineButtonLabel: PropTypes.string,
  underlineButtonColour: PropTypes.string,
  phoneNumber: PropTypes.string,
  request: PropTypes.func
};
OrderPaymentMethod.defaultProps = {
  underlineButtonLabel: "Request Invoice",
  underlineButtonColour: "#181818",
  isInvoiceAvailable: false
};
