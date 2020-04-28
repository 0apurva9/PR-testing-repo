import React, { Component } from "react";
import FloatingLabelInputWithPlace from "../../general/components/FloatingLabelInputWithPlace";
// import FloatingLabelInput from "../../general/components/FloatingLabelInput";
import TextArea from "../../general/components/TextArea";
import Icon from "../../xelpmoc-core/Icon";
import * as Cookie from "../../lib/Cookie";
import CheckboxAndText from "../../cart/components/CheckboxAndText";
import styles from "./CustomerQueryForm.css";
import Button from "../../general/components/Button.js";
import UploadIcon from "../components/img/Upload.svg";
import cancelred from "../components/img/cancelred.svg";
import {
  LOGGED_IN_USER_DETAILS,
  // CUSTOMER_ACCESS_TOKEN,
  // LOGIN_PATH
  SUCCESS
} from "../../lib/constants";
const BASIC_FORM = "bacisform";
const ATTACHEMENT = "attachment";
const COMMUNICATION = "communication";
const TICKET_TATACLIQ = "tataCliq";
const TICKET_OTHER_ECOMMERCE = "Other e-Commerce";

export default class CustomerQueryForm extends Component {
  constructor(props) {
    super(props);
    const userDetailsCookie = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const getUserDetails = JSON.parse(userDetailsCookie);
    this.state = {
      basicForm: true,
      attachment: false,
      attachementData: null,
      isAttachment: false,
      communication: false,
      currentStep: BASIC_FORM,
      btnLabel: "NEXT",
      ticketType: TICKET_TATACLIQ,
      btnDisable: false,
      files: [],
      uploadedAttachment: "",
      filesData: [],
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
          : ""
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.customerQueriesField !== this.props.customerQueriesField) {
      nextProps.customerQueriesField.map(field => {
        if (field.componentName === "attachmentComponent") {
          this.setState({
            attachementData: field,
            uploadFileTitle: field.title,
            isAttachment: true
          });
        } else {
          if (field.isMandatory) {
            this.setState({ btnDisable: true });
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
    if (nextProps && nextProps.userDetails) {
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
              <div className={styles.textAreaComponent}>
                <div className={styles.textAreaBox}>
                  <div className={styles.txtFieldHeading}>
                    {listOfField.isMandatory
                      ? listOfField.heading + "*"
                      : listOfField.heading}
                  </div>
                  <div className={styles.maxLimitBox}>
                    <span className={styles.totalText}>
                      {this.state[listOfField.componentId] &&
                        this.state[listOfField.componentId].length}
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
      if (option.webFormTemplate) {
        this.props.onChangeReasonForOrderRelated(option, true);
      }
    });
  }

  nextField(currentStep) {
    let validateStatus = false;
    if (currentStep == BASIC_FORM) {
      for (let obj of this.props.customerQueriesField) {
        validateStatus = this.formValidate(obj);
        if (!validateStatus) {
          break;
        }
      }
      if (true) {
        this.setState({
          basicForm: false,
          communication: !this.state.isAttachment,
          attachment: this.state.isAttachment,
          btnDisable: this.state.attachementData.isMandatory ? true : false,
          currentStep: this.state.isAttachment ? ATTACHEMENT : COMMUNICATION,
          btnLabel: this.state.isAttachment ? this.state.btnLabel : "SUBMIT"
        });
      }
    }

    if (currentStep == ATTACHEMENT) {
      this.setState({
        attachment: false,
        communication: true,
        currentStep: COMMUNICATION,
        btnDisable: !this.state.mobile || !this.state.email ? true : false,
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
      // this.setState({})
      console.log("calll");
      this.props.submitCustomerForms("test data");
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
      fieldObj.minLimit !== "-1" &&
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

  async onUploadFile(event, { maxFileLimit, maxFileSize, title }) {
    const newFile = event.target.files;
    if (newFile) {
      let uploadFiles = [];
      let combinedSize = 0,
        totalFile = [...newFile, ...this.state.filesData];
      for (let f of totalFile) {
        combinedSize += f.size / 1048576; //converting file size into MB
        uploadFiles.push(URL.createObjectURL(f));
      }
      let issueType =
        this.props.isSelected == 1 ? "NonOrderRelated" : "orderRelated";
      if (combinedSize <= maxFileSize && totalFile.length <= maxFileLimit) {
        const uploadFileResponse = await this.props.uploadUserFile(
          "orderRelated",
          title,
          Array.from(newFile)
        );
        let { uploadUserFile, status } = uploadFileResponse;
        if (uploadFileResponse && status === SUCCESS) {
          this.setState(prevState => ({
            files: uploadFiles,
            filesData: [...prevState.filesData, ...newFile],
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

  deleteFiles() {
    console.log("delete file");
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
    console.log("ticketType", this.props.uploadedAttachments);
    // this.props.displayToast("toaset check")

    return (
      <div className={styles.base}>
        {basicForm && (
          <div className={styles.basicForm}>
            <div className={styles.header}>{"Create your ticket"}</div>
            <div className={styles.ticketType}>
              <div className={styles.selectTicketBox}>
                <div className={styles.radioBox}>
                  <input
                    type="radio"
                    value={TICKET_TATACLIQ}
                    checked={ticketType == TICKET_TATACLIQ ? true : false}
                    onChange={e =>
                      this.setState({ ticketType: e.target.value })
                    }
                  />
                  <label
                    className={
                      ticketType == TICKET_TATACLIQ ? styles.fontBold : null
                    }
                  >
                    TATA CLiQ
                  </label>
                </div>
              </div>
              <div className={styles.selectTicketBox}>
                <div className={styles.radioBox}>
                  <input
                    type="radio"
                    value={TICKET_OTHER_ECOMMERCE}
                    checked={
                      ticketType == TICKET_OTHER_ECOMMERCE ? true : false
                    }
                    onChange={e =>
                      this.setState({ ticketType: e.target.value })
                    }
                  />
                  <label
                    className={
                      ticketType == TICKET_OTHER_ECOMMERCE
                        ? styles.fontBold
                        : null
                    }
                  >
                    Other e-commerce platform
                  </label>
                </div>
              </div>
            </div>
            {this.formField()}
          </div>
        )}
        {attachment && this.state.isAttachment && (
          <div className={styles.attachment}>
            <div className={styles.header}>Add attachements (optional)</div>
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
                  <img src={UploadIcon} alt="Upload"></img> Upload Image
                </button>
                <input
                  type="file"
                  name="myfile"
                  onChange={val =>
                    this.onUploadFile(val, this.state.attachementData)
                  }
                  multiple
                />
                <div className={styles.fileSize}>
                  Upload JPEG, PNG (Maximum size per image 2.5 MB)
                </div>
              </div>
            </div>
            <div className={styles.uploadesFilesBox}>
              {files.map((file, index) => {
                return (
                  <div className={styles.uploadesFiles} key={`files${index}`}>
                    <div
                      className={styles.deleteIconBox}
                      onClick={() => this.deleteFiles()}
                    >
                      <Icon image={cancelred} size={20} />
                    </div>
                    <img
                      className={styles.uploadsImg}
                      src={file}
                      alt="Uploaded files"
                    ></img>
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
                  // disabled={this.state.mobile ? true : false}
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
              width={205}
              textStyle={{ color: "#FFF", fontSize: 14 }}
              disabled={this.state.btnDisable}
              // disabled={false}
              onClick={() => this.nextField(currentStep)}
            />
          </div>

          {/* <div className={styles.nextButton}>
            <Button
              type="primary"
              backgroundColor="#da1c5c"
              height={40}
              label={"getQuery"}
              width={205}
              textStyle={{ color: "#FFF", fontSize: 14 }}
              
              onClick={() => this.props.getQuestyTesting(currentStep)}
            />
          </div> */}
        </div>
      </div>
    );
  }
}
