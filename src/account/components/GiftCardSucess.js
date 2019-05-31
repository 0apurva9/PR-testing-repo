import React, { Component } from "react";
import styles from "./GiftCardSucess.css";
import Button from "../../general/components/Button";
import PropTypes from "prop-types";

import {
  HOME_ROUTER,
  MY_ACCOUNT_GIFT_CARD_PAGE,
  MY_ACCOUNT_PAGE
} from "../../lib/constants";

export default class GiftCardSucess extends Component {
  renderToContinueShopping = () => {
    this.props.history.push(`${HOME_ROUTER}`);
  };
  renderToCliqCash = () => {
    this.props.history.push(`${MY_ACCOUNT_PAGE}${MY_ACCOUNT_GIFT_CARD_PAGE}`);
  };

  handleClick() {
    if (this.props.closeModal) {
      this.props.closeModal();
    }
  }
  render() {
    return (
      <div className={styles.baseWrapper}>
        <div className={styles.topHolderWrapper}>
          <div className={styles.topheader}>Gift Card Added Successfully</div>
          <div
            className={styles.crossIcon}
            onClick={() => this.handleClick()}
          />
          <div className={styles.topLabelHeader}>
            Your updated CLiQ Cash Balance:
          </div>
          <div className={styles.amount}>
            ₹
            {this.props &&
              this.props.cliqCashVoucherDetails &&
              this.props.cliqCashVoucherDetails.totalCliqCashBalance &&
              this.props.cliqCashVoucherDetails.totalCliqCashBalance.value}
          </div>
        </div>

        <div className={styles.bottomWrapper}>
          <div className={styles.bottomHolderHeading}>
            <p
              onClick={() => {
                this.renderToCliqCash();
              }}
            >
              Add another Gift Card ?
            </p>
          </div>
          <div className={styles.bottomHolderButtton}>
            <div
              className={styles.button}
              onClick={() => {
                this.renderToContinueShopping();
              }}
            >
              <div className={styles.buttonText}>Continue Shopping</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
GiftCardSucess.propTypes = {
  closeModal: PropTypes.func
};
