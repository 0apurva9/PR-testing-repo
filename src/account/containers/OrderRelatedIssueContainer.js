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
  getFAQQuestions,
  sendInvoice,
  getFAQQuestionsList
  // setUrlToRedirectToAfterAuth
} from "../actions/account.actions";
import { setUrlToRedirectToAfterAuth } from "../../auth/actions/auth.actions.js";
import {
  showSecondaryLoader,
  hideSecondaryLoader
} from "../../general/secondaryLoader.actions";
import { displayToast } from "../../general/toast.actions.js";
import { showModal, CUSTOMER_QUERY_POPUP } from "../../general/modal.actions";
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
    getFAQQuestions: () => {
      dispatch(getFAQQuestions());
    },
    getFAQQuestionsList: async FAQPageId => {
      return dispatch(getFAQQuestionsList(FAQPageId));
    },
    sendInvoice: (ussid, sellerOrderNo) => {
      dispatch(sendInvoice(ussid, sellerOrderNo));
    },
    setUrlToRedirectToAfterAuth: url => {
      dispatch(setUrlToRedirectToAfterAuth(url));
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
    FAQQuestionsListLoading: state.profile.FAQQuestionsListLoading,
    FAQQuestionsListData: state.profile.FAQQuestionsListData,
    QuestionsListLoading: state.profile.QuestionsListLoading,
    QuestionsListData: state.profile.QuestionsListData
  };
};

const OrderRelatedIssueContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OrderRelatedIssue)
);
export default OrderRelatedIssueContainer;
