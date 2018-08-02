import TabHolder from "./TabHolder";
import TabData from "./TabData";
import React from "react";
import styles from "./OrderRelatedIssue.css";
import SelectBoxMobile2 from "../../general/components/SelectBoxMobile2";
import TextArea from "../../general/components/TextArea.js";
import Input2 from "../../general/components/Input2.js";
import Button from "../../general/components/Button.js";
import ImageUpload from "../../account/components/ImageUpload.js";
import CheckOutHeader from "../../cart/components/CheckOutHeader";
export default class OrderRelatedIssue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: 0,
      isSelectedOrder: false
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
        <div className={styles.orderHolder}>
          {this.state.isSelected === 0 && (
            <div
              className={styles.selectedOrder}
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
          )}
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
          {this.state.isSelected === 0 && (
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
          )}
          <div className={styles.buttonHolder}>
            <div className={styles.button}>
              <Button
                type="primary"
                height={38}
                label={"Submit"}
                width={166}
                textStyle={{ color: "#fff", fontSize: 14 }}
                onClick={() => this.addAddress()}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
