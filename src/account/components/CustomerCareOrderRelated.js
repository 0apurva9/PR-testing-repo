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
      attachmentName: "Upload attachment",
      uItemplateFeieldArray: [],
      file: []
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
            // [field.componentId]: "",
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
                          onChange={
                            e => this.onChangeCheck(e, listOfField, ele)
                            // this.setState({
                            //   [listOfField.componentId]: e.target.value
                            // })
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
              <div className={styles.secondOrder}>
                {/* <CheckOutHeader
                  indexNumber={"0"}
                  confirmTitle={listOfField.heading}
                  fontSize={"12px"}
                /> */}
                <div className={styles.fieldLabel}>{listOfField.heading}</div>
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
                {/* <CheckOutHeader
                  indexNumber={"0"}
                  confirmTitle={listOfField.heading}
                  fontSize={"12px"}
                  isAdditionsTextRight={false}
                /> */}
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
    // console.log("evt,selectObj",evt,selectObj,option);
    this.setState({ [selectObj.componentId]: evt.target.value }, () => {
      if (option.webFormTemplate) {
        this.props.onChangeReasonForOrderRelated(option, true);
      }
    });
  }

  onUploadFile(file, attachment) {
    // console.log("file",file);
    // let uplodaState=this.state[attachment.componentId];
    // this.setState({[attachment.componentId]:[...uplodaState,file]},()=>{
    //   // for (let i=0 ;i<uplodaState.length;i++){

    //   //   let combineSize=0;
    //   //   combineSize+=uplodaState[i].size;
    //   //   if(combineSize<=attachment.maxFileSize*1000000&&uplodaState.length<=attachment.maxFileLimit)
    //   //   console.log("dsdsd",uplodaState[i].size);

    //   // }
    // })
    let combinedSize = 0;
    // this.props.uploadUserFile(attachment.title, file);
    // for (let f of file) combinedSize += f.size;
    // console.log("combinedSize",combinedSize);
    // this.setState({ file: file });
    // this.props.uploadUserFile(attachment.title, file);

    if (file) {
      // let combinedSize = 0;
      // for (let f of file) combinedSize += f.size;
      if (file.size <= attachment.maxFileSize * 1000000) {
        this.setState({
          file: file,
          attachmentName: file.name
        });
        this.props.uploadUserFile(attachment.title, file);
      } else {
        // if (file.length > maxFileLimit)
        //   this.props.displayToast(
        //     `Maximum ${maxFileSize} No. of files allowed`
        //   );
        // else
        this.props.displayToast(
          `File size should be less then ${attachment.maxFileSize} MB`
        );
      }
    }
  }
  formValidate(fieldObj) {
    // if (fieldObj.componentName === "labelComponent") {
    //   return false;
    // }
    if (fieldObj.isMandatory == 1) {
      if (fieldObj.componentName === "attachmentComponent") {
        return true;
        // if (this.state.file.length == 0) {
        //   this.props.displayToast(fieldObj.itemsTitle + " is mandatory");
        //   return false;
      }

      if (this.state[fieldObj.componentId] == "") {
        this.props.displayToast(fieldObj.heading + " is mandatory");
        return false;
      }
      if (fieldObj.minLimit) {
        if (this.state[fieldObj.componentId].length < fieldObj.minLimit) {
          this.props.displayToast(
            fieldObj.heading + " " + fieldObj.minLimitError
          );
          return false;
        }
      }
      //  if(fieldObj.regex){
      //   var expression = "^" + fieldObj.regex + "+$";
      //   var regexExp = new RegExp(expression);
      //    if(!regexExp.test(this.state[fieldObj.componentId])){
      //     this.props.displayToast(fieldObj.regexError);
      //       return false;
      //   }
      //  }
    } else {
      return true;
    }
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

    const { issueData } = this.state;
    this.props.customerQueriesFieldArray &&
      this.props.customerQueriesFieldArray.map(field => {
        validateStatus = this.formValidate(field);
        for (let [key, value] of Object.entries(additionalInfo)) {
          if (this.props.uploadedAttachments.length > 0) {
            additionalInfo[
              this.state.uploadFileTitle
            ] = this.props.uploadedAttachments[0].urlList;
          }
          if (key == field.title) {
            additionalInfo[field.title] = this.state[field.componentId];
          }
        }
      });

    if (validateStatus) {
      if (!email) {
        this.props.displayToast(EMAIL_TEXT);
        return false;
      }
      if (email && !EMAIL_REGULAR_EXPRESSION.test(email)) {
        this.props.displayToast(EMAIL_VALID_TEXT);
        return false;
      }
      if (!mobile) {
        this.props.displayToast(MOBILE_TEXT);
        return false;
      }
      if (mobile && !MOBILE_PATTERN.test(mobile)) {
        this.props.displayToast(MOBILE_VALID_TEXT);
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
      subIssueList
    } = this.props;
    let attachmentName = "Upload attachment";
    // if (this.state.a) {
    //   let fileName = [];
    //   for (let f of file) fileName.push(f.name);
    //   attachmentName = fileName.join(",");
    // }
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
                  <div className={styles.selectIssue}>
                    <CheckOutHeader
                      indexNumber={"0"}
                      confirmTitle="What is the issue?"
                      fontSize={"13px"}
                    />
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
                      //isEnable={this.state.isEnableForOrderRelated}
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
                    <CheckOutHeader
                      indexNumber={"0"}
                      confirmTitle="What is the issue?"
                      fontSize={"13px"}
                    />
                    <SelectBoxMobile2
                      placeholder="Select issue"
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
                      //isEnable={this.state.isEnableForOrderRelated}
                      onChange={val =>
                        this.onChangeReasonForNonOrderRelated(
                          val,
                          l1OptionsArray
                        )
                      }
                    />
                  </div>
                  {subIssueList && (
                    <div className={styles.selectIssue}>
                      <CheckOutHeader
                        indexNumber={"0"}
                        confirmTitle="Select sub issue?"
                        fontSize={"13px"}
                      />
                      <SelectBoxMobile2
                        placeholder="Select issue"
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
                        //isEnable={this.state.isEnableForOrderRelated}
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
                      {/* <CheckOutHeader
                        indexNumber={"0"}
                        confirmTitle={
                          this.state.attachment.heading &&
                          this.state.attachment.heading
                        }
                        fontSize={"12px"}
                      /> */}
                      {this.state.attachment.heading && (
                        <div className={styles.fieldLabel}>
                          {this.state.attachment.heading}
                        </div>
                      )}
                    </div>
                    <ImageUpload
                      value={this.state.attachmentName}
                      onChange={file =>
                        this.onUploadFile(file, this.state.attachment)
                      }
                    />
                    <div className={styles.secondOrder}>
                      {/* <CheckOutHeader
                        indexNumber={"0"}
                        confirmTitle={
                          this.state.attachment.itemsTitle &&
                          this.state.attachment.itemsTitle
                        }
                        fontSize={"12px"}
                      /> */}
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
                      indexNumber={isSelected === 0 ? "4" : "3"}
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
