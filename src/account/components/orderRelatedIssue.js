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
export default class OrderRelatedIssue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: 0,
      isSelectedOrder: false,
      name: ""
    };
  }
  tabSelect(val) {
    this.setState({ isSelected: val });
  }
  selectedOrder() {
    if (this.state.isSelectedOrder === true) {
      this.setState({ isSelectedOrder: false });
    } else {
      this.setState({ isSelectedOrder: true });
    }
  }
  handleChange(val) {
    if (this.props.handleChange) {
      this.props.handleChange(val);
    }
  }
  submitOtherIssue() {
    if (this.props.submitOtherIssue) {
      this.props.submitOtherIssue();
    }
  }
  submitOrderRelatedIssue() {
    if (this.props.submitOrderRelatedIssue) {
      this.props.submitOrderRelatedIssue();
    }
  }
  onChange(val) {
    this.setState(val);
  }

  render() {
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
                  onChange={val => this.handleChange(val)}
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
                  value={this.state.name}
                  onChange={name => this.onChange({ name })}
                  onlyAlphabet={true}
                />
              </div>
              <div className={styles.textInformationHolder}>
                <FloatingLabelInput
                  label="Email"
                  value={this.state.email}
                  onChange={email => this.onChange({ email })}
                />
              </div>
              <div className={styles.textInformationHolder}>
                <FloatingLabelInput
                  label="Phone*"
                  maxLength={10}
                  value={this.state.phone}
                  onChange={phone => this.onChange({ phone })}
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
                  onChange={val => this.handleChange(val)}
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
                  maxLength={10}
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
