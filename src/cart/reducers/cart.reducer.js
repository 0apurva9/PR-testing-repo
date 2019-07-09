import * as cartActions from "../actions/cart.actions";
import cloneDeep from "lodash.clonedeep";
import * as Cookies from "../../lib/Cookie";
import { CLEAR_ERROR } from "../../general/error.actions.js";
import {
  CART_DETAILS_FOR_LOGGED_IN_USER,
  CART_DETAILS_FOR_ANONYMOUS,
  OLD_CART_GU_ID,
  COUPON_COOKIE,
  NO_COST_EMI_COUPON,
  OLD_CART_CART_ID,
  CART_BAG_DETAILS,
  CLIQ_CASH_APPLIED_LOCAL_STORAGE,
  EMI_TENURE,
  STRIPE_DETAILS,
  CART_COUNT_FOR_LOGGED_IN_USER,
  BANK_COUPON_COOKIE
} from "../../lib/constants";
export const EGV_GIFT_CART_ID = "giftCartId";
export const RETRY_PAYMENT_DETAILS = "retryPaymentDetails";
export const RETRY_PAYMENT_CART_ID = "retryPaymentCartId";
const VALIDITY_OF_OLD_CART_ID = 15;
const cart = (
  state = {
    status: null,
    error: null,
    loading: false,
    type: null,
    cartIdForLoggedInUserStatus: null,
    cartIdForAnonymousUserStatus: null,
    mergeCartIdStatus: null,

    getUserAddressStatus: null,
    getUserAddressError: null,

    userCart: null,
    userCartStatus: null,
    userCartError: null,

    cartDetails: null,
    cartDetailsStatus: null,
    cartDetailsError: null,
    loadingForCartDetail: false,

    cartDetailsCNC: null,
    cartDetailsCNCStatus: null,
    cartDetailsCNCError: null,
    cartDetailsCNCLoader: false,

    eddDetails: null,
    eddDetailsStatus: null,
    eddDetailsError: null,
    loadingForEddDetails: false,

    couponStatus: null,
    couponError: null,
    coupons: null,
    loadingForDisplayCoupon: false,

    deliveryModes: null,
    userAddress: null,
    setAddress: null,

    netBankDetailsStatus: null,
    netBankDetailsError: null,
    netBankDetails: null,

    emiBankDetails: null,
    emiBankStatus: null,

    orderSummary: null,
    orderSummaryStatus: null,
    orderSummaryError: null,

    storeDetails: [],
    storeStatus: null,
    storeError: null,
    storeAdded: null,

    softReserve: null,
    softReserveStatus: null,
    softReserveError: null,

    createPaymentOrder: null,
    createPaymentOrderStatus: null,
    createPaymentOrderError: null,

    collectPaymentOrder: null,
    collectPaymentOrderStatus: null,
    collectPaymentOrderError: null,

    getPrepaidOrderPaymentConfirmation: null,
    getPrepaidOrderPaymentConfirmationStatus: null,
    getPrepaidOrderPaymentConfirmationError: null,

    paymentModes: null,
    paymentModesStatus: null,
    paymentModesError: null,

    bankOffer: null,
    bankOfferStatus: null,
    bankOfferError: null,

    cliqCashPaymentStatus: null,
    cliqCashPaymentStatusError: null,
    cliqCashPaymentDetails: null,

    jusPayStatus: null,
    jusPayError: null,
    jusPayDetails: null,
    cliqCashJusPayDetails: null,
    createJusPayStatus: null,
    createJusPayError: null,

    transactionDetailsStatus: null,
    transactionDetailsError: null,
    transactionDetailsDetails: null,

    orderConfirmationDetailsStatus: null,
    orderConfirmationDetailsError: null,
    orderConfirmationDetails: null,

    justPayPaymentDetailsStatus: null,
    justPayPaymentDetailsError: null,
    justPayPaymentDetails: null,

    codEligibilityStatus: null,
    codEligibilityError: null,
    codEligibilityDetails: null,

    binValidationCODStatus: null,
    binValidationCODError: null,
    binValidationCODDetails: null,

    transactionCODStatus: null,
    transactionCODError: null,

    softReserveCODPaymentStatus: null,
    softReserveCODPayment: null,
    softReserveCODPaymentError: null,
    orderExperienceStatus: null,
    orderExperience: null,
    orderExperienceError: null,

    binValidationStatus: null,
    binValidationError: null,
    binValidationDetails: null,

    removeCartItemStatus: null,
    removeCartItemError: null,

    removeCartItemLoggedOutStatus: null,
    removeCartItemLoggedOutError: null,

    updateQuantityLoggedInStatus: null,
    updateQuantityLoggedInDetails: null,
    updateQuantityLoggedInError: null,

    updateQuantityLoggedOutStatus: null,
    updateQuantityLoggedOutDetails: null,
    updateQuantityLoggedOutError: null,

    AddUserAddressStatus: null,
    AddUserAddressError: null,
    addingAddress: false,
    returnCliqPiqStatus: null,
    returnCliqPiqDetails: null,
    returnCliqPiqError: null,

    softReservationForPaymentStatus: null,
    softReservationForPaymentError: null,
    softReservationForPaymentDetails: null,

    jusPayTokenizeStatus: null,
    jusPayTokenizeError: null,
    jusPayTokenizeDetails: null,

    stripeTokenizeStatus: null,
    stripeTokenizeError: null,
    stripeTokenizeDetails: null,

    createJusPayOrderStatus: null,
    createJusPayOrderError: null,
    createJusPayOrderDetails: null,
    jusPaymentLoader: false,
    stripePaymentLoader: false,
    selectDeliveryModeLoader: false,
    transactionStatus: null,
    loginFromMyBag: false,

    emiEligibilityStatus: null,
    emiEligibilityDetails: null,
    emiEligibilityError: null,

    bankAndTenureStatus: null,
    bankAndTenureDetails: null,
    bankAndTenureError: null,

    emiTermsAndConditionStatus: null,
    emiTermsAndConditionDetails: null,
    emiTermsAndConditionError: null,

    noCostEmiStatus: null,
    noCostEmiDetails: null,
    noCostEmiError: null,

    emiItemBreakUpStatus: null,
    emiItemBreakUpDetails: null,
    emiItemBreakUpError: null,

    paymentFailureOrderDetailsStatus: null,
    paymentFailureOrderDetailsError: null,
    paymentFailureOrderDetails: null,

    isCreatePaymentOrderFailed: false,
    isCollectPaymentOrderFailed: false,
    isGetPrepaidOrderPaymentConfirmationFailed: false,
    isSoftReservationFailed: false,
    isPaymentProceeded: false,
    bankOfferTncDetails: null,
    bankOfferTncStatus: null,
    bankOfferTncError: null,
    loadingForBankOfferTNC: false,

    tempCartIdForLoggedInUserStatus: null,
    tempCartIdForLoggedInUser: null,
    tempCartIdForLoggedInUserError: null,
    tempCartIdForLoggedInUserLoading: null,

    mergeTempCartWithOldCartStatus: null,
    mergeTempCartWithOldCart: null,
    mergeTempCartWithOldCartError: null,
    mergeTempCartWithOldCartLoading: null,
    resetAllPaymentModeFlag: false,

    feedBackDetails: null,
    feedBackDetailsStatus: null,
    feedBackDetailsError: null,
    loadingForfeedBackDetails: false,

    feedBackSent: null,
    feedBackSentStatus: null,
    feedBackSentError: null,
    loadingForfeedBackSent: false,

    getUserAddressAndDeliveryModesByRetryPaymentStatus: null,
    getUserAddressAndDeliveryModesByRetryPayment: null,
    loadingForGetUserAddressAndDeliveryModesByRetryPayment: false,
    getUserAddressAndDeliveryModesByRetryPaymentError: null,

    binValidationOfEmiEligibleStatus: null,
    binValidationOfEmiEligible: null,
    loadingForBinValidationOfEmiEligible: false,
    binValidationOfEmiEligibleError: null,

    cartCountStatus: null,
    cartCountError: null,
    cartCount: null,

    minicartStatus: null,
    minicartError: null,
    minicart: null
  },
  action
) => {
  let updatedCartDetailsCNC, cloneCartDetailCNC, cartDetails;
  switch (action.type) {
    case CLEAR_ERROR:
      return Object.assign({}, state, {
        userCartError: null,
        cartDetailsError: null,
        cartDetailsCNCError: null,
        couponError: null,
        emiBankError: null,
        softReserveError: null,
        createPaymentOrderError: null,
        collectPaymentOrderError: null,
        getPrepaidOrderPaymentConfirmationError: null,
        paymentsModeError: null,
        bankOfferError: null,
        cliqCashPaymentStatusError: null,
        jusPayError: null,
        transactionDetailsError: null,
        orderConfirmationDetailsError: null,
        jusPayPaymentDetailsError: null,
        codEligibilityError: null,
        binValidationCODError: null,
        updateQuantityLoggedInError: null,
        updateQuantityLoggedOutError: null,
        returnCliqPiqError: null,
        AddUserAddressError: null,
        softReservationForPaymentError: null,
        jusPayTokenizeError: null,
        stripeTokenizeError: null,
        createJusPayOrderError: null,
        transactionCODError: null,
        orderSummaryError: null,
        storeError: null,
        paymentModesError: null,
        justPayPaymentDetailsError: null,
        orderExperienceError: null,
        binValidationError: null,
        removeCartItemError: null,
        removeCartItemLoggedOutError: null,
        getUserAddressError: null,
        emiEligibilityError: null,
        bankAndTenureError: null,
        emiTermsAndConditionError: null,
        noCostEmiError: null,
        emiItemBreakUpError: null,
        cartCountError: null,
        minicartError: null
      });
    case cartActions.CART_DETAILS_REQUEST:
      return Object.assign({}, state, {
        cartDetailsStatus: action.status,
        cartDetailsError: null,
        loading: true,
        loadingForCartDetail: true
      });

    case cartActions.CART_DETAILS_SUCCESS:
      if (action.cartDetails && action.cartDetails.appliedCoupon) {
        Cookies.createCookie(COUPON_COOKIE, action.cartDetails.appliedCoupon);
      } else {
        Cookies.deleteCookie(COUPON_COOKIE);
      }

      return Object.assign({}, state, {
        cartDetailsStatus: action.status,
        cartDetails: action.cartDetails,
        cartDetailsError: null,
        loading: false,
        loadingForCartDetail: false
      });

    case cartActions.CART_DETAILS_FAILURE:
      return Object.assign({}, state, {
        cartDetailsStatus: action.status,
        cartDetailsError: action.error,
        loading: false,
        loadingForCartDetail: false
      });

    case cartActions.APPLY_USER_COUPON_REQUEST:
      return Object.assign({}, state, {
        couponStatus: action.status,
        loading: true
      });

    case cartActions.APPLY_USER_COUPON_SUCCESS:
      Cookies.createCookie(COUPON_COOKIE, action.couponCode);

      let carDetailsCopy = cloneDeep(state.cartDetails);
      let cartAmount = action.couponResult.cartAmount;
      carDetailsCopy.cartAmount = cartAmount;
      carDetailsCopy.appliedCoupon = action.couponCode;
      return Object.assign({}, state, {
        couponStatus: action.status,
        cartDetails: carDetailsCopy,
        loading: false
      });

    case cartActions.APPLY_USER_COUPON_FAILURE:
      return Object.assign({}, state, {
        couponStatus: action.status,
        couponError: action.error,
        loading: false
      });

    case cartActions.RELEASE_USER_COUPON_REQUEST:
      return Object.assign({}, state, {
        couponStatus: action.status,
        loading: true
      });

    case cartActions.RELEASE_USER_COUPON_SUCCESS:
      carDetailsCopy = cloneDeep(state.cartDetails);
      cartAmount = action.couponResult && action.couponResult.cartAmount;
      if (carDetailsCopy) {
        carDetailsCopy.cartAmount = cartAmount;
      } else {
        carDetailsCopy = { cartAmount };
      }

      const clonedCartDetailCNC = state.cartDetailsCNC
        ? cloneDeep(state.cartDetailsCNC)
        : {};
      if (clonedCartDetailCNC && action.couponResult.cartAmount) {
        Object.assign(clonedCartDetailCNC, {
          cartAmount: action.couponResult.cartAmount
        });
      }
      if (clonedCartDetailCNC && action.couponResult.deliveryCharge) {
        Object.assign(clonedCartDetailCNC, {
          deliveryCharge: action.couponResult.deliveryCharge
        });
      }
      if (clonedCartDetailCNC && action.couponResult.cliqCashPaidAmount) {
        Object.assign(clonedCartDetailCNC, {
          cliqCashPaidAmount: action.couponResult.cliqCashPaidAmount
        });
      }
      delete carDetailsCopy["appliedCoupon"];
      Cookies.deleteCookie(COUPON_COOKIE);
      return Object.assign({}, state, {
        couponStatus: action.status,
        cartDetails: carDetailsCopy,
        cartDetailsCNC: clonedCartDetailCNC,
        loading: false
      });

    case cartActions.RELEASE_USER_COUPON_FAILURE:
      return Object.assign({}, state, {
        couponStatus: action.status,
        couponError: action.error,
        loading: false
      });

    case cartActions.SELECT_DELIVERY_MODES_REQUEST:
      return Object.assign({}, state, {
        status: action.status,
        selectDeliveryModeLoader: true
      });

    case cartActions.SELECT_DELIVERY_MODES_SUCCESS:
      return Object.assign({}, state, {
        status: action.status,
        deliveryModes: action.deliveryModes
      });

    case cartActions.SELECT_DELIVERY_MODES_FAILURE:
      return Object.assign({}, state, {
        status: action.status,
        error: action.error,
        selectDeliveryModeLoader: false
      });

    case cartActions.GET_USER_ADDRESS_REQUEST:
      return Object.assign({}, state, {
        getUserAddressStatus: action.status,
        loading: true
      });

    case cartActions.GET_USER_ADDRESS_SUCCESS:
      return Object.assign({}, state, {
        getUserAddressStatus: action.status,
        userAddress: action.userAddress,
        loading: false
      });

    case cartActions.GET_USER_ADDRESS_FAILURE:
      return Object.assign({}, state, {
        getUserAddressStatus: action.status,
        getUserAddressError: action.error,
        loading: false
      });
    case cartActions.CART_DETAILS_CNC_REQUEST:
      return Object.assign({}, state, {
        cartDetailsCNCStatus: action.status,
        loading: true,
        cartDetailsCNCLoader: true
      });
    case cartActions.CART_DETAILS_CNC_SUCCESS: {
      return Object.assign({}, state, {
        cartDetailsCNCStatus: action.status,
        setAddress: action.setAddress,
        userAddress: action.cartDetailsCnc.addressDetailsList,
        cartDetailsCNC: action.cartDetailsCnc,
        loading: false,
        cartDetailsCNCLoader: false
      });
    }
    case cartActions.CART_DETAILS_CNC_FAILURE:
      return Object.assign({}, state, {
        cartDetailsCNCStatus: action.status,
        cartDetailsCNCError: action.error,
        loading: false,
        cartDetailsCNCLoader: false
      });

    case cartActions.NET_BANKING_DETAILS_REQUEST:
      return Object.assign({}, state, {
        netBankDetailsStatus: action.status,
        loading: true
      });

    case cartActions.NET_BANKING_DETAILS_SUCCESS:
      return Object.assign({}, state, {
        netBankDetailsStatus: action.status,
        netBankDetails: action.netBankDetails,
        loading: false
      });

    case cartActions.NET_BANKING_DETAILS_FAILURE:
      return Object.assign({}, state, {
        netBankDetailsStatus: action.status,
        netBankDetailsError: action.error,
        loading: false
      });

    case cartActions.EMI_BANKING_DETAILS_REQUEST:
      return Object.assign({}, state, {
        emiBankStatus: action.status,
        loading: true
      });

    case cartActions.EMI_BANKING_DETAILS_SUCCESS:
      return Object.assign({}, state, {
        emiBankStatus: action.status,
        emiBankDetails: action.emiBankDetails,
        loading: false
      });

    case cartActions.EMI_BANKING_DETAILS_FAILURE:
      return Object.assign({}, state, {
        emiBankStatus: action.status,
        emiBankError: action.error,
        loading: false
      });

    case cartActions.GENERATE_CART_ID_FOR_LOGGED_IN_USER_SUCCESS:
      cartDetails = Cookies.getCookie(CART_DETAILS_FOR_LOGGED_IN_USER);
      if (!cartDetails) {
        Cookies.createCookie(
          CART_DETAILS_FOR_LOGGED_IN_USER,
          JSON.stringify(action.cartDetails)
        );
      }
      return Object.assign({}, state, {
        cartIdForLoggedInUserStatus: action.status
      });
    case cartActions.GENERATE_CART_ID_FOR_LOGGED_IN_USER_REQUEST:
      return Object.assign({}, state, {
        cartIdForLoggedInUserStatus: action.status
      });
    case cartActions.GENERATE_CART_ID_FOR_LOGGED_IN_USER_FAILURE:
      return Object.assign({}, state, {
        cartIdForLoggedInUserStatus: action.status,
        error: action.error
      });

    case cartActions.GENERATE_CART_ID_FOR_ANONYMOUS_USER_SUCCESS:
      Cookies.createCookie(
        CART_DETAILS_FOR_ANONYMOUS,
        JSON.stringify(action.cartDetails)
      );
      return Object.assign({}, state, {
        cartIdForAnonymousUserStatus: action.status
      });
    case cartActions.GENERATE_CART_ID_FOR_ANONYMOUS_USER_REQUEST:
      return Object.assign({}, state, {
        cartIdForAnonymousUserStatus: action.status
      });
    case cartActions.GENERATE_CART_ID_FOR_ANONYMOUS_USER_FAILURE:
      return Object.assign({}, state, {
        cartIdForAnonymousUserStatus: action.status,
        error: action.error
      });

    case cartActions.ORDER_SUMMARY_REQUEST:
      return Object.assign({}, state, {
        orderSummaryStatus: action.status,
        selectDeliveryModeLoader: true
      });

    case cartActions.ORDER_SUMMARY_SUCCESS:
      carDetailsCopy = cloneDeep(state.cartDetailsCNC);
      carDetailsCopy.cartAmount =
        action.orderSummary && action.orderSummary.cartAmount;
      carDetailsCopy.deliveryCharge =
        action.orderSummary && action.orderSummary.deliveryCharge;
      return Object.assign({}, state, {
        orderSummaryStatus: action.status,
        orderSummary: action.orderSummary,
        cartDetailsCNC: carDetailsCopy,
        selectDeliveryModeLoader: false
      });

    case cartActions.ORDER_SUMMARY_FAILURE:
      return Object.assign({}, state, {
        orderSummaryStatus: action.status,
        orderSummaryError: action.error,
        selectDeliveryModeLoader: false
      });

    case cartActions.GET_CART_ID_REQUEST:
      return Object.assign({}, state, {
        status: action.status
      });
    case cartActions.GET_CART_ID_SUCCESS:
      return Object.assign({}, state, {
        status: action.status
      });

    case cartActions.GET_CART_ID_FAILURE:
      return Object.assign({}, state, {
        status: action.status,
        error: action.error
      });

    case cartActions.MERGE_CART_ID_REQUEST:
      return Object.assign({}, state, {
        mergeCartIdStatus: action.status
      });

    case cartActions.MERGE_CART_ID_SUCCESS:
      Cookies.createCookie(
        CART_DETAILS_FOR_LOGGED_IN_USER,
        JSON.stringify(action.cartDetails)
      );
      Cookies.deleteCookie(CART_DETAILS_FOR_ANONYMOUS);

      return Object.assign({}, state, {
        mergeCartIdStatus: action.status,
        type: action.type
      });

    case cartActions.MERGE_CART_ID_FAILURE:
      return Object.assign({}, state, {
        mergeCartIdStatus: action.status,
        error: action.error
      });

    case cartActions.GET_ALL_STORES_CNC_REQUEST:
      return Object.assign({}, state, {
        storeStatus: action.status,
        loading: true
      });

    case cartActions.GET_ALL_STORES_CNC_SUCCESS:
      return Object.assign({}, state, {
        storeStatus: action.status,
        storeDetails: action.storeDetails,
        loading: false
      });

    case cartActions.GET_ALL_STORES_CNC_FAILURE:
      return Object.assign({}, state, {
        storeStatus: action.status,
        storeError: action.error,
        loading: false
      });

    case cartActions.ADD_STORE_CNC_REQUEST:
      return Object.assign({}, state, {
        storeStatus: action.status,
        loading: true
      });

    case cartActions.ADD_STORE_CNC_SUCCESS:
      return Object.assign({}, state, {
        storeStatus: action.status,
        storeAdded: action.storeAdded,
        loading: false
      });

    case cartActions.ADD_STORE_CNC_FAILURE:
      return Object.assign({}, state, {
        storeStatus: action.status,
        storeError: action.error,
        loading: false
      });

    case cartActions.ADD_PICKUP_PERSON_REQUEST:
      return Object.assign({}, state, {
        cartDetailsCNCStatus: action.status,
        loading: true
      });

    case cartActions.ADD_PICKUP_PERSON_SUCCESS:
      return Object.assign({}, state, {
        cartDetailsCNCStatus: action.status,
        loading: false
      });

    case cartActions.ADD_PICKUP_PERSON_FAILURE:
      return Object.assign({}, state, {
        cartDetailsCNCStatus: action.status,
        cartDetailsCNCError: action.error,
        loading: false
      });
    case cartActions.ADD_ADDRESS_TO_CART_REQUEST:
      return Object.assign({}, state, {
        status: action.status,
        loading: true
      });

    case cartActions.ADD_ADDRESS_TO_CART_SUCCESS:
      return Object.assign({}, state, {
        status: action.status,
        loading: false
      });

    case cartActions.ADD_ADDRESS_TO_CART_FAILURE:
      return Object.assign({}, state, {
        status: action.status,
        error: action.error,
        loading: false
      });

    case cartActions.SOFT_RESERVATION_REQUEST:
      return Object.assign({}, state, {
        softReserveStatus: action.status,
        selectDeliveryModeLoader: true
      });

    case cartActions.SOFT_RESERVATION_SUCCESS:
      return Object.assign({}, state, {
        softReserveStatus: action.status,
        softReserve: action.softReserve
      });

    case cartActions.SOFT_RESERVATION_FAILURE:
      return Object.assign({}, state, {
        softReserveStatus: action.status,
        softReserveError: action.error,
        selectDeliveryModeLoader: false,
        isSoftReservationFailed: true
      });

    case cartActions.GET_PAYMENT_MODES_REQUEST:
      return Object.assign({}, state, {
        paymentModesStatus: action.status,
        paymentModeLoader: true
      });

    case cartActions.GET_PAYMENT_MODES_SUCCESS:
      return Object.assign({}, state, {
        paymentModesStatus: action.status,
        paymentModes: action.paymentModes,
        paymentModeLoader: false
      });

    case cartActions.GET_PAYMENT_MODES_FAILURE:
      return Object.assign({}, state, {
        paymentModesStatus: action.status,
        paymentModesError: action.error,
        paymentModeLoader: false
      });

    case cartActions.APPLY_BANK_OFFER_REQUEST:
      return Object.assign({}, state, {
        bankOfferStatus: action.status,
        loading: true
      });
    case cartActions.APPLY_BANK_OFFER_SUCCESS:
      const currentCartDetailCNC = cloneDeep(state.cartDetailsCNC);
      const paymentFailureOrderDetails = cloneDeep(
        state.paymentFailureOrderDetails
      );
      currentCartDetailCNC.cartAmount = action.bankOffer.cartAmount;
      if (paymentFailureOrderDetails) {
        paymentFailureOrderDetails.cliqCashPaidAmount =
          action.bankOffer.cliqCashPaidAmount;
      }

      return Object.assign({}, state, {
        bankOfferStatus: action.status,
        cartDetailsCNC: currentCartDetailCNC,
        paymentFailureOrderDetails,
        bankOffer: action.bankOffer,
        loading: false
      });
    case cartActions.APPLY_BANK_OFFER_FAILURE:
      return Object.assign({}, state, {
        bankOfferStatus: action.status,
        bankOfferError: action.error,
        loading: false
      });
    case cartActions.RELEASE_BANK_OFFER_REQUEST:
      return Object.assign({}, state, {
        bankOfferStatus: action.status,
        loading: true
      });
    case cartActions.RELEASE_BANK_OFFER_SUCCESS:
      cloneCartDetailCNC = state.cartDetailsCNC
        ? cloneDeep(state.cartDetailsCNC)
        : {};
      if (cloneCartDetailCNC && action.bankOffer.cartAmount) {
        Object.assign(cloneCartDetailCNC, {
          cartAmount: action.bankOffer.cartAmount
        });
      }
      if (cloneCartDetailCNC && action.bankOffer.deliveryCharge) {
        Object.assign(cloneCartDetailCNC, {
          deliveryCharges: action.bankOffer.deliveryCharges
        });
      }
      if (cloneCartDetailCNC && action.bankOffer.cliqCashPaidAmount) {
        Object.assign(cloneCartDetailCNC, {
          cliqCashPaidAmount: action.bankOffer.cliqCashPaidAmount
        });
      }
      return Object.assign({}, state, {
        bankOfferStatus: action.status,
        cartDetailsCNC: cloneCartDetailCNC,
        bankOffer: action.bankOffer,
        loading: false
      });
    case cartActions.RELEASE_BANK_OFFER_FAILURE:
      return Object.assign({}, state, {
        bankOfferStatus: action.status,
        bankOfferError: action.error,
        loading: false
      });

    case cartActions.APPLY_CLIQ_CASH_REQUEST:
      return Object.assign({}, state, {
        cliqCashPaymentStatus: action.status,
        loading: true
      });

    case cartActions.APPLY_CLIQ_CASH_SUCCESS: {
      cloneCartDetailCNC = cloneDeep(state.cartDetailsCNC);
      if (
        cloneCartDetailCNC.cartAmount &&
        action.paymentDetails &&
        action.paymentDetails.cartAmount
      ) {
        cloneCartDetailCNC.cartAmount = action.paymentDetails.cartAmount;
      } else {
        Object.assign(cloneCartDetailCNC, {
          cartAmount: action.paymentDetails.cartAmount
        });
      }
      if (
        action.paymentDetails &&
        action.paymentDetails.cartAmount &&
        !action.paymentDetails.cartAmount.cartDiscount
      ) {
        localStorage.removeItem(BANK_COUPON_COOKIE);
      }
      return Object.assign({}, state, {
        cartDetailsCNC: cloneCartDetailCNC,
        cliqCashPaymentStatus: action.status,
        cliqCashPaymentDetails: action.paymentDetails,
        loading: false
      });
    }

    case cartActions.APPLY_CLIQ_CASH_FAILURE:
      return Object.assign({}, state, {
        cliqCashPaymentStatus: action.status,
        cliqCashPaymentStatusError: action.error,
        loading: false
      });

    case cartActions.REMOVE_CLIQ_CASH_REQUEST:
      return Object.assign({}, state, {
        cliqCashPaymentStatus: action.status,
        loading: true
      });

    case cartActions.REMOVE_CLIQ_CASH_SUCCESS: {
      cloneCartDetailCNC = cloneDeep(state.cartDetailsCNC);
      if (
        cloneCartDetailCNC.cartAmount &&
        action.paymentDetails &&
        action.paymentDetails.cartAmount
      ) {
        cloneCartDetailCNC.cartAmount = action.paymentDetails.cartAmount;
      } else {
        Object.assign(cloneCartDetailCNC, {
          cartAmount: action.paymentDetails.cartAmount
        });
      }
      return Object.assign({}, state, {
        cartDetailsCNC: cloneCartDetailCNC,
        cliqCashPaymentStatus: action.status,
        cliqCashPaymentDetails: action.paymentDetails,
        loading: false
      });
    }

    case cartActions.REMOVE_CLIQ_CASH_FAILURE:
      return Object.assign({}, state, {
        cliqCashPaymentStatus: action.status,
        cliqCashPaymentStatusError: action.error,
        loading: false
      });
    case cartActions.CREATE_PAYMENT_ORDER_REQUEST:
      return Object.assign({}, state, {
        createPaymentOrderStatus: action.status,
        selectDeliveryModeLoader: true
      });

    case cartActions.CREATE_PAYMENT_ORDER_SUCCESS:
      return Object.assign({}, state, {
        createPaymentOrderStatus: action.status,
        createPaymentOrder: action.createPaymentOrder
      });

    case cartActions.CREATE_PAYMENT_ORDER_FAILURE:
      return Object.assign({}, state, {
        createPaymentOrderStatus: action.status,
        createPaymentOrderError: action.error,
        isCreatePaymentOrderFailed: true
      });

    case cartActions.COLLECT_PAYMENT_ORDER_REQUEST:
      return Object.assign({}, state, {
        collectPaymentOrderStatus: action.status,
        jusPaymentLoader: true
      });

    case cartActions.COLLECT_PAYMENT_ORDER_SUCCESS:
      cartDetails = Cookies.getCookie(CART_DETAILS_FOR_LOGGED_IN_USER);
      const cartGuid = JSON.parse(cartDetails).guid;
      Cookies.createCookieInMinutes(
        OLD_CART_GU_ID,
        cartGuid,
        VALIDITY_OF_OLD_CART_ID
      );
      return Object.assign({}, state, {
        collectPaymentOrderStatus: action.status,
        collectPaymentOrder: action.collectPaymentOrder
      });

    case cartActions.COLLECT_PAYMENT_ORDER_FAILURE:
      return Object.assign({}, state, {
        collectPaymentOrderStatus: action.status,
        collectPaymentOrderError: action.error,
        isPaymentProceeded: false,
        isCollectPaymentOrderFailed: true,
        jusPaymentLoader: false
      });
    case cartActions.COLLECT_PAYMENT_ORDER_FOR_GIFTCARD_REQUEST:
      return Object.assign({}, state, {
        collectPaymentOrderStatus: action.status,
        jusPaymentLoader: true
      });

    case cartActions.COLLECT_PAYMENT_ORDER_FOR_GIFTCARD_SUCCESS:
      Cookies.createCookieInMinutes(
        OLD_CART_GU_ID,
        action.guid,
        VALIDITY_OF_OLD_CART_ID
      );
      return Object.assign({}, state, {
        collectPaymentOrderStatus: action.status,
        collectPaymentOrder: action.collectPaymentOrder
      });

    case cartActions.COLLECT_PAYMENT_ORDER_FOR_GIFTCARD_FAILURE:
      return Object.assign({}, state, {
        collectPaymentOrderStatus: action.status,
        collectPaymentOrderError: action.error,
        isPaymentProceeded: false,
        isCollectPaymentOrderFailed: true,
        jusPaymentLoader: false
      });

    case cartActions.GET_PREPAID_ORDER_PAYMENT_CONFIRMATION_REQUEST:
      return Object.assign({}, state, {
        getPrepaidOrderPaymentConfirmationStatus: action.status,
        jusPaymentLoader: true,
        isPaymentProceeded: true
      });

    case cartActions.GET_PREPAID_ORDER_PAYMENT_CONFIRMATION_SUCCESS:
      Cookies.deleteCookie(OLD_CART_GU_ID);
      localStorage.removeItem(cartActions.CART_ITEM_COOKIE);
      localStorage.removeItem(cartActions.ADDRESS_FOR_PLACE_ORDER);
      localStorage.removeItem(EGV_GIFT_CART_ID);
      localStorage.removeItem(NO_COST_EMI_COUPON);
      localStorage.removeItem(OLD_CART_CART_ID);
      localStorage.removeItem(CLIQ_CASH_APPLIED_LOCAL_STORAGE);
      localStorage.removeItem(RETRY_PAYMENT_DETAILS);
      localStorage.removeItem(RETRY_PAYMENT_CART_ID);
      localStorage.removeItem(EMI_TENURE);
      return Object.assign({}, state, {
        getPrepaidOrderPaymentConfirmationStatus: action.status,
        getPrepaidOrderPaymentConfirmation: action.paymentDetails,
        jusPaymentLoader: false,
        isPaymentProceeded: true
      });

    case cartActions.GET_PREPAID_ORDER_PAYMENT_CONFIRMATION_FAILURE:
      return Object.assign({}, state, {
        getPrepaidOrderPaymentConfirmationStatus: action.status,
        getPrepaidOrderPaymentConfirmationError: action.error,
        isGetPrepaidOrderPaymentConfirmationFailed: true,
        jusPaymentLoader: false,
        isPaymentProceeded: false
      });

    case cartActions.STRIPE_TOKENIZE_REQUEST:
      return Object.assign({}, state, {
        stripeTokenizeStatus: action.status,
        jusPaymentLoader: true
      });

    case cartActions.STRIPE_TOKENIZE_SUCCESS:
      return Object.assign({}, state, {
        stripeTokenizeStatus: action.status,
        stripeTokenizeDetails: action.stripeToken
      });

    case cartActions.STRIPE_TOKENIZE_FAILURE:
      return Object.assign({}, state, {
        stripeTokenizeStatus: action.status,
        stripeTokenizeError: action.error,
        jusPaymentLoader: false,
        isPaymentProceeded: false
      });

    case cartActions.CREATE_JUS_PAY_ORDER_REQUEST:
      return Object.assign({}, state, {
        createJusPayStatus: action.status,
        jusPaymentLoader: true,
        isPaymentProceeded: true
      });

    case cartActions.CREATE_JUS_PAY_ORDER_SUCCESS: {
      return Object.assign({}, state, {
        createJusPayStatus: action.status,
        jusPayDetails: action.jusPayDetails
      });
    }
    case cartActions.CREATE_JUS_PAY_ORDER_FOR_CLIQ_CASH_SUCCESS: {
      const cartDetails = Cookies.getCookie(CART_DETAILS_FOR_LOGGED_IN_USER);
      const cartDetailsGuid = JSON.parse(cartDetails).guid;
      Cookies.createCookieInMinutes(
        OLD_CART_GU_ID,
        cartDetailsGuid,
        VALIDITY_OF_OLD_CART_ID
      );
      // here is where I need to destroy the cart details
      Cookies.deleteCookie(CART_DETAILS_FOR_LOGGED_IN_USER);
      Cookies.deleteCookie(COUPON_COOKIE);
      return Object.assign({}, state, {
        jusPayStatus: action.status,
        cliqCashJusPayDetails: action.cliqCashJusPayDetails,
        jusPaymentLoader: false
      });
    }

    case cartActions.CREATE_JUS_PAY_ORDER_FAILURE:
      return Object.assign({}, state, {
        createJusPayStatus: action.status,
        createJusPayError: action.error,
        jusPaymentLoader: false,
        isPaymentProceeded: false
      });

    case cartActions.BIN_VALIDATION_REQUEST:
      return Object.assign({}, state, {
        binValidationStatus: action.status,
        loading: false
      });

    case cartActions.BIN_VALIDATION_SUCCESS:
      return Object.assign({}, state, {
        binValidationStatus: action.status,
        binValidationDetails: action.binValidation,
        loading: false
      });

    case cartActions.BIN_VALIDATION_FAILURE:
      return Object.assign({}, state, {
        binValidationStatus: action.status,
        binValidationError: action.error,
        loading: false
      });

    case cartActions.UPDATE_TRANSACTION_DETAILS_REQUEST:
      return Object.assign({}, state, {
        transactionStatus: action.status,
        jusPaymentLoader: true
      });

    case cartActions.UPDATE_TRANSACTION_DETAILS_SUCCESS: {
      Cookies.deleteCookie(OLD_CART_GU_ID);
      localStorage.removeItem(cartActions.CART_ITEM_COOKIE);
      localStorage.removeItem(cartActions.ADDRESS_FOR_PLACE_ORDER);
      localStorage.removeItem(EGV_GIFT_CART_ID);
      localStorage.removeItem(NO_COST_EMI_COUPON);
      localStorage.removeItem(OLD_CART_CART_ID);
      localStorage.removeItem(CLIQ_CASH_APPLIED_LOCAL_STORAGE);
      localStorage.removeItem(RETRY_PAYMENT_DETAILS);
      localStorage.removeItem(RETRY_PAYMENT_CART_ID);
      localStorage.removeItem(EMI_TENURE);
      return Object.assign({}, state, {
        jusPayDetails: action.jusPayDetails
      });
    }

    case cartActions.UPDATE_TRANSACTION_DETAILS_FAILURE:
      return Object.assign({}, state, {
        transactionStatus: action.status,
        jusPayError: action.error,
        jusPaymentLoader: false,
        isPaymentProceeded: false
      });

    case cartActions.ORDER_CONFIRMATION_REQUEST:
      return Object.assign({}, state, {
        orderConfirmationDetailsStatus: action.status,
        jusPaymentLoader: true
      });

    case cartActions.ORDER_CONFIRMATION_SUCCESS: {
      let cartDetails = Cookies.getCookie(CART_DETAILS_FOR_LOGGED_IN_USER);
      if (!cartDetails) {
        localStorage.removeItem(CART_BAG_DETAILS);
      }
      if (cartDetails && !JSON.parse(cartDetails).products) {
        localStorage.removeItem(CART_BAG_DETAILS);
      }

      return Object.assign({}, state, {
        orderConfirmationDetailsStatus: action.status,
        orderConfirmationDetails: action.confirmedOrderDetails,
        transactionStatus: action.status,
        jusPaymentLoader: false,
        cliqCashJusPayDetails: null,
        isPaymentProceeded: false
      });
    }

    case cartActions.ORDER_CONFIRMATION_FAILURE:
      return Object.assign({}, state, {
        orderConfirmationDetailsStatus: action.status,
        transactionStatus: action.status,
        orderConfirmationDetailsError: action.error,
        jusPaymentLoader: false,
        isPaymentProceeded: false
      });

    case cartActions.CLEAR_ORDER_EXPERIENCE_CAPTURE:
      return Object.assign({}, state, {
        orderConfirmationDetailsStatus: null
      });

    case cartActions.JUS_PAY_PAYMENT_METHOD_TYPE_REQUEST:
      return Object.assign({}, state, {
        justPayPaymentDetailsStatus: action.status,
        jusPaymentLoader: true
      });

    case cartActions.JUS_PAY_PAYMENT_METHOD_TYPE_SUCCESS:
      cartDetails = Cookies.getCookie(CART_DETAILS_FOR_LOGGED_IN_USER);
      const cartDetailsGuid = JSON.parse(cartDetails).guid;
      Cookies.createCookieInMinutes(
        OLD_CART_GU_ID,
        cartDetailsGuid,
        VALIDITY_OF_OLD_CART_ID
      );

      // here is where I need to destroy the cart details
      Cookies.deleteCookie(COUPON_COOKIE);
      return Object.assign({}, state, {
        justPayPaymentDetailsStatus: action.status,
        justPayPaymentDetails: action.justPayPaymentDetails
      });

    case cartActions.JUS_PAY_PAYMENT_METHOD_TYPE_FOR_GIFT_CARD_SUCCESS: {
      Cookies.createCookieInMinutes(
        OLD_CART_GU_ID,
        action.guid,
        VALIDITY_OF_OLD_CART_ID
      );
      return Object.assign({}, state, {
        justPayPaymentDetailsStatus: action.status,
        justPayPaymentDetails: action.justPayPaymentDetails
      });
    }

    case cartActions.JUS_PAY_PAYMENT_METHOD_TYPE_FAILURE:
      return Object.assign({}, state, {
        justPayPaymentDetailsStatus: action.status,
        justPayPaymentDetailsError: action.error,
        jusPaymentLoader: false,
        isPaymentProceeded: false
      });

    case cartActions.GET_COD_ELIGIBILITY_REQUEST:
      return Object.assign({}, state, {
        codEligibilityStatus: action.status,
        loading: true
      });

    case cartActions.GET_COD_ELIGIBILITY_SUCCESS: {
      return Object.assign({}, state, {
        codEligibilityStatus: action.status,
        codEligibilityDetails: action.codEligibilityDetails,
        loading: false
      });
    }

    case cartActions.ORDER_EXPERIENCE_CAPTURE_REQUEST:
      return Object.assign({}, state, {
        orderExperienceStatus: action.status
      });

    case cartActions.ORDER_EXPERIENCE_CAPTURE_SUCCESS: {
      return Object.assign({}, state, {
        orderExperienceStatus: action.status,
        orderExperience: action.orderExperience
      });
    }

    case cartActions.ORDER_EXPERIENCE_CAPTURE_FAILURE:
      return Object.assign({}, state, {
        orderExperienceStatus: action.status,
        orderExperienceError: action.error
      });

    case cartActions.GET_COD_ELIGIBILITY_FAILURE:
      return Object.assign({}, state, {
        codEligibilityStatus: action.status,
        codEligibilityError: action.error,
        codEligibilityDetails: action.status,
        loading: false
      });

    case cartActions.BIN_VALIDATION_COD_REQUEST:
      return Object.assign({}, state, {
        binValidationCODStatus: action.status,
        loading: false
      });

    case cartActions.BIN_VALIDATION_COD_SUCCESS: {
      return Object.assign({}, state, {
        binValidationCODStatus: action.status,
        binValidationCODDetails: action.binValidationCODDetails,
        loading: false
      });
    }

    case cartActions.BIN_VALIDATION_COD_FAILURE:
      return Object.assign({}, state, {
        binValidationCODStatus: action.status,
        binValidationCODError: action.error,
        loading: false
      });

    case cartActions.UPDATE_TRANSACTION_DETAILS_FOR_COD_REQUEST:
      return Object.assign({}, state, {
        transactionDetailsStatus: action.status,
        loading: true
      });

    case cartActions.UPDATE_TRANSACTION_DETAILS_FOR_COD_SUCCESS:
      return Object.assign({}, state, {
        transactionDetailsStatus: action.status,
        transactionDetailsDetails: action.transactionDetails,
        loading: false,
        isPaymentProceeded: false
      });

    case cartActions.UPDATE_TRANSACTION_DETAILS_FOR_COD_FAILURE:
      return Object.assign({}, state, {
        transactionDetailsStatus: action.status,
        transactionDetailsError: action.error,
        loading: false,
        isPaymentProceeded: false
      });

    case cartActions.SOFT_RESERVATION_FOR_COD_PAYMENT_REQUEST:
      return Object.assign({}, state, {
        isPaymentProceeded: true,
        softReserveCODPaymentStatus: action.status,
        loading: true
      });

    case cartActions.SOFT_RESERVATION_FOR_COD_PAYMENT_SUCCESS:
      return Object.assign({}, state, {
        softReserveCODPaymentStatus: action.status,
        softReserveCODPayment: action.softReserveCODPayment,
        loading: false
      });

    case cartActions.SOFT_RESERVATION_FOR_COD_PAYMENT_FAILURE:
      return Object.assign({}, state, {
        softReserveCODPaymentStatus: action.status,
        softReserveCODPaymentError: action.error,
        loading: false,
        isSoftReservationFailed: true,
        isPaymentProceeded: false
      });

    case cartActions.REMOVE_ITEM_FROM_CART_LOGGED_IN_REQUEST:
      return Object.assign({}, state, {
        removeCartItemStatus: action.status,
        loading: true
      });

    case cartActions.REMOVE_ITEM_FROM_CART_LOGGED_IN_SUCCESS:
      return Object.assign({}, state, {
        removeCartItemStatus: action.status,
        loading: false
      });

    case cartActions.REMOVE_ITEM_FROM_CART_LOGGED_IN_FAILURE:
      return Object.assign({}, state, {
        removeCartItemStatus: action.status,
        removeCartItemError: action.error,
        loading: false
      });

    case cartActions.REMOVE_ITEM_FROM_CART_LOGGED_OUT_REQUEST:
      return Object.assign({}, state, {
        removeCartItemLoggedOutStatus: action.status,
        loading: true
      });

    case cartActions.REMOVE_ITEM_FROM_CART_LOGGED_OUT_SUCCESS:
      return Object.assign({}, state, {
        removeCartItemLoggedOutStatus: action.status,
        loading: false
      });

    case cartActions.REMOVE_ITEM_FROM_CART_LOGGED_OUT_FAILURE:
      return Object.assign({}, state, {
        removeCartItemLoggedOutStatus: action.status,
        removeCartItemLoggedOutError: action.error,
        loading: false
      });

    case cartActions.UPDATE_QUANTITY_IN_CART_LOGGED_IN_REQUEST:
      return Object.assign({}, state, {
        updateQuantityLoggedInStatus: action.status,
        loading: true
      });

    case cartActions.UPDATE_QUANTITY_IN_CART_LOGGED_IN_SUCCESS:
      return Object.assign({}, state, {
        updateQuantityLoggedInStatus: action.status,
        updateQuantityLoggedInDetails: action.updateQuantityDetails,
        loading: false
      });

    case cartActions.UPDATE_QUANTITY_IN_CART_LOGGED_IN_FAILURE:
      return Object.assign({}, state, {
        updateQuantityLoggedInStatus: action.status,
        updateQuantityLoggedInError: action.error,
        loading: false
      });

    case cartActions.UPDATE_QUANTITY_IN_CART_LOGGED_OUT_REQUEST:
      return Object.assign({}, state, {
        updateQuantityLoggedOutStatus: action.status,
        loading: true
      });

    case cartActions.UPDATE_QUANTITY_IN_CART_LOGGED_OUT_SUCCESS:
      return Object.assign({}, state, {
        updateQuantityLoggedOutStatus: action.status,
        updateQuantityLoggedOutDetails: action.updateQuantityDetails,
        loading: false
      });

    case cartActions.UPDATE_QUANTITY_IN_CART_LOGGED_OUT_FAILURE:
      return Object.assign({}, state, {
        updateQuantityLoggedOutStatus: action.status,
        updateQuantityLoggedOutError: action.error,
        loading: false
      });

    case cartActions.ADD_USER_ADDRESS_REQUEST:
      return Object.assign({}, state, {
        AddUserAddressStatus: action.status,
        loading: true
      });
    case cartActions.ADD_USER_ADDRESS_SUCCESS:
      return Object.assign({}, state, {
        AddUserAddressStatus: action.status,
        loading: false
      });

    case cartActions.ADD_USER_ADDRESS_FAILURE:
      return Object.assign({}, state, {
        AddUserAddressStatus: action.status,
        loading: false
      });
    case cartActions.DISPLAY_COUPON_REQUEST:
      return Object.assign({}, state, {
        couponStatus: action.status,
        loadingForDisplayCoupon: true
      });

    case cartActions.DISPLAY_COUPON_SUCCESS:
      return Object.assign({}, state, {
        couponStatus: action.status,
        coupons: action.couponDetails,
        loadingForDisplayCoupon: false
      });

    case cartActions.DISPLAY_COUPON_FAILURE:
      return Object.assign({}, state, {
        couponStatus: action.status,
        couponError: action.error,
        loadingForDisplayCoupon: false
      });

    case cartActions.SOFT_RESERVATION_FOR_PAYMENT_REQUEST:
      return Object.assign({}, state, {
        isPaymentProceeded: true,
        softReservationForPaymentStatus: action.status,
        jusPaymentLoader: true
      });

    case cartActions.SOFT_RESERVATION_FOR_PAYMENT_SUCCESS:
      return Object.assign({}, state, {
        softReservationForPaymentStatus: action.status,
        softReservationForPaymentDetails: action.orderDetails
      });

    case cartActions.SOFT_RESERVATION_FOR_PAYMENT_FAILURE:
      return Object.assign({}, state, {
        softReservationForPaymentStatus: action.status,
        softReservationForPaymentError: action.error,
        jusPaymentLoader: false,
        isSoftReservationFailed: true,
        isPaymentProceeded: false
      });

    case cartActions.JUS_PAY_TOKENIZE_REQUEST:
      return Object.assign({}, state, {
        jusPayTokenizeStatus: action.status,
        jusPaymentLoader: true
      });

    case cartActions.JUS_PAY_TOKENIZE_SUCCESS:
      return Object.assign({}, state, {
        jusPayTokenizeStatus: action.status,
        jusPayTokenizeDetails: action.jusPayToken
      });

    case cartActions.JUS_PAY_TOKENIZE_FAILURE:
      return Object.assign({}, state, {
        jusPayTokenizeStatus: action.status,
        jusPayTokenizeError: action.error,
        jusPaymentLoader: false,
        isPaymentProceeded: false
      });

    case cartActions.ELIGIBILITY_OF_NO_COST_EMI_REQUEST:
      return Object.assign({}, state, {
        emiEligibilityStatus: action.status,
        loading: true
      });

    case cartActions.ELIGIBILITY_OF_NO_COST_EMI_SUCCESS:
      return Object.assign({}, state, {
        emiEligibilityStatus: action.status,
        emiEligibilityDetails: action.emiEligibility,
        loading: false
      });

    case cartActions.ELIGIBILITY_OF_NO_COST_EMI_FAILURE:
      return Object.assign({}, state, {
        emiEligibilityStatus: action.status,
        emiEligibilityError: action.error,
        loading: false
      });

    case cartActions.BANK_AND_TENURE_DETAILS_REQUEST:
      return Object.assign({}, state, {
        bankAndTenureStatus: action.status,
        loading: true
      });

    case cartActions.BANK_AND_TENURE_DETAILS_SUCCESS:
      return Object.assign({}, state, {
        bankAndTenureStatus: action.status,
        bankAndTenureDetails: action.bankAndTenureDetails,
        loading: false
      });

    case cartActions.BANK_AND_TENURE_DETAILS_FAILURE:
      return Object.assign({}, state, {
        bankAndTenureStatus: action.status,
        bankAndTenureError: action.error,
        loading: false
      });

    case cartActions.EMI_TERMS_AND_CONDITIONS_FOR_BANK_REQUEST:
      return Object.assign({}, state, {
        emiTermsAndConditionStatus: action.status,
        loading: true
      });

    case cartActions.EMI_TERMS_AND_CONDITIONS_FOR_BANK_SUCCESS:
      return Object.assign({}, state, {
        emiTermsAndConditionStatus: action.status,
        emiTermsAndConditionDetails: action.termsAndConditions,
        loading: false
      });

    case cartActions.EMI_TERMS_AND_CONDITIONS_FOR_BANK_FAILURE:
      return Object.assign({}, state, {
        emiTermsAndConditionStatus: action.status,
        emiTermsAndConditionError: action.error,
        loading: false
      });
    case cartActions.APPLY_NO_COST_EMI_REQUEST:
      return Object.assign({}, state, {
        noCostEmiStatus: action.status,
        loading: true
      });

    case cartActions.APPLY_NO_COST_EMI_SUCCESS:
      localStorage.setItem(NO_COST_EMI_COUPON, action.couponCode);
      if (action.isFromRetryUrl) {
        carDetailsCopy = {};
      } else {
        carDetailsCopy = cloneDeep(state.cartDetailsCNC);
      }
      let emiCartAmount =
        action.noCostEmiResult && action.noCostEmiResult.cartAmount
          ? action.noCostEmiResult.cartAmount
          : state.cartDetailsCNC.emiCartAmount;
      carDetailsCopy.cartAmount = emiCartAmount;

      return Object.assign({}, state, {
        noCostEmiStatus: action.status,
        noCostEmiDetails: action.noCostEmiResult,
        cartDetailsCNC: carDetailsCopy,
        loading: false,
        cliqCashPaymentDetails: null,
        isNoCostEmiApplied: true
      });

    case cartActions.APPLY_NO_COST_EMI_FAILURE:
      return Object.assign({}, state, {
        noCostEmiStatus: action.status,
        noCostEmiError: action.error,
        loading: false
      });

    case cartActions.REMOVE_NO_COST_EMI_REQUEST:
      return Object.assign({}, state, {
        noCostEmiStatus: action.status,
        loading: true
      });

    case cartActions.REMOVE_NO_COST_EMI_SUCCESS:
      localStorage.removeItem(NO_COST_EMI_COUPON);
      localStorage.removeItem(EMI_TENURE);
      carDetailsCopy = state.cartDetailsCNC
        ? cloneDeep(state.cartDetailsCNC)
        : {};
      if (carDetailsCopy && action.noCostEmiResult.cartAmount) {
        Object.assign(carDetailsCopy, {
          cartAmount: action.noCostEmiResult.cartAmount
        });
      }
      if (carDetailsCopy && action.noCostEmiResult.deliveryCharge) {
        Object.assign(carDetailsCopy, {
          deliveryCharges: action.noCostEmiResult.deliveryCharges
        });
      }
      if (carDetailsCopy && action.noCostEmiResult.cliqCashPaidAmount) {
        Object.assign(carDetailsCopy, {
          carDetailsCopy: action.noCostEmiResult.cliqCashPaidAmount
        });
      }

      return Object.assign({}, state, {
        noCostEmiStatus: action.status,
        noCostEmiDetails: action.noCostEmiResult,
        cartDetailsCNC: carDetailsCopy,
        loading: false,
        cliqCashPaymentDetails: null,
        isNoCostEmiApplied: false
      });

    case cartActions.REMOVE_NO_COST_EMI_FAILURE:
      return Object.assign({}, state, {
        noCostEmiStatus: action.status,
        noCostEmiError: action.error,
        loading: false
      });

    case cartActions.EMI_ITEM_BREAK_UP_DETAILS_REQUEST:
      return Object.assign({}, state, {
        emiItemBreakUpStatus: action.status,
        loading: true
      });

    case cartActions.EMI_ITEM_BREAK_UP_DETAILS_SUCCESS:
      return Object.assign({}, state, {
        emiItemBreakUpStatus: action.status,
        emiItemBreakUpDetails: action.noCostEmiResult,
        loading: false
      });

    case cartActions.EMI_ITEM_BREAK_UP_DETAILS_FAILURE:
      return Object.assign({}, state, {
        emiItemBreakUpStatus: action.status,
        emiItemBreakUpError: action.error,
        loading: false
      });

    case cartActions.PAYMENT_FAILURE_ORDER_DETAILS_REQUEST:
      return Object.assign({}, state, {
        paymentFailureOrderDetailsStatus: action.status,
        loading: true
      });

    case cartActions.PAYMENT_FAILURE_ORDER_DETAILS_SUCCESS:
      cloneCartDetailCNC = state.cartDetailsCNC
        ? cloneDeep(state.cartDetailsCNC)
        : {};

      if (
        cloneCartDetailCNC.cartAmount &&
        action.paymentFailureOrderDetails &&
        action.paymentFailureOrderDetails.cartAmount
      ) {
        cloneCartDetailCNC.cartAmount =
          action.paymentFailureOrderDetails.cartAmount;
      } else {
        Object.assign(cloneCartDetailCNC, {
          cartAmount: action.paymentFailureOrderDetails.cartAmount
        });
      }
      return Object.assign({}, state, {
        paymentFailureOrderDetailsStatus: action.status,
        cartDetailsCNC: cloneCartDetailCNC,
        paymentFailureOrderDetails: action.paymentFailureOrderDetails,
        loading: false
      });
    //for termsCondition
    case cartActions.GET_TNC_FOR_BANK_OFFER_REQUEST:
      return Object.assign({}, state, {
        bankOfferTncStatus: action.status,
        loadingForBankOfferTNC: true
      });

    case cartActions.GET_TNC_FOR_BANK_OFFER_SUCCESS:
      return Object.assign({}, state, {
        bankOfferTncStatus: action.status,
        bankOfferTncDetails: action.termsAndConditions,
        loadingForBankOfferTNC: false
      });

    case cartActions.GET_TNC_FOR_BANK_OFFER_FAILURE:
      return Object.assign({}, state, {
        bankOfferTncStatus: action.status,
        bankOfferTncError: action.error,
        loadingForBankOfferTNC: false
      });

    //end

    case cartActions.PAYMENT_FAILURE_ORDER_DETAILS_FAILURE:
      return Object.assign({}, state, {
        paymentFailureOrderDetailsStatus: action.status,
        paymentFailureOrderDetailsError: action.error,
        loading: false
      });
    case cartActions.RESET_IS_SOFT_RESERVATION_FAILED:
      return Object.assign({}, state, {
        isSoftReservationFailed: false
      });
    case cartActions.TEMPORARY_CART_ID_FOR_LOGGED_IN_USER_REQUEST:
      return Object.assign({}, state, {
        tempCartIdForLoggedInUserLoading: true,
        tempCartIdForLoggedInUserStatus: action.status
      });
    case cartActions.TEMPORARY_CART_ID_FOR_LOGGED_IN_USER_SUCCESS:
      cartDetails = Object.assign(
        {},
        {
          type: "webSerResponseWsDTO",
          status: "Success",
          code: action.cartDetails.buyNowCartCode,
          count: "1",
          guid: action.cartDetails.buyNowCartGuid,
          isBuyNowCart: action.cartDetails.isBuyNowCart
        }
      );
      Cookies.createCookie(
        CART_DETAILS_FOR_LOGGED_IN_USER,
        JSON.stringify(cartDetails)
      );
      return Object.assign({}, state, {
        tempCartIdForLoggedInUserLoading: false,
        tempCartIdForLoggedInUserStatus: action.status,
        tempCartIdForLoggedInUser: action.cartDetails
      });
    case cartActions.TEMPORARY_CART_ID_FOR_LOGGED_IN_USER_FAILURE:
      return Object.assign({}, state, {
        tempCartIdForLoggedInUserLoading: false,
        tempCartIdForLoggedInUserStatus: action.status
      });
    case cartActions.MERGE_TEMP_CART_WITH_OLD_CART_REQUEST:
      return Object.assign({}, state, {
        mergeTempCartWithOldCartLoading: true,
        mergeTempCartWithOldCartStatus: action.status
      });
    case cartActions.MERGE_TEMP_CART_WITH_OLD_CART_SUCCESS:
      cartDetails = Object.assign(
        {},
        {
          type: "webSerResponseWsDTO",
          status: "Success",
          code: action.cartDetails.buyNowCartCode,
          count: "1",
          guid: action.cartDetails.buyNowCartGuid
        }
      );
      Cookies.createCookie(
        CART_DETAILS_FOR_LOGGED_IN_USER,
        JSON.stringify(cartDetails)
      );
      return Object.assign({}, state, {
        mergeTempCartWithOldCartLoading: false,
        mergeTempCartWithOldCartStatus: action.status,
        mergeTempCartWithOldCart: action.cartDetails
      });
    case cartActions.MERGE_TEMP_CART_WITH_OLD_CART_FAILURE:
      return Object.assign({}, state, {
        mergeTempCartWithOldCartLoading: false,
        mergeTempCartWithOldCartStatus: action.status
      });

    case cartActions.RESET_TEMPORARY_CART:
      return Object.assign({}, state, {
        mergeTempCartWithOldCartLoading: false,
        mergeTempCartWithOldCartStatus: null,
        mergeTempCartWithOldCart: null
      });

    case cartActions.EDD_IN_COMMERCE_REQUEST:
      return Object.assign({}, state, {
        eddDetailsStatus: action.status,
        loadingForEddDetails: true
      });

    case cartActions.EDD_IN_COMMERCE_SUCCESS:
      return Object.assign({}, state, {
        eddDetailsStatus: action.status,
        eddDetails: action.eddDetails,
        loadingForEddDetails: false
      });

    case cartActions.EDD_IN_COMMERCE_FAILURE:
      return Object.assign({}, state, {
        eddDetailsStatus: action.status,
        eddDetailsError: action.error,
        loadingForEddDetails: false
      });

    case cartActions.GET_FEEDBACK_REQUEST:
      return Object.assign({}, state, {
        feedBackDetailsStatus: action.status,
        loadingForfeedBackDetails: true
      });
    case cartActions.GET_FEEDBACK_SUCCESS:
      return Object.assign({}, state, {
        feedBackDetailsStatus: action.status,
        feedBackDetails: action.feedBackDetails,
        loadingForfeedBackDetails: false
      });
    case cartActions.GET_FEEDBACK_FAILURE:
      return Object.assign({}, state, {
        feedBackDetailsStatus: action.status,
        feedBackDetailsError: action.error,
        loadingForfeedBackDetails: false
      });

    case cartActions.POST_FEEDBACK_REQUEST:
      return Object.assign({}, state, {
        feedBackSentStatus: action.status,
        loadingForfeedBackSent: true
      });
    case cartActions.POST_FEEDBACK_SUCCESS:
      return Object.assign({}, state, {
        feedBackSentStatus: action.status,
        feedBackSent: action.feedBackSent,
        loadingForfeedBackSent: false
      });
    case cartActions.POST_FEEDBACK_FAILURE:
      return Object.assign({}, state, {
        feedBackSentStatus: action.status,
        feedBackSentError: action.error,
        loadingForfeedBackSent: false
      });

    case cartActions.GET_USER_ADDRESS_AND_DELIVERY_MODES_BY_RETRY_PAYMENT_REQUEST:
      return Object.assign({}, state, {
        getUserAddressAndDeliveryModesByRetryPaymentStatus: action.status,
        loadingForGetUserAddressAndDeliveryModesByRetryPayment: true
      });

    case cartActions.GET_USER_ADDRESS_AND_DELIVERY_MODES_BY_RETRY_PAYMENT_SUCCESS:
      return Object.assign({}, state, {
        getUserAddressAndDeliveryModesByRetryPaymentStatus: action.status,
        getUserAddressAndDeliveryModesByRetryPayment:
          action.getUserAddressAndDeliveryModesByRetryPayment,
        loadingForGetUserAddressAndDeliveryModesByRetryPayment: false
      });

    case cartActions.GET_USER_ADDRESS_AND_DELIVERY_MODES_BY_RETRY_PAYMENT_FAILURE:
      return Object.assign({}, state, {
        getUserAddressAndDeliveryModesByRetryPaymentStatus: action.status,
        getUserAddressAndDeliveryModesByRetryPaymentError: action.error,
        loadingForGetUserAddressAndDeliveryModesByRetryPayment: false
      });

    case cartActions.BIN_VALIDATION_OF_EMI_ELIGIBLE_REQUEST:
      return Object.assign({}, state, {
        binValidationOfEmiEligibleStatus: action.status,
        loadingForBinValidationOfEmiEligible: true
      });

    case cartActions.BIN_VALIDATION_OF_EMI_ELIGIBLE_SUCCESS:
      return Object.assign({}, state, {
        binValidationOfEmiEligibleStatus: action.status,
        binValidationOfEmiEligible: action.binValidationOfEmiEligible,
        loadingForBinValidationOfEmiEligible: false
      });

    case cartActions.BIN_VALIDATION_OF_EMI_ELIGIBLE_FAILURE:
      return Object.assign({}, state, {
        binValidationOfEmiEligibleStatus: action.status,
        binValidationOfEmiEligibleError: action.error,
        loadingForBinValidationOfEmiEligible: false
      });

    case cartActions.CLEAR_CART_DETAILS:
      localStorage.removeItem(STRIPE_DETAILS);
      return Object.assign({}, state, {
        status: null,
        error: null,
        loading: false,
        type: null,
        cartIdForLoggedInUserStatus: null,
        cartIdForAnonymousUserStatus: null,
        mergeCartIdStatus: null,

        getUserAddressStatus: null,
        getUserAddressError: null,

        userCart: null,
        userCartStatus: null,
        userCartError: null,

        createPaymentOrder: null,
        createPaymentOrderStatus: null,
        createPaymentOrderError: null,

        collectPaymentOrder: null,
        collectPaymentOrderStatus: null,
        collectPaymentOrderError: null,

        getPrepaidOrderPaymentConfirmation: null,
        getPrepaidOrderPaymentConfirmationStatus: null,
        getPrepaidOrderPaymentConfirmationError: null,

        stripeTokenizeStatus: null,
        stripeTokenizeError: null,
        stripeTokenizeDetails: null,

        cartDetails: null,
        cartDetailsStatus: null,
        cartDetailsError: null,

        cartDetailsCNC: null,
        cartDetailsCNCStatus: null,
        cartDetailsCNCError: null,

        couponStatus: null,
        couponError: null,
        coupons: null,

        deliveryModes: null,
        userAddress: null,
        setAddress: null,

        netBankDetailsStatus: null,
        netBankDetailsError: null,
        netBankDetails: null,

        emiBankDetails: null,
        emiBankStatus: null,

        orderSummary: null,
        orderSummaryStatus: null,
        orderSummaryError: null,

        storeDetails: [],
        storeStatus: null,
        storeError: null,
        storeAdded: null,

        softReserve: null,
        softReserveStatus: null,
        softReserveError: null,

        paymentModes: null,
        paymentModesStatus: null,
        paymentModesError: null,
        paymentModeLoader: false,

        bankOffer: null,
        bankOfferStatus: null,
        bankOfferError: null,

        cliqCashPaymentStatus: null,
        cliqCashPaymentStatusError: null,
        cliqCashPaymentDetails: null,

        jusPayStatus: null,
        jusPayError: null,
        jusPayDetails: null,
        cliqCashJusPayDetails: null,

        transactionDetailsStatus: null,
        transactionDetailsError: null,
        transactionDetailsDetails: null,

        orderConfirmationDetailsStatus: null,
        orderConfirmationDetailsError: null,
        orderConfirmationDetails: null,

        justPayPaymentDetailsStatus: null,
        justPayPaymentDetailsError: null,
        justPayPaymentDetails: null,

        codEligibilityStatus: null,
        codEligibilityError: null,
        codEligibilityDetails: null,

        binValidationCODStatus: null,
        binValidationCODError: null,
        binValidationCODDetails: null,

        transactionCODStatus: null,
        transactionCODError: null,

        softReserveCODPaymentStatus: null,
        softReserveCODPayment: null,
        softReserveCODPaymentError: null,
        orderExperienceStatus: null,
        orderExperience: null,
        orderExperienceError: null,

        binValidationStatus: null,
        binValidationError: null,
        binValidationDetails: null,

        addToWishlistStatus: null,
        addToWishlistError: null,

        removeCartItemStatus: null,
        removeCartItemError: null,

        removeCartItemLoggedOutStatus: null,
        removeCartItemLoggedOutError: null,

        updateQuantityLoggedInStatus: null,
        updateQuantityLoggedInDetails: null,
        updateQuantityLoggedInError: null,

        updateQuantityLoggedOutStatus: null,
        updateQuantityLoggedOutDetails: null,
        updateQuantityLoggedOutError: null,

        AddUserAddressStatus: null,
        AddUserAddressError: null,
        addingAddress: false,
        returnCliqPiqStatus: null,
        returnCliqPiqDetails: null,
        returnCliqPiqError: null,

        softReservationForPaymentStatus: null,
        softReservationForPaymentError: null,
        softReservationForPaymentDetails: null,

        jusPayTokenizeStatus: null,
        jusPayTokenizeError: null,
        jusPayTokenizeDetails: null,

        createJusPayOrderStatus: null,
        createJusPayOrderError: null,
        createJusPayOrderDetails: null,
        jusPaymentLoader: false,
        selectDeliveryModeLoader: false,
        transactionStatus: null,
        loginFromMyBag: false,

        emiEligibilityStatus: null,
        emiEligibilityDetails: null,
        emiEligibilityError: null,

        bankAndTenureStatus: null,
        bankAndTenureDetails: null,
        bankAndTenureError: null,

        emiTermsAndConditionStatus: null,
        emiTermsAndConditionDetails: null,
        emiTermsAndConditionError: null,

        noCostEmiStatus: null,
        noCostEmiDetails: null,
        noCostEmiError: null,

        emiItemBreakUpStatus: null,
        emiItemBreakUpDetails: null,
        emiItemBreakUpError: null,

        paymentFailureOrderDetailsStatus: null,
        paymentFailureOrderDetailsError: null,
        paymentFailureOrderDetails: null,
        isGetPrepaidOrderPaymentConfirmationFailed: false,
        isSoftReservationFailed: false
      });
    case cartActions.RESET_ALL_PAYMENT_MODES:
      return Object.assign({}, state, {
        resetAllPaymentModeFlag: true
      });
    case cartActions.PREVENT_REQUESTING_ALL_PAYMENT_MODES:
      return Object.assign({}, state, {
        resetAllPaymentModeFlag: false
      });

    case cartActions.GET_CART_COUNT_FOR_LOGGED_IN_USER_SUCCESS:
      if (action.userDetails) {
        Cookies.createCookie(
          CART_DETAILS_FOR_LOGGED_IN_USER,
          JSON.stringify(action.cartDetails)
        );
      } else {
        Cookies.createCookie(
          CART_DETAILS_FOR_ANONYMOUS,
          JSON.stringify(action.cartDetails)
        );
      }
      return Object.assign({}, state, {
        cartCount: action.cartDetails && action.cartDetails.count,
        cartCountStatus: action.status
      });
    case cartActions.GET_CART_COUNT_FOR_LOGGED_IN_USER_REQUEST:
      return Object.assign({}, state, {
        cartCountStatus: action.status
      });
    case cartActions.GET_CART_COUNT_FOR_LOGGED_IN_USER_FAILURE:
      Cookies.deleteCookie(CART_DETAILS_FOR_ANONYMOUS);
      Cookies.deleteCookie(CART_DETAILS_FOR_LOGGED_IN_USER);
      localStorage.removeItem(CART_BAG_DETAILS);
      return Object.assign({}, state, {
        cartCountError: action.error,
        cartCountStatus: action.status,
        cartCount: null
      });
    case cartActions.GET_MINICART_REQUEST:
      return Object.assign({}, state, {
        minicartStatus: action.status
      });
    case cartActions.GET_MINICART_FAILURE:
      return Object.assign({}, state, {
        minicartStatus: action.status,
        minicartError: action.error,
        minicart: null
      });
    case cartActions.GET_MINICART_NOCART:
      return Object.assign({}, state, {
        minicartStatus: action.status,
        minicart: null
      });
    case cartActions.GET_MINICART_SUCCESS:
      return Object.assign({}, state, {
        minicartStatus: action.status,
        minicart: action.minicartDetails
      });

    default:
      return state;
  }
};

export default cart;
