import React from "react";
import styles from "./OrderPaymentMethod.css";
import PropTypes from "prop-types";
import UnderLinedButton from "../../general/components/UnderLinedButton";
import {
  HELP_URL,
  MY_ACCOUNT_PAGE,
  COSTUMER_ORDER_RELATED_QUERY_ROUTE
} from "../../lib/constants";
import each from "lodash.foreach";
export default class OrderPaymentMethod extends React.Component {
  // request() {
  //   if (this.props.request) {
  //     this.props.request();
  //   }
  // }
  redirectToHelpPage() {
    // this.props.history.push(`${HELP_URL}`);
    this.props.history.push(
      `${MY_ACCOUNT_PAGE}${COSTUMER_ORDER_RELATED_QUERY_ROUTE}`
    );
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
          <div className={styles.marginAddress}>
            <div className={styles.paymentHolder}>
              {this.props.paymentMethod && (
                <div className={styles.paymentMethod}>
                  <span className={styles.ffsemibold}>Payment Mode: </span>
                  <span className={styles.paymentMethodMode}>
                    {this.props.paymentMethod && this.props.paymentMethod}
                  </span>
                </div>
              )}
            </div>
            <div
              className={styles.helpSupport}
              onClick={() => this.redirectToHelpPage()}
            >
              Help & Support
            </div>
          </div>
        )}
        {/* <div className={styles.payments} /> */}
        {this.props.deliveryAddress && (
          <React.Fragment>
            <React.Fragment>
              <div className={styles.deliveryAddressTitle}>
                <span className={styles.ffsemibold}>Delivery Address:</span>
              </div>
              {this.props.isCDA ? (
                <div className={styles.helpSupport}>Change</div>
              ) : (
                ""
              )}
            </React.Fragment>

            <div className={styles.deliveryAddress}>
              <React.Fragment>
                <span className={styles.addressLine}>
                  {this.props.deliveryAddress.addressLine1},
                </span>
                <span className={styles.addressLine}>
                  {this.props.deliveryAddress.landmark},
                </span>
                <span className={styles.addressLine}>
                  {this.props.deliveryAddress.town},
                </span>
                <span className={styles.addressLine}>
                  {this.props.deliveryAddress.state}
                </span>
                <span className={styles.addressLine}>
                  {this.props.deliveryAddress.postalcode}
                </span>
              </React.Fragment>
            </div>
          </React.Fragment>
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
