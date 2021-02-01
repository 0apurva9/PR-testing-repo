import React from "react";
import { Redirect } from "react-router-dom";
import OrderCard from "./OrderCard";
import ReturnsFrame from "./ReturnsFrame";
import PropTypes from "prop-types";
import Button from "../../general/components/Button";
import styles from "./ReplaceRefundSelection.css";
import Instant from "../../general/components/img/pathCopy7.png";
import Icon from "../../xelpmoc-core/Icon";
import Upload from "./img/Upload.svg";
import SelectedReasonForReturn from "../../account/components/SelectedReasonForReturn";
import cancel from "../../general/components/img/canceltransperent.png";
import ProfileMenu from "../../account/components/ProfileMenu.js";
import UserProfile from "../../account/components/UserProfile.js";
import format from "date-fns/format";
import * as Cookie from "../../lib/Cookie";
import stylesCommon from "./ReturnReasonAndModes.css";
import {
  QUICK_DROP,
  SCHEDULED_PICKUP,
  SELF_COURIER,
  RETURNS_PREFIX,
  RETURN_LANDING,
  RETURNS_REASON,
  RETURNS_MODES,
  RETURNS_STORE_BANK_FORM,
  LOGGED_IN_USER_DETAILS,
  PRODUCT_CANCEL,
  REFUND_SUMMARY,
  BANK_ACCOUNT
} from "../../lib/constants";
import {
  setDataLayer,
  ADOBE_ADD_BANKDETAILS_BUTTON_CLICKED,
  ADOBE_SHOW_REFUND_BUTTON_CLICKED,
  ADOBE_MODE_OF_REFUND_SUBMITTED
} from "../../lib/adobeUtils";
import { RouterPropTypes } from "../../general/router-prop-types";

const dateFormat = "DD MMM YYYY";
export default class ReplaceRefundSelection extends React.Component {
  constructor(props) {
    super(props);
    this.orderCode = props.location.pathname.split("/")[2];
    this.state = {
      showRefundOptions: false,
      selectedOption: "",
      agreeToReturn: false,
      showBankDetails: false,
      customerBankDetails: "",
      //addBankDetailsPage: false
      cliqCashCheckSuccess: false,
      uploadedImageFiles: "",
      showAttachment: false,
      hideUpload: true,
      totalImageSize: ""
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
    //if bank data already present show it - coming from update bank details screen
    if (Object.keys(this.props.bankDetail).length !== 0) {
      this.setState({ showRefundOptions: true });
      this.setState({ selectedOption: BANK_ACCOUNT });
      this.setState({ showBankDetails: true });
    } else {
      this.setState({ showBankDetails: false });
    }
    if (
      this.props.data.showImageUpload === true &&
      this.props.data.validImgFiles === ""
    ) {
      this.setState({ showAttachment: true, hideUpload: false });
    } else {
      this.setState({ showAttachment: false });
    }
  }

  async radioChange(e) {
    const target = e.currentTarget;
    this.setState({ selectedOption: target.value });
    //cliq cash
    if (target.value === "CLIQ_CASH") {
      let cliqCashCheck = await this.props.getCliqCashDetailsRefund();
      if (
        cliqCashCheck.status === "Success" &&
        cliqCashCheck.isWalletCreated &&
        cliqCashCheck.isWalletOtpVerified
      ) {
        localStorage.setItem("cliqCashCheckSuccess", true);
        this.setState({
          cliqCashCheckSuccess: localStorage.getItem("cliqCashCheckSuccess")
        });
      } else {
        this.setState({ selectedOption: "" });
      }
    }
    if (target.value === BANK_ACCOUNT) {
      //bank account
      // if (target.value === "BANK_TO_SOURCE") {
      let getCustomerBankDetailsResponse = await this.props.getCustomerBankDetails();
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
    setDataLayer(ADOBE_ADD_BANKDETAILS_BUTTON_CLICKED);
    this.setState({ showAttachment: false });
    this.props.history.push({
      pathname: `${RETURNS_PREFIX}/${this.props.data.sellerorderno}${RETURN_LANDING}${RETURNS_STORE_BANK_FORM}`,
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
        to={`${RETURNS_PREFIX}/${this.orderCode}${RETURN_LANDING}${RETURNS_REASON}`}
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
      let data = this.props.getRefundModes(
        orderId,
        transactionId,
        returnId,
        typeOfReturn
      );
      let currentTypeofRefund =
        data &&
        data.getRefundModesDetails &&
        data.getRefundModesDetails.typeofRefund;
      this.setState({ typeofRefund: currentTypeofRefund });
      //show hide
      this.setState({ showRefundOptions: true });
      setDataLayer(ADOBE_SHOW_REFUND_BUTTON_CLICKED);
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
    if (this.state.selectedOption === BANK_ACCOUNT) {
      this.goToRefundModesPage();
    }
  }

  async goToRefundModesPage() {
    if (this.state.selectedOption && this.state.agreeToReturn) {
      setDataLayer(ADOBE_MODE_OF_REFUND_SUBMITTED, this.state.selectedOption);
      let orderId =
        (this.props && this.props.data && this.props.data.sellerorderno) ||
        (this.props &&
          this.props.orderDetails &&
          this.props.orderDetails.orderId);
      let transactionId = this.props.data.transactionId;
      let returnId = this.props.getRefundOptionsDetails.returnId;
      let refundMode = this.state.selectedOption;
      let returnAddress = {};
      Object.assign(returnAddress, {
        line1: this.props.getRefundModesDetails.deliveryAddress.line1,
        line2: "",
        line3: "",
        landmark: this.props.getRefundModesDetails.deliveryAddress.landmark
          ? this.props.getRefundModesDetails.deliveryAddress.landmark
          : "",
        city: this.props.getRefundModesDetails.deliveryAddress.town,
        state: this.props.getRefundModesDetails.deliveryAddress.state,
        postalCode: this.props.getRefundModesDetails.deliveryAddress.postalCode
      });

      const updateRefundModeResponse = await this.props.updateRefundMode(
        orderId,
        transactionId,
        returnId,
        refundMode
      );
      //move to next screen on success
      if (
        updateRefundModeResponse &&
        updateRefundModeResponse.status === "success"
      ) {
        if (this.props.getRefundModesDetails.typeofRefund === "REFNOPCK") {
          let modeOfReturn = "other";
          let updateReturnConfirmation = await this.props.updateReturnConfirmation(
            orderId,
            transactionId,
            returnId,
            returnAddress,
            "",
            "",
            modeOfReturn
          );
          if (updateReturnConfirmation.status === "success") {
            this.props.history.push({
              pathname: `${RETURNS_PREFIX}/${this.orderCode}${RETURN_LANDING}${REFUND_SUMMARY}`,
              state: {
                authorizedRequest: true
              }
            });
          } else {
            //show toast with error
            if (updateReturnConfirmation.error) {
              this.props.displayToast(updateReturnConfirmation.error);
            }
          }
        } else {
          this.props.history.push({
            pathname: `${RETURNS_PREFIX}/${this.orderCode}${RETURN_LANDING}${RETURNS_MODES}`,
            state: {
              authorizedRequest: true
            }
          });
        }
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
    if (uploadedFilesArr.length > 8) {
      return this.props.displayToast("Upload maximum 8 images");
    }
    let imgArray = [];
    let validImageFiles = [];
    let allImagesSize = [];
    uploadedFilesArr.map(value => {
      allImagesSize.push(value.size);
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
      // if (value.size > 2500000) {
      //   return this.props.displayToast(
      //     "The Image size should be lesser than 2.5MB"
      //   );
      // }
      let eachImgSrc = URL.createObjectURL(value);
      imgArray.push(eachImgSrc);
      validImageFiles.push(value);
      let currentImagesSize = allImagesSize.reduce((a, b) => a + b, 0);
      this.setState({ allImagesSize: currentImagesSize });
      if (currentImagesSize > 25000000) {
        return this.props.displayToast(
          "The all images size should be lesser than 25MB"
        );
      }
    });
    e.target.value = null;
    this.setState({ uploadedImageFiles: imgArray });
    this.setState({ validImgFiles: validImageFiles });
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
    window.scrollTo(0, 0);
    if (this.state.validImgFiles.length > 0) {
      this.setState({ showAttachment: false });
      let reasonAndCommentObj = Object.assign({
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
        validImgFiles: this.state.validImgFiles || this.state.uploadImage
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
    this.setState({
      showAttachment: false,
      uploadedImageFiles: [],
      hideUpload: true
    });
  }

  getContinueButton(selectedOption, agreeToReturn, userBankDetails) {
    // if (selectedOption && agreeToReturn) {
    if (selectedOption === BANK_ACCOUNT) {
      return (
        <div className={styles.buttonHolder}>
          <div className={styles.button}>
            <Button
              width={175}
              type="primary"
              label="CONTINUE"
              disabled={
                this.state.selectedOption &&
                this.state.agreeToReturn &&
                userBankDetails
                  ? false
                  : true
              }
              onClick={() => this.onSubmit()}
            />
          </div>
        </div>
      );
    }
    if (selectedOption !== BANK_ACCOUNT) {
      return (
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
      );
    }
    // }
  }

  render() {
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const userAccountDetails = JSON.parse(userDetails);
    const orderDetails = this.props.orderDetails;
    let returnFlow = this.props.returnFlow;
    const returnProductDetails = this.props.returnProductDetails;

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

    const data = this.props.getRefundOptionsDetails;
    const refundModesDetail = this.props.getRefundModesDetails;
    const productData = this.props.returnProductDetails;
    let imageCallOut = productData && productData.attachmentImageCallout;
    let imageCallOutArr = imageCallOut && imageCallOut.split("|");

    let uploadImage = this.state.uploadedImageFiles;
    let ifscCode =
      (userBankDetails && userBankDetails.IFSCCode) ||
      (userBankDetails && userBankDetails.ifscCode);
    let accountNumber = userBankDetails && userBankDetails.accountNumber;
    let noOfStarsIfscCode =
      ifscCode && ifscCode.slice(ifscCode.length - 4, ifscCode.length);
    let noOfStarsAccountNumber =
      accountNumber &&
      accountNumber.slice(accountNumber.length - 4, accountNumber.length);
    let newIfscCode =
      ifscCode && ifscCode.replace(/[0-9 A-Z a-z]/gi, "*") + noOfStarsIfscCode;
    let newAccountNumber =
      accountNumber &&
      accountNumber.replace(/[0-9 A-Z a-z]/gi, "*") + noOfStarsAccountNumber;
    let ImgSize = this.state.allImagesSize > 25000000;

    let disableModes;
    if (
      this.props &&
      this.props.data &&
      this.props.data.showImageUpload === "true"
    ) {
      disableModes = true;
    } else {
      disableModes = false;
    }

    return (
      <React.Fragment>
        <div className={stylesCommon.base}>
          <div className={stylesCommon.holder}>
            <div className={stylesCommon.profileMenu}>
              <ProfileMenu {...this.props} />
            </div>

            <div className={stylesCommon.returnReasonDetail}>
              <div className={stylesCommon.returnReasonDetailHolder}>
                <React.Fragment>
                  <div className={stylesCommon.orderCardWrapper}>
                    <OrderCard
                      imageUrl={
                        returnProductDetails &&
                        returnProductDetails.orderProductWsDTO &&
                        returnProductDetails.orderProductWsDTO[0] &&
                        returnProductDetails.orderProductWsDTO[0].imageURL
                      }
                      productName={`${returnProductDetails &&
                        returnProductDetails.orderProductWsDTO &&
                        returnProductDetails.orderProductWsDTO[0] &&
                        returnProductDetails.orderProductWsDTO[0]
                          .productBrand} ${returnProductDetails &&
                        returnProductDetails.orderProductWsDTO &&
                        returnProductDetails.orderProductWsDTO[0] &&
                        returnProductDetails.orderProductWsDTO[0].productName}`}
                      price={
                        returnProductDetails &&
                        returnProductDetails.orderProductWsDTO &&
                        returnProductDetails.orderProductWsDTO[0] &&
                        returnProductDetails.orderProductWsDTO[0].price
                      }
                      isSelect={false}
                      quantity={true}
                      orderPlace={
                        orderDetails && orderDetails.orderDate
                          ? orderDetails &&
                            format(orderDetails.orderDate, dateFormat)
                          : this.props.orderPlace
                      }
                      orderId={this.props.orderId}
                      productSize={
                        this.props.orderDetails &&
                        this.props.orderDetails.products[0].productSize
                      }
                      productColourName={
                        this.props.orderDetails &&
                        this.props.orderDetails.products[0].productColourName
                      }
                      productBrand={
                        orderDetails && orderDetails.productBrand
                          ? orderDetails.productBrand
                          : returnProductDetails &&
                            returnProductDetails.orderProductWsDTO &&
                            returnProductDetails.orderProductWsDTO[0] &&
                            returnProductDetails.orderProductWsDTO[0]
                              .productBrand
                      }
                      onHollow={true}
                      returnFlow={returnFlow}
                      title={PRODUCT_CANCEL}
                      onClick={() =>
                        this.onClickImage(
                          orderDetails &&
                            orderDetails.orderProductWsDTO &&
                            orderDetails.orderProductWsDTO[0] &&
                            orderDetails.orderProductWsDTO[0].productcode
                        )
                      }
                      exchangeDetails={
                        data &&
                        data.products &&
                        data.products[0] &&
                        data.products[0].exchangeDetails
                      }
                      bundledAssociatedItems={
                        data && data.bundledAssociatedItems
                      }
                    >
                      {returnProductDetails &&
                        returnProductDetails.orderProductWsDTO &&
                        returnProductDetails.orderProductWsDTO[0] &&
                        returnProductDetails.orderProductWsDTO[0].quantity && (
                          <div className={styles.quantity}>
                            Qty{" "}
                            {returnProductDetails.orderProductWsDTO[0].quantity}
                          </div>
                        )}
                    </OrderCard>
                  </div>
                </React.Fragment>

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
                    {!this.state.showRefundOptions && !disableModes && (
                      <React.Fragment>
                        <div className={styles.returnMode}>
                          Select mode of return
                        </div>
                        <div
                          className={styles.card}
                          onClick={() => this.showRefund()}
                        >
                          <div className={styles.replaceRefundHeading}>
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
                          <div
                            className={styles.replaceRefundModeSelctnHeading}
                          >
                            {data && data.typeOfReturn[0].typeOfReturn}
                          </div>
                          <div className={styles.refundModeContainer}>
                            <div className={styles.chooseMode}>
                              Choose mode of refund
                            </div>
                            <div className={styles.modeContent}>
                              <form>
                                {refundModesDetail &&
                                  refundModesDetail.refundMode.map(
                                    (value, index) => {
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
                                          {value.refundModeCode ===
                                          "CLIQ_CASH" ? (
                                            <React.Fragment>
                                              <div
                                                className={styles.InstantImage}
                                              >
                                                <Icon
                                                  image={Instant}
                                                  size={20}
                                                />
                                              </div>
                                              <div
                                                className={
                                                  styles.cliqCashInstant
                                                }
                                              >
                                                Instant
                                              </div>
                                            </React.Fragment>
                                          ) : null}
                                          <span
                                            className={styles.radioBtnSubText}
                                          >
                                            {value.callout}
                                          </span>
                                        </label>
                                      );
                                    }
                                  )}
                              </form>
                              {this.state.showBankDetails &&
                                this.state.selectedOption === BANK_ACCOUNT && (
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
                                    <div className={styles.bankDetailsText}>
                                      Name:
                                    </div>
                                    <div className={styles.bankDetailsText}>
                                      {userBankDetails.accountHolderName}
                                    </div>
                                    <div className={styles.bankDetailsText}>
                                      Bank:
                                    </div>
                                    <div className={styles.bankDetailsText}>
                                      {userBankDetails.bankName}
                                    </div>
                                    <div className={styles.bankDetailsText}>
                                      IFSC code:
                                    </div>
                                    <div className={styles.bankDetailsText}>
                                      {newIfscCode}
                                    </div>
                                    <div className={styles.bankDetailsText}>
                                      Account number:
                                    </div>
                                    <div className={styles.bankDetailsText}>
                                      {newAccountNumber}
                                    </div>
                                  </React.Fragment>
                                )}
                            </div>
                          </div>
                          {!this.state.showBankDetails &&
                            this.state.selectedOption === BANK_ACCOUNT && (
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
                    {this.props &&
                      this.props.data &&
                      this.props.data.showImageUpload === "true" && (
                        <div>
                          <div className={styles.returnTitle}>
                            Add attachments
                          </div>
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
                                this.state.uploadedImageFiles.map(
                                  (val, index) => {
                                    return (
                                      <div
                                        className={styles.imagePreview}
                                        key={index}
                                      >
                                        <img
                                          id="panImage"
                                          src={val}
                                          alt="Upload"
                                          width="59.9px"
                                          height="90px"
                                        />

                                        <div className={styles.cancel}>
                                          <img
                                            src={cancel}
                                            onClick={() =>
                                              this.removeFile(val, index)
                                            }
                                            alt="cancel"
                                          />
                                        </div>
                                      </div>
                                      // <div
                                      //   className={styles.imagePreviewContains}
                                      //   key={index}
                                      // >
                                      //   <div className={styles.imagePreview}>
                                      //     <img
                                      //       id="panImage"
                                      //       src={val}
                                      //       alt="Upload"
                                      //       width="76%"
                                      //       height="auto"
                                      //     />
                                      //     <div className={styles.cancel}>
                                      //       <img
                                      //         src={cancel}
                                      //         onClick={() =>
                                      //           this.removeFile(val, index)
                                      //         }
                                      //         alt="cancel"
                                      //       />
                                      //     </div>
                                      //   </div>
                                      // </div>
                                    );
                                  }
                                )}
                            </div>
                          )}
                          <div className={styles.uploadimageButton}>
                            <button
                              className={styles.fileuploadButtonForUpload}
                            >
                              <Icon image={Upload} size={14} />
                              <span className={styles.marginImage}>
                                Upload Images
                              </span>
                            </button>
                            <input
                              type="file"
                              name="myfile"
                              onChange={event => this.handleFileUpload(event)}
                              multiple="multiple"
                            />
                          </div>

                          <div className={styles.imgAttachmentSubText}>
                            Upload JPEG, PNG (Maximum upload limit is 25 MB)
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

                  {/* {this.state.showRefundOptions && (
            <div className={styles.buttonHolder}>
              <div className={styles.button}>
                <Button
                  width={175}
                  type="primary"
                  label="CONTINUE"
                  disabled={
                    this.state.selectedOption && this.state.agreeToReturn && userBankDetails
                      ? false
                      : true
                  }
                  onClick={() => this.onSubmit()}
                />
              </div>
            </div>
          )} */}
                  {this.state.showRefundOptions &&
                    this.getContinueButton(
                      this.state.selectedOption,
                      this.state.agreeToReturn,
                      userBankDetails
                    )}
                  {uploadImage.length > 0 && !ImgSize && (
                    <div className={styles.buttonHolder}>
                      <div className={styles.button}>
                        <Button
                          width={175}
                          type="primary"
                          label="CONTINUE"
                          onClick={() =>
                            this.onContinueImageUpload()
                          }
                        />
                      </div>
                    </div>
                  )}
                </ReturnsFrame>
              </div>
            </div>

            <div className={stylesCommon.userProfile}>
              <UserProfile
                image={userAccountDetails.imageUrl}
                userLogin={userAccountDetails.userName}
                loginType={userAccountDetails.loginType}
                firstName={
                  userAccountDetails &&
                  userAccountDetails.firstName &&
                  userAccountDetails.firstName.trim().charAt(0)
                }
                heading={
                  userAccountDetails &&
                  userAccountDetails.firstName &&
                  `${userAccountDetails.firstName} `
                }
                lastName={
                  userAccountDetails &&
                  userAccountDetails.lastName &&
                  `${userAccountDetails.lastName}`
                }
                userAddress={this.props.userAddress}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
ReplaceRefundSelection.propTypes = {
  selectedMode: PropTypes.oneOf([QUICK_DROP, SCHEDULED_PICKUP, SELF_COURIER]),
  selectMode: PropTypes.func,
  location: RouterPropTypes.location,
  history: RouterPropTypes.history,
  displayToast: PropTypes.func,
  data: PropTypes.shape({
    returnReasonCode: PropTypes.string,
    subReasonCode: PropTypes,
    subReason: PropTypes.string,
    comment: PropTypes.string,
    reason: PropTypes.string,
    reverseSeal: PropTypes,
    transactionId: PropTypes.string,
    sellerorderno: PropTypes.string,
    validImgFiles: PropTypes.string,
    showImageUpload: PropTypes.bool
  }),
  userAddress: PropTypes.object,
  getRefundOptionsData: PropTypes.func,
  bankDetail: PropTypes.object,
  getCliqCashDetailsRefund: PropTypes.func,
  getCustomerBankDetails: PropTypes.func,
  getRefundOptionsDetails: PropTypes.shape({
    returnId: PropTypes.string,
    bundledAssociatedItems: PropTypes,
    typeOfReturn: PropTypes.arrayOf(
      PropTypes.shape({
        typeOfReturn: PropTypes.string,
        typeOfReturnCode: PropTypes.string,
        callout: PropTypes.string
      })
    ),
    products: PropTypes.arrayOf(
      PropTypes.shape({
        exchangeDetails: PropTypes
      })
    ),
  }),
  getRefundModes: PropTypes.func,
  orderDetails: PropTypes.shape({
    orderId: PropTypes.string,
    orderDate: PropTypes.string,
    productBrand: PropTypes.string,
    orderProductWsDTO: PropTypes.arrayOf(
      PropTypes.shape({
        productcode: PropTypes.string
      })
    ),
    products: PropTypes.arrayOf(
      PropTypes.shape({
        productSize: PropTypes.string,
        productColourName: PropTypes.string
      })
    )
  }),
  getRefundModesDetails: PropTypes.shape({
    typeofRefund: PropTypes.string,
    refundMode: PropTypes.array,
    disclaimer: PropTypes.string,
    deliveryAddress: PropTypes.shape({
      line1: PropTypes.string,
      landmark: PropTypes.string,
      town: PropTypes.string,
      state: PropTypes.string,
      postalCode: PropTypes.string,
    }),
  }),
  updateRefundMode: PropTypes.func,
  updateReturnConfirmation: PropTypes.string,
  changeReturnReason: PropTypes.func,
  returnProductDetails: PropTypes.shape({
    attachmentImageCallout: PropTypes.string,
    orderProductWsDTO: PropTypes.arrayOf({
      imageURL: PropTypes.string,
      productBrand: PropTypes.string,
      productName: PropTypes.string,
      price: PropTypes.string,
    })
  }),
  orderId: PropTypes.string,
  orderPlace: PropTypes.string,
  onChange: PropTypes.func,
  uploadProductImages: PropTypes.func,
  returnFlow: PropTypes.bool
};
