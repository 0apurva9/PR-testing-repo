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
  orderConfirmationBanner,
  softReservationForCliqCash,
  jusPayTokenizeForGiftCard,
  createJusPayOrderForGiftCardNetBanking,
  createJusPayOrderForGiftCardFromSavedCards,
  clearCaptureOrderExperience,
  applyUserCouponForAnonymous,
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
  binValidationOfEmiEligible,
  getPrepaidOrderPaymentConfirmation,
  createPaymentOrder,
  collectPaymentOrder,
  stripeTokenize,
  stripe_juspay_Tokenize,
  stripe_juspay_TokenizeGiftCard,
  getMinicartProducts,
  collectPaymentOrderForGiftCardNetBanking,
  collectPaymentOrderForNetBanking,
  collectPaymentOrderForSavedCards,
  collectPaymentOrderForGiftCardFromSavedCards,
  collectPaymentOrderForCliqCash,
  checkUPIEligibility,
  binValidationForUPI,
  collectPaymentOrderForUPI,
  collectPaymentOrderForGiftCardUPI,
  createJusPayOrderForUPI,
  upiPaymentIsNewMidddleLayer,
  upiPaymentISEnableMidddleLayer,
  softReservationPaymentForUPI,
  upiPaymentHowItWorksMidddleLayer,
  upiPaymentCombinedLogoMidddleLayer,
  instaCredISEnableMidddleLayer,
  getBankDetailsforDCEmi,
  getEMIEligibilityDetails,
  getDCEmiEligibility,
  submitAppliancesExchangeData,
  mdeFraudCheck
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
  DESKTOP_AUTH,
  CONFIRMATION_NOTIFICATION,
  UPITERMSANDCONDITION_MODAL,
  CHANGE_EXCHANGE_CASHBACK_MODAL,
  EXCHANGE_CASHBACK_INFO_MODAL,
  hideModal,
  CLIQ_CASH_MODULE,
  POP_UP,
  CASHBACK_DETAILS_POPUP
  // UPIHOWTOPAY_MODAL
} from "../../general/modal.actions";
import {
  getPinCode,
  getUserDetails,
  getPinCodeSuccess,
  resetAddAddressDetails,
  updateProfile,
  clearPinCodeStatus,
  redeemCliqVoucher,
  retryPayment,
  fetchOrderDetails,
  resetFailedOrderDetails,
  addUPIDetails,
  addUPIDetailsNullState
} from "../../account/actions/account.actions.js";

import { displayToast } from "../../general/toast.actions";
import { setHeaderText } from "../../general/header.actions.js";
import {
  setDataLayerForCheckoutDirectCalls,
  ADOBE_CALL_FOR_SEE_ALL_BANK_OFFER
} from "../../lib/adobeUtils";
import { setUrlToRedirectToAfterAuth } from "../../auth/actions/auth.actions.js";
import {
  SUCCESS_CAMEL_CASE,
  SUCCESS_UPPERCASE,
  SUCCESS,
  MY_ACCOUNT
} from "../../lib/constants.js";
import { getAllStoresForCliqAndPiq } from "../../pdp/actions/pdp.actions";
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
    showTermsNConditions: data => {
      dispatch(showModal(UPITERMSANDCONDITION_MODAL, data));
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
    addAddressToCart: async (addressId, pinCode, isComingFromCliqAndPiq) => {
      let addAddressToCartResponse = await dispatch(
        addAddressToCart(addressId, pinCode, isComingFromCliqAndPiq)
      );
      // if (addAddressToCartResponse.status === SUCCESS) {
      //   dispatch(
      //     getAllStoresForCliqAndPiq(pinCode, isComingFromCliqAndPiq, true)
      //   );
      // }
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
    getEmiBankDetails: cartTotalProducts => {
      dispatch(getEmiBankDetails(cartTotalProducts));
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
    binValidation: (paymentMode, binNo, isFromRetryUrl, retryCartGuid) => {
      dispatch(
        binValidation(paymentMode, binNo, isFromRetryUrl, retryCartGuid)
      );
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
    binValidationForCOD: (paymentMode, isFromRetryUrl, retryCartGuid) => {
      dispatch(binValidationForCOD(paymentMode, isFromRetryUrl, retryCartGuid));
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
    binValidationForNetBanking: (
      paymentMode,
      binNo,
      isFromRetryUrl,
      retryCartGuid
    ) => {
      dispatch(
        binValidationForNetBanking(
          paymentMode,
          binNo,
          isFromRetryUrl,
          retryCartGuid
        )
      );
    },
    softReservationPaymentForNetBanking: (
      paymentMethodType,
      paymentMode,
      bankCode,
      pinCode,
      bankName
    ) => {
      dispatch(
        softReservationPaymentForNetBanking(
          paymentMethodType,
          paymentMode,
          bankCode,
          pinCode,
          bankName
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
    createJusPayOrderForGiftCardNetBanking: (guId, bankCode, bankName) => {
      dispatch(
        createJusPayOrderForGiftCardNetBanking(guId, bankCode, bankName)
      );
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
    getBankAndTenureDetails: (
      retryFlagForEmiCoupon,
      isFromRetryUrl,
      retryCartGuid,
      isFromDebitCard
    ) => {
      dispatch(
        getBankAndTenureDetails(
          retryFlagForEmiCoupon,
          isFromRetryUrl,
          retryCartGuid,
          isFromDebitCard
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
      noCostProductCount,
      emiInfo
    ) => {
      dispatch(
        getItemBreakUpDetails(
          couponCode,
          cartGuId,
          noCostEmiText,
          noCostProductCount,
          emiInfo
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
    orderConfirmationBanner: async () => {
      return await dispatch(orderConfirmationBanner());
    },
    createJusPayOrderForNetBanking: (
      paymentMethodType,
      cartItem,
      bankCode,
      pinCode,
      isFromRetryUrl,
      retryCartGuid,
      bankName
    ) => {
      dispatch(
        createJusPayOrderForNetBanking(
          paymentMethodType,
          cartItem,
          bankCode,
          pinCode,
          isFromRetryUrl,
          retryCartGuid,
          bankName
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
    },
    whatsappNotification: orderId => {
      dispatch(showModal(CONFIRMATION_NOTIFICATION, orderId));
    },
    getPrepaidOrderPaymentConfirmation: stripeDetails => {
      dispatch(getPrepaidOrderPaymentConfirmation(stripeDetails));
    },
    stripe_juspay_Tokenize: (
      cardDetails,
      address,
      cartItems,
      paymentMode,
      isSaveCard,
      orderDetails,
      isPaymentFailed,
      isFromRetryUrl,
      retryCartGuid
    ) => {
      dispatch(
        stripe_juspay_Tokenize(
          cardDetails,
          address,
          cartItems,
          paymentMode,
          isSaveCard,
          orderDetails,
          isPaymentFailed,
          isFromRetryUrl,
          retryCartGuid
        )
      );
    },
    stripe_juspay_TokenizeGiftCard: (cardDetails, paymentMode, egvCartGuid) => {
      dispatch(
        stripe_juspay_TokenizeGiftCard(cardDetails, paymentMode, egvCartGuid)
      );
    },
    createPaymentOrder: guId => {
      dispatch(createPaymentOrder(guId));
    },
    collectPaymentOrder: (
      cardDetails,
      address,
      cartItems,
      isPaymentFailed,
      isSaveCard,
      cartdetails,
      isFromRetryUrl,
      retryCartGuid
    ) => {
      dispatch(
        collectPaymentOrder(
          cardDetails,
          address,
          cartItems,
          isPaymentFailed,
          isSaveCard,
          cartdetails,
          isFromRetryUrl,
          retryCartGuid
        )
      );
    },
    stripeTokenize: (
      cardDetails,
      address,
      cartItem,
      paymentMode,
      isPaymentFailed
    ) => {
      dispatch(
        stripeTokenize(
          cardDetails,
          address,
          cartItem,
          paymentMode,
          isPaymentFailed
        )
      );
    },
    getMinicartProducts: () => {
      dispatch(getMinicartProducts());
    },
    collectPaymentOrderForGiftCardNetBanking: (guId, bankCode, bankName) => {
      dispatch(
        collectPaymentOrderForGiftCardNetBanking(guId, bankCode, bankName)
      );
    },
    collectPaymentOrderForGiftCardFromSavedCards: (cardDetails, guId) => {
      dispatch(collectPaymentOrderForGiftCardFromSavedCards(cardDetails, guId));
    },
    collectPaymentOrderForSavedCards: (
      cardDetails,
      cartItem,
      isPaymentFailed,
      isFromRetryUrl,
      retryCartGuid
    ) => {
      dispatch(
        collectPaymentOrderForSavedCards(
          cardDetails,
          cartItem,
          isPaymentFailed,
          isFromRetryUrl,
          retryCartGuid
        )
      );
    },
    collectPaymentOrderForNetBanking: (
      paymentMethodType,
      cartItem,
      bankCode,
      pinCode,
      isFromRetryUrl,
      retryCartGuid,
      bankName,
      isPaymentFailed
    ) => {
      dispatch(
        collectPaymentOrderForNetBanking(
          paymentMethodType,
          cartItem,
          bankCode,
          pinCode,
          isFromRetryUrl,
          retryCartGuid,
          bankName,
          isPaymentFailed
        )
      );
    },
    collectPaymentOrderForCliqCash: (pinCode, cartItem, isPaymentFailed) => {
      dispatch(
        collectPaymentOrderForCliqCash(pinCode, cartItem, isPaymentFailed)
      );
    },
    fetchOrderDetails: async (orderId, pageName) => {
      await dispatch(fetchOrderDetails(orderId, pageName));
    },
    resetFailedOrderDetails: () => {
      dispatch(resetFailedOrderDetails());
    },
    addUPIDetails: async (upiId, pageType, btnType) => {
      const res = await dispatch(addUPIDetails(upiId, pageType, btnType));
      return res;
    },
    addUPIDetailsNullState: () => {
      dispatch(addUPIDetailsNullState());
    },
    checkUPIEligibility: async guIdDetails => {
      return await dispatch(checkUPIEligibility(guIdDetails));
    },
    binValidationForUPI: async (paymentMode, isFromRetryUrl, retryCartGuid) => {
      return await dispatch(
        binValidationForUPI(paymentMode, isFromRetryUrl, retryCartGuid)
      );
    },
    collectPaymentOrderForUPI: (
      paymentMethodType,
      cartItem,
      bankCode,
      pinCode,
      isFromRetryUrl,
      retryCartGuid,
      bankName,
      isPaymentFailed
    ) => {
      dispatch(
        collectPaymentOrderForUPI(
          paymentMethodType,
          cartItem,
          bankCode,
          pinCode,
          isFromRetryUrl,
          retryCartGuid,
          bankName,
          isPaymentFailed
        )
      );
    },
    collectPaymentOrderForGiftCardUPI: (guId, bankCode, bankName) => {
      dispatch(collectPaymentOrderForGiftCardUPI(guId, bankCode, bankName));
    },
    createJusPayOrderForUPI: (
      cardDetails,
      cartItem,
      isPaymentFailed,
      isFromRetryUrl,
      retryCartGuid
    ) => {
      dispatch(
        createJusPayOrderForUPI(
          cardDetails,
          cartItem,
          isPaymentFailed,
          isFromRetryUrl,
          retryCartGuid
        )
      );
    },
    upiPaymentIsNewMidddleLayer: () => {
      dispatch(upiPaymentIsNewMidddleLayer());
    },
    upiPaymentISEnableMidddleLayer: () => {
      dispatch(upiPaymentISEnableMidddleLayer());
    },
    upiPaymentHowItWorksMidddleLayer: () => {
      dispatch(upiPaymentHowItWorksMidddleLayer());
    },
    upiPaymentCombinedLogoMidddleLayer: () => {
      dispatch(upiPaymentCombinedLogoMidddleLayer());
    },
    instaCredISEnableMidddleLayer: () => {
      dispatch(instaCredISEnableMidddleLayer());
    },
    getEMIEligibilityDetails: async cartGuId => {
      return await dispatch(getEMIEligibilityDetails(cartGuId));
    },
    getBankDetailsforDCEmi: (price, cartGuid) => {
      dispatch(getBankDetailsforDCEmi(price, cartGuid));
    },
    hideModal: () => {
      dispatch(hideModal(CLIQ_CASH_MODULE));
    },

    softReservationPaymentForUPI: (
      paymentMethodType,
      paymentMode,
      bankCode,
      pinCode,
      bankName
    ) => {
      dispatch(
        softReservationPaymentForUPI(
          paymentMethodType,
          paymentMode,
          bankCode,
          pinCode,
          bankName
        )
      );
    },
    showChangeExchangeCashabackModal: data => {
      dispatch(showModal(CHANGE_EXCHANGE_CASHBACK_MODAL, data));
    },
    showAddNewPinPop: data => {
      dispatch(showModal(CASHBACK_DETAILS_POPUP, data));
    },
    closeModal: () => {
      dispatch(hideModal());
    },
    submitAppliancesExchangeData: (orderId, status, removeLocalStorage) => {
      dispatch(
        submitAppliancesExchangeData(orderId, status, removeLocalStorage)
      );
    },
    mdeFraudCheck: () => {
      dispatch(mdeFraudCheck());
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
    retryPaymentDetailsStatus: state.profile.retryPaymentDetailsStatus,
    binValidationStatus: state.cart.binValidationStatus,
    addUserUPIStatus: state.profile.addUserUPIStatus,
    addUserUPIDetails: state.profile.addUserUPIDetails,
    completedOrderDetails: state.profile.fetchOrderDetails,
    orderDetailsPaymentPage: state.profile.fetchOrderDetails,
    emiEligibiltyDetails: state.cart.emiEligibiltyDetails,
    dCEmiEligibiltyDetails: state.cart.dCEmiEligibiltyDetails,
    appliancesExchangePincodeDetails:
      state.productDescription.appliancesExchangeCheckPincodeDetails,
    mdeFraudCheckError: state.cart.mdeFraudCheckError
  };
};

const CheckoutAddressContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CheckOutPage)
);
export default CheckoutAddressContainer;
