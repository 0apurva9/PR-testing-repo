import React, { Component } from "react";
import styles from "./FaqAndTcBase.css";
import {
  CLIQ_CASH_FAQ,
  CLIQ_CASH_TC,
  DUMMY_FAQ,
  DUMMY_TC
} from "../../lib/constants.js";
import {
  setDataLayerForFaqAndTc,
  SET_DATA_LAYER_FAQ,
  SET_DATA_LAYER_TC,
  FAQ,
  TC
} from "../../lib/adobeUtils";
export default class FaqAndTcBase extends Component {
  redirectPage = type => {
    let url = "";
    if (type === FAQ) {
      url =
        process.env.REACT_APP_STAGE === "tmpprod" ? DUMMY_FAQ : CLIQ_CASH_FAQ;
      setDataLayerForFaqAndTc(SET_DATA_LAYER_FAQ);
    } else if (type === TC) {
      url = process.env.REACT_APP_STAGE === "tmpprod" ? DUMMY_TC : CLIQ_CASH_TC;
      setDataLayerForFaqAndTc(SET_DATA_LAYER_TC);
    }
    if (this.props.history) {
      this.props.history.push(url);
    }
  };
  render() {
    return (
      <div className={styles.faqAndTcBase}>
        <div className={styles.faqAndTcContainer}>
          <div
            className={styles.faqOptionWrapper}
            onClick={() => this.redirectPage(FAQ)}
          >
            <div className={styles.faqOption}>FAQ’s</div>
            <div className={styles.faqOptionArrow}>
              <div className={styles.arrowRight} />
            </div>
          </div>
          <div
            className={styles.tcOptionWrapper}
            onClick={() => this.redirectPage(TC)}
          >
            <div className={styles.tcOption}>T&C’s</div>
            <div className={styles.tcOptionArrow}>
              <div className={styles.arrowRight} />
            </div>
          </div>
          <div className={styles.wikCliverLogo} />
        </div>
      </div>
    );
  }
}
