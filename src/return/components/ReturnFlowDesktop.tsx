import * as React from 'react';
import { Route } from 'react-router-dom';
import {
	IProps,
	IProductDetailsObj,
	ReturnStatus,
	IState,
	IReturnSelectedReason,
	//IUpdateCustomerBankDetails,
} from './interface/ReturnFlowDesktop';
import { IStateForBank } from './interface/ReturnBankFormForDesktop';
import * as Cookie from '../../lib/Cookie';
import ReturnReasonAndModes from '../../account/components/ReturnReasonAndModes';
//import ReturnBankForm from '../../account/components/ReturnBankForm';
import ReturnToStoreContainer from '../../account/containers/ReturnToStoreContainer.js';
import ReturnCliqAndPiqContainer from '../../account/containers/ReturnCliqAndPiqContainer.js';
import SelfCourierContainer from '../../account/containers/SelfCourierContainer.js';
// import ReturnReasonFormForDesktop from './ReturnReasonFormForDesktop';
// import ReturnModesForDesktop from './ReturnModesForDesktop';
import cloneDeep from 'lodash.clonedeep';
import {
	LOGGED_IN_USER_DETAILS,
	CUSTOMER_ACCESS_TOKEN,
	MY_ACCOUNT_PAGE,
	MY_ACCOUNT_ORDERS_PAGE,
	RETURN_TO_STORE,
	RETURNS_STORE_MAP,
	RETURNS_PREFIX,
	SCHEDULED_PICKUP,
	RETURN_CLIQ_PIQ,
	RETURN_CLIQ_PIQ_ADDRESS,
	QUICK_DROP,
	SELF_COURIER,
	RETURNS_SELF_COURIER,
	REPLACE_REFUND_SELECTION,
	RETURN_LANDING,
	RETURNS,
	//RETURNS_STORE_BANK_FORM,
} from '../../lib/constants';
//import ReturnBankFormForDesktop from './ReturnBankFormForDesktop';
//import ReturnAndOrderCancelWrapper from './ReturnAndOrderCancelWrapper';
import { setDataLayerForMyAccountDirectCalls, ADOBE_MY_ACCOUNT_ORDER_RETURN_CANCEL } from '../../lib/adobeUtils';
//import * as format from 'date-fns/format';
const RETURN_FLAG: string = 'R';
//const dateFormat = 'DD MMM YYYY';
const IFSC_CODE_TEXT = 'Please enter IFSC code';
const IFSC_CODE_VALID_TEXT = 'Please enter valid IFSC code';
const IFSC_PATTERN = /^[A-Za-z]{4}0[A-Z0-9a-z]{6}$/;
const ACCOUNT_NUMBER = 'Please enter account number';
const RE_ENTER_ACCOUNT_NUMBER = 'Please re-enter account number';
const ACCOUNT_NUMBER_MATCH_TEXT = 'Account number did not match';
const ACCOUNT_HOLDER_NAME = 'Please enter customer name';
const BANK_NAME = 'Please enter bank name';
const SELECT_TITLE_TEXT = 'Please select title';
export default class ReturnFlowDesktop extends React.Component<IProps, IState> {
	orderCode: string;
	transactionId: string;
	isCOD: boolean;
	constructor(props: IProps) {
		super(props);
		this.orderCode = props.location.pathname.split('/')[2];
		this.transactionId = props.location.state ? props.location.state.transactionId : null;
		this.isCOD = props.location.state && props.location.state.isCOD;
		this.state = {
			bankDetail: {},
			isCOD: this.isCOD,
			returnProgressStatus: ReturnStatus.SHOW_SELECT_REASON_AND_COMMENT_SECTION,
			selectedReasonAndCommentObj: null,
		};
	}
	componentDidMount() {
		let orderCode = this.orderCode;
		let transactionId = this.transactionId;

		let productDetails: IProductDetailsObj = {
			transactionId: transactionId,
			returnCancelFlag: RETURN_FLAG,
			orderCode: orderCode,
		};
		this.props.returnProductDetailsFunc(productDetails);
		this.props.getReturnRequest(orderCode, transactionId);
		if (this.props.getUserAddress) {
			this.props.getUserAddress();
		}
		if (!transactionId) {
			this.props.history.push(`${MY_ACCOUNT_PAGE}${MY_ACCOUNT_ORDERS_PAGE}`);
		}
	}
	private navigateToLogin() {
		return <div />;
	}
	onChangeBankingDetail = (val: string) => {
		//console.log('val in change details', val);
		let bankDetail = cloneDeep(this.state.bankDetail);
		Object.assign(bankDetail, val);
		this.setState({ bankDetail });
	};
	updateStateForBankDetails = (data: IStateForBank) => {
		this.setState({ bankDetail: data });
		//console.log('data:', data);
	};
	clearForm() {
		this.setState({ bankDetail: {} });
	}
	handleContinueForReason = (returnSelectedReason: IReturnSelectedReason) => {
		if (!returnSelectedReason.reason) {
			this.props.displayToast('Please select reason ');
			return false;
		} else if (
			this.props.returnProductDetails &&
			this.props.returnProductDetails.showReverseSealFrJwlry === 'yes' &&
			(returnSelectedReason.reverseSeal === '' || returnSelectedReason.reverseSeal.length === 0)
		) {
			this.props.displayToast('Please Select Reverse Seal ');
			return false;
		} else {
			//console.log('this.props:', this.state.isCOD);
			this.setState({
				returnProgressStatus: this.state.isCOD
					? ReturnStatus.SHOW_BANK_DETAIL_SECTION
					: ReturnStatus.SHOW_BANK_DETAIL_SECTION,
				//: ReturnStatus.SHOW_SELECT_MODE_SECTION,
				selectedReasonAndCommentObj: returnSelectedReason,
			});
		}
	};
	handleCancelForReason = () => {
		this.props.history.goBack();
	};
	handleContinueForBankForm = (BankDetails: IStateForBank) => {
		if (BankDetails) {
			//console.log('1');
			this.setState({
				returnProgressStatus: ReturnStatus.SHOW_SELECT_MODE_SECTION,
				bankDetail: BankDetails,
			});
		}
		if (!this.state.bankDetail.ifscCode) {
			this.props.displayToast(IFSC_CODE_TEXT);
			return false;
		}
		if (this.state.bankDetail.ifscCode && !IFSC_PATTERN.test(this.state.bankDetail.ifscCode)) {
			this.props.displayToast(IFSC_CODE_VALID_TEXT);
			return false;
		}
		if (!this.state.bankDetail.accountNumber) {
			this.props.displayToast(ACCOUNT_NUMBER);
			return false;
		}
		if (!this.state.bankDetail.reEnterAccountNumber) {
			this.props.displayToast(RE_ENTER_ACCOUNT_NUMBER);
			return false;
		}
		if (this.state.bankDetail.accountNumber !== this.state.bankDetail.reEnterAccountNumber) {
			this.props.displayToast(ACCOUNT_NUMBER_MATCH_TEXT);
			return false;
		}
		if (!this.state.bankDetail.title) {
			this.props.displayToast(SELECT_TITLE_TEXT);
			return false;
		}
		if (!this.state.bankDetail.accountHolderName) {
			this.props.displayToast(ACCOUNT_HOLDER_NAME);
			return false;
		}
		if (!this.state.bankDetail.bankName) {
			this.props.displayToast(BANK_NAME);
			return false;
		} else {
			//console.log('2 else');
			//api call to save bank details
			//remove unnecessary field get from api success response which are required for above validation
			let bankData = this.state.bankDetail;
			delete bankData.type;
			delete bankData.status;
			delete bankData.customerName;
			delete bankData.reEnterAccountNumber;
			this.props.updateCustomerBankDetails(bankData);
			//console.log('api data:', this.props.updateCustomerBankDetails(bankData));
			this.props.history.push({
				pathname: `${RETURNS_PREFIX}/${this.orderCode}${RETURN_LANDING}${REPLACE_REFUND_SELECTION}`,
				state: {
					authorizedRequest: true,
				},
			});
		}
	};
	onSelectMode(mode: any) {
		if (mode === QUICK_DROP) {
			this.props.history.push({
				pathname: `${RETURNS_PREFIX}/${this.orderCode}${RETURN_TO_STORE}${RETURNS_STORE_MAP}`,
				state: {
					authorizedRequest: true,
				},
			});
		} else if (mode === SCHEDULED_PICKUP) {
			this.props.history.push({
				pathname: `${RETURNS_PREFIX}/${this.orderCode}${RETURN_CLIQ_PIQ}${RETURN_CLIQ_PIQ_ADDRESS}`,
				state: {
					authorizedRequest: true,
				},
			});
		} else if (mode === SELF_COURIER) {
			this.props.history.push({
				pathname: `${RETURNS_PREFIX}/${this.orderCode}${RETURNS_SELF_COURIER}`,
				state: {
					authorizedRequest: true,
				},
			});
		}
	}
	onCancel() {
		setDataLayerForMyAccountDirectCalls(ADOBE_MY_ACCOUNT_ORDER_RETURN_CANCEL);
		this.props.history.goBack();
	}
	handleCancelForBankForm = () => {
		this.setState({
			returnProgressStatus: ReturnStatus.SHOW_SELECT_REASON_AND_COMMENT_SECTION,
		});
		this.props.history.goBack();
	};
	changeReturnReason = () => {
		this.setState({
			returnProgressStatus: ReturnStatus.SHOW_SELECT_REASON_AND_COMMENT_SECTION,
			selectedReasonAndCommentObj: null,
		});
	};
	onChangeReasonAndMode = (val: any) => {
		this.setState(val);
	};

	public render() {
		const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
		const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
		if (!userDetails || !customerCookie) {
			return this.navigateToLogin();
		}
		let returnFlow = true;
		return (
			<React.Fragment>
				<Route
					path={`${RETURNS}${RETURN_LANDING}`}
					render={() => (
						<ReturnReasonAndModes
							{...this.state}
							{...this.props}
							onChange={(val: any) => this.onChangeReasonAndMode(val)}
							returnProductDetails={this.props.returnProductDetails}
							returnFlow={returnFlow}
							onCancel={() => this.onCancel()}
							clearForm={() => this.clearForm()}
							history={this.props.history}
							updateStateForBankDetails={(data: any) => this.updateStateForBankDetails(data)}
							bankDetail={this.state.bankDetail}
							onChangeBankingDetail={(val: any) => this.onChangeBankingDetail(val)}
							onContinue={(BankDetails: any) => this.handleContinueForBankForm(BankDetails)}
						/>
					)}
				/>
				<Route
					path={`${RETURNS}${RETURN_TO_STORE}`}
					render={() => <ReturnToStoreContainer {...this.state} {...this.props} returnFlow={returnFlow} />}
				/>
				<Route
					path={`${RETURNS}${RETURN_CLIQ_PIQ}`}
					render={() => <ReturnCliqAndPiqContainer {...this.state} {...this.props} returnFlow={returnFlow} />}
				/>
				<Route
					exact
					path={`${RETURNS}${RETURNS_SELF_COURIER}`}
					render={() => <SelfCourierContainer {...this.state} {...this.props} returnFlow={returnFlow} />}
				/>
				{/* end of need to call return bia store pick up  routes */}
			</React.Fragment>
		);
	}
}
