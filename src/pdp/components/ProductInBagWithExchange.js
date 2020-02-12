import React from "react";
import styles from "./ProductInBagWithExchange.css";

export default class ProductInBagWithExchange extends React.Component {
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
          Product is already in bag with exchange.
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
