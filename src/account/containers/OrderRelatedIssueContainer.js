import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import OrderRelatedIssue from "../components/orderRelatedIssue";
import { setHeaderText } from "../../general/header.actions";
import {
  getCustomerQueriesData,
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
    getCustomerQueriesData: transactionId => {
      dispatch(getCustomerQueriesData(transactionId));
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
    getUserDetails: () => {
      dispatch(getUserDetails());
    },
    displayToast: message => {
      dispatch(displayToast(message));
    },
    // uploadUserFile: async uploadUserFileObject => {
    //   return dispatch(uploadUserFile(uploadUserFileObject));
    // },
    uploadUserFile: async (issueType, title, file) => {
      return dispatch(uploadUserFile(issueType, title, file));
    },
    submitOrderDetails: async raiseTicketObj => {
      return dispatch(submitOrderDetails(raiseTicketObj));
    },
    setHeaderText: text => {
      dispatch(setHeaderText(text));
    },
    showCustomerQueryModal: getCustomerQueryDetailsObject => {
      dispatch(showModal(CUSTOMER_QUERY_POPUP, getCustomerQueryDetailsObject));
    },
    clearOrderTransactionDetails: () => {
      dispatch(clearOrderTransactionDetails());
    },
    showSecondaryLoader: () => {
      dispatch(showSecondaryLoader());
    },
    hideSecondaryLoader: () => {
      dispatch(hideSecondaryLoader());
    },
    /**
     * this function will be integrated to "getCustomerQueriesFieldsv2"
     */
    getCliqCareWmsResponse: () => {
      dispatch(getCliqCareWmsResponse());
    }
  };
};
const mapStateToProps = state => {
  return {
    ordersRelatedLoading: state.profile.ordersRelatedLoading,
    customerQueriesData: state.profile.customerQueriesData,
    ordersTransactionData: state.profile.ordersTransactionData,
    userDetails: state.profile.userDetails,
    customerQueriesField: state.profile.customerQueriesField,
    uploadUserFileStatus: state.profile.uploadUserFileStatus,
    uploadUserFileData: state.profile.uploadUserFile
  };
};

const OrderRelatedIssueContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OrderRelatedIssue)
);
export default OrderRelatedIssueContainer;
