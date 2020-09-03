import React from "react";

import styles from "./ProductAndBrandComponent.css";

export default class ProductAndBrandComponent extends React.Component {
  render() {
    const productDetails = this.props && this.props.productDetails;
    return (
      <div>
        <h2>
          <a href="#" className={styles["brand-name"]}>
            {productDetails.brandName}
          </a>
        </h2>
        <h1 className={styles["product-desc"]}>{productDetails.productName}</h1>
      </div>
    );
  }
}
