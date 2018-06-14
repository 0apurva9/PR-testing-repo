import React from "react";
import styles from "./ProductDetailsMainCard.css";
import StarRating from "../../general/components/StarRating.js";
import Icon from "../../xelpmoc-core/Icon";
import { RUPEE_SYMBOL } from "../../lib/constants.js";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";
import arrowIcon from "../../general/components/img/arrow.svg";
import PropTypes from "prop-types";
import MetaTags from "react-meta-tags";
export default class ProductDetailsMainCard extends React.Component {
  handleClick() {
    if (this.props.onClick) {
      this.props.onClick();
    }
  }

  handleBrandClick() {
    if (this.props.brandUrl) {
      const urlSuffix = this.props.brandUrl.replace(TATA_CLIQ_ROOT, "$1");
      this.props.history.push(urlSuffix);
    }
  }
  handleRatingLink() {
    if (this.props.goToReviewPage) {
      this.props.goToReviewPage();
    }
  }
  renderSchemaTags = () => {
    return (
      <MetaTags>
        <meta itemProp="priceCurrency" content="INR" />
        <meta
          itemProp="itemCondition"
          content="http://schema.org/NewCondition"
        />
      </MetaTags>
    );
  };

  handleLinkClick = e => {
    e.preventDefault();
  };

  render() {
    const displayPrice = this.props.discountPrice
      ? this.props.discountPrice
      : this.props.price;
    let averageRating = "";
    if (this.props.averageRating) {
      averageRating = Math.round(this.props.averageRating * 10) / 10;
    }

    return (
      <div className={styles.base}>
        {this.renderSchemaTags()}
        <div className={styles.productInfo}>
          <div className={styles.productDescriptionSection}>
            <div
              itemProp="brand"
              itemScope=""
              itemType="http://schema.org/Organization"
            >
              <h2
                className={styles.brandName}
                onClick={() => this.handleBrandClick()}
              >
                <span itemProp="name">{this.props.brandName}</span>
              </h2>
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
          </div>
          <div
            itemProp="offers"
            itemScope
            itemType="http://schema.org/AggregateOffer"
            className={styles.productPriceSection}
          >
            <div className={styles.price}>
              <meta itemProp="priceCurrency" content={RUPEE_SYMBOL} />
              <meta itemProp="lowPrice" content={this.props.doublePrice} />
              <span>{displayPrice}</span>
            </div>
            {this.props.discountPrice &&
              this.props.discountPrice !== this.props.price && (
                <div className={styles.priceCancelled}>
                  <span className={styles.cancelPrice}>{this.props.price}</span>
                  <span className={styles.discount}>
                    {this.props.discount && `(${this.props.discount}%)`}
                  </span>
                </div>
              )}
          </div>
        </div>

        {this.props.averageRating && (
          <div
            className={styles.ratingHolder}
            onClick={() => this.handleRatingLink()}
          >
            <StarRating averageRating={this.props.averageRating}>
              {this.props.averageRating && (
                <div
                  className={styles.ratingText}
                  onClick={() => this.handleClick()}
                  itemProp="aggregateRating"
                  itemScope
                  itemType="http://schema.org/AggregateRating"
                >
                  Rating
                  <span className={styles.ratingOffset} itemProp="ratingValue">
                    {averageRating}
                  </span>/5
                  <meta
                    itemProp="reviewCount"
                    content={this.props.numberOfReviews}
                  />
                </div>
              )}
              <div className={styles.arrowHolder}>
                <Icon image={arrowIcon} size={15} />
              </div>
            </StarRating>
          </div>
        )}
      </div>
    );
  }
}
ProductDetailsMainCard.propTypes = {
  productName: PropTypes.string,
  productDescription: PropTypes.string,
  price: PropTypes.string,
  numberOfReviews: PropTypes.number,
  discountPrice: PropTypes.string,
  averageRating: PropTypes.number,
  onClick: PropTypes.func,
  discount: PropTypes.string
};
