import React from "react";
import styles from "./OrderPaymentMethod.css";
import PropTypes from "prop-types";
import {
  MY_ACCOUNT_PAGE,
  COSTUMER_ORDER_RELATED_QUERY_ROUTE,
  RETURN_TO_ADDRESS,
  RETURNS_PREFIX,
  RETURN_LANDING,
  ORDER_CODE,
  ORDER,
  MY_ACCOUNT
} from "../../lib/constants";
import {
  setDataLayer,
  ADOBE_HELP_SUPPORT_LINK_CLICKED
} from "../../lib/adobeUtils";
export default class OrderPaymentMethod extends React.Component {
  // request() {
  //   if (this.props.request) {
  //     this.props.request();
  //   }
  // }
  constructor(props) {
    super(props);
    this.state = { deliveryAddress: "" };
  }
  redirectToHelpPage() {
    // this.props.history.push(`${HELP_URL}`);
    setDataLayer(ADOBE_HELP_SUPPORT_LINK_CLICKED);
    this.props.history.push(
      `${MY_ACCOUNT_PAGE}${COSTUMER_ORDER_RELATED_QUERY_ROUTE}`
    );
  }
  onChangeAddress = () => {
    //this.props.history.push(`${MY_ACCOUNT_PAGE}/${this.props.orderId}${RETURN_TO_ADDRESS}`);
    this.props.history.push({
      pathname: `${MY_ACCOUNT}${ORDER}/?${ORDER_CODE}=${
        this.props.orderId
      }${RETURN_TO_ADDRESS}`,
      state: {
        urlAddress: window.location.href,
        orderId: this.props.orderId,
        authorizedRequest: true
      }
    });

    //let orderCode = this.props.location.pathname.split("/")[2];
    // let searchparam = window.location.search;
    // let orderCode = searchparam.split('=')[1];

    // this.props.history.push(`${RETURNS_PREFIX}/${orderCode}${RETURN_LANDING}${RETURN_TO_ADDRESS}`);
  };
  async componentDidMount() {
    let deliveryAddress = this.props && this.props.deliveryAddress;
    await this.setState({
      deliveryAddress:
        (this.props &&
          this.props.history &&
          this.props.history.location &&
          this.props.history.location.state &&
          this.props.history.location.state.address) ||
        deliveryAddress
    });
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
    let addressLine1 = this.props && this.props.deliveryAddress;
    // console.log("address from api", this.props)
    return (
      <div className={styles.base}>
        {(this.props.paymentMethod || this.props.isInvoiceAvailable) && (
          <div
            className={
              this.props.clickcollect != true
                ? styles.marginAddress
                : styles.removeMarginAddress
            }
          >
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
        {this.props.deliveryAddress &&
          this.props.clickcollect != true && (
            <React.Fragment>
              <React.Fragment>
                <div className={styles.deliveryAddressTitle}>
                  <span className={styles.ffsemibold}>Delivery Address:</span>
                </div>
                {this.props.isCDA ? (
                  <div
                    className={styles.helpSupport}
                    onClick={() => this.onChangeAddress()}
                  >
                    Change
                  </div>
                ) : (
                  ""
                )}
              </React.Fragment>

              {addressLine1 && (
                <div className={styles.deliveryAddress}>
                  <React.Fragment>
                    <span className={styles.addressLine}>
                      {addressLine1.addressLine1}
                    </span>
                    {/* <span className={styles.addressLine}>
                      {this.state.deliveryAddress.addressLine ||
                        this.state.deliveryAddress.addressLine1},{" "}
                    </span>
                    <span className={styles.addressLine}>
                      {this.state.deliveryAddress.landmark},{" "}
                    </span>
                    <span className={styles.addressLine}>
                      {this.state.deliveryAddress.town},{" "}
                    </span>
                    <span className={styles.addressLine}>
                      {this.state.deliveryAddress.state}
                    </span>
                    <span className={styles.addressLine}>
                      {this.state.deliveryAddress.postalcode}
                    </span> */}
                  </React.Fragment>
                </div>
              )}
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
