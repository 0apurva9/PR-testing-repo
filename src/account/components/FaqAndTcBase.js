import React, { Component } from "react";
import styles from "./FaqAndTcBase.css";
import {
  FAQ_URL,
  TERMS_AND_CONDITION_URL,
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
  redirectPage = (url, type) => {
    if (type == FAQ) {
      setDataLayerForFaqAndTc(SET_DATA_LAYER_FAQ);
    } else if (type == TC) {
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
            onClick={() => this.redirectPage(DUMMY_FAQ, FAQ)}
          >
            <div className={styles.faqOption}>FAQ’s</div>
            <div className={styles.faqOptionArrow}>
              <div className={styles.arrowRight} />
            </div>
          </div>
          <div
            className={styles.tcOptionWrapper}
            onClick={() => this.redirectPage(DUMMY_TC, TC)}
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
