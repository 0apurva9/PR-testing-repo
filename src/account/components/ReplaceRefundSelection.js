import React from "react";
import { Redirect } from "react-router-dom";
import OrderCard from "./OrderCard";
import SelectReturnDate from "./SelectReturnDate";
import ReturnsFrame from "./ReturnsFrame";
import PropTypes from "prop-types";
import Button from "../../general/components/Button";
import styles from "./ReplaceRefundSelection.css";
import BankDetailsV2 from "../../account/components/BankDetailsV2";
import Instant from "../../general/components/img/pathCopy7.png";
import Icon from "../../xelpmoc-core/Icon";
import SelectedReasonForReturn from "../../account/components/SelectedReasonForReturn";
import cancel from "../../general/components/img/canceltransperent.png";
import {
  QUICK_DROP,
  SCHEDULED_PICKUP,
  SELF_COURIER,
  RETURNS_PREFIX,
  RETURN_LANDING,
  RETURNS_REASON,
  RETURNS_MODES,
  RETURNS_STORE_BANK_FORM
} from "../../lib/constants";

export default class ReplaceRefundSelection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showRefundOptions: false,
      selectedOption: "",
      agreeToReturn: false,
      showBankDetails: false,
      customerBankDetails: "",
      //addBankDetailsPage: false
      cliqCashCheckSuccess: false,
      uploadedImageFiles: "",
      showAttachment: false
    };
    this.radioChange = this.radioChange.bind(this);
    this.agreeToReturnDetails = this.agreeToReturnDetails.bind(this);
  }

  componentDidMount() {
    let orderId = this.props.data.sellerorderno;
    let transactionId = this.props.data.transactionId;
    let returnReasonCode = this.props.data.returnReasonCode;
    let returnSubReasonCode = this.props.data.subReasonCode;
    let comments = this.props.data.comment;
    let uploadedImageURLs = this.props.data.validImgFiles;
    let reverseSealAvailability = this.props.data.reverseSeal;
    this.props.getRefundOptionsData(
      orderId,
      transactionId,
      returnReasonCode,
      returnSubReasonCode,
      comments,
      uploadedImageURLs,
      reverseSealAvailability
    );
    //console.log("PROPS DETAILS:", this.props);
    //if bank data already present show it - coming from update bank details screen
    if (Object.keys(this.props.bankDetail).length !== 0) {
      this.setState({ showRefundOptions: true });
      this.setState({ selectedOption: "BANK_ACCOUNT" });
      this.setState({ showBankDetails: true });
    } else {
      this.setState({ showBankDetails: false });
    }
    if (
      this.props.data.showImageUpload == true &&
      this.props.data.validImgFiles == ""
    ) {
      this.setState({ showAttachment: true });
    } else {
      this.setState({ showAttachment: false });
    }
  }

  async radioChange(e) {
    const target = e.currentTarget;
    this.setState({ selectedOption: target.value });
    //console.log("e in radio:", target.value);
    //cliq cash
    if (target.value === "CLIQ_CASH") {
      let cliqCashCheck = await this.props.getCliqCashDetailsRefund();
      if (
        cliqCashCheck.status === "Success" &&
        (cliqCashCheck.isWalletCreated && cliqCashCheck.isWalletOtpVerified)
      ) {
        this.setState({ cliqCashCheckSuccess: true });
      } else {
        this.setState({ selectedOption: "" });
      }
    } else {
      //bank account
      // if (target.value === "BANK_TO_SOURCE") {
      let getCustomerBankDetailsResponse = await this.props.getCustomerBankDetails();
      //console.log("get Bank Details:", getCustomerBankDetailsResponse, this.state.showBankDetails)
      if (
        getCustomerBankDetailsResponse &&
        getCustomerBankDetailsResponse.error === "Failure"
      ) {
        //add details
        this.setState({ showBankDetails: false });
      } else {
        let currentBankDetails =
          getCustomerBankDetailsResponse.getCustomerBankDetails;
        currentBankDetails.ifscCode = currentBankDetails.IFSCCode;
        //delete currentBankDetails.IFSCCode;
        //show details
        this.setState({
          showBankDetails: true,
          customerBankDetails: currentBankDetails
        });
      }
    }
  }

  addBankDetails(data) {
    //console.log("bankDetails on update:", data);
    this.setState({ showAttachment: false });
    this.props.history.push({
      pathname: `${RETURNS_PREFIX}/${
        this.props.data.sellerorderno
      }${RETURN_LANDING}${RETURNS_STORE_BANK_FORM}`,
      state: {
        authorizedRequest: true,
        bankData: data,
        orderId: this.props.data.sellerorderno
      }
    });
  }

  navigateToReturnLanding() {
    return (
      <Redirect
        to={`${RETURNS_PREFIX}/${
          this.orderCode
        }${RETURN_LANDING}${RETURNS_REASON}`}
      />
    );
  }
  showRefund() {
    if (!this.state.showRefundOptions) {
      //get details
      let orderId = this.props.data.sellerorderno;
      let transactionId = this.props.data.transactionId;
      let returnId = this.props.getRefundOptionsDetails.returnId;
      let typeOfReturn = this.props.getRefundOptionsDetails.typeOfReturn[0]
        .typeOfReturnCode;
      this.props.getRefundModes(orderId, transactionId, returnId, typeOfReturn);
      //show hide
      this.setState({ showRefundOptions: true });
    } else {
      this.setState({ showRefundOptions: false });
    }
  }

  agreeToReturnDetails(e) {
    if (e.target.checked) {
      this.setState({ agreeToReturn: true });
    } else {
      this.setState({ agreeToReturn: false });
    }
  }

  async onSubmit() {
    if (!this.state.selectedOption) {
      return this.props.displayToast("Please select refund mode");
    }
    if (!this.state.agreeToReturn) {
      return this.props.displayToast("Please check the agreement to proceed");
    }
    //back to source
    if (this.state.selectedOption === "BACK_TO_SOURCE") {
      this.goToRefundModesPage();
    }
    //cliq cash
    if (this.state.selectedOption === "CLIQ_CASH") {
      if (this.state.cliqCashCheckSuccess) {
        this.goToRefundModesPage();
      }
    }
    //bank account
    if (this.state.selectedOption === "BANK_ACCOUNT") {
      this.goToRefundModesPage();
    }
  }

  async goToRefundModesPage() {
    if (this.state.selectedOption && this.state.agreeToReturn) {
      let orderId = this.props.data.sellerorderno;
      let transactionId = this.props.data.transactionId;
      let returnId = this.props.getRefundOptionsDetails.returnId;
      let refundMode = this.state.selectedOption;
      console.log(refundMode);
      const updateRefundModeResponse = await this.props.updateRefundMode(
        orderId,
        transactionId,
        returnId,
        refundMode
      );
      console.log(updateRefundModeResponse);
      //move to next screen on success
      if (
        updateRefundModeResponse &&
        updateRefundModeResponse.status === "success"
      ) {
        this.props.history.push({
          pathname: `${RETURNS_PREFIX}/${
            this.orderCode
          }${RETURN_LANDING}${RETURNS_MODES}`,
          state: {
            authorizedRequest: true
          }
        });
      }
    }
  }
  changeReturnReason() {
    if (this.props.changeReturnReason) {
      this.props.changeReturnReason();
    }
  }
  handleFileUpload(e) {
    let uploadedFilesArr = Array.from(e.target.files);
    //console.log("uploadedArrayFiles:", uploadedFilesArr);
    if (uploadedFilesArr.length > 8) {
      return this.props.displayToast("Upload maximum 8 images");
    }
    let imgArray = [];
    let validImageFiles = [];
    uploadedFilesArr.map((value, index) => {
      if (!value.type.includes("image")) {
        return this.props.displayToast("Upload file in image file format only");
      }
      if (!value.type.includes("jpeg")) {
        if (!value.type.includes("png")) {
          return this.props.displayToast(
            "Upload image in JPEG/PNG format only"
          );
        }
      }
      if (value.size > 2500000) {
        return this.props.displayToast(
          "The Image size should be lesser than 2.5MB"
        );
      }
      let eachImgSrc = URL.createObjectURL(value);
      imgArray.push(eachImgSrc);
      validImageFiles.push(value);
    });
    this.setState({ uploadedImageFiles: imgArray });
    this.setState({ validImgFiles: validImageFiles });
    console.log(
      "uploadedImageFiles arrays:",
      this.state.uploadedImageFiles,
      this.state.validImgFiles
    );
  }
  removeFile(filename, indexOfRemovedFile) {
    let fileNames = this.state.uploadedImageFiles;
    let index = fileNames.indexOf(filename);
    if (index > -1) {
      fileNames.splice(index, 1);
      this.setState({ uploadedImageFiles: fileNames });
    }
    let updatedValidImgFiles = this.state.validImgFiles;
    if (indexOfRemovedFile > -1) {
      updatedValidImgFiles.splice(indexOfRemovedFile, 1);
      this.setState({ validImgFiles: updatedValidImgFiles });
    }
  }
  onContinueImageUpload() {
    if (this.state.validImgFiles.length > 0) {
      let reasonAndCommentObj: data = Object.assign({
        returnReasonCode: this.props.data.returnReasonCode,
        subReasonCode: this.props.data.subReasonCode,
        subReason: this.props.data.subReason,
        comment: this.props.data.comment,
        reason: this.props.data.reason,
        reverseSeal: this.props.data.reverseSeal,
        sellerorderno: this.props.returnProductDetails.orderProductWsDTO[0]
          .sellerorderno,
        transactionId: this.props.returnProductDetails.orderProductWsDTO[0]
          .transactionId,
        validImgFiles: this.state.validImgFiles
        // isElectronicsProduct: this.state.isElectronicsProduct,
      });
      this.props.onChange(reasonAndCommentObj);
      //this.props.onChangeValidImage({validImgFiles: this.state.validImgFiles});
      this.props.uploadProductImages(
        this.props.data.sellerorderno,
        this.props.data.transactionId,
        this.state.validImgFiles
      );
    }
    this.setState({ showAttachment: false, uploadedImageFiles: [] });
  }
  render() {
    //console.log("propsin RefundReplaceSelection:", this.props);
    // Preventing user to open this page direct by hitting URL
    if (
      !this.props.location.state ||
      !this.props.location.state.authorizedRequest
    ) {
      return this.navigateToReturnLanding();
    }

    let userBankDetails = "";
    if (this.state.customerBankDetails) {
      userBankDetails = this.state.customerBankDetails;
    }
    if (Object.keys(this.props.bankDetail).length !== 0) {
      userBankDetails = this.props.bankDetail;
    }
    let showImageUpload = this.props.data.showImageUpload;
    const data = this.props.getRefundOptionsDetails;
    const refundModesDetail = this.props.getRefundModesDetails;
    const productData = this.props.returnProductDetails;
    let imageCallOut = productData && productData.attachmentImageCallout;
    let imageCallOutArr = imageCallOut && imageCallOut.split("|");
    let uploadImage = this.state.uploadedImageFiles;

    return (
      <React.Fragment>
        <div>
          <SelectedReasonForReturn
            {...this.props}
            {...this.state}
            header={"Select mode of return "}
            // title={this.state.selectedAddress.addressType}
            // titleDescription={`${this.state.selectedAddress.line1} ,${
            //   this.state.selectedAddress.landmark
            // }`}
            // subTitleDescription={`${this.state.selectedAddress.city} ,${
            //   this.state.selectedAddress.state
            // } ,${this.state.selectedAddress.postalCode}`}
            // date={this.state.selectedDate}
            // time={this.state.selectedTime}
            // changeReturnReason={() => this.changeReturnReason()}
          />
        </div>
        <ReturnsFrame>
          <div className={styles.content}>
            {!this.state.showRefundOptions &&
              this.state.showAttachment == false && (
                <React.Fragment>
                  <div className={styles.returnMode}>Select mode of return</div>
                  <div className={styles.card}>
                    <div
                      className={styles.replaceRefundHeading}
                      onClick={() => this.showRefund()}
                    >
                      {data && data.typeOfReturn[0].typeOfReturn}
                      {!this.state.showRefundOptions && (
                        <span className={styles.rightArrow} />
                      )}
                    </div>
                    {!this.state.showRefundOptions && (
                      <div className={styles.replaceRefundText}>
                        {data && data.typeOfReturn[0].callout}
                      </div>
                    )}
                  </div>
                </React.Fragment>
              )}
            {this.state.showRefundOptions && (
              <React.Fragment>
                <div className={styles.bankDetailsSection}>
                  <div className={styles.replaceRefundModeSelctnHeading}>
                    {data && data.typeOfReturn[0].typeOfReturn}
                  </div>
                  <div className={styles.refundModeContainer}>
                    <div className={styles.chooseMode}>
                      Choose mode of refund
                    </div>
                    <div className={styles.modeContent}>
                      <form>
                        {refundModesDetail &&
                          refundModesDetail.refundMode.map((value, index) => {
                            return (
                              <label key={index}>
                                <input
                                  className={styles.radioBtn}
                                  type="radio"
                                  value={value.refundModeCode}
                                  checked={
                                    this.state.selectedOption ===
                                    value.refundModeCode
                                  }
                                  onChange={this.radioChange}
                                />
                                {value.refundModeCode === "CLIQ_CASH"
                                  ? "CLiQ Cash"
                                  : value.refundMode}
                                {value.refundModeCode === "CLIQ_CASH" ? (
                                  <div className={styles.InstantImage}>
                                    <Icon image={Instant} size={15} />
                                    <span className={styles.cliqCashInstant}>
                                      {" "}
                                      "Instant"
                                    </span>
                                  </div>
                                ) : null}
                                {/* <span className={styles.cliqCashInstant}>
                                {value.refundModeCode === "CLIQ_CASH"
                                  ? "Instant"
                                  : null}
                                  </span>*/}

                                <span className={styles.radioBtnSubText}>
                                  {value.callout}
                                </span>
                              </label>
                            );
                          })}
                      </form>
                      {this.state.showBankDetails &&
                        this.state.selectedOption === "BACK_TO_SOURCE" && (
                          <React.Fragment>
                            <div className={styles.bankDetailsHeading}>
                              Your Account Details:
                            </div>
                            <div
                              className={styles.changeBankDetails}
                              onClick={() =>
                                this.addBankDetails(userBankDetails)
                              }
                            >
                              Change
                            </div>
                            <div className={styles.bankDetailsText}>Name:</div>
                            <div className={styles.bankDetailsText}>
                              {userBankDetails.accountHolderName}
                            </div>
                            <div className={styles.bankDetailsText}>Bank:</div>
                            <div className={styles.bankDetailsText}>
                              {userBankDetails.bankName}
                            </div>
                            <div className={styles.bankDetailsText}>
                              IFSC code:
                            </div>
                            <div className={styles.bankDetailsText}>
                              {userBankDetails.IFSCCode}
                            </div>
                            <div className={styles.bankDetailsText}>
                              Account number:
                            </div>
                            <div className={styles.bankDetailsText}>
                              {userBankDetails.accountNumber}
                            </div>
                          </React.Fragment>
                        )}
                    </div>
                  </div>
                  {!this.state.showBankDetails &&
                    this.state.selectedOption === "BACK_TO_SOURCE" && (
                      <div
                        className={styles.addBankDetailsButton}
                        onClick={() => this.addBankDetails()}
                      >
                        ADD BANK DETAILS
                      </div>
                    )}
                </div>
              </React.Fragment>
            )}
            {/* -----------------------Image Upload------------------------ */}
            {this.state.showAttachment == true && (
              <div>
                <div className={styles.returnTitle}>Add attachments*</div>
                {imageCallOutArr && (
                  <ol className={styles.imgAttachmentText}>
                    {imageCallOutArr.map((value, index) => {
                      return <li key={index}>{value}</li>;
                    })}
                  </ol>
                )}

                {this.state.uploadedImageFiles.length > 0 && (
                  <div className={styles.imagePreviewContainer}>
                    {this.state.uploadedImageFiles.length > 0 &&
                      this.state.uploadedImageFiles.map((val, index) => {
                        return (
                          <div
                            className={styles.imagePreviewContains}
                            key={index}
                          >
                            <div className={styles.imagePreview}>
                              <img
                                id="panImage"
                                src={val}
                                alt="Upload"
                                width="76%"
                                height="auto"
                              />
                              <div className={styles.cancel}>
                                <img
                                  src={cancel}
                                  onClick={() => this.removeFile(val, index)}
                                  alt="cancel"
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                )}
                <div className={styles.uploadimageButton}>
                  <button className={styles.fileuploadButtonForUpload}>
                    Upload Images
                  </button>
                  <input
                    type="file"
                    name="myfile"
                    ref="file"
                    onChange={event => this.handleFileUpload(event)}
                    name="textFile"
                    multiple="multiple"
                  />
                </div>

                <div className={styles.imgAttachmentSubText}>
                  Upload JPEG, PNG (Maximum size per image 2.5 MB)
                </div>
              </div>
            )}
          </div>

          {this.state.showRefundOptions && (
            <div className={styles.content}>
              <React.Fragment>
                <div className={styles.cardCondition}>
                  <div className={styles.checkRefundTermsContainer}>
                    <input
                      className={styles.checkRefundTerms}
                      type="checkbox"
                      onChange={this.agreeToReturnDetails}
                    />
                  </div>
                  <div className={styles.checkRefundTermsText}>
                    {refundModesDetail && refundModesDetail.disclaimer}
                  </div>
                </div>
                {/* {this.state.selectedOption &&
								this.state.agreeToReturn && ( */}

                {/* )} */}
              </React.Fragment>
            </div>
          )}

          {this.state.showRefundOptions && (
            <div className={styles.buttonHolder}>
              <div className={styles.button}>
                <Button
                  width={175}
                  type="primary"
                  label="CONTINUE"
                  disabled={
                    this.state.selectedOption && this.state.agreeToReturn
                      ? false
                      : true
                  }
                  onClick={() => this.onSubmit()}
                />
              </div>
            </div>
          )}
          {uploadImage.length > 0 && (
            <div className={styles.buttonHolder}>
              <div className={styles.button}>
                <Button
                  width={175}
                  type="primary"
                  label="CONTINUE"
                  onClick={() => this.onContinueImageUpload()}
                />
              </div>
            </div>
          )}
        </ReturnsFrame>
      </React.Fragment>
    );
  }
}
ReplaceRefundSelection.propTypes = {
  selectedMode: PropTypes.oneOf([QUICK_DROP, SCHEDULED_PICKUP, SELF_COURIER]),
  selectMode: PropTypes.func
};
