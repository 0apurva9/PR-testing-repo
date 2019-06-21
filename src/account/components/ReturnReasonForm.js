import React from "react";
import OrderCard from "./OrderCard";
import SelectBoxMobile2 from "../../general/components/SelectBoxMobile2";
import TextArea from "../../general/components/TextArea";
import UnderLinedButton from "../../general/components/UnderLinedButton";
import Button from "../../general/components/Button";
import CancelAndContinueButton from "./CancelAndContinueButton";
import styles from "./ReturnReasonForm.css";
import ReverseSealYesNo from "./ReverseSealYesNo.js";
import DeskTopOnly from "../../general/components/DesktopOnly.js";
import MobileOnly from "../../general/components/MobileOnly.js";
import DummyTab from "../../cart/components/DummyTab.js";
const MODE_OF_RETURN = "Select mode of return";
const REFUND_DETAILS = "Refund Details";
export default class ReturnReasonForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySecondary: false,
      secondaryReasons: null,
      comment: null,
      reverseSeal: null,
      returnReasonCode: null,
      subReasonCode: null,
      isEnable: false,
      uploadedImageFiles: "",
      validImgFiles: "",
      showImageUpload: false
    };
  }
  handleContinue() {
    if (this.props.onContinue) {
      let reasonAndCommentObj = Object.assign(
        {},
        {
          returnReasonCode: this.state.returnReasonCode,
          subReasonCode: this.state.subReasonCode,
          subReason: this.state.subReason,
          comment: this.state.comment,
          reason: this.state.reason,
          reverseSeal: this.state.reverseSeal,
          sellerorderno: this.props.returnProductDetails.orderProductWsDTO[0]
            .sellerorderno,
          transactionId: this.props.returnProductDetails.orderProductWsDTO[0]
            .transactionId,
          validImgFiles: this.state.validImgFiles,
          showImageUpload: this.state.showImageUpload
        }
      );
      this.props.onContinue(reasonAndCommentObj);
    }
  }
  onChangePrimary(val) {
    const code = val.value;
    const label = val.label;
    const data = this.props.returnProductDetails;
    this.setState({
      subReasonCode: null,
      subReason: null,
      returnReasonCode: code,
      reason: label,
      isEnable: false,
      secondaryReasons: data.returnReasonMap
        .filter(val => {
          return val.parentReasonCode === code;
        })
        .map(val => {
          if (val.subReasons) {
            return val.subReasons.map(value => {
              return {
                value: value.subReasonCode,
                label: value.subReturnReason
              };
            });
          }
        })[0]
    });
  }
  handleChange(val) {
    this.setState({ comment: val });
  }
  selectReverseSeal(val) {
    this.setState({ reverseSeal: val });
  }
  onChangeSecondary(val) {
    const code = val.value;
    const label = val.label;
    this.setState({ subReasonCode: code, subReason: label, isEnable: true });
  }
  handleCancel() {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  }
  render() {
    const data = this.props.returnProductDetails;

    return (
      <div className={styles.base}>
        <div className={styles.content}>
          <div className={styles.selectReasonWithText}>
            {/* <DeskTopOnly>
							<div className={styles.header}>
								{/* <div className={styles.circleHolder}>
									<div className={styles.circle}>1</div>
								</div>
								Select reason for your return
							</div>
						</DeskTopOnly> */}
            {this.props.returnFlow == false ? (
              <div className={styles.header}>
                <div className={styles.circleHolder}>
                  <div className={styles.circle}>1</div>
                </div>
                Select reason for your return
              </div>
            ) : (
              <div className={styles.header}>Please select return reason</div>
            )}
            <div className={styles.select}>
              <SelectBoxMobile2
                placeholder={"Select a reason"}
                options={
                  data &&
                  data.returnReasonMap &&
                  data.returnReasonMap.map((val, i) => {
                    return {
                      value: val.parentReasonCode,
                      label: val.parentReturnReason
                    };
                  })
                }
                onChange={val => this.onChangePrimary(val)}
              />
            </div>
            {this.state.secondaryReasons && (
              <div className={styles.select}>
                <SelectBoxMobile2
                  placeholder={"Select a reason"}
                  options={this.state.secondaryReasons}
                  onChange={val => this.onChangeSecondary(val)}
                  isEnable={this.state.isEnable}
                />
              </div>
            )}
            <div className={styles.textArea}>
              <TextArea
                value={this.state.comment}
                onChange={val => this.handleChange(val)}
              />
            </div>
            <DeskTopOnly>
              <div className={styles.buttonHolder}>
                <CancelAndContinueButton
                  handleCancel={() => this.handleCancel()}
                  handleContinue={() => this.handleContinue()}
                  disabled={this.state.reason ? false : true}
                />
              </div>
            </DeskTopOnly>
          </div>
        </div>
        {data &&
          data.showReverseSealFrJwlry === "yes" && (
            <div className={styles.reverseSealHolder}>
              <ReverseSealYesNo
                selectReverseSeal={val => this.selectReverseSeal(val)}
              />
            </div>
          )}
        {this.props.returnFlow ? (
          ""
        ) : (
          <DummyTab title={MODE_OF_RETURN} number={2} />
        )}
        {this.props.returnFlow ? (
          ""
        ) : (
          <DummyTab title={REFUND_DETAILS} number={3} />
        )}
      </div>
    );
  }
}
