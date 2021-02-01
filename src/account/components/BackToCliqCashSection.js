import React, { Component } from "react";
import styles from "./CliqCashDesktop.css";
import { Link } from "react-router-dom";
import giftCardImg from "./img/gift_card.jpg";

export default class BackToCliqCashSection extends Component {
  render() {
    return (
      <div>
        <div className={styles.cliqCashDetailWithHolderCheckBal}>
          <div className={styles.heading}>
            <span className={styles.checkBalLeftText}>And it&#39;s here</span>
            <span className={styles.checkBalRightText}>
              <Link
                to={`/my-account/cliq-cash`}
                className={styles.checkBalRightTextLink}
              >
                Back to CLiQ Cash
              </Link>
            </span>
          </div>
          <div className={styles.cardImage}>
            <img src={giftCardImg} alt="" className={styles.cardImageImg} />
          </div>
        </div>
      </div>
    );
  }
}
