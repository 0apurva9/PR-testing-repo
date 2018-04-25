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
export const OFFER_MODAL = "OfferModal";
export const SIZE_SELECTOR = "SizeSelector";
export const BANK_OFFERS = "BankOffers";
export const OTP_LOGIN_MODAL = "OtpLoginModal";
export const UPDATE_PROFILE_OTP_VERIFICATION = "UpdateProfileOtpVerification";
export const GIFT_CARD_MODAL = "GiftCardModal";
export const EMI_ITEM_LEVEL_BREAKAGE = "NoCostEmiItemBreakUp";
export const EMI_BANK_TERMS_AND_CONDITIONS = "EmiTermsAndConditions";

export const GENERATE_OTP_FOR_CLIQ_CASH = "generateOtpForCliqCash";
export const VERIFY_OTP_FOR_CLIQ_CASH = "verifyOtpForCliqCash";

export const UPDATE_REFUND_DETAILS_POPUP = "UpdateRefundDetailsPopup";

export const NEW_PASSWORD = "NewPassword";
export const GENERATE_OTP_FOR_EGV = "GenerateOtpForEgv";
export const VERIFY_OTP = "verifyOtp";
export const INVALID_COUPON_POPUP = "INVALID_COUPON_POPUP";

export function showModal(type, ownProps) {
  return {
    type: SHOW_MODAL,
    modalType: type,
    ownProps
  };
}

export function hideModal() {
  return {
    type: HIDE_MODAL,
    modalType: null
  };
}
