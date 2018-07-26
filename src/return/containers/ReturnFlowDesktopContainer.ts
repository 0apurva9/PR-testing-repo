import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { withRouter } from "react-router-dom";
import ReturnFlowDesktop from "../components/ReturnFlowDesktop";
import { getReturnRequest } from "../../account/actions/account.actions";

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    getReturnRequest: (orderCode: string, transactionId: string) => {
      bindActionCreators(getReturnRequest(orderCode, transactionId), dispatch);
    }
  };
};
const mapStateToProps = (state: any) => {
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
