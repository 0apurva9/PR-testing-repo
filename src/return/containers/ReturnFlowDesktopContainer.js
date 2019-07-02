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
  updateReturnConfirmation,
  getRefundTransactionSummary,
  removeAddress,
  resetAddAddressDetails,
  getPinCode,
  getPinCodeSuccess,
  getUserDetails,
  updateProfile,
  clearPinCodeStatus
} from "../../account/actions/account.actions.js";
import {
  SUCCESS_CAMEL_CASE,
  SUCCESS,
  SUCCESS_UPPERCASE
} from "../../lib/constants";
import { connect } from "react-redux";
import { setHeaderText } from "../../general/header.actions";
import {
  getUserAddress,
  addUserAddress,
  addAddressToCart
} from "../../cart/actions/cart.actions";
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
    removeAddress: addressId => {
      dispatch(removeAddress(addressId));
    },
    resetAddAddressDetails: () => {
      dispatch(resetAddAddressDetails());
    },
    updateCustomerBankDetails: async bankDetails => {
      return await dispatch(updateCustomerBankDetails(bankDetails));
    },
    getReturnModes: async (orderId, transactionId, returnId, typeOfReturn) => {
      return await dispatch(
        getReturnModes(orderId, transactionId, returnId, typeOfReturn)
      );
    },
    getUserAddress: () => {
      dispatch(getUserAddress());
    },
    addUserAddress: addressDetails => {
      if (addressDetails.emailId && addressDetails.emailId !== "") {
        let userDetails = {};
        userDetails.emailId = addressDetails.emailId;
        dispatch(updateProfile(userDetails)).then(res => {
          if (
            res.status === SUCCESS ||
            res.status === SUCCESS_CAMEL_CASE ||
            res.status === SUCCESS_UPPERCASE
          ) {
            dispatch(addUserAddress(addressDetails));
          }
        });
      } else {
        dispatch(addUserAddress(addressDetails));
      }
    },
    getUserDetails: () => {
      dispatch(getUserDetails());
    },
    addAddressToCart: addressId => {
      dispatch(addAddressToCart(addressId));
    },
    clearPinCodeStatus: () => {
      dispatch(clearPinCodeStatus());
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
    },
    getRefundTransactionSummary: async (orderId, transactionId, returnId) => {
      return await dispatch(
        getRefundTransactionSummary(orderId, transactionId, returnId)
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
    getRefundModesDetails: state.profile.getRefundModesDetails,
    removeAddressStatus: state.profile.removeAddressStatus
  };
};

const ReturnFlowDesktopContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ReturnFlowDesktop)
);

export default ReturnFlowDesktopContainer;
