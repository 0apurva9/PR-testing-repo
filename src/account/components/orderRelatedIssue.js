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
      name1: "",
      phone1: "",
      email1: "",
      secondaryReasonsForOrderRelated: null,
      reasonForOrderRelated: null,
      reasonCodeForOrderRelated: null,
      secondaryReasonsCodeForOrderRelated: null,
      isEnableForOrderRelated: false
    };
  }
  componentDidMount() {
    this.props.getCustomerQueriesData();
    this.props.getOrdersTransactionData();
  }
  tabSelect(val) {
    this.setState({ isSelected: val });
    if (this.state.isSelected === 1) {
      this.setState({ isSelectedOrder: false });
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
  submitOrderRelatedIssue() {
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
      console.log(this.state);
      if (this.props.submitOrderRelatedIssue) {
        this.props.submitOrderRelatedIssue();
      }
    }
  }
  submitOtherIssue() {
    if (this.props.submitOtherIssue) {
      this.props.submitOtherIssue();
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
    // console.log(orderRelatedIssue);

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
                  onChange={mode => this.onChange({ mode })}
                />
              </div>
              <div className={styles.selectIssue}>
                <SelectBoxMobile2
                  placeholder="Select sub-issue"
                  arrowColour="black"
                  height={33}
                  onChange={mode => this.onChange({ mode })}
                />
              </div>
              <div className={styles.selectIssue}>
                <TextArea
                  placeholder={"Comments(Optional)"}
                  onChange={val => this.onChange(val)}
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
                  value={this.state.name1}
                  onChange={name1 => this.onChange({ name1 })}
                  onlyAlphabet={true}
                />
              </div>
              <div className={styles.textInformationHolder}>
                <FloatingLabelInput
                  label="Email"
                  value={this.state.email1}
                  onChange={email1 => this.onChange({ email1 })}
                  onBlu
                />
              </div>
              <div className={styles.textInformationHolder}>
                <FloatingLabelInput
                  label="Phone*"
                  maxLength={"10"}
                  value={this.state.phone1}
                  onChange={phone1 => this.onChange({ phone1 })}
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
