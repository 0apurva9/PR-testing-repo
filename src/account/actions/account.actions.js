import {
  SUCCESS,
  SUCCESS_UPPERCASE,
  SUCCESS_CAMEL_CASE,
  REQUESTING,
  ERROR,
  FAILURE,
  HOME_FEED_FOLLOW_AND_UN_FOLLOW,
  PDP_FOLLOW_AND_UN_FOLLOW,
  MY_ACCOUNT_FOLLOW_AND_UN_FOLLOW,
  CHANNEL,
  EMAIL_SENT_SUCCESS_MESSAGE,
  ISO_CODE,
  FAILED_ORDER,
  PAYMENT_MODE_TYPE,
  BANK_COUPON_COOKIE
} from "../../lib/constants";
import * as Cookie from "../../lib/Cookie";
//import findIndex from "lodash.findindex";
import {
  CUSTOMER_ACCESS_TOKEN,
  LOGGED_IN_USER_DETAILS,
  FAILURE_UPPERCASE,
  CART_DETAILS_FOR_LOGGED_IN_USER,
  GLOBAL_ACCESS_TOKEN,
  PLAT_FORM_NUMBER,
  SUCCESS_MESSAGE_IN_CANCELING_ORDER,
  SUCCESS_MESSAGE_IN_CANCEL_RETURN_ORDER,
  SUCCESS_MESSAGE_IN_RETURN_TO_HOTC,
  FEMALE,
  MALE,
  SUCCESSFUL_PRODUCT_RATING_BY_USER,
  PRODUCT_RATING_FAILURE_TEXT
} from "../../lib/constants";
import {
  showModal,
  GENERATE_OTP_FOR_CLIQ_CASH,
  VERIFY_OTP_FOR_CLIQ_CASH,
  GENERATE_OTP_FOR_EGV,
  hideModal,
  VERIFY_OTP,
  GIFT_CARD_MODAL,
  UPDATE_REFUND_DETAILS_POPUP,
  SHOW_RETURN_CONFIRM_POP_UP,
  RATING_AND_REVIEW_MODAL,
  CLIQ_CASH_MODULE
} from "../../general/modal.actions.js";
import format from "date-fns/format";
import {
  getPaymentModes,
  USER_CART_PATH
} from "../../cart/actions/cart.actions.js";
import {
  getMcvId,
  setDataLayerForMyAccountDirectCalls,
  ADOBE_MY_ACCOUNT_ORDER_RETURN,
  setDataLayer,
  ADOBE_MY_ACCOUNT_SAVED_LIST,
  ADOBE_MY_ACCOUNT_BRANDS,
  ADOBE_MY_ACCOUNT_ORDER_HISTORY,
  ADOBE_MY_ACCOUNT_GIFT_CARD,
  ADOBE_MY_ACCOUNT_CLIQ_CASH,
  AODBE_MY_ACCOUNT_SETTINGS,
  ADOBE_MY_ACCOUNT_ORDER_DETAILS,
  setDataLayerForFollowAndUnFollowBrand,
  ADOBE_ON_FOLLOW_AND_UN_FOLLOW_BRANDS,
  ADOBE_MY_ACCOUNT_CANCEL_ORDER_SUCCESS,
  setDataLayerForLogoutSuccess,
  setDataLayerForGiftCard,
  SET_DATA_LAYER_ADD_GIFT_CARD_SUBMIT,
  ADOBE_ORDER_CONFIRMATION,
  setDataLayerForOrderConfirmationDirectCalls,
  ADOBE_DIRECT_CALLS_FOR_ORDER_CONFIRMATION_SUCCESS,
  ADOBE_RETURN_LINK_CLICKED,
  ADOBE_RETURN_JOURNEY_INITIATED,
  setDataLayerForRatingAndReview,
  SET_DATA_LAYER_RATING_MESSAGE
} from "../../lib/adobeUtils";
import {
  showSecondaryLoader,
  hideSecondaryLoader
} from "../../general/secondaryLoader.actions";
import * as ErrorHandling from "../../general/ErrorHandling.js";
import { setBagCount } from "../../general/header.actions";
import { displayToast } from "../../general/toast.actions";
import { getCustomerAccessToken } from "../../common/services/common.services";

export const GET_USER_DETAILS_REQUEST = "GET_USER_DETAILS_REQUEST";
export const GET_USER_DETAILS_SUCCESS = "GET_USER_DETAILS_SUCCESS";
export const GET_USER_DETAILS_FAILURE = "GET_USER_DETAILS_FAILURE";

export const GET_SAVED_CARD_REQUEST = "GET_SAVED_CARD_REQUEST";
export const GET_SAVED_CARD_SUCCESS = "GET_SAVED_CARD_SUCCESS";
export const GET_SAVED_CARD_FAILURE = "GET_SAVED_CARD_FAILURE";
export const CLEAR_TRANSACTION_DATA = "CLEAR_TRANSACTION_DATA";

export const REMOVE_SAVED_CARD_REQUEST = "REMOVE_SAVED_CARD_REQUEST";
export const REMOVE_SAVED_CARD_SUCCESS = "REMOVE_SAVED_CARD_SUCCESS";
export const REMOVE_SAVED_CARD_FAILURE = "REMOVE_SAVED_CARD_FAILURE";

/**
 * @comment Added consts for the UPI
 */
export const REMOVE_SAVED_UPI_REQUEST = "REMOVE_SAVED_UPI_REQUEST";
export const REMOVE_SAVED_UPI_SUCCESS = "REMOVE_SAVED_UPI_SUCCESS";
export const REMOVE_SAVED_UPI_FAILURE = "REMOVE_SAVED_UPI_FAILURE";

export const ADD_USER_UPI_REQUEST = "ADD_USER_UPI_REQUEST";
export const ADD_USER_UPI_SUCCESS = "ADD_USER_UPI_SUCCESS";
export const ADD_USER_UPI_FAILURE = "ADD_USER_UPI_FAILURE";
export const ADD_USER_UPI_NULL_STATE = "ADD_USER_UPI_NULL_STATE";

const UPI_ADDED_SUCCESS = "UPI ID added successfully";

export const GET_ALL_ORDERS_REQUEST = "GET_ALL_ORDERS_REQUEST";
export const GET_ALL_ORDERS_SUCCESS = "GET_ALL_ORDERS_SUCCESS";
export const GET_ALL_ORDERS_FAILURE = "GET_ALL_ORDERS_FAILURE";

export const GET_ALL_SELLERS_REQUEST = "GET_ALL_SELLERS_REQUEST";
export const GET_ALL_SELLERS_SUCCESS = "GET_ALL_SELLERS_SUCCESS";
export const GET_ALL_SELLERS_FAILURE = "GET_ALL_SELLERS_FAILURE";

export const SUBMIT_SELLER_REVIEW_BY_USER = "SUBMIT_SELLER_REVIEW_BY_USER";
export const SELLER_REVIEW_SUBMIT_FAILURE = "SELLER_REVIEW_SUBMIT_FAILURE";
export const SELLER_REVIEW_REMOVE_FAILURE = "SELLER_REVIEW_REMOVE_FAILURE";
export const REMOVE_SELLER_REVIEW_BY_USER = "REMOVE_SELLER_REVIEW_BY_USER";
export const GET_ALL_SELLERS_REVIEW_REQUEST = "GET_ALL_SELLERS_REVIEW_REQUEST";
export const GET_ALL_SELLERS_REVIEW_SUCCESS = "GET_ALL_SELLERS_REVIEW_SUCCESS";
export const GET_ALL_SELLERS_REVIEW_FAILURE = "GET_ALL_SELLERS_REVIEW_FAILURE";

export const RETURN_PRODUCT_DETAILS_REQUEST = "RETURN_PRODUCT_DETAILS_REQUEST";
export const RETURN_PRODUCT_DETAILS_SUCCESS = "RETURN_PRODUCT_DETAILS_SUCCESS";
export const RETURN_PRODUCT_DETAILS_FAILURE = "RETURN_PRODUCT_DETAILS_FAILURE";

export const RETURN_INITIAL_REQUEST = "RETURN_INITIAL_REQUEST";
export const RETURN_INITIAL_SUCCESS = "RETURN_INITIAL_SUCCESS";
export const RETURN_INITIAL_FAILURE = "RETURN_INITIAL_FAILURE";

export const GET_RETURN_REQUEST = "RETURN_REQEUEST";
export const GET_RETURN_REQUEST_SUCCESS = "GET_RETURN_REQUEST_SUCCESS";
export const GET_RETURN_REQUEST_FAILURE = "GET_RETURN_REQUEST_FAILURE";

export const GET_CLIQ_CASH_CONFIG_REQUEST = "GET_CLIQ_CASH_CONFIG_REQUEST";
export const GET_CLIQ_CASH_CONFIG_SUCCESS = "GET_CLIQ_CASH_CONFIG_SUCCESS";
export const GET_CLIQ_CASH_CONFIG_FAILURE = "GET_CLIQ_CASH_CONFIG_FAILURE";

export const GET_USER_CLIQ_CASH_EXPIRING_DETAILS_REQUEST =
  "GET_USER_CLIQ_CASH_EXPIRING_DETAILS_REQUEST";
export const GET_USER_CLIQ_CASH_EXPIRING_DETAILS_SUCCESS =
  "GET_USER_CLIQ_CASH_EXPIRING_DETAILS_SUCCESS";
export const GET_USER_CLIQ_CASH_EXPIRING_DETAILS_FAILURE =
  "GET_USER_CLIQ_CASH_EXPIRING_DETAILS_FAILURE";

export const GET_USER_CLIQ_CASHBACK_DETAILS_REQUEST =
  "GET_USER_CLIQ_CASHBACK_DETAILS_REQUEST";
export const GET_USER_CLIQ_CASHBACK_DETAILS_SUCCESS =
  "GET_USER_CLIQ_CASHBACK_DETAILS_SUCCESS";
export const GET_USER_CLIQ_CASHBACK_DETAILS_FAILURE =
  "GET_USER_CLIQ_CASHBACK_DETAILS_FAILURE";

export const FETCH_ORDER_DETAILS_REQUEST = "FETCH_ORDER_DETAILS_REQUEST";
export const FETCH_ORDER_DETAILS_SUCCESS = "FETCH_ORDER_DETAILS_SUCCESS";
export const FETCH_ORDER_DETAILS_FAILURE = "FETCH_ORDER_DETAILS_FAILURE";

export const RETRY_ORDER_DETAILS_SUCCESS = "RETRY_ORDER_DETAILS_SUCCESS";
export const RETRY_ORDER_DETAILS_FAILURE = "RETRY_ORDER_DETAILS_FAILURE";

export const FETCH_ORDER_ITEM_DETAILS_REQUEST =
  "FETCH_ORDER_ITEM_DETAILS_REQUEST";
export const FETCH_ORDER_ITEM_DETAILS_SUCCESS =
  "FETCH_ORDER_ITEM_DETAILS_SUCCESS";
export const FETCH_ORDER_ITEM_DETAILS_FAILURE =
  "FETCH_ORDER_ITEM_DETAILS_FAILURE";

export const GET_USER_COUPON_REQUEST = "GET_USER_COUPON_REQUEST";
export const GET_USER_COUPON_SUCCESS = "GET_USER_COUPON_SUCCESS";
export const GET_USER_COUPON_FAILURE = "GET_USER_COUPON_FAILURE";

export const GET_USER_ALERTS_REQUEST = "GET_USER_ALERTS_REQUEST";
export const GET_USER_ALERTS_SUCCESS = "GET_USER_ALERTS_SUCCESS";
export const GET_USER_ALERTS_FAILURE = "GET_USER_ALERTS_FAILURE";

export const GET_PIN_CODE_REQUEST = "GET_PIN_CODE_REQUEST";
export const GET_PIN_CODE_SUCCESS = "GET_PIN_CODE_SUCCESS";
export const GET_PIN_CODE_FAILURE = "GET_PIN_CODE_FAILURE";

export const GET_PIN_CODE_CHANGE_ADDRESS_ORDERED_PRODUCT_REQUEST =
  "GET_PIN_CODE_CHANGE_ADDRESS_ORDERED_PRODUCT_REQUEST";
export const GET_PIN_CODE_CHANGE_ADDRESS_ORDERED_PRODUCT_SUCCESS =
  "GET_PIN_CODE_CHANGE_ADDRESS_ORDERED_PRODUCT_SUCCESS";
export const GET_PIN_CODE_CHANGE_ADDRESS_ORDERED_PRODUCT_FAILURE =
  "GET_PIN_CODE_CHANGE_ADDRESS_ORDERED_PRODUCT_FAILURE";

export const SEND_INVOICE_REQUEST = "SEND_INVOICE_REQUEST";
export const SEND_INVOICE_SUCCESS = "SEND_INVOICE_SUCCESS";
export const SEND_INVOICE_FAILURE = "SEND_INVOICE_FAILURE";

export const REMOVE_ADDRESS_REQUEST = "REMOVE_ADDRESS_REQUEST";
export const REMOVE_ADDRESS_SUCCESS = "REMOVE_ADDRESS_SUCCESS";
export const REMOVE_ADDRESS_FAILURE = "REMOVE_ADDRESS_FAILURE";

export const EDIT_ADDRESS_REQUEST = "EDIT_ADDRESS_REQUEST";
export const EDIT_ADDRESS_SUCCESS = "EDIT_ADDRESS_SUCCESS";
export const EDIT_ADDRESS_FAILURE = "EDIT_ADDRESS_FAILURE";
export const GET_WISHLIST_REQUEST = "GET_WISHLIST_REQUEST";
export const GET_WISHLIST_SUCCESS = "GET_WISHLIST_SUCCESS";
export const GET_WISHLIST_FAILURE = "GET_WISHLIST_FAILURE";

export const GET_FOLLOWED_BRANDS_REQUEST = "GET_FOLLOWED_BRANDS_REQUEST";
export const GET_FOLLOWED_BRANDS_SUCCESS = "GET_FOLLOWED_BRANDS_SUCCESS";
export const GET_FOLLOWED_BRANDS_FAILURE = "GET_FOLLOWED_BRANDS_FAILURE";

export const QUICK_DROP_STORE_REQUEST = "QUICK_DROP_STORE_REQUEST";
export const QUICK_DROP_STORE_SUCCESS = "QUICK_DROP_STORE_SUCCESS";
export const QUICK_DROP_STORE_FAILURE = "QUICK_DROP_STORE_FAILURE";
export const NEW_RETURN_INITIATE_REQUEST = "NEW_RETURN_INITIATE_REQUEST";
export const NEW_RETURN_INITIATE_SUCCESS = "NEW_RETURN_INITIATE_SUCCESS";
export const NEW_RETURN_INITIATE_FAILURE = "NEW_RETURN_INITIATE_FAILURE";

export const RETURN_PIN_CODE_REQUEST = "RETURN_PIN_CODE_REQUEST";
export const RETURN_PIN_CODE_SUCCESS = "RETURN_PIN_CODE_SUCCESS";
export const RETURN_PIN_CODE_FAILURE = "RETURN_PIN_CODE_FAILURE";

export const GET_GIFTCARD_REQUEST = "GET_GIFTCARD_REQUEST";
export const GET_GIFTCARD_SUCCESS = "GET_GIFTCARD_SUCCESS";
export const GET_GIFTCARD_FAILURE = "GET_GIFTCARD_FAILURE";

export const FOLLOW_AND_UN_FOLLOW_BRANDS_IN_FEEDBACK_REQUEST =
  "FOLLOW_AND_UN_FOLLOW_BRANDS_IN_FEEDBACK_REQUEST";
export const FOLLOW_AND_UN_FOLLOW_BRANDS_IN_FEEDBACK_SUCCESS =
  "FOLLOW_AND_UN_FOLLOW_BRANDS_IN_FEEDBACK_SUCCESS";
export const FOLLOW_AND_UN_FOLLOW_BRANDS_IN_FEEDBACK_FAILURE =
  "FOLLOW_AND_UN_FOLLOW_BRANDS_IN_FEEDBACK_FAILURE";

export const FOLLOW_AND_UN_FOLLOW_BRANDS_IN_HOME_FEED_SUCCESS =
  "FOLLOW_AND_UN_FOLLOW_BRANDS_IN_HOME_FEED_SUCCESS";
export const FOLLOW_AND_UN_FOLLOW_BRANDS_IN_PDP_SUCCESS =
  "FOLLOW_AND_UN_FOLLOW_BRANDS_IN_PDP_SUCCESS";
export const FOLLOW_AND_UN_FOLLOW_BRANDS_IN_MY_ACCOUNT_SUCCESS =
  "FOLLOW_AND_UN_FOLLOW_BRANDS_IN_MY_ACCOUNT_SUCCESS";

export const GET_USER_CLIQ_CASH_DETAILS_REQUEST =
  "GET_USER_CLIQ_CASH_DETAILS_REQUEST";
export const GET_USER_CLIQ_CASH_DETAILS_SUCCESS =
  "GET_USER_CLIQ_CASH_DETAILS_SUCCESS";
export const GET_USER_CLIQ_CASH_DETAILS_FAILURE =
  "GET_USER_CLIQ_CASH_DETAILS_FAILURE";

export const REDEEM_CLIQ_VOUCHER_REQUEST = "REDEEM_CLIQ_VOUCHER_REQUEST";
export const REDEEM_CLIQ_VOUCHER_SUCCESS = "REDEEM_CLIQ_VOUCHER_SUCCESS";
export const REDEEM_CLIQ_VOUCHER_FAILURE = "REDEEM_CLIQ_VOUCHER_FAILURE";

export const CREATE_GIFT_CARD_REQUEST = "CREATE_GIFT_CARD_REQUEST";
export const CREATE_GIFT_CARD_SUCCESS = "CREATE_GIFT_CARD_SUCCESS";
export const CREATE_GIFT_CARD_FAILURE = "CREATE_GIFT_CARD_FAILURE";

export const GET_OTP_TO_ACTIVATE_WALLET_REQUEST =
  "GET_OTP_TO_ACTIVATE_WALLET_REQUEST";
export const GET_OTP_TO_ACTIVATE_WALLET_SUCCESS =
  "GET_OTP_TO_ACTIVATE_WALLET_SUCCESS";
export const GET_OTP_TO_ACTIVATE_WALLET_FAILURE =
  "GET_OTP_TO_ACTIVATE_WALLET_FAILURE";

export const VERIFY_WALLET_REQUEST = "VERIFY_WALLET_REQUEST";
export const VERIFY_WALLET_SUCCESS = "VERIFY_WALLET_SUCCESS";
export const VERIFY_WALLET_FAILURE = "VERIFY_WALLET_FAILURE";

export const SUBMIT_SELF_COURIER_INFO_REQUEST =
  "SUBMIT_SELF_COURIER_INFO_REQUEST";
export const SUBMIT_SELF_COURIER_INFO_SUCCESS =
  "SUBMIT_SELF_COURIER_INFO_SUCCESS";
export const SUBMIT_SELF_COURIER_INFO_FAILURE =
  "SUBMIT_SELF_COURIER_INFO_FAILURE";

export const CANCEL_PRODUCT_REQUEST = "CANCEL_PRODUCT_REQUEST";
export const CANCEL_PRODUCT_SUCCESS = "CANCEL_PRODUCT_SUCCESS";
export const CANCEL_PRODUCT_FAILURE = "CANCEL_PRODUCT_FAILURE";

export const GET_CANCEL_PRODUCT_DETAILS_REQUEST =
  "GET_CANCEL_PRODUCT_DETAILS_REQUEST";
export const GET_CANCEL_PRODUCT_DETAILS_SUCCESS =
  "GET_CANCEL_PRODUCT_DETAILS_SUCCESS";
export const GET_CANCEL_PRODUCT_DETAILS_FAILURE =
  "GET_CANCEL_PRODUCT_DETAILS_FAILURE";

export const UPDATE_PROFILE_REQUEST = "UPDATE_PROFILE_REQUEST";
export const UPDATE_PROFILE_SUCCESS = "UPDATE_PROFILE_SUCCESS";
export const UPDATE_PROFILE_FAILURE = "UPDATE_PROFILE_FAILURE";
export const LOG_OUT_ACCOUNT_USING_MOBILE_NUMBER =
  "LOG_OUT_ACCOUNT_USING_MOBILE_NUMBER";

export const GET_CLIQ_CARE_WMS_FAILURE = "GET_CLIQ_CARE_WMS_FAILURE";
export const GET_CLIQ_CARE_WMS_SUCCESS = "GET_CLIQ_CARE_WMS_SUCCESS";
export const GET_CLIQ_CARE_WMS_REQUEST = "GET_CLIQ_CARE_WMS_REQUEST";

export const LOG_OUT_USER_REQUEST = "LOG_OUT_USER_REQUEST";
export const LOG_OUT_USER_SUCCESS = "LOG_OUT_USER_SUCCESS";
export const LOG_OUT_USER_FAILURE = "LOG_OUT_USER_FAILURE";

export const UPDATE_PROFILE_MSD_REQUEST = "UPDATE_PROFILE_MSD_REQUEST";
export const UPDATE_PROFILE_MSD_SUCCESS = "UPDATE_PROFILE_MSD_SUCCESS";
export const UPDATE_PROFILE_MSD_FAILURE = "UPDATE_PROFILE_MSD_FAILURE";

export const UPDATE_PROFILE_OTP_VERIFICATION = "UpdateProfileOtpVerification";
export const CHANGE_PASSWORD_REQUEST = "CHANGE_PASSWORD_REQUEST";
export const CHANGE_PASSWORD_SUCCESS = "CHANGE_PASSWORD_SUCCESS";
export const CHANGE_PASSWORD_FAILURE = "CHANGE_PASSWORD_FAILURE";

export const GET_ORDERS_TRANSACTION_DATA_REQUEST =
  "GET_ORDERS_TRANSACTION_DATA_REQUEST";
export const GET_ORDERS_TRANSACTION_DATA_SUCCESS =
  "GET_ORDERS_TRANSACTION_DATA_SUCCESS";
export const GET_ORDERS_TRANSACTION_DATA_FAILURE =
  "GET_ORDERS_TRANSACTION_DATA_FAILURE";

export const GET_CUSTOMER_QUERIES_DATA_REQUEST =
  "GET_CUSTOMER_QUERIES_DATA_REQUEST";
export const GET_CUSTOMER_QUERIES_DATA_SUCCESS =
  "GET_CUSTOMER_QUERIES_DATA_SUCCESS";
export const GET_CUSTOMER_QUERIES_DATA_FAILURE =
  "GET_CUSTOMER_QUERIES_DATA_FAILURE";

export const GET_CUSTOMER_OTHER_ISSUE_DATA_REQUEST =
  "GET_CUSTOMER_OTHER_ISSUE_DATA_REQUEST";
export const GET_CUSTOMER_OTHER_ISSUE_DATA_SUCCESS =
  "GET_CUSTOMER_OTHER_ISSUE_DATA_SUCCESS";
export const GET_CUSTOMER_OTHER_ISSUE_DATA_FAILURE =
  "GET_CUSTOMER_OTHER_ISSUE_DATA_FAILURE";

export const GET_ALL_OTHERS_HELP_REQUEST = "GET_ALL_OTHERS_HELP_REQUEST";
export const GET_ALL_OTHERS_HELP_SUCCESS = "GET_ALL_OTHERS_HELP_SUCCESS";
export const GET_ALL_OTHERS_HELP_FAILURE = "GET_ALL_OTHERS_HELP_FAILURE";

export const GET_FAQ_RELATED_QUESTIONS_REQUEST =
  "GET_FAQ_RELATED_QUESTIONS_REQUEST";
export const GET_FAQ_RELATED_QUESTIONS_SUCCESS =
  "GET_FAQ_RELATED_QUESTIONS_SUCCESS";
export const GET_FAQ_RELATED_QUESTIONS_FAILURE =
  "GET_FAQ_RELATED_QUESTIONS_FAILURE";

export const GET_ORDER_RELATED_QUESTIONS_REQUEST =
  "GET_ORDER_RELATED_QUESTIONS_REQUEST";
export const GET_ORDER_RELATED_QUESTIONS_SUCCESS =
  "GET_ORDER_RELATED_QUESTIONS_SUCCESS";
export const GET_ORDER_RELATED_QUESTIONS_FAILURE =
  "GET_ORDER_RELATED_QUESTIONS_FAILURE";

export const GET_CUSTOMER_QUERIES_FIELDS_REQUEST =
  "GET_CUSTOMER_QUERIES_FIELDS_REQUEST";
export const GET_CUSTOMER_QUERIES_FIELDS_SUCCESS =
  "GET_CUSTOMER_QUERIES_FIELDS_SUCCESS";
export const GET_CUSTOMER_QUERIES_FIELDS_FAILURE =
  "GET_CUSTOMER_QUERIES_FIELDS_FAILURE";

export const RESEND_EMAIL_FOR_GIFT_CARD_REQUEST =
  "RESEND_EMAIL_FOR_GIFT_CARD_REQUEST";
export const RESEND_EMAIL_FOR_GIFT_CARD_SUCCESS =
  "RESEND_EMAIL_FOR_GIFT_CARD_SUCCESS";
export const RESEND_EMAIL_FOR_GIFT_CARD_FAILURE =
  "RESEND_EMAIL_FOR_GIFT_CARD_FAILURE";

export const GET_TRANSACTION_DETAILS_REQUEST = "TRANSACTION_DETAILS_REQUEST";
export const GET_TRANSACTION_DETAILS_SUCCESS =
  "GET_TRANSACTION_DETAILS_SUCCESS";
export const GET_TRANSACTION_DETAILS_FAILURE =
  "GET_TRANSACTION_DETAILS_FAILURE";

export const UPLOAD_USER_FILE_REQUEST = "UPLOAD_USER_FILE_REQUEST";
export const UPLOAD_USER_FILE_SUCCESS = "UPLOAD_USER_FILE_SUCCESS";
export const UPLOAD_USER_FILE_FAILURE = "UPLOAD_USER_FILE_FAILURE";

export const SUBMIT_ORDER_DETAILS_REQUEST = "SUBMIT_ORDER_DETAILS_REQUEST";
export const SUBMIT_ORDER_DETAILS_SUCCESS = "SUBMIT_ORDER_DETAILS_SUCCESS";
export const SUBMIT_ORDER_DETAILS_FAILURE = "SUBMIT_ORDER_DETAILS_FAILURE";

export const GET_USER_REVIEW_FAILURE = "GET_USER_REVIEW_FAILURE";
export const GET_USER_REVIEW_REQUEST = "GET_USER_REVIEW_REQUEST";
export const GET_USER_REVIEW_SUCCESS = "GET_USER_REVIEW_SUCCESS";

export const RETRY_PAYMENT_REQUEST = "RETRY_PAYMENT_REQUEST";
export const RETRY_PAYMENT_SUCCESS = "RETRY_PAYMENT_SUCCESS";
export const RETRY_PAYMENT_FAILURE = "RETRY_PAYMENT_FAILURE";
export const RESET_RETRY_PAYMENT = "RESET_RETRY_PAYMENT";

export const CNC_TO_HD_DETAILS_REQUEST = "CNC_TO_HD_DETAILS_REQUEST";
export const CNC_TO_HD_DETAILS_SUCCESS = "CNC_TO_HD_DETAILS_SUCCESS";
export const CNC_TO_HD_DETAILS_FAILURE = "CNC_TO_HD_DETAILS_FAILURE";

export const GET_USER_PROMOTIONAL_CLIQ_CASH_DETAILS_REQUEST =
  "GET_USER_PROMOTIONAL_CLIQ_CASH_DETAILS_REQUEST";
export const GET_USER_PROMOTIONAL_CLIQ_CASH_DETAILS_SUCCESS =
  "GET_USER_PROMOTIONAL_CLIQ_CASH_DETAILS_SUCCESS";
export const GET_USER_PROMOTIONAL_CLIQ_CASH_DETAILS_FAILURE =
  "GET_USER_PROMOTIONAL_CLIQ_CASH_DETAILS_FAILURE";

export const RESET_USER_ADDRESS = "RESET_USER_ADDRESS";

export const TICKET_RECENT_HISTORY_DETAILS_REQUEST =
  "TICKET_RECENT_HISTORY_DETAILS_REQUEST";
export const TICKET_RECENT_HISTORY_DETAILS_SUCCESS =
  "TICKET_RECENT_HISTORY_DETAILS_SUCCESS";
export const TICKET_RECENT_HISTORY_DETAILS_FAILURE =
  "TICKET_RECENT_HISTORY_DETAILS_FAILURE";

export const RESET_TICKETS_HISTORY_DATA_TO_INITIAL =
  "RESET_TICKETS_HISTORY_DATA_TO_INITIAL";

export const Clear_ORDER_DATA = "Clear_ORDER_DATA";
export const CLEAR_ORDER_TRANSACTION_DATA = "CLEAR_ORDER_TRANSACTION_DATA";
export const RE_SET_ADD_ADDRESS_DETAILS = "RE_SET_ADD_ADDRESS_DETAILS";
export const CLEAR_CHANGE_PASSWORD_DETAILS = "CLEAR_CHANGE_PASSWORD_DETAILS";
export const CLEAR_PIN_CODE_STATUS = "CLEAR_PIN_CODE_STATUS";
export const CURRENT_PAGE = 0;
export const PAGE_SIZE = 10;
export const USER_PATH = "v2/mpl/users";
export const PRODUCT_PATH = "v2/mpl/products";

export const PIN_PATH = "v2/mpl";
export const PATH = "v2/mpl";

export const MSD_ROOT_PATH = "https://ap-southeast-1-api.madstreetden.com";
export const LOGOUT = "LOGOUT";
export const CLEAR_GIFT_CARD_STATUS = "CLEAR_GIFT_CARD_STATUS";
export const CLEAR_ACCOUNT_UPDATE_TYPE = "CLEAR_ACCOUNT_UPDATE_TYPE";
const API_KEY_FOR_MSD = "8783ef14595919d35b91cbc65b51b5b1da72a5c3";
const NUMBER_OF_RESULTS_FOR_BRANDS = [25];
const WIDGETS_LIST_FOR_BRANDS = [112];
const CARD_TYPE = "BOTH";
const FOLLOW = "follow";
const UNFOLLOW = "unfollow";
const DATE_FORMAT_TO_UPDATE_PROFILE = "DD/MM/YYYY";
const MOBILE_PATTERN = /^[7,8,9]{1}[0-9]{9}$/;
const MSD_API_KEY = "8783ef14595919d35b91cbc65b51b5b1da72a5c3";
const MAD_UUID = "19267047903874796013507214974570460649";
const WOMEN = "Women's";
const MEN = "Men's";
const PAGE_NUMBER = "20";
export const API_MSD_URL_ROOT = "https://ap-southeast-1-api.madstreetden.com";
export const MSD_FEEDBACK = "feedback";

const NEFT = "NEFT";
const TITLE_NAME_ARRAY = ["Ms.", "Mr.", "Mr. & Mrs."];
// cancel product
export const SUBMIT_RETURNIMGUPLOAD_DETAILS_REQUEST =
  "SUBMIT_RETURNIMGUPLOAD_DETAILS_REQUEST";
export const SUBMIT_RETURNIMGUPLOAD_DETAILS_SUCCESS =
  "SUBMIT_RETURNIMGUPLOAD_DETAILS_SUCCESS";
export const SUBMIT_RETURNIMGUPLOAD_DETAILS_FAILURE =
  "SUBMIT_RETURNIMGUPLOAD_DETAILS_FAILURE";
export const GET_REFUND_OPTIONS_DATA_REQUEST =
  "GET_REFUND_OPTIONS_DATA_REQUEST";
export const GET_REFUND_OPTIONS_DATA_SUCCESS =
  "GET_REFUND_OPTIONS_DATA_SUCCESS";
export const GET_REFUND_OPTIONS_DATA_FAILURE =
  "GET_REFUND_OPTIONS_DATA_FAILURE";
export const GET_REFUND_MODES_REQUEST = "GET_REFUND_MODES_REQUEST";
export const GET_REFUND_MODES_SUCCESS = "GET_REFUND_MODES_SUCCESS";
export const GET_REFUND_MODES_FAILURE = "GET_REFUND_MODES_FAILURE";
export const UPDATE_REFUND_MODE_REQUEST = "UPDATE_REFUND_MODE_REQUEST";
export const UPDATE_REFUND_MODE_SUCCESS = "UPDATE_REFUND_MODE_SUCCESS";
export const UPDATE_REFUND_MODE_FAILURE = "UPDATE_REFUND_MODE_FAILURE";
export const GET_CUSTOMER_BANK_DETAILS_REQUEST =
  "GET_CUSTOMER_BANK_DETAILS_REQUEST";
export const GET_CUSTOMER_BANK_DETAILS_SUCCESS =
  "GET_CUSTOMER_BANK_DETAILS_SUCCESS";
export const GET_CUSTOMER_BANK_DETAILS_FAILURE =
  "GET_CUSTOMER_BANK_DETAILS_FAILURE";

export const UPDATE_CUSTOMER_BANK_DETAILS_REQUEST =
  "UPDATE_CUSTOMER_BANK_DETAILS_REQUEST";
export const UPDATE_CUSTOMER_BANK_DETAILS_SUCCESS =
  "UPDATE_CUSTOMER_BANK_DETAILS_SUCCESS";
export const UPDATE_CUSTOMER_BANK_DETAILS_FAILURE =
  "UPDATE_CUSTOMER_BANK_DETAILS_FAILURE";

export const GET_RETURN_MODES_REQUEST = "GET_RETURN_MODES_REQUEST";
export const GET_RETURN_MODES_SUCCESS = "GET_RETURN_MODES_SUCCESS";
export const GET_RETURN_MODES_FAILURE = "GET_RETURN_MODES_FAILURE";

export const UPDATE_RETURN_CONFIRMATION_REQUEST =
  "UPDATE_RETURN_CONFIRMATION_REQUEST";
export const UPDATE_RETURN_CONFIRMATION_SUCCESS =
  "UPDATE_RETURN_CONFIRMATION_SUCCESS";
export const UPDATE_RETURN_CONFIRMATION_FAILURE =
  "UPDATE_RETURN_CONFIRMATION_FAILURE";

export const GET_REFUND_TRANSACTION_SUMMARY_REQUEST =
  "GET_REFUND_TRANSACTION_SUMMARY_REQUEST";
export const GET_REFUND_TRANSACTION_SUMMARY_SUCCESS =
  "GET_REFUND_TRANSACTION_SUMMARY_SUCCESS";
export const GET_REFUND_TRANSACTION_SUMMARY_FAILURE =
  "GET_REFUND_TRANSACTION_SUMMARY_FAILURE";

export const GET_RETURN_REASONS_REQUEST = "GET_RETURN_REASONS_REQUEST";
export const GET_RETURN_REASONS_SUCCESS = "GET_RETURN_REASONS_SUCCESS";
export const GET_RETURN_REASONS_FAILURE = "GET_RETURN_REASONS_FAILURE";

export const UPDATE_RETURN_CANCELLATION_REQUEST =
  "UPDATE_RETURN_CANCELLATION_REQUEST";
export const UPDATE_RETURN_CANCELLATION_SUCCESS =
  "UPDATE_RETURN_CANCELLATION_SUCCESS";
export const UPDATE_RETURN_CANCELLATION_FAILURE =
  "UPDATE_RETURN_CANCELLATION_FAILURE";

export const UPDATE_RETURN_HOTC_REQUEST = "UPDATE_RETURN_HOTC_REQUEST";
export const UPDATE_RETURN_HOTC_SUCCESS = "UPDATE_RETURN_HOTC_SUCCESS";
export const UPDATE_RETURN_HOTC_FAILURE = "UPDATE_RETURN_HOTC_FAILURE";

export const GET_USER_RATING_REQUEST = "GET_USER_RATING_REQUEST";
export const GET_USER_RATING_SUCCESS = "GET_USER_RATING_SUCCESS";
export const GET_USER_RATING_FAILURE = "GET_USER_RATING_FAILURE";

export const GET_USER_NOTIFICATION_DETAILS_REQUEST =
  "GET_USER_NOTIFICATION_DETAILS_REQUEST";
export const GET_USER_NOTIFICATION_DETAILS_SUCCESS =
  "GET_USER_NOTIFICATION_DETAILS_SUCCESS";
export const GET_USER_NOTIFICATION_DETAILS_FAILURE =
  "GET_USER_NOTIFICATION_DETAILS_FAILURE";

export const SET_USER_SMS_NOTIFICATION_REQUEST =
  "SET_USER_SMS_NOTIFICATION_REQUEST";
export const SET_USER_SMS_NOTIFICATION_SUCCESS =
  "SET_USER_SMS_NOTIFICATION_SUCCESS";
export const SET_USER_SMS_NOTIFICATION_FAILURE =
  "SET_USER_SMS_NOTIFICATION_FAILURE";

export const RETRY_PAYMENT_RELEASE_BANK_OFFER_SUCCESS =
  "RETRY_PAYMENT_RELEASE_BANK_OFFER_SUCCESS";
export const SET_SELF_SERVE_STATE = "SET_SELF_SERVE_STATE";

export const GET_EXCHANGE_CASHBACK_DETAILS_REQUEST =
  "GET_EXCHANGE_CASHBACK_DETAILS_REQUEST";
export const GET_EXCHANGE_CASHBACK_DETAILS_SUCCESS =
  "GET_EXCHANGE_CASHBACK_DETAILS_SUCCESS";
export const GET_EXCHANGE_CASHBACK_DETAILS_FAILURE =
  "GET_EXCHANGE_CASHBACK_DETAILS_FAILURE";

export const SUBMIT_EXCHANGE_CASHBACK_DETAILS_REQUEST =
  "SUBMIT_EXCHANGE_CASHBACK_DETAILS_REQUEST";
export const SUBMIT_EXCHANGE_CASHBACK_DETAILS_SUCCESS =
  "SUBMIT_EXCHANGE_CASHBACK_DETAILS_SUCCESS";
export const SUBMIT_EXCHANGE_CASHBACK_DETAILS_FAILURE =
  "SUBMIT_EXCHANGE_CASHBACK_DETAILS_FAILURE";
getCliq2CallConfig;
export const GET_CLIQ_2_CALL_CONFIG_REQUEST = "GET_CLIQ_2_CALL_CONFIG_REQUEST";
export const GET_CLIQ_2_CALL_CONFIG_SUCCESS = "GET_CLIQ_2_CALL_CONFIG_SUCCESS";
export const GET_CLIQ_2_CALL_CONFIG_FAILURE = "GET_CLIQ_2_CALL_CONFIG_FAILURE";

export const GET_GENESYS_RESPONSE_REQUEST = "GET_GENESYS_RESPONSE_REQUEST";
export const GET_GENESYS_RESPONSE_SUCCESS = "GET_GENESYS_RESPONSE_SUCCESS";
export const GET_GENESYS_RESPONSE_FAILURE = "GET_GENESYS_RESPONSE_FAILURE";

export const GENESYS_CUSTOMER_CALL_REQUEST = "GENESYS_CUSTOMER_CALL_REQUEST";
export const GENESYS_CUSTOMER_CALL_REQUEST_SUCCESS =
  "GENESYS_CUSTOMER_CALL_REQUEST_SUCCESS";
export const GENESYS_CUSTOMER_CALL_REQUEST_FAILURE =
  "GENESYS_CUSTOMER_CALL_REQUEST_FAILURE";

export const SUBMIT_CAPTURE_ATTACHMENTS_REQUEST =
  "SUBMIT_CAPTURE_ATTACHMENTS_REQUEST";
export const SUBMIT_CAPTURE_ATTACHMENTS_SUCCESS =
  "SUBMIT_CAPTURE_ATTACHMENTS_SUCCESS";
export const SUBMIT_CAPTURE_ATTACHMENTS_FAILURE =
  "SUBMIT_CAPTURE_ATTACHMENTS_FAILURE";

const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);

export const CHECK_BALANCE_REQUEST = "CHECK_BALANCE_REQUEST";
export const CHECK_BALANCE_SUCCESS = "CHECK_BALANCE_SUCCESS";
export const CHECK_BALANCE_FAILURE = "CHECK_BALANCE_FAILURE";

const GENESYS_KEY = "Zgjei@$Pu";

export function getDetailsOfCancelledProductRequest() {
  return {
    type: GET_CANCEL_PRODUCT_DETAILS_REQUEST,
    status: REQUESTING
  };
}
export function getDetailsOfCancelledProductSuccess(
  getDetailsOfCancelledProduct
) {
  return {
    type: GET_CANCEL_PRODUCT_DETAILS_SUCCESS,
    status: SUCCESS,
    getDetailsOfCancelledProduct
  };
}
export function getDetailsOfCancelledProductFailure(error) {
  return {
    type: GET_CANCEL_PRODUCT_DETAILS_FAILURE,
    status: ERROR,
    error
  };
}
export function getDetailsOfCancelledProduct(cancelProductDetails) {
  const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
  const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
  let cancelProductObject = new FormData();
  cancelProductObject.append(
    "transactionId",
    cancelProductDetails.transactionId
  );
  cancelProductObject.append("orderCode", cancelProductDetails.orderCode);
  cancelProductObject.append("USSID", cancelProductDetails.USSID);
  cancelProductObject.append(
    "returnCancelFlag",
    cancelProductDetails.returnCancelFlag
  );
  return async (dispatch, getState, { api }) => {
    dispatch(getDetailsOfCancelledProductRequest());
    try {
      const result = await api.postFormData(
        `${USER_PATH}/${
          JSON.parse(userDetails).userName
        }/returnProductDetails?access_token=${
          JSON.parse(customerCookie).access_token
        }&isPwa=true&platformNumber=${PLAT_FORM_NUMBER}&isMDE=true`,
        cancelProductObject
      );
      const resultJson = await result.json();

      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      return dispatch(getDetailsOfCancelledProductSuccess(resultJson));
    } catch (e) {
      dispatch(getDetailsOfCancelledProductFailure(e.message));
    }
  };
}
//HOTC Request
export function updateReturnForHOTCRequest() {
  return {
    type: UPDATE_RETURN_HOTC_REQUEST,
    status: REQUESTING
  };
}

export function updateReturnForHOTCSuccess(updateReturnForHOTCDetails) {
  return {
    type: UPDATE_RETURN_HOTC_SUCCESS,
    status: SUCCESS,
    updateReturnForHOTCDetails
  };
}

export function updateReturnForHOTCFailure(error) {
  return {
    type: UPDATE_RETURN_HOTC_FAILURE,
    status: ERROR,
    error
  };
}

export function updateReturnForHOTC(data) {
  return async (dispatch, getState, { api }) => {
    dispatch(updateReturnForHOTCRequest());
    try {
      const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
      const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
      const result = await api.post(
        `${USER_PATH}/${JSON.parse(userDetails).userName}/updateReturnForHOTC/${
          data.orderId
        }/${data.transactionId}?access_token=${
          JSON.parse(customerCookie).access_token
        }&isPwa=true`
      );
      const resultJson = await result.json();
      if (resultJson.status === FAILURE) {
        dispatch(displayToast(resultJson.error));
        dispatch(hideModal(SHOW_RETURN_CONFIRM_POP_UP));
      }
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      dispatch(displayToast(SUCCESS_MESSAGE_IN_RETURN_TO_HOTC));
      sessionStorage.setItem("updateReturnForHOTC", true);
      setDataLayer(ADOBE_RETURN_LINK_CLICKED);
      setDataLayer(ADOBE_RETURN_JOURNEY_INITIATED);
      return dispatch(updateReturnForHOTCSuccess(resultJson));
    } catch (e) {
      return dispatch(updateReturnForHOTCFailure(e.message));
    }
  };
}
//cancel final order

export function cancelProductRequest() {
  return {
    type: CANCEL_PRODUCT_REQUEST,
    status: REQUESTING
  };
}
export function cancelProductSuccess(cancelProduct) {
  return {
    type: CANCEL_PRODUCT_SUCCESS,
    status: SUCCESS,
    cancelProduct
  };
}
export function cancelProductFailure(error) {
  return {
    type: CANCEL_PRODUCT_FAILURE,
    status: ERROR,
    error
  };
}
export function cancelProduct(cancelProductDetails, productDetails) {
  const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
  const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
  let cancelProductObject = new FormData();
  cancelProductObject.append(
    "transactionId",
    cancelProductDetails.transactionId
  );
  cancelProductObject.append("orderCode", cancelProductDetails.orderCode);
  cancelProductObject.append("ussid", cancelProductDetails.USSID);
  cancelProductObject.append(
    "ticketTypeCode",
    cancelProductDetails.ticketTypeCode
  );
  cancelProductObject.append("reasonCode", cancelProductDetails.reasonCode);
  cancelProductObject.append("refundType", cancelProductDetails.refundType);
  return async (dispatch, getState, { api }) => {
    dispatch(cancelProductRequest());
    try {
      const result = await api.postFormData(
        `${USER_PATH}/${
          JSON.parse(userDetails).userName
        }/initiateRefund?access_token=${
          JSON.parse(customerCookie).access_token
        }&login=${JSON.parse(userDetails).userName}&isPwa=true&isMDE=true`,
        cancelProductObject
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }

      dispatch(displayToast(SUCCESS_MESSAGE_IN_CANCELING_ORDER));
      let updatedObj = Object.assign({}, cancelProductDetails, productDetails);
      setDataLayerForMyAccountDirectCalls(
        ADOBE_MY_ACCOUNT_CANCEL_ORDER_SUCCESS,
        updatedObj
      );
      return dispatch(cancelProductSuccess(resultJson));
    } catch (e) {
      return dispatch(cancelProductFailure(e.message));
    }
  };
}

export function returnProductDetailsRequest() {
  return {
    type: RETURN_PRODUCT_DETAILS_REQUEST,
    status: REQUESTING
  };
}

export function returnProductDetailsSuccess(returnProductDetails) {
  return {
    type: RETURN_PRODUCT_DETAILS_SUCCESS,
    status: SUCCESS,
    returnProductDetails
  };
}

export function returnProductDetailsFailure(error) {
  return {
    type: RETURN_PRODUCT_DETAILS_FAILURE,
    error,
    status: FAILURE
  };
}

export function returnProductDetails(productDetails) {
  return async (dispatch, getState, { api }) => {
    let returnProductFormData = new FormData();
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    returnProductFormData.append("transactionId", productDetails.transactionId);
    returnProductFormData.append(
      "returnCancelFlag",
      productDetails.returnCancelFlag
    );
    returnProductFormData.append("orderCode", productDetails.orderCode);

    dispatch(returnProductDetailsRequest());
    try {
      const result = await api.postFormData(
        `${USER_PATH}/${
          JSON.parse(userDetails).userName
        }/newReturnProductDetails?access_token=${
          JSON.parse(customerCookie).access_token
        }&isPwa=true`,
        returnProductFormData
      );

      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      dispatch(returnProductDetailsSuccess(resultJson));
    } catch (e) {
      dispatch(returnProductDetailsFailure(e.message));
    }
  };
}
export function getReturnModesRequest() {
  return {
    type: GET_RETURN_MODES_REQUEST,
    status: REQUESTING
  };
}

export function getReturnModesSuccess(returnModesDetails) {
  return {
    type: GET_RETURN_MODES_SUCCESS,
    status: SUCCESS,
    returnModesDetails
  };
}
export function getReturnModesFailure(error) {
  return {
    type: GET_RETURN_MODES_FAILURE,
    status: ERROR,
    error
  };
}

export function getReturnModes(
  returnId,
  orderId,
  pickUpAddressId,
  transactionId
) {
  return async (dispatch, getState, { api }) => {
    dispatch(getReturnModesRequest());
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    try {
      let data = new FormData();
      data.append("returnId", returnId);
      data.append("orderId", orderId);
      data.append("pickUpAddress", pickUpAddressId);
      data.append("transactionId", transactionId);

      const result = await api.postFormData(
        `v2/mpl/users/${
          JSON.parse(userDetails).userName
        }/getPickupAddrReturnPincodeServcblty?access_token=${
          JSON.parse(customerCookie).access_token
        }&isPwa=true&isMDE=true`,
        data
      );

      const resultJson = await result.json();

      if (resultJson.status === FAILURE) {
        dispatch(displayToast(resultJson.message));
      }
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      return dispatch(getReturnModesSuccess(resultJson));
    } catch (e) {
      return dispatch(getReturnModesFailure(e.message));
    }
  };
}
export function updateReturnConfirmationRequest() {
  return {
    type: UPDATE_RETURN_CONFIRMATION_REQUEST,
    status: REQUESTING
  };
}

export function updateReturnConfirmationSuccess(
  updateReturnConfirmationDetails
) {
  return {
    type: UPDATE_RETURN_CONFIRMATION_SUCCESS,
    status: SUCCESS,
    updateReturnConfirmationDetails
  };
}

export function updateReturnConfirmationFailure(error) {
  return {
    type: UPDATE_RETURN_CONFIRMATION_FAILURE,
    status: ERROR,
    error
  };
}

export function updateReturnConfirmation(
  orderId,
  transactionId,
  returnId,
  returnFullfillmentType,
  returnStore,
  returnAddress,
  modeOfReturn
) {
  return async (dispatch, getState, { api }) => {
    dispatch(updateReturnConfirmationRequest());
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    try {
      let data = {};
      if (modeOfReturn === "Return To Store") {
        Object.assign(data, {
          returnId: returnId,
          returnStore: JSON.parse(returnStore),
          returnFullfillmentType: returnFullfillmentType
        });
      }

      if (modeOfReturn === "Pick Up") {
        Object.assign(data, {
          returnId: returnId,
          pickupDate: "",
          pickupTimeSlot: "",
          returnAddressData: returnAddress,
          returnFullfillmentType: returnFullfillmentType
        });
      }

      if (modeOfReturn === "Self Courier") {
        Object.assign(data, {
          returnId: returnId,
          isSelfCourier: true,
          returnFullfillmentType: returnFullfillmentType
        });
      }

      if (modeOfReturn === "other") {
        Object.assign(data, {
          returnId: returnId
        });
      }

      const result = await api.post(
        `${USER_PATH}/${
          JSON.parse(userDetails).userName
        }/updateReturnConfirmation/${orderId}/${transactionId}?access_token=${
          JSON.parse(customerCookie).access_token
        }&isPwa=true&isMDE=true`,
        data
      );
      const resultJson = await result.json();
      if (resultJson.status === FAILURE) {
        dispatch(displayToast(resultJson.message));
      }
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      return dispatch(updateReturnConfirmationSuccess(resultJson));
    } catch (e) {
      return dispatch(updateReturnConfirmationFailure(e.message));
    }
  };
}
export function getRefundTransactionSummaryRequest() {
  return {
    type: GET_REFUND_TRANSACTION_SUMMARY_REQUEST,
    status: REQUESTING
  };
}

export function getRefundTransactionSummarySuccess(
  getRefundTransactionDetails
) {
  return {
    type: GET_REFUND_TRANSACTION_SUMMARY_SUCCESS,
    status: SUCCESS,
    getRefundTransactionDetails
  };
}

export function getRefundTransactionSummaryFailure(error) {
  return {
    type: GET_REFUND_TRANSACTION_SUMMARY_FAILURE,
    status: ERROR,
    error
  };
}

export function getRefundTransactionSummary(orderId, transactionId, returnId) {
  return async (dispatch, getState, { api }) => {
    dispatch(getRefundTransactionSummaryRequest());
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    try {
      const result = await api.get(
        `${USER_PATH}/${
          JSON.parse(userDetails).userName
        }/getReturnTransactionSummary/${orderId}/${transactionId}/${returnId}/?access_token=${
          JSON.parse(customerCookie).access_token
        }&isPwa=true&isMDE=true`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      return dispatch(getRefundTransactionSummarySuccess(resultJson));
    } catch (e) {
      return dispatch(getRefundTransactionSummaryFailure(e.message));
    }
  };
}

export function getReturnReasonsRequest() {
  return {
    type: GET_RETURN_REASONS_REQUEST,
    status: REQUESTING
  };
}

export function getReturnReasonsSuccess(getReturnReasonsDetails) {
  return {
    type: GET_RETURN_REASONS_SUCCESS,
    status: SUCCESS,
    getReturnReasonsDetails
  };
}

export function getReturnReasonsFailure(error) {
  return {
    type: GET_RETURN_REASONS_FAILURE,
    status: ERROR,
    error
  };
}

export function getReturnReasons(orderId, transactionId) {
  return async (dispatch, getState, { api }) => {
    dispatch(getReturnReasonsRequest());
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    try {
      const result = await api.get(
        `${USER_PATH}/${
          JSON.parse(userDetails).userName
        }/getReturnCancelReasons?access_token=${
          JSON.parse(customerCookie).access_token
        }&orderCode=${orderId}&transactionId=${transactionId}&isPwa=true`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      return dispatch(getReturnReasonsSuccess(resultJson));
    } catch (e) {
      return dispatch(getReturnReasonsFailure(e.message));
    }
  };
}

export function updateReturnCancellationRequest() {
  return {
    type: UPDATE_RETURN_CANCELLATION_REQUEST,
    status: REQUESTING
  };
}

export function updateReturnCancellationSuccess(
  updateReturnCancellationDetails
) {
  return {
    type: UPDATE_RETURN_CANCELLATION_SUCCESS,
    status: SUCCESS,
    updateReturnCancellationDetails
  };
}

export function updateReturnCancellationFailure(error) {
  return {
    type: UPDATE_RETURN_CANCELLATION_FAILURE,
    status: ERROR,
    error
  };
}

export function updateReturnCancellation(data) {
  return async (dispatch, getState, { api }) => {
    dispatch(updateReturnCancellationRequest());
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    try {
      let apiData = {};
      apiData.returnCancelReasonCode = data.returnCancelReasonCode;
      if (data.returnCancelComments) {
        apiData.returnCancelComments = data.returnCancelComments;
      }
      const result = await api.post(
        `${USER_PATH}/${
          JSON.parse(userDetails).userName
        }/updateReturnCancellation/${data.orderId}/${
          data.transactionId
        }?access_token=${
          JSON.parse(customerCookie).access_token
        }&isPwa=true&isMDE=true`,
        apiData
      );
      const resultJson = await result.json();
      if (resultJson.status === FAILURE) {
        dispatch(displayToast(resultJson.error));
      }
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      dispatch(displayToast(SUCCESS_MESSAGE_IN_CANCEL_RETURN_ORDER));
      return dispatch(updateReturnCancellationSuccess(resultJson));
    } catch (e) {
      return dispatch(updateReturnCancellationFailure(e.message));
    }
  };
}
// This is a crappy name, but the api is called getReturnRequest and that conflicts with our pattern
// Let's keep the name, because it fits our convention and deal with the awkwardness.
export function getReturnRequestRequest() {
  return {
    type: GET_RETURN_REQUEST,
    status: REQUESTING
  };
}

export function getReturnRequestSuccess(returnRequest) {
  return {
    type: GET_RETURN_REQUEST_SUCCESS,
    returnRequest,
    status: SUCCESS
  };
}

export function getReturnRequestFailure(error) {
  return {
    type: GET_RETURN_REQUEST_FAILURE,
    error,
    status: FAILURE
  };
}

export function getReturnRequest(orderCode, transactionId) {
  return async (dispatch, getState, { api }) => {
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    dispatch(getReturnRequestRequest());
    try {
      const result = await api.get(
        `${USER_PATH}/${
          JSON.parse(userDetails).userName
        }/returnRequest?access_token=${
          JSON.parse(customerCookie).access_token
        }&channel=${CHANNEL}&loginId=${
          JSON.parse(userDetails).userName
        }&orderCode=${orderCode}&transactionId=${transactionId}`
      );

      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      dispatch(getReturnRequestSuccess(resultJson));
    } catch (e) {
      dispatch(getReturnRequestFailure(e.message));
    }
  };
}

export function newReturnInitiateRequest() {
  return {
    type: NEW_RETURN_INITIATE_REQUEST,
    status: REQUESTING
  };
}

export function newReturnInitiateSuccess(returnDetails) {
  return {
    type: NEW_RETURN_INITIATE_SUCCESS,
    returnDetails,
    status: SUCCESS
  };
}

export function newReturnInitiateFailure(error) {
  return {
    type: NEW_RETURN_INITIATE_FAILURE,
    error,
    status: FAILURE
  };
}

export function newReturnInitial(returnDetails, product = null) {
  return async (dispatch, getState, { api }) => {
    dispatch(newReturnInitiateRequest());
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    if (returnDetails) {
      Object.assign(returnDetails, {
        refundMode: NEFT,
        title: TITLE_NAME_ARRAY[Math.floor(Math.random() * 3)] // title name we need to send random because we are not capturing anywhere
      });
    }
    try {
      const result = await api.post(
        `${USER_PATH}/${
          JSON.parse(userDetails).userName
        }/newReturnInitiate?access_token=${
          JSON.parse(customerCookie).access_token
        }&channel=${CHANNEL}`,
        returnDetails
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      if (product) {
        setDataLayerForMyAccountDirectCalls(
          ADOBE_MY_ACCOUNT_ORDER_RETURN,
          product,
          returnDetails
        );
      }
      return dispatch(newReturnInitiateSuccess(resultJson));
    } catch (e) {
      return dispatch(newReturnInitiateFailure(e.message));
    }
  };
}

export function returnPInCodeRequest() {
  return {
    type: RETURN_PIN_CODE_REQUEST,
    status: REQUESTING
  };
}

export function returnPInCodeSuccess(pinCodeDetails) {
  return {
    type: RETURN_PIN_CODE_SUCCESS,
    pinCodeDetails,
    status: SUCCESS
  };
}

export function returnPinCodeFailure(error, pinCodeDetails) {
  return {
    type: RETURN_PIN_CODE_FAILURE,
    error,
    status: FAILURE,
    pinCodeDetails
  };
}

export function returnPinCode(productDetails) {
  return async (dispatch, getState, { api }) => {
    dispatch(returnPInCodeRequest());
    let resultJson;
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    try {
      const result = await api.post(
        `${USER_PATH}/${
          JSON.parse(userDetails).userName
        }/returnPincode?access_token=${
          JSON.parse(customerCookie).access_token
        }&&orderCode=${productDetails.orderCode}&pincode=${
          productDetails.pinCode
        }&transactionId=${productDetails.transactionId}`
      );
      resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        let message = resultJsonStatus.message;
        if (resultJsonStatus.message === FAILURE_UPPERCASE) {
          message =
            "Sorry! pick up is not available for your area. You can still return the item by dropping in store or by self shipping the product";
        }
        throw new Error(message);
      }
      return dispatch(returnPInCodeSuccess(resultJson));
    } catch (e) {
      return dispatch(returnPinCodeFailure(e.message, resultJson));
    }
  };
}

export function quickDropStoreRequest() {
  return {
    type: QUICK_DROP_STORE_REQUEST,
    status: REQUESTING
  };
}

export function quickDropStoreSuccess(addresses) {
  return {
    type: QUICK_DROP_STORE_SUCCESS,
    addresses,
    status: SUCCESS
  };
}

export function quickDropStoreFailure(error) {
  return {
    type: QUICK_DROP_STORE_FAILURE,
    error,
    status: FAILURE
  };
}

export function quickDropStore(pincode, ussId) {
  return async (dispatch, getState, { api }) => {
    dispatch(quickDropStoreRequest());
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    try {
      const result = await api.get(
        `${USER_PATH}/${
          JSON.parse(userDetails).userName
        }/quickDropStores?access_token=${
          JSON.parse(customerCookie).access_token
        }&pincode=${pincode}&&ussid=${ussId}`
      );

      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (
        resultJsonStatus.status ||
        resultJson.status === "Store Not available"
      ) {
        let errorMessage = resultJsonStatus.message;
        if (resultJson.status === "Store Not available") {
          errorMessage = "Store not available.Please try another pincode.";
        }

        throw new Error(errorMessage);
      }
      return dispatch(quickDropStoreSuccess(resultJson.returnStoreDetailsList));
    } catch (e) {
      return dispatch(quickDropStoreFailure(e.message));
    }
  };
}

//get egv product info
export function giftCardRequest() {
  return {
    type: GET_GIFTCARD_REQUEST,
    status: REQUESTING
  };
}
export function giftCardSuccess(giftCards) {
  return {
    type: GET_GIFTCARD_SUCCESS,
    status: SUCCESS,
    giftCards
  };
}
export function giftCardFailure(error) {
  return {
    type: GET_GIFTCARD_FAILURE,
    status: ERROR,
    error
  };
}
export function getGiftCardDetails() {
  return async (dispatch, getState, { api }) => {
    dispatch(giftCardRequest());
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    try {
      const result = await api.get(
        `${USER_PATH}/${
          JSON.parse(userDetails).userName
        }/giftCard/egvProductInfo?access_token=${
          JSON.parse(customerCookie).access_token
        }`
      );
      const resultJson = await result.json();

      if (
        resultJson.status === SUCCESS ||
        resultJson.status === SUCCESS_UPPERCASE ||
        resultJson.status === SUCCESS_CAMEL_CASE
      ) {
        if (!resultJson.isWalletOtpVerified) {
          dispatch(showModal(GENERATE_OTP_FOR_EGV));
        } else if (
          resultJson.isWalletCreated &&
          !resultJson.isWalletOtpVerified
        ) {
          dispatch(
            showModal(GENERATE_OTP_FOR_EGV, {
              firstName: resultJson.firstName,
              lastName: resultJson.lastName,
              mobileNumber: resultJson.mobileNumber
            })
          );
        }
        setDataLayer(ADOBE_MY_ACCOUNT_GIFT_CARD);
        return dispatch(giftCardSuccess(resultJson));
      } else {
        throw new Error(`${resultJson.errors[0].message}`);
      }
    } catch (e) {
      dispatch(giftCardFailure(e.message));
    }
  };
}

//create gift card

export function createGiftCardRequest() {
  return {
    type: CREATE_GIFT_CARD_REQUEST,
    status: REQUESTING
  };
}
export function createGiftCardSuccess(giftCardDetails) {
  return {
    type: CREATE_GIFT_CARD_SUCCESS,
    status: SUCCESS,
    giftCardDetails
  };
}

export function createGiftCardFailure(error) {
  return {
    type: CREATE_GIFT_CARD_FAILURE,
    status: ERROR,
    error
  };
}

export function createGiftCardDetails(giftCardDetails) {
  return async (dispatch, getState, { api }) => {
    dispatch(createGiftCardRequest());
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    try {
      const result = await api.post(
        `${USER_PATH}/${
          JSON.parse(userDetails).userName
        }/createElectronicsGiftCardCartGuid?access_token=${
          JSON.parse(customerCookie).access_token
        }`,
        giftCardDetails
      );

      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      Cookie.createCookie("egvCartGuid", resultJson.egvCartGuid);
      return dispatch(createGiftCardSuccess(resultJson));
    } catch (e) {
      dispatch(createGiftCardFailure(e.message));
    }
  };
}
//get otp to activate wallet

export function getOtpToActivateWalletRequest() {
  return {
    type: GET_OTP_TO_ACTIVATE_WALLET_REQUEST,
    status: REQUESTING
  };
}
export function getOtpToActivateWalletSuccess(getOtpToActivateWallet) {
  return {
    type: GET_OTP_TO_ACTIVATE_WALLET_SUCCESS,
    status: SUCCESS,
    getOtpToActivateWallet
  };
}

export function getOtpToActivateWalletFailure(error) {
  return {
    type: GET_OTP_TO_ACTIVATE_WALLET_FAILURE,
    status: ERROR,
    error
  };
}

export function getOtpToActivateWallet(customerDetails, isFromCliqCash) {
  return async (dispatch, getState, { api }) => {
    dispatch(getOtpToActivateWalletRequest());
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    try {
      const result = await api.post(
        `${USER_PATH}/${
          JSON.parse(userDetails).userName
        }/checkWalletMobileNumber?access_token=${
          JSON.parse(customerCookie).access_token
        }&isUpdateProfile=false`,
        customerDetails
      );
      const resultJson = await result.json();

      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      if (isFromCliqCash) {
        dispatch(showModal(VERIFY_OTP_FOR_CLIQ_CASH));
      } else {
        dispatch(showModal(VERIFY_OTP));
      }
      return dispatch(getOtpToActivateWalletSuccess(resultJson));
    } catch (e) {
      return dispatch(getOtpToActivateWalletFailure(e.message));
    }
  };
}

//verify wallet

export function verifyWalletRequest() {
  return {
    type: VERIFY_WALLET_REQUEST,
    status: REQUESTING
  };
}
export function verifyWalletSuccess(verifyWallet) {
  return {
    type: VERIFY_WALLET_SUCCESS,
    status: SUCCESS,
    verifyWallet
  };
}

export function verifyWalletFailure(error) {
  return {
    type: VERIFY_WALLET_FAILURE,
    status: ERROR,
    error
  };
}

export function verifyWallet(customerDetailsWithOtp, isFromCliqCash) {
  return async (dispatch, getState, { api }) => {
    dispatch(verifyWalletRequest());
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    try {
      const result = await api.post(
        `${USER_PATH}/${
          JSON.parse(userDetails).userName
        }/verifyWalletOtp?access_token=${
          JSON.parse(customerCookie).access_token
        }&otp=${customerDetailsWithOtp.otp}&firstName=${
          customerDetailsWithOtp.firstName
        }&lastName=${customerDetailsWithOtp.lastName}&mobileNumber=${
          customerDetailsWithOtp.mobileNumber
        }`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }

      if (isFromCliqCash) {
        dispatch(getCliqCashDetails());
      } else {
        dispatch(getGiftCardDetails());
      }
      dispatch(hideModal());
      dispatch(displayToast(resultJson.message));
      let updatedUserCookie = {};
      updatedUserCookie.firstName = resultJson.firstName;
      updatedUserCookie.lastName = resultJson.lastName;
      updatedUserCookie.userName = JSON.parse(userDetails).userName;
      updatedUserCookie.customerId = JSON.parse(userDetails).customerId;
      updatedUserCookie.loginType = JSON.parse(userDetails).loginType;

      Cookie.createCookie(
        LOGGED_IN_USER_DETAILS,
        JSON.stringify(updatedUserCookie)
      );
      return dispatch(verifyWalletSuccess(resultJson));
    } catch (e) {
      return dispatch(verifyWalletFailure(e.message));
    }
  };
}
//  update refund details
//update replace and return details
export function getReturnReasonsWithProductDetails(productDetails) {
  return async (dispatch, getState, { api }) => {
    dispatch(returnProductDetailsRequest());
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    try {
      const result = await api.get(
        `${USER_PATH}/${JSON.parse(userDetails).userName}/getReturnReasons/${
          productDetails.orderCode
        }/${productDetails.transactionId}/?access_token=${
          JSON.parse(customerCookie).access_token
        }&isPwa=true&isMDE=true`
      );

      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      dispatch(returnProductDetailsSuccess(resultJson));
    } catch (e) {
      dispatch(returnProductDetailsFailure(e.message));
    }
  };
}
export function uploadProductImagesRequest() {
  return {
    type: SUBMIT_RETURNIMGUPLOAD_DETAILS_REQUEST,
    status: REQUESTING
  };
}

export function uploadProductImagesSuccess(submitImageUploadDetails) {
  return {
    type: SUBMIT_RETURNIMGUPLOAD_DETAILS_SUCCESS,
    status: SUCCESS,
    submitImageUploadDetails
  };
}
export function uploadProductImagesFailure(error) {
  return {
    type: SUBMIT_RETURNIMGUPLOAD_DETAILS_FAILURE,
    status: ERROR,
    error
  };
}

export function uploadProductImages(orderId, transactionId, file) {
  return async (dispatch, getState, { api }) => {
    dispatch(uploadProductImagesRequest());
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    try {
      let uploadFile = new FormData();
      uploadFile.append("orderId", orderId);
      uploadFile.append("transactionId", transactionId);
      file.forEach(val => {
        uploadFile.append("uploadfile", val);
      });

      const result = await api.postFormData(
        `/v2/mpl/users/${
          JSON.parse(userDetails).userName
        }/uploadReturnImageFile?access_token=${
          JSON.parse(customerCookie).access_token
        }&isPwa=true`,
        uploadFile
      );

      const resultJson = await result.json();
      if (
        resultJson.status === SUCCESS_CAMEL_CASE ||
        resultJson.status === SUCCESS
      ) {
        dispatch(displayToast("Images Uploaded Successfully"));
      }
      if (resultJson.status === FAILURE) {
        dispatch(displayToast(resultJson.message));
      }
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      return dispatch(uploadProductImagesSuccess(resultJson));
    } catch (e) {
      return dispatch(uploadProductImagesFailure(e.message));
    }
  };
}

export function getRefundOptionsDataRequest() {
  return {
    type: GET_REFUND_OPTIONS_DATA_REQUEST,
    status: REQUESTING
  };
}

export function getRefundOptionsDataSuccess(getRefundOptionsDetails) {
  return {
    type: GET_REFUND_OPTIONS_DATA_SUCCESS,
    status: SUCCESS,
    getRefundOptionsDetails
  };
}
export function getRefundOptionsDataFailure(error) {
  return {
    type: GET_REFUND_OPTIONS_DATA_FAILURE,
    status: ERROR,
    error
  };
}
export function getRefundOptionsData(
  orderId,
  transactionId,
  returnReasonCode,
  returnSubReasonCode,
  comments,
  uploadedImageURLs,
  reverseSealAvailability
) {
  return async (dispatch, getState, { api }) => {
    dispatch(getRefundOptionsDataRequest());
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    try {
      let data = {};
      Object.assign(data, {
        returnReasonCode: returnReasonCode,
        returnSubReasonCode: returnSubReasonCode,
        comments: comments,
        uploadedImageURLs: uploadedImageURLs,
        reverseSealAvailability: reverseSealAvailability
      });

      const result = await api.post(
        `${USER_PATH}/${
          JSON.parse(userDetails).userName
        }/updateReturnReasonGetReturnType/${orderId}/${transactionId}?access_token=${
          JSON.parse(customerCookie).access_token
        }&isPwa=true&isMDE=true`,
        data
      );
      const resultJson = await result.json();
      if (resultJson.status === FAILURE) {
        dispatch(displayToast(resultJson.message));
      }
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      return dispatch(getRefundOptionsDataSuccess(resultJson));
    } catch (e) {
      return dispatch(getRefundOptionsDataFailure(e.message));
    }
  };
}
export function getRefundModesRequest() {
  return {
    type: GET_REFUND_MODES_REQUEST,
    status: REQUESTING
  };
}

export function getRefundModesSuccess(getRefundModesDetails) {
  return {
    type: GET_REFUND_MODES_SUCCESS,
    status: SUCCESS,
    getRefundModesDetails
  };
}
export function getRefundModesFailure(error) {
  return {
    type: GET_REFUND_MODES_FAILURE,
    status: ERROR,
    error
  };
}

export function getRefundModes(orderId, transactionId, returnId, typeOfReturn) {
  return async (dispatch, getState, { api }) => {
    dispatch(getRefundModesRequest());
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    try {
      let data = {};
      Object.assign(data, {
        typeOfReturn: typeOfReturn,
        returnId: returnId
      });
      const result = await api.post(
        `${USER_PATH}/${
          JSON.parse(userDetails).userName
        }/updateReturnTypeGetRefundMode/${orderId}/${transactionId}?access_token=${
          JSON.parse(customerCookie).access_token
        }&isPwa=true&isMDE=true`,
        data
      );
      const resultJson = await result.json();
      if (resultJson.status === FAILURE) {
        dispatch(displayToast(resultJson.message));
      }
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      return dispatch(getRefundModesSuccess(resultJson));
    } catch (e) {
      return dispatch(getRefundModesFailure(e.message));
    }
  };
}

export function updateRefundModeRequest() {
  return {
    type: UPDATE_REFUND_MODE_REQUEST,
    status: REQUESTING
  };
}
export function updateRefundModeSuccess(updateRefundModeDetails) {
  return {
    type: UPDATE_REFUND_MODE_SUCCESS,
    status: SUCCESS,
    updateRefundModeDetails
  };
}
export function updateRefundModeFailure(error) {
  return {
    type: UPDATE_REFUND_MODE_FAILURE,
    status: ERROR,
    error
  };
}

export function updateRefundMode(orderId, transactionId, returnId, refundMode) {
  return async (dispatch, getState, { api }) => {
    dispatch(updateRefundModeRequest());
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    try {
      let data = {};
      Object.assign(data, {
        refundMode: refundMode,
        returnId: returnId
      });
      const result = await api.post(
        `${USER_PATH}/${
          JSON.parse(userDetails).userName
        }/updateRefundMode/${orderId}/${transactionId}?access_token=${
          JSON.parse(customerCookie).access_token
        }&isPwa=true&isMDE=true`,
        data
      );
      const resultJson = await result.json();
      // return resultJson;
      if (resultJson.status === FAILURE) {
        dispatch(displayToast(resultJson.message));
      }
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      return dispatch(updateRefundModeSuccess(resultJson));
    } catch (e) {
      return dispatch(updateRefundModeFailure(e.message));
    }
  };
}

export function getCustomerBankDetailsRequest() {
  return {
    type: GET_CUSTOMER_BANK_DETAILS_REQUEST,
    status: REQUESTING
  };
}
export function getCustomerBankDetailsSuccess(getCustomerBankDetails) {
  return {
    type: GET_CUSTOMER_BANK_DETAILS_SUCCESS,
    status: SUCCESS,
    getCustomerBankDetails
  };
}
export function getCustomerBankDetailsFailure(error) {
  return {
    type: GET_CUSTOMER_BANK_DETAILS_FAILURE,
    status: ERROR,
    error
  };
}

export function getCustomerBankDetails() {
  return async (dispatch, getState, { api }) => {
    dispatch(getCustomerBankDetailsRequest());
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    try {
      const result = await api.get(
        `${USER_PATH}/${
          JSON.parse(userDetails).userName
        }/getCustomerBankDetails?access_token=${
          JSON.parse(customerCookie).access_token
        }&customerId=${JSON.parse(userDetails).customerId}&isPwa=true`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      return dispatch(getCustomerBankDetailsSuccess(resultJson));
    } catch (e) {
      return dispatch(getCustomerBankDetailsFailure(e.message));
    }
  };
}
export function updateCustomerBankDetailsRequest() {
  return {
    type: UPDATE_CUSTOMER_BANK_DETAILS_REQUEST,
    status: REQUESTING
  };
}
export function updateCustomerBankDetailsSuccess(updateCustomerBankDetails) {
  return {
    type: UPDATE_CUSTOMER_BANK_DETAILS_SUCCESS,
    status: SUCCESS,
    updateCustomerBankDetails
  };
}
export function updateCustomerBankDetailsFailure(error) {
  return {
    type: UPDATE_CUSTOMER_BANK_DETAILS_FAILURE,
    status: ERROR,
    error
  };
}

export function updateCustomerBankDetails(bankDetails) {
  return async (dispatch, getState, { api }) => {
    dispatch(updateCustomerBankDetailsRequest());
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    try {
      const result = await api.post(
        `${USER_PATH}/${
          JSON.parse(userDetails).userName
        }/updateBankDetails?access_token=${
          JSON.parse(customerCookie).access_token
        }&isPwa=true`,
        bankDetails
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      return dispatch(updateCustomerBankDetailsSuccess(resultJson));
    } catch (e) {
      return dispatch(updateCustomerBankDetailsFailure(e.message));
    }
  };
}
export function getCliqCashDetailsRefund() {
  return async (dispatch, getState, { api }) => {
    dispatch(getCliqCashRequest());
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    try {
      const result = await api.post(
        `${USER_PATH}/${
          JSON.parse(userDetails).userName
        }/cliqcash/getUserCliqCashDetails?access_token=${
          JSON.parse(customerCookie).access_token
        }&isPwa=true&platformNumber=${PLAT_FORM_NUMBER}`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      if (!resultJson.isWalletCreated && !resultJson.isWalletOtpVerified) {
        dispatch(showModal(GENERATE_OTP_FOR_CLIQ_CASH));
      }
      return resultJson;
      // dispatch(getCliqCashSuccess(resultJson));
    } catch (e) {
      dispatch(getCliqCashFailure(e.message));
    }
  };
}

export function submitSelfCourierReturnInfoRequest() {
  return {
    type: SUBMIT_SELF_COURIER_INFO_REQUEST,
    status: REQUESTING
  };
}
export function submitSelfCourierReturnInfoSuccess(updateReturnDetails) {
  return {
    type: SUBMIT_SELF_COURIER_INFO_SUCCESS,
    status: SUCCESS,
    updateReturnDetails
  };
}

export function submitSelfCourierReturnInfoFailure(error) {
  return {
    type: SUBMIT_SELF_COURIER_INFO_FAILURE,
    status: ERROR,
    error
  };
}
export function submitSelfCourierReturnInfo(returnDetails) {
  let returnDetailsObject = new FormData();
  //let returnDetailsObject = new FormData(returnDetails.file);
  returnDetailsObject.append("awbNumber", returnDetails.awbNumber);
  returnDetailsObject.append("lpname", returnDetails.lpname);
  returnDetailsObject.append("amount", returnDetails.amount);
  returnDetailsObject.append("orderId", returnDetails.orderId);
  returnDetailsObject.append("transactionId", returnDetails.transactionId);
  returnDetailsObject.append("file", returnDetails.file);
  return async (dispatch, getState, { api }) => {
    dispatch(submitSelfCourierReturnInfoRequest());
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    try {
      const result = await api.postFormData(
        `${USER_PATH}/${
          JSON.parse(userDetails).userName
        }/submitSelfCourierRetrunInfo?channel=${CHANNEL}&access_token=${
          JSON.parse(customerCookie).access_token
        }`,
        returnDetailsObject
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      dispatch(hideModal(UPDATE_REFUND_DETAILS_POPUP));
      if (resultJson.status === "success") {
        dispatch(displayToast("Updated return details successfully"));
      }
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }

      dispatch(submitSelfCourierReturnInfoSuccess(resultJson));
    } catch (e) {
      dispatch(submitSelfCourierReturnInfoFailure(e.message));
    }
  };
}

export function getSavedCardRequest() {
  return {
    type: GET_SAVED_CARD_REQUEST,
    status: REQUESTING
  };
}
export function getSavedCardSuccess(savedCards) {
  return {
    type: GET_SAVED_CARD_SUCCESS,
    status: SUCCESS,
    savedCards
  };
}

export function getSavedCardFailure(error) {
  return {
    type: GET_SAVED_CARD_FAILURE,
    status: ERROR,
    error
  };
}
export function clearTransaction() {
  return {
    type: CLEAR_TRANSACTION_DATA
  };
}
export function getSavedCardDetails(userId, customerAccessToken) {
  return async (dispatch, getState, { api }) => {
    dispatch(getSavedCardRequest());
    try {
      const result = await api.post(
        `${USER_PATH}/${userId}/payments/savedCards?access_token=${customerAccessToken}&cardType=${CARD_TYPE}`
      );
      const resultJson = await result.json();

      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      setDataLayer(ADOBE_MY_ACCOUNT_SAVED_LIST);
      dispatch(getSavedCardSuccess(resultJson));
    } catch (e) {
      dispatch(getSavedCardFailure(e.message));
    }
  };
}

export function getTransactionDetailsRequest() {
  return {
    type: GET_TRANSACTION_DETAILS_REQUEST,
    status: REQUESTING
  };
}

export function getTransactionDetailsSuccess(transactionDetails) {
  return {
    type: GET_TRANSACTION_DETAILS_SUCCESS,
    transactionDetails,
    status: SUCCESS
  };
}

export function getTransactionDetailsFailure(error) {
  return {
    type: GET_TRANSACTION_DETAILS_FAILURE,
    error,
    status: FAILURE
  };
}

export function getTransactionDetails() {
  return async (dispatch, getState, { api }) => {
    dispatch(getTransactionDetailsRequest());
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    try {
      const result = await api.post(
        `${USER_PATH}/${
          JSON.parse(userDetails).userName
        }/getWalletTransactions?access_token=${
          JSON.parse(customerCookie).access_token
        }&channel=${CHANNEL}`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      dispatch(getTransactionDetailsSuccess(resultJson));
    } catch (e) {
      dispatch(getTransactionDetailsFailure(e.message));
    }
  };
}

export function getPinCodeRequest() {
  return {
    type: GET_PIN_CODE_REQUEST,
    status: REQUESTING
  };
}
export function getPinCodeSuccess(pinCode) {
  return {
    type: GET_PIN_CODE_SUCCESS,
    status: SUCCESS,
    pinCode
  };
}

export function getPinCodeFailure(error) {
  return {
    type: GET_PIN_CODE_FAILURE,
    status: ERROR,
    error
  };
}

export function getPinCode(pinCode) {
  return async (dispatch, getState, { api }) => {
    const globalAccessToken = Cookie.getCookie(GLOBAL_ACCESS_TOKEN);
    dispatch(getPinCodeRequest());
    try {
      const result = await api.get(
        `${PIN_PATH}/getPincodeData?pincode=${pinCode}&access_token=${
          JSON.parse(globalAccessToken).access_token
        }`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        let errorMessage = resultJsonStatus.message;
        if (errorMessage === FAILURE_UPPERCASE) {
          errorMessage = "Pincode is not serviceable";
        }
        throw new Error(errorMessage);
      }
      dispatch(getPinCodeSuccess(resultJson));
    } catch (e) {
      dispatch(getPinCodeFailure(e.message));
    }
  };
}

export function getPinCodeChangeAddressOrderedProductRequest() {
  return {
    type: GET_PIN_CODE_CHANGE_ADDRESS_ORDERED_PRODUCT_REQUEST,
    status: REQUESTING
  };
}
export function getPinCodeChangeAddressOrderedProductSuccess(pinCode) {
  return {
    type: GET_PIN_CODE_CHANGE_ADDRESS_ORDERED_PRODUCT_SUCCESS,
    status: SUCCESS,
    pinCode
  };
}

export function getPinCodeChangeAddressOrderedProductFailure(error) {
  return {
    type: GET_PIN_CODE_CHANGE_ADDRESS_ORDERED_PRODUCT_FAILURE,
    status: ERROR,
    error
  };
}

export function getPinCodeChangeAddressOrderedProduct(address, orderCode) {
  return async (dispatch, getState, { api }) => {
    const userAccessToken = Cookie.getCookie("userDetails");
    dispatch(getPinCodeChangeAddressOrderedProductRequest());
    try {
      const result = await api.post(
        `${PIN_PATH}/users/${
          JSON.parse(userAccessToken).userName
        }/changeDeliveryAddress/${orderCode}?access_token=${
          JSON.parse(customerCookie).access_token
        }`,
        address
      );
      const resultJson = await result.json();
      let errorMessage;
      if (resultJson.isPincodeServiceable === false) {
        errorMessage = "Pincode is not serviceable";
        dispatch(displayToast(errorMessage));
      }
      dispatch(getPinCodeChangeAddressOrderedProductSuccess(resultJson));
    } catch (e) {
      dispatch(getPinCodeChangeAddressOrderedProductFailure(e.message));
    }
  };
}

export function removeSavedCardRequest() {
  return {
    type: REMOVE_SAVED_CARD_REQUEST,
    status: REQUESTING
  };
}
export function removeSavedCardSuccess() {
  return {
    type: REMOVE_SAVED_CARD_SUCCESS,
    status: SUCCESS
  };
}

export function removeSavedCardFailure(error) {
  return {
    type: REMOVE_SAVED_CARD_FAILURE,
    status: ERROR,
    error
  };
}

export function removeSavedCardDetails(cardToken) {
  return async (dispatch, getState, { api }) => {
    dispatch(removeSavedCardRequest());
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    try {
      const result = await api.post(
        `${USER_PATH}/${
          JSON.parse(userDetails).userName
        }/payments/removeSavedCards?access_token=${
          JSON.parse(customerCookie).access_token
        }&cardToken=${cardToken}`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      dispatch(removeSavedCardSuccess(resultJson));
      dispatch(
        getSavedCardDetails(
          JSON.parse(userDetails).userName,
          JSON.parse(customerCookie).access_token
        )
      );
    } catch (e) {
      dispatch(removeSavedCardFailure(e.message));
    }
  };
}
/**
 *
 * @comment Addded code for the removal of the UPI of the user.
 *
 */
export function removeSavedUpiRequest() {
  return {
    type: REMOVE_SAVED_UPI_REQUEST,
    status: REQUESTING
  };
}
export function removeSavedUpiSuccess() {
  return {
    type: REMOVE_SAVED_UPI_SUCCESS,
    status: SUCCESS
  };
}

export function removeSavedUpiFailure(error) {
  return {
    type: REMOVE_SAVED_UPI_FAILURE,
    status: ERROR,
    error
  };
}

export function removeSavedUpiDetails(upiId) {
  return async (dispatch, getState, { api }) => {
    dispatch(removeSavedUpiRequest());
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    try {
      const result = await api.post(
        `${USER_PATH}/${
          JSON.parse(userDetails).userName
        }/payments/removeSavedUPIS?access_token=${
          JSON.parse(customerCookie).access_token
        }&upiId=${upiId}`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      dispatch(removeSavedUpiSuccess(resultJson));
      dispatch(
        getSavedCardDetails(
          JSON.parse(userDetails).userName,
          JSON.parse(customerCookie).access_token
        )
      );
    } catch (e) {
      dispatch(removeSavedUpiFailure(e.message));
    }
  };
}

export function addUserUPIRequest(error) {
  return {
    type: ADD_USER_UPI_REQUEST,
    status: REQUESTING
  };
}

export function addUserUPISuccess(upiResponse) {
  return {
    type: ADD_USER_UPI_SUCCESS,
    status: upiResponse.status,
    upiResponse
  };
}

export function addUserUPIFailure(error) {
  return {
    type: ADD_USER_UPI_FAILURE,
    status: ERROR,
    error
  };
}

export function addUPIDetailsNullStateRequest() {
  return {
    type: ADD_USER_UPI_NULL_STATE,
    status: null
  };
}
export function addUPIDetailsNullState() {
  return async (dispatch, getState, { api }) => {
    dispatch(addUPIDetailsNullStateRequest());
  };
}

export function addUPIDetails(upi, pageType, btnType) {
  return async (dispatch, getState, { api }) => {
    dispatch(addUserUPIRequest(upi));
    localStorage.setItem(PAYMENT_MODE_TYPE, "UPI");
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    let APPROVED_UPI = [];
    if (localStorage.getItem("APPROVED_UPI_VPA")) {
      APPROVED_UPI = JSON.parse(localStorage.getItem("APPROVED_UPI_VPA"));
    }
    if (
      pageType === "checkout" &&
      btnType === "select" &&
      APPROVED_UPI.includes(upi)
    ) {
      return dispatch(
        addUserUPISuccess({
          type: "upiValidationDTO",
          error: "This UPI id already exists",
          errorCode: "UPI007",
          status: "FAILURE",
          upiStatus: "VALID"
        })
      );
    }
    try {
      const addUPI = `${USER_PATH}/${
        JSON.parse(userDetails).userName
      }/payments/upiValidation?access_token=${
        JSON.parse(customerCookie).access_token
      }&isPwa=true&channel=web&isUpdatedPwa=true&upiId=${upi}&isToValidateUpi=true&isToSaveUpi=true`;
      const result = await api.post(addUPI);
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (
        resultJsonStatus.status &&
        (resultJson.upiStatus === "INVALID" ||
          resultJson.upiStatus === "VALID") &&
        pageType !== "myaccount"
      ) {
        return dispatch(addUserUPISuccess(resultJson));
      } else if (
        resultJson.status === "FAILURE" &&
        resultJson.upiStatus === "VALID" &&
        pageType === "myaccount"
      ) {
        dispatch(displayToast(resultJson.error));
      } else if (
        resultJson.status === "FAILURE" &&
        resultJson.upiStatus === "INVALID" &&
        pageType === "myaccount"
      ) {
        return dispatch(addUserUPISuccess(resultJson));
      } else if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.error);
      }
      // if (resultJsonStatus.status) {
      //   throw new Error(resultJsonStatus.message);
      // }
      if (
        resultJson.status !== "FAILURE" &&
        resultJson.upiStatus === "VALID" &&
        pageType === "myaccount"
      ) {
        dispatch(displayToast(UPI_ADDED_SUCCESS));
      }
      return dispatch(addUserUPISuccess(resultJson));
    } catch (e) {
      return dispatch(addUserUPIFailure(e.message));
    }
  };
}
/**
 * EOD
 */
export function getAllOrdersRequest(paginated: false) {
  return {
    type: GET_ALL_ORDERS_REQUEST,
    status: REQUESTING
  };
}
export function getAllOrdersSuccess(orderDetails, isPaginated: false) {
  return {
    type: GET_ALL_ORDERS_SUCCESS,
    status: SUCCESS,
    orderDetails,
    isPaginated
  };
}

export function getAllOrdersFailure(error, isPaginated) {
  return {
    type: GET_ALL_ORDERS_FAILURE,

    status: ERROR,
    error,
    isPaginated
  };
}
export function getAllOrdersDetails(
  suffix: null,
  paginated: false,
  isSetDataLayer: true,
  showDataAccordingToUser
) {
  return async (dispatch, getState, { api }) => {
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    dispatch(getAllOrdersRequest(paginated));
    dispatch(showSecondaryLoader());
    let currentPage = 0;
    if (getState().profile.orderDetails) {
      currentPage = getState().profile.orderDetails.currentPage + 1;
    }
    try {
      let getOrderDetails = "";
      if (showDataAccordingToUser) {
        getOrderDetails = `${USER_PATH}/${
          JSON.parse(userDetails).userName
        }/orderhistorylist_V1?access_token=${
          JSON.parse(customerCookie).access_token
        }&channel=web&currentPage=${currentPage}&pageSize=${PAGE_SIZE}&orderYear=${showDataAccordingToUser}&isMDE=true`;
      } else {
        getOrderDetails = `${USER_PATH}/${
          JSON.parse(userDetails).userName
        }/orderhistorylist_V1?access_token=${
          JSON.parse(customerCookie).access_token
        }&channel=web&currentPage=${currentPage}&pageSize=${PAGE_SIZE}&isMDE=true`;
      }
      const result = await api.get(getOrderDetails);
      let resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      if (isSetDataLayer) {
        setDataLayer(ADOBE_MY_ACCOUNT_ORDER_HISTORY);
      }
      if (paginated) {
        dispatch(getAllOrdersSuccess(resultJson, paginated));
        dispatch(hideSecondaryLoader());
      } else {
        dispatch(getAllOrdersSuccess(resultJson, paginated));
        dispatch(hideSecondaryLoader());
      }
    } catch (e) {
      dispatch(hideSecondaryLoader());
      dispatch(getAllOrdersFailure(e.message, paginated));
    }
  };
}
export function fetchOrderItemDetailsRequest() {
  return {
    type: FETCH_ORDER_ITEM_DETAILS_REQUEST,
    status: REQUESTING
  };
}
export function fetchOrderItemDetailsSuccess(fetchOrderItemDetails) {
  return {
    type: FETCH_ORDER_ITEM_DETAILS_SUCCESS,
    status: SUCCESS,
    fetchOrderItemDetails
  };
}

export function fetchOrderItemDetailsFailure(error) {
  return {
    type: FETCH_ORDER_ITEM_DETAILS_FAILURE,
    status: ERROR,
    error
  };
}

// Get Seller Review
export function getAllSellersRequest() {
  return {
    type: GET_ALL_SELLERS_REQUEST,
    status: REQUESTING
  };
}

export function getAllSellersSuccess(sellerDetails) {
  return {
    type: GET_ALL_SELLERS_SUCCESS,
    status: SUCCESS,
    sellerDetails
  };
}

export function getAllSellersFailure(error) {
  return {
    type: GET_ALL_ORDERS_FAILURE,
    status: ERROR,
    error
  };
}

export function getAllSellersDetails(isSetDataLayer: true) {
  let url = window.location.href;
  let transId = url
    .split("transactionId=")
    .pop()
    .split("&")[0];
  return async (dispatch, getState, { api }) => {
    dispatch(getAllSellersRequest());
    dispatch(showSecondaryLoader());
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    try {
      let getSellerDetails = "";

      getSellerDetails = `${PATH}/getSellerFeedbackTransactions?transactionId=${transId}&customerId=${
        JSON.parse(userDetails).customerId
      }&access_token=${JSON.parse(customerCookie).access_token}`;
      const result = await api.get(getSellerDetails);
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      if (isSetDataLayer) {
        setDataLayer(ADOBE_MY_ACCOUNT_ORDER_HISTORY);
      }

      dispatch(getAllSellersSuccess(resultJson));
      dispatch(hideSecondaryLoader());
    } catch (e) {
      dispatch(hideSecondaryLoader());
      dispatch(getAllSellersFailure(e.message));
    }
  };
}

export function getAllSellersReviewRequest() {
  return {
    type: GET_ALL_SELLERS_REVIEW_REQUEST,
    status: REQUESTING
  };
}

export function getAllSellersReviewSuccess(sellerDetails) {
  return {
    type: GET_ALL_SELLERS_REVIEW_SUCCESS,
    status: SUCCESS,
    sellerDetails
  };
}

export function getAllSellersReviewFailure(error) {
  return {
    type: GET_ALL_SELLERS_REVIEW_FAILURE,
    status: ERROR,
    error
  };
}

export function getAllSellersReviewDetails(isSetDataLayer: true) {
  return async (dispatch, getState, { api }) => {
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    dispatch(getAllSellersReviewRequest());
    dispatch(showSecondaryLoader());
    try {
      let getSellerDetails = "";
      getSellerDetails = `${PATH}/getSellerReviewTransactions?customerId=${
        JSON.parse(userDetails).customerId
      }&access_token=${JSON.parse(customerCookie).access_token}`;

      const result = await api.get(getSellerDetails);
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }

      dispatch(getAllSellersReviewSuccess(resultJson));
      dispatch(hideSecondaryLoader());
    } catch (e) {
      dispatch(hideSecondaryLoader());
      dispatch(getAllSellersReviewFailure(e.message));
    }
  };
}

export function sellerReviewSubmissionByUser(sellerReviewStatus) {
  return {
    type: SUBMIT_SELLER_REVIEW_BY_USER,
    sellerReviewStatus
  };
}
export function sellerReviewSubmitFailure(error) {
  return {
    type: SELLER_REVIEW_SUBMIT_FAILURE,
    status: ERROR,
    error
  };
}

export function submitSellerReviewByUser(params) {
  return async (dispatch, getState, { api }) => {
    try {
      const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
      const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
      let reqURL = `${USER_PATH}/${
        JSON.parse(userDetails).userName
      }/submitCustomerReview?access_token=${
        JSON.parse(customerCookie).access_token
      }`;

      const result = await api.post(reqURL, params);
      const resultJson = await result.json();
      dispatch(getAllSellersDetails());
      dispatch(sellerReviewSubmissionByUser(resultJson));
    } catch (e) {
      dispatch(sellerReviewSubmitFailure(e.message));
    }
  };
}

export function sellerReviewRemoveByUser(sellerReviewRemoveStatus) {
  return {
    type: REMOVE_SELLER_REVIEW_BY_USER,
    sellerReviewRemoveStatus
  };
}
export function sellerReviewRemoveFailure(error) {
  return {
    type: SELLER_REVIEW_REMOVE_FAILURE,
    status: ERROR,
    error
  };
}

export function removeSellerReviewByUser(params) {
  return async (dispatch, getState, { api }) => {
    try {
      const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
      const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
      let reqURL = `${USER_PATH}/${
        JSON.parse(userDetails).userName
      }/submitCustomerReview?access_token=${
        JSON.parse(customerCookie).access_token
      }`;

      const result = await api.post(reqURL, params);
      const resultJson = await result.json();
      dispatch(getAllSellersReviewDetails());
      dispatch(sellerReviewRemoveByUser(resultJson));
    } catch (e) {
      dispatch(sellerReviewRemoveFailure(e.message));
    }
  };
}

export function getUserDetailsRequest() {
  return {
    type: GET_USER_DETAILS_REQUEST,
    status: REQUESTING
  };
}
export function getUserDetailsSuccess(userDetails) {
  return {
    type: GET_USER_DETAILS_SUCCESS,
    status: SUCCESS,
    userDetails
  };
}

export function getUserDetailsFailure(error) {
  return {
    type: GET_USER_DETAILS_FAILURE,
    status: ERROR,
    error
  };
}

export function getUserDetails(isSetDataLayer) {
  return async (dispatch, getState, { api }) => {
    dispatch(getUserDetailsRequest());
    try {
      const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
      const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
      const result = await api.get(
        `${USER_PATH}/${
          JSON.parse(userDetails).userName
        }/getCustomerProfile?access_token=${
          JSON.parse(customerCookie).access_token
        }&isPwa=true`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      if (isSetDataLayer) {
        setDataLayer(AODBE_MY_ACCOUNT_SETTINGS);
      }
      dispatch(getUserDetailsSuccess(resultJson));
    } catch (e) {
      dispatch(getUserDetailsFailure(e.message));
    }
  };
}

export function getUserCouponsRequest() {
  return {
    type: GET_USER_COUPON_REQUEST,
    status: REQUESTING
  };
}
export function getUserCouponsSuccess(userCoupons) {
  return {
    type: GET_USER_COUPON_SUCCESS,
    status: SUCCESS,
    userCoupons
  };
}

export function getUserCouponsFailure(error) {
  return {
    type: GET_USER_COUPON_FAILURE,
    status: ERROR,
    error
  };
}

export function getUserCoupons() {
  return async (dispatch, getState, { api }) => {
    dispatch(showSecondaryLoader());
    dispatch(getUserCouponsRequest());
    try {
      const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
      const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
      const result = await api.get(
        `${USER_PATH}/${
          JSON.parse(userDetails).userName
        }/getCoupons?currentPage=${CURRENT_PAGE}&access_token=${
          JSON.parse(customerCookie).access_token
        }&pageSize=${PAGE_SIZE}&usedCoupon=N&isPwa=true&platformNumber=${PLAT_FORM_NUMBER}&channel=${CHANNEL}`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      dispatch(getUserCouponsSuccess(resultJson));
      dispatch(hideSecondaryLoader());
    } catch (e) {
      dispatch(hideSecondaryLoader());

      dispatch(getUserCouponsFailure(e.message));
    }
  };
}

export function getUserAlertsRequest() {
  return {
    type: GET_USER_ALERTS_REQUEST,
    status: REQUESTING
  };
}
export function getUserAlertsSuccess(userAlerts) {
  return {
    type: GET_USER_ALERTS_SUCCESS,
    status: SUCCESS,
    userAlerts
  };
}

export function getUserAlertsFailure(error) {
  return {
    type: GET_USER_ALERTS_FAILURE,
    status: ERROR,
    error
  };
}

export function getUserAlerts() {
  return async (dispatch, getState, { api }) => {
    dispatch(getUserAlertsRequest());
    dispatch(showSecondaryLoader());
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    try {
      const result = await api.get(
        `${USER_PATH}/${
          JSON.parse(userDetails).userName
        }/getOrderTrackingNotifications?access_token=${
          JSON.parse(customerCookie).access_token
        }&emailId=${JSON.parse(userDetails).userName}`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      dispatch(getUserAlertsSuccess(resultJson));
      dispatch(hideSecondaryLoader());
    } catch (e) {
      dispatch(hideSecondaryLoader());
      dispatch(getUserAlertsFailure(e.message));
    }
  };
}

export function removeAddressRequest() {
  return {
    type: REMOVE_ADDRESS_REQUEST,
    status: REQUESTING
  };
}
export function removeAddressSuccess(addressId) {
  return {
    type: REMOVE_ADDRESS_SUCCESS,
    status: SUCCESS,
    addressId
  };
}

export function removeAddressFailure(error) {
  return {
    type: REMOVE_ADDRESS_FAILURE,
    status: ERROR,
    error
  };
}

export function removeAddress(addressId) {
  return async (dispatch, getState, { api }) => {
    let addressObject = new FormData();
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);

    addressObject.append("addressId", addressId);
    addressObject.append("emailId", "");

    dispatch(removeAddressRequest());
    try {
      const result = await api.postFormData(
        `${USER_PATH}/${
          JSON.parse(userDetails).userName
        }/removeAddress?isPwa=true&platformNumber=${PLAT_FORM_NUMBER}&access_token=${
          JSON.parse(customerCookie).access_token
        }`,
        addressObject
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      dispatch(removeAddressSuccess(addressId));
    } catch (e) {
      dispatch(removeAddressFailure(e.message));
    }
  };
}

export function editAddressRequest() {
  return {
    type: EDIT_ADDRESS_REQUEST,
    status: REQUESTING
  };
}
export function editAddressSuccess(addressDetails) {
  return {
    type: EDIT_ADDRESS_SUCCESS,
    status: SUCCESS,
    addressDetails
  };
}

export function editAddressFailure(error) {
  return {
    type: EDIT_ADDRESS_FAILURE,
    status: ERROR,
    error
  };
}
export function editAddress(addressDetails) {
  return async (dispatch, getState, { api }) => {
    dispatch(editAddressRequest());
    let addressObject = new FormData();
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    addressObject.append("countryIso", addressDetails.countryIso);
    addressObject.append("addressType", addressDetails.addressType);
    if (addressDetails.phone) {
      addressObject.append("phone", addressDetails.phone);
    }
    if (addressDetails.firstName) {
      addressObject.append("firstName", addressDetails.firstName.trim());
    }
    if (addressDetails.lastName) {
      addressObject.append("lastName", addressDetails.lastName.trim());
    }
    addressObject.append("postalCode", addressDetails.postalCode);
    if (addressDetails.line1) {
      addressObject.append("line1", addressDetails.line1.trim());
    } else {
      addressObject.append("line1", "");
    }
    if (addressDetails.line2) {
      addressObject.append("line2", addressDetails.line2);
    } else {
      addressObject.append("line2", "");
    }
    if (addressDetails.line3) {
      addressObject.append("line3", addressDetails.line3);
    } else {
      addressObject.append("line3", "");
    }
    addressObject.append("state", addressDetails.state.trim());
    addressObject.append("town", addressDetails.town.trim());
    addressObject.append("defaultFlag", addressDetails.defaultFlag);
    addressObject.append("addressId", addressDetails.addressId);
    if (addressDetails.landmark) {
      addressObject.append("landmark", addressDetails.landmark);
    } else {
      addressObject.append("landmark", "");
    }
    addressObject.append("emailId", " ");
    try {
      const result = await api.postFormData(
        `${USER_PATH}/${
          JSON.parse(userDetails).userName
        }/editAddress?access_token=${
          JSON.parse(customerCookie).access_token
        }&pageSize=${PAGE_SIZE}&isPwa=true&platformNumber=${PLAT_FORM_NUMBER}`,
        addressObject
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      if (resultJson.status && resultJson.status.toLowerCase() === SUCCESS) {
        dispatch(displayToast("Address has been updated"));
      }
      return dispatch(editAddressSuccess(resultJson));
    } catch (e) {
      return dispatch(editAddressFailure(e.message));
    }
  };
}
export function fetchOrderDetailsRequest() {
  return {
    type: FETCH_ORDER_DETAILS_REQUEST,
    status: REQUESTING
  };
}
export function fetchOrderDetailsSuccess(fetchOrderDetails) {
  return {
    type: FETCH_ORDER_DETAILS_SUCCESS,
    status: SUCCESS,
    fetchOrderDetails
  };
}

export function fetchOrderDetailsFailure(error) {
  return {
    type: FETCH_ORDER_DETAILS_FAILURE,
    status: ERROR,
    error
  };
}

export function fetchOrderDetails(orderId, pageName) {
  return async (dispatch, getState, { api }) => {
    dispatch(fetchOrderDetailsRequest());
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    try {
      const result = await api.get(
        `${USER_PATH}/${
          JSON.parse(userDetails).userName
        }/getSelectedOrder_V1/${orderId}?access_token=${
          JSON.parse(customerCookie).access_token
        }&isPwa=true&isMDE=true`
      );
      let resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      if (pageName !== "order confirmation") {
        setDataLayer(ADOBE_MY_ACCOUNT_ORDER_DETAILS);
      }
      dispatch(fetchOrderDetailsSuccess(resultJson));
    } catch (e) {
      dispatch(fetchOrderDetailsFailure(e.message));
    }
  };
}

export function retryOrderDetailsSuccess(retryOrderDetails) {
  return {
    type: RETRY_ORDER_DETAILS_SUCCESS,
    status: SUCCESS,
    retryOrderDetails
  };
}

export function retryOrderDetailsFailure(error) {
  return {
    type: RETRY_ORDER_DETAILS_FAILURE,
    status: ERROR,
    error
  };
}
export function getRetryOrderDetails(orderId) {
  return async (dispatch, getState, { api }) => {
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    try {
      const result = await api.get(
        `${USER_PATH}/${
          JSON.parse(userDetails).userName
        }/getSelectedOrder_V1/${orderId}?access_token=${
          JSON.parse(customerCookie).access_token
        }&isPwa=true&isMDE=true`
      );
      let resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      return dispatch(retryOrderDetailsSuccess(resultJson));
    } catch (e) {
      return dispatch(retryOrderDetailsFailure(e.message));
    }
  };
}
export function fetchOrderItemDetails(orderId, transactionId) {
  return async (dispatch, getState, { api }) => {
    dispatch(fetchOrderDetailsRequest());
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    try {
      const result = await api.get(
        `${USER_PATH}/${
          JSON.parse(userDetails).userName
        }/getSelectedTransaction/${orderId}/${transactionId}?access_token=${
          JSON.parse(customerCookie).access_token
        }&isPwa=true&isMDE=true`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      // setDataLayer(ADOBE_MY_ACCOUNT_ORDER_DETAILS);
      dispatch(fetchOrderDetailsSuccess(resultJson));
    } catch (e) {
      dispatch(fetchOrderDetailsFailure(e.message));
    }
  };
}

export function sendInvoiceRequest() {
  return {
    type: SEND_INVOICE_REQUEST,
    status: REQUESTING
  };
}
export function sendInvoiceSuccess(sendInvoice) {
  return {
    type: SEND_INVOICE_SUCCESS,
    status: SUCCESS,
    sendInvoice
  };
}

export function sendInvoiceFailure(error) {
  return {
    type: SEND_INVOICE_FAILURE,
    status: ERROR,
    error
  };
}

export function sendInvoice(lineID, orderNumber) {
  return async (dispatch, getState, { api }) => {
    dispatch(sendInvoiceRequest());
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    try {
      const result = await api.get(
        `${USER_PATH}/${
          JSON.parse(userDetails).userName
        }/sendInvoice?access_token=${
          JSON.parse(customerCookie).access_token
        }&orderNumber=${orderNumber}&lineID=${lineID}`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      dispatch(sendInvoiceSuccess(resultJson));
      if (resultJson && resultJson.status === "Success") {
        dispatch(displayToast("Invoice has been sent"));
      }
    } catch (e) {
      dispatch(sendInvoiceFailure(e.message));
    }
  };
}

export function updateProfileRequest() {
  return {
    type: UPDATE_PROFILE_REQUEST,
    status: REQUESTING
  };
}

export function logoutUserByMobileNumber() {
  return {
    type: LOGOUT
  };
}

export function updateProfileSuccess(userDetails) {
  return {
    type: UPDATE_PROFILE_SUCCESS,
    status: SUCCESS,
    userDetails
  };
}

export function updateProfileFailure(error) {
  return {
    type: UPDATE_PROFILE_FAILURE,
    status: ERROR,
    error
  };
}

export function updateProfile(accountDetails, otp) {
  let dateOfBirth = format(
    accountDetails.dateOfBirth,
    DATE_FORMAT_TO_UPDATE_PROFILE
  );
  return async (dispatch, getState, { api }) => {
    dispatch(updateProfileRequest());
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    let updateProfileUrl;
    let requestUrl = `isPwa=true&access_token=${
      JSON.parse(customerCookie).access_token
    }&ProfileDataRequired=true`;
    if (accountDetails.firstName) {
      requestUrl = requestUrl + `&firstName=${accountDetails.firstName.trim()}`;
    }
    if (accountDetails.lastName) {
      requestUrl = requestUrl + `&lastName=${accountDetails.lastName.trim()}`;
    }
    if (accountDetails.dateOfBirth) {
      requestUrl = requestUrl + `&dateOfBirth=${dateOfBirth}`;
    }
    if (accountDetails.mobileNumber) {
      requestUrl = requestUrl + `&mobilenumber=${accountDetails.mobileNumber}`;
    }
    if (accountDetails.gender) {
      requestUrl = requestUrl + `&gender=${accountDetails.gender}`;
    }
    if (accountDetails.emailId) {
      requestUrl = requestUrl + `&emailid=${accountDetails.emailId}`;
    }
    try {
      updateProfileUrl = `${USER_PATH}/${
        JSON.parse(userDetails).userName
      }/updateprofile?${requestUrl}`;
      if (otp) {
        updateProfileUrl = `${updateProfileUrl}&otp=${otp}`;
      }
      const result = await api.post(updateProfileUrl);
      const resultJson = await result.json();

      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }

      if (accountDetails.gender && accountDetails.isGenderUpdate) {
        dispatch(updateProfileMsd(accountDetails.gender));
      }
      if (resultJson.status === "OTP SENT TO MOBILE NUMBER: PLEASE VALIDATE") {
        dispatch(showModal(UPDATE_PROFILE_OTP_VERIFICATION, accountDetails));
      } else if (
        resultJson.emailId !== JSON.parse(userDetails).userName &&
        !MOBILE_PATTERN.test(JSON.parse(userDetails).userName)
      ) {
        dispatch(setBagCount(0));
        dispatch(logoutUserByMobileNumber());
      } else {
        if (otp) {
          if (
            (resultJson.status === SUCCESS ||
              resultJson.status === SUCCESS_CAMEL_CASE ||
              resultJson.status === SUCCESS_UPPERCASE) &&
            resultJson.mobileNumber !== JSON.parse(userDetails).userName &&
            MOBILE_PATTERN.test(JSON.parse(userDetails).userName)
          ) {
            dispatch(setBagCount(0));
            dispatch(logoutUserByMobileNumber());
          }
        } else {
          return dispatch(updateProfileSuccess(resultJson));
        }
      }
    } catch (e) {
      return dispatch(updateProfileFailure(e.message));
    }
  };
}

export function getFollowedBrandsRequest() {
  return {
    type: GET_FOLLOWED_BRANDS_REQUEST,
    status: REQUESTING
  };
}
export function getFollowedBrandsSuccess(followedBrands) {
  return {
    type: GET_FOLLOWED_BRANDS_SUCCESS,
    status: SUCCESS,
    followedBrands
  };
}

export function getFollowedBrandsFailure(error) {
  return {
    type: GET_FOLLOWED_BRANDS_FAILURE,
    status: ERROR,
    error
  };
}

export function getFollowedBrands(isSetDataLayer) {
  return async (dispatch, getState, { api }) => {
    const mcvId = await getMcvId();
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    dispatch(getFollowedBrandsRequest());
    let msdFormData = new FormData();
    let userData;
    if (userDetails) {
      userData = JSON.parse(userDetails);
    }
    msdFormData.append("api_key", API_KEY_FOR_MSD);
    msdFormData.append("num_results", NUMBER_OF_RESULTS_FOR_BRANDS);
    msdFormData.append("mad_uuid", mcvId);
    msdFormData.append("details", true);
    msdFormData.append("widget_list", WIDGETS_LIST_FOR_BRANDS);
    if (userData && userData.customerId) {
      msdFormData.append("user_id", userData.customerId);
    }
    try {
      const result = await api.postMsd(`${MSD_ROOT_PATH}/widgets`, msdFormData);
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error();
      }
      if (isSetDataLayer) {
        setDataLayer(ADOBE_MY_ACCOUNT_BRANDS);
      }
      dispatch(getFollowedBrandsSuccess(resultJson.data[0]));
    } catch (e) {
      dispatch(getFollowedBrandsFailure(e.message));
    }
  };
}

export function followAndUnFollowBrandRequest() {
  return {
    type: FOLLOW_AND_UN_FOLLOW_BRANDS_IN_FEEDBACK_REQUEST,
    status: REQUESTING
  };
}

// this reducer we need to handle in home reducer
export function followAndUnFollowBrandSuccessForHomeFeed(
  brandId,
  followStatus,
  positionInFeed
) {
  return {
    type: FOLLOW_AND_UN_FOLLOW_BRANDS_IN_HOME_FEED_SUCCESS,
    status: SUCCESS,
    brandId,
    followStatus,
    positionInFeed
  };
}

// this reducer we need to catch in pdp reducer
export function followAndUnFollowBrandSuccessForPdp(brandId, followStatus) {
  return {
    type: FOLLOW_AND_UN_FOLLOW_BRANDS_IN_PDP_SUCCESS,
    status: SUCCESS,
    brandId,
    followStatus
  };
}

// this reducer we need to catch in account reducer
export function followAndUnFollowBrandSuccessForMyAccount(
  brandId,
  followStatus
) {
  return {
    type: FOLLOW_AND_UN_FOLLOW_BRANDS_IN_MY_ACCOUNT_SUCCESS,
    status: SUCCESS,
    brandId,
    followStatus
  };
}
export function followAndUnFollowBrandFailure(error) {
  return {
    type: FOLLOW_AND_UN_FOLLOW_BRANDS_IN_FEEDBACK_FAILURE,
    status: ERROR,
    error
  };
}

export function followAndUnFollowBrand(
  brandId,
  followStatus,
  pageType: null,
  positionInFeed: null
) {
  const followedText =
    followStatus === "true" || followStatus === true ? UNFOLLOW : FOLLOW;
  //here sometimes  we are getting isFollowingStatus type of string "true" or "false"
  // so here we are converting it in to bool
  const updatedFollowedStatus = !(
    followStatus === "true" || followStatus === true
  );
  return async (dispatch, getState, { api }) => {
    dispatch(followAndUnFollowBrandRequest());
    const mcvId = await getMcvId();
    const updatedBrandObj = {
      api_key: API_KEY_FOR_MSD,
      mad_uuid: mcvId,
      data: [
        {
          fields: "brand",
          values: [brandId],
          action: followedText
        }
      ]
    };
    try {
      const followInFeedBackApiResult = await api.postMsdRowData(
        `feedback`,
        updatedBrandObj
      );
      const followInFeedBackApiResultJson = await followInFeedBackApiResult.json();
      const followInFeedBackApiResultJsonStatus = ErrorHandling.getFailureResponse(
        followInFeedBackApiResultJson
      );
      if (!followInFeedBackApiResultJsonStatus.status) {
        // here we are hitting call for update follow brand on p2 and we don;t have to
        // wait for this response . we just need to wait for msd follow and un follow brand
        // api response if it success then we have to update our reducer with success
        if (customerCookie) {
          await api.post(
            `${PRODUCT_PATH}/${
              JSON.parse(customerCookie).access_token
            }/updateFollowedBrands?brands=${brandId}&follow=${updatedFollowedStatus}&isPwa=true`
          );
        }
        // dispatch success for following brand on the basis of page type
        if (pageType === HOME_FEED_FOLLOW_AND_UN_FOLLOW) {
          const clonedComponent = getState().feed.homeFeed[positionInFeed];
          const indexOfBrand = clonedComponent.data.findIndex(item => {
            return item.id === brandId;
          });
          let brandName = clonedComponent.data[indexOfBrand].brandName;
          setDataLayerForFollowAndUnFollowBrand(
            ADOBE_ON_FOLLOW_AND_UN_FOLLOW_BRANDS,
            {
              followStatus: updatedFollowedStatus,
              brandName
            }
          );
          return dispatch(
            followAndUnFollowBrandSuccessForHomeFeed(
              brandId,
              updatedFollowedStatus,
              positionInFeed
            )
          );
        } else if (pageType === PDP_FOLLOW_AND_UN_FOLLOW) {
          const brandObj = getState().productDescription.aboutTheBrand;
          const brandName = brandObj.brandName;
          setDataLayerForFollowAndUnFollowBrand(
            ADOBE_ON_FOLLOW_AND_UN_FOLLOW_BRANDS,
            {
              followStatus: updatedFollowedStatus,
              brandName
            }
          );
          return dispatch(
            followAndUnFollowBrandSuccessForPdp(brandId, updatedFollowedStatus)
          );
        } else if (pageType === MY_ACCOUNT_FOLLOW_AND_UN_FOLLOW) {
          const currentBrands = getState().profile.followedBrands;
          const brandObj = currentBrands.find(item => item.id === brandId);
          let brandName = brandObj.brandName;
          setDataLayerForFollowAndUnFollowBrand(
            ADOBE_ON_FOLLOW_AND_UN_FOLLOW_BRANDS,
            {
              followStatus: updatedFollowedStatus,
              brandName
            }
          );

          return dispatch(
            followAndUnFollowBrandSuccessForMyAccount(
              brandId,
              updatedFollowedStatus
            )
          );
        }
      } else {
        throw new Error(`Error in following Brand for feedback Api`);
      }
    } catch (e) {
      return dispatch(followAndUnFollowBrandFailure(e.message));
    }
  };
}
export function changePasswordRequest() {
  return {
    type: CHANGE_PASSWORD_REQUEST,
    status: REQUESTING
  };
}
export function changePasswordSuccess(passwordDetails) {
  return {
    type: CHANGE_PASSWORD_SUCCESS,
    status: SUCCESS,
    passwordDetails
  };
}

export function changePasswordFailure(error) {
  return {
    type: CHANGE_PASSWORD_FAILURE,
    status: ERROR,
    error
  };
}

export function getCliqCashRequest() {
  return {
    type: GET_USER_CLIQ_CASH_DETAILS_REQUEST,
    status: REQUESTING
  };
}
export function getCliqCashSuccess(cliqCashDetails) {
  return {
    type: GET_USER_CLIQ_CASH_DETAILS_SUCCESS,
    status: SUCCESS,
    cliqCashDetails
  };
}

export function getCliqCashFailure(error) {
  return {
    type: GET_USER_CLIQ_CASH_DETAILS_FAILURE,
    status: ERROR,
    error
  };
}

export function changePassword(passwordDetails) {
  return async (dispatch, getState, { api }) => {
    dispatch(changePasswordRequest());
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    try {
      const result = await api.post(
        `${PATH}/forgottenpasswordtokens/${
          JSON.parse(userDetails).userName
        }/resetCustomerPassword?isPwa=true&access_token=${
          JSON.parse(customerCookie).access_token
        }&isPwa=true&old=${encodeURIComponent(
          passwordDetails.oldPassword
        )}&newPassword=${encodeURIComponent(passwordDetails.newPassword)}`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }

      return dispatch(changePasswordSuccess(resultJson));
    } catch (e) {
      return dispatch(changePasswordFailure(e.message));
    }
  };
}

export function getCliqCashDetails() {
  return async (dispatch, getState, { api }) => {
    dispatch(getCliqCashRequest());
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    try {
      const result = await api.post(
        `${USER_PATH}/${
          JSON.parse(userDetails).userName
        }/cliqcash/getUserCliqCashDetails?access_token=${
          JSON.parse(customerCookie).access_token
        }&isPwa=true&platformNumber=${PLAT_FORM_NUMBER}`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      setDataLayer(ADOBE_MY_ACCOUNT_CLIQ_CASH);
      if (!resultJson.isWalletOtpVerified) {
        dispatch(showModal(GENERATE_OTP_FOR_CLIQ_CASH));
      }

      dispatch(getCliqCashSuccess(resultJson));
    } catch (e) {
      dispatch(getCliqCashFailure(e.message));
    }
  };
}

export function redeemCliqVoucherRequest() {
  return {
    type: REDEEM_CLIQ_VOUCHER_REQUEST,
    status: REQUESTING
  };
}
export function redeemCliqVoucherSuccess(cliqCashVoucherDetails) {
  return {
    type: REDEEM_CLIQ_VOUCHER_SUCCESS,
    status: SUCCESS,
    cliqCashVoucherDetails
  };
}

export function redeemCliqVoucherFailure(error) {
  return {
    type: REDEEM_CLIQ_VOUCHER_FAILURE,
    status: FAILURE,
    error
  };
}

export function redeemCliqVoucher(cliqCashDetails, fromCheckout) {
  return async (dispatch, getState, { api }) => {
    let cartDetails = Cookie.getCookie(CART_DETAILS_FOR_LOGGED_IN_USER);
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    dispatch(redeemCliqVoucherRequest());
    try {
      const result = await api.postFormData(
        `${USER_PATH}/${
          JSON.parse(userDetails).userName
        }/cliqcash/redeemCliqVoucher?access_token=${
          JSON.parse(customerCookie).access_token
        }&cartGuid=&couponCode=${cliqCashDetails.cardNumber}&passKey=${
          cliqCashDetails.cardPin
        }`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      if (fromCheckout) {
        dispatch(hideModal(GIFT_CARD_MODAL));

        dispatch(getPaymentModes(JSON.parse(cartDetails).guid));
      }
      dispatch(getCliqCashDetails());
      dispatch(getTransactionDetails());
      setDataLayerForGiftCard(SET_DATA_LAYER_ADD_GIFT_CARD_SUBMIT);
      return dispatch(redeemCliqVoucherSuccess(resultJson));
    } catch (e) {
      return dispatch(redeemCliqVoucherFailure(e.message));
    }
  };
}
export function logout() {
  return {
    type: LOGOUT,
    status: SUCCESS
  };
}

export function clearGiftCardStatus() {
  return {
    type: CLEAR_GIFT_CARD_STATUS
  };
}
export function clearAccountUpdateType() {
  return {
    type: CLEAR_ACCOUNT_UPDATE_TYPE
  };
}
export function clearOrderDetails() {
  return {
    type: Clear_ORDER_DATA
  };
}

export function resetAddAddressDetails() {
  return {
    type: RE_SET_ADD_ADDRESS_DETAILS
  };
}
export function clearChangePasswordDetails() {
  return {
    type: CLEAR_CHANGE_PASSWORD_DETAILS
  };
}

export function clearPinCodeStatus() {
  return {
    type: CLEAR_PIN_CODE_STATUS
  };
}

export function logoutUserRequest() {
  return {
    type: LOG_OUT_USER_REQUEST,
    status: REQUESTING
  };
}
export function logoutUserSuccess() {
  return {
    type: LOG_OUT_USER_SUCCESS,
    status: SUCCESS
  };
}

export function logoutUserFailure(error) {
  return {
    type: LOG_OUT_USER_FAILURE,
    status: ERROR,
    error
  };
}

export function logoutUser() {
  return async (dispatch, getState, { api }) => {
    const globalAccessToken = Cookie.getCookie(GLOBAL_ACCESS_TOKEN);
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    dispatch(logoutUserRequest());
    try {
      const result = await api.postFormData(
        `${USER_PATH}/logout?userId=${
          JSON.parse(userDetails).userName
        }&access_token=${JSON.parse(globalAccessToken).access_token}`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      setDataLayerForLogoutSuccess();
      return dispatch(logoutUserSuccess());
    } catch (e) {
      return dispatch(logoutUserFailure(e.message));
    }
  };
}

export function updateProfileMsdRequest() {
  return {
    type: UPDATE_PROFILE_MSD_REQUEST,
    status: REQUESTING
  };
}

export function updateProfileMsdSuccess() {
  return {
    type: UPDATE_PROFILE_MSD_SUCCESS,
    status: SUCCESS
  };
}

export function updateProfileMsdFailure(error) {
  return {
    type: UPDATE_PROFILE_MSD_FAILURE,
    status: ERROR,
    error
  };
}

export function updateProfileMsd(gender) {
  return async (dispatch, getState, { api }) => {
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    dispatch(updateProfileMsdRequest());
    try {
      if (gender === FEMALE) {
        gender = WOMEN;
      }
      if (gender === MALE) {
        gender = MEN;
      }
      let msdData = {};
      msdData.fields = "gender";
      msdData.values = [gender];
      msdData.action = "follow";

      let msdRequestObject = new FormData();
      let userData;
      if (userDetails) {
        userData = JSON.parse(userDetails);
      }
      msdRequestObject.append("api_key", MSD_API_KEY);
      msdRequestObject.append("data", JSON.stringify([msdData]));
      msdRequestObject.append("mad_uuid", MAD_UUID);
      if (userData && userData.customerId) {
        msdRequestObject.append("user_id", userData.customerId);
      }

      const result = await api.postMsd(
        `${API_MSD_URL_ROOT}/${MSD_FEEDBACK}`,
        msdRequestObject
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }

      return dispatch(updateProfileMsdSuccess());
    } catch (e) {
      return dispatch(updateProfileMsdFailure(e.message));
    }
  };
}

export function reSendEmailForGiftCardRequest() {
  return {
    type: RESEND_EMAIL_FOR_GIFT_CARD_REQUEST,
    status: REQUESTING
  };
}
export function reSendEmailForGiftCardSuccess() {
  return {
    type: RESEND_EMAIL_FOR_GIFT_CARD_SUCCESS,
    status: SUCCESS
  };
}
export function reSendEmailForGiftCardFailure(error) {
  return {
    type: RESEND_EMAIL_FOR_GIFT_CARD_FAILURE,
    status: ERROR,
    error
  };
}
export function reSendEmailForGiftCard(orderId) {
  return async (dispatch, getState, { api }) => {
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    dispatch(reSendEmailForGiftCardRequest());
    try {
      let resendEmailObject = new FormData();
      resendEmailObject.append(
        "access_token",
        JSON.parse(customerCookie).access_token
      );
      resendEmailObject.append("orderId", orderId);

      const result = await api.post(
        `${USER_PATH}/${
          JSON.parse(userDetails).userName
        }/resendEGV?isPwa=true&access_token=${
          JSON.parse(customerCookie).access_token
        }&orderId=${orderId}`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      dispatch(displayToast(EMAIL_SENT_SUCCESS_MESSAGE));

      return dispatch(reSendEmailForGiftCardSuccess());
    } catch (e) {
      return dispatch(reSendEmailForGiftCardFailure(e.message));
    }
  };
}
export function getCustomerQueriesDataRequest() {
  return {
    type: GET_CUSTOMER_QUERIES_DATA_REQUEST,
    status: REQUESTING
  };
}
export function getCustomerQueriesDataSuccess(customerQueriesData) {
  return {
    type: GET_CUSTOMER_QUERIES_DATA_SUCCESS,
    status: SUCCESS,
    customerQueriesData
  };
}
export function getCustomerQueriesDataFailure() {
  return {
    type: GET_CUSTOMER_QUERIES_DATA_FAILURE,
    status: FAILURE
  };
}

export function getOrderRelatedQuestionsRequest() {
  return {
    type: GET_ORDER_RELATED_QUESTIONS_REQUEST,
    status: REQUESTING
  };
}
export function getOrderRelatedQuestionsSuccess(orderRelatedQuestions) {
  return {
    type: GET_ORDER_RELATED_QUESTIONS_SUCCESS,
    status: SUCCESS,
    orderRelatedQuestions
  };
}
export function getOrderRelatedQuestionsFailure(error) {
  return {
    type: GET_ORDER_RELATED_QUESTIONS_FAILURE,
    status: FAILURE,
    error
  };
}

export function getOrderRelatedQuestions(transactionId) {
  let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
  let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
  return async (dispatch, getState, { api }) => {
    dispatch(getOrderRelatedQuestionsRequest());
    try {
      const result = await api.post(
        `${USER_CART_PATH}/${
          JSON.parse(userDetails).userName
        }/getOrderRelatedQuestions?access_token=${
          JSON.parse(customerCookie).access_token
        }&transactionId=${transactionId}`
      );

      const resultJson = await result.json();
      // if (resultJson.error) {
      //   dispatch(getOrderRelatedQuestionsSuccess(resultJson));
      //   dispatch(displayToast(resultJson.error));
      // }
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }

      return dispatch(getOrderRelatedQuestionsSuccess(resultJson));
    } catch (e) {
      return dispatch(getOrderRelatedQuestionsFailure(e.message));
    }
  };
}

export function getAllOthersHelpRequest() {
  return {
    type: GET_ALL_OTHERS_HELP_REQUEST,
    status: REQUESTING
  };
}

export function getAllOthersHelpSuccess(data) {
  return {
    type: GET_ALL_OTHERS_HELP_SUCCESS,
    status: SUCCESS,
    data
  };
}

export function getAllOthersHelpFailure(error) {
  return {
    type: GET_ALL_OTHERS_HELP_FAILURE,
    status: ERROR,
    error
  };
}

export function getAllOthersHelp(pageId) {
  return async (dispatch, getState, { api }) => {
    dispatch(getAllOthersHelpRequest());
    try {
      const result = await api.get(`${PATH}/cms/defaultpage?pageId=${pageId}`);
      let resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }

      const formatList = [];
      for (let list of resultJson.items) {
        const format = formatFaqList(list);
        formatList.push(format);
      }
      dispatch(getAllOthersHelpSuccess(formatList));
    } catch (e) {
      dispatch(getAllOthersHelpFailure(e.message));
    }
  };
}

const formatFaqList = (list = []) => {
  const items = list.cmsParagraphComponent.content.split("|");
  const returnFormat = {
    image: items && items[0] ? items[0] : "",
    FAQHeader: items && items[1] ? items[1] : "",
    FAQSubHeader: items && items[2] ? items[2] : "",
    FAQPageId: items && items[3] ? items[3] : "",
    componentName: list.componentName,
    type: list.cmsParagraphComponent.type ? list.cmsParagraphComponent.type : ""
  };
  return returnFormat;
};

// export function getFaqRelatedQuestionsRequest() {
//   return {
//     type: GET_QUESTIONS_LIST_REQUEST,
//     status: REQUESTING
//   };
// }
// export function getFaqRelatedQuestionsSuccess(faqList) {
//   return {
//     type: GET_QUESTIONS_LIST_SUCCESS,
//     status: SUCCESS,
//     faqList
//   };
// }
// export function getFaqRelatedQuestionsFailure() {
//   return {
//     type: GET_QUESTIONS_LIST_FAILURE,
//     status: FAILURE
//   };
// }

export function getFaqRelatedQuestionsRequest() {
  return {
    type: GET_FAQ_RELATED_QUESTIONS_REQUEST,
    status: REQUESTING
  };
}

export function getFaqRelatedQuestionsSuccess(data) {
  return {
    type: GET_FAQ_RELATED_QUESTIONS_SUCCESS,
    status: SUCCESS,
    data
  };
}

export function getFaqRelatedQuestionsFailure(error) {
  return {
    type: GET_FAQ_RELATED_QUESTIONS_FAILURE,
    status: ERROR,
    error
  };
}

export function getFaqRelatedQuestions(FAQPageId) {
  return async (dispatch, getState, { api }) => {
    dispatch(getFaqRelatedQuestionsRequest());
    try {
      const result = await api.get(
        `v2/mpl/cms/defaultpage?pageId=${FAQPageId}`
      );
      let resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      return dispatch(getFaqRelatedQuestionsSuccess(resultJson));
    } catch (e) {
      return dispatch(getFaqRelatedQuestionsFailure(e.message));
    }
  };
}

// export function getNonOrderRelatedQuestionsRequest() {
//   return {
//     type: GET_CUSTOMER_QUERIES_DATA_REQUEST,
//     status: REQUESTING
//   };
// }
// export function getNonOrderRelatedQuestionsSuccess(customerQueriesData) {
//   return {
//     type: GET_CUSTOMER_QUERIES_DATA_SUCCESS,
//     status: SUCCESS,
//     customerQueriesData
//   };
// }
// export function getNonOrderRelatedQuestionsFailure() {
//   return {
//     type: GET_CUSTOMER_QUERIES_DATA_FAILURE,
//     status: FAILURE
//   };
// }

export function getNonOrderRelatedQuestionsRequest() {
  return {
    type: GET_CUSTOMER_OTHER_ISSUE_DATA_REQUEST,
    status: REQUESTING
  };
}
export function getNonOrderRelatedQuestionsSuccess(customerQueriesData) {
  return {
    type: GET_CUSTOMER_OTHER_ISSUE_DATA_SUCCESS,
    status: SUCCESS,
    customerQueriesData
  };
}
export function getNonOrderRelatedQuestionsFailure() {
  return {
    type: GET_CUSTOMER_OTHER_ISSUE_DATA_FAILURE,
    status: FAILURE
  };
}

export function getNonOrderRelatedQuestions() {
  return async (dispatch, getState, { api }) => {
    dispatch(getNonOrderRelatedQuestionsRequest());
    try {
      const result = await api.get(`${PATH}/getNonOrderRelatedQuestions`);
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      dispatch(getNonOrderRelatedQuestionsSuccess(resultJson));
    } catch (e) {
      dispatch(getNonOrderRelatedQuestionsFailure(e.message));
    }
  };
}

export function getCliqCareWmsRequest() {
  return {
    type: GET_CLIQ_CARE_WMS_REQUEST,
    status: REQUESTING
  };
}

export function getCliqCareWmsSuccess(cliqCareWmsResponse) {
  return {
    type: GET_CLIQ_CARE_WMS_SUCCESS,
    status: SUCCESS,
    cliqCareWmsResponse
  };
}

export function getCliqCareWmsFailure(error) {
  return {
    type: GET_CLIQ_CARE_WMS_FAILURE,
    status: ERROR,
    error
  };
}
export function getCliqCareWmsResponse(pageId = "ss-vibhore-test") {
  return async (dispatch, getState, { api }) => {
    dispatch(getCliqCareWmsRequest());
    try {
      const result = await api.get(`v2/mpl/cms/defaultpage?pageId=${pageId}`);
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      dispatch(getCliqCareWmsSuccess(resultJson));
    } catch (e) {
      dispatch(getCliqCareWmsFailure(e.message));
    }
  };
}

export function getCustomerQueriesFieldsRequestv2() {
  return {
    type: GET_CUSTOMER_QUERIES_FIELDS_REQUEST,
    status: REQUESTING
  };
}

export function getCustomerQueriesFieldsSuccessv2(customerQueriesField) {
  return {
    type: GET_CUSTOMER_QUERIES_FIELDS_SUCCESS,
    status: SUCCESS,
    customerQueriesField
  };
}
export function getCustomerQueriesFieldsFailurev2(error) {
  return {
    type: GET_CUSTOMER_QUERIES_FIELDS_FAILURE,
    status: FAILURE,
    error: error
  };
}
let firstData = [];
export function getCustomerQueriesFieldsv2(UItemplateCode, isSelectRadio) {
  return async (dispatch, getState, { api }) => {
    dispatch(getCustomerQueriesFieldsRequestv2());
    try {
      const result = await api.get(
        `v2/mpl/cms/defaultpage?pageId=${UItemplateCode}`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      let fetchData = [];
      let redioData = [];
      resultJson &&
        resultJson.items.map(ele => {
          if (ele.componentName === "textAreaComponent") {
            let textAreaData = getTextAreaApiData(ele);
            fetchData.push(textAreaData);
          }
          if (ele.componentName === "attachmentComponent") {
            let attachmentData = getAttachmentApiData(ele);
            fetchData.push(attachmentData);
          }
          if (ele.componentName === "textboxComponent") {
            let textBoxData = getTextBoxApiData(ele);
            fetchData.push(textBoxData);
          }
          if (ele.componentName === "labelComponent") {
            let labelData = getLabelApiData(ele);
            fetchData.push(labelData);
          }
          if (ele.componentName === "radioComponent") {
            let radioData = getRadioApiData(ele);
            fetchData.push(radioData);
          }
          if (ele.componentName === "checkboxComponent") {
            let checkboxData = getCheckboxApiData(ele);
            fetchData.push(checkboxData);
          }
          if (ele.componentName === "errorComponent") {
            let checkboxData = getLabelApiData(ele);
            fetchData.push(checkboxData);
          }
        });

      if (isSelectRadio) {
        redioData = [...firstData];
        let index =
          redioData.findIndex(f => f.componentName === "radioComponent") + 1;
        redioData.splice(index, 0, ...fetchData);
      } else {
        firstData = [...fetchData];
      }

      return dispatch(
        getCustomerQueriesFieldsSuccessv2(isSelectRadio ? redioData : firstData)
      );
    } catch (e) {
      return dispatch(getCustomerQueriesFieldsFailurev2(e.message));
    }
  };
}

const getFormattedString = (strValue = "") => {
  let formattedValue = "",
    startIndex = null,
    endIndex = null;
  if (strValue.includes("(") && strValue.includes(")")) {
    startIndex = strValue.indexOf("(");
    endIndex = strValue.indexOf(")");
    strValue = `${strValue.slice(0, startIndex - 1)}${strValue.slice(
      startIndex
    )}`;
    formattedValue = `${strValue.slice(0, endIndex - 2)}${strValue.slice(
      endIndex - 1
    )}`;
  } else {
    formattedValue = strValue;
  }
  return formattedValue;
};

const getTextAreaApiData = (apiData = []) => {
  let items =
    apiData.singleBannerComponent && apiData.singleBannerComponent.items[0]
      ? apiData.singleBannerComponent.items[0]
      : "";
  let itemsTitle = items && items.title ? items.title : "";

  let returnValue = {
    componentName: apiData.componentName,
    componentId: apiData.singleBannerComponent.componentId
      ? apiData.singleBannerComponent.componentId
      : "",
    btnText: items && items.btnText ? items.btnText : "",
    heading:
      items && items.description
        ? items.description.split("|")
          ? getFormattedString(items.description.split("|")[0])
          : ""
        : "",
    isMandatory:
      items && items.description
        ? items.description.split("|")
          ? parseInt(items.description.split("|")[1])
          : ""
        : "",
    placeholder:
      items && items.description
        ? items.description.split("|")
          ? getFormattedString(items.description.split("|")[2])
          : ""
        : "",
    hexCode: items && items.hexCode ? items.hexCode : "",
    imageURL: items && items.imageURL ? items.imageURL : "",
    minLimit:
      itemsTitle && itemsTitle.split("|") && itemsTitle.split("|")[0]
        ? itemsTitle.split("|")[0].split(",")[0]
          ? parseInt(itemsTitle.split("|")[0].split(",")[0])
          : ""
        : "",
    minLimitError:
      itemsTitle && itemsTitle.split("|") && itemsTitle.split("|")[0]
        ? itemsTitle.split("|")[0].split(",")[1]
          ? itemsTitle.split("|")[0].split(",")[1]
          : ""
        : "",
    maxLimit:
      itemsTitle && itemsTitle.split("|") && itemsTitle.split("|")[1]
        ? itemsTitle.split("|")[1].split(",")[0]
          ? parseInt(itemsTitle.split("|")[1].split(",")[0])
          : ""
        : "",
    maxLimitError:
      itemsTitle && itemsTitle.split("|") && itemsTitle.split("|")[1]
        ? itemsTitle.split("|")[1].split(",")[1]
          ? itemsTitle.split("|")[1].split(",")[1]
          : ""
        : "",
    webURL: items && items.webURL ? items.webURL : "",
    title: apiData.singleBannerComponent.title
      ? apiData.singleBannerComponent.title
      : "",
    type: apiData.singleBannerComponent.type
      ? apiData.singleBannerComponent.type
      : ""
  };

  return returnValue;
};
const getAttachmentApiData = (apiData = []) => {
  let items =
    apiData.singleBannerComponent && apiData.singleBannerComponent.items[0]
      ? apiData.singleBannerComponent.items[0]
      : "";
  let itemsTitle = items && items.title ? items.title : "";

  let returnValue = {
    componentName: apiData.componentName,
    componentId: apiData.singleBannerComponent.componentId
      ? apiData.singleBannerComponent.componentId
      : "",
    btnText: items && items.btnText ? items.btnText : "",
    heading:
      items && items.description
        ? items.description.split("|")
          ? getFormattedString(items.description.split("|")[0])
          : ""
        : "",
    isMandatory:
      items && items.description
        ? items.description.split("|")
          ? parseInt(items.description.split("|")[1])
          : ""
        : "",
    itemsTitle: getFormattedString(itemsTitle),
    maxFileLimit:
      items && items.hexCode
        ? items.hexCode.split("|").length
          ? parseInt(items.hexCode.split("|")[0])
          : ""
        : "",
    maxFileSize:
      items && items.hexCode
        ? items.hexCode.split("|").length
          ? parseInt(items.hexCode.split("|")[1])
          : ""
        : "",
    imageURL: items && items.imageURL ? items.imageURL : "",
    webURL: items && items.webURL ? items.webURL : "",
    title: apiData.singleBannerComponent.title
      ? apiData.singleBannerComponent.title
      : "",
    type: apiData.singleBannerComponent.type
      ? apiData.singleBannerComponent.type
      : ""
  };

  return returnValue;
};
const getTextBoxApiData = (apiData = []) => {
  let items =
    apiData.singleBannerComponent && apiData.singleBannerComponent.items[0]
      ? apiData.singleBannerComponent.items[0]
      : "";
  let itemsTitle = items && items.title ? items.title : "";
  let regExArray =
    itemsTitle && itemsTitle.split("|") && itemsTitle.split("|")[2]
      ? itemsTitle.split("|")[2].split(",")
        ? itemsTitle.split("|")[2].split(",")
        : []
      : [];

  let regexErr = "",
    regexExp = null;

  if (regExArray.length) {
    regexErr = regExArray[regExArray.length - 1];
    regExArray.splice(-1, 1);
    regexExp = regExArray.join(",");
  }

  let returnValue = {
    componentName: apiData.componentName,
    componentId: apiData.singleBannerComponent.componentId
      ? apiData.singleBannerComponent.componentId
      : "",
    btnText: items && items.btnText ? items.btnText : "",
    heading:
      items && items.description
        ? items.description.split("|")
          ? getFormattedString(items.description.split("|")[0])
          : ""
        : "",
    isMandatory:
      items && items.description
        ? items.description.split("|")
          ? parseInt(items.description.split("|")[1])
          : ""
        : "",
    placeholder:
      items && items.description
        ? items.description.split("|")
          ? getFormattedString(items.description.split("|")[2])
          : ""
        : "",
    hexCode: items && items.hexCode ? items.hexCode : "",
    imageURL: items && items.imageURL ? items.imageURL : "",
    minLimit:
      itemsTitle && itemsTitle.split("|") && itemsTitle.split("|")[0]
        ? itemsTitle.split("|")[0].split(",")[0]
          ? parseInt(itemsTitle.split("|")[0].split(",")[0])
          : ""
        : "",
    minLimitError:
      itemsTitle && itemsTitle.split("|") && itemsTitle.split("|")[0]
        ? itemsTitle.split("|")[0].split(",")[1]
          ? itemsTitle.split("|")[0].split(",")[1]
          : ""
        : "",
    maxLimit:
      itemsTitle && itemsTitle.split("|") && itemsTitle.split("|")[1]
        ? itemsTitle.split("|")[1].split(",")[0]
          ? parseInt(itemsTitle.split("|")[1].split(",")[0])
          : ""
        : "",
    maxLimitError:
      itemsTitle && itemsTitle.split("|") && itemsTitle.split("|")[1]
        ? itemsTitle.split("|")[1].split(",")[1]
          ? itemsTitle.split("|")[1].split(",")[1]
          : ""
        : "",
    // regex:
    //   itemsTitle && itemsTitle.split("|") && itemsTitle.split("|")[2]
    //     ? itemsTitle.split("|")[2].split(",")[0]
    //       ? itemsTitle.split("|")[2].split(",")[0]
    //       : ""
    //     : "",
    // regexError:
    //   itemsTitle && itemsTitle.split("|") && itemsTitle.split("|")[2]
    //     ? itemsTitle.split("|")[2].split(",")[1]
    //       ? itemsTitle.split("|")[2].split(",")[1]
    //       : ""
    //     : "",
    regex: regexExp ? getFormattedString(regexExp) : regexExp,
    regexError: regexErr,
    webURL: items && items.webURL ? items.webURL : "",
    title: apiData.singleBannerComponent.title
      ? apiData.singleBannerComponent.title
      : "",
    type: apiData.singleBannerComponent.type
      ? apiData.singleBannerComponent.type
      : ""
  };

  return returnValue;
};
const getLabelApiData = (apiData = []) => {
  let items =
    apiData.singleBannerComponent && apiData.singleBannerComponent.items[0]
      ? apiData.singleBannerComponent.items[0]
      : "";
  let itemsTitle = items && items.title ? items.title : "";

  let returnValue = {
    componentName: apiData.componentName,
    componentId: apiData.singleBannerComponent.componentId
      ? apiData.singleBannerComponent.componentId
      : "",
    btnText: items && items.btnText ? items.btnText : "",
    heading:
      items && items.description
        ? items.description.split("|")
          ? getFormattedString(items.description.split("|")[0])
          : ""
        : "",
    fontSize:
      items &&
      items.description &&
      items.description.split("|") &&
      items.description.split("|")[1] &&
      items.description.split("|")[1].split(",") &&
      items.description.split("|")[1].split(",")[0]
        ? items.description.split("|")[1].split(",")[0]
        : "",
    fontStyle:
      items &&
      items.description &&
      items.description.split("|") &&
      items.description.split("|")[1] &&
      items.description.split("|")[1].split(",") &&
      items.description.split("|")[1].split(",")[1]
        ? items.description.split("|")[1].split(",")[1]
        : "",
    hexCode: items && items.hexCode ? items.hexCode : "",
    imageURL: items && items.imageURL ? items.imageURL : "",
    itemsTitle: itemsTitle,
    webURL: items && items.webURL ? items.webURL : "",
    title: apiData.singleBannerComponent.title
      ? apiData.singleBannerComponent.title
      : "",
    type: apiData.singleBannerComponent.type
      ? apiData.singleBannerComponent.type
      : ""
  };
  return returnValue;
};

const getRadioApiData = (apiData = []) => {
  let items =
    apiData.singleBannerComponent && apiData.singleBannerComponent.items[0]
      ? apiData.singleBannerComponent.items[0]
      : "";

  let optionArray =
    items &&
    items.title.split("|").map(ele => {
      let tempOption = ele.split(",");
      return {
        optionName: tempOption[0] ? getFormattedString(tempOption[0]) : "",
        value: tempOption[1] ? tempOption[1] : "",
        isSelected: tempOption[2] ? parseInt(tempOption[2]) : "",
        webFormTemplate: tempOption[3] ? tempOption[3] : ""
      };
    });

  let returnValue = {
    componentName: apiData.componentName,
    componentId: apiData.singleBannerComponent.componentId
      ? apiData.singleBannerComponent.componentId
      : "",
    btnText: items && items.btnText ? items.btnText : "",
    heading:
      items && items.description
        ? items.description.split("|")
          ? getFormattedString(items.description.split("|")[0])
          : ""
        : "",
    isMandatory:
      items && items.description
        ? items.description.split("|")
          ? parseInt(items.description.split("|")[1])
          : ""
        : "",
    hexCode: items && items.hexCode ? items.hexCode : "",
    imageURL: items && items.imageURL ? items.imageURL : "",
    optionArray,
    webURL: items && items.webURL ? items.webURL : "",
    title: apiData.singleBannerComponent.title
      ? apiData.singleBannerComponent.title
      : "",
    type: apiData.singleBannerComponent.type
      ? apiData.singleBannerComponent.type
      : ""
  };
  return returnValue;
};

const getCheckboxApiData = (apiData = []) => {
  let items =
    apiData.singleBannerComponent && apiData.singleBannerComponent.items[0]
      ? apiData.singleBannerComponent.items[0]
      : "";

  let optionArray =
    items &&
    items.title.split("|").map(ele => {
      let tempOption = ele.split(",");
      return {
        optionName: tempOption[0] ? tempOption[0] : "",
        value: tempOption[1] ? tempOption[1] : "",
        isSelected: tempOption[2] ? parseInt(tempOption[2]) : "",
        webFormTemplate: tempOption[3] ? tempOption[3] : ""
      };
    });

  let returnValue = {
    componentName: apiData.componentName,
    componentId: apiData.singleBannerComponent.componentId
      ? apiData.singleBannerComponent.componentId
      : "",
    btnText: items && items.btnText ? items.btnText : "",
    heading:
      items && items.description
        ? items.description.split("|")
          ? items.description.split("|")[0]
          : ""
        : "",
    isMandatory:
      items && items.description
        ? items.description.split("|")
          ? parseInt(items.description.split("|")[1])
          : ""
        : "",
    hexCode: items && items.hexCode ? items.hexCode : "",
    imageURL: items && items.imageURL ? items.imageURL : "",
    optionArray,
    webURL: items && items.webURL ? items.webURL : "",
    title: apiData.singleBannerComponent.title
      ? apiData.singleBannerComponent.title
      : "",
    type: apiData.singleBannerComponent.type
      ? apiData.singleBannerComponent.type
      : ""
  };

  return returnValue;
};

export function getOrdersTransactionDataRequest(paginated: false) {
  return {
    type: GET_ORDERS_TRANSACTION_DATA_REQUEST,
    status: REQUESTING
  };
}
export function getOrdersTransactionDataSuccess(
  ordersTransactionData,
  isPaginated: false
) {
  return {
    type: GET_ORDERS_TRANSACTION_DATA_SUCCESS,
    status: SUCCESS,
    ordersTransactionData,
    isPaginated
  };
}
export function getOrdersTransactionDataFailure(error, isPaginated) {
  return {
    type: GET_ORDERS_TRANSACTION_DATA_FAILURE,
    status: FAILURE,
    error,
    isPaginated
  };
}

export function getOrdersTransactionData(paginated) {
  return async (dispatch, getState, { api }) => {
    dispatch(getOrdersTransactionDataRequest(paginated));
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    dispatch(showSecondaryLoader());
    let currentPage = 0;
    if (paginated) {
      if (getState().profile.ordersTransactionData) {
        currentPage = getState().profile.ordersTransactionData.currentPage + 1;
      }
    }

    try {
      const result = await api.get(
        `${USER_PATH}/${
          JSON.parse(userDetails).userName
        }/getOrderTransactions?currentPage=${currentPage}&access_token=${
          JSON.parse(customerCookie).access_token
        }&channel=web`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      if (paginated) {
        dispatch(getOrdersTransactionDataSuccess(resultJson, paginated));
        dispatch(hideSecondaryLoader());
      } else {
        dispatch(getOrdersTransactionDataSuccess(resultJson, paginated));
        dispatch(hideSecondaryLoader());
      }
    } catch (e) {
      dispatch(hideSecondaryLoader());
      dispatch(getOrdersTransactionDataFailure(e.message, paginated));
    }
  };
}

export function clearOrderTransactionDetails() {
  return {
    type: CLEAR_ORDER_TRANSACTION_DATA
  };
}
export function uploadUserFileRequest() {
  return {
    type: UPLOAD_USER_FILE_REQUEST,
    status: REQUESTING
  };
}
export function uploadUserFileSuccess(uploadUserFile) {
  return {
    type: UPLOAD_USER_FILE_SUCCESS,
    status: SUCCESS,
    uploadUserFile
  };
}
export function uploadUserFileFailure() {
  return {
    type: UPLOAD_USER_FILE_FAILURE,
    status: FAILURE
  };
}

export function uploadUserFile(issueType, title, file) {
  return async (dispatch, getState, { api }) => {
    dispatch(uploadUserFileRequest());
    try {
      let uploadUserFileObject = new FormData();
      uploadUserFileObject.append("IssueType", issueType);
      file.forEach(val => {
        uploadUserFileObject.append(title, val);
      });
      const result = await api.postFormData(
        `${PATH}/attachmentUpload`,
        uploadUserFileObject
      );

      const resultJson = await result.json();

      if (resultJson.status.toLowerCase() == FAILURE.toLowerCase()) {
        dispatch(displayToast(resultJson.error));
      }
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      return dispatch(uploadUserFileSuccess(resultJson));
    } catch (e) {
      return dispatch(uploadUserFileFailure(e.message));
    }
  };
}

export function submitOrderDetailsRequest() {
  return {
    type: SUBMIT_ORDER_DETAILS_REQUEST,
    status: REQUESTING
  };
}
export function submitOrderDetailsSuccess(submitOrder) {
  return {
    type: SUBMIT_ORDER_DETAILS_SUCCESS,
    status: SUCCESS,
    submitOrder
  };
}
export function submitOrderDetailsFailure(error) {
  return {
    type: SUBMIT_ORDER_DETAILS_FAILURE,
    status: FAILURE,
    error
  };
}
export function submitOrderDetails(raiseTicketObj) {
  return async (dispatch, getState, { api }) => {
    dispatch(submitOrderDetailsRequest());
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    try {
      const result = await api.post(
        `${USER_PATH}/${
          JSON.parse(userDetails).userName
        }/raiseTicket?access_token=${JSON.parse(customerCookie).access_token}`,
        raiseTicketObj
      );

      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      return dispatch(submitOrderDetailsSuccess(resultJson));
    } catch (e) {
      return dispatch(submitOrderDetailsFailure(e.message));
    }
  };
}

export function getUserReviewRequest() {
  return {
    type: GET_USER_REVIEW_REQUEST,
    status: REQUESTING
  };
}
export function getUserReviewSuccess(userReview) {
  return {
    type: GET_USER_REVIEW_SUCCESS,
    status: SUCCESS,
    userReview
  };
}
export function getUserReviewFailure() {
  return {
    type: GET_USER_REVIEW_FAILURE,
    status: FAILURE
  };
}
export function getUserReview(pageIndex) {
  return async (dispatch, getState, { api }) => {
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    dispatch(getUserReviewRequest());
    try {
      const result = await api.get(
        `${USER_PATH}/${
          JSON.parse(userDetails).userName
        }/viewUserReview?fields=BASIC&access_token=${
          JSON.parse(customerCookie).access_token
        }&page=${pageIndex}&pageSize=${PAGE_NUMBER}`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      return dispatch(getUserReviewSuccess(resultJson));
    } catch (e) {
      return dispatch(getUserReviewFailure(e.message));
    }
  };
}
export function retryPaymentRequest() {
  return {
    type: RETRY_PAYMENT_REQUEST,
    status: REQUESTING
  };
}
export function retryPaymentSuccess(retryPaymentDetails) {
  return {
    type: RETRY_PAYMENT_SUCCESS,
    status: SUCCESS,
    retryPaymentDetails
  };
}
export function retryPaymentFailure() {
  return {
    type: RETRY_PAYMENT_FAILURE,
    status: FAILURE
  };
}
export function retryPayment(retryPaymentGuId, retryPaymentUserId) {
  return async (dispatch, getState, { api }) => {
    dispatch(retryPaymentRequest());
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    try {
      const result = await api.get(
        `${USER_PATH}/${
          JSON.parse(userDetails).userName
        }/payments/failedorderdetails?&access_token=${
          JSON.parse(customerCookie).access_token
        }&cartGuid=${retryPaymentGuId}&retryFlag=true&isUpdatedPwa=true&retryUserId=${retryPaymentUserId}&emiConvChargeFlag=true&isDuplicateImei=true&dcEmiResponse=true`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJson.status === FAILURE && resultJson.error) {
        dispatch(displayToast(resultJson.error));
      }
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      if (resultJson.paymentRetryUrl) {
        localStorage.setItem(FAILED_ORDER, resultJson.paymentRetryUrl);
      }
      if (
        resultJson &&
        resultJson.bankCouponName &&
        resultJson.bankCouponName.couponName
      ) {
        localStorage.setItem(
          BANK_COUPON_COOKIE,
          resultJson.bankCouponName.couponName
        );
      }
      if (
        resultJson &&
        resultJson.exchangeInfo &&
        resultJson.exchangeInfo.exchangeCancelMessage
      ) {
        dispatch(displayToast(resultJson.exchangeInfo.exchangeCancelMessage));
      }
      return dispatch(retryPaymentSuccess(resultJson));
    } catch (e) {
      return dispatch(retryPaymentFailure(e.message));
    }
  };
}
export function submitCncToHdDetailsRequest() {
  return {
    type: CNC_TO_HD_DETAILS_REQUEST,
    status: REQUESTING
  };
}
export function submitCncToHdDetailsSuccess(cncToHdDetails) {
  return {
    type: CNC_TO_HD_DETAILS_SUCCESS,
    status: SUCCESS,
    cncToHdDetails
  };
}
export function submitCncToHdDetailsFailure() {
  return {
    type: CNC_TO_HD_DETAILS_FAILURE,
    status: FAILURE
  };
}
export function submitCncToHdDetails(userAddress, transactionId, orderId) {
  return async (dispatch, getState, { api }) => {
    dispatch(submitCncToHdDetailsRequest());
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    let addressDetails = Object.assign(
      {},
      {
        countryIso: ISO_CODE,
        addressType: userAddress.addressType,
        postalCode: userAddress.postalCode
          ? userAddress.postalCode
          : userAddress.postalcode,
        state: userAddress.state,
        town: userAddress.town,
        defaultFlag: userAddress.defaultAddress,
        emailId: JSON.parse(userDetails).userName
      }
    );
    if (userAddress.phone) {
      Object.assign(addressDetails, {
        phone: userAddress.phone
      });
    }
    if (userAddress.firstName) {
      Object.assign(addressDetails, {
        firstName: userAddress.firstName.trim()
      });
    }
    if (userAddress.lastName) {
      Object.assign(addressDetails, {
        lastName: userAddress.lastName.trim()
      });
    }
    if (userAddress.line1 || userAddress.addressLine1) {
      Object.assign(addressDetails, {
        line1: userAddress.line1
          ? userAddress.line1.trim()
          : userAddress.addressLine1.trim()
      });
    } else if (!userAddress.line1 && !userAddress.addressLine1) {
      Object.assign(addressDetails, {
        line1: ""
      });
    }
    if (userAddress.line3 || userAddress.addressLine3) {
      Object.assign(addressDetails, {
        line1: userAddress.line3
          ? userAddress.line3.trim()
          : userAddress.addressLine3.trim()
      });
    } else if (!userAddress.line1 && !userAddress.addressLine1) {
      Object.assign(addressDetails, {
        line3: ""
      });
    }
    if (userAddress.line2 || userAddress.addressLine2) {
      Object.assign(addressDetails, {
        line1: userAddress.line2
          ? userAddress.line2.trim()
          : userAddress.addressLine2.trim()
      });
    } else if (!userAddress.line2 && !userAddress.addressLine2) {
      Object.assign(addressDetails, {
        line2: ""
      });
    }
    if (userAddress.landmark) {
      Object.assign(addressDetails, {
        landmark: userAddress.landmark
      });
    } else if (!userAddress.landmark) {
      Object.assign(addressDetails, {
        landmark: ""
      });
    }
    try {
      const result = await api.post(
        `${USER_PATH}/${
          JSON.parse(userDetails).userName
        }/cncToHd/${orderId}?channel=${CHANNEL}&access_token=${
          JSON.parse(customerCookie).access_token
        }&isPwa=true&orderlineId=${transactionId}`,
        addressDetails
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        return resultJson;
      }
      return dispatch(submitCncToHdDetailsSuccess(resultJson));
    } catch (e) {
      return dispatch(submitCncToHdDetailsFailure(e.message));
    }
  };
}

/**
 * Cliq Cash configuration API
 */
export function getCliqCashPageConfigurationRequest() {
  return {
    type: GET_CLIQ_CASH_CONFIG_REQUEST,
    status: REQUESTING
  };
}

export function getCliqCashPageConfigurationSuccess(cliqCashConfig) {
  return {
    type: GET_CLIQ_CASH_CONFIG_SUCCESS,
    cliqCashConfig,
    status: SUCCESS
  };
}

export function getCliqCashPageConfigurationFailure(error) {
  return {
    type: GET_CLIQ_CASH_CONFIG_FAILURE,
    status: FAILURE,
    error
  };
}

export function getCliqCashPageConfiguration(startDate, endDate) {
  return async (dispatch, getState, { api }) => {
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    dispatch(getCliqCashPageConfigurationRequest());

    try {
      const result = await api.get(
        `${USER_PATH}/${
          JSON.parse(userDetails).userName
        }/getCliqCashPageActions?channel=${CHANNEL}&access_token=${
          JSON.parse(customerCookie).access_token
        }`
      );
      let resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      dispatch(getCliqCashPageConfigurationSuccess(resultJson));
    } catch (e) {
      dispatch(getCliqCashPageConfigurationFailure(e.message));
    }
  };
}
/**
 * EOC
 */

export function getCliqCashExpiringRequest() {
  return {
    type: GET_USER_CLIQ_CASH_EXPIRING_DETAILS_REQUEST,
    status: REQUESTING
  };
}

export function getCliqCashExpiringSuccess(cliqCashExpiringDetails) {
  return {
    type: GET_USER_CLIQ_CASH_EXPIRING_DETAILS_SUCCESS,
    status: SUCCESS,
    cliqCashExpiringDetails
  };
}

export function getCliqCashExpiringFailure(error) {
  return {
    type: GET_USER_CLIQ_CASH_EXPIRING_DETAILS_FAILURE,
    status: ERROR,
    error
  };
}

export function getCliqCashExpiring() {
  return async (dispatch, getState, { api }) => {
    const customerAccessToken = await getCustomerAccessToken();
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    dispatch(getCliqCashExpiringRequest());
    try {
      const result = await api.get(
        `${USER_PATH}/${
          JSON.parse(userDetails).userName
        }/getCliqCashExpiring?access_token=${customerAccessToken}`
      );
      let resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      dispatch(getCliqCashExpiringSuccess(resultJson));
    } catch (e) {
      dispatch(getCliqCashExpiringFailure(e.message));
    }
  };
}

export function getCliqCashbackDetailsRequest() {
  return {
    type: GET_USER_CLIQ_CASHBACK_DETAILS_REQUEST,
    status: REQUESTING
  };
}

export function getCliqCashbackDetailsSuccess(getCliqCashbackDetails) {
  return {
    type: GET_USER_CLIQ_CASHBACK_DETAILS_SUCCESS,
    status: SUCCESS,
    getCliqCashbackDetails
  };
}

export function getCliqCashbackDetailsFailure(error) {
  return {
    type: GET_USER_CLIQ_CASHBACK_DETAILS_FAILURE,
    status: ERROR,
    error
  };
}

export function getCliqCashbackDetails(cashbackmode) {
  return async (dispatch, getState, { api }) => {
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    dispatch(getCliqCashbackDetailsRequest());
    try {
      const result = await api.post(
        `${USER_PATH}/${
          JSON.parse(userDetails).userName
        }/getCliqCashbackDetails?access_token=${
          JSON.parse(customerCookie).access_token
        }&cashbackmode=${cashbackmode}`
      );
      let resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      dispatch(getCliqCashbackDetailsSuccess(resultJson));
    } catch (e) {
      dispatch(getCliqCashbackDetailsFailure(e.message));
    }
  };
}

export function productRatingByUserRequest() {
  return {
    type: GET_USER_RATING_REQUEST
  };
}

export function productRatingByUserSuccess(rating) {
  return {
    type: GET_USER_RATING_SUCCESS,
    status: SUCCESS,
    rating
  };
}

export function productRatingByUserFailure(error) {
  return {
    type: GET_USER_RATING_FAILURE,
    error,
    status: FAILURE
  };
}

export function submitProductRatingByUser(ratingValue, propsData) {
  let reviewData = new FormData();
  reviewData.append("comment", "");
  reviewData.append("rating", ratingValue);
  reviewData.append("headline", "");
  if (
    propsData &&
    propsData.productDetails &&
    propsData.productDetails.ratingId
  ) {
    reviewData.append("id", propsData.productDetails.ratingId);
  }
  return async (dispatch, getState, { api }) => {
    dispatch(productRatingByUserRequest());
    try {
      const result = await api.postFormData(
        `${PRODUCT_PATH}/${propsData.productDetails.productcode}
        /reviews?isPwa=true&access_token=${
          JSON.parse(customerCookie).access_token
        }`,
        reviewData
      );

      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      if (resultJson.rating) {
        dispatch(displayToast("RATING_SUBMIT_SUCCESS_TOAST"));
        setDataLayerForRatingAndReview(SET_DATA_LAYER_RATING_MESSAGE, {
          rating: null,
          statusText: SUCCESSFUL_PRODUCT_RATING_BY_USER
        });
      } else {
        dispatch(displayToast(PRODUCT_RATING_FAILURE_TEXT));
        setDataLayerForRatingAndReview(SET_DATA_LAYER_RATING_MESSAGE, {
          rating: null,
          statusText: PRODUCT_RATING_FAILURE_TEXT
        });
      }
      dispatch(clearOrderDetails());
      dispatch(getAllOrdersDetails());
      dispatch(productRatingByUserSuccess(resultJson.rating));
    } catch (e) {
      dispatch(productRatingByUserFailure(e.message));
    }
  };
}

export function getUserNotificationRequest() {
  return {
    type: GET_USER_NOTIFICATION_DETAILS_REQUEST,
    status: REQUESTING
  };
}
export function getUserNotificationSuccess(notificationDetails) {
  return {
    type: GET_USER_NOTIFICATION_DETAILS_SUCCESS,
    status: SUCCESS,
    notificationDetails
  };
}

export function getUserNotificationFailure(error) {
  return {
    type: GET_USER_NOTIFICATION_DETAILS_FAILURE,
    status: FAILURE,
    error
  };
}

export function getUserNotifications() {
  return async (dispatch, getState, { api }) => {
    dispatch(getUserNotificationRequest());
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    try {
      const result = await api.get(
        `${USER_PATH}/${
          JSON.parse(userDetails).userName
        }/getUserPreferences?access_token=${
          JSON.parse(customerCookie).access_token
        }`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      return dispatch(getUserNotificationSuccess(resultJson));
    } catch (e) {
      return dispatch(getUserNotificationFailure(e.message));
    }
  };
}

export function setSMSNotificationRequest() {
  return {
    type: SET_USER_SMS_NOTIFICATION_REQUEST,
    status: REQUESTING
  };
}
export function setSMSNotificationSuccess(setSMSResponse) {
  return {
    type: SET_USER_SMS_NOTIFICATION_SUCCESS,
    status: SUCCESS,
    setSMSResponse
  };
}
export function setSMSNotificationFailure(error) {
  return {
    type: SET_USER_SMS_NOTIFICATION_FAILURE,
    status: FAILURE,
    error
  };
}

export function setSMSNotification(val) {
  return async (dispatch, getState, { api }) => {
    dispatch(setSMSNotificationRequest());
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    try {
      const result = await api.post(
        `${USER_PATH}/${
          JSON.parse(userDetails).userName
        }/updateUserPreference?channel=web&sms=${val}&access_token=${
          JSON.parse(customerCookie).access_token
        }`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      return dispatch(setSMSNotificationSuccess(resultJson));
    } catch (e) {
      return dispatch(setSMSNotificationFailure(e.message));
    }
  };
}

export function resetFailedOrderDetails() {
  return { type: RESET_RETRY_PAYMENT };
}

export function releaseBankOfferRetryPaymentSuccess(bankOffer) {
  return {
    type: RETRY_PAYMENT_RELEASE_BANK_OFFER_SUCCESS,
    status: SUCCESS,
    bankOffer
  };
}

export function resetUserAddressAfterLogout() {
  return {
    type: RESET_USER_ADDRESS,
    status: SUCCESS
  };
}

export function getPromotionalCashStatementRequest() {
  return {
    type: GET_USER_PROMOTIONAL_CLIQ_CASH_DETAILS_REQUEST,
    status: REQUESTING
  };
}
export function getPromotionalCashStatementSuccess(
  promotionalCashStatementDetails
) {
  return {
    type: GET_USER_PROMOTIONAL_CLIQ_CASH_DETAILS_SUCCESS,
    status: SUCCESS,
    promotionalCashStatementDetails
  };
}

export function getPromotionalCashStatementFailure(error) {
  return {
    type: GET_USER_PROMOTIONAL_CLIQ_CASH_DETAILS_FAILURE,
    status: ERROR
  };
}

export function checkBalanceRequest() {
  return {
    type: CHECK_BALANCE_REQUEST,
    status: REQUESTING
  };
}
export function checkBalanceSuccess(checkBalanceDetails) {
  return {
    type: CHECK_BALANCE_SUCCESS,
    status: SUCCESS,
    checkBalanceDetails
  };
}

export function checkBalanceFailure(error) {
  return {
    type: CHECK_BALANCE_FAILURE,
    status: FAILURE,
    error
  };
}
export function dispatchSelfServeState(currentState) {
  return {
    type: SET_SELF_SERVE_STATE,
    currentState: currentState
  };
}

export function setSelfServeState(currentState) {
  return async (dispatch, getState, { api }) => {
    dispatch(dispatchSelfServeState(currentState));
    // try {
    //   const result = await api.post(
    //     `${USER_PATH}/${
    //       JSON.parse(userDetails).userName
    //     }/updateUserPreference?channel=web&sms=${val}&access_token=${
    //       JSON.parse(customerCookie).access_token
    //     }`
    //   );
    //   const resultJson = await result.json();
    //   const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
    //   if (resultJsonStatus.status) {
    //     throw new Error(resultJsonStatus.message);
    //   }
    //   return dispatch(setSMSNotificationSuccess(resultJson));
    // } catch (e) {
    //   return dispatch(setSMSNotificationFailure(e.message));
    // }
  };
}

export function getExchangeCashbackDetailsRequest() {
  return {
    type: GET_EXCHANGE_CASHBACK_DETAILS_REQUEST,
    status: REQUESTING
  };
}

export function getExchangeCashbackDetailsSuccess(exchangeCashbackDetails) {
  return {
    type: GET_EXCHANGE_CASHBACK_DETAILS_SUCCESS,
    status: SUCCESS,
    exchangeCashbackDetails
  };
}

export function getExchangeCashbackDetailsFailure(error) {
  return {
    type: GET_EXCHANGE_CASHBACK_DETAILS_FAILURE,
    status: FAILURE,
    error
  };
}

export function getPromotionalCashStatement() {
  return async (dispatch, getState, { api }) => {
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerAccessToken = await getCustomerAccessToken();
    dispatch(getPromotionalCashStatementRequest());
    try {
      const result = await api.post(
        `${USER_PATH}/${
          JSON.parse(userDetails).userName
        }/getPromotionalCashStatement?access_token=${customerAccessToken}&isPwa=true&platformNumber=${PLAT_FORM_NUMBER}`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      dispatch(getPromotionalCashStatementSuccess(resultJson));
    } catch (e) {
      dispatch(getPromotionalCashStatementFailure(e.message));
    }
  };
}
export function getExchangeCashbackDetails(parentOrderId) {
  const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
  const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
  return async (dispatch, getState, { api }) => {
    dispatch(getExchangeCashbackDetailsRequest());
    try {
      const result = await api.get(
        `${PATH}/${
          JSON.parse(userDetails).userName
        }/getAccountInfoForExchange?parentOrderId=${parentOrderId}&access_token=${
          JSON.parse(customerCookie).access_token
        }`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      return dispatch(getExchangeCashbackDetailsSuccess(resultJson));
    } catch (e) {
      return dispatch(getExchangeCashbackDetailsFailure(e.message));
    }
  };
}

export function checkBalance(checkBalanceDetails) {
  return async (dispatch, getState, { api }) => {
    const customerAccessToken = await getCustomerAccessToken();
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    dispatch(checkBalanceRequest());
    try {
      const result = await api.post(
        `${USER_PATH}/${
          JSON.parse(userDetails).userName
        }/giftCardCheckBalance?access_token=${customerAccessToken}&channel=web`,
        checkBalanceDetails
      );
      let resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      if (resultJson.status && resultJson.status.toLowerCase() === "success") {
        /**
         * Appending `cardPin` in the resultJson as we need it latter for adding the GC
         * to the Wallet.
         */
        resultJson &&
          Object.assign(resultJson, {
            cardPin: checkBalanceDetails.cardPin
          });
        dispatch(checkBalanceSuccess(resultJson));
        dispatch(hideModal(CLIQ_CASH_MODULE));
      }
    } catch (e) {
      dispatch(checkBalanceFailure(e.message));
    }
  };
}
export function submitExchangeCashbackDetailsRequest() {
  return {
    type: SUBMIT_EXCHANGE_CASHBACK_DETAILS_REQUEST,
    status: REQUESTING
  };
}

export function submitExchangeCashbackDetailsSuccess(cashbackDetails) {
  return {
    type: SUBMIT_EXCHANGE_CASHBACK_DETAILS_SUCCESS,
    status: SUCCESS,
    cashbackDetails
  };
}

export function submitExchangeCashbackDetailsFailure(error) {
  return {
    type: SUBMIT_EXCHANGE_CASHBACK_DETAILS_FAILURE,
    status: FAILURE,
    error
  };
}

export function submitExchangeCashbackDetails(orderId, cashbackDetails) {
  const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
  const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
  let cashbackDetailsData = new FormData();
  Object.keys(cashbackDetails).forEach(key =>
    cashbackDetailsData.append(key, cashbackDetails[key])
  );
  return async (dispatch, getState, { api }) => {
    dispatch(submitExchangeCashbackDetailsRequest());
    try {
      const result = await api.postFormData(
        `${PATH}/${
          JSON.parse(userDetails).userName
        }/submitExchangePaymentInfo?orderId=${orderId}&access_token=${
          JSON.parse(customerCookie).access_token
        }`,
        cashbackDetailsData
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      return dispatch(submitExchangeCashbackDetailsSuccess(resultJson));
    } catch (e) {
      return dispatch(submitExchangeCashbackDetailsFailure(e.message));
    }
  };
}

export function getCliq2CallConfigRequest() {
  return {
    type: GET_CLIQ_2_CALL_CONFIG_REQUEST,
    status: REQUESTING
  };
}
export function getCliq2CallConfigSuccess(cliq2CallConfigData) {
  return {
    type: GET_CLIQ_2_CALL_CONFIG_SUCCESS,
    status: SUCCESS,
    cliq2CallConfigData
  };
}
export function getCliq2CallConfigFailure() {
  return {
    type: GET_CLIQ_2_CALL_CONFIG_FAILURE,
    status: FAILURE
  };
}

export function getCliq2CallConfig(Cliq2CallConfigId) {
  return async (dispatch, getState, { api }) => {
    dispatch(getCliq2CallConfigRequest());
    try {
      const result = await api.get(
        `v2/mpl/cms/defaultpage?pageId=${Cliq2CallConfigId}`
      );

      let resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      let resultJsonParse = "";
      if (
        resultJson &&
        resultJson.items &&
        resultJson.items[0].cmsParagraphComponent
      ) {
        resultJsonParse = JSON.parse(
          resultJson.items[0].cmsParagraphComponent.content
        );
      }
      return dispatch(getCliq2CallConfigSuccess(resultJsonParse));
    } catch (e) {
      return dispatch(getCliq2CallConfigFailure(e.message));
    }
  };
}

export function getGenesysResponseRequest() {
  return {
    type: GET_GENESYS_RESPONSE_REQUEST,
    status: REQUESTING
  };
}
export function getGenesysResponseSuccess(genesysResponse) {
  return {
    type: GET_GENESYS_RESPONSE_SUCCESS,
    status: SUCCESS,
    genesysResponse
  };
}
export function getGenesysResponseFailure() {
  return {
    type: GET_GENESYS_RESPONSE_FAILURE,
    status: FAILURE
  };
}

export function getGenesysCallConfigData() {
  const userDetailsCookie = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
  const userDetails = JSON.parse(userDetailsCookie);
  return async (dispatch, getState, { api }) => {
    dispatch(getGenesysResponseRequest());
    let genesysApiUrl = "";
    if (getState().profile.cliq2CallConfigData) {
      genesysApiUrl = getState().profile.cliq2CallConfigData.genesysApiUrl;
    }
    try {
      const result = await api.postWithoutApiUrlRoot(`${genesysApiUrl}/Lead`, {
        CustomerId: userDetails.customerId,
        Source: GENESYS_KEY
      });
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      dispatch(getGenesysResponseSuccess(resultJson));
    } catch (e) {
      dispatch(getGenesysResponseFailure(e.message));
    }
  };
}

export function genesysCustomerCallRequest() {
  return {
    type: GENESYS_CUSTOMER_CALL_REQUEST,
    status: REQUESTING
  };
}

export function genesysCustomerCallRequestSuccess(data) {
  return {
    type: GENESYS_CUSTOMER_CALL_REQUEST_SUCCESS,
    status: SUCCESS,
    data
  };
}

export function genesysCustomerCallRequestFailure(error) {
  return {
    type: GENESYS_CUSTOMER_CALL_REQUEST_FAILURE,
    status: ERROR,
    error
  };
}

export function placeCustomerCallRequest(callRequestData) {
  const userDetailsCookie = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
  const userDetails = JSON.parse(userDetailsCookie);
  return async (dispatch, getState, { api }) => {
    dispatch(genesysCustomerCallRequest());
    let genesysApiUrl = "";
    if (getState().profile.cliq2CallConfigData) {
      genesysApiUrl = getState().profile.cliq2CallConfigData.genesysApiUrl;
    }
    callRequestData.CustomerId = userDetails.customerId;
    callRequestData.Source = GENESYS_KEY;
    try {
      const result = await api.postWithoutApiUrlRoot(
        `${genesysApiUrl}/Push`,
        callRequestData
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }

      return dispatch(genesysCustomerCallRequestSuccess(resultJson));
    } catch (e) {
      return dispatch(genesysCustomerCallRequestFailure(e.message));
    }
  };
}

export function captureAttachmentsSubmitRequest() {
  return {
    type: SUBMIT_CAPTURE_ATTACHMENTS_REQUEST,
    status: REQUESTING
  };
}

export function getRecentTicketHistoryDetailsRequest() {
  return {
    type: TICKET_RECENT_HISTORY_DETAILS_REQUEST,
    status: REQUESTING
  };
}

export function captureAttachmentsSubmitSuccess(attachmentResponseData) {
  return {
    type: SUBMIT_CAPTURE_ATTACHMENTS_SUCCESS,
    attachmentResponseData,
    status: SUCCESS
  };
}

export function captureAttachmentsSubmitFailure(error) {
  return {
    type: SUBMIT_CAPTURE_ATTACHMENTS_FAILURE,
    status: FAILURE
  };
}

export function getRecentTicketHistoryDetailsSuccess(
  ticketDetails,
  isPaginated = false
) {
  return {
    type: TICKET_RECENT_HISTORY_DETAILS_SUCCESS,
    status: SUCCESS,
    ticketDetails,
    isPaginated
  };
}

export function getRecentTicketHistoryDetailsRequestFailure(error) {
  return {
    type: TICKET_RECENT_HISTORY_DETAILS_FAILURE,
    status: ERROR,
    error
  };
}

export function captureAttachmentsSubmit(custoemrId, sendData) {
  return async (dispatch, getState, { api }) => {
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    dispatch(captureAttachmentsSubmitRequest());
    try {
      const result = await api.post(
        `v2/mpl/docs/upload?access_token=${
          JSON.parse(customerCookie).access_token
        }&cId=${custoemrId}`,
        sendData
      );
      let resultJson = await result.json();
      if (resultJson.status === FAILURE) {
        dispatch(displayToast(resultJson.message));
      }
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      dispatch(captureAttachmentsSubmitSuccess(resultJson));
    } catch (e) {
      dispatch(captureAttachmentsSubmitFailure(e.message));
    }
  };
}

export function getRecentTicketHistoryDetails(
  paginated = false,
  ticketStatus = "",
  ticketYear = ""
) {
  return async (dispatch, getState, { api }) => {
    dispatch(getRecentTicketHistoryDetailsRequest());
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    try {
      let currentPage = 0;
      const ticketDetailsState = { ...getState().profile.ticketHistoryDetails };
      if (Object.keys(ticketDetailsState).length && paginated && ticketStatus) {
        currentPage = ticketDetailsState.currentPage + 1;
      }
      const result = await api.get(
        `${USER_PATH}/${
          JSON.parse(userDetails).userName
        }/getTicketHistory?currentPage=${currentPage}&access_token=${
          JSON.parse(customerCookie).access_token
        }&pageSize=${5}&ticketYear=${ticketYear}&ticketStatus=${
          ticketStatus === "all" ? "" : ticketStatus
        }`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      if (resultJson && !resultJson.tickets) {
        dispatch(displayToast(resultJson.status));
      }

      dispatch(getRecentTicketHistoryDetailsSuccess(resultJson, paginated));
    } catch (e) {
      dispatch(
        getRecentTicketHistoryDetailsRequestFailure(e.message, paginated)
      );
    }
  };
}

export function resetTicketsDataToInitial() {
  return {
    type: RESET_TICKETS_HISTORY_DATA_TO_INITIAL
  };
}
