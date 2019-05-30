import React, { Component } from "react";
import styles from "./FaqAndTcBase.css";
import { FAQ_URL, TERMS_AND_CONDITION_URL } from "../../lib/constants.js";

export default class FaqAndTcBase extends Component {
  redirectPage = url => {
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
            onClick={() => this.redirectPage(FAQ_URL)}
          >
            <div className={styles.faqOption}>FAQ’s</div>
            <div className={styles.faqText}>
              How can I transfer my CLiQ Cash to my other digital wallets?
            </div>
            <div className={styles.faqOptionArrow}>
              <div className={styles.arrowRight} />
            </div>
          </div>
          <div
            className={styles.tcOptionWrapper}
            onClick={() => this.redirectPage(TERMS_AND_CONDITION_URL)}
          >
            <div className={styles.tcOption}>T&C’s</div>
            <div className={styles.tcOptionArrow}>
              <div className={styles.arrowRight} />
            </div>
          </div>
          <div className={styles.wikCliverLogo}>QwikCilver</div>
        </div>
      </div>
    );
  }
}
