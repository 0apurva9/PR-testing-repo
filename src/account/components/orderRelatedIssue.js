import TabHolder from "./TabHolder";
import TabData from "./TabData";
import React from "react";
import styles from "./OrderRelatedIssue.css";
import ProductImage from "../../general/components/ProductImage.js";
import SelectBoxMobile2 from "../../general/components/SelectBoxMobile2";
import TextArea from "../../general/components/TextArea.js";
import FloatingLabelInput from "../../general/components/FloatingLabelInput.js";
import Button from "../../general/components/Button.js";
import ImageUpload from "../../account/components/ImageUpload.js";
import CheckOutHeader from "../../cart/components/CheckOutHeader";
import {
  EMAIL_REGULAR_EXPRESSION,
  MOBILE_PATTERN
} from "../../auth/components/Login";
import MobileOnly from "../../general/components/MobileOnly";
import DesktopOnly from "../../general/components/DesktopOnly";
import OrderRelatedPopup from "./OrderRelatedPopup";
import { SUCCESS, CUSTOMER_CARE } from "../../lib/constants";
import format from "date-fns/format";
import * as Cookie from "../../lib/Cookie";
import {
  LOGGED_IN_USER_DETAILS,
  CUSTOMER_ACCESS_TOKEN,
  LOGIN_PATH
} from "../../lib/constants";
import { Redirect } from "react-router-dom";
import CheckboxAndText from "../../cart/components/CheckboxAndText";
import FloatingLabelInputWithPlace from "../../general/components/FloatingLabelInputWithPlace";
const SELECT_ORDER_TEXT = "Please select order ";
const SELECT_ISSUE_FOR_ORDER_TEXT = "Please select issue ";
const SELECT_SUB_ISSUE_FOR_ORDER_TEXT = "Please select sub issue ";
const NAME_TEXT = "Please enter name";
const MOBILE_TEXT = "Please enter mobile number";
const MOBILE_VALID_TEXT = "Please enter valid mobile number";
const EMAIL_TEXT = "Please enter emailId";
const EMAIL_VALID_TEXT = "Please enter  valid emailId";
const DUPLICATE_QUERY =
  "Your query is already submitted. Please wait for TATACLiQ representative to contact you.";
export default class OrderRelatedIssue extends React.Component {
  constructor(props) {
    super(props);
    const userDetailsCookie = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const getUserDetails = JSON.parse(userDetailsCookie);
    /**
     * @author Prashant
     * Added following fields fo type boolean with default value of false
     * customerQryFldLabel, customerQryFldTextBox, customerQryFldTextArea, customerQryFldRadio, customerQryFldCheckBox,
     * customerQryFldAttachment
     * they will be responsible for showing their respective fields on the page.
     */
    this.state = {
      showOrder: false,
      isSelected: 0,
      isSelectedOrder: false,
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
      comment: "",
      file: [],
      l2SelectedOption: null,
      l3SelectedOption: null,
      isEnableForOrderRelated: false,
      isEnableForSubOrderRelated: false,
      isEnableForAnotherOrderRelated: false,
      orderCode: "",
      transactionId: "",
      sellerOrderNumber: "",
      productImageURL: "",
      orderDate: "",
      productName: "",
      productPrice: "",
      productStatus: "",
      l2SelectedReason: null,
      l3SelectedReason: null,
      customerQryFldLabel: false,
      customerQryFldTextBox: false,
      customerQryFldTextArea: false,
      customerQryFldRadio: false,
      customerQryFldCheckBox: false,
      customerQryFldAttachment: false,
      textboxFldData: "",
      radioSelectedOption: "",
      checkBoxDefaultFlag: ""
    };
  }

  componentDidMount() {
    this.props.getCustomerQueriesData();
    this.props.getOrdersTransactionData(false);
    this.props.setHeaderText(CUSTOMER_CARE);

    /**
     * @author Prashant
     * Added the below line to fetch the data from the API
     */
    this.props.getCustomerQueriesFieldsv2();
  }
  componentDidUpdate() {
    this.props.setHeaderText(CUSTOMER_CARE);
  }
  componentWillUnmount() {
    this.props.clearOrderTransactionDetails();
  }
  getMoreOrder() {
    if (
      this.props.ordersTransactionData &&
      (this.props.ordersTransactionData.currentPage + 1) *
        this.props.ordersTransactionData.pageSize <
        this.props.ordersTransactionData.totalNoOfOrders
    ) {
      this.props.getOrdersTransactionData(true);
    }
  }
  tabSelect(val) {
    const userDetailsCookie = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const getUserDetails = JSON.parse(userDetailsCookie);
    if (this.state.isSelected !== val) {
      this.setState({
        isSelected: val,
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
        comment: "",
        file: "",
        l2SelectedOption: null,
        l3SelectedOption: null,
        isEnableForOrderRelated: false,
        isEnableForSubOrderRelated: false,
        isEnableForAnotherOrderRelated: false,
        orderCode: "",
        transactionId: "",
        sellerOrderNumber: "",
        productImageURL: "",
        orderDate: "",
        productName: "",
        productPrice: "",
        productStatus: "",
        l2SelectedReason: null,
        l3SelectedReason: null
      });
    }
  }
  setProductDetails(
    orderCode,
    transactionId,
    sellerOrderNumber,
    productImageURL,
    orderDate,
    productName,
    productPrice,
    productStatus
  ) {
    this.setState({
      orderCode: orderCode,
      transactionId: transactionId,
      sellerOrderNumber: sellerOrderNumber,
      showOrder: false,
      productImageURL: productImageURL,
      orderDate: orderDate,
      productName: productName,
      productPrice: productPrice,
      productStatus: productStatus
    });
    this.props.getCustomerQueriesDatav2();
  }
  /**
   * @author Prashant
   * This function is being called when we are changing option in the "select issue" select box.
   */
  onChangeReasonForOrderRelated(val, customerQueriesFieldArray = []) {
    const code = val.uItemplateCode;
    const label = val.issueType;
    let { listofIssues } = this.props.customerQueriesData;
    let issue = listofIssues.filter(function(issue) {
      return issue.issueType === val.label;
    });

    this.setState({
      L0: issue[0].L0,
      L1: issue[0].L1,
      L2: issue[0].L2,
      L3: issue[0].L3,
      L4: issue[0].L4,
      ticketType: issue[0].ticketType,
      webform: issue[0].webform,
      chat: issue[0].chat,
      call: issue[0].call,
      click2Call: issue[0].click2Call,
      solution: issue[0].solution,
      uItemplateCode: issue[0].uItemplateCode,
      tat: issue[0].tat
    });
    this.props.getCustomerQueriesFieldsv2();

    // let customerQueriesFieldArray = this.props.customerQueriesField;
    if (customerQueriesFieldArray) {
      customerQueriesFieldArray.map(ele => {
        if (ele.componentName === "textAreaComponent") {
          this.setState({ customerQryFldTextArea: true });
        }
        if (ele.componentName === "textboxComponent") {
          this.setState({ customerQryFldTextBox: true });
        }
        if (ele.componentName === "radioComponent") {
          this.setState({ customerQryFldRadio: true });
          ele.optionArray.map(ele => {
            if (ele.isSelected === 1) {
              this.setState({ radioSelectedOption: ele.value });
            }
          });
        }
        if (ele.componentName === "attachmentComponent") {
          this.setState({ customerQryFldAttachment: true });
        }
        if (ele.componentName === "checkboxComponent") {
          this.setState({ customerQryFldCheckBox: true });
        }
      });
    }
  }
  onChangeSubReasonForOrderRelated(val) {
    const code = val.value;
    const label = val.label;
    this.setState({
      l3SelectedOption: code,
      l3SelectedReason: label,

      isEnableForSubOrderRelated: true,
      isEnableForAnotherOrderRelated: false
    });
  }
  onChange(val) {
    this.setState(val);
  }
  closeModal() {
    this.setState({ showOrder: false });
  }
  async submitCustomerForm() {
    let l1OptionsArray, l2OptionsArray, l3OptionsArray;
    if (this.state.isSelected === 0) {
      let { listofIssues } = this.props.customerQueriesData;
    } else {
      l1OptionsArray =
        this.props.customerQueriesData &&
        this.props.customerQueriesData.nodes &&
        this.props.customerQueriesData.nodes.find(otherIssue => {
          return otherIssue.nodeDesc === "Any Other Query";
        });
    }
    // l2OptionsArray = this.getOrderRelatedL2Issue(l1OptionsArray);
    // l3OptionsArray = this.getOrderRelatedL3Issue(l2OptionsArray);
    if (this.state.isSelected === 0 && !this.state.orderCode) {
      this.props.displayToast(SELECT_ORDER_TEXT);
      return false;
    }
    if (!this.state.l2SelectedOption) {
      //   this.props.displayToast(SELECT_ISSUE_FOR_ORDER_TEXT);
      //   return false;
      // }
      // if (l2OptionsArray && !this.state.l3SelectedOption) {
      //   this.props.displayToast(SELECT_SUB_ISSUE_FOR_ORDER_TEXT);
      //   return false;
    }

    /**
     * @author Prashant
     */
    let customerQueriesFieldArray = this.props.customerQueriesField;
    if (this.state.customerQryFldTextArea) {
      let textAreaData = [];
      customerQueriesFieldArray &&
        customerQueriesFieldArray.map(ele => {
          if (ele.componentName === "textAreaComponent") {
            textAreaData = ele;
          }
        });

      if (this.state.comment.length === 0 && textAreaData.isMandatory) {
        this.props.displayToast(textAreaData.minLimitError);
        return false;
      }
      if (this.state.comment.length < parseInt(textAreaData.minLimit)) {
        this.props.displayToast(textAreaData.minLimitError);
        return false;
      }
      if (this.state.comment.length > parseInt(textAreaData.maxLimit)) {
        this.props.displayToast(textAreaData.maxLimitError);
        return false;
      }
    }

    if (this.state.customerQryFldRadio) {
      let radioData = [];
      customerQueriesFieldArray &&
        customerQueriesFieldArray.map(ele => {
          if (ele.componentName === "radioComponent") {
            radioData = ele;
          }
        });
      if (radioData.isMandatory && this.state.radioSelectedOption === "") {
        this.props.displayToast("Radio field is mandatory.");
        return false;
      }
    }

    if (this.state.customerQryFldTextBox) {
      let textBoxData = [];
      customerQueriesFieldArray &&
        customerQueriesFieldArray.map(ele => {
          if (ele.componentName === "textboxComponent") {
            textBoxData = ele;
          }
        });
      if (
        !textBoxData.isMandatory ||
        this.state.textboxFldData.length < textBoxData.minLimit
      ) {
        this.props.displayToast(textBoxData.minLimitError);
        return false;
      }
      if (this.state.textboxFldData.length > textBoxData.maxLimit) {
        this.props.displayToast(textBoxData.maxLimitError);
        return false;
      }

      var expression = "^" + textBoxData.regex + "+$";
      var regexExp = new RegExp(expression);

      if (!regexExp.test(this.state.textboxFldData)) {
        this.props.displayToast(textBoxData.regexError);
        return false;
      }
    }

    if (this.state.customerQryFldCheckBox) {
      let checkboxData = [];
      customerQueriesFieldArray &&
        customerQueriesFieldArray.map(ele => {
          if (ele.componentName === "checkboxComponent") {
            checkboxData = ele;
          }
        });
      if (checkboxData.isMandatory && this.state.checkBoxDefaultFlag == "") {
        this.props.displayToast("Please check the box.");
        return false;
      }
    }

    if (this.state.customerQryFldAttachment) {
      let attachmentData = [];
      customerQueriesFieldArray &&
        customerQueriesFieldArray.map(ele => {
          if (ele.componentName === "attachmentComponent") {
            attachmentData = ele;
          }
        });
      if (attachmentData.isMandatory && !this.state.file.length) {
        this.props.displayToast("Please upload file.");
        return false;
      }
    }

    /**
     * Eod
     */

    if (!this.state.email) {
      this.props.displayToast(EMAIL_TEXT);
      return false;
    }
    if (this.state.email && !EMAIL_REGULAR_EXPRESSION.test(this.state.email)) {
      this.props.displayToast(EMAIL_VALID_TEXT);
      return false;
    }
    if (!this.state.mobile) {
      this.props.displayToast(MOBILE_TEXT);
      return false;
    }

    if (this.state.mobile && !MOBILE_PATTERN.test(this.state.mobile)) {
      this.props.displayToast(MOBILE_VALID_TEXT);
      return false;
    } else {
      /*let orderRelatedIssue =
        this.props.customerQueriesData &&
        this.props.customerQueriesData.nodes &&
        this.props.customerQueriesData.nodes.find(orderRelated => {
          return orderRelated.nodeDesc === "Order Related Query";
        });*/
      let submitDetailsObject = Object.assign(
        {},
        {
          L0: this.state.L0,
          L1: this.state.L1,
          L2: this.state.L2,
          L3: this.state.L3,
          contactEmail: this.state.email,
          contactMobile: this.state.mobile,
          contactName: this.state.name,
          comment: this.state.comment ? this.state.comment : "",
          nodeL4:
            l3OptionsArray &&
            l3OptionsArray.children &&
            l3OptionsArray.children.length > 0
              ? l3OptionsArray.children[0].nodeCode
              : undefined,
          transactionId: this.state.transactionId,
          orderCode: this.state.orderCode,
          subOrderCode: this.state.sellerOrderNumber,
          currentState: this.state.isSelected
        }
      );
      let getCustomerQueryDetailsObject = Object.assign(
        {},
        {
          name: this.state.name,
          emailId: this.state.email,
          mobileNumber: this.state.mobile,
          comment: this.state.comment,
          anOtherIssue: this.state.l4SelectedReason,
          issue: this.state.l2SelectedReason,
          subIssue: this.state.l3SelectedReason
        }
      );
      if (this.state.file) {
        const uploadFileResponse = await this.props.uploadUserFile(
          this.state.file
        );
        if (uploadFileResponse && uploadFileResponse.status === SUCCESS) {
          submitDetailsObject = Object.assign({}, submitDetailsObject, {
            imageURL:
              uploadFileResponse.uploadUserFile &&
              uploadFileResponse.uploadUserFile.fileURL
          });
          if (this.props.submitOrderDetails) {
            const submitOrderDetailsResponse = await this.props.submitOrderDetails(
              submitDetailsObject
            );
            if (submitOrderDetailsResponse.status === SUCCESS) {
              if (
                submitOrderDetailsResponse.submitOrder &&
                submitOrderDetailsResponse.submitOrder.referenceNum !==
                  "duplicate"
              ) {
                this.props.showCustomerQueryModal(
                  getCustomerQueryDetailsObject
                );
              } else {
                this.props.displayToast(DUPLICATE_QUERY);
              }
            }
          }
        }
      } else {
        if (this.props.submitOrderDetails) {
          const submitOrderDetailsResponse = await this.props.submitOrderDetails(
            submitDetailsObject
          );
          if (submitOrderDetailsResponse.status === SUCCESS) {
            if (
              submitOrderDetailsResponse.submitOrder &&
              submitOrderDetailsResponse.submitOrder.referenceNum !==
                "duplicate"
            ) {
              this.props.showCustomerQueryModal(getCustomerQueryDetailsObject);
            } else {
              this.props.displayToast(DUPLICATE_QUERY);
            }
          }
        }
      }
    }
  }

  navigateToLogin() {
    return <Redirect to={LOGIN_PATH} />;
  }

  onUploadFile(file, fileUploadLimit = 1) {
    if (file) {
      if (file.size <= 5000000) {
        if (fileUploadLimit === -1) {
          this.setState({ file: [...this.state.file, file] });
        } else if (fileUploadLimit => this.state.file.length + 1) {
          this.setState({ file: [...this.state.file, file] });
        } else {
          this.props.displayToast(
            `Max file upload limit is ${fileUploadLimit}`
          );
        }
      } else {
        this.props.displayToast("File size should be less then 5 Mb");
      }
    }
  }
  goToOrderPage() {
    if (
      this.props.ordersTransactionData &&
      this.props.ordersTransactionData.orderData &&
      this.props.ordersTransactionData.orderData.length > 0
    ) {
      this.setState({ showOrder: true });
    } else {
      this.props.displayToast("No Orders");
    }
  }
  getOrderRelatedL2Issue(orderRelatedIssue) {
    const subTab =
      this.state.l2SelectedOption &&
      orderRelatedIssue &&
      orderRelatedIssue.children &&
      orderRelatedIssue.children.find(l2Object => {
        return l2Object.nodeCode === this.state.l2SelectedOption;
      });
    if (subTab && subTab.children && subTab.children.length > 0) {
      return subTab;
    } else {
      return null;
    }
  }
  getOrderRelatedL3Issue(l2OptionsArray) {
    return (
      this.state.l3SelectedOption &&
      l2OptionsArray &&
      l2OptionsArray.children &&
      l2OptionsArray.children.find(l3Object => {
        return l3Object.nodeCode === this.state.l3SelectedOption;
      })
    );
  }
  onChangeDefaultFlag(checkvalue) {
    this.setState(prevState => ({
      checkBoxDefaultFlag: checkvalue
    }));
  }

  render() {
    const userDetailsCookie = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    const getUserDetails = JSON.parse(userDetailsCookie);
    if (!userDetailsCookie || !customerCookie) {
      return this.navigateToLogin();
    }
    /**
     * @author Prashant
     * @param Array customerQueriesFieldArray
     * @desc It will contain the array of the API
     */
    let l1OptionsArray,
      l2OptionsArray,
      l3OptionsArray,
      customerQueriesFieldArray,
      textAreaData = {},
      attachmentData = {},
      textboxData = {},
      labelData = {},
      radioData = {},
      checkboxData = {};

    if (this.state.isSelected === 0) {
      l1OptionsArray =
        this.props.customerQueriesData &&
        this.props.customerQueriesData.listofIssues;

      customerQueriesFieldArray = this.props.customerQueriesField;

      customerQueriesFieldArray &&
        customerQueriesFieldArray.map(ele => {
          if (ele.componentName === "textAreaComponent") {
            textAreaData = ele;
          }
          if (ele.componentName === "attachmentComponent") {
            attachmentData = ele;
          }
          if (ele.componentName === "textboxComponent") {
            textboxData = ele;
          }
          if (ele.componentName === "labelComponent") {
            labelData = ele;
          }
          if (ele.componentName === "radioComponent") {
            radioData = ele;
          }
          if (ele.componentName === "checkboxComponent") {
            checkboxData = ele;
          }
        });
      /**
       * EOD
       */
    }
    if (this.state.isSelected === 1) {
      l1OptionsArray =
        this.props.customerQueriesData &&
        this.props.customerQueriesData.nodes &&
        this.props.customerQueriesData.nodes.find(otherIssue => {
          return otherIssue.nodeDesc === "Any Other Query";
        });
    }
    l2OptionsArray = this.getOrderRelatedL2Issue(l1OptionsArray);
    l3OptionsArray = this.getOrderRelatedL3Issue(l2OptionsArray);

    return (
      <div className={styles.base}>
        <MobileOnly>
          {!this.state.showOrder && (
            <div className={styles.header}>
              <TabHolder>
                <TabData
                  width="50%"
                  label="Order related "
                  selected={this.state.isSelected === 0}
                  selectItem={() => this.tabSelect(0)}
                />
                <TabData
                  width="50%"
                  label="Other issues "
                  selected={this.state.isSelected === 1}
                  selectItem={() => this.tabSelect(1)}
                />
              </TabHolder>
            </div>
          )}

          {!this.state.showOrder && (
            <div className={styles.orderHolder}>
              {this.state.isSelected === 0 && (
                <div className={styles.selectedOrder}>
                  <div className={styles.headingHolder}>
                    <CheckOutHeader
                      indexNumber="1"
                      confirmTitle="Select your order"
                    />
                  </div>
                  {!this.state.productImageURL &&
                  !this.state.orderDate &&
                  !this.state.productName &&
                  !this.state.productPrice &&
                  !this.state.productStatus ? (
                    <div
                      className={styles.dummySelectBoxWithIcon}
                      onClick={() => this.goToOrderPage()}
                    >
                      <div className={styles.dummySelectBox}>Select order</div>
                      <div className={styles.iconHolder} />
                    </div>
                  ) : (
                    <div
                      className={styles.productsDisplayHolder}
                      onClick={() =>
                        this.setState({
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
                        <ProductImage image={this.state.productImageURL} />
                      </div>
                      <div className={styles.dataHolder}>
                        {this.state.orderDate && (
                          <div className={styles.dataDescription}>
                            {`Order on: ${format(
                              this.state.orderDate,
                              "DD MMM,YYYY"
                            )}`}
                          </div>
                        )}
                        {this.state.productName && (
                          <div className={styles.dataDescription}>
                            {this.state.productName}
                          </div>
                        )}
                        {this.state.productPrice && (
                          <div className={styles.dataDescription}>
                            {this.state.productPrice}
                          </div>
                        )}
                        {this.state.productStatus && (
                          <div className={styles.dataDescription}>
                            {this.state.productStatus}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
              {this.state.transactionId && (
                <div className={styles.selectIssueHolder}>
                  <div className={styles.secondOrder}>
                    <CheckOutHeader
                      indexNumber={this.state.isSelected === 0 ? "2" : "1"}
                      confirmTitle="Select issue"
                    />
                  </div>
                  {/**
                   * @author Prashant
                   * Changes for Mobile devices.
                   */}
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
                      options={
                        l1OptionsArray &&
                        l1OptionsArray.map((val, i) => {
                          return {
                            value: val.uItemplateCode,
                            label: val.issueType
                          };
                        })
                      }
                      // isEnable={this.state.isEnableForOrderRelated}
                      onChange={val =>
                        this.onChangeReasonForOrderRelated(
                          val,
                          customerQueriesFieldArray
                        )
                      }
                    />
                  </div>
                  {this.state.solution && (
                    <div className={styles.selectIssue}>
                      {this.state.solution}
                    </div>
                  )
                  /**
                   * EOD
                   */
                  }
                  {!this.state.solution &&
                    l2OptionsArray &&
                    l2OptionsArray.children &&
                    l2OptionsArray.children.length > 0 && (
                      <div className={styles.selectIssue}>
                        <SelectBoxMobile2
                          placeholder="Select sub-issue"
                          arrowColour="black"
                          height={33}
                          options={
                            l2OptionsArray &&
                            l2OptionsArray.children &&
                            l2OptionsArray.children.map((val, i) => {
                              return {
                                value: val.nodeCode,
                                label: val.nodeDesc
                              };
                            })
                          }
                          isEnable={this.state.isEnableForSubOrderRelated}
                          onChange={val =>
                            this.onChangeSubReasonForOrderRelated(val)
                          }
                        />
                      </div>
                    )}
                  <div className={styles.selectIssue}>
                    {!this.state.solution &&
                      this.state.L0 &&
                      this.state.customerQryFldTextBox && (
                        <React.Fragment>
                          <div className={styles.secondOrder}>
                            <CheckOutHeader
                              indexNumber={"0"}
                              confirmTitle={textboxData.heading}
                              fontSize={"12px"}
                            />
                          </div>
                          <div className={styles.textInformationHolder}>
                            <FloatingLabelInputWithPlace
                              label={
                                textboxData.isMandatory
                                  ? textboxData.placeholder + " *"
                                  : textboxData.placeholder
                              }
                              placeholder={`This is placeholder`}
                              disabled={false}
                              value={this.state.textboxFldData}
                              onChange={textboxFldData =>
                                this.onChange({ textboxFldData })
                              }
                            />
                          </div>
                        </React.Fragment>
                      )}
                  </div>
                  <div className={styles.selectIssue}>
                    {!this.state.solution &&
                      this.state.L0 &&
                      this.state.customerQryFldCheckBox && (
                        <React.Fragment>
                          <div className={styles.textInformationHolder}>
                            {checkboxData &&
                              checkboxData.optionArray.map(ele => {
                                return (
                                  <CheckboxAndText
                                    key={ele.value}
                                    label={ele.optionName}
                                    value={ele.value}
                                    selected={
                                      this.state.checkBoxDefaultFlag ===
                                      ele.value
                                        ? true
                                        : false
                                    }
                                    selectItem={() =>
                                      this.onChangeDefaultFlag(ele.value)
                                    }
                                  />
                                );
                              })}
                          </div>
                        </React.Fragment>
                      )}
                  </div>
                  <div className={styles.selectIssue}>
                    {/**
                     * @author Prashant
                     * Making change in the TextArea and textbox field as per the data from the API
                     */}
                    {!this.state.solution &&
                      this.state.L0 &&
                      this.state.customerQryFldRadio && (
                        <React.Fragment>
                          <div className={styles.secondOrder}>
                            <CheckOutHeader
                              indexNumber={"0"}
                              confirmTitle={
                                radioData.isMandatory
                                  ? radioData.heading + " *"
                                  : radioData.heading
                              }
                              fontSize={"12px"}
                            />
                            {radioData &&
                              radioData.optionArray.map(ele => {
                                return (
                                  <div
                                    key={ele.value}
                                    className={styles.radioBtnMyAcc}
                                  >
                                    <label>
                                      {ele.optionName}
                                      <input
                                        type="radio"
                                        value={ele.value}
                                        checked={
                                          ele.value ==
                                          this.state.radioSelectedOption
                                            ? true
                                            : false
                                        }
                                        onChange={e =>
                                          this.setState({
                                            radioSelectedOption: e.target.value
                                          })
                                        }
                                      />
                                      <span />
                                    </label>
                                  </div>
                                );
                              })}
                          </div>
                        </React.Fragment>
                      )}
                  </div>
                  <div className={styles.selectIssue}>
                    {!this.state.solution &&
                      this.state.L0 &&
                      this.state.customerQryFldTextArea && (
                        <React.Fragment>
                          <div className={styles.secondOrder}>
                            <CheckOutHeader
                              indexNumber={"0"}
                              confirmTitle={textAreaData.heading}
                              fontSize={"12px"}
                            />
                          </div>
                          <TextArea
                            placeholder={textAreaData.placeholder}
                            value={this.state.comment}
                            onChange={comment => this.onChange({ comment })}
                            maxLength={parseInt(textAreaData.maxLimit)}
                          />
                        </React.Fragment>
                      )}
                  </div>
                </div>
              )}
              {!this.state.solution &&
                this.state.L0 &&
                (l1OptionsArray ||
                  (l3OptionsArray && !l3OptionsArray.ticketAnswer)) &&
                this.state.customerQryFldAttachment && (
                  <div className={styles.selectImageHolder}>
                    <div className={styles.secondOrder}>
                      <CheckOutHeader
                        indexNumber="3"
                        confirmTitle={
                          attachmentData.isMandatory
                            ? attachmentData.heading + " *"
                            : attachmentData.heading
                        }
                        fontSize={"14px"}
                      />
                    </div>
                    <div className={styles.validImage}>
                      Upload JPEG, PNG (Maximum size 5 MB)
                    </div>
                    <div className={styles.imageInput}>
                      <div className={styles.secondOrder}>
                        <CheckOutHeader
                          indexNumber={"0"}
                          confirmTitle={attachmentData.itemsTitle}
                          fontSize={"13px"}
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
                          this.onUploadFile(
                            file,
                            parseInt(attachmentData.hexCode)
                          )
                        }
                      />
                    </div>
                  </div>
                )}
              {!this.state.solution &&
                this.state.L0 &&
                (l1OptionsArray ||
                  (l3OptionsArray && !l3OptionsArray.ticketAnswer)) && (
                  <div className={styles.selectIssueHolder}>
                    <div className={styles.secondOrder}>
                      <CheckOutHeader
                        indexNumber={this.state.isSelected === 0 ? "4" : "3"}
                        confirmTitle="Communication Details"
                        fontSize={"14px"}
                      />
                    </div>

                    <div className={styles.textInformationHolder}>
                      <FloatingLabelInput
                        label="Email"
                        disabled={this.state.email ? true : false}
                        value={this.state.email}
                        onChange={email => this.onChange({ email })}
                      />
                    </div>
                    <div className={styles.textInformationHolder}>
                      <FloatingLabelInput
                        label="Phone*"
                        maxLength={"10"}
                        value={this.state.mobile}
                        onChange={mobile => this.onChange({ mobile })}
                        disabled={this.state.mobile ? true : false}
                        onlyNumber={true}
                      />
                    </div>
                  </div>
                )}

              {this.state.productImageURL &&
                (this.state.productImageURL &&
                  this.state.L0 &&
                  !this.state.solution) &&
                (!l3OptionsArray ||
                  (l3OptionsArray && !l3OptionsArray.ticketAnswer)) && (
                  <div className={styles.buttonHolder}>
                    <div className={styles.button}>
                      <Button
                        type="primary"
                        height={44}
                        label={"SUBMIT"}
                        width={323}
                        borderRadius={2}
                        textStyle={{ color: "#fff", fontSize: 14 }}
                        onClick={() => this.submitCustomerForm()}
                      />
                    </div>
                  </div>
                )}
            </div>
          )}
          {this.state.showOrder && (
            <div className={styles.selectOrderHolder}>
              {this.props.ordersTransactionData &&
                this.props.ordersTransactionData.orderData &&
                this.props.ordersTransactionData.orderData.map(
                  (orderDetails, index) => {
                    return (
                      <div className={styles.orderCard} key={index}>
                        {orderDetails.products &&
                          orderDetails.products.map((productsDetails, id) => {
                            return (
                              <div
                                className={styles.productsDetailsHolder}
                                onClick={() =>
                                  this.setProductDetails(
                                    orderDetails.orderId,
                                    productsDetails.transactionId,
                                    productsDetails.sellerorderno,
                                    productsDetails.imageURL,
                                    orderDetails.orderDate,
                                    productsDetails.productName,
                                    productsDetails.price,
                                    productsDetails.statusDisplay
                                  )
                                }
                                key={id}
                              >
                                <div className={styles.imageHolder}>
                                  <ProductImage
                                    image={productsDetails.imageURL}
                                  />
                                </div>
                                <div className={styles.dataHolder}>
                                  {orderDetails.orderDate && (
                                    <div className={styles.dataDescription}>
                                      {`Order on: ${format(
                                        orderDetails.orderDate,
                                        "DD MMM,YYYY"
                                      )}`}
                                    </div>
                                  )}
                                  {productsDetails.productName && (
                                    <div className={styles.dataDescription}>
                                      {productsDetails.productName}
                                    </div>
                                  )}
                                  {productsDetails.price && (
                                    <div className={styles.dataDescription}>
                                      {productsDetails.price}
                                    </div>
                                  )}
                                  {productsDetails.statusDisplay && (
                                    <div className={styles.dataDescription}>
                                      {productsDetails.statusDisplay}
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    );
                  }
                )}
              {this.props.ordersTransactionData &&
                (this.props.ordersTransactionData.currentPage + 1) *
                  this.props.ordersTransactionData.pageSize <
                  this.props.ordersTransactionData.totalNoOfOrders && (
                  <div
                    className={styles.loadData}
                    onClick={() => this.getMoreOrder()}
                  >
                    Load More
                  </div>
                )}
            </div>
          )}
        </MobileOnly>
        <DesktopOnly>
          <div className={styles.baseWrapper}>
            <div className={styles.labelHeader}>Customer Care</div>
            <div className={styles.formAbdTabHolder}>
              <div className={styles.tabHolder}>
                <div className={styles.switchTabHolder}>
                  <div className={styles.tabHeader}>Issue Type</div>
                  <div
                    className={
                      this.state.isSelected === 0
                        ? styles.activeTab
                        : styles.tabDataHolder
                    }
                    onClick={() => this.tabSelect(0)}
                  >
                    Order Related
                    <div
                      className={
                        this.state.isSelected === 0
                          ? styles.activeArrow
                          : styles.arrow
                      }
                    />
                  </div>
                  <div
                    className={
                      this.state.isSelected === 1
                        ? styles.activeTab
                        : styles.tabDataHolder
                    }
                    onClick={() => this.tabSelect(1)}
                  >
                    Other Issues
                    <div
                      className={
                        this.state.isSelected === 1
                          ? styles.activeArrow
                          : styles.arrow
                      }
                    />
                  </div>
                </div>
              </div>
              <div className={styles.formHolder}>
                <div className={styles.firstTab}>
                  {this.state.isSelected === 0 && (
                    <div
                      className={styles.selectedOrder}
                      onClick={() => this.goToOrderPage()}
                    >
                      <div className={styles.headingHolder}>
                        <CheckOutHeader
                          indexNumber="1"
                          confirmTitle="Select your order"
                        />
                        <div className={styles.iconHolder} />
                      </div>
                      {!this.state.productImageURL &&
                      !this.state.orderDate &&
                      !this.state.productName &&
                      !this.state.productPrice &&
                      !this.state.productStatus ? (
                        <div
                          className={styles.dummySelectBoxWithIcon}
                          onClick={() => this.goToOrderPage()}
                        />
                      ) : (
                        <div
                          className={styles.productsDisplayHolder}
                          onClick={() =>
                            this.setState({
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
                            <ProductImage image={this.state.productImageURL} />
                          </div>
                          <div className={styles.dataHolder}>
                            {this.state.productName && (
                              <div className={styles.dataDescription}>
                                {this.state.productName}
                              </div>
                            )}
                            {this.state.orderDate && (
                              <div className={styles.dataDescription}>
                                {`Order on: ${format(
                                  this.state.orderDate,
                                  "DD MMM,YYYY"
                                )}`}
                              </div>
                            )}
                            {this.state.productPrice && (
                              <div className={styles.dataDescription}>
                                {this.state.productPrice}
                              </div>
                            )}
                            {this.state.productStatus && (
                              <div className={styles.dataDescription}>
                                {this.state.productStatus}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  {this.state.transactionId && (
                    <div className={styles.selectIssueHolder}>
                      <div className={styles.formWrapper}>
                        <div className={styles.secondOrder}>
                          <CheckOutHeader
                            indexNumber={
                              this.state.isSelected === 0 ? "2" : "1"
                            }
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
                            /**
                             * @author Prashant
                             * Passed the varable "customerQueriesFieldArray" so that fields can be calculated when dropdown
                             * is changed.
                             */
                            onChange={val =>
                              this.onChangeReasonForOrderRelated(
                                val,
                                customerQueriesFieldArray
                              )
                            }
                          />
                        </div>
                        {this.state.solution && (
                          <div className={styles.selectIssue}>
                            {this.state.solution}
                          </div>
                        )}
                        {!this.state.solution &&
                          l2OptionsArray &&
                          l2OptionsArray.children &&
                          l2OptionsArray.children.length > 0 && (
                            <div className={styles.selectIssue}>
                              <SelectBoxMobile2
                                placeholder="Select sub-issue"
                                arrowColour="black"
                                height={33}
                                options={
                                  l2OptionsArray &&
                                  l2OptionsArray.children &&
                                  l2OptionsArray.children.map((val, i) => {
                                    return {
                                      value: val.nodeCode,
                                      label: val.nodeDesc
                                    };
                                  })
                                }
                                isEnable={this.state.isEnableForSubOrderRelated}
                                onChange={val =>
                                  this.onChangeSubReasonForOrderRelated(val)
                                }
                              />
                            </div>
                          )}
                        <div className={styles.selectIssue}>
                          {!this.state.solution &&
                            this.state.L0 &&
                            this.state.customerQryFldTextBox && (
                              <React.Fragment>
                                <div className={styles.secondOrder}>
                                  <CheckOutHeader
                                    indexNumber={"0"}
                                    confirmTitle={textboxData.heading}
                                    fontSize={"12px"}
                                  />
                                </div>
                                <div className={styles.textInformationHolder}>
                                  <FloatingLabelInputWithPlace
                                    label={
                                      textboxData.isMandatory
                                        ? textboxData.placeholder + " *"
                                        : textboxData.placeholder
                                    }
                                    placeholder={`This is placeholder`}
                                    disabled={false}
                                    value={this.state.textboxFldData}
                                    onChange={textboxFldData =>
                                      this.onChange({ textboxFldData })
                                    }
                                  />
                                </div>
                              </React.Fragment>
                            )}
                        </div>
                        <div className={styles.selectIssue}>
                          {!this.state.solution &&
                            this.state.L0 &&
                            this.state.customerQryFldCheckBox && (
                              <React.Fragment>
                                <div className={styles.textInformationHolder}>
                                  {checkboxData &&
                                    checkboxData.optionArray.map(ele => {
                                      return (
                                        <CheckboxAndText
                                          key={ele.value}
                                          label={ele.optionName}
                                          value={ele.value}
                                          selected={
                                            this.state.checkBoxDefaultFlag ===
                                            ele.value
                                              ? true
                                              : false
                                          }
                                          selectItem={() =>
                                            this.onChangeDefaultFlag(ele.value)
                                          }
                                        />
                                      );
                                    })}
                                </div>
                              </React.Fragment>
                            )}
                        </div>
                        <div className={styles.selectIssue}>
                          {/**
                           * @author Prashant
                           * Making change in the TextArea and textbox field as per the data from the API
                           */}
                          {!this.state.solution &&
                            this.state.L0 &&
                            this.state.customerQryFldRadio && (
                              <React.Fragment>
                                <div className={styles.secondOrder}>
                                  <CheckOutHeader
                                    indexNumber={"0"}
                                    confirmTitle={
                                      radioData.isMandatory
                                        ? radioData.heading + " *"
                                        : radioData.heading
                                    }
                                    fontSize={"12px"}
                                  />
                                  {radioData &&
                                    radioData.optionArray.map(ele => {
                                      return (
                                        <div
                                          key={ele.value}
                                          className={styles.radioBtnMyAcc}
                                        >
                                          <label>
                                            {ele.optionName}
                                            <input
                                              type="radio"
                                              value={ele.value}
                                              checked={
                                                ele.value ==
                                                this.state.radioSelectedOption
                                                  ? true
                                                  : false
                                              }
                                              onChange={e =>
                                                this.setState({
                                                  radioSelectedOption:
                                                    e.target.value
                                                })
                                              }
                                            />
                                            <span />
                                          </label>
                                        </div>
                                      );
                                    })}
                                </div>
                              </React.Fragment>
                            )}
                        </div>
                        <div className={styles.selectIssue}>
                          {!this.state.solution &&
                            this.state.L0 &&
                            this.state.customerQryFldTextArea && (
                              <React.Fragment>
                                <div className={styles.secondOrder}>
                                  <CheckOutHeader
                                    indexNumber={"0"}
                                    confirmTitle={textAreaData.heading}
                                    fontSize={"12px"}
                                  />
                                </div>
                                <TextArea
                                  placeholder={textAreaData.placeholder}
                                  value={this.state.comment}
                                  onChange={comment =>
                                    this.onChange({ comment })
                                  }
                                  maxLength={parseInt(textAreaData.maxLimit)}
                                />
                              </React.Fragment>
                            )}
                        </div>
                      </div>
                    </div>
                  )}
                  {!this.state.solution &&
                    this.state.L0 &&
                    (l1OptionsArray ||
                      (l3OptionsArray && !l3OptionsArray.ticketAnswer)) &&
                    this.state.customerQryFldAttachment && (
                      <div className={styles.selectImageHolder}>
                        <div className={styles.formWrapper}>
                          <div className={styles.secondOrder}>
                            <CheckOutHeader
                              indexNumber={
                                this.state.isSelected === 0 ? "3" : "2"
                              }
                              confirmTitle={
                                attachmentData.isMandatory
                                  ? attachmentData.heading + " *"
                                  : attachmentData.heading
                              }
                              fontSize={"14px"}
                            />
                          </div>
                          <div className={styles.validImage}>
                            Upload JPEG, PNG (Maximum size 5 MB)
                          </div>
                          <div className={styles.imageInput}>
                            <div className={styles.secondOrder}>
                              <CheckOutHeader
                                indexNumber={"0"}
                                confirmTitle={attachmentData.itemsTitle}
                                fontSize={"12px"}
                              />
                            </div>
                            <ImageUpload
                              value={
                                this.state.file.length
                                  ? this.state.file &&
                                    this.state.file
                                      .map(ele => ele.name)
                                      .join(", ")
                                  : "Upload attachment"
                              }
                              onChange={file =>
                                this.onUploadFile(
                                  file,
                                  parseInt(attachmentData.hexCode)
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  {!this.state.solution &&
                    this.state.L0 &&
                    (!l3OptionsArray ||
                      (l3OptionsArray && !l3OptionsArray.ticketAnswer)) && (
                      <div className={styles.selectIssueHolder}>
                        <div className={styles.formWrapper}>
                          <div className={styles.secondOrder}>
                            <CheckOutHeader
                              indexNumber={
                                this.state.isSelected === 0 ? "4" : "3"
                              }
                              confirmTitle="Communication Details"
                              fontSize={"14px"}
                            />
                          </div>

                          <div className={styles.textInformationHolder}>
                            <FloatingLabelInput
                              label="Email"
                              disabled={
                                getUserDetails &&
                                getUserDetails.loginType === "email" &&
                                getUserDetails.userName
                                  ? true
                                  : false
                              }
                              value={this.state.email}
                              onChange={email => this.onChange({ email })}
                            />
                          </div>
                          <div className={styles.textInformationHolder}>
                            <FloatingLabelInput
                              label="Phone*"
                              maxLength={"10"}
                              value={this.state.mobile}
                              onChange={mobile => this.onChange({ mobile })}
                              disabled={
                                getUserDetails &&
                                getUserDetails.loginType === "mobile" &&
                                getUserDetails.userName
                                  ? true
                                  : false
                              }
                              onlyNumber={true}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                </div>
                {this.state.productImageURL &&
                  (this.state.productImageURL &&
                    this.state.L0 &&
                    !this.state.solution) &&
                  (!l3OptionsArray ||
                    (l3OptionsArray && !l1OptionsArray.solution)) && (
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
          </div>
          {this.state.showOrder && (
            <OrderRelatedPopup
              selectedOrderId={this.state.orderCode}
              ordersTransactionData={this.props.ordersTransactionData}
              setProductDetails={(
                orderCode,
                transactionId,
                sellerOrderNumber,
                productImageURL,
                orderDate,
                productName,
                productPrice,
                productStatus
              ) =>
                this.setProductDetails(
                  orderCode,
                  transactionId,
                  sellerOrderNumber,
                  productImageURL,
                  orderDate,
                  productName,
                  productPrice,
                  productStatus
                )
              }
              getMoreOrder={() => this.getMoreOrder()}
              closeModal={() => this.closeModal()}
            />
          )}
        </DesktopOnly>
      </div>
    );
  }
}
