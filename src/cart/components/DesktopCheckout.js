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
  addDecimalNumberInPrice = price => {
    return price === parseInt(price, 10) ? `${price}.00` : price;
  };
  render() {
    const defaultPinCode =
      localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE) &&
      localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE) !== "undefined"
        ? localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE)
        : null;
    let totalSaving =
      this.props.bagTotal &&
      this.props.bagTotal.bagTotal &&
      this.props.bagTotal.bagTotal.doubleValue &&
      this.props.payable &&
      this.props.payable.paybleAmount &&
      this.props.payable.paybleAmount.doubleValue
        ? Math.round(
            (parseFloat(this.props.bagTotal.bagTotal.doubleValue) -
              parseFloat(this.props.payable.paybleAmount.doubleValue)) *
              100
          ) / 100
        : 0;
    return (
      <div className={styles.base}>
        <div className={styles.section}>
          {this.props.bagTotal &&
            this.props.bagTotal.bagTotal && (
              <div className={styles.row}>
                <div className={styles.label}>Bag Total</div>
                <div className={styles.info}>
                  {this.props.bagTotal.bagTotal.formattedValue}
                </div>
              </div>
            )}
          {this.props.carPageBagTotal && (
            <div className={styles.row}>
              <div className={styles.label}>Bag Total</div>
              <div className={styles.info}>
                {RUPEE_SYMBOL}
                {this.props.carPageBagTotal}
              </div>
            </div>
          )}
          {this.props.totalDiscount &&
            this.props.totalDiscount.totalDiscountAmount &&
            this.props.totalDiscount.totalDiscountAmount.value !== 0 && (
              <div className={styles.row}>
                <div className={styles.label}>Discount</div>
                <div className={styles.info}>
                  {this.props.totalDiscount.totalDiscountAmount.formattedValue}
                </div>
              </div>
            )}
          {this.props.delivery &&
          this.props.delivery.shippingCharge &&
          this.props.delivery.shippingCharge.value !== 0 ? (
            <div className={styles.row}>
              <div className={styles.label}> Shipping Charge</div>
              <div className={styles.info}>
                {this.props.delivery.shippingCharge.formattedValue}
              </div>
            </div>
          ) : (
            <div className={styles.row}>
              <div className={styles.label}>Shipping Charge</div>
              <div className={styles.info}>{RUPEE_SYMBOL}0.00</div>
            </div>
          )}
          {this.props.coupons &&
            this.props.coupons.couponDiscountAmount &&
            this.props.coupons.couponDiscountAmount.value !== 0 && (
              <div className={styles.row}>
                <div className={styles.label}>Coupon Discount</div>
                <div className={styles.info}>
                  {this.props.coupons.couponDiscountAmount.formattedValue}
                </div>
              </div>
            )}
          {this.props.noCostEmiEligibility &&
            this.props.noCostEmiEligibility.noCostEMIDiscountValue &&
            this.props.noCostEmiEligibility.noCostEMIDiscountValue.value !==
              0 && (
              <div className={styles.row}>
                <div className={styles.label}>No Cost EMI Discount</div>
                <div className={styles.info}>
                  {
                    this.props.noCostEmiEligibility.noCostEMIDiscountValue
                      .formattedValue
                  }
                </div>
              </div>
            )}
          {this.props.isCliqCashApplied &&
            (this.props.isCliqCashApplied.cartDiscount ||
              this.props.isCliqCashApplied.noCostEMIDiscountValue) && (
              <div className={styles.row}>
                <div className={styles.label}>CLiQ Cash Applied</div>
                <div className={styles.info}>
                  {RUPEE_SYMBOL}
                  {this.addDecimalNumberInPrice(this.props.cliqCashPaidAmount)}
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
          {this.props.payable &&
            this.props.payable.paybleAmount &&
            this.props.payable.paybleAmount.formattedValue && (
              <div
                className={
                  this.props.onContinue ? styles.price : styles.checkoutPrice
                }
              >
                {this.props.payable.paybleAmount.formattedValue}
              </div>
            )}
          {this.props.payableForCartPage && (
            <div
              className={
                this.props.onContinue ? styles.price : styles.checkoutPrice
              }
            >
              {`Rs. ${this.props.payableForCartPage}`}
            </div>
          )}
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
