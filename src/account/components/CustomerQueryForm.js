import React, { Component } from "react";
import PropTypes from "prop-types";
import FloatingLabelInputWithPlace from "../../general/components/FloatingLabelInputWithPlace";
import TextArea from "../../general/components/TextArea";
import Icon from "../../xelpmoc-core/Icon";
import CheckboxAndText from "../../cart/components/CheckboxAndText";
import * as Cookie from "../../lib/Cookie";
import {
  setDataLayerForCLiQCarePage,
  ADOBE_SELF_SERVE_PAGE_LOAD,
  ADOBE_SELF_SERVE_NON_ORDER_PAGE_LOAD
} from "../../lib/adobeUtils";

import {
  EMAIL_REGULAR_EXPRESSION,
  MOBILE_PATTERN
} from "../../auth/components/Login";
import styles from "./CustomerQueryForm.css";
import Button from "../../general/components/Button.js";
import download from "../components/img/download.svg";
import deleteUpload from "../components/img/deleteUpload.svg";
import { SUCCESS, LOGGED_IN_USER_DETAILS } from "../../lib/constants";
const BASIC_FORM = "bacisform";
const ATTACHEMENT = "attachment";
const COMMUNICATION = "communication";
const TICKET_TATACLIQ = "tataCliq";
const MOBILE_VALID_TEXT = "Please enter valid mobile number";
const EMAIL_VALID_TEXT = "Please enter  valid emailId";
const MOBILE_TEXT = "Please enter mobile number";
const EMAIL_TEXT = "Please enter emailId";
export default class CustomerQueryForm extends Component {
  constructor(props) {
    super(props);
    const userDetailsCookie = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const getUserDetails = JSON.parse(userDetailsCookie);
    this.state = {
      name:
        getUserDetails && (getUserDetails.firstName || getUserDetails.lastName)
          ? `${getUserDetails.firstName.trim()} ${getUserDetails.lastName.trim()}`
          : "",
      mobile:
        getUserDetails &&
        getUserDetails.loginType === "mobile" &&
        getUserDetails.userName
          ? getUserDetails.userName
          : "",
      email:
        getUserDetails &&
        getUserDetails.loginType === "email" &&
        getUserDetails.userName
          ? getUserDetails.userName
          : "",
      basicForm: true,
      attachment: false,
      attachementData: null,
      isAttachment: false,
      communication: false,
      currentStep: BASIC_FORM,
      btnLabel: "NEXT",
      ticketType: TICKET_TATACLIQ,
      btnDisable: false,
      file: [],
      uploadedAttachment: "",
      filesData: [],
      isRadioComponent: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps &&
      nextProps.customerQueriesField !== this.props.customerQueriesField
    ) {
      this.initialState(nextProps.customerQueriesField, true);
    }
    if (nextProps && nextProps.userDetails !== this.props.userDetails) {
      this.setState({
        email: nextProps.userDetails.emailID
          ? nextProps.userDetails.emailID
          : "",
        name:
          nextProps.userDetails.firstName || nextProps.userDetails.lastName
            ? `${nextProps.userDetails.firstName} ${nextProps.userDetails.lastName}`
            : "",
        mobile: nextProps.userDetails.mobileNumber
          ? nextProps.userDetails.mobileNumber
          : ""
      });
    }
  }

  componentWillUnmount() {
    this.setState({});
  }
  // setUserDetail(){

  // }
  getOtherData = () => {
    const { parentIssueType, question } = this.props;
    return {
      name: parentIssueType,
      question: question.subIssueType
    };
  };

  componentDidMount() {
    window.scroll(0, 0);
    if (!this.props.formSubmit) {
      if (this.props.questionType == "orderRelated") {
        setDataLayerForCLiQCarePage(
          ADOBE_SELF_SERVE_PAGE_LOAD,
          this.getOrderData(),
          "Care_Order_Webform_1"
        );
      }
      if (this.props.questionType == "NonOrderRelated") {
        setDataLayerForCLiQCarePage(
          ADOBE_SELF_SERVE_NON_ORDER_PAGE_LOAD,
          this.getOtherData(),
          "Care_Other_Webform_1"
        );
      }
    }
    this.initialState(this.props.customerQueriesField, false);
    if (this.props.userDetails) {
      this.setState({
        email: this.props.userDetails.emailID
          ? this.props.userDetails.emailID
          : "",
        name:
          this.props.userDetails.firstName || this.props.userDetails.lastName
            ? `${this.props.userDetails.firstName} ${this.props.userDetails.lastName}`
            : "",
        mobile: this.props.userDetails.mobileNumber
          ? this.props.userDetails.mobileNumber
          : ""
      });
    }
  }

  getOrderData = () => {
    const { selectedOrder } = this.props;
    return {
      status:
        selectedOrder &&
        selectedOrder.products &&
        selectedOrder.products[0].statusDisplay,
      id:
        selectedOrder &&
        selectedOrder.products &&
        selectedOrder.products[0].transactionId,
      productId:
        selectedOrder &&
        selectedOrder.products &&
        selectedOrder.products[0].productcode
    };
  };

  initialState(customerQueriesField, isAppend) {
    customerQueriesField &&
      customerQueriesField.map(field => {
        if (field.componentName === "attachmentComponent") {
          this.setState({
            attachementData: field,
            uploadFileTitle: field.title,
            isAttachment: true
          });
        } else {
          if (isAppend) {
            if (field.isMandatory) {
              if (!this.state[field.componentId]) {
                this.setState({ btnDisable: true });
              }
            }
          } else {
            if (field.isMandatory) {
              this.setState({ btnDisable: true });
            }
          }

          if (
            field.componentName === "radioComponent" ||
            field.componentName === "checkboxComponent"
          ) {
            this.setState({ isRadioComponent: true });
            if (field.optionArray) {
              field.optionArray.map(option => {
                if (this.state[field.componentId]) {
                  this.setState({
                    [field.componentId]: this.state[field.componentId]
                  });
                } else {
                  if (option.isSelected == 1) {
                    this.setState({
                      [field.componentId]: option.value
                    });
                  } else {
                    this.setState({ [field.componentId]: "" });
                  }
                }
              });
            }
          } else {
            if (this.state[field.componentId]) {
              this.setState({
                [field.componentId]: this.state[field.componentId]
              });
            } else {
              this.setState({ [field.componentId]: "" });
            }
          }
        }
      });
  }

  formField() {
    return (
      this.props.customerQueriesField &&
      this.props.customerQueriesField.map(listOfField => {
        if (listOfField.componentName == "labelComponent") {
          return (
            <div
              className={styles.labelComponent}
              style={{
                fontSize: listOfField.fontSize + "px",
                fontWeight: listOfField.fontStyle
              }}
            >
              {listOfField.heading}
            </div>
          );
        }
        if (listOfField.componentName == "textboxComponent") {
          return (
            <div
              className={
                this.state.isRadioComponent
                  ? styles.txtFieldBox
                  : styles.txtFieldBoxMargin
              }
            >
              <div className={styles.txtFieldHeading}>
                {listOfField.isMandatory == 1
                  ? listOfField.heading + "*"
                  : listOfField.heading}
              </div>
              <div className={styles.txtField}>
                <FloatingLabelInputWithPlace
                  placeholder={`${listOfField.placeholder}`}
                  disabled={false}
                  maxLength={listOfField.maxLimit}
                  value={this.state[listOfField.componentId]}
                  onChange={value =>
                    this.setState({ [listOfField.componentId]: value }, () => {
                      this.validateForm(false);
                    })
                  }
                  fontSize={"11px"}
                  onlyNumber={listOfField.hexCode == "isNumeric" ? true : false}
                  // onBlur={() => this.onBlur(false)}
                />
              </div>
            </div>
          );
        }

        if (listOfField.componentName == "radioComponent") {
          return (
            <div className={styles.radioComponentBox}>
              <div className={styles.txtFieldHeading}>
                {listOfField.isMandatory
                  ? listOfField.heading + " *"
                  : listOfField.heading}
              </div>
              <div className={styles.selectTicketBox}>
                {listOfField &&
                  listOfField.optionArray.map(ele => {
                    return (
                      <div
                        className={[
                          styles.radioTicketType,
                          ele.value == this.state[listOfField.componentId]
                            ? styles.fontBold
                            : null
                        ].join(" ")}
                      >
                        <label>
                          {ele.optionName}
                          <input
                            type="radio"
                            value={ele.value}
                            checked={
                              ele.value == this.state[listOfField.componentId]
                                ? true
                                : false
                            }
                            onChange={e =>
                              this.onChangeCheck(e, listOfField, ele)
                            }
                          />
                          <span />
                        </label>
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        }
        if (listOfField.componentName == "textAreaComponent") {
          return (
            <React.Fragment>
              <div className={styles.textAreaComponent}>
                <div className={styles.textAreaBox}>
                  <div className={styles.txtFieldHeading}>
                    {listOfField.isMandatory
                      ? listOfField.heading + "*"
                      : listOfField.heading}
                  </div>
                  <div className={styles.maxLimitBox}>
                    <span className={styles.totalText}>
                      {this.state[listOfField.componentId]
                        ? this.state[listOfField.componentId].length
                        : 0}
                    </span>
                    /<span>{listOfField.maxLimit}</span>
                  </div>
                </div>
                <TextArea
                  placeholder={listOfField.placeholder}
                  value={this.state[listOfField.componentId]}
                  onChange={value =>
                    this.setState({ [listOfField.componentId]: value }, () => {
                      this.validateForm(false);
                    })
                  }
                  maxLength={parseInt(listOfField.maxLimit)}
                  // onBlur={() => this.onBlur(false)}
                />
              </div>
            </React.Fragment>
          );
        }

        if (listOfField.componentName == "checkboxComponent") {
          return (
            <div className={styles.checkBoxComponent}>
              <div className={styles.txtFieldHeading}>
                {listOfField.isMandatory
                  ? listOfField.heading + "*"
                  : listOfField.heading}
              </div>
              {listOfField &&
                listOfField.optionArray.map(ele => {
                  return (
                    <CheckboxAndText
                      key={ele.value}
                      label={ele.optionName}
                      value={ele.value}
                      size={"18px"}
                      fontSize={"12px"}
                      selected={
                        this.state[listOfField.componentId] === ele.value
                          ? true
                          : false
                      }
                      selectItem={() =>
                        this.setState({ [listOfField.componentId]: ele.value })
                      }
                    />
                  );
                })}
            </div>
          );
        }
      })
    );
  }

  onChangeCheck(evt, selectObj, option) {
    this.setState(
      {
        [selectObj.componentId]: evt.target.value
      },
      () => {
        // this.onBlur();
        this.validateForm();
        if (option.webFormTemplate) {
          this.props.getCustomerQueriesFields(option.webFormTemplate, true);
        }
      }
    );
  }

  nextField(currentStep) {
    const { customerQueriesField, question, selectedOrder } = this.props;
    const {
      isAttachment,
      attachementData,
      btnLabel,
      mobile,
      email,
      uploadFileTitle,
      uploadedAttachment,
      name
    } = this.state;

    let validateStatus = false;
    if (currentStep == BASIC_FORM) {
      if (this.props.questionType == "orderRelated") {
        setDataLayerForCLiQCarePage(
          ADOBE_SELF_SERVE_PAGE_LOAD,
          this.getOrderData(),
          "Care_Order_Webform_2"
        );
      }
      if (this.props.questionType == "NonOrderRelated") {
        setDataLayerForCLiQCarePage(
          ADOBE_SELF_SERVE_NON_ORDER_PAGE_LOAD,
          this.getOtherData(),
          "Care_Other_Webform_2"
        );
      }
      window.scroll(0, 0);
      for (let obj of customerQueriesField) {
        validateStatus = this.formValidate(obj);
        if (!validateStatus) {
          break;
        }
      }
      if (validateStatus) {
        this.setState({
          basicForm: false,
          attachment: true,
          btnDisable:
            attachementData &&
            attachementData.isMandatory &&
            this.state.file.length == 0
              ? true
              : false,
          currentStep: ATTACHEMENT,
          btnLabel: "NEXT"
        });
      }
    }

    if (currentStep == ATTACHEMENT) {
      if (this.props.questionType == "orderRelated") {
        setDataLayerForCLiQCarePage(
          ADOBE_SELF_SERVE_PAGE_LOAD,
          this.getOrderData(),
          "Care_Order_Webform_3"
        );
      }
      if (this.props.questionType == "NonOrderRelated") {
        setDataLayerForCLiQCarePage(
          ADOBE_SELF_SERVE_NON_ORDER_PAGE_LOAD,
          this.getOtherData(),
          "Care_Other_Webform_3"
        );
      }
      window.scroll(0, 0);
      this.setState({
        attachment: false,
        communication: true,
        currentStep: COMMUNICATION,
        btnDisable: mobile && email ? false : true,
        btnLabel: "SUBMIT"
      });
    }
    if (currentStep == COMMUNICATION) {
      window.scroll(0, 0);
      if (!email) {
        this.props.displayToast(EMAIL_TEXT);
        return false;
      }
      if (this.state.email && !EMAIL_REGULAR_EXPRESSION.test(email)) {
        this.props.displayToast(EMAIL_VALID_TEXT);
        return false;
      }
      if (!mobile) {
        this.props.displayToast(MOBILE_TEXT);
        return false;
      }
      if (this.state.mobile && !MOBILE_PATTERN.test(mobile)) {
        this.props.displayToast(MOBILE_VALID_TEXT);
        return false;
      } else {
        const additionalInfo = {
          extracomments: "",
          attachment: "",
          promotionName: "",
          productName: "",
          productLink: "",
          errorScreenshot: "",
          cardNo: "",
          couponCode: "",
          amountPaidBy: "",
          proofofDebit: "",
          extraPaidAmount: "",
          purchaseFrom: "",
          wrongProductOrderID: "",
          productInvoice: "",
          accountName: "",
          bankName: "",
          accountNumber: "",
          IFSC: "",
          issueWithBox: "",
          itemImages: "",
          productSeal: "",
          productWeight: "",
          weightCardImage: "",
          serviceCenterAddress: "",
          technicianName: "",
          serviceCenterContact: "",
          serviceCenterCertificate: "",
          LPName: "",
          deliveryPersonName: "",
          deliveryPersonContact: "",
          EGVNumber: "",
          deactivationReason: "",
          alternateContact: "",
          additionalEmail: "",
          bulkProduct: "",
          bulkQuantity: "",
          pincodedetail: "",
          GSTInvoice: "",
          creditCardStatement: "",
          bankStatement: "",
          boxImages: "",
          balanceScreenshot: "",
          lastTransactionScreenshot: "",
          missingAccessories: "",
          webformChannel: "",
          appVersion: "",
          refundIssue: "",
          deficitAmount: ""
        };

        for (let obj of customerQueriesField) {
          for (let [key, value] of Object.entries(additionalInfo)) {
            if (key == "webformChannel") {
              additionalInfo.webformChannel = "desktop";
            }
            if (key == uploadFileTitle) {
              if (uploadedAttachment && uploadedAttachment.length > 0) {
                let urlList = [];
                uploadedAttachment.forEach(item => {
                  let list = item.urlList
                    ? item.urlList.map(url => url.fileURL)
                    : [];
                  urlList.push(...list);
                });
                additionalInfo[uploadFileTitle] = urlList.join(",");
              } else {
                additionalInfo[uploadFileTitle] = "";
              }
            } else if (key == obj.title) {
              additionalInfo[obj.title] = this.state[obj.componentId];
            }
          }
        }

        let ticketInfo = Object.assign(
          {},
          {
            subIssueType: question.subIssueType ? question.subIssueType : "",
            l0: question.l0,
            l1: question.l1,
            l2: question.l2,
            l3: question.l3,
            l4: question.l4,
            ticketType: question.ticketType,
            issueBucket: this.props.parentIssueType
              ? this.props.parentIssueType
              : "",
            issueType: question.issueType
              ? question.issueType
              : question.subIssueType,
            transactionId:
              this.props.questionType == "orderRelated"
                ? selectedOrder &&
                  selectedOrder.products &&
                  selectedOrder.products.length &&
                  selectedOrder.products[0].transactionId
                : "",
            orderCode:
              this.props.questionType == "orderRelated"
                ? selectedOrder && selectedOrder.orderId
                : "",
            subOrderCode:
              this.props.questionType == "orderRelated"
                ? selectedOrder &&
                  selectedOrder.products &&
                  selectedOrder.products.length &&
                  selectedOrder.products[0].sellerorderno
                : ""
          }
        );
        let customerInfo = Object.assign(
          {},
          {
            contactEmail: email,
            contactPhn: mobile,
            contactName: name ? name.trim() : ""
          }
        );
        let raiseTicketObj = {
          additionalInfo,
          ticketInfo,
          customerInfo
        };

        this.props.submitCustomerForms(raiseTicketObj);
      }
    }
  }

  validateForm(isEmailMobileValidate) {
    if (isEmailMobileValidate) {
      if (!this.state.email || !this.state.mobile) {
        this.setState({ btnDisable: true });
      } else {
        this.setState({ btnDisable: false });
      }
    } else {
      for (let obj of this.props.customerQueriesField) {
        if (obj.isMandatory == 1) {
          if (this.state[obj.componentId] == "") {
            this.setState({ btnDisable: true });
            break;
          } else {
            this.setState({ btnDisable: false });
          }
        }
      }
    }
  }

  formValidate(fieldObj) {
    if (
      fieldObj.minLimit &&
      fieldObj.minLimit != "-1" &&
      this.state[fieldObj.componentId].length < fieldObj.minLimit
    ) {
      this.props.displayToast(fieldObj.heading + " " + fieldObj.minLimitError);
      return false;
    } else if (fieldObj.regex && fieldObj.regex !== "-1") {
      let expression = fieldObj.regex;
      if (expression.startsWith("/")) {
        expression = expression.slice(1);
      }
      if (expression.endsWith("/")) {
        expression = expression.slice(0, expression.length - 1);
      }
      let regexExp = new RegExp(expression);

      if (!regexExp.test(this.state[fieldObj.componentId])) {
        this.props.displayToast(fieldObj.regexError);
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }
  async onUploadFile(file, { maxFileLimit, maxFileSize, title }) {
    const newFile = Array.from(file);
    let validFile = true;
    for (let value of newFile) {
      if (
        value.name.includes("jpg") ||
        value.name.includes("jpeg") ||
        value.name.includes("png") ||
        value.name.includes("pdf")
      ) {
        validFile = true;
      } else {
        validFile = false;
        break;
      }
    }
    if (validFile) {
      if (newFile.length > 0) {
        let combinedSize = 0,
          totalFile = [...newFile, ...this.state.file];
        for (let f of totalFile) combinedSize += f.size / 1048576; //converting file size into MB
        let issueType =
          this.props.isSelected == 1 ? "NonOrderRelated" : "orderRelated";
        if (combinedSize <= maxFileSize && totalFile.length <= maxFileLimit) {
          const uploadFileResponse = await this.props.uploadUserFile(
            this.props.questionType,
            title,
            Array.from(newFile)
          );
          let { uploadUserFile, status } = uploadFileResponse;
          if (uploadFileResponse && status === SUCCESS) {
            this.setState(prevState => ({
              file: [...prevState.file, ...newFile],
              btnDisable: false,
              uploadedAttachment: [
                ...prevState.uploadedAttachment,
                ...uploadUserFile.imageURLlist
              ]
            }));
          }
        } else {
          if (totalFile.length > maxFileLimit)
            this.props.displayToast(
              `Maximum ${maxFileLimit} No. of files allowed`
            );
          else
            this.props.displayToast(
              `File size should be less then ${maxFileSize} MB`
            );
        }
      }
    } else {
      return this.props.displayToast("Upload JPEG, PNG, or PDF only");
    }
  }

  handleClick(event) {
    const { target = {} } = event || {};
    target.value = "";
  }

  deleteFile(index) {
    const copyuploadedAttachment = [...this.state.uploadedAttachment];
    var files = [...this.state.file];
    copyuploadedAttachment.splice(index, 1);
    files.splice(index, 1);
    this.setState(
      { uploadedAttachment: copyuploadedAttachment, file: files },
      () => {
        if (this.state.attachementData.isMandatory) {
          if (this.state.file.length <= 0) {
            this.setState({ btnDisable: true });
          }
        }
      }
    );
  }

  previewPage() {
    if (this.state.currentStep == BASIC_FORM) {
      this.props.navigatePreviousPage();
      this.setState({ btnDisable: false });
    } else if (this.state.currentStep == ATTACHEMENT) {
      if (this.props.questionType == "orderRelated") {
        setDataLayerForCLiQCarePage(
          ADOBE_SELF_SERVE_PAGE_LOAD,
          this.getOrderData(),
          "Care_Order_Webform_1"
        );
      }
      if (this.props.questionType == "NonOrderRelated") {
        setDataLayerForCLiQCarePage(
          ADOBE_SELF_SERVE_NON_ORDER_PAGE_LOAD,
          this.getOtherData(),
          "Care_Other_Webform_1"
        );
      }
      this.setState({
        basicForm: true,
        attachment: false,
        btnLabel: "NEXT",
        btnDisable: false,
        currentStep: BASIC_FORM
      });
    } else if (this.state.currentStep == COMMUNICATION) {
      if (this.props.questionType == "orderRelated") {
        setDataLayerForCLiQCarePage(
          ADOBE_SELF_SERVE_PAGE_LOAD,
          this.getOrderData(),
          "Care_Order_Webform_2"
        );
      }
      if (this.props.questionType == "NonOrderRelated") {
        setDataLayerForCLiQCarePage(
          ADOBE_SELF_SERVE_NON_ORDER_PAGE_LOAD,
          this.getOtherData(),
          "Care_Other_Webform_2"
        );
      }
      this.setState({
        basicForm: false,
        attachment: true,
        communication: false,
        btnLabel: "NEXT",
        btnDisable: false,
        currentStep: ATTACHEMENT
      });
    }
  }
  updateNumber() {}
  render() {
    const {
      basicForm,
      attachment,
      communication,
      currentStep,
      btnLabel,
      ticketType,
      files
    } = this.state;
    let strArr = null;
    return (
      <div className={styles.base}>
        <div className={styles.headerBox}>
          {basicForm && <div className={styles.header}>Create your ticket</div>}
          {attachment && (
            <div className={styles.header}>
              Add attachments
              {this.state.attachementData.isMandatory
                ? "*"
                : " (optional)"}{" "}
            </div>
          )}
          {communication && (
            <div className={styles.header}>{"Communication details"}</div>
          )}

          <div className={styles.buttonBox}>
            <div
              className={styles.customBtn}
              onClick={() => this.previewPage()}
            >
              Go to Previous Page
            </div>
          </div>
        </div>
        {basicForm && (
          <div className={styles.basicForm}>{this.formField()}</div>
        )}
        {attachment && (
          <div className={styles.attachment}>
            <div
              className={[
                styles.fileBox,
                this.state.file.length ? styles.borderFile : null
              ].join(" ")}
            >
              <div className={styles.fileInstruction}>
                <div className={styles.uploadHeding}>
                  {this.state.attachementData.heading}
                </div>
                <div className={styles.uploadSubHeding}>
                  {this.state.attachementData.itemsTitle}
                </div>
              </div>
              <div className={styles.fileUpload}>
                <div className={styles.fileBtn}>
                  {" "}
                  <div className={styles.uploadIcon}>
                    <Icon image={download} width={14} height={16} />
                  </div>
                  <div className={styles.btnTxt}>
                    {" "}
                    <span>Attach File</span>
                  </div>
                </div>
                <input
                  type="file"
                  id="fileinput"
                  onClick={e => this.handleClick(e)}
                  onChange={e =>
                    this.onUploadFile(
                      e.target.files,
                      this.state.attachementData
                    )
                  }
                  title=""
                  multiple={true}
                  accept="application/pdf, image/*" // accepting only pdf/images(all types)
                />
                <div className={styles.fileSize}>
                  {`Upload JPEG, PNG or PDF (Maximum size ${this.state
                    .attachementData &&
                    this.state.attachementData.maxFileSize} MB)`}
                </div>
              </div>
            </div>
            <div className={styles.filesBox}>
              {this.state.file &&
                this.state.file.map((file, index) => {
                  strArr = file.name ? file.name.split(".") : [];
                  return (
                    <div
                      key={`${file.name}_${index}`}
                      className={styles.uploadFilesBox}
                    >
                      <div
                        className={styles.deleteBOx}
                        onClick={() => this.deleteFile(index)}
                      >
                        <Icon image={deleteUpload} size={20} />
                      </div>
                      <div className={styles.fileNames}>
                        <div className={styles.fileName}>
                          {`${strArr[0].slice(0, 20)}.${strArr[1]}`}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {communication && (
          <div className={styles.communication}>
            <div className={styles.txtFieldBox}>
              <div className={styles.txtFieldHeading}>Email Id</div>
              <div className={styles.txtField}>
                {this.state.email ? (
                  <div className={styles.emailId}>{this.state.email}</div>
                ) : (
                  <FloatingLabelInputWithPlace
                    placeholder={"Enter email ID"}
                    disabled={this.state.email ? true : false}
                    value={this.state.email}
                    onChange={
                      (email => this.setState({ email: email }),
                      () => {
                        this.validateForm(true);
                      })
                    }
                    fontSize={"11px"}
                    // onBlur={() => this.onBlur(true)}
                    type={"email"}
                  />
                )}
              </div>
            </div>
            <div className={styles.txtFieldBox}>
              <div className={styles.txtFieldHeading}>Mobile No*</div>
              <div className={styles.mobileField}>
                <FloatingLabelInputWithPlace
                  placeholder={"Enter Mobile No"}
                  maxLength={"10"}
                  value={this.state.mobile}
                  onChange={mobile =>
                    this.setState(prevState => ({
                      mobile: mobile,
                      btnDisable: prevState.email && mobile ? false : true
                    }))
                  }
                  fontSize={"11px"}
                  onlyNumber={true}
                  // onBlur={() => this.onBlur(true)}
                />
              </div>
            </div>
          </div>
        )}

        <div className={styles.formAction}>
          <div className={styles.stepIndicator}>
            <span
              className={[
                styles.steps,
                basicForm ? styles.currentStep : null
              ].join(" ")}
            />
            <span
              className={[
                styles.steps,
                attachment ? styles.currentStep : null
              ].join(" ")}
            />

            <span
              className={[
                styles.steps,
                communication ? styles.currentStep : null
              ].join(" ")}
            />
          </div>
          <div className={styles.nextButton}>
            <Button
              type="primary"
              backgroundColor="#da1c5c"
              height={40}
              label={btnLabel}
              borderRadius={6}
              width={205}
              textStyle={{ color: "#FFF", fontSize: 14 }}
              disabled={this.state.btnDisable}
              disabledLightGray={this.state.btnDisable}
              onClick={() => this.nextField(currentStep)}
            />
          </div>
        </div>
      </div>
    );
  }
}

CustomerQueryForm.propTypes = {
  questionType: PropTypes.string,
  parentIssueType: PropTypes.string,
  otherQuestion: PropTypes.bool,
  navigatePreviousPage: PropTypes.func,
  getCustomerQueriesFields: PropTypes.func,
  displayToast: PropTypes.func,
  uploadUserFile: PropTypes.func,
  submitCustomerForms: PropTypes.func,
  userDetails: PropTypes.object,
  selectedOrder: PropTypes.object
};
