import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ReturnFlowDesktop from "../components/ReturnFlowDesktop";
import { getReturnRequest } from "../../account/actions/account.actions";

const mapDispatchToProps = dispatch => {
  return {
    getReturnRequest: (orderCode: string, transactionId: string) => {
      dispatch(getReturnRequest(orderCode, transactionId));
    }
  };
};
const mapStateToProps = state => {
  return {
    returnRequest: state.profile.returnRequest,
    returnProductDetails: state.profile.returnProductDetails,
    loading: state.profile.loading,
    orderDetails: state.profile.fetchOrderDetails
  };
};
const ReturnFlowDesktopContainer = connect(mapStateToProps, mapDispatchToProps)(
  ReturnFlowDesktop
);

export default ReturnFlowDesktopContainer;
