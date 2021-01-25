import React from "react";

import styles from "./RatingsAndReviewsComponent.css";
import DesktopOnly from "../../../../../general/components/DesktopOnly";

const NO_REVIEW_TEXT = "Be the first to review this product";
const WRITE_REVIEW = "/write-review";
const ADJUST_FACTOR = 10;

export default class RatingsAndReviewsComponent extends React.Component {
  handleRatingLink() {
    const url = `${this.props.location.pathname}${WRITE_REVIEW}`;
    this.props.history.push(url);
  }

  handleDetailsScroll(e, sectionToScroll) {
    e.preventDefault();
    if (this.props.handleDetailsScroll) {
      this.props.handleDetailsScroll(sectionToScroll);
    }
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
          <div
            className={styles["rating-review-component"]}
            onClick={e => this.handleDetailsScroll(e, "ratingsLong")}
          >
            <div className={styles["review-rating-block"]}>
              <span className={styles["rating-value"]}>{averageRatingNew}</span>
              {averageRatingNew > 2.5 && (
                <span
                  className={[
                    styles["rating-star"],
                    styles["rating-star-green"]
                  ].join(" ")}
                />
              )}
              {averageRatingNew <= 2.5 && (
                <span
                  className={[
                    styles["rating-star"],
                    styles["rating-star-orange"]
                  ].join(" ")}
                />
              )}
              <span className={styles["rating-total-count"]}>
                {ratingCount}
                {ratingCount > 1 ? " Ratings" : " Rating"}
              </span>
              {numberOfReviews ? (
                <span className={styles["rating-total-review"]}>
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
