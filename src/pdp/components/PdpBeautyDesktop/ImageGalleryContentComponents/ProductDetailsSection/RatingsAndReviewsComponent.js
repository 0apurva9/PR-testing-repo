import React from "react";
import styles from "./RatingsAndReviewsComponent.css";
import DesktopOnly from "../../../../../general/components/DesktopOnly";
import {
  setDataLayerForPdpDirectCalls,
  SET_DATA_LAYER_FOR_REVIEW_AND_RATING_EVENT
} from "../../../../../lib/adobeUtils";

const NO_REVIEW_TEXT = "Be the first to review this product";
const WRITE_REVIEW = `/write-review`;

export default class RatingsAndReviewsComponent extends React.Component {
  handleRatingLink() {
    setDataLayerForPdpDirectCalls(SET_DATA_LAYER_FOR_REVIEW_AND_RATING_EVENT);
    const url = `${this.props.location.pathname}${WRITE_REVIEW}`;
    this.props.history.push(url);
  }
  render() {
    // console.log("inside-ratings-and-reviews-comp", this.props);
    const { averageRating, ratingCount, numberOfReviews } =
      this.props && this.props.productDetails;
    let averageRatingNew = null;
    if (averageRating) {
      averageRatingNew = Math.round(averageRating * 10) / 10;
    }
    return (
      <React.Fragment>
        {averageRatingNew && (
          <div class={styles.ratingReviewComponent}>
            <div class={styles.reviewRatingblock}>
              <span class={styles.ratingValue}>{averageRatingNew}</span>
              <span class={styles.ratingStar}></span>
              <span class={styles.ratingTotalCount}>
                {ratingCount}
                {ratingCount > 1 ? " Ratings" : " Rating"}
              </span>
              {numberOfReviews ? (
                <span class={styles.ratingTotalReview}>
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
              className={styles.noRatingText}
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
