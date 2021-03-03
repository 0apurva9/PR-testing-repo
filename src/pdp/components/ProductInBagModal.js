import React from "react";
import styles from "./ProductInBagModal.css";
import {
  setDataLayer,
  ADOBE_MDE_PRODUCT_ALREADY_IN_CART,
  ADOBE_MDE_PRODUCT_ALREADY_IN_CART_GO_TO_BAG,
  ADOBE_MDE_PRODUCT_ALREADY_IN_CART_CANCEL
} from "../../lib/adobeUtils";
export default class ProductInBagModal extends React.Component {
  componentDidMount() {
    setDataLayer(ADOBE_MDE_PRODUCT_ALREADY_IN_CART);
  }

  closeModal() {
    setDataLayer(ADOBE_MDE_PRODUCT_ALREADY_IN_CART_CANCEL);
    this.props.closeModal();
  }

  goToBag() {
    setDataLayer(ADOBE_MDE_PRODUCT_ALREADY_IN_CART_GO_TO_BAG);
    this.props.history.push(`/cart`);
  }

  render() {
    return (
      <div className={styles.base}>
        <div className={styles.heading}>
          Product is already in cart{" "}
          {this.props.isWithExchange ? "with Exchange." : null}
          {this.props.isWithProductBundling ? "with Combo." : null}
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
