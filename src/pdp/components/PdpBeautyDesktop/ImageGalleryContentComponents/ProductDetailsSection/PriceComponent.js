import React from "react";
import styles from "./PriceComponent.css";

export default class PriceComponent extends React.Component {
  render() {
    // console.log("inside-price-component", this.props);
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
          <div className={styles.priceComponent}>
            <div className={styles.discountedPriceBlock}>
              <h3 className={styles.discountedPrice}>{maxOfferPrice}</h3>
            </div>
            <div className={styles.mrp}>
              <span className={styles.slashPrice}>{maxRetailPrice}</span>
              {productDetails.discount && productDetails.discount > 0 && (
                <span
                  className={styles.discountPercentage}
                >{`(${productDetails.discount}% OFF)`}</span>
              )}
            </div>
          </div>
        ) : (
          <React.Fragment>
            <div className={styles.discountedPriceBlock}>
              <h3 className={styles.discountedPrice}>{maxRetailPrice}</h3>
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}
