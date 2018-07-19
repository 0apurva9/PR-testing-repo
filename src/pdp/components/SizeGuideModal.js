import React from "react";
import SlideModal from "../../general/components/SlideModal";
import CenterModal from "../../general/components/CenterModal";
import SizeGuideContainer from "../containers/SizeGuideContainer";
import MobileOnly from "../../general/components/MobileOnly";
import DesktopOnly from "../../general/components/DesktopOnly";
export default class SizeGuideModal extends React.Component {
  render() {
    return (
      <React.Fragment>
        <MobileOnly>
          <SlideModal closeModal={this.props.closeModal}>
            <SizeGuideContainer />
          </SlideModal>
        </MobileOnly>
        <DesktopOnly>
          <CenterModal closeModal={this.props.closeModal}>
            <SizeGuideContainer />
          </CenterModal>
        </DesktopOnly>
      </React.Fragment>
    );
  }
}
