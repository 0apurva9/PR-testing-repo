import React from "react";
import styles from "./ExchangeModal.css";

export default class ExchangeCashbackModal extends React.Component {
  closeCashbackModal() {
    this.props.closeCashbackModal();
  }

  openTnCModal() {
    this.props.openTnCModal();
  }

  render() {
    return (
      <div className={styles.howExchangeWorksContainer}>
        <div className={styles.topContainer}>
          <div
            className={styles.modalBackArrow}
            onClick={() => this.closeCashbackModal()}
          />
          <div className={styles.howExchangeWorksHeading}>Cashback Details</div>
        </div>
        <div className={styles.bottomContainer}>
          <ul className={styles.listDetails}>
            <li>
              After placing the order for your new phone along with exchange
              offer. Remember to select your preferred payment mode for
              receiving Exchange Cashback
            </li>
            <li>
              Exchange Cashback would be credited to your preferred mode within
              2 business days after delivery of your new product and pickup of
              the old product
            </li>
            <li>
              In case of the new phone being returned, the amount refunded would
              be after deducting the{" "}
              <span className={styles.fontRegular}>&quot;CLiQ Exclusive&quot;</span>{" "}
              Cashback.
            </li>
            <li>
              To know more, refer{" "}
              <span
                className={styles.tncText}
                onClick={() => this.openTnCModal()}
              >
                T&amp;C
              </span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
