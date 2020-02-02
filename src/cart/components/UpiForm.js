import React from "react";
import PropTypes from "prop-types";
import Input2 from "../../general/components/Input2.js";
import Button from "../../general/components/Button";
import DesktopOnly from "../../general/components/DesktopOnly";
import styles from "./UpiForm.css";
import upi_opt from "./img/upi_opt.svg";
import BottomSlideModal from "../../general/components/BottomSlideModal.js";
import { format } from "date-fns";
import loader from "../../account/components/img/loader.gif";
// import { LocalStorage } from "node-localstorage";
const invalidUpi = `Your UPI no longer seems to exist. Try another option.`;
const VALID = `Verified`;
const INVALID = `Invalid`;
const UPI_REGEX = /^[A-Za-z0-9]+@[A-Za-z0-9]\w+$/;
const dateFormat = "DD MMM";
export const UPI_VPA = "upi_vpa";

export default class UpiForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      upiId: "",
      upiPatternVerified: false,
      showUpiMsg: {
        upiId: "",
        isVerified: false,
        // showLoader: false,
        text: ""
      },
      isChanged: false,
      showTermsCondPopup: false,
      isNewUpi: true,
      savedUPIidResponse: [],
      UPIofferCalloutList: [],
      error: ""
    };
  }

  verifyUpi = async ele => {
    debugger;
    this.setState({
      showUpiMsg: {
        upiId: ele
      },
      isChanged: false
    });
    const response = await this.props.addUPIDetails(ele, "checkout");
    if (
      this.props &&
      this.props.addUserUPIDetails &&
      this.props.addUserUPIDetails.upiStatus === "VALID"
    ) {
      localStorage.setItem(
        UPI_VPA,
        this.state.upiId || this.state.showUpiMsg.upiId
      );
    }

    // if (
    //   response &&
    //   response.upiResponse &&
    //   response.upiResponse.upiStatus === "VALID"
    // ) {
    //   this.setState({
    //     isChanged: false
    //   });
    // }
  };

  updateUpi = val => {
    this.setState({
      upiId: val,
      upiPatternVerified: UPI_REGEX.test(val),
      showUpiMsg: {
        upiId: "",
        isVerified: false,
        text: ""
      },
      isChanged: true
    });
  };

  componentDidMount() {
    this.setState({
      savedUPIidResponse: this.props.savedUPIidResponse,
      UPIofferCalloutList: this.props.UPIofferCalloutList,
      isNewUpi: this.props.savedUPIidResponse.length ? false : true
    });
  }

  showTermsAndConditionPopup = () => {
    if (this.props.showTermsNConditions) {
      this.props.showTermsNConditions();
    }
  };

  toggleForm = () => {
    if (this.props.addUPIDetailsNullState) {
      this.props.addUPIDetailsNullState();
    }
    this.setState({
      isNewUpi: !this.state.isNewUpi,
      showUpiMsg: {
        upiId: "",
        isVerified: false,
        text: ""
      }
    });
  };

  render() {
    let payNowBtnFlag = !(
      !this.state.isChanged &&
      this.props.addUserUPIDetails &&
      this.props.addUserUPIDetails.upiStatus === "VALID"
    );
    let savedUpiVerificationCls =
      this.props.addUserUPIStatus &&
      this.props.addUserUPIStatus !== "requesting"
        ? this.props.addUserUPIDetails &&
          this.props.addUserUPIDetails.upiStatus === "VALID"
          ? styles.verifiedIcon
          : styles.invalidIcon
        : "";
    let svdUpiLblHelperCls =
      this.props.addUserUPIStatus !== "requesting"
        ? this.props.addUserUPIDetails &&
          this.props.addUserUPIDetails.upiStatus === "VALID"
          ? styles.verified
          : styles.svdUpErr
        : "";
    let verifiedStateHelperCls =
      this.props.addUserUPIStatus !== "requesting"
        ? this.props.loading
          ? styles.invalidFrm
          : this.props.addUserUPIDetails &&
            this.props.addUserUPIDetails.upiStatus === "VALID"
            ? styles.verifiedFrm
            : styles.invalidFrm
        : "";
    return (
      <div className={styles.base}>
        <DesktopOnly>
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
                              {this.props.addUserUPIStatus === "requesting" ||
                              this.props.addUserUPIStatus === "error" ||
                              (this.props.addUserUPIDetails &&
                                (this.props.addUserUPIDetails.upiStatus ===
                                  "VALID" ||
                                  this.props.addUserUPIDetails.upiStatus ===
                                    "INVALID")) ? (
                                <React.Fragment>
                                  {this.state.showUpiMsg.upiId ===
                                    ele.value.upiId && (
                                    <div
                                      className={
                                        styles.svdUpiLbl +
                                        " " +
                                        svdUpiLblHelperCls
                                      }
                                      onClick={() =>
                                        this.verifyUpi(ele.value.upiId)
                                      }
                                    >
                                      {ele.value.upiId}
                                      <React.Fragment>
                                        <div
                                          className={
                                            styles.verifiedState +
                                            " " +
                                            verifiedStateHelperCls
                                          }
                                        >
                                          <span
                                            className={savedUpiVerificationCls}
                                          />{" "}
                                          {this.props.addUserUPIStatus ===
                                            "requesting" && (
                                            <img src={loader} alt="Loader" />
                                          )}
                                          {this.props.addUserUPIDetails &&
                                            this.props.addUserUPIDetails
                                              .upiStatus === "VALID" &&
                                            "Verified"}
                                          {/* {this.state.showUpiMsg.text} */}
                                        </div>
                                        {this.props.addUserUPIDetails &&
                                          this.props.addUserUPIDetails
                                            .upiStatus === "INVALID" && (
                                            <p className={styles.errorTxt2}>
                                              {invalidUpi}
                                            </p>
                                          )}
                                      </React.Fragment>
                                    </div>
                                  )}
                                  {this.state.showUpiMsg.upiId !==
                                    ele.value.upiId && (
                                    <div
                                      className={styles.svdUpiLbl}
                                      onClick={() => {
                                        this.verifyUpi(ele.value.upiId);
                                      }}
                                    >
                                      {ele.value.upiId}
                                    </div>
                                  )}
                                </React.Fragment>
                              ) : (
                                <div
                                  className={styles.svdUpiLbl}
                                  onClick={() => {
                                    this.verifyUpi(ele.value.upiId);
                                  }}
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
                      disabled={payNowBtnFlag}
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
                      onClick={() => this.props.onCheckout()}
                    />
                  </div>
                </div>
              </div>
            </React.Fragment>
          )}
          {this.state.isNewUpi && (
            <React.Fragment>
              <div className={styles.flexRow50 + " " + styles.mb15}>
                <div className={styles.flexRow50Cols + " " + styles.upiBrdRgt}>
                  <img src={upi_opt} alt="imgg" />
                </div>
                <div className={styles.flexRow50Cols}>
                  <div className={styles.upiHedTxt}>
                    <p className={styles.upiHedTxt}>
                      UPI ID is in the format of mobilenumber@upi or
                      username@bank
                    </p>
                    <a
                      id={styles.howPymntWork}
                      href="https://www.tatacliq.com/how-upi-works"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      How UPI Payments work?
                    </a>
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
                    {this.state.isChanged || this.state.upiId === "" ? (
                      <button
                        disabled={this.state.upiPatternVerified ? false : true}
                        className={styles.verifyBtn}
                        type="button"
                        style={{
                          background: !this.state.upiPatternVerified
                            ? "rgba(0,0,0,0.2)"
                            : "#FF1744"
                        }}
                        onClick={() => this.verifyUpi(this.state.upiId)}
                      >
                        Verify
                      </button>
                    ) : (
                      <React.Fragment>
                        <div
                          className={
                            styles.verifiedState + " " + verifiedStateHelperCls
                          }
                        >
                          <span className={savedUpiVerificationCls} />{" "}
                          {this.props.addUserUPIStatus === "requesting" && (
                            <img src={loader} alt="Loader" />
                          )}
                          {this.props.addUserUPIStatus !== "requesting" &&
                            this.props.addUserUPIDetails &&
                            this.props.addUserUPIDetails.upiStatus}
                        </div>
                        {this.props.addUserUPIDetails &&
                          this.props.addUserUPIDetails.upiStatus ===
                            "INVALID" &&
                          !this.props.loading && (
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
                      disabled={payNowBtnFlag}
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
                      onClick={() => this.props.onCheckout()}
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
                <p className={styles.upitncTxt}>
                  {offer.endDateAndTime && (
                    <div className={styles.offerValidTill}>
                      Offer valid till{" "}
                      {format(offer.endDateAndTime, dateFormat)}
                    </div>
                  )}
                </p>
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
