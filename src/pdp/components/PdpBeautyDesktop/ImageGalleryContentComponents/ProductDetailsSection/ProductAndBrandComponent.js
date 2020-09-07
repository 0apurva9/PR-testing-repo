import React from "react";

import styles from "./ProductAndBrandComponent.css";
import { TATA_CLIQ_ROOT } from "../../../../../lib/apiRequest.js";

export default class ProductAndBrandComponent extends React.Component {
  render() {
    const productDetails = this.props && this.props.productDetails;
    const brandURL = productDetails.brandURL;
    return (
      <div>
        <h2>
          <a href={brandURL} className={styles["brand-name"]}>
            {productDetails.brandName}
          </a>
        </h2>
        <h1 className={styles["product-desc"]}>{productDetails.productName}</h1>
      </div>
    );
  }
}
