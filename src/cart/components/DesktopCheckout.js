import React from "react";
import {
  RUPEE_SYMBOL,
  DEFAULT_PIN_CODE_LOCAL_STORAGE
} from "../../lib/constants.js";
import PropTypes from "prop-types";
import Button from "../../general/components/Button.js";
import styles from "./DesktopCheckout.css";
export default class DesktopCheckout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggelAdditionDiscount: false
    };
  }
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
  additionDiscountToggleView = () => {
    this.setState({
      isToggelAdditionDiscount: !this.state.isToggelAdditionDiscount
    });
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
    const { cartAmount } = this.props;
    let bagSubTotal;
    if (cartAmount && cartAmount.bagTotal) {
      bagSubTotal =
        cartAmount.bagTotal.value +
        (cartAmount.shippingCharge ? cartAmount.shippingCharge.value : 0);
      bagSubTotal = this.addDecimalNumberInPrice(bagSubTotal);
    }
    return (
      <React.Fragment>
        {cartAmount && (
          <div className={styles.base}>
            <div className={styles.section}>
              {cartAmount.bagTotal && (
                <div className={styles.row}>
                  <div className={styles.label}>Bag Total</div>
                  <div className={styles.info}>
                    {cartAmount.bagTotal.formattedValue}
                  </div>
                </div>
              )}
              {cartAmount.shippingCharge &&
              cartAmount.shippingCharge.value !== 0 ? (
                <div className={styles.row}>
                  <div className={styles.label}>Shipping Charge</div>
                  <div className={styles.info}>
                    {cartAmount.shippingCharge.formattedValue}
                  </div>
                </div>
              ) : (
                <div className={styles.row}>
                  <div className={styles.label}>Shipping Charge</div>
                  <div className={styles.info}>{RUPEE_SYMBOL}0.00</div>
                </div>
              )}
              {bagSubTotal && (
                <div className={styles.row}>
                  <div className={styles.label}>Bag Subtotal</div>
                  <div className={styles.info}>
                    {RUPEE_SYMBOL}
                    {bagSubTotal}
                  </div>
                </div>
              )}
              {cartAmount.totalDiscountAmount &&
                cartAmount.totalDiscountAmount.value !== 0 && (
                  <div className={styles.row}>
                    <div className={styles.label}>Product Discount(s)</div>
                    <div className={styles.info}>
                      -{cartAmount.totalDiscountAmount.formattedValue}
                    </div>
                  </div>
                )}
              {cartAmount.bagDiscount &&
                cartAmount.bagDiscount.value !== 0 && (
                  <div className={styles.row}>
                    <div className={styles.label}>Bag Discount</div>
                    <div className={styles.info}>
                      -{cartAmount.bagDiscount.formattedValue}
                    </div>
                  </div>
                )}
              {cartAmount.couponDiscountAmount &&
                cartAmount.couponDiscountAmount.value !== 0 && (
                  <div className={styles.row}>
                    <div className={styles.label}>Coupon Discount</div>
                    <div className={styles.info}>
                      -{cartAmount.couponDiscountAmount.formattedValue}
                    </div>
                  </div>
                )}
              {(cartAmount.cartDiscount || cartAmount.noCostEMIDiscountValue) &&
                this.props.isCliqCashApplied && (
                  <div className={styles.row}>
                    <div className={styles.label}>CLiQ Cash Applied</div>
                    <div className={styles.info}>
                      -{RUPEE_SYMBOL}
                      {this.addDecimalNumberInPrice(
                        this.props.cliqCashPaidAmount
                      )}
                    </div>
                  </div>
                )}
              {cartAmount.cartDiscount &&
                cartAmount.cartDiscount.value !== 0 && (
                  <div className={styles.row}>
                    <div className={styles.label}>Bank Offer Discount</div>
                    <div className={styles.info}>
                      -{cartAmount.cartDiscount.formattedValue}
                    </div>
                  </div>
                )}
              {cartAmount.noCostEMIDiscountValue &&
                cartAmount.noCostEMIDiscountValue.value !== 0 && (
                  <div className={styles.row}>
                    <div className={styles.label}>No Cost EMI Discount</div>
                    <div className={styles.info}>
                      -{cartAmount.noCostEMIDiscountValue.formattedValue}
                    </div>
                  </div>
                )}
              {cartAmount.additionalDiscount && (
                <div className={styles.additionalDiscount}>
                  <div
                    className={styles.row}
                    onClick={() => this.additionDiscountToggleView()}
                  >
                    <div className={styles.labelForAdditionalDiscount}>
                      <span>Additional Discount(s)</span>
                      {!this.state.isToggelAdditionDiscount && (
                        <span className={styles.toggleIcon} />
                      )}
                      {this.state.isToggelAdditionDiscount && (
                        <span className={styles.onToggleActive} />
                      )}
                    </div>
                    <div className={styles.infoForAdditionalDiscount}>
                      -{cartAmount.additionalDiscount.totalAdditionalDiscount &&
                        cartAmount.additionalDiscount.totalAdditionalDiscount
                          .formattedValue}
                    </div>
                  </div>
                  {this.state.isToggelAdditionDiscount && (
                    <div className={styles.informationAdditionalDiscountHolder}>
                      <div className={styles.informationQuestionHolder}>
                        Shipping Charge Discount
                      </div>
                      <div className={styles.informationAnswerHolder}>
                        -{cartAmount.additionalDiscount.shippingDiscount &&
                          cartAmount.additionalDiscount.shippingDiscount
                            .formattedValue}
                      </div>
                    </div>
                  )}
                </div>
              )}
              {!(
                cartAmount.cartDiscount || cartAmount.noCostEMIDiscountValue
              ) &&
                this.props.isCliqCashApplied && (
                  <div className={styles.row}>
                    <div className={styles.label}>CLiQ Cash Applied</div>
                    <div className={styles.info}>
                      -{RUPEE_SYMBOL}
                      {this.addDecimalNumberInPrice(
                        this.props.cliqCashPaidAmount
                      )}
                    </div>
                  </div>
                )}
              {cartAmount.paybleAmount && (
                <div className={styles.row}>
                  <div className={styles.label}>Total Payable</div>
                  <div className={styles.info}>
                    {cartAmount.paybleAmount.formattedValue}
                  </div>
                </div>
              )}
              {!(
                (!cartAmount.totalDiscountAmount ||
                  cartAmount.totalDiscountAmount.value === 0) &&
                !cartAmount.bagDiscount &&
                !cartAmount.couponDiscountAmount &&
                !cartAmount.cartDiscount &&
                !cartAmount.noCostEMIDiscountValue &&
                !cartAmount.additionalDiscount
              ) && (
                <div className={styles.informationTotalSavingHolder}>
                  <div className={styles.informationTotalSavingTextHolder}>
                    You will save {RUPEE_SYMBOL}
                    {this.addDecimalNumberInPrice(
                      Math.floor(
                        ((cartAmount.totalDiscountAmount
                          ? cartAmount.totalDiscountAmount.value
                          : 0) +
                          (cartAmount.bagDiscount
                            ? cartAmount.bagDiscount.value
                            : 0) +
                          (cartAmount.couponDiscountAmount
                            ? cartAmount.couponDiscountAmount.value
                            : 0) +
                          (cartAmount.cartDiscount
                            ? cartAmount.cartDiscount.value
                            : 0) +
                          (cartAmount.noCostEMIDiscountValue
                            ? cartAmount.noCostEMIDiscountValue.value
                            : 0) +
                          (cartAmount.additionalDiscount &&
                          cartAmount.additionalDiscount.totalAdditionalDiscount
                            ? cartAmount.additionalDiscount
                                .totalAdditionalDiscount.value
                            : 0)) *
                          100
                      ) / 100
                    )}{" "}
                    on this order
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
                      this.props.onContinue
                        ? styles.price
                        : styles.checkoutPrice
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
        )}
      </React.Fragment>
    );
  }
}
DesktopCheckout.propTypes = {
  onContinue: PropTypes.bool
};
DesktopCheckout.defaultProps = {
  onContinue: true
};
