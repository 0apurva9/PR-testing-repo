import React from "react";
import RatingAndReview from "./RatingAndReview";
import DesktopOnly from "../../general/components/DesktopOnly";
import RatingAndReviewModal from "./RatingAndReviewModal";
export default class RatingAndReviewWrapperModal extends React.Component {
  render() {
    console.log("====>container", this.props);
    return (
      <React.Fragment>
        <RatingAndReviewModal>
          <RatingAndReview {...this.props} />
        </RatingAndReviewModal>
      </React.Fragment>
    );
  }
}
