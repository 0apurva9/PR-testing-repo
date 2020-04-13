import React from "react";
import styles from "./OrderRelatedIssue.css";
import CheckOutHeader from "../../cart/components/CheckOutHeader";
import ProductImage from "../../general/components/ProductImage";
import SelectBoxMobile2 from "../../general/components/SelectBoxMobile2";
import FloatingLabelInputWithPlace from "../../general/components/FloatingLabelInputWithPlace";
import FloatingLabelInput from "../../general/components/FloatingLabelInput";
import CheckboxAndText from "../../cart/components/CheckboxAndText";
import TextArea from "../../general/components/TextArea";
import ImageUpload from "./ImageUpload";
import Button from "../../general/components/Button.js";
import format from "date-fns/format";
import { LOGGED_IN_USER_DETAILS } from "../../lib/constants";
import {
  EMAIL_REGULAR_EXPRESSION,
  MOBILE_PATTERN
} from "../../auth/components/Login";

import * as Cookie from "../../lib/Cookie";
const MOBILE_TEXT = "Please enter mobile number";
const MOBILE_VALID_TEXT = "Please enter valid mobile number";
const EMAIL_TEXT = "Please enter emailId";
const EMAIL_VALID_TEXT = "Please enter  valid emailId";
export default class CustomerCareOrderRelated extends React.Component {
  constructor(props) {
    super(props);
    const userDetailsCookie = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const getUserDetails = JSON.parse(userDetailsCookie);
    this.state = {
      attachment: null,
      file: [],
      name:
        getUserDetails && getUserDetails.firstName
          ? getUserDetails.firstName.trim()
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
      issueData: "",
      nonOrderRelatedSubIssue: "",
      // attachmentName: "Upload attachment",
      uItemplateFeieldArray: [],
      file: [],
      subIssue: ""
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isSelected !== this.props.isSelected) {
      this.setState({
        nonOrderRelatedSubIssue: "",
        file: "",
        attachmentName: "Upload attachment"
      });
    }
    if (
      nextProps.customerQueriesFieldArray !==
      this.props.customerQueriesFieldArray
    ) {
      nextProps.customerQueriesFieldArray.map(field => {
        if (field.componentName === "attachmentComponent") {
          this.setState({
            attachment: field,
            uploadFileTitle: field.title
          });
        } else {
          if (
            field.componentName === "radioComponent" ||
            field.componentName === "checkboxComponent"
          ) {
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
    if (nextProps && nextProps.userDetails) {
      this.setState({
        email: nextProps.userDetails.emailID
          ? nextProps.userDetails.emailID
          : "",
        name: nextProps.userDetails.firstName
          ? nextProps.userDetails.firstName
          : "",
        mobile: nextProps.userDetails.mobileNumber
          ? nextProps.userDetails.mobileNumber
          : ""
      });
    }
  }

  formField() {
    return (
      this.props.customerQueriesFieldArray &&
      this.props.customerQueriesFieldArray.map(listOfField => {
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
            <React.Fragment>
              <div className={styles.secondOrder}>
                <div className={styles.fieldLabelTxt}>
                  {listOfField.isMandatory == 1
                    ? listOfField.heading + "*"
                    : listOfField.heading}
                </div>
              </div>
              <div className={styles.textInformationHolder}>
                <FloatingLabelInputWithPlace
                  placeholder={`${listOfField.placeholder}`}
                  disabled={false}
                  maxLength={listOfField.maxLimit}
                  value={this.state[listOfField.componentId]}
                  onChange={value =>
                    this.setState({ [listOfField.componentId]: value })
                  }
                  fontSize={"11px"}
                  onlyNumber={listOfField.hexCode == "isNumeric" ? true : false}
                />
              </div>
            </React.Fragment>
          );
        }

        if (listOfField.componentName == "radioComponent") {
          return (
            <div className={styles.secondOrder}>
              <div className={styles.fieldLabel}>
                {listOfField.isMandatory == 1
                  ? listOfField.heading + "*"
                  : listOfField.heading}
              </div>
              {listOfField &&
                listOfField.optionArray.map(ele => {
                  return (
                    <div key={ele.value} className={styles.radioBtnMyAcc}>
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
          );
        }
        if (listOfField.componentName == "textAreaComponent") {
          return (
            <React.Fragment>
              <div className={styles.textAreaHeading}>
                <div className={styles.fieldLabel}>{listOfField.heading}</div>
                <div className={styles.maxLimitBox}>
                  <span className={styles.totalText}>
                    {this.state[listOfField.componentId].length}
                  </span>
                  /<span>{listOfField.maxLimit}</span>
                </div>
              </div>
              <TextArea
                placeholder={listOfField.placeholder}
                value={this.state[listOfField.componentId]}
                onChange={value =>
                  this.setState({ [listOfField.componentId]: value })
                }
                maxLength={parseInt(listOfField.maxLimit)}
              />
            </React.Fragment>
          );
        }

        if (listOfField.componentName == "checkboxComponent") {
          return (
            <div className={styles.textInformationHolder}>
              <div className={styles.secondOrder}>
                <div className={styles.fieldLabel}>{listOfField.heading}</div>
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
    this.setState({ [selectObj.componentId]: evt.target.value }, () => {
      if (option.webFormTemplate) {
        this.props.onChangeReasonForOrderRelated(option, true);
      }
    });
  }

  onUploadFile(file, attachment) {
    if (file) {
      let combinedSize = 0;
      for (let f of file) combinedSize += f.size;
      if (
        combinedSize <= attachment.maxFileSize * 1000000 &&
        file.length <= attachment.maxFileLimit
      ) {
        let uploadUserFileObject = new FormData();
        let issueType =
          this.props.isSelected == 1 ? "NonOrderRelated" : "orderRelated";
        uploadUserFileObject.append("IssueType", issueType);
        let uploadFiles = [];
        for (let files of file) {
          uploadUserFileObject.append(attachment.title, files);
          uploadFiles.push(files);
        }
        this.setState({ file: uploadFiles });
        this.props.uploadUserFile(uploadUserFileObject);
      } else {
        if (file.length > attachment.maxFileLimit)
          this.props.displayToast(
            `Maximum ${attachment.maxFileSize} No. of files allowed`
          );
        else
          this.props.displayToast(
            `File size should be less then ${attachment.maxFileSize} MB`
          );
      }
    }
  }
  formValidate(fieldObj) {
    if (fieldObj.isMandatory == 1) {
      if (
        fieldObj.componentName === "attachmentComponent" &&
        this.state.file.length <= 0
      ) {
        this.props.displayToast(fieldObj.heading + " is mandatory");
        return false;
      } else if (this.state[fieldObj.componentId] == "") {
        this.props.displayToast(fieldObj.heading + " is mandatory");
        return false;
      } else if (
        fieldObj.minLimit &&
        this.state[fieldObj.componentId].length < fieldObj.minLimit
      ) {
        this.props.displayToast(
          fieldObj.heading + " " + fieldObj.minLimitError
        );
        return false;
      }
      return true;
    } else {
      return true;
    }
    //   //  if(fieldObj.regex){
    //   //   var expression = "^" + fieldObj.regex + "+$";
    //   //   var regexExp = new RegExp(expression);
    //   //    if(!regexExp.test(this.state[fieldObj.componentId])){
    //   //     this.props.displayToast(fieldObj.regexError);
    //   //       return false;
    //   //   }
    //   //  }
    // } else {
    //   return true;
    // }
  }

  submitCustomerForm() {
    const { email, mobile, name } = this.state;
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
      eGVNumber: "",
      deactivationReason: "",
      alternateContact: "",
      customerEmail: "",
      bulkProduct: "",
      bulkQuantity: "",
      pincodedetail: "",
      GSTInvoice: "",
      creditCardStatement: "",
      bankStatement: "",
      boxImages: "",
      balanceScreenshot: "",
      lastTransactionScreenshot: "",
      missingAccessories: ""
    };
    let validateStatus = false;
    for (let obj of this.props.customerQueriesFieldArray) {
      validateStatus = this.formValidate(obj);
      if (!validateStatus) {
        break;
      } else {
        for (let [key, value] of Object.entries(additionalInfo)) {
          if (key == this.state.uploadFileTitle) {
            if (this.props.uploadedAttachments.length) {
              let imgUlrWithComma = Array.prototype.map
                .call(this.props.uploadedAttachments[0].urlList, function(
                  item
                ) {
                  return item.fileURL;
                })
                .join(",");
              const imgUrlList = [{ fileURL: imgUlrWithComma }];
              additionalInfo[this.state.uploadFileTitle] = imgUrlList;
            } else {
              additionalInfo[this.state.uploadFileTitle] = "";
            }
          } else if (key == obj.title) {
            additionalInfo[obj.title] = this.state[obj.componentId];
          }
        }
      }
    }
    if (validateStatus) {
      if (!email) {
        this.props.displayToast(EMAIL_TEXT);
        this.setState({ email: "" });
        return false;
      }
      if (email && !EMAIL_REGULAR_EXPRESSION.test(email)) {
        this.props.displayToast(EMAIL_VALID_TEXT);
        this.setState({ email: "" });
        return false;
      }
      if (!mobile) {
        this.props.displayToast(MOBILE_TEXT);
        this.setState({ mobile: "" });
        return false;
      }
      if (mobile && !MOBILE_PATTERN.test(mobile)) {
        this.props.displayToast(MOBILE_VALID_TEXT);
        this.setState({ mobile: "" });
        return false;
      } else {
        let ticketInfo = Object.assign(
          {},
          {
            subIssueType: this.props.selectedObj[0].subIssueType
              ? this.props.selectedObj[0].subIssueType
              : "",
            l0: this.props.selectedObj[0].l0,
            l1: this.props.selectedObj[0].l1,
            l2: this.props.selectedObj[0].l2,
            l3: this.props.selectedObj[0].l3,
            l4: this.props.selectedObj[0].l4,
            ticketType: this.props.selectedObj[0].ticketType,
            transactionId: this.props.transactionId,
            orderCode: this.props.orderCode,
            subOrderCode: this.props.subOrderCode
          }
        );
        let customerInfo = Object.assign(
          {},
          {
            contactEmail: email,
            contactPhn: mobile,
            contactName: name ? name : "no name"
          }
        );
        let raiseTicketObj = {
          additionalInfo,
          ticketInfo,
          customerInfo
        };
        this.props.submitCustomerForm(raiseTicketObj);
      }
    }
  }
  onChangeReasonForOrderRelated(val) {
    let { l1OptionsArray, isSelected } = this.props;
    let issue = "";
    if (isSelected == 1) {
      this.setState({ subIssue: val.label });
      issue = this.props.subIssueList.filter(function(issue) {
        return issue.subIssueType === val.label;
      });
    } else {
      issue = l1OptionsArray.filter(function(issue) {
        return issue.issueType === val.label;
      });
    }

    if (this.props.onChangeReasonForOrderRelated) {
      this.props.onChangeReasonForOrderRelated(issue, false);
    }
  }
  onChangeReasonForNonOrderRelated(val, l1OptionsArray) {
    this.setState({ subIssue: "" });
    this.props.onChangeReasonForNonOrderRelated(val, l1OptionsArray);
  }

  render() {
    let {
      l1OptionsArray,
      customerQueriesFieldArray,
      isSelected,
      productImageURL,
      orderDate,
      productName,
      productPrice,
      productStatus,
      transactionId,
      onChange,
      webFormStatus,
      goToOrderPage,
      selectedObj,
      subIssueList,
      parentIssueLabel
    } = this.props;
    let attachmentName = "Upload attachment";
    if (this.state.file.length) {
      let fileName = [];
      for (let f of this.state.file) fileName.push(f.name);
      attachmentName = fileName.join(",");
    }
    let parentIssueLabels = "Select issue",
      childIssueLabels = "Select sub-issue";
    if (parentIssueLabel) {
      parentIssueLabels = parentIssueLabel;
    }

    if (this.state.subIssue) {
      childIssueLabels = this.state.subIssue;
    }

    return (
      <div className={styles.formHolder}>
        <div className={styles.firstTab}>
          {isSelected === 0 && (
            <div
              className={styles.selectedOrder}
              onClick={() => goToOrderPage()}
            >
              <div className={styles.headingHolder}>
                <CheckOutHeader
                  indexNumber="1"
                  confirmTitle="Select your order"
                />
                <div className={styles.iconHolder} />
              </div>
              {!productImageURL &&
              !orderDate &&
              !productName &&
              !productPrice &&
              !productStatus ? (
                <div
                  className={styles.dummySelectBoxWithIcon}
                  onClick={() => this.goToOrderPage()}
                />
              ) : (
                <div
                  className={styles.productsDisplayHolder}
                  onClick={() =>
                    onChange({
                      showOrder: true,
                      productImageURL: "",
                      orderDate: "",
                      productName: "",
                      productPrice: "",
                      productStatus: ""
                    })
                  }
                >
                  <div className={styles.imageHolder}>
                    <ProductImage image={productImageURL} />
                  </div>
                  <div className={styles.dataHolder}>
                    {productName && (
                      <div className={styles.dataDescription}>
                        {productName}
                      </div>
                    )}
                    {orderDate && (
                      <div className={styles.dataDescription}>
                        {`Order on: ${format(orderDate, "DD MMM,YYYY")}`}
                      </div>
                    )}
                    {productPrice && (
                      <div className={styles.dataDescription}>
                        {productPrice}
                      </div>
                    )}
                    {productStatus && (
                      <div className={styles.dataDescription}>
                        {productStatus}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className={styles.queryFieldBox}>
            {transactionId && (
              <div className={styles.formBox}>
                <div className={styles.formWidth}>
                  <div className={styles.secondOrder}>
                    <CheckOutHeader
                      indexNumber={isSelected === 0 ? "2" : "1"}
                      confirmTitle="Select issue"
                      fontSize={"14px"}
                    />
                  </div>
                  <div
                    className={[styles.selectIssue, styles.paddingBottom].join(
                      " "
                    )}
                  >
                    <div className={styles.issueHeadingBox}>
                      What is the issue?
                    </div>
                    <SelectBoxMobile2
                      placeholder="Select issue"
                      arrowColour="black"
                      height={33}
                      extraVisibleBoxCss={true}
                      options={
                        l1OptionsArray &&
                        l1OptionsArray.map((val, i) => {
                          return {
                            value: val.uItemplateCode,
                            label: val.issueType
                          };
                        })
                      }
                      onChange={val =>
                        this.onChangeReasonForOrderRelated(
                          val,
                          customerQueriesFieldArray
                        )
                      }
                    />
                  </div>
                  {selectedObj && selectedObj[0].webform === "No" && (
                    <div className={styles.selectIssue}>
                      {selectedObj && selectedObj[0].solution}
                    </div>
                  )}
                  {selectedObj &&
                  selectedObj[0].webform === "Yes" &&
                  webFormStatus
                    ? this.formField()
                    : null}
                </div>
              </div>
            )}
            {isSelected == 1 && (
              <div className={styles.formBox}>
                <div className={styles.formWidth}>
                  <div className={styles.secondOrder}>
                    <CheckOutHeader
                      indexNumber={isSelected === 0 ? "2" : "1"}
                      confirmTitle="Select issue"
                      fontSize={"14px"}
                    />
                  </div>
                  <div className={styles.selectIssue}>
                    <div className={styles.issueHeadingBox}>
                      What is the issue?
                    </div>
                    <SelectBoxMobile2
                      placeholder="Select issue"
                      label={parentIssueLabels}
                      arrowColour="black"
                      height={33}
                      extraVisibleBoxCss={true}
                      options={
                        l1OptionsArray &&
                        l1OptionsArray.map((val, i) => {
                          return {
                            value: val.parentIssueType,
                            label: val.parentIssueType
                          };
                        })
                      }
                      onChange={val =>
                        this.onChangeReasonForNonOrderRelated(
                          val,
                          l1OptionsArray
                        )
                      }
                    />
                  </div>
                  {subIssueList && (
                    <div
                      className={[
                        styles.selectIssue,
                        styles.paddingBottom
                      ].join(" ")}
                    >
                      <div className={styles.issueHeadingBox}>
                        Select sub issue?
                      </div>

                      <SelectBoxMobile2
                        placeholder="Select sub-issue"
                        label={childIssueLabels}
                        arrowColour="black"
                        height={33}
                        extraVisibleBoxCss={true}
                        options={
                          subIssueList &&
                          subIssueList.map((val, i) => {
                            return {
                              value: val.UItemplateCode,
                              label: val.subIssueType
                            };
                          })
                        }
                        onChange={val =>
                          this.onChangeReasonForOrderRelated(
                            val,
                            l1OptionsArray
                          )
                        }
                      />
                    </div>
                  )}

                  {selectedObj && selectedObj[0].webform === "No" && (
                    <div className={styles.selectIssue}>
                      {selectedObj && selectedObj[0].solution}
                    </div>
                  )}
                  {selectedObj &&
                  selectedObj[0].webform === "Yes" &&
                  webFormStatus
                    ? this.formField()
                    : null}
                </div>
              </div>
            )}

            {selectedObj &&
            this.state.attachment &&
            selectedObj[0].webform === "Yes" &&
            webFormStatus ? (
              <div className={styles.formBox}>
                <div className={styles.formWidth}>
                  <div className={styles.secondOrder}>
                    <CheckOutHeader
                      indexNumber={this.props.isSelected === 0 ? "3" : "2"}
                      confirmTitle={`Add Attachment${
                        this.state.attachment.isMandatory ? "*" : "(optional)"
                      }`}
                      fontSize={"14px"}
                    />
                    <div className={styles.validImage}>
                      {`Maximum size ${this.state.attachment.maxFileSize} MB`}
                    </div>
                  </div>

                  <div className={styles.imageInput}>
                    <div className={styles.secondOrder}>
                      {this.state.attachment.heading && (
                        <div className={styles.fieldLabel}>
                          {this.state.attachment.heading}
                        </div>
                      )}
                    </div>
                    <ImageUpload
                      value={attachmentName}
                      onChange={file =>
                        this.onUploadFile(file, this.state.attachment)
                      }
                      isMultipleUpload={true}
                    />
                    <div className={styles.secondOrder}>
                      {this.state.attachment.itemsTitle && (
                        <div className={styles.fieldLabel}>
                          {this.state.attachment.itemsTitle}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
            {this.props.selectedObj &&
            this.props.selectedObj[0].webform === "Yes" &&
            webFormStatus ? (
              <div className={styles.formBox}>
                <div className={styles.formWidth}>
                  <div className={styles.secondOrder}>
                    <CheckOutHeader
                      indexNumber={
                        isSelected === 0 && this.state.attachment
                          ? "4"
                          : isSelected === 1 && !this.state.attachment
                          ? "2"
                          : "3"
                      }
                      confirmTitle="Communication Details"
                      fontSize={"14px"}
                    />
                  </div>
                  <div className={styles.conmmunicationalDetails}>
                    <FloatingLabelInput
                      label="Name *"
                      value={this.state.name}
                      fontSize={"12px"}
                      onChange={name => this.setState({ name: name })}
                    />
                  </div>

                  <div className={styles.conmmunicationalDetails}>
                    <FloatingLabelInput
                      label="Email"
                      fontSize={"12px"}
                      disabled={this.state.email ? true : false}
                      value={this.state.email}
                      onChange={email => this.setState({ email: email })}
                    />
                  </div>
                  <div className={styles.conmmunicationalDetails}>
                    <FloatingLabelInput
                      label="Phone number *"
                      maxLength={"10"}
                      value={this.state.mobile}
                      fontSize={"12px"}
                      onChange={mobile => this.setState({ mobile: mobile })}
                      disabled={this.state.mobile ? true : false}
                      onlyNumber={true}
                    />
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          {this.props.selectedObj &&
            this.props.selectedObj[0].webform === "Yes" &&
            webFormStatus && (
              <div className={styles.buttonHolder}>
                <div className={styles.button}>
                  <Button
                    type="primary"
                    height={38}
                    label={"SUBMIT NOW"}
                    width={166}
                    textStyle={{ color: "#fff", fontSize: 14 }}
                    onClick={() => this.submitCustomerForm()}
                  />
                </div>
              </div>
            )}
        </div>
      </div>
    );
  }
}
