import React from "react";
import PropTypes from "prop-types";
import Input2 from "../../general/components/Input2.js";
import DesktopOnly from "../../general/components/DesktopOnly";
import styles from "./UpiForm.css";
import upi_opt from "./img/upi_opt.svg";
import { format } from "date-fns";
import loader from "../../account/components/img/loader.svg";
import {
  setDataLayer,
  SET_DATA_LAYER_VERIFY_BUTTON_UPI,
  SET_DATA_LAYER_UID_SELECTION,
  SET_DATA_LAYER_UID_ADD,
  WHATSAPP_NOTIFICATION_CHECKED,
  WHATSAPP_NOTIFICATION_UNCHECKED,
  getWhatsAppNotification
} from "../../lib/adobeUtils";
const UPI_REGEX = /^[A-Za-z0-9_\-\.]+@[A-Za-z0-9]\w+$/;
const dateFormat = "DD MMM";
export const UPI_VPA = "upi_vpa";
const APPROVED_UPI_VPA = "APPROVED_UPI_VPA";

export default class UpiForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      upiId: "",
      upiPatternVerified: false,
      showUpiMsg: {
        upiId: "",
        isVerified: false,
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

  verifyUpi = async (ele, btnType) => {
    if (this.state.isNewUpi && this.state.upiId === "") {
      return this.props.displayToast(
        "Please verify your UPI Address to proceed"
      );
    } else if (this.state.isNewUpi && !UPI_REGEX.test(ele.trim())) {
      return;
    }
    let APPROVED_UPI = [];
    if (localStorage.getItem(APPROVED_UPI_VPA)) {
      APPROVED_UPI = JSON.parse(localStorage.getItem(APPROVED_UPI_VPA));
    }
    this.setState({
      upiId: ele,
      showUpiMsg: {
        upiId: ele
      },
      isChanged: false
    });
    localStorage.setItem(UPI_VPA, ele);
    const response = await this.props.addUPIDetails(ele, "checkout", btnType);
    if (
      response &&
      response.upiResponse &&
      response.upiResponse.status === "FAILURE" &&
      response.upiResponse.upiStatus === "INVALID"
    ) {
      this.setState({
        upiId: ele,
        showUpiMsg: {
          upiId: ele,
          text: response.upiResponse.error
        }
      });
    }
    if (
      response &&
      response.upiResponse &&
      response.upiResponse.upiStatus === "VALID" &&
      btnType === "input"
    ) {
      setDataLayer(SET_DATA_LAYER_VERIFY_BUTTON_UPI, "VALID");
    } else if (
      response &&
      response.upiResponse &&
      response.upiResponse.upiStatus === "VALID" &&
      btnType === "select"
    ) {
      setDataLayer(SET_DATA_LAYER_UID_SELECTION, "VALID");
      if (!APPROVED_UPI.includes(ele)) {
        APPROVED_UPI.push(ele);
        localStorage.setItem(APPROVED_UPI_VPA, JSON.stringify(APPROVED_UPI));
      }
    } else if (
      response &&
      response.upiResponse &&
      response.upiResponse.upiStatus === "INVALID" &&
      btnType === "select"
    ) {
      setDataLayer(SET_DATA_LAYER_UID_SELECTION, "INVALID");
    } else {
      setDataLayer(SET_DATA_LAYER_VERIFY_BUTTON_UPI, "INVALID");
    }
  };

  updateUpi = val => {
    this.setState({
      upiId: val.trim(),
      upiPatternVerified: UPI_REGEX.test(val.trim()),
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

  componentDidUpdate(prevProps) {
    if (prevProps.savedUPIidResponse !== this.props.savedUPIidResponse) {
      this.setState({
        savedUPIidResponse: this.props.savedUPIidResponse,
        UPIofferCalloutList: this.props.UPIofferCalloutList
      });
    }
  }

  showTermsAndConditionPopup = val => {
    if (this.props.showTermsNConditions) {
      this.props.showTermsNConditions(val);
    }
  };

  toggleForm = () => {
    if (this.props.addUPIDetailsNullState) {
      this.props.addUPIDetailsNullState();
    }
    this.setState({
      upiId: "",
      upiPatternVerified: false,
      isNewUpi: !this.state.isNewUpi,
      showUpiMsg: {
        upiId: "",
        isVerified: false,
        text: ""
      }
    });
    if (!this.state.isNewUpi) {
      setDataLayer(SET_DATA_LAYER_UID_ADD);
    }
  };

  onCheckout = payNowBtnFlag => {
    if (payNowBtnFlag) {
      this.props.displayToast("Please verify your UPI Address to proceed");
    } else if (this.props.onCheckout) {
      if (this.props.whatsappSelected && this.props.whatsappSelected === true) {
        getWhatsAppNotification(WHATSAPP_NOTIFICATION_CHECKED);
      } else if (
        this.props.whatsappSelected &&
        this.props.whatsappSelected === false
      ) {
        getWhatsAppNotification(WHATSAPP_NOTIFICATION_UNCHECKED);
      }
      this.props.onCheckout();
    }
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
    let combinedLogoUrl = this.props.combinedLogoUrl
      ? this.props.combinedLogoUrl
      : upi_opt;

    return (
      <div className={styles.base}>
        <DesktopOnly>
          {!this.state.isNewUpi && (
            <React.Fragment>
              <div className={styles.upiSavedSec}>
                <div className={styles.svdUpiRow}>
                  <div className={styles.svdUpiInfoCol}>
                    <h4 className={styles.svdUpiHedTxt}>
                      Select from your saved UPI IDs
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
                                        this.verifyUpi(
                                          ele.value.upiId,
                                          "select"
                                        )
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
                                            <img
                                              src={loader}
                                              alt="Loader"
                                              width="15px"
                                              height="15px"
                                            />
                                          )}
                                          {this.props.addUserUPIStatus !==
                                            "requesting" &&
                                            this.props.addUserUPIDetails &&
                                            this.props.addUserUPIDetails
                                              .upiStatus === "VALID" &&
                                            "Verified"}
                                          {this.props.addUserUPIStatus !==
                                            "requesting" &&
                                            this.props.addUserUPIDetails &&
                                            this.props.addUserUPIDetails
                                              .upiStatus === "INVALID" &&
                                            "Invalid"}
                                          {/* {this.state.showUpiMsg.text} */}
                                        </div>
                                        {this.props.addUserUPIDetails &&
                                          this.props.addUserUPIDetails
                                            .upiStatus === "INVALID" && (
                                            <p className={styles.errorTxt2}>
                                              {this.state.showUpiMsg.text}
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
                                        this.verifyUpi(
                                          ele.value.upiId,
                                          "select"
                                        );
                                      }}
                                    >
                                      <span className={styles.svdUpiSpan}>
                                        {ele.value.upiId}
                                      </span>
                                    </div>
                                  )}
                                </React.Fragment>
                              ) : (
                                <div
                                  className={styles.svdUpiLbl}
                                  onClick={() => {
                                    this.verifyUpi(ele.value.upiId, "select");
                                  }}
                                >
                                  <span className={styles.svdUpiSpan}>
                                    {ele.value.upiId}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}

                      <div className={styles.flexRow50Cols}>
                        <button
                          type="button"
                          className={styles.addNewUpiBtn}
                          onClick={() => this.toggleForm("")}
                        >
                          + Add new UPI ID
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className={styles.svdUpiBtnCol}>
                    <button
                      className={
                        !payNowBtnFlag
                          ? styles.payNowPointer + " " + styles.payNow
                          : styles.payNow
                      }
                      type="button"
                      style={{
                        background: payNowBtnFlag
                          ? "rgba(0,0,0,0.2)"
                          : "#FF1744"
                      }}
                      onClick={() => this.onCheckout(payNowBtnFlag)}
                    >
                      Pay Now
                    </button>
                  </div>
                </div>
              </div>
            </React.Fragment>
          )}
          {this.state.isNewUpi && (
            <React.Fragment>
              <div className={styles.flexRow50 + " " + styles.mb15}>
                <div className={styles.flexRow50Cols + " " + styles.upiBrdRgt}>
                  <img
                    src={combinedLogoUrl}
                    className={styles.combinedLogoUrl}
                    alt=""
                  />
                </div>
                <div className={styles.flexRow50Cols}>
                  <div className={styles.upiHedTxt}>
                    <p className={styles.upiHedTxt}>
                      UPI ID is in the format of mobilenumber@upi or
                      username@bank
                    </p>
                    <a
                      id={styles.howPymntWork}
                      // href="https://www.tatacliq.com/how-upi-works"
                      href={
                        this.props.howUpiWorksPageId
                          ? this.props.howUpiWorksPageId
                          : "how-upi-works"
                      }
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
                        // disabled={this.state.upiPatternVerified ? false : true}
                        className={styles.verifyBtn}
                        type="button"
                        style={{
                          background: !this.state.upiPatternVerified
                            ? "rgba(0,0,0,0.2)"
                            : "#FF1744"
                        }}
                        onClick={() =>
                          this.verifyUpi(this.state.upiId, "input")
                        }
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
                            <img
                              src={loader}
                              alt=""
                              width="15px"
                              height="15px"
                            />
                          )}
                          {this.props.addUserUPIStatus !== "requesting" &&
                            this.props.addUserUPIDetails &&
                            this.props.addUserUPIDetails.upiStatus ===
                              "INVALID" &&
                            "Invalid"}
                          {this.props.addUserUPIStatus !== "requesting" &&
                            this.props.addUserUPIDetails &&
                            this.props.addUserUPIDetails.upiStatus ===
                              "VALID" &&
                            "Verified"}
                        </div>
                        {this.props.addUserUPIDetails &&
                          this.props.addUserUPIDetails.upiStatus ===
                            "INVALID" &&
                          !this.props.loading && (
                            <p className={styles.errorTxt}>
                              {this.props.addUserUPIDetails.error
                                ? this.props.addUserUPIDetails.error
                                : this.props.addUserUPIDetails.error}
                            </p>
                          )}
                      </React.Fragment>
                    )}
                  </div>
                </div>
                <div className={styles.flexRow50NewCols}>
                  <div className={styles.upiPayBtnSec}>
                    <button
                      className={
                        !payNowBtnFlag
                          ? styles.payNowPointer + " " + styles.payNow
                          : styles.payNow
                      }
                      type="button"
                      style={{
                        background: payNowBtnFlag
                          ? "rgba(0,0,0,0.2)"
                          : "#FF1744"
                      }}
                      onClick={() => this.onCheckout(payNowBtnFlag)}
                    >
                      Pay Now
                    </button>
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
                      SHOW SAVED UPI IDs
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
                    className={styles.upitncTxt + " " + styles.upitncTxtLink}
                    onClick={() =>
                      this.showTermsAndConditionPopup(
                        offer.termsAndConditions ? offer.termsAndConditions : ""
                      )
                    }
                  >
                    {offer.termsAndConditions ? "T&C" : ""}
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
  onClick: PropTypes.func,
  displayToast: PropTypes.func,
  whatsappSelected: PropTypes.bool,
  addUserUPIStatus: PropTypes.string,
  onCheckout: PropTypes.func,
  loading: PropTypes.bool,
  addUPIDetails: PropTypes.func,
  showTermsNConditions: PropTypes.func,
  addUPIDetailsNullState: PropTypes.func,
  UPIofferCalloutList: PropTypes.array,
  howUpiWorksPageId: PropTypes.string,
  combinedLogoUrl: PropTypes.string,
  addUserUPIDetails: PropTypes.shape({
    upiStatus: PropTypes.string,
    error: PropTypes.string
  }),
  savedUPIidResponse: PropTypes.shape({
    length: PropTypes.string
  }),
};
