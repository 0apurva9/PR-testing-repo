import React from "react";
import OrderCard from "./OrderCard";
import SelectBoxMobile2 from "../../general/components/SelectBoxMobile2";
import * as Cookie from "../../lib/Cookie";
import TextArea from "../../general/components/TextArea";
import CancelAndContinueButton from "./CancelAndContinueButton";
import styles from "./CancelReasonForm.css";
import PropTypes from "prop-types";
import { COMMENTS_PLACEHOLDER } from "../../lib/constants";
import {
  LOGGED_IN_USER_DETAILS,
  CUSTOMER_ACCESS_TOKEN,
  LOGIN_PATH
} from "../../lib/constants";
import ReturnAndOrderCancelWrapper from "../../return/components/ReturnAndOrderCancelWrapper";
export default class CancelReturnReasonForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySecondary: false,
      secondaryReasons: null,
      comment: null,
      reason: "Select a reason",
      placeholder: "Add comments (optional)"
    };
  }
  onClickImage(productCode) {
    if (this.props.onClickImage) {
      this.props.onClickImage(productCode);
    }
  }
  handleContinue() {
    if (this.props.onContinue) {
      this.props.onContinue(this.state);
    }
  }
  handleCancel() {
    this.props.history.goBack();
  }
  onChangePrimary(val) {
    const code = val.value;
    const label = val.label;

    this.setState({ cancelReasonCode: code, reason: label });
  }
  handleChange(val) {
    this.setState({ comment: val });
  }

  renderCancel() {
    const data = this.props.returnReasons;
    return (
      <div className={styles.base}>
        <div className={styles.selectReasonHolder}>
          <div className={styles.header}>Please select cancel reason</div>
          <div className={styles.select}>
            <SelectBoxMobile2
              placeholder={"Select a reason"}
              options={
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

          <div className={styles.textArea}>
            <TextArea
              onChange={val => this.handleChange(val)}
              value={this.state.comment}
              placeholder={this.state.placeholder}
            />
          </div>
          <div className={styles.CancelAndContinueButton}>
            <CancelAndContinueButton
              handleCancel={() => this.handleCancel()}
              handleContinue={() => this.handleContinue()}
              disabled={this.state.cancelReasonCode ? false : true}
            />
          </div>
        </div>
      </div>
    );
  }
  render() {
    const data = this.props.returnReasons;
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    if (this.props.error) {
      this.props.history.goBack();
    }
    if (this.props.loadingForCancelProductDetails) {
      return this.renderLoader();
    }
    if (!userDetails || !customerCookie) {
      return this.navigateToLogin();
    }
    let returnFlow = false;
    return (
      <ReturnAndOrderCancelWrapper
        userAddress={this.props.userAddress}
        returnProductDetails={data}
        // orderPlace={this.props.history.location.state.orderDate}
        // orderId={this.props.history.location.state.orderId}
        userDetails={userDetails}
        history={this.props.history}
        orderDetails={""}
        returnFlow={returnFlow}
      >
        {this.renderCancel()}
      </ReturnAndOrderCancelWrapper>
      // <div className={styles.base}>
      // 	<div className={styles.returnReasonDetail}>
      // 		<div className={styles.header}>Please select return reason</div>
      // 		<div className={styles.orderCardWrapper}>
      // 			<OrderCard
      // 				imageUrl={
      // 					data &&
      // 					data.orderProductWsDTO &&
      // 					data.orderProductWsDTO[0] &&
      // 					data.orderProductWsDTO[0].imageURL
      // 				}
      // 				imageHolderWidth="47px"
      // 				productName={`${data.orderProductWsDTO[0].productName}`}
      // 				onClick={() =>
      // 					this.onClickImage(
      // 						data.orderProductWsDTO &&
      // 							data.orderProductWsDTO[0] &&
      // 							data.orderProductWsDTO[0].productcode
      // 					)
      // 				}
      // 				price={false}
      // 				quantity={false}
      // 				isSelect={false}
      // 			>
      // 				{data.orderProductWsDTO[0].productSize && (
      // 					<span className={styles.productSizeColor}>
      // 						{data.orderProductWsDTO[0].productSize} |&nbsp;
      // 					</span>
      // 				)}
      // 				{data.orderProductWsDTO[0].productColour && (
      // 					<span className={styles.productSizeColor}>
      // 						{data.orderProductWsDTO[0].productColour}
      // 					</span>
      // 				)}
      // 			</OrderCard>
      // 		</div>

      // 		<div className={styles.content}>
      // 			<div className={styles.selectReasonWithText}>
      // 				<div className={styles.header}>Please select cancel reason</div>
      // 				<div className={styles.select}>
      // 					<SelectBoxMobile2
      // 						placeholder={'Select a reason'}
      // 						options={
      // 							data &&
      // 							data.returnReasonMap &&
      // 							data.returnReasonMap.map((val, i) => {
      // 								return {
      // 									value: val.parentReasonCode,
      // 									label: val.parentReturnReason,
      // 								};
      // 							})
      // 						}
      // 						onChange={val => this.onChangePrimary(val)}
      // 					/>
      // 				</div>
      // 				<div className={styles.textArea}>
      // 					<TextArea
      // 						value={this.state.comment}
      // 						onChange={val => this.handleChange(val)}
      // 						placeholder={COMMENTS_PLACEHOLDER}
      // 					/>
      // 				</div>
      // 				<div className={styles.buttonHolder}>
      // 					<CancelAndContinueButton
      // 						handleCancel={() => this.handleCancel()}
      // 						handleContinue={() => this.handleContinue()}
      // 						disabled={this.state.reason ? false : true}
      // 					/>
      // 				</div>
      // 			</div>
      // 		</div>
      // 	</div>
      // </div>
    );
  }
}
CancelReturnReasonForm.propTypes = {
  onContinue: PropTypes.func,
  onCancel: PropTypes.func,
  cancelProductDetails: PropTypes.object
};
