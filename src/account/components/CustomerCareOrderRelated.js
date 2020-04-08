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
import * as Cookie from "../../lib/Cookie";

export default class CustomerCareOrderRelated extends React.Component {
  constructor(props) {
    super(props);
    const userDetailsCookie = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const getUserDetail = JSON.parse(userDetailsCookie);
    this.state = {
      attachment: null,
      file: [],
      name:
        getUserDetail && getUserDetail.firstName
          ? getUserDetail.firstName.trim()
          : "",
      mobile:
        getUserDetail &&
        getUserDetail.loginType === "mobile" &&
        getUserDetail.userName
          ? getUserDetail.userName
          : "",
      email:
        getUserDetail &&
        getUserDetail.loginType === "email" &&
        getUserDetail.userName
          ? getUserDetail.userName
          : "",
      issueData: "",
      nonOrderRelatedSubIssue: ""
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isSelected !== this.props.isSelected) {
      this.setState({
        nonOrderRelatedSubIssue: "",
        file: ""
      });
    }
    if (
      nextProps.customerQueriesFieldArray !==
      this.props.customerQueriesFieldArray
    ) {
      nextProps.customerQueriesFieldArray.map(field => {
        if (field.componentName === "attachmentComponent") {
          this.setState({ attachment: field });
        } else {
          if (field.optionArray) {
            field.optionArray.map(option => {
              if (option.isSelected == 1) {
                this.setState({
                  [field.componentId]: option.value
                });
              }
            });
          }
          this.setState({ [field.componentId]: "" });
        }
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
                <CheckOutHeader
                  indexNumber={"0"}
                  confirmTitle={
                    listOfField.isMandatory == 1
                      ? listOfField.heading + "*"
                      : listOfField.heading
                  }
                  fontSize={"12px"}
                />
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
              <CheckOutHeader
                indexNumber={"0"}
                confirmTitle={
                  listOfField.isMandatory
                    ? listOfField.heading + " *"
                    : listOfField.heading
                }
                fontSize={"12px"}
              />
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
                            this.setState({
                              [listOfField.componentId]: e.target.value
                            })
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
                <CheckOutHeader
                  indexNumber={"0"}
                  confirmTitle={listOfField.heading}
                  fontSize={"12px"}
                  isAdditionsTextRight={false}
                />
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
                <CheckOutHeader
                  indexNumber={"0"}
                  confirmTitle={listOfField.heading}
                  fontSize={"12px"}
                  isAdditionsTextRight={false}
                />
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

  onUploadFile(file, { maxFileLimit, maxFileSize, title }) {
    // this.setState({ file: file });
    this.props.uploadUserFile(title, file);

   
    // if (file) {
    //   let combinedSize = 0;
    //   for (let f of file) combinedSize += f.size;
    //   if (
    //     combinedSize <= maxFileSize * 1000000 &&
    //     file.length <= maxFileLimit
    //   ) {
    //     const uploadFileResponse = await this.props.uploadUserFile(
    //       title,
    //       file[0]
    //     );
    //     let { uploadUserFile, status } = uploadFileResponse;
    //     if (uploadFileResponse && status === SUCCESS) {
    //       this.setState({
    //         file: file,
    //         uploadedAttachment: uploadUserFile.imageURLlist
    //       });
    //     }
    //   } else {
    //     if (file.length > maxFileLimit)
    //       this.props.displayToast(
    //         `Maximum ${maxFileSize} No. of files allowed`
    //       );
    //     else
    //       this.props.displayToast(
    //         `File size should be less then ${maxFileSize} MB`
    //       );
    //   }
    // }
  }
  formValidate(fieldObj) {
    if (fieldObj.componentName === "labelComponent") {
      return false;
    }
    if (fieldObj.isMandatory == 1) {
      if (fieldObj.componentName === "attachmentComponent") {
        if (this.state.file.length == 0) {
          this.props.displayToast(fieldObj.itemsTitle + " is mandatory");
          return false;
        }
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
      return true;
    }
    return true;
  }

  submitCustomerForm() {
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

    const { issueData } = this.state;
    this.props.customerQueriesFieldArray &&
      this.props.customerQueriesFieldArray.map(field => {
        const validateStatus = this.formValidate(field);
        if (validateStatus) {
          for (let [key, value] of Object.entries(additionalInfo)) {
            if (this.props.uploadedAttachments) {
              additionalInfo.attachment = this.props.uploadedAttachments[0].urlList;
            }
            if (key == field.title) {
              additionalInfo[field.title] = this.state[field.componentId];
            }
          }
        }
        
      });
    let ticketInfo = Object.assign(
      {},
      {
        subIssueType: this.props.selectedObj[0].subIssueType,
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
        contactEmail: this.state.email,
        contactPhn: this.state.mobile,
        contactName: this.state.name ? this.state.name : "no name"
      }
    );
    let raiseTicketObj = {
      additionalInfo,
      ticketInfo,
      customerInfo
    };
    this.props.submitCustomerForm(raiseTicketObj);
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
      this.props.onChangeReasonForOrderRelated(issue);
    }
  }
  onChangeReasonForNonOrderRelated(val, l1OptionsArray) {
    this.props.onChangeReasonForNonOrderRelated(val, l1OptionsArray);
  }

  render() {
    const userDetailsCookie = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const getUserDetail = JSON.parse(userDetailsCookie);
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
                  confirmTitle="Select your order3"
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
                      <CheckOutHeader
                        indexNumber={"0"}
                        confirmTitle={
                          this.state.attachment.heading &&
                          this.state.attachment.heading
                        }
                        fontSize={"12px"}
                      />
                    </div>
                    <ImageUpload
                      value={
                        this.state.file.length
                          ? this.state.file &&
                            this.state.file.map(ele => ele.name).join(", ")
                          : "Upload attachment"
                      }
                      onChange={file =>
                        this.onUploadFile(file, this.state.attachment)
                      }
                    />
                    <div className={styles.secondOrder}>
                      <CheckOutHeader
                        indexNumber={"0"}
                        confirmTitle={
                          this.state.attachment.itemsTitle &&
                          this.state.attachment.itemsTitle
                        }
                        fontSize={"12px"}
                      />
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
                      maxLength={"10"}
                      value={this.state.name}
                      fontSize={"12px"}
                      onChange={name => this.setState({ name: name })}
                    />
                  </div>

                  <div className={styles.conmmunicationalDetails}>
                    <FloatingLabelInput
                      label="Email"
                      fontSize={"12px"}
                      disabled={
                        getUserDetail &&
                        getUserDetail.loginType === "email" &&
                        getUserDetail.userName
                          ? true
                          : false
                      }
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
                      disabled={
                        getUserDetail &&
                        getUserDetail.loginType === "mobile" &&
                        getUserDetail.userName
                          ? true
                          : false
                      }
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
