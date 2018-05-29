import React from "react";
import Icon from "../../xelpmoc-core/Icon";
import ColourButton from "../../general/components/ColourButton";
import PropTypes from "prop-types";
import lockBlackIcon from "./img/lockBlackIcon.svg";
import Styles from "./KycDetailsPopup.css";
import Input2 from "../../general/components/Input2";
import SecondaryLoader from "../../general/components/SecondaryLoader";
export default class KycDetailsPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: this.props.otp ? this.props.otp : ""
    };
  }

  resendOtp() {
    if (this.props.resendOtp) {
      this.props.resendOtp();
    }
  }

  submitOtp() {
    if (this.props.submitOtp) {
      this.props.submitOtp(this.state.otp);
    }
  }
  wrongNumber() {
    if (this.props.wrongNumber) {
      this.props.wrongNumber();
    }
  }

  render() {
    return (
      <div className={Styles.base}>
        <div className={Styles.header}>
          Verify Phone number to complete KYC Details
        </div>
        <div className={Styles.iconHolder}>
          <Icon image={lockBlackIcon} size={50} />
        </div>
        <div className={Styles.content}>
          Waiting to automatically detect an SMS sent to
          <span className={Styles.number}> {this.props.mobileNumber}.</span>
          <span className={Styles.span} onClick={() => this.wrongNumber()}>
            Wrong number?
          </span>
        </div>
        <div className={Styles.input}>
          <Input2
            borderColor="#fff"
            placeholder={"Enter 6-digit code"}
            styles={{ color: "#000000" }}
            onChange={otp => this.setState({ otp })}
            onlyNumber={true}
            maxLength={6}
          />
        </div>
        <div className={Styles.buttonHolder}>
          <div className={Styles.leftButton}>
            {this.props.loadingForVerifyWallet && (
              <div className={Styles.spinner}>
                <SecondaryLoader />
              </div>
            )}
            {!this.props.loadingForVerifyWallet && (
              <ColourButton label={"Submit"} onClick={() => this.submitOtp()} />
            )}
          </div>
          <div className={Styles.rightButton}>
            <ColourButton
              label={"Resend OTP"}
              onClick={() => this.resendOtp()}
            />
          </div>
        </div>
      </div>
    );
  }
}
KycDetailsPopup.propTypes = {
  mobileNumber: PropTypes.string,
  wrongNumber: PropTypes.func,
  resendOtp: PropTypes.func
};

KycDetailsPopup.defaultProps = {
  mobileNumber: ""
};
