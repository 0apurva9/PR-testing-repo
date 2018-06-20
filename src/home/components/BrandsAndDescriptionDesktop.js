import React from "react";
import styles from "./BrandsAndDescriptionDesktop.css";
import Image from "../../xelpmoc-core/Image";
import { RUPEE_SYMBOL } from "../../lib/constants";
import PropTypes from "prop-types";
export default class BrandsAndDescriptionDesktop extends React.Component {
  onClick() {
    if (this.props.onClick) {
      this.props.onClick();
    }
  }
  render() {
    let priceClass = styles.discountPrice;
    if (
      this.props.discountPrice &&
      this.props.price !== this.props.discountPrice
    ) {
      priceClass = styles.priceCancelled;
    }

    return (
      <div className={styles.base} onClick={() => this.onClick()}>
        <div className={styles.brandImageHolder}>
          <div className={styles.brandImage}>
            <Image image={this.props.image} />
          </div>
        </div>
        <div className={styles.productDescription}>
          {this.props.brandsName && (
            <div className={styles.brandsName}>{this.props.brandsName}</div>
          )}
          {this.props.description && (
            <div className={styles.descriptionBrands}>
              {this.props.description}
            </div>
          )}
          {this.props.discountPrice &&
            this.props.discountPrice !== this.props.price && (
              <div className={styles.discountPrice}>
                {this.props.discountPrice.toString().includes(RUPEE_SYMBOL)
                  ? this.props.discountPrice
                  : `${RUPEE_SYMBOL}${this.props.discountPrice}`}
              </div>
            )}

          {this.props.price && (
            <div className={priceClass}>
              {this.props.price.toString().includes(RUPEE_SYMBOL)
                ? this.props.price
                : `${RUPEE_SYMBOL}${this.props.price}`}
            </div>
          )}
        </div>
      </div>
    );
  }
}
BrandsAndDescriptionDesktop.PropTypes = {
  image: PropTypes.string,
  brandsName: PropTypes.string,
  description: PropTypes.string,
  discountPrice: PropTypes.string,
  price: PropTypes.string
};
