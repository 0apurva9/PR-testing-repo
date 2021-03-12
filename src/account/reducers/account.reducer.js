import cloneDeep from "lodash.clonedeep";
import * as accountActions from "../actions/account.actions";
import * as cartActions from "../../cart/actions/cart.actions";
import * as Cookie from "../../lib/Cookie.js";
import {
  LOGGED_IN_USER_DETAILS,
  CUSTOMER_ACCESS_TOKEN,
  CART_DETAILS_FOR_LOGGED_IN_USER,
  CART_DETAILS_FOR_ANONYMOUS
} from "../../lib/constants.js";

import { SUCCESS } from "../../lib/constants";
import { CLEAR_ERROR } from "../../general/error.actions";
import * as Cookies from "../../lib/Cookie";
import concat from "lodash.concat";
const account = (
  state = {
    status: null,
    error: null,
    loading: false,
    type: null,
    loadingForClearOrderDetails: true,
    savedCards: null,
    orderDetails: null,
    orderDetailsStatus: null,
    orderDetailsError: null,
    fetchOrderDetails: null,
    fetchOrderDetailsStatus: null,
    fetchOrderDetailsError: null,
    loadingForFetchOrderDetails: false,

    sellerDetails: null,
    sellerDetailsStatus: null,
    sellerDetailsError: null,
    sellerReviewDetails: null,
    sellerReviewDetailsStatus: null,
    sellerReviewDetailsError: null,

    sellerReviewStatus: null,
    sellerReviewError: null,
    loadingForSellerReview: null,

    cliqCashConfig: null,
    cliqCashConfigStatus: null,
    cliqCashConfigError: null,

    cliqCashExpiringStatus: null,
    cliqCashExpiringDetails: null,
    cliqCashExpiringError: null,

    cliqCashbackDetailsStatus: null,
    cliqCashbackDetails: null,
    cliqCashbackDetailsError: null,

    wishlist: null,
    wishlistStatus: null,
    wishlistError: null,
    loadingForWishlist: false,

    userDetails: null,
    userDetailsStatus: null,
    userDetailsError: null,
    loadingForUserDetails: false,

    userCoupons: null,
    userCouponsStatus: null,
    userCouponsError: null,
    loadingForUserCoupons: false,

    userAlerts: null,
    userAlertsStatus: null,
    userAlertsError: null,
    loadingForUserAlerts: false,

    sendInvoice: null,
    sendInvoiceStatus: null,
    sendInvoiceError: null,
    loadingForSendInvoice: false,

    userAddress: null,
    userAddressStatus: null,
    userAddressError: null,

    transactionDetails: null,
    transactionDetailsStatus: null,
    transactionDetailsError: null,

    removeAddressStatus: null,
    removeAddressError: null,

    updateProfileStatus: null,
    updateProfileError: null,

    changePasswordStatus: null,
    changePasswordError: null,
    changePasswordDetails: null,

    returnProductDetails: null,
    returnRequest: null,
    editAddressStatus: null,
    editAddressError: null,

    addUserAddressStatus: null,
    addUserAddressError: null,

    followedBrands: null,
    followedBrandsStatus: null,
    followedBrandsError: null,
    loadingForFollowedBrands: false,

    cliqCashUserDetailsStatus: null,
    cliqCashUserDetailsError: null,
    cliqCashUserDetails: null,

    cliqCashVoucherDetailsStatus: null,
    cliqCashVoucherDetailsError: null,
    cliqCashVoucherDetails: null,

    returnPinCodeStatus: null,
    returnPinCodeValues: null,
    returnPinCodeError: null,

    returnInitiateStatus: null,
    returnInitiateError: null,
    returnInitiate: null,
    giftCards: null,
    giftCardStatus: null,
    giftCardsError: null,
    loadingForGiftCard: false,

    giftCardDetails: null,
    giftCardDetailsStatus: null,
    giftCardDetailsError: null,
    loadingForGiftCardDetails: false,

    getOtpToActivateWallet: null,
    getOtpToActivateWalletStatus: null,
    getOtpToActivateWalletError: null,
    loadingForGetOtpToActivateWallet: false,

    verifyWallet: null,
    verifyWalletStatus: null,
    verifyWalletError: null,
    loadingForverifyWallet: false,

    getPinCodeDetails: null,
    getPinCodeStatus: null,
    getPinCodeError: null,

    updateReturnDetails: null,
    updateReturnDetailsStatus: null,
    updateReturnDetailsError: null,
    loadingForUpdateReturnDetails: null,

    cancelProductDetails: null,
    cancelProductDetailsStatus: null,
    cancelProductDetailsError: null,
    loadingForCancelProductDetails: false,

    cancelProduct: null,
    cancelProductStatus: null,
    cancelProductError: null,
    loadingForCancelProduct: false,

    logoutUserStatus: null,
    logoutUserError: null,

    msdUpdateProfileStatus: null,
    msdUpdateProfileError: null,

    reSendEmailStatus: null,
    reSendEmailError: null,
    reSendEmailLoader: false,

    customerQueriesDataStatus: null,
    customerQueriesDataError: null,
    customerQueriesDataLoading: false,
    customerQueriesData: null,

    customerQueriesOtherIssueDataStatus: null,
    customerQueriesOtherIssueDataError: null,
    customerQueriesOtherIssueLoading: false,
    customerQueriesOtherIssueData: null,

    getFAQDataStatus: null,
    FAQDataLoading: false,
    FAQData: null,
    getFAQDataError: null,

    getFAQRelatedDataStatus: null,
    FAQRelatedDataLoading: false,
    FAQRelatedData: null,
    getFAQRelatedDataError: null,

    orderRelatedQuestionsStatus: null,
    orderRelatedQuestionsError: null,
    orderRelatedQuestionsData: null,
    orderRelatedIssueLoading: false,

    cliqCareWmsStatus: null,
    cliqCareWmsError: null,
    cliqCareWmsLoading: false,
    cliqCareWms: null,

    ordersTransactionDataStatus: null,
    ordersTransactionDataError: null,
    ordersTransactionLoading: false,
    ordersTransactionData: null,

    uploadUserFileStatus: null,
    uploadUserFileError: null,
    uploadUserFileLoading: false,
    uploadUserFile: null,

    submitOrderDetailsStatus: null,
    submitOrderDetailsError: null,
    submitOrderDetailsLoading: false,
    submitOrderDetails: null,

    userReviewStatus: null,
    userReviewError: null,
    loadingForUserReview: false,
    userReview: null,
    retryPaymentDetails: null,
    retryPaymentDetailsStatus: null,
    retryPaymentDetailsError: null,
    retryPaymentDetailsLoading: false,

    submitImageUploadDetailsStatus: null,
    submitImageUploadDetails: null,
    loadingForsubmitImageUploadDetails: false,
    submitImageUploadDetailsError: null,

    getRefundOptionsStatus: null,
    loadingForGetRefundOptions: false,
    getRefundOptionsDetails: null,
    getRefundOptionsError: null,

    getRefundModesStatus: null,
    loadingForGetRefundModes: false,
    getRefundModesDetails: null,
    getRefundModesError: null,

    updateRefundModeStatus: null,
    loadingForUpdateRefundMode: false,
    updateRefundModeDetails: null,
    updateRefundModeError: null,

    getCustomerBankDetailsStatus: null,
    loadingForgetCustomerBankDetails: false,
    getCustomerBankDetailsDetails: null,
    getCustomerBankDetailsError: null,

    updateCustomerBankDetailsStatus: null,
    loadingForUpdateCustomerBankDetails: false,
    updateCustomerBankDetails: null,
    updateCustomerBankDetailsError: null,

    getReturnModesDetailsStatus: null,
    loadingForGetReturnModesDetails: false,
    getReturnModesDetails: null,
    getReturnModesDetailsError: null,

    updateReturnConfirmationStatus: null,
    loadingForUpdateReturnConfirmation: false,
    updateReturnConfirmation: null,
    updateReturnConfirmationError: null,

    getRefundTransactionSummaryStatus: null,
    loadingForGetRefundTransactionSummary: false,
    getRefundTransactionSummary: null,
    getRefundTransactionSummaryError: null,

    getReturnReasonsStatus: null,
    loadingForGetReturnReasons: false,
    getReturnReasonsDetails: null,
    getReturnReasonsError: null,

    updateReturnCancellationStatus: null,
    loadingForUpdateReturnCancellation: false,
    updateReturnCancellationDetails: null,
    updateReturnCancellationError: null,

    updateReturnHOTCStatus: null,
    loadingForUpdateReturnHOTC: false,
    updateReturnHOTCDetails: null,
    updateReturnHOTCError: null,

    cncToHdDetails: null,
    cncToHdDetailsStatus: null,
    cncToHdDetailsError: null,
    cncToHdDetailsLoading: false,
    addUserUPIStatus: false,
    addUserUPIDetails: null,
    addUserUPIError: null,
    userRatingStatus: null,
    userRatingError: null,
    userRating: null,

    UserNotificationHeaderText: "",
    UserNotificationDetailsStatus: null,
    UserNotificationDetailsError: null,
    UserNotificationDetails: null,
    UserNotificationConfig: null,

    checkBalanceStatus: null,
    checkBalanceDetailsError: null,
    checkBalanceDetails: null,
    customerQueriesFieldStatus: null,
    customerQueriesFieldError: null,
    customerQueriesField: null,
    customerQueriesLoading: false,

    currentState: null,
    exchangeCashbackDetailsStatus: null,
    exchangeCashbackDetailsLoading: false,
    exchangeCashbackDetails: null,
    exchangeCashbackDetailsError: null,

    submitExchangeCashbackDetailsStatus: null,
    submitExchangeCashbackDetailsLoading: false,
    submitExchangeCashbackDetails: null,
    submitExchangeCashbackDetailsError: null,

    cliq2CallConfigDataStatus: null,
    cliq2CallConfigDataLoading: false,
    cliq2CallConfigData: null,
    cliq2CallConfigDataError: null,

    genesysResponseStatus: null,
    genesysResponseLoading: false,
    genesysResponseData: null,
    genesysResponseError: null,

    genesysCustomerCallRequestStatus: null,
    genesysCustomerCallRequestLoading: false,
    genesysCustomerCallRequestData: null,
    genesysCustomerCallRequestError: null,

    submitCaptureAttachmentsStatus: null,
    submitCaptureAttachmentsLoading: false,
    submitCaptureAttachmentsData: null,
    submitCaptureAttachmentsError: null,

    ticketDetailsStatus: null,
    ticketHistoryDetails: null,
    initialTicketDetailsData: null,
    ticketDetailsDataLoading: false,
    ticketDetailsError: null,

    haptikBotConfigDataStatus: null,
    haptikBotConfigDataLoading: false,
    haptikBotConfigData: null,
    haptikBotConfigDataError: null,

	getPendingReviewsStatus: null,
	getPendingReviewsLoading: false,
	getPendingReviewsError: null,
	getPendingReviewsDetails: null,

	getPublishedReviewsStatus: null,
	getPublishedReviewsLoading: false,
	getPublishedReviewsError: null,
	getPublishedReviewsDetails: null,
  },
  action
) => {
  let currentReturnRequest, cloneRetryPaymentDetails;
  switch (action.type) {
    case CLEAR_ERROR:
      return Object.assign({}, state, {
        error: null,
        orderDetailsError: null,
        fetchOrderDetailsError: null,
        userDetailsError: null,
        userCouponsError: null,
        userAlertsError: null,
        sendInvoiceError: null,
        userAddressError: null,
        removeAddressError: null,
        editAddressError: null,
        addUserAddressError: null,
        transactionDetailsError: null,
        followedBrandsError: null,
        cliqCashUserDetailsError: null,
        cliqCashVoucherDetailsError: null,
        returnPinCodeError: null,
        giftCardsError: null,
        giftCardDetailsError: null,
        getOtpToActivateWalletError: null,
        getPinCodeError: null,
        updateReturnDetailsError: null,
        cancelProductDetailsError: null,
        cancelProductError: null,
        verifyWalletError: null,
        wishlistError: null,
        updateProfileError: null,
        changePasswordError: null,
        reSendEmailError: null,
        pinCodeDetails: null,
        UserNotificationDetailsError: null
      });
    case accountActions.GET_RETURN_REQUEST:
    case accountActions.RETURN_PRODUCT_DETAILS_REQUEST:
      return Object.assign({}, state, {
        status: action.status,
        loading: true,
        error: null
      });
    case accountActions.GET_RETURN_REQUEST_SUCCESS:
      return Object.assign({}, state, {
        status: SUCCESS,
        loading: false,
        returnRequest: action.returnRequest
      });
    case accountActions.GET_RETURN_REQUEST_FAILURE:
      return Object.assign({}, state, {
        status: action.status,
        loading: false,
        error: action.error
      });
    case accountActions.RETURN_PRODUCT_DETAILS_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        status: action.state,
        returnProductDetails: action.returnProductDetails
      });
    case accountActions.RETURN_PRODUCT_DETAILS_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        status: action.status,
        error: action.error
      });

    case accountActions.QUICK_DROP_STORE_REQUEST:
      return Object.assign({}, state, {
        status: action.status,
        loading: true,
        error: null
      });
    case accountActions.QUICK_DROP_STORE_SUCCESS:
      currentReturnRequest = cloneDeep(state.returnRequest);
      Object.assign(currentReturnRequest, {
        returnStoreDetailsList: action.addresses
      });

      return Object.assign({}, state, {
        loading: false,
        status: action.state,
        returnRequest: currentReturnRequest
      });
    case accountActions.QUICK_DROP_STORE_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        status: action.status,
        error: action.error
      });

    case accountActions.GET_GIFTCARD_REQUEST:
      return Object.assign({}, state, {
        giftCardStatus: action.status,
        loadingForGiftCard: true
      });

    case accountActions.GET_GIFTCARD_SUCCESS:
      return Object.assign({}, state, {
        giftCardStatus: action.status,
        giftCards: action.giftCards,
        loadingForGiftCard: false
      });

    case accountActions.GET_GIFTCARD_FAILURE:
      return Object.assign({}, state, {
        giftCardStatus: action.status,
        giftCardsError: action.error,
        loadingForGiftCard: false
      });

    case accountActions.CREATE_GIFT_CARD_REQUEST:
      return Object.assign({}, state, {
        giftCardDetailsStatus: action.status,
        loadingForGiftCardDetails: true
      });

    case accountActions.CREATE_GIFT_CARD_SUCCESS:
      return Object.assign({}, state, {
        giftCardDetailsStatus: action.status,
        giftCardDetails: action.giftCardDetails,
        loadingForGiftCardDetails: false
      });

    case accountActions.CREATE_GIFT_CARD_FAILURE:
      return Object.assign({}, state, {
        giftCardDetailsStatus: action.status,
        giftCardDetailsError: action.error,
        loadingForGiftCardDetails: false
      });
    case accountActions.GET_OTP_TO_ACTIVATE_WALLET_REQUEST:
      return Object.assign({}, state, {
        getOtpToActivateWalletStatus: action.status,
        loadingForGetOtpToActivateWallet: true
      });

    case accountActions.GET_OTP_TO_ACTIVATE_WALLET_SUCCESS:
      return Object.assign({}, state, {
        getOtpToActivateWalletStatus: action.status,
        getOtpToActivateWallet: action.getOtpToActivateWallet,
        loadingForGetOtpToActivateWallet: false
      });

    case accountActions.GET_OTP_TO_ACTIVATE_WALLET_FAILURE:
      return Object.assign({}, state, {
        getOtpToActivateWalletStatus: action.status,
        getOtpToActivateWalletError: action.error,
        loadingForGetOtpToActivateWallet: false
      });

    case accountActions.VERIFY_WALLET_REQUEST:
      return Object.assign({}, state, {
        verifyWalletStatus: action.status,
        loadingForverifyWallet: true
      });

    case accountActions.VERIFY_WALLET_SUCCESS:
      return Object.assign({}, state, {
        verifyWalletStatus: action.status,
        verifyWallet: action.verifyWallet,
        loadingForverifyWallet: false
      });

    case accountActions.VERIFY_WALLET_FAILURE:
      return Object.assign({}, state, {
        verifyWalletStatus: action.status,
        verifyWalletError: action.error,
        loadingForverifyWallet: false
      });
    case accountActions.GET_TRANSACTION_DETAILS_REQUEST:
      return Object.assign({}, state, {
        transactionDetailsStatus: action.status,
        loading: true
      });

    case accountActions.GET_TRANSACTION_DETAILS_SUCCESS:
      return Object.assign({}, state, {
        transactionDetailsStatus: action.status,
        transactionDetails: action.transactionDetails,
        loading: false
      });

    case accountActions.GET_TRANSACTION_DETAILS_FAILURE:
      return Object.assign({}, state, {
        transactionDetailsStatus: action.status,
        transactionDetailsError: action.error,
        loading: false
      });

    case accountActions.SUBMIT_SELF_COURIER_INFO_REQUEST:
      return Object.assign({}, state, {
        updateReturnDetailsStatus: action.status,
        loadingForUpdateReturnDetails: true
      });

    case accountActions.SUBMIT_SELF_COURIER_INFO_SUCCESS:
      return Object.assign({}, state, {
        updateReturnDetailsStatus: action.status,
        updateReturnDetails: action.updateReturnDetails,
        loadingForUpdateReturnDetails: false
      });

    case accountActions.SUBMIT_SELF_COURIER_INFO_FAILURE:
      return Object.assign({}, state, {
        updateReturnDetailsStatus: action.status,
        updateReturnDetailsError: action.error,
        loadingForUpdateReturnDetails: false
      });

    case accountActions.GET_SAVED_CARD_REQUEST:
      return Object.assign({}, state, {
        status: action.status,
        loading: true
      });

    case accountActions.GET_SAVED_CARD_SUCCESS:
      return Object.assign({}, state, {
        status: action.status,
        savedCards: action.savedCards,
        loading: false
      });

    case accountActions.GET_SAVED_CARD_FAILURE:
      return Object.assign({}, state, {
        status: action.status,
        error: action.error,
        loading: false
      });

    case accountActions.REMOVE_SAVED_CARD_REQUEST:
      return Object.assign({}, state, {
        status: action.status,
        loading: true
      });

    case accountActions.REMOVE_SAVED_CARD_SUCCESS:
      return Object.assign({}, state, {
        status: action.status,
        loading: false
      });

    case accountActions.REMOVE_SAVED_CARD_FAILURE:
      return Object.assign({}, state, {
        status: action.status,
        error: action.error,
        loading: false
      });

    case accountActions.REMOVE_SAVED_UPI_REQUEST:
      return Object.assign({}, state, {
        status: action.status,
        loading: true
      });

    case accountActions.REMOVE_SAVED_UPI_SUCCESS:
      return Object.assign({}, state, {
        status: action.status,
        loading: false
      });

    case accountActions.REMOVE_SAVED_UPI_FAILURE:
      return Object.assign({}, state, {
        status: action.status,
        error: action.error,
        loading: false
      });

    case accountActions.GET_ALL_ORDERS_REQUEST:
      return Object.assign({}, state, {
        orderDetailsStatus: action.status,
        loading: true
      });
    case accountActions.GET_ALL_ORDERS_SUCCESS:
      let currentOrderDetailObj = state.orderDetails
        ? cloneDeep(state.orderDetails)
        : {};
      if (
        action.isPaginated &&
        currentOrderDetailObj &&
        currentOrderDetailObj.orderData
      ) {
        currentOrderDetailObj.orderData = currentOrderDetailObj.orderData.concat(
          action.orderDetails.orderData
        );
        currentOrderDetailObj.currentPage =
          currentOrderDetailObj.currentPage + 1;
      } else {
        currentOrderDetailObj = action.orderDetails;
        Object.assign(currentOrderDetailObj, {
          currentPage: 0
        });
      }
      // let reviewedProductList = [];
      // if (
      //   currentOrderDetailObj &&
      //   currentOrderDetailObj.orderData
      // ) {
      //   currentOrderDetailObj.orderData.map(
      //     order => {
      //       order.products.forEach(product => {
      //         if (product.isReviewed)
      //           reviewedProductList.push(product.productcode)
      //       })
      //     }
      //   )
      // }

      return Object.assign({}, state, {
        orderDetailsStatus: action.status,
        orderDetails: currentOrderDetailObj,
        loading: false
      });

    case accountActions.GET_ALL_ORDERS_FAILURE:
      return Object.assign({}, state, {
        orderDetailsStatus: action.status,
        orderDetailsError: action.error,
        loading: false
      });

    case accountActions.GET_ALL_SELLERS_REQUEST:
      return Object.assign({}, state, {
        sellerDetailsStatus: action.status,
        loading: true
      });
    case accountActions.GET_ALL_SELLERS_SUCCESS:
      let currentSellerDetailObj = state.sellerDetails
        ? cloneDeep(state.sellerDetails)
        : {};
      if (currentSellerDetailObj && currentSellerDetailObj.sellerData) {
        currentSellerDetailObj.sellerData = currentSellerDetailObj.sellerData.concat(
          action.sellerDetails.reviewRatingInfo
        );
      } else {
        currentSellerDetailObj = action.sellerDetails;
        Object.assign(currentSellerDetailObj, {
          currentPage: 0
        });
      }
      return Object.assign({}, state, {
        sellerDetailsStatus: action.status,
        sellerDetails: currentSellerDetailObj,
        loading: false
      });

    case accountActions.GET_ALL_SELLERS_FAILURE:
      return Object.assign({}, state, {
        sellerDetailsStatus: action.status,
        sellerDetailsError: action.error,
        loading: false
      });

    case accountActions.SUBMIT_SELLER_REVIEW_BY_USER:
      return Object.assign({}, state, {});

    case accountActions.SELLER_REVIEW_SUBMIT_FAILURE:
      return Object.assign({}, state, {
        sellerReviewStatus: action.status,
        sellerReviewError: action.error,
        loadingForSellerReview: false
      });

    case accountActions.GET_ALL_SELLERS_REVIEW_REQUEST:
      return Object.assign({}, state, {
        sellerDetailsStatus: action.status,
        loading: true
      });
    case accountActions.GET_ALL_SELLERS_REVIEW_SUCCESS:
      let currentSellerReviewDetailObj = state.sellerReviewDetails
        ? cloneDeep(state.sellerReviewDetails)
        : {};
      if (
        currentSellerReviewDetailObj &&
        currentSellerReviewDetailObj.sellerData
      ) {
        currentSellerReviewDetailObj.sellerData = currentSellerReviewDetailObj.sellerData.concat(
          action.sellerReviewDetails.reviewRatingInfo
        );
      } else {
        currentSellerReviewDetailObj = action.sellerDetails;
        Object.assign(currentSellerReviewDetailObj, {
          currentPage: 0
        });
      }
      return Object.assign({}, state, {
        sellerReviewDetailsStatus: action.status,
        sellerReviewDetails: currentSellerReviewDetailObj,
        loading: false
      });

    case accountActions.GET_ALL_SELLERS_REVIEW_FAILURE:
      return Object.assign({}, state, {
        sellerReviewDetailsStatus: action.status,
        sellerReviewDetailsError: action.error,
        loading: false
      });
    case accountActions.GET_WISHLIST_REQUEST:
      return Object.assign({}, state, {
        wishlistStatus: action.status,
        loadingForWishlist: true
      });

    case accountActions.GET_WISHLIST_SUCCESS:
      return Object.assign({}, state, {
        wishlistStatus: action.status,
        wishlist: action.wishlist,
        loadingForWishlist: false
      });

    case accountActions.GET_WISHLIST_FAILURE:
      return Object.assign({}, state, {
        wishlistStatus: action.status,
        wishlistError: action.error,
        loadingForWishlist: false
      });
    case accountActions.GET_USER_DETAILS_REQUEST:
      return Object.assign({}, state, {
        userDetailsStatus: action.status,
        loadingForUserDetails: true
      });

    case accountActions.GET_USER_DETAILS_SUCCESS:
      return Object.assign({}, state, {
        userDetailsStatus: action.status,
        userDetails: action.userDetails,
        loadingForUserDetails: false
      });

    case accountActions.GET_USER_DETAILS_FAILURE:
      return Object.assign({}, state, {
        userDetailsStatus: action.status,
        userDetailsError: action.error,
        loadingForUserDetails: false
      });

    case accountActions.GET_USER_COUPON_REQUEST:
      return Object.assign({}, state, {
        userCouponsStatus: action.status,
        loadingForUserCoupons: true
      });

    case accountActions.GET_USER_COUPON_SUCCESS:
      return Object.assign({}, state, {
        userCouponsStatus: action.status,
        userCoupons: action.userCoupons,
        loadingForUserCoupons: false
      });

    case accountActions.GET_USER_COUPON_FAILURE:
      return Object.assign({}, state, {
        userCouponsStatus: action.status,
        userCouponsError: action.error,
        loadingForUserCoupons: false
      });
    case accountActions.GET_USER_ALERTS_REQUEST:
      return Object.assign({}, state, {
        userAlertsStatus: action.status,
        loadingForUserAlerts: true
      });

    case accountActions.GET_USER_ALERTS_SUCCESS:
      return Object.assign({}, state, {
        userAlertsStatus: action.status,
        userAlerts: action.userAlerts,
        loadingForUserAlerts: false
      });

    case accountActions.GET_USER_ALERTS_FAILURE:
      return Object.assign({}, state, {
        userAlertsStatus: action.status,
        userAlertsError: action.error,
        loadingForUserAlerts: false
      });
    case accountActions.GET_FOLLOWED_BRANDS_REQUEST:
      return Object.assign({}, state, {
        followedBrandsStatus: action.status,
        loadingForFollowedBrands: true
      });

    case accountActions.GET_FOLLOWED_BRANDS_SUCCESS:
      return Object.assign({}, state, {
        followedBrandsStatus: action.status,
        followedBrands: action.followedBrands,
        loadingForFollowedBrands: false
      });

    case accountActions.GET_FOLLOWED_BRANDS_FAILURE:
      return Object.assign({}, state, {
        followedBrandsStatus: action.status,
        followedBrandsError: action.error,
        loadingForFollowedBrands: false
      });
    case accountActions.FOLLOW_AND_UN_FOLLOW_BRANDS_IN_MY_ACCOUNT_SUCCESS:
      const currentBrands = cloneDeep(state.followedBrands);
      const indexToBeRemoved = currentBrands.findIndex(brand => {
        return brand.id === action.brandId;
      });
      currentBrands.splice(indexToBeRemoved, 1);
      return Object.assign({}, state, {
        followedBrands: currentBrands
      });
    case accountActions.FETCH_ORDER_DETAILS_REQUEST:
      return Object.assign({}, state, {
        fetchOrderDetailsStatus: action.status,
        loadingForFetchOrderDetails: true
      });

    case accountActions.FETCH_ORDER_DETAILS_SUCCESS:
      return Object.assign({}, state, {
        fetchOrderDetailsStatus: action.status,
        fetchOrderDetails: action.fetchOrderDetails,
        loadingForFetchOrderDetails: false
      });

    case accountActions.FETCH_ORDER_DETAILS_FAILURE:
      return Object.assign({}, state, {
        fetchOrderDetailsStatus: action.status,
        fetchOrderDetailsError: action.error,
        loadingForFetchOrderDetails: false
      });

    case accountActions.FETCH_ORDER_ITEM_DETAILS_REQUEST:
      return Object.assign({}, state, {
        fetchOrderItemDetailsStatus: action.status,
        loadingForFetchOrderItemDetails: true
      });

    case accountActions.FETCH_ORDER_ITEM_DETAILS_SUCCESS:
      return Object.assign({}, state, {
        fetchOrderItemDetailsStatus: action.status,
        fetchOrderItemDetails: action.fetchOrderItemDetails,
        loadingForFetchOrderItemDetails: false
      });

    case accountActions.FETCH_ORDER_ITEM_DETAILS_FAILURE:
      return Object.assign({}, state, {
        fetchOrderItemDetailsStatus: action.status,
        fetchOrderItemDetailsError: action.error,
        loadingForFetchOrderItemDetails: false
      });

    case accountActions.GET_CLIQ_CASH_CONFIG_REQUEST:
      return Object.assign({}, state, {
        cliqCashConfigStatus: action.status,
        loading: true
      });

    case accountActions.GET_CLIQ_CASH_CONFIG_SUCCESS:
      return Object.assign({}, state, {
        cliqCashConfigStatus: action.status,
        cliqCashConfig: action.cliqCashConfig,
        loading: false
      });

    case accountActions.GET_CLIQ_CASH_CONFIG_FAILURE:
      return Object.assign({}, state, {
        cliqCashConfigStatus: action.status,
        cliqCashConfigError: action.error,
        loading: false
      });

    case accountActions.GET_USER_CLIQ_CASH_EXPIRING_DETAILS_REQUEST:
      return Object.assign({}, state, {
        cliqCashExpiringStatus: action.status,
        loading: true
      });
    case accountActions.GET_USER_CLIQ_CASH_EXPIRING_DETAILS_SUCCESS:
      const expDetails = action.cliqCashExpiringDetails;
      const giftCardDetails = {};
      if (
        expDetails.expiryDate &&
        expDetails.expiryTime &&
        expDetails.amount.value
      ) {
        (giftCardDetails.isExpiring = true),
          (giftCardDetails.expiryDate = expDetails.expiryDate),
          (giftCardDetails.expiryTime = expDetails.expiryTime),
          (giftCardDetails.value = expDetails.amount.value),
          (giftCardDetails.expiryDateTime = expDetails.expiryDateTime);
      } else {
        giftCardDetails.isExpiring = false;
      }
      return Object.assign({}, state, {
        cliqCashExpiringStatus: action.status,
        cliqCashExpiringDetails: giftCardDetails,
        loading: false
      });

    case accountActions.GET_USER_CLIQ_CASH_EXPIRING_DETAILS_FAILURE:
      return Object.assign({}, state, {
        cliqCashExpiringStatus: action.status,
        cliqCashExpiringError: action.error,
        loading: false
      });

    case accountActions.GET_USER_CLIQ_CASHBACK_DETAILS_REQUEST:
      return Object.assign({}, state, {
        cliqCashbackDetailsStatus: action.status,
        loading: true
      });

    case accountActions.GET_USER_CLIQ_CASHBACK_DETAILS_SUCCESS:
      return Object.assign({}, state, {
        cliqCashbackDetailsStatus: action.status,
        cliqCashbackDetails: action.getCliqCashbackDetails,
        loading: false
      });

    case accountActions.GET_USER_CLIQ_CASHBACK_DETAILS_FAILURE:
      return Object.assign({}, state, {
        cliqCashbackDetailsStatus: action.status,
        cliqCashbackDetailsError: action.error,
        loading: false
      });

    case accountActions.SEND_INVOICE_REQUEST:
      return Object.assign({}, state, {
        sendInvoiceStatus: action.status,
        loadingForSendInvoice: true
      });

    case accountActions.SEND_INVOICE_SUCCESS:
      return Object.assign({}, state, {
        sendInvoiceStatus: action.status,
        sendInvoice: action.sendInvoice,
        loadingForSendInvoice: false
      });

    case accountActions.SEND_INVOICE_FAILURE:
      return Object.assign({}, state, {
        sendInvoiceStatus: action.status,
        sendInvoiceError: action.error,
        loadingForSendInvoice: false
      });
    case cartActions.GET_USER_ADDRESS_REQUEST:
      return Object.assign({}, state, {
        userAddressStatus: action.status,
        loading: true
      });

    case cartActions.GET_USER_ADDRESS_SUCCESS:
      return Object.assign({}, state, {
        userAddressStatus: action.status,
        userAddress: action.userAddress,
        loading: false
      });

    case cartActions.GET_USER_ADDRESS_FAILURE:
      return Object.assign({}, state, {
        userAddressStatus: action.status,
        userAddressError: action.error,
        loading: false
      });

    case accountActions.REMOVE_ADDRESS_REQUEST:
      return Object.assign({}, state, {
        removeAddressStatus: action.status,
        loading: true
      });

    case accountActions.REMOVE_ADDRESS_SUCCESS:
      const currentAddresses = cloneDeep(state.userAddress);
      const indexOfAddressToBeRemove = currentAddresses.addresses.findIndex(
        address => {
          return address.id === action.addressId;
        }
      );
      currentAddresses.addresses.splice(indexOfAddressToBeRemove, 1);
      return Object.assign({}, state, {
        removeAddressStatus: action.status,
        userAddress: currentAddresses,
        loading: false
      });

    case accountActions.REMOVE_ADDRESS_FAILURE:
      return Object.assign({}, state, {
        removeAddressStatus: action.status,
        removeAddressError: action.error,
        loading: false
      });

    case accountActions.UPDATE_PROFILE_REQUEST:
      return Object.assign({}, state, {
        updateProfileStatus: action.status,
        loading: true
      });

    case accountActions.UPDATE_PROFILE_SUCCESS:
      const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);

      //deletre cookie
      Cookie.deleteCookie(LOGGED_IN_USER_DETAILS);
      //assign firstName and Last Name
      let updateUserDetails = JSON.parse(userDetails);
      updateUserDetails.firstName =
        action.userDetails.firstName !== undefined &&
        action.userDetails.firstName !== "undefined"
          ? action.userDetails.firstName
          : "";
      updateUserDetails.lastName =
        action.userDetails.lastName !== undefined &&
        action.userDetails.lastName !== "undefined"
          ? action.userDetails.lastName
          : "";
      Cookies.createCookie(
        LOGGED_IN_USER_DETAILS,
        JSON.stringify(updateUserDetails)
      );
      return Object.assign({}, state, {
        updateProfileStatus: action.status,
        userDetails: action.userDetails,
        loading: false
      });

    case accountActions.UPDATE_PROFILE_FAILURE:
      return Object.assign({}, state, {
        updateProfileStatus: action.status,
        updateProfileError: action.error,
        loading: false
      });

    case accountActions.LOG_OUT_ACCOUNT_USING_MOBILE_NUMBER:
      Cookie.deleteCookie(LOGGED_IN_USER_DETAILS);
      Cookie.deleteCookie(CUSTOMER_ACCESS_TOKEN);
      return Object.assign({}, state, {
        type: action.type
      });

    case accountActions.CHANGE_PASSWORD_REQUEST:
      return Object.assign({}, state, {
        changePasswordStatus: action.status,
        loading: false
      });

    case accountActions.CHANGE_PASSWORD_SUCCESS:
      return Object.assign({}, state, {
        changePasswordStatus: action.status,
        changePasswordDetails: action.passwordDetails,
        loading: false
      });

    case accountActions.CHANGE_PASSWORD_FAILURE:
      return Object.assign({}, state, {
        changePasswordStatus: action.status,
        changePasswordError: action.error,
        loading: false
      });

    case accountActions.GET_USER_CLIQ_CASH_DETAILS_REQUEST:
      return Object.assign({}, state, {
        cliqCashUserDetailsStatus: action.status,
        loading: true
      });

    case accountActions.GET_USER_CLIQ_CASH_DETAILS_SUCCESS:
      return Object.assign({}, state, {
        cliqCashUserDetailsStatus: action.status,
        cliqCashUserDetails: action.cliqCashDetails,
        loading: false
      });

    case accountActions.GET_USER_CLIQ_CASH_DETAILS_FAILURE:
      return Object.assign({}, state, {
        cliqCashUserDetailsStatus: action.status,
        cliqCashUserDetailsError: action.error,
        loading: false
      });

    case accountActions.REDEEM_CLIQ_VOUCHER_REQUEST:
      return Object.assign({}, state, {
        cliqCashVoucherDetailsStatus: action.status,
        loading: true
      });

    case accountActions.REDEEM_CLIQ_VOUCHER_SUCCESS:
      return Object.assign({}, state, {
        cliqCashVoucherDetailsStatus: action.status,
        cliqCashVoucherDetails: action.cliqCashVoucherDetails,
        loading: false
      });

    case accountActions.REDEEM_CLIQ_VOUCHER_FAILURE:
      return Object.assign({}, state, {
        cliqCashVoucherDetailsStatus: action.status,
        cliqCashVoucherDetailsError: action.error,
        loading: false,
        error: action.error
      });

    case accountActions.NEW_RETURN_INITIATE_REQUEST:
      return Object.assign({}, state, {
        returnInitiateStatus: action.status,
        loading: true
      });
    case accountActions.NEW_RETURN_INITIATE_SUCCESS:
      return Object.assign({}, state, {
        returnInitiateStatus: action.status,
        returnInitiate: action.returnDetails,
        loading: false
      });

    case accountActions.NEW_RETURN_INITIATE_FAILURE:
      return Object.assign({}, state, {
        returnInitiateStatus: action.status,
        returnInitiateError: action.error,
        loading: false
      });

    case accountActions.RETURN_PIN_CODE_REQUEST:
      return Object.assign({}, state, {
        returnPinCodeStatus: action.status,
        loading: true
      });
    case accountActions.RETURN_PIN_CODE_SUCCESS:
      return Object.assign({}, state, {
        returnPinCodeStatus: action.status,
        returnPinCodeValues: action.returnDetails,
        loading: false
      });

    case accountActions.RETURN_PIN_CODE_FAILURE:
      let updatedReturnProductDetails = cloneDeep(state.returnProductDetails);
      updatedReturnProductDetails.returnModes =
        action.pinCodeDetails && action.pinCodeDetails.returnModes;
      return Object.assign({}, state, {
        returnPinCodeStatus: action.status,
        returnPinCodeError: action.error,
        returnProductDetails: updatedReturnProductDetails,
        loading: false
      });

    case accountActions.EDIT_ADDRESS_REQUEST:
      return Object.assign({}, state, {
        editAddressStatus: action.status,
        loading: true
      });

    case accountActions.EDIT_ADDRESS_SUCCESS:
      return Object.assign({}, state, {
        editAddressStatus: action.status,
        loading: false
      });

    case accountActions.EDIT_ADDRESS_FAILURE:
      return Object.assign({}, state, {
        editAddressStatus: action.status,
        editAddressError: action.error,
        loading: false
      });

    case cartActions.ADD_USER_ADDRESS_REQUEST:
      return Object.assign({}, state, {
        addUserAddressStatus: action.status,
        loading: true
      });

    case cartActions.ADD_USER_ADDRESS_SUCCESS:
      return Object.assign({}, state, {
        addUserAddressStatus: action.status,
        loading: false
      });

    case cartActions.ADD_USER_ADDRESS_FAILURE:
      return Object.assign({}, state, {
        addUserAddressStatus: action.status,
        addUserAddressError: action.error,
        loading: false
      });
    // UPI
    case accountActions.ADD_USER_UPI_REQUEST:
      return Object.assign({}, state, {
        addUserUPIStatus: action.status,
        loading: true
      });

    case accountActions.ADD_USER_UPI_SUCCESS:
      return Object.assign({}, state, {
        addUserUPIStatus: action.status,
        loading: false,
        addUserUPIDetails: action.upiResponse
      });

    case accountActions.ADD_USER_UPI_FAILURE:
      return Object.assign({}, state, {
        addUserUPIStatus: action.status,
        addUserUPIDetails: action.error,
        loading: false
      });
    case accountActions.ADD_USER_UPI_NULL_STATE:
      return Object.assign({}, state, {
        addUserUPIStatus: false,
        addUserUPIError: null,
        addUserUPIDetails: null,
        loading: false
      });
    // UPI finished

    case accountActions.GET_PIN_CODE_REQUEST:
      return Object.assign({}, state, {
        getPinCodeStatus: action.status
      });

    case accountActions.GET_PIN_CODE_SUCCESS:
      return Object.assign({}, state, {
        getPinCodeStatus: action.status,
        getPinCodeDetails: action.pinCode
      });

    case accountActions.GET_PIN_CODE_FAILURE:
      return Object.assign({}, state, {
        getPinCodeStatus: action.status,
        getPinCodeError: action.error
      });
    case accountActions.GET_PIN_CODE_CHANGE_ADDRESS_ORDERED_PRODUCT_REQUEST:
      return Object.assign({}, state, {
        getPinCodeStatus: action.status
      });

    case accountActions.GET_PIN_CODE_CHANGE_ADDRESS_ORDERED_PRODUCT_SUCCESS:
      return Object.assign({}, state, {
        getPinCodeStatus: action.status,
        getPinCodeDetails: action.pinCode
      });

    case accountActions.GET_PIN_CODE_CHANGE_ADDRESS_ORDERED_PRODUCT_FAILURE:
      return Object.assign({}, state, {
        getPinCodeStatus: action.status,
        getPinCodeError: action.error
      });
    case accountActions.GET_CANCEL_PRODUCT_DETAILS_REQUEST:
      return Object.assign({}, state, {
        cancelProductDetailsStatus: action.status,
        loadingForCancelProductDetails: true
      });

    case accountActions.GET_CANCEL_PRODUCT_DETAILS_SUCCESS:
      return Object.assign({}, state, {
        cancelProductDetailsStatus: action.status,
        cancelProductDetails: action.getDetailsOfCancelledProduct,
        loadingForCancelProductDetails: false
      });

    case accountActions.GET_CANCEL_PRODUCT_DETAILS_FAILURE:
      return Object.assign({}, state, {
        cancelProductDetailsStatus: action.status,
        cancelProductDetailsError: action.error,
        loadingForCancelProductDetails: false
      });

    case accountActions.CANCEL_PRODUCT_REQUEST:
      return Object.assign({}, state, {
        cancelProductStatus: action.status,
        loadingForCancelProduct: true
      });

    case accountActions.CANCEL_PRODUCT_SUCCESS:
      return Object.assign({}, state, {
        cancelProductStatus: action.status,
        cancelProduct: action.cancelProduct,
        loadingForCancelProduct: false
      });
    case accountActions.CANCEL_PRODUCT_FAILURE:
      return Object.assign({}, state, {
        cancelProductStatus: action.status,
        cancelProductError: action.error,
        loadingForCancelProduct: false
      });
    case accountActions.CLEAR_GIFT_CARD_STATUS: {
      return Object.assign({}, state, {
        giftCardDetails: null,
        giftCardDetailsStatus: null
      });
    }
    case accountActions.CLEAR_ACCOUNT_UPDATE_TYPE: {
      return Object.assign({}, state, {
        type: null,
        status: null
      });
    }
    case accountActions.Clear_ORDER_DATA: {
      return Object.assign({}, state, {
        type: null,
        status: null,
        orderDetails: null,
        loadingForClearOrderDetails: false
      });
    }
    case accountActions.RE_SET_ADD_ADDRESS_DETAILS: {
      return Object.assign({}, state, {
        addUserAddressStatus: null,
        addUserAddressError: null
      });
    }
    case accountActions.CLEAR_CHANGE_PASSWORD_DETAILS: {
      return Object.assign({}, state, {
        changePasswordStatus: null,
        changePasswordError: null
      });
    }
    case accountActions.CLEAR_PIN_CODE_STATUS: {
      return Object.assign({}, state, {
        getPinCodeStatus: null,
        getPinCodeError: null
      });
    }
    case accountActions.LOG_OUT_USER_REQUEST: {
      return Object.assign({}, state, {
        logoutUserStatus: action.status
      });
    }
    case accountActions.LOG_OUT_USER_SUCCESS: {
      Cookies.deleteCookie(CUSTOMER_ACCESS_TOKEN);
      Cookies.deleteCookie(CART_DETAILS_FOR_LOGGED_IN_USER);
      Cookies.deleteCookie(CART_DETAILS_FOR_ANONYMOUS);
      Cookies.deleteCookie(LOGGED_IN_USER_DETAILS);
      localStorage.clear();

      return Object.assign({}, state, {
        logoutUserStatus: action.status,
        isLoggedIn: false,
        type: action.type
      });
    }
    case accountActions.LOG_OUT_USER_FAILURE: {
      return Object.assign({}, state, {
        logoutUserStatus: action.status,
        logoutUserError: action.error
      });
    }

    case accountActions.UPDATE_PROFILE_MSD_REQUEST:
      return Object.assign({}, state, {
        msdUpdateProfileStatus: action.status
      });

    case accountActions.UPDATE_PROFILE_MSD_SUCCESS:
      return Object.assign({}, state, {
        msdUpdateProfileStatus: action.status
      });

    case accountActions.UPDATE_PROFILE_MSD_FAILURE:
      return Object.assign({}, state, {
        msdUpdateProfileStatus: action.status,
        msdUpdateProfileError: action.error
      });

    case accountActions.RESEND_EMAIL_FOR_GIFT_CARD_REQUEST:
      return Object.assign({}, state, {
        reSendEmailStatus: action.status,
        reSendEmailLoader: true
      });

    case accountActions.RESEND_EMAIL_FOR_GIFT_CARD_SUCCESS:
      return Object.assign({}, state, {
        reSendEmailStatus: action.status,
        reSendEmailLoader: false
      });

    case accountActions.RESEND_EMAIL_FOR_GIFT_CARD_FAILURE:
      return Object.assign({}, state, {
        reSendEmailStatus: action.status,
        reSendEmailError: action.error,
        reSendEmailLoader: false
      });

    // //Queries
    // case accountActions.GET_CUSTOMER_QUERIES_DATA_REQUEST:
    //   return Object.assign({}, state, {
    //     customerQueriesDataStatus: action.status,
    //     ordersRelatedLoading: true
    //   });

    // case accountActions.GET_CUSTOMER_QUERIES_DATA_SUCCESS:
    //   return Object.assign({}, state, {
    //     customerQueriesDataStatus: action.status,
    //     ordersRelatedLoading: false,
    //     customerQueriesData: action.customerQueriesData
    //   });

    // case accountActions.GET_CUSTOMER_QUERIES_DATA_FAILURE:
    //   return Object.assign({}, state, {
    //     customerQueriesDataStatus: action.status,
    //     customerQueriesDataError: action.error,
    //     ordersRelatedLoading: false
    //   });

    //Queries

    case accountActions.GET_CUSTOMER_OTHER_ISSUE_DATA_REQUEST:
      return Object.assign({}, state, {
        customerQueriesOtherIssueDataStatus: action.status,
        customerQueriesOtherIssueLoading: true
      });

    case accountActions.GET_CUSTOMER_OTHER_ISSUE_DATA_SUCCESS:
      return Object.assign({}, state, {
        customerQueriesOtherIssueDataStatus: action.status,
        customerQueriesOtherIssueLoading: false,
        customerQueriesOtherIssueData: action.customerQueriesData
      });

    case accountActions.GET_CUSTOMER_OTHER_ISSUE_DATA_FAILURE:
      return Object.assign({}, state, {
        customerQueriesOtherIssueDataStatus: action.status,
        customerQueriesOtherIssueDataError: action.error,
        customerQueriesOtherIssueLoading: false
      });

    case accountActions.GET_ALL_OTHERS_HELP_REQUEST:
      return {
        ...state,
        getFAQDataStatus: action.status,
        FAQDataLoading: true,
        getFAQDataError: null
      };
    case accountActions.GET_ALL_OTHERS_HELP_SUCCESS:
      return {
        ...state,
        getFAQDataStatus: action.status,
        FAQDataLoading: false,
        FAQData: action.data,
        getFAQDataError: null
      };
    case accountActions.GET_ALL_OTHERS_HELP_FAILURE:
      return {
        ...state,
        getFAQDataStatus: action.status,
        FAQDataLoading: false,
        getFAQDataError: action.error
      };

    case accountActions.GET_FAQ_RELATED_QUESTIONS_REQUEST:
      return {
        ...state,
        getFAQRelatedDataStatus: action.status,
        FAQRelatedDataLoading: true,
        getFAQRelatedDataError: null
      };
    case accountActions.GET_FAQ_RELATED_QUESTIONS_SUCCESS:
      return {
        ...state,
        getFAQRelatedDataStatus: action.status,
        FAQRelatedDataLoading: false,
        FAQRelatedData: action.data,
        getFAQRelatedDataError: null
      };
    case accountActions.GET_FAQ_RELATED_QUESTIONS_FAILURE:
      return {
        ...state,
        getFAQRelatedDataStatus: action.status,
        FAQRelatedDataLoading: false,
        getFAQRelatedDataError: action.error
      };

    case accountActions.GET_ORDER_RELATED_QUESTIONS_REQUEST:
      return Object.assign({}, state, {
        orderRelatedQuestionsStatus: action.status,
        orderRelatedIssueLoading: true
      });

    case accountActions.GET_ORDER_RELATED_QUESTIONS_SUCCESS:
      return Object.assign({}, state, {
        orderRelatedQuestionsStatus: action.status,
        orderRelatedIssueLoading: false,
        orderRelatedQuestionsData: action.orderRelatedQuestions
      });

    case accountActions.GET_ORDER_RELATED_QUESTIONS_FAILURE:
      return Object.assign({}, state, {
        orderRelatedQuestionsStatus: action.status,
        orderRelatedQuestionsError: action.error,
        orderRelatedIssueLoading: false
      });

    //Fields
    case accountActions.GET_CUSTOMER_QUERIES_FIELDS_REQUEST:
      return Object.assign({}, state, {
        customerQueriesFieldStatus: action.status,
        customerQueriesLoading: true
      });

    case accountActions.GET_CUSTOMER_QUERIES_FIELDS_SUCCESS:
      return Object.assign({}, state, {
        customerQueriesFieldStatus: action.status,
        customerQueriesLoading: false,
        customerQueriesField: action.customerQueriesField
      });

    case accountActions.GET_CUSTOMER_QUERIES_FIELDS_FAILURE:
      return Object.assign({}, state, {
        customerQueriesFieldStatus: action.status,
        customerQueriesFieldError: action.error,
        customerQueriesLoading: false
      });

    case accountActions.GET_CLIQ_CARE_WMS_REQUEST:
      return Object.assign({}, state, {
        cliqCareWmsStatus: action.status,
        cliqCareWmsLoading: true
      });

    case accountActions.GET_CLIQ_CARE_WMS_SUCCESS:
      return Object.assign({}, state, {
        cliqCareWmsStatus: action.status,
        cliqCareWmsLoading: false,
        cliqCareWms: action.cliqCareWmsResponse
      });

    case accountActions.GET_CLIQ_CARE_WMS_FAILURE:
      return Object.assign({}, state, {
        cliqCareWmsStatus: action.status,
        cliqCareWmsError: action.error,
        cliqCareWmsLoading: false
      });

    case accountActions.GET_ORDERS_TRANSACTION_DATA_REQUEST:
      return Object.assign({}, state, {
        ordersTransactionDataStatus: action.status,
        ordersTransactionLoading: true
      });
    case accountActions.GET_ORDERS_TRANSACTION_DATA_SUCCESS:
      let currentOrderTransactionDetailObj = state.ordersTransactionData
        ? cloneDeep(state.ordersTransactionData)
        : {};
      if (
        action.isPaginated &&
        currentOrderTransactionDetailObj &&
        currentOrderTransactionDetailObj.orderData
      ) {
        currentOrderTransactionDetailObj.orderData = currentOrderTransactionDetailObj.orderData.concat(
          action.ordersTransactionData.orderData
        );
        currentOrderTransactionDetailObj.currentPage =
          currentOrderTransactionDetailObj.currentPage + 1;
      } else {
        currentOrderTransactionDetailObj = action.ordersTransactionData;
        Object.assign(currentOrderTransactionDetailObj, {
          currentPage: 0
        });
      }
      return Object.assign({}, state, {
        ordersTransactionDataStatus: action.status,
        ordersTransactionData: currentOrderTransactionDetailObj,
        ordersTransactionLoading: false
      });
    case accountActions.GET_ORDERS_TRANSACTION_DATA_FAILURE:
      return Object.assign({}, state, {
        ordersTransactionDataStatus: action.status,
        ordersTransactionDataError: action.error,
        ordersTransactionLoading: false
      });
    case accountActions.CLEAR_ORDER_TRANSACTION_DATA: {
      return Object.assign({}, state, {
        type: null,
        status: null,
        ordersTransactionData: null,
        ordersRelatedLoading: false
      });
    }
    case accountActions.UPLOAD_USER_FILE_REQUEST:
      return Object.assign({}, state, {
        uploadUserFileStatus: action.status,
        uploadUserFileLoading: true
      });

    case accountActions.UPLOAD_USER_FILE_SUCCESS:
      return Object.assign({}, state, {
        uploadUserFileStatus: action.status,
        uploadUserFileLoading: false,

        uploadUserFile: action.uploadUserFile
      });
    case accountActions.UPLOAD_USER_FILE_FAILURE:
      return Object.assign({}, state, {
        uploadUserFileStatus: action.status,
        uploadUserFileError: action.error,
        uploadUserFileLoading: false
      });

    case accountActions.SUBMIT_ORDER_DETAILS_REQUEST:
      return Object.assign({}, state, {
        submitOrderDetailsStatus: action.status,
        submitOrderDetailsLoading: true
      });

    case accountActions.SUBMIT_ORDER_DETAILS_SUCCESS:
      return Object.assign({}, state, {
        submitOrderDetailsStatus: action.status,
        submitOrderDetailsLoading: false,

        submitOrderDetails: action.submitOrderDetails
      });
    case accountActions.SUBMIT_ORDER_DETAILS_FAILURE:
      return Object.assign({}, state, {
        submitOrderDetailsStatus: action.status,
        submitOrderDetailsError: action.error,
        submitOrderDetailsLoading: false
      });

    case accountActions.GET_USER_REVIEW_REQUEST:
      return Object.assign({}, state, {
        userReviewStatus: action.status,
        loadingForUserReview: true
      });

    case accountActions.GET_USER_REVIEW_SUCCESS:
      const currentReviews = cloneDeep(state.userReview);

      let updatedReviewsObj;
      if (action.userReview.pageNumber === 0) {
        updatedReviewsObj = Object.assign(
          {},
          currentReviews,
          action.userReview
        );
      } else {
        let updatedReviews = concat(
          currentReviews.reviews,
          action.userReview.reviews
        );
        updatedReviewsObj = Object.assign({}, currentReviews, {
          reviews: updatedReviews,
          pageNumber: action.userReview.pageNumber
        });
      }
      return Object.assign({}, state, {
        userReviewStatus: action.status,
        loadingForUserReview: false,
        userReview: updatedReviewsObj
      });
    case accountActions.GET_USER_REVIEW_FAILURE:
      return Object.assign({}, state, {
        userReviewStatus: action.status,
        userReviewError: action.error,
        loadingForUserReview: false
      });

    case accountActions.RETRY_PAYMENT_REQUEST:
      return Object.assign({}, state, {
        retryPaymentDetailsStatus: action.status,
        retryPaymentDetailsLoading: true
      });
    case accountActions.RETRY_PAYMENT_SUCCESS:
      return Object.assign({}, state, {
        retryPaymentDetailsStatus: action.status,
        retryPaymentDetailsLoading: false,
        retryPaymentDetails: action.retryPaymentDetails
      });
    case accountActions.RETRY_PAYMENT_FAILURE:
      return Object.assign({}, state, {
        retryPaymentDetailsStatus: action.status,
        retryPaymentDetailsError: action.error,
        retryPaymentDetailsLoading: false
      });

    case accountActions.SUBMIT_RETURNIMGUPLOAD_DETAILS_REQUEST:
      return Object.assign({}, state, {
        submitImageUploadDetailsStatus: action.status,
        loadingForsubmitImageUploadDetails: true
      });
    case accountActions.SUBMIT_RETURNIMGUPLOAD_DETAILS_SUCCESS:
      return Object.assign({}, state, {
        submitImageUploadDetailsStatus: action.status,
        submitImageUploadDetails: action.submitImageUploadDetails,
        loadingForsubmitImageUploadDetails: false
      });
    case accountActions.SUBMIT_RETURNIMGUPLOAD_DETAILS_FAILURE:
      return Object.assign({}, state, {
        submitImageUploadDetailsStatus: action.status,
        submitImageUploadDetailsError: action.error,
        loadingForsubmitImageUploadDetails: false
      });

    case accountActions.GET_REFUND_OPTIONS_DATA_REQUEST:
      return Object.assign({}, state, {
        getRefundOptionsStatus: action.status,
        loadingForGetRefundOptions: true
      });
    case accountActions.GET_REFUND_OPTIONS_DATA_SUCCESS:
      return Object.assign({}, state, {
        getRefundOptionsStatus: action.status,
        getRefundOptionsDetails: action.getRefundOptionsDetails,
        loadingForGetRefundOptions: false
      });
    case accountActions.GET_REFUND_OPTIONS_DATA_FAILURE:
      return Object.assign({}, state, {
        getRefundOptionsStatus: action.status,
        getRefundOptionsError: action.error,
        loadingForGetRefundOptions: false
      });

    case accountActions.GET_REFUND_MODES_REQUEST:
      return Object.assign({}, state, {
        getRefundModesStatus: action.status,
        loadingForGetRefundModes: true
      });
    case accountActions.GET_REFUND_MODES_SUCCESS:
      return Object.assign({}, state, {
        getRefundModesStatus: action.status,
        getRefundModesDetails: action.getRefundModesDetails,
        loadingForGetRefundModes: false
      });
    case accountActions.GET_REFUND_MODES_FAILURE:
      return Object.assign({}, state, {
        getRefundModesStatus: action.status,
        getRefundModesError: action.error,
        loadingForGetRefundModes: false
      });

    case accountActions.UPDATE_REFUND_MODE_REQUEST:
      return Object.assign({}, state, {
        updateRefundModeStatus: action.status,
        loadingForUpdateRefundMode: true
      });
    case accountActions.UPDATE_REFUND_MODE_SUCCESS:
      return Object.assign({}, state, {
        updateRefundModeStatus: action.status,
        updateRefundModeDetails: action.updateRefundModeDetails,
        loadingForUpdateRefundMode: false
      });
    case accountActions.UPDATE_REFUND_MODE_FAILURE:
      return Object.assign({}, state, {
        updateRefundModeStatus: action.status,
        updateRefundModeError: action.error,
        loadingForUpdateRefundMode: false
      });

    case accountActions.GET_CUSTOMER_BANK_DETAILS_REQUEST:
      return Object.assign({}, state, {
        getCustomerBankDetailsStatus: action.status,
        loadingForGetCustomerBankDetails: true
      });
    case accountActions.GET_CUSTOMER_BANK_DETAILS_SUCCESS:
      return Object.assign({}, state, {
        getCustomerBankDetailsStatus: action.status,
        getCustomerBankDetailsDetails: action.getCustomerBankDetailsDetails,
        loadingForGetCustomerBankDetails: false
      });
    case accountActions.GET_CUSTOMER_BANK_DETAILS_FAILURE:
      return Object.assign({}, state, {
        getCustomerBankDetailsStatus: action.status,
        getCustomerBankDetailsError: action.error,
        loadingForGetCustomerBankDetails: false
      });
    case accountActions.UPDATE_CUSTOMER_BANK_DETAILS_REQUEST:
      return Object.assign({}, state, {
        updateCustomerBankDetailsStatus: action.status,
        loadingForUpdateCustomerBankDetails: true
      });
    case accountActions.UPDATE_CUSTOMER_BANK_DETAILS_SUCCESS:
      return Object.assign({}, state, {
        updateCustomerBankDetailsStatus: action.status,
        updateCustomerBankDetails: action.updateCustomerBankDetails,
        loadingForUpdateCustomerBankDetails: false
      });
    case accountActions.UPDATE_CUSTOMER_BANK_DETAILS_FAILURE:
      return Object.assign({}, state, {
        updateCustomerBankDetailsStatus: action.status,
        updateCustomerBankDetailsError: action.error,
        loadingForUpdateCustomerBankDetails: false
      });
    case accountActions.GET_RETURN_MODES_REQUEST:
      return Object.assign({}, state, {
        getReturnModesDetailsStatus: action.status,
        loadingForGetReturnModesDetails: true
      });
    case accountActions.GET_RETURN_MODES_SUCCESS:
      return Object.assign({}, state, {
        getReturnModesDetailsStatus: action.status,
        loadingForGetReturnModesDetails: false,
        getReturnModesDetails: action.getReturnModesDetails
      });
    case accountActions.GET_RETURN_MODES_FAILURE:
      return Object.assign({}, state, {
        getReturnModesDetailsError: action.error,
        getReturnModesDetailsStatus: action.status,
        loadingForGetReturnModesDetails: false
      });
    case accountActions.UPDATE_RETURN_CONFIRMATION_REQUEST:
      return Object.assign({}, state, {
        updateReturnConfirmationStatus: action.status,
        loadingForUpdateReturnConfirmation: true
      });
    case accountActions.UPDATE_RETURN_CONFIRMATION_SUCCESS:
      return Object.assign({}, state, {
        updateReturnConfirmationStatus: action.status,
        updateReturnConfirmation: action.updateReturnConfirmation,
        loadingForUpdateReturnConfirmation: false
      });
    case accountActions.UPDATE_RETURN_CONFIRMATION_FAILURE:
      return Object.assign({}, state, {
        updateReturnConfirmationStatus: action.status,
        updateReturnConfirmationError: action.error,
        loadingForUpdateReturnConfirmation: false
      });

    case accountActions.GET_REFUND_TRANSACTION_SUMMARY_REQUEST:
      return Object.assign({}, state, {
        getRefundTransactionSummaryStatus: action.status,
        loadingForGetRefundTransactionSummary: true
      });
    case accountActions.GET_REFUND_TRANSACTION_SUMMARY_SUCCESS:
      return Object.assign({}, state, {
        getRefundTransactionSummaryStatus: action.status,
        getRefundTransactionSummary: action.getRefundTransactionSummary,
        loadingForGetRefundTransactionSummary: false
      });
    case accountActions.GET_REFUND_TRANSACTION_SUMMARY_FAILURE:
      return Object.assign({}, state, {
        getRefundTransactionSummaryStatus: action.status,
        getRefundTransactionSummaryError: action.error,
        loadingForGetRefundTransactionSummary: false
      });

    case accountActions.GET_RETURN_REASONS_REQUEST:
      return Object.assign({}, state, {
        getReturnReasonsStatus: action.status,
        loadingForGetReturnReasons: true
      });
    case accountActions.GET_RETURN_REASONS_SUCCESS:
      return Object.assign({}, state, {
        getReturnReasonsStatus: action.status,
        getReturnReasonsDetails: action.getReturnReasonsDetails,
        loadingForGetReturnReasons: false
      });
    case accountActions.GET_RETURN_REASONS_FAILURE:
      return Object.assign({}, state, {
        getReturnReasonsStatus: action.status,
        getReturnReasonsError: action.error,
        loadingForGetReturnReasons: false
      });

    case accountActions.UPDATE_RETURN_CANCELLATION_REQUEST:
      return Object.assign({}, state, {
        updateReturnCancellationStatus: action.status,
        loadingForUpdateReturnCancellation: true
      });
    case accountActions.UPDATE_RETURN_CANCELLATION_SUCCESS:
      return Object.assign({}, state, {
        updateReturnCancellationStatus: action.status,
        updateReturnCancellationDetails: action.updateReturnCancellationDetails,
        loadingForUpdateReturnCancellation: false
      });
    case accountActions.UPDATE_RETURN_CANCELLATION_FAILURE:
      return Object.assign({}, state, {
        updateReturnCancellationStatus: action.status,
        updateReturnCancellationError: action.error,
        loadingForUpdateReturnCancellation: false
      });

    case accountActions.UPDATE_RETURN_HOTC_REQUEST:
      return Object.assign({}, state, {
        updateReturnHOTCStatus: action.status,
        loadingForUpdateReturnHOTC: true
      });
    case accountActions.UPDATE_RETURN_HOTC_SUCCESS:
      return Object.assign({}, state, {
        updateReturnHOTCStatus: action.status,
        updateReturnHOTCDetails: action.updateReturnHOTCDetails,
        loadingForUpdateReturnHOTC: false
      });
    case accountActions.UPDATE_RETURN_HOTC_FAILURE:
      return Object.assign({}, state, {
        updateReturnHOTCStatus: action.status,
        updateReturnHOTCError: action.error,
        loadingForUpdateReturnHOTC: false
      });

    case accountActions.CLEAR_TRANSACTION_DATA:
      return Object.assign({}, state, {
        transactionDetails: " "
      });

    case accountActions.CNC_TO_HD_DETAILS_REQUEST:
      return Object.assign({}, state, {
        cncToHdDetailsStatus: action.status,
        cncToHdDetailsLoading: true
      });
    case accountActions.CNC_TO_HD_DETAILS_SUCCESS:
      return Object.assign({}, state, {
        cncToHdDetailsStatus: action.status,
        cncToHdDetailsLoading: false,
        cncToHdDetails: action.cncToHdDetails
      });
    case accountActions.CNC_TO_HD_DETAILS_FAILURE:
      return Object.assign({}, state, {
        cncToHdDetailsStatus: action.status,
        cncToHdDetailsError: action.error,
        cncToHdDetailsLoading: false
      });
    case accountActions.GET_USER_RATING_REQUEST:
      return Object.assign({}, state, {
        userRatingStatus: action.status,
        loading: true
      });
    case accountActions.GET_USER_RATING_SUCCESS:
      return Object.assign({}, state, {
        userRatingStatus: action.status,
        loading: false,
        userRating: action.rating
      });
    case accountActions.GET_USER_RATING_FAILURE:
      return Object.assign({}, state, {
        userRatingStatus: action.status,
        userRatingError: action.error,
        loading: false
      });
    case accountActions.GET_USER_NOTIFICATION_DETAILS_REQUEST:
      return Object.assign({}, state, {
        UserNotificationDetailsStatus: action.status,
        loading: true
      });
    case accountActions.GET_USER_NOTIFICATION_DETAILS_SUCCESS:
      return Object.assign({}, state, {
        UserNotificationHeaderText: action.notificationDetails.message,
        UserNotificationDetailsStatus: action.status,
        UserNotificationDetails: action.notificationDetails,
        UserNotificationConfig: action.notificationDetails,
        loading: false
      });
    case accountActions.GET_USER_NOTIFICATION_DETAILS_FAILURE:
      return Object.assign({}, state, {
        UserNotificationDetailsStatus: action.status,
        UserNotificationDetailsError: action.error,
        loading: false
      });
    case accountActions.SET_USER_SMS_NOTIFICATION_REQUEST:
      return Object.assign({}, state, {
        UserNotificationDetailsStatus: action.status,
        loading: true
      });
    case accountActions.SET_USER_SMS_NOTIFICATION_SUCCESS:
      return Object.assign({}, state, {
        UserNotificationDetailsStatus: action.status,
        UserNotificationDetails: action.setSMSResponse,
        loading: false
      });
    case accountActions.SET_USER_SMS_NOTIFICATION_FAILURE:
      return Object.assign({}, state, {
        UserNotificationDetailsStatus: action.status,
        UserNotificationDetailsError: action.error,
        loading: false
      });
    case accountActions.RESET_RETRY_PAYMENT:
      return Object.assign({}, state, {
        retryPaymentDetails: null
      });
    case accountActions.RETRY_PAYMENT_RELEASE_BANK_OFFER_SUCCESS:
      cloneRetryPaymentDetails = state.retryPaymentDetails
        ? cloneDeep(state.retryPaymentDetails)
        : {};
      if (cloneRetryPaymentDetails && action.bankOffer.cartAmount) {
        Object.assign(cloneRetryPaymentDetails, {
          cartAmount: action.bankOffer.cartAmount
        });
      }
      if (cloneRetryPaymentDetails && action.bankOffer.deliveryCharge) {
        Object.assign(cloneRetryPaymentDetails, {
          deliveryCharges: action.bankOffer.deliveryCharges
        });
      }
      if (cloneRetryPaymentDetails && action.bankOffer.cliqCashPaidAmount) {
        Object.assign(cloneRetryPaymentDetails, {
          cliqCashPaidAmount: action.bankOffer.cliqCashPaidAmount
        });
      }

      return Object.assign({}, state, {
        retryPaymentDetails: cloneRetryPaymentDetails,
        retryPaymentDetailsLoading: false
      });
    case accountActions.RESET_USER_ADDRESS:
      return Object.assign({}, state, {
        userAddressStatus: action.status,
        userAddress: null,
        loading: false
      });
    case accountActions.GET_USER_PROMOTIONAL_CLIQ_CASH_DETAILS_REQUEST:
      return Object.assign({}, state, {
        promotionalCashStatementStatus: action.status,
        loading: true
      });

    case accountActions.GET_USER_PROMOTIONAL_CLIQ_CASH_DETAILS_SUCCESS:
      return Object.assign({}, state, {
        promotionalCashStatementStatus: action.status,
        promotionalCashStatementDetails: action.promotionalCashStatementDetails,
        loading: false
      });

    case accountActions.GET_USER_PROMOTIONAL_CLIQ_CASH_DETAILS_FAILURE:
      return Object.assign({}, state, {
        promotionalCashStatementStatus: action.status,
        promotionalCashStatementError: action.error,
        loading: false
      });

    case accountActions.CHECK_BALANCE_REQUEST:
      return Object.assign({}, state, {
        checkBalanceStatus: action.status,
        isModal: true,
        loading: true
      });

    case accountActions.CHECK_BALANCE_SUCCESS:
      return Object.assign({}, state, {
        checkBalanceStatus: action.status,
        checkBalanceDetails: action.checkBalanceDetails,
        isModal: false,
        loading: false
      });
    case accountActions.CHECK_BALANCE_FAILURE:
      return Object.assign({}, state, {
        checkBalanceStatus: action.status,
        checkBalanceDetailsError: action.error,
        loading: false,
        isModal: true
      });

    case accountActions.SET_SELF_SERVE_STATE:
      return Object.assign({}, state, {
        currentState: action.currentState
      });
    // export function resetUserAddressAfterLogout(data) {
    //   return {
    //     type: SET_USES,
    //     data: data
    //   };
    // }

    case accountActions.GET_EXCHANGE_CASHBACK_DETAILS_REQUEST:
      return Object.assign({}, state, {
        exchangeCashbackDetailsStatus: action.status,
        exchangeCashbackDetailsLoading: true
      });

    case accountActions.GET_EXCHANGE_CASHBACK_DETAILS_SUCCESS:
      return Object.assign({}, state, {
        exchangeCashbackDetailsStatus: action.status,
        exchangeCashbackDetailsLoading: false,
        exchangeCashbackDetails: action.exchangeCashbackDetails
      });

    case accountActions.GET_EXCHANGE_CASHBACK_DETAILS_FAILURE:
      return Object.assign({}, state, {
        exchangeCashbackDetailsStatus: action.status,
        exchangeCashbackDetailsLoading: false,
        exchangeCashbackDetailsError: action.error
      });

    case accountActions.SUBMIT_EXCHANGE_CASHBACK_DETAILS_REQUEST:
      return Object.assign({}, state, {
        submitExchangeCashbackDetailsStatus: action.status,
        submitExchangeCashbackDetailsLoading: true
      });

    case accountActions.SUBMIT_EXCHANGE_CASHBACK_DETAILS_SUCCESS:
      return Object.assign({}, state, {
        submitExchangeCashbackDetailsStatus: action.status,
        submitExchangeCashbackDetailsLoading: false,
        submitExchangeCashbackDetails: action.cashbackDetails
      });

    case accountActions.SUBMIT_EXCHANGE_CASHBACK_DETAILS_FAILURE:
      return Object.assign({}, state, {
        submitExchangeCashbackDetailsStatus: action.status,
        submitExchangeCashbackDetailsLoading: false,
        submitExchangeCashbackDetailsError: action.error
      });

    case accountActions.RETRY_ORDER_DETAILS_FAILURE:
      return Object.assign({}, state, {
        retryOrderDetailsStatus: action.status,
        retryOrderDetailsError: action.error
      });
    case accountActions.RETRY_ORDER_DETAILS_SUCCESS:
      return Object.assign({}, state, {
        retryOrderDetailsStatus: action.status,
        retryOrderDetails: action.retryOrderDetails
      });
    case accountActions.GET_CLIQ_2_CALL_CONFIG_REQUEST:
      return Object.assign({}, state, {
        cliq2CallConfigDataStatus: action.status,
        cliq2CallConfigDataLoading: true
      });

    case accountActions.GET_CLIQ_2_CALL_CONFIG_SUCCESS:
      return Object.assign({}, state, {
        cliq2CallConfigDataStatus: action.status,
        cliq2CallConfigDataLoading: false,
        cliq2CallConfigData: action.cliq2CallConfigData,
        genesysResponseData: null
      });

    case accountActions.GET_CLIQ_2_CALL_CONFIG_FAILURE:
      return Object.assign({}, state, {
        cliq2CallConfigDataStatus: action.status,
        cliq2CallConfigDataLoading: false,
        cliq2CallConfigDataError: action.error
      });

    case accountActions.GET_GENESYS_RESPONSE_REQUEST:
      return Object.assign({}, state, {
        genesysResponseStatus: action.status,
        genesysResponseLoading: true
      });

    case accountActions.GET_GENESYS_RESPONSE_SUCCESS:
      return Object.assign({}, state, {
        genesysResponseStatus: action.status,
        genesysResponseLoading: false,
        genesysResponseData: action.genesysResponse
      });

    case accountActions.GET_GENESYS_RESPONSE_FAILURE:
      return Object.assign({}, state, {
        genesysResponseStatus: action.status,
        genesysResponseLoading: false,
        genesysResponseError: action.error
      });

    case accountActions.GENESYS_CUSTOMER_CALL_REQUEST:
      return {
        ...state,
        genesysCustomerCallRequestStatus: action.status,
        genesysCustomerCallRequestLoading: true
      };
    case accountActions.GENESYS_CUSTOMER_CALL_REQUEST_SUCCESS:
      return {
        ...state,
        genesysCustomerCallRequestStatus: action.status,
        genesysCustomerCallRequestLoading: false,
        genesysCustomerCallRequestData: action.data
      };
    case accountActions.GENESYS_CUSTOMER_CALL_REQUEST_FAILURE:
      return {
        ...state,
        genesysCustomerCallRequestStatus: action.status,
        genesysCustomerCallRequestLoading: false,
        genesysCustomerCallRequestError: action.error
      };

    case accountActions.SUBMIT_CAPTURE_ATTACHMENTS_REQUEST:
      return {
        ...state,
        submitCaptureAttachmentsStatus: action.status,
        submitCaptureAttachmentsLoading: true
      };
    case accountActions.SUBMIT_CAPTURE_ATTACHMENTS_SUCCESS:
      return {
        ...state,
        submitCaptureAttachmentsStatus: action.status,
        submitCaptureAttachmentsLoading: false,
        submitCaptureAttachmentsData: action.attachmentResponseData
      };
    case accountActions.SUBMIT_CAPTURE_ATTACHMENTS_FAILURE:
      return {
        ...state,
        submitCaptureAttachmentsStatus: action.status,
        submitCaptureAttachmentsLoading: false,
        submitCaptureAttachmentsError: action.error
      };
    case accountActions.TICKET_RECENT_HISTORY_DETAILS_REQUEST:
      return {
        ...state,
        ticketDetailsStatus: action.status,
        ticketDetailsDataLoading: true
      };
    case accountActions.TICKET_RECENT_HISTORY_DETAILS_SUCCESS:
      let ticketHistoryDetailsObj = { ...state.ticketHistoryDetails };
      if (
        action.isPaginated &&
        ticketHistoryDetailsObj &&
        ticketHistoryDetailsObj.tickets
      ) {
        ticketHistoryDetailsObj.tickets = ticketHistoryDetailsObj.tickets.concat(
          action.ticketDetails.tickets
        );
        ticketHistoryDetailsObj.currentPage =
          ticketHistoryDetailsObj.currentPage + 1;
      } else {
        ticketHistoryDetailsObj.tickets = action.ticketDetails.tickets;
        Object.assign(ticketHistoryDetailsObj, {
          currentPage: 0,
          ticketCount: parseInt(action.ticketDetails.ticketCount, 10)
        });
      }
      return {
        ...state,
        ticketDetailsStatus: action.status,
        ticketHistoryDetails: ticketHistoryDetailsObj,
        initialTicketDetailsData: !state.ticketHistoryDetails
          ? ticketHistoryDetailsObj
          : state.initialTicketDetailsData,
        ticketDetailsDataLoading: false
      };
    case accountActions.TICKET_RECENT_HISTORY_DETAILS_FAILURE:
      return {
        ...state,
        ticketDetailsStatus: action.status,
        ticketDetailsError: action.error,
        ticketDetailsDataLoading: false
      };
    case accountActions.RESET_TICKETS_HISTORY_DATA_TO_INITIAL:
      return {
        ...state,
        ticketHistoryDetails: { ...state.initialTicketDetailsData }
      };

    case accountActions.GET_HAPTIK_CONFIG_DATA_REQUEST:
      return {
        ...state,
        haptikBotConfigDataStatus: action.status,
        haptikBotConfigDataLoading: true
      };
    case accountActions.GET_HAPTIK_CONFIG_DATA_SUCCESS:
      return {
        ...state,
        haptikBotConfigDataStatus: action.status,
        haptikBotConfigDataLoading: false,
        haptikBotConfigData: action.haptikBotConfigData
      };
    case accountActions.GET_HAPTIK_CONFIG_DATA_FAILURE:
      return {
        ...state,
        haptikBotConfigDataStatus: action.status,
        haptikBotConfigDataLoading: false,
        haptikBotConfigDataError: action.error
      };

	case accountActions.GET_PENDING_REVIEWS_REQUEST:
		return Object.assign({}, state, {
			getPendingReviewsStatus: action.status,
			getPendingReviewsLoading: true,
		});

	case accountActions.GET_PENDING_REVIEWS_SUCCESS:
		const currentPendingReviews = cloneDeep(state.getPendingReviewsDetails);
		let updatedPendingReviewsObj;
		if (action.data.pageNumber === 0) {
			updatedPendingReviewsObj = Object.assign({}, currentPendingReviews, action.data);
		} else {
			let updatedPendingReviews = concat(currentPendingReviews.reviews, action.data.reviews);
			updatedPendingReviewsObj = Object.assign({}, currentPendingReviews, {
				reviews: updatedPendingReviews,
				pageNumber: action.data.pageNumber,
			});
		}

		return Object.assign({}, state, {
			getPendingReviewsStatus: action.status,
			getPendingReviewsLoading: false,
			getPendingReviewsDetails: updatedPendingReviewsObj,
		});

	case accountActions.GET_PENDING_REVIEWS_FAILURE:
		return Object.assign({}, state, {
			getPendingReviewsStatus: action.status,
			getPendingReviewsLoading: false,
			getPendingReviewsError: action.error,
			getPendingReviewsDetails: null,
		});

	case accountActions.GET_PUBLISHED_REVIEWS_REQUEST:
		return Object.assign({}, state, {
			getPublishedReviewsStatus: action.status,
			getPublishedReviewsLoading: true,
		});

	case accountActions.GET_PUBLISHED_REVIEWS_SUCCESS:
		const currentPublishedReviews = cloneDeep(state.getPublishedReviewsDetails);
		let updatedPublishedReviewsObj;
		if (action.data.pageNumber === 0) {
			updatedPublishedReviewsObj = Object.assign({}, currentPublishedReviews, action.data);
		} else {
			let updatedPublishedReviews = concat(currentPublishedReviews.reviews, action.data.reviews);
			updatedPublishedReviewsObj = Object.assign({}, currentPublishedReviews, {
				reviews: updatedPublishedReviews,
				pageNumber: action.data.pageNumber,
			});
		}

		return Object.assign({}, state, {
			getPublishedReviewsStatus: action.status,
			getPublishedReviewsLoading: false,
			getPublishedReviewsDetails: updatedPublishedReviewsObj,
		});

	case accountActions.GET_PUBLISHED_REVIEWS_FAILURE:
		return Object.assign({}, state, {
			getPublishedReviewsStatus: action.status,
			getPublishedReviewsLoading: false,
			getPublishedReviewsError: action.error,
			getPublishedReviewsDetails: null,
		});

    default:
      return state;
  }
};
export default account;
