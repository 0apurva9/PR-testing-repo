import React from "react";
import styles from "./PriceAndLink.css";
import PropTypes from "prop-types";
import { RUPEE_SYMBOL } from "../../lib/constants";
import UnderLinedButton from "../../general/components/UnderLinedButton.js";
import DesktopOnly from "../../general/components/DesktopOnly";
import MobileOnly from "../../general/components/MobileOnly";
export default class PriceAndLink extends React.Component {
  handleClick() {
    if (this.props.onViewDetails) {
      this.props.onViewDetails();
    }
  }
  render() {
    return (
      <div className={styles.base}>
        <MobileOnly>
          {!this.props.isEgvOrder && (
            <div className={styles.buttonHolder}>
              <UnderLinedButton
                size="14px"
                fontFamily="regular"
                color="#000000"
                label="View details"
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
            <div className={styles.priceAmount}>{`${RUPEE_SYMBOL} ${
              this.props.price
            }`}</div>
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
                label="View details"
                onClick={() => this.handleClick()}
              />
            </div>
          )}
        </DesktopOnly>
      </div>
    );
  }
}
PriceAndLink.propTypes = {
  price: PropTypes.string,
  onViewDetails: PropTypes.func
};
