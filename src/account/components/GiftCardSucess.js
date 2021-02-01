import React, { Component } from "react";
import styles from "./GiftCardSucess.css";
import Button from "../../general/components/Button";
import PropTypes, { string } from "prop-types";
import { HOME_ROUTER } from "../../lib/constants";
import {
  setDataLayerForCartDirectCalls,
  ADOBE_DIRECT_CALL_FOR_CONTINUE_SHOPPING
} from "../../lib/adobeUtils";

export default class GiftCardSucess extends Component {
  renderToContinueShopping = () => {
    setDataLayerForCartDirectCalls(ADOBE_DIRECT_CALL_FOR_CONTINUE_SHOPPING);
    this.props.history.push(`${HOME_ROUTER}`);
  };

  renderToCliqCash = () => {
    const obj = {};
    obj.addCard = true;
    obj.btnLabel = "Add card";
    this.props.showCliqCashModule(obj);
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
          <div className={styles.topHolder}>
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
        </div>

        <div className={styles.bottomWrapper}>
          <div
            className={styles.bottomHolderHeading}
            onClick={() => {
              this.renderToCliqCash();
            }}
          >
            Add another Gift Card ?
          </div>
          <div className={styles.bottomHolderButtton}>
            <Button
              label="Continue Shopping"
              type="linearGradient"
              width={178}
              height={36}
              linearColor={{
                fromColor: "#da1c5c",
                toColor: "#da1c5c"
              }}
              onClick={() => {
                this.renderToContinueShopping();
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}
GiftCardSucess.propTypes = {
  closeModal: PropTypes.func,
  showCliqCashModule: PropTypes.func,
  cliqCashVoucherDetails: PropTypes.shape({
    totalCliqCashBalance: PropTypes.shape({
      value: string
    })
  }),
  history: PropTypes.object
};
