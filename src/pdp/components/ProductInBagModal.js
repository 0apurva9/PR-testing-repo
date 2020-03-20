import React from "react";
import styles from "./ProductInBagModal.css";

export default class ProductInBagModal extends React.Component {
  closeModal() {
    this.props.closeModal();
  }
  goToBag() {
    this.props.history.push(`/cart`);
  }
  render() {
    return (
      <div className={styles.base}>
        <div className={styles.heading}>
          Product is already present in cart.
        </div>
        <div className={styles.cancelButton} onClick={() => this.closeModal()}>
          CANCEL
        </div>
        <div className={styles.goToBagButton} onClick={() => this.goToBag()}>
          GO TO BAG
        </div>
      </div>
    );
  }
}
