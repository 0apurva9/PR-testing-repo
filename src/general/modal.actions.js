export const SHOW_MODAL = "SHOW_MODAL";
export const HIDE_MODAL = "HIDE_MODAL";
export const RESTORE_PASSWORD = "RestorePassword";
export const SIGN_UP_OTP_VERIFICATION = "SignUpOtpVerification";
export const FORGOT_PASSWORD_OTP_VERIFICATION = "ForgotPasswordOtpVerification";
export const CONNECT_DETAILS = "ConnectDetails";
export const PRODUCT_COUPONS = "Coupons";
export const SIZE_GUIDE = "SizeGuide";
export const SORT = "Sort";
export const ADDRESS = "Address";
export const EMI_MODAL = "EmiModal";
export const OFFER_MODAL = "OfferDetailsModal";
export const BEAUTY_OFFER_MODAL = "BeautyOfferDetailsModal";
export const BEAUTY_IMAGE_ZOOM_IN = "BeautyPdpImageZoomIn";
export const TERMSNCONDITIONS_MODAL = "TermsNConditionsWrapperModal";
export const EXCHANGE_MODAL = "ExchangeModal";
export const EXCHANGE_TnC_MODAL = "ExchangeTnCModal";
export const EXCHANGE_REMOVE_MODAL = "ExchangeRemoveModal";
export const UPITERMSANDCONDITION_MODAL = "UpiTermsAndCondition";
// export const UPIHOWTOPAY_MODAL = "UpiHowToPay";
export const SIZE_SELECTOR = "SizeSelector";
export const SIZE_SELECTOR_FOR_EYEWEAR = "SizeSelectorForEyeWear";
export const PRICE_BREAKUP = "PriceBreakup";
export const BANK_OFFERS = "BankOffers";
export const OTP_LOGIN_MODAL = "OtpLoginModal";
export const UPDATE_PROFILE_OTP_VERIFICATION = "UpdateProfileOtpVerification";
export const GIFT_CARD_MODAL = "GiftCardModal";
export const EMI_ITEM_LEVEL_BREAKAGE = "NoCostEmiItemBreakUp";
export const EMI_BANK_TERMS_AND_CONDITIONS = "EmiTermsAndConditions";
export const GO_TO_CART_PAGE_POPUP = "GoToCartPagePopUp";
export const GENERATE_OTP_FOR_CLIQ_CASH = "generateOtpForCliqCash";
export const VERIFY_OTP_FOR_CLIQ_CASH = "verifyOtpForCliqCash";
export const ORDER_DETAILS_MODAL = "OrderModal";
export const BUNDLEDPRODUCT_MODAL = "BundledProductModal";
export const UPDATE_REFUND_DETAILS_POPUP = "UpdateRefundDetailsPopup";
export const TNC_FOR_BANK_OFFER_POPUP = "TermsAndConditionForBankOffer";
export const NEW_PASSWORD = "NewPassword";
export const GENERATE_OTP_FOR_EGV = "GenerateOtpForEgv";
export const VERIFY_OTP = "verifyOtp";
export const INVALID_BANK_COUPON_POPUP = "INVALID_BANK_COUPON_POPUP";
export const INVALID_USER_COUPON_POPUP = "INVALID_USER_COUPON_POPUP";
export const CANCEL_ORDER_POP_UP = "CancelOrderPopUp";
export const STORY_MODAL = "StoryModal";
export const CLIQ_CASH_AND_NO_COST_EMI_POPUP = "CliqCashAndNoCostEmiPopup";
export const CLIQ_CASH_KNOW_MORE = "cliqcashknowmore";
export const CLIQ_CASH_MODULE = "cliqCashModule";
export const CLIQ_CASH_SUCESS_MODULE = "cliqCashSucessModule";
export const DESKTOP_AUTH = "DesktopAuth";
export const DATE_PICKER_MODULES = "datePickerModule";
export const CHANGE_PASSWORD_POP_UP = "ChangePasswordForDesktop";
export const CLIQ_PIQ_MODAL = "CliqAndPiqModal";
export const CUSTOMER_QUERY_POPUP = "CustomerQueryPopUp";
export const VALIDATE_OFFERS_POPUP = "ValidateOffersPopUp";
export const MANUFACTURER_MODAL = "ManufacturerModal";
export const REVIEW_GUIDLINE_MODAL = "ReviewGuidelineWrapperModal";
export const RATING_AND_REVIEW_MODAL = "RatingAndReviewWrapperModal";
export const SIMILAR_PRODUCTS_MODAL = "SimilarProductsModal";
export const SIMILAR_PRODUCTS_OOS_MODAL = "SimilarProductsOOSModal";
export const SIZE_SELECTOR_OOS_MODAL = "SizeSelectorOOSModal";
export const CONFIRMATION_NOTIFICATION = "NotificationConfirmation";
export const CANCEL_RETURN_REQUEST_POP_UP = "CancelReturnRequestPopUp";
export const SHOW_RETURN_CONFIRM_POP_UP = "ShowReturnConfirmPopup";
export const SHOW_DELIVERY_CONFIRM_POP_UP = "ShowDeliveryConfirmPopup";
export const BOTTOM_ALERT_POP_UP = "BottomAlertPopUp";
export const SELLER_REVIEW_SUBMIT_REMOVAL_POP_UP =
  "SellerReviewSubmitRemovalPopup";
export const POP_UP = "PopUp";
export const PRODUCT_IN_BAG_MODAL = "ProductInBagModal";
export const CHANGE_EXCHANGE_CASHBACK_MODAL = "ChangeExchangeCashabackModal";
export const CASHBACK_DETAILS_POPUP = "cashBackDetailsPopup";

export const CLIQ_2_CALL_POP_UP = "Cliq2CallPopUp";
export const CUSTOMER_QUERY_ERROR_MODAL = "CustomerQueryErrorModal";
export const TIME_SLOT_POP_UP = "TimeSlotPopUp";
export const CUSTOMER_CALL_QUERY_SUCCESS = "CustomerCallQuerySuccess";
export const APPLIANCES_EXCHANGE_MODAL = "AppliancesExchangeModal";
export function showModal(type, ownProps) {
  const scrollPosition =
    window.pageYOffset || document.documentElement.scrollTop;

  return {
    type: SHOW_MODAL,
    modalType: type,
    scrollPosition: scrollPosition,
    ownProps
  };
}

export function hideModal() {
  return {
    type: HIDE_MODAL,
    modalType: null
  };
}
