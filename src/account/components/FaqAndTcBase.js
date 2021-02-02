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
import PropTypes from "prop-types";

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
          <div className={styles.pleaseNoteContainer}>
            <div className={styles.pleaseNote}>
              <b>Please Note</b>
            </div>
            {this.props && this.props.keyCallOutCliqCash_Egv ? (
              <div className={styles.pleaseNoteBody}>
                <div
                  className={styles.marginBottom}
                  dangerouslySetInnerHTML={{
                    __html: this.props.keyCallOutCliqCash_Egv
                  }}
                ></div>
              </div>
            ) : (
              <div className={styles.pleaseNoteBody}>
                <div className={styles.marginBottom}>
                  CLiQ Cash can't be cancelled or transferred to another
                  account.
                </div>
                <div className={styles.marginBottom}>
                  It can't be withdrawn in the form of cash or transferred to
                  any bank account. It can't be used to purchase Gift Cards.
                </div>
                <div className={styles.marginBottom}>
                  Net-banking and credit/debit cards issued in India can be used
                  for CLiq Credit top up.
                </div>
                <div className={styles.marginBottom}>
                  CLiQ Cash has an expiration date. Check FAQs for details.
                </div>
              </div>
            )}
          </div>
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

FaqAndTcBase.propTypes = {
  history: PropTypes.object
};
