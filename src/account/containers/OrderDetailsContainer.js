import { connect } from "react-redux";
import {
  fetchOrderDetails,
  sendInvoice,
  fetchOrderItemDetails,
  retryPayment
} from "../actions/account.actions";
import { withRouter } from "react-router-dom";
import OrderDetails from "../components/OrderDetails";
import { displayToast } from "../../general/toast.actions";
import { setHeaderText } from "../../general/header.actions";
import {
  UPDATE_REFUND_DETAILS_POPUP,
  ORDER_DETAILS_MODAL,
  showModal,
  SHOW_RETURN_CONFIRM_POP_UP,
  DESKTOP_AUTH,
  SHOW_DELIVERY_CONFIRM_POP_UP,
  RATING_REVIEW_MODAL_V2,
} from "../../general/modal.actions";
import {
  showSecondaryLoader,
  hideSecondaryLoader
} from "../../general/secondaryLoader.actions";
import { setUrlToRedirectToAfterAuth } from "../../auth/actions/auth.actions.js";
import {
	getParametersEligibleToRate,
	getTitleSuggestions,
} from "../../pdp/actions/pdp.actions";

const mapDispatchToProps = dispatch => {
  return {
    fetchOrderDetails: (orderId, pageName) => {
      dispatch(fetchOrderDetails(orderId, pageName));
    },
    displayToast: toastMessage => {
      dispatch(displayToast(toastMessage));
    },
    fetchOrderItemDetails: (orderId, transactionId) => {
      dispatch(fetchOrderItemDetails(orderId, transactionId));
    },
    setHeaderText: text => {
      dispatch(setHeaderText(text));
    },
    sendInvoice: (ussid, sellerOrderNo) => {
      dispatch(sendInvoice(ussid, sellerOrderNo));
    },
    showModal: orderDetails => {
      dispatch(showModal(UPDATE_REFUND_DETAILS_POPUP, orderDetails));
    },
    showSecondaryLoader: () => {
      dispatch(showSecondaryLoader());
    },
    hideSecondaryLoader: () => {
      dispatch(hideSecondaryLoader());
    },
    setUrlToRedirectToAfterAuth: url => {
      dispatch(setUrlToRedirectToAfterAuth(url));
    },
    showShippingDetails: data => {
      dispatch(showModal(ORDER_DETAILS_MODAL, data));
    },

    showAuthPopUp: () => {
      dispatch(showModal(DESKTOP_AUTH));
    },
    showReturnModal: data => {
      dispatch(showModal(SHOW_RETURN_CONFIRM_POP_UP, data));
    },
    retryPayment: (retryPaymentGuId, retryPaymentUserId) => {
      return dispatch(retryPayment(retryPaymentGuId, retryPaymentUserId));
    },
    showDeliveryConfirmModal: data => {
      dispatch(showModal(SHOW_DELIVERY_CONFIRM_POP_UP, data));
    },
	openRatingReviewModal: data => {
		dispatch(showModal(RATING_REVIEW_MODAL_V2, data));
	},
	getParametersEligibleToRate: productCode => {
		dispatch(getParametersEligibleToRate(productCode));
	},
	getTitleSuggestions: (productCode, rating) => {
		dispatch(getTitleSuggestions(productCode, rating));
	},
  };
};
const mapStateToProps = state => {
  return {
    orderDetails: state.profile.fetchOrderDetails,
    loadingForFetchOrderDetails: state.profile.loadingForFetchOrderDetails,
    sendInvoiceSatus: state.profile.sendInvoiceStatus,
    userAddress: state.profile.userAddress
  };
};

const OrderDetailsContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OrderDetails)
);

export default OrderDetailsContainer;
