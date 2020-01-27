import React from "react";
import DesktopOnly from "../../general/components/DesktopOnly";
import ReviewGuidelineModal from "./ReviewGuidelineModal";
import ReviewGuideline from "./ReviewGuideline";
export default class ReviewGuidelineWrapperModal extends React.Component {
  render() {
    return (
      <React.Fragment>
        <DesktopOnly>
          <ReviewGuidelineModal closeModal={this.props.closeModal}>
            <ReviewGuideline />
          </ReviewGuidelineModal>
        </DesktopOnly>
      </React.Fragment>
    );
  }
}
