import React from "react";
import ReactDOM from "react-dom";
import ModalPanel from "./ModalPanel";
import RestorePassword from "../../auth/components/RestorePassword";
import OtpVerification from "../../auth/components/OtpVerification";
import ConnectDetailsWithModal from "../../home/components/ConnectDetailsWithModal";
import Sort from "../../plp/components/SortModal";
import AddressModal from "../../plp/components/AddressModal";
const modalRoot = document.getElementById("modal-root");
export default class ModalRoot extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement("div");
    this.state = {
      loggedIn: false
    };
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  handleClose() {
    if (this.props.hideModal) {
      this.props.hideModal();
    }
  }

  submitOtp(otpDetails) {
    this.props.otpVerification(otpDetails, this.props.ownProps);
    this.props.hideModal();
  }

  resetPassword(userDetails) {
    this.props.resetPassword(userDetails);
    this.props.hideModal();
  }

  handleRestoreClick(userDetails) {
    this.props.forgotPassword(userDetails);
    this.props.hideModal();
  }

  submitOtpForgotPassword(otpDetails) {
    this.props.forgotPasswordOtpVerification(otpDetails, this.props.ownProps);
    this.props.hideModal();
  }
  render() {
    const MODAL_COMPONENTS = {
      RestorePassword: (
        <RestorePassword
          handleCancel={() => this.handleClose()}
          handleRestoreClick={userId => this.handleRestoreClick(userId)}
        />
      ),
      SignUpOtpVerification: (
        <OtpVerification
          closeModal={() => this.handleClose()}
          submitOtp={otpDetails => this.submitOtp(otpDetails)}
        />
      ),
      ForgotPasswordOtpVerification: (
        <OtpVerification
          closeModal={() => this.handleClose()}
          submitOtp={otpDetails => this.submitOtpForgotPassword(otpDetails)}
        />
      ),
      Sort: <Sort />,
      Address: (
        <AddressModal
          closeModal={() => this.handleClose()}
          {...this.props.ownProps}
        />
      ),
      ConnectDetails: (
        <ConnectDetailsWithModal
          closeModal={() => this.handleClose()}
          {...this.props.ownProps}
        />
      )
    };

    let SelectedModal = MODAL_COMPONENTS[this.props.modalType];

    const Modal = this.props.modalStatus ? (
      <ModalPanel
        closeModal={() => {
          this.handleClose();
        }}
      >
        {SelectedModal}
      </ModalPanel>
    ) : null;

    return ReactDOM.createPortal(Modal, this.el);
  }
}
