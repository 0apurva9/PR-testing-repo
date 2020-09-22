import React from "react";

import styles from "./PriceComponent.css";

export default class PriceComponent extends React.Component {
  render() {
    const productDetails = this.props && this.props.productDetails;
    const maxOfferPrice =
      productDetails.winningSellerPrice &&
      productDetails.winningSellerPrice.commaFormattedValueNoDecimal;
    const maxRetailPrice =
      productDetails.mrpPrice &&
      productDetails.mrpPrice.commaFormattedValueNoDecimal;
    return (
      <React.Fragment>
        {maxRetailPrice !== maxOfferPrice ? (
          <div className={styles["price-component"]}>
            <div className={styles["discounted-price-block"]}>
              <h3 className={styles["discounted-price"]}>{maxOfferPrice}</h3>
            </div>
            <div className={styles["mrp"]}>
              <span className={styles["slash-price"]}>{maxRetailPrice}</span>
              {productDetails.discount && productDetails.discount > 0 && (
                <span
                  className={styles["discount-percentage"]}
                >{`(${productDetails.discount}% OFF)`}</span>
              )}
            </div>
          </div>
        ) : (
          <React.Fragment>
            <div className={styles["discounted-price-block"]}>
              <h3 className={styles["discounted-price"]}>{maxRetailPrice}</h3>
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}
