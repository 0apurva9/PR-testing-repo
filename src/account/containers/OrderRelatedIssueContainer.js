import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import OrderRelatedIssue from "../components/orderRelatedIssue";
import {
  getCustomerQueriesData,
  getOrdersTransactionData,
  uploadUserFile
} from "../actions/account.actions";
import { displayToast } from "../../general/toast.actions.js";
const mapDispatchToProps = dispatch => {
  return {
    getCustomerQueriesData: () => {
      dispatch(getCustomerQueriesData());
    },
    getOrdersTransactionData: paginated => {
      dispatch(getOrdersTransactionData(false, paginated));
    },
    displayToast: message => {
      dispatch(displayToast(message));
    },
    uploadUserFile: async file => {
      return dispatch(uploadUserFile(file));
    }
  };
};
const mapStateToProps = state => {
  return {
    ordersTransactionDataLoading: state.profile.ordersTransactionDataLoading,
    customerQueriesData: state.profile.customerQueriesData,
    ordersTransactionData: state.profile.ordersTransactionData
  };
};

const OrderRelatedIssueContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OrderRelatedIssue)
);
export default OrderRelatedIssueContainer;
