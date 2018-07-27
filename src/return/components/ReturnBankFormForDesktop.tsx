import * as React from "react";
import ReturnBankForm from "../../account/components/ReturnBankForm";
import * as styles from "./ReturnBankFormForDesktop.css";
import DummyTab from "../../cart/components/DummyTab.js";
import { IProps, IState } from "./interface/ReturnBankFormForDesktop";
import { MODE_OF_RETURN, REFUND_DETAILS } from "../../lib/constants.js";
import {
  IFSC_PATTERN,
  ACCOUNT_NUMBER,
  RE_ENTER_ACCOUNT_NUMBER,
  ACCOUNT_NUMBER_MATCH_TEXT,
  ACCOUNT_HOLDER_NAME,
  BANK_NAME,
  IFSC_CODE_TEXT,
  IFSC_CODE_VALID_TEXT,
  REFUND_MODE_TEXT
} from "../../lib/constants";

export default class ReturnBankFormForDesktop extends React.Component<
  IProps,
  IState
> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      accountNumber: "",
      reEnterAccountNumber: "",
      userName: "",
      bankName: "",
      code: ""
    };
  }
  private onChangeBankDetail(val: IState) {
    this.setState(val);
  }
  private onContinue() {
    if (!this.state.accountNumber) {
      this.props.displayToast(ACCOUNT_NUMBER);
      return false;
    }
    if (!this.state.reEnterAccountNumber) {
      this.props.displayToast(RE_ENTER_ACCOUNT_NUMBER);
      return false;
    }
    if (this.state.accountNumber !== this.state.reEnterAccountNumber) {
      this.props.displayToast(ACCOUNT_NUMBER_MATCH_TEXT);
      return false;
    }
    if (!this.state.userName) {
      this.props.displayToast(ACCOUNT_HOLDER_NAME);
      return false;
    }
    if (!this.state.mode) {
      this.props.displayToast(REFUND_MODE_TEXT);
      return false;
    }
    if (!this.state.bankName) {
      this.props.displayToast(BANK_NAME);
      return false;
    }
    if (!this.state.code) {
      this.props.displayToast(IFSC_CODE_TEXT);
      return false;
    }
    if (this.state.code && !IFSC_PATTERN.test(this.state.code)) {
      this.props.displayToast(IFSC_CODE_VALID_TEXT);
      return false;
    } else {
      this.props.onContinue(this.state);
    }
  }
  public render() {
    return (
      <div className={styles.base}>
        <ReturnBankForm
          headerText="Refund Details"
          onContinue={() => this.onContinue()}
          onCancel={() => this.props.onCancel()}
          onChange={(val: IState) => this.onChangeBankDetail(val)}
        />
        <DummyTab title={MODE_OF_RETURN} number={2} />
        <DummyTab title={REFUND_DETAILS} number={3} />
      </div>
    );
  }
}
