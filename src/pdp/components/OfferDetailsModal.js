import React from "react";

import SlideModal from "../../general/components/SlideModal";
import SmallCenterModal from "../../general/components/SmallCenterModal";
import OfferModal from "./OfferModal";
import MobileOnly from "../../general/components/MobileOnly";
import DesktopOnly from "../../general/components/DesktopOnly";
export default class OfferDetailsModal extends React.Component {
  render() {
    return (
      <React.Fragment>
        <MobileOnly>
          <SlideModal closeModal={this.props.closeModal}>
            <OfferModal {...this.props} />
          </SlideModal>
        </MobileOnly>
        <DesktopOnly>
          <SmallCenterModal closeModal={this.props.closeModal}>
            <OfferModal {...this.props} />
          </SmallCenterModal>
        </DesktopOnly>
      </React.Fragment>
    );
  }
}
