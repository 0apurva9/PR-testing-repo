import React from "react";
import CenterModal from "../../general/components/CenterModal";
import ReviewGuideline from "./ReviewGuideline";
import DesktopOnly from "../../general/components/DesktopOnly";

export default class ReviewGuidelineModal extends React.Component {
  render() {
    return (
      <React.Fragment>
        <DesktopOnly>
          <CenterModal closeModal={this.props.closeModal}>
            <ReviewGuideline />
          </CenterModal>
        </DesktopOnly>
      </React.Fragment>
    );
  }
}
