import React from "react";
import SlideModal from "../../general/components/SlideModal";
import CenterModal from "../../general/components/CenterModal";
import ManufacturerDetails from "./ManufacturerDetails";
import MobileOnly from "../../general/components/MobileOnly";
import DesktopOnly from "../../general/components/DesktopOnly";

export default class ManufacturerDetailsModal extends React.Component {
  render() {
    return (
      <React.Fragment>
        <MobileOnly>
          <SlideModal closeModal={this.props.closeModal}>
            <ManufacturerDetails {...this.props} />
          </SlideModal>
        </MobileOnly>
        <DesktopOnly>
          <CenterModal closeModal={this.props.closeModal}>
            <ManufacturerDetails {...this.props} />
          </CenterModal>
        </DesktopOnly>
      </React.Fragment>
    );
  }
}
