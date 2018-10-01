import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import OrderRelatedIssue from "../components/orderRelatedIssue";
import { setHeaderText } from "../../general/header.actions";
import {
  getCustomerQueriesData,
  getOrdersTransactionData,
  uploadUserFile,
  submitOrderDetails,
  getUserDetails
} from "../actions/account.actions";
import { displayToast } from "../../general/toast.actions.js";
import { showModal, CUSTOMER_QUERY_POPUP } from "../../general/modal.actions";
const mapDispatchToProps = dispatch => {
  return {
    getCustomerQueriesData: () => {
      dispatch(getCustomerQueriesData());
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
    uploadUserFile: async file => {
      return dispatch(uploadUserFile(file));
    },
    submitOrderDetails: async submitOrderDetailsObject => {
      return dispatch(submitOrderDetails(submitOrderDetailsObject));
    },
    setHeaderText: text => {
      dispatch(setHeaderText(text));
    },
    showCustomerQueryModal: getCustomerQueryDetailsObject => {
      dispatch(showModal(CUSTOMER_QUERY_POPUP, getCustomerQueryDetailsObject));
    }
  };
};
const mapStateToProps = state => {
  return {
    ordersTransactionDataLoading: state.profile.ordersTransactionDataLoading,
    customerQueriesData: state.profile.customerQueriesData,
    ordersTransactionData: state.profile.ordersTransactionData,
    userDetails: state.profile.userDetails
  };
};

const OrderRelatedIssueContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OrderRelatedIssue)
);
export default OrderRelatedIssueContainer;
