import React from "react";
import ReturnsFrameV2 from "./ReturnsFrameV2";
import BankDetailsV2 from "./BankDetailsV2";

export default class ReturnBankForm extends React.Component {
  handleCancel() {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  }
  render() {
    return (
      // <ReturnsFrame
      //   headerText="Refund Details"
      //   onContinue={this.props.onContinue}
      //   onCancel={() => this.handleCancel()}
      //   isFooterNeeded={true}
      // >
      //   <BankDetails onChange={this.props.onChange} />
      // </ReturnsFrame>
      <ReturnsFrameV2 onContinue={this.props.onContinue} isFooterNeeded={true}>
        <BankDetailsV2
          onChange={this.props.onChange}
          clearForm={this.props.clearForm}
          history={this.props.history}
          updateStateForBankDetails={this.props.updateStateForBankDetails}
          bankDetail={this.props.bankDetail}
        />
      </ReturnsFrameV2>
    );
  }
}
