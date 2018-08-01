import { connect } from "react-redux";
import {
  getDetailsOfCancelledProduct,
  cancelProduct
} from "../../account/actions/account.actions";
import { withRouter } from "react-router-dom";
import { displayToast } from "../../general/toast.actions";
import cancelOrderForDesktop from "../../cancel/components/cancelOrderForDesktop";
import {
  SUCCESS,
  MY_ACCOUNT,
  MY_ACCOUNT_ORDERS_PAGE
} from "../../lib/constants";
import { getUserAddress } from "../../cart/actions/cart.actions";
import { showModal, CANCEL_ORDER_POP_UP } from "../../general/modal.actions";
import { setDataLayerForMyAccountDirectCalls } from "../../lib/adobeUtils";
const ERROR_MESSAGE_IN_CANCELING_ORDER = "Error in Canceling order";

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getDetailsOfCancelledProduct: cancelProductDetails => {
      dispatch(getDetailsOfCancelledProduct(cancelProductDetails));
    },
    cancelProduct: async (cancelProductDetails, productDetials) => {
      const cancelOrderDetails = await dispatch(
        cancelProduct(cancelProductDetails)
      );
      if (cancelOrderDetails.status === SUCCESS) {
        setDataLayerForMyAccountDirectCalls(productDetials);
        ownProps.history.go(-4);
      } else {
        dispatch(displayToast(ERROR_MESSAGE_IN_CANCELING_ORDER));
      }
    },
    displayToast: message => {
      dispatch(displayToast(message));
    },
    showCancelOrderModal: cancelOrderDetails => {
      dispatch(showModal(CANCEL_ORDER_POP_UP, cancelOrderDetails));
    },
    getUserAddress: () => {
      dispatch(getUserAddress(true));
    }
  };
};
const mapStateToProps = state => {
  return {
    cancelProductDetails: state.profile.cancelProductDetails,
    loadingForCancelProductDetails:
      state.profile.loadingForCancelProductDetails,
    error: state.profile.cancelProductDetailsError,
    userAddress: state.cart.userAddress,
    orderDetails: state.profile.fetchOrderDetails
  };
};

const CancelOrderContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(cancelOrderForDesktop)
);

export default CancelOrderContainer;
