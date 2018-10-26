import React from "react";
import PropTypes from "prop-types";
import StarRating from "../../general/components/StarRating.js";
import PdpLink from "./PdpLink";
import styles from "./RatingAndTextLink.css";
import {
  setDataLayerForPdpDirectCalls,
  SET_DATA_LAYER_FOR_REVIEW_AND_RATING_EVENT
} from "../../lib/adobeUtils";
const NO_REVIEW_TEXT = "Be the first to review this product";
export default class RatingAndTextLink extends React.Component {
  onClick() {
    setDataLayerForPdpDirectCalls(SET_DATA_LAYER_FOR_REVIEW_AND_RATING_EVENT);
    if (this.props.onClick) {
      this.props.onClick();
    }
  }
  render() {
    return (
      <PdpLink onClick={() => this.onClick()}>
        {this.props.numberOfReview !== 0 && (
          <div
            itemProp="aggregateRating"
            itemScope
            itemType="http://schema.org/AggregateRating"
            className={styles.base}
          >
            <div className={styles.ratingsHolder}>
              <StarRating averageRating={this.props.averageRating} />
            </div>

            <div className={styles.textHolder}>
              <span itemProp="ratingValue">
                {this.props.averageRating
                  ? Math.round(this.props.averageRating * 10) / 10
                  : ""}
              </span>{" "}
              based on
              <span itemProp="reviewCount"> {this.props.numberOfReview}</span>
              reviews
            </div>
          </div>
        )}
        {this.props.numberOfReview === 0 && (
          <div className={styles.base}>
            <div className={styles.ratingsHolder}>
              <StarRating averageRating={this.props.averageRating} />
            </div>
            <div className={styles.textHolder}>{NO_REVIEW_TEXT}</div>
          </div>
        )}
      </PdpLink>
    );
  }
}
RatingAndTextLink.propTypes = {
  averageRating: PropTypes.number,
  onClick: PropTypes.func,
  numberOfReview: PropTypes.number
};
