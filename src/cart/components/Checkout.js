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
  constructor(props) {
    super(props);
    this.state = {
      showDetails: this.props.showDetails ? this.props.showDetails : false
    };
  }
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
  componentWillReceiveProps(nextProps) {
    if (nextProps.showDetails !== this.state.showDetails) {
      this.setState({ showDetails: nextProps.showDetails });
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
                  width={160}
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
                    width={160}
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
                    width={160}
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
              {" "}
              {this.props.showDetails && <React.Fragment>Hide</React.Fragment>}
              {!this.props.showDetails && (
                <React.Fragment>View</React.Fragment>
              )}{" "}
              price details
            </div>
          </div>
          {this.props.showDetails && (
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
                <div className={styles.informationHolder}>
                  <div className={styles.informationQuestionHolder}>
                    Total payable
                  </div>
                  <div className={styles.informationAnswerHolder}>
                    {RUPEE_SYMBOL}
                    {this.props.payable}
                  </div>
                </div>
              )}
            </div>
          )}
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
