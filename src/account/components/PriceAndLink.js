import React from "react";
import styles from "./PriceAndLink.css";
import PropTypes from "prop-types";
import { RUPEE_SYMBOL } from "../../lib/constants";
import UnderLinedButton from "../../general/components/UnderLinedButton.js";
import DesktopOnly from "../../general/components/DesktopOnly";
import MobileOnly from "../../general/components/MobileOnly";
import Button from "../../general/components/Button";
export default class PriceAndLink extends React.Component {
  handleClick() {
    if (this.props.onViewDetails) {
      this.props.onViewDetails();
    }
  }

  render() {
    return (
      <div
        className={styles.base}
        style={{ borderBottom: `1px solid ${this.props.borderColor}` }}
      >
        <MobileOnly>
          {!this.props.isEgvOrder && (
            <div className={styles.buttonHolder}>
              <UnderLinedButton
                size="14px"
                fontFamily="regular"
                color="#000000"
                label={
                  this.props.placeHolderText
                    ? this.props.placeHolderText
                    : "View details"
                }
                onClick={() => this.handleClick()}
              />
            </div>
          )}
          {this.props.isEgvOrder &&
            this.props.status && (
              <div className={styles.statusFailedBase}>
                <div className={styles.priceHeader}>Status</div>
                <div className={styles.statusFailed}>{this.props.status}</div>
              </div>
            )}
          <div className={styles.priceTextHolder}>
            <div className={styles.priceHeader}>Total Price </div>
            <div className={styles.priceAmount}>{`${RUPEE_SYMBOL} ${
              this.props.price
            }`}</div>
          </div>
        </MobileOnly>
        <DesktopOnly>
          <div className={styles.priceTextHolder}>
            <div className={styles.priceHeader}>Total Price </div>
            <div className={styles.priceAmount}>{`${this.props.price}`}</div>
          </div>
          <MobileOnly>
            {this.props.isEgvOrder &&
              this.props.status && (
                <div className={styles.statusHolder}>
                  <div className={styles.priceHeader}>Status</div>
                  <div className={styles.statusFailed}>{this.props.status}</div>
                </div>
              )}
          </MobileOnly>
          {!this.props.isEgvOrder && (
            <div className={styles.buttonHolder}>
              <UnderLinedButton
                size="14px"
                fontFamily="regular"
                color="#000000"
                label={
                  this.props.placeHolderText
                    ? this.props.placeHolderText
                    : "View details"
                }
                onClick={() => this.handleClick()}
              />
            </div>
          )}
          {!this.props.products &&
            this.props.retryPaymentUrl && (
              <div className={styles.retryPayment}>
                <div className={styles.buttonHolderForRetryPayment}>
                  <Button
                    type="hollow"
                    width={147}
                    height={36}
                    label="Retry payment"
                    color="#ff1744"
                    textStyle={{
                      color: "#212121",
                      fontSize: 14,
                      fontFamily: "regular"
                    }}
                    onClick={() => this.props.onClickRetryPayment()}
                  />
                </div>
              </div>
            )}
        </DesktopOnly>
      </div>
    );
  }
}
PriceAndLink.propTypes = {
  price: PropTypes.string,
  onViewDetails: PropTypes.func,
  borderColor: PropTypes.string,
  isEgvOrder:PropTypes.bool,
  placeHolderText:PropTypes.string,
  status:PropTypes.string,
  retryPaymentUrl:PropTypes.string,
  onClickRetryPayment:PropTypes.func,
  products:PropTypes.string,
};
PriceAndLink.defaultProps = {
  borderColor: "#ececec"
};
