import React, { Component, Fragment } from "react";
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
      <Fragment>
        {this.props.similarProductResponse &&
        this.props.similarProductResponse.status &&
        this.props.similarProductResponse.status.toLowerCase() === SUCCESS ? (
          <div>
            <div className={styles.container}>
              <div className={styles["sp-heading"]}>{this.props.heading}</div>
            </div>
            <Carousel
              elementWidth={120}
              isPaddingTop={false}
              elementWidthDesktop={25}
              header=""
              buttonColor={true}
              sliderWidthFull={true}
            >
              {this.props.similarProductResponse &&
                this.props.similarProductResponse.results &&
                this.props.similarProductResponse.results.length > 0 &&
                this.props.similarProductResponse.results.map((val, i) => {
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
        ) : null}
      </Fragment>
    );
  }
}

MoreFromBrand.propTypes = {
  similarProductResponse: PropTypes.shape({
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
