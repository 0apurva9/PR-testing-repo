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
  getCliqCareWmsResponse
} from "../actions/account.actions";
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
    getCustomerQueriesFieldsv2: (uItemplateCode, isSelectRadio) => {
      dispatch(getCustomerQueriesFieldsv2(uItemplateCode, isSelectRadio));
    },
    getOrdersTransactionData: paginated => {
      dispatch(getOrdersTransactionData(paginated));
    },
    showSecondaryLoader: () => {
      dispatch(showSecondaryLoader());
    },
    hideSecondaryLoader: () => {
      dispatch(hideSecondaryLoader());
    }
    // getUserDetails: () => {
    //   dispatch(getUserDetails());
    // },
    // displayToast: message => {
    //   dispatch(displayToast(message));
    // },
    // uploadUserFile: async uploadUserFileObject => {
    //   return dispatch(uploadUserFile(uploadUserFileObject));
    // },
    // submitOrderDetails: async raiseTicketObj => {
    //   return dispatch(submitOrderDetails(raiseTicketObj));
    // },
    // setHeaderText: text => {
    //   dispatch(setHeaderText(text));
    // },
    // showCustomerQueryModal: getCustomerQueryDetailsObject => {
    //   dispatch(showModal(CUSTOMER_QUERY_POPUP, getCustomerQueryDetailsObject));
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
    ordersTransactionData: state.profile.ordersTransactionData,
    customerQueriesOtherIssueDataStatus:
      state.profile.customerQueriesOtherIssueDataStatus,
    orderRelatedIssueLoading: state.profile.orderRelatedIssueLoading,
    customerQueriesOtherIssueData: state.profile.customerQueriesOtherIssueData,
    orderRelatedQuestionsStatus: state.profile.orderRelatedQuestionsStatus,
    orderRelatedQuestionsData: state.profile.orderRelatedQuestionsData,
    customerQueriesFieldStatus: state.profile.customerQueriesFieldStatus,
    customerQueriesField: state.profile.customerQueriesField
  };
};

const OrderRelatedIssueContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OrderRelatedIssue)
);
export default OrderRelatedIssueContainer;
