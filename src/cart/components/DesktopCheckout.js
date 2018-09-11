import React from "react";
import {
  RUPEE_SYMBOL,
  DEFAULT_PIN_CODE_LOCAL_STORAGE
} from "../../lib/constants.js";
import PropTypes from "prop-types";
import Button from "../../general/components/Button.js";
import styles from "./DesktopCheckout.css";
export default class DesktopCheckout extends React.Component {
  handleClick() {
    if (this.props.onCheckout) {
      this.props.onCheckout();
    }
  }
  handleFocusOnPinCode() {
    this.props.changePinCode();
  }
  render() {
    const defaultPinCode =
      localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE) &&
      localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE) !== "undefined"
        ? localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE)
        : null;
    let totalSaving =
      this.props.bagTotal && this.props.payable
        ? Math.round(
            (parseFloat(this.props.bagTotal) - parseFloat(this.props.payable)) *
              100
          ) / 100
        : 0;
    return (
      <div className={styles.base}>
        <div className={styles.section}>
          {this.props.bagTotal && (
            <div className={styles.row}>
              <div className={styles.label}>Bag Total</div>
              <div className={styles.info}>
                {RUPEE_SYMBOL}
                {this.props.bagTotal}
              </div>
            </div>
          )}
          {this.props.totalDiscount && (
            <div className={styles.row}>
              <div className={styles.label}>Discount</div>
              <div className={styles.info}>
                {RUPEE_SYMBOL}
                {this.props.totalDiscount}
              </div>
            </div>
          )}
          {this.props.delivery && (
            <div className={styles.row}>
              <div className={styles.label}> Shipping fee</div>
              <div className={styles.info}>
                {RUPEE_SYMBOL}
                {this.props.delivery}
              </div>
            </div>
          )}
          {this.props.coupons && (
            <div className={styles.row}>
              <div className={styles.label}>Coupon</div>
              <div className={styles.info}>
                {RUPEE_SYMBOL}
                {this.props.coupons}
              </div>
            </div>
          )}
          {this.props.noCostEmiEligibility && (
            <div className={styles.row}>
              <div className={styles.label}>No Cost EMI Discount</div>
              <div className={styles.info}>
                {RUPEE_SYMBOL}
                {this.props.noCostEmiEligibility}
              </div>
            </div>
          )}
          {this.props.isCliqCashApplied && (
            <div className={styles.row}>
              <div className={styles.label}>Cliq Cash</div>
              <div className={styles.info}>
                {RUPEE_SYMBOL}
                {this.props.isCliqCashApplied}
              </div>
            </div>
          )}
          {totalSaving > 0 && (
            <div className={styles.row}>
              <div className={styles.label}>Total Savings</div>
              <div className={styles.infoHiglight}>
                {RUPEE_SYMBOL}
                {totalSaving}
              </div>
            </div>
          )}
        </div>
        <div
          className={
            this.props.onContinue
              ? styles.bottomSection
              : styles.bottomSectionCheckout
          }
        >
          <div className={styles.priceHeader}>
            {this.props.onContinue ? "Total" : "Final Amount"}
          </div>
          <div
            className={
              this.props.onContinue ? styles.price : styles.checkoutPrice
            }
          >
            {RUPEE_SYMBOL}
            {this.props.payable}
          </div>
          {this.props.onContinue && (
            <React.Fragment>
              {!this.props.isOnCartPage && (
                <div className={styles.button}>
                  <Button
                    disabled={this.props.disabled}
                    type="primary"
                    backgroundColor="#ff1744"
                    height={40}
                    label={this.props.label}
                    width={150}
                    textStyle={{
                      color: "#FFF",
                      fontSize: 14
                    }}
                    onClick={() => this.handleClick()}
                  />
                </div>
              )}

              {this.props.isOnCartPage &&
                defaultPinCode && (
                  <div className={styles.button}>
                    <Button
                      disabled={this.props.disabled}
                      type="primary"
                      backgroundColor="#ff1744"
                      height={40}
                      label={this.props.label}
                      width={150}
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
                  <div className={styles.button}>
                    <Button
                      type="primary"
                      backgroundColor="#ff1744"
                      height={40}
                      label={this.props.label}
                      width={150}
                      textStyle={{
                        color: "#FFF",
                        fontSize: 14
                      }}
                      onClick={() => this.handleFocusOnPinCode()}
                    />
                  </div>
                )}
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}
DesktopCheckout.propTypes = {
  onContinue: PropTypes.bool
};
DesktopCheckout.defaultProps = {
  onContinue: true
};
