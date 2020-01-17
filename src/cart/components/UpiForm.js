import React from "react";
import PropTypes from "prop-types";
import Input2 from "../../general/components/Input2.js";
import Button from "../../general/components/Button";
import DesktopOnly from "../../general/components/DesktopOnly";
import styles from "./CreditCardForm.css";
import stylesx from "./UpiForm.css";
import MobileOnly from "../../general/components/MobileOnly";
import upi_opt from "./img/upi_opt.svg";
import BottomSlideModal from "../../general/components/BottomSlideModal.js";
const bankErrorMessage = `Your bank is currently unable to process payments due to a technical issue.`;
const invalidUpi = `Your UPI no longer seems to exist. Try another option.`;
const VERIFIED = `Verified`;
const INVALID = `Invalid`;

export default class UpiForm extends React.Component {
  constructor(props) {
    super(props);
    // 'abcd@ybl','1234@ybl','8787989089@ksd','12124321290@okhdfc'
    this.state = {
      upiId: "",
      isVerified: false,
      isOfferAvailable: false,
      showUpiMsg: {
        upiId: "",
        isVerified: false,
        showLoader: false,
        text: ""
      },
      showTermsCondPopup: false,
      isNewUpi: true,
      savedUpi: [],
      offerArray: [
        {
          discountText: "10% Instant Cashback on Google Pay transactions  T&C",
          discountValidity: "Offer valid till 12th January"
        },
        {
          discountText: "15% Cashback on Amazon Pay transactions  T&C",
          discountValidity: "This offer can be claimed only once per user"
        }
      ],
      error: ""
    };
  }

  /**
   * This functin will verify the status of the saved api
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
        savedUpi: this.props.savedUpi,
        isNewUpi: true
      });
    }
  }

  showTermsAndConditionPopup = () => {
    if (this.props.addGiftCard) {
      this.props.showHowToPay();
      // this.props.showTermsNConditions()
    }
  };

  toggleForm = () => {
    this.setState({
      isNewUpi: !this.state.isNewUpi,
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
    let svdUpiLblHelperCls = this.state.showUpiMsg.upiId
      ? this.state.showUpiMsg.isVerified
        ? stylesx.verified
        : stylesx.svdUpErr
      : "";
    let verifiedStateHelperCls = this.state.showUpiMsg.upiId
      ? this.state.showUpiMsg.showLoader
        ? stylesx.invalidFrm
        : this.state.showUpiMsg.isVerified
          ? stylesx.verifiedFrm
          : stylesx.invalidFrm
      : "";
    return (
      <div className={styles.base}>
        <DesktopOnly>
          {this.state.showTermsCondPopup && (
            <BottomSlideModal heading="KYC Verification">
              this is just text
            </BottomSlideModal>
          )}
          {!this.state.isNewUpi && (
            <React.Fragment>
              <div className={stylesx.upiSavedSec}>
                <div className={stylesx.svdUpiRow}>
                  <div className={stylesx.svdUpiInfoCol}>
                    <h4 className={stylesx.svdUpiHedTxt}>
                      Select from your saved UPI ID’s
                    </h4>
                    <div className={stylesx.flexRow50 + " " + stylesx.flexWrap}>
                      {this.state.savedUpi &&
                        this.state.savedUpi.map((ele, i) => (
                          <div className={stylesx.flexRow50Cols} key={i}>
                            <div className={stylesx.svdUpiLblBox}>
                              {this.state.showUpiMsg.upiId ===
                              ele.value.upiId ? (
                                <div
                                  className={
                                    stylesx.svdUpiLbl + " " + svdUpiLblHelperCls
                                  }
                                  onClick={() =>
                                    this.verifyUpi(ele.value.upiId)
                                  }
                                >
                                  {ele.value.upiId}
                                  <div
                                    className={
                                      stylesx.verifiedState +
                                      " " +
                                      verifiedStateHelperCls
                                    }
                                  >
                                    <span className={savedUpiVerificationCls} />{" "}
                                    {this.state.showUpiMsg.text}
                                  </div>
                                  {!this.state.showUpiMsg.isVerified &&
                                    !this.state.showUpiMsg.showLoader && (
                                      <p className={stylesx.errorTxt}>
                                        {invalidUpi}
                                      </p>
                                    )}
                                </div>
                              ) : (
                                <div
                                  className={stylesx.svdUpiLbl}
                                  onClick={() =>
                                    this.verifyUpi(ele.value.upiId)
                                  }
                                >
                                  {ele.value.upiId}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}

                      <div className={stylesx.flexRow50Cols}>
                        <button
                          type="button"
                          className={stylesx.addNewUpiBtn}
                          onClick={() => this.toggleForm()}
                        >
                          + Add new UPI ID
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className={stylesx.svdUpiBtnCol}>
                    <Button
                      disabled={this.state.showUpiMsg.isVerified ? false : true}
                      type="primary"
                      backgroundColor="#ff1744"
                      height={35}
                      label="Pay Now"
                      width={124}
                      borderRadius={22}
                      textStyle={{
                        color: "#FFF",
                        fontSize: 14
                      }}
                      onClick={val => this.verifyUpi(val)}
                    />
                  </div>
                </div>
              </div>
            </React.Fragment>
          )}
          {this.state.isNewUpi && (
            <React.Fragment>
              <div className={stylesx.flexRow50 + " " + stylesx.mb20}>
                <div
                  className={stylesx.flexRow50Cols + " " + stylesx.upiBrdRgt}
                >
                  <img src={upi_opt} alt="imgg" />
                </div>
                <div className={stylesx.flexRow50Cols}>
                  <div className={stylesx.upiHedTxt}>
                    <p className={stylesx.upiHedTxt}>
                      UPI ID is in the format of mobilenumber@upi or
                      username@bank
                    </p>
                    <p
                      id={stylesx.howPymntWork}
                      onClick={() => this.showTermsAndConditionPopup()}
                    >
                      How UPI Payments work?
                    </p>
                  </div>
                </div>
              </div>
              <div className={stylesx.flexRow50New + " " + stylesx.mb20}>
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
                    {this.state.showUpiMsg.upiId === "" && (
                      <Button
                        disabled={this.state.upiId ? false : true}
                        type="primary"
                        isUpi={true}
                        backgroundColor="#ff1744"
                        height={35}
                        label="Verify"
                        width={77}
                        borderRadius={5}
                        textStyle={{
                          color: "#FFF",
                          fontSize: 14
                        }}
                        onClick={val => this.verifyUpi(val)}
                      />
                    )}
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
                      disabled={this.state.showUpiMsg.isVerified ? false : true}
                      type="primary"
                      backgroundColor="#ff1744"
                      height={35}
                      label="Pay Now"
                      width={124}
                      borderRadius={22}
                      textStyle={{
                        color: "#FFF",
                        fontSize: 14
                      }}
                      onClick={val => this.verifyUpi(val)}
                    />
                  </div>
                </div>
              </div>
              <div className={stylesx.upiTandCRow}>
                <p className={stylesx.upiInfoTxt}>
                  We will save your UPI address for a faster checkout. To remove
                  your details, visit my account.
                </p>
              </div>
              <div
                className={stylesx.upiTandCRow}
                onClick={() => this.toggleForm()}
              >
                <p className={stylesx.upitncTxt + " " + stylesx.showSavedUpi}>
                  SHOW SAVED UPI ID’s
                </p>
              </div>
            </React.Fragment>
          )}

          {this.state.offerArray &&
            this.state.offerArray.map((offer, i) => (
              <div className={stylesx.upiTandCRow} key={i}>
                <p className={stylesx.lblTxt}>{offer.discountText}</p>
                <p className={stylesx.upitncTxt}>{offer.discountValidity}</p>
              </div>
            ))}
        </DesktopOnly>
      </div>
    );
  }
}
UpiForm.propTypes = {
  placeholder: PropTypes.string,
  onClick: PropTypes.func
};
