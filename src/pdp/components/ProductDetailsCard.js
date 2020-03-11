import React from "react";
import styles from "./ProductDetailsCard.css";
import ProductImage from "../../general/components/ProductImage.js";
import StarRating from "../../general/components/StarRating.js";
import PropTypes from "prop-types";
import { RUPEE_SYMBOL } from "../../lib/constants";
import MobileOnly from "../../general/components/MobileOnly";
import DesktopOnly from "../../general/components/DesktopOnly";
export default class ProductDetailsCard extends React.Component {
  onClickImage() {
    if (this.props.onClickImage) {
      this.props.onClickImage();
    }
  }

  handleLinkClick = e => {
    e.preventDefault();
  };

  render() {
    /* let discount = "";
    if(this.props.priceDouble && this.props.discountPriceDouble){
      discount = Math.round(
        ((this.props.discountPriceDouble - this.props.priceDouble)/this.props.discountPriceDouble) * 100
        );
    } */
    return (
      <div className={styles.base}>
        <div className={styles.productImageHolder}>
          {this.props.outOfStock && (
            <div className={styles.flag}>Out Of Stock</div>
          )}

          <ProductImage
            image={this.props.productImage}
            onClickImage={() => this.onClickImage()}
          />
        </div>
        <div className={styles.productDescriptionHolder}>
          {this.props.brandName && (
            <div
              itemProp="brand"
              itemScope=""
              itemType="http://schema.org/Organization"
            >
              {this.props.brandName && (
                <h2 className={styles.brandName}>
                  <span itemProp="name">{this.props.brandName}</span>
                </h2>
              )}
            </div>
          )}
          {this.props.productName && (
            <a
              itemProp="url"
              href={window.location.href}
              onClick={this.handleLinkClick}
            >
              <div itemProp="name">
                <h1 className={styles.productName}>{this.props.productName}</h1>
              </div>
            </a>
          )}
          {(this.props.price || this.props.discountPrice) && (
            <div
              className={styles.productPrice}
              itemProp="offers"
              itemScope
              itemType="http://schema.org/AggregateOffer"
            >
              {this.props.price && (
                <React.Fragment>
                  <meta itemProp="priceCurrency" content={RUPEE_SYMBOL} />
                  <meta
                    itemProp="lowPrice"
                    content={this.props.seoDoublePrice}
                  />
                  <span className={styles.onPrice}>
                    {this.props.price.toString().includes(RUPEE_SYMBOL)
                      ? this.props.price
                      : `${RUPEE_SYMBOL}${this.props.price}`}
                  </span>
                </React.Fragment>
              )}
              {this.props.discountPrice &&
                this.props.discountPrice !== this.props.price && (
                  <del>
                    <span className={styles.deletePrice}>
                      {this.props.discountPrice
                        .toString()
                        .includes(RUPEE_SYMBOL)
                        ? this.props.discountPrice
                        : `${RUPEE_SYMBOL}${this.props.discountPrice}`}
                    </span>
                  </del>
                )}
              {/*   <span className={styles.discount}>
                {discount && discount > 0 &&`(${discount}%)`}
              </span>  */}
            </div>
          )}
          {this.props.productTitle && (
            <div className={styles.productTitle}>{this.props.productTitle}</div>
          )}
          {this.props.size &&
            this.props.size !== "NO SIZE" && (
              <div className={styles.sizeHolder}>
                <span className={styles.size}>size</span> {this.props.size}
              </div>
            )}
          <div
            className={styles.displayRating}
            itemProp="aggregateRating"
            itemScope
            itemType="http://schema.org/AggregateRating"
          >
            <meta
              itemProp="ratingValue"
              content={this.props.averageRating ? this.props.averageRating : 0}
            />
            <meta
              itemProp="reviewCount"
              content={
                this.props.numberOfReviews ? this.props.numberOfReviews : 0
              }
            />
            <meta
              itemprop="itemReviewed"
              content={this.props.averageRating ? this.props.averageRating : 0}
            />
            {this.props.averageRating &&
              !this.props.showAverageRatingWithDays && (
                <React.Fragment>
                  <MobileOnly>
                    <StarRating averageRating={this.props.averageRating} />
                  </MobileOnly>
                  <DesktopOnly>
                    <StarRating
                      averageRating={this.props.averageRating}
                      size={20}
                    />
                  </DesktopOnly>
                </React.Fragment>
              )}
            {this.props.averageRating &&
              this.props.showAverageRatingWithDays && (
                <StarRating averageRating={this.props.averageRating}>
                  <span className={styles.showAverageRatingWithDays}>
                    {this.props.daysAgo}
                  </span>
                </StarRating>
              )}
          </div>
          {this.props.averageRating &&
            !this.props.showAverageRatingWithDays && (
              <div className={styles.displayRatingText}>
                Rating{" "}
                <span>
                  {" "}
                  <span>
                    {Math.round(this.props.averageRating * 10) / 10}
                  </span>/5
                </span>
              </div>
            )}
        </div>
      </div>
    );
  }
}
ProductDetailsCard.propTypes = {
  productImage: PropTypes.string,
  brandName: PropTypes.string,
  productName: PropTypes.string,
  price: PropTypes.string,
  discountPrice: PropTypes.string,
  averageRating: PropTypes.number,
  totalNoOfReviews: PropTypes.number,
  outOfStock: PropTypes.bool
};
ProductDetailsCard.defaultProps = {
  showAverageRatingWithDays: false
};
