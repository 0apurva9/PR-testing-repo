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
        <div
          className={styles.modalBackArrow}
          onClick={() => this.closeCashbackModal()}
        />
        <div className={styles.howExchangeWorksHeading}>Cashback Details</div>
        <ul className={styles.contentHeading}>
          <li>
            Cashback would be credited post-delivery of your new product and
            pickup of old product
          </li>
          <li>
            After placing your order, provide your preferred option to process
            Exchange Cashback for your old product
          </li>
          <li>
            In case of new phone being returned, the amount refunded would be
            after deducting the{" "}
            <span className={styles.fontRegular}>Additional Cashback</span>
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
    );
  }
}
