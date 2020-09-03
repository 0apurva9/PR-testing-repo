import React from "react";
import styles from "./ProductAndBrandComponent.css";

export default class ProductAndBrandComponent extends React.Component {
  render() {
    // console.log("inside-product-and-brand-comp", this.props);
    const productDetails = this.props && this.props.productDetails;
    return (
      <div className={styles.productAndBrandComponent}>
        <h2>
          <a href="#" className={styles.brandName}>
            {productDetails.brandName}
          </a>
        </h2>
        <h1 className={styles.productDesc}>{productDetails.productName}</h1>
      </div>
    );
  }
}
