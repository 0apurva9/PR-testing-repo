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
export const TERMSNCONDITIONS_MODAL = "TermsNConditionsWrapperModal";
export const SIZE_SELECTOR = "SizeSelector";
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
export const DESKTOP_AUTH = "DesktopAuth";
export const CHANGE_PASSWORD_POP_UP = "ChangePasswordForDesktop";
export const CLIQ_PIQ_MODAL = "CliqAndPiqModal";
export const CUSTOMER_QUERY_POPUP = "CustomerQueryPopUp";
export const VALIDATE_OFFERS_POPUP = "ValidateOffersPopUp";
export const MANUFACTURER_MODAL = "ManufacturerModal";
export const SIMILAR_PRODUCTS_MODAL = "SimilarProductsModal";

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
