import * as React from "react";
import SelectBoxMobile2 from "../../general/components/SelectBoxMobile2";
import TextArea from "../../general/components/TextArea";
import CancelAndContinueButton from "../../account/components/CancelAndContinueButton.js";
import ReverseSealYesNo from "../../account/components/ReverseSealYesNo";
import DummyTab from "../../cart/components/DummyTab.js";
import * as styles from "./ReturnReasonFormForDesktop.css";
import { IProps, IPCommentDetailsObj } from "./interface/ReturnReasonForm";
const MODE_OF_RETURN = "Select mode of return";
const REFUND_DETAILS = "Refund Details";

interface IState {
  displaySecondary?: boolean;
  secondaryReasons?: string;
  comment: string;
  reverseSeal: string;
  returnReasonCode: string;
  subReasonCode: string;
  isEnable: boolean;
  reason: string;
  subReason: string;
}

export default class ReturnReasonForm extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      displaySecondary: false,
      secondaryReasons: "",
      comment: "",
      reverseSeal: ReverseSealYesNo,
      returnReasonCode: "",
      subReasonCode: "",
      isEnable: false,
      reason: "",
      subReason: ""
    };
  }
  handleContinue() {
    if (this.props.onContinue) {
      let reasonAndCommentObj: IPCommentDetailsObj = Object.assign({
        returnReasonCode: this.state.returnReasonCode,
        subReasonCode: this.state.subReasonCode,
        comment: this.state.comment,
        reason: this.state.reason,
        reverseSeal: this.state.reverseSeal
      });
      this.props.onContinue(reasonAndCommentObj);
    }
  }
  onChangePrimary(val: any) {
    const code = val.value;
    const label = val.label;
    const data = this.props.returnProductDetails;
    this.setState({
      subReasonCode: "",
      subReason: "",
      returnReasonCode: code,
      reason: label,
      isEnable: false,
      secondaryReasons: data.returnReasonMap
        .filter((val: any) => {
          return val.parentReasonCode === code;
        })
        .map((val: any) => {
          if (val.subReasons) {
            return val.subReasons.map((value: any) => {
              return {
                value: value.subReasonCode,
                label: value.subReturnReason
              };
            });
          }
        })[0]
    });
  }
  handleChange(val: string) {
    this.setState({ comment: val });
  }
  selectReverseSeal(val: string) {
    this.setState({ reverseSeal: val });
  }
  onChangeSecondary(val: any) {
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
                  data &&
                  data.returnReasonMap &&
                  data.returnReasonMap.map((val: any, i: number) => {
                    return {
                      value: val.parentReasonCode,
                      label: val.parentReturnReason
                    };
                  })
                }
                onChange={(val: any) => this.onChangePrimary(val)}
              />
            </div>
            {this.state.secondaryReasons && (
              <div className={styles.select}>
                <SelectBoxMobile2
                  placeholder={"Select a reason"}
                  options={this.state.secondaryReasons}
                  onChange={(val: string) => this.onChangeSecondary(val)}
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
        {data &&
          data.showReverseSealFrJwlry === "yes" && (
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
