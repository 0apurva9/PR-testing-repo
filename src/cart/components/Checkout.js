import React from "react";
import PropTypes from "prop-types";
import styles from "./Checkout.css";
import Button from "../../general/components/Button.js";
import infoIcon from "./img/Info.svg";
import Icon from "../../xelpmoc-core/Icon";
import {
  RUPEE_SYMBOL,
  DEFAULT_PIN_CODE_LOCAL_STORAGE
} from "../../lib/constants.js";
const DISCLAIMER =
  "Safe and secure payments. Easy returns. 100% Authentic products.";
export default class Checkout extends React.Component {
  handleClick() {
    if (this.props.onCheckout) {
      this.props.onCheckout();
    }
  }
  handleShowDetail() {
    if (this.props.showHideDetails) {
      this.props.showHideDetails();
    }
  }

  handleFocusOnPinCode() {
    // we don't need to focus on input any more
    // we have to open user address bottom modal
    // document.getElementById("searchAndUpdateInput") &&
    //   document.getElementById("searchAndUpdateInput").focus();
    this.props.changePinCode();
  }

  render() {
    let classOffers = styles.informationAnswerHolder;
    if (this.props.offers) {
      classOffers = styles.apply;
    }
    const defaultPinCode =
      localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE) &&
      localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE) !== "undefined"
        ? localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE)
        : null;

    return (
      <React.Fragment>
        <div className={styles.base}>
          <div
            className={styles.totalPriceButtonHolder}
            style={{
              padding: this.props.padding
            }}
          >
            {!this.props.isOnCartPage && (
              <div className={styles.checkoutButtonHolder}>
                <Button
                  disabled={this.props.disabled}
                  type="primary"
                  backgroundColor="#ff1744"
                  height={40}
                  label={this.props.label}
                  width={120}
                  textStyle={{ color: "#FFF", fontSize: 14 }}
                  onClick={() => this.handleClick()}
                />
              </div>
            )}

            {this.props.isOnCartPage &&
              defaultPinCode && (
                <div className={styles.checkoutButtonHolder}>
                  <Button
                    disabled={this.props.disabled}
                    type="primary"
                    backgroundColor="#ff1744"
                    height={40}
                    label={this.props.label}
                    width={120}
                    textStyle={{
                      color: "#FFF",
                      fontSize: 14
                    }}
                    onClick={() => this.handleClick()}
                  />
                </div>
              )}
            {this.props.isOnCartPage &&
              !defaultPinCode && (
                <div className={styles.checkoutButtonHolder}>
                  <Button
                    type="primary"
                    backgroundColor="#ff1744"
                    height={40}
                    label={this.props.label}
                    width={120}
                    textStyle={{
                      color: "#FFF",
                      fontSize: 14
                    }}
                    onClick={() => this.handleFocusOnPinCode()}
                  />
                </div>
              )}

            <div className={styles.amountHolder}>
              <div className={styles.amount}>{this.props.amount}</div>
            </div>
            <div
              className={styles.viewPrice}
              onClick={() => {
                this.handleShowDetail();
              }}
            >
              View price details
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
Checkout.propTypes = {
  amount: PropTypes.string,
  bagTotal: PropTypes.string,
  tax: PropTypes.string,
  delivery: PropTypes.string,
  onCheckout: PropTypes.func,
  offers: PropTypes.string,
  payable: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  padding: PropTypes.string
};
Checkout.defaultProps = {
  label: "Continue",
  disabled: false,
  padding: "15px 125px 15px 15px"
};
