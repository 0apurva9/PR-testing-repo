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
import { SUCCESS } from "../../lib/constants";
const SELECT_ISSUE_FOR_ORDER_TEXT = "Please select issue for order related";
const SELECT_SUB_ISSUE_FOR_ORDER_TEXT =
  "Please select sub issue for order related";
const SELECT_ISSUE_FOR_OTHER_TEXT = "Please select other issue";
const SELECT_SUB_ISSUE_FOR_OTHER_TEXT = "Please select other sub issue";
const NAME_TEXT = "Please enter name";
const EMAIL_TEXT = "Please enter email id";
const EMAIL_VALID_TEXT = "please enter valid email id";
const MOBILE_TEXT = "Please enter mobile number";
const MOBILE_VALID_TEXT = "Please eneter valid mobile number";
export default class OrderRelatedIssue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: 0,
      isSelectedOrder: false,
      nameForOrderRelated: "",
      phoneNumberForOrderRelated: "",
      emailForOrderRelated: "",
      commentForOrderRelated: "",
      nameForOtherIssue: "",
      phoneNumberForOtherIssue: "",
      emailForOtherIssue: "",
      commentForOtherIssue: "",
      file: "",
      secondaryReasonsForOrderRelated: null,
      reasonForOrderRelated: null,
      reasonCodeForOrderRelated: null,
      secondaryReasonsCodeForOrderRelated: null,
      isEnableForOrderRelated: false,
      secondaryReasonsForOtherIssue: null,
      reasonForOtherIssue: null,
      reasonCodeForOtherIssue: null,
      secondaryReasonsCodeForOtherIssue: null,
      isEnableForOtherIssue: false
    };
  }
  componentDidMount() {
    this.props.getCustomerQueriesData();
    this.props.getOrdersTransactionData();
  }
  tabSelect(val) {
    this.setState({
      isSelected: val,
      nameForOtherIssue: "",
      phoneNumberForOtherIssue: "",
      emailForOtherIssue: "",
      commentForOtherIssue: "",
      secondaryReasonsForOtherIssue: null,
      reasonForOtherIssue: null,
      reasonCodeForOtherIssue: null,
      secondaryReasonsCodeForOtherIssue: null,
      isEnableForOtherIssue: false
    });
    if (this.state.isSelected === 1) {
      this.setState({
        nameForOrderRelated: "",
        phoneNumberForOrderRelated: "",
        emailForOrderRelated: "",
        commentForOrderRelated: "",
        file: "",
        secondaryReasonsForOrderRelated: null,
        reasonForOrderRelated: null,
        reasonCodeForOrderRelated: null,
        secondaryReasonsCodeForOrderRelated: null,
        isEnableForOrderRelated: false,
        isSelectedOrder: false
      });
    }
  }
  selectedOrder() {
    if (this.state.isSelectedOrder === true) {
      this.setState({ isSelectedOrder: false });
    } else {
      this.setState({ isSelectedOrder: true });
    }
  }
  onChangeReasonForOrderRelated(val) {
    const code = val.value;
    const label = val.label;
    this.setState({
      secondaryReasonsCodeForOrderRelated: null,
      secondaryReasonsForOrderRelated: null,
      reasonCodeForOrderRelated: code,
      reasonForOrderRelated: label,
      isEnableForOrderRelated: false
    });
  }
  onChangeSubReasonForOrderRelated(val) {
    const code = val.value;
    const label = val.label;
    this.setState({
      secondaryReasonsCodeForOrderRelated: code,
      secondaryReasonsForOrderRelated: label,
      isEnableForOrderRelated: true
    });
  }
  onChange(val) {
    this.setState(val);
  }
  async submitOrderRelatedIssue() {
    if (!this.state.reasonForOrderRelated) {
      this.props.displayToast(SELECT_ISSUE_FOR_ORDER_TEXT);
      return false;
    }
    if (!this.state.secondaryReasonsForOrderRelated) {
      this.props.displayToast(SELECT_SUB_ISSUE_FOR_ORDER_TEXT);
      return false;
    }
    if (!this.state.nameForOrderRelated) {
      this.props.displayToast(NAME_TEXT);
      return false;
    }
    if (!this.state.emailForOrderRelated) {
      this.props.displayToast(EMAIL_TEXT);
      return false;
    }
    if (
      this.state.emailForOrderRelated &&
      !EMAIL_REGULAR_EXPRESSION.test(this.state.emailForOrderRelated)
    ) {
      this.props.displayToast(EMAIL_VALID_TEXT);
      return false;
    }
    if (!this.state.phoneNumberForOrderRelated) {
      this.props.displayToast(MOBILE_TEXT);
      return false;
    }
    if (
      this.state.phoneNumberForOrderRelated &&
      !MOBILE_PATTERN.test(this.state.phoneNumberForOrderRelated)
    ) {
      this.props.displayToast(MOBILE_VALID_TEXT);
      return false;
    } else {
      if (this.state.file) {
        const uploadFileResponse = await this.props.uploadUserFile(
          this.state.file
        );
        if (uploadFileResponse && uploadFileResponse.status === SUCCESS) {
          let orderRelatedIssue =
            this.props.customerQueriesData &&
            this.props.customerQueriesData.nodes &&
            this.props.customerQueriesData.nodes.find(orderRelated => {
              return orderRelated.nodeDesc === "Order Related Query";
            });
          let submitDetailsObject = Object.assign(
            {},
            {
              nodeL0: orderRelatedIssue.nodeL0,
              nodeL1: orderRelatedIssue.nodeCode,
              nodeL2: this.state.reasonCodeForOrderRelated,
              nodeL3: this.state.secondaryReasonsCodeForOrderRelated,
              contactEmail: this.state.emailForOrderRelated,
              contactMobile: this.state.phoneNumberForOrderRelated,
              contactName: this.state.nameForOrderRelated,
              attachmentFiles: uploadFileResponse.uploadUserFile.fileURL,
              comment: this.state.commentForOrderRelated,
              nodeL4: "",
              transactionId: "",
              orderCode: "",
              ticketType: "",
              subOrderCode: ""
            }
          );
          console.log(submitDetailsObject);
          if (this.props.submitOrderRelatedIssue) {
            this.props.submitOrderRelatedIssue(this.state);
          }
        }
      } else {
        if (this.props.submitOrderRelatedIssue) {
          this.props.submitOrderRelatedIssue(this.state);
        }
      }
    }
  }
  onChangeReasonForOtherIssue(val) {
    const code = val.value;
    const label = val.label;
    this.setState({
      secondaryReasonsCodeForOtherIssue: null,
      secondaryReasonsForOtherIssue: null,
      reasonCodeForOtherIssue: code,
      reasonForOtherIssue: label,
      isEnableForOtherIssue: false
    });
  }
  onChangeSubReasonForOtherIssue(val) {
    const code = val.value;
    const label = val.label;
    this.setState({
      secondaryReasonsCodeForOtherIssue: code,
      secondaryReasonsForOtherIssue: label,
      isEnableForOtherIssue: true
    });
  }
  async submitOtherIssue() {
    if (!this.state.reasonForOtherIssue) {
      this.props.displayToast(SELECT_ISSUE_FOR_OTHER_TEXT);
      return false;
    }
    if (!this.state.secondaryReasonsForOtherIssue) {
      this.props.displayToast(SELECT_SUB_ISSUE_FOR_OTHER_TEXT);
      return false;
    }
    if (!this.state.nameForOtherIssue) {
      this.props.displayToast(NAME_TEXT);
      return false;
    }
    if (!this.state.emailForOtherIssue) {
      this.props.displayToast(EMAIL_TEXT);
      return false;
    }
    if (
      this.state.emailForOtherIssue &&
      !EMAIL_REGULAR_EXPRESSION.test(this.state.emailForOtherIssue)
    ) {
      this.props.displayToast(EMAIL_VALID_TEXT);
      return false;
    }
    if (!this.state.phoneNumberForOtherIssue) {
      this.props.displayToast(MOBILE_TEXT);
      return false;
    }
    if (
      this.state.phoneNumberForOtherIssue &&
      !MOBILE_PATTERN.test(this.state.phoneNumberForOtherIssue)
    ) {
      this.props.displayToast(MOBILE_VALID_TEXT);
      return false;
    } else {
      let otherIssue =
        this.props.customerQueriesData &&
        this.props.customerQueriesData.nodes &&
        this.props.customerQueriesData.nodes.find(otherIssue => {
          return otherIssue.nodeDesc === "Any Other Query";
        });
      let submitDetailsObject = Object.assign(
        {},
        {
          nodeL0: otherIssue.nodeL0,
          nodeL1: otherIssue.nodeCode,
          nodeL2: this.state.reasonCodeForOtherIssue,
          nodeL3: this.state.secondaryReasonsCodeForOtherIssue,
          contactEmail: this.state.emailForOtherIssue,
          contactMobile: this.state.phoneNumberForOtherIssue,
          contactName: this.state.nameForOtherIssue,
          attachmentFiles: "",
          comment: this.state.commentForOtherIssue,
          nodeL4: "",
          transactionId: "",
          orderCode: "",
          ticketType: "",
          subOrderCode: ""
        }
      );
      console.log(submitDetailsObject);
      if (this.props.submitOtherIssue) {
        this.props.submitOtherIssue();
      }
    }
  }
  render() {
    let orderRelatedIssue =
      this.props.customerQueriesData &&
      this.props.customerQueriesData.nodes &&
      this.props.customerQueriesData.nodes.find(orderRelated => {
        return orderRelated.nodeDesc === "Order Related Query";
      });
    let orderRelatedSubIssue =
      this.state.reasonForOrderRelated &&
      orderRelatedIssue &&
      orderRelatedIssue.children &&
      orderRelatedIssue.children.find(orderRelatedSubIssue => {
        return (
          orderRelatedSubIssue.nodeDesc === this.state.reasonForOrderRelated
        );
      });
    let otherIssue =
      this.props.customerQueriesData &&
      this.props.customerQueriesData.nodes &&
      this.props.customerQueriesData.nodes.find(otherIssue => {
        return otherIssue.nodeDesc === "Any Other Query";
      });
    let otherSubIssue =
      this.state.reasonForOtherIssue &&
      otherIssue &&
      otherIssue.children &&
      otherIssue.children.find(otherSubIssue => {
        return otherSubIssue.nodeDesc === this.state.reasonForOtherIssue;
      });
    return (
      <div className={styles.base}>
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
        {this.state.isSelected === 0 && (
          <div className={styles.orderHolder}>
            <div className={styles.selectedOrder}>
              <div
                className={styles.headingHolder}
                onClick={() => this.selectedOrder()}
              >
                <CheckOutHeader
                  indexNumber="1"
                  confirmTitle="Select your order"
                />
                <div
                  className={
                    this.state.isSelectedOrder
                      ? styles.iconRotate
                      : styles.iconHolder
                  }
                />
              </div>
              {this.state.isSelectedOrder && (
                <div className={styles.orderCardHolder}>
                  <div className={styles.imageHolder}>
                    <ProductImage image={this.props.image} />
                  </div>
                  <div className={styles.dataHolder}>
                    {this.props.dataDescription && (
                      <div className={styles.dataDescription}>
                        {this.props.dataDescription}
                      </div>
                    )}
                    {this.props.orderId && (
                      <div className={styles.dataDescription}>
                        {`Order ID; ${this.props.orderId}`}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className={styles.selectIssueHolder}>
              <div className={styles.secondOrder}>
                <CheckOutHeader indexNumber="2" confirmTitle="Select issue" />
              </div>
              <div className={styles.selectIssue}>
                <SelectBoxMobile2
                  placeholder="Select issue"
                  arrowColour="black"
                  height={33}
                  options={
                    orderRelatedIssue &&
                    orderRelatedIssue.children &&
                    orderRelatedIssue.children.map((val, i) => {
                      return {
                        value: val.nodeCode,
                        label: val.nodeDesc
                      };
                    })
                  }
                  onChange={val => this.onChangeReasonForOrderRelated(val)}
                />
              </div>
              <div className={styles.selectIssue}>
                <SelectBoxMobile2
                  placeholder="Select sub-issue"
                  arrowColour="black"
                  height={33}
                  options={
                    orderRelatedSubIssue &&
                    orderRelatedSubIssue.children &&
                    orderRelatedSubIssue.children.map((val, i) => {
                      return {
                        value: val.nodeCode,
                        label: val.nodeDesc
                      };
                    })
                  }
                  isEnable={this.state.isEnableForOrderRelated}
                  onChange={val => this.onChangeSubReasonForOrderRelated(val)}
                />
              </div>
              <div className={styles.selectIssue}>
                <TextArea
                  placeholder={"Comments(Optional)"}
                  onChange={commentForOrderRelated =>
                    this.onChange({ commentForOrderRelated })
                  }
                />
              </div>
            </div>
            <div className={styles.selectIssueHolder}>
              <div className={styles.secondOrder}>
                <CheckOutHeader
                  indexNumber="3"
                  confirmTitle="Personal Details"
                />
              </div>
              <div className={styles.textInformationHolder}>
                <FloatingLabelInput
                  label="Name"
                  value={this.state.nameForOrderRelated}
                  onChange={nameForOrderRelated =>
                    this.onChange({ nameForOrderRelated })
                  }
                  onlyAlphabet={true}
                />
              </div>
              <div className={styles.textInformationHolder}>
                <FloatingLabelInput
                  label="Email"
                  value={this.state.emailForOrderRelated}
                  onChange={emailForOrderRelated =>
                    this.onChange({ emailForOrderRelated })
                  }
                />
              </div>
              <div className={styles.textInformationHolder}>
                <FloatingLabelInput
                  label="Phone*"
                  maxLength={"10"}
                  value={this.state.phoneNumberForOrderRelated}
                  onChange={phoneNumberForOrderRelated =>
                    this.onChange({ phoneNumberForOrderRelated })
                  }
                  onlyNumber={true}
                />
              </div>
            </div>
            <div className={styles.selectImageHolder}>
              <div className={styles.secondOrder}>
                <CheckOutHeader
                  indexNumber="4"
                  confirmTitle="Add attachment (Optional)"
                />
              </div>
              <div className={styles.validImage}>
                Upload JPEG, PNG (Maximum size 5 MB)
              </div>
              <div className={styles.imageInput}>
                <ImageUpload
                  value={"Upload attachment"}
                  onChange={file => this.setState({ file })}
                />
              </div>
            </div>
            <div className={styles.buttonHolder}>
              <div className={styles.button}>
                <Button
                  type="primary"
                  height={38}
                  label={"Submit"}
                  width={166}
                  textStyle={{ color: "#fff", fontSize: 14 }}
                  onClick={() => this.submitOrderRelatedIssue()}
                />
              </div>
            </div>
          </div>
        )}
        {this.state.isSelected === 1 && (
          <div className={styles.otherIssueHolder}>
            <div className={styles.selectIssueHolder}>
              <div className={styles.secondOrder}>
                <CheckOutHeader indexNumber="1" confirmTitle="Select issue" />
              </div>
              <div className={styles.selectIssue}>
                <SelectBoxMobile2
                  placeholder="Select issue"
                  arrowColour="black"
                  height={33}
                  options={
                    otherIssue &&
                    otherIssue.children &&
                    otherIssue.children.map((val, i) => {
                      return {
                        value: val.nodeCode,
                        label: val.nodeDesc
                      };
                    })
                  }
                  onChange={val => this.onChangeReasonForOtherIssue(val)}
                />
              </div>
              <div className={styles.selectIssue}>
                <SelectBoxMobile2
                  placeholder="Select sub-issue"
                  arrowColour="black"
                  height={33}
                  options={
                    otherSubIssue &&
                    otherSubIssue.children &&
                    otherSubIssue.children.map((val, i) => {
                      return {
                        value: val.nodeCode,
                        label: val.nodeDesc
                      };
                    })
                  }
                  isEnable={this.state.isEnableForOtherIssue}
                  onChange={val => this.onChangeSubReasonForOtherIssue(val)}
                />
              </div>
              <div className={styles.selectIssue}>
                <TextArea
                  placeholder={"Comments(Optional)"}
                  onChange={commentForOtherIssue =>
                    this.onChange({ commentForOtherIssue })
                  }
                />
              </div>
            </div>
            <div className={styles.selectIssueHolder}>
              <div className={styles.secondOrder}>
                <CheckOutHeader
                  indexNumber="2"
                  confirmTitle="Personal Details"
                />
              </div>
              <div className={styles.textInformationHolder}>
                <FloatingLabelInput
                  label="Name"
                  value={this.state.nameForOtherIssue}
                  onChange={nameForOtherIssue =>
                    this.onChange({ nameForOtherIssue })
                  }
                  onlyAlphabet={true}
                />
              </div>
              <div className={styles.textInformationHolder}>
                <FloatingLabelInput
                  label="Email"
                  value={this.state.emailForOtherIssue}
                  onChange={emailForOtherIssue =>
                    this.onChange({ emailForOtherIssue })
                  }
                  onBlu
                />
              </div>
              <div className={styles.textInformationHolder}>
                <FloatingLabelInput
                  label="Phone*"
                  maxLength={"10"}
                  value={this.state.phoneNumberForOtherIssue}
                  onChange={phoneNumberForOtherIssue =>
                    this.onChange({ phoneNumberForOtherIssue })
                  }
                  onlyNumber={true}
                />
              </div>
            </div>
            <div className={styles.buttonHolder}>
              <div className={styles.button}>
                <Button
                  type="primary"
                  height={38}
                  label={"Submit"}
                  width={166}
                  textStyle={{ color: "#fff", fontSize: 14 }}
                  onClick={() => this.submitOtherIssue()}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
