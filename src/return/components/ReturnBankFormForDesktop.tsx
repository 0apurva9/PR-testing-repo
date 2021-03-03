import * as React from "react";
// import ReturnBankForm from '../../account/components/ReturnBankForm';
import ReplaceRefundSelection from "../../account/components/ReplaceRefundSelection";
// import DummyTab from '../../cart/components/DummyTab.js';
import { IProps, IStateForBank } from "./interface/ReturnBankFormForDesktop";
// import { MODE_OF_RETURN, REFUND_DETAILS } from '../../lib/constants.js';
import SelectedReasonForReturn from "../../account/components/SelectedReasonForReturn";

// import {
// IFSC_PATTERN,
// ACCOUNT_NUMBER,
// RE_ENTER_ACCOUNT_NUMBER,
// ACCOUNT_NUMBER_MATCH_TEXT,
// ACCOUNT_HOLDER_NAME,
// BANK_NAME,
// IFSC_CODE_TEXT,
// IFSC_CODE_VALID_TEXT,
// REFUND_MODE_TEXT,
// 	RETURNS_PREFIX, //added for refund mode
// 	RETURN_TO_STORE,
// 	RETURNS_STORE_MAP,
// 	RETURN_CLIQ_PIQ,
// 	SCHEDULED_PICKUP,
// 	QUICK_DROP,
// 	RETURN_CLIQ_PIQ_ADDRESS,
// 	RETURNS_SELF_COURIER,
// 	SELF_COURIER,
// } from '../../lib/constants';
// import {
//   CASH_ON_DELIVERY,
//   RETURNS_PREFIX,
//   RETURN_LANDING,
//   RETURNS_MODES,
//   RETURNS_REASON,
//   QUICK_DROP,
//   RETURN_TO_STORE,
//   RETURNS_STORE_MAP,
//   RETURN_CLIQ_PIQ,
//   SCHEDULED_PICKUP,
//   RETURN_CLIQ_PIQ_ADDRESS,
//   RETURNS_STORE_BANK_FORM,
//   SELF_COURIER,
//   RETURNS_SELF_COURIER,
//   REPLACE_REFUND_SELECTION
// } from "../../lib/constants";
// import {
//   setDataLayerForMyAccountDirectCalls,
//   ADOBE_MY_ACCOUNT_ORDER_RETURN_CANCEL
// } from "../../lib/adobeUtils";
// const REG_X_FOR_REASON = /reason/i;
// const REG_X_FOR_MODES = /modes/i;
// const REG_X_FOR_RNRSELECTION = /replace-refund-selection/i;

export default class ReturnBankFormForDesktop extends React.Component<IProps, IStateForBank> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            accountNumber: "",
            reEnterAccountNumber: "",
            userName: "",
            bankName: "",
            code: "",
        };
    }

    // private onChangeBankDetail(val: IStateForBank) {
    // 	this.setState(val);
    // }
    // private onContinue() {
    // 	if (!this.state.accountNumber) {
    // 		this.props.displayToast(ACCOUNT_NUMBER);
    // 		return false;
    // 	}
    // 	if (!this.state.reEnterAccountNumber) {
    // 		this.props.displayToast(RE_ENTER_ACCOUNT_NUMBER);
    // 		return false;
    // 	}
    // 	if (this.state.accountNumber !== this.state.reEnterAccountNumber) {
    // 		this.props.displayToast(ACCOUNT_NUMBER_MATCH_TEXT);
    // 		return false;
    // 	}
    // 	if (!this.state.userName) {
    // 		this.props.displayToast(ACCOUNT_HOLDER_NAME);
    // 		return false;
    // 	}
    // 	if (!this.state.mode) {
    // 		this.props.displayToast(REFUND_MODE_TEXT);
    // 		return false;
    // 	}
    // 	if (!this.state.bankName) {
    // 		this.props.displayToast(BANK_NAME);
    // 		return false;
    // 	}
    // 	if (!this.state.code) {
    // 		this.props.displayToast(IFSC_CODE_TEXT);
    // 		return false;
    // 	}
    // 	if (this.state.code && !IFSC_PATTERN.test(this.state.code)) {
    // 		this.props.displayToast(IFSC_CODE_VALID_TEXT);
    // 		return false;
    // 	} else {
    // 		this.props.onContinue(this.state);
    // 	}
    // }
    // onSelectMode(mode) {
    // 	if (mode === QUICK_DROP) {
    // 		this.props.history.push({
    // 			pathname: `${RETURNS_PREFIX}/${this.orderCode}${RETURN_TO_STORE}${RETURNS_STORE_MAP}`,
    // 			state: {
    // 				authorizedRequest: true,
    // 			},
    // 		});
    // 	} else if (mode === SCHEDULED_PICKUP) {
    // 		this.props.history.push({
    // 			pathname: `${RETURNS_PREFIX}/${this.orderCode}${RETURN_CLIQ_PIQ}${RETURN_CLIQ_PIQ_ADDRESS}`,
    // 			state: {
    // 				authorizedRequest: true,
    // 			},
    // 		});
    // 	} else if (mode === SELF_COURIER) {
    // 		this.props.history.push({
    // 			pathname: `${RETURNS_PREFIX}/${this.orderCode}${RETURNS_SELF_COURIER}`,
    // 			state: {
    // 				authorizedRequest: true,
    // 			},
    // 		});
    // 	}
    // }
    private handleCancel() {
        if (this.props.onCancel) {
            this.props.onCancel();
        }
    }

    public render() {
        const subReason = this.props.selectedReasonAndCommentObj && this.props.selectedReasonAndCommentObj.subReason;
        const comments = this.props.selectedReasonAndCommentObj && this.props.selectedReasonAndCommentObj.comment;
        return (
            <React.Fragment>
                <SelectedReasonForReturn
                    header={this.props.returnFlow ? "Reason for return" : "Select reason for your return"}
                    titleDescription={
                        this.props.selectedReasonAndCommentObj && this.props.selectedReasonAndCommentObj.reason
                    }
                    handleCancel={() => this.props.changeReturnReason()}
                    returnFlow={this.props.returnFlow}
                    subDescription={subReason}
                    commentsInReturn={comments}
                />
                <ReplaceRefundSelection
                    {...this.props}
                    onCancel={() => this.handleCancel()}
                    onChangeBankingDetail={this.props.onChange}
                    displayToast={this.props.displayToast}
                    selectedReasonAndCommentObj={this.props.selectedReasonAndCommentObj}
                />
                {/* <ReplaceRefundSelection
        {...this.props}
        productInfo={
          this.props.returnRequest &&
          this.props.returnRequest.returnEntry &&
          this.props.returnRequest.returnEntry.orderEntries[0]
        }
        selectMode={mode => this.onSelectMode(mode)}
        onCancel={() => this.onCancel()}
        getRefundOptionsData={this.props.getRefundOptionsData} //function
        getRefundOptionsDetails={this.props.getRefundOptionsDetails} //data
        getRefundModes={this.props.getRefundModes} //function
        getRefundModesDetails={this.props.getRefundModesDetails} //data
        displayToast={this.props.displayToast}
        updateRefundMode={this.props.updateRefundMode} //function
        getCliqCashDetails={this.props.getCliqCashDetails}
        getCustomerBankDetails={this.props.getCustomerBankDetails}/> */}
                {/* <ReturnBankForm
					headerText="Refund Details"
					onContinue={() => this.onContinue()}
					onCancel={() => this.props.onCancel()}
					onChange={(val: IStateForBank) => this.onChangeBankDetail(val)}
				/>
				<DummyTab title={MODE_OF_RETURN} number={2} />
				<DummyTab title={REFUND_DETAILS} number={3} /> */}
            </React.Fragment>
        );
    }
}
