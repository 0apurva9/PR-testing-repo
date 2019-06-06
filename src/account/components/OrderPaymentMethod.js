import React from "react";
import styles from "./OrderPaymentMethod.css";
import PropTypes from "prop-types";
import UnderLinedButton from "../../general/components/UnderLinedButton";
import { HELP_URL } from "../../lib/constants";
import each from "lodash.foreach";
export default class OrderPaymentMethod extends React.Component {
  // request() {
  //   if (this.props.request) {
  //     this.props.request();
  //   }
  // }
  redirectToHelpPage() {
    this.props.history.push(`${HELP_URL}`);
  }

  render() {
    // let isDelivered = false;
    // each(this.props.statusDisplay, (status, i) => {
    //   each(status.value.statusList, statusNew => {
    //     if (
    //       statusNew.responseCode === "DELIVERED" ||
    //       statusNew.responseCode === "ORDER_COLLECTED"
    //     ) {
    //       isDelivered = true;
    //     }
    //   });
    // });
    return (
      <div className={styles.base}>
        {(this.props.paymentMethod || this.props.isInvoiceAvailable) && (
          <div className={styles.paymentHolder}>
            {this.props.paymentMethod && (
              <div className={styles.paymentMethod}>
                <span className={styles.ffsemibold}>Payment Mode: </span>
                {this.props.paymentMethod && this.props.paymentMethod}
              </div>
            )}
        
          </div>
        )}
        {this.props.deliveryAddress && (
          <React.Fragment>
            <div className={styles.deliveryAddressTitle}>
              <span className={styles.ffsemibold}>Delivery Address:</span>
            </div>
            <div className={styles.deliveryAddress}>
              <React.Fragment>
                <span>{this.props.deliveryAddress.addressLine1},</span>
                <span>{this.props.deliveryAddress.landmark},</span>
                <span>{this.props.deliveryAddress.town},</span>
                <span>{this.props.deliveryAddress.state}</span>
                <span>{this.props.deliveryAddress.postalcode}</span>
              </React.Fragment>
            </div>
          </React.Fragment>
        )}
        <div
          onClick={() => this.redirectToHelpPage()}
          className={styles.helpSupport}
        >
          <span className={styles.ffsemibold}>Help & Support</span>{" "}
          <span className={styles.helpSupportLink} />
        </div>
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
  // underlineButtonLabel: PropTypes.string,
  // underlineButtonColour: PropTypes.string,
  phoneNumber: PropTypes.string
  //request: PropTypes.func
};
OrderPaymentMethod.defaultProps = {
  // underlineButtonLabel: "Request Invoice",
  // underlineButtonColour: "#181818",
  isInvoiceAvailable: false
};
