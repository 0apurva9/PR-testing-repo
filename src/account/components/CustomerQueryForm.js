import React, { Component } from "react";
import FloatingLabelInputWithPlace from "../../general/components/FloatingLabelInputWithPlace";
import TextArea from "../../general/components/TextArea";
import Icon from "../../xelpmoc-core/Icon";
import CheckboxAndText from "../../cart/components/CheckboxAndText";
import * as Cookie from "../../lib/Cookie";

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
const TICKET_OTHER_ECOMMERCE = "Other e-Commerce";
const MOBILE_VALID_TEXT = "Please enter valid mobile number";
const EMAIL_VALID_TEXT = "Please enter  valid emailId";

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
      // files: [],
      // uploadedAttachment: "",
      file: [],
      // subIssue: "",
      uploadedAttachment: "",
      filesData: []
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps &&
      nextProps.customerQueriesField !== this.props.customerQueriesField
    ) {
      this.initialState(true);
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

  componentDidMount() {
    this.initialState(false);
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

  initialState(isAppend) {
    this.props.customerQueriesField &&
      this.props.customerQueriesField.map(field => {
        if (field.componentName === "attachmentComponent") {
          this.setState({
            attachementData: field,
            uploadFileTitle: field.title,
            isAttachment: true
          });
        } else {
          if (isAppend) {
            if (field.isMandatory) {
              if (this.state[field.componentId] == "") {
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
            <div className={styles.txtFieldBox}>
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
                    this.setState({ [listOfField.componentId]: value })
                  }
                  fontSize={"11px"}
                  onlyNumber={listOfField.hexCode == "isNumeric" ? true : false}
                  onBlur={() => this.onBlur(false)}
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

                      // <div key={ele.value} className={styles.radioBtnMyAcc}>
                      //   <label>
                      //     {ele.optionName}
                      //     <input
                      //       type="radio"
                      //       value={ele.value}
                      //       checked={
                      //         ele.value == this.state[listOfField.componentId]
                      //           ? true
                      //           : false
                      //       }
                      //       onChange={e =>
                      //         this.onChangeCheck(e, listOfField, ele)
                      //       }
                      //     />
                      //     <span />
                      //   </label>
                      // </div>
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
                    this.setState({ [listOfField.componentId]: value })
                  }
                  maxLength={parseInt(listOfField.maxLimit)}
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
    this.setState({ [selectObj.componentId]: evt.target.value }, () => {
      this.onBlur();
      if (option.webFormTemplate) {
        this.props.getCustomerQueriesFields(option.webFormTemplate, true);
      }
    });
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
      for (let obj of customerQueriesField) {
        validateStatus = this.formValidate(obj);
        if (!validateStatus) {
          break;
        }
      }
      if (validateStatus) {
        this.setState({
          basicForm: false,
          communication: !isAttachment,
          attachment: isAttachment,
          btnDisable:
            attachementData && attachementData.isMandatory ? true : false,
          currentStep: isAttachment ? ATTACHEMENT : COMMUNICATION,
          btnLabel: isAttachment ? btnLabel : "SUBMIT"
        });
      }
    }

    if (currentStep == ATTACHEMENT) {
      this.setState({
        attachment: false,
        communication: true,
        currentStep: COMMUNICATION,
        btnDisable: !mobile || !email ? true : false,
        btnLabel: "SUBMIT"
      });

      // if (
      //   this.state.attachementData &&
      //   this.state.attachementData.isMandatory &&
      //   !this.state.files.length
      // ) {
      //   this.props.displayToast(
      //     this.state.attachementData.heading + " is mandatory"
      //   );
      //   return false;
      // } else {
      //   this.setState({
      //     attachment: false,
      //     communication: true,
      //     currentStep: COMMUNICATION,
      //     btnLabel: "SUBMIT"
      //   });
      // }
    }
    if (currentStep == COMMUNICATION) {
      if (this.state.email && !EMAIL_REGULAR_EXPRESSION.test(email)) {
        this.props.displayToast(EMAIL_VALID_TEXT);
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
          missingAccessories: ""
        };

        for (let obj of customerQueriesField) {
          for (let [key, value] of Object.entries(additionalInfo)) {
            if (key == uploadFileTitle) {
              if (
                uploadedAttachment &&
                uploadedAttachment[0].urlList.length > 0
              ) {
                let urlList = [];
                uploadedAttachment.forEach(item => {
                  let list = item.urlList.map(url => url.fileURL);
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
            transactionId:
              selectedOrder &&
              selectedOrder.products &&
              selectedOrder.products[0].transactionId
                ? selectedOrder.products[0].transactionId
                : "",
            orderCode:
              selectedOrder && selectedOrder.orderId
                ? selectedOrder.orderId
                : "",
            subOrderCode:
              selectedOrder &&
              selectedOrder.products &&
              selectedOrder.products[0].sellerorderno
                ? selectedOrder.products[0].sellerorderno
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
        // console.log("raiseTicketObj", raiseTicketObj);

        this.props.submitCustomerForms(raiseTicketObj);
      }
      // this.setState({})
      // this.props.submitCustomerForms("test data");
    }
  }

  onBlur(isEmailMobileValidate) {
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

  // async onUploadFile(event, { maxFileLimit, maxFileSize, title }) {
  //   const newFile = event.target.files;
  //   if (newFile) {
  //     let uploadFiles = [];
  //     let combinedSize = 0,
  //       totalFile = [...newFile, ...this.state.filesData];
  //     for (let f of totalFile) {
  //       combinedSize += f.size / 1048576; //converting file size into MB
  //       uploadFiles.push(URL.createObjectURL(f));
  //     }
  //     if (combinedSize <= maxFileSize && totalFile.length <= maxFileLimit) {
  //       const uploadFileResponse = await this.props.uploadUserFile(
  //         this.props.questionType,
  //         title,
  //         Array.from(newFile)
  //       );
  //       let { uploadUserFile, status } = uploadFileResponse;
  //       if (uploadFileResponse && status === SUCCESS) {
  //         this.setState(prevState => ({
  //           files: uploadFiles,
  //           filesData: [...prevState.filesData, ...newFile],
  //           btnDisable: false,
  //           uploadedAttachment: [
  //             ...prevState.uploadedAttachment,
  //             ...uploadUserFile.imageURLlist
  //           ]
  //         }));
  //       }
  //     } else {
  //       if (totalFile.length > maxFileLimit)
  //         this.props.displayToast(
  //           `Maximum ${maxFileLimit} No. of files allowed`
  //         );
  //       else
  //         this.props.displayToast(
  //           `File size should be less then ${maxFileSize} MB`
  //         );
  //     }
  //   }
  // }

  async onUploadFile(event, { maxFileLimit, maxFileSize, title }) {
    const newFile = event.target.files;
    if (newFile) {
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
  }

  deleteFile(index) {
    const copyuploadedAttachment = [...this.state.uploadedAttachment];
    var files = [...this.state.file];
    copyuploadedAttachment[0].urlList.splice(index, 1);
    files.splice(index, 1);
    this.setState({ uploadedAttachment: copyuploadedAttachment, file: files });
  }

  componentWillUnmount() {
    console.log("unMount check");
  }

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
    return (
      <div
        className={[
          styles.base,
          !this.props.otherQuestion ? styles.marginTop : null
        ].join(" ")}
      >
        {basicForm && (
          <div className={styles.basicForm}>
            {this.props.otherQuestion && (
              <div className={styles.otherQuestionBox}>
                <div className={styles.parentIssueHeader}>
                  <div className={styles.parentIssue}>
                    {" "}
                    {this.props.parentIssueType}
                  </div>
                  {/* <div className={styles.goTOOrder}>
                    <Button
                      type="hollow"
                      label="Go to orders"
                      borderColor={""}
                      width={118}
                      height={20}
                      color={"#da1c5c"}
                      padding="0px 5px"
                      // onClick={() => this.props.showAllQuestion()}
                    />
                  </div> */}
                </div>
                <div className={styles.subIssueType}>
                  {this.props.question.subIssueType}
                </div>
              </div>
            )}
            <div className={styles.header}>{"Create your ticket"}</div>
            {this.formField()}
          </div>
        )}
        {attachment && this.state.isAttachment && (
          <div className={styles.attachment}>
            <div className={styles.header}>
              Add attachements{" "}
              {this.state.attachementData.isMandatory ? " *" : " (optional)"}{" "}
            </div>
            <div className={styles.fileBox}>
              <div className={styles.fileInstruction}>
                <ol className={styles.fileGroup}>
                  <li className={styles.fileList}>
                    Images of outer box from all angles
                  </li>
                  <li className={styles.fileList}>
                    Images of outer box with invoice and AWB
                  </li>
                  <li className={styles.fileList}>
                    Images of the damaged part
                  </li>
                </ol>
              </div>
              <div className={styles.fileUpload}>
                <button className={styles.fileBtn}>
                  {" "}
                  <div className={styles.uploadIcon}>
                    <Icon image={download} width={14} height={16}></Icon>
                  </div>
                  <div className={styles.btnTxt}>
                    {" "}
                    <span>Upload Image</span>
                  </div>
                </button>
                <input
                  type="file"
                  name="myfile"
                  onChange={val =>
                    this.onUploadFile(val, this.state.attachementData)
                  }
                  multiple
                  accept="text/plain, application/pdf, image/*" // accepting only txt/pdf/images(all types)
                />
                <div className={styles.fileSize}>
                  {`Upload JPEG, PNG (Maximum size ${this.state
                    .attachementData &&
                    this.state.attachementData.maxFileSize} MB)`}
                </div>
              </div>
            </div>
            <div className={styles.filesBox}>
              {this.state.file &&
                this.state.file.map((files, index) => {
                  return (
                    <div className={styles.uploadFilesBox}>
                      <div
                        className={styles.deleteBOx}
                        onClick={() => this.deleteFile(index)}
                      >
                        <Icon image={deleteUpload} size={20} />
                      </div>
                      <div className={styles.fileName}>
                        <div className={styles.fileNames}>{files.name}</div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {communication && (
          <div className={styles.communication}>
            <div className={styles.header}>Communication details</div>
            <div className={styles.txtFieldBox}>
              <div className={styles.txtFieldHeading}>Email Id</div>
              <div className={styles.txtField}>
                <FloatingLabelInputWithPlace
                  placeholder={"Enter email ID"}
                  disabled={this.state.email ? true : false}
                  value={this.state.email}
                  onChange={email => this.setState({ email: email })}
                  fontSize={"11px"}
                  onBlur={() => this.onBlur(true)}
                />
              </div>
            </div>
            <div className={styles.txtFieldBox}>
              <div className={styles.txtFieldHeading}>Mobile No.</div>
              <div className={styles.txtField}>
                <FloatingLabelInputWithPlace
                  placeholder={"Enter Mobile No"}
                  maxLength={"10"}
                  value={this.state.mobile}
                  onChange={mobile => this.setState({ mobile: mobile })}
                  fontSize={"11px"}
                  onlyNumber={true}
                  onBlur={() => this.onBlur(true)}
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
            ></span>
            {this.state.isAttachment && (
              <span
                className={[
                  styles.steps,
                  attachment ? styles.currentStep : null
                ].join(" ")}
              ></span>
            )}

            <span
              className={[
                styles.steps,
                communication ? styles.currentStep : null
              ].join(" ")}
            ></span>
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
