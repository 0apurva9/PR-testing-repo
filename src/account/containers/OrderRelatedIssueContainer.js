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
  getCustomerQueriesFieldsv2,
  getNonOrderRelatedQuestions,
  getCliqCareWmsResponse,
  getAllOrdersDetails,
  getAllOthersHelp,
  sendInvoice,
  getFaqRelatedQuestions,
  setSelfServeState,
  fetchOrderItemDetails,
  getCliq2CallConfig,
  placeCustomerCallRequest,
  getRecentTicketHistoryDetails,
  getHaptikBotConfig
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
  TIME_SLOT_POP_UP,
  CUSTOMER_QUERY_ERROR_MODAL,
  CUSTOMER_CALL_QUERY_SUCCESS
} from "../../general/modal.actions";
import { stat } from "fs";
const mapDispatchToProps = dispatch => {
  return {
    getOrderRelatedQuestions: async transactionId => {
      return dispatch(getOrderRelatedQuestions(transactionId));
    },
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
    customerQueryErrorModal: getCustomerQueryDetailsObject => {
      dispatch(
        showModal(CUSTOMER_QUERY_ERROR_MODAL, getCustomerQueryDetailsObject)
      );
    },
    getCliq2CallConfig: async Cliq2CallConfigId => {
      return dispatch(getCliq2CallConfig(Cliq2CallConfigId));
    },
    showCliq2CallOption: getCustomerQueryDetailsObject => {
      dispatch(showModal(CLIQ_2_CALL_POP_UP, getCustomerQueryDetailsObject));
    },
    timeSlotPopUP: getCustomerQueryDetailsObject => {
      dispatch(showModal(TIME_SLOT_POP_UP, getCustomerQueryDetailsObject));
    },
    placeCustomerCallRequest: async callRequestData => {
      return dispatch(placeCustomerCallRequest(callRequestData));
    },
    showCallQuerySuccessModal: callSuccessData => {
      dispatch(showModal(CUSTOMER_CALL_QUERY_SUCCESS, callSuccessData));
    },
    getRecentTicketHistoryDetails: (paginated, ticketStatus) => {
      dispatch(getRecentTicketHistoryDetails(paginated, ticketStatus));
    },
    clearOrderTransactionDetails: () => {
      dispatch(clearOrderTransactionDetails());
    },
    getHaptikBotConfig: pageId => {
      dispatch(getHaptikBotConfig(pageId));
    }
  };
};
const mapStateToProps = state => {
  return {
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
    currentState: state.profile.currentState,
    logoutUserStatus: state.profile.logoutUserStatus,
    loadingForFetchOrderDetails: state.profile.loadingForFetchOrderDetails,
    selectedOrderDetails: state.profile.fetchOrderDetails,
    loadingForSendInvoice: state.profile.loadingForSendInvoice,
    cliq2CallConfigDataLoading: state.profile.cliq2CallConfigDataLoading,
    cliq2CallConfigData: state.profile.cliq2CallConfigData,
    genesysResponseLoading: state.profile.genesysResponseLoading,
    genesysResponseData: state.profile.genesysResponseData,
    genesysCustomerCallRequestData:
      state.profile.genesysCustomerCallRequestData,
    ticketDetailsDataLoading: state.profile.ticketDetailsDataLoading,
    ticketHistoryDetails: state.profile.ticketHistoryDetails,
    initialTicketDetailsData: state.profile.initialTicketDetailsData,
    haptikBotConfigDataLoading: state.profile.haptikBotConfigDataLoading,
    haptikBotConfigData: state.profile.haptikBotConfigData
  };
};

const OrderRelatedIssueContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OrderRelatedIssue)
);
export default OrderRelatedIssueContainer;
