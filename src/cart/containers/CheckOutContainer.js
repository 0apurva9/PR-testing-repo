import { connect } from "react-redux";
import { withRouter } from "react-router";
import CheckOutPage from "../components/CheckOutPage";
import {
  getCartDetailsCNC,
  addUserAddress,
  addAddressToCart,
  getUserAddress,
  selectDeliveryMode,
  getOrderSummary,
  applyUserCoupon,
  releaseUserCoupon,
  getAllStoresCNC,
  addStoreCNC,
  addPickupPersonCNC,
  softReservation,
  getPaymentModes,
  applyBankOffer,
  releaseBankOffer,
  getNetBankDetails,
  getEmiBankDetails,
  applyCliqCash,
  removeCliqCash,
  binValidation,
  softReservationForPayment,
  updateTransactionDetails,
  getCODEligibility,
  binValidationForCOD,
  updateTransactionDetailsForCOD,
  softReservationForCODPayment,
  captureOrderExperience,
  binValidationForNetBanking,
  softReservationPaymentForNetBanking,
  softReservationPaymentForSavedCard,
  orderConfirmation,
  softReservationForCliqCash,
  jusPayTokenizeForGiftCard,
  createJusPayOrderForGiftCardNetBanking,
  createJusPayOrderForGiftCardFromSavedCards,
  clearCaptureOrderExperience,
  applyUserCouponForAnonymous,
  getEmiEligibility,
  getBankAndTenureDetails,
  getEmiTermsAndConditionsForBank,
  applyNoCostEmi,
  removeNoCostEmi,
  getItemBreakUpDetails,
  getPaymentFailureOrderDetails,
  createJusPayOrderForSavedCards,
  createJusPayOrderForCliqCash,
  clearCartDetails,
  jusPayTokenize,
  createJusPayOrderForNetBanking,
  createJusPayOrder,
  resetIsSoftReservationFailed,
  preventRestingAllPaymentMode,
  getUserAddressAndDeliveryModesByRetryPayment,
  binValidationOfEmiEligible
} from "../actions/cart.actions";
import {
  showSecondaryLoader,
  hideSecondaryLoader
} from "../../general/secondaryLoader.actions";
import {
  showModal,
  BANK_OFFERS,
  GIFT_CARD_MODAL,
  CLIQ_CASH_AND_NO_COST_EMI_POPUP,
  TNC_FOR_BANK_OFFER_POPUP,
  DESKTOP_AUTH
} from "../../general/modal.actions";
import {
  getPinCode,
  getUserDetails,
  getPinCodeSuccess,
  resetAddAddressDetails,
  updateProfile,
  clearPinCodeStatus,
  redeemCliqVoucher,
  retryPayment
} from "../../account/actions/account.actions.js";

import { displayToast } from "../../general/toast.actions";
import { setHeaderText } from "../../general/header.actions.js";
import {
  setDataLayerForCheckoutDirectCalls,
  ADOBE_ADD_NEW_ADDRESS_ON_CHECKOUT_PAGE,
  ADOBE_FINAL_PAYMENT_MODES,
  ADOBE_CALL_FOR_SEE_ALL_BANK_OFFER
} from "../../lib/adobeUtils";
import { setUrlToRedirectToAfterAuth } from "../../auth/actions/auth.actions.js";
import {
  SUCCESS_CAMEL_CASE,
  SUCCESS_UPPERCASE,
  SUCCESS,
  MY_ACCOUNT
} from "../../lib/constants.js";
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getCartDetailsCNC: (
      userId,
      accessToken,
      cartId,
      pinCode,
      isSoftReservation
    ) => {
      dispatch(
        getCartDetailsCNC(
          userId,
          accessToken,
          cartId,
          pinCode,
          isSoftReservation,
          true // this is using to setting data layer for first time when page loads
        )
      );
    },
    getUserAddress: () => {
      dispatch(getUserAddress());
    },
    addUserAddress: (userAddress, getCartDetailCNCObj) => {
      if (userAddress.emailId) {
        let userDetails = {};
        userDetails.emailId = userAddress.emailId;
        dispatch(updateProfile(userDetails)).then(res => {
          if (
            res.status === SUCCESS ||
            res.status === SUCCESS_CAMEL_CASE ||
            res.status === SUCCESS_UPPERCASE
          ) {
            dispatch(addUserAddress(userAddress)).then(() => {
              dispatch(
                getCartDetailsCNC(
                  getCartDetailCNCObj.userId,
                  getCartDetailCNCObj.accessToken,
                  getCartDetailCNCObj.cartId,
                  getCartDetailCNCObj.pinCode,
                  getCartDetailCNCObj.isSoftReservation
                )
              );
            });
          }
        });
      } else {
        dispatch(addUserAddress(userAddress)).then(() => {
          dispatch(
            getCartDetailsCNC(
              getCartDetailCNCObj.userId,
              getCartDetailCNCObj.accessToken,
              getCartDetailCNCObj.cartId,
              getCartDetailCNCObj.pinCode,
              getCartDetailCNCObj.isSoftReservation
            )
          );
        });
      }
    },
    addAddressToCart: (addressId, pinCode) => {
      dispatch(addAddressToCart(addressId, pinCode));
    },
    getOrderSummary: pinCode => {
      dispatch(getOrderSummary(pinCode));
    },

    applyUserCouponForAnonymous: couponCode => {
      dispatch(applyUserCouponForAnonymous(couponCode));
    },
    releaseUserCoupon: () => {
      dispatch(releaseUserCoupon());
    },
    setHeaderText: text => {
      dispatch(setHeaderText(text));
    },
    selectDeliveryMode: (deliveryUssId, pinCode) => {
      dispatch(selectDeliveryMode(deliveryUssId, pinCode));
    },
    getAllStoresCNC: pinCode => {
      dispatch(getAllStoresCNC(pinCode));
    },
    addStoreCNC: (ussId, slaveId) => {
      dispatch(addStoreCNC(ussId, slaveId));
    },
    addPickupPersonCNC: (personMobile, personName) => {
      return dispatch(addPickupPersonCNC(personMobile, personName));
    },
    softReservation: (pinCode, payload) => {
      dispatch(softReservation(pinCode, payload));
    },
    getPaymentModes: guIdDetails => {
      dispatch(getPaymentModes(guIdDetails));
    },
    showCouponModal: data => {
      setDataLayerForCheckoutDirectCalls(ADOBE_CALL_FOR_SEE_ALL_BANK_OFFER);
      dispatch(showModal(BANK_OFFERS, data));
    },
    applyBankOffer: couponCode => {
      return dispatch(applyBankOffer(couponCode));
    },
    releaseBankOffer: couponCode => {
      return dispatch(releaseBankOffer(couponCode));
    },
    getNetBankDetails: () => {
      dispatch(getNetBankDetails());
    },
    getEmiBankDetails: (cartTotalProducts, isFromRetryUrl, retryCartGuid) => {
      dispatch(
        getEmiBankDetails(cartTotalProducts, isFromRetryUrl, retryCartGuid)
      );
    },
    openBankOfferTncModal: () => {
      dispatch(showModal(TNC_FOR_BANK_OFFER_POPUP));
    },
    applyCliqCash: pinCode => {
      dispatch(applyCliqCash(pinCode));
    },
    removeCliqCash: pinCode => {
      dispatch(removeCliqCash(pinCode));
    },
    binValidation: (paymentMode, binNo, cartGuId) => {
      dispatch(binValidation(paymentMode, binNo, cartGuId));
    },
    softReservationForPayment: (cardDetails, address, paymentMode) => {
      dispatch(softReservationForPayment(cardDetails, address, paymentMode));
    },
    updateTransactionDetails: (paymentMode, juspayOrderID, cartId) => {
      dispatch(updateTransactionDetails(paymentMode, juspayOrderID, cartId));
    },
    getCODEligibility: (isPaymentFailed, isFromRetryUrl, retryCartGuid) => {
      dispatch(
        getCODEligibility(isPaymentFailed, isFromRetryUrl, retryCartGuid)
      );
    },
    binValidationForCOD: paymentMode => {
      dispatch(binValidationForCOD(paymentMode));
    },
    updateTransactionDetailsForCOD: (
      paymentMode,
      juspayOrderID,
      isFromRetryUrl,
      retryCartGuid
    ) => {
      dispatch(
        updateTransactionDetailsForCOD(
          paymentMode,
          juspayOrderID,
          isFromRetryUrl,
          retryCartGuid
        )
      );
    },
    softReservationForCODPayment: pinCode => {
      dispatch(softReservationForCODPayment(pinCode));
    },
    captureOrderExperience: async (orderId, Rating) => {
      const response = await dispatch(captureOrderExperience(orderId, Rating));
      if (response.status === SUCCESS) {
        dispatch(displayToast(response.orderExperience.message));
      }
    },
    redeemCliqVoucher: cliqCashDetails => {
      dispatch(redeemCliqVoucher(cliqCashDetails, true));
    },
    binValidationForNetBanking: (paymentMode, binNo) => {
      dispatch(binValidationForNetBanking(paymentMode, binNo));
    },
    softReservationPaymentForNetBanking: (
      paymentMethodType,
      paymentMode,
      bankName,
      pinCode
    ) => {
      dispatch(
        softReservationPaymentForNetBanking(
          paymentMethodType,
          paymentMode,
          bankName,
          pinCode
        )
      );
    },
    softReservationPaymentForSavedCard: (
      cardDetails,
      address,
      paymentMode,
      isPaymentFailed
    ) => {
      dispatch(
        softReservationPaymentForSavedCard(
          cardDetails,
          address,
          paymentMode,
          isPaymentFailed
        )
      );
    },
    softReservationForCliqCash: pinCode => {
      dispatch(softReservationForCliqCash(pinCode));
    },
    jusPayTokenizeForGiftCard: (cardDetails, paymentMode, guId) => {
      dispatch(jusPayTokenizeForGiftCard(cardDetails, paymentMode, guId));
    },
    createJusPayOrder: (
      token,
      cartItem,
      address,
      cardDetails,
      paymentMode,
      isPaymentFailed,
      isFromRetryUrl,
      retryCartGuid
    ) => {
      dispatch(
        createJusPayOrder(
          token,
          cartItem,
          address,
          cardDetails,
          paymentMode,
          isPaymentFailed,
          isFromRetryUrl,
          retryCartGuid
        )
      );
    },
    createJusPayOrderForGiftCardNetBanking: (guId, bankCode) => {
      dispatch(createJusPayOrderForGiftCardNetBanking(guId, bankCode));
    },
    createJusPayOrderForGiftCardFromSavedCards: (cardDetails, guId) => {
      dispatch(createJusPayOrderForGiftCardFromSavedCards(cardDetails, guId));
    },
    addGiftCard: () => {
      dispatch(showModal(GIFT_CARD_MODAL));
    },
    displayToast: message => {
      dispatch(displayToast(message));
    },
    clearCaptureOrderExperience: () => {
      dispatch(clearCaptureOrderExperience());
    },
    showSecondaryLoader: () => {
      dispatch(showSecondaryLoader());
    },
    hideSecondaryLoader: () => {
      dispatch(hideSecondaryLoader());
    },

    getEmiEligibility: cartGuId => {
      dispatch(getEmiEligibility(cartGuId));
    },
    getBankAndTenureDetails: (
      retryFlagForEmiCoupon,
      isFromRetryUrl,
      retryCartGuid
    ) => {
      dispatch(
        getBankAndTenureDetails(
          retryFlagForEmiCoupon,
          isFromRetryUrl,
          retryCartGuid
        )
      );
    },
    getEmiTermsAndConditionsForBank: (code, bankName) => {
      dispatch(getEmiTermsAndConditionsForBank(code, bankName));
    },
    applyNoCostEmi: (couponCode, carGuId, cartId, isFromRetryUrl) => {
      return dispatch(
        applyNoCostEmi(couponCode, carGuId, cartId, isFromRetryUrl)
      );
    },
    removeNoCostEmi: (couponCode, carGuId, cartId) => {
      return dispatch(removeNoCostEmi(couponCode, carGuId, cartId));
    },
    getItemBreakUpDetails: (
      couponCode,
      cartGuId,
      noCostEmiText,
      noCostProductCount
    ) => {
      dispatch(
        getItemBreakUpDetails(
          couponCode,
          cartGuId,
          noCostEmiText,
          noCostProductCount
        )
      );
    },
    getPinCode: pinCode => {
      dispatch(getPinCode(pinCode));
    },

    getUserDetails: () => {
      dispatch(getUserDetails());
    },
    resetAutoPopulateDataForPinCode: () => {
      dispatch(getPinCodeSuccess(null));
    },
    getPaymentFailureOrderDetails: () => {
      dispatch(getPaymentFailureOrderDetails());
    },
    createJusPayOrderForSavedCards: (
      cardDetails,
      cartItem,
      isPaymentFailed,
      isFromRetryUrl,
      retryCartGuid
    ) => {
      dispatch(
        createJusPayOrderForSavedCards(
          cardDetails,
          cartItem,
          isPaymentFailed,
          isFromRetryUrl,
          retryCartGuid
        )
      );
    },
    createJusPayOrderForCliqCash: (pinCode, cartItem, isPaymentFailed) => {
      dispatch(
        createJusPayOrderForCliqCash(pinCode, cartItem, isPaymentFailed)
      );
    },
    clearCartDetails: () => {
      dispatch(clearCartDetails());
    },
    jusPayTokenize: (
      cardDetails,
      address,
      cartItem,
      paymentMode,
      isPaymentFailed,
      isFromRetryUrl,
      retryCartGuid
    ) => {
      dispatch(
        jusPayTokenize(
          cardDetails,
          address,
          cartItem,
          paymentMode,
          isPaymentFailed,
          isFromRetryUrl,
          retryCartGuid
        )
      );
    },
    setUrlToRedirectToAfterAuth: url => {
      dispatch(setUrlToRedirectToAfterAuth(url));
    },
    orderConfirmation: orderId => {
      dispatch(orderConfirmation(orderId));
    },
    createJusPayOrderForNetBanking: (
      paymentMethodType,
      cartItem,
      bankName,
      pinCode,
      isFromRetryUrl,
      retryCartGuid
    ) => {
      dispatch(
        createJusPayOrderForNetBanking(
          paymentMethodType,
          cartItem,
          bankName,
          pinCode,
          isFromRetryUrl,
          retryCartGuid
        )
      );
    },
    resetIsSoftReservationFailed: () => {
      dispatch(resetIsSoftReservationFailed());
    },
    showModalForCliqCashOrNoCostEmi: modalProps => {
      dispatch(showModal(CLIQ_CASH_AND_NO_COST_EMI_POPUP, modalProps));
    },
    resetAddAddressDetails: () => {
      dispatch(resetAddAddressDetails());
    },
    clearPinCodeStatus: () => {
      dispatch(clearPinCodeStatus());
    },
    showAuthPopUp: () => {
      dispatch(showModal(DESKTOP_AUTH));
    },
    preventRestingAllPaymentMode: () => {
      dispatch(preventRestingAllPaymentMode());
    },
    getUserAddressAndDeliveryModesByRetryPayment: async guId => {
      let getUserAddressAndDeliveryModesResponse = await dispatch(
        getUserAddressAndDeliveryModesByRetryPayment(guId)
      );
      if (
        getUserAddressAndDeliveryModesResponse &&
        getUserAddressAndDeliveryModesResponse.getUserAddressAndDeliveryModesByRetryPayment &&
        getUserAddressAndDeliveryModesResponse
          .getUserAddressAndDeliveryModesByRetryPayment.pinCodeResponseList &&
        getUserAddressAndDeliveryModesResponse
          .getUserAddressAndDeliveryModesByRetryPayment
          .pinCodeResponseList[0] &&
        getUserAddressAndDeliveryModesResponse
          .getUserAddressAndDeliveryModesByRetryPayment.products &&
        getUserAddressAndDeliveryModesResponse.status === SUCCESS
      ) {
        let selectedDeliveryMode =
          getUserAddressAndDeliveryModesResponse
            .getUserAddressAndDeliveryModesByRetryPayment.products[0] &&
          getUserAddressAndDeliveryModesResponse
            .getUserAddressAndDeliveryModesByRetryPayment.products[0]
            .selectedDeliveryModeCode;
        let validDeliveryModes =
          getUserAddressAndDeliveryModesResponse
            .getUserAddressAndDeliveryModesByRetryPayment.pinCodeResponseList[0]
            .validDeliveryModes &&
          getUserAddressAndDeliveryModesResponse.getUserAddressAndDeliveryModesByRetryPayment.pinCodeResponseList[0].validDeliveryModes.find(
            validDeliveryModesObject => {
              return validDeliveryModesObject.type === selectedDeliveryMode;
            }
          );
        if (
          getUserAddressAndDeliveryModesResponse
            .getUserAddressAndDeliveryModesByRetryPayment.pinCodeResponseList[0]
            .isServicable === "N"
        ) {
          dispatch(
            displayToast(
              "Unfortunately, we can't currently fulfil this order.We apologise for the inconvenience caused to you."
            )
          );
          ownProps.history.push(MY_ACCOUNT);
        } else if (!validDeliveryModes) {
          dispatch(
            displayToast(
              "We're sorry, we don't service this PIN code right now"
            )
          );
          ownProps.history.push(MY_ACCOUNT);
        }
      }
    },
    retryPayment: async (retryPaymentGuId, retryPaymentUserId) => {
      let retryPaymentResponse = await dispatch(
        retryPayment(retryPaymentGuId, retryPaymentUserId)
      );
      if (retryPaymentResponse.status === "Failure") {
        dispatch(
          displayToast(
            "Unfortunately, we can't currently fulfil this order.We apologise for the inconvenience caused to you."
          )
        );
        ownProps.history.push(MY_ACCOUNT);
      }
    },
    binValidationOfEmiEligible: binNo => {
      return dispatch(binValidationOfEmiEligible(binNo));
    }
  };
};
const mapStateToProps = state => {
  return {
    cart: state.cart,
    getPinCodeDetails: state.profile.getPinCodeDetails,
    userDetails: state.profile.userDetails,
    getPincodeStatus: state.profile.getPinCodeStatus,
    addUserAddressStatus: state.profile.addUserAddressStatus,
    loading: state.profile.loading,
    retryPaymentDetails: state.profile.retryPaymentDetails,
    retryPaymentDetailsStatus: state.profile.retryPaymentDetailsStatus
  };
};

const CheckoutAddressContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CheckOutPage)
);
export default CheckoutAddressContainer;
