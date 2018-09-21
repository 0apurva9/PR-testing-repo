import React from "react";
import KycApplicationForm from "./KycApplicationForm";
import BottomSlideModal from "../../general/components/BottomSlideModal";
import PropTypes from "prop-types";

export default class KycApplicationFormWithBottomSlideModal extends React.Component {
  generateOtp(value) {
    if (this.props.generateOtp) {
      return this.props.generateOtp(value);
    }
  }
  onCancel() {
    if (this.props.closeModal) {
      this.props.closeModal();
    }
  }

  displayToast = message => {
    if (this.props.displayToast) {
      this.props.displayToast(message);
    }
  };
  render() {
    return (
      <BottomSlideModal
        heading="KYC Verification"
        closeModal={value => this.onCancel()}
      >
        <KycApplicationForm
          onCancel={value => this.onCancel()}
          generateOtp={value => this.generateOtp(value)}
          mobileNumber={this.props.mobileNumber}
          loadingForGetOtpToActivateWallet={
            this.props.loadingForGetOtpToActivateWallet
          }
          displayToast={message => this.displayToast(message)}
        />
      </BottomSlideModal>
    );
  }
}
KycApplicationFormWithBottomSlideModal.propTypes = {
  mobileNumber: PropTypes.string,
  generateOtp: PropTypes.func
};
