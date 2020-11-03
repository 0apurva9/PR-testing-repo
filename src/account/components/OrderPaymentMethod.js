import React from "react";
import styles from "./OrderPaymentMethod.css";
import PropTypes from "prop-types";
import {
  MY_ACCOUNT_PAGE,
  COSTUMER_CLIQ_CARE_ROUTE,
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
import UnderLinedButton from "../../general/components/UnderLinedButton";
import each from "lodash.foreach";
import { HELP_URL } from "../../lib/constants";

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
    const orderCode = this.props.orderDetails.orderId;
    const transactionId = this.props.orderDetails.products[0].transactionId;
    // this.props.history.push(`${HELP_URL}`);
    // this.props.history.push({
    //   pathname: `${MY_ACCOUNT_PAGE}${COSTUMER_CLIQ_CARE_ROUTE}`,
    //   state: {
    //     selectedOrderObj
    //   }
    // });

    // const selectedOrderObj = {
    //   orderCode,
    //   transactionId,
    //   orderDetails: this.props.orderDetails
    // };
    setDataLayer(ADOBE_HELP_SUPPORT_LINK_CLICKED);
    // this.props.history.push(`${HELP_URL}`);

    if (this.props.orderDetails) {
      if (
        this.props.orderDetails.products &&
        Array.isArray(this.props.orderDetails.products) &&
        this.props.orderDetails.products.length == 1 &&
        transactionId
      ) {
        const selectedOrderObj = {
          orderCode,
          transactionId,
          product: this.props.orderDetails.products[0]
        };
        this.props.history.push({
          pathname: `${MY_ACCOUNT_PAGE}${COSTUMER_CLIQ_CARE_ROUTE}`,
          state: {
            selectedOrderObj
          }
        });
      } else {
        this.props.history.push(
          `${MY_ACCOUNT_PAGE}${COSTUMER_CLIQ_CARE_ROUTE}`
        );
      }
    }
    // this.props.history.push({
    //   pathname: `${MY_ACCOUNT_PAGE}${COSTUMER_CLIQ_CARE_ROUTE}`,
    //   state: {
    //     selectedOrderObj
    //   }
    // });
    // this.props.history.push(
    //   `${MY_ACCOUNT_PAGE}${COSTUMER_ORDER_RELATED_QUERY_ROUTE}`
    // );
  }
  onChangeAddress = () => {
    //this.props.history.push(`${MY_ACCOUNT_PAGE}/${this.props.orderId}${RETURN_TO_ADDRESS}`);
    this.props.history.push({
      pathname: `${MY_ACCOUNT}${ORDER}/?${ORDER_CODE}=${this.props.orderId}${RETURN_TO_ADDRESS}`,
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
  redirectToHelp() {
    if (this.props.redirectToHelp) {
      this.props.redirectToHelp();
    }
  }

  render() {
    let addressLine1 = this.props && this.props.deliveryAddress;
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
        {this.props.deliveryAddress && this.props.clickcollect != true && (
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
                  {addressLine1.addressLine1 && (
                    <span className={styles.addressLine}>
                      {addressLine1.addressLine1},{" "}
                    </span>
                  )}
                  {/* {/* <span className={styles.addressLine}>
                      {this.state.deliveryAddress.addressLine ||
                        this.state.deliveryAddress.addressLine1},{" "}
                    </span>
                    <span className={styles.addressLine}>
                      {this.state.deliveryAddress.landmark},{" "}
                    </span> */}
                  {addressLine1.town && (
                    <span className={styles.addressLine}>
                      {addressLine1.town},{" "}
                    </span>
                  )}
                  {addressLine1.state && (
                    <span className={styles.addressLine}>
                      {addressLine1.state},{" "}
                    </span>
                  )}
                  {addressLine1.postalcode && (
                    <span className={styles.addressLine}>
                      {addressLine1.postalcode}
                    </span>
                  )}
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
  phoneNumber: PropTypes.string,
  clickcollect: PropTypes.bool,
  deliveryAddress: PropTypes.shape({
    addressLine1: PropTypes.string,
    addressType: PropTypes.string,
    country: PropTypes.string,
    defaultAddress: PropTypes.bool,
    firstName: PropTypes.string,
    id: PropTypes.string,
    lastName: PropTypes.string,
    phone: PropTypes.string,
    postalcode: PropTypes.string,
    shippingFlag: PropTypes.bool,
    state: PropTypes.string,
    town: PropTypes.string
  })
  //request: PropTypes.func
};
OrderPaymentMethod.defaultProps = {
  // underlineButtonLabel: "Request Invoice",
  // underlineButtonColour: "#181818",
  isInvoiceAvailable: false
};
