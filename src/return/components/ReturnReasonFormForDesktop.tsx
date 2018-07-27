import * as React from "react";
import SelectBoxMobile2 from "../../general/components/SelectBoxMobile2";
import TextArea from "../../general/components/TextArea";
import CancelAndContinueButton from "../../account/components/CancelAndContinueButton.js";
import ReverseSealYesNo from "../../account/components/ReverseSealYesNo";
import DummyTab from "../../cart/components/DummyTab.js";
import * as styles from "./ReturnReasonFormForDesktop.css";
import {
  IProps,
  IPReturnCommentsObj,
  IState,
  IReturnReasonMapItem,
  IReturnSubReasons,
  IReturnSubReasonWithLabel
} from "./interface/ReturnReasonForm";
const MODE_OF_RETURN = "Select mode of return";
const REFUND_DETAILS = "Refund Details";

export default class ReturnReasonForm extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      displaySecondary: false,
      secondaryReasons: [],
      comment: "",
      reverseSeal: "",
      returnReasonCode: "",
      subReasonCode: "",
      isEnable: false,
      reason: "",
      subReason: ""
    };
  }
  handleContinue() {
    if (this.props.onContinue) {
      let reasonAndCommentObj: IPReturnCommentsObj = Object.assign({
        returnReasonCode: this.state.returnReasonCode,
        subReasonCode: this.state.subReasonCode,
        comment: this.state.comment,
        reason: this.state.reason,
        reverseSeal: this.state.reverseSeal
      });
      this.props.onContinue(reasonAndCommentObj);
    }
  }
  onChangePrimary(val: IReturnSubReasonWithLabel) {
    const code = val.value;
    const label = val.label;
    const returnProductDetails = this.props.returnProductDetails;
    const selectedReason = returnProductDetails.returnReasonMap.find(
      (val: IReturnReasonMapItem) => {
        return val.parentReasonCode === code;
      }
    );

    let selectedSubReasonList =
      selectedReason.subReasons &&
      selectedReason.subReasons.map((value: IReturnSubReasons) => {
        return {
          value: value.subReasonCode,
          label: value.subReturnReason
        };
      });

    this.setState({
      subReasonCode: "",
      subReason: "",
      returnReasonCode: code,
      reason: label,
      isEnable: false,
      secondaryReasons: selectedSubReasonList
    });
  }
  handleChange(val: string) {
    this.setState({ comment: val });
  }
  selectReverseSeal(val: string) {
    this.setState({ reverseSeal: val });
  }
  onChangeSecondary(val: IReturnSubReasonWithLabel) {
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
    const returnProductDetails = this.props.returnProductDetails;
    return (
      <div className={styles.base}>
        <div className={styles.content}>
          <div className={styles.selectReasonWithText}>
            <div className={styles.header}>
              <div className={styles.circleHolder}>
                <div className={styles.circle}>1</div>
              </div>
              Select reason for your return
            </div>

            <div className={styles.select}>
              <SelectBoxMobile2
                placeholder={"Select a reason"}
                options={
                  returnProductDetails &&
                  returnProductDetails.returnReasonMap &&
                  returnProductDetails.returnReasonMap.map(
                    (val: IReturnReasonMapItem, i: number) => {
                      return {
                        value: val.parentReasonCode,
                        label: val.parentReturnReason
                      };
                    }
                  )
                }
                onChange={(val: IReturnSubReasonWithLabel) =>
                  this.onChangePrimary(val)
                }
              />
            </div>
            {this.state.secondaryReasons &&
              this.state.secondaryReasons.length > 0 && (
                <div className={styles.select}>
                  <SelectBoxMobile2
                    placeholder={"Select a reason"}
                    options={this.state.secondaryReasons}
                    onChange={(val: IReturnSubReasonWithLabel) =>
                      this.onChangeSecondary(val)
                    }
                    isEnable={this.state.isEnable}
                  />
                </div>
              )}
            <div className={styles.textArea}>
              <TextArea onChange={(val: string) => this.handleChange(val)} />
            </div>

            <div className={styles.buttonHolder}>
              <CancelAndContinueButton
                handleCancel={() => this.handleCancel()}
                handleContinue={() => this.handleContinue()}
              />
            </div>
          </div>
        </div>
        {returnProductDetails &&
          returnProductDetails.showReverseSealFrJwlry === "yes" && (
            <div className={styles.reverseSealHolder}>
              <ReverseSealYesNo
                selectReverseSeal={(val: string) => this.selectReverseSeal(val)}
              />
            </div>
          )}

        <DummyTab title={MODE_OF_RETURN} number={2} />
        <DummyTab title={REFUND_DETAILS} number={3} />
      </div>
    );
  }
}
