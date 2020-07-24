import React from "react";
import RatingAndReview from "./RatingAndReview";
import RatingAndReviewModal from "./RatingAndReviewModal";
export default class RatingAndReviewWrapperModal extends React.Component {
  render() {
    return (
      <React.Fragment>
        <RatingAndReviewModal>
          <RatingAndReview {...this.props} />
        </RatingAndReviewModal>
      </React.Fragment>
    );
  }
}
