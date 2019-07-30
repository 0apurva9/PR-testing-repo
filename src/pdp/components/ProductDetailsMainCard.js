import React from "react";
import styles from "./ProductDetailsMainCard.css";
import StarRating from "../../general/components/StarRating.js";
import Icon from "../../xelpmoc-core/Icon";
import DesktopOnly from "../../general/components/DesktopOnly";
import UnderLinedButton from "../../general/components/UnderLinedButton";
import TimerCounter from "../../general/components/TimerCounterProductDetails";
import {
  RUPEE_SYMBOL,
  WRITE_REVIEW,
  PRODUCT_REVIEWS_PATH_SUFFIX
} from "../../lib/constants.js";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";
import arrowIcon from "../../general/components/img/arrow.svg";
import PropTypes from "prop-types";
import MetaTags from "react-meta-tags";
import {
  setDataLayerForPdpDirectCalls,
  SET_DATA_LAYER_FOR_REVIEW_AND_RATING_EVENT
} from "../../lib/adobeUtils";
const NO_REVIEW_TEXT = "Be the first to review this product";
export const PRIMARY_OFFER = "PRODUCT_PROMOTION";
export default class ProductDetailsMainCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popoverOpen: false,
      offsetTop: null,
      showTimer: false,
      endDateTime: null
    };
  }
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
  handlePriceBreakup() {
    if (this.props.showPriceBreakUp) {
      this.props.showPriceBreakUp();
    }
  }
  handleRatingLink() {
    setDataLayerForPdpDirectCalls(SET_DATA_LAYER_FOR_REVIEW_AND_RATING_EVENT);
    const url = `${this.props.location.pathname}${WRITE_REVIEW}`;
    this.props.history.push(url);
  }
  seeRatingReview() {
    setDataLayerForPdpDirectCalls(SET_DATA_LAYER_FOR_REVIEW_AND_RATING_EVENT);
    const url = `${
      this.props.location.pathname
    }/${PRODUCT_REVIEWS_PATH_SUFFIX}`;
    this.props.history.push(url);
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
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.impulseOfferCalloutList &&
      nextProps.impulseOfferCalloutList.length
    ) {
      return;
    } else if (
      nextProps.offers &&
      nextProps.offers.length &&
      this.props.offers.length === 0
    ) {
      let primaryOffer = nextProps.offers.find(offer => {
        return offer.couponType === PRIMARY_OFFER;
      });

      if (primaryOffer && primaryOffer.offerEndTimerStartDateAndTime) {
        if (
          new Date() >= new Date(primaryOffer.offerEndTimerStartDateAndTime) &&
          new Date(primaryOffer.offerEndTimerStartDateAndTime) <=
            new Date(primaryOffer.endDateAndTime)
        ) {
          this.setState({
            showTimer: true,
            endDateTime: primaryOffer.endDateAndTime
          });
        }
      }
    }
  }

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

            {this.state.showTimer && (
              <div className={styles.counter}>
                <span className={styles.offerEndsIn}>OFFER ENDS IN</span>{" "}
                <TimerCounter
                  endTime={this.state.endDateTime}
                  onComplete={this.onComplete}
                />
              </div>
            )}
            {this.props.impulseOfferCalloutList &&
            this.props.impulseOfferCalloutList.length ? (
              <div className={styles.impulseOfferCalloutList}>
                <span className={styles.impulseOfferCalloutListSpan}>
                  {this.props.impulseOfferCalloutList[0].promotionDisplayText}
                </span>
              </div>
            ) : null}

            <DesktopOnly>
              {this.props.hasPriceBreakUp && (
                <div className={styles.priceBreakUp}>
                  <UnderLinedButton
                    label="Price Breakup"
                    fontFamily="light"
                    color="#ff1744"
                    onClick={() => {
                      this.handlePriceBreakup();
                    }}
                  />
                </div>
              )}
            </DesktopOnly>
          </div>
        </div>

        {this.props.averageRating && (
          <div
            className={styles.ratingHolder}
            onClick={() => this.seeRatingReview()}
          >
            <StarRating averageRating={this.props.averageRating}>
              {this.props.averageRating && (
                <div
                  className={styles.ratingText}
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
        {!this.props.averageRating &&
          this.props.isPdp && (
            <DesktopOnly>
              <div
                className={styles.noRatingText}
                onClick={() => this.handleRatingLink()}
              >
                {NO_REVIEW_TEXT}
              </div>
            </DesktopOnly>
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
  discount: PropTypes.string,
  isPdp: PropTypes.bool
};
ProductDetailsMainCard.defaultProps = {
  isPdp: false
};
