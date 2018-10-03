import React from "react";
import { RUPEE_SYMBOL } from "../../lib/constants.js";
import styles from "./Checkout.css";

const DISCLAIMER =
  "Safe and secure payments. Easy returns. 100% Authentic products.";
export default class CheckoutStaticSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggelAdditionDiscount: false
    };
  }
  additionDiscountToggleView = () => {
    this.setState({
      isToggelAdditionDiscount: !this.state.isToggelAdditionDiscount
    });
  };
  render() {
    let classOffers = styles.informationAnswerHolder;
    if (this.props.offers) {
      classOffers = styles.apply;
    }
    const { cartAmount } = this.props;
    let bagSubTotal;
    if (cartAmount && cartAmount.bagTotal) {
      bagSubTotal =
        cartAmount.bagTotal.value +
        (cartAmount.shippingCharge ? cartAmount.shippingCharge.value : 0);
      bagSubTotal =
        bagSubTotal === parseInt(bagSubTotal, 10)
          ? `${bagSubTotal}.00`
          : bagSubTotal;
    }

    return (
      <React.Fragment>
        {cartAmount && (
          <div className={!this.props.isFromMyBag && styles.cartAmountWrapper}>
            <div className={styles.visibleBase}>
              <div className={styles.detailsHolder}>
                {cartAmount.bagTotal && (
                  <div className={styles.informationHolder}>
                    <div className={styles.informationQuestionHolder}>
                      Bag total
                    </div>
                    <div className={styles.informationAnswerHolder}>
                      {cartAmount.bagTotal.formattedValue}
                    </div>
                  </div>
                )}

                {cartAmount.shippingCharge &&
                cartAmount.shippingCharge.value !== 0 ? (
                  <div className={styles.informationHolder}>
                    <div className={styles.informationQuestionHolder}>
                      Shipping Charge
                    </div>
                    <div className={styles.informationAnswerHolder}>
                      {cartAmount.shippingCharge.formattedValue}
                    </div>
                  </div>
                ) : (
                  <div className={styles.informationHolder}>
                    <div className={styles.informationQuestionHolder}>
                      Shipping Charge
                    </div>
                    <div className={styles.informationAnswerHolder}>Free</div>
                  </div>
                )}
                {bagSubTotal && (
                  <div className={styles.informationHolder}>
                    <div className={styles.informationQuestionHolder}>
                      Bag Subtotal
                    </div>
                    <div className={styles.informationAnswerHolder}>
                      {RUPEE_SYMBOL}
                      {bagSubTotal}
                    </div>
                  </div>
                )}
                {cartAmount.totalDiscountAmount &&
                  cartAmount.totalDiscountAmount.value !== 0 && (
                    <div className={styles.informationDiscountHolder}>
                      <div className={styles.informationQuestionHolder}>
                        Product Discount(s)
                      </div>
                      <div className={styles.informationAnswerHolder}>
                        -{cartAmount.totalDiscountAmount.formattedValue}
                      </div>
                    </div>
                  )}
                {cartAmount.bagDiscount &&
                  cartAmount.bagDiscount.value !== 0 && (
                    <div className={styles.informationDiscountHolder}>
                      <div className={styles.informationQuestionHolder}>
                        Bag Discount
                      </div>
                      <div className={styles.informationAnswerHolder}>
                        -{cartAmount.bagDiscount.formattedValue}
                      </div>
                    </div>
                  )}
                {cartAmount.couponDiscountAmount &&
                  cartAmount.couponDiscountAmount.value !== 0 && (
                    <div className={styles.informationDiscountHolder}>
                      <div className={styles.informationQuestionHolder}>
                        Coupon Discount
                      </div>
                      <div className={styles.informationAnswerHolder}>
                        -{cartAmount.couponDiscountAmount.formattedValue}
                      </div>
                    </div>
                  )}
                {(cartAmount.cartDiscount ||
                  cartAmount.noCostEMIDiscountValue) &&
                  this.props.isCliqCashApplied && (
                    <div className={styles.informationHolder}>
                      <div className={styles.informationQuestionHolder}>
                        Cliq Cash
                      </div>
                      <div className={classOffers}>
                        {RUPEE_SYMBOL}
                        {this.props.cliqCashPaidAmount}
                      </div>
                    </div>
                  )}
                {cartAmount.cartDiscount &&
                  cartAmount.cartDiscount.value !== 0 && (
                    <div className={styles.informationDiscountHolder}>
                      <div className={styles.informationQuestionHolder}>
                        Bank Offer Discount
                      </div>
                      <div className={styles.informationAnswerHolder}>
                        -{cartAmount.cartDiscount.formattedValue}
                      </div>
                    </div>
                  )}
                {cartAmount.noCostEMIDiscountValue &&
                  cartAmount.noCostEMIDiscountValue.value !== 0 && (
                    <div className={styles.informationDiscountHolder}>
                      <div className={styles.informationQuestionHolder}>
                        No Cost EMI Discount
                      </div>
                      <div className={styles.informationAnswerHolder}>
                        -{cartAmount.noCostEMIDiscountValue.formattedValue}
                      </div>
                    </div>
                  )}
                {cartAmount.additionalDiscount && (
                  <div>
                    <div
                      className={styles.informationDiscountHolder}
                      onClick={() => this.additionDiscountToggleView()}
                    >
                      <div className={styles.informationQuestionHolder}>
                        <span>Additional Discount(s)</span>
                        {!this.state.isToggelAdditionDiscount && (
                          <span className={styles.toggleIcon} />
                        )}
                        {this.state.isToggelAdditionDiscount && (
                          <span className={styles.onToggleActive} />
                        )}
                      </div>
                      <div className={styles.informationAnswerHolder}>
                        -{cartAmount.additionalDiscount
                          .totalAdditionalDiscount &&
                          cartAmount.additionalDiscount.totalAdditionalDiscount
                            .formattedValue}
                      </div>
                    </div>
                    {this.state.isToggelAdditionDiscount && (
                      <div
                        className={styles.informationAdditionalDiscountHolder}
                      >
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
                    <div className={styles.informationHolder}>
                      <div className={styles.informationQuestionHolder}>
                        Cliq Cash
                      </div>
                      <div className={classOffers}>
                        {RUPEE_SYMBOL}
                        {this.props.cliqCashPaidAmount}
                      </div>
                    </div>
                  )}

                {cartAmount.paybleAmount && (
                  <div className={styles.visiblePayableSection}>
                    <div className={styles.informationQuestionHolder}>
                      Total Payable
                    </div>
                    <div className={styles.informationAnswerHolder}>
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
                  <div className={styles.informationDiscountHolder}>
                    <div className={styles.informationQuestionHolder}>
                      You will save {RUPEE_SYMBOL}
                      {Math.floor(
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
                      ) / 100}{" "}
                      on this order
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        <div className={styles.disclaimer}>{DISCLAIMER}</div>
        {this.props.isFromMyBag ? (
          <img
            src="https://assets.tatacliq.com/medias/sys_master/images/13207849861150.png"
            className={styles.imgFluid}
            alt="footer"
          />
        ) : (
          <img
            src="https://assets.tatacliq.com/medias/sys_master/images/13207849861150.png"
            className={styles.imgFluidPadding}
            alt="footer"
          />
        )}
        <div
          className={
            this.props.showDetails
              ? styles.hiddenBase
              : styles.hiddenBaseContracted
          }
        />
      </React.Fragment>
    );
  }
}
