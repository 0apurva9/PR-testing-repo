import React from "react";
import PropTypes from "prop-types";
import Input2 from "../../general/components/Input2.js";
import Button from "../../general/components/Button";
import DesktopOnly from "../../general/components/DesktopOnly";
// import styles from "../../cart/components/CreditCardForm.css";
import stylesx from "./MyAccountUpiForm.css";
import upi_opt from "../../cart/components/img/upi_opt.svg";
import BottomSlideModal from "../../general/components/BottomSlideModal.js";
const invalidUpi = `Your UPI no longer seems to exist. Try another option.`;
const VERIFIED = `Verified`;
const INVALID = `Invalid`;
const UPI_REGEX = /^[A-Za-z0-9]+@[A-Za-z0-9]\w+$/;

export default class MyAccountUpiForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      upiId: "",
      upiPatternVerified: false,
      isVerified: false,
      isOfferAvailable: false,
      showUpiMsg: {
        upiId: "",
        isVerified: false,
        showLoader: false,
        text: ""
      },
      showTermsCondPopup: false,
      savedUpi: [],
      error: ""
    };
  }

  /**
   * This function will verify the status of the saved api
   */
  verifyUpi = ele => {
    this.setState({
      showUpiMsg: {
        upiId: ele,
        showLoader: true,
        text: "loader"
      }
    });
    setTimeout(() => {
      this.setState({
        showUpiMsg: {
          upiId: ele,
          isVerified: false,
          showLoader: false,
          text: INVALID
        }
      });
    }, 2000);
  };

  updateUpi = val => {
    this.setState({
      upiId: val,
      upiPatternVerified: UPI_REGEX.test(val),
      showUpiMsg: {
        upiId: "",
        isVerified: false,
        showLoader: false,
        text: ""
      }
    });
  };

  componentDidUpdate(prevProps) {
    if (
      this.props.savedUpi !== prevProps.savedUpi &&
      this.props.savedUpi.length !== 0
    ) {
      this.setState({
        savedUpi: this.props.savedUpi
      });
    }
  }

  // showHowToPay = () => {
  //   if (this.props.showHowToPay) {
  //     this.props.showHowToPay();
  //   }
  // };

  toggleForm = () => {
    this.setState({
      showUpiMsg: {
        upiId: "",
        isVerified: false,
        showLoader: false,
        text: ""
      }
    });
  };

  render() {
    let savedUpiVerificationCls = this.state.showUpiMsg.upiId
      ? this.state.showUpiMsg.isVerified
        ? stylesx.verifiedIcon
        : stylesx.invalidIcon
      : "";
    let verifiedStateHelperCls = this.state.showUpiMsg.upiId
      ? this.state.showUpiMsg.showLoader
        ? stylesx.invalidFrm
        : this.state.showUpiMsg.isVerified
          ? stylesx.verifiedFrm
          : stylesx.invalidFrm
      : "";
    return (
      <div className={stylesx.base}>
        <DesktopOnly>
          {this.state.showTermsCondPopup && (
            <BottomSlideModal heading="KYC Verification">
              this is just text
            </BottomSlideModal>
          )}
          <div
            className={
              stylesx.flexRow50 + " " + stylesx.mb20 + " " + stylesx.mainHed
            }
          >
            <b>Add a new UPI ID</b>
          </div>
          <div className={stylesx.flexRow50 + " " + stylesx.mb20}>
            <div className={stylesx.flexRow50Cols}>
              <img src={upi_opt} alt="imgg" />
            </div>
          </div>
          <div className={stylesx.upiHedTxt}>
            <p className={stylesx.upiHedTxt}>
              UPI ID is in the format of mobilenumber@upi or username@bank
            </p>
            {/* <p id={stylesx.howPymntWork} onClick={() => this.showHowToPay()}> */}
            <a
              id={stylesx.howPymntWork}
              href="https://www.tatacliq.com/how-upi-works"
              target="_blank"
              rel="noopener noreferrer"
            >
              How UPI Payments work?
            </a>
            {/* </p> */}
          </div>
          <div className={stylesx.flexRow50NewCols}>
            <div className={stylesx.frmFeildRow}>
              <Input2
                placeholder="Enter your registered UPI ID*"
                value={this.state.upiId}
                boxy={true}
                onChange={val => this.updateUpi(val)}
                textStyle={{ fontSize: 14 }}
                height={45}
              />
              {this.state.showUpiMsg.upiId && (
                <React.Fragment>
                  <div
                    className={
                      stylesx.verifiedState + " " + verifiedStateHelperCls
                    }
                  >
                    <span className={savedUpiVerificationCls} />{" "}
                    {this.state.showUpiMsg.text}
                  </div>
                  {!this.state.showUpiMsg.isVerified &&
                    !this.state.showUpiMsg.showLoader && (
                      <p className={stylesx.errorTxt}>
                        Please enter a valid UPI ID
                      </p>
                    )}
                </React.Fragment>
              )}
            </div>
          </div>
          <div className={stylesx.flexRow50NewCols}>
            <div className={stylesx.upiPayBtnSec}>
              <Button
                disabled={this.state.upiPatternVerified ? false : true}
                type="primary"
                backgroundColor="#ff1744"
                height={40}
                label="Verify & Save"
                width={152}
                borderRadius={20}
                float="left"
                textStyle={{
                  color: "#FFF",
                  fontSize: 14
                }}
                onClick={val => this.verifyUpi(val)}
              />
              <Button
                type="hollow"
                backgroundColor="#ff1744"
                height={35}
                label="Cancel"
                width={160}
                borderRadius={22}
                borderColor={``}
                border={``}
                textStyle={{
                  color: "#FFF",
                  fontSize: 14,
                  fontFamily: "regular"
                }}
                onClick={val => this.verifyUpi(val)}
              />
            </div>
          </div>
        </DesktopOnly>
      </div>
    );
  }
}
MyAccountUpiForm.propTypes = {
  placeholder: PropTypes.string,
  onClick: PropTypes.func
};
