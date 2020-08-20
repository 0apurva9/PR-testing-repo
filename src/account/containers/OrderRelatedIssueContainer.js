import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import OrderRelatedIssue from "../components/orderRelatedIssue";
import { setHeaderText } from "../../general/header.actions";
import {
  getOrderRelatedQuestions,
  getOrdersTransactionData,
  uploadUserFile,
  submitOrderDetails,
  getUserDetails,
  clearOrderTransactionDetails,
  // getCustomerQueriesDatav2,
  getCustomerQueriesFieldsv2,
  getNonOrderRelatedQuestions,
  getCliqCareWmsResponse,
  getAllOrdersDetails,
  getAllOthersHelp,
  sendInvoice,
  getFaqRelatedQuestions,
  setSelfServeState,
  fetchOrderItemDetails
  // setUrlToRedirectToAfterAuth
} from "../actions/account.actions";
import { setUrlToRedirectToAfterAuth } from "../../auth/actions/auth.actions.js";
import {
  showSecondaryLoader,
  hideSecondaryLoader
} from "../../general/secondaryLoader.actions";
import { displayToast } from "../../general/toast.actions.js";
import {
  showModal,
  CUSTOMER_QUERY_POPUP,
  CLIQ_2_CALL_POP_UP,
  TIME_SLOT_POP_UP
} from "../../general/modal.actions";
const mapDispatchToProps = dispatch => {
  return {
    getOrderRelatedQuestions: async transactionId => {
      return dispatch(getOrderRelatedQuestions(transactionId));
    },
    // getCustomerQueriesDatav2: () => {
    //   dispatch(getCustomerQueriesDatav2());
    // },
    //Self-Serve Non-Order-Related Issue
    getNonOrderRelatedQuestions: () => {
      dispatch(getNonOrderRelatedQuestions());
    },
    getCustomerQueriesFieldsv2: async (uItemplateCode, isSelectRadio) => {
      return dispatch(
        getCustomerQueriesFieldsv2(uItemplateCode, isSelectRadio)
      );
    },
    getOrdersTransactionData: paginated => {
      dispatch(getOrdersTransactionData(paginated));
    },
    showSecondaryLoader: () => {
      dispatch(showSecondaryLoader());
    },
    hideSecondaryLoader: () => {
      dispatch(hideSecondaryLoader());
    },
    uploadUserFile: async (issueType, title, file) => {
      return dispatch(uploadUserFile(issueType, title, file));
    },

    getAllOrdersDetails: () => {
      dispatch(getAllOrdersDetails(false, false, false, false));
    },

    getUserDetails: () => {
      dispatch(getUserDetails());
    },
    showCustomerQueryModal: getCustomerQueryDetailsObject => {
      dispatch(showModal(CUSTOMER_QUERY_POPUP, getCustomerQueryDetailsObject));
    },
    displayToast: message => {
      dispatch(displayToast(message));
    },
    submitOrderDetails: async raiseTicketObj => {
      return dispatch(submitOrderDetails(raiseTicketObj));
    },
    getAllOthersHelp: pageId => {
      dispatch(getAllOthersHelp(pageId));
    },
    getFaqRelatedQuestions: async FAQPageId => {
      return dispatch(getFaqRelatedQuestions(FAQPageId));
    },
    sendInvoice: (ussid, sellerOrderNo) => {
      dispatch(sendInvoice(ussid, sellerOrderNo));
    },
    setUrlToRedirectToAfterAuth: url => {
      dispatch(setUrlToRedirectToAfterAuth(url));
    },
    setSelfServeState: currentState => {
      dispatch(setSelfServeState(currentState));
    },
    fetchOrderItemDetails: (orderId, transactionId) => {
      dispatch(fetchOrderItemDetails(orderId, transactionId));
    },
    showCliq2CallOption: getCustomerQueryDetailsObject => {
      dispatch(showModal(CLIQ_2_CALL_POP_UP, getCustomerQueryDetailsObject));
    },
    timeSlotPopUP: getCustomerQueryDetailsObject => {
      dispatch(showModal(TIME_SLOT_POP_UP, getCustomerQueryDetailsObject));
    }
    // setHeaderText: text => {
    //   dispatch(setHeaderText(text));
    // },

    // clearOrderTransactionDetails: () => {
    //   dispatch(clearOrderTransactionDetails());
    // },

    // getCliqCareWmsResponse: () => {
    //   dispatch(getCliqCareWmsResponse());
    // }
  };
};
const mapStateToProps = state => {
  return {
    // ordersRelatedLoading: state.profile.ordersRelatedLoading,
    // customerQueriesData: state.profile.customerQueriesData,

    // userDetails: state.profile.userDetails,
    // customerQueriesField: state.profile.customerQueriesField,
    // uploadUserFileStatus: state.profile.uploadUserFileStatus,
    // uploadUserFileData: state.profile.uploadUserFile,
    userDetails: state.profile.userDetails,
    uploadUserFileLoading: state.profile.uploadUserFileLoading,
    loadingForUserDetails: state.profile.loadingForUserDetails,
    ordersTransactionData: state.profile.ordersTransactionData,
    ordersTransactionLoading: state.profile.ordersTransactionLoading,
    customerQueriesOtherIssueDataStatus:
      state.profile.customerQueriesOtherIssueDataStatus,
    customerQueriesOtherIssueLoading:
      state.profile.customerQueriesOtherIssueLoading,
    orderRelatedIssueLoading: state.profile.orderRelatedIssueLoading,
    customerQueriesOtherIssueData: state.profile.customerQueriesOtherIssueData,
    orderRelatedQuestionsStatus: state.profile.orderRelatedQuestionsStatus,
    orderRelatedQuestionsData: state.profile.orderRelatedQuestionsData,
    customerQueriesFieldStatus: state.profile.customerQueriesFieldStatus,
    customerQueriesField: state.profile.customerQueriesField,
    customerQueriesLoading: state.profile.customerQueriesLoading,
    orderDetails: state.profile.orderDetails,
    submitOrderDetailsLoading: state.profile.submitOrderDetailsLoading,

    FAQDataLoading: state.profile.FAQDataLoading,
    FAQData: state.profile.FAQData,

    FAQRelatedDataLoading: state.profile.FAQRelatedDataLoading,
    // QuestionsListData: state.profile.QuestionsListData,
    currentState: state.profile.currentState,
    logoutUserStatus: state.profile.logoutUserStatus,
    loadingForFetchOrderDetails: state.profile.loadingForFetchOrderDetails,
    selectedOrderDetails: state.profile.fetchOrderDetails,
    loadingForSendInvoice: state.profile.loadingForSendInvoice
  };
};

const OrderRelatedIssueContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OrderRelatedIssue)
);
export default OrderRelatedIssueContainer;
