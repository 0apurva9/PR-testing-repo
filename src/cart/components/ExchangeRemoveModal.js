import React from "react";
import styles from "./ExchangeRemoveModal.css";

export default class ExchangeRemoveModal extends React.Component {
  closeModal() {
    this.props.closeModal();
  }
  async removeExchangeProduct() {
    let data = await this.props.removeExchange({
      cartGuid: this.props.cartGuid,
      entryNumber: this.props.entryNumber,
      quoteId: this.props.quoteId,
      IMEINumber: this.props.IMEINumber
    });
    if (data.status === "success") {
      this.closeModal();
    }
  }
  render() {
    return (
      <div className={styles.base}>
        <div className={styles.heading}>
          Are you sure you want to remove exchange for this product?
        </div>
        <div className={styles.cancelButton} onClick={() => this.closeModal()}>
          NO
        </div>
        <div
          className={styles.goToBagButton}
          onClick={() => this.removeExchangeProduct()}
        >
          YES
        </div>
      </div>
    );
  }
}
