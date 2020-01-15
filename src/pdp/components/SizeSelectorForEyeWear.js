import React from "react";
import SlideModal from "../../general/components/SlideModal";
import CenterModal from "../../general/components/CenterModal";
import SizeGuideContainerForEyeWear from "../containers/SizeGuideContainerForEyeWear";
import MobileOnly from "../../general/components/MobileOnly";
import DesktopOnly from "../../general/components/DesktopOnly";
export default class SizeSelectorForEyeWear extends React.Component {
  render() {
    return (
      <React.Fragment>
        <MobileOnly>
          <SlideModal closeModal={this.props.closeModal}>
            <SizeGuideContainerForEyeWear {...this.props} />
          </SlideModal>
        </MobileOnly>
        <DesktopOnly>
          <CenterModal closeModal={this.props.closeModal}>
            <SizeGuideContainerForEyeWear {...this.props} />
          </CenterModal>
        </DesktopOnly>
      </React.Fragment>
    );
  }
}
