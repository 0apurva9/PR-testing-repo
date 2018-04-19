import React from "react";
import styles from "./BagHeaderWithImage.css";
import Image from "../../xelpmoc-core/Image";
import ProductImage from "./ProductImage";
import PropTypes from "prop-types";

export default class BagHeaderWithImage extends React.Component {
  render() {
    return (
      <div className={styles.base}>
        <div className={styles.textContainer}>
          <div className={styles.mobileBrand}>{this.props.mobileBrand}</div>
          <div className={styles.mobileBrand}>{this.props.features}</div>
          <div className={styles.mobileBrand}>{this.props.priceText}</div>
        </div>
        <div className={styles.imageHolder}>
          <ProductImage image={this.props.image} />
        </div>
      </div>
    );
  }
}

BagHeaderWithImage.propTypes = {
  header: PropTypes.string,
  features: PropTypes.string,
  priceText: PropTypes.string,
  image: PropTypes.string
};
