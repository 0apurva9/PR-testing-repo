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
    return (
      <React.Fragment>
        <div className={styles.disclaimer}>{DISCLAIMER}</div>
        {this.props.isFromMyBag && (
          <div className={styles.visibleBase}>
            <div className={styles.detailsHolder}>
              {this.props.bagTotal && (
                <div className={styles.informationHolder}>
                  <div className={styles.informationQuestionHolder}>
                    Bag total
                  </div>
                  <div className={styles.informationAnswerHolder}>
                    {RUPEE_SYMBOL}
                    {this.props.bagTotal}
                  </div>
                </div>
              )}
              {this.props.totalDiscount && (
                <div className={styles.informationHolder}>
                  <div className={styles.informationQuestionHolder}>
                    Discount
                  </div>
                  <div className={styles.informationAnswerHolder}>
                    {RUPEE_SYMBOL}
                    {this.props.totalDiscount}
                  </div>
                </div>
              )}
              {this.props.discount && (
                <div className={styles.informationHolder}>
                  <div className={styles.informationQuestionHolder}>
                    Discount
                  </div>
                  <div className={styles.informationAnswerHolder}>
                    {RUPEE_SYMBOL}
                    {this.props.discount}
                  </div>
                </div>
              )}
              {this.props.delivery && (
                <div className={styles.informationHolder}>
                  <div className={styles.informationQuestionHolder}>
                    Shipping fee
                  </div>
                  <div className={styles.informationAnswerHolder}>
                    {RUPEE_SYMBOL}
                    {this.props.delivery}
                  </div>
                </div>
              )}

              {this.props.coupons && (
                <div className={styles.informationHolder}>
                  <div className={styles.informationQuestionHolder}>Coupon</div>
                  <div className={classOffers}>
                    {RUPEE_SYMBOL}
                    {this.props.coupons}
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

              {this.props.payable && (
                <React.Fragment>
                  <div className={styles.visiblePayableSection}>
                    <div className={styles.informationQuestionHolder}>
                      Total Payable
                    </div>
                    <div className={styles.informationAnswerHolder}>
                      {RUPEE_SYMBOL}
                      {this.props.payable}
                    </div>
                  </div>
                  {totalSaving > 0 && (
                    <div className={styles.savingSection}>
                      <div className={styles.informationQuestionHolder}>
                        Total savings
                      </div>
                      <div className={styles.informationAnswerHolder}>
                        {RUPEE_SYMBOL}
                        {totalSaving}
                      </div>
                    </div>
                  )}
                </React.Fragment>
              )}
            </div>
          </div>
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
