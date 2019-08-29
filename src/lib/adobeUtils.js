import { getCookieValue, getCookie } from "./Cookie.js";
import cloneDeep from "lodash.clonedeep";
import { setInterval, clearInterval } from "timers";
import * as constants from "../lib/constants.js";
import {
  LOGIN_WITH_EMAIL,
  LOGIN_WITH_MOBILE,
  FACEBOOK_PLATFORM,
  GOOGLE_PLUS_PLATFORM
} from "../auth/actions/user.actions";
import { CATEGORY_REGEX } from "../plp/components/PlpBrandCategoryWrapper.js";
import { IS_COMING_FOR_REVIEW_PAGE } from "./constants";
export const ADOBE_TARGET_COOKIE_NAME =
  "AMCV_E9174ABF55BA76BA7F000101%40AdobeOrg";
export const ADOBE_TARGET_SPLIT_VALUE = "%7C";
export const ADOBE_TARGET_MCMID = "MCMID";
export const ADOBE_TARGET_WAIT_TIME = 2000;
export const FAQ = "faq";
export const TC = "tc_click";

export const BUY_GIFT_CARD = "buy_gift_card";
export const ADD_GIFT_CARD = "add_gift_card";
export const ADD_GIFT_CARD_SUBMIT = "add_gift_card_submit";
export const BUY_GIFT_CARD_SUBMIT = "buy_gift_card_submit";
export const CLIQ_CASH_LAST_FIVE_TRANSACTION = "transaction_click";
export const CLIQ_CASH_VIEW_ALL_TRANSACTION = "transtn_menu_click";
//const for setting data layer for the FAQ and TC track
export const SET_DATA_LAYER_FAQ = "SET_DATA_LAYER_FAQ";
export const SET_DATA_LAYER_TC = "SET_DATA_LAYER_TC";
//const for setting data layer for the Buy and Add gift card track
export const SET_DATA_LAYER_ADD_GIFT_CARD = "SET_DATA_LAYER_ADD_GIFT_CARD";
export const SET_DATA_LAYER_BUY_GIFT_CARD = "SET_DATA_LAYER_BUY_GIFT_CARD";
export const SET_DATA_LAYER_ADD_GIFT_CARD_SUBMIT =
  "SET_DATA_LAYER_ADD_GIFT_CARD_SUBMIT";
export const SET_DATA_LAYER_BUY_GIFT_CARD_SUBMIT =
  "SET_DATA_LAYER_BUY_GIFT_CARD_SUBMIT";
export const SET_DATA_LAYER_CLIQ_CASH_LAST_FIVE_TRANSACTION =
  "SET_DATA_LAYER_CLIQ_CASH_LAST_FIVE_TRANSACTION";
export const SET_DATA_LAYER_CLIQ_CASH_VIEW_ALL_TRANSACTION =
  "SET_DATA_LAYER_CLIQ_CASH_VIEW_ALL_TRANSACTION";
const ADOBE_SATELLITE_CODE = "virtual_page_load";
const INTERNAL_CAMPAIGN_TRACK = "internal_campaign";
const ADOBE_PDP_CPJ = "cpj_pdp";
const ADOBE_OUT_OF_STOCK_PDP = "out_of_stock";
const ADOBE_ADD_TO_CART = "cpj_add_to_cart";
const ADOBE_BUY_NOW = "cpj_buy_now";

const ADOBE_SAVE_PRODUCT = "cpj_button_save";
const ADOBE_EMI_BANK_SELECT_ON_PDP = "cpj_pdp_emi";
const ADOBE_REVIEW_AND_RATING = "cpj_rating_review";
const ADOBE_VIEW_ALL_RATING_AND_REVIEW = "cpj_rating_review_viewall";
const ADOBE_SUBMIT_REVIEW = "cpj_rating_review_review_submit";
const ADOBE_RATE_THIS_PRODUCT = "cpj_review_write_review";
// direct call url for cart page
const PINCODE_SUCCESS = "pin_successful";
const PINCODE_FAILURE = "pin_failed";
const ADOBE_DIRECT_CALL_FOR_LANDING_USER = "cpj_cart_page";
const ADOBE_DIRECT_CALL_FOR_SIZE_GUIDE = "cpj_size_guide";
const ADOBE_DIRECT_CALL_ON_CART_FOR_REMOVE_TRIGGER = "cpj_cart_removal";
const ADOVE_DIRECT_CALL_ON_CLICK_CHECKOUT = "cpj_cart_checkout";
const ADOVE_DIRECT_CALL_FOR_CHANGE_QUANTITY_ON_CART =
  "cpj_cart_quantity_change";
const ADOBE_DIRECT_CALL_FOR_APPLY_COUPON_SUCCESS =
  "cpj_checkout_payment_coupon_success";
const ADOBE_DIRECT_CALL_FOR_APPLY_COUPON_FAIL =
  "cpj_checkout_payment_coupon_fail";
const ADOBE_DIRECT_CALL_FOR_SAVE_PORDUCT_ON_CART = "cpj_cart_button_save";
// end of direct call url for cart page
const ADOBE_ORDER_CONFIRMATION_FAILURE = "cpj_order_fail";
const ADOBE_ORDER_CONFIRMATION_SUCCESS = "cpj_order_successful";

// checkout adobe constants
const ADOBE_LANDING_ON_ADDRESS_PAGE = "cpj_checkout_proceed_to_address";
const ADD_NEW_ADDRESS_ON_CHECKOUT = "cpj_checkout_addNewAddress";
const ADD_NEW_ADDRESS_ON_MY_ACCOUNT = "cpj_myAccount_addNewAddress";
const ADOBE_CONFIRM_ADDRESS = "cpj_checkout_confirm_address";
const ADOBE_SELECT_DELIVERY_MODES = "cpj_checkout_delivery_option_select";
const ADOVE_PROCEED_FROM_DELIVERY_MODE = "cpj_checkout_delivery_option";
const ADOBE_LANDS_ON_PAYMENT_MODES = "cpj_checkout_proceed_to_payment";
const ADOBE_SELECT_PAYMENT_MODES = "cpj_checkout_payment_selection";
const ADOBE_FINAL_PAYMENT = "cpj_place_order";
const ADOBE_SEE_ALL_BANK_OFFERS = "CPJ_Checkout_Offer_Allbankoffer";
const ADOBE_CLIQ_CASH_ON = "CPJ_Checkout_Payment_ToggleOn";
const ADOBE_CLIQ_CASH_OFF = "CPJ_Checkout_Payment_ToggleOff";
const ADOBE_CHECKOUT_APPLY_COUPON_SUCCESS =
  "cpj_checkout_payment_coupon_success";
const ADOBE_CHECKOUT_APPLY_COUPON_FAILURE = "cpj_checkout_payment_coupon_fail";
const ADOBE_CHECKOUT_APPLIED_CNC = "CPJ_Checkout_Delivery_CLiQ";
// end of checkout adobe constants
// direct call for login tracking

const ADOBE_LOGIN_SUCCESS = "login_successful";
const ADOBE_LOGIN_FAILURE = "login_failed";
// end of direct call for login tracking

// cosnt for BLP and CLP
const ADOBE_BLP_DIRECT_CALL = "cpj_brand_pages";
const ADOBE_CLP_DIRECT_CALL = "cpj_category_pages";
// end of cosnt for BLP and CLP

// type of hierarchy for MY_ACCOUNT
const MY_ACCOUNT_OVERVIEW = "myaccount_overview";
const MY_ACCOUNT_SAVED_LIST = "myaccount_default_wishlist";
const MY_ACCOUNT_ADDRESS_BOOK = "myaccount_address_book";
const MY_ACCOUNT_BRANDS = "myaccount_brands";
const MY_ACCOUNT_ORDER_HISTORY = "order history page";
const MY_ACCOUNT_ORDER_DETAIL = "order details page";
const MY_ACCOUNT_SAVED_PAYMENTS = "myaccount_payment_details";
const MY_ACCOUNT_ALERTS = "myaccount_alerts";
const MY_ACCOUNT_COUPONS = "myaccount_coupons";
const MY_ACCOUNT_GIFT_CARD = "myaccount_gift_card";
const MY_ACCOUNT_CLIQ_CASH = "myaccount_cliq_cash";
const MY_ACCOUNT_SETTING = "myaccount_update_setting";
// end of type of hierarchy for my Account

// const for follow and un follow brands adobe calls
const ADOBE_FOLLOW_BRAND = "cpj_brand_follow";
const ADOBE_UN_FOLLOW_BRAND = "cpj_brand_unfollow";
const ADOBE_ON_CLICK_WIDGETS = "cpj_widget_followed";
// end of const for follow and un follow brands adobe calls
// const or adobe call for internal search call
const ADOBE_INTERNAL_SEARCH_SUCCESS = "internal_search";
const ADOBE_INTERNAL_SEARCH_NULL = "null_search";
const AUTO_SUGGEST_SEARCH = "auto_suggest_search_click";
// end of const or adobe call for internal search call

const ADOBE_NOT_FOUND = "404_error";
const ADOBE_FOR_CLICK_ON_PRODUCT_ON_PLP = "internal_search_link_clicks";

const SIGN_UP_START = "signup_starts";
const SIGN_UP_SUCCESS = "signup_successful";
const LOGOUT_SUCCESS = "logout_successful";
const LOGIN_START = "login_start";
// internal search Adobe call const
export const ADOBE_INTERNAL_SEARCH_CALL_ON_GET_PRODUCT =
  "ADOBE_INTERNAL_SEARCH_CALL_ON_GET_PRODUCT";
export const ADOBE_INTERNAL_SEARCH_CALL_ON_GET_NULL =
  "ADOBE_INTERNAL_SEARCH_CALL_ON_GET_NULL";

// end of internal search Adobe call const

export const ADOBE_ORDER_CONFIRMATION = "orderConfirmation";
export const ADOBE_HOME_TYPE = "home";
export const ADOBE_PDP_TYPE = "pdp";
export const ADOBE_CART_TYPE = "cart";
export const ADOBE_CHECKOUT_TYPE = "checkout";
export const ADOBE_PLP_TYPE = "plp";
export const ADOBE_ORDER_CANCEL = "order_cancellation";
export const ADOBE_ORDER_RETURN_CANCEL = "order_returns_cancel";
export const ADOBE_ORDER_RETURN = "cpj_order_return";
export const ICID2 = "ICID2";
export const CID = "CID";
export const SET_DATA_LAYER_FOR_ADD_TO_BAG_EVENT =
  "SET_DATA_LAYER_FOR_ADD_TO_BAG_EVENT";
export const SET_DATA_LAYER_FOR_SIZE_GUIDE = "SET_DATA_LAYER_FOR_SIZE_GUIDE";
export const SET_DATA_LAYER_FOR_BUY_NOW_EVENT =
  "SET_DATA_LAYER_FOR_BUY_NOW_EVENT";

export const SET_DATA_LAYER_FOR_SAVE_PRODUCT_EVENT_ON_PDP =
  "SET_DATA_LAYER_FOR_SAVE_PRODUCT_EVENT_ON_PDP";
export const SET_DATA_LAYER_FOR_EMI_BANK_EVENT =
  "SET_DATA_LAYER_FOR_EMI_BANK_EVENT";
export const ADOBE_DIRECT_CALLS_FOR_REMOVE_PRODUCT_ON_CART =
  "ADOBE_DIRECT_CALLS_FOR_REMOVE_PRODUCT_ON_CART";

export const SET_DATA_LAYER_FOR_REVIEW_AND_RATING_EVENT =
  "SET_DATA_LAYER_FOR_REVIEW_AND_RATING_EVENT";
export const SET_DATA_LAYER_FOR_VIEW_ALL_REVIEW_AND_RATING_EVENT =
  "SET_DATA_LAYER_FOR_VIEW_ALL_REVIEW_AND_RATING_EVENT";
export const SET_DATA_LAYER_FOR_SUBMIT_REVIEW =
  "SET_DATA_LAYER_FOR_SUBMIT_REVIEW";
export const SET_DATA_LAYER_FOR_WRITE_REVIEW_EVENT =
  "SET_DATA_LAYER_FOR_WRITE_REVIEW_EVENT";

export const ADOBE_REMOVE_ITEM = "ADOBE_REMOVE_ITEM";
export const ADOBE_CALLS_FOR_ON_CLICK_CHECKOUT =
  "ADOBE_CALLS_FOR_ON_CLICK_CHECKOUT";
export const ADOBE_CALLS_FOR_CHANGE_QUANTITY =
  "ADOBE_CALLS_FOR_CHANGE_QUANTITY";
export const ADOBE_CALLS_FOR_APPLY_COUPON_SUCCESS =
  "ADOBE_CALLS_FOR_APPLY_COUPON_SUCCESS";
export const ADOBE_CALLS_FOR_APPLY_COUPON_FAIL =
  "ADOBE_CALLS_FOR_APPLY_COUPON_FAIL";
export const ADOBE_DIRECT_CALL_FOR_SAVE_ITEM_ON_CART =
  "ADOBE_DIRECT_CALL_FOR_SAVE_ITEM_ON_CART";

export const ADOBE_DIRECT_CALLS_FOR_ORDER_CONFIRMATION_SUCCESS =
  "ADOBE_DIRECT_CALLS_FOR_ORDER_CONFIRMATION_SUCCESS";
export const ADOBE_DIRECT_CALLS_FOR_ORDER_CONFIRMATION_FAILURE =
  "ADOBE_DIRECT_CALLS_FOR_ORDER_CONFIRMATION_FAILURE";

//  constants for checkout pages
export const ADOBE_LANDING_ON_ADDRESS_TAB_ON_CHECKOUT_PAGE =
  "ADOBE_LANDING_ON_ADDRESS_TAB_ON_CHECKOUT_PAGE";
export const ADOBE_ADD_NEW_ADDRESS_ON_CHECKOUT_PAGE =
  "ADOBE_ADD_NEW_ADDRESS_ON_CHECKOUT_PAGE";
export const ADOBE_ADD_NEW_ADDRESS_ON_MY_ACCOUNT_PAGE =
  "ADOBE_ADD_NEW_ADDRESS_ON_MY_ACCOUNT_PAGE";
export const ADOBE_FINAL_PAYMENT_MODES = "ADOBE_FINAL_PAYMENT_MODES";
export const ADOBE_ADD_ADDRESS_TO_ORDER = "ADOBE_ADD_ADDRESS_TO_ORDER";
export const ADOBE_CALL_FOR_LANDING_ON_PAYMENT_MODE =
  "ADOBE_CALL_FOR_LANDING_ON_PAYMENT_MODE";
export const ADOBE_CALL_FOR_SELECTING_PAYMENT_MODES =
  "ADOBE_CALL_FOR_SELECTING_PAYMENT_MODES";
export const ADOBE_CALL_FOR_SELECT_DELIVERY_MODE =
  "ADOBE_CALL_FOR_SELECT_DELIVERY_MODE";
export const ADOBE_CALL_FOR_PROCCEED_FROM_DELIVERY_MODE =
  "ADOBE_CALL_FOR_PROCCEED_FROM_DELIVERY_MODE";
export const ADOBE_CALL_FOR_SEE_ALL_BANK_OFFER =
  "ADOBE_CALL_FOR_SEE_ALL_BANK_OFFER";

export const ADOBE_CALL_FOR_CLIQ_CASH_TOGGLE_ON =
  "ADOBE_CALL_FOR_CLIQ_CASH_TOGGLE_ON";
export const ADOBE_CALL_FOR_CLIQ_CASH_TOGGLE_OFF =
  "ADOBE_CALL_FOR_CLIQ_CASH_TOGGLE_OFF";
export const ADOBE_CALL_FOR_APPLY_COUPON_SUCCESS =
  "ADOBE_CALL_FOR_APPLY_COUPON_SUCCESS";
export const ADOBE_CALL_FOR_APPLY_COUPON_FAILURE =
  "ADOBE_CALL_FOR_CLIQ_CASH_TOGGLE_FAILURE";
export const ADOBE_CALL_FOR_CLIQ_AND_PICK_APPLIED =
  "ADOBE_CALL_FOR_CLIQ_AND_PICK_APPLIED";

// end of constants for checkout pages

// const for setting data layer for the login track

export const ADOBE_DIRECT_CALL_FOR_LOGIN_SUCCESS =
  "ADOBE_DIRECT_CALL_FOR_LOGIN_SUCCESS";
export const ADOBE_DIRECT_CALL_FOR_LOGIN_FAILURE =
  "ADOBE_DIRECT_CALL_FOR_LOGIN_FAILURE";

// end of const for setting data layer for the login track

// const or setting myAccount section
export const ADOBE_MY_ACCOUNT_LANDING_PAGE = "ADOBE_MY_ACCOUNT_LANDING_PAGE";
export const ADOBE_MY_ACCOUNT_SAVED_LIST = "ADOBE_MY_ACCOUNT_SAVED_LIST";
export const ADOBE_MY_ACCOUNT_ADDRESS_BOOK = "ADOBE_MY_ACCOUNT_ADDRESS_BOOK";
export const ADOBE_MY_ACCOUNT_BRANDS = "ADOBE_MY_ACCOUNT_BRANDS";
export const ADOBE_MY_ACCOUNT_ORDER_HISTORY = "ADOBE_MY_ACCOUNT_ORDER_HISTORY";
export const ADOBE_MY_ACCOUNT_ORDER_DETAILS = "ADOBE_MY_ACCOUNT_ORDER_DETAILS";
export const ADOBE_MY_ACCOUNT_SAVED_PAYMENTS =
  "ADOBE_MY_ACCOUNT_SAVED_PAYMENTS";
export const ADOBE_MY_ACCOUNT_ALERTS = "ADOBE_MY_ACCOUNT_ALERTS";
export const ADOBE_MY_ACCOUNT_COUPONS = "ADOBE_MY_ACCOUNT_COUPONS";
export const ADOBE_MY_ACCOUNT_GIFT_CARD = "ADOBE_MY_ACCOUNT_GIFT_CARD";
export const ADOBE_MY_ACCOUNT_CLIQ_CASH = "ADOBE_MY_ACCOUNT_CLIQ_CASH";
export const AODBE_MY_ACCOUNT_SETTINGS = "AODBE_MY_ACCOUNT_SETTINGS";
// end of my Account section

export const ADOBE_DIRECT_CALL_FOR_PINCODE_SUCCESS =
  "ADOBE_DIRECT_CALL_FOR_PINCODE_SUCCESS";
export const ADOBE_DIRECT_CALL_FOR_PINCODE_FAILURE =
  "ADOBE_DIRECT_CALL_FOR_PINCODE_FAILURE";

// const for myAccount adobe calls
export const ADOBE_MY_ACCOUNT_CANCEL_ORDER_SUCCESS =
  "ADOBE_MY_ACCOUNT_CANCEL_ORDER_SUCCESS";
export const ADOBE_MY_ACCOUNT_ORDER_RETURN_CANCEL =
  "ADOBE_MY_ACCOUNT_ORDER_RETURN_CANCEL";
export const ADOBE_MY_ACCOUNT_ORDER_RETURN = "ADOBE_MY_ACCOUNT_ORDER_RETURN";
// end of const for my account adobe call

// cosnt for BLP and CLP adobe calls

export const ADOBE_BLP_PAGE_LOAD = "ADOBE_BLP_PAGE_LOAD";
export const ADOBE_CLP_PAGE_LOAD = "ADOBE_CLP_PAGE_LOAD";
export const ADOBE_DEFAULT_BLP_PAGE_LOAD = "ADOBE_DEFAULT_BLP_PAGE_LOAD";
export const ADOBE_DEFAULT_CLP_PAGE_LOAD = "ADOBE_DEFAULT_CLP_PAGE_LOAD";
// end of  cosnt for BLP and CLP adobe calls
// const for follow and un follow
export const ADOBE_ON_FOLLOW_AND_UN_FOLLOW_BRANDS =
  "ADOBE_ON_FOLLOW_AND_UN_FOLLOW_BRANDS";
export const ADOBE_ON_UN_FOLLOW_BRANDS = "ADOBE_ON_UN_FOLLOW_BRANDS";
export const ADOBE_ON_CLICK_FOLLOWED_WIDGET = "ADOBE_ON_CLICK_FOLLOWED_WIDGET";
// end const for follow and un follow
export const ADOBE_STATIC_PAGE = "ADOBE_STATIC_PAGE";
export const ADOBE_LOGIN_AND_SIGN_UP_PAGE = "ADOBE_LOGIN_AND_SIGN_UP_PAGE";
export const ADOBE_SIGN_UP_START = "ADOBE_SIGN_UP_START";
export const ADOBE_SIGN_UP_SUCCESS = "ADOBE_SIGN_UP_SUCCESS";
export const ADOBE_AUTO_SUGGEST_SEARCH = "ADOBE_AUTO_SUGGEST_SEARCH";
export const ADOBE_DIRECT_CALL_FOR_HEADER_CLICK =
  "ADOBE_DIRECT_CALL_FOR_HEADER_CLICK";
export const ADOBE_DIRECT_CALL_FOR_CHOOSE_DELIVERY_ADDRESS_HOME =
  "ADOBE_DIRECT_CALL_FOR_CHOOSE_DELIVERY_ADDRESS_HOME";
export const ADOBE_DIRECT_CALL_FOR_CHOOSE_DELIVERY_ADDRESS_OFFICE =
  "ADOBE_DIRECT_CALL_FOR_CHOOSE_DELIVERY_ADDRESS_OFFICE";
export const ADOBE_DIRECT_CALL_FOR_FILTER_OPTION =
  "ADOBE_DIRECT_CALL_FOR_FILTER_OPTION";
export const ADOBE_DIRECT_CALL_FOR_CATEGORY_CLICK =
  "ADOBE_DIRECT_CALL_FOR_CATEGORY_CLICK";
export const ADOBE_DIRECT_CALL_FOR_BRAND_CLICK =
  "ADOBE_DIRECT_CALL_FOR_BRAND_CLICK";
export const ADOBE_DIRECT_CALL_FOR_FOOTER_CLICK =
  "ADOBE_DIRECT_CALL_FOR_FOOTER_CLICK";
export const ADOBE_DIRECT_CALL_FOR_SOCIALMEDIA_CLICK =
  "ADOBE_DIRECT_CALL_FOR_SOCIALMEDIA_CLICK";
export const ADOBE_DIRECT_CALL_FOR_FOOTER_SUBSCRIBE =
  "ADOBE_DIRECT_CALL_FOR_FOOTER_SUBSCRIBE";
export const ADOBE_DIRECT_CALL_FOR_GO_TO_BAG =
  "ADOBE_DIRECT_CALL_FOR_GO_TO_BAG";
export const ADOBE_DIRECT_CALL_FOR_EMI_VIEW_PLAN =
  "ADOBE_DIRECT_CALL_FOR_EMI_VIEW_PLAN";
export const ADOBE_DIRECT_CALL_FOR_PICK_UP_OPTION =
  "ADOBE_DIRECT_CALL_FOR_PICK_UP_OPTION";
export const ADOBE_DIRECT_CALL_FOR_PDP_OFFER =
  "ADOBE_DIRECT_CALL_FOR_PDP_OFFER";
export const ADOBE_DIRECT_CALL_FOR_PDP_PRODUCT_PLUS_VIEW_MORE =
  "ADOBE_DIRECT_CALL_FOR_PDP_PRODUCT_PLUS_VIEW_MORE";
export const ADOBE_DIRECT_CALL_FOR_PDP_SPEC_VIEW_MORE =
  "ADOBE_DIRECT_CALL_FOR_PDP_SPEC_VIEW_MORE";
export const ADOBE_DIRECT_CALL_FOR_SELECT_STORE =
  "ADOBE_DIRECT_CALL_FOR_SELECT_STORE";
export const ADOBE_HELP = "ADOBE_HELP";
export const ADOBE_DIRECT_CALL_FOR_FRESH_FROM_BRANDS_PDP_VIEW =
  "ADOBE_DIRECT_CALL_FOR_FRESH_FROM_BRANDS_PDP_VIEW";
export const ADOBE_DIRECT_CALL_FOR_CART_SAVED_LIST =
  "ADOBE_DIRECT_CALL_FOR_CART_SAVED_LIST";
export const ADOBE_DIRECT_CALL_FOR_CART_FOOTER_LINK_CLICK =
  "ADOBE_DIRECT_CALL_FOR_CART_FOOTER_LINK_CLICK";
export const ADOBE_DIRECT_CALL_FOR_REVIEW_RATE_THE_PRODUCT =
  "ADOBE_DIRECT_CALL_FOR_REVIEW_RATE_THE_PRODUCT";
export const ADOBE_LOGIN_START = "ADOBE_LOGIN_START";
export const ADOBE_MY_ACCOUNT_WISHLIST_REMOVE =
  "ADOBE_MY_ACCOUNT_WISHLIST_REMOVE";
export const ADOBE_PLP = "ADOBE_PLP";
export const QA2_MCV_ID = "sample_12345";
export const ADOBE_SIMILAR_PRODUCTS_PDP = "Pdp_View_Similar_Products";
// components name for widgets tracking
const YOU_MAY_ALSO_LIKE = "you_may_also_like";
const FRESH_FROM_BRANDS = "fresh_from_brands";
const DISCOVER_MORE = "discover_more";
const SIMILAR_PRODUCTS = "similar_products";
const FREQUENTLY_BOUGHT_TOGETHER = "frequently_bought_together";
const ABOUT_THE_BRAND = "about_the_brand";
const AUTOMATED_BRAND_PRODUCT_CAROUSAL = "automated_brand_product_carousal";
const BANNER_PRODUCT_CAROUSAL = "banner_product_carousel_component";
const CURATED_PRODUCTS_COMPONENT = "curated_products_component";
const VIDEO_PRODUCT_CAROUSEL = "video_product_carousel";
const POPULAR_BRANDS = "popular_brands";
const MULTICLICK_BANNER = "multiclick_banner";
const EXCLUSIVE_FROM_WESTSIDE = "exclusive_from_westside";
const EXCLUSIVE_FROM_WESTSIDE1 = "exclusivefrom_westside";
const YOU_MAY_ALSO_LIKE_ADOBE = "youmay_alsolike";
const FRESH_FROM_BRAND_ADOBE = "freshfrom_brands";
const DISCOVER_MORE_ADOBE = "discover_more";
const ABOUT_THE_BRAND_ADOBE = "aboutthe_brand";
const FREQUENTLY_BOUGHT_TOGETHER_ADOBE = "frequently_bought_together";
const VISIT_BRAND = "visit_brand";
const AUTOMATED_BRAND_PRODUCT_CAROUSAL_ADOBE =
  "automated_brand_product_carousal";
const BANNER_PRODUCT_CAROUSAL_ADOBE = "banner_product_carousal";
const THEME_OFFER_COMPONENT = "theme_offers_component";
const FLASH_SALE_COMPONENT = "flash_sale_component";
const HEADER_CLICK = "header_click";
const CATEGORY_CLICK = "category_click";
const BRAND_CLICK = "brand_click";
const FOOTER_CLICK = "footer_click";
const SOCIALMEDIA_CLICK = "socialmedia_click";
const FOOTER_SUBSCRIBE = "footer_subscribe";
const CHOOSE_DELIVERY_ADDRESS_HOME = "cpj_choose_delivery_address_home";
const CHOOSE_DELIVERY_ADDRESS_OFFICE = "cpj_choose_delivery_address_office";
const FILTER_OPTION = "cpj_filter_option";
const GO_TO_BAG = "cpj_go_to_bag";
const EMI_VIEW_PLAN = "cpj_emi_view_plan";
const PICK_UP_OPTION = "cpj_pickup_option";
const PDP_OFFER = "cpj_pdp_offer";
const FRESH_FROM_BRANDS_PDP_VIEW = "fresh_from_brand_pdp_view";
const PDP_PRODUCT_PLUS_VIEW_MORE = "cpj_pdp_product_plus_view_more";
const PDP_SPEC_VIEW_MORE = "cpj_pdp_spec_view_more";
const SELECT_STORE = "cpj_select_store";
const CART_SAVED_LIST = "cpj_cart_savedList";
const CART_FOOTER_LINK_CLICK = "cpj_cart_footer_linkClick";
const MY_ACCOUNT_WISHLIST_REMOVE = "myAccount_wishlist_remove";
const MULTI_PURPOSE_BANNER = "multi_purpose_banner_component";
const PDP_SIMILAR_PRODUCT = "pdp_similar_product";
const ADOBE_PLP_CPJ = "cpj_plp";
const GOOGLE = "google";
const FACEBOOK = "facebook";
const MOBILE = "mobile";
const EMAIL = "email";
const INTERNAL_CAMPAIGN = "internal_campaign";
const EXTERNAL_CAMPAIGN = "external_campaign";
const CONTINUE_SHOPPING = "continue_shopping";
const REVIEW_RATE_THE_PRODUCT = "cpj_review_rate_theProduct";
const VIEW_CART_FROM_MINIBAG = "cpj_minicart_viewbag";
export const ADOBE_DIRECT_CALL_FOR_CONTINUE_SHOPPING =
  "ADOBE_DIRECT_CALL_FOR_CONTINUE_SHOPPING";
export function setDataLayer(
  type,
  apiResponse,
  icid,
  icidType,
  behaviorOfPage
) {
  const response = cloneDeep(apiResponse);
  const previousDigitalData = cloneDeep(window.digitalData);
  let userDetails = getCookie(constants.LOGGED_IN_USER_DETAILS);
  if (userDetails) {
    userDetails = JSON.parse(userDetails);
  }
  if (type === ADOBE_HOME_TYPE) {
    window.digitalData = getDigitalDataForHome();
  }
  if (type === ADOBE_PLP_TYPE) {
    window.digitalData = getDigitalDataForPlp(type, response);
    if (window._satellite) {
      window._satellite.track(ADOBE_PLP_CPJ);
    }
  }
  if (
    type === ADOBE_INTERNAL_SEARCH_CALL_ON_GET_PRODUCT &&
    behaviorOfPage !== "Popular brands" &&
    behaviorOfPage !== "isSortTrue" &&
    behaviorOfPage !== "isFilterTrue"
  ) {
    window.digitalData = getDigitalDataForSearchPageSuccess(response);
    if (window._satellite) {
      window._satellite.track(ADOBE_INTERNAL_SEARCH_SUCCESS);
    }
  }
  if (type === ADOBE_INTERNAL_SEARCH_CALL_ON_GET_NULL) {
    window.digitalData = getDigitalDataForSearchPageForNullResult(response);
    if (window._satellite) {
      window._satellite.track(ADOBE_INTERNAL_SEARCH_NULL);
    }
  }

  if (type === ADOBE_PDP_TYPE) {
    const digitalDataForPDP = getDigitalDataForPdp(
      type,
      response,
      behaviorOfPage
    );
    //  this is neccasary for when user comes from plp page to pdp
    //  then we are setting badges from plp page and we need to
    //  pass that on pdp page
    if (
      window.digitalData &&
      window.digitalData.cpj &&
      window.digitalData.cpj.product &&
      window.digitalData.cpj.product.badge
    ) {
      const badge = window.digitalData.cpj.product.badge;
      Object.assign(digitalDataForPDP.cpj.product, { badge });
    }
    window.digitalData = digitalDataForPDP;
    if (response && response.allOOStock) {
      if (window._satellite) {
        window._satellite.track(ADOBE_OUT_OF_STOCK_PDP);
      }
    }
    if (window._satellite) {
      window._satellite.track(ADOBE_PDP_CPJ);
    }
  }
  if (type === ADOBE_CHECKOUT_TYPE) {
    window.digitalData = getDigitalDataForCheckout(type, response);
  }
  if (type === ADOBE_CART_TYPE) {
    window.digitalData = getDigitalDataForCart(type, response);
    if (window._satellite) {
      window._satellite.track(ADOBE_DIRECT_CALL_FOR_LANDING_USER);
    }
  }
  if (type === ADOBE_ORDER_CONFIRMATION) {
    window.digitalData = getDigitalDataForOrderConfirmation(type, response);
  }
  if (type === ADOBE_MY_ACCOUNT_LANDING_PAGE) {
    window.digitalData = getDigitalDataForMyAccount(MY_ACCOUNT_OVERVIEW);
  }
  if (type === ADOBE_MY_ACCOUNT_SAVED_LIST) {
    window.digitalData = getDigitalDataForMyAccount(
      MY_ACCOUNT_SAVED_LIST,
      response
    );
  }
  if (type === ADOBE_MY_ACCOUNT_ADDRESS_BOOK) {
    window.digitalData = getDigitalDataForMyAccount(MY_ACCOUNT_ADDRESS_BOOK);
  }
  if (type === ADOBE_MY_ACCOUNT_BRANDS) {
    window.digitalData = getDigitalDataForMyAccount(MY_ACCOUNT_BRANDS);
  }
  if (type === ADOBE_MY_ACCOUNT_ORDER_HISTORY) {
    window.digitalData = getDigitalDataForMyAccount(MY_ACCOUNT_ORDER_HISTORY);
  }
  if (type === ADOBE_MY_ACCOUNT_SAVED_PAYMENTS) {
    window.digitalData = getDigitalDataForMyAccount(MY_ACCOUNT_SAVED_PAYMENTS);
  }
  if (type === ADOBE_MY_ACCOUNT_ALERTS) {
    window.digitalData = getDigitalDataForMyAccount(MY_ACCOUNT_ALERTS);
  }
  if (type === ADOBE_MY_ACCOUNT_COUPONS) {
    window.digitalData = getDigitalDataForMyAccount(MY_ACCOUNT_COUPONS);
  }
  if (type === ADOBE_MY_ACCOUNT_GIFT_CARD) {
    window.digitalData = getDigitalDataForMyAccount(MY_ACCOUNT_GIFT_CARD);
  }
  if (type === ADOBE_MY_ACCOUNT_CLIQ_CASH) {
    window.digitalData = getDigitalDataForMyAccount(MY_ACCOUNT_CLIQ_CASH);
  }
  if (type === AODBE_MY_ACCOUNT_SETTINGS) {
    window.digitalData = getDigitalDataForMyAccount(MY_ACCOUNT_SETTING);
  }
  if (type === ADOBE_MY_ACCOUNT_ORDER_DETAILS) {
    window.digitalData = getDigitalDataForMyAccount(MY_ACCOUNT_ORDER_DETAIL);
  }
  if (type === ADOBE_BLP_PAGE_LOAD) {
    window.digitalData = getDigitalDataForBLP(response);
    if (window._satellite) {
      window._satellite.track(ADOBE_BLP_DIRECT_CALL);
    }
  }
  if (type === ADOBE_CLP_PAGE_LOAD) {
    window.digitalData = getDigitalDataForCLP(response);
    if (window._satellite) {
      window._satellite.track(ADOBE_CLP_DIRECT_CALL);
    }
  }
  if (
    type === ADOBE_DEFAULT_BLP_PAGE_LOAD ||
    type === ADOBE_DEFAULT_CLP_PAGE_LOAD
  ) {
    window.digitalData = getDigitalDataForDefaultBlpOrClp(response);
  }
  if (type === ADOBE_LOGIN_AND_SIGN_UP_PAGE) {
    window.digitalData = getDigitalDataForLoginAndSignup(response);
  }
  if (type === ADOBE_STATIC_PAGE) {
    window.digitalData = getDigitalDataForStatic(response);
  }
  if (type === ADOBE_HELP) {
    const data = window.digitalData;
    Object.assign(data.page, {
      pageInfo: {
        pageName: window.location.pathname.replace(/\//g, "")
      }
    });
    window.digitalData = data;
  }

  if (icidType === ICID2) {
    window.digitalData.flag = INTERNAL_CAMPAIGN;
    window.digitalData.internal = {
      campaign: {
        id: icid
      }
    };
    if (window._satellite) {
      window._satellite.track(INTERNAL_CAMPAIGN_TRACK);
    }
  } else if (icidType === CID) {
    window.digitalData.external = {
      campaign: {
        id: icid
      }
    };
    window.digitalData.flag = EXTERNAL_CAMPAIGN;
  }

  if (userDetails) {
    if (userDetails.loginType === LOGIN_WITH_EMAIL) {
      window.digitalData.account = {
        login: {
          customerID: userDetails.customerId,
          type: EMAIL
        }
      };
    } else if (userDetails.loginType === LOGIN_WITH_MOBILE) {
      window.digitalData.account = {
        login: {
          customerID: userDetails.customerId,
          type: MOBILE
        }
      };
    } else if (userDetails.loginType === FACEBOOK_PLATFORM) {
      window.digitalData.account = {
        login: {
          customerID: userDetails.customerId,
          type: FACEBOOK
        }
      };
    } else if (userDetails.loginType === GOOGLE_PLUS_PLATFORM) {
      window.digitalData.account = {
        login: {
          customerID: userDetails.customerId,
          type: GOOGLE
        }
      };
    }
  }

  const defaultPinCode = localStorage.getItem(
    constants.DEFAULT_PIN_CODE_LOCAL_STORAGE
  );

  if (defaultPinCode) {
    window.digitalData.geolocation = {
      pin: {
        code: defaultPinCode
      }
    };
  }

  if (
    previousDigitalData &&
    previousDigitalData.page &&
    previousDigitalData.page.pageInfo &&
    previousDigitalData.page.pageInfo.pageName
  ) {
    const currentDigitalData = window.digitalData;
    if (currentDigitalData.cpj) {
      if (currentDigitalData.cpj.pdp) {
        Object.assign(currentDigitalData.cpj.pdp, {
          findingMethod: previousDigitalData.page.pageInfo.pageName
        });
      } else {
        Object.assign(currentDigitalData.cpj, {
          pdp: {
            findingMethod: previousDigitalData.page.pageInfo.pageName
          }
        });
      }
    } else {
      Object.assign(currentDigitalData, {
        cpj: {
          pdp: {
            findingMethod: previousDigitalData.page.pageInfo.pageName
          }
        }
      });
    }
    window.digitalData = currentDigitalData;
  }

  if (window._satellite) {
    window._satellite.track(ADOBE_SATELLITE_CODE);
  }
}

function getDigitalDataForPdp(type, pdpResponse, behaviorOfPage) {
  const data = {
    cpj: {
      product: {
        id: pdpResponse.productListingId
      },
      brand: {
        name: pdpResponse.brandName
      }
    },

    page: {
      category: {
        primaryCategory: "product"
      }
    }
  };
  const subCategories = getSubCategories(pdpResponse);
  if (subCategories) {
    Object.assign(data.page.category, { ...subCategories });
  }
  const productBreadcrumbs = getProductBreadCrumbs(pdpResponse);
  if (productBreadcrumbs) {
    if (behaviorOfPage === IS_COMING_FOR_REVIEW_PAGE) {
      Object.assign(data.page, {
        pageInfo: {
          pageName: "product review:".concat(
            productBreadcrumbs ? productBreadcrumbs : ""
          )
        }
      });
    } else {
      Object.assign(data.page, {
        pageInfo: {
          pageName: "product details:".concat(
            productBreadcrumbs ? productBreadcrumbs : ""
          )
        }
      });
    }
  }
  const displayHierarchy = getDisplayHierarchy(pdpResponse);
  Object.assign(data.page, {
    display: {
      hierarchy: displayHierarchy
    }
  });
  if (pdpResponse.mrpPrice && pdpResponse.mrpPrice.doubleValue) {
    Object.assign(data.cpj.product, {
      price: pdpResponse.mrpPrice.doubleValue
    });
    if (
      pdpResponse.winningSellerPrice &&
      pdpResponse.winningSellerPrice.doubleValue
    ) {
      Object.assign(data.cpj.product, {
        discount:
          pdpResponse.mrpPrice.doubleValue -
          pdpResponse.winningSellerPrice.doubleValue
      });
    }
  }

  if (pdpResponse && pdpResponse.seo && pdpResponse.seo.breadcrumbs) {
    let categoryName = pdpResponse.seo.breadcrumbs[0].name;
    categoryName = categoryName.replace(/ /g, "_").toLowerCase();
    Object.assign(data.cpj.product, {
      category: categoryName
    });
  }
  if (
    window.digitalData &&
    window.digitalData.page &&
    window.digitalData.page.pageInfo &&
    window.digitalData.page.pageInfo.pageName
  ) {
    Object.assign(data.cpj, {
      pdp: {
        findingMethod: window.digitalData.page.pageInfo.pageName
      }
    });
  }
  return data;
}

function getDigitalDataForHome() {
  const data = {
    page: {
      category: {
        primaryCategory: "home"
      },
      pageInfo: {
        pageName: "homepage"
      }
    }
  };
  if (
    window.digitalData &&
    window.digitalData.page &&
    window.digitalData.page.pageInfo &&
    window.digitalData.page.pageInfo.pageName
  ) {
    Object.assign(data, {
      cpj: {
        pdp: {
          findingMethod:
            window.digitalData &&
            window.digitalData.page &&
            window.digitalData.page.pageInfo.pageName
        }
      }
    });
  }
  return data;
}
function getDigitalDataForCart(type, cartResponse) {
  let data = {
    page: {
      category: {
        primaryCategory: "cart"
      },
      pageInfo: {
        pageName: "cart page"
      }
    }
  };
  const getProductData = getProductsDigitalData(cartResponse);
  if (getProductData) {
    let {
      productIdsArray,
      productQuantityArray,
      productPriceArray,
      productBrandArray
    } = getProductData;
    Object.assign(data, {
      cpj: {
        product: {
          id: productIdsArray,
          quantity: productQuantityArray,
          price: productPriceArray
        },
        brand: {
          name: productBrandArray
        }
      }
    });
  }
  const productCategoryHierarchy = getProductCategoryHierarchy(cartResponse);
  if (productCategoryHierarchy) {
    if (data.cpj && data.cpj.product) {
      Object.assign(data.cpj.product, {
        category: productCategoryHierarchy
      });
    } else {
      Object.assign(data, {
        cpj: { product: { category: productCategoryHierarchy } }
      });
    }
  }
  const categoryHierarchy = getCategoryHierarchy(cartResponse);
  if (categoryHierarchy) {
    Object.assign(data.page.category, categoryHierarchy);
  }
  return data;
}
function getDigitalDataForCheckout(type, CheckoutResponse) {
  let data = {
    page: {
      category: {
        primaryCategory: "multistepcheckoutsummary"
      },
      pageInfo: {
        pageName: "multi checkout summary page"
      }
    }
  };
  const getProductData = getProductsDigitalData(CheckoutResponse); //here we set third parameter as true because we need to set second level
  if (getProductData) {
    let {
      productIdsArray,
      productQuantityArray,
      productPriceArray,
      productBrandArray,
      categoryArray
    } = getProductData;
    Object.assign(data, {
      cpj: {
        product: {
          id: productIdsArray,
          quantity: productQuantityArray,
          price: productPriceArray,
          category: categoryArray
        },
        brand: {
          name: productBrandArray
        }
      }
    });
  }

  const categoryHierarchy = getCategoryHierarchy(CheckoutResponse);
  if (categoryHierarchy) {
    Object.assign(data.page.category, categoryHierarchy);
  }
  return data;
}

function getDigitalDataForOrderConfirmation(type, response) {
  let data = {
    page: {
      category: {
        primaryCategory: "orderconfirmation"
      },
      pageInfo: {
        pageName: "order confirmation",
        pageType: "Order Successfull"
      }
    }
  };

  const getProductData = getProductsDigitalData(response);
  if (getProductData) {
    let {
      productIdsArray,
      productQuantityArray,
      productPriceArray,
      productBrandArray,
      categoryArray
    } = getProductData;
    productQuantityArray.forEach((element, index) => {
      if (
        productQuantityArray[index] == null ||
        isNaN(productQuantityArray[index])
      ) {
        productQuantityArray.splice(index, 1, 1);
      }
    });
    Object.assign(data, {
      cpj: {
        product: {
          id: productIdsArray,
          quantity: productQuantityArray,
          price: productPriceArray,
          category: categoryArray
        },
        brand: {
          name: productBrandArray
        },
        payment: {
          mode: response.paymentMethod
        }
      }
    });
  }
  const categoryHierarchy = getCategoryHierarchy(response);
  if (categoryHierarchy) {
    Object.assign(data.page.category, categoryHierarchy);
  }
  return data;
}
// this function will update data with  cpj.proudct.id with
// reponse product's ids . this is using in many place thats why we
// need to make separate function for product ids
function getProductsDigitalData(response, type) {
  if (response && response.products && response.products.length > 0) {
    let productIdsArray = [],
      productQuantityArray = [],
      productPriceArray = [],
      productBrandArray = [],
      categoryArray = [];
    response.products.forEach(function(product) {
      productIdsArray.push(
        product.productcode && product.productcode.toLowerCase()
      );
      productQuantityArray.push(
        parseInt(
          product.qtySelectedByUser
            ? product.qtySelectedByUser
            : product.quantity
              ? product.quantity
              : null,
          10
        )
      );
      productPriceArray.push(
        parseInt(
          product.offerPrice
            ? product.offerPrice
            : product.pricevalue
              ? product.pricevalue
              : product.price
                ? product.price
                : product.mrp && product.mrp.value
                  ? product.mrp.value
                  : null,
          10
        )
      );
      productBrandArray.push(
        product.productBrand &&
          product.productBrand.replace(/ /g, "_").toLowerCase()
      );
      if (type && type.isReverse) {
        let reverseArrayLength =
          product.categoryHierarchy && product.categoryHierarchy.length;
        let currentReverseArray = reverseArrayLength - 1;
        categoryArray.push(
          product.productName === "Gift Card"
            ? "Gift card"
            : product.categoryHierarchy &&
              product.categoryHierarchy[currentReverseArray] &&
              product.categoryHierarchy[currentReverseArray].category_name &&
              product.categoryHierarchy[currentReverseArray].category_name
                .replace(/ /g, "_")
                .toLowerCase()
        );
      } else if (!type || !type.isReverse) {
        categoryArray.push(
          product.productName === "Gift Card"
            ? "Gift card"
            : product.categoryHierarchy &&
              product.categoryHierarchy[0] &&
              product.categoryHierarchy[0].category_name &&
              product.categoryHierarchy[0].category_name
                .replace(/ /g, "_")
                .toLowerCase()
        );
      }
    });
    return {
      productIdsArray,
      productQuantityArray,
      productPriceArray,
      productBrandArray,
      categoryArray
    };
  } else {
    return null;
  }
}
function getProductCategoryHierarchy(response, setSecondLevel) {
  let category = [];
  if (response && response.products && response.products.length > 0) {
    response.products.forEach(product => {
      if (setSecondLevel) {
        if (
          product &&
          product.categoryHierarchy &&
          product.categoryHierarchy[1]
        ) {
          category.push(
            product.categoryHierarchy[1].category_name
              ? product.categoryHierarchy[1].category_name
                  .replace(/\s+/g, "_")
                  .toLowerCase()
              : null
          );
        }
      } else {
        if (
          product &&
          product.categoryHierarchy &&
          product.categoryHierarchy[0]
        ) {
          category.push(
            product.categoryHierarchy[0].category_name
              ? product.categoryHierarchy[0].category_name
                  .replace(/\s+/g, "_")
                  .toLowerCase()
              : null
          );
        }
      }
    });
    return category;
  } else {
    return null;
  }
}
function getCategoryHierarchy(response) {
  let subCategory1 = [],
    subCategory2 = [],
    subCategory3 = [];
  if (response && response.products && response.products.length > 0) {
    response.products.forEach(product => {
      if (
        product &&
        product.categoryHierarchy &&
        product.categoryHierarchy[0]
      ) {
        subCategory1.push(
          product.categoryHierarchy[0].category_name
            ? product.categoryHierarchy[0].category_name
                .replace(/\s+/g, "_")
                .toLowerCase()
            : null
        );
      }
      if (
        product &&
        product.categoryHierarchy &&
        product.categoryHierarchy[1]
      ) {
        subCategory2.push(
          product.categoryHierarchy[1].category_name
            ? product.categoryHierarchy[1].category_name
                .replace(/\s+/, "_")
                .toLowerCase()
            : null
        );
      }
      if (
        product &&
        product.categoryHierarchy &&
        product.categoryHierarchy[2]
      ) {
        subCategory3.push(
          product.categoryHierarchy[2].category_name
            ? product.categoryHierarchy[2].category_name
                .replace(/\s+/, "_")
                .toLowerCase()
            : null
        );
      }
    });
    return {
      subCategory1: subCategory1.length ? subCategory1.join(",") : "",
      subCategory2: subCategory2.length ? subCategory2.join(",") : "",
      subCategory3: subCategory3.length ? subCategory3.join(",") : ""
    };
  } else {
    return null;
  }
}
function getDisplayHierarchy(response) {
  if (response && response.seo && response.seo.breadcrumbs) {
    const seoBreadCrumbs = response.seo.breadcrumbs.map(val => {
      return val.name.toLowerCase().replace(/\s+/g, "_");
    });
    const hierarchyArray = ["home", ...seoBreadCrumbs];
    return hierarchyArray.join(",");
  } else {
    return "home";
  }
}
function getSubCategories(response) {
  if (response && response.seo && response.seo.breadcrumbs) {
    const breadcrumbs = response.seo.breadcrumbs.reverse();
    const subCatagories = {};
    if (breadcrumbs[0]) {
      Object.assign(subCatagories, {
        subCategory1: breadcrumbs[0].name.replace(/ /g, "_").toLowerCase()
      });
    } else {
      Object.assign(subCatagories, {
        subCategory1: ""
      });
    }
    if (breadcrumbs[1]) {
      Object.assign(subCatagories, {
        subCategory2: breadcrumbs[1].name.replace(/ /g, "_").toLowerCase()
      });
    } else {
      Object.assign(subCatagories, {
        subCategory2: ""
      });
    }
    if (breadcrumbs[2]) {
      Object.assign(subCatagories, {
        subCategory3: breadcrumbs[2].name.replace(/ /g, "_").toLowerCase()
      });
    } else {
      Object.assign(subCatagories, {
        subCategory3: ""
      });
    }

    return subCatagories;
  } else {
    return null;
  }
}
function getProductBreadCrumbs(pdpResponse) {
  if (pdpResponse && pdpResponse.seo && pdpResponse.seo.breadcrumbs) {
    const productBreadCrumbs = pdpResponse.seo.breadcrumbs.map(crumbs => {
      return (
        crumbs && crumbs.name && crumbs.name.toLowerCase().replace(/ /g, "_")
      );
    });
    return productBreadCrumbs.join(":");
  } else {
    return null;
  }
}
export async function getMcvId() {
  return new Promise((resolve, reject) => {
    let amcvCookieValue = getCookieValue(ADOBE_TARGET_COOKIE_NAME).split(
      ADOBE_TARGET_SPLIT_VALUE
    );
    let mcvId =
      amcvCookieValue[amcvCookieValue.indexOf(ADOBE_TARGET_MCMID) + 1];
    if (mcvId && mcvId.length > 0) {
      resolve(mcvId);
    } else {
      const intervalId = setInterval(() => {
        amcvCookieValue = getCookieValue(ADOBE_TARGET_COOKIE_NAME).split(
          ADOBE_TARGET_SPLIT_VALUE
        );
        mcvId =
          amcvCookieValue[amcvCookieValue.indexOf(ADOBE_TARGET_MCMID) + 1];
        if (mcvId) {
          clearInterval(intervalId);
          resolve(mcvId);
        }
      }, ADOBE_TARGET_WAIT_TIME);
    }
  });
}
export function setDataLayerForPdpDirectCalls(type, layerData: null) {
  const previousDigitalData = cloneDeep(window.digitalData);
  let data = window.digitalData;
  if (type === SET_DATA_LAYER_FOR_ADD_TO_BAG_EVENT) {
    if (window._satellite) {
      window._satellite.track(ADOBE_ADD_TO_CART);
    }
  }
  if (type === SET_DATA_LAYER_FOR_SIZE_GUIDE) {
    if (window._satellite) {
      window._satellite.track(ADOBE_DIRECT_CALL_FOR_SIZE_GUIDE);
    }
  }
  if (type === SET_DATA_LAYER_FOR_BUY_NOW_EVENT) {
    if (window._satellite) {
      window._satellite.track(ADOBE_ADD_TO_CART);
      window._satellite.track(ADOBE_BUY_NOW);
    }
  }
  if (type === SET_DATA_LAYER_FOR_SAVE_PRODUCT_EVENT_ON_PDP) {
    if (window._satellite) {
      window._satellite.track(ADOBE_SAVE_PRODUCT);
    }
  }
  if (type === SET_DATA_LAYER_FOR_EMI_BANK_EVENT) {
    Object.assign(data.cpj, {
      emi: { bank: layerData.replace(/ /g, "_").toLowerCase() }
    });
    window.digitalData = data;
    if (window._satellite) {
      window._satellite.track(ADOBE_EMI_BANK_SELECT_ON_PDP);
    }
  }
  if (type === SET_DATA_LAYER_FOR_REVIEW_AND_RATING_EVENT) {
    if (
      previousDigitalData &&
      previousDigitalData.page &&
      previousDigitalData.page.pageInfo &&
      previousDigitalData.page.pageInfo.pageName
    ) {
      let previousPageName = previousDigitalData.page.pageInfo.pageName;
      let reviewPage = previousPageName.replace(
        "product details",
        "product review"
      );
      Object.assign(data, {
        page: {
          pageInfo: {
            pageName: reviewPage
          }
        }
      });
    }
    window.digitalData = data;
    if (window._satellite) {
      window._satellite.track(ADOBE_REVIEW_AND_RATING);
    }
  }
  if (type === SET_DATA_LAYER_FOR_VIEW_ALL_REVIEW_AND_RATING_EVENT) {
    if (window._satellite) {
      window._satellite.track(ADOBE_VIEW_ALL_RATING_AND_REVIEW);
    }
  }
  if (type === SET_DATA_LAYER_FOR_SUBMIT_REVIEW) {
    if (window._satellite) {
      window._satellite.track(ADOBE_SUBMIT_REVIEW);
    }
  }
  if (type === SET_DATA_LAYER_FOR_WRITE_REVIEW_EVENT) {
    if (window._satellite) {
      window._satellite.track(ADOBE_RATE_THIS_PRODUCT);
    }
  }
  if (type === ADOBE_DIRECT_CALL_FOR_GO_TO_BAG) {
    if (window._satellite) {
      window._satellite.track(GO_TO_BAG);
    }
  }
  if (type === ADOBE_DIRECT_CALL_FOR_EMI_VIEW_PLAN) {
    if (window._satellite) {
      window._satellite.track(EMI_VIEW_PLAN);
    }
  }
  if (type === ADOBE_DIRECT_CALL_FOR_PICK_UP_OPTION) {
    if (window._satellite) {
      window._satellite.track(PICK_UP_OPTION);
    }
  }
  if (type === ADOBE_DIRECT_CALL_FOR_PDP_OFFER) {
    if (window._satellite) {
      window._satellite.track(PDP_OFFER);
    }
  }
  if (type === ADOBE_DIRECT_CALL_FOR_PDP_PRODUCT_PLUS_VIEW_MORE) {
    if (window._satellite) {
      window._satellite.track(PDP_PRODUCT_PLUS_VIEW_MORE);
    }
  }
  if (type === ADOBE_DIRECT_CALL_FOR_PDP_SPEC_VIEW_MORE) {
    if (window._satellite) {
      window._satellite.track(PDP_SPEC_VIEW_MORE);
    }
  }
  if (type === ADOBE_DIRECT_CALL_FOR_REVIEW_RATE_THE_PRODUCT) {
    if (window._satellite) {
      window._satellite.track(REVIEW_RATE_THE_PRODUCT);
    }
  }
}
export function setDataLayerForCartDirectCalls(type, response, linkName) {
  let data = cloneDeep(window.digitalData);
  if (type === ADOBE_REMOVE_ITEM) {
    const getProductData = getProductsDigitalData(response);
    if (getProductData) {
      let {
        productIdsArray,
        productQuantityArray,
        productPriceArray,
        productBrandArray
      } = getProductData;
      Object.assign(data, {
        cpj: {
          product: {
            id: productIdsArray,
            quantity: productQuantityArray,
            price: productPriceArray
          },
          brand: {
            name: productBrandArray
          }
        }
      });
    }
    window.digitalData = data;
    if (window._satellite) {
      window._satellite.track(ADOBE_DIRECT_CALL_ON_CART_FOR_REMOVE_TRIGGER);
    }
  }
  if (type === ADOBE_CALLS_FOR_ON_CLICK_CHECKOUT) {
    Object.assign(data.page, {
      pageInfo: { pageName: "multi checkout summary page" }
    });
    window.digitalData = data;
    if (window._satellite) {
      window._satellite.track(ADOVE_DIRECT_CALL_ON_CLICK_CHECKOUT);
    }
  }
  if (type === ADOBE_CALLS_FOR_CHANGE_QUANTITY) {
    if (window._satellite) {
      window._satellite.track(ADOVE_DIRECT_CALL_FOR_CHANGE_QUANTITY_ON_CART);
    }
  }
  if (type === ADOBE_CALLS_FOR_APPLY_COUPON_SUCCESS) {
    Object.assign(data.cpj, {
      coupon: { code: response }
    });
    window.digitalData = data;
    if (window._satellite) {
      window._satellite.track(ADOBE_DIRECT_CALL_FOR_APPLY_COUPON_SUCCESS);
    }
  }
  if (type === ADOBE_CALLS_FOR_APPLY_COUPON_FAIL) {
    Object.assign(data.cpj, {
      coupon: { code: response }
    });
    window.digitalData = data;

    if (window._satellite) {
      window._satellite.track(ADOBE_DIRECT_CALL_FOR_APPLY_COUPON_FAIL);
    }
  }
  if (type === ADOBE_DIRECT_CALL_FOR_SAVE_ITEM_ON_CART) {
    if (window._satellite) {
      window._satellite.track(ADOBE_DIRECT_CALL_FOR_SAVE_PORDUCT_ON_CART);
    }
  }
  if (type === ADOBE_DIRECT_CALL_FOR_PINCODE_SUCCESS) {
    window.digitalData = setDataLayerForPinCode(response);
    if (window._satellite) {
      window._satellite.track(PINCODE_SUCCESS);
    }
  }
  if (type === ADOBE_DIRECT_CALL_FOR_PINCODE_FAILURE) {
    window.digitalData = setDataLayerForPinCode(response);
    if (window._satellite) {
      window._satellite.track(PINCODE_FAILURE);
    }
  }
  if (type === ADOBE_DIRECT_CALL_FOR_CONTINUE_SHOPPING) {
    if (window._satellite) {
      window._satellite.track(CONTINUE_SHOPPING);
    }
  }
  if (type === ADOBE_DIRECT_CALL_FOR_SELECT_STORE) {
    if (window._satellite) {
      window._satellite.track(SELECT_STORE);
    }
  }
  if (type === ADOBE_DIRECT_CALL_FOR_CART_SAVED_LIST) {
    if (window._satellite) {
      window._satellite.track(CART_SAVED_LIST);
    }
  }
  if (type === ADOBE_DIRECT_CALL_FOR_CART_FOOTER_LINK_CLICK) {
    Object.assign(data, {
      cart: {
        footerName: linkName
      }
    });
    window.digitalData = data;
    if (window._satellite) {
      window._satellite.track(CART_FOOTER_LINK_CLICK);
    }
  }
}
function getDigitalDataForPlp(type, response) {
  let data = {
    page: {
      category: {
        primaryCategory: "category"
      },
      pageInfo: {
        pageName: "product grid"
      }
    }
  };

  if (response && response.searchresult && response.searchresult.length > 0) {
    const productCodes = response.searchresult.splice(0, 9).map(product => {
      return product.productId.toLowerCase();
    });
    const impression = productCodes.join("|");
    Object.assign(data.page, {
      products: {
        impression
      }
    });
  }
  const hierarchy = getDisplayHierarchy(response);
  if (hierarchy) {
    Object.assign(data.page, {
      display: {
        hierarchy
      }
    });
  }
  const subCategories = getSubCategories(response);
  if (subCategories) {
    Object.assign(data.page.category, { ...subCategories });
    Object.assign(data.page, {
      pageInfo: {
        pageName: `product grid:${
          subCategories.subCategory1 ? subCategories.subCategory1 : ""
        }:${subCategories.subCategory2 ? subCategories.subCategory2 : ""}:${
          subCategories.subCategory3 ? subCategories.subCategory3 : ""
        }`
      }
    });
  } else {
    Object.assign(data.page, {
      pageInfo: {
        pageName: "product grid"
      }
    });
  }
  return data;
}
export function getDigitalDataForSearchPageSuccess(response) {
  const offersCount =
    response &&
    response.searchresult &&
    response.searchresult.filter(product => {
      return product.discountPercent && product.discountPercent !== "0";
    }).length;
  const newCount =
    response &&
    response.searchresult &&
    response.searchresult.filter(product => {
      return product.newProduct;
    }).length;
  const data = {
    page: {
      pageInfo: { pageName: "search results page" },
      category: { primaryCategory: "productsearch" },
      display: {
        hierarchy: `home |${
          response.currentQuery ? response.currentQuery.searchQuery : null
        }`
      }
    },
    internal: {
      search: {
        category: "all",
        results: response.pagination ? response.pagination.totalResults : 0,
        term: response.currentQuery ? response.currentQuery.searchQuery : null,
        offersCount,
        newCount
      }
    }
  };
  if (
    response &&
    response.seo &&
    response.seo.alternateURL &&
    CATEGORY_REGEX.test(response.seo.alternateURL)
  ) {
    Object.assign(data.internal.search, {
      category:
        response &&
        response.seo &&
        response.seo.breadcrumbs &&
        response.seo.breadcrumbs[0] &&
        response.seo.breadcrumbs[0].name
          ? response.seo.breadcrumbs[0].name
          : "all"
    });
  } else {
    Object.assign(data.internal.search, {
      category: "all"
    });
  }
  if (response && response.searchresult && response.searchresult.length > 0) {
    const productCodes = response.searchresult.splice(0, 9).map(product => {
      return product.productId.toLowerCase();
    });
    const impression = productCodes.join("|");
    Object.assign(data.page, {
      products: {
        impression
      }
    });
  }
  return data;
}

export function getDigitalDataForSearchPageForNullResult(response) {
  const previousDigitalData = cloneDeep(window.digitalData);
  let data = {
    page: {
      pageInfo: {
        pathname: "search results page"
      },
      category: {
        primaryCategory: "productsearch"
      },
      display: {
        hierarchy: `home,${
          response.currentQuery ? response.currentQuery.searchQuery : null
        }`
      }
    }
  };

  Object.assign(data, {
    internal: {
      search: {
        term: response.currentQuery ? response.currentQuery.searchQuery : null,
        results: 0,
        offersCount: 0,
        newCount: 0
      }
    }
  });
  if (
    previousDigitalData &&
    previousDigitalData.page &&
    previousDigitalData.page.pageInfo &&
    previousDigitalData.page.pageInfo.pageName
  ) {
    Object.assign(data, {
      cpj: {
        pdp: {
          findingMethod: previousDigitalData.page.pageInfo.pageName
        }
      }
    });
  }
  return data;
}
export function setDataLayerForPlpDirectCalls(response, index: 0) {
  const data = window.digitalData ? window.digitalData : {};
  let badge;
  if (response) {
    if (response.outOfStock) {
      badge = "out of stock";
    } else if (response.discountPercent && response.discountPercent !== "0") {
      badge = `${response.discountPercent}% off`;
    } else if (response.isOfferExisting) {
      badge = "on offer";
    } else if (response.onlineExclusive) {
      badge = "exclusive";
    } else if (response.newProduct) {
      badge = "new";
    }
  }
  if (badge && data) {
    if (data.cpj && data.cpj.product) {
      Object.assign(data.cpj.product, { badge });
    } else if (data.cpj) {
      Object.assign(data.cpj, { product: { badge } });
    } else {
      Object.assign(data, { cpj: { product: { badge } } });
    }
  }
  Object.assign(data, {
    internal: {
      search: {
        position: index + 1
      }
    }
  });
  window.digitalData = data;
  if (window._satellite) {
    window._satellite.track(ADOBE_FOR_CLICK_ON_PRODUCT_ON_PLP);
  }
}
export function setDataLayerForLogin(type, lastLocation) {
  let userDetails = getCookie(constants.LOGGED_IN_USER_DETAILS);
  if (userDetails) {
    userDetails = JSON.parse(userDetails);
  }
  const previousDigitalData = cloneDeep(window.digitalData);
  const data = {};
  if (type === ADOBE_DIRECT_CALL_FOR_LOGIN_SUCCESS) {
    if (userDetails) {
      if (userDetails.loginType === LOGIN_WITH_EMAIL) {
        Object.assign(data, {
          account: {
            login: {
              customerID: userDetails.customerId,
              type: EMAIL
            }
          }
        });
      } else if (userDetails.loginType === LOGIN_WITH_MOBILE) {
        if (data.account) {
          Object.assign(data.account, {
            login: {
              customerID: userDetails.customerId,
              type: MOBILE
            }
          });
        } else {
          Object.assign(data, {
            account: {
              login: {
                customerID: userDetails.customerId,
                type: MOBILE
              }
            }
          });
        }
      } else if (userDetails.loginType === FACEBOOK_PLATFORM) {
        if (data.account) {
          Object.assign(data.account, {
            login: {
              customerID: userDetails.customerId,
              type: FACEBOOK
            }
          });
        } else {
          Object.assign(data, {
            account: {
              login: {
                customerID: userDetails.customerId,
                type: FACEBOOK
              }
            }
          });
        }
      } else if (userDetails.loginType === GOOGLE_PLUS_PLATFORM) {
        if (data.account) {
          Object.assign(data.account, {
            login: {
              customerID: userDetails.customerId,
              type: GOOGLE
            }
          });
        } else {
          Object.assign(data, {
            account: {
              login: {
                customerID: userDetails.customerId,
                type: GOOGLE
              }
            }
          });
        }
      }
    }
    if (lastLocation) {
      if (data.account) {
        if (data.account.login) {
          Object.assign(data.account.login, {
            location: lastLocation
          });
        } else {
          Object.assign(data.account, {
            login: {
              location: lastLocation
            }
          });
        }
      } else {
        Object.assign(data, {
          account: {
            login: {
              location: lastLocation
            }
          }
        });
      }
    }
    window.digitalData = data;
    window.digitalData.flag = ADOBE_LOGIN_SUCCESS;
    if (
      previousDigitalData &&
      previousDigitalData.page &&
      previousDigitalData.page.pageInfo &&
      previousDigitalData.page.pageInfo.pageName
    ) {
      Object.assign(window.digitalData, {
        page: {
          pageInfo: { pageName: previousDigitalData.page.pageInfo.pageName }
        }
      });
    }
    if (window._satellite) {
      window._satellite.track(ADOBE_LOGIN_SUCCESS);
    }
  }
  if (type === ADOBE_DIRECT_CALL_FOR_LOGIN_FAILURE) {
    if (window.digitalData) {
      window.digitalData.flag = ADOBE_LOGIN_FAILURE;
    } else {
      window.digitalData = { flag: ADOBE_LOGIN_FAILURE };
    }
    if (window._satellite) {
      window._satellite.track(ADOBE_LOGIN_FAILURE);
    }
  }
  if (type === ADOBE_LOGIN_START) {
    if (window._satellite) {
      window._satellite.track(LOGIN_START);
    }
  }
}
export function setDataLayerForOrderConfirmationDirectCalls(
  type,
  orderConfirmationResponse
) {
  if (type === ADOBE_DIRECT_CALLS_FOR_ORDER_CONFIRMATION_SUCCESS) {
    let previousData = {};
    if (window.digitalData) {
      previousData = window.digitalData;
    }
    if (previousData.cpj) {
      Object.assign(previousData.cpj, {
        order: {
          id: orderConfirmationResponse
        }
      });
    } else {
      Object.assign(previousData, {
        cpj: {
          order: {
            id: orderConfirmationResponse
          }
        }
      });
    }
    window.digitalData = previousData;
    if (window._satellite) {
      window._satellite.track(ADOBE_ORDER_CONFIRMATION_SUCCESS);
    }
  }
  if (type === ADOBE_DIRECT_CALLS_FOR_ORDER_CONFIRMATION_FAILURE) {
    const data = {
      page: {
        pageInfo: {
          pageName: "order failed"
        },
        category: {
          primaryCategory: "orderfailed"
        }
      },
      cpj: {
        order: {
          failureReason:
            orderConfirmationResponse && orderConfirmationResponse.failureReason
              ? orderConfirmationResponse.failureReason
              : "",
          id:
            orderConfirmationResponse && orderConfirmationResponse.orderId
              ? orderConfirmationResponse.orderId
              : ""
        },
        product: {
          price:
            orderConfirmationResponse && orderConfirmationResponse.price
              ? orderConfirmationResponse.price
              : ""
        }
      }
    };

    window.digitalData = data;
    if (window._satellite) {
      window._satellite.track(ADOBE_ORDER_CONFIRMATION_FAILURE);
    }
  }
}
export function setDataLayerForCheckoutDirectCalls(type, response) {
  let data = cloneDeep(window.digitalData);
  if (type === ADOBE_LANDING_ON_ADDRESS_TAB_ON_CHECKOUT_PAGE) {
    if (window._satellite) {
      window._satellite.track(ADOBE_LANDING_ON_ADDRESS_PAGE);
    }
  }
  if (type === ADOBE_ADD_NEW_ADDRESS_ON_CHECKOUT_PAGE) {
    if (window._satellite) {
      window._satellite.track(ADD_NEW_ADDRESS_ON_CHECKOUT);
    }
  }
  if (type === ADOBE_ADD_NEW_ADDRESS_ON_MY_ACCOUNT_PAGE) {
    if (window._satellite) {
      window._satellite.track(ADD_NEW_ADDRESS_ON_MY_ACCOUNT);
    }
  }
  if (type === ADOBE_ADD_ADDRESS_TO_ORDER) {
    if (window._satellite) {
      window._satellite.track(ADOBE_CONFIRM_ADDRESS);
    }
  }
  if (type === ADOBE_CALL_FOR_SELECT_DELIVERY_MODE) {
    // herer we are getting all delivery modes and ussid in form of object
    // like {"MP12345678":"home_delivery","MP987654321":"expres_delivery"}
    // so here we need ot pass only "home_delivery"|"express_delivery"
    const deliveryModesObj = Object.values(response).join("|");
    if (data) {
      if (data.cpj) {
        if (data.cpj.checkout) {
          Object.assign(data.cpj.checkout, {
            deliveryOption: deliveryModesObj
          });
        } else {
          Object.assign(data.cpj, {
            checkout: { deliveryOption: deliveryModesObj }
          });
        }
      } else {
        Object.assign(data, {
          cpj: { checkout: { deliveryOption: deliveryModesObj } }
        });
      }
    } else {
      Object.assign(data, {
        cpj: { checkout: { deliveryOption: deliveryModesObj } }
      });
    }

    window.digitalData = data;

    if (window._satellite) {
      window._satellite.track(ADOBE_SELECT_DELIVERY_MODES);
    }
  }
  if (type === ADOBE_CALL_FOR_PROCCEED_FROM_DELIVERY_MODE) {
    if (window._satellite) {
      window._satellite.track(ADOVE_PROCEED_FROM_DELIVERY_MODE);
    }
  }
  if (type === ADOBE_CALL_FOR_SEE_ALL_BANK_OFFER) {
    if (window._satellite) {
      window._satellite.track(ADOBE_SEE_ALL_BANK_OFFERS);
    }
  }
  if (type === ADOBE_CALL_FOR_CLIQ_CASH_TOGGLE_ON) {
    if (window._satellite) {
      window._satellite.track(ADOBE_CLIQ_CASH_ON);
    }
  }
  if (type === ADOBE_CALL_FOR_CLIQ_CASH_TOGGLE_OFF) {
    if (window._satellite) {
      window._satellite.track(ADOBE_CLIQ_CASH_OFF);
    }
  }
  if (
    type === ADOBE_CALL_FOR_APPLY_COUPON_SUCCESS ||
    type === ADOBE_CALL_FOR_APPLY_COUPON_FAILURE
  ) {
    if (data) {
      if (data.cpj) {
        if (data.cpj.coupon) {
          data = Object.assign(data.cpj.coupon, {
            code: response
          });
        } else {
          data = Object.assign(data.cpj, {
            coupon: { code: response }
          });
        }
      } else {
        data = Object.assign(data, {
          cpj: { coupon: { code: response } }
        });
      }
    } else {
      Object.assign(data, { cpj: { coupon: { code: response } } });
    }
    window.digitalData = data;
    if (type === ADOBE_CALL_FOR_APPLY_COUPON_SUCCESS) {
      if (window._satellite) {
        window._satellite.track(ADOBE_CHECKOUT_APPLY_COUPON_SUCCESS);
      }
    } else {
      if (window._satellite) {
        window._satellite.track(ADOBE_CHECKOUT_APPLY_COUPON_FAILURE);
      }
    }
  }
  if (type === ADOBE_CALL_FOR_CLIQ_AND_PICK_APPLIED) {
    if (window._satellite) {
      window._satellite.track(ADOBE_CHECKOUT_APPLIED_CNC);
    }
  }

  if (type === ADOBE_FINAL_PAYMENT_MODES) {
    let finalPaymentMode = localStorage.getItem(constants.PAYMENT_MODE_TYPE);
    const cliqCashUsed = localStorage.getItem(
      constants.CLIQ_CASH_APPLIED_LOCAL_STORAGE
    );
    if (finalPaymentMode || cliqCashUsed) {
      if (finalPaymentMode && cliqCashUsed) {
        finalPaymentMode = `${finalPaymentMode
          .replace(/ /g, "_")
          .toLowerCase()}|cliqcash`;
      } else if (cliqCashUsed) {
        finalPaymentMode = "cliqcash";
      } else {
        finalPaymentMode = finalPaymentMode.replace(/ /g, "_").toLowerCase();
      }
      if (data) {
        if (data.cpj) {
          if (data.cpj.payment) {
            Object.assign(data.cpj.payment, {
              finalMode: finalPaymentMode
            });
          } else {
            Object.assign(data.cpj, {
              payment: {
                finalMode: finalPaymentMode
              }
            });
          }
        } else {
          Object.assign(data, {
            cpj: {
              payment: {
                finalMode: finalPaymentMode
              }
            }
          });
        }
      } else {
        Object.assign(data, {
          cpj: {
            payment: {
              finalMode: finalPaymentMode
            }
          }
        });
      }
      window.digitalData = data;
    }
    if (window._satellite) {
      window._satellite.track(ADOBE_FINAL_PAYMENT);
    }
  }

  if (type === ADOBE_CALL_FOR_LANDING_ON_PAYMENT_MODE) {
    if (window._satellite) {
      window._satellite.track(ADOBE_LANDS_ON_PAYMENT_MODES);
    }
  }
  if (type === ADOBE_CALL_FOR_SELECTING_PAYMENT_MODES) {
    if (response) {
      if (data) {
        if (data.cpj) {
          if (data.cpj.payment) {
            Object.assign(data.cpj.payment, {
              mode: response.replace(/ /g, "_").toLowerCase()
            });
          } else {
            Object.assign(data.cpj, {
              payment: {
                mode: response.replace(/ /g, "_").toLowerCase()
              }
            });
          }
        } else {
          Object.assign(data, {
            cpj: {
              payment: {
                mode: response.replace(/ /g, "_").toLowerCase()
              }
            }
          });
        }
      } else {
        data = Object.assign(
          {},
          {
            cpj: {
              payment: {
                mode: response.replace(/ /g, "_").toLowerCase()
              }
            }
          }
        );
      }
      window.digitalData = data;
    }
    if (window._satellite) {
      window._satellite.track(ADOBE_SELECT_PAYMENT_MODES);
    }
  }
}
export function setDataLayerForMyAccountDirectCalls(
  type,
  productDetails,
  reasonObj: null
) {
  let data = cloneDeep(window.digitalData);
  if (type === ADOBE_MY_ACCOUNT_CANCEL_ORDER_SUCCESS) {
    Object.assign(data, {
      order: {
        cancellation: {
          reason: productDetails ? productDetails.reasonLabel : ""
        },
        id: productDetails.orderCode
      },
      cpj: { product: { id: productDetails.productcode } }
    });
    window.digitalData = data;
    if (window._satellite) {
      window._satellite.track(ADOBE_ORDER_CANCEL);
    }
  }
  if (type === ADOBE_MY_ACCOUNT_ORDER_RETURN_CANCEL) {
    if (window._satellite) {
      window._satellite.track(ADOBE_ORDER_RETURN_CANCEL);
    }
  }
  if (type === ADOBE_MY_ACCOUNT_ORDER_RETURN) {
    Object.assign(data, {
      cpj: {
        product: {
          id: productDetails.productcode,
          price: productDetails.price
        }
      },
      order: {
        id: reasonObj.orderCode
      }
    });
    window.digitalData = data;
    if (window._satellite) {
      window._satellite.track(ADOBE_ORDER_RETURN);
    }
  }
  if (type === ADOBE_MY_ACCOUNT_WISHLIST_REMOVE) {
    if (window._satellite) {
      window._satellite.track(MY_ACCOUNT_WISHLIST_REMOVE);
    }
  }
}
export function getDigitalDataForMyAccount(pageTitle, response) {
  const data = {
    page: {
      pageInfo: { pageName: pageTitle },
      category: { primaryCategory: pageTitle },
      display: { hierarchy: `home|my_tata_cliq|${pageTitle}` }
    }
  };
  if (response) {
    const getProductData = getProductsDigitalData(response);
    if (getProductData) {
      let {
        productIdsArray,
        productQuantityArray,
        productPriceArray,
        productBrandArray
      } = getProductData;
      Object.assign(data, {
        cpj: {
          product: {
            id: productIdsArray,
            quantity: productQuantityArray,
            price: productPriceArray
          },
          brand: {
            name: productBrandArray
          }
        }
      });
    }
  }
  return data;
}
export function getDigitalDataForBLP(response) {
  const data = {};
  let pageTitle = "";
  if (response.pageName) {
    Object.assign(data, {
      page: {
        pageName: response.pageName
      }
    });
  }
  if (response.items && response.items.length > 0) {
    const titleObj = response.items.find(data => {
      return data.componentName === "landingPageTitleComponent";
    });

    if (titleObj && titleObj.landingPageTitleComponent) {
      pageTitle = titleObj.landingPageTitleComponent.title;
    }
    Object.assign(data, {
      cpj: { brand: { name: pageTitle } }
    });
    if (data.page) {
      Object.assign(data.page, {
        display: {
          hierarchy: pageTitle ? `home,${pageTitle}` : "home"
        }
      });
    } else {
      Object.assign(data, {
        page: {
          display: {
            hierarchy: pageTitle ? `home,${pageTitle}` : "home"
          }
        }
      });
    }
  }

  return data;
}
export function getDigitalDataForCLP(response) {
  const data = {
    page: { category: { primaryCategory: "category" } }
  };
  const subCategories = getSubCategories(response);
  if (subCategories) {
    Object.assign(data.page.category, { ...subCategories });
    Object.assign(data.page, {
      pageInfo: {
        pageName: `product grid: ${
          subCategories.subCategory1 ? subCategories.subCategory1 : null
        } : ${
          subCategories.subCategory2 ? subCategories.subCategory2 : null
        } : ${subCategories.subCategory3 ? subCategories.subCategory3 : null}`
      }
    });
  } else {
    Object.assign(data.page, {
      pageInfo: {
        pageName: `product grid: ${null}: ${null}: ${null}`
      }
    });
  }
  const hierarchy = getDisplayHierarchy(response);
  if (hierarchy) {
    Object.assign(data.page, {
      display: {
        hierarchy
      }
    });
  }
  return data;
}
export function setDataLayerForFollowAndUnFollowBrand(type, response) {
  let data = {};
  const previousDigitalData = cloneDeep(window.digitalData);
  if (
    previousDigitalData &&
    previousDigitalData.page &&
    previousDigitalData.page.pageInfo &&
    previousDigitalData.page.pageInfo.pageName
  ) {
    Object.assign(data, {
      page: {
        pageInfo: { pageName: previousDigitalData.page.pageInfo.pageName }
      }
    });
    window.digitalData = data;
  }
  if (type === ADOBE_ON_FOLLOW_AND_UN_FOLLOW_BRANDS) {
    Object.assign(data, {
      cpj: { brand: { name: response.brandName } }
    });
    window.digitalData = data;
    if (response.followStatus) {
      if (window._satellite) {
        window._satellite.track(ADOBE_FOLLOW_BRAND);
      }
    } else {
      if (window._satellite) {
        window._satellite.track(ADOBE_UN_FOLLOW_BRAND);
      }
    }
  }
}
export function setDataLayerForPinCode(response) {
  const previousData = cloneDeep(window.digitalData);
  if (previousData) {
    if (previousData.page) {
      if (previousData.page.pin) {
        Object.assign(previousData.page.pin, {
          value: response
        });
      } else {
        Object.assign(previousData.page, {
          pin: { value: response }
        });
      }
    } else {
      Object.assign(previousData, {
        page: { pin: { value: response } }
      });
    }
  } else {
    Object.assign(previousData, {
      page: { pin: { value: response } }
    });
  }
  return previousData;
}
function getDigitalDataForDefaultBlpOrClp(response) {
  const data = {
    page: { category: { primaryCategory: "category" } }
  };
  const subCategories = getSubCategories(response);
  if (subCategories) {
    Object.assign(data.page.category, { ...subCategories });
  }
  if (response && response.pageName) {
    Object.assign(data.page, {
      pageInfo: {
        pageName: response.pageName.replace(/ /g, "_").toLowerCase()
      }
    });
  } else {
    Object.assign(data.page, {
      pageInfo: {
        pageName: window.location.pathname.replace(/\//g, "")
      }
    });
  }
  const hierarchy = getDisplayHierarchy(response);
  if (hierarchy) {
    Object.assign(data.page, {
      display: {
        hierarchy
      }
    });
  }
  return data;
}

function getDigitalDataForLoginAndSignup(isLoginFromCheckoutPage) {
  let pageTitle = window.location.pathname.replace(/\//g, "");
  if (isLoginFromCheckoutPage) {
    pageTitle = "checkout-login page";
  } else {
    pageTitle = "login page";
  }
  const data = {
    page: {
      pageInfo: { pageName: pageTitle },
      category: { primaryCategory: pageTitle },
      display: { hierarchy: `"home"|"${pageTitle}"` }
    }
  };
  return data;
}
function getDigitalDataForStatic(response) {
  const data = {
    page: { category: { primaryCategory: "category" } }
  };
  const subCategories = getSubCategories(response);
  if (subCategories) {
    Object.assign(data.page.category, { ...subCategories });
  }
  if (response && response.pageName) {
    Object.assign(data.page, {
      pageInfo: {
        pageName: response.pageName.replace(/ /g, "_").toLowerCase()
      }
    });
  } else {
    Object.assign(data.page, {
      pageInfo: {
        pageName: window.location.pathname.replace(/\//g, "")
      }
    });
  }

  if (response && response.pageName) {
    Object.assign(data.page, {
      display: {
        hierarchy: `home|${response.pageName.replace(/ /g, "").toLowerCase()}`
      }
    });
  }
  return data;
}

export function setDataLayerForNotFound() {
  if (window._satellite) {
    window._satellite.track(ADOBE_NOT_FOUND);
  }
}
export function setDataLayerForSignupProcess(type) {
  if (type === ADOBE_SIGN_UP_START) {
    if (window._satellite) {
      window._satellite.track(SIGN_UP_START);
    }
  }
  if (type === ADOBE_SIGN_UP_SUCCESS) {
    if (window._satellite) {
      window._satellite.track(SIGN_UP_SUCCESS);
    }
  }
}
export function setDataLayerForLogoutSuccess() {
  if (window._satellite) {
    window._satellite.track(LOGOUT_SUCCESS);
  }
}
export function setDataLayerForAutoSuggestSearch(response) {
  let data = window.digitalData;
  Object.assign(data, {
    search: {
      autosuggest: {
        term: response ? response.term : "",
        position: response ? response.position : ""
      }
    }
  });
  window.digitalData = data;
  if (window._satellite) {
    window._satellite.track(AUTO_SUGGEST_SEARCH);
  }
}
export function widgetsTracking(widgetObj: {}) {
  if (!widgetObj.widgetName) {
    return;
  }
  const data = cloneDeep(window.digitalData);
  const currentDigitalData = window.digitalData;
  if (currentDigitalData.cpj) {
    Object.assign(data && data.cpj, {
      widgetname: `${widgetObj.productId ? widgetObj.productId : "x"}:${
        widgetObj.widgetName
      }:${widgetObj.sourceOfWidget ? widgetObj.sourceOfWidget : ""}:${
        widgetObj.type ? widgetObj.type : "product"
      }:${widgetObj.brandName ? widgetObj.brandName : "x"}:${
        widgetObj.categoryName ? widgetObj.categoryName : "x"
      }:${
        data && data.page && data.page.pageInfo && data.page.pageInfo.pageName
          ? data.page.pageInfo.pageName
          : "x"
      }:${widgetObj.PositionOfProduct ? widgetObj.PositionOfProduct : "x"}`
    });
  } else {
    Object.assign(data, {
      cpj: {
        pdp: {
          findingMethod: data.page.pageInfo.pageName,
          widgetname: `${widgetObj.productId ? widgetObj.productId : "x"}:${
            widgetObj.widgetName
          }:${widgetObj.sourceOfWidget ? widgetObj.sourceOfWidget : ""}:${
            widgetObj.type ? widgetObj.type : "product"
          }:${widgetObj.brandName ? widgetObj.brandName : "x"}:${
            widgetObj.categoryName ? widgetObj.categoryName : "x"
          }:${
            data &&
            data.page &&
            data.page.pageInfo &&
            data.page.pageInfo.pageName
              ? data.page.pageInfo.pageName
              : "x"
          }:${widgetObj.PositionOfProduct ? widgetObj.PositionOfProduct : "x"}`
        }
      }
    });
  }
  window.digitalData = data;
  let widgetType;
  const DEFAULT_FALLBACK_ADOBE = widgetObj.widgetName
    .split(" ")
    .join("_")
    .toUpperCase();
  switch (
    widgetObj.widgetName
      .split(" ")
      .join("_")
      .toLowerCase()
  ) {
    case YOU_MAY_ALSO_LIKE:
      widgetType = YOU_MAY_ALSO_LIKE_ADOBE;
      break;
    case FRESH_FROM_BRANDS:
      widgetType = FRESH_FROM_BRAND_ADOBE;
      break;
    case DISCOVER_MORE:
      widgetType = DISCOVER_MORE_ADOBE;
      break;
    case ABOUT_THE_BRAND:
      widgetType = ABOUT_THE_BRAND_ADOBE;
      break;
    case SIMILAR_PRODUCTS:
      widgetType = PDP_SIMILAR_PRODUCT;
      break;
    case FREQUENTLY_BOUGHT_TOGETHER:
      widgetType = FREQUENTLY_BOUGHT_TOGETHER_ADOBE;
      break;
    case AUTOMATED_BRAND_PRODUCT_CAROUSAL:
      widgetType = AUTOMATED_BRAND_PRODUCT_CAROUSAL_ADOBE;
      break;
    case BANNER_PRODUCT_CAROUSAL:
      widgetType = BANNER_PRODUCT_CAROUSAL_ADOBE;
      break;
    case CURATED_PRODUCTS_COMPONENT:
      widgetType = CURATED_PRODUCTS_COMPONENT;
      break;
    case VIDEO_PRODUCT_CAROUSEL:
      widgetType = VIDEO_PRODUCT_CAROUSEL;
      break;
    case POPULAR_BRANDS:
      widgetType = POPULAR_BRANDS;
      break;
    case MULTICLICK_BANNER:
      widgetType = MULTICLICK_BANNER;
      break;
    case EXCLUSIVE_FROM_WESTSIDE:
      widgetType = EXCLUSIVE_FROM_WESTSIDE1;
      break;
    case THEME_OFFER_COMPONENT:
      widgetType = THEME_OFFER_COMPONENT;
      break;
    case FLASH_SALE_COMPONENT:
      widgetType = FLASH_SALE_COMPONENT;
      break;
    case "desktop_multi_click_component":
      widgetType = MULTI_PURPOSE_BANNER;
      break;
    default:
      widgetType = DEFAULT_FALLBACK_ADOBE;
      break;
  }
  if (window._satellite) {
    window._satellite.track(widgetType);
  }
}
export function setDataLayerForVisitBrand() {
  if (window._satellite) {
    window._satellite.track(VISIT_BRAND);
  }
}
export function setDataLayerForHeaderAndFooterDirectCalls(type, value) {
  const previousDigitalData = cloneDeep(window.digitalData);
  const currentDigitalData = window.digitalData;
  if (
    previousDigitalData &&
    previousDigitalData.page &&
    previousDigitalData.page.pageInfo &&
    previousDigitalData.page.pageInfo.pageName
  ) {
    Object.assign(currentDigitalData, {
      page: {
        pageInfo: { pageName: previousDigitalData.page.pageInfo.pageName }
      }
    });
    window.digitalData = currentDigitalData;
  }
  if (type === ADOBE_DIRECT_CALL_FOR_HEADER_CLICK) {
    if (value) {
      Object.assign(currentDigitalData, {
        header: {
          headerName: value
        }
      });
      window.digitalData = currentDigitalData;
    }
    if (window._satellite) {
      window._satellite.track(HEADER_CLICK);
    }
  }
  if (type === ADOBE_DIRECT_CALL_FOR_CATEGORY_CLICK) {
    Object.assign(currentDigitalData, {
      header: {
        headerName: "Categories",
        categoryName: value
      }
    });
    window.digitalData = currentDigitalData;
    if (window._satellite) {
      window._satellite.track(CATEGORY_CLICK);
    }
  }
  if (type === ADOBE_DIRECT_CALL_FOR_BRAND_CLICK) {
    Object.assign(currentDigitalData, {
      cpj: {
        brand: { name: value }
      },
      header: {
        headerName: "Brands"
      }
    });
    window.digitalData = currentDigitalData;
    if (window._satellite) {
      window._satellite.track(BRAND_CLICK);
    }
  }
  if (type === ADOBE_DIRECT_CALL_FOR_FOOTER_CLICK) {
    Object.assign(currentDigitalData, {
      footer: {
        footerName: value
      }
    });
    window.digitalData = currentDigitalData;
    if (window._satellite) {
      window._satellite.track(FOOTER_CLICK);
    }
  }
  if (type === ADOBE_DIRECT_CALL_FOR_SOCIALMEDIA_CLICK) {
    Object.assign(currentDigitalData, {
      footer: {
        socialmediaName: value
      }
    });
    window.digitalData = currentDigitalData;
    if (window._satellite) {
      window._satellite.track(SOCIALMEDIA_CLICK);
    }
  }
  if (type === ADOBE_DIRECT_CALL_FOR_FOOTER_SUBSCRIBE) {
    Object.assign(currentDigitalData, {
      subscriberemail: value
    });
    window.digitalData = currentDigitalData;
    if (window._satellite) {
      window._satellite.track(FOOTER_SUBSCRIBE);
    }
  }
}
export function setDataLayerForSelectedAddressTypeDirectCalls(type) {
  if (type === ADOBE_DIRECT_CALL_FOR_CHOOSE_DELIVERY_ADDRESS_HOME) {
    if (window._satellite) {
      window._satellite.track(CHOOSE_DELIVERY_ADDRESS_HOME);
    }
  }
  if (type === ADOBE_DIRECT_CALL_FOR_CHOOSE_DELIVERY_ADDRESS_OFFICE) {
    if (window._satellite) {
      window._satellite.track(CHOOSE_DELIVERY_ADDRESS_OFFICE);
    }
  }
}
export function setDataLayerForSelectedFilterDirectCalls(
  type,
  filterType,
  filterValue
) {
  const currentDigitalData = window.digitalData;
  Object.assign(currentDigitalData, {
    filter: {
      filterType: filterType,
      filterValue: filterValue
    }
  });
  window.digitalData = currentDigitalData;
  if (type === ADOBE_DIRECT_CALL_FOR_FILTER_OPTION) {
    if (window._satellite) {
      window._satellite.track(FILTER_OPTION);
    }
  }
}
export function updatePdpDetailsBackFromReviewPage() {
  const previousDigitalData = cloneDeep(window.digitalData);
  const currentDigitalData = window.digitalData;
  if (
    previousDigitalData &&
    previousDigitalData.page &&
    previousDigitalData.page.pageInfo &&
    previousDigitalData.page.pageInfo.pageName
  ) {
    let previousPageName = previousDigitalData.page.pageInfo.pageName;
    let reviewPage = previousPageName.replace(
      "product review",
      "product details"
    );
    Object.assign(currentDigitalData, {
      page: {
        pageInfo: {
          pageName: reviewPage
        }
      }
    });
  }
  window.digitalData = currentDigitalData;
}
export function setDataLayerForStoryModal(type) {
  if (type === ADOBE_DIRECT_CALL_FOR_FRESH_FROM_BRANDS_PDP_VIEW) {
    if (window._satellite) {
      window._satellite.track(FRESH_FROM_BRANDS_PDP_VIEW);
    }
  }
}
export function setDataLayerForFaqAndTc(type) {
  if (type === SET_DATA_LAYER_FAQ) {
    if (window._satellite) {
      window._satellite.track(FAQ);
    }
  }
  if (type === SET_DATA_LAYER_TC) {
    if (window._satellite) {
      window._satellite.track(TC);
    }
  }
}
export function setDataLayerForGiftCard(type) {
  if (type === SET_DATA_LAYER_ADD_GIFT_CARD) {
    if (window._satellite) {
      window._satellite.track(ADD_GIFT_CARD);
    }
  }
  if (type === SET_DATA_LAYER_BUY_GIFT_CARD) {
    if (window._satellite) {
      window._satellite.track(BUY_GIFT_CARD);
    }
  }
  if (type === SET_DATA_LAYER_CLIQ_CASH_LAST_FIVE_TRANSACTION) {
    if (window._satellite) {
      window._satellite.track(CLIQ_CASH_LAST_FIVE_TRANSACTION);
    }
  }
  if (type === SET_DATA_LAYER_CLIQ_CASH_VIEW_ALL_TRANSACTION) {
    if (window._satellite) {
      window._satellite.track(CLIQ_CASH_VIEW_ALL_TRANSACTION);
    }
  }
  if (type === SET_DATA_LAYER_ADD_GIFT_CARD_SUBMIT) {
    if (window._satellite) {
      window._satellite.track(ADD_GIFT_CARD_SUBMIT);
    }
  }
  if (type === SET_DATA_LAYER_BUY_GIFT_CARD_SUBMIT) {
    if (window._satellite) {
      window._satellite.track(BUY_GIFT_CARD_SUBMIT);
    }
  }
}

export function setDataLayerForMinibag() {
  if (window._satellite) {
    window._satellite.track(VIEW_CART_FROM_MINIBAG);
  }
}
