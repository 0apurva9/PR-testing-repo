import React from "react";

import styles from "./PriceComponent.css";
import ShareLinkComponent from "../../../ShareLinkComponent";

export default class PriceComponent extends React.Component {
  render() {
    const productDetails = this.props && this.props.productDetails;
    const maxOfferPrice =
      productDetails.winningSellerPrice &&
      productDetails.winningSellerPrice.commaFormattedValueNoDecimal;
    const maxRetailPrice =
      productDetails.mrpPrice &&
      productDetails.mrpPrice.commaFormattedValueNoDecimal;

    let shareComponent = false;
    this.props.masterTemplateResponse &&
      this.props.masterTemplateResponse.value.componentList &&
      this.props.masterTemplateResponse.value.componentList.forEach(element => {
        if (element.componentId === "productAndBrandComponent") {
          shareComponent =
            element.componentProperties &&
            element.componentProperties.shareButton;
        }
      });
    return (
      <React.Fragment>
        <div className={styles["price-component"]}>
          {maxRetailPrice !== maxOfferPrice ? (
            <React.Fragment>
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
            </React.Fragment>
          ) : (
            <React.Fragment>
              <div className={styles["discounted-price-block"]}>
                <h3 className={styles["discounted-price"]}>{maxRetailPrice}</h3>
              </div>
            </React.Fragment>
          )}
          {shareComponent && (
            <ShareLinkComponent displayToast={this.props.displayToast} />
          )}
        </div>
      </React.Fragment>
    );
  }
}
