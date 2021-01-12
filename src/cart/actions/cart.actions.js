import {
  SUCCESS,
  REQUESTING,
  ERROR,
  SUCCESS_CAMEL_CASE,
  SUCCESS_UPPERCASE,
  NO,
  BANK_COUPON_COOKIE,
  PAYMENT_MODE_TYPE,
  SELECTED_BANK_NAME,
  EMI,
  NO_COST_EMI_COUPON,
  CLIQ_CASH,
  STANDARD_EMI,
  PLAT_FORM_NUMBER,
  TOAST_MESSAGE_AFTER_MERGE_CART,
  CHANNEL,
  CLIQ_CASH_APPLIED_LOCAL_STORAGE,
  PRODUCT_CART_ROUTER,
  CHECKOUT_ROUTER,
  SHORT_HOME_DELIVERY,
  SHORT_EXPRESS,
  SHORT_COLLECT,
  HOME_DELIVERY,
  EXPRESS,
  COLLECT,
  ORDER_ID_FOR_ORDER_CONFIRMATION_PAGE,
  BANK_OFFER_TYPE,
  NCE_OFFER_TYPE,
  PAYPAL,
  BUY_NOW_PRODUCT_DETAIL,
  NET_BANKING_PAYMENT_MODE,
  WALLET,
  OFFER_ERROR_PAYMENT_MODE_TYPE,
  EMI_TENURE,
  PRODUCT_DETAIL_FOR_ADD_TO_WISHLIST,
  WHATSAPP_NOTIFICATION,
  NOCART,
  STRIPE_DETAILS,
  ORDER_ID_FOR_PAYMENT_CONFIRMATION_PAGE,
  OLD_CART_GU_ID,
  FAILURE_LOWERCASE,
  BIN_CARD_TYPE,
  SAME_DAY_DELIVERY,
  SHORT_SAME_DAY_DELIVERY,
  RETRY_PAYMENT_CART_ID,
  SELECTED_STORE,
  IS_DC_EMI_SELECTED,
  STATUS_PROCESSING,
  AC_PDP_EXCHANGE_DETAILS,
  AC_CART_EXCHANGE_DETAILS,
  IS_FORWARD_JOURNEY
} from "../../lib/constants";
import * as Cookie from "../../lib/Cookie";
import each from "lodash.foreach";
import * as ErrorHandling from "../../general/ErrorHandling.js";
import {
  showModal,
  EMI_ITEM_LEVEL_BREAKAGE,
  EMI_BANK_TERMS_AND_CONDITIONS,
  INVALID_BANK_COUPON_POPUP,
  VALIDATE_OFFERS_POPUP,
  NON_EMI_ELIGIBLE_TO_WISHLIST
} from "../../general/modal.actions";
import { displayToast } from "../../general/toast.actions";
import { setUrlToRedirectToAfterAuth } from "../../auth/actions/auth.actions.js";
import {
  CUSTOMER_ACCESS_TOKEN,
  GLOBAL_ACCESS_TOKEN,
  LOGGED_IN_USER_DETAILS,
  FAILURE,
  CART_DETAILS_FOR_LOGGED_IN_USER,
  CART_DETAILS_FOR_ANONYMOUS,
  DEFAULT_PIN_CODE_LOCAL_STORAGE,
  JUS_PAY_PENDING,
  JUS_PAY_CHARGED,
  CART_BAG_DETAILS,
  EMI_TYPE,
  SELECTED_DELIVERY_MODE
} from "../../lib/constants";
import queryString from "query-string";
import { setBagCount } from "../../general/header.actions";
import { releaseBankOfferRetryPaymentSuccess } from "../../account/actions/account.actions";
import * as browserAndDeviceDetails from "../../mock/browserDetails.js";
import {
  setDataLayer,
  ADOBE_CART_TYPE,
  setDataLayerForCartDirectCalls,
  ADOBE_REMOVE_ITEM,
  ADOBE_ORDER_CONFIRMATION,
  ADOBE_CHECKOUT_TYPE,
  ADOBE_CALLS_FOR_CHANGE_QUANTITY,
  ADOBE_CALLS_FOR_APPLY_COUPON_SUCCESS,
  ADOBE_CALLS_FOR_APPLY_COUPON_FAIL,
  setDataLayerForOrderConfirmationDirectCalls,
  ADOBE_DIRECT_CALLS_FOR_ORDER_CONFIRMATION_SUCCESS,
  ADOBE_DIRECT_CALLS_FOR_ORDER_CONFIRMATION_FAILURE,
  setDataLayerForCheckoutDirectCalls,
  ADOBE_ADD_ADDRESS_TO_ORDER,
  ADOBE_CALL_FOR_LANDING_ON_PAYMENT_MODE,
  ADOBE_CALL_FOR_APPLY_COUPON_FAILURE,
  ADOBE_CALL_FOR_APPLY_COUPON_SUCCESS,
  ADOBE_FINAL_PAYMENT_MODES,
  ADOBE_CALL_FOR_CLIQ_CASH_TOGGLE_ON,
  ADOBE_CALL_FOR_CLIQ_CASH_TOGGLE_OFF,
  ADOBE_MY_ACCOUNT_ADDRESS_BOOK,
  ADOBE_CALL_FOR_CLIQ_AND_PICK_APPLIED,
  ADOBE_CALL_FOR_PROCCEED_FROM_DELIVERY_MODE
} from "../../lib/adobeUtils";
import { getCustomerAccessToken } from "../../common/services/common.services";
import { getCartDetailsForLoggedInUser } from "../../lib/getCookieDetails.js";
import { appliancesExchangeCheckPincode } from "../../pdp/actions/pdp.actions";

const EGV_GIFT_CART_ID = "giftCartId";
export const RETRY_PAYMENT_DETAILS = "retryPaymentDetails";
export const CLEAR_CART_DETAILS = "CLEAR_CART_DETAILS";
export const RESET_ALL_PAYMENT_MODES = "RESET_ALL_PAYMENT_MODES";
export const PREVENT_REQUESTING_ALL_PAYMENT_MODES =
  "PREVENT_REQUESTING_ALL_PAYMENT_MODES";
export const USER_CART_PATH = "v2/mpl/users";
export const CART_PATH = "v2/mpl";
export const ALL_STORES_PATH = "v2/mpl/allStores";

export const CREATE_PAYMENT_ORDER_REQUEST = "CREATE_PAYMENT_ORDER_REQUEST";
export const CREATE_PAYMENT_ORDER_SUCCESS = "CREATE_PAYMENT_ORDER_SUCCESS";
export const CREATE_PAYMENT_ORDER_FAILURE = "CREATE_PAYMENT_ORDER_FAILURE";

export const COLLECT_PAYMENT_ORDER_FOR_GIFTCARD_REQUEST =
  "COLLECT_PAYMENT_ORDER_FOR_GIFTCARD_REQUEST";
export const COLLECT_PAYMENT_ORDER_FOR_GIFTCARD_SUCCESS =
  "COLLECT_PAYMENT_ORDER_FOR_GIFTCARD_SUCCESS";
export const COLLECT_PAYMENT_ORDER_FOR_GIFTCARD_FAILURE =
  "COLLECT_PAYMENT_ORDER_FOR_GIFTCARD_FAILURE";

export const COLLECT_PAYMENT_ORDER_REQUEST = "COLLECT_PAYMENT_ORDER_REQUEST";
export const COLLECT_PAYMENT_ORDER_SUCCESS = "COLLECT_PAYMENT_ORDER_SUCCESS";
export const COLLECT_PAYMENT_ORDER_FAILURE = "COLLECT_PAYMENT_ORDER_FAILURE";

export const COLLECT_PAYMENT_ORDER_FOR_CLIQCASH_REQUEST =
  "COLLECT_PAYMENT_ORDER_FOR_GIFTCARD_REQUEST";
export const COLLECT_PAYMENT_ORDER_FOR_CLIQCASH_SUCCESS =
  "COLLECT_PAYMENT_ORDER_FOR_GIFTCARD_SUCCESS";
export const COLLECT_PAYMENT_ORDER_FOR_CLIQCASH_FAILURE =
  "COLLECT_PAYMENT_ORDER_FOR_GIFTCARD_FAILURE";

export const GET_PREPAID_ORDER_PAYMENT_CONFIRMATION_REQUEST =
  "GET_PREPAID_ORDER_PAYMENT_CONFIRMATION_REQUEST";
export const GET_PREPAID_ORDER_PAYMENT_CONFIRMATION_SUCCESS =
  "GET_PREPAID_ORDER_PAYMENT_CONFIRMATION_SUCCESS";
export const GET_PREPAID_ORDER_PAYMENT_CONFIRMATION_FAILURE =
  "GET_PREPAID_ORDER_PAYMENT_CONFIRMATION_FAILURE";

export const STRIPE_TOKENIZE_REQUEST = "STRIPE_TOKENIZE_REQUEST";
export const STRIPE_TOKENIZE_SUCCESS = "STRIPE_TOKENIZE_SUCCESS";
export const STRIPE_TOKENIZE_FAILURE = "STRIPE_TOKENIZE_FAILURE";

export const APPLY_USER_COUPON_REQUEST = "APPLY_USER_COUPON_REQUEST";
export const APPLY_USER_COUPON_SUCCESS = "APPLY_USER_COUPON_SUCCESS";
export const APPLY_USER_COUPON_FAILURE = "APPLY_USER_COUPON_FAILURE";

export const GET_COUPON_REQUEST = "GET_COUPON_REQUEST";
export const GET_COUPON_SUCCESS = "GET_COUPON_SUCCESS";
export const GET_COUPON_FAILURE = "GET_COUPON_FAILURE";

export const RELEASE_USER_COUPON_REQUEST = "RELEASE_USER_COUPON_REQUEST";
export const RELEASE_USER_COUPON_SUCCESS = "RELEASE_USER_COUPON_SUCCESS";
export const RELEASE_USER_COUPON_FAILURE = "RELEASE_USER_COUPON_FAILURE";

export const SELECT_DELIVERY_MODES_REQUEST = "SELECT_DELIVERY_MODES_REQUEST";
export const SELECT_DELIVERY_MODES_SUCCESS = "SELECT_DELIVERY_MODES_SUCCESS";
export const SELECT_DELIVERY_MODES_FAILURE = "SELECT_DELIVERY_MODES_FAILURE";

export const GET_USER_ADDRESS_REQUEST = "GET_USER_ADDRESS_REQUEST";
export const GET_USER_ADDRESS_SUCCESS = "GET_USER_ADDRESS_SUCCESS";
export const GET_USER_ADDRESS_FAILURE = "GET_USER_ADDRESS_FAILURE";

export const ADD_USER_ADDRESS_REQUEST = "ADD_USER_ADDRESS_REQUEST";
export const ADD_USER_ADDRESS_SUCCESS = "ADD_USER_ADDRESS_SUCCESS";
export const ADD_NEW_ADDRESS_FOR_USER_ADDRESS_SUCCESS =
  "ADD_NEW_ADDRESS_FOR_USER_ADDRESS_SUCCESS";
export const ADD_USER_ADDRESS_FAILURE = "ADD_USER_ADDRESS_FAILURE";

export const ADD_ADDRESS_TO_CART_REQUEST = "ADD_ADDRESS_TO_CART_REQUEST";
export const ADD_ADDRESS_TO_CART_SUCCESS = "ADD_ADDRESS_TO_CART_SUCCESS";
export const ADD_ADDRESS_TO_CART_FAILURE = "ADD_ADDRESS_TO_CART_FAILURE";

export const CART_DETAILS_CNC_REQUEST = "CART_DETAILS_CNC_REQUEST";
export const CART_DETAILS_CNC_SUCCESS = "CART_DETAILS_CNC_SUCCESS";
export const CART_DETAILS_CNC_FAILURE = "CART_DETAILS_CNC_FAILURE";

export const NET_BANKING_DETAILS_REQUEST = "NET_BANKING_DETAILS_REQUEST";
export const NET_BANKING_DETAILS_SUCCESS = "NET_BANKING_DETAILS_SUCCESS";
export const NET_BANKING_DETAILS_FAILURE = "NET_BANKING_DETAILS_FAILURE";

export const EMI_BANKING_DETAILS_REQUEST = "EMI_BANKING_DETAILS_REQUEST";
export const EMI_BANKING_DETAILS_SUCCESS = "EMI_BANKING_DETAILS_SUCCESS";
export const EMI_BANKING_DETAILS_FAILURE = "EMI_BANKING_DETAILS_FAILURE";

export const GET_EMI_ELIGIBILITY_REQUEST = "GET_EMI_ELIGIBILITY_REQUEST";
export const GET_EMI_ELIGIBILITY_SUCCESS = "GET_EMI_ELIGIBILITY_SUCCESS";
export const GET_EMI_ELIGIBILITY_FAILURE = "GET_EMI_ELIGIBILITY_FAILURE";

export const DC_EMI_BANK_DETAILS_REQUEST = "DC_EMI_BANK_DETAILS_REQUEST";
export const DC_EMI_BANK_DETAILS_SUCCESS = "DC_EMI_BANK_DETAILS_SUCCESS";
export const DC_EMI_BANK_DETAILS_FAILURE = "DC_EMI_BANK_DETAILS_FAILURE";

export const GENERATE_CART_ID_FOR_ANONYMOUS_USER_REQUEST =
  "GENERATE_CART_ID_FOR_ANONYMOUS_USER_REQUEST";
export const GENERATE_CART_ID_FOR_ANONYMOUS_USER_SUCCESS =
  "GENERATE_CART_ID_FOR_ANONYMOUS_USER_SUCCESS";
export const GENERATE_CART_ID_FOR_ANONYMOUS_USER_FAILURE =
  "GENERATE_CART_ID_FOR_ANONYMOUS_USER_FAILURE";

export const GENERATE_CART_ID_FOR_LOGGED_IN_USER_REQUEST =
  "GENERATE_CART_ID_FOR_LOGGED_IN_USER_REQUEST";
export const GENERATE_CART_ID_FOR_LOGGED_IN_USER_SUCCESS =
  "GENERATE_CART_ID_FOR_LOGGED_IN_USER_SUCCESS";
export const GENERATE_CART_ID_FOR_LOGGED_IN_USER_FAILURE =
  "GENERATE_CART_ID_FOR_LOGGED_IN_USER_FAILURE";

export const TEMPORARY_CART_ID_FOR_LOGGED_IN_USER_REQUEST =
  "TEMPORARY_CART_ID_FOR_LOGGED_IN_USER_REQUEST";
export const TEMPORARY_CART_ID_FOR_LOGGED_IN_USER_SUCCESS =
  "TEMPORARY_CART_ID_FOR_LOGGED_IN_USER_SUCCESS";
export const TEMPORARY_CART_ID_FOR_LOGGED_IN_USER_FAILURE =
  "TEMPORARY_CART_ID_FOR_LOGGED_IN_USER_FAILURE";

export const RESET_TEMPORARY_CART = "RESET_TEMPORARY_CART";
export const CART_DETAILS_REQUEST = "CART_DETAILS_REQUEST";
export const CART_DETAILS_SUCCESS = "CART_DETAILS_SUCCESS";
export const CART_DETAILS_FAILURE = "CART_DETAILS_FAILURE";

export const ORDER_SUMMARY_REQUEST = "ORDER_SUMMARY_REQUEST";
export const ORDER_SUMMARY_SUCCESS = "ORDER_SUMMARY_SUCCESS";
export const ORDER_SUMMARY_FAILURE = "ORDER_SUMMARY_FAILURE";

export const GET_CART_ID_REQUEST = "GET_CART_ID_REQUEST";
export const GET_CART_ID_SUCCESS = "GET_CART_ID_SUCCESS";
export const GET_CART_ID_FAILURE = "GET_CART_ID_FAILURE";

export const MERGE_CART_ID_REQUEST = "MERGE_CART_ID_REQUEST";
export const MERGE_CART_ID_SUCCESS = "MERGE_CART_ID_SUCCESS";
export const MERGE_CART_ID_FAILURE = "MERGE_CART_ID_FAILURE";

export const CHECK_PIN_CODE_SERVICE_AVAILABILITY_REQUEST =
  "CHECK_PIN_CODE_SERVICE_AVAILABILITY_REQUEST";
export const CHECK_PIN_CODE_SERVICE_AVAILABILITY_SUCCESS =
  "CHECK_PIN_CODE_SERVICE_AVAILABILITY_SUCCESS";
export const CHECK_PIN_CODE_SERVICE_AVAILABILITY_FAILURE =
  "CHECK_PIN_CODE_SERVICE_AVAILABILITY_FAILURE";

export const GET_ALL_STORES_CNC_REQUEST = "GET_ALL_STORES_CNC_REQUEST";
export const GET_ALL_STORES_CNC_SUCCESS = "GET_ALL_STORES_CNC_SUCCESS";
export const GET_ALL_STORES_CNC_FAILURE = "GET_ALL_STORES_CNC_FAILURE";

export const ADD_STORE_CNC_REQUEST = "ADD_STORE_CNC_REQUEST";
export const ADD_STORE_CNC_SUCCESS = "ADD_STORE_CNC_SUCCESS";
export const ADD_STORE_CNC_FAILURE = "ADD_STORE_CNC_FAILURE";

export const ADD_PICKUP_PERSON_REQUEST = "ADD_PICKUP_PERSON_REQUEST";
export const ADD_PICKUP_PERSON_SUCCESS = "ADD_PICKUP_PERSON_SUCCESS";
export const ADD_PICKUP_PERSON_FAILURE = "ADD_PICKUP_PERSON_FAILURE";

export const SOFT_RESERVATION_REQUEST = "SOFT_RESERVATION_REQUEST";
export const SOFT_RESERVATION_SUCCESS = "SOFT_RESERVATION_SUCCESS";
export const SOFT_RESERVATION_FAILURE = "SOFT_RESERVATION_FAILURE";

export const GET_PAYMENT_MODES_REQUEST = "GET_PAYMENT_MODES_REQUEST";
export const GET_PAYMENT_MODES_SUCCESS = "GET_PAYMENT_MODES_SUCCESS";
export const GET_PAYMENT_MODES_FAILURE = "GET_PAYMENT_MODES_FAILURE";

export const GET_UPI_ELIGIBILITY_REQUEST = "GET_UPI_ELIGIBILITY_REQUEST";
export const GET_UPI_ELIGIBILITY_SUCCESS = "GET_UPI_ELIGIBILITY_SUCCESS";
export const GET_UPI_ELIGIBILITY_FAILURE = "GET_UPI_ELIGIBILITY_FAILURE";

export const BIN_VALIDATION_UPI_REQUEST = "BIN_VALIDATION_UPI_REQUEST";
export const BIN_VALIDATION_UPI_SUCCESS = "BIN_VALIDATION_UPI_SUCCESS";
export const BIN_VALIDATION_UPI_FAILURE = "BIN_VALIDATION_UPI_FAILURE";

export const UPI_MIDDLE_LAYER_IS_NEW_REQUEST =
  "UPI_MIDDLE_LAYER_IS_NEW_REQUEST";
export const UPI_MIDDLE_LAYER_IS_NEW_SUCCESS =
  "UPI_MIDDLE_LAYER_IS_NEW_SUCCESS";
export const UPI_MIDDLE_LAYER_IS_NEW_FAILURE =
  "UPI_MIDDLE_LAYER_IS_NEW_FAILURE";

export const UPI_MIDDLE_LAYER_HOW_IT_WORKS_REQUEST =
  "UPI_MIDDLE_LAYER_HOW_IT_WORKS_REQUEST";
export const UPI_MIDDLE_LAYER_HOW_IT_WORKS_SUCCESS =
  "UPI_MIDDLE_LAYER_HOW_IT_WORKS_SUCCESS";
export const UPI_MIDDLE_LAYER_HOW_IT_WORKS_FAILURE =
  "UPI_MIDDLE_LAYER_HOW_IT_WORKS_FAILURE";

export const UPI_MIDDLE_LAYER_COMBINED_LOGO_REQUEST =
  "UPI_MIDDLE_LAYER_COMBINED_LOGO_REQUEST";
export const UPI_MIDDLE_LAYER_COMBINED_LOGO_SUCCESS =
  "UPI_MIDDLE_LAYER_COMBINED_LOGO_SUCCESS";
export const UPI_MIDDLE_LAYER_COMBINED_LOGO_FAILURE =
  "UPI_MIDDLE_LAYER_COMBINED_LOGO_FAILURE";

export const UPI_MIDDLE_LAYER_IS_ENABLE_REQUEST =
  "UPI_MIDDLE_LAYER_IS_ENABLE_REQUEST";
export const UPI_MIDDLE_LAYER_IS_ENABLE_SUCCESS =
  "UPI_MIDDLE_LAYER_IS_ENABLE_SUCCESS";
export const UPI_MIDDLE_LAYER_IS_ENABLE_FAILURE =
  "UPI_MIDDLE_LAYER_IS_ENABLE_FAILURE";

export const INSTACRED_MIDDLE_LAYER_IS_ENABLE_REQUEST =
  "INSTACRED_MIDDLE_LAYER_IS_ENABLE_REQUEST";
export const INSTACRED_MIDDLE_LAYER_IS_ENABLE_SUCCESS =
  "INSTACRED_MIDDLE_LAYER_IS_ENABLE_SUCCESS";
export const INSTACRED_MIDDLE_LAYER_IS_ENABLE_FAILURE =
  "INSTACRED_MIDDLE_LAYER_IS_ENABLE_FAILURE";

export const COLLECT_PAYMENT_ORDER_FOR_UPI_REQUEST =
  "COLLECT_PAYMENT_ORDER_FOR_UPI_REQUEST";
export const COLLECT_PAYMENT_ORDER_FOR_UPI_SUCCESS =
  "COLLECT_PAYMENT_ORDER_FOR_UPI_SUCCESS";
export const COLLECT_PAYMENT_ORDER_FOR_UPI_FAILURE =
  "COLLECT_PAYMENT_ORDER_FOR_UPI_FAILURE";

export const RELEASE_BANK_OFFER_REQUEST = "RELEASE_BANK_OFFER_REQUEST";
export const RELEASE_BANK_OFFER_SUCCESS = "RELEASE_BANK_OFFER_SUCCESS";
export const RELEASE_BANK_OFFER_FAILURE = "RELEASE_BANK_OFFER_FAILURE";
export const RELEASE_BANK_OFFER_UPDATE_SUCCESS =
  "RELEASE_BANK_OFFER_UPDATE_SUCCESS";

export const APPLY_BANK_OFFER_REQUEST = "APPLY_BANK_OFFER_REQUEST";
export const APPLY_BANK_OFFER_SUCCESS = "APPLY_BANK_OFFER_SUCCESS";
export const APPLY_BANK_OFFER_FAILURE = "APPLY_BANK_OFFER_FAILURE";

export const APPLY_CLIQ_CASH_REQUEST = "APPLY_CLIQ_CASH_REQUEST";
export const APPLY_CLIQ_CASH_SUCCESS = "APPLY_CLIQ_CASH_SUCCESS";
export const APPLY_CLIQ_CASH_FAILURE = "APPLY_CLIQ_CASH_FAILURE";

export const REMOVE_CLIQ_CASH_REQUEST = "REMOVE_CLIQ_CASH_REQUEST";
export const REMOVE_CLIQ_CASH_SUCCESS = "REMOVE_CLIQ_CASH_SUCCESS";
export const REMOVE_CLIQ_CASH_FAILURE = "REMOVE_CLIQ_CASH_FAILURE";

export const BIN_VALIDATION_REQUEST = "BIN_VALIDATION_REQUEST";
export const BIN_VALIDATION_SUCCESS = "BIN_VALIDATION_SUCCESS";
export const BIN_VALIDATION_FAILURE = "BIN_VALIDATION_FAILURE";
export const BANK_GATEWAY_STATUS_ERROR = "BANK_GATEWAY_STATUS_ERROR";

export const SOFT_RESERVATION_FOR_PAYMENT_REQUEST =
  "SOFT_RESERVATION_FOR_PAYMENT_REQUEST";
export const SOFT_RESERVATION_FOR_PAYMENT_SUCCESS =
  "SOFT_RESERVATION_FOR_PAYMENT_SUCCESS";
export const SOFT_RESERVATION_FOR_PAYMENT_FAILURE =
  "SOFT_RESERVATION_FOR_PAYMENT_FAILURE";

export const JUS_PAY_TOKENIZE_REQUEST = "JUS_PAY_TOKENIZE_REQUEST";
export const JUS_PAY_TOKENIZE_SUCCESS = "JUS_PAY_TOKENIZE_SUCCESS";
export const JUS_PAY_TOKENIZE_FAILURE = "JUS_PAY_TOKENIZE_FAILURE";

export const CREATE_JUS_PAY_ORDER_REQUEST = "CREATE_JUS_PAY_ORDER_REQUEST";
export const CREATE_JUS_PAY_ORDER_SUCCESS = "CREATE_JUS_PAY_ORDER_SUCCESS";
export const CREATE_JUS_PAY_ORDER_FOR_CLIQ_CASH_SUCCESS =
  "CREATE_JUS_PAY_ORDER_FOR_CLIQ_CASH_SUCCESS";
export const CREATE_JUS_PAY_ORDER_FAILURE = "CREATE_JUS_PAY_ORDER_FAILURE";

export const JUS_PAY_PAYMENT_METHOD_TYPE_REQUEST =
  "JUS_PAY_PAYMENT_METHOD_TYPE_REQUEST";
export const JUS_PAY_PAYMENT_METHOD_TYPE_SUCCESS =
  "JUS_PAY_PAYMENT_METHOD_TYPE_SUCCESS";
export const JUS_PAY_PAYMENT_METHOD_TYPE_FOR_GIFT_CARD_SUCCESS =
  "JUS_PAY_PAYMENT_METHOD_TYPE_FOR_GIFT_CARD_SUCCESS";
export const JUS_PAY_PAYMENT_METHOD_TYPE_FAILURE =
  "JUS_PAY_PAYMENT_METHOD_TYPE_FAILURE";

export const UPDATE_TRANSACTION_DETAILS_REQUEST =
  "UPDATE_TRANSACTION_DETAILS_REQUEST";
export const UPDATE_TRANSACTION_DETAILS_SUCCESS =
  "UPDATE_TRANSACTION_DETAILS_SUCCESS";
export const UPDATE_TRANSACTION_DETAILS_FAILURE =
  "UPDATE_TRANSACTION_DETAILS_FAILURE";

export const ORDER_CONFIRMATION_REQUEST = "ORDER_CONFIRMATION_REQUEST";
export const ORDER_CONFIRMATION_SUCCESS = "ORDER_CONFIRMATION_SUCCESS";
export const ORDER_CONFIRMATION_FAILURE = "ORDER_CONFIRMATION_FAILURE";

export const GET_COD_ELIGIBILITY_REQUEST = "GET_COD_ELIGIBILITY_REQUEST";
export const GET_COD_ELIGIBILITY_SUCCESS = "GET_COD_ELIGIBILITY_SUCCESS";
export const GET_COD_ELIGIBILITY_FAILURE = "GET_COD_ELIGIBILITY_FAILURE";

export const BIN_VALIDATION_COD_REQUEST = "BIN_VALIDATION_COD_REQUEST";
export const BIN_VALIDATION_COD_SUCCESS = "BIN_VALIDATION_COD_SUCCESS";
export const BIN_VALIDATION_COD_FAILURE = "BIN_VALIDATION_COD_FAILURE";

export const GET_TNC_FOR_BANK_OFFER_REQUEST = "GET_TNC_FOR_BANK_OFFER_REQUEST";
export const GET_TNC_FOR_BANK_OFFER_SUCCESS = "GET_TNC_FOR_BANK_OFFER_SUCCESS";
export const GET_TNC_FOR_BANK_OFFER_FAILURE = " GET_TNC_FOR_BANK_OFFER_FAILURE";

export const UPDATE_TRANSACTION_DETAILS_FOR_COD_REQUEST =
  "UPDATE_TRANSACTION_DETAILS_FOR_COD_REQUEST";
export const UPDATE_TRANSACTION_DETAILS_FOR_COD_SUCCESS =
  "UPDATE_TRANSACTION_DETAILS_FOR_COD_SUCCESS";
export const UPDATE_TRANSACTION_DETAILS_FOR_COD_FAILURE =
  "UPDATE_TRANSACTION_DETAILS_FOR_COD_FAILURE";

export const SOFT_RESERVATION_FOR_COD_PAYMENT_REQUEST =
  "SOFT_RESERVATION_FOR_COD_PAYMENT_REQUEST";
export const SOFT_RESERVATION_FOR_COD_PAYMENT_SUCCESS =
  "SOFT_RESERVATION_FOR_COD_PAYMENT_SUCCESS";
export const SOFT_RESERVATION_FOR_COD_PAYMENT_FAILURE =
  "SOFT_RESERVATION_FOR_COD_PAYMENT_FAILURE";

export const ORDER_EXPERIENCE_CAPTURE_REQUEST =
  "ORDER_EXPERIENCE_CAPTURE_REQUEST";
export const ORDER_EXPERIENCE_CAPTURE_SUCCESS =
  "ORDER_EXPERIENCE_CAPTURE_SUCCESS";
export const ORDER_EXPERIENCE_CAPTURE_FAILURE =
  "ORDER_EXPERIENCE_CAPTURE_FAILURE";

export const CLEAR_ORDER_EXPERIENCE_CAPTURE = "CLEAR_ORDER_EXPERIENCE_CAPTURE";

export const ADD_PRODUCT_TO_WISH_LIST_REQUEST =
  "ADD_PRODUCT_TO_WISH_LIST_REQUEST";
export const ADD_PRODUCT_TO_WISH_LIST_SUCCESS =
  "ADD_PRODUCT_TO_WISH_LIST_SUCCESS";
export const ADD_PRODUCT_TO_WISH_LIST_FAILURE =
  "ADD_PRODUCT_TO_WISH_LIST_FAILURE";
export const REMOVE_ITEM_FROM_CART_LOGGED_IN_REQUEST =
  "REMOVE_ITEM_FROM_CART_LOGGED_IN_REQUEST";
export const REMOVE_ITEM_FROM_CART_LOGGED_IN_SUCCESS =
  "REMOVE_ITEM_FROM_CART_LOGGED_IN_SUCCESS";
export const REMOVE_ITEM_FROM_CART_LOGGED_IN_FAILURE =
  "REMOVE_ITEM_FROM_CART_LOGGED_IN_FAILURE";

export const REMOVE_ITEM_FROM_CART_LOGGED_OUT_REQUEST =
  "REMOVE_ITEM_FROM_CART_LOGGED_OUT_REQUEST";
export const REMOVE_ITEM_FROM_CART_LOGGED_OUT_SUCCESS =
  "REMOVE_ITEM_FROM_CART_LOGGED_OUT_SUCCESS";
export const REMOVE_ITEM_FROM_CART_LOGGED_OUT_FAILURE =
  "REMOVE_ITEM_FROM_CART_LOGGED_OUT_FAILURE";

export const UPDATE_QUANTITY_IN_CART_LOGGED_IN_REQUEST =
  "UPDATE_QUANTITY_IN_CART_LOGGED_IN_REQUEST";
export const UPDATE_QUANTITY_IN_CART_LOGGED_IN_SUCCESS =
  "UPDATE_QUANTITY_IN_CART_LOGGED_IN_SUCCESS";
export const UPDATE_QUANTITY_IN_CART_LOGGED_IN_FAILURE =
  "UPDATE_QUANTITY_IN_CART_LOGGED_IN_FAILURE";

export const UPDATE_QUANTITY_IN_CART_LOGGED_OUT_REQUEST =
  "UPDATE_QUANTITY_IN_CART_LOGGED_OUT_REQUEST";
export const UPDATE_QUANTITY_IN_CART_LOGGED_OUT_SUCCESS =
  "UPDATE_QUANTITY_IN_CART_LOGGED_OUT_SUCCESS";
export const UPDATE_QUANTITY_IN_CART_LOGGED_OUT_FAILURE =
  "UPDATE_QUANTITY_IN_CART_LOGGED_OUT_FAILURE";

export const DISPLAY_COUPON_REQUEST = "DISPLAY_COUPON_REQUEST";
export const DISPLAY_COUPON_SUCCESS = "DISPLAY_COUPON_SUCCESS";
export const DISPLAY_COUPON_FAILURE = "DISPLAY_COUPON_FAILURE";

export const BANK_AND_TENURE_DETAILS_REQUEST =
  "BANK_AND_TENURE_DETAILS_REQUEST";
export const BANK_AND_TENURE_DETAILS_SUCCESS =
  "BANK_AND_TENURE_DETAILS_SUCCESS";
export const BANK_AND_TENURE_DETAILS_FAILURE =
  "BANK_AND_TENURE_DETAILS_FAILURE";

export const EMI_TERMS_AND_CONDITIONS_FOR_BANK_REQUEST =
  "EMI_TERMS_AND_CONDITIONS_FOR_BANK_REQUEST";
export const EMI_TERMS_AND_CONDITIONS_FOR_BANK_SUCCESS =
  "EMI_TERMS_AND_CONDITIONS_FOR_BANK_SUCCESS";
export const EMI_TERMS_AND_CONDITIONS_FOR_BANK_FAILURE =
  "EMI_TERMS_AND_CONDITIONS_FOR_BANK_FAILURE";

export const APPLY_NO_COST_EMI_REQUEST = "APPLY_NO_COST_EMI_REQUEST";
export const APPLY_NO_COST_EMI_SUCCESS = "APPLY_NO_COST_EMI_SUCCESS";
export const APPLY_NO_COST_EMI_FAILURE = "APPLY_NO_COST_EMI_FAILURE";

export const REMOVE_NO_COST_EMI_REQUEST = "REMOVE_NO_COST_EMI_REQUEST";
export const REMOVE_NO_COST_EMI_SUCCESS = "REMOVE_NO_COST_EMI_SUCCESS";
export const REMOVE_NO_COST_EMI_FAILURE = "REMOVE_NO_COST_EMI_FAILURE";

export const EMI_ITEM_BREAK_UP_DETAILS_REQUEST =
  "EMI_ITEM_BREAK_UP_DETAILS_REQUEST";
export const EMI_ITEM_BREAK_UP_DETAILS_SUCCESS =
  "EMI_ITEM_BREAK_UP_DETAILS_SUCCESS";
export const EMI_ITEM_BREAK_UP_DETAILS_FAILURE =
  "EMI_ITEM_BREAK_UP_DETAILS_FAILURE";

export const PAYMENT_FAILURE_ORDER_DETAILS_REQUEST =
  "PAYMENT_FAILURE_ORDER_DETAILS_REQUEST";
export const PAYMENT_FAILURE_ORDER_DETAILS_SUCCESS =
  "PAYMENT_FAILURE_ORDER_DETAILS_SUCCESS";
export const PAYMENT_FAILURE_ORDER_DETAILS_FAILURE =
  "PAYMENT_FAILURE_ORDER_DETAILS_FAILURE";
export const RESET_IS_SOFT_RESERVATION_FAILED =
  "RESET_IS_SOFT_RESERVATION_FAILED";

export const MERGE_TEMP_CART_WITH_OLD_CART_REQUEST =
  "MERGE_TEMP_CART_WITH_OLD_CART_REQUEST";
export const MERGE_TEMP_CART_WITH_OLD_CART_SUCCESS =
  "MERGE_TEMP_CART_WITH_OLD_CART_SUCCESS";
export const MERGE_TEMP_CART_WITH_OLD_CART_FAILURE =
  "MERGE_TEMP_CART_WITH_OLD_CART_FAILURE";

export const EDD_IN_COMMERCE_REQUEST = "EDD_IN_COMMERCE_REQUEST";
export const EDD_IN_COMMERCE_FAILURE = "EDD_IN_COMMERCE_FAILURE";
export const EDD_IN_COMMERCE_SUCCESS = "EDD_IN_COMMERCE_SUCCESS";

export const PAYMENT_MODE = "credit card";
const PAYMENT_EMI = "EMI";
const CASH_ON_DELIVERY = "COD";
const ERROR_CODE_FOR_BANK_OFFER_INVALID_1 = "B9078";
const ERROR_CODE_FOR_BANK_OFFER_INVALID_2 = "B6009";
const ERROR_CODE_FOR_BANK_OFFER_INVALID_3 = "B9599";
const ERROR_CODE_FOR_BANK_OFFER_INVALID_4 = "B9509";
const ERROR_CODE_FOR_BANK_OFFER_INVALID_5 = "B9303";
const ERROR_CODE_FOR_BANK_OFFER_INVALID_6 = "B9510";
const INVALID_COUPON_ERROR_MESSAGE = "invalid coupon";
const JUS_PAY_STATUS_REG_EX = /(status=[A-Za-z0-9_]*)/;

const upiEligibilityError = "You are not eligible for this transaction";

export const CART_ITEM_COOKIE = "cartItems";
export const ADDRESS_FOR_PLACE_ORDER = "orderAddress";
export const ANONYMOUS_USER = "anonymous";

export const GET_FEEDBACK_REQUEST = "GET_FEEDBACK_REQUEST";
export const GET_FEEDBACK_SUCCESS = "GET_FEEDBACK_SUCCESS";
export const GET_FEEDBACK_FAILURE = "GET_FEEDBACK_FAILURE";

export const POST_FEEDBACK_REQUEST = "POST_FEEDBACK_REQUEST";
export const POST_FEEDBACK_SUCCESS = "POST_FEEDBACK_SUCCESS";
export const POST_FEEDBACK_FAILURE = "POST_FEEDBACK_FAILURE";

export const GET_USER_ADDRESS_AND_DELIVERY_MODES_BY_RETRY_PAYMENT_REQUEST =
  "GET_USER_ADDRESS_AND_DELIVERY_MODES_BY_RETRY_PAYMENT_REQUEST";
export const GET_USER_ADDRESS_AND_DELIVERY_MODES_BY_RETRY_PAYMENT_SUCCESS =
  "GET_USER_ADDRESS_AND_DELIVERY_MODES_BY_RETRY_PAYMENT_SUCCESS";
export const GET_USER_ADDRESS_AND_DELIVERY_MODES_BY_RETRY_PAYMENT_FAILURE =
  "GET_USER_ADDRESS_AND_DELIVERY_MODES_BY_RETRY_PAYMENT_FAILURE";

export const BIN_VALIDATION_OF_EMI_ELIGIBLE_REQUEST =
  "BIN_VALIDATION_OF_EMI_ELIGIBLE_REQUEST";
export const BIN_VALIDATION_OF_EMI_ELIGIBLE_FAILURE =
  "BIN_VALIDATION_OF_EMI_ELIGIBLE_FAILURE";
export const BIN_VALIDATION_OF_EMI_ELIGIBLE_SUCCESS =
  "BIN_VALIDATION_OF_EMI_ELIGIBLE_SUCCESS";

export const GET_CART_COUNT_FOR_LOGGED_IN_USER_SUCCESS =
  "GET_CART_COUNT_FOR_LOGGED_IN_USER_SUCCESS";
export const GET_CART_COUNT_FOR_LOGGED_IN_USER_REQUEST =
  "GET_CART_COUNT_FOR_LOGGED_IN_USER_REQUEST";
export const GET_CART_COUNT_FOR_LOGGED_IN_USER_FAILURE =
  "GET_CART_COUNT_FOR_LOGGED_IN_USER_FAILURE";

export const GET_ORDER_UPDATE_ON_WHATSAPP_REQUEST =
  "GET_ORDER_UPDATE_ON_WHATSAPP_REQUEST";
export const GET_ORDER_UPDATE_ON_WHATSAPP_SUCCESS =
  "GET_ORDER_UPDATE_ON_WHATSAPP_SUCCESS";
export const GET_ORDER_UPDATE_ON_WHATSAPP_FAILURE =
  "GET_ORDER_UPDATE_ON_WHATSAPP_FAILURE";
export const GET_MINICART_SUCCESS = "GET_MINICART_SUCCESS";
export const GET_MINICART_REQUEST = "GET_MINICART_REQUEST";
export const GET_MINICART_FAILURE = "GET_MINICART_FAILURE";
export const GET_MINICART_NOCART = "GET_MINICART_NOCART";

export const ORDER_CONFIRMATION_BANNER_REQUEST =
  "ORDER_CONFIRMATION_BANNER_REQUEST";
export const ORDER_CONFIRMATION_BANNER_SUCCESS =
  "ORDER_CONFIRMATION_BANNER_SUCCESS";
export const ORDER_CONFIRMATION_BANNER_FAILURE =
  "ORDER_CONFIRMATION_BANNER_FAILURE";
export const UPI_VPA = "upi_vpa";

export const GET_INTERMITTENT_FEEDBACK_DATA_REQUEST =
  "GET_INTERMITTENT_FEEDBACK_DATA_REQUEST";
export const GET_INTERMITTENT_FEEDBACK_DATA_SUCCESS =
  "GET_INTERMITTENT_FEEDBACK_DATA_SUCCESS";
export const GET_INTERMITTENT_FEEDBACK_DATA_FAILURE =
  "GET_INTERMITTENT_FEEDBACK_DATA_FAILURE";

export const REMOVE_EXCHANGE_REQUEST = "REMOVE_EXCHANGE_REQUEST";
export const REMOVE_EXCHANGE_SUCCESS = "REMOVE_EXCHANGE_SUCCESS";
export const REMOVE_EXCHANGE_FAILURE = "REMOVE_EXCHANGE_FAILURE";

export const GET_CUSTOM_COMPONENT_REQUEST = "GET_CUSTOM_COMPONENT_REQUEST";
export const GET_CUSTOM_COMPONENT_SUCCESS = "GET_CUSTOM_COMPONENT_SUCCESS";
export const GET_CUSTOM_COMPONENT_FAILURE = "GET_CUSTOM_COMPONENT_FAILURE";

export const SUBMIT_APPLIANCES_EXCHANGE_DATA_REQUEST =
  "SUBMIT_APPLIANCES_EXCHANGE_DATA_REQUEST";
export const SUBMIT_APPLIANCES_EXCHANGE_DATA_SUCCESS =
  "SUBMIT_APPLIANCES_EXCHANGE_DATA_SUCCESS";
export const SUBMIT_APPLIANCES_EXCHANGE_DATA_FAILURE =
  "SUBMIT_APPLIANCES_EXCHANGE_DATA_FAILURE";

const ERROR_MESSAGE_FOR_CREATE_JUS_PAY_CALL = "Something went wrong";
const env = process.env;

export function displayCouponRequest() {
  return {
    type: DISPLAY_COUPON_REQUEST,
    status: REQUESTING
  };
}
export function displayCouponSuccess(couponDetails) {
  return {
    type: DISPLAY_COUPON_SUCCESS,
    status: SUCCESS,
    couponDetails
  };
}

export function displayCouponFailure(error) {
  return {
    type: DISPLAY_COUPON_FAILURE,
    status: ERROR,
    error
  };
}

export function displayCouponsForLoggedInUser(userId, accessToken, cartId) {
  return async (dispatch, getState, { api }) => {
    dispatch(displayCouponRequest());

    try {
      const result = await api.get(
        `${USER_CART_PATH}/${userId}/displayCouponOffers?access_token=${accessToken}&cartGuid=${cartId}&updatedVisibility=true&channel=web`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }

      dispatch(displayCouponSuccess(resultJson));
    } catch (e) {
      dispatch(displayCouponFailure(e.message));
    }
  };
}

export function displayCouponsForAnonymous(userId, accessToken, guid) {
  return async (dispatch, getState, { api }) => {
    dispatch(displayCouponRequest());

    try {
      const result = await api.get(
        `${USER_CART_PATH}/${userId}/displayOpenCouponOffers?&cartGuid=${guid}&access_token=${accessToken}&updatedVisibility=true&channel=web`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      dispatch(displayCouponSuccess(resultJson));
    } catch (e) {
      dispatch(displayCouponFailure(e.message));
    }
  };
}

export function cartDetailsRequest() {
  return {
    type: CART_DETAILS_REQUEST,
    status: REQUESTING
  };
}
export function cartDetailsSuccess(cartDetails) {
  return {
    type: CART_DETAILS_SUCCESS,
    status: SUCCESS,
    cartDetails
  };
}

export function cartDetailsFailure(error) {
  return {
    type: CART_DETAILS_FAILURE,
    status: ERROR,
    error
  };
}

export function getCartDetails(
  userId,
  accessToken,
  cartId,
  pinCode,
  isSetDataLayer
) {
  return async (dispatch, getState, { api }) => {
    dispatch(cartDetailsRequest());
    try {
      const result = await api.get(
        `${USER_CART_PATH}/${userId}/carts/${cartId}/cartDetails?access_token=${accessToken}&isPwa=true&isUpdatedPwa=true&platformNumber=${PLAT_FORM_NUMBER}&pincode=${pinCode}&channel=${CHANNEL}&isMDE=true&isDuplicateImei=true`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      if (isSetDataLayer) {
        setDataLayer(
          ADOBE_CART_TYPE,
          resultJson,
          getState().icid.value,
          getState().icid.icidType
        );
      }

      //set the local storage
      //set local storage
      localStorage.setItem(CART_BAG_DETAILS, []);
      let cartProducts = [];
      resultJson &&
        each(resultJson.products, product => {
          if (product.isGiveAway === NO) {
            cartProducts.push(product.USSID);
          }
        });
      localStorage.setItem(CART_BAG_DETAILS, JSON.stringify(cartProducts));
      dispatch(setBagCount(cartProducts.length));
      return dispatch(cartDetailsSuccess(resultJson));
    } catch (e) {
      dispatch(displayToast(e.message));
      return dispatch(cartDetailsFailure(e.message));
    }
  };
}

export function cartDetailsCNCRequest() {
  return {
    type: CART_DETAILS_CNC_REQUEST,
    status: REQUESTING
  };
}
export function cartDetailsCNCSuccess(cartDetailsCnc) {
  return {
    type: CART_DETAILS_CNC_SUCCESS,
    status: SUCCESS,
    cartDetailsCnc
  };
}

export function cartDetailsCNCFailure(error) {
  return {
    type: CART_DETAILS_CNC_FAILURE,
    status: ERROR,
    error
  };
}

export function getCartDetailsCNC(
  userId,
  accessToken,
  cartId,
  pinCode,
  isSoftReservation,
  isSetDataLayer: false
) {
  return async (dispatch, getState, { api }) => {
    dispatch(cartDetailsCNCRequest());
    try {
      const result = await api.get(
        `${USER_CART_PATH}/${userId}/carts/${cartId}/cartDetailsCNC?access_token=${accessToken}&isPwa=true&isUpdatedPwa=true&platformNumber=${PLAT_FORM_NUMBER}&pincode=${pinCode}&channel=${CHANNEL}&isMDE=true`
      );
      let resultJson = await result.json();
      // show toast message in case product serviceable but exchange not serviceable
      if (resultJson && resultJson.products) {
        let productExchangeNonServiceable = resultJson.products.find(value => {
          if (
            value.exchangeDetails &&
            !value.pinCodeResponse.isPickupAvailableForExchange
          ) {
            return value.pinCodeResponse.errorMessagePincode;
          }
        });
        if (
          productExchangeNonServiceable &&
          productExchangeNonServiceable.pinCodeResponse
        ) {
          dispatch(
            displayToast(
              productExchangeNonServiceable.pinCodeResponse.errorMessagePincode
            )
          );
        }
      }

      if (resultJson.status === FAILURE) {
        throw new Error(`${resultJson.message}`);
      }

      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }

      // setting data layer only for first time
      if (isSetDataLayer) {
        setDataLayer(
          ADOBE_CHECKOUT_TYPE,
          resultJson,
          getState().icid.value,
          getState().icid.icidType
        );
      }
      dispatch(cartDetailsCNCSuccess(resultJson));
    } catch (e) {
      dispatch(cartDetailsCNCFailure(e.message));
    }
  };
}

export function applyUserCouponRequest() {
  return {
    type: APPLY_USER_COUPON_REQUEST,
    status: REQUESTING
  };
}
export function applyUserCouponSuccess(couponResult, couponCode) {
  return {
    type: APPLY_USER_COUPON_SUCCESS,
    status: SUCCESS,
    couponResult,
    couponCode
  };
}

export function applyUserCouponFailure(error) {
  return {
    type: APPLY_USER_COUPON_FAILURE,
    status: ERROR,
    error
  };
}

export function applyUserCouponForAnonymous(couponCode) {
  const cartDetailsAnonymous = Cookie.getCookie(CART_DETAILS_FOR_ANONYMOUS);
  const globalCookie = Cookie.getCookie(GLOBAL_ACCESS_TOKEN);
  let cartId = JSON.parse(cartDetailsAnonymous).guid;
  return async (dispatch, getState, { api }) => {
    dispatch(applyUserCouponRequest());
    let couponObject = new FormData();
    couponObject.append("access_token", JSON.parse(globalCookie).access_token);
    couponObject.append("couponCode", couponCode);
    couponObject.append("channel", CHANNEL);

    try {
      const result = await api.postFormData(
        `${USER_CART_PATH}/anonymous/carts/${cartId}/applyCouponsAnonymous?isUpdatedPwa=true&channel=${CHANNEL}`,
        couponObject
      );

      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        setDataLayerForCartDirectCalls(
          ADOBE_CALLS_FOR_APPLY_COUPON_FAIL,
          couponCode
        );
        throw new Error(resultJsonStatus.message);
      }
      setDataLayerForCartDirectCalls(
        ADOBE_CALLS_FOR_APPLY_COUPON_SUCCESS,
        couponCode
      );
      return dispatch(applyUserCouponSuccess(resultJson, couponCode));
    } catch (e) {
      return dispatch(applyUserCouponFailure(e.message));
    }
  };
}

export function applyUserCouponForLoggedInUsers(couponCode) {
  return async (dispatch, getState, { api }) => {
    let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    let cartDetails = Cookie.getCookie(CART_DETAILS_FOR_LOGGED_IN_USER);
    let cartGuId = JSON.parse(cartDetails).guid;

    dispatch(applyUserCouponRequest());
    let couponObject = new FormData();

    couponObject.append("couponCode", couponCode);
    couponObject.append("cartGuid", cartGuId);
    couponObject.append("channel", CHANNEL);
    try {
      const result = await api.postFormData(
        `${USER_CART_PATH}/${JSON.parse(userDetails).userName}/carts/${
          JSON.parse(cartDetails).code
        }/applyVouchers?access_token=${
          JSON.parse(customerCookie).access_token
        }&isPwa=true&isUpdatedPwa=true&platformNumber=${PLAT_FORM_NUMBER}&channel=${CHANNEL}`,
        couponObject
      );

      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        setDataLayerForCartDirectCalls(
          ADOBE_CALLS_FOR_APPLY_COUPON_FAIL,
          couponCode
        );
        throw new Error(resultJsonStatus.message);
      }
      setDataLayerForCartDirectCalls(
        ADOBE_CALLS_FOR_APPLY_COUPON_SUCCESS,
        couponCode
      );
      return dispatch(applyUserCouponSuccess(resultJson, couponCode));
    } catch (e) {
      return dispatch(applyUserCouponFailure(e.message));
    }
  };
}

export function releaseUserCouponRequest() {
  return {
    type: RELEASE_USER_COUPON_REQUEST,
    status: REQUESTING
  };
}
export function releaseUserCouponSuccess(couponResult) {
  return {
    type: RELEASE_USER_COUPON_SUCCESS,
    status: SUCCESS,
    couponResult
  };
}

export function releaseUserCouponFailure(error) {
  return {
    type: RELEASE_USER_COUPON_FAILURE,
    status: ERROR,
    error
  };
}

export function releaseCouponForAnonymous(oldCouponCode, newCouponCode) {
  const cartDetailsAnonymous = Cookie.getCookie(CART_DETAILS_FOR_ANONYMOUS);
  const globalCookie = Cookie.getCookie(GLOBAL_ACCESS_TOKEN);
  let cartId = JSON.parse(cartDetailsAnonymous).guid;

  return async (dispatch, getState, { api }) => {
    dispatch(releaseUserCouponRequest());
    let couponObject = new FormData();
    couponObject.append("access_token", JSON.parse(globalCookie).access_token);
    couponObject.append("couponCode", oldCouponCode);
    couponObject.append("channel", CHANNEL);
    try {
      const result = await api.postFormData(
        `${USER_CART_PATH}/anonymous/carts/${cartId}/releaseCouponsAnonymous?isUpdatedPwa=true`,
        couponObject
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }

      if (newCouponCode) {
        dispatch(releaseUserCouponSuccess(resultJson));
        return dispatch(applyUserCouponForAnonymous(newCouponCode));
      }
      return dispatch(releaseUserCouponSuccess(resultJson));
    } catch (e) {
      return dispatch(releaseUserCouponFailure(e.message));
    }
  };
}

export function releaseUserCoupon(oldCouponCode, newCouponCode) {
  let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
  let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
  let cartDetails = Cookie.getCookie(CART_DETAILS_FOR_LOGGED_IN_USER);
  let cartGuId = JSON.parse(cartDetails).guid;
  let cartId = JSON.parse(cartDetails).code;
  let cliqCashapplied = localStorage.getItem(CLIQ_CASH_APPLIED_LOCAL_STORAGE);
  return async (dispatch, getState, { api }) => {
    dispatch(releaseUserCouponRequest());
    try {
      const result = await api.post(
        `${USER_CART_PATH}/${
          JSON.parse(userDetails).userName
        }/carts/${cartId}/releaseCoupons?access_token=${
          JSON.parse(customerCookie).access_token
        }&isPwa=true&isUpdatedPwa=true&platformNumber=${PLAT_FORM_NUMBER}&couponCode=${oldCouponCode}&cartGuid=${cartGuId}&channel=${CHANNEL}`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }

      if (cliqCashapplied) {
        await dispatch(removeCliqCash());
        await dispatch(applyCliqCash());
      }

      if (newCouponCode) {
        dispatch(releaseUserCouponSuccess(resultJson));
        return dispatch(applyUserCouponForLoggedInUsers(newCouponCode));
      }
      return dispatch(releaseUserCouponSuccess(resultJson));
    } catch (e) {
      return dispatch(releaseUserCouponFailure(e.message));
    }
  };
}

export function userAddressRequest(error) {
  return {
    type: GET_USER_ADDRESS_REQUEST,
    status: REQUESTING
  };
}

export function userAddressSuccess(userAddress) {
  return {
    type: GET_USER_ADDRESS_SUCCESS,
    status: SUCCESS,
    userAddress
  };
}

export function userAddressFailure(error) {
  return {
    type: GET_USER_ADDRESS_FAILURE,
    status: ERROR,
    error
  };
}

export function getUserAddress(setDataLayerForMyAccount: false) {
  let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
  let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
  return async (dispatch, getState, { api }) => {
    dispatch(userAddressRequest());
    try {
      const result = await api.get(
        `${USER_CART_PATH}/${
          JSON.parse(userDetails).userName
        }/addresses?channel=${CHANNEL}&emailId=${
          JSON.parse(userDetails).userName
        }&access_token=${JSON.parse(customerCookie).access_token}&isMDE=true`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      if (setDataLayerForMyAccount) {
        setDataLayer(ADOBE_MY_ACCOUNT_ADDRESS_BOOK);
      }
      dispatch(userAddressSuccess(resultJson));
    } catch (e) {
      dispatch(userAddressFailure(e.message));
    }
  };
}

export function addUserAddressRequest(error) {
  return {
    type: ADD_USER_ADDRESS_REQUEST,
    status: REQUESTING
  };
}
export function addUserAddressSuccess() {
  return {
    type: ADD_USER_ADDRESS_SUCCESS,
    status: SUCCESS
  };
}

export function addNewAddressForUserSuccess(userAddress) {
  return {
    type: ADD_NEW_ADDRESS_FOR_USER_ADDRESS_SUCCESS,
    status: SUCCESS
  };
}

export function addUserAddressFailure(error) {
  return {
    type: ADD_USER_ADDRESS_FAILURE,
    status: ERROR,
    error
  };
}

export function addUserAddress(userAddress, fromAccount) {
  let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
  let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);

  return async (dispatch, getState, { api }) => {
    dispatch(addUserAddressRequest());
    let addressObject = new FormData();
    addressObject.append("countryIso", userAddress.countryIso);
    addressObject.append("addressType", userAddress.addressType);
    if (userAddress.phone) {
      addressObject.append("phone", userAddress.phone);
    }
    if (userAddress.firstName) {
      addressObject.append("firstName", userAddress.firstName.trim());
    }
    if (userAddress.lastName) {
      addressObject.append("lastName", userAddress.lastName.trim());
    }
    addressObject.append("postalCode", userAddress.postalCode);
    if (userAddress.line1) {
      addressObject.append("line1", userAddress.line1.trim());
    } else {
      addressObject.append("line1", "");
    }
    if (userAddress.line2) {
      addressObject.append("line2", userAddress.line2);
    } else {
      addressObject.append("line2", "");
    }
    if (userAddress.line3) {
      addressObject.append("line3", userAddress.line3);
    } else {
      addressObject.append("line3", "");
    }
    addressObject.append("state", userAddress.state.trim());
    addressObject.append("town", userAddress.town.trim());
    addressObject.append("defaultFlag", userAddress.defaultFlag);
    if (userAddress.landmark) {
      addressObject.append("landmark", userAddress.landmark);
    } else {
      addressObject.append("landmark", "");
    }
    addressObject.append("emailId", JSON.parse(userDetails).userName);
    try {
      const result = await api.postFormData(
        `${USER_CART_PATH}/${
          JSON.parse(userDetails).userName
        }/addAddress?access_token=${
          JSON.parse(customerCookie).access_token
        }&isPwa=true&platformNumber=${PLAT_FORM_NUMBER}`,
        addressObject
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      if (resultJson.status && resultJson.status.toLowerCase() === SUCCESS) {
        dispatch(displayToast("New address has been added"));
      }
      return dispatch(addUserAddressSuccess());
    } catch (e) {
      return dispatch(addUserAddressFailure(e.message));
    }
  };
}
export function selectDeliveryModeRequest() {
  return {
    type: SELECT_DELIVERY_MODES_REQUEST,
    status: REQUESTING
  };
}
export function selectDeliveryModeSuccess(deliveryModes) {
  return {
    type: SELECT_DELIVERY_MODES_SUCCESS,
    status: SUCCESS,
    deliveryModes
  };
}

export function selectDeliveryModeFailure(error) {
  return {
    type: SELECT_DELIVERY_MODES_FAILURE,
    status: ERROR,
    error
  };
}
export function selectDeliveryMode(deliveryUssId, pinCode) {
  let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
  let cartDetails = Cookie.getCookie(CART_DETAILS_FOR_LOGGED_IN_USER);
  let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);

  return async (dispatch, getState, { api }) => {
    dispatch(selectDeliveryModeRequest());
    try {
      const result = await api.post(
        `${USER_CART_PATH}/${JSON.parse(userDetails).userName}/carts/${
          JSON.parse(cartDetails).code
        }/selectDeliveryMode?access_token=${
          JSON.parse(customerCookie).access_token
        }&deliverymodeussId=${JSON.stringify(deliveryUssId)}&removeExchange=0`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }

      dispatch(softReservation());
      dispatch(selectDeliveryModeSuccess(resultJson));
      // setting data layer after selecting delivery mode success
      setDataLayerForCheckoutDirectCalls(
        ADOBE_CALL_FOR_PROCCEED_FROM_DELIVERY_MODE
      );
    } catch (e) {
      dispatch(selectDeliveryModeFailure(e.message));
    }
  };
}

export function addAddressToCartRequest(error) {
  return {
    type: ADD_ADDRESS_TO_CART_REQUEST,
    status: REQUESTING
  };
}

export function addAddressToCartSuccess() {
  return {
    type: ADD_ADDRESS_TO_CART_SUCCESS,
    status: SUCCESS
  };
}

export function addAddressToCartFailure(error) {
  return {
    type: ADD_ADDRESS_TO_CART_FAILURE,
    status: ERROR,
    error
  };
}

export function addAddressToCart(addressId, pinCode, isComingFromCliqAndPiq) {
  let newPinCode;
  if (isComingFromCliqAndPiq) {
    newPinCode = localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE);
  } else {
    newPinCode = pinCode;
  }
  let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
  let cartDetails = Cookie.getCookie(CART_DETAILS_FOR_LOGGED_IN_USER);
  let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
  return async (dispatch, getState, { api }) => {
    dispatch(addAddressToCartRequest());
    try {
      let userId = JSON.parse(userDetails).userName;
      let access_token = JSON.parse(customerCookie).access_token;
      let cartId = JSON.parse(cartDetails).code;
      const result = await api.post(
        `${USER_CART_PATH}/${userId}/addAddressToOrder?channel=${CHANNEL}&access_token=${access_token}&addressId=${addressId}&cartId=${cartId}&removeExchangeFromCart=0&isMDE=true`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      let selectedStore = JSON.parse(localStorage.getItem(SELECTED_STORE));
      let storeDetails =
        selectedStore &&
        selectedStore.find(store => {
          return store.pincode === newPinCode;
        });
      if (selectedStore && !storeDetails) {
        localStorage.removeItem(SELECTED_STORE);
      }
      dispatch(checkApplianceExchangeData());
      dispatch(
        getCartDetailsCNC(userId, access_token, cartId, newPinCode, false)
      );
      setDataLayerForCheckoutDirectCalls(ADOBE_ADD_ADDRESS_TO_ORDER);
      if (isComingFromCliqAndPiq) {
        dispatch(softReservation());
      }
      return dispatch(addAddressToCartSuccess());
    } catch (e) {
      return dispatch(userAddressFailure(e.message));
    }
  };
}

export function netBankingDetailsRequest() {
  return {
    type: NET_BANKING_DETAILS_REQUEST,
    status: REQUESTING
  };
}
export function netBankingDetailsSuccess(netBankDetails) {
  return {
    type: NET_BANKING_DETAILS_SUCCESS,
    status: SUCCESS,
    netBankDetails
  };
}

export function netBankingDetailsFailure(error) {
  return {
    type: NET_BANKING_DETAILS_FAILURE,
    status: ERROR,
    error
  };
}

export function getNetBankDetails() {
  let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
  let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
  return async (dispatch, getState, { api }) => {
    dispatch(netBankingDetailsRequest());
    try {
      const result = await api.get(
        `${USER_CART_PATH}/${
          JSON.parse(userDetails).userName
        }/netbankingDetails?channel=${CHANNEL}&access_token=${
          JSON.parse(customerCookie).access_token
        }`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }

      dispatch(netBankingDetailsSuccess(resultJson));
    } catch (e) {
      dispatch(netBankingDetailsFailure(e.message));
    }
  };
}

export function emiBankingDetailsRequest() {
  return {
    type: EMI_BANKING_DETAILS_REQUEST,
    status: REQUESTING
  };
}
export function emiBankingDetailsSuccess(emiBankDetails) {
  return {
    type: EMI_BANKING_DETAILS_SUCCESS,
    status: SUCCESS,
    emiBankDetails
  };
}

export function emiBankingDetailsFailure(error) {
  return {
    type: EMI_BANKING_DETAILS_FAILURE,
    status: ERROR,
    error
  };
}

export function getEmiBankDetails(price) {
  let globalCookie = Cookie.getCookie(GLOBAL_ACCESS_TOKEN);
  let cartDetails = Cookie.getCookie(CART_DETAILS_FOR_LOGGED_IN_USER);
  let retryCartID = localStorage.getItem(RETRY_PAYMENT_CART_ID);
  let cartId;
  if (retryCartID) {
    cartId = retryCartID.replace(/"/g, "");
  } else {
    cartId = JSON.parse(cartDetails).guid;
  }
  return async (dispatch, getState, { api }) => {
    dispatch(emiBankingDetailsRequest());
    try {
      const result = await api.get(
        `${CART_PATH}/getBankDetailsforEMI?platformNumber=${PLAT_FORM_NUMBER}&productValue=${price}&access_token=${
          JSON.parse(globalCookie).access_token
        }&guid=${cartId}&isFromNewVersion=true&isPwa=truee&emiConvChargeFlag=true`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }

      dispatch(emiBankingDetailsSuccess(resultJson));
    } catch (e) {
      dispatch(emiBankingDetailsFailure(e.message));
    }
  };
}

export function generateCartidForLoggedInUserRequest() {
  return {
    type: GENERATE_CART_ID_FOR_LOGGED_IN_USER_REQUEST,
    status: REQUESTING
  };
}

export function generateCartIdForLoggedInUserFailure(error) {
  return {
    type: GENERATE_CART_ID_FOR_LOGGED_IN_USER_FAILURE,
    status: FAILURE,
    error
  };
}
export function generateCartIdForLoggedInUserSuccess(cartDetails) {
  return {
    type: GENERATE_CART_ID_FOR_LOGGED_IN_USER_SUCCESS,
    status: SUCCESS,
    cartDetails
  };
}

export function generateCartIdForLoggedInUser() {
  let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
  let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
  return async (dispatch, getState, { api }) => {
    dispatch(generateCartidForLoggedInUserRequest());

    try {
      const result = await api.post(
        `${USER_CART_PATH}/${
          JSON.parse(userDetails).userName
        }/carts?access_token=${
          JSON.parse(customerCookie).access_token
        }&isPwa=true&channel=${CHANNEL}`
      );
      const resultJson = await result.json();

      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }

      return dispatch(generateCartIdForLoggedInUserSuccess(resultJson));
    } catch (e) {
      return dispatch(generateCartIdForLoggedInUserFailure(e.message));
    }
  };
}

export function generateCartIdForAnonymousUserSuccess(cartDetails) {
  return {
    type: GENERATE_CART_ID_FOR_ANONYMOUS_USER_SUCCESS,
    status: SUCCESS,
    cartDetails
  };
}

export function generateCartdIdForAnonymousUserRequest() {
  return {
    type: GENERATE_CART_ID_FOR_ANONYMOUS_USER_REQUEST,
    status: REQUESTING
  };
}

export function generateCartIdForAnonymousUserFailure(error) {
  return {
    type: GENERATE_CART_ID_FOR_ANONYMOUS_USER_FAILURE,
    error,
    status: FAILURE
  };
}

export function generateCartIdForAnonymous() {
  let globalCookie = Cookie.getCookie(GLOBAL_ACCESS_TOKEN);
  return async (dispatch, getState, { api }) => {
    dispatch(generateCartdIdForAnonymousUserRequest());

    try {
      const result = await api.post(
        `${USER_CART_PATH}/anonymous/carts?access_token=${
          JSON.parse(globalCookie).access_token
        }&isPwa=true&channel=${CHANNEL}`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      return dispatch(generateCartIdForAnonymousUserSuccess(resultJson));
    } catch (e) {
      return dispatch(generateCartIdForAnonymousUserFailure(e.message));
    }
  };
}

export function orderSummaryRequest() {
  return {
    type: ORDER_SUMMARY_REQUEST,
    status: REQUESTING
  };
}
export function orderSumarySuccess(orderSummary) {
  return {
    type: ORDER_SUMMARY_SUCCESS,
    status: SUCCESS,
    orderSummary
  };
}

export function orderSummaryFailure(error) {
  return {
    type: ORDER_SUMMARY_FAILURE,
    status: ERROR,
    error
  };
}

export function getCartIdRequest() {
  return {
    type: GET_CART_ID_REQUEST,
    status: REQUESTING
  };
}

export function getCartIdSuccess(cartDetails) {
  return {
    type: GET_CART_ID_SUCCESS,
    status: SUCCESS,
    cartDetails
  };
}

export function getCartIdFailure(error) {
  return {
    type: GET_CART_ID_FAILURE,

    status: ERROR,
    error
  };
}

export function getOrderSummary(pincode) {
  let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
  let cartDetails = Cookie.getCookie(CART_DETAILS_FOR_LOGGED_IN_USER);
  let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
  let cartId = JSON.parse(cartDetails).code;
  return async (dispatch, getState, { api }) => {
    dispatch(orderSummaryRequest());
    try {
      const result = await api.get(
        `${USER_CART_PATH}/${
          JSON.parse(userDetails).userName
        }/carts/${cartId}/displayOrderSummary?access_token=${
          JSON.parse(customerCookie).access_token
        }&pincode=${pincode}&isPwa=true&isUpdatedPwa=true&platformNumber=${PLAT_FORM_NUMBER}`
      );
      const resultJson = await result.json();

      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      dispatch(getPaymentModes(resultJson.cartGuid));
      dispatch(orderSumarySuccess(resultJson));
    } catch (e) {
      dispatch(orderSummaryFailure(e.message));
    }
  };
}
export function getCartId() {
  let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
  let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);

  return async (dispatch, getState, { api }) => {
    dispatch(getCartIdRequest());

    try {
      const result = await api.get(
        `${USER_CART_PATH}/${
          JSON.parse(userDetails).userName
        }/carts?access_token=${
          JSON.parse(customerCookie).access_token
        }&isPwa=true&channel=${CHANNEL}`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      return dispatch(getCartIdSuccess(resultJson));
    } catch (e) {
      return dispatch(getCartIdFailure(e.message));
    }
  };
}

export function mergeCardIdRequest() {
  return {
    type: MERGE_CART_ID_REQUEST,
    status: REQUESTING
  };
}
export function mergeCartIdSuccess(cartDetails) {
  return {
    type: MERGE_CART_ID_SUCCESS,
    status: SUCCESS,
    cartDetails
  };
}

export function mergeCartIdFailure(error) {
  return {
    type: MERGE_CART_ID_FAILURE,
    status: ERROR,
    error
  };
}

export function mergeCartId(cartGuId) {
  let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
  let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
  let cartDetailsAnonymous = Cookie.getCookie(CART_DETAILS_FOR_ANONYMOUS);
  return async (dispatch, getState, { api }) => {
    dispatch(mergeCardIdRequest());
    try {
      const result = await api.post(
        `${USER_CART_PATH}/${
          JSON.parse(userDetails).userName
        }/carts?access_token=${
          JSON.parse(customerCookie).access_token
        }&isPwa=true&platformNumber=${PLAT_FORM_NUMBER}&userId=${
          JSON.parse(userDetails).userName
        }&oldCartId=${JSON.parse(cartDetailsAnonymous).guid}${
          cartGuId ? "&toMergeCartGuid=" + cartGuId : ""
        }&channel=${CHANNEL}&isMDE=true`
      );
      const resultJson = await result.json();
      const currentBagObject = localStorage.getItem(CART_BAG_DETAILS);
      const currentBagCount = currentBagObject
        ? JSON.parse(currentBagObject).length
        : 0;
      const updatedBagCount = parseInt(resultJson.count, 10);
      if (getState().auth.redirectToAfterAuthUrl === PRODUCT_CART_ROUTER) {
        const isAddToWishlist = localStorage.getItem(
          PRODUCT_DETAIL_FOR_ADD_TO_WISHLIST
        );
        if (!isAddToWishlist && updatedBagCount === currentBagCount) {
          dispatch(setUrlToRedirectToAfterAuth(CHECKOUT_ROUTER));
        } else {
          dispatch(displayToast(TOAST_MESSAGE_AFTER_MERGE_CART));
        }
      }
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      //show toast related to merge of exchange products as per conditions in MDE-279
      if (resultJson.exchangeMessage) {
        dispatch(displayToast(resultJson.exchangeMessage));
      }
      return dispatch(mergeCartIdSuccess(resultJson));
    } catch (e) {
      return dispatch(mergeCartIdFailure(e.message));
    }
  };
}

export function checkPinCodeServiceAvailabilityRequest() {
  return {
    type: CHECK_PIN_CODE_SERVICE_AVAILABILITY_REQUEST,
    status: REQUESTING
  };
}
export function checkPinCodeServiceAvailabilitySuccess(cartDetailsCnc) {
  return {
    type: CHECK_PIN_CODE_SERVICE_AVAILABILITY_SUCCESS,
    status: SUCCESS,
    cartDetailsCnc
  };
}

export function checkPinCodeServiceAvailabilityFailure(error) {
  return {
    type: CHECK_PIN_CODE_SERVICE_AVAILABILITY_FAILURE,
    status: ERROR,
    error
  };
}
export function checkPinCodeServiceAvailability(
  userName,
  accessToken,
  pinCode,
  productCode
) {
  localStorage.setItem(DEFAULT_PIN_CODE_LOCAL_STORAGE, pinCode);

  return async (dispatch, getState, { api }) => {
    dispatch(checkPinCodeServiceAvailabilityRequest());
    try {
      const result = await api.post(
        `${USER_CART_PATH}/${userName}/checkPincode?access_token=${accessToken}&productCode=${productCode}&pin=${pinCode}`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      dispatch(checkPinCodeServiceAvailabilitySuccess(resultJson));
    } catch (e) {
      dispatch(checkPinCodeServiceAvailabilityFailure(e.message));
    }
  };
}

// Actions to get All Stores CNC
export function getAllStoresCNCRequest() {
  return {
    type: GET_ALL_STORES_CNC_REQUEST,
    status: REQUESTING
  };
}
export function getAllStoresCNCSuccess(storeDetails) {
  return {
    type: GET_ALL_STORES_CNC_SUCCESS,
    status: SUCCESS,
    storeDetails
  };
}

export function getAllStoresCNCFailure(error) {
  return {
    type: GET_ALL_STORES_CNC_FAILURE,
    status: ERROR,
    error
  };
}

// Action Creator for getting all stores CNC
export function getAllStoresCNC(pinCode) {
  let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
  let globalCookie = Cookie.getCookie(GLOBAL_ACCESS_TOKEN);
  let accessToken;
  if (customerCookie) {
    accessToken = JSON.parse(customerCookie).access_token;
  } else {
    accessToken = JSON.parse(globalCookie).access_token;
  }
  return async (dispatch, getState, { api }) => {
    dispatch(getAllStoresCNCRequest());
    try {
      const result = await api.get(
        `${ALL_STORES_PATH}/${pinCode}?access_token=${accessToken}&isMDE=true`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      return dispatch(getAllStoresCNCSuccess(resultJson.stores));
    } catch (e) {
      return dispatch(getAllStoresCNCFailure(e.message));
    }
  };
}

// Actions to Add Store CNC
export function addStoreCNCRequest() {
  return {
    type: ADD_STORE_CNC_REQUEST,
    status: REQUESTING
  };
}

export function addStoreCNCSuccess(storeAdded) {
  return {
    type: ADD_STORE_CNC_SUCCESS,
    status: SUCCESS,
    storeAdded
  };
}

export function addStoreCNCFailure(error) {
  return {
    type: ADD_STORE_CNC_FAILURE,
    status: ERROR,
    error
  };
}

// Action Creator to Add Store CNC
export function addStoreCNC(ussId, slaveId) {
  let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
  let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
  let cartDetails = Cookie.getCookie(CART_DETAILS_FOR_LOGGED_IN_USER);
  let cartId = JSON.parse(cartDetails).code;
  return async (dispatch, getState, { api }) => {
    dispatch(addStoreCNCRequest());
    try {
      const result = await api.post(
        `${USER_CART_PATH}/${
          JSON.parse(userDetails).userName
        }/carts/${cartId}/addStore?USSID=${ussId}&access_token=${
          JSON.parse(customerCookie).access_token
        }&slaveId=${slaveId}&isMDE=true`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      return dispatch(addStoreCNCSuccess(resultJson));
    } catch (e) {
      return dispatch(addStoreCNCFailure(e.message));
    }
  };
}

// Actions to Add Pick up Person
export function addPickUpPersonRequest() {
  return {
    type: ADD_PICKUP_PERSON_REQUEST,
    status: REQUESTING
  };
}

export function addPickUpPersonSuccess(cartDetailsCNC) {
  return {
    type: ADD_PICKUP_PERSON_SUCCESS,
    status: SUCCESS,
    cartDetailsCNC
  };
}

export function addPickUpPersonFailure(error) {
  return {
    type: ADD_PICKUP_PERSON_FAILURE,
    status: ERROR,
    error
  };
}

// Action Creator to Add Pick Up Person
export function addPickupPersonCNC(personMobile, personName) {
  let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
  let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
  let cartDetails = Cookie.getCookie(CART_DETAILS_FOR_LOGGED_IN_USER);
  let cartId = JSON.parse(cartDetails).code;
  return async (dispatch, getState, { api }) => {
    dispatch(addPickUpPersonRequest());
    try {
      const result = await api.post(
        `${USER_CART_PATH}/${
          JSON.parse(userDetails).userName
        }/carts/${cartId}/addPickupPerson?access_token=${
          JSON.parse(customerCookie).access_token
        }&isPwa=true&platformNumber=${PLAT_FORM_NUMBER}&personMobile=${personMobile}&personName=${personName}&isMDE=true`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }

      dispatch(
        getCartDetailsCNC(
          JSON.parse(userDetails).userName,
          JSON.parse(customerCookie).access_token,
          cartId,
          localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE),
          false
        )
      );
      //dispatch(getUserDetails());
      setDataLayerForCheckoutDirectCalls(ADOBE_CALL_FOR_CLIQ_AND_PICK_APPLIED);
      return dispatch(addPickUpPersonSuccess(resultJson));
    } catch (e) {
      return dispatch(addPickUpPersonFailure(e.message));
    }
  };
}

// Actions to Soft Reservation
export function softReservationRequest() {
  return {
    type: SOFT_RESERVATION_REQUEST,
    status: REQUESTING
  };
}

export function softReservationSuccess(softReserve) {
  return {
    type: SOFT_RESERVATION_SUCCESS,
    status: SUCCESS,
    softReserve
  };
}

export function softReservationFailure(error) {
  return {
    type: SOFT_RESERVATION_FAILURE,
    status: ERROR,
    error
  };
}

// Action Creator for Soft Reservation
export function softReservation() {
  let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
  let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
  let cartDetails = Cookie.getCookie(CART_DETAILS_FOR_LOGGED_IN_USER);
  let cartId = JSON.parse(cartDetails).code;
  let pinCode = localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE);
  return async (dispatch, getState, { api }) => {
    //get the body parameters
    let productItems = await getValidDeliveryModeDetails(
      getState().cart &&
        getState().cart.cartDetailsCNC &&
        getState().cart.cartDetailsCNC.products
    );
    if (productItems) {
      localStorage.setItem(CART_ITEM_COOKIE, JSON.stringify(productItems));
    }
    try {
      const result = await api.post(
        `${USER_CART_PATH}/${
          JSON.parse(userDetails).userName
        }/carts/${cartId}/softReservation?access_token=${
          JSON.parse(customerCookie).access_token
        }&isPwa=true&platformNumber=${PLAT_FORM_NUMBER}&pincode=${pinCode}&type=cart`,
        productItems
      );
      const resultJson = await result.json();

      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      dispatch(eddInCommerce(resultJson));
      dispatch(getOrderSummary(pinCode));
      dispatch(softReservationSuccess(resultJson.reservationItem));
    } catch (e) {
      dispatch(softReservationFailure(e.message));
    }
  };
}

// Actions to Soft Reservation
export function paymentModesRequest() {
  return {
    type: GET_PAYMENT_MODES_REQUEST,
    status: REQUESTING
  };
}

export function paymentModesSuccess(paymentModes) {
  return {
    type: GET_PAYMENT_MODES_SUCCESS,
    status: SUCCESS,
    paymentModes
  };
}

export function paymentModesFailure(error) {
  return {
    type: GET_PAYMENT_MODES_FAILURE,
    status: ERROR,
    error
  };
}

// Action Creator for Soft Reservation
export function getPaymentModes(guId) {
  let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
  let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
  return async (dispatch, getState, { api }) => {
    dispatch(paymentModesRequest());
    try {
      const result = await api.post(
        `${USER_CART_PATH}/${
          JSON.parse(userDetails).userName
        }/payments/getPaymentModes?access_token=${
          JSON.parse(customerCookie).access_token
        }&cartGuid=${guId}&isPwa=true&platformNumber=${PLAT_FORM_NUMBER}&isUpdatedPwa=true`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      // here  we are setting data layer for when user lands on the payment modes
      // page

      dispatch(paymentModesSuccess(resultJson));
      dispatch(createPaymentOrder(guId));
      setDataLayerForCheckoutDirectCalls(
        ADOBE_CALL_FOR_LANDING_ON_PAYMENT_MODE
      );
    } catch (e) {
      dispatch(paymentModesFailure(e.message));
    }
  };
}

/**
 * @comment Code for checking the middle ware of the UPI
 */

export function upiPaymentCombinedLogoMidddleLayerRequest() {
  return {
    type: UPI_MIDDLE_LAYER_COMBINED_LOGO_REQUEST,
    status: REQUESTING
  };
}

export function upiPaymentCombinedLogoMidddleLayerSuccess(
  upiPaymentCombinedLogoMidddleLayerDetails
) {
  return {
    type: UPI_MIDDLE_LAYER_COMBINED_LOGO_SUCCESS,
    status: SUCCESS,
    upiPaymentCombinedLogoMidddleLayerDetails
  };
}

export function upiPaymentCombinedLogoMidddleLayerFailure(error) {
  return {
    type: UPI_MIDDLE_LAYER_COMBINED_LOGO_FAILURE,
    status: ERROR,
    error
  };
}

export function upiPaymentCombinedLogoMidddleLayer(orderId) {
  return async (dispatch, getState, { api }) => {
    dispatch(upiPaymentCombinedLogoMidddleLayerRequest());
    try {
      const result = await api.customGetMiddlewareUrl(
        `/otatacliq/getApplicationProperties.json?propertyNames=MP_UPI_COMBINED_LOGO_URL`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }

      return dispatch(upiPaymentCombinedLogoMidddleLayerSuccess(resultJson));
    } catch (e) {
      dispatch(upiPaymentCombinedLogoMidddleLayerFailure(e.message));
    }
  };
}
export function upiPaymentHowItWorksMidddleLayerRequest() {
  return {
    type: UPI_MIDDLE_LAYER_HOW_IT_WORKS_REQUEST,
    status: REQUESTING
  };
}

export function upiPaymentHowItWorksMidddleLayerSuccess(
  upiPaymentHowItWorksMidddleLayerDetails
) {
  return {
    type: UPI_MIDDLE_LAYER_HOW_IT_WORKS_SUCCESS,
    status: SUCCESS,
    upiPaymentHowItWorksMidddleLayerDetails
  };
}

export function upiPaymentHowItWorksMidddleLayerFailure(error) {
  return {
    type: UPI_MIDDLE_LAYER_HOW_IT_WORKS_FAILURE,
    status: ERROR,
    error
  };
}

export function upiPaymentHowItWorksMidddleLayer(orderId) {
  return async (dispatch, getState, { api }) => {
    dispatch(upiPaymentHowItWorksMidddleLayerRequest());
    try {
      const result = await api.customGetMiddlewareUrl(
        `/otatacliq/getApplicationProperties.json?propertyNames=MP_UPI_HOW_IT_WORKS_PAGEID`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }

      return dispatch(upiPaymentHowItWorksMidddleLayerSuccess(resultJson));
    } catch (e) {
      dispatch(upiPaymentHowItWorksMidddleLayerFailure(e.message));
    }
  };
}

export function upiPaymentIsNewMidddleLayerRequest() {
  return {
    type: UPI_MIDDLE_LAYER_IS_NEW_REQUEST,
    status: REQUESTING
  };
}

export function upiPaymentIsNewMidddleLayerSuccess(
  upiPaymentIsNewMidddleLayerDetails
) {
  return {
    type: UPI_MIDDLE_LAYER_IS_NEW_SUCCESS,
    status: SUCCESS,
    upiPaymentIsNewMidddleLayerDetails
  };
}

export function upiPaymentIsNewMidddleLayerFailure(error) {
  return {
    type: UPI_MIDDLE_LAYER_IS_NEW_FAILURE,
    status: ERROR,
    error
  };
}

export function upiPaymentIsNewMidddleLayer(orderId) {
  return async (dispatch, getState, { api }) => {
    dispatch(upiPaymentIsNewMidddleLayerRequest());
    try {
      const result = await api.customGetMiddlewareUrl(
        `/otatacliq/getApplicationProperties.json?propertyNames=IS_UPI_NEW`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }

      return dispatch(upiPaymentIsNewMidddleLayerSuccess(resultJson));
    } catch (e) {
      dispatch(upiPaymentIsNewMidddleLayerFailure(e.message));
    }
  };
}

export function upiPaymentISEnableMidddleLayerRequest() {
  return {
    type: UPI_MIDDLE_LAYER_IS_ENABLE_REQUEST,
    status: REQUESTING
  };
}

export function upiPaymentISEnableMidddleLayerSuccess(
  upiPaymentISEnableMidddleLayerDetails
) {
  return {
    type: UPI_MIDDLE_LAYER_IS_ENABLE_SUCCESS,
    status: SUCCESS,
    upiPaymentISEnableMidddleLayerDetails
  };
}

export function upiPaymentISEnableMidddleLayerFailure(error) {
  return {
    type: UPI_MIDDLE_LAYER_IS_ENABLE_FAILURE,
    status: ERROR,
    error
  };
}

export function upiPaymentISEnableMidddleLayer(orderId) {
  return async (dispatch, getState, { api }) => {
    dispatch(upiPaymentISEnableMidddleLayerRequest());
    try {
      const result = await api.customGetMiddlewareUrl(
        `/otatacliq/getApplicationProperties.json?propertyNames=MP_DESKTOP_UPI_ENABLED`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }

      return dispatch(upiPaymentISEnableMidddleLayerSuccess(resultJson));
    } catch (e) {
      dispatch(upiPaymentISEnableMidddleLayerFailure(e.message));
    }
  };
}

/**
 * EOC
 */

/**
 * Code for Instacred Middle Layer
 */

export function instaCredISEnableMidddleLayerRequest() {
  return {
    type: INSTACRED_MIDDLE_LAYER_IS_ENABLE_REQUEST,
    status: REQUESTING
  };
}

export function instaCredISEnableMidddleLayerSuccess(
  instaCredISEnableMidddleLayerDetails
) {
  return {
    type: INSTACRED_MIDDLE_LAYER_IS_ENABLE_SUCCESS,
    status: SUCCESS,
    instaCredISEnableMidddleLayerDetails
  };
}

export function instaCredISEnableMidddleLayerFailure(error) {
  return {
    type: INSTACRED_MIDDLE_LAYER_IS_ENABLE_FAILURE,
    status: ERROR,
    error
  };
}

export function instaCredISEnableMidddleLayer() {
  return async (dispatch, getState, { api }) => {
    dispatch(instaCredISEnableMidddleLayerRequest());
    try {
      const result = await api.customGetMiddlewareUrl(
        `/otatacliq/getApplicationProperties.json?propertyNames=MP_DESKTOP_INSTACRED_ENABLED`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }

      return dispatch(instaCredISEnableMidddleLayerSuccess(resultJson));
    } catch (e) {
      dispatch(instaCredISEnableMidddleLayerFailure(e.message));
    }
  };
}
/**
 * EOC
 */

/**
 * @comment Code for the UPI Eligibility check
 */

export function checkUPIEligibilityRequest() {
  return {
    type: GET_UPI_ELIGIBILITY_REQUEST,
    status: REQUESTING
  };
}

export function checkUPIEligibilitySuccess(checkUPIEligibility) {
  return {
    type: GET_UPI_ELIGIBILITY_SUCCESS,
    status: SUCCESS,
    checkUPIEligibility
  };
}

export function checkUPIEligibilityFailure(error) {
  return {
    type: GET_UPI_ELIGIBILITY_FAILURE,
    status: ERROR,
    error
  };
}

export function checkUPIEligibility(guId) {
  let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
  let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
  return async (dispatch, getState, { api }) => {
    dispatch(checkUPIEligibilityRequest());
    try {
      const result = await api.get(
        `${USER_CART_PATH}/${
          JSON.parse(userDetails).userName
        }/payments/getUpiEligibility?platformNumber=${PLAT_FORM_NUMBER}&access_token=${
          JSON.parse(customerCookie).access_token
        }&cartGuid=${guId}`
      );

      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status && !resultJson.isUpiPaymentEligible) {
        dispatch(displayToast(resultJson.error));
      } else if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.error);
      }
      if (!resultJson.isUpiPaymentEligible) {
        dispatch(displayToast(resultJson.error));
      }
      if (resultJson.isUpiPaymentEligible) {
        return dispatch(checkUPIEligibilitySuccess(resultJson));
      } else {
        return dispatch(checkUPIEligibilitySuccess(resultJson));
      }
    } catch (e) {
      return dispatch(checkUPIEligibilityFailure(e.message));
    }
  };
}

export function binValidationForUPIRequest() {
  return {
    type: BIN_VALIDATION_UPI_REQUEST,
    status: REQUESTING
  };
}

export function binValidationForUPISuccess(binValidationUPI) {
  return {
    type: BIN_VALIDATION_UPI_SUCCESS,
    status: SUCCESS,
    binValidationUPI
  };
}

export function binValidationForUPIFailure(error) {
  return {
    type: BIN_VALIDATION_UPI_FAILURE,
    status: ERROR,
    error
  };
}

export function binValidationForUPI(
  paymentMode,
  isFromRetryUrl,
  retryCartGuid,
  resultJsonUPIEligibility
) {
  const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
  const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
  const cartDetails = Cookie.getCookie(CART_DETAILS_FOR_LOGGED_IN_USER);
  const parsedQueryString = queryString.parse(window.location.search);
  let cartId;
  if (parsedQueryString.value) {
    cartId = parsedQueryString.value;
  }
  if (isFromRetryUrl) {
    cartId = retryCartGuid;
  } else if (Cookie.getCookie("egvCartGuid")) {
    cartId = Cookie.getCookie("egvCartGuid");
  } else {
    cartId = JSON.parse(cartDetails).guid;
  }
  return async (dispatch, getState, { api }) => {
    dispatch(binValidationForUPIRequest());
    try {
      const result = await api.post(
        `${USER_CART_PATH}/${
          JSON.parse(userDetails).userName
        }/payments/binValidation?access_token=${
          JSON.parse(customerCookie).access_token
        }&isPwa=true&isUpdatedPwa=true&platformNumber=${PLAT_FORM_NUMBER}&paymentMode=${paymentMode}&cartGuid=${cartId}&binNo=&channel=${CHANNEL}`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      // localStorage.setItem(SELECTED_BANK_NAME, "");
      return dispatch(binValidationForUPISuccess(resultJsonStatus));
      // if (resultJsonStatus.status) {
      // return dispatch(checkUPIEligibilitySuccess(resultJsonUPIEligibility));
      // }
    } catch (e) {
      dispatch(binValidationForUPIFailure(e.message));
    }
  };
}

export function collectPaymentOrderForUPIRequest() {
  return {
    type: COLLECT_PAYMENT_ORDER_FOR_UPI_REQUEST,
    status: REQUESTING
  };
}

export function collectPaymentOrderForUPISuccess(collectPaymentOrder, guid) {
  return {
    type: COLLECT_PAYMENT_ORDER_FOR_UPI_SUCCESS,
    status: SUCCESS,
    collectPaymentOrder,
    guid
  };
}

export function collectPaymentOrderForUPIFailure(error) {
  return {
    type: COLLECT_PAYMENT_ORDER_FOR_UPI_FAILURE,
    status: ERROR,
    error
  };
}
export function collectPaymentOrderForGiftCardUPI(
  egvCartGuid,
  bankCode,
  bankName
) {
  return async (dispatch, getState, { api }) => {
    const returnUrl = `${window.location.origin}/checkout/payment-method/cardPayment`;
    let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    let currentSelectedPaymentMode = localStorage.getItem(PAYMENT_MODE_TYPE);
    let whatsappNotification = Cookie.getCookie(WHATSAPP_NOTIFICATION);
    let upi_vpa = localStorage.getItem(UPI_VPA);
    let browserName = browserAndDeviceDetails.getBrowserAndDeviceDetails(1);
    let fullVersion = browserAndDeviceDetails.getBrowserAndDeviceDetails(2);
    let deviceInfo = browserAndDeviceDetails.getBrowserAndDeviceDetails(3);
    let networkType = browserAndDeviceDetails.getBrowserAndDeviceDetails(4);
    let firstName = bankCode;

    let orderDetails = {
      wrapperItems: [
        {
          wrapperInventoryItems: [
            {
              item: []
            }
          ],
          wrapperAddressItems: [
            {
              addressItems: []
            }
          ],
          wrapperPspItems: [
            {
              pspItems: [
                {
                  pspName: "Juspay",
                  token: "",
                  cardToken: "",
                  cardFingerprint: "",
                  cardRefNo: "",
                  returnUrl: returnUrl
                },
                {
                  pspName: "Stripe",
                  token: "",
                  cardToken: "",
                  cardCountry: "",
                  cardFingerprint: "",
                  cardRefNo: "",
                  returnUrl: returnUrl
                }
              ]
            }
          ]
        }
      ]
    };

    dispatch(collectPaymentOrderForGiftCardRequest());
    try {
      const result = await api.post(
        `${USER_CART_PATH}/${
          JSON.parse(userDetails).userName
        }/collectPaymentOrder?access_token=${
          JSON.parse(customerCookie).access_token
        }&saveCard=false&sameAsShipping=true&cartGuid=${egvCartGuid}&isPwa=true&platform=22&firstName=${firstName}&platformNumber=${PLAT_FORM_NUMBER}&bankName=${bankName}&paymentMode=${currentSelectedPaymentMode}&channel=${CHANNEL}&isUpdatedPwa=true&appplatform&appversion=&deviceInfo=${deviceInfo}&networkInfo=${networkType}|&browserInfo=${browserName}|${fullVersion}&binNo=&emiTenure=&cardBrandName=${
          whatsappNotification ? "&whatsapp=true" : ""
        }`,
        orderDetails
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      localStorage.setItem(STRIPE_DETAILS, JSON.stringify(resultJson));
      dispatch(collectPaymentOrderForGiftCardSuccess(resultJson, egvCartGuid));
      let cartExchangeDetails = localStorage.getItem(AC_CART_EXCHANGE_DETAILS);
      if (cartExchangeDetails) {
        dispatch(
          submitAppliancesExchangeData(
            resultJson.orderId,
            STATUS_PROCESSING,
            false
          )
        );
      }
      dispatch(
        jusPayPaymentMethodTypeForGiftCardUPI(
          resultJson.pspAuditId,
          upi_vpa,
          egvCartGuid
        )
      );
    } catch (e) {
      dispatch(collectPaymentOrderForUPIFailure(e));
    }
  };
}

export function collectPaymentOrderForUPI(
  cardDetails,
  cartItem,
  isPaymentFailed,
  pinCode,
  isFromRetryUrl,
  retryCartGuid
) {
  return async (dispatch, getState, { api }) => {
    let browserName = browserAndDeviceDetails.getBrowserAndDeviceDetails(1);
    let fullVersion = browserAndDeviceDetails.getBrowserAndDeviceDetails(2);
    let deviceInfo = browserAndDeviceDetails.getBrowserAndDeviceDetails(3);
    let networkType = browserAndDeviceDetails.getBrowserAndDeviceDetails(4);
    let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    let productDetails = Cookie.getCookie(CART_DETAILS_FOR_LOGGED_IN_USER);
    let cartGuId = productDetails
      ? JSON.parse(productDetails).guid
      : Cookie.getCookie(OLD_CART_GU_ID);
    let cartDetails;
    let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    let address = JSON.parse(localStorage.getItem(ADDRESS_FOR_PLACE_ORDER));

    let upi_vpa = localStorage.getItem(UPI_VPA);
    let paymentMode = localStorage.getItem(PAYMENT_MODE_TYPE);
    const binCardType = localStorage.getItem(BIN_CARD_TYPE);
    if (binCardType && paymentMode !== "EMI") {
      paymentMode = `${binCardType.charAt(0).toUpperCase()}${binCardType
        .slice(1)
        .toLowerCase()} Card`;
    }
    const bankName = localStorage.getItem(SELECTED_BANK_NAME);
    let whatsappNotification = Cookie.getCookie(WHATSAPP_NOTIFICATION);
    const returnUrl = `${window.location.origin}/checkout/payment-method/cardPayment`;

    let orderDetails = "";
    let inventoryItems = cartItem;
    if (isPaymentFailed) {
      let url = queryString.parse(window.location.search);
      cartGuId =
        url && url.value ? url.value : Cookie.getCookie(OLD_CART_GU_ID);
    } else {
      if (isFromRetryUrl) {
        cartGuId = retryCartGuid;
        if (!isPaymentFailed) {
          inventoryItems = getValidDeliveryModeDetails(
            getState().cart.getUserAddressAndDeliveryModesByRetryPayment
              .products,
            true,
            getState().cart.getUserAddressAndDeliveryModesByRetryPayment
          );
          localStorage.setItem(
            CART_ITEM_COOKIE,
            JSON.stringify(inventoryItems)
          );
        }
      } else {
        cartDetails = Cookie.getCookie(CART_DETAILS_FOR_LOGGED_IN_USER);
        cartGuId = cartDetails
          ? JSON.parse(cartDetails).guid
          : Cookie.getCookie(OLD_CART_GU_ID);
      }
    }
    if (inventoryItems && address) {
      orderDetails = {
        wrapperItems: [
          {
            wrapperAddressItems: [
              {
                addressItems: [
                  {
                    addressType: "Shipping",
                    firstName: address.firstName,
                    lastName: address.lastName,
                    addressLine1: address.line1,
                    addressLine2: address.line2 ? address.line2 : "",
                    addressLine3: address.line3 ? address.line3 : "",
                    country: address.country && address.country.isocode,
                    city: address.city,
                    postalCode: address.postalCode,
                    state: address.state,
                    phone: address.phone
                  }
                ]
              }
            ],
            wrapperPspItems: [
              {
                pspItems: [
                  {
                    pspName: "Juspay",
                    token: "",
                    cardToken: "",
                    cardFingerprint: "",
                    cardRefNo: "",
                    returnUrl: returnUrl
                  },
                  {
                    pspName: "Stripe",
                    token: "",
                    cardToken: "",
                    cardCountry: "",
                    cardFingerprint: "",
                    cardRefNo: "",
                    returnUrl: returnUrl
                  }
                ]
              }
            ]
          }
        ]
      };
    }

    dispatch(collectPaymentOrderRequest());
    try {
      const result = await api.post(
        `${USER_CART_PATH}/${
          JSON.parse(userDetails).userName
        }/collectPaymentOrder?access_token=${
          JSON.parse(customerCookie).access_token
        }&saveCard=${false}&sameAsShipping=true&cartGuid=${cartGuId}&isPwa=true&platform=22&platformNumber=${PLAT_FORM_NUMBER}&bankName=${bankName}&paymentMode=${paymentMode}&channel=${CHANNEL}&isUpdatedPwa=true&appplatform&appversion=&deviceInfo=${deviceInfo}&networkInfo=${networkType}|&browserInfo=${browserName}|${fullVersion}&binNo=&emiTenure=&cardBrandName=${
          whatsappNotification ? "&whatsapp=true" : ""
        }`,
        orderDetails
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      localStorage.setItem(STRIPE_DETAILS, JSON.stringify(resultJson));
      if (resultJsonStatus.status) {
        if (
          resultJson.errorCode === ERROR_CODE_FOR_BANK_OFFER_INVALID_1 ||
          resultJson.errorCode === ERROR_CODE_FOR_BANK_OFFER_INVALID_2
        ) {
          dispatch(collectPaymentOrderFailure(INVALID_COUPON_ERROR_MESSAGE));
          return dispatch(
            showModal(INVALID_BANK_COUPON_POPUP, {
              result: resultJson
            })
          );
        } else {
          throw new Error(resultJson.message);
        }
      }
      dispatch(collectPaymentOrderSuccess(resultJson));
      let cartExchangeDetails = localStorage.getItem(AC_CART_EXCHANGE_DETAILS);
      if (cartExchangeDetails) {
        dispatch(
          submitAppliancesExchangeData(
            resultJson.orderId,
            STATUS_PROCESSING,
            false
          )
        );
      }
      dispatch(jusPayPaymentMethodTypeForUPI(resultJson.pspAuditId, upi_vpa));
    } catch (e) {
      dispatch(
        displayToast(ERROR_MESSAGE_FOR_CREATE_JUS_PAY_CALL + " Please Retry.")
      );
      dispatch(collectPaymentOrderFailure(e));
    }
  };
}
export function softReservationPaymentForUPI(
  paymentMethodType,
  paymentMode,
  bankCode,
  pinCode,
  bankName
) {
  let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
  let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
  return async (dispatch, getState, { api }) => {
    let productItems = "";
    let cartDetails = "";
    let cartId = "";

    productItems = await getValidDeliveryModeDetails(
      getState().cart.cartDetailsCNC.products
    );
    if (productItems) {
      localStorage.setItem(CART_ITEM_COOKIE, JSON.stringify(productItems));
    }
    cartDetails = Cookie.getCookie(CART_DETAILS_FOR_LOGGED_IN_USER);
    cartId = JSON.parse(cartDetails).guid;

    dispatch(softReservationForPaymentRequest());
    try {
      const result = await api.post(
        `${USER_CART_PATH}/${
          JSON.parse(userDetails).userName
        }/carts/softReservationForPayment?access_token=${
          JSON.parse(customerCookie).access_token
        }&cartGuid=${cartId}&pincode=${pinCode}&type=payment`,
        productItems
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      dispatch(
        // change this code

        collectPaymentOrderForUPI(
          paymentMethodType,
          productItems,
          bankCode,
          pinCode,
          false,
          cartId,
          "",
          bankName
        )
      );
      setDataLayerForCheckoutDirectCalls(ADOBE_FINAL_PAYMENT_MODES);
    } catch (e) {
      dispatch(softReservationForPaymentFailure(e.message));
    }
  };
}

export function jusPayPaymentMethodTypeForUPI(juspayOrderId, upi_vpa) {
  return async (dispatch, getState, { api }) => {
    dispatch(jusPayPaymentMethodTypeRequest());

    const params = {
      payment_method_type: "UPI",
      redirect_after_payment: "true",
      format: "json",
      merchant_id: getState().cart.paymentModes.merchantID,
      txn_type: "UPI_COLLECT",
      order_id: juspayOrderId,
      payment_method: "UPI",
      upi_vpa: upi_vpa
    };
    let cardObject = Object.keys(params)
      .map(key => {
        return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
      })
      .join("&");
    try {
      const result = await api.postJusPayUrlEncode(`txns?`, cardObject);
      const resultJson = await result.json();
      if (
        resultJson.status === JUS_PAY_PENDING ||
        resultJson.status === SUCCESS ||
        resultJson.status === SUCCESS_CAMEL_CASE ||
        resultJson.status === SUCCESS_UPPERCASE ||
        resultJson.status === JUS_PAY_CHARGED
      ) {
        dispatch(jusPayPaymentMethodTypeSuccess(resultJson));
        dispatch(setBagCount(0));
        localStorage.setItem(CART_BAG_DETAILS, []);
        dispatch(generateCartIdAfterOrderPlace());
      } else {
        throw new Error(resultJson.error_message);
      }
    } catch (e) {
      dispatch(jusPayPaymentMethodTypeFailure(e.message));
    }
  };
}

export function jusPayPaymentMethodTypeForGiftCardUPI(
  juspayOrderId,
  upi_vpa,
  guId
) {
  return async (dispatch, getState, { api }) => {
    const params = {
      payment_method_type: "UPI",
      redirect_after_payment: "true",
      format: "json",
      merchant_id: getState().cart.paymentModes.merchantID,
      txn_type: "UPI_COLLECT",
      order_id: juspayOrderId,
      payment_method: "UPI",
      upi_vpa: upi_vpa
    };
    let cardObject = Object.keys(params)
      .map(key => {
        return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
      })
      .join("&");
    try {
      const result = await api.postJusPayUrlEncode(`txns?`, cardObject);
      const resultJson = await result.json();

      if (
        resultJson.status === JUS_PAY_PENDING ||
        resultJson.status === SUCCESS ||
        resultJson.status === SUCCESS_CAMEL_CASE ||
        resultJson.status === SUCCESS_UPPERCASE ||
        resultJson.status === JUS_PAY_CHARGED
      ) {
        dispatch(jusPayPaymentMethodTypeForGiftCardSuccess(resultJson, guId));
      } else {
        throw new Error(resultJson.error_message);
      }
    } catch (e) {
      dispatch(jusPayPaymentMethodTypeFailure(e.message));
    }
  };
}

export function createJusPayOrderForUPI(
  cardDetails,
  cartItemObj,
  isPaymentFailed,
  isFromRetryUrl,
  retryCartGuid
) {
  let browserName = browserAndDeviceDetails.getBrowserAndDeviceDetails(1);
  let fullVersion = browserAndDeviceDetails.getBrowserAndDeviceDetails(2);
  let deviceInfo = browserAndDeviceDetails.getBrowserAndDeviceDetails(3);
  let networkType = browserAndDeviceDetails.getBrowserAndDeviceDetails(4);
  let upi_vpa = JSON.parse(localStorage.getItem(UPI_VPA));
  let cartItem = cartItemObj;
  const jusPayUrl = `${window.location.origin}/checkout/multi/payment-method/cardPayment`;
  let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
  let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
  let whatsappNotification = Cookie.getCookie(WHATSAPP_NOTIFICATION);
  let cartDetails, cartId;
  if (isPaymentFailed) {
    let url = queryString.parse(window.location.search);
    cartId = url && url.value ? url.value : Cookie.getCookie(OLD_CART_GU_ID);
  } else {
    if (isFromRetryUrl) {
      cartId = retryCartGuid;
    } else {
      cartDetails = Cookie.getCookie(CART_DETAILS_FOR_LOGGED_IN_USER);
      cartId = cartDetails
        ? JSON.parse(cartDetails).guid
        : Cookie.getCookie(OLD_CART_GU_ID);
    }
  }
  const currentSelectedPaymentMode = localStorage.getItem(PAYMENT_MODE_TYPE);
  const bankName = localStorage.getItem(SELECTED_BANK_NAME);
  return async (dispatch, getState, { api }) => {
    dispatch(createJusPayOrderRequest());
    try {
      let productItems = "";
      let result = "";
      if (isFromRetryUrl) {
        productItems = getValidDeliveryModeDetails(
          getState().cart.getUserAddressAndDeliveryModesByRetryPayment.products,
          true,
          getState().cart.getUserAddressAndDeliveryModesByRetryPayment
        );
      }
      if (isFromRetryUrl) {
        result = await api.post(
          `${USER_CART_PATH}/${
            JSON.parse(userDetails).userName
          }/createJuspayOrder?state=&addressLine2=&lastName=&firstName=&addressLine3=&sameAsShipping=null&cardSaved=false&deviceInfo=${deviceInfo}&networkInfo=${networkType}|&browserInfo=${browserName}|${fullVersion}&platform=22&platformNumber=${PLAT_FORM_NUMBER}&appVersion=&cardFingerPrint=${
            cardDetails.cardFingerprint
          }&pincode=${localStorage.getItem(
            DEFAULT_PIN_CODE_LOCAL_STORAGE
          )}&city=&cartGuid=${retryCartGuid}&token=&cardRefNo=${
            cardDetails.cardReferenceNumber
          }&country=&addressLine1=&access_token=${
            JSON.parse(customerCookie).access_token
          }&juspayUrl=${encodeURIComponent(
            jusPayUrl
          )}&paymentMode=${currentSelectedPaymentMode}&bankName=${
            bankName ? bankName : ""
          }&isPwa=true&channel=${CHANNEL}&isUpdatedPwa=true${
            whatsappNotification ? "&whatsapp=true" : ""
          }`,
          productItems
        );
      } else {
        result = await api.post(
          `${USER_CART_PATH}/${
            JSON.parse(userDetails).userName
          }/createJuspayOrder?state=&addressLine2=&lastName=&firstName=&addressLine3=&sameAsShipping=null&cardSaved=false&deviceInfo=${deviceInfo}&networkInfo=${networkType}|&browserInfo=${browserName}|${fullVersion}&platform=22&platformNumber=${PLAT_FORM_NUMBER}&appVersion=&cardFingerPrint=${
            cardDetails.cardFingerprint
          }&pincode=${localStorage.getItem(
            DEFAULT_PIN_CODE_LOCAL_STORAGE
          )}&city=&cartGuid=${cartId}&token=&cardRefNo=${
            cardDetails.cardReferenceNumber
          }&country=&addressLine1=&access_token=${
            JSON.parse(customerCookie).access_token
          }&juspayUrl=${encodeURIComponent(
            jusPayUrl
          )}&paymentMode=${currentSelectedPaymentMode}&bankName=${
            bankName ? bankName : ""
          }&isPwa=true&channel=${CHANNEL}&isUpdatedPwa=true${
            whatsappNotification ? "&whatsapp=true" : ""
          }`,
          cartItem
        );
      }

      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        if (
          resultJson.errorCode === ERROR_CODE_FOR_BANK_OFFER_INVALID_1 ||
          resultJson.errorCode === ERROR_CODE_FOR_BANK_OFFER_INVALID_2
        ) {
          dispatch(createJusPayOrderFailure(INVALID_COUPON_ERROR_MESSAGE));
          return dispatch(
            showModal(INVALID_BANK_COUPON_POPUP, {
              result: resultJson
            })
          );
        } else {
          dispatch(displayToast("Please Retry."));
          throw new Error(resultJson.message);
        }
      }
      dispatch(
        jusPayPaymentMethodTypeForUPI(resultJson.juspayOrderId, upi_vpa)
      );
    } catch (e) {
      dispatch(createJusPayOrderFailure(e.message));
    }
  };
}

/**
 * EOC
 */

// Actions to Apply Bank Offer
export function applyBankOfferRequest() {
  return {
    type: APPLY_BANK_OFFER_REQUEST,
    status: REQUESTING
  };
}
export function applyBankOfferSuccess(bankOffer) {
  return {
    type: APPLY_BANK_OFFER_SUCCESS,
    status: SUCCESS,
    bankOffer
  };
}
export function applyBankOfferFailure(error) {
  return {
    type: APPLY_BANK_OFFER_FAILURE,
    status: ERROR,
    error
  };
}

export function applyBankOffer(couponCode) {
  let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
  let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
  let cartDetails = Cookie.getCookie(CART_DETAILS_FOR_LOGGED_IN_USER);
  let cartId;
  const parsedQueryString = queryString.parse(window.location.search);
  const value = parsedQueryString.value;
  if (value) {
    cartId = value;
  } else {
    cartId = JSON.parse(cartDetails).guid;
  }

  return async (dispatch, getState, { api }) => {
    dispatch(applyBankOfferRequest());
    try {
      const result = await api.post(
        `${USER_CART_PATH}/${
          JSON.parse(userDetails).userName
        }/carts/applyBankCoupons?access_token=${
          JSON.parse(customerCookie).access_token
        }&isPwa=true&isUpdatedPwa=true&platformNumber=${PLAT_FORM_NUMBER}&paymentMode=${PAYMENT_MODE}&couponCode=${couponCode}&cartGuid=${cartId}&channel=${CHANNEL}`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      localStorage.setItem(BANK_COUPON_COOKIE, couponCode);
      if (resultJsonStatus.status) {
        setDataLayerForCheckoutDirectCalls(
          ADOBE_CALL_FOR_APPLY_COUPON_FAILURE,
          couponCode
        );
        if (resultJson.errorCode === ERROR_CODE_FOR_BANK_OFFER_INVALID_3) {
          const redoCall = () => dispatch(applyBankOffer(couponCode));
          dispatch(applyBankOfferFailure(resultJsonStatus.message));
          localStorage.removeItem(BANK_COUPON_COOKIE);
          return dispatch(
            showModal(VALIDATE_OFFERS_POPUP, {
              result: resultJson,
              offerType: BANK_OFFER_TYPE,
              couponCode,
              redoCall
            })
          );
        } else if (
          resultJson.errorCode === ERROR_CODE_FOR_BANK_OFFER_INVALID_4
        ) {
          dispatch(displayToast(resultJson.couponMessage));
          localStorage.removeItem(BANK_COUPON_COOKIE);
        } else if (
          resultJson.errorCode === ERROR_CODE_FOR_BANK_OFFER_INVALID_5
        ) {
          dispatch(displayToast(resultJson.error));
          localStorage.removeItem(BANK_COUPON_COOKIE);
        } else if (
          resultJson.errorCode === ERROR_CODE_FOR_BANK_OFFER_INVALID_6
        ) {
          dispatch(displayToast(resultJson.error));
          localStorage.removeItem(BANK_COUPON_COOKIE);
        } else {
          localStorage.removeItem(BANK_COUPON_COOKIE);
          dispatch(displayToast(resultJson.message));
          throw new Error(resultJsonStatus.message);
        }
      } else {
        setDataLayerForCheckoutDirectCalls(
          ADOBE_CALL_FOR_APPLY_COUPON_SUCCESS,
          couponCode
        );
      }
      return dispatch(applyBankOfferSuccess(resultJson));
    } catch (e) {
      return dispatch(applyBankOfferFailure(e.message));
    }
  };
}
// Actions to Release Bank Offer
export function releaseBankOfferRequest() {
  return {
    type: RELEASE_BANK_OFFER_REQUEST,
    status: REQUESTING
  };
}
export function releaseBankOfferSuccess(bankOffer) {
  return {
    type: RELEASE_BANK_OFFER_SUCCESS,
    status: SUCCESS,
    bankOffer
  };
}
export function releaseBankOfferUpdateSuccess(bankOffer) {
  return {
    type: RELEASE_BANK_OFFER_UPDATE_SUCCESS,
    status: SUCCESS,
    bankOffer
  };
}
export function releaseBankOfferFailure(error) {
  return {
    type: RELEASE_BANK_OFFER_FAILURE,
    status: ERROR,
    error
  };
}

export function releaseBankOffer(previousCouponCode, newCouponCode: null) {
  let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
  let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
  let cartDetails = Cookie.getCookie(CART_DETAILS_FOR_LOGGED_IN_USER);
  let retryCartID = localStorage.getItem(RETRY_PAYMENT_CART_ID);
  let cartId;
  const parsedQueryString = queryString.parse(window.location.search);
  const value = parsedQueryString.value;
  if (value) {
    cartId = value;
  } else {
    if (retryCartID) {
      cartId = retryCartID.replace(/"/g, "");
    } else {
      cartId = JSON.parse(cartDetails).guid;
    }
  }
  return async (dispatch, getState, { api }) => {
    dispatch(releaseBankOfferRequest());
    try {
      const result = await api.post(
        `${USER_CART_PATH}/${
          JSON.parse(userDetails).userName
        }/carts/releaseCartCoupons?access_token=${
          JSON.parse(customerCookie).access_token
        }&isUpdatedPwa=true&paymentMode=${PAYMENT_MODE}&couponCode=${previousCouponCode}&cartGuid=${cartId}&isPwa=true&channel=${CHANNEL}`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      localStorage.removeItem(BANK_COUPON_COOKIE);
      if (newCouponCode) {
        return dispatch(applyBankOffer(newCouponCode));
      }
      if (
        !getState().cart.cartDetailsCNC &&
        getState().profile.retryPaymentDetails
      ) {
        dispatch(releaseBankOfferUpdateSuccess(resultJson));
        return dispatch(releaseBankOfferRetryPaymentSuccess(resultJson));
      } else {
        return dispatch(releaseBankOfferSuccess(resultJson));
      }
    } catch (e) {
      return dispatch(releaseBankOfferFailure(e.message));
    }
  };
}

// Actions to Apply Cliq Cash
export function applyCliqCashRequest() {
  return {
    type: APPLY_CLIQ_CASH_REQUEST,
    status: REQUESTING
  };
}

export function applyCliqCashSuccess(paymentDetails) {
  return {
    type: APPLY_CLIQ_CASH_SUCCESS,
    status: SUCCESS,
    paymentDetails
  };
}

export function applyCliqCashFailure(error) {
  return {
    type: APPLY_CLIQ_CASH_FAILURE,
    status: ERROR,
    error
  };
}

// Action Creator to bin Validation
export function applyCliqCash() {
  let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
  let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
  let cartDetails = Cookie.getCookie(CART_DETAILS_FOR_LOGGED_IN_USER);
  let cartId = JSON.parse(cartDetails).guid;
  return async (dispatch, getState, { api }) => {
    dispatch(applyCliqCashRequest());
    try {
      const result = await api.post(
        `${USER_CART_PATH}/${
          JSON.parse(userDetails).userName
        }/applyCliqCash?access_token=${
          JSON.parse(customerCookie).access_token
        }&cartGuid=${cartId}&isPwa=true&isUpdatedPwa=true`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      localStorage.setItem(CLIQ_CASH_APPLIED_LOCAL_STORAGE, true);
      dispatch(applyCliqCashSuccess(resultJson));
      setDataLayerForCheckoutDirectCalls(ADOBE_CALL_FOR_CLIQ_CASH_TOGGLE_ON);
    } catch (e) {
      dispatch(applyCliqCashFailure(e.message));
    }
  };
}

// Actions to Remove Cliq Cash
export function removeCliqCashRequest() {
  return {
    type: REMOVE_CLIQ_CASH_REQUEST,
    status: REQUESTING
  };
}

export function removeCliqCashSuccess(paymentDetails) {
  return {
    type: REMOVE_CLIQ_CASH_SUCCESS,
    status: SUCCESS,
    paymentDetails
  };
}

export function removeCliqCashFailure(error) {
  return {
    type: REMOVE_CLIQ_CASH_FAILURE,
    status: ERROR,
    error
  };
}

// Action Creator to Remove Cliq Cash
export function removeCliqCash() {
  let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
  let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
  let cartDetails = Cookie.getCookie(CART_DETAILS_FOR_LOGGED_IN_USER);
  let cartId = JSON.parse(cartDetails).guid;
  return async (dispatch, getState, { api }) => {
    dispatch(removeCliqCashRequest());
    try {
      const result = await api.post(
        `${USER_CART_PATH}/${
          JSON.parse(userDetails).userName
        }/removeCliqCash?access_token=${
          JSON.parse(customerCookie).access_token
        }&cartGuid=${cartId}&isPwa=true&isUpdatedPwa=true`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      localStorage.removeItem(CLIQ_CASH_APPLIED_LOCAL_STORAGE);
      setDataLayerForCheckoutDirectCalls(ADOBE_CALL_FOR_CLIQ_CASH_TOGGLE_OFF);
      dispatch(removeCliqCashSuccess(resultJson));
    } catch (e) {
      dispatch(removeCliqCashFailure(e.message));
    }
  };
}

export function binValidationRequest() {
  return {
    type: BIN_VALIDATION_REQUEST,
    status: REQUESTING
  };
}

export function binValidationSuccess(binValidation) {
  return {
    type: BIN_VALIDATION_SUCCESS,
    status: SUCCESS,
    binValidation
  };
}

export function binValidationFailure(error) {
  return {
    type: BIN_VALIDATION_FAILURE,
    status: ERROR,
    error
  };
}
export function bankGateWayError(bankGatewayStatus) {
  return {
    type: BANK_GATEWAY_STATUS_ERROR,
    status: ERROR,
    bankGatewayStatus
  };
}

// Action Creator to bin Validation
export function binValidation(
  paymentMode,
  binNo,
  isFromRetryUrl,
  retryCartGuid
) {
  let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
  let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);

  let cartDetails = Cookie.getCookie(CART_DETAILS_FOR_LOGGED_IN_USER);
  const parsedQueryString = queryString.parse(window.location.search);
  let cartId;
  if (parsedQueryString.value) {
    cartId = parsedQueryString.value;
  }
  if (isFromRetryUrl) {
    cartId = retryCartGuid;
  } else {
    cartId =
      cartDetails && JSON.parse(cartDetails).guid
        ? JSON.parse(cartDetails).guid
        : Cookie.getCookie(OLD_CART_GU_ID);
  }

  let giftCartObj = JSON.parse(localStorage.getItem(EGV_GIFT_CART_ID));
  if (!cartId && giftCartObj) {
    cartId = giftCartObj.egvCartGuid ? giftCartObj.egvCartGuid : null;
  }

  return async (dispatch, getState, { api }) => {
    dispatch(binValidationRequest());
    try {
      const result = await api.post(
        `${USER_CART_PATH}/${
          JSON.parse(userDetails).userName
        }/payments/binValidation?access_token=${
          JSON.parse(customerCookie).access_token
        }&isPwa=true&isUpdatedPwa=true&platformNumber=${PLAT_FORM_NUMBER}&paymentMode=${paymentMode}&cartGuid=${cartId}&binNo=${binNo}&channel=${CHANNEL}`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJson.bankName) {
        localStorage.setItem(SELECTED_BANK_NAME, resultJson.bankName);
      } else {
        localStorage.removeItem(SELECTED_BANK_NAME);
      }
      let cardType =
        resultJson.cardType && resultJson.cardType.replace(/\s/g, "");
      if (cardType) {
        localStorage.setItem(BIN_CARD_TYPE, cardType);
      }
      if (paymentMode !== EMI && localStorage.getItem(EMI_TENURE)) {
        localStorage.removeItem(EMI_TENURE);
      }
      if (resultJsonStatus.status) {
        if (resultJson.errorCode === ERROR_CODE_FOR_BANK_OFFER_INVALID_3) {
          dispatch(applyBankOfferFailure(resultJsonStatus.message));
          return dispatch(
            showModal(VALIDATE_OFFERS_POPUP, {
              result: resultJson,
              offerType: OFFER_ERROR_PAYMENT_MODE_TYPE
            })
          );
        } else {
          throw new Error(resultJsonStatus.message);
        }
      }

      dispatch(binValidationSuccess(resultJson));
    } catch (e) {
      dispatch(binValidationFailure(e.message));
    }
  };
}

export function binValidationForNetBanking(
  paymentMode,
  bankName,
  isFromRetryUrl,
  retryCartGuid
) {
  let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
  let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
  let cartDetails = Cookie.getCookie(CART_DETAILS_FOR_LOGGED_IN_USER);
  const parsedQueryString = queryString.parse(window.location.search);
  let cartId;
  if (parsedQueryString.value) {
    cartId = parsedQueryString.value;
  }
  if (isFromRetryUrl) {
    cartId = retryCartGuid;
  } else {
    cartId =
      cartDetails && JSON.parse(cartDetails).guid
        ? JSON.parse(cartDetails).guid
        : Cookie.getCookie(OLD_CART_GU_ID);
  }

  let giftCartObj = JSON.parse(localStorage.getItem(EGV_GIFT_CART_ID));
  if (!cartId && giftCartObj) {
    cartId = giftCartObj.egvCartGuid ? giftCartObj.egvCartGuid : null;
  }
  return async (dispatch, getState, { api }) => {
    dispatch(binValidationRequest());
    try {
      const result = await api.post(
        `${USER_CART_PATH}/${
          JSON.parse(userDetails).userName
        }/payments/binValidation?access_token=${
          JSON.parse(customerCookie).access_token
        }&bankName=${bankName}&paymentMode=${paymentMode}&cartGuid=${cartId}&binNo=&channel=${CHANNEL}&isUpdatedPwa=true`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJson.bankName) {
        localStorage.setItem(SELECTED_BANK_NAME, bankName);
      } else {
        localStorage.removeItem(SELECTED_BANK_NAME);
      }
      if (resultJsonStatus.status) {
        if (resultJson.errorCode === ERROR_CODE_FOR_BANK_OFFER_INVALID_3) {
          dispatch(bankGateWayError(resultJson));
          dispatch(applyBankOfferFailure(resultJsonStatus.message));
          return dispatch(
            showModal(VALIDATE_OFFERS_POPUP, {
              result: resultJson,
              offerType: OFFER_ERROR_PAYMENT_MODE_TYPE
            })
          );
        } else {
          dispatch(bankGateWayError(resultJson));
          throw new Error(resultJsonStatus.message);
        }
      }
      dispatch(binValidationSuccess(resultJson));
    } catch (e) {
      dispatch(binValidationFailure(e.message));
    }
  };
}

export function softReservationForPaymentRequest() {
  return {
    type: SOFT_RESERVATION_FOR_PAYMENT_REQUEST,
    status: REQUESTING
  };
}

export function softReservationForPaymentSuccess(orderDetails) {
  return {
    type: SOFT_RESERVATION_FOR_PAYMENT_SUCCESS,
    status: SUCCESS,
    orderDetails
  };
}

export function softReservationForPaymentFailure(error) {
  return {
    type: SOFT_RESERVATION_FOR_PAYMENT_FAILURE,
    status: ERROR,
    error
  };
}

// Action Creator to soft reservation For Payment
export function softReservationForPayment(cardDetails, address) {
  let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
  let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
  let paymentMode = localStorage.getItem(PAYMENT_MODE_TYPE);
  const binCardType = localStorage.getItem(BIN_CARD_TYPE);
  if (binCardType && paymentMode !== "EMI") {
    paymentMode = `${binCardType.charAt(0).toUpperCase()}${binCardType
      .slice(1)
      .toLowerCase()} Card`;
  }
  const pinCode = localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE);
  return async (dispatch, getState, { api }) => {
    let productItems = await getValidDeliveryModeDetails(
      getState().cart.cartDetailsCNC.products
    );
    if (productItems) {
      localStorage.setItem(CART_ITEM_COOKIE, JSON.stringify(productItems));
    }
    let cartDetails = Cookie.getCookie(CART_DETAILS_FOR_LOGGED_IN_USER);
    let cartId = JSON.parse(cartDetails).guid;
    dispatch(softReservationForPaymentRequest());
    try {
      const result = await api.post(
        `${USER_CART_PATH}/${
          JSON.parse(userDetails).userName
        }/carts/softReservationForPayment?access_token=${
          JSON.parse(customerCookie).access_token
        }&cartGuid=${cartId}&pincode=${pinCode}&type=payment&paymentMode=${
          paymentMode ? paymentMode : ""
        }&isPwa=true`,
        productItems
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      setDataLayerForCheckoutDirectCalls(ADOBE_FINAL_PAYMENT_MODES);
      dispatch(softReservationForPaymentSuccess(resultJson));
      dispatch(
        stripe_juspay_Tokenize(
          cardDetails,
          address,
          productItems,
          paymentMode,
          false
        )
      );
    } catch (e) {
      dispatch(softReservationForPaymentFailure(e.message));
    }
  };
}

export function softReservationPaymentForNetBanking(
  paymentMethodType,
  paymentMode,
  bankCode,
  pinCode,
  bankName
) {
  let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
  let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
  return async (dispatch, getState, { api }) => {
    let productItems = await getValidDeliveryModeDetails(
      getState().cart.cartDetailsCNC.products
    );
    if (productItems) {
      localStorage.setItem(CART_ITEM_COOKIE, JSON.stringify(productItems));
    }
    let cartDetails = Cookie.getCookie(CART_DETAILS_FOR_LOGGED_IN_USER);
    let cartId = JSON.parse(cartDetails).guid;

    dispatch(softReservationForPaymentRequest());
    try {
      const result = await api.post(
        `${USER_CART_PATH}/${
          JSON.parse(userDetails).userName
        }/carts/softReservationForPayment?access_token=${
          JSON.parse(customerCookie).access_token
        }&cartGuid=${cartId}&pincode=${pinCode}&type=payment`,
        productItems
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }

      dispatch(
        collectPaymentOrderForNetBanking(
          paymentMethodType,
          productItems,
          bankCode,
          pinCode,
          false,
          "",
          bankName
        )
      );
      setDataLayerForCheckoutDirectCalls(ADOBE_FINAL_PAYMENT_MODES);
    } catch (e) {
      dispatch(softReservationForPaymentFailure(e.message));
    }
  };
}

export function softReservationPaymentForSavedCard(
  cardDetails,
  address,
  paymentMode
) {
  let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
  let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
  return async (dispatch, getState, { api }) => {
    let productItems = await getValidDeliveryModeDetails(
      getState().cart.cartDetailsCNC.products
    );
    if (productItems) {
      localStorage.setItem(CART_ITEM_COOKIE, JSON.stringify(productItems));
    }
    let cartDetails = Cookie.getCookie(CART_DETAILS_FOR_LOGGED_IN_USER);
    let cartId = JSON.parse(cartDetails).guid;
    dispatch(softReservationForPaymentRequest());
    try {
      const result = await api.post(
        `${USER_CART_PATH}/${
          JSON.parse(userDetails).userName
        }/carts/softReservationForPayment?access_token=${
          JSON.parse(customerCookie).access_token
        }&type=payment&cartGuid=${cartId}&pincode=${localStorage.getItem(
          DEFAULT_PIN_CODE_LOCAL_STORAGE
        )}`,
        productItems
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      setDataLayerForCheckoutDirectCalls(ADOBE_FINAL_PAYMENT_MODES);
      dispatch(collectPaymentOrderForSavedCards(cardDetails, productItems));
    } catch (e) {
      dispatch(softReservationForPaymentFailure(e.message));
    }
  };
}

export function softReservationForCliqCash(pinCode) {
  let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
  let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
  return async (dispatch, getState, { api }) => {
    let productItems = await getValidDeliveryModeDetails(
      getState().cart.cartDetailsCNC.products
    );
    if (productItems) {
      localStorage.setItem(CART_ITEM_COOKIE, JSON.stringify(productItems));
    }
    let cartDetails = Cookie.getCookie(CART_DETAILS_FOR_LOGGED_IN_USER);
    let cartId = JSON.parse(cartDetails).guid;
    dispatch(softReservationForPaymentRequest());
    try {
      const result = await api.post(
        `${USER_CART_PATH}/${
          JSON.parse(userDetails).userName
        }/carts/softReservationForPayment?access_token=${
          JSON.parse(customerCookie).access_token
        }&cartGuid=${cartId}&pincode=${pinCode}`,
        productItems
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      setDataLayerForCheckoutDirectCalls(ADOBE_FINAL_PAYMENT_MODES);
      dispatch(softReservationForPaymentSuccess(resultJson));
      dispatch(collectPaymentOrderForCliqCash(pinCode, productItems));
    } catch (e) {
      dispatch(softReservationForPaymentFailure(e.message));
    }
  };
}

export function jusPayTokenizeRequest() {
  return {
    type: JUS_PAY_TOKENIZE_REQUEST,
    status: REQUESTING
  };
}

export function jusPayTokenizeSuccess(jusPayToken) {
  return {
    type: JUS_PAY_TOKENIZE_SUCCESS,
    status: SUCCESS,
    jusPayToken
  };
}

export function jusPayTokenizeFailure(error) {
  return {
    type: JUS_PAY_TOKENIZE_FAILURE,
    status: ERROR,
    error
  };
}

// Action Creator to Just pay Tokenize
export function jusPayTokenize(
  cardDetails,
  address,
  cartItem,
  paymentMode,
  isPaymentFailed,
  isFromRetryUrl,
  retryCartGuid
) {
  return async (dispatch, getState, { api }) => {
    dispatch(jusPayTokenizeRequest());
    let cardObject = new FormData();
    cardObject.append("card_exp_month", cardDetails && cardDetails.monthValue);
    cardObject.append("card_exp_year", cardDetails && cardDetails.yearValue);
    cardObject.append("card_number", cardDetails && cardDetails.cardNumber);
    cardObject.append(
      "card_security_code",
      cardDetails && cardDetails.cvvNumber
    );
    cardObject.append("merchant_id", getState().cart.paymentModes.merchantID);
    cardObject.append("name_on_card", cardDetails && cardDetails.cardName);
    try {
      const result = await api.postJusPay(`card/tokenize?`, cardObject);
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      dispatch(jusPayTokenizeSuccess(resultJson.token));
      return resultJson;
    } catch (e) {
      let message = e.message;
      if (message && message.indexOf("Unexpected token") > -1) {
        message = "Something went wrong. Please retry!";
      }
      dispatch(jusPayTokenizeFailure(message));
    }
  };
}

export function jusPayTokenizeForGiftCard(cardDetails, paymentMode, guId) {
  return async (dispatch, getState, { api }) => {
    let cardObject = new FormData();
    cardObject.append("card_exp_month", cardDetails.monthValue);
    cardObject.append("card_exp_year", cardDetails.yearValue);
    cardObject.append("card_number", cardDetails.cardNumber);
    cardObject.append("card_security_code", cardDetails.cvvNumber);
    cardObject.append("merchant_id", getState().cart.paymentModes.merchantID);
    cardObject.append("name_on_card", cardDetails.cardName);
    dispatch(jusPayTokenizeRequest());
    try {
      const result = await api.postJusPay(`card/tokenize?`, cardObject);
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      dispatch(jusPayTokenizeSuccess(resultJson.token));
      return resultJson;
    } catch (e) {
      let message = e.message;
      if (message && message.indexOf("Unexpected token") > -1) {
        message = "Something went wrong. Please retry!";
      }
      dispatch(jusPayTokenizeFailure(message));
    }
  };
}

export function createJusPayOrderRequest() {
  return {
    type: CREATE_JUS_PAY_ORDER_REQUEST,
    status: REQUESTING
  };
}

export function createJusPayOrderSuccess(jusPayDetails) {
  return {
    type: CREATE_JUS_PAY_ORDER_SUCCESS,
    status: SUCCESS,
    jusPayDetails
  };
}

export function createJusPayOrderSuccessForCliqCash(cliqCashJusPayDetails) {
  return {
    type: CREATE_JUS_PAY_ORDER_FOR_CLIQ_CASH_SUCCESS,
    status: SUCCESS,
    cliqCashJusPayDetails
  };
}

export function createJusPayOrderFailure(error) {
  return {
    type: CREATE_JUS_PAY_ORDER_FAILURE,
    status: ERROR,
    error
  };
}

// Action Creator to create Jus Pay Order
export function createJusPayOrder(
  token,
  cartItem,
  address,
  cardDetails,
  paymentMode,
  isPaymentFailed,
  isFromRetryUrl,
  retryCartGuid
) {
  let browserName = browserAndDeviceDetails.getBrowserAndDeviceDetails(1);
  let fullVersion = browserAndDeviceDetails.getBrowserAndDeviceDetails(2);
  let deviceInfo = browserAndDeviceDetails.getBrowserAndDeviceDetails(3);
  let networkType = browserAndDeviceDetails.getBrowserAndDeviceDetails(4);
  const jusPayUrl = `${window.location.origin}/checkout/payment-method/cardPayment`;
  let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
  let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
  let whatsappNotification = Cookie.getCookie(WHATSAPP_NOTIFICATION);
  let cartId;
  let url = queryString.parse(window.location.search);
  if (url && url.value) {
    cartId = url && url.value;
  } else {
    if (isFromRetryUrl) {
      cartId = retryCartGuid;
    } else {
      let cartDetails = Cookie.getCookie(CART_DETAILS_FOR_LOGGED_IN_USER);
      cartId = JSON.parse(cartDetails).guid;
    }
  }
  const currentSelectedPaymentMode = localStorage.getItem(PAYMENT_MODE_TYPE);
  const bankName = localStorage.getItem(SELECTED_BANK_NAME);
  const noCostEmiCouponCode = localStorage.getItem(NO_COST_EMI_COUPON);
  const selectedEmiTenure = localStorage.getItem(EMI_TENURE);
  const childPaymentMode = noCostEmiCouponCode ? "NCEMI" : null;
  let emiTenure = selectedEmiTenure
    ? selectedEmiTenure
    : cardDetails.emi_tenure;
  return async (dispatch, getState, { api }) => {
    let productItems = "";
    if (isFromRetryUrl) {
      productItems = getValidDeliveryModeDetails(
        getState().cart.getUserAddressAndDeliveryModesByRetryPayment.products,
        true,
        getState().cart.getUserAddressAndDeliveryModesByRetryPayment
      );
    }
    dispatch(createJusPayOrderRequest());
    try {
      let result = "";
      if (isFromRetryUrl) {
        result = await api.post(
          `${USER_CART_PATH}/${
            JSON.parse(userDetails).userName
          }/createJuspayOrder?access_token=${
            JSON.parse(customerCookie).access_token
          }&firstName=${address.firstName}&lastName=${
            address.lastName
          }&addressLine1=${
            address.line1 ? encodeURIComponent(address.line1) : ""
          }&addressLine2=${address.line2 ? address.line2 : ""}&addressLine3=${
            address.line3 ? address.line3 : ""
          }&country=${address.country.isocode}&city=${
            address.city ? address.city : ""
          }&state=${address.state ? address.state : ""}&pincode=${
            address.postalCode
          }&cardSaved=true&deviceInfo=${deviceInfo}&networkInfo=${networkType}|&browserInfo=${browserName}|${fullVersion}&platform=11&appVersion=&sameAsShipping=true&cartGuid=${cartId}&token=${token}&isPwa=true&platformNumber=${PLAT_FORM_NUMBER}&juspayUrl=${encodeURIComponent(
            jusPayUrl
          )}&bankName=${
            bankName ? bankName : ""
          }&paymentMode=${currentSelectedPaymentMode}&childPaymentMode=${childPaymentMode}&emiTenure=${emiTenure}&channel=${CHANNEL}&isUpdatedPwa=true${
            whatsappNotification ? "&whatsapp=true" : ""
          }`,
          productItems
        );
      } else {
        result = await api.post(
          `${USER_CART_PATH}/${
            JSON.parse(userDetails).userName
          }/createJuspayOrder?access_token=${
            JSON.parse(customerCookie).access_token
          }&firstName=${address.firstName}&lastName=${
            address.lastName
          }&addressLine1=${
            address.line1 ? encodeURIComponent(address.line1) : ""
          }&addressLine2=${address.line2 ? address.line2 : ""}&addressLine3=${
            address.line3 ? address.line3 : ""
          }&country=${address.country.isocode}&city=${
            address.city ? address.city : ""
          }&state=${address.state ? address.state : ""}&pincode=${
            address.postalCode
          }&cardSaved=true&deviceInfo=${deviceInfo}&networkInfo=${networkType}|&browserInfo=${browserName}|${fullVersion}&platform=11&appVersion=&sameAsShipping=true&cartGuid=${cartId}&token=${token}&isPwa=true&platformNumber=${PLAT_FORM_NUMBER}&juspayUrl=${encodeURIComponent(
            jusPayUrl
          )}&bankName=${
            bankName ? bankName : ""
          }&paymentMode=${currentSelectedPaymentMode}&childPaymentMode=${childPaymentMode}&emiTenure=${emiTenure}&channel=${CHANNEL}&isUpdatedPwa=true${
            whatsappNotification ? "&whatsapp=true" : ""
          }`,
          cartItem
        );
      }
      const resultJson = await result.json();

      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        if (
          resultJson.errorCode === ERROR_CODE_FOR_BANK_OFFER_INVALID_1 ||
          resultJson.errorCode === ERROR_CODE_FOR_BANK_OFFER_INVALID_2
        ) {
          dispatch(createJusPayOrderFailure(INVALID_COUPON_ERROR_MESSAGE));
          return dispatch(
            showModal(INVALID_BANK_COUPON_POPUP, {
              result: resultJson
            })
          );
        } else {
          dispatch(displayToast("Please Retry."));
          throw new Error(resultJson.message);
        }
      }
      dispatch(
        jusPayPaymentMethodType(
          resultJson.juspayOrderId,
          cardDetails,
          paymentMode
        )
      );
    } catch (e) {
      dispatch(createJusPayOrderFailure(e.message));
    }
  };
}

export function createJusPayOrderForGiftCard(
  token,
  cardDetails,
  paymentMode,
  guId
) {
  let browserName = browserAndDeviceDetails.getBrowserAndDeviceDetails(1);
  let fullVersion = browserAndDeviceDetails.getBrowserAndDeviceDetails(2);
  let deviceInfo = browserAndDeviceDetails.getBrowserAndDeviceDetails(3);
  let networkType = browserAndDeviceDetails.getBrowserAndDeviceDetails(4);
  const jusPayUrl = `${window.location.origin}/checkout/payment-method/cardPayment`;
  let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
  let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
  const currentSelectedPaymentMode = localStorage.getItem(PAYMENT_MODE_TYPE);
  const bankName = localStorage.getItem(SELECTED_BANK_NAME);
  let whatsappNotification = Cookie.getCookie(WHATSAPP_NOTIFICATION);
  return async (dispatch, getState, { api }) => {
    dispatch(createJusPayOrderRequest());
    try {
      const result = await api.post(
        `${USER_CART_PATH}/${
          JSON.parse(userDetails).userName
        }/createJuspayOrder?access_token=${
          JSON.parse(customerCookie).access_token
        }&firstName=&lastName=&addressLine1=&addressLine2=&addressLine3=&country=&city=&state=&pincode=&cardSaved=true&deviceInfo=${deviceInfo}&networkInfo=${networkType}|&browserInfo=${browserName}|${fullVersion}&platform=11&appVersion=&sameAsShipping=true&cartGuid=${guId}&token=${token}&isPwa=true&platformNumber=${PLAT_FORM_NUMBER}&juspayUrl=${encodeURIComponent(
          jusPayUrl
        )}&paymentMode=${currentSelectedPaymentMode}&bankName=${
          bankName ? bankName : ""
        }&channel=${CHANNEL}&isUpdatedPwa=true${
          whatsappNotification ? "&whatsapp=true" : ""
        }`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      dispatch(
        jusPayPaymentMethodTypeForGiftCard(
          resultJson.juspayOrderId,
          cardDetails,
          paymentMode,
          guId
        )
      );
    } catch (e) {
      dispatch(createJusPayOrderFailure(e.message));
    }
  };
}

export function createJusPayOrderForNetBanking(
  paymentMethodType,
  cartItem,
  bankCode,
  pinCode,
  isFromRetryUrl,
  retryCartGuid,
  bankName,
  isPaymentFailed
) {
  let browserName = browserAndDeviceDetails.getBrowserAndDeviceDetails(1);
  let fullVersion = browserAndDeviceDetails.getBrowserAndDeviceDetails(2);
  let deviceInfo = browserAndDeviceDetails.getBrowserAndDeviceDetails(3);
  let networkType = browserAndDeviceDetails.getBrowserAndDeviceDetails(4);
  const jusPayUrl = `${window.location.origin}/checkout/payment-method/cardPayment`;
  let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
  let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
  let cartDetails = Cookie.getCookie(CART_DETAILS_FOR_LOGGED_IN_USER);
  let whatsappNotification = Cookie.getCookie(WHATSAPP_NOTIFICATION);
  let cartId;
  const parsedQueryString = queryString.parse(window.location.search);
  if (parsedQueryString.value) {
    cartId = parsedQueryString.value;
  } else {
    if (isFromRetryUrl) {
      cartId = retryCartGuid;
    } else {
      cartId = cartDetails
        ? JSON.parse(cartDetails).guid
        : Cookie.getCookie(OLD_CART_GU_ID);
    }
  }
  let currentSelectedPaymentMode = localStorage.getItem(PAYMENT_MODE_TYPE);
  let firstName = "";
  if (currentSelectedPaymentMode === PAYPAL) {
    currentSelectedPaymentMode = "Netbanking";
    firstName = "NB_PAYPAL";
  }
  return async (dispatch, getState, { api }) => {
    dispatch(createJusPayOrderRequest());
    let productItems = "";
    if (isFromRetryUrl && !isPaymentFailed) {
      productItems = getValidDeliveryModeDetails(
        getState().cart.getUserAddressAndDeliveryModesByRetryPayment.products,
        true,
        getState().cart.getUserAddressAndDeliveryModesByRetryPayment
      );
    }
    try {
      let result = "";
      if (isFromRetryUrl && !isPaymentFailed) {
        result = await api.post(
          `${USER_CART_PATH}/${
            JSON.parse(userDetails).userName
          }/createJuspayOrder?state=&addressLine2=&lastName=&firstName=${firstName}&bankName=${bankName}&addressLine3=&sameAsShipping=true&cardSaved=false&deviceInfo=${deviceInfo}&networkInfo=${networkType}|&browserInfo=${browserName}|${fullVersion}&platform=11&appVersion=&cardFingerPrint=&platformNumber=${PLAT_FORM_NUMBER}&pincode=${pinCode}&city=&cartGuid=${cartId}&token=&cardRefNo=&country=&addressLine1=&access_token=${
            JSON.parse(customerCookie).access_token
          }&juspayUrl=${encodeURIComponent(
            jusPayUrl
          )}&paymentMode=${currentSelectedPaymentMode}&isPwa=true&channel=${CHANNEL}&isUpdatedPwa=true${
            whatsappNotification ? "&whatsapp=true" : ""
          }`,
          productItems
        );
      } else {
        result = await api.post(
          `${USER_CART_PATH}/${
            JSON.parse(userDetails).userName
          }/createJuspayOrder?state=&addressLine2=&lastName=&firstName=${firstName}&bankName=${bankName}&addressLine3=&sameAsShipping=true&cardSaved=false&deviceInfo=${deviceInfo}&networkInfo=${networkType}|&browserInfo=${browserName}|${fullVersion}&platform=11&appVersion=&cardFingerPrint=&platformNumber=${PLAT_FORM_NUMBER}&pincode=${pinCode}&city=&cartGuid=${cartId}&token=&cardRefNo=&country=&addressLine1=&access_token=${
            JSON.parse(customerCookie).access_token
          }&juspayUrl=${encodeURIComponent(
            jusPayUrl
          )}&paymentMode=${currentSelectedPaymentMode}&isPwa=true&channel=${CHANNEL}&isUpdatedPwa=true${
            whatsappNotification ? "&whatsapp=true" : ""
          }`,
          cartItem
        );
      }
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        if (
          resultJson.errorCode === ERROR_CODE_FOR_BANK_OFFER_INVALID_1 ||
          resultJson.errorCode === ERROR_CODE_FOR_BANK_OFFER_INVALID_2
        ) {
          dispatch(createJusPayOrderFailure(INVALID_COUPON_ERROR_MESSAGE));
          return dispatch(
            showModal(INVALID_BANK_COUPON_POPUP, {
              result: resultJson
            })
          );
        } else {
          dispatch(displayToast("Please Retry."));
          throw new Error(resultJson.message);
        }
      }
      if (localStorage.getItem(PAYMENT_MODE_TYPE) === PAYPAL) {
        dispatch(
          jusPayPaymentMethodTypeForPaypal(
            paymentMethodType,
            resultJson.juspayOrderId,
            bankCode
          )
        );
      } else {
        dispatch(
          jusPayPaymentMethodTypeForNetBanking(
            paymentMethodType,
            resultJson.juspayOrderId,
            bankCode
          )
        );
      }
    } catch (e) {
      dispatch(createJusPayOrderFailure(e.message));
    }
  };
}

export function createJusPayOrderForGiftCardNetBanking(
  guId,
  bankCode,
  bankName
) {
  const jusPayUrl = `${window.location.origin}/checkout/payment-method/cardPayment`;
  let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
  let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
  const currentSelectedPaymentMode = localStorage.getItem(PAYMENT_MODE_TYPE);
  let whatsappNotification = Cookie.getCookie(WHATSAPP_NOTIFICATION);
  return async (dispatch, getState, { api }) => {
    dispatch(createJusPayOrderRequest());

    try {
      const result = await api.post(
        `${USER_CART_PATH}/${
          JSON.parse(userDetails).userName
        }/createJuspayOrder?state=&addressLine2=&lastName=&firstName=&bankName=${bankName}&addressLine3=&sameAsShipping=true&cardSaved=false&cardFingerPrint=&platformNumber=${PLAT_FORM_NUMBER}&pincode=&city=&cartGuid=${guId}&token=&cardRefNo=&country=&addressLine1=&access_token=${
          JSON.parse(customerCookie).access_token
        }&juspayUrl=${encodeURIComponent(
          jusPayUrl
        )}&paymentMode=${currentSelectedPaymentMode}&isPwa=true&channel=${CHANNEL}&isUpdatedPwa=true${
          whatsappNotification ? "&whatsapp=true" : ""
        }`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      dispatch(
        jusPayPaymentMethodTypeForGiftCardNetBanking(
          resultJson.juspayOrderId,
          bankCode,
          guId
        )
      );
    } catch (e) {
      dispatch(createJusPayOrderFailure(e.message));
    }
  };
}

export function createJusPayOrderForSavedCards(
  cardDetails,
  cartItemObj,
  isPaymentFailed,
  isFromRetryUrl,
  retryCartGuid
) {
  let browserName = browserAndDeviceDetails.getBrowserAndDeviceDetails(1);
  let fullVersion = browserAndDeviceDetails.getBrowserAndDeviceDetails(2);
  let deviceInfo = browserAndDeviceDetails.getBrowserAndDeviceDetails(3);
  let networkType = browserAndDeviceDetails.getBrowserAndDeviceDetails(4);
  let cartItem = cartItemObj;
  const jusPayUrl = `${window.location.origin}/checkout/multi/payment-method/cardPayment`;
  let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
  let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
  let whatsappNotification = Cookie.getCookie(WHATSAPP_NOTIFICATION);
  let cartId;
  if (isPaymentFailed) {
    let url = queryString.parse(window.location.search);
    cartId = url && url.value ? url.value : Cookie.getCookie(OLD_CART_GU_ID);
  } else {
    if (isFromRetryUrl) {
      cartId = retryCartGuid;
    } else {
      let cartDetails = Cookie.getCookie(CART_DETAILS_FOR_LOGGED_IN_USER);
      cartId = cartDetails
        ? JSON.parse(cartDetails).guid
        : Cookie.getCookie(OLD_CART_GU_ID);
    }
  }
  const currentSelectedPaymentMode = localStorage.getItem(PAYMENT_MODE_TYPE);
  const bankName = localStorage.getItem(SELECTED_BANK_NAME);
  return async (dispatch, getState, { api }) => {
    dispatch(createJusPayOrderRequest());
    let productItems = "";
    if (isFromRetryUrl && !isPaymentFailed) {
      productItems = getValidDeliveryModeDetails(
        getState().cart.getUserAddressAndDeliveryModesByRetryPayment.products,
        true,
        getState().cart.getUserAddressAndDeliveryModesByRetryPayment
      );
    }
    try {
      let result = "";
      if (isFromRetryUrl && !isPaymentFailed) {
        result = await api.post(
          `${USER_CART_PATH}/${
            JSON.parse(userDetails).userName
          }/createJuspayOrder?state=&addressLine2=&lastName=&firstName=&addressLine3=&sameAsShipping=null&cardSaved=false&deviceInfo=${deviceInfo}&networkInfo=${networkType}|&browserInfo=${browserName}|${fullVersion}&platform=11&appVersion=&cardFingerPrint=${
            cardDetails.cardFingerprint
          }&platformNumber=${PLAT_FORM_NUMBER}&pincode=${localStorage.getItem(
            DEFAULT_PIN_CODE_LOCAL_STORAGE
          )}&city=&cartGuid=${cartId}&token=&cardRefNo=${
            cardDetails.cardReferenceNumber
          }&country=&addressLine1=&access_token=${
            JSON.parse(customerCookie).access_token
          }&juspayUrl=${encodeURIComponent(
            jusPayUrl
          )}&paymentMode=${currentSelectedPaymentMode}&bankName=${
            bankName ? bankName : ""
          }&isPwa=true&channel=${CHANNEL}&isUpdatedPwa=true${
            whatsappNotification ? "&whatsapp=true" : ""
          }`,
          productItems
        );
      } else {
        result = await api.post(
          `${USER_CART_PATH}/${
            JSON.parse(userDetails).userName
          }/createJuspayOrder?state=&addressLine2=&lastName=&firstName=&addressLine3=&sameAsShipping=null&cardSaved=false&deviceInfo=${deviceInfo}&networkInfo=${networkType}|&browserInfo=${browserName}|${fullVersion}&platform=11&appVersion=&cardFingerPrint=${
            cardDetails.cardFingerprint
          }&platformNumber=${PLAT_FORM_NUMBER}&pincode=${localStorage.getItem(
            DEFAULT_PIN_CODE_LOCAL_STORAGE
          )}&city=&cartGuid=${cartId}&token=&cardRefNo=${
            cardDetails.cardReferenceNumber
          }&country=&addressLine1=&access_token=${
            JSON.parse(customerCookie).access_token
          }&juspayUrl=${encodeURIComponent(
            jusPayUrl
          )}&paymentMode=${currentSelectedPaymentMode}&bankName=${
            bankName ? bankName : ""
          }&isPwa=true&channel=${CHANNEL}&isUpdatedPwa=true${
            whatsappNotification ? "&whatsapp=true" : ""
          }`,
          cartItem
        );
      }
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        if (
          resultJson.errorCode === ERROR_CODE_FOR_BANK_OFFER_INVALID_1 ||
          resultJson.errorCode === ERROR_CODE_FOR_BANK_OFFER_INVALID_2
        ) {
          dispatch(createJusPayOrderFailure(INVALID_COUPON_ERROR_MESSAGE));
          return dispatch(
            showModal(INVALID_BANK_COUPON_POPUP, {
              result: resultJson
            })
          );
        } else {
          dispatch(displayToast("Please Retry."));
          throw new Error(resultJson.message);
        }
      }
      dispatch(
        jusPayPaymentMethodTypeForSavedCards(
          resultJson.juspayOrderId,
          cardDetails
        )
      );
    } catch (e) {
      dispatch(createJusPayOrderFailure(e.message));
    }
  };
}

export function createJusPayOrderForGiftCardFromSavedCards(cardDetails, guId) {
  let browserName = browserAndDeviceDetails.getBrowserAndDeviceDetails(1);
  let fullVersion = browserAndDeviceDetails.getBrowserAndDeviceDetails(2);
  let deviceInfo = browserAndDeviceDetails.getBrowserAndDeviceDetails(3);
  let networkType = browserAndDeviceDetails.getBrowserAndDeviceDetails(4);
  const jusPayUrl = `${window.location.origin}/checkout/payment-method/cardPayment`;
  let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
  let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
  const currentSelectedPaymentMode = localStorage.getItem(PAYMENT_MODE_TYPE);
  const bankName = localStorage.getItem(SELECTED_BANK_NAME);
  let whatsappNotification = Cookie.getCookie(WHATSAPP_NOTIFICATION);
  return async (dispatch, getState, { api }) => {
    dispatch(createJusPayOrderRequest());
    try {
      const result = await api.post(
        `${USER_CART_PATH}/${
          JSON.parse(userDetails).userName
        }/createJuspayOrder?state=&addressLine2=&lastName=&firstName=&addressLine3=&sameAsShipping=null&cardSaved=false&deviceInfo=${deviceInfo}&networkInfo=${networkType}|&browserInfo=${browserName}|${fullVersion}&platform=11&appVersion=&cardFingerPrint=${
          cardDetails.cardFingerprint
        }&platformNumber=${PLAT_FORM_NUMBER}&pincode=${localStorage.getItem(
          DEFAULT_PIN_CODE_LOCAL_STORAGE
        )}&city=&cartGuid=${guId}&token=&cardRefNo=${
          cardDetails.cardReferenceNumber
        }&country=&addressLine1=&access_token=${
          JSON.parse(customerCookie).access_token
        }&juspayUrl=${encodeURIComponent(
          jusPayUrl
        )}&paymentMode=${currentSelectedPaymentMode}&bankName=${
          bankName ? bankName : ""
        }&isPwa=true&channel=${CHANNEL}&isUpdatedPwa=true${
          whatsappNotification ? "&whatsapp=true" : ""
        }`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      dispatch(
        jusPayPaymentMethodTypeForGiftCardFromSavedCards(
          resultJson.juspayOrderId,
          cardDetails,
          guId
        )
      );
    } catch (e) {
      dispatch(createJusPayOrderFailure(e.message));
    }
  };
}

export function createJusPayOrderForCliqCash(
  pinCode,
  cartItemObj,
  isPaymentFailed = false
) {
  let cartItem;
  let browserName = browserAndDeviceDetails.getBrowserAndDeviceDetails(1);
  let fullVersion = browserAndDeviceDetails.getBrowserAndDeviceDetails(2);
  let deviceInfo = browserAndDeviceDetails.getBrowserAndDeviceDetails(3);
  let networkType = browserAndDeviceDetails.getBrowserAndDeviceDetails(4);
  if (localStorage.getItem(CART_ITEM_COOKIE)) {
    cartItem = JSON.parse(localStorage.getItem(CART_ITEM_COOKIE));
  } else {
    cartItem = cartItemObj;
    localStorage.setItem(CART_ITEM_COOKIE, JSON.stringify(cartItem));
  }

  const jusPayUrl = `${window.location.origin}/checkout/payment-method/cardPayment`;
  let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
  let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
  let whatsappNotification = Cookie.getCookie(WHATSAPP_NOTIFICATION);
  let cartId;
  if (isPaymentFailed) {
    let url = queryString.parse(window.location.search);
    cartId = url && url.value ? url.value : Cookie.getCookie(OLD_CART_GU_ID);
  } else {
    let cartDetails = Cookie.getCookie(CART_DETAILS_FOR_LOGGED_IN_USER);
    cartId = JSON.parse(cartDetails).guid;
  }
  return async (dispatch, getState, { api }) => {
    dispatch(createJusPayOrderRequest());

    try {
      const result = await api.post(
        `${USER_CART_PATH}/${
          JSON.parse(userDetails).userName
        }/createJuspayOrder?state=&addressLine2=&lastName=&firstName=&addressLine3=&sameAsShipping=true&cardSaved=false&deviceInfo=${deviceInfo}&networkInfo=${networkType}|&browserInfo=${browserName}|${fullVersion}&platform=11&appVersion=&bankName=&cardFingerPrint=&platformNumber=${PLAT_FORM_NUMBER}&pincode=${pinCode}&city=&cartGuid=${cartId}&token=&cardRefNo=&country=&addressLine1=&access_token=${
          JSON.parse(customerCookie).access_token
        }&juspayUrl=${encodeURIComponent(
          jusPayUrl
        )}&paymentMode=${CLIQ_CASH}&isPwa=true&channel=${CHANNEL}&isUpdatedPwa=true${
          whatsappNotification ? "&whatsapp=true" : ""
        }`,
        cartItem
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        if (
          resultJson.errorCode === ERROR_CODE_FOR_BANK_OFFER_INVALID_1 ||
          resultJson.errorCode === ERROR_CODE_FOR_BANK_OFFER_INVALID_2
        ) {
          dispatch(createJusPayOrderFailure(INVALID_COUPON_ERROR_MESSAGE));
          return dispatch(
            showModal(INVALID_BANK_COUPON_POPUP, {
              result: resultJson
            })
          );
        } else {
          dispatch(displayToast("Please Retry."));
          throw new Error(resultJson.message);
        }
      }

      dispatch(createJusPayOrderSuccessForCliqCash(resultJson));
      dispatch(setBagCount(0));
      localStorage.setItem(
        ORDER_ID_FOR_ORDER_CONFIRMATION_PAGE,
        resultJson.orderId
      );
      localStorage.setItem(CART_BAG_DETAILS, []);

      dispatch(generateCartIdAfterOrderPlace());
    } catch (e) {
      dispatch(createJusPayOrderFailure(e.message));
    }
  };
}

export function updateTransactionDetailsRequest() {
  return {
    type: UPDATE_TRANSACTION_DETAILS_REQUEST,
    status: REQUESTING
  };
}

export function updateTransactionDetailsSuccess(transactionDetails) {
  return {
    type: UPDATE_TRANSACTION_DETAILS_SUCCESS,
    status: SUCCESS,
    transactionDetails
  };
}

export function updateTransactionDetailsFailure(error) {
  return {
    type: UPDATE_TRANSACTION_DETAILS_FAILURE,
    status: ERROR,
    error
  };
}

export function jusPayPaymentMethodTypeRequest() {
  return {
    type: JUS_PAY_PAYMENT_METHOD_TYPE_REQUEST,
    status: REQUESTING
  };
}

export function jusPayPaymentMethodTypeSuccess(justPayPaymentDetails) {
  // Here we need to dispatch an action to cre
  return {
    type: JUS_PAY_PAYMENT_METHOD_TYPE_SUCCESS,
    status: SUCCESS,
    justPayPaymentDetails
  };
}

export function jusPayPaymentMethodTypeForGiftCardSuccess(
  justPayPaymentDetails,
  guId
) {
  // Here we need to dispatch an action to cre
  return {
    type: JUS_PAY_PAYMENT_METHOD_TYPE_FOR_GIFT_CARD_SUCCESS,
    status: SUCCESS,
    justPayPaymentDetails,
    guId
  };
}

export function jusPayPaymentMethodTypeFailure(error) {
  return {
    type: JUS_PAY_PAYMENT_METHOD_TYPE_FAILURE,
    status: ERROR,
    error: ERROR_MESSAGE_FOR_CREATE_JUS_PAY_CALL
  };
}

export function jusPayPaymentMethodTypeForGiftCard(
  juspayOrderId,
  cardDetails,
  paymentMode,
  guId
) {
  return async (dispatch, getState, { api }) => {
    dispatch(jusPayPaymentMethodTypeRequest());
    try {
      let cardObject = new FormData();
      cardObject.append("payment_method_type", "CARD");
      cardObject.append("redirect_after_payment", "true");
      cardObject.append("format", "json");
      cardObject.append("card_exp_month", cardDetails.monthValue);
      cardObject.append("card_exp_year", cardDetails.yearValue);
      cardObject.append("card_number", cardDetails.cardNumber);
      cardObject.append("card_security_code", cardDetails.cvvNumber);
      cardObject.append("merchant_id", getState().cart.paymentModes.merchantID);
      cardObject.append("name_on_card", cardDetails.cardName);
      cardObject.append("order_id", juspayOrderId);
      cardObject.append("save_to_locker", true);
      if (
        cardDetails.is_emi &&
        (localStorage.getItem(NO_COST_EMI_COUPON) ||
          localStorage.getItem(EMI_TYPE) === STANDARD_EMI)
      ) {
        cardObject.append("emi_bank", cardDetails.emi_bank);
        cardObject.append("emi_tenure", cardDetails.emi_tenure);
        cardObject.append("is_emi", cardDetails.is_emi);
      }
      const result = await api.postJusPay(`txns?`, cardObject);
      const resultJson = await result.json();

      if (
        resultJson.status === JUS_PAY_PENDING ||
        resultJson.status === SUCCESS ||
        resultJson.status === SUCCESS_CAMEL_CASE ||
        resultJson.status === SUCCESS_UPPERCASE ||
        resultJson.status === JUS_PAY_CHARGED
      ) {
        dispatch(jusPayPaymentMethodTypeForGiftCardSuccess(resultJson, guId));
      } else {
        throw new Error(resultJson.error_message);
      }
    } catch (e) {
      dispatch(jusPayPaymentMethodTypeFailure(e.message));
    }
  };
}

// Action Creator to JusPay Payment Method Type
export function jusPayPaymentMethodType(
  juspayOrderId,
  cardDetails,
  paymentMode
) {
  return async (dispatch, getState, { api }) => {
    dispatch(jusPayPaymentMethodTypeRequest());
    try {
      let cardObject = new FormData();
      cardObject.append("payment_method_type", "CARD");
      cardObject.append("redirect_after_payment", "true");
      cardObject.append("format", "json");
      cardObject.append("card_exp_month", cardDetails.monthValue);
      cardObject.append("card_exp_year", cardDetails.yearValue);
      cardObject.append("card_number", cardDetails.cardNumber);
      cardObject.append("card_security_code", cardDetails.cvvNumber);
      cardObject.append("merchant_id", getState().cart.paymentModes.merchantID);
      cardObject.append("name_on_card", cardDetails.cardName);
      cardObject.append("order_id", juspayOrderId);
      cardObject.append("save_to_locker", true);
      if (
        cardDetails.is_emi &&
        (localStorage.getItem(NO_COST_EMI_COUPON) ||
          localStorage.getItem(EMI_TYPE) === STANDARD_EMI)
      ) {
        cardObject.append("emi_bank", cardDetails.emi_bank);
        cardObject.append("emi_tenure", cardDetails.emi_tenure);
        cardObject.append("is_emi", cardDetails.is_emi);
      }

      const result = await api.postJusPay(`txns?`, cardObject);
      const resultJson = await result.json();

      if (
        resultJson.status === JUS_PAY_PENDING ||
        resultJson.status === SUCCESS ||
        resultJson.status === SUCCESS_CAMEL_CASE ||
        resultJson.status === SUCCESS_UPPERCASE ||
        resultJson.status === JUS_PAY_CHARGED
      ) {
        dispatch(jusPayPaymentMethodTypeSuccess(resultJson));
        dispatch(setBagCount(0));
        localStorage.setItem(CART_BAG_DETAILS, []);
        if (localStorage.getItem(EMI_TYPE)) {
          localStorage.removeItem(EMI_TYPE);
        }
        if (localStorage.getItem(EMI_TENURE)) {
          localStorage.removeItem(EMI_TENURE);
        }
        // if (localStorage.getItem(NO_COST_EMI_COUPON)) {
        //   localStorage.removeItem(NO_COST_EMI_COUPON);
        // }
        dispatch(generateCartIdAfterOrderPlace());
      } else {
        throw new Error(resultJson.error_message);
      }
    } catch (e) {
      dispatch(jusPayPaymentMethodTypeFailure(e.message));
    }
  };
}

export function jusPayPaymentMethodTypeForSavedCards(
  juspayOrderId,
  cardDetails
) {
  return async (dispatch, getState, { api }) => {
    dispatch(jusPayPaymentMethodTypeRequest());
    let cardObject = new FormData();
    cardObject.append("payment_method_type", "CARD");
    cardObject.append("redirect_after_payment", "true");
    cardObject.append("format", "json");
    cardObject.append("card_security_code", cardDetails.cvvNumber);
    cardObject.append("merchant_id", getState().cart.paymentModes.merchantID);
    cardObject.append("card_token", cardDetails.cardToken);
    cardObject.append("order_id", juspayOrderId);
    try {
      const result = await api.postJusPay(`txns?`, cardObject);
      const resultJson = await result.json();
      if (
        resultJson.status === JUS_PAY_PENDING ||
        resultJson.status === SUCCESS ||
        resultJson.status === SUCCESS_CAMEL_CASE ||
        resultJson.status === SUCCESS_UPPERCASE ||
        resultJson.status === JUS_PAY_CHARGED
      ) {
        dispatch(jusPayPaymentMethodTypeSuccess(resultJson));
        dispatch(setBagCount(0));
        localStorage.setItem(CART_BAG_DETAILS, []);

        dispatch(generateCartIdAfterOrderPlace());
      } else {
        throw new Error(resultJson.error_message);
      }
    } catch (e) {
      dispatch(jusPayPaymentMethodTypeFailure(e.message));
    }
  };
}

export function jusPayPaymentMethodTypeForGiftCardFromSavedCards(
  juspayOrderId,
  cardDetails,
  guId
) {
  return async (dispatch, getState, { api }) => {
    let cardObject = new FormData();
    cardObject.append("payment_method_type", "CARD");
    cardObject.append("redirect_after_payment", "true");
    cardObject.append("format", "json");
    cardObject.append("card_security_code", cardDetails.cvvNumber);
    cardObject.append("merchant_id", getState().cart.paymentModes.merchantID);
    cardObject.append("card_token", cardDetails.cardToken);
    cardObject.append("order_id", juspayOrderId);
    dispatch(jusPayPaymentMethodTypeRequest());

    try {
      const result = await api.postJusPay(`txns?`, cardObject);
      const resultJson = await result.json();

      if (
        resultJson.status === JUS_PAY_PENDING ||
        resultJson.status === SUCCESS ||
        resultJson.status === SUCCESS_CAMEL_CASE ||
        resultJson.status === SUCCESS_UPPERCASE ||
        resultJson.status === JUS_PAY_CHARGED
      ) {
        dispatch(jusPayPaymentMethodTypeForGiftCardSuccess(resultJson, guId));
      } else {
        throw new Error(resultJson.error_message);
      }
    } catch (e) {
      dispatch(jusPayPaymentMethodTypeFailure(e.message));
    }
  };
}

export function jusPayPaymentMethodTypeForNetBanking(
  paymentMethodType,
  juspayOrderId,
  bankName
) {
  return async (dispatch, getState, { api }) => {
    let cardObject = new FormData();
    cardObject.append("payment_method_type", paymentMethodType);
    cardObject.append("redirect_after_payment", "true");
    cardObject.append("format", "json");
    cardObject.append("merchant_id", getState().cart.paymentModes.merchantID);
    cardObject.append("order_id", juspayOrderId);
    cardObject.append("payment_method", bankName);
    dispatch(jusPayPaymentMethodTypeRequest());
    dispatch(jusPayPaymentMethodTypeRequest());
    try {
      const result = await api.postJusPay(`txns?`, cardObject);
      const resultJson = await result.json();
      if (
        resultJson.status === JUS_PAY_PENDING ||
        resultJson.status === SUCCESS ||
        resultJson.status === SUCCESS_CAMEL_CASE ||
        resultJson.status === SUCCESS_UPPERCASE ||
        resultJson.status === JUS_PAY_CHARGED
      ) {
        dispatch(jusPayPaymentMethodTypeSuccess(resultJson));
        dispatch(setBagCount(0));
        localStorage.setItem(CART_BAG_DETAILS, []);
        dispatch(generateCartIdAfterOrderPlace());
      } else {
        throw new Error(resultJson.error_message);
      }
    } catch (e) {
      dispatch(jusPayPaymentMethodTypeFailure(e.message));
    }
  };
}
export function jusPayPaymentMethodTypeForPaypal(
  paymentMethodType,
  juspayOrderId,
  bankName
) {
  return async (dispatch, getState, { api }) => {
    const params = {
      payment_method_type: WALLET,
      redirect_after_payment: "true",
      format: "json",
      merchant_id: getState().cart.paymentModes.merchantID,
      order_id: juspayOrderId,
      payment_method: "PAYPAL"
    };

    let cardObject = Object.keys(params)
      .map(key => {
        return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
      })
      .join("&");

    dispatch(jusPayPaymentMethodTypeRequest());
    dispatch(jusPayPaymentMethodTypeRequest());
    try {
      const result = await api.postJusPayUrlEncode(`txns?`, cardObject);
      const resultJson = await result.json();

      if (
        resultJson.status === JUS_PAY_PENDING ||
        resultJson.status === SUCCESS ||
        resultJson.status === SUCCESS_CAMEL_CASE ||
        resultJson.status === SUCCESS_UPPERCASE ||
        resultJson.status === JUS_PAY_CHARGED
      ) {
        dispatch(jusPayPaymentMethodTypeSuccess(resultJson));
        dispatch(setBagCount(0));
        localStorage.setItem(CART_BAG_DETAILS, []);
        // dispatch(generateCartIdForLoggedInUser());
      } else {
        throw new Error(resultJson.error_message);
      }
    } catch (e) {
      dispatch(jusPayPaymentMethodTypeFailure(e.message));
    }
  };
}

export function jusPayPaymentMethodTypeForInstaCred(
  paymentMethodType,
  juspayOrderId,
  bankName
) {
  // Mobile number will be activated with "Consumer Finance flow".
  //let phone = localStorage.getItem('phone');
  return async (dispatch, getState, { api }) => {
    const params = {
      payment_method_type: "NB",
      redirect_after_payment: "true",
      format: "json",
      merchant_id: getState().cart.paymentModes.merchantID,
      order_id: juspayOrderId,
      payment_method: "NB_INSTACRED"
      // Mobile number will be activated with "Consumer Finance flow".
      // mobile_number:phone
    };
    localStorage.removeItem("phone");
    let cardObject = Object.keys(params)
      .map(key => {
        return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
      })
      .join("&");
    dispatch(jusPayPaymentMethodTypeRequest());
    dispatch(jusPayPaymentMethodTypeRequest());
    try {
      const result = await api.postJusPayUrlEncode(`txns?`, cardObject);
      const resultJson = await result.json();
      if (
        resultJson.status === JUS_PAY_PENDING ||
        resultJson.status === SUCCESS ||
        resultJson.status === SUCCESS_CAMEL_CASE ||
        resultJson.status === SUCCESS_UPPERCASE ||
        resultJson.status === JUS_PAY_CHARGED
      ) {
        dispatch(jusPayPaymentMethodTypeSuccess(resultJson));
        dispatch(setBagCount(0));
        localStorage.setItem(CART_BAG_DETAILS, []);
        dispatch(generateCartIdForLoggedInUser());
      } else {
        throw new Error(resultJson.error_message);
      }
    } catch (e) {
      dispatch(jusPayPaymentMethodTypeFailure(e.message));
    }
  };
}

export function jusPayPaymentMethodTypeForGiftCardNetBanking(
  juspayOrderId,
  bankName,
  guId
) {
  return async (dispatch, getState, { api }) => {
    let cardObject = new FormData();
    cardObject.append("payment_method_type", "NB");
    cardObject.append("redirect_after_payment", "true");
    cardObject.append("format", "json");
    cardObject.append("merchant_id", getState().cart.paymentModes.merchantID);
    cardObject.append("order_id", juspayOrderId);
    cardObject.append("payment_method", bankName);
    dispatch(jusPayPaymentMethodTypeRequest());
    try {
      const result = await api.postJusPay(`txns?`, cardObject);
      const resultJson = await result.json();

      if (
        resultJson.status === JUS_PAY_PENDING ||
        resultJson.status === SUCCESS ||
        resultJson.status === SUCCESS_CAMEL_CASE ||
        resultJson.status === SUCCESS_UPPERCASE ||
        resultJson.status === JUS_PAY_CHARGED
      ) {
        dispatch(jusPayPaymentMethodTypeForGiftCardSuccess(resultJson, guId));
      } else {
        throw new Error(resultJson.error_message);
      }
    } catch (e) {
      dispatch(jusPayPaymentMethodTypeFailure(e.message));
    }
  };
}

// Action Creator to update Transaction Details
export function updateTransactionDetails(paymentMode, juspayOrderID, cartId) {
  let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
  let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);

  return async (dispatch, getState, { api }) => {
    let paymentObject = new FormData();
    if (paymentMode === PAYPAL) {
      paymentObject.append("paymentMode", NET_BANKING_PAYMENT_MODE);
    } else {
      paymentObject.append("paymentMode", paymentMode);
    }
    paymentObject.append("juspayOrderID", juspayOrderID);
    paymentObject.append("cartGuid", cartId);

    dispatch(updateTransactionDetailsRequest());
    try {
      const result = await api.postFormData(
        `${USER_CART_PATH}/${
          JSON.parse(userDetails).userName
        }/payments/updateTransactionDetailsforCard?access_token=${
          JSON.parse(customerCookie).access_token
        }&platformNumber=${PLAT_FORM_NUMBER}&isPwa=true`,
        paymentObject
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        setDataLayerForOrderConfirmationDirectCalls(
          ADOBE_DIRECT_CALLS_FOR_ORDER_CONFIRMATION_FAILURE,
          {
            failureReason: resultJsonStatus.message,
            orderId: resultJson.orderId
          }
        );
        throw new Error(resultJsonStatus.message);
      }

      dispatch(updateTransactionDetailsSuccess(resultJson));
      dispatch(orderConfirmation(resultJson.orderId));
    } catch (e) {
      dispatch(updateTransactionDetailsFailure(e.message));
    }
  };
}

export function orderConfirmationRequest() {
  return {
    type: ORDER_CONFIRMATION_REQUEST,
    status: REQUESTING
  };
}

export function orderConfirmationSuccess(confirmedOrderDetails) {
  return {
    type: ORDER_CONFIRMATION_SUCCESS,
    status: SUCCESS,
    confirmedOrderDetails
  };
}

export function orderConfirmationFailure(error) {
  return {
    type: ORDER_CONFIRMATION_FAILURE,
    status: ERROR,
    error
  };
}

// Action Creator for Order Confirmation
export function orderConfirmation(orderId) {
  let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
  let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
  return async (dispatch, getState, { api }) => {
    dispatch(orderConfirmationRequest());
    try {
      const result = await api.get(
        `${USER_CART_PATH}/${
          JSON.parse(userDetails).userName
        }/orderConfirmation/${orderId}?access_token=${
          JSON.parse(customerCookie).access_token
        }&platformNumber=${PLAT_FORM_NUMBER}&isPwa=true&isMDE=true`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      setDataLayer(
        ADOBE_ORDER_CONFIRMATION,
        resultJson,
        getState().icid.value,
        getState().icid.icidType
      );

      setDataLayerForOrderConfirmationDirectCalls(
        ADOBE_DIRECT_CALLS_FOR_ORDER_CONFIRMATION_SUCCESS,
        resultJson.orderRefNo
      );

      await dispatch(orderConfirmationSuccess(resultJson));
      // calling minicart after placing an order
      // dispatch(getMinicartProducts());
    } catch (e) {
      dispatch(orderConfirmationFailure(e.message));
    }
  };
}

//get banner on order confirmation
export function orderConfirmationBannerRequest() {
  return {
    type: ORDER_CONFIRMATION_BANNER_REQUEST,
    status: REQUESTING
  };
}

export function orderConfirmationBannerSuccess(orderConfirmationBannerDetails) {
  return {
    type: ORDER_CONFIRMATION_BANNER_SUCCESS,
    status: SUCCESS,
    orderConfirmationBannerDetails
  };
}

export function orderConfirmationBannerFailure(error) {
  return {
    type: ORDER_CONFIRMATION_BANNER_FAILURE,
    status: ERROR,
    error
  };
}

export function orderConfirmationBanner(orderId) {
  return async (dispatch, getState, { api }) => {
    dispatch(orderConfirmationBannerRequest());
    try {
      const result = await api.customGetMiddlewareUrl(
        `/otatacliq/getApplicationProperties.json?propertyNames=ORDER_CONFIRMATION_WARRENTY_BANNER`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }

      return dispatch(orderConfirmationBannerSuccess(resultJson));
    } catch (e) {
      dispatch(orderConfirmationBannerFailure(e.message));
    }
  };
}

export function captureOrderExperienceRequest() {
  return {
    type: ORDER_EXPERIENCE_CAPTURE_REQUEST,
    status: REQUESTING
  };
}

export function captureOrderExperienceSuccess(orderExperience) {
  return {
    type: ORDER_EXPERIENCE_CAPTURE_SUCCESS,
    status: SUCCESS,
    orderExperience
  };
}

export function captureOrderExperienceFailure(error) {
  return {
    type: ORDER_EXPERIENCE_CAPTURE_FAILURE,
    status: ERROR,
    error
  };
}

export function clearCaptureOrderExperience() {
  return {
    type: CLEAR_ORDER_EXPERIENCE_CAPTURE
  };
}

// Action Creator for Order Confirmation
export function captureOrderExperience(orderId, rating) {
  let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
  let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
  return async (dispatch, getState, { api }) => {
    dispatch(captureOrderExperienceRequest());
    try {
      const result = await api.post(
        `${USER_CART_PATH}/${
          JSON.parse(userDetails).userName
        }/orderExperience/${orderId}?access_token=${
          JSON.parse(customerCookie).access_token
        }&ratings=${rating}`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }

      return dispatch(captureOrderExperienceSuccess(resultJson));
    } catch (e) {
      return dispatch(captureOrderExperienceFailure(e.message));
    }
  };
}

//Actions For get COD Eligibility
export function getCODEligibilityRequest() {
  return {
    type: GET_COD_ELIGIBILITY_REQUEST,
    status: REQUESTING
  };
}

export function getCODEligibilitySuccess(codEligibilityDetails) {
  return {
    type: GET_COD_ELIGIBILITY_SUCCESS,
    status: SUCCESS,
    codEligibilityDetails
  };
}

export function getCODEligibilityFailure(error) {
  return {
    type: GET_COD_ELIGIBILITY_FAILURE,
    status: ERROR,
    error
  };
}

//Actions creator for COD Eligibility
export function getCODEligibility(
  isPaymentFailed,
  isFromRetryUrl,
  retryCartGuid
) {
  const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
  const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
  let cartId;

  return async (dispatch, getState, { api }) => {
    if (isPaymentFailed) {
      let url = queryString.parse(window.location.search);
      cartId = url && url.value ? url.value : Cookie.getCookie(OLD_CART_GU_ID);
    } else {
      if (isFromRetryUrl) {
        cartId = retryCartGuid;
      } else {
        const cartDetails = Cookie.getCookie(CART_DETAILS_FOR_LOGGED_IN_USER);
        cartId =
          cartDetails && JSON.parse(cartDetails).guid
            ? JSON.parse(cartDetails).guid
            : null;
      }
    }
    dispatch(getCODEligibilityRequest());
    try {
      const result = await api.post(
        `${USER_CART_PATH}/${
          JSON.parse(userDetails).userName
        }/payments/getCODEligibility?access_token=${
          JSON.parse(customerCookie).access_token
        }&isPwa=true&platformNumber=${PLAT_FORM_NUMBER}&cartGuid=${cartId}`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      dispatch(getCODEligibilitySuccess(resultJson));
    } catch (e) {
      dispatch(getCODEligibilityFailure(e.message));
    }
  };
}

//Actions For bin Validation COD
export function binValidationForCODRequest() {
  return {
    type: BIN_VALIDATION_COD_REQUEST,
    status: REQUESTING
  };
}

export function binValidationForCODSuccess(binValidationCOD) {
  return {
    type: BIN_VALIDATION_COD_SUCCESS,
    status: SUCCESS,
    binValidationCOD
  };
}

export function binValidationForCODFailure(error) {
  return {
    type: BIN_VALIDATION_COD_FAILURE,
    status: ERROR,
    error
  };
}

// Action Creator to bin Validation For COD
export function binValidationForCOD(
  paymentMode,
  isFromRetryUrl,
  retryCartGuid
) {
  const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
  const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);

  const cartDetails = Cookie.getCookie(CART_DETAILS_FOR_LOGGED_IN_USER);
  const parsedQueryString = queryString.parse(window.location.search);
  let cartId;
  if (parsedQueryString.value) {
    cartId = parsedQueryString.value;
  }
  if (isFromRetryUrl) {
    cartId = retryCartGuid;
  } else {
    cartId = JSON.parse(cartDetails).guid;
  }
  return async (dispatch, getState, { api }) => {
    dispatch(binValidationForCODRequest());
    try {
      const result = await api.post(
        `${USER_CART_PATH}/${
          JSON.parse(userDetails).userName
        }/payments/binValidation?access_token=${
          JSON.parse(customerCookie).access_token
        }&isPwa=true&isUpdatedPwa=true&platformNumber=${PLAT_FORM_NUMBER}&paymentMode=${paymentMode}&cartGuid=${cartId}&binNo=&channel=${CHANNEL}`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        if (resultJson.errorCode === ERROR_CODE_FOR_BANK_OFFER_INVALID_3) {
          dispatch(applyBankOfferFailure(resultJsonStatus.message));
          return dispatch(
            showModal(VALIDATE_OFFERS_POPUP, {
              result: resultJson,
              offerType: OFFER_ERROR_PAYMENT_MODE_TYPE
            })
          );
        } else {
          throw new Error(resultJsonStatus.message);
        }
      }
      localStorage.setItem(SELECTED_BANK_NAME, "");
      dispatch(binValidationForCODSuccess(resultJson));
    } catch (e) {
      dispatch(binValidationForCODFailure(e.message));
    }
  };
}

export function updateTransactionDetailsForCODRequest() {
  return {
    type: UPDATE_TRANSACTION_DETAILS_FOR_COD_REQUEST,
    status: REQUESTING
  };
}

export function updateTransactionDetailsForCODSuccess(transactionDetails) {
  return {
    type: UPDATE_TRANSACTION_DETAILS_FOR_COD_SUCCESS,
    status: SUCCESS,
    transactionDetails
  };
}

export function updateTransactionDetailsForCODFailure(error) {
  return {
    type: UPDATE_TRANSACTION_DETAILS_FOR_COD_FAILURE,
    status: ERROR,
    error
  };
}

// Action Creator to update Transaction Details
export function updateTransactionDetailsForCOD(
  paymentMode,
  juspayOrderID,
  isFromRetryUrl,
  retryCartGuid
) {
  const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
  const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
  const cartDetails = Cookie.getCookie(CART_DETAILS_FOR_LOGGED_IN_USER);
  let whatsappNotification = Cookie.getCookie(WHATSAPP_NOTIFICATION);
  const parsedQueryString = queryString.parse(window.location.search);
  let cartId;
  if (parsedQueryString.value) {
    cartId = parsedQueryString.value;
  } else {
    if (isFromRetryUrl) {
      cartId = retryCartGuid;
    } else {
      cartId = JSON.parse(cartDetails).guid;
    }
  }
  return async (dispatch, getState, { api }) => {
    dispatch(updateTransactionDetailsForCODRequest());
    try {
      const result = await api.post(
        `${USER_CART_PATH}/${
          JSON.parse(userDetails).userName
        }/payments/updateTransactionDetailsforCOD?access_token=${
          JSON.parse(customerCookie).access_token
        }&platformNumber=${PLAT_FORM_NUMBER}&isPwa=true&paymentMode=${paymentMode}&juspayOrderID=${juspayOrderID}&cartGuid=${cartId}&channel=${CHANNEL}${
          whatsappNotification ? "&whatsapp=true" : ""
        }`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        if (
          resultJson.errorCode === ERROR_CODE_FOR_BANK_OFFER_INVALID_1 ||
          resultJson.errorCode === ERROR_CODE_FOR_BANK_OFFER_INVALID_2
        ) {
          dispatch(updateTransactionDetailsForCODFailure());

          return dispatch(
            showModal(INVALID_BANK_COUPON_POPUP, {
              result: resultJson
            })
          );
        } else {
          throw new Error(resultJsonStatus.message);
        }
      }
      dispatch(setBagCount(0));
      localStorage.setItem(
        ORDER_ID_FOR_ORDER_CONFIRMATION_PAGE,
        resultJson.orderId
      );

      dispatch(generateCartIdAfterOrderPlace());
      dispatch(orderConfirmation(resultJson.orderId));
      dispatch(updateTransactionDetailsForCODSuccess(resultJson));
    } catch (e) {
      dispatch(updateTransactionDetailsForCODFailure(e.message));
    }
  };
}

//Actions for soft reservation for COD Payment
export function softReservationForCODPaymentRequest() {
  return {
    type: SOFT_RESERVATION_FOR_COD_PAYMENT_REQUEST,
    status: REQUESTING
  };
}

export function softReservationForCODPaymentSuccess(softReserveCODPayment) {
  return {
    type: SOFT_RESERVATION_FOR_COD_PAYMENT_SUCCESS,
    status: SUCCESS,
    softReserveCODPayment
  };
}

export function softReservationForCODPaymentFailure(error) {
  return {
    type: SOFT_RESERVATION_FOR_COD_PAYMENT_FAILURE,
    status: ERROR,
    error
  };
}

// Action Creator to soft reservation For COD Payment
export function softReservationForCODPayment(pinCode) {
  const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
  const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
  return async (dispatch, getState, { api }) => {
    let productItems = await getValidDeliveryModeDetails(
      getState().cart.cartDetailsCNC.products
    );
    if (productItems) {
      localStorage.setItem(CART_ITEM_COOKIE, JSON.stringify(productItems));
    }
    const cartDetails = Cookie.getCookie(CART_DETAILS_FOR_LOGGED_IN_USER);
    const cartId = JSON.parse(cartDetails).guid;

    dispatch(softReservationForCODPaymentRequest());
    try {
      const result = await api.post(
        `${USER_CART_PATH}/${
          JSON.parse(userDetails).userName
        }/carts/softReservationForPayment?access_token=${
          JSON.parse(customerCookie).access_token
        }&cartGuid=${cartId}&pincode=${pinCode}`,
        productItems
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }

      setDataLayerForCheckoutDirectCalls(ADOBE_FINAL_PAYMENT_MODES);
      dispatch(updateTransactionDetailsForCOD(CASH_ON_DELIVERY, ""));
      dispatch(softReservationForCODPaymentSuccess(resultJson));
    } catch (e) {
      dispatch(softReservationForCODPaymentFailure(e.message));
    }
  };
}

export function eddInCommerceRequest() {
  return {
    type: EDD_IN_COMMERCE_REQUEST,
    status: REQUESTING
  };
}

export function eddInCommerceSuccess(eddDetails) {
  return {
    type: EDD_IN_COMMERCE_SUCCESS,
    status: SUCCESS,
    eddDetails
  };
}

export function eddInCommerceFailure(error) {
  return {
    type: EDD_IN_COMMERCE_FAILURE,
    status: ERROR,
    error
  };
}
export function eddInCommerce(reservationItem) {
  const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
  const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
  let pinCode = localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE);
  return async (dispatch, getState, { api }) => {
    const cartDetails = Cookie.getCookie(CART_DETAILS_FOR_LOGGED_IN_USER);
    const cartId = JSON.parse(cartDetails).code;

    dispatch(eddInCommerceRequest());
    try {
      const result = await api.post(
        `${USER_CART_PATH}/${
          JSON.parse(userDetails).userName
        }/carts/${cartId}/getEDD?access_token=${
          JSON.parse(customerCookie).access_token
        }&pincode=${pinCode}`,
        reservationItem
      );
      const resultJson = await result.json();

      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      dispatch(eddInCommerceSuccess(resultJson));
    } catch (e) {
      dispatch(eddInCommerceFailure(e.message));
    }
  };
}
// Action for remove Item from Cart Logged In
export function removeItemFromCartLoggedInRequest() {
  return {
    type: REMOVE_ITEM_FROM_CART_LOGGED_IN_REQUEST,
    status: REQUESTING
  };
}
export function removeItemFromCartLoggedInSuccess() {
  return {
    type: REMOVE_ITEM_FROM_CART_LOGGED_IN_SUCCESS,
    status: SUCCESS
  };
}

export function removeItemFromCartLoggedInFailure(error) {
  return {
    type: REMOVE_ITEM_FROM_CART_LOGGED_IN_FAILURE,
    status: ERROR,
    error
  };
}

// Action Creator for remove Item from Cart Logged In
export function removeItemFromCartLoggedIn(
  entryNumber,
  pinCode,
  mainProductUssid,
  isForDigitalBundledProduct
) {
  return async (dispatch, getState, { api }) => {
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    const cartDetailsCookie = Cookie.getCookie(CART_DETAILS_FOR_LOGGED_IN_USER);
    const cartId = cartDetailsCookie && JSON.parse(cartDetailsCookie).code;
    dispatch(removeItemFromCartLoggedInRequest());
    try {
      let url = `${USER_CART_PATH}/${
        JSON.parse(userDetails).userName
      }/carts/${cartId}/deleteEntries/${entryNumber}?access_token=${
        JSON.parse(customerCookie).access_token
      }&isPwa=true&platformNumber=${PLAT_FORM_NUMBER}&channel=${CHANNEL}&isMDE=true`;

      if (isForDigitalBundledProduct) {
        url = `${USER_CART_PATH}/${
          JSON.parse(userDetails).userName
        }/carts/${cartId}/deleteEntries/${entryNumber}?access_token=${
          JSON.parse(customerCookie).access_token
        }&isPwa=true&platformNumber=${PLAT_FORM_NUMBER}&channel=${CHANNEL}&isMDE=true&bundledBaseItemSKU=${mainProductUssid}`;
      }

      const result = await api.get(url);
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }

      dispatch(
        getCartDetails(
          JSON.parse(userDetails).userName,
          JSON.parse(customerCookie).access_token,
          cartId,
          pinCode,
          true
        )
      ).then(cartDetails => {
        if (cartDetails.status === SUCCESS) {
          setDataLayerForCartDirectCalls(
            ADOBE_REMOVE_ITEM,
            cartDetails.cartDetails
          );
          dispatch(removeItemFromCartLoggedInSuccess());
          if (!JSON.parse(cartDetailsCookie).isBuyNowCart) {
            dispatch(getCartCountForLoggedInUser()).then(userCart => {
              if (userCart.status === SUCCESS) {
                // calling minicart after remove product from cart
                // dispatch(getMinicartProducts());
              }
            });
          }
        }
      });
    } catch (e) {
      dispatch(removeItemFromCartLoggedInFailure(e.message));
    }
  };
}

// Action for remove Item from Cart Logged Out
export function removeItemFromCartLoggedOutRequest() {
  return {
    type: REMOVE_ITEM_FROM_CART_LOGGED_OUT_REQUEST,
    status: REQUESTING
  };
}
export function removeItemFromCartLoggedOutSuccess() {
  return {
    type: REMOVE_ITEM_FROM_CART_LOGGED_OUT_SUCCESS,
    status: SUCCESS
  };
}

export function removeItemFromCartLoggedOutFailure(error) {
  return {
    type: REMOVE_ITEM_FROM_CART_LOGGED_OUT_FAILURE,
    status: ERROR,
    error
  };
}

// Action Creator for remove Item from Cart Logged Out
export function removeItemFromCartLoggedOut(
  entryNumber,
  pinCode,
  mainProductUssid,
  isForDigitalBundledProduct
) {
  return async (dispatch, getState, { api }) => {
    const cartDetailsAnonymous = Cookie.getCookie(CART_DETAILS_FOR_ANONYMOUS);
    const globalCookie = Cookie.getCookie(GLOBAL_ACCESS_TOKEN);
    dispatch(removeItemFromCartLoggedOutRequest());

    try {
      let url = `${USER_CART_PATH}/anonymous/carts/${
        JSON.parse(cartDetailsAnonymous).guid
      }/deleteEntries/${entryNumber}?access_token=${
        JSON.parse(globalCookie).access_token
      }&isPwa=true&platformNumber=${PLAT_FORM_NUMBER}&channel=${CHANNEL}&isMDE=true`;

      if (isForDigitalBundledProduct) {
        url = `${USER_CART_PATH}/anonymous/carts/${
          JSON.parse(cartDetailsAnonymous).guid
        }/deleteEntries/${entryNumber}?access_token=${
          JSON.parse(globalCookie).access_token
        }&isPwa=true&platformNumber=${PLAT_FORM_NUMBER}&channel=${CHANNEL}&isMDE=true&bundledBaseItemSKU=${mainProductUssid}`;
      }

      const result = await api.get(url);
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      dispatch(
        getCartDetails(
          ANONYMOUS_USER,
          JSON.parse(globalCookie).access_token,
          JSON.parse(cartDetailsAnonymous).guid,
          pinCode,
          true
        )
      ).then(cartDetails => {
        if (cartDetails.status === SUCCESS) {
          setDataLayerForCartDirectCalls(
            ADOBE_REMOVE_ITEM,
            cartDetails.cartDetails
          );
          dispatch(removeItemFromCartLoggedOutSuccess());
        }
      });
    } catch (e) {
      dispatch(removeItemFromCartLoggedOutFailure(e.message));
    }
  };
}

// Actions for update quantity in cart
export function updateQuantityInCartLoggedInRequest() {
  return {
    type: UPDATE_QUANTITY_IN_CART_LOGGED_IN_REQUEST,
    status: REQUESTING
  };
}

export function updateQuantityInCartLoggedInSuccess(updateQuantityDetails) {
  return {
    type: UPDATE_QUANTITY_IN_CART_LOGGED_IN_SUCCESS,
    status: SUCCESS,
    updateQuantityDetails
  };
}

export function updateQuantityInCartLoggedInFailure(error) {
  return {
    type: UPDATE_QUANTITY_IN_CART_LOGGED_IN_FAILURE,
    status: ERROR,
    error
  };
}

// Action creator for update quantity in cart for LoggedIn
export function updateQuantityInCartLoggedIn(selectedItem, quantity, pinCode) {
  const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
  const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
  const cartDetails = Cookie.getCookie(CART_DETAILS_FOR_LOGGED_IN_USER);
  const cartId = JSON.parse(cartDetails).code;

  return async (dispatch, getState, { api }) => {
    dispatch(updateQuantityInCartLoggedInRequest());
    try {
      const result = await api.post(
        `${USER_CART_PATH}/${
          JSON.parse(userDetails).userName
        }/carts/${cartId}/updateEntries/${selectedItem}?access_token=${
          JSON.parse(customerCookie).access_token
        }&isPwa=true&platformNumber=${PLAT_FORM_NUMBER}&quantity=${quantity}`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      dispatch(
        getCartDetails(
          JSON.parse(userDetails).userName,
          JSON.parse(customerCookie).access_token,
          cartId,
          pinCode,
          true
        )
      ).then(cartDetails => {
        if (cartDetails.status === SUCCESS) {
          setDataLayerForCartDirectCalls(
            ADOBE_CALLS_FOR_CHANGE_QUANTITY,
            resultJson
          );
          dispatch(updateQuantityInCartLoggedInSuccess(resultJson));
        }
      });
    } catch (e) {
      dispatch(updateQuantityInCartLoggedInFailure(e.message));
    }
  };
}

// Actions for update quantity in cart for Logged Out
export function updateQuantityInCartLoggedOutRequest() {
  return {
    type: UPDATE_QUANTITY_IN_CART_LOGGED_OUT_REQUEST,
    status: REQUESTING
  };
}

export function updateQuantityInCartLoggedOutSuccess(updateQuantityDetails) {
  return {
    type: UPDATE_QUANTITY_IN_CART_LOGGED_OUT_SUCCESS,
    status: SUCCESS,
    updateQuantityDetails
  };
}

export function updateQuantityInCartLoggedOutFailure(error) {
  return {
    type: UPDATE_QUANTITY_IN_CART_LOGGED_OUT_FAILURE,
    status: ERROR,
    error
  };
}

// Action creator for update quantity in cart
export function updateQuantityInCartLoggedOut(selectedItem, quantity, pinCode) {
  const cartDetailsAnonymous = Cookie.getCookie(CART_DETAILS_FOR_ANONYMOUS);
  const globalCookie = Cookie.getCookie(GLOBAL_ACCESS_TOKEN);

  return async (dispatch, getState, { api }) => {
    dispatch(updateQuantityInCartLoggedOutRequest());
    try {
      const result = await api.post(
        `${USER_CART_PATH}/anonymous/carts/${
          JSON.parse(cartDetailsAnonymous).guid
        }/updateEntries/${selectedItem}?access_token=${
          JSON.parse(globalCookie).access_token
        }&isPwa=true&platformNumber=${PLAT_FORM_NUMBER}&quantity=${quantity}`
      );

      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }

      dispatch(
        getCartDetails(
          ANONYMOUS_USER,
          JSON.parse(globalCookie).access_token,
          JSON.parse(cartDetailsAnonymous).guid,
          pinCode,
          true
        )
      ).then(cartDetails => {
        if (cartDetails.status === SUCCESS) {
          setDataLayerForCartDirectCalls(ADOBE_CALLS_FOR_CHANGE_QUANTITY);
          dispatch(updateQuantityInCartLoggedOutSuccess(resultJson));
        }
      });
    } catch (e) {
      dispatch(updateQuantityInCartLoggedOutFailure(e.message));
    }
  };
}

export function clearCartDetails() {
  return {
    type: CLEAR_CART_DETAILS
  };
}

export function getBankAndTenureDetailsRequest() {
  return {
    type: BANK_AND_TENURE_DETAILS_REQUEST,
    status: REQUESTING
  };
}

export function getBankAndTenureDetailsSuccess(bankAndTenureDetails) {
  return {
    type: BANK_AND_TENURE_DETAILS_SUCCESS,
    status: SUCCESS,
    bankAndTenureDetails
  };
}

export function getBankAndTenureDetailsFailure(error) {
  return {
    type: BANK_AND_TENURE_DETAILS_FAILURE,
    status: ERROR,
    error
  };
}

export function getBankAndTenureDetails(
  retryFlagForEmiCoupon,
  isFromRetryUrl,
  retryCartGuid,
  isFromDebitCard = false
) {
  return async (dispatch, getState, { api }) => {
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    let cartDetails = "";
    let cartId = "";
    if (isFromRetryUrl) {
      cartId = retryCartGuid;
    } else {
      cartDetails = Cookie.getCookie(CART_DETAILS_FOR_LOGGED_IN_USER);
      cartId =
        (cartDetails && JSON.parse(cartDetails).guid) ||
        Cookie.getCookie("oldCartGuId");
    }
    dispatch(getBankAndTenureDetailsRequest());
    try {
      const result = await api.post(
        `${USER_CART_PATH}/${
          JSON.parse(userDetails).userName
        }/payments/noCostEmiTenureList?access_token=${
          JSON.parse(customerCookie).access_token
        }&cartGuid=${cartId}&retryFlag=${retryFlagForEmiCoupon}&isUpdatedPwa=true&emiConvChargeFlag=true&isFromDebitCard=${isFromDebitCard}`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      dispatch(getBankAndTenureDetailsSuccess(resultJson));
    } catch (e) {
      dispatch(getBankAndTenureDetailsFailure(e.message));
    }
  };
}

export function getEmiTermsAndConditionsForBankRequest() {
  return {
    type: EMI_TERMS_AND_CONDITIONS_FOR_BANK_REQUEST,
    status: REQUESTING
  };
}

export function getEmiTermsAndConditionsForBankSuccess(termsAndConditions) {
  return {
    type: EMI_TERMS_AND_CONDITIONS_FOR_BANK_SUCCESS,
    status: SUCCESS,
    termsAndConditions
  };
}

export function getEmiTermsAndConditionsForBankFailure(error) {
  return {
    type: EMI_TERMS_AND_CONDITIONS_FOR_BANK_FAILURE,
    status: ERROR,
    error
  };
}

export function getEmiTermsAndConditionsForBank(code, bankName) {
  return async (dispatch, getState, { api }) => {
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    dispatch(getEmiTermsAndConditionsForBankRequest());
    try {
      const result = await api.get(
        `${USER_CART_PATH}/${
          JSON.parse(userDetails).userName
        }/payments/${code}/noCostEmiTnc?access_token=${
          JSON.parse(customerCookie).access_token
        }`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      dispatch(getEmiTermsAndConditionsForBankSuccess(resultJson));
      resultJson.bankName = bankName;
      dispatch(showModal(EMI_BANK_TERMS_AND_CONDITIONS, resultJson));
    } catch (e) {
      dispatch(getEmiTermsAndConditionsForBankFailure(e.message));
    }
  };
}

export function applyNoCostEmiRequest() {
  return {
    type: APPLY_NO_COST_EMI_REQUEST,
    status: REQUESTING
  };
}

export function applyNoCostEmiSuccess(
  noCostEmiResult,
  couponCode,
  isFromRetryUrl
) {
  return {
    type: APPLY_NO_COST_EMI_SUCCESS,
    status: SUCCESS,
    noCostEmiResult,
    couponCode,
    isFromRetryUrl
  };
}

export function applyNoCostEmiFailure(error) {
  return {
    type: APPLY_NO_COST_EMI_FAILURE,
    status: ERROR,
    error
  };
}

export function applyNoCostEmi(couponCode, cartGuId, cartId, isFromRetryUrl) {
  return async (dispatch, getState, { api }) => {
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);

    dispatch(applyNoCostEmiRequest());
    try {
      const result = await api.post(
        `${USER_CART_PATH}/${
          JSON.parse(userDetails).userName
        }/carts/${cartId}/applyNoCostEMI?couponCode=${couponCode}&access_token=${
          JSON.parse(customerCookie).access_token
        }&cartGuid=${cartGuId}&isPwa=true&channel=${CHANNEL}&isUpdatedPwa=true&emiConvChargeFlag=true`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        if (resultJson.errorCode === ERROR_CODE_FOR_BANK_OFFER_INVALID_3) {
          const redoCall = () =>
            dispatch(applyNoCostEmi(couponCode, cartGuId, cartId));
          dispatch(applyNoCostEmiFailure(resultJsonStatus.message));
          return dispatch(
            showModal(VALIDATE_OFFERS_POPUP, {
              result: resultJson,
              offerType: NCE_OFFER_TYPE,
              couponCode,
              redoCall
            })
          );
        } else {
          dispatch(displayToast(resultJsonStatus.message));
          throw new Error(resultJsonStatus.message);
        }
      }
      return dispatch(
        applyNoCostEmiSuccess(resultJson, couponCode, isFromRetryUrl)
      );
    } catch (e) {
      return dispatch(applyNoCostEmiFailure(e.message));
    }
  };
}

export function removeNoCostEmiRequest() {
  return {
    type: REMOVE_NO_COST_EMI_REQUEST,
    status: REQUESTING
  };
}

export function removeNoCostEmiSuccess(noCostEmiResult, couponCode) {
  return {
    type: REMOVE_NO_COST_EMI_SUCCESS,
    status: SUCCESS,
    noCostEmiResult,
    couponCode
  };
}

export function removeNoCostEmiFailure(error) {
  return {
    type: REMOVE_NO_COST_EMI_FAILURE,
    status: ERROR,
    error
  };
}

export function removeNoCostEmi(couponCode, cartGuId, cartId) {
  return async (dispatch, getState, { api }) => {
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    if (!cartGuId) {
      const cartDetails =
        Cookie.getCookie(CART_DETAILS_FOR_LOGGED_IN_USER) &&
        JSON.parse(Cookie.getCookie(CART_DETAILS_FOR_LOGGED_IN_USER));
      if (cartDetails) {
        cartGuId = cartDetails.guid;
      }
    }
    if (!cartId) {
      const cartDetails =
        Cookie.getCookie(CART_DETAILS_FOR_LOGGED_IN_USER) &&
        JSON.parse(Cookie.getCookie(CART_DETAILS_FOR_LOGGED_IN_USER));
      if (cartDetails) {
        cartId = cartDetails.code;
      }
    }
    dispatch(removeNoCostEmiRequest());
    try {
      const result = await api.post(
        `${USER_CART_PATH}/${
          JSON.parse(userDetails).userName
        }/carts/${cartId}/releaseNoCostEMI?couponCode=${couponCode}&access_token=${
          JSON.parse(customerCookie).access_token
        }&cartGuid=${cartGuId}&isPwa=true&channel=${CHANNEL}&isUpdatedPwa=true`
      );
      const resultJson = await result.json();

      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      if (localStorage.getItem(IS_FORWARD_JOURNEY)) {
        localStorage.removeItem(IS_FORWARD_JOURNEY);
      }
      return dispatch(removeNoCostEmiSuccess(resultJson, couponCode));
    } catch (e) {
      return dispatch(removeNoCostEmiFailure(e.message));
    }
  };
}

export function getItemBreakUpDetailsRequest() {
  return {
    type: EMI_ITEM_BREAK_UP_DETAILS_REQUEST,
    status: REQUESTING
  };
}

export function getItemBreakUpDetailsSuccess(noCostEmiResult) {
  return {
    type: EMI_ITEM_BREAK_UP_DETAILS_SUCCESS,
    status: SUCCESS,
    noCostEmiResult
  };
}

export function getItemBreakUpDetailsFailure(error) {
  return {
    type: EMI_ITEM_BREAK_UP_DETAILS_FAILURE,
    status: ERROR,
    error
  };
}

export function getItemBreakUpDetails(
  couponCode,
  cartGuId,
  noCostEmiText,
  noCostEmiProductCount,
  emiInfo
) {
  return async (dispatch, getState, { api }) => {
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    if (!cartGuId) {
      const cartDetails = JSON.parse(
        Cookie.getCookie(CART_DETAILS_FOR_LOGGED_IN_USER)
      );
      cartGuId = JSON.parse(localStorage.getItem("retryPaymentCartId"))
        ? JSON.parse(localStorage.getItem("retryPaymentCartId"))
        : cartDetails.guid;
    }

    dispatch(getItemBreakUpDetailsRequest());
    try {
      const result = await api.get(
        `${USER_CART_PATH}/${
          JSON.parse(userDetails).userName
        }/payments/noCostEmiItemBreakUp?couponCode=${couponCode}&access_token=${
          JSON.parse(customerCookie).access_token
        }&cartGuid=${cartGuId}&emiConvChargeFlag=true`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      let noCostEmiResult = Object.assign({}, resultJson, {
        noCostEmiText: noCostEmiText,
        noCostEmiProductCount: noCostEmiProductCount,
        emiInfo: emiInfo
      });
      dispatch(getItemBreakUpDetailsSuccess(resultJson));
      dispatch(showModal(EMI_ITEM_LEVEL_BREAKAGE, noCostEmiResult));
    } catch (e) {
      dispatch(getItemBreakUpDetailsFailure(e.message));
    }
  };
}

export function getPaymentFailureOrderDetailsRequest() {
  return {
    type: PAYMENT_FAILURE_ORDER_DETAILS_REQUEST,
    status: REQUESTING
  };
}

export function getPaymentFailureOrderDetailsSuccess(
  paymentFailureOrderDetails
) {
  return {
    type: PAYMENT_FAILURE_ORDER_DETAILS_SUCCESS,
    status: SUCCESS,
    paymentFailureOrderDetails
  };
}

export function getPaymentFailureOrderDetailsFailure(error) {
  return {
    type: PAYMENT_FAILURE_ORDER_DETAILS_FAILURE,
    status: ERROR,
    error
  };
}

export function getPaymentFailureOrderDetails() {
  return async (dispatch, getState, { api }) => {
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);

    let url = queryString.parse(window.location.search);
    const cartGuId =
      url && url.value ? url.value : Cookie.getCookie(OLD_CART_GU_ID);

    dispatch(getPaymentFailureOrderDetailsRequest());
    try {
      const result = await api.get(
        `${USER_CART_PATH}/${
          JSON.parse(userDetails).userName
        }/payments/failedorderdetails?access_token=${
          JSON.parse(customerCookie).access_token
        }&cartGuid=${cartGuId}&isUpdatedPwa=true&emiConvChargeFlag=true`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      dispatch(getPaymentFailureOrderDetailsSuccess(resultJson));
      const parsedQueryString = queryString.parse(window.location.search);
      const value = parsedQueryString.status;
      setDataLayerForOrderConfirmationDirectCalls(
        ADOBE_DIRECT_CALLS_FOR_ORDER_CONFIRMATION_FAILURE,
        {
          failureReason: value,
          price:
            resultJson.cartAmount &&
            resultJson.cartAmount.paybleAmount &&
            resultJson.cartAmount.paybleAmount.value
              ? resultJson.cartAmount.paybleAmount.value
              : ""
        }
      );
      await Cookie.createCookie(
        CART_DETAILS_FOR_LOGGED_IN_USER,
        JSON.stringify({ guid: cartGuId })
      );
      // dispatch(getMinicartProducts());
    } catch (e) {
      dispatch(getPaymentFailureOrderDetailsFailure(e.message));
    }
  };
}

export function resetIsSoftReservationFailed() {
  return {
    type: RESET_IS_SOFT_RESERVATION_FAILED
  };
}

export function getTncForBankOfferRequest() {
  return {
    type: GET_TNC_FOR_BANK_OFFER_REQUEST,
    status: REQUESTING
  };
}
export function getTncForBankOfferSuccess(termsAndConditions) {
  return {
    type: GET_TNC_FOR_BANK_OFFER_SUCCESS,
    status: SUCCESS,
    termsAndConditions
  };
}
export function getTncForBankOfferFailure(error) {
  return {
    type: GET_TNC_FOR_BANK_OFFER_FAILURE,
    status: ERROR,
    error
  };
}
export function getTncForBankOffer() {
  return async (dispatch, getState, { api }) => {
    dispatch(getTncForBankOfferRequest());
    try {
      const result = await api.get(
        `v2/mpl/paymentSpecificOffersTermsAndCondition?isPwa=true`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      dispatch(getTncForBankOfferSuccess(resultJson));
    } catch (e) {
      dispatch(getTncForBankOfferFailure(e.message));
    }
  };
}

export function getValidDeliveryModeDetails(
  cartProductDetails,
  isFromRetryUrl,
  pincodeDetails
) {
  let productItems = {};
  let item = [];
  let updatedDeliveryModes = {};

  /*
  here we have to replace long delivery name with short key words
  like home-delivery will be HD
  express-delivery will be ED
  and click-and-collect will be CNC
  */

  let selectedDeliverMode = localStorage.getItem(SELECTED_DELIVERY_MODE);
  selectedDeliverMode = JSON.parse(selectedDeliverMode);
  Object.keys(selectedDeliverMode).forEach(productMode => {
    if (
      selectedDeliverMode[productMode] === HOME_DELIVERY ||
      selectedDeliverMode[productMode] === "HD"
    ) {
      updatedDeliveryModes[productMode] = SHORT_HOME_DELIVERY;
    } else if (
      selectedDeliverMode[productMode] === EXPRESS ||
      selectedDeliverMode[productMode] === "ED"
    ) {
      updatedDeliveryModes[productMode] = SHORT_EXPRESS;
    } else if (
      selectedDeliverMode[productMode] === SAME_DAY_DELIVERY ||
      selectedDeliverMode[productMode] === SHORT_SAME_DAY_DELIVERY
    ) {
      updatedDeliveryModes[productMode] = SHORT_SAME_DAY_DELIVERY;
    } else if (
      selectedDeliverMode[productMode] === COLLECT ||
      selectedDeliverMode[productMode] === "CNC"
    ) {
      updatedDeliveryModes[productMode] = SHORT_COLLECT;
    }
  });
  let index = 0;

  let bundledDigitalProducts =
    cartProductDetails &&
    cartProductDetails.filter(value => {
      return value.bundledDigitalItems;
    });
  let allProducts = [];
  // if main products contains digital product then create new array of products
  if (bundledDigitalProducts && bundledDigitalProducts.length > 0) {
    cartProductDetails.map((product, index) => {
      allProducts.push(product);
      if (
        product.bundledDigitalItems &&
        product.bundledDigitalItems.length > 0
      ) {
        product.bundledDigitalItems.map(digitalProduct => {
          allProducts.push(digitalProduct);
        });
      }
    });
  } else {
    allProducts = cartProductDetails;
  }

  each(allProducts, product => {
    if (product.isGiveAway === NO || isFromRetryUrl) {
      let selectedDeliveryModeDetails = "";
      //get the selected delivery Mode
      if (isFromRetryUrl) {
        selectedDeliveryModeDetails = pincodeDetails.pinCodeResponseList[
          index
        ].validDeliveryModes.find(validDeliveryMode => {
          return validDeliveryMode.type === updatedDeliveryModes[product.USSID];
        });
      } else {
        selectedDeliveryModeDetails = product.pinCodeResponse.validDeliveryModes.find(
          validDeliveryMode => {
            return (
              validDeliveryMode.type === updatedDeliveryModes[product.USSID]
            );
          }
        );
      }
      index++;
      let productDetails = {};
      productDetails.ussId = product.USSID;
      productDetails.quantity = product.qtySelectedByUser;
      productDetails.fulfillmentType = isFromRetryUrl
        ? selectedDeliveryModeDetails.fulfilmentType.toLowerCase()
        : product.fullfillmentType;
      productDetails.deliveryMode =
        selectedDeliveryModeDetails && selectedDeliveryModeDetails.type;
      if (
        selectedDeliveryModeDetails &&
        selectedDeliveryModeDetails.serviceableSlaves
      ) {
        productDetails.serviceableSlaves =
          selectedDeliveryModeDetails.serviceableSlaves;
      } else if (
        selectedDeliveryModeDetails &&
        selectedDeliveryModeDetails.CNCServiceableSlavesData
      ) {
        let selectedStoreDetails =
          selectedDeliveryModeDetails &&
          selectedDeliveryModeDetails.CNCServiceableSlavesData.find(
            storeDetails => {
              if (isFromRetryUrl) {
                return storeDetails.storeId === product.selectedStoreCNC;
              } else {
                return storeDetails.storeId === product.storeDetails.slaveId;
              }
            }
          );
        productDetails.serviceableSlaves =
          selectedStoreDetails && selectedStoreDetails.serviceableSlaves;
      }
      item.push(productDetails);
      productItems.item = item;
    }
  });
  return productItems;
}

/*
this cart creation is for buy now
in pdp so that user  can go for only one production
in checkout
*/

export function tempCartIdForLoggedInUserRequest() {
  return {
    type: TEMPORARY_CART_ID_FOR_LOGGED_IN_USER_REQUEST,
    status: REQUESTING
  };
}

export function tempCartIdForLoggedInUserFailure(error) {
  return {
    type: TEMPORARY_CART_ID_FOR_LOGGED_IN_USER_FAILURE,
    status: FAILURE,
    error
  };
}
export function tempCartIdForLoggedInUserSuccess(cartDetails) {
  return {
    type: TEMPORARY_CART_ID_FOR_LOGGED_IN_USER_SUCCESS,
    status: SUCCESS,
    cartDetails
  };
}
export function resetTempCartId() {
  return {
    type: RESET_TEMPORARY_CART,
    status: SUCCESS
  };
}

export function tempCartIdForLoggedInUser(productDetails: {}) {
  localStorage.removeItem(BUY_NOW_PRODUCT_DETAIL);

  let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
  let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
  return async (dispatch, getState, { api }) => {
    dispatch(tempCartIdForLoggedInUserRequest());
    try {
      let result = "";
      if (productDetails.isCNC) {
        result = await api.get(
          `${USER_CART_PATH}/${
            JSON.parse(userDetails).userName
          }/buyNow/expressBuy?productCode=${productDetails.code}&USSID=${
            productDetails.ussId
          }&slaveId=${productDetails.slaveId}&access_token=${
            JSON.parse(customerCookie).access_token
          }&isCNC=yes&isMDE=true`
        );
      } else {
        result = await api.get(
          `${USER_CART_PATH}/${
            JSON.parse(userDetails).userName
          }/buyNow/expressBuy?access_token=${
            JSON.parse(customerCookie).access_token
          }&isPwa=true&channel=${CHANNEL}&productCode=${
            productDetails.code
          }&USSID=${productDetails.ussId}&isMDE=true`
        );
      }
      const resultJson = await result.json();
      if (resultJson.status !== SUCCESS_CAMEL_CASE) {
        throw new Error(resultJson.message);
      }
      localStorage.setItem(
        CART_BAG_DETAILS,
        JSON.stringify([productDetails.ussId])
      );

      // appliance exchange poc
      let acPdpExchangeDetails = localStorage.getItem(AC_PDP_EXCHANGE_DETAILS);
      let acPdpExchangeData =
        acPdpExchangeDetails && JSON.parse(acPdpExchangeDetails);
      if (
        acPdpExchangeData &&
        acPdpExchangeData.ussid === productDetails.ussId &&
        acPdpExchangeData.isExchangeSelected
      ) {
        let acCartExchangeDetails = localStorage.getItem(
          AC_CART_EXCHANGE_DETAILS
        );
        if (acCartExchangeDetails) {
          delete acPdpExchangeData.isExchangeSelected;
          let acCartExchangeData = JSON.parse(acCartExchangeDetails);
          let productIndex = "";
          let isProductInExchangeData =
            acCartExchangeData &&
            acCartExchangeData.find((data, index) => {
              if (data.ussid === productDetails.ussId) {
                productIndex = index;
              }
              return data.ussid === productDetails.ussId;
            });
          if (isProductInExchangeData) {
            acCartExchangeData[productIndex] = acPdpExchangeData;
          } else {
            acCartExchangeData.push(acPdpExchangeData);
          }
          localStorage.setItem(
            AC_CART_EXCHANGE_DETAILS,
            JSON.stringify(acCartExchangeData)
          );
        } else {
          delete acPdpExchangeData.isExchangeSelected;
          localStorage.setItem(
            AC_CART_EXCHANGE_DETAILS,
            JSON.stringify([acPdpExchangeData])
          );
        }
      }

      return dispatch(tempCartIdForLoggedInUserSuccess(resultJson));
    } catch (e) {
      return dispatch(tempCartIdForLoggedInUserFailure(e.message));
    }
  };
}

export function mergeTempCartWithOldCartRequest() {
  return {
    type: MERGE_TEMP_CART_WITH_OLD_CART_REQUEST,
    status: REQUESTING
  };
}

export function mergeTempCartWithOldCartFailure(error) {
  return {
    type: MERGE_TEMP_CART_WITH_OLD_CART_FAILURE,
    status: FAILURE,
    error
  };
}
export function mergeTempCartWithOldCartSuccess(cartDetails) {
  return {
    type: MERGE_TEMP_CART_WITH_OLD_CART_SUCCESS,
    status: SUCCESS,
    cartDetails
  };
}

export function mergeTempCartWithOldCart() {
  let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
  let cartDetails = Cookie.getCookie(CART_DETAILS_FOR_LOGGED_IN_USER);
  let cartGuId = cartDetails && JSON.parse(cartDetails).guid;
  let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);

  return async (dispatch, getState, { api }) => {
    dispatch(mergeTempCartWithOldCartRequest());
    /*
    For deleting temp cart detail from
    our reducer
    */
    dispatch(resetTempCartId());
    try {
      const result = await api.get(
        `${USER_CART_PATH}/${
          JSON.parse(userDetails).userName
        }/buyNow/mergeBuyNowCart?access_token=${
          JSON.parse(customerCookie).access_token
        }&isPwa=true&channel=${CHANNEL}&cartGuid=${cartGuId}&isMDE=true`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      dispatch(mergeTempCartWithOldCartSuccess(resultJson));
      dispatch(
        getCartDetails(
          JSON.parse(userDetails).userName,
          JSON.parse(customerCookie).access_token,
          resultJson.buyNowCartCode,
          localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE),
          true
        )
      );
      // dispatch(getMinicartProducts());
    } catch (e) {
      dispatch(mergeTempCartWithOldCartFailure(e.message));
    }
  };
}
export function generateCartIdAfterOrderPlace() {
  let cartDetails = Cookie.getCookie(CART_DETAILS_FOR_LOGGED_IN_USER);
  cartDetails = cartDetails ? JSON.parse(cartDetails) : {};
  return async (dispatch, getState, { api }) => {
    if (!cartDetails.isBuyNowCart) {
      Cookie.deleteCookie(CART_DETAILS_FOR_LOGGED_IN_USER);
    } else {
      const getCartIdResponse = await dispatch(getCartId());
      if (getCartIdResponse.status === SUCCESS) {
        Cookie.createCookie(
          CART_DETAILS_FOR_LOGGED_IN_USER,
          JSON.stringify(getCartIdResponse.cartDetails)
        );
        Cookie.deleteCookie(CART_DETAILS_FOR_ANONYMOUS);
        return getCartIdResponse;
      } else {
        Cookie.deleteCookie(CART_DETAILS_FOR_LOGGED_IN_USER);
      }
    }
  };
}

export function resetAllPaymentModes() {
  return {
    type: RESET_ALL_PAYMENT_MODES
  };
}
export function preventRestingAllPaymentMode() {
  return {
    type: PREVENT_REQUESTING_ALL_PAYMENT_MODES
  };
}
export function getFeedBackFormRequest() {
  return {
    type: GET_FEEDBACK_REQUEST,
    status: REQUESTING
  };
}

export function getFeedBackFormSuccess(feedBackDetails) {
  return {
    type: GET_FEEDBACK_SUCCESS,
    status: SUCCESS,
    feedBackDetails
  };
}
export function getFeedBackFormFailure(error) {
  return {
    type: GET_FEEDBACK_FAILURE,
    status: ERROR,
    error
  };
}
export function getFeedBackForm(getUserDetails, isReturnFlow) {
  return async (dispatch, getState, { api }) => {
    dispatch(getFeedBackFormRequest());
    try {
      const {
        originalUid,
        transactionId,
        deliveryMode,
        returnType,
        rating
      } = getUserDetails;
      let result = null;

      if (isReturnFlow) {
        let returnParamsObj = {};
        returnParamsObj.originalUid = originalUid;
        returnParamsObj.transactionId = transactionId;
        returnParamsObj.returnType = returnType;
        returnParamsObj.rating = rating;
        returnParamsObj.isLux = false;
        result = await api.post(
          `v2/mpl/getQuestionsForReturnNPS`,
          returnParamsObj
        );
      } else {
        result = await api.get(
          `v2/mpl/getQuestionsForNPS?originalUid=${originalUid}&transactionId=${transactionId}&deliveryMode=${deliveryMode}&rating=${rating}`
        );
      }

      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      dispatch(getFeedBackFormSuccess(resultJson));
    } catch (e) {
      dispatch(getFeedBackFormFailure(e.message));
    }
  };
}

export function postFeedBackFormRequest() {
  return {
    type: POST_FEEDBACK_REQUEST,
    status: REQUESTING
  };
}

export function postFeedBackFormSuccess(feedBackSent) {
  return {
    type: POST_FEEDBACK_SUCCESS,
    status: SUCCESS,
    feedBackSent
  };
}
export function postFeedBackFormFailure(error) {
  return {
    type: POST_FEEDBACK_FAILURE,
    status: ERROR,
    error
  };
}
export function postFeedBackForm(
  commemt,
  questionRatingArray,
  transactionId,
  originalUid,
  isReturnFlow
) {
  return async (dispatch, getState, { api }) => {
    dispatch(postFeedBackFormRequest());
    try {
      let productDetails = {};
      productDetails.transactionId = transactionId;
      productDetails.originalUid = originalUid;
      productDetails.anyotherfeedback = commemt;
      productDetails.items = questionRatingArray;

      let apiEndPoint = isReturnFlow
        ? "submitReturnNPSFeedback"
        : "getFeedbackCapturedData";

      const result = await api.post(`v2/mpl/${apiEndPoint}`, productDetails);
      const resultJson = await result.json();

      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      dispatch(postFeedBackFormSuccess(resultJson));
    } catch (e) {
      dispatch(displayToast(e.message));
      dispatch(postFeedBackFormFailure(e.message));
    }
  };
}

export function getIntermittentPageDataRequest() {
  return {
    type: GET_INTERMITTENT_FEEDBACK_DATA_REQUEST,
    status: REQUESTING
  };
}

export function getIntermittentPageDataSuccess(feedBackDetails) {
  return {
    type: GET_INTERMITTENT_FEEDBACK_DATA_SUCCESS,
    status: SUCCESS,
    feedBackDetails
  };
}
export function getIntermittentPageDataFailure(error) {
  return {
    type: GET_INTERMITTENT_FEEDBACK_DATA_FAILURE,
    status: ERROR,
    error
  };
}

export function getIntermittentPageData(getUserDetails) {
  return async (dispatch, getState, { api }) => {
    dispatch(getIntermittentPageDataRequest());
    try {
      let {
        originalUid,
        transactionId,
        deliveryMode,
        returnType
      } = getUserDetails;
      let paramsObj = {},
        apiEndPoint = "getFwdNPSData";
      paramsObj.originalUid = originalUid;
      paramsObj.transactionId = transactionId;
      if (deliveryMode) {
        paramsObj.deliveryMode = deliveryMode;
      } else {
        paramsObj.returnType = returnType;
        apiEndPoint = "getReturnNPSData";
      }

      const result = await api.post(`v2/mpl/${apiEndPoint}`, paramsObj);
      const resultJson = await result.json();

      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      dispatch(getIntermittentPageDataSuccess(resultJson));
    } catch (e) {
      dispatch(getIntermittentPageDataFailure(e.message));
    }
  };
}

export function getUserAddressAndDeliveryModesByRetryPaymentRequest() {
  return {
    type: GET_USER_ADDRESS_AND_DELIVERY_MODES_BY_RETRY_PAYMENT_REQUEST,
    status: REQUESTING
  };
}

export function getUserAddressAndDeliveryModesByRetryPaymentFailure(error) {
  return {
    type: GET_USER_ADDRESS_AND_DELIVERY_MODES_BY_RETRY_PAYMENT_FAILURE,
    status: FAILURE,
    error
  };
}
export function getUserAddressAndDeliveryModesByRetryPaymentSuccess(
  getUserAddressAndDeliveryModesByRetryPayment
) {
  return {
    type: GET_USER_ADDRESS_AND_DELIVERY_MODES_BY_RETRY_PAYMENT_SUCCESS,
    status: SUCCESS,
    getUserAddressAndDeliveryModesByRetryPayment
  };
}

export function getUserAddressAndDeliveryModesByRetryPayment(guId) {
  let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
  let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
  return async (dispatch, getState, { api }) => {
    dispatch(getUserAddressAndDeliveryModesByRetryPaymentRequest());
    try {
      const result = await api.get(
        `${USER_CART_PATH}/${
          JSON.parse(userDetails).userName
        }/payments/failedOrderPincodeAndAddressResponse?access_token=${
          JSON.parse(customerCookie).access_token
        }&isUpdatedPwa=true&cartGuid=${guId}`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      return dispatch(
        getUserAddressAndDeliveryModesByRetryPaymentSuccess(resultJson)
      );
    } catch (e) {
      return dispatch(
        getUserAddressAndDeliveryModesByRetryPaymentFailure(e.message)
      );
    }
  };
}

export function binValidationOfEmiEligibleRequest() {
  return {
    type: BIN_VALIDATION_OF_EMI_ELIGIBLE_REQUEST,
    status: REQUESTING
  };
}

export function binValidationOfEmiEligibleFailure(error) {
  return {
    type: BIN_VALIDATION_OF_EMI_ELIGIBLE_FAILURE,
    status: FAILURE,
    error
  };
}
export function binValidationOfEmiEligibleSuccess(binValidationOfEmiEligible) {
  return {
    type: BIN_VALIDATION_OF_EMI_ELIGIBLE_SUCCESS,
    status: SUCCESS,
    binValidationOfEmiEligible
  };
}

export function binValidationOfEmiEligible(binNo) {
  let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
  let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
  let access_token = JSON.parse(customerCookie).access_token;
  return async (dispatch, getState, { api }) => {
    dispatch(binValidationOfEmiEligibleRequest());
    try {
      const params = {
        access_token: access_token,
        bin: binNo
      };
      let cardObject = Object.keys(params)
        .map(key => {
          return (
            encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
          );
        })
        .join("&");
      const result = await api.corePostByUrlEncoded(
        `${USER_CART_PATH}/${
          JSON.parse(userDetails).userName
        }/payments/emiEligibleBin?access_token=${access_token}&bin=${binNo}`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      return dispatch(binValidationOfEmiEligibleSuccess(resultJson));
    } catch (e) {
      return dispatch(binValidationOfEmiEligibleFailure(e.message));
    }
  };
}

// Get Cart Count for Logged-In user

export function getCartCountForLoggedInUserSuccess(cartDetails, userDetails) {
  return {
    type: GET_CART_COUNT_FOR_LOGGED_IN_USER_SUCCESS,
    status: SUCCESS,
    cartDetails,
    userDetails
  };
}

export function getCartCountForLoggedInUserRequest() {
  return {
    type: GET_CART_COUNT_FOR_LOGGED_IN_USER_REQUEST,
    status: REQUESTING
  };
}

export function getCartCountForLoggedInUserFailure(error) {
  return {
    type: GET_CART_COUNT_FOR_LOGGED_IN_USER_FAILURE,
    error,
    status: FAILURE
  };
}

export function getCartCountForLoggedInUser(cartVal) {
  let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
  let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
  let globalCookie = Cookie.getCookie(GLOBAL_ACCESS_TOKEN);
  let accessToken = globalCookie ? JSON.parse(globalCookie).access_token : null;
  let userId = ANONYMOUS_USER;
  let cartDetails;

  if (userDetails && customerCookie) {
    userId = JSON.parse(userDetails).userName;
    accessToken = JSON.parse(customerCookie).access_token;
    cartDetails = Cookie.getCookie(CART_DETAILS_FOR_LOGGED_IN_USER);
  } else {
    cartDetails = Cookie.getCookie(CART_DETAILS_FOR_ANONYMOUS);
  }
  let cartGuid =
    cartDetails && JSON.parse(cartDetails).guid
      ? JSON.parse(cartDetails).guid
      : null;

  if (cartVal) {
    cartGuid =
      cartVal.cartDetails && cartVal.cartDetails.guid
        ? cartVal.cartDetails.guid
        : cartVal.guid;
  }

  return async (dispatch, getState, { api }) => {
    dispatch(getCartCountForLoggedInUserRequest());

    try {
      const result = await api.get(
        `${USER_CART_PATH}/${userId}/bagCount?access_token=${accessToken}&isPwa=true&platformNumber=${PLAT_FORM_NUMBER}&channel=${CHANNEL}&cartGuid=${cartGuid}&isProductInfoRequired=true&isMDE=true`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }

      //set local storage
      let bagItem = localStorage.getItem(CART_BAG_DETAILS);
      let bagItemsInJsonFormat = bagItem ? JSON.parse(bagItem) : [];
      if (resultJson && resultJson.products) {
        resultJson.products.map(product => {
          if (product.USSID && !bagItemsInJsonFormat.includes(product.USSID)) {
            bagItemsInJsonFormat.push(product.USSID);
          }
        });
      }
      localStorage.setItem(
        CART_BAG_DETAILS,
        JSON.stringify(bagItemsInJsonFormat)
      );
      // here we dispatch a modal to show something was added to the bag
      dispatch(setBagCount(bagItemsInJsonFormat.length));

      return dispatch(
        getCartCountForLoggedInUserSuccess(resultJson, userDetails)
      );
    } catch (e) {
      return dispatch(getCartCountForLoggedInUserFailure(e.message));
    }
  };
}

export function getOrderUpdateOnWhatsappRequest() {
  return {
    type: GET_ORDER_UPDATE_ON_WHATSAPP_REQUEST,
    status: REQUESTING
  };
}
// Minicart functions block
// getMinicartProductsSuccess - The function is calling in getMinicartProducts function
export function getMinicartProductsSuccess(minicartDetails) {
  return {
    type: GET_MINICART_SUCCESS,
    status: SUCCESS,
    minicartDetails
  };
}

// getMinicartProductsRequest - The function is calling in getMinicartProducts function
export function getMinicartProductsRequest() {
  return {
    type: GET_MINICART_REQUEST,
    status: REQUESTING
  };
}

export function getOrderUpdateOnWhatsappSuccess(responseJSON) {
  return {
    type: GET_ORDER_UPDATE_ON_WHATSAPP_SUCCESS,
    status: SUCCESS,
    responseJSON
  };
}

export function getOrderUpdateOnWhatsappFailure(error) {
  return {
    type: GET_ORDER_UPDATE_ON_WHATSAPP_FAILURE,
    status: FAILURE,
    error
  };
}

export function getOrderUpdateOnWhatsapp(orderId) {
  let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
  let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
  return async (dispatch, getState, { api }) => {
    dispatch(getOrderUpdateOnWhatsappRequest());
    try {
      const result = await api.get(
        `${USER_CART_PATH}/${
          JSON.parse(userDetails).userName
        }/updateOrderPreferences/${orderId}?access_token=${
          JSON.parse(customerCookie).access_token
        }&platformNumber=${PLAT_FORM_NUMBER}&isPwa=true&whatsapp=true`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }

      return dispatch(getOrderUpdateOnWhatsappSuccess(resultJson));
    } catch (e) {
      return dispatch(getOrderUpdateOnWhatsappFailure(e.message));
    }
  };
}
// getMinicartProductsRequest - The function is calling in getMinicartProductsFailure function
export function getMinicartProductsFailure(error) {
  return {
    type: GET_MINICART_FAILURE,
    error,
    status: FAILURE
  };
}

export function getMinicartProductsNoCart() {
  return {
    type: GET_MINICART_NOCART,
    status: NOCART
  };
}

// getMinicartProducts - The function is calling on
export function getMinicartProducts() {
  // Get User Details from cookie
  let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);

  // Get Customer Access Token from cookie
  let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);

  // Get Global Access Token from cookie
  let globalCookie = Cookie.getCookie(GLOBAL_ACCESS_TOKEN);
  let accessToken = globalCookie ? JSON.parse(globalCookie).access_token : null;

  let userId = ANONYMOUS_USER;
  let cartDetails;
  let cartCode;

  // Check if User Details and Customer Cookie exists
  // If true then get Customer Access Token, User's Email and logged-In User's Cart Details
  if (userDetails && customerCookie) {
    userId = JSON.parse(userDetails).userName;
    accessToken = JSON.parse(customerCookie).access_token;
    cartDetails = Cookie.getCookie(CART_DETAILS_FOR_LOGGED_IN_USER);
    cartCode = cartDetails && JSON.parse(cartDetails).code;
  } else {
    cartDetails = Cookie.getCookie(CART_DETAILS_FOR_ANONYMOUS);
    cartCode = cartDetails && JSON.parse(cartDetails).guid;
  }

  return async (dispatch, getState, { api }) => {
    if (!cartCode) {
      return dispatch(getMinicartProductsNoCart());
    }
    // Dispatching Requesting event before API CALL
    dispatch(getMinicartProductsRequest());
    try {
      const result = {};
      // await api.get(
      //   `${USER_CART_PATH}/${userId}/carts/${cartCode}/miniCartDetails?access_token=${accessToken}&isPwa=true&platformNumber=${PLAT_FORM_NUMBER}&channel=${CHANNEL}`
      // );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      // Check failure response status if found then throw an error
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      return dispatch(getMinicartProductsSuccess(resultJson));
    } catch (e) {
      return dispatch(getMinicartProductsFailure(e.message));
    }
  };
}

export function createPaymentOrderRequest() {
  return {
    type: CREATE_PAYMENT_ORDER_REQUEST,
    status: REQUESTING
  };
}

export function createPaymentOrderSuccess(createPaymentOrder) {
  return {
    type: CREATE_PAYMENT_ORDER_SUCCESS,
    status: SUCCESS,
    createPaymentOrder
  };
}

export function createPaymentOrderFailure(error) {
  return {
    type: CREATE_PAYMENT_ORDER_FAILURE,
    status: ERROR,
    error
  };
}
export function collectPaymentOrderRequest() {
  return {
    type: COLLECT_PAYMENT_ORDER_REQUEST,
    status: REQUESTING
  };
}

export function collectPaymentOrderSuccess(collectPaymentOrder) {
  return {
    type: COLLECT_PAYMENT_ORDER_SUCCESS,
    status: SUCCESS,
    collectPaymentOrder
  };
}

export function collectPaymentOrderFailure(error) {
  return {
    type: COLLECT_PAYMENT_ORDER_FAILURE,
    status: ERROR,
    error
  };
}
export function collectPaymentOrderForGiftCardRequest() {
  return {
    type: COLLECT_PAYMENT_ORDER_FOR_GIFTCARD_REQUEST,
    status: REQUESTING
  };
}

export function collectPaymentOrderForGiftCardSuccess(
  collectPaymentOrder,
  guid
) {
  return {
    type: COLLECT_PAYMENT_ORDER_FOR_GIFTCARD_SUCCESS,
    status: SUCCESS,
    collectPaymentOrder,
    guid
  };
}

export function collectPaymentOrderForGiftCardFailure(error) {
  return {
    type: COLLECT_PAYMENT_ORDER_FOR_GIFTCARD_FAILURE,
    status: ERROR,
    error
  };
}
export function getPrepaidOrderPaymentConfirmationRequest() {
  return {
    type: GET_PREPAID_ORDER_PAYMENT_CONFIRMATION_REQUEST,
    status: REQUESTING
  };
}

export function getPrepaidOrderPaymentConfirmationSuccess(paymentDetails) {
  return {
    type: GET_PREPAID_ORDER_PAYMENT_CONFIRMATION_SUCCESS,
    status: SUCCESS,
    paymentDetails
  };
}

export function getPrepaidOrderPaymentConfirmationFailure(error) {
  return {
    type: GET_PREPAID_ORDER_PAYMENT_CONFIRMATION_FAILURE,
    status: ERROR,
    error
  };
}

export function stripeTokenizeRequest() {
  return {
    type: STRIPE_TOKENIZE_REQUEST,
    status: REQUESTING
  };
}

export function stripeTokenizeSuccess(stripeToken) {
  return {
    type: STRIPE_TOKENIZE_SUCCESS,
    status: SUCCESS,
    stripeToken
  };
}

export function stripeTokenizeFailure(error) {
  return {
    type: STRIPE_TOKENIZE_FAILURE,
    status: ERROR,
    error
  };
}

export function stripeTokenize(cardDetails, address, cartItem, paymentMode) {
  return async (dispatch, getState, { api }) => {
    dispatch(stripeTokenizeRequest());

    let card_exp_month = cardDetails && cardDetails.monthValue;
    let card_exp_year = cardDetails && cardDetails.yearValue;
    let card_number = cardDetails && cardDetails.cardNumber;
    let card_security_code = cardDetails && cardDetails.cvvNumber;
    let cardData = {
      number: card_number,
      cvc: card_security_code,
      exp_month: card_exp_month,
      exp_year: card_exp_year
    };
    try {
      const result = await api.postStripe(cardData);
      if (result.error) {
        // dispatch(displayToast(resultJson.error.message));
        throw new Error(result.error.message);
      }
      dispatch(stripeTokenizeSuccess(result));
      return result;
    } catch (e) {
      dispatch(stripeTokenizeFailure(e));
    }
  };
}

export function createPaymentOrder(guId) {
  return async (dispatch, getState, { api }) => {
    let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    let browserName = browserAndDeviceDetails.getBrowserAndDeviceDetails(1);
    let fullVersion = browserAndDeviceDetails.getBrowserAndDeviceDetails(2);
    let deviceInfo = browserAndDeviceDetails.getBrowserAndDeviceDetails(3);
    let networkType = browserAndDeviceDetails.getBrowserAndDeviceDetails(4);
    let cartGuId;
    if (guId) {
      cartGuId = guId;
    } else {
      let cartDetails = Cookie.getCookie(CART_DETAILS_FOR_LOGGED_IN_USER);
      cartGuId = JSON.parse(cartDetails).guid;
    }
    dispatch(createPaymentOrderRequest());
    try {
      const result = await api.post(
        `${USER_CART_PATH}/${
          JSON.parse(userDetails).userName
        }/payments/createPaymentOrder?access_token=${
          JSON.parse(customerCookie).access_token
        }&cartGuid=${cartGuId}&channel=${CHANNEL}&deviceInfo=${deviceInfo}&networkInfo=${networkType}&browserInfo=${browserName}|${fullVersion}&platform=11&platformNumber=${PLAT_FORM_NUMBER}&appversion=`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      dispatch(createPaymentOrderSuccess(resultJson));
    } catch (e) {
      dispatch(createPaymentOrderFailure(e.message));
    }
  };
}
export function collectPaymentOrderForGiftCard(
  cardDetails,
  egvCartGuid,
  cartdetails,
  cardBrandName,
  isFromRetryUrl
) {
  return async (dispatch, getState, { api }) => {
    let browserName = browserAndDeviceDetails.getBrowserAndDeviceDetails(1);
    let fullVersion = browserAndDeviceDetails.getBrowserAndDeviceDetails(2);
    let deviceInfo = browserAndDeviceDetails.getBrowserAndDeviceDetails(3);
    let networkType = browserAndDeviceDetails.getBrowserAndDeviceDetails(4);
    let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const bankName = localStorage.getItem(SELECTED_BANK_NAME);
    let paymentMode = localStorage.getItem(PAYMENT_MODE_TYPE);
    const binCardType = localStorage.getItem(BIN_CARD_TYPE);
    let whatsappNotification = Cookie.getCookie(WHATSAPP_NOTIFICATION);
    if (binCardType && paymentMode !== "EMI") {
      paymentMode = `${binCardType.charAt(0).toUpperCase()}${binCardType
        .slice(1)
        .toLowerCase()} Card`;
    }
    let binNo = cardDetails.cardNumber.replace(/\s/g, "").substring(0, 6);
    dispatch(collectPaymentOrderForGiftCardRequest());
    try {
      const result = await api.post(
        `${USER_CART_PATH}/${
          JSON.parse(userDetails).userName
        }/collectPaymentOrder?access_token=${
          JSON.parse(customerCookie).access_token
        }&saveCard=${true}&sameAsShipping=true&cartGuid=${egvCartGuid}&isPwa=true&platform=11&platformNumber=${PLAT_FORM_NUMBER}&bankName=${bankName}&paymentMode=${paymentMode}&channel=${CHANNEL}&isUpdatedPwa=true&appplatform&appversion=&deviceInfo=${deviceInfo}&networkInfo=${networkType}|&browserInfo=${browserName}|${fullVersion}&binNo=${binNo}&emiTenure=${
          cardDetails.emi_tenure
        }&cardBrandName=${cardBrandName}${
          whatsappNotification ? "&whatsapp=true" : ""
        }`,
        cartdetails
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      dispatch(collectPaymentOrderForGiftCardSuccess(resultJson, egvCartGuid));
      let cartExchangeDetails = localStorage.getItem(AC_CART_EXCHANGE_DETAILS);
      if (cartExchangeDetails) {
        dispatch(
          submitAppliancesExchangeData(
            resultJson.orderId,
            STATUS_PROCESSING,
            false
          )
        );
      }
      localStorage.setItem(STRIPE_DETAILS, JSON.stringify(resultJson));
      if (
        (resultJson.pspName && resultJson.pspName.toLowerCase()) === "juspay"
      ) {
        dispatch(
          jusPayPaymentMethodTypeForGiftCard(
            resultJson.pspAuditId,
            cardDetails,
            paymentMode,
            egvCartGuid
          )
        );
      } else if (
        (resultJson.pspName && resultJson.pspName.toLowerCase()) === "stripe"
      ) {
        if (resultJson.pspRedirectUrl) {
          window.location.href = resultJson.pspRedirectUrl;
        } else {
          dispatch(getPrepaidOrderPaymentConfirmation(resultJson));
        }
      }
    } catch (e) {
      dispatch(
        displayToast(ERROR_MESSAGE_FOR_CREATE_JUS_PAY_CALL + " Please Retry.")
      );
      dispatch(collectPaymentOrderForGiftCardFailure(e));
    }
  };
}

export function collectPaymentOrder(
  cardDetails,
  address,
  cartItems,
  isPaymentFailed,
  isFromRetryUrl,
  cartdetails,
  retryCartGuid,
  cardBrandName
) {
  return async (dispatch, getState, { api }) => {
    let browserName = browserAndDeviceDetails.getBrowserAndDeviceDetails(1);
    let fullVersion = browserAndDeviceDetails.getBrowserAndDeviceDetails(2);
    let deviceInfo = browserAndDeviceDetails.getBrowserAndDeviceDetails(3);
    let networkType = browserAndDeviceDetails.getBrowserAndDeviceDetails(4);
    let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    let productDetails = Cookie.getCookie(CART_DETAILS_FOR_LOGGED_IN_USER);
    let cartGuId = productDetails && JSON.parse(productDetails).guid;
    let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const bankName = localStorage.getItem(SELECTED_BANK_NAME);
    let paymentMode = localStorage.getItem(PAYMENT_MODE_TYPE);
    const binCardType = localStorage.getItem(BIN_CARD_TYPE);
    //later correct this code , added for quick fix
    if (binCardType && paymentMode !== "EMI") {
      paymentMode = `${binCardType.charAt(0).toUpperCase()}${binCardType
        .slice(1)
        .toLowerCase()} Card`;
    }
    let url = queryString.parse(window.location.search);
    let binNo = cardDetails.cardNumber.replace(/\s/g, "").substring(0, 6);
    let cartDetails;
    let whatsappNotification = Cookie.getCookie(WHATSAPP_NOTIFICATION);
    if (url && url.value) {
      cartGuId =
        url && url.value ? url.value : Cookie.getCookie(OLD_CART_GU_ID);
    } else {
      if (isFromRetryUrl) {
        cartGuId = retryCartGuid;
      } else {
        cartDetails = Cookie.getCookie(CART_DETAILS_FOR_LOGGED_IN_USER);
        cartGuId = JSON.parse(cartDetails).guid;
      }
    }
    if (isPaymentFailed) {
      cartGuId = Cookie.getCookie(OLD_CART_GU_ID);
    }
    let dcemi = localStorage.getItem(IS_DC_EMI_SELECTED);
    dispatch(collectPaymentOrderRequest());
    try {
      const result = await api.post(
        `${USER_CART_PATH}/${
          JSON.parse(userDetails).userName
        }/collectPaymentOrder?access_token=${
          JSON.parse(customerCookie).access_token
        }&saveCard=${true}&sameAsShipping=true&cartGuid=${cartGuId}&isPwa=true&platform=11&platformNumber=${PLAT_FORM_NUMBER}&bankName=${bankName}&paymentMode=${paymentMode}&channel=${CHANNEL}&isUpdatedPwa=true&appplatform&appversion=&deviceInfo=${deviceInfo}&networkInfo=${networkType}|&browserInfo=${browserName}|${fullVersion}&binNo=${binNo}&emiTenure=${
          cardDetails.emi_tenure
        }&cardBrandName=${cardBrandName}${
          whatsappNotification ? "&whatsapp=true" : ""
        }&dcemi=${dcemi}`,
        cartdetails
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        if (
          resultJson.errorCode === ERROR_CODE_FOR_BANK_OFFER_INVALID_1 ||
          resultJson.errorCode === ERROR_CODE_FOR_BANK_OFFER_INVALID_2
        ) {
          dispatch(collectPaymentOrderFailure(INVALID_COUPON_ERROR_MESSAGE));
          return dispatch(
            showModal(INVALID_BANK_COUPON_POPUP, {
              result: resultJson
            })
          );
        } else {
          throw new Error(resultJson.message);
        }
      }
      dispatch(collectPaymentOrderSuccess(resultJson));
      let cartExchangeDetails = localStorage.getItem(AC_CART_EXCHANGE_DETAILS);
      if (cartExchangeDetails) {
        dispatch(
          submitAppliancesExchangeData(
            resultJson.orderId,
            STATUS_PROCESSING,
            false
          )
        );
      }
      localStorage.setItem(STRIPE_DETAILS, JSON.stringify(resultJson));
      localStorage.setItem(IS_DC_EMI_SELECTED, false);
      if (resultJson.pspName === "Juspay") {
        dispatch(
          jusPayPaymentMethodType(
            resultJson.pspAuditId,
            cardDetails,
            paymentMode
          )
        );
      } else if (resultJson.pspName === "Stripe") {
        if (resultJson.pspRedirectUrl) {
          window.location.href = resultJson.pspRedirectUrl;
        } else {
          dispatch(getPrepaidOrderPaymentConfirmation(resultJson));
        }
      }
    } catch (e) {
      dispatch(
        displayToast(ERROR_MESSAGE_FOR_CREATE_JUS_PAY_CALL + " Please Retry.")
      );
      dispatch(collectPaymentOrderFailure(e));
    }
  };
}

export function getPrepaidOrderPaymentConfirmation(orderDetails) {
  return async (dispatch, getState, { api }) => {
    let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    let access_token = JSON.parse(customerCookie).access_token;
    const paymentMode = localStorage.getItem(PAYMENT_MODE_TYPE);
    let cartdetails = {
      cartGuid: orderDetails && orderDetails.cartGuid,
      pspName: orderDetails && orderDetails.pspName,
      pspOrderId: orderDetails && orderDetails.pspOrderId,
      retryFlag: orderDetails && orderDetails.paymentRetry,
      pspAuditId: orderDetails && orderDetails.pspAuditId,
      orderId: orderDetails && orderDetails.orderId
    };
    dispatch(getPrepaidOrderPaymentConfirmationRequest());
    try {
      const result = await api.post(
        `${USER_CART_PATH}/${
          JSON.parse(userDetails).userName
        }/payments/getPrepaidOrderPaymentConfirmation?access_token=${access_token}&paymentMode=${paymentMode}`,
        cartdetails
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (
        resultJsonStatus.status ||
        resultJson.paymentStatus.toLowerCase() === FAILURE_LOWERCASE
      ) {
        throw new Error(resultJsonStatus.message);
      }
      setDataLayer(ADOBE_ORDER_CONFIRMATION, resultJson);
      setDataLayerForOrderConfirmationDirectCalls(
        ADOBE_DIRECT_CALLS_FOR_ORDER_CONFIRMATION_SUCCESS,
        orderDetails && orderDetails.orderId
      );
      dispatch(getPrepaidOrderPaymentConfirmationSuccess(resultJson));
    } catch (e) {
      dispatch(getPrepaidOrderPaymentConfirmationFailure(e));
    }
  };
}

export function stripe_juspay_Tokenize(
  cardDetails,
  address,
  cartItems,
  paymentMode,
  isPaymentFailed,
  isFromRetryUrl,
  retryCartGuid
) {
  return async (dispatch, getState, { api }) => {
    const returnUrl = `${window.location.origin}/checkout/payment-method/cardPayment`;
    let orderDetails = "";
    let inventoryItems = cartItems;
    if (isFromRetryUrl && !isPaymentFailed) {
      inventoryItems = getValidDeliveryModeDetails(
        getState().cart.getUserAddressAndDeliveryModesByRetryPayment.products,
        true,
        getState().cart.getUserAddressAndDeliveryModesByRetryPayment
      );
      localStorage.setItem(CART_ITEM_COOKIE, JSON.stringify(inventoryItems));
    }
    if (cardDetails) {
      let juspayToken = await dispatch(
        jusPayTokenize(
          cardDetails,
          address,
          inventoryItems,
          paymentMode,
          isPaymentFailed
        )
      );
      let stripeToken = await dispatch(
        stripeTokenize(cardDetails, address, cartItems, paymentMode)
      );

      if (inventoryItems && address) {
        orderDetails = {
          wrapperItems: [
            {
              wrapperAddressItems: [
                {
                  addressItems: [
                    {
                      addressType: "Shipping",
                      firstName: address.firstName,
                      lastName: address.lastName,
                      addressLine1: address.line1,
                      addressLine2: address.line2 ? address.line2 : "",
                      addressLine3: address.line3 ? address.line3 : "",
                      country: address.country && address.country.isocode,
                      city: address.city,
                      postalCode: address.postalCode,
                      state: address.state,
                      phone: address.phone
                    }
                  ]
                }
              ]
            }
          ]
        };
      }

      let juspay_token_details = {
        pspName: "Juspay",
        token: "",
        cardToken: juspayToken && juspayToken.token,
        cardFingerprint: "",
        cardRefNo: "",
        returnUrl: returnUrl
      };
      let stripe_token_details = {
        pspName: "Stripe",
        token: stripeToken && stripeToken.id,
        cardToken: stripeToken && stripeToken.card && stripeToken.card.id,
        cardCountry:
          stripeToken && stripeToken.card && stripeToken.card.country,
        cardFingerprint:
          stripeToken && stripeToken.card && stripeToken.card.fingerprint,
        cardRefNo: "",
        returnUrl: returnUrl
      };
      let cardBrandName =
        stripeToken && stripeToken.card && stripeToken.card.brand;
      orderDetails.wrapperItems[0].wrapperPspItems = [
        { pspItems: [juspay_token_details, stripe_token_details] }
      ];
      dispatch(
        collectPaymentOrder(
          cardDetails,
          address,
          inventoryItems,
          isPaymentFailed,
          isFromRetryUrl,
          orderDetails,
          retryCartGuid,
          cardBrandName
        )
      );
    }
  };
}

export function stripe_juspay_TokenizeGiftCard(
  cardDetails,
  paymentMode,
  egvCartGuid,
  isFromRetryUrl
) {
  return async (dispatch, getState, { api }) => {
    const returnUrl = `${window.location.origin}/checkout/payment-method/cardPayment`;
    if (cardDetails) {
      let juspayToken = await dispatch(
        jusPayTokenizeForGiftCard(cardDetails, paymentMode, egvCartGuid)
      );
      let stripeToken = await dispatch(stripeTokenize(cardDetails));
      let orderDetails = {
        wrapperItems: [
          {
            wrapperInventoryItems: [
              {
                item: []
              }
            ],
            wrapperAddressItems: [
              {
                addressItems: []
              }
            ]
          }
        ]
      };
      let juspay_token_details = {
        pspName: "Juspay",
        token: "",
        cardToken: juspayToken && juspayToken.token,
        cardFingerprint: "",
        cardRefNo: "",
        returnUrl: returnUrl
      };
      let stripe_token_details = {
        pspName: "Stripe",
        token: stripeToken && stripeToken.id,
        cardToken: stripeToken && stripeToken.card && stripeToken.card.id,
        cardFingerprint:
          stripeToken && stripeToken.card && stripeToken.card.fingerprint,
        cardCountry:
          stripeToken && stripeToken.card && stripeToken.card.country,
        cardRefNo: "",
        returnUrl: returnUrl
      };
      let cardBrandName =
        stripeToken && stripeToken.card && stripeToken.card.brand;
      orderDetails.wrapperItems[0].wrapperPspItems = [
        { pspItems: [juspay_token_details, stripe_token_details] }
      ];
      dispatch(
        collectPaymentOrderForGiftCard(
          cardDetails,
          egvCartGuid,
          orderDetails,
          cardBrandName,
          isFromRetryUrl
        )
      );
    }
  };
}
export function collectPaymentOrderForSavedCards(
  cardDetails,
  cartItem,
  isPaymentFailed,
  isFromRetryUrl,
  retryCartGuid
) {
  return async (dispatch, getState, { api }) => {
    let browserName = browserAndDeviceDetails.getBrowserAndDeviceDetails(1);
    let fullVersion = browserAndDeviceDetails.getBrowserAndDeviceDetails(2);
    let deviceInfo = browserAndDeviceDetails.getBrowserAndDeviceDetails(3);
    let networkType = browserAndDeviceDetails.getBrowserAndDeviceDetails(4);
    let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    let productDetails = Cookie.getCookie(CART_DETAILS_FOR_LOGGED_IN_USER);
    let cartGuId = productDetails
      ? JSON.parse(productDetails).guid
      : Cookie.getCookie(OLD_CART_GU_ID);
    let cartDetails;
    let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    let address = JSON.parse(localStorage.getItem(ADDRESS_FOR_PLACE_ORDER));
    let paymentMode = localStorage.getItem(PAYMENT_MODE_TYPE);
    const binCardType = localStorage.getItem(BIN_CARD_TYPE);
    if (binCardType) {
      paymentMode = `${binCardType.charAt(0).toUpperCase()}${binCardType
        .slice(1)
        .toLowerCase()} Card`;
    }
    const bankName = localStorage.getItem(SELECTED_BANK_NAME);
    const returnUrl = `${window.location.origin}/checkout/payment-method/cardPayment`;
    let orderDetails = "";
    let whatsappNotification = Cookie.getCookie(WHATSAPP_NOTIFICATION);
    let inventoryItems = cartItem;

    if (isPaymentFailed) {
      let url = queryString.parse(window.location.search);
      cartGuId =
        url && url.value ? url.value : Cookie.getCookie(OLD_CART_GU_ID);
    } else {
      if (isFromRetryUrl) {
        cartGuId = retryCartGuid;
        if (!isPaymentFailed) {
          inventoryItems = getValidDeliveryModeDetails(
            getState().cart.getUserAddressAndDeliveryModesByRetryPayment
              .products,
            true,
            getState().cart.getUserAddressAndDeliveryModesByRetryPayment
          );
          localStorage.setItem(
            CART_ITEM_COOKIE,
            JSON.stringify(inventoryItems)
          );
        }
      } else {
        cartDetails = Cookie.getCookie(CART_DETAILS_FOR_LOGGED_IN_USER);
        cartGuId = cartDetails
          ? JSON.parse(cartDetails).guid
          : Cookie.getCookie(OLD_CART_GU_ID);
      }
    }
    if (inventoryItems && address) {
      orderDetails = {
        wrapperItems: [
          {
            wrapperAddressItems: [
              {
                addressItems: [
                  {
                    addressType: "Shipping",
                    firstName: address.firstName,
                    lastName: address.lastName,
                    addressLine1: address.line1,
                    addressLine2: address.line2 ? address.line2 : "",
                    addressLine3: address.line3 ? address.line3 : "",
                    country: address.country && address.country.isocode,
                    city: address.city,
                    postalCode: address.postalCode,
                    state: address.state,
                    phone: address.phone
                  }
                ]
              }
            ],
            wrapperPspItems: [
              {
                pspItems: [
                  {
                    pspName: "Juspay",
                    token: "",
                    cardToken: cardDetails && cardDetails.cardToken,
                    cardFingerprint: cardDetails && cardDetails.cardFingerprint,
                    cardRefNo: cardDetails && cardDetails.cardRefNo,
                    returnUrl: returnUrl
                  },
                  {
                    pspName: "Stripe",
                    token: "",
                    cardToken: "",
                    cardCountry: "",
                    cardFingerprint: cardDetails && cardDetails.cardFingerprint,
                    cardRefNo: cardDetails && cardDetails.cardRefNo,
                    returnUrl: returnUrl
                  }
                ]
              }
            ]
          }
        ]
      };
    }

    dispatch(collectPaymentOrderRequest());
    try {
      const result = await api.post(
        `${USER_CART_PATH}/${
          JSON.parse(userDetails).userName
        }/collectPaymentOrder?access_token=${
          JSON.parse(customerCookie).access_token
        }&saveCard=${false}&sameAsShipping=true&cartGuid=${cartGuId}&isPwa=true&platform=11&platformNumber=${PLAT_FORM_NUMBER}&bankName=${bankName}&paymentMode=${paymentMode}&channel=${CHANNEL}&isUpdatedPwa=true&appplatform&appversion=&deviceInfo=${deviceInfo}&networkInfo=${networkType}|&browserInfo=${browserName}|${fullVersion}&binNo=&emiTenure=&cardBrandName=${
          whatsappNotification ? "&whatsapp=true" : ""
        }`,
        orderDetails
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        if (
          resultJson.errorCode === ERROR_CODE_FOR_BANK_OFFER_INVALID_1 ||
          resultJson.errorCode === ERROR_CODE_FOR_BANK_OFFER_INVALID_2
        ) {
          dispatch(collectPaymentOrderFailure(INVALID_COUPON_ERROR_MESSAGE));
          return dispatch(
            showModal(INVALID_BANK_COUPON_POPUP, {
              result: resultJson
            })
          );
        } else {
          throw new Error(resultJson.message);
        }
      }
      localStorage.setItem(STRIPE_DETAILS, JSON.stringify(resultJson));
      dispatch(collectPaymentOrderSuccess(resultJson));
      let cartExchangeDetails = localStorage.getItem(AC_CART_EXCHANGE_DETAILS);
      if (cartExchangeDetails) {
        dispatch(
          submitAppliancesExchangeData(
            resultJson.orderId,
            STATUS_PROCESSING,
            false
          )
        );
      }
      dispatch(
        jusPayPaymentMethodTypeForSavedCards(resultJson.pspAuditId, cardDetails)
      );
    } catch (e) {
      dispatch(
        displayToast(ERROR_MESSAGE_FOR_CREATE_JUS_PAY_CALL + " Please Retry.")
      );
      dispatch(collectPaymentOrderFailure(e));
    }
  };
}

export function collectPaymentOrderForGiftCardFromSavedCards(
  cardDetails,
  guId
) {
  return async (dispatch, getState, { api }) => {
    let browserName = browserAndDeviceDetails.getBrowserAndDeviceDetails(1);
    let fullVersion = browserAndDeviceDetails.getBrowserAndDeviceDetails(2);
    let deviceInfo = browserAndDeviceDetails.getBrowserAndDeviceDetails(3);
    let networkType = browserAndDeviceDetails.getBrowserAndDeviceDetails(4);
    let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    let whatsappNotification = Cookie.getCookie(WHATSAPP_NOTIFICATION);
    let paymentMode = localStorage.getItem(PAYMENT_MODE_TYPE);
    const binCardType = localStorage.getItem(BIN_CARD_TYPE);
    if (binCardType) {
      paymentMode = `${binCardType.charAt(0).toUpperCase()}${binCardType
        .slice(1)
        .toLowerCase()} Card`;
    }
    const bankName = localStorage.getItem(SELECTED_BANK_NAME);
    const returnUrl = `${window.location.origin}/checkout/payment-method/cardPayment`;
    let orderDetails = "";
    orderDetails = {
      wrapperItems: [
        {
          wrapperInventoryItems: [],
          wrapperAddressItems: [
            {
              addressItems: []
            }
          ],
          wrapperPspItems: [
            {
              pspItems: [
                {
                  pspName: "Juspay",
                  token: "",
                  cardToken: "",
                  cardFingerprint: cardDetails && cardDetails.cardFingerprint,
                  cardRefNo: cardDetails && cardDetails.cardRefNo,
                  returnUrl: returnUrl
                },
                {
                  pspName: "Stripe",
                  token: "",
                  cardToken: "",
                  cardCountry: "",
                  cardFingerprint: cardDetails && cardDetails.cardFingerprint,
                  cardRefNo: cardDetails && cardDetails.cardRefNo,
                  returnUrl: returnUrl
                }
              ]
            }
          ]
        }
      ]
    };

    dispatch(collectPaymentOrderForGiftCardRequest());
    try {
      const result = await api.post(
        `${USER_CART_PATH}/${
          JSON.parse(userDetails).userName
        }/collectPaymentOrder?access_token=${
          JSON.parse(customerCookie).access_token
        }&saveCard=${false}&sameAsShipping=true&cartGuid=${guId}&isPwa=true&platform=11&platformNumber=${PLAT_FORM_NUMBER}&bankName=${bankName}&paymentMode=${paymentMode}&channel=${CHANNEL}&isUpdatedPwa=true&appplatform&appversion=&deviceInfo=${deviceInfo}&networkInfo=${networkType}|&browserInfo=${browserName}|${fullVersion}&binNo=&emiTenure=&cardBrandName=${
          whatsappNotification ? "&whatsapp=true" : ""
        }`,
        orderDetails
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      localStorage.setItem(STRIPE_DETAILS, JSON.stringify(resultJson));
      dispatch(collectPaymentOrderForGiftCardSuccess(resultJson));
      let cartExchangeDetails = localStorage.getItem(AC_CART_EXCHANGE_DETAILS);
      if (cartExchangeDetails) {
        dispatch(
          submitAppliancesExchangeData(
            resultJson.orderId,
            STATUS_PROCESSING,
            false
          )
        );
      }
      dispatch(
        jusPayPaymentMethodTypeForGiftCardFromSavedCards(
          resultJson.pspAuditId,
          cardDetails,
          guId
        )
      );
    } catch (e) {
      dispatch(
        displayToast(ERROR_MESSAGE_FOR_CREATE_JUS_PAY_CALL + " Please Retry.")
      );
      dispatch(collectPaymentOrderForGiftCardFailure(e));
    }
  };
}

export function collectPaymentOrderForNetBanking(
  paymentMethodType,
  cartItem,
  bankCode,
  pinCode,
  isFromRetryUrl,
  retryCartGuid,
  bankName,
  isPaymentFailed
) {
  return async (dispatch, getState, { api }) => {
    let browserName = browserAndDeviceDetails.getBrowserAndDeviceDetails(1);
    let fullVersion = browserAndDeviceDetails.getBrowserAndDeviceDetails(2);
    let deviceInfo = browserAndDeviceDetails.getBrowserAndDeviceDetails(3);
    let networkType = browserAndDeviceDetails.getBrowserAndDeviceDetails(4);
    let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    let productDetails = Cookie.getCookie(CART_DETAILS_FOR_LOGGED_IN_USER);
    let cartGuId = productDetails
      ? JSON.parse(productDetails).guid
      : Cookie.getCookie(OLD_CART_GU_ID);
    let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    let address = JSON.parse(localStorage.getItem(ADDRESS_FOR_PLACE_ORDER));
    let whatsappNotification = Cookie.getCookie(WHATSAPP_NOTIFICATION);

    const returnUrl = `${window.location.origin}/checkout/payment-method/cardPayment`;
    let orderDetails,
      cartDetails = "";
    let inventoryItems = cartItem;
    if (isPaymentFailed) {
      let url = queryString.parse(window.location.search);
      cartGuId =
        url && url.value ? url.value : Cookie.getCookie(OLD_CART_GU_ID);
    } else {
      if (isFromRetryUrl) {
        cartGuId = retryCartGuid;
        if (!isPaymentFailed) {
          inventoryItems = getValidDeliveryModeDetails(
            getState().cart.getUserAddressAndDeliveryModesByRetryPayment
              .products,
            true,
            getState().cart.getUserAddressAndDeliveryModesByRetryPayment
          );
          localStorage.setItem(
            CART_ITEM_COOKIE,
            JSON.stringify(inventoryItems)
          );
        }
      } else {
        cartDetails = Cookie.getCookie(CART_DETAILS_FOR_LOGGED_IN_USER);
        cartGuId = cartDetails
          ? JSON.parse(cartDetails).guid
          : Cookie.getCookie(OLD_CART_GU_ID);
      }
    }
    let currentSelectedPaymentMode = localStorage.getItem(PAYMENT_MODE_TYPE);
    let firstName = bankCode;
    if (currentSelectedPaymentMode === PAYPAL) {
      currentSelectedPaymentMode = "Netbanking";
      firstName = "NB_PAYPAL";
    }
    if (inventoryItems && address) {
      orderDetails = {
        wrapperItems: [
          {
            wrapperAddressItems: [
              {
                addressItems: [
                  {
                    addressType: "Shipping",
                    firstName: firstName,
                    lastName: address.lastName,
                    addressLine1: address.line1,
                    addressLine2: address.line2 ? address.line2 : "",
                    addressLine3: address.line3 ? address.line3 : "",
                    country: address.country && address.country.isocode,
                    city: address.city,
                    postalCode: address.postalCode,
                    state: address.state,
                    phone: address.phone
                  }
                ]
              }
            ],
            wrapperPspItems: [
              {
                pspItems: [
                  {
                    pspName: "Juspay",
                    token: "",
                    cardToken: "",
                    cardFingerprint: "",
                    cardRefNo: "",
                    returnUrl: returnUrl
                  },
                  {
                    pspName: "Stripe",
                    token: "",
                    cardToken: "",
                    cardCountry: "",
                    cardFingerprint: "",
                    cardRefNo: "",
                    returnUrl: returnUrl
                  }
                ]
              }
            ]
          }
        ]
      };
    }

    dispatch(collectPaymentOrderRequest());
    try {
      const result = await api.post(
        `${USER_CART_PATH}/${
          JSON.parse(userDetails).userName
        }/collectPaymentOrder?access_token=${
          JSON.parse(customerCookie).access_token
        }&saveCard=false&sameAsShipping=true&cartGuid=${cartGuId}&isPwa=true&platform=11&platformNumber=${PLAT_FORM_NUMBER}&bankName=${bankName}&paymentMode=${currentSelectedPaymentMode}&firstName=${firstName}&channel=${CHANNEL}&isUpdatedPwa=true&appplatform&appversion=&deviceInfo=${deviceInfo}&networkInfo=${networkType}|&browserInfo=${browserName}|${fullVersion}&binNo=&emiTenure=&cardBrandName=${
          whatsappNotification ? "&whatsapp=true" : ""
        }`,
        orderDetails
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        if (
          resultJson.errorCode === ERROR_CODE_FOR_BANK_OFFER_INVALID_1 ||
          resultJson.errorCode === ERROR_CODE_FOR_BANK_OFFER_INVALID_2
        ) {
          dispatch(collectPaymentOrderFailure(INVALID_COUPON_ERROR_MESSAGE));
          return dispatch(
            showModal(INVALID_BANK_COUPON_POPUP, {
              result: resultJson
            })
          );
        } else {
          throw new Error(resultJson.message);
        }
      }
      localStorage.setItem(STRIPE_DETAILS, JSON.stringify(resultJson));
      dispatch(collectPaymentOrderSuccess(resultJson));
      let cartExchangeDetails = localStorage.getItem(AC_CART_EXCHANGE_DETAILS);
      if (cartExchangeDetails) {
        dispatch(
          submitAppliancesExchangeData(
            resultJson.orderId,
            STATUS_PROCESSING,
            false
          )
        );
      }
      if (localStorage.getItem(PAYMENT_MODE_TYPE) === PAYPAL) {
        dispatch(
          jusPayPaymentMethodTypeForPaypal(
            paymentMethodType,
            resultJson.pspAuditId,
            bankCode
          )
        );
      } else if (localStorage.getItem(PAYMENT_MODE_TYPE) === "Instacred") {
        dispatch(
          jusPayPaymentMethodTypeForInstaCred(
            paymentMethodType,
            resultJson.pspAuditId,
            bankCode
          )
        );
      } else {
        dispatch(
          jusPayPaymentMethodTypeForNetBanking(
            paymentMethodType,
            resultJson.pspAuditId,
            bankCode
          )
        );
      }
    } catch (e) {
      dispatch(
        displayToast(ERROR_MESSAGE_FOR_CREATE_JUS_PAY_CALL + " Please Retry.")
      );
      dispatch(collectPaymentOrderFailure(e));
    }
  };
}
export function collectPaymentOrderForGiftCardNetBanking(
  egvCartGuid,
  bankCode,
  bankName
) {
  return async (dispatch, getState, { api }) => {
    const returnUrl = `${window.location.origin}/checkout/payment-method/cardPayment`;
    let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    const currentSelectedPaymentMode = localStorage.getItem(PAYMENT_MODE_TYPE);
    let whatsappNotification = Cookie.getCookie(WHATSAPP_NOTIFICATION);
    let browserName = browserAndDeviceDetails.getBrowserAndDeviceDetails(1);
    let fullVersion = browserAndDeviceDetails.getBrowserAndDeviceDetails(2);
    let deviceInfo = browserAndDeviceDetails.getBrowserAndDeviceDetails(3);
    let networkType = browserAndDeviceDetails.getBrowserAndDeviceDetails(4);
    let orderDetails = {
      wrapperItems: [
        {
          wrapperInventoryItems: [
            {
              item: []
            }
          ],
          wrapperAddressItems: [
            {
              addressItems: []
            }
          ],
          wrapperPspItems: [
            {
              pspItems: [
                {
                  pspName: "Juspay",
                  token: "",
                  cardToken: "",
                  cardFingerprint: "",
                  cardRefNo: "",
                  returnUrl: returnUrl
                },
                {
                  pspName: "Stripe",
                  token: "",
                  cardToken: "",
                  cardCountry: "",
                  cardFingerprint: "",
                  cardRefNo: "",
                  returnUrl: returnUrl
                }
              ]
            }
          ]
        }
      ]
    };

    dispatch(collectPaymentOrderForGiftCardRequest());
    try {
      const result = await api.post(
        `${USER_CART_PATH}/${
          JSON.parse(userDetails).userName
        }/collectPaymentOrder?access_token=${
          JSON.parse(customerCookie).access_token
        }&saveCard=false&sameAsShipping=true&cartGuid=${egvCartGuid}&isPwa=true&platform=11&platformNumber=${PLAT_FORM_NUMBER}&bankName=${bankName}&paymentMode=${currentSelectedPaymentMode}&channel=${CHANNEL}&isUpdatedPwa=true&appplatform&appversion=&deviceInfo=${deviceInfo}&networkInfo=${networkType}|&browserInfo=${browserName}|${fullVersion}&binNo=&emiTenure=&cardBrandName=${
          whatsappNotification ? "&whatsapp=true" : ""
        }`,
        orderDetails
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      localStorage.setItem(STRIPE_DETAILS, JSON.stringify(resultJson));
      dispatch(collectPaymentOrderForGiftCardSuccess(resultJson, egvCartGuid));
      let cartExchangeDetails = localStorage.getItem(AC_CART_EXCHANGE_DETAILS);
      if (cartExchangeDetails) {
        dispatch(
          submitAppliancesExchangeData(
            resultJson.orderId,
            STATUS_PROCESSING,
            false
          )
        );
      }
      dispatch(
        jusPayPaymentMethodTypeForGiftCardNetBanking(
          resultJson.pspAuditId,
          bankCode,
          egvCartGuid
        )
      );
    } catch (e) {
      dispatch(collectPaymentOrderForGiftCardFailure(e.message));
    }
  };
}
export function collectPaymentOrderForCliqCashRequest() {
  return {
    type: COLLECT_PAYMENT_ORDER_FOR_CLIQCASH_REQUEST,
    status: REQUESTING
  };
}

export function collectPaymentOrderForCliqCashSuccess(
  collectPaymentOrder,
  guid
) {
  return {
    type: COLLECT_PAYMENT_ORDER_FOR_CLIQCASH_SUCCESS,
    status: SUCCESS,
    collectPaymentOrder,
    guid
  };
}

export function collectPaymentOrderForCliqCashFailure(error) {
  return {
    type: COLLECT_PAYMENT_ORDER_FOR_CLIQCASH_FAILURE,
    status: ERROR,
    error
  };
}
export function collectPaymentOrderForCliqCash(
  pinCode,
  cartItem,
  isPaymentFailed = false
) {
  return async (dispatch, getState, { api }) => {
    let browserName = browserAndDeviceDetails.getBrowserAndDeviceDetails(1);
    let fullVersion = browserAndDeviceDetails.getBrowserAndDeviceDetails(2);
    let deviceInfo = browserAndDeviceDetails.getBrowserAndDeviceDetails(3);
    let networkType = browserAndDeviceDetails.getBrowserAndDeviceDetails(4);
    let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    let productDetails = Cookie.getCookie(CART_DETAILS_FOR_LOGGED_IN_USER);
    let cartGuId = productDetails
      ? JSON.parse(productDetails).guid
      : Cookie.getCookie(OLD_CART_GU_ID);
    let cartDetails;
    let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    let address = JSON.parse(localStorage.getItem(ADDRESS_FOR_PLACE_ORDER));
    const paymentMode = localStorage.getItem(PAYMENT_MODE_TYPE);
    const bankName = localStorage.getItem(SELECTED_BANK_NAME);
    let whatsappNotification = Cookie.getCookie(WHATSAPP_NOTIFICATION);
    const returnUrl = `${window.location.origin}/checkout/payment-method/cardPayment`;
    let orderDetails = "";
    let inventoryItems = cartItem;
    if (isPaymentFailed) {
      let url = queryString.parse(window.location.search);
      cartGuId =
        url && url.value ? url.value : Cookie.getCookie(OLD_CART_GU_ID);
    } else {
      cartDetails = Cookie.getCookie(CART_DETAILS_FOR_LOGGED_IN_USER);
      cartGuId = cartDetails
        ? JSON.parse(cartDetails).guid
        : Cookie.getCookie(OLD_CART_GU_ID);
    }
    if (inventoryItems && address) {
      orderDetails = {
        wrapperItems: [
          {
            wrapperAddressItems: [
              {
                addressItems: [
                  {
                    addressType: "Shipping",
                    firstName: address.firstName,
                    lastName: address.lastName,
                    addressLine1: address.line1,
                    addressLine2: address.line2 ? address.line2 : "",
                    addressLine3: address.line3 ? address.line3 : "",
                    country: address.country && address.country.isocode,
                    city: address.city,
                    postalCode: address.postalCode,
                    state: address.state,
                    phone: address.phone
                  }
                ]
              }
            ],
            wrapperPspItems: [
              {
                pspItems: [
                  {
                    pspName: "Juspay",
                    token: "",
                    cardToken: "",
                    cardFingerprint: "",
                    cardRefNo: "",
                    returnUrl: returnUrl
                  },
                  {
                    pspName: "Stripe",
                    token: "",
                    cardToken: "",
                    cardCountry: "",
                    cardFingerprint: "",
                    cardRefNo: "",
                    returnUrl: returnUrl
                  }
                ]
              }
            ]
          }
        ]
      };
    }

    dispatch(collectPaymentOrderForCliqCashRequest());
    try {
      const result = await api.post(
        `${USER_CART_PATH}/${
          JSON.parse(userDetails).userName
        }/collectPaymentOrder?access_token=${
          JSON.parse(customerCookie).access_token
        }&saveCard=false&sameAsShipping=true&cartGuid=${cartGuId}&isPwa=true&platform=11&platformNumber=${PLAT_FORM_NUMBER}&bankName=${bankName}&paymentMode=${paymentMode}&channel=${CHANNEL}&isUpdatedPwa=true&appplatform&appversion=&deviceInfo=${deviceInfo}&networkInfo=${networkType}|&browserInfo=${browserName}|${fullVersion}&binNo=&emiTenure=&cardBrandName=${
          whatsappNotification ? "&whatsapp=true" : ""
        }`,
        orderDetails
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        if (
          resultJson.errorCode === ERROR_CODE_FOR_BANK_OFFER_INVALID_1 ||
          resultJson.errorCode === ERROR_CODE_FOR_BANK_OFFER_INVALID_2
        ) {
          dispatch(
            collectPaymentOrderForCliqCashFailure(INVALID_COUPON_ERROR_MESSAGE)
          );
          return dispatch(
            showModal(INVALID_BANK_COUPON_POPUP, {
              result: resultJson
            })
          );
        } else {
          throw new Error(resultJson.message);
        }
      }
      localStorage.setItem(STRIPE_DETAILS, JSON.stringify(resultJson));
      dispatch(setBagCount(0));
      localStorage.setItem(
        ORDER_ID_FOR_PAYMENT_CONFIRMATION_PAGE,
        resultJson.orderId
      );
      localStorage.setItem(CART_BAG_DETAILS, []);
      dispatch(collectPaymentOrderForCliqCashSuccess(resultJson));
      let cartExchangeDetails = localStorage.getItem(AC_CART_EXCHANGE_DETAILS);
      if (cartExchangeDetails) {
        dispatch(
          submitAppliancesExchangeData(
            resultJson.orderId,
            STATUS_PROCESSING,
            false
          )
        );
      }
      dispatch(getPrepaidOrderPaymentConfirmation(resultJson));
      dispatch(generateCartIdAfterOrderPlace());
    } catch (e) {
      dispatch(
        displayToast(ERROR_MESSAGE_FOR_CREATE_JUS_PAY_CALL + " Please Retry.")
      );
      dispatch(collectPaymentOrderForCliqCashFailure(e));
    }
  };
}

export function removeExchangeRequest() {
  return {
    type: REMOVE_EXCHANGE_REQUEST,
    status: REQUESTING
  };
}
export function removeExchangeSuccess(data) {
  return {
    type: REMOVE_EXCHANGE_SUCCESS,
    status: SUCCESS,
    data
  };
}

export function removeExchangeFailure(error) {
  return {
    type: REMOVE_EXCHANGE_FAILURE,
    status: ERROR,
    error
  };
}
export function removeExchange(data) {
  return async (dispatch, getState, { api }) => {
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    const globalCookie = Cookie.getCookie(GLOBAL_ACCESS_TOKEN);
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const cartDetailsCookie = Cookie.getCookie(CART_DETAILS_FOR_LOGGED_IN_USER);
    const cartDetailsForAnonymous = Cookie.getCookie(
      CART_DETAILS_FOR_ANONYMOUS
    );
    const defaultPinCode = localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE);
    let user = "anonymous";
    let cartId =
      cartDetailsForAnonymous && JSON.parse(cartDetailsForAnonymous).guid;
    let guId = cartId;
    let accessToken = globalCookie && JSON.parse(globalCookie).access_token;
    if (customerCookie) {
      user = JSON.parse(userDetails).userName;
      cartId = cartDetailsCookie && JSON.parse(cartDetailsCookie).code;
      guId = cartDetailsCookie && JSON.parse(cartDetailsCookie).guid;
      accessToken = JSON.parse(customerCookie).access_token;
    }
    dispatch(removeExchangeRequest());
    try {
      const result = await api.getMiddlewareUrl(
        `v2/mpl/products/cancelExchange?access_token=${accessToken}&guid=${guId}&entryNumber=${data.entryNumber}&quoteId=${data.quoteId}&imeiNumber=${data.IMEINumber}`
      );
      const resultJson = await result.json();
      if (
        resultJson &&
        resultJson.status &&
        resultJson.status.toLowerCase() === "success"
      ) {
        //display toast and call cartdetails
        dispatch(displayToast("Exchange for product removed"));
        dispatch(removeExchangeSuccess(resultJson));
        dispatch(getCartDetails(user, accessToken, cartId, defaultPinCode));
      }
      if (
        resultJson &&
        resultJson.status &&
        resultJson.status.toLowerCase() === "failure"
      ) {
        if (
          resultJson.error &&
          resultJson.errorCode &&
          resultJson.errorCode === "EX05"
        ) {
          dispatch(displayToast(resultJson.error));
        }
        return dispatch(removeExchangeFailure(resultJson.message));
      }
      return resultJson;
    } catch (e) {
      return dispatch(removeExchangeFailure(e.message));
    }
  };
}

// get cart code and guid for logged in user
// this is only get request which gives existing cart code and guid
export function getCartCodeAndGuidForLoggedInUser() {
  let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
  let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
  return async (dispatch, getState, { api }) => {
    try {
      const result = await api.get(
        `${USER_CART_PATH}/${
          JSON.parse(userDetails).userName
        }/carts?access_token=${
          JSON.parse(customerCookie).access_token
        }&isPwa=true&channel=${CHANNEL}`
      );
      const resultJson = await result.json();
      return resultJson;
    } catch (e) {
      console.log(e.message);
    }
  };
}
export function getCustomInstructionRequest() {
  return {
    type: GET_CUSTOM_COMPONENT_REQUEST,
    status: REQUESTING
  };
}

export function getCustomInstructionSuccess(customComponent) {
  return {
    type: GET_CUSTOM_COMPONENT_SUCCESS,
    status: SUCCESS,
    customComponent
  };
}

export function getCustomInstructionFailure(error) {
  return {
    type: GET_CUSTOM_COMPONENT_FAILURE,
    status: ERROR,
    error
  };
}
export function getCustomInstruction() {
  return async (dispatch, getState, { api }) => {
    dispatch(getCustomInstructionRequest());
    try {
      const result = await api.customGetMiddlewareUrl(
        `/otatacliq/getApplicationProperties.json?propertyNames=MPL_GET_CUSTOM_COMPONENT`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }

      return dispatch(getCustomInstructionSuccess(resultJson));
    } catch (e) {
      dispatch(getCustomInstructionFailure(e.message));
    }
  };
}
export function getEMIEligibilityDetailsRequest() {
  return {
    type: GET_EMI_ELIGIBILITY_REQUEST,
    status: REQUESTING
  };
}

export function getEMIEligibilityDetailsSuccess(emiEligibility) {
  return {
    type: GET_EMI_ELIGIBILITY_SUCCESS,
    status: SUCCESS,
    emiEligibility
  };
}
export function getEMIEligibilityDetailsFailure(error) {
  return {
    type: GET_EMI_ELIGIBILITY_FAILURE,
    status: ERROR,
    error
  };
}
/**
 * This API is being changes from `/getDCEmiEligibility' to `/getEMIEligibility`.
 * Updated API will give bool response for the NCE & Standard section of Credit Card and Debit Card.
 */
export function getEMIEligibilityDetails(cartGuId) {
  if (!cartGuId) {
    const cartDetails = Cookie.getCookie("cartDetails");
    cartGuId =
      (cartDetails && JSON.parse(cartDetails).guid) ||
      Cookie.getCookie("oldCartGuId");
  }
  let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
  return async (dispatch, getState, { api }) => {
    const customerAccessToken = await getCustomerAccessToken();
    dispatch(getEMIEligibilityDetailsRequest());
    try {
      const result = await api.get(
        `${USER_CART_PATH}/${
          JSON.parse(userDetails).userName
        }/payments/getEmiEligibility?platformNumber=${PLAT_FORM_NUMBER}&access_token=${customerAccessToken}&cartGuid=${cartGuId}`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJson.nonEmiProdList) {
        const prodList = {
          data: resultJson.nonEmiProdList
        };
        dispatch(showModal(NON_EMI_ELIGIBLE_TO_WISHLIST, prodList));
        return dispatch(getEMIEligibilityDetailsSuccess(resultJson));
      }
      if (resultJsonStatus.status && !resultJson.error) {
        throw new Error(resultJsonStatus.message);
      }
      if (resultJson && resultJson.error) {
        dispatch(displayToast(resultJson.error));
      }
      return dispatch(getEMIEligibilityDetailsSuccess(resultJson));
    } catch (e) {
      return dispatch(getEMIEligibilityDetailsFailure(e.message));
    }
  };
}

export function getBankDetailsforDCEmiRequest() {
  return {
    type: DC_EMI_BANK_DETAILS_REQUEST,
    status: REQUESTING
  };
}
export function getBankDetailsforDCEmiSuccess(dCEmiBankDetails) {
  return {
    type: DC_EMI_BANK_DETAILS_SUCCESS,
    status: SUCCESS,
    dCEmiBankDetails
  };
}

export function getBankDetailsforDCEmiFailure(error) {
  return {
    type: DC_EMI_BANK_DETAILS_FAILURE,
    status: ERROR,
    error
  };
}

export function getBankDetailsforDCEmi(price, cartGuid) {
  let globalCookie = Cookie.getCookie(GLOBAL_ACCESS_TOKEN);
  let cartDetails = Cookie.getCookie(CART_DETAILS_FOR_LOGGED_IN_USER);
  let cartId = cartGuid;
  let retryCartID = localStorage.getItem(RETRY_PAYMENT_CART_ID);
  if (!cartId) {
    if (retryCartID) {
      cartId = retryCartID.replace(/"/g, "");
    } else {
      cartId =
        cartDetails && JSON.parse(cartDetails).guid
          ? JSON.parse(cartDetails).guid
          : Cookie.getCookie(OLD_CART_GU_ID);
    }
  }
  return async (dispatch, getState, { api }) => {
    dispatch(getBankDetailsforDCEmiRequest());
    try {
      const result = await api.get(
        `${CART_PATH}/getBankDetailsforDCEmi?platformNumber=${PLAT_FORM_NUMBER}&productValue=${price}&access_token=${
          JSON.parse(globalCookie).access_token
        }&guid=${cartId}&emiConvChargeFlag=true`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      dispatch(getBankDetailsforDCEmiSuccess(resultJson));
    } catch (e) {
      dispatch(getBankDetailsforDCEmiFailure(e.message));
    }
  };
}

export function submitAppliancesExchangeDataRequest() {
  return {
    type: SUBMIT_APPLIANCES_EXCHANGE_DATA_REQUEST,
    status: REQUESTING
  };
}

export function submitAppliancesExchangeDataSuccess(data) {
  return {
    type: SUBMIT_APPLIANCES_EXCHANGE_DATA_SUCCESS,
    status: SUCCESS,
    data
  };
}

export function submitAppliancesExchangeDataFailure(error) {
  return {
    type: SUBMIT_APPLIANCES_EXCHANGE_DATA_FAILURE,
    status: ERROR,
    error
  };
}

export function submitAppliancesExchangeData(
  orderId,
  status,
  removeLocalStorage,
  apiCallCount = 0
) {
  let cartExchangeDetails = localStorage.getItem(AC_CART_EXCHANGE_DETAILS);
  let parsedExchangeDetails = JSON.parse(cartExchangeDetails);
  if (!orderId || !parsedExchangeDetails) {
    return false;
  }
  let data = {
    orderId: orderId,
    status: status,
    exchangeDetails: parsedExchangeDetails
  };
  return async (dispatch, getState, { api }) => {
    dispatch(submitAppliancesExchangeDataRequest());
    try {
      const result = await api.postWithoutApiUrlRoot(
        env.REACT_APP_SUBMIT_APPLIANCES_EXCHANGE_DATA,
        data
      );
      if (result.status === 200) {
        const resultJson = await result.json();
        dispatch(submitAppliancesExchangeDataSuccess(resultJson));
        if (removeLocalStorage) {
          localStorage.removeItem(AC_PDP_EXCHANGE_DETAILS);
          localStorage.removeItem(AC_CART_EXCHANGE_DETAILS);
        }
      } else {
        if (apiCallCount === 0) {
          apiCallCount = apiCallCount + 1;
          dispatch(
            submitAppliancesExchangeData(
              orderId,
              status,
              removeLocalStorage,
              apiCallCount
            )
          );
        } else {
          dispatch(submitAppliancesExchangeDataFailure(result.statusText));
        }
      }
    } catch (e) {
      dispatch(submitAppliancesExchangeDataFailure(e.message));
    }
  };
}

export function checkApplianceExchangeData() {
  return async (dispatch, getState, { api }) => {
    let cartDetails = getCartDetailsForLoggedInUser();
    let cartExchangeDetails = localStorage.getItem(AC_CART_EXCHANGE_DETAILS);
    let parsedExchangeDetails =
      cartExchangeDetails && JSON.parse(cartExchangeDetails);
    if (parsedExchangeDetails && parsedExchangeDetails.length > 0) {
      let exchangeProductUssids = parsedExchangeDetails.map(exchangeProduct => {
        return exchangeProduct.ussid;
      });
      let productIds = [];
      exchangeProductUssids.map(exchangeProductUssid => {
        cartDetails.products.map(product => {
          if (product.USSID === exchangeProductUssid) {
            productIds.push(product.productcode);
          }
        });
      });
      let productIdList = productIds.join(",");
      const pincode = localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE);
      dispatch(appliancesExchangeCheckPincode(productIdList, pincode));
    }
  };
}
