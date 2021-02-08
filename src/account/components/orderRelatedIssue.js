import React from "react";
import styles from "./OrderRelatedIssue.css";
import FloatingLabelInputWithPlace from "../../general/components/FloatingLabelInputWithPlace";
import Button from "../../general/components/Button.js";
import DesktopOnly from "../../general/components/DesktopOnly";
import * as Cookie from "../../lib/Cookie";
import CustomerIssue from "./CustomerIssue.js";
import MoreHelps from "./MoreHelps";
import {
    SUCCESS,
    LOGGED_IN_USER_DETAILS,
    CUSTOMER_ACCESS_TOKEN,
    LOGIN_PATH,
    COSTUMER_CLIQ_CARE_ROUTE,
    MY_ACCOUNT_PAGE,
    HOME_ROUTER,
    CLIQ_CARE,
} from "../../lib/constants";
import {
    setDataLayerForCLiQCarePage,
    ADOBE_SELF_SERVE_OTHER_ISSUES_CLICK,
    ADOBE_SELF_SERVE_ALL_HELP_TOPIC_CLICK,
    ADOBE_SELF_SERVE_PAGE_LOAD,
    ADOBE_SELF_SERVE_ISSUE_SELECTION,
    ADOBE_SELF_SERVE_FEEDBACK_SELECTION,
    ADOBE_SELF_SERVE_CONTINUE_BUTTON_CLICK,
    ADOBE_SELF_SERVE_NON_ORDER_CATEGORY_CLICK,
    ADOBE_SELF_SERVE_SUBMIT_CLICK,
    ADOBE_SELF_SERVE_NON_ORDER_PAGE_LOAD,
    ADOBE_SELF_SERVE_NON_ORDER_QUESTION_CLICK,
    ADOBE_LOGIN_START,
    ADOBE_SELF_SERVE_FAQ_PAGE_LOAD,
} from "../../lib/adobeUtils";
import { MOBILE_PATTERN } from "../../auth/components/Login";
import SSRquest from "../../general/components/SSRequest";
import OrderHistoryList from "./OrderHistoryList";
import Icon from "../../xelpmoc-core/Icon";
import moment from "moment";
import ProductImage from "../../general/components/ProductImage";
const ORDER_REALTED_QUESTION = "orderRelated";
const NON_ORDER_REALTED_QUESTION = "NonOrderRelated";
const FAQ_PAGE = "ss-faq";
const YES = "Yes";
const NO = "No";
const STATUS_DATE_FORMAT = "DD MMM, YYYY";
const CLIQ_2_CALL_CONFIG = "cliq2call-config-file-v1";
export default class OrderRelatedIssue extends React.Component {
    constructor(props) {
        super(props);
        this.userDetailsCookie = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
        this.customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
        const getUserDetails = this.userDetailsCookie ? JSON.parse(this.userDetailsCookie) : {};
        const selectedOrderObj =
            this.props.location && this.props.location.state && this.props.location.state.selectedOrderObj;
        this.state = {
            isIssueOptions: false,
            isQuesryForm: false,
            questionList: [],
            orderList: true,
            isOrderDatails: false,
            isAnswerHelpFull: false,
            orderRelatedQuestion: false,
            otherQuestion: false,
            FAQquestion: false,
            selectedOrder: null,
            uploadedAttachments: null,
            orderAllList: false,
            parentIssueType: null,
            questionType: "",
            loaderResponse: true,
            isUserLogin: false,
            showQuestionList: false,
            showFeedBack: false,
            question: null,
            selectedOrderObj: selectedOrderObj,
            showLoader: false,
            raiseTiketRequest: false,
            raiseTiketSucess: false,
            slectOrderData: null,
            formSubmit: false,
            isCallMeBackForm: false,
            isScheduleACall: false,
            callMeBackJourney: false,
            copyMobileNumber:
                getUserDetails && getUserDetails.loginType === "mobile" && getUserDetails.userName
                    ? getUserDetails.userName
                    : "",
            mobile:
                getUserDetails && getUserDetails.loginType === "mobile" && getUserDetails.userName
                    ? getUserDetails.userName
                    : "",
            name:
                getUserDetails && (getUserDetails.firstName || getUserDetails.lastName)
                    ? `${getUserDetails.firstName.trim()} ${getUserDetails.lastName.trim()}`
                    : "",
            chooseLanguage: "English",
            timing: "",
            selectedDate: "",
            cliq2CallConfigData: "",
            shift: "",
            selectedSlot: "",
            isRecentOrderHistory: false,
            filterCard: false,
            filterTypeData: "All Tickets",
            isRecentOrderDetails: false,
            selectedTickerHistory: "",
            isShowRecentOrderCard: true,
            recentTicketClicked: false,
        };
        this.resetState = this.state;
    }

    componentDidMount() {
        setDataLayerForCLiQCarePage(ADOBE_SELF_SERVE_PAGE_LOAD, null, [CLIQ_CARE, "Care_Homepage"]);
        if (this.props.getOrdersTransactionData) {
            this.props.getOrdersTransactionData(false);
        }
        if (this.props.getNonOrderRelatedQuestions) {
            setDataLayerForCLiQCarePage(ADOBE_SELF_SERVE_OTHER_ISSUES_CLICK);
            this.props.getNonOrderRelatedQuestions();
        }

        if (this.props.getRecentTicketHistoryDetails) {
            this.props.getRecentTicketHistoryDetails();
        }

        if (this.props.getUserDetails) {
            this.props.getUserDetails();
        }
        if (this.props.getAllOthersHelp) {
            this.props.getAllOthersHelp(FAQ_PAGE);
        }
        if (this.props.currentState) {
            this.setState({ ...this.props.currentState });
        }

        if (this.state.selectedOrderObj) {
            this.orderRelatedInfo(this.state.selectedOrderObj);
        }
        if (this.props.userDetails) {
            this.setState({
                name:
                    this.props.userDetails.firstName || this.props.userDetails.lastName
                        ? `${this.props.userDetails.firstName} ${this.props.userDetails.lastName}`
                        : "",
                mobile: this.props.userDetails.mobileNumber ? this.props.userDetails.mobileNumber : "",
                copyMobileNumber: this.props.userDetails.mobileNumber ? this.props.userDetails.mobileNumber : "",
            });
        }
    }

    componentDidUpdate() {
        if (this.state.callMeBackJourney && !this.state.isCallMeBackForm) {
            window.scrollTo(0, 0);
        }
    }

    componentWillUnmount() {
        this.props.clearOrderTransactionDetails();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.logoutUserStatus !== this.props.logoutUserStatus) {
            if (nextProps.logoutUserStatus == "success") {
                this.setState(this.resetState);
            }
        }
        if (nextProps && nextProps.userDetails !== this.props.userDetails) {
            this.setState({
                name:
                    nextProps.userDetails.firstName || nextProps.userDetails.lastName
                        ? `${nextProps.userDetails.firstName} ${nextProps.userDetails.lastName}`
                        : "",
                mobile: nextProps.userDetails.mobileNumber ? nextProps.userDetails.mobileNumber : "",
                copyMobileNumber: nextProps.userDetails.mobileNumber ? nextProps.userDetails.mobileNumber : "",
            });
        }
    }

    moreHelps() {
        setDataLayerForCLiQCarePage(ADOBE_SELF_SERVE_FEEDBACK_SELECTION, NO.toLowerCase());
        if (this.state.orderRelatedQuestion) {
            setDataLayerForCLiQCarePage(ADOBE_SELF_SERVE_PAGE_LOAD, this.getOrderData(), "Care_Order_MoreHelp");
        }
        if (this.state.otherQuestion) {
            setDataLayerForCLiQCarePage(
                ADOBE_SELF_SERVE_NON_ORDER_PAGE_LOAD,
                this.getNonOrderData(),
                "Care_Other_MoreHelp"
            );
        }

        this.setState({ isIssueOptions: true, showFeedBack: false });
    }

    async getCustomerQueriesFields(issue, isSelecteRadio = false) {
        if (isSelecteRadio) {
            const response = await this.props.getCustomerQueriesFieldsv2(issue, isSelecteRadio);
            if (response.status == SUCCESS) {
                this.setState({
                    isIssueOptions: false,
                    isQuesryForm: true,
                    showFeedBack: false,
                    isCallMeBackForm: false,
                    callMeBackJourney: false,
                });
            }
        } else {
            const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
            const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
            if (userDetails || customerCookie) {
                if (this.props.getCustomerQueriesFieldsv2) {
                    const response = await this.props.getCustomerQueriesFieldsv2(
                        this.state.question.UItemplateCode,
                        isSelecteRadio
                    );
                    if (response.status == SUCCESS) {
                        this.setState({
                            isIssueOptions: false,
                            isQuesryForm: true,
                            showFeedBack: false,
                            isCallMeBackForm: false,
                            callMeBackJourney: false,
                        });
                    }
                }
            } else {
                this.props.setSelfServeState(this.state);
                this.navigateLogin();
            }
        }
    }

    feedBackHelpFull() {
        setDataLayerForCLiQCarePage(ADOBE_SELF_SERVE_FEEDBACK_SELECTION, YES.toLowerCase());
        this.setState({ isAnswerHelpFull: true });
    }

    async submitCustomerForms(formData) {
        this.setState({ raiseTiketRequest: true, showLoader: true });
        if (this.props.submitOrderDetails) {
            let getCustomerQueryDetailsObject = Object.assign(
                {},
                {
                    ticketID: null,
                    issue:
                        this.state.questionType == ORDER_REALTED_QUESTION
                            ? this.state.question.issueType
                            : this.state.question.subIssueType,
                    tat: this.state.question.tat,
                    emailId: formData.customerInfo.contactEmail,
                }
            );
            if ((this.state.questionType = NON_ORDER_REALTED_QUESTION)) {
                getCustomerQueryDetailsObject.issueCategory = this.state.parentIssueType;
            }
            setDataLayerForCLiQCarePage(ADOBE_SELF_SERVE_SUBMIT_CLICK);
            const submitOrderDetailsResponse = await this.props.submitOrderDetails(formData);
            setTimeout(() => {
                if (submitOrderDetailsResponse.status === SUCCESS) {
                    if (submitOrderDetailsResponse.submitOrder.referenceNum == "duplicate") {
                        let pageName = this.state.otherQuestion
                            ? "Care_Other_Webform_Duplicate"
                            : "Care_Order_Webform_Duplicate";
                        setDataLayerForCLiQCarePage(
                            ADOBE_SELF_SERVE_PAGE_LOAD,
                            submitOrderDetailsResponse.submitOrder.referenceNum,
                            [pageName, "TicketCreation"]
                        );
                        this.setState({
                            showLoader: false,
                            raiseTiketRequest: false,
                            formSubmit: true,
                        });
                        this.props.showCustomerQueryModal({
                            ticketId: submitOrderDetailsResponse.submitOrder.referenceNum,
                        });
                        this.props.setSelfServeState(null);
                    } else {
                        let pageName = this.state.otherQuestion
                            ? "Care_Other_Webform_Success"
                            : "Care_Order_Webform_Success";
                        setDataLayerForCLiQCarePage(
                            ADOBE_SELF_SERVE_PAGE_LOAD,
                            submitOrderDetailsResponse.submitOrder.referenceNum,
                            [pageName, "TicketCreation"]
                        );
                        this.setState({
                            raiseTiketSucess: true,
                            raiseTiketRequest: false,
                            formSubmit: true,
                        });
                        setTimeout(() => {
                            this.setState({ showLoader: false, raiseTiketSucess: false });
                            this.props.showCustomerQueryModal({
                                ticketId: submitOrderDetailsResponse.submitOrder.referenceNum,
                                sla: submitOrderDetailsResponse.submitOrder.sla,
                            });
                            this.props.setSelfServeState(null);
                        }, 2000);
                    }
                } else {
                    this.setState({ raiseTiketRequest: false, showLoader: false });
                }
            }, 2000);

            // }
        }
    }

    getNonOrderData = () => {
        return {
            name: this.state.parentIssueType,
            question: this.state.question.subIssueType,
        };
    };

    selectOtehrQuestion(selectOtehrQuestion) {
        setDataLayerForCLiQCarePage(ADOBE_SELF_SERVE_NON_ORDER_CATEGORY_CLICK, selectOtehrQuestion.parentIssueType);
        setDataLayerForCLiQCarePage(
            ADOBE_SELF_SERVE_NON_ORDER_PAGE_LOAD,
            {
                name: selectOtehrQuestion.parentIssueType,
            },
            "Care_Other_Questions"
        );
        this.setState({
            isOrderDatails: true,
            orderList: false,
            orderRelatedQuestion: false,
            otherQuestion: true,
            FAQquestion: false,
            showQuestionList: true,
            questionList: selectOtehrQuestion.listofSubIssues,
            parentIssueType: selectOtehrQuestion.parentIssueType,
            questionType: NON_ORDER_REALTED_QUESTION,
            callMeBackJourney: false,
            isShowRecentOrderCard: false,
        });
    }

    async orderRelatedInfo(orderData) {
        if (this.props.fetchOrderItemDetails) {
            this.props.fetchOrderItemDetails(orderData.orderCode, orderData.transactionId);
        }
        if (this.props.getOrderRelatedQuestions) {
            const response = await this.props.getOrderRelatedQuestions(orderData.transactionId);

            setDataLayerForCLiQCarePage(
                ADOBE_SELF_SERVE_PAGE_LOAD,
                {
                    order: {
                        status: orderData && orderData.product && orderData.product.statusDisplay,
                        id: orderData && orderData.product && orderData.product.transactionId,
                        productId: orderData && orderData.product && orderData.product.productcode,
                    },
                    issue: {
                        status:
                            response && response.orderRelatedQuestions && response.orderRelatedQuestions.listOfIssues
                                ? "Found"
                                : "Not Found",
                    },
                },
                "Care_Order_Questions"
            );

            if (response.status == SUCCESS && response.orderRelatedQuestions) {
                this.setState({
                    orderAllList: false,
                    isOrderDatails: true,
                    orderList: false,
                    orderRelatedQuestion: true,
                    otherQuestion: false,
                    FAQquestion: false,
                    showQuestionList: true,
                    questionList: response.orderRelatedQuestions.listOfIssues,
                    parentIssueType: null,
                    questionType: ORDER_REALTED_QUESTION,
                    slectOrderData: orderData.product,
                    isShowRecentOrderCard: false,
                });
            }
        }
    }

    getOrderRelatedQuestions(orderData, product) {
        const selectedOrder = {
            transactionId: product.transactionId,
            orderCode: orderData.orderId,
            product: product,
        };
        this.orderRelatedInfo(selectedOrder);
    }

    async handleFAQClick(faq) {
        setDataLayerForCLiQCarePage(ADOBE_SELF_SERVE_ALL_HELP_TOPIC_CLICK, faq.FAQHeader);

        setDataLayerForCLiQCarePage(ADOBE_SELF_SERVE_FAQ_PAGE_LOAD, null, [CLIQ_CARE, "Care_FAQ_Questions"]);

        if (this.state.parentIssueType !== faq.FAQHeader) {
            if (this.props.getFaqRelatedQuestions) {
                const response = await this.props.getFaqRelatedQuestions(faq.FAQPageId);
                if (response.status === SUCCESS) {
                    if (response.data && Array.isArray(response.data.items) && response.data.items.length) {
                        const questionList = response.data.items[0].cmsTextComponent
                            ? JSON.parse(response.data.items[0].cmsTextComponent.content)
                            : JSON.parse(response.data.items[1].cmsTextComponent.content);
                        this.setState({
                            isOrderDatails: true,
                            isRecentOrderHistory: false,
                            orderAllList: false,
                            orderList: false,
                            orderRelatedQuestion: false,
                            otherQuestion: false,
                            FAQquestion: true,
                            showQuestionList: true,
                            questionList: questionList,
                            parentIssueType: faq.FAQHeader,
                            questionType: NON_ORDER_REALTED_QUESTION,
                            showFeedBack: false,
                            isQuesryForm: false,
                            callMeBackJourney: false,
                            isShowRecentOrderCard: false,
                        });
                    }
                }
            }
        }
    }

    getOrderData = () => {
        return {
            status: this.state.slectOrderData.statusDisplay,
            id: this.state.slectOrderData.transactionId,
            productId: this.state.slectOrderData.productcode,
        };
    };

    selectQuestion(question) {
        if (this.state.orderRelatedQuestion) {
            setDataLayerForCLiQCarePage(ADOBE_SELF_SERVE_ISSUE_SELECTION, question.issueType);

            setDataLayerForCLiQCarePage(
                ADOBE_SELF_SERVE_PAGE_LOAD,
                {
                    order: this.getOrderData(),
                    issue: {
                        title: question.issueType,
                    },
                },
                "Care_Order_Solution"
            );
        }
        if (this.state.otherQuestion) {
            setDataLayerForCLiQCarePage(ADOBE_SELF_SERVE_NON_ORDER_QUESTION_CLICK, question.subIssueType);
            setDataLayerForCLiQCarePage(
                ADOBE_SELF_SERVE_NON_ORDER_PAGE_LOAD,
                {
                    name: this.state.parentIssueType,
                    question: question.subIssueType,
                },
                "Care_Other_Solution"
            );
        }

        this.setState({
            question: question,
            showQuestionList: false,
            showFeedBack: true,
        });
    }

    showAllOrdersList() {
        this.setState({ orderAllList: true, isShowRecentOrderCard: false });
    }

    hideAllOrder() {
        setDataLayerForCLiQCarePage(ADOBE_SELF_SERVE_PAGE_LOAD, null, [CLIQ_CARE, "Care_Homepage"]);
        this.setState({ orderAllList: false, isShowRecentOrderCard: true });
    }

    navigateLogin() {
        const url = this.props.location.pathname;
        if (url === `${MY_ACCOUNT_PAGE}${COSTUMER_CLIQ_CARE_ROUTE}`) {
            if (this.props.setUrlToRedirectToAfterAuth) {
                this.props.setUrlToRedirectToAfterAuth(url);
            }
        }
        setDataLayerForCLiQCarePage(ADOBE_LOGIN_START);
        this.props.history.push(LOGIN_PATH);
    }

    getMoreOrder() {
        if (
            this.props.ordersTransactionData &&
            (this.props.ordersTransactionData.currentPage + 1) * this.props.ordersTransactionData.pageSize <
                this.props.ordersTransactionData.totalNoOfOrders
        ) {
            this.props.getOrdersTransactionData(true);
        }
    }

    sendInvoice(ussid, sellerOrderNo) {
        if (this.props.sendInvoice) {
            this.props.sendInvoice(ussid, sellerOrderNo);
        }
    }

    navigatePreviousPage() {
        if (this.state.showQuestionList) {
            setDataLayerForCLiQCarePage(ADOBE_SELF_SERVE_PAGE_LOAD, null, [CLIQ_CARE, "Care_Homepage"]);
            this.setState(this.resetState);
        } else if (this.state.showFeedBack) {
            if (this.state.orderRelatedQuestion) {
                setDataLayerForCLiQCarePage(
                    ADOBE_SELF_SERVE_PAGE_LOAD,
                    {
                        order: this.getOrderData(),
                    },
                    "Care_Order_Questions"
                );
            }

            if (this.state.otherQuestion) {
                setDataLayerForCLiQCarePage(
                    ADOBE_SELF_SERVE_NON_ORDER_PAGE_LOAD,
                    {
                        name: this.state.parentIssueType,
                    },
                    "Care_Other_Questions"
                );
            }

            this.setState({
                question: null,
                showQuestionList: true,
                showFeedBack: false,
                isAnswerHelpFull: false,
            });
        } else if (this.state.isQuesryForm) {
            if (this.state.orderRelatedQuestion) {
                setDataLayerForCLiQCarePage(ADOBE_SELF_SERVE_PAGE_LOAD, this.getOrderData(), "Care_Order_MoreHelp");
            }
            if (this.state.otherQuestion) {
                setDataLayerForCLiQCarePage(
                    ADOBE_SELF_SERVE_NON_ORDER_PAGE_LOAD,
                    this.getNonOrderData(),
                    "Care_Other_MoreHelp"
                );
            }
            this.setState({
                showQuestionList: false,
                isQuesryForm: false,
                isIssueOptions: true,
            });
        } else if (this.state.isIssueOptions) {
            if (this.state.orderRelatedQuestion) {
                setDataLayerForCLiQCarePage(
                    ADOBE_SELF_SERVE_PAGE_LOAD,
                    {
                        order: this.getOrderData(),
                        issue: {
                            title: this.state.question.issueType,
                        },
                    },
                    "Care_Order_Solution"
                );
            }
            if (this.state.otherQuestion) {
                setDataLayerForCLiQCarePage(
                    ADOBE_SELF_SERVE_NON_ORDER_PAGE_LOAD,
                    this.getNonOrderData(),
                    "Care_Other_Solution"
                );
            }
            this.setState({
                isAnswerHelpFull: false,
                isIssueOptions: false,
                showFeedBack: true,
            });
        } else if (this.state.isCallMeBackForm) {
            this.setState({
                isIssueOptions: true,
                isCallMeBackForm: false,
                mobile: this.state.copyMobileNumber,
                chooseLanguage: "English",
                timing: "",
                selectedDate: "",
                callMeBackJourney: false,
                selectedSlot: "",
            });
        } else if (this.state.isRecentOrderDetails) {
            if (this.state.recentTicketClicked) {
                this.setState({
                    isRecentOrderHistory: false,
                    recentTicketClicked: false,
                });
            }
            this.setState({ isRecentOrderDetails: false });
        } else if (this.state.isRecentOrderHistory) {
            this.setState({ isRecentOrderHistory: false });
        }
    }

    navigateHomePage() {
        setDataLayerForCLiQCarePage(ADOBE_SELF_SERVE_CONTINUE_BUTTON_CLICK);
        this.props.history.push(HOME_ROUTER);
    }

    updateThanks() {
        this.setState({ isAnswerHelpFull: false });
    }

    navigateCliqCarePage() {
        if (this.state.isRecentOrderHistory) {
            this.props.getRecentTicketHistoryDetails();
        }
        setDataLayerForCLiQCarePage(ADOBE_SELF_SERVE_PAGE_LOAD, null, [CLIQ_CARE, "Care_Homepage"]);
        this.setState(this.resetState);
    }

    async CLiQ2CallClick() {
        this.setState({ callMeBackJourney: true });
        if (!this.userDetailsCookie || !this.customerCookie) {
            this.props.setSelfServeState(this.state);
            this.navigateLogin();
        } else {
            if (this.props.getCliq2CallConfig) {
                const response = await this.props.getCliq2CallConfig(CLIQ_2_CALL_CONFIG);
                if (response.status === SUCCESS) {
                    const cliq2CallData = response.cliq2CallConfigData;
                    let currentTime = new Date().toLocaleTimeString("en-US", {
                        hour12: false,
                    });
                    let isUserWithinBusinessTime =
                        currentTime > cliq2CallData.businessStartTime && currentTime < cliq2CallData.businessEndTime
                            ? true
                            : false;
                    const buttonShowObject = {
                        businessEndTime: cliq2CallData.businessEndTime,
                        businessStartTime: cliq2CallData.businessStartTime,
                        callBackNowFlag: cliq2CallData.callBackNowFlag,
                        allowedRequestLimit: cliq2CallData.allowedRequestLimit,
                        scheduleCallFlag: cliq2CallData.scheduleCallFlag,
                        availableSlots: cliq2CallData.availableSlots,
                        slotDuration: cliq2CallData.slotDuration,
                        callMeBackClick: this.callMeBackCallClick,
                        scheduleACallClick: this.scheduleACallClick,
                    };
                    if (
                        !cliq2CallData.scheduleCallFlag &&
                        (!cliq2CallData.callBackNowFlag || !isUserWithinBusinessTime)
                    ) {
                        this.props.customerQueryErrorModal({
                            heading: "Sorry, no agents are available right now",
                            subHeading: "Please try again later or choose other help options",
                            showBtn: false,
                        });
                    } else {
                        this.props.showCliq2CallOption(buttonShowObject);
                    }
                    this.setState({
                        cliq2CallConfigData: cliq2CallData,
                        name:
                            this.props.userDetails.firstName || this.props.userDetails.lastName
                                ? `${this.props.userDetails.firstName} ${this.props.userDetails.lastName}`
                                : "",
                        mobile: this.props.userDetails.mobileNumber ? this.props.userDetails.mobileNumber : "",
                        copyMobileNumber: this.props.userDetails.mobileNumber
                            ? this.props.userDetails.mobileNumber
                            : "",
                    });
                }
            }
        }
    }

    callMeBackCallClick = () => {
        // window.scrollTo(0, 0);
        this.setState({
            isCallMeBackForm: true,
            isIssueOptions: false,
            isScheduleACall: false,
        });
    };

    scheduleACallClick = () => {
        // window.scrollTo(0, 0);
        this.setState({
            isCallMeBackForm: true,
            isScheduleACall: true,
            isIssueOptions: false,
        });
    };

    timeSlotPopUP = () => {
        const timeFunction = {
            setTimeSlot: this.setTimeSlot,
            cliq2CallConfigData: this.state.cliq2CallConfigData,
            callMeBackCallClick: this.callMeBackCallClick,
            selectedSlot: {
                date: this.state.selectedDate,
                slotTime: this.state.selectedSlot,
            },
        };
        if (this.props.timeSlotPopUP) {
            this.props.timeSlotPopUP(timeFunction);
        }
    };

    // ScheduleACallClick: this.ScheduleACallClick
    setTimeSlot = (time, date) => {
        this.setState({
            timing: time.label,
            selectedDate: date,
            selectedSlot: time,
        });
    };

    getEpochDateValue() {
        let date = new Date(),
            start = null,
            end = null;
        if (this.state.selectedSlot.shiftDay) {
            date.setDate(date.getDate() + 1);
        }
        start = Math.floor(date.setHours(parseInt(this.state.selectedSlot.from, 10), 0, 0) / 1000);
        end = Math.floor(date.setHours(parseInt(this.state.selectedSlot.to, 10), 0, 0) / 1000);
        return `${start}-${end}`;
    }

    async onCallRequestClick() {
        if (!MOBILE_PATTERN.test(this.state.mobile)) {
            this.props.displayToast("Please enter valid number");
            return false;
        }
        const callRequestObj = {
            Language: this.state.chooseLanguage ? this.state.chooseLanguage : "",
            MobileNo: this.state.mobile ? this.state.mobile : "",
            CallbackType: this.state.isScheduleACall ? "Later" : "Now",
            PreferredSlot: this.state.isScheduleACall ? this.getEpochDateValue() : "",
            CustomerId: "",
            CustomerName: this.state.name,
            IssueType: this.state.otherQuestion ? this.state.question.subIssueType : this.state.question.issueType,
            OrderId: this.state.orderRelatedQuestion ? this.props.selectedOrderDetails.orderId : "",
            TransactionId: this.state.orderRelatedQuestion ? this.state.slectOrderData.transactionId : "",
            RequestSource: "MPL-desktop",
        };

        const placeCustomerResponse = await this.props.placeCustomerCallRequest(callRequestObj);

        this.setState({ raiseTiketRequest: true, showLoader: true });
        setTimeout(() => {
            this.setState({ raiseTiketRequest: false, raiseTiketSucess: true });
            setTimeout(() => {
                this.setState({ raiseTiketSucess: false, showLoader: false });
                if (placeCustomerResponse.status == SUCCESS) {
                    this.props.showCallQuerySuccessModal(placeCustomerResponse);
                }
            }, 2000);
        }, 2000);
    }

    //Render first ticket history details.
    renderLatestTicketDetails(recentOrder) {
        return (
            <div className={styles.recentOrder}>
                <div className={styles.recentTicketBox}>
                    {this.state.isRecentOrderHistory ? (
                        <div className={styles.homePage} onClick={() => this.navigateCliqCarePage()}>
                            CLiQCare
                        </div>
                    ) : (
                        <React.Fragment>
                            <div className={styles.recentTxt}> Your ticket (s) </div>
                            <div className={styles.viewAll} onClick={() => this.showRecentOrderHistory("closeTicket")}>
                                View All
                            </div>
                        </React.Fragment>
                    )}
                </div>
                {this.state.isRecentOrderHistory ? (
                    <div className={styles.tickets}> Your ticket(s)</div>
                ) : (
                    <div
                        className={styles.recentTicketDetailsBox}
                        onClick={() => this.showRecentOrderDetails(recentOrder, "recentTicketClicked")}
                    >
                        <div className={styles.recentTicketDetails}>
                            <div
                                className={
                                    recentOrder.issueBucket ? styles.nonOrderRelatedImg : styles.recentTicektImage
                                }
                            >
                                {recentOrder.issueBucket ? (
                                    <div
                                        className={styles.nonOrderIcon}
                                        style={{
                                            background: `url(${require(`./img/${recentOrder.issueBucket
                                                .split(" ")[0]
                                                .toLowerCase()}_ticket.svg`)})`,
                                            backgroundSize: "contain",
                                            backgroundRepeat: "no-repeat",
                                            width: "35px",
                                            height: recentOrder.issueBucket.includes("EGV") ? "26px" : "35px",
                                        }}
                                    />
                                ) : (
                                    <ProductImage image={recentOrder.productImage} />
                                )}
                            </div>
                            <div className={styles.recentTicketTxt}> {recentOrder.issueType} </div>
                        </div>
                        <div className={styles.recentTiketStatusBox}>
                            <div className={styles.inProcess}></div>
                            <div>
                                <div className={styles.recentStatus}>
                                    Ticket Status: <span className={styles.fontBold}> {recentOrder.status} </span>
                                </div>
                                {recentOrder.resolutionDate && (
                                    <div className={styles.recentStatus}>
                                        {" "}
                                        Estimated Resolution:{" "}
                                        <span className={styles.fontBold}>
                                            {" "}
                                            {moment(recentOrder.resolutionDate.split(" ")[0], "DD-MM-YYYY").format(
                                                STATUS_DATE_FORMAT
                                            )}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    showRecentOrderHistory() {
        this.setState({
            isRecentOrderHistory: true,
            isOrderDatails: false,
            FAQquestion: false,
            showQuestionList: false,
        });
    }

    handleFilterClick = () => {
        this.setState({ filterCard: true });
    };

    handleSelectedFilterClick = (filterData) => {
        this.setState({ filterTypeData: filterData.label, filterCard: false });
        this.props.getRecentTicketHistoryDetails(false, filterData.value);
    };

    showRecentOrderDetails = (selectedTickerHistory, recentTicketClicked) => {
        if (recentTicketClicked == "recentTicketClicked") {
            this.setState({ recentTicketClicked: true });
        }
        this.setState({
            isRecentOrderDetails: true,
            selectedTickerHistory: selectedTickerHistory,
            isRecentOrderHistory: true,
            isOrderDatails: false,
            FAQquestion: false,
            showQuestionList: false,
        });
    };

    loadMoreData() {
        this.props.getRecentTicketHistoryDetails(true, this.state.filterTypeData);
    }

    render() {
        const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
        const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
        let isUserLogin = false;
        if (userDetails || customerCookie) {
            isUserLogin = true;
        }
        const {
            customerQueriesOtherIssueData,
            customerQueriesOtherIssueLoading,
            ordersTransactionData,
            orderRelatedIssueLoading,
            orderRelatedQuestionsStatus,
            ordersTransactionLoading,
            customerQueriesField,
            loadingForUserDetails,
            customerQueriesLoading,
            uploadUserFileLoading,
            FAQData,
            FAQRelatedDataLoading,
            FAQDataLoading,
            loadingForFetchOrderDetails,
            loadingForSendInvoice,
            cliq2CallConfigDataLoading,
            ticketDetailsDataLoading,
            initialTicketDetailsData,
        } = this.props;
        if (
            customerQueriesOtherIssueLoading ||
            ordersTransactionLoading ||
            loadingForUserDetails ||
            orderRelatedIssueLoading ||
            customerQueriesLoading ||
            uploadUserFileLoading ||
            FAQDataLoading ||
            FAQRelatedDataLoading ||
            loadingForFetchOrderDetails ||
            loadingForSendInvoice ||
            cliq2CallConfigDataLoading ||
            ticketDetailsDataLoading
        ) {
            this.props.showSecondaryLoader();
        } else {
            this.props.hideSecondaryLoader();
        }
        let showRecentOrderCard = false;
        if (isUserLogin && ordersTransactionData && ordersTransactionData.orderData) {
            showRecentOrderCard = true;
        }

        if (this.state.showLoader) {
            return (
                <SSRquest
                    raiseTiketRequest={this.state.raiseTiketRequest}
                    raiseTiketSucess={this.state.raiseTiketSucess}
                    isCallMeBackForm={this.state.isCallMeBackForm}
                />
            );
        } else {
            return (
                <div className={styles.base}>
                    <DesktopOnly>
                        {this.state.isCallMeBackForm ? (
                            <div className={styles.callMeBackFormBox}>
                                <div className={styles.formBox}>
                                    <div className={styles.mobileNumberBox}>
                                        <div className={styles.fieldLabel}>Enter your Mobile Number</div>
                                        <div className={styles.inputField}>
                                            <FloatingLabelInputWithPlace
                                                placeholder={"Mobile number *"}
                                                disabled={false}
                                                maxLength={"10"}
                                                value={this.state.mobile}
                                                onChange={(value) => this.setState({ mobile: value })}
                                                fontSize={"11px"}
                                                onlyNumber={true}
                                                focusBack={true}
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.languageBox}>
                                        <div className={styles.fieldLabel}>Select preferred language</div>

                                        <div className={styles.language}>
                                            <div className={styles.radioTicketType}>
                                                <label
                                                    className={
                                                        this.state.chooseLanguage == "English" ? styles.fontBold : null
                                                    }
                                                >
                                                    English
                                                    <input
                                                        type="radio"
                                                        value="English"
                                                        checked={this.state.chooseLanguage == "English"}
                                                        onChange={(e) =>
                                                            this.setState({ chooseLanguage: e.target.value })
                                                        }
                                                    />
                                                    <span />
                                                </label>
                                            </div>
                                            <div className={styles.radioTicketType}>
                                                <label
                                                    className={
                                                        this.state.chooseLanguage == "Hindi" ? styles.fontBold : null
                                                    }
                                                >
                                                    हिंदी
                                                    <input
                                                        type="radio"
                                                        value="Hindi"
                                                        checked={this.state.chooseLanguage == "Hindi"}
                                                        onChange={(e) =>
                                                            this.setState({ chooseLanguage: e.target.value })
                                                        }
                                                    />
                                                    <span />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    {this.state.isScheduleACall ? (
                                        <div className={styles.mobileNumberBox}>
                                            <div className={styles.fieldLabel}>Select preferred time slot</div>
                                            <div className={styles.inputField}>
                                                <FloatingLabelInputWithPlace
                                                    placeholder={"Select your time slot"}
                                                    disabled={false}
                                                    value={
                                                        this.state.timing
                                                            ? this.state.timing + " , " + this.state.selectedDate
                                                            : this.state.timing
                                                    }
                                                    fontSize={"11px"}
                                                />
                                                <div className={styles.customBtn} onClick={() => this.timeSlotPopUP()}>
                                                    {!this.state.timing ? "Select" : "Change"}
                                                </div>
                                            </div>
                                        </div>
                                    ) : null}

                                    <div className={styles.requestButtonBox}>
                                        <Button
                                            type="primary"
                                            backgroundColor="#da1c5c"
                                            height={40}
                                            label={"PLACE A CALL REQUEST"}
                                            borderRadius={6}
                                            width={205}
                                            textStyle={{ color: "#FFF", fontSize: 14 }}
                                            onClick={this.onCallRequestClick.bind(this)}
                                            disabled={this.state.isScheduleACall && !this.state.timing ? true : false}
                                            disabledLightGray={
                                                this.state.isScheduleACall && !this.state.timing ? true : false
                                            }
                                        />
                                    </div>
                                    <div className={styles.buttonBox}>
                                        <div className={styles.customBtn} onClick={() => this.navigatePreviousPage()}>
                                            Or go back to previous page
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <React.Fragment>
                                {this.state.isIssueOptions ? (
                                    <MoreHelps
                                        getCustomerQueriesFields={() => this.getCustomerQueriesFields()}
                                        selectedOrder={this.state.question}
                                        navigatePreviousPage={() => this.navigatePreviousPage()}
                                        navigateHomePage={() => this.navigateHomePage()}
                                        CLiQ2CallClick={() => this.CLiQ2CallClick()}
                                    />
                                ) : (
                                    <div className={styles.baseWrapper}>
                                        <div className={styles.formAbdTabHolder}>
                                            <div className={styles.tabHolder}>
                                                {showRecentOrderCard &&
                                                    this.state.isShowRecentOrderCard &&
                                                    initialTicketDetailsData &&
                                                    Array.isArray(initialTicketDetailsData.tickets) &&
                                                    this.props.initialTicketDetailsData.tickets.length > 0 &&
                                                    this.renderLatestTicketDetails(initialTicketDetailsData.tickets[0])}

                                                <div className={styles.tabHolderBox}>
                                                    <div className={styles.tabHeader}>All Help Topics</div>

                                                    <div className={styles.faqList}>
                                                        {FAQData &&
                                                            FAQData.map((faq, index) => {
                                                                return (
                                                                    <div
                                                                        key={`key${index}`}
                                                                        className={styles.faqListBox}
                                                                        onClick={() => {
                                                                            this.handleFAQClick(faq);
                                                                        }}
                                                                    >
                                                                        <div className={styles.faqIcon}>
                                                                            <Icon
                                                                                image={
                                                                                    this.state.parentIssueType ==
                                                                                    faq.FAQHeader
                                                                                        ? `${require("../components/img/" +
                                                                                              faq.image.split(".")[0] +
                                                                                              "active" +
                                                                                              ".svg")}`
                                                                                        : `${require("../components/img/" +
                                                                                              faq.image.split(".")[0] +
                                                                                              ".svg")}`
                                                                                }
                                                                                width={33}
                                                                                height={33}
                                                                            />
                                                                        </div>
                                                                        <div className={styles.faqHederBox}>
                                                                            <div
                                                                                className={[
                                                                                    styles.faqHeader,
                                                                                    this.state.parentIssueType ==
                                                                                    faq.FAQHeader
                                                                                        ? styles.colorRed
                                                                                        : null,
                                                                                ].join(" ")}
                                                                            >
                                                                                {faq.FAQHeader.replace("&amp;", "&")}
                                                                            </div>
                                                                            <div className={styles.faqSubheading}>
                                                                                {faq.FAQSubHeader.includes("&amp;")
                                                                                    ? faq.FAQSubHeader.replace(
                                                                                          /&amp;/g,
                                                                                          "&"
                                                                                      )
                                                                                    : faq.FAQSubHeader}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            })}
                                                    </div>
                                                </div>
                                            </div>
                                            {this.state.isRecentOrderHistory ? (
                                                <OrderHistoryList
                                                    handleFilterClick={this.handleFilterClick}
                                                    filterCard={this.state.filterCard}
                                                    handleSelectedFilterClick={(selectedFilter) =>
                                                        this.handleSelectedFilterClick(selectedFilter)
                                                    }
                                                    filterTypeData={this.state.filterTypeData}
                                                    showRecentOrderDetails={(selectedTickets) =>
                                                        this.showRecentOrderDetails(selectedTickets)
                                                    }
                                                    selectedTickerHistory={this.state.selectedTickerHistory}
                                                    isRecentOrderDetails={this.state.isRecentOrderDetails}
                                                    navigatePreviousPage={() => this.navigatePreviousPage()}
                                                    ticketHistoryDetails={this.props.ticketHistoryDetails}
                                                    userName={this.state.name}
                                                    loadMoreData={() => this.loadMoreData()}
                                                />
                                            ) : (
                                                <div className={styles.formHolder}>
                                                    <CustomerIssue
                                                        customerQueriesOtherIssueData={customerQueriesOtherIssueData}
                                                        selectedOrder={this.props.selectedOrderDetails || null}
                                                        orderList={this.state.orderList}
                                                        isOrderDatails={this.state.isOrderDatails}
                                                        moreHelps={() => this.moreHelps()}
                                                        ordersTransactionData={ordersTransactionData}
                                                        questionsList={this.state.questionList}
                                                        selectQuestion={(listOfIssue, index) =>
                                                            this.selectQuestion(listOfIssue, index)
                                                        }
                                                        showFeedBack={this.state.showFeedBack}
                                                        question={this.state.question}
                                                        getOrderRelatedQuestions={(orderData, product) =>
                                                            this.getOrderRelatedQuestions(orderData, product)
                                                        }
                                                        orderRelatedQuestionsStatus={orderRelatedQuestionsStatus}
                                                        isQuesryForm={this.state.isQuesryForm}
                                                        uploadUserFile={(issueType, title, file) =>
                                                            this.props.uploadUserFile(issueType, title, file)
                                                        }
                                                        feedBackHelpFull={() => this.feedBackHelpFull()}
                                                        isAnswerHelpFull={this.state.isAnswerHelpFull}
                                                        uploadedAttachments={this.state.uploadedAttachments}
                                                        userDetails={this.props.userDetails}
                                                        submitCustomerForms={(formaData) =>
                                                            this.submitCustomerForms(formaData)
                                                        }
                                                        displayToast={(message) => this.props.displayToast(message)}
                                                        customerQueriesField={customerQueriesField}
                                                        getCustomerQueriesFields={(webFormTemplate, isIssueOptions) =>
                                                            this.getCustomerQueriesFields(
                                                                webFormTemplate,
                                                                isIssueOptions
                                                            )
                                                        }
                                                        orderRelatedQuestion={this.state.orderRelatedQuestion}
                                                        otherQuestion={this.state.otherQuestion}
                                                        FAQquestion={this.state.FAQquestion}
                                                        selectOtehrQuestion={(selectedOtehrQuestion) =>
                                                            this.selectOtehrQuestion(selectedOtehrQuestion)
                                                        }
                                                        parentIssueType={this.state.parentIssueType}
                                                        orderAllList={this.state.orderAllList}
                                                        showAllOrdersList={() => this.showAllOrdersList()}
                                                        hideAllOrder={() => this.hideAllOrder()}
                                                        questionType={this.state.questionType}
                                                        isUserLogin={isUserLogin}
                                                        navigateLogin={() => this.navigateLogin()}
                                                        getMoreOrder={() => this.getMoreOrder()}
                                                        showQuestionList={this.state.showQuestionList}
                                                        sendInvoice={(ussid, sellerOrderNo) => {
                                                            this.sendInvoice(ussid, sellerOrderNo);
                                                        }}
                                                        navigatePreviousPage={() => this.navigatePreviousPage()}
                                                        navigateHomePage={() => this.navigateHomePage()}
                                                        updateThanks={() => this.updateThanks()}
                                                        navigateCliqCarePage={() => this.navigateCliqCarePage()}
                                                        slectOrderData={this.state.slectOrderData}
                                                        isCallMeBackForm={this.state.isCallMeBackForm}
                                                        isScheduleACall={this.state.isScheduleACall}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </React.Fragment>
                        )}
                    </DesktopOnly>
                </div>
            );
        }
    }
}
