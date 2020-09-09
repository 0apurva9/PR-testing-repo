import React from "react";

import SlideModal from "../../../../../general/components/SlideModal";
import SmallCenterModal from "../../../../../general/components/SmallCenterModal";
import BeautyOfferModal from "./BeautyOfferModal";
import MobileOnly from "../../../../../general/components/MobileOnly";
import DesktopOnly from "../../../../../general/components/DesktopOnly";
export default class BeautyOfferDetailsModal extends React.Component {
  render() {
    return (
      <React.Fragment>
        <MobileOnly>
          <SlideModal closeModal={this.props.closeModal}>
            <BeautyOfferModal {...this.props} />
          </SlideModal>
        </MobileOnly>
        <DesktopOnly>
          <SmallCenterModal closeModal={this.props.closeModal}>
            <BeautyOfferModal {...this.props} />
          </SmallCenterModal>
        </DesktopOnly>
      </React.Fragment>
    );
  }
}
