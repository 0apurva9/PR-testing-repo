import React from "react";
import styles from "./ProductDetailsCardForSaveList.css";
import ProductImage from "../../general/components/ProductImage.js";
import StarRating from "../../general/components/StarRating.js";
import PropTypes from "prop-types";
import { RUPEE_SYMBOL } from "../../lib/constants";
import exchangeIconLight from "../../cart/components/img/exchangeIconLight.svg";
export default class ProductDetailsCardForSaveList extends React.Component {
  onClickImage() {
    if (this.props.onClickImage) {
      this.props.onClickImage();
    }
  }

  handleLinkClick = e => {
    e.preventDefault();
  };

  render() {
    let sizeText = this.props.size;
    if (this.props.isSizeOrLength === "Power" && this.props.size > 0) {
      sizeText = `+${this.props.size}`;
    }

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
          <a
            itemProp="url"
            href={window.location.href}
            onClick={this.handleLinkClick}
          >
            <div itemProp="name">
              <h1 className={styles.productName}>{this.props.productName}</h1>
            </div>
          </a>
          <div
            className={styles.productPrice}
            itemProp="offers"
            itemScope
            itemType="http://schema.org/AggregateOffer"
          >
            {this.props.price && (
              <React.Fragment>
                <meta itemProp="priceCurrency" content={RUPEE_SYMBOL} />
                <meta itemProp="lowPrice" content={this.props.seoDoublePrice} />
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
                    {this.props.discountPrice.toString().includes(RUPEE_SYMBOL)
                      ? this.props.discountPrice
                      : `${RUPEE_SYMBOL}${this.props.discountPrice}`}
                  </span>
                </del>
              )}
          </div>
          {this.props.size && this.props.size !== "NO SIZE" && (
            <div className={styles.sizeHolder}>
              <span className={styles.size}>
                {this.props.isSizeOrLength ? this.props.isSizeOrLength : `Size`}
              </span>{" "}
              {sizeText}
            </div>
          )}
          {this.props.exchangeDetails && (
            <div className={styles.exchangeDetailsContainer}>
              <img
                src={exchangeIconLight}
                alt="exchange icon"
                className={styles.exchangeIconLight}
              />
              {this.props.exchangeDetails.exchangeModelName &&
                this.props.exchangeDetails.exchangePriceDetail &&
                this.props.exchangeDetails.exchangePriceDetail
                  .totalExchangeCashback && (
                  <div className={styles.exchangeProductText}>
                    Your{" "}
                    <span className={styles.fontFamilyRegular}>
                      {this.props.exchangeDetails.exchangeModelName}
                    </span>{" "}
                    is applicable for{" "}
                    <span className={styles.fontFamilyRegular}>
                      {
                        this.props.exchangeDetails.exchangePriceDetail
                          .totalExchangeCashback.formattedValueNoDecimal
                      }
                    </span>{" "}
                    Exchange cashback.
                  </div>
                )}
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
              itemProp="itemReviewed"
              content={this.props.averageRating ? this.props.averageRating : 0}
            />
            {this.props.averageRating && (
              <StarRating averageRating={this.props.averageRating} />
            )}
          </div>
          {this.props.averageRating && (
            <div className={styles.displayRatingText}>
              Rating{" "}
              <span>
                {" "}
                <span>{Math.round(this.props.averageRating * 10) / 10}</span>/5
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }
}
ProductDetailsCardForSaveList.propTypes = {
  productImage: PropTypes.string,
  brandName: PropTypes.string,
  productName: PropTypes.string,
  price: PropTypes.string,
  discountPrice: PropTypes.string,
  averageRating: PropTypes.number,
  totalNoOfReviews: PropTypes.number,
  outOfStock: PropTypes.bool,
  onClickImage: PropTypes.func,
  size: PropTypes.number,
  isSizeOrLength: PropTypes.string,
  exchangeDetails: PropTypes.object,
  numberOfReviews: PropTypes.number,
  seoDoublePrice: PropTypes.number

};
