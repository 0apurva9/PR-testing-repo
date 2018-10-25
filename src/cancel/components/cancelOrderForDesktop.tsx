import * as React from "react";
import * as Cookie from "../../lib/Cookie";
import { Redirect } from "react-router-dom";
import Loader from "../../general/components/Loader";
import {
  LOGGED_IN_USER_DETAILS,
  CUSTOMER_ACCESS_TOKEN,
  LOGIN_PATH
} from "../../lib/constants";
import {
  IProps,
  ICancelProductDetailsObj,
  ICancelItem,
  IState,
  ICancelReasonWithLabel,
  cancelProductDetailsObj,
  orderDetailsObj
} from "./interface/cancelOrderForDesktop";
import ReturnAndOrderCancelWrapper from "../../return/components/ReturnAndOrderCancelWrapper";
import CancelAndContinueButton from "../../account/components/CancelAndContinueButton";
import SelectBoxMobile2 from "../../general/components/SelectBoxMobile2";
import TextArea from "../../general/components/TextArea";
import * as styles from "./cancelOrderForDesktop.css";
const SELECT_REASON_MESSAGE = "Select the Reason";
export default class cancelOrderForDesktop extends React.Component<
  IProps,
  IState
> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      cancelReasonCode: "",
      reason: "",
      comment: ""
    };
  }
  componentDidMount() {
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    const cancelProductDetails: ICancelProductDetailsObj = {
      transactionId: this.props.history.location.state.transactionId,
      orderCode: this.props.match.params[0],
      USSID: this.props.history.location.state.ussid,
      returnCancelFlag: "C"
    };
    if (userDetails && customerCookie) {
      this.props.getDetailsOfCancelledProduct(cancelProductDetails);
      if (this.props.getUserAddress) {
        this.props.getUserAddress();
      }
    }
  }
  onChangePrimary(val: ICancelReasonWithLabel) {
    const code = val.value;
    const label = val.label;
    this.setState({ cancelReasonCode: code, reason: label });
  }
  handleChange(val: string) {
    this.setState({ comment: val });
  }
  navigateToLogin() {
    return <Redirect to={LOGIN_PATH} />;
  }
  renderLoader() {
    return <Loader />;
  }
  onClickImage(productCode: string) {
    if (productCode) {
      this.props.history.push(`/p-${productCode.toLowerCase()}`);
    }
  }
  onCancel() {
    this.props.history.goBack();
  }
  onContinue() {
    if (!this.state.reason) {
      this.props.displayToast(SELECT_REASON_MESSAGE);
    } else {
      const cancelProductDetailsObj: cancelProductDetailsObj = {
        transactionId: this.props.history.location.state.transactionId,
        orderCode: this.props.match.params[0],
        USSID: this.props.history.location.state.ussid,
        ticketTypeCode: "C",
        reasonCode: this.state.cancelReasonCode,
        refundType: "",
        reasonLabel: this.state.reason
      };
      const orderDetailsObject: orderDetailsObj = {
        cancelProductDetails: cancelProductDetailsObj,
        productDetails:
          this.props.cancelProductDetails &&
          this.props.cancelProductDetails.orderProductWsDTO &&
          this.props.cancelProductDetails.orderProductWsDTO[0]
      };
      if (this.props.showCancelOrderModal) {
        this.props.showCancelOrderModal(orderDetailsObject);
      }
    }
  }
  renderCancel() {
    return (
      <div className={styles.selectReasonHolder}>
        <div className={styles.header}>
          <div className={styles.circleHolder}>
            <div className={styles.circle}>1</div>
          </div>
          Select reason for your cancel
        </div>
        <div className={styles.select}>
          <SelectBoxMobile2
            placeholder={"Select a reason"}
            options={
              this.props.cancelProductDetails &&
              this.props.cancelProductDetails.returnReasonDetailsWsDTO.map(
                (val: ICancelItem, i: number) => {
                  return {
                    value: val.code,
                    label: val.reasonDescription
                  };
                }
              )
            }
            onChange={(val: ICancelReasonWithLabel) =>
              this.onChangePrimary(val)
            }
          />
        </div>

        <div className={styles.textArea}>
          <TextArea
            onChange={(textValue: string) => this.handleChange(textValue)}
            value={this.state.comment}
          />
        </div>
        <div className={styles.CancelAndContinueButton}>
          <CancelAndContinueButton
            handleCancel={() => this.onCancel()}
            handleContinue={() => this.onContinue()}
          />
        </div>
      </div>
    );
  }

  public render() {
    let cancelProductDetails = this.props.cancelProductDetails;
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
    return (
      <ReturnAndOrderCancelWrapper
        userAddress={this.props.userAddress}
        returnProductDetails={cancelProductDetails}
        orderPlace={this.props.history.location.state.orderDate}
        orderId={this.props.history.location.state.orderId}
        userDetails={userDetails}
        history={this.props.history}
        orderDetails={""}
      >
        {this.renderCancel()}
      </ReturnAndOrderCancelWrapper>
    );
  }
}
