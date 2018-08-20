import { withRouter } from "react-router-dom";
import {
  getReturnRequest,
  returnProductDetails
} from "../../account/actions/account.actions.js";
import { connect } from "react-redux";

import { getUserAddress } from "../../cart/actions/cart.actions";
import ReturnFlowDesktop from "../components/ReturnFlowDesktop";
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
    userAddress: state.cart.userAddress
  };
};

const ReturnFlowDesktopContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ReturnFlowDesktop)
);

export default ReturnFlowDesktopContainer;
