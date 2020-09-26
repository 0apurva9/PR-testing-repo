import React, { Component } from "react";
import PropTypes from "prop-types";

import Carousel from "../../../../general/components/Carousel";
import ProductModule from "../../../../general/components/ProductModule";
import { transformData } from "../../../../home/components/utils";
import { RUPEE_SYMBOL, SUCCESS } from "../../../../lib/constants";
import styles from "./MoreFromBrand.css";

export default class MoreFromBrand extends Component {
  goToProductDescription = url => {
    this.props.history.push(url);
  };

  render() {
    return (
      this.props.moreFromBrandResponse &&
      this.props.moreFromBrandResponse.status &&
      this.props.moreFromBrandResponse.status.toLowerCase() === SUCCESS && (
        <div>
          <div className={styles.container}>
            <div className={styles["mfb-heading"]}>{this.props.heading}</div>
          </div>
          <Carousel
            elementWidth={120}
            isPaddingTop={false}
            elementWidthDesktop={25}
            header=""
            buttonColor={true}
            sliderWidthFull={true}
          >
            {this.props.moreFromBrandResponse &&
              this.props.moreFromBrandResponse.results &&
              this.props.moreFromBrandResponse.results.map((val, i) => {
                const transformedDatum = transformData(val);
                const productImage = transformedDatum.image;
                const discountedPrice = transformedDatum.discountPrice;
                const mrpInteger = parseInt(
                  transformedDatum.price.replace(RUPEE_SYMBOL, ""),
                  10
                );
                const discount = Math.floor(
                  ((mrpInteger -
                    parseInt(discountedPrice.replace(RUPEE_SYMBOL, ""), 10)) /
                    mrpInteger) *
                    100
                );

                return (
                  <ProductModule
                    key={i}
                    {...transformedDatum}
                    {...this.props}
                    productImage={productImage}
                    productId={val.productListingId}
                    isShowAddToWishlistIcon={false}
                    discountPercent={discount}
                    onClick={url => this.goToProductDescription(url)}
                  />
                );
              })}
          </Carousel>
        </div>
      )
    );
  }
}

MoreFromBrand.propTypes = {
  moreFromBrandResponse: PropTypes.shape({
    results: PropTypes.arrayOf(
      PropTypes.shape({
        imageUrl: PropTypes.string,
        mrp: PropTypes.string,
        productListingId: PropTypes.string,
        productName: PropTypes.string,
        sharedText: PropTypes.string,
        webURL: PropTypes.string,
        winningSellerMOP: PropTypes.string,
        winningUssID: PropTypes.string
      })
    )
  })
};
