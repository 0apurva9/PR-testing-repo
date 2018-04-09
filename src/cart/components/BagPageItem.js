import React from "react";
import styles from "./BagPageItem.css";
import ProductImage from "../../general/components/ProductImage.js";
import PropTypes from "prop-types";
const NOT_SERVICEABLE = "Service Not Available";
export default class BagPageItem extends React.Component {
  onClick() {
    if (this.props.onClickImage) {
      this.props.onClickImage();
    }
  }
  render() {
    return (
      <div className={styles.base}>
        <div className={styles.productDescription}>
          {!this.props.isServiceAvailable && (
            <div className={styles.serviceAvailabilityText}>
              {" "}
              {NOT_SERVICEABLE}
            </div>
          )}
          {this.props.productName && (
            <div className={styles.informationText}>
              {this.props.productName}
            </div>
          )}
          {this.props.productDetails && (
            <div className={styles.informationText}>
              {this.props.productDetails}
            </div>
          )}
          {this.props.price && (
            <div className={styles.informationText}>
              {`Rs. ${this.props.price}`}
            </div>
          )}
        </div>
        <div className={styles.productImage}>
          <ProductImage
            image={this.props.productImage}
            onClickImage={() => this.onClick()}
          />
        </div>
      </div>
    );
  }
}
BagPageItem.propTypes = {
  productImage: PropTypes.string,
  productName: PropTypes.string,
  price: PropTypes.string,
  productDetails: PropTypes.string
};
