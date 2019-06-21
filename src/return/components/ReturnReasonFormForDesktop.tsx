import * as React from 'react';
import SelectBoxMobile2 from '../../general/components/SelectBoxMobile2';
import TextArea from '../../general/components/TextArea';
import CancelAndContinueButton from '../../account/components/CancelAndContinueButton.js';
import ReverseSealYesNo from '../../account/components/ReverseSealYesNo';
import DummyTab from '../../cart/components/DummyTab.js';
import * as styles from './ReturnReasonFormForDesktop.css';
//import cancel from '../../general/components/img/canceltransperent.png';
import {
	IProps,
	IPReturnCommentsObj,
	IState,
	IReturnReasonMapItem,
	IReturnSubReasons,
	IReturnSubReasonWithLabel,
} from './interface/ReturnReasonForm';
import { MODE_OF_RETURN, REFUND_DETAILS, COMMENTS_PLACEHOLDER } from '../../lib/constants.js';
export default class ReturnReasonForm extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {
			displaySecondary: false,
			secondaryReasons: [],
			comment: '',
			reverseSeal: '',
			returnReasonCode: '',
			subReasonCode: '',
			isEnable: false,
			reason: '',
			subReason: '',
			// uploadedImageFiles: '',
			// validImgFiles: '',
			// isElectronicsProduct: false,
		};
	}
	handleContinue() {
		if (this.props.onContinue) {
			let reasonAndCommentObj: IPReturnCommentsObj = Object.assign({
				returnReasonCode: this.state.returnReasonCode,
				subReasonCode: this.state.subReasonCode,
				subReason: this.state.subReason,
				comment: this.state.comment,
				reason: this.state.reason,
				reverseSeal: this.state.reverseSeal,
				sellerorderno: this.props.returnProductDetails.orderProductWsDTO[0].sellerorderno,
				transactionId: this.props.returnProductDetails.orderProductWsDTO[0].transactionId,
				// validImgFiles: this.state.validImgFiles,
				// isElectronicsProduct: this.state.isElectronicsProduct,
			});
			this.props.onContinue(reasonAndCommentObj);
		}
	}

	onChangePrimary(val: IReturnSubReasonWithLabel) {
		const code = val.value;
		const label = val.label;
		const returnProductDetails = this.props.returnProductDetails;
		//this.setState({ primaryReason: label });
		const selectedReason = returnProductDetails.returnReasonMap.find((val: IReturnReasonMapItem) => {
			return val.parentReasonCode === code;
		});

		let selectedSubReasonList =
			selectedReason.subReasons &&
			selectedReason.subReasons.map((value: IReturnSubReasons) => {
				return {
					value: value.subReasonCode,
					label: value.subReturnReason,
				};
			});

		this.setState({
			subReasonCode: '',
			subReason: '',
			returnReasonCode: code,
			reason: label,
			isEnable: false,
			secondaryReasons: selectedSubReasonList,
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
	// handleFileUpload(e) {
	// 	let uploadedFilesArr = Array.from(e.target.files);
	// 	if (uploadedFilesArr.length > 8) {
	// 		return this.props.displayToast('Upload maximum 8 images');
	// 	}
	// 	let imgArray = [];
	// 	let validImageFiles = [];
	// 	uploadedFilesArr.map((value, index) => {
	// 		if (!value.type.includes('image')) {
	// 			return this.props.displayToast('Upload file in image file format only');
	// 		}
	// 		if (!value.type.includes('jpeg')) {
	// 			if (!value.type.includes('png')) {
	// 				return this.props.displayToast('Upload image in JPEG/PNG format only');
	// 			}
	// 		}
	// 		if (value.size > 2500000) {
	// 			return this.props.displayToast('The Image size should be lesser than 2.5MB');
	// 		}
	// 		let eachImgSrc = URL.createObjectURL(value);
	// 		imgArray.push(eachImgSrc);
	// 		validImageFiles.push(value);
	// 	});
	// 	this.setState({ uploadedImageFiles: imgArray });
	// 	this.setState({ validImgFiles: validImageFiles });
	// }
	// removeFile(filename, indexOfRemovedFile) {
	// 	let fileNames = this.state.uploadedImageFiles;
	// 	let index = fileNames.indexOf(filename);
	// 	if (index > -1) {
	// 		fileNames.splice(index, 1);
	// 		this.setState({ uploadedImageFiles: fileNames });
	// 	}
	// 	let updatedValidImgFiles = this.state.validImgFiles;
	// 	if (indexOfRemovedFile > -1) {
	// 		updatedValidImgFiles.splice(indexOfRemovedFile, 1);
	// 		this.setState({ validImgFiles: updatedValidImgFiles });
	// 	}
	// }
	render() {
		const returnProductDetails = this.props.returnProductDetails;
		//let imageCallOut = returnProductDetails && returnProductDetails.attachmentImageCallout;
		//let imageCallOutArr = imageCallOut && imageCallOut.split('|');
		//console.log('primary Reason:', this.state.reason, this.state.returnReasonCode);
		return (
			<div className={styles.base}>
				<div className={styles.content}>
					<div className={styles.selectReasonWithText}>
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
								placeholder={this.props.returnFlow ? 'Select issue' : 'Select a reason'}
								options={
									returnProductDetails &&
									returnProductDetails.returnReasonMap &&
									returnProductDetails.returnReasonMap.map((val: IReturnReasonMapItem, i: number) => {
										return {
											value: val.parentReasonCode,
											label: val.parentReturnReason,
										};
									})
								}
								onChange={(val: IReturnSubReasonWithLabel) => this.onChangePrimary(val)}
							/>
						</div>
						{this.state.secondaryReasons &&
							this.state.secondaryReasons.length > 0 && (
								<div className={styles.select}>
									<SelectBoxMobile2
										placeholder={'Select a reason'}
										options={this.state.secondaryReasons}
										onChange={(val: IReturnSubReasonWithLabel) => this.onChangeSecondary(val)}
										isEnable={this.state.isEnable}
									/>
								</div>
							)}
						<div className={styles.textArea}>
							<TextArea
								placeholder={COMMENTS_PLACEHOLDER}
								value={this.state.comment}
								onChange={(val: string) => this.handleChange(val)}
							/>
						</div>
						{returnProductDetails &&
							returnProductDetails.showReverseSealFrJwlry === 'yes' && (
								<div className={styles.reverseSealHolder}>
									<ReverseSealYesNo
										selectReverseSeal={(val: string) => this.selectReverseSeal(val)}
									/>
								</div>
							)}

						<div className={styles.buttonHolder}>
							<CancelAndContinueButton
								handleCancel={() => this.handleCancel()}
								handleContinue={() => this.handleContinue()}
								disabled={this.state.reason ? false : true}
							/>
						</div>
					</div>
				</div>

				{this.props.returnFlow ? '' : <DummyTab title={MODE_OF_RETURN} number={2} />}
				{this.props.returnFlow ? '' : <DummyTab title={REFUND_DETAILS} number={3} />}
			</div>
		);
	}
}
