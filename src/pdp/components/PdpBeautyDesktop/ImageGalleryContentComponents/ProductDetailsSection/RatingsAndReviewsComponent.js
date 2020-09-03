import React from "react";

import styles from "./RatingsAndReviewsComponent.css";
import DesktopOnly from "../../../../../general/components/DesktopOnly";
import {
  setDataLayerForPdpDirectCalls,
  SET_DATA_LAYER_FOR_REVIEW_AND_RATING_EVENT
} from "../../../../../lib/adobeUtils";

const NO_REVIEW_TEXT = "Be the first to review this product";
const WRITE_REVIEW = "/write-review";
const ADJUST_FACTOR = 10;

export default class RatingsAndReviewsComponent extends React.Component {
  handleRatingLink() {
    setDataLayerForPdpDirectCalls(SET_DATA_LAYER_FOR_REVIEW_AND_RATING_EVENT);
    const url = `${this.props.location.pathname}${WRITE_REVIEW}`;
    this.props.history.push(url);
  }

  render() {
    const { averageRating, ratingCount, numberOfReviews } =
      this.props && this.props.productDetails;
    let averageRatingNew = null;
    if (averageRating) {
      averageRatingNew =
        Math.round(averageRating * ADJUST_FACTOR) / ADJUST_FACTOR;
    }

    return (
      <React.Fragment>
        {averageRatingNew && (
          <div class={styles["rating-review-component"]}>
            <div class={styles["review-rating-block"]}>
              <span class={styles["rating-value"]}>{averageRatingNew}</span>
              <span class={styles["rating-star"]}></span>
              <span class={styles["rating-total-count"]}>
                {ratingCount}
                {ratingCount > 1 ? " Ratings" : " Rating"}
              </span>
              {numberOfReviews ? (
                <span class={styles["rating-total-review"]}>
                  {" & "}
                  {numberOfReviews}
                  {numberOfReviews > 1 ? " Reviews" : " Review"}
                </span>
              ) : null}
            </div>
          </div>
        )}
        {averageRating && this.props.isPdp && (
          <DesktopOnly>
            <div
              className={styles["no-rating-text"]}
              onClick={() => this.handleRatingLink()}
            >
              {NO_REVIEW_TEXT}
            </div>
          </DesktopOnly>
        )}
      </React.Fragment>
    );
  }
}
