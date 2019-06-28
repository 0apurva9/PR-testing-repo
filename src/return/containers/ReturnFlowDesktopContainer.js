import { withRouter } from "react-router-dom";
import {
  getReturnRequest,
  returnProductDetails,
  getReturnReasonsWithProductDetails,
  uploadProductImages,
  getRefundOptionsData,
  getRefundModes,
  updateRefundMode,
  getCliqCashDetails,
  getCliqCashDetailsRefund,
  getCustomerBankDetails,
  updateCustomerBankDetails,
  getReturnModes,
  updateReturnConfirmation
} from "../../account/actions/account.actions.js";
import { connect } from "react-redux";
import { setHeaderText } from "../../general/header.actions";
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
      dispatch(getReturnReasonsWithProductDetails(productDetails));
    },
    showSecondaryLoader: () => {
      dispatch(showSecondaryLoader());
    },
    hideSecondaryLoader: () => {
      dispatch(hideSecondaryLoader());
    },
    uploadProductImages: (orderId, transactionId, file) => {
      dispatch(uploadProductImages(orderId, transactionId, file));
    },
    setHeaderText: text => {
      dispatch(setHeaderText(text));
    },
    getRefundOptionsData: (
      orderId,
      transactionId,
      returnReasonCode,
      returnSubReasonCode,
      comments,
      uploadedImageURLs,
      reverseSealAvailability
    ) => {
      dispatch(
        getRefundOptionsData(
          orderId,
          transactionId,
          returnReasonCode,
          returnSubReasonCode,
          comments,
          uploadedImageURLs,
          reverseSealAvailability
        )
      );
    },
    getRefundModes: (orderId, transactionId, returnId, typeOfReturn) => {
      dispatch(getRefundModes(orderId, transactionId, returnId, typeOfReturn));
    },
    updateRefundMode: async (orderId, transactionId, returnId, refundMode) => {
      return await dispatch(
        updateRefundMode(orderId, transactionId, returnId, refundMode)
      );
    },
    getCliqCashDetails: async () => {
      return await dispatch(getCliqCashDetails());
    },
    getCliqCashDetailsRefund: async () => {
      return await dispatch(getCliqCashDetailsRefund());
    },
    getCustomerBankDetails: async () => {
      return await dispatch(getCustomerBankDetails());
    },
    getUserAddress: () => {
      dispatch(getUserAddress(true));
    },
    updateCustomerBankDetails: async bankDetails => {
      return await dispatch(updateCustomerBankDetails(bankDetails));
    },
    getReturnModes: async (orderId, transactionId, returnId, typeOfReturn) => {
      return await dispatch(
        getReturnModes(orderId, transactionId, returnId, typeOfReturn)
      );
    },
    updateReturnConfirmation: async (
      orderId,
      transactionId,
      returnId,
      returnFullfillmentType,
      returnStore,
      returnAddress,
      modeOfReturn
    ) => {
      return await dispatch(
        updateReturnConfirmation(
          orderId,
          transactionId,
          returnId,
          returnFullfillmentType,
          returnStore,
          returnAddress,
          modeOfReturn
        )
      );
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
    userAddress: state.cart.userAddress,
    getRefundOptionsDetails: state.profile.getRefundOptionsDetails,
    getRefundModesDetails: state.profile.getRefundModesDetails
  };
};

const ReturnFlowDesktopContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ReturnFlowDesktop)
);

export default ReturnFlowDesktopContainer;
