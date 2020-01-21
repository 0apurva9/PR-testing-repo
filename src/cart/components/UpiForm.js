import React from "react";
import PropTypes from "prop-types";
import Input2 from "../../general/components/Input2.js";
import Button from "../../general/components/Button";
import DesktopOnly from "../../general/components/DesktopOnly";
import styles from "./UpiForm.css";
import upi_opt from "./img/upi_opt.svg";
import BottomSlideModal from "../../general/components/BottomSlideModal.js";
const invalidUpi = `Your UPI no longer seems to exist. Try another option.`;
const VERIFIED = `Verified`;
const INVALID = `Invalid`;
const UPI_REGEX = /^[A-Za-z0-9]+@[A-Za-z0-9]\w+$/;

export default class UpiForm extends React.Component {
  constructor(props) {
    super(props);
    // 'abcd@ybl','1234@ybl','8787989089@ksd','12124321290@okhdfc'
    this.state = {
      upiId: "",
      upiPatternVerified: false,
      isOfferAvailable: false,
      showUpiMsg: {
        upiId: "",
        isVerified: false,
        showLoader: false,
        text: ""
      },
      showTermsCondPopup: false,
      isNewUpi: true,
      savedUPIidResponse: [],
      UPIofferCalloutList: [],
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
      upiPatternVerified: UPI_REGEX.test(val),
      showUpiMsg: {
        upiId: "",
        isVerified: false,
        showLoader: false,
        text: ""
      }
    });
  };

  componentDidMount() {
    this.setState({
      savedUPIidResponse: this.props.savedUPIidResponse,
      UPIofferCalloutList: this.props.UPIofferCalloutList
    });
  }
  // componentDidUpdate(prevProps) {
  //   if (
  //     this.props.savedUPIidResponse &&
  //     this.props.savedUPIidResponse !== prevProps.savedUPIidResponse
  //   ) {
  //     this.setState({
  //       savedUPIidResponse: this.props.savedUPIidResponse,
  //       isNewUpi: true
  //     });
  //   }
  // }

  showTermsAndConditionPopup = () => {
    if (this.props.showTermsNConditions) {
      this.props.showTermsNConditions();
    }
  };
  showHowToPay = () => {
    if (this.props.showHowToPay) {
      this.props.showHowToPay();
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
        ? styles.verifiedIcon
        : styles.invalidIcon
      : "";
    let svdUpiLblHelperCls = this.state.showUpiMsg.upiId
      ? this.state.showUpiMsg.isVerified
        ? styles.verified
        : styles.svdUpErr
      : "";
    let verifiedStateHelperCls = this.state.showUpiMsg.upiId
      ? this.state.showUpiMsg.showLoader
        ? styles.invalidFrm
        : this.state.showUpiMsg.isVerified
          ? styles.verifiedFrm
          : styles.invalidFrm
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
              <div className={styles.upiSavedSec}>
                <div className={styles.svdUpiRow}>
                  <div className={styles.svdUpiInfoCol}>
                    <h4 className={styles.svdUpiHedTxt}>
                      Select from your saved UPI ID’s
                    </h4>
                    <div className={styles.flexRow50 + " " + styles.flexWrap}>
                      {this.state.savedUPIidResponse &&
                        this.state.savedUPIidResponse.map((ele, i) => (
                          <div className={styles.flexRow50Cols} key={i}>
                            <div className={styles.svdUpiLblBox}>
                              {this.state.showUpiMsg.upiId ===
                              ele.value.upiId ? (
                                <div
                                  className={
                                    styles.svdUpiLbl + " " + svdUpiLblHelperCls
                                  }
                                  onClick={() =>
                                    this.verifyUpi(ele.value.upiId)
                                  }
                                >
                                  {ele.value.upiId}
                                  <div
                                    className={
                                      styles.verifiedState +
                                      " " +
                                      verifiedStateHelperCls
                                    }
                                  >
                                    <span className={savedUpiVerificationCls} />{" "}
                                    {this.state.showUpiMsg.text}
                                  </div>
                                  {!this.state.showUpiMsg.isVerified &&
                                    !this.state.showUpiMsg.showLoader && (
                                      <p className={styles.errorTxt}>
                                        {invalidUpi}
                                      </p>
                                    )}
                                </div>
                              ) : (
                                <div
                                  className={styles.svdUpiLbl}
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

                      <div className={styles.flexRow50Cols}>
                        <button
                          type="button"
                          className={styles.addNewUpiBtn}
                          onClick={() => this.toggleForm()}
                        >
                          + Add new UPI ID
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className={styles.svdUpiBtnCol}>
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
              <div className={styles.flexRow50 + " " + styles.mb20}>
                <div className={styles.flexRow50Cols + " " + styles.upiBrdRgt}>
                  <img src={upi_opt} alt="imgg" />
                </div>
                <div className={styles.flexRow50Cols}>
                  <div className={styles.upiHedTxt}>
                    <p className={styles.upiHedTxt}>
                      UPI ID is in the format of mobilenumber@upi or
                      username@bank
                    </p>
                    <p
                      id={styles.howPymntWork}
                      onClick={() => this.showHowToPay()}
                    >
                      How UPI Payments work?
                    </p>
                  </div>
                </div>
              </div>
              <div className={styles.flexRow50New + " " + styles.mb20}>
                <div className={styles.flexRow50NewCols}>
                  <div className={styles.frmFeildRow}>
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
                        disabled={this.state.upiPatternVerified ? false : true}
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
                            styles.verifiedState + " " + verifiedStateHelperCls
                          }
                        >
                          <span className={savedUpiVerificationCls} />{" "}
                          {this.state.showUpiMsg.text}
                        </div>
                        {!this.state.showUpiMsg.isVerified &&
                          !this.state.showUpiMsg.showLoader && (
                            <p className={styles.errorTxt}>
                              Please enter a valid UPI ID
                            </p>
                          )}
                      </React.Fragment>
                    )}
                  </div>
                </div>
                <div className={styles.flexRow50NewCols}>
                  <div className={styles.upiPayBtnSec}>
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
              <div className={styles.upiTandCRow}>
                <p className={styles.upiInfoTxt}>
                  We will save your UPI address for a faster checkout. To remove
                  your details, visit my account.
                </p>
              </div>
              {this.props.savedUPIidResponse &&
                this.props.savedUPIidResponse.length !== 0 && (
                  <div
                    className={styles.upiTandCRow}
                    onClick={() => this.toggleForm()}
                  >
                    <p className={styles.upitncTxt + " " + styles.showSavedUpi}>
                      SHOW SAVED UPI ID’s
                    </p>
                  </div>
                )}
            </React.Fragment>
          )}

          {this.state.UPIofferCalloutList &&
            this.state.UPIofferCalloutList.map((offer, i) => (
              <div className={styles.upiTandCRow} key={i}>
                <p className={styles.lblTxt}>
                  {offer.promotionDisplayText}
                  <span
                    className={styles.upitncTxt}
                    onClick={() => this.showTermsAndConditionPopup()}
                  >
                    {offer.TnC ? offer.TnC : ""}
                  </span>
                </p>
                {/* <p className={styles.upitncTxt}>{offer.discountValidity}</p> */}
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
