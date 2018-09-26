import React from "react";
import { RUPEE_SYMBOL } from "../../lib/constants.js";
import styles from "./Checkout.css";

const DISCLAIMER =
  "Safe and secure payments. Easy returns. 100% Authentic products.";
export default class CheckoutStaticSection extends React.Component {
  render() {
    let totalSaving =
      this.props.bagTotal && this.props.payable
        ? Math.round(
            (parseFloat(this.props.bagTotal) - parseFloat(this.props.payable)) *
              100
          ) / 100
        : 0;

    let classOffers = styles.informationAnswerHolder;
    if (this.props.offers) {
      classOffers = styles.apply;
    }
    const { cartAmount } = this.props;
    console.log(cartAmount);
    return (
      <React.Fragment>
        <div className={styles.disclaimer}>{DISCLAIMER}</div>
        {cartAmount && (
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
                      Discount
                    </div>
                    <div className={styles.informationAnswerHolder}>
                      -{cartAmount.couponDiscountAmount.formattedValue}
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
              {cartAmount.additionalDiscount && (
                <div>
                  <div className={styles.informationDiscountHolder}>
                    <div className={styles.informationQuestionHolder}>
                      Additional Discount(s)
                    </div>
                    <div className={styles.informationAnswerHolder}>
                      -{cartAmount.additionalDiscount.totalAdditionalDiscount &&
                        cartAmount.additionalDiscount.totalAdditionalDiscount
                          .formattedValue}
                    </div>
                  </div>

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
                </div>
              )}
              {this.props.noCostEmiEligibility &&
                this.props.isNoCostEmiApplied && (
                  <div className={styles.informationHolder}>
                    <div className={styles.informationQuestionHolder}>
                      No Cost EMI Discount
                    </div>
                    <div className={classOffers}>
                      {RUPEE_SYMBOL}
                      {this.props.noCostEmiDiscount}
                    </div>
                  </div>
                )}
              {this.props.isCliqCashApplied && (
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
            </div>
          </div>
        )}
        {this.props.isFromMyBag ? (
          <img
            src="https://assets.tatacliq.com/medias/sys_master/images/13207849861150.png"
            className={styles.imgFluid}
          />
        ) : (
          <img
            src="https://assets.tatacliq.com/medias/sys_master/images/13207849861150.png"
            className={styles.imgFluidPadding}
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
