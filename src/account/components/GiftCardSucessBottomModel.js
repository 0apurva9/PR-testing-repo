import React, { Component } from "react";
import GiftCardSucess from "./GiftCardSucess";
import BottomSlideModal from "../../general/components/BottomSlideModal";
import PropTypes from "prop-types";

export default class GiftCardSucessBottomModel extends Component {
  render() {
    return (
      <BottomSlideModal crossIconHide="true">
        <GiftCardSucess {...this.props} closeModal={this.props.closeModal} />
      </BottomSlideModal>
    );
  }
}

GiftCardSucessBottomModel.propTypes = {
  closeModal: PropTypes.func
};
