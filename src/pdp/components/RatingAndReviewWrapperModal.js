import React from "react";
import RatingAndReview from "./RatingAndReview";
import DesktopOnly from "../../general/components/DesktopOnly";
import RatingAndReviewModal from "./RatingAndReviewModal";
export default class ReviewGuidelineWrapperModal extends React.Component {
  render() {
    return (
      <React.Fragment>
        <DesktopOnly>
          <RatingAndReviewModal>
            <RatingAndReview />
          </RatingAndReviewModal>
        </DesktopOnly>
      </React.Fragment>
    );
  }
}
