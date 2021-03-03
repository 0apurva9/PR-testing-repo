import * as React from "react";
import * as Cookie from "../../lib/Cookie";
import { Redirect } from "react-router-dom";
import Loader from "../../general/components/Loader";
import { LOGGED_IN_USER_DETAILS, CUSTOMER_ACCESS_TOKEN, LOGIN_PATH } from "../../lib/constants";
import {
    IProps,
    ICancelProductDetailsObj,
    ICancelItem,
    IState,
    ICancelReasonWithLabel,
    cancelProductDetailsObj,
    orderDetailsObj,
} from "./interface/cancelOrderForDesktop";
import ReturnAndOrderCancelWrapper from "../../return/components/ReturnAndOrderCancelWrapper";
import CancelAndContinueButton from "../../account/components/CancelAndContinueButton";
import SelectBoxMobile2 from "../../general/components/SelectBoxMobile2";
import TextArea from "../../general/components/TextArea";
import styles from "./cancelOrderForDesktop.css";
const SELECT_REASON_MESSAGE = "Select the Reason";
export default class cancelOrderForDesktop extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            cancelReasonCode: "",
            reason: "",
            comment: "",
            placeholder: "Add comments (optional)",
        };
    }

    public componentDidMount() {
        const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
        const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
        const cancelProductDetails: ICancelProductDetailsObj = {
            transactionId: this.props.history.location.state.transactionId,
            orderCode: this.props.match.params[0],
            USSID: this.props.history.location.state.ussid,
            returnCancelFlag: "C",
        };
        if (userDetails && customerCookie) {
            this.props.getDetailsOfCancelledProduct(cancelProductDetails);
            if (this.props.getUserAddress) {
                this.props.getUserAddress();
            }
        }
    }

    public onChangePrimary(val: ICancelReasonWithLabel) {
        const code = val.value;
        const label = val.label;
        this.setState({ cancelReasonCode: code, reason: label });
    }

    public handleChange(val: string) {
        this.setState({ comment: val });
    }

    public navigateToLogin() {
        return <Redirect to={LOGIN_PATH} />;
    }

    public renderLoader() {
        return <Loader />;
    }

    public onClickImage(productCode: string) {
        if (productCode) {
            this.props.history.push(`/p-${productCode.toLowerCase()}`);
        }
    }

    public onCancel() {
        this.props.history.goBack();
    }

    public onContinue() {
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
                reasonLabel: this.state.reason,
            };
            const orderDetailsObject: orderDetailsObj = {
                cancelProductDetails: cancelProductDetailsObj,
                productDetails:
                    this.props.cancelProductDetails &&
                    this.props.cancelProductDetails.orderProductWsDTO &&
                    this.props.cancelProductDetails.orderProductWsDTO[0],
            };
            if (this.props.showCancelOrderModal) {
                this.props.showCancelOrderModal(orderDetailsObject);
            }
        }
    }

    public renderCancel() {
        return (
            <div className={styles.selectReasonHolder}>
                <div className={styles.header}>Please select reason for your cancel</div>
                <div className={styles.select}>
                    <SelectBoxMobile2
                        placeholder={"Select a reason"}
                        options={
                            this.props.cancelProductDetails &&
                            this.props.cancelProductDetails.returnReasonDetailsWsDTO.map((val: ICancelItem) => {
                                return {
                                    value: val.code,
                                    label: val.reasonDescription,
                                };
                            })
                        }
                        onChange={(val: ICancelReasonWithLabel) => this.onChangePrimary(val)}
                    />
                </div>

                <div className={styles.textArea}>
                    <TextArea
                        onChange={(textValue: string) => this.handleChange(textValue)}
                        value={this.state.comment}
                        placeholder={this.state.placeholder}
                    />
                </div>
                <div className={styles.CancelAndContinueButton}>
                    <CancelAndContinueButton
                        handleCancel={() => this.onCancel()}
                        handleContinue={() => this.onContinue()}
                        disabled={this.state.reason ? false : true}
                    />
                </div>
            </div>
        );
    }

    public render() {
        const cancelProductDetails = this.props.cancelProductDetails;
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
        const returnFlow = false;
        return (
            <ReturnAndOrderCancelWrapper
                userAddress={this.props.userAddress}
                returnProductDetails={cancelProductDetails}
                orderPlace={this.props.history.location.state.orderDate}
                orderId={this.props.history.location.state.orderId}
                userDetails={userDetails}
                history={this.props.history}
                orderDetails={""}
                returnFlow={returnFlow}
            >
                {this.renderCancel()}
            </ReturnAndOrderCancelWrapper>
        );
    }
}
