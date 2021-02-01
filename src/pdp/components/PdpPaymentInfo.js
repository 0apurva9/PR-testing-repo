import React from "react";
import styles from "./PdpPaymentInfo.css";
import { RUPEE_SYMBOL } from "../../lib/constants";
import {
  setDataLayerForPdpDirectCalls,
  ADOBE_DIRECT_CALL_FOR_EMI_VIEW_PLAN
} from "../../lib/adobeUtils.js";
export default class PdpPaymentInfo extends React.Component {
  showEmiModal = () => {
    setDataLayerForPdpDirectCalls(ADOBE_DIRECT_CALL_FOR_EMI_VIEW_PLAN);
    if (this.props.showEmiModal) {
      this.props.showEmiModal();
    }
  };

  render() {
    return (
      <div className={styles.base}>
        {this.props.hasEmi === "Y" && this.props.nceAvailable ? (
          <div className={styles.content}>
            <span className={styles.noCostEmi}>
              No Cost EMI from {RUPEE_SYMBOL}
              {this.props.nceStartingPrice}/month,{" "}
            </span>
            <span className={styles.text}>
              EMI from {RUPEE_SYMBOL}
              {this.props.seStartingPrice}/month
            </span>

            <span className={styles.link} onClick={this.showEmiModal}>
              View plans
            </span>
          </div>
        ) : this.props.hasEmi === "Y" && !this.props.nceAvailable ? (
          <div className={styles.content}>
            <span className={styles.text}>
              EMI from {RUPEE_SYMBOL}
              {this.props.seStartingPrice}/month
            </span>

            <span className={styles.link} onClick={this.showEmiModal}>
              View plans
            </span>
          </div>
        ) : (
          this.props.hasEmi === "N" &&
          this.props.nceAvailable && (
            <div className={styles.content}>
              <span lassName={styles.noCostEmi}>
                <span className={styles.text}>
                  No Cost EMI from {RUPEE_SYMBOL}
                  {this.props.nceStartingPrice}/month,
                </span>
              </span>
              <span className={styles.link} onClick={this.showEmiModal}>
                View plans
              </span>
            </div>
          )
        )}
        {/* {this.props.hasCod === "Y" && (
          <div className={styles.content}>Cash on Delivery available</div>
        )} */}
      </div>
    );
  }
}
