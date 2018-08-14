import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import OrderRelatedIssue from "../components/orderRelatedIssue";
import {
  getCustomerQueriesData,
  getOrdersTransactionData
} from "../actions/account.actions";
const mapDispatchToProps = dispatch => {
  return {
    getCustomerQueriesData: () => {
      dispatch(getCustomerQueriesData());
    },
    getOrdersTransactionData: () => {
      dispatch(getOrdersTransactionData());
    }
  };
};
const mapStateToProps = state => {
  return {
    customerQueriesData: state.profile.customerQueriesData,
    ordersTransactionData: state.profile.ordersTransactionData
  };
};

const OrderRelatedIssueContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OrderRelatedIssue)
);
export default OrderRelatedIssueContainer;
