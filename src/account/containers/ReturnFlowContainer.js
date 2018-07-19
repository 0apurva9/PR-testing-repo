import { withRouter } from "react-router-dom";
import {
  getReturnRequest,
  returnProductDetails
} from "../actions/account.actions.js";
import { connect } from "react-redux";

import { getUserAddress } from "../../cart/actions/cart.actions";
import ReturnFlow from "../components/ReturnFlow";
import { displayToast } from "../../general/toast.actions.js";
import {
  showSecondaryLoader,
  hideSecondaryLoader
} from "../../general/secondaryLoader.actions";
const mapDispatchToProps = dispatch => {
  return {
    getReturnRequest: (orderCode, transactionId) => {
      dispatch(getReturnRequest(orderCode, transactionId));
    },
    displayToast: message => {
      dispatch(displayToast(message));
    },
    returnProductDetailsFunc: productDetails => {
      dispatch(returnProductDetails(productDetails));
    },
    showSecondaryLoader: () => {
      dispatch(showSecondaryLoader());
    },
    hideSecondaryLoader: () => {
      dispatch(hideSecondaryLoader());
    },
    getUserAddress: () => {
      dispatch(getUserAddress(true));
    }
  };
};

const mapStateToProps = state => {
  return {
    returnRequest: state.profile.returnRequest,
    returnProductDetails: state.profile.returnProductDetails,
    loading: state.profile.loading,
    error: state.profile.error,
    orderDetails: state.profile.fetchOrderDetails,
    userAddress: state.cart.userAddress
  };
};

const ReturnFlowContainer = connect(mapStateToProps, mapDispatchToProps)(
  ReturnFlow
);
export default ReturnFlowContainer;
