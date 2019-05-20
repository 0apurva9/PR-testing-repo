import React from "react";

import SlideModal from "../../general/components/SlideModal";
import TNCCenterModal from "../../general/components/TNCCenterModal";
import TermsNConditionsModal from "./TermsNConditionsModal";
import MobileOnly from "../../general/components/MobileOnly";
import DesktopOnly from "../../general/components/DesktopOnly";

export default class TermsNConditionsWrapperModal extends React.Component {
  render() {
    return (
      <React.Fragment>
        <MobileOnly>
          <SlideModal closeModal={this.props.closeModal}>
            <TermsNConditionsModal {...this.props} />
          </SlideModal>
        </MobileOnly>
        <DesktopOnly>
          <TNCCenterModal>
            <TermsNConditionsModal {...this.props} />
          </TNCCenterModal>
        </DesktopOnly>
      </React.Fragment>
    );
  }
}
