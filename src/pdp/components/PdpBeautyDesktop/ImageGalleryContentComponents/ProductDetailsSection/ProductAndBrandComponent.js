import React from "react";
import PropTypes from "prop-types";

import styles from "./ProductAndBrandComponent.css";

export default class ProductAndBrandComponent extends React.Component {
  render() {
    const productDetails = this.props && this.props.productDetails;
    const brandURL = productDetails.brandURL;
    return (
      <div className={styles["product-name-and-brand"]}>
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

ProductAndBrandComponent.propTypes = {
  productDetails: PropTypes.object
};
