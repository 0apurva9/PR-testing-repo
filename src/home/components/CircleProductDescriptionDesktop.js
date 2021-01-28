import React from "react";
import styles from "./CircleProductDescriptionDesktop.css";
import Image from "../../xelpmoc-core/Image";
import { RUPEE_SYMBOL } from "../../lib/constants";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";
import PropTypes from "prop-types";
export default class CircleProductDescriptionDesktop extends React.Component {
  onClick(evt) {
    let urlSuffix;
    if (this.props.webURL) {
      urlSuffix = this.props.webURL.replace(TATA_CLIQ_ROOT, "$1");
    } else if (this.props.productId) {
      urlSuffix = `p-${this.props.productId.toLowerCase()}`;
    } else if (this.props.productListingId) {
      urlSuffix = `p-${this.props.productListingId.toLowerCase()}`;
    }
    if (this.props.onRedirect) {
      this.props.onRedirect(urlSuffix, this.props.brandsName, evt);
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
      <div className={styles.base} onClick={evt => this.onClick(evt)}>
        <div className={styles.brandImageHolder}>
          <div className={styles.brandImage}>
            <Image image={this.props.image} fit="contain" />
          </div>
        </div>
        <div className={styles.productDescription}>
          {this.props.brandsName && (
            <div className={styles.brandsName}>
              <h3>{this.props.brandsName}</h3>
            </div>
          )}
          {this.props.description && (
            <div className={styles.descriptionBrands}>
              <h3> {this.props.description}</h3>
            </div>
          )}
          <div className={styles.priceHolder}>
            {this.props.discountPrice &&
              this.props.discountPrice !== this.props.price && (
                <div className={styles.discountPrice}>
                  <h3>
                    {" "}
                    {this.props.discountPrice.toString().includes(RUPEE_SYMBOL)
                      ? this.props.discountPrice
                      : `${RUPEE_SYMBOL}${this.props.discountPrice}`}
                  </h3>
                </div>
              )}

            {this.props.price && (
              <div className={priceClass}>
                <h3>
                  {" "}
                  {this.props.price.toString().includes(RUPEE_SYMBOL)
                    ? this.props.price
                    : `${RUPEE_SYMBOL}${this.props.price}`}
                </h3>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
CircleProductDescriptionDesktop.PropTypes = {
  image: PropTypes.string,
  brandsName: PropTypes.string,
  description: PropTypes.string,
  discountPrice: PropTypes.string,
  price: PropTypes.string
};
