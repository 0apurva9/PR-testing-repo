import React from "react";
import styles from "./OrderPaymentMethod.css";
import PropTypes from "prop-types";
import UnderLinedButton from "../../general/components/UnderLinedButton";
import each from "lodash.foreach";
export default class OrderPaymentMethod extends React.Component {
  request() {
    if (this.props.request) {
      this.props.request();
    }
  }

  render() {
    console.log(this.props);
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
              <div className={styles.paymentMethod}>Payment Method</div>
            )}
            {this.props.isInvoiceAvailable &&
              isDelivered && (
                <div className={styles.requestHolder}>
                  <div
                    className={styles.requestWithUnderline}
                    onClick={() => this.request()}
                  >
                    <UnderLinedButton
                      label={this.props.underlineButtonLabel}
                      color={this.props.underlineButtonColour}
                    />
                  </div>
                </div>
              )}
          </div>
        )}
        {(this.props.paymentMethod || this.props.phoneNumber) && (
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
        )}
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
