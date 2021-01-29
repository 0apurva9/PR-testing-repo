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
const ADOBE_ADD_TO_CART_BUTTON = "add_to_cart";
const ADOBE_BUY_NOW = "cpj_buy_now";
// const PDP_PRODUCT_SIMILAR = "pdp_similar_products";
// export const ADOBE_PDP_SIMILAR_PRODUCT = "ADOBE_PDP_SIMILAR_PRODUCT";

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
const ADOBE_DIRECT_CALL_ON_CLICK_CHECKOUT = "cpj_cart_checkout";
const ADOBE_DIRECT_CALL_FOR_CHANGE_QUANTITY_ON_CART =
  "cpj_cart_quantity_change";
const ADOBE_DIRECT_CALL_FOR_SAVE_PORDUCT_ON_CART = "cpj_cart_button_save";
// end of direct call url for cart page
const ADOBE_ORDER_CONFIRMATION_FAILURE = "cpj_order_fail";
const ADOBE_ORDER_CONFIRMATION_SUCCESS = "cpj_order_successful";
const ADOBE_PAYMENT_CHECKOUT_SUCCESSFUL = "cpj_checkout_payment_successful";

// checkout adobe constants
const ADOBE_CHECKOUT_DEFAULT_ADDRESS = "cpj_checkout_default_address";
const ADOBE_LANDING_ON_ADDRESS_PAGE = "cpj_checkout_proceed_to_address";
const ADD_NEW_ADDRESS_ON_CHECKOUT = "cpj_checkout_addNewAddress";
const ADD_NEW_ADDRESS_ON_MY_ACCOUNT = "cpj_myAccount_addNewAddress";
const ADOBE_CONFIRM_ADDRESS = "cpj_checkout_confirm_address";
const ADOBE_SELECT_DELIVERY_MODES = "cpj_checkout_delivery_option_select";
const ADOBE_PROCEED_FROM_DELIVERY_MODE = "cpj_checkout_delivery_option";
const ADOBE_LANDS_ON_PAYMENT_MODES = "cpj_checkout_proceed_to_payment";
const ADOBE_SELECT_PAYMENT_MODES = "cpj_checkout_payment_selection";
const ADOBE_FINAL_PAYMENT = "cpj_place_order";
const ADOBE_SEE_ALL_BANK_OFFERS = "cpj_checkout_allbank_offers"; //CPJ_Checkout_Offer_Allbankoffer
const ADOBE_CLIQ_CASH_ON = "CPJ_Checkout_Payment_ToggleOn";
const ADOBE_CLIQ_CASH_OFF = "CPJ_Checkout_Payment_ToggleOff";
const ADOBE_CHECKOUT_APPLY_COUPON_SUCCESS =
  "cpj_checkout_payment_coupon_success";
const ADOBE_CHECKOUT_APPLY_COUPON_FAILURE = "cpj_checkout_payment_coupon_fail";
const ADOBE_CHECKOUT_APPLIED_CNC = "CPJ_Checkout_Delivery_CLiQ";
// end of checkout adobe constants
// direct call for login tracking

const BRAND_PAGE = "brand page";

const ADOBE_LOGIN_SUCCESS = "login_successful";
const ADOBE_LOGIN_FAILURE = "login_failed";
// end of direct call for login tracking

// cosnt for BLP and CLP
const ADOBE_BLP_DIRECT_CALL = "brand_click"; //cpj_brand_pages
const ADOBE_CLP_DIRECT_CALL = "category_click"; //cpj_category_pages
// end of cosnt for BLP and CLP

// type of hierarchy for MY_ACCOUNT
const MY_ACCOUNT_OVERVIEW = "my_account"; //myaccount_overview
const MY_ACCOUNT_SAVED_LIST = "wishList"; //myaccount_default_wishlist
const MY_ACCOUNT_ADDRESS_BOOK = "address_book"; //myaccount_address_book
const MY_ACCOUNT_BRANDS = "brands"; //myaccount_brands
const MY_ACCOUNT_ORDER_HISTORY = "orders_history"; //order history page
const MY_ACCOUNT_ORDER_DETAIL = "order details page";
const MY_ACCOUNT_SAVED_PAYMENTS = "payment_details"; //myaccount_payment_details
const MY_ACCOUNT_ALERTS = "alerts"; //myaccount_alerts
const MY_ACCOUNT_COUPONS = "coupons"; //myaccount_coupons
const MY_ACCOUNT_GIFT_CARD = "gift_card"; //myaccount_gift_card
const MY_ACCOUNT_CLIQ_CASH = "cliq_cash"; //myaccount_cliq_cash
const MY_ACCOUNT_SETTING = "update_profile"; //myaccount_update_setting
const MY_ACCOUNT_REVIEW = "my_review";
const MY_ACCOUNT_USEFUL_LINKS = "useful_links";
export const ADOBE_MY_ACCOUNT_USEFUL_LINKS = "ADOBE_MY_ACCOUNT_USEFUL_LINKS";
// end of type of hierarchy for my Account

// const for follow and un follow brands adobe calls
const ADOBE_FOLLOW_BRAND = "cpj_brand_follow";
const ADOBE_UN_FOLLOW_BRAND = "cpj_brand_unfollow";
const ADOBE_ON_CLICK_WIDGETS = "cpj_widget_followed";
// end of const for follow and un follow brands adobe calls
// const or adobe call for internal search call
const ADOBE_INTERNAL_SEARCH_SUCCESS = "internal_search";
const ADOBE_INTERNAL_SEARCH_SUCCESS_SP = "search_history";
const ADOBE_INTERNAL_SEARCH_SUCCESS_TRENDING = "trending_now";
const ADOBE_INTERNAL_SEARCH_NULL = "null_search";
const AUTO_SUGGEST_SEARCH = "auto_suggest_search_click";
// end of const or adobe call for internal search call

const ADOBE_NOT_FOUND = "404_error";
const ADOBE_FOR_CLICK_ON_PRODUCT_ON_PLP = "internal_search_link_clicks";

const SIGN_UP_START = "signup_start"; //signup_starts
const SIGN_UP_SUCCESS = "signup_success"; //signup_successful
const LOGOUT_SUCCESS = "logout_successful";
const LOGIN_START = "login_start";
// internal search Adobe call const
export const ADOBE_INTERNAL_SEARCH_CALL_ON_GET_PRODUCT =
  "ADOBE_INTERNAL_SEARCH_CALL_ON_GET_PRODUCT";
export const ADOBE_INTERNAL_SEARCH_CALL_ON_GET_PRODUCT_SP = "Search_History";
export const ADOBE_INTERNAL_SEARCH_CALL_ON_GET_PRODUCT_TRENDING =
  "Trending_Now";
export const ADOBE_INTERNAL_SEARCH_CALL_ON_GET_PRODUCT_RECENT =
  "PDP_Recently_Viewed";
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
export const ADOBE_RETURN_CANCEL = "order_returns_cancel";
export const ADOBE_ORDER_RETURN = "cpj_order_return";
export const CID = "CID";
export const SET_DATA_LAYER_FOR_ADD_TO_BAG_EVENT =
  "SET_DATA_LAYER_FOR_ADD_TO_BAG_EVENT";
export const SET_DATA_LAYER_FOR_ADOBE_ADD_TO_CART_BUTTON =
  "SET_DATA_LAYER_FOR_ADOBE_ADD_TO_CART_BUTTON";
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
export const ADOBE_CHECKOUT_DEFAULT_NEW_ADDRESS =
  "ADOBE_CHECKOUT_DEFAULT_NEW_ADDRESS";
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

export const WHATSAPP_NOTIFICATION_CHECKED = "WHATSAPP_NOTIFICATION_CHECKED";
const whatsAppNotificationUnChecked = "Whatsapp_unchecked";
const whatsAppNotificationChecked = "Whatsapp_checked";
export const WHATSAPP_NOTIFICATION_UNCHECKED =
  "WHATSAPP_NOTIFICATION_UNCHECKED";

// end of constants for checkout pages

// const for setting data layer for the login track

export const ADOBE_DIRECT_CALL_FOR_LOGIN_SUCCESS =
  "ADOBE_DIRECT_CALL_FOR_LOGIN_SUCCESS";
export const ADOBE_DIRECT_CALL_FOR_LOGIN_FAILURE =
  "ADOBE_DIRECT_CALL_FOR_LOGIN_FAILURE";
export const ADOBE_DIRECT_CALL_FOR_ANONYMOUS_USER =
  "ADOBE_DIRECT_CALL_FOR_ANONYMOUS_USER";

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
export const AODBE_MY_ACCOUNT_REVIEW = "AODBE_MY_ACCOUNT_REVIEW";

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
export const ADOBE_MY_ACCOUNT_RETURN_CANCEL = "ADOBE_MY_ACCOUNT_RETURN_CANCEL";
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
export const ADOBE_LOGOUT_SUCCESSFULL = "ADOBE_LOGOUT_SUCCESSFULL";
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
export const ADOBE_SIMILAR_PRODUCTS_PDP = "ADOBE_SIMILAR_PRODUCTS_PDP";
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
const FOOTER_CLICK = "footer_click";
const SOCIALMEDIA_CLICK = "socialmedia_click";
const FOOTER_SUBSCRIBE = "footer_subscribe";
const CHOOSE_DELIVERY_ADDRESS_HOME = "cpj_choose_delivery_address_home";
const CHOOSE_DELIVERY_ADDRESS_OFFICE = "cpj_choose_delivery_address_office";
const CHECKOUT_DEFAULT_ADDRESS_HOME = "selected_Type_Home";
const CHECKOUT_DEFAULT_ADDRESS_OFFICE = "selected_Type_Office";
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
const REVIEW_STAR_RATING = "cpj_rating_click";
export const ADOBE_REVIEW_STAR_RATING = "ADOBE_REVIEW_STAR_RATING";
const VIEW_CART_FROM_MINIBAG = "cpj_minicart_viewbag";
export const WHATSAPP_CHECKBOX_UNCHECK = "cpj_whatsappCheckboxUncheck";
export const ADOBE_DIRECT_CALL_FOR_CONTINUE_SHOPPING =
  "ADOBE_DIRECT_CALL_FOR_CONTINUE_SHOPPING";
export const ICID2 = "ICID2";

//bundled product
const PRODUCT_BUNDLED_OFFER = "product_bundle_offer_click";
const BUNDLED_ADD_BOTH_PRODUCT_TO_CART = "add_both_product_to_cart";
const BUNDLED_ADD_TO_CONTINUE_CLICK = "add_to_continue_click";
export const ADOBE_PRODUCT_BUNDLED_OFFER = "ADOBE_PRODUCT_BUNDLED_OFFER";
export const ADOBE_BUNDLED_ADD_BOTH_PRODUCT_TO_CART =
  "ADOBE_BUNDLED_ADD_BOTH_PRODUCT_TO_CART";
export const ADOBE_BUNDLED_ADD_TO_CONTINUE_CLICK =
  "ADOBE_BUNDLED_ADD_TO_CONTINUE_CLICK";
export const ADOBE_VIRTUAL_PAGELOAD = "ADOBE_VIRTUAL_PAGELOAD";

//return flow
const ORDER_DETAILS_LINK_CLICKED = "myAccount_orderDetails";
export const ADOBE_ORDER_DETAILS_LINK_CLICKED =
  "ADOBE_ORDER_DETAILS_LINK_CLICKED";
const ITEM_DETAILS_LINK_CLICKED = "myAccount_itemDetails";
export const ADOBE_ITEM_DETAILS_LINK_CLICKED =
  "ADOBE_ITEM_DETAILS_LINK_CLICKED";
const RETURN_LINK_CLICKED = "rrj_returnReplace_click";
export const ADOBE_RETURN_LINK_CLICKED = "ADOBE_RETURN_LINK_CLICKED";
const REQUEST_INVOICE_LINK_CLICKED = "rrj_requestInvoice_click";
export const ADOBE_REQUEST_INVOICE_LINK_CLICKED =
  "ADOBE_REQUEST_INVOICE_LINK_CLICKED";
const HELP_SUPPORT_LINK_CLICKED = "rrj_helpSupport_click";
export const ADOBE_HELP_SUPPORT_LINK_CLICKED =
  "ADOBE_HELP_SUPPORT_LINK_CLICKED";
const MY_ACCOUNT_HELP_AND_SUPPORT = "myAccount_helpSupport_click";
export const ADOBE_MY_ACCOUNT_HELP_AND_SUPPORT =
  "ADOBE_MY_ACCOUNT_HELP_AND_SUPPORT";
const RETURN_REASON_BUTTON_CLICKED = "rrj_returnReason_click";
export const ADOBE_RETURN_REASON_BUTTON_CLICKED =
  "ADOBE_RETURN_REASON_BUTTON_CLICKED";
const RETURN_JOURNEY_INITIATED = "rrj_returnJourneyInitiate";
export const ADOBE_RETURN_JOURNEY_INITIATED = "ADOBE_RETURN_JOURNEY_INITIATED";

export const ABOUT_US = "about_us";
export const HELP = "helps";
export const CUSTOMER_CARE = "customer_care";
export const CONTACT_US = "contact_us";
export const SET_DATA_LAYER_ABOUTUS = "SET_DATA_LAYER_ABOUTUS";
export const SET_DATA_LAYER_HELP = "SET_DATA_LAYER_HELP";
export const SET_DATA_LAYER_CC = "SET_DATA_LAYER_CC";
export const SET_DATA_LAYER_CONTACTUS = "SET_DATA_LAYER_CONTACTUS";

//Refund flow
const REFUNDSUMMARY_ORDERDETAILS_BUTTON_CLICKED = "rrj_viewOrderDetails_click";
export const ADOBE_REFUNDSUMMARY_ORDERDETAILS_BUTTON_CLICKED =
  "ADOBE_REFUNDSUMMARY_ORDERDETAILS_BUTTON_CLICKED";
const REFUNDSUMMARY_CONTINUESHOPPING_BUTTON_CLICKED = "rrj_contShopping_click";
export const ADOBE_REFUNDSUMMARY_CONTINUESHOPPING_BUTTON_CLICKED =
  "ADOBE_REFUNDSUMMARY_CONTINUESHOPPING_BUTTON_CLICKED";
const REFUNDSUMMARY_PAGE_LANDED = "rrj_refundSuccess";
export const ADOBE_REFUNDSUMMARY_PAGE_LANDED =
  "ADOBE_REFUNDSUMMARY_PAGE_LANDED";
const ADD_BANKDETAILS_BUTTON_CLICKED = "rrj_addBankDetails_click";
export const ADOBE_ADD_BANKDETAILS_BUTTON_CLICKED =
  "ADOBE_ADD_BANKDETAILS_BUTTON_CLICKED";
const CHANGE_PICKUPADDRESS_LINK_CLICKED = "rrj_changeAddress_click";
export const ADOBE_CHANGE_PICKUPADDRESS_LINK_CLICKED =
  "ADOBE_CHANGE_PICKUPADDRESS_LINK_CLICKED";
const SAVE_BANKDETAILS_BUTTON_CLICKED = "rrj_addBankContinue_click";
export const ADOBE_SAVE_BANKDETAILS_BUTTON_CLICKED =
  "ADOBE_SAVE_BANKDETAILS_BUTTON_CLICKED";
const SHOW_REFUND_BUTTON_CLICKED = "rrj_refund_click";
export const ADOBE_SHOW_REFUND_BUTTON_CLICKED =
  "ADOBE_SHOW_REFUND_BUTTON_CLICKED";
const MODE_OF_REFUND_SUBMITTED = "rrj_modeOfRefund_click";
export const ADOBE_MODE_OF_REFUND_SUBMITTED = "ADOBE_MODE_OF_REFUND_SUBMITTED";
const MODE_OF_RETURN_SUBMITTED = "rrj_modeOfReturn_click";
export const ADOBE_MODE_OF_RETURN_SUBMITTED = "ADOBE_MODE_OF_RETURN_SUBMITTED";
export const ERROR_TOAST_MESSAGE = "error_tracking";
export const ADOBE_ERROR_TOAST_MESSAGE = "ADOBE_ERROR_TOAST_MESSAGE";
export const MY_ACCOUNT_WRITE_REVIEW = "myAccount_Write_Review";
export const ADOBE_MY_ACCOUNT_WRITE_REVIEW = "ADOBE_MY_ACCOUNT_WRITE_REVIEW";
const MY_ACCOUNT_TAB_CLICKED = "myAccount_Tab_Click";
export const ADOBE_MY_ACCOUNT_TAB_CLICKED = "ADOBE_MY_ACCOUNT_TAB_CLICKED";
const REVIEW_SUBMIT_BUTTON = "cpj_review_click";
export const ADOBE_REVIEW_SUBMIT_BUTTON = "ADOBE_REVIEW_SUBMIT_BUTTON";
const ADOBE_WIDGET_TRACKING = "widget_tracking";
export const ADOBE_SORT_BY_CLICK = "CPJ_sortBy_click";
export const ADOBE_SORT_SELECT = "ADOBE_SORT_SELECT";
export const SERVERSIDE = "Server Side";
export const CLIENTSIDE = "Client Side";
const SUMSUNG_CHAT_ICON = "samsung_chat_icon_click";
export const ADOBE_SUMSUNG_CHAT_ICON = "ADOBE_SUMSUNG_CHAT_ICON";
const SUMSUNG_CHAT_LINK_CLICK = "samsung_chat_link_click";
export const ADOBE_SUMSUNG_CHAT_LINK_CLICK = "ADOBE_SUMSUNG_CHAT_LINK_CLICK";
const SIMILAR_PRODUCTS_PLP = "plp_similar_products";
export const ADOBE_SIMILAR_PRODUCTS_PLP = "ADOBE_SIMILAR_PRODUCTS_PLP";
const ADD_TO_WISHLIST_PLP = "plp_add_to_wishlist";
export const ADOBE_ADD_TO_WISHLIST_PLP = "ADOBE_ADD_TO_WISHLIST_PLP";
const WISHLIST_PLP_REMOVE = "plp_remove_from_wishlist";
export const ADOBE_WISHLIST_PLP_REMOVE = "ADOBE_WISHLIST_PLP_REMOVE";
const WISHLIST_PDP_REMOVE = "pdp_remove_from_wishlist";
export const ADOBE_WISHLIST_PDP_REMOVE = "ADOBE_WISHLIST_PDP_REMOVE";
const SIMILAR_PRODUCT_PDP = "pdp_view_similar_products";
const ADD_TO_WISHLIST_PDP = "pdp_add_to_wishlist";
export const ADOBE_ADD_TO_WISHLIST_PDP = "ADOBE_ADD_TO_WISHLIST_PDP";
const MYACCOUNT_DELIVERYMODE_CHANGE_INITIATE =
  "cpj_myacc_changeDeliveryMode_initiate";
export const ADOBE_MYACCOUNT_DELIVERYMODE_CHANGE_INITIATE =
  "ADOBE_MYACCOUNT_DELIVERYMODE_CHANGE_INITIATE";
const MYACCOUNT_DELIVERYMODE_CHANGE_SUCCESS =
  "cpj_myacc_changeDeliveryMode_success";
export const ADOBE_MYACCOUNT_DELIVERYMODE_CHANGE_SUCCESS =
  "ADOBE_MYACCOUNT_DELIVERYMODE_CHANGE_SUCCESS";
const PDP_KNOW_MORE_CLICK = "pdp_show_more";
export const ADOBE_PDP_KNOW_MORE_CLICK = "ADOBE_PDP_KNOW_MORE_CLICK";
export const SIMILAR_PRODUCTS_PDP_WIDGET = "SIMILAR_PRODUCTS_PDP_WIDGET";
export const ADOBE_CAROUSEL_SWIPE = "ADOBE_CAROUSEL_SWIPE";
export const ADOBE_CAROUSEL_CLICK = "ADOBE_CAROUSEL_CLICK";
export const ADOBE_CAROUSEL_SHOW = "ADOBE_CAROUSEL_SHOW";
// export const TARGET_EVENT_FOR_PAGELOAD = "target_pageload_First";
// export const TARGET_EVENT_FOR_PAGEVIEW = "target_pageview_First";

//Rating and Review
const RATING_STAR_CLICK = "rating_Star_Click";
export const SET_DATA_LAYER_RATING_STAR_CLICK =
  "SET_DATA_LAYER_RATING_STAR_CLICK";
const RATING_MESSAGE = "rating_Message";
export const SET_DATA_LAYER_RATING_MESSAGE = "SET_DATA_LAYER_RATING_MESSAGE";
const RATING_MODAL_STAR_CLICK = "rating_modal_Star_Click";
export const SET_DATA_LAYER_RATING_MODAL_STAR_CLICK =
  "SET_DATA_LAYER_RATING_MODAL_STAR_CLICK";

const REVIEW_SUBMIT_CLICK = "review_Submit_Click";
export const SET_DATA_LAYER_REVIEW_SUBMIT_CLICK =
  "SET_DATA_LAYER_REVIEW_SUBMIT_CLICK";
const REVIEW_CANCEL_CLICk = "review_cancel_Click";
export const SET_DATA_LAYER_REVIEW_CANCEL_CLICK =
  "SET_DATA_LAYER_REVIEW_CANCEL_CLICK";
const REVIEW_GUIDELINE = "review_guideline";
export const SET_DATA_LAYER_REVIEW_GUIDELINE =
  "SET_DATA_LAYER_REVIEW_GUIDELINE";
export const SET_DATA_LAYER_VERIFY_BUTTON_UPI =
  "SET_DATA_LAYER_VERIFY_BUTTON_UPI";
const UPI_VERIFY_CLICK = "upi_Verify_Click";
export const SET_DATA_LAYER_UID_SELECTION = "SET_DATA_LAYER_UID_SELECTION";
const UID_SELECTION = "upi_Id_Selection";

export const SET_DATA_LAYER_UID_REMOVE = "SET_DATA_LAYER_UID_REMOVE";
export const TRACK_UID_REMOVE = "upi_Remove_Click";

export const SET_DATA_LAYER_UID_ADD = "SET_DATA_LAYER_UID_ADD";
export const TRACK_UID_ADD = "upi_AddNewUPIID_Click";
export const SET_DATA_LAYER_UID_SAVE = "SET_DATA_LAYER_UID_SAVE";
export const TRACK_UID_SAVE = "upi_Save";

// mobile device exchange - MDE
const ADOBE_CLICK_ON_EXCHANGE_AVAILABLE_FILTER =
  "plp_Exchange_Available_Filter";
export const ADOBE_MDE_CLICK_ON_EXCHANGE_AVAILABLE_FILTER =
  "ADOBE_MDE_CLICK_ON_EXCHANGE_AVAILABLE_FILTER";

const ADOBE_FOR_CLICK_ON_PRODUCT_ON_PLP_MOBILE_EXCHANGE =
  "plp_With_Exchange_Offer";
const ADOBE_FOR_CLICK_ON_PRODUCT_ON_PLP_WITHOUT_MOBILE_EXCHANGE =
  "plp_Without_Exchange_Offer";
export const ADOBE_CLICK_ON_PRODUCTS_PLP_WITH_EXCHANGE =
  "ADOBE_CLICK_ON_PRODUCTS_PLP_WITH_EXCHANGE";
export const ADOBE_CLICK_ON_PRODUCTS_PLP_WITHOUT_EXCHANGE =
  "ADOBE_CLICK_ON_PRODUCTS_PLP_WITHOUT_EXCHANGE";

const ADOBE_CLICK_ON_EXCHANGE_LINK = "pdp_Exchange_Widget";
export const ADOBE_MDE_CLICK_ON_EXCHANGE_LINK =
  "ADOBE_MDE_CLICK_ON_EXCHANGE_LINK";

const ADOBE_CLICK_ON_CHANGE_DEVICE = "exchange_Model_Change";
export const ADOBE_MDE_CLICK_ON_CHANGE_DEVICE =
  "ADOBE_MDE_CLICK_ON_CHANGE_DEVICE";

const ADOBE_CLICK_ON_HOW_EXCHANGE_WORKS = "pdp_How_Exchange_Works";
export const ADOBE_MDE_CLICK_ON_HOW_EXCHANGE_WORKS =
  "ADOBE_MDE_CLICK_ON_HOW_EXCHANGE_WORKS";

const ADOBE_PRODUCT_ALREADY_IN_CART = "pdp_Already_Added_Cart";
const ADOBE_PRODUCT_ALREADY_IN_CART_GO_TO_BAG = "pdp_Already_Cart_GotoBag";
const ADOBE_PRODUCT_ALREADY_IN_CART_CANCEL = "pdp_Already_Cart_Cancel";
export const ADOBE_MDE_PRODUCT_ALREADY_IN_CART =
  "ADOBE_MDE_PRODUCT_ALREADY_IN_CART";
export const ADOBE_MDE_PRODUCT_ALREADY_IN_CART_GO_TO_BAG =
  "ADOBE_MDE_PRODUCT_ALREADY_IN_CART_GO_TO_BAG";
export const ADOBE_MDE_PRODUCT_ALREADY_IN_CART_CANCEL =
  "ADOBE_MDE_PRODUCT_ALREADY_IN_CART_CANCEL";

const ADOBE_CLICK_ON_EXCHANGE_LINK_THROUGH_SELLER =
  "pdp_Exchange_Through_Seller";
export const ADOBE_MDE_CLICK_ON_EXCHANGE_LINK_THROUGH_SELLER =
  "ADOBE_MDE_CLICK_ON_EXCHANGE_LINK_THROUGH_SELLER";

const ADOBE_CLICK_ON_EXCHANGE_MODAL_KNOW_MORE = "exchange_Model_Know_More";
export const ADOBE_MDE_CLICK_ON_EXCHANGE_MODAL_KNOW_MORE =
  "ADOBE_MDE_CLICK_ON_EXCHANGE_MODAL_KNOW_MORE";

const ADOBE_CLICK_ON_EXCHANGE_MODAL_TNC = "exchange_Model_T&c";
export const ADOBE_MDE_CLICK_ON_EXCHANGE_MODAL_TNC =
  "ADOBE_MDE_CLICK_ON_EXCHANGE_MODAL_TNC";

const ADOBE_CLICK_ON_EXCHANGE_MODAL_ADD_ANOTHER_DEVICE =
  "exchange_Model_Add_Another_Mobile";
export const ADOBE_MDE_CLICK_ON_EXCHANGE_MODAL_ADD_ANOTHER_DEVICE =
  "ADOBE_MDE_CLICK_ON_EXCHANGE_MODAL_ADD_ANOTHER_DEVICE";

const ADOBE_CLICK_ON_PROCEED_WITH_EXCHANGE =
  "exchange_Model_Proceed_with_Exchange";
export const ADOBE_MDE_CLICK_ON_PROCEED_WITH_EXCHANGE =
  "ADOBE_MDE_CLICK_ON_PROCEED_WITH_EXCHANGE";

const ADOBE_CLICK_ON_CASHBACK_DETAILS = "exchange_Model_Cashback_Details";
export const ADOBE_MDE_CLICK_ON_CASHBACK_DETAILS =
  "ADOBE_MDE_CLICK_ON_CASHBACK_DETAILS";

const ADOBE_CLICK_ON_VERIFY_IMEI = "exchange_Model_Verify";
export const ADOBE_MDE_CLICK_ON_VERIFY_IMEI = "ADOBE_MDE_CLICK_ON_VERIFY_IMEI";

const ADOBE_CLICK_ON_REMOVE_EXCHANGE = "cart_Exchange_Remove";
export const ADOBE_MDE_CLICK_ON_REMOVE_EXCHANGE =
  "ADOBE_MDE_CLICK_ON_REMOVE_EXCHANGE";

const ADOBE_CLICK_ON_GET_NEW_PRICE = "cart_Exchange_Get_New_Price";
export const ADOBE_MDE_CLICK_ON_GET_NEW_PRICE =
  "ADOBE_MDE_CLICK_ON_GET_NEW_PRICE";

const ADOBE_CLICK_ON_CART_VIEW_MORE = "cart_Exchange_View_More";
export const ADOBE_MDE_CLICK_ON_CART_VIEW_MORE =
  "ADOBE_MDE_CLICK_ON_CART_VIEW_MORE";

const ADOBE_CLICK_ON_CART_VIEW_LESS = "cart_Exchange_View_Less";
export const ADOBE_MDE_CLICK_ON_CART_VIEW_LESS =
  "ADOBE_MDE_CLICK_ON_CART_VIEW_LESS";

const ADOBE_CLICK_ON_CART_TNC = "cart_Exchange_t&c";
export const ADOBE_MDE_CLICK_ON_CART_TNC = "ADOBE_MDE_CLICK_ON_CART_TNC";

const ADOBE_CLICK_ON_SAVE_TO_WISHLIST = "cart_Exchange_Save";
export const ADOBE_MDE_CLICK_ON_SAVE_TO_WISHLIST =
  "ADOBE_MDE_CLICK_ON_SAVE_TO_WISHLIST";

const ADOBE_CLICK_ON_CHECKOUT_BTN_CART_WITH_EXCHANGE = "cart_Exchange_Checkout";
export const ADOBE_MDE_CLICK_ON_CHECKOUT_BTN_CART_WITH_EXCHANGE =
  "ADOBE_MDE_CLICK_ON_CHECKOUT_BTN_CART_WITH_EXCHANGE";

const ADOBE_CLICK_ON_CLIQCASH_CHECKOUT_WITH_EXCHANGE = "cart_Exchange_CliqCash";
export const ADOBE_MDE_CLICK_ON_CLIQCASH_CHECKOUT_WITH_EXCHANGE =
  "ADOBE_MDE_CLICK_ON_CLIQCASH_CHECKOUT_WITH_EXCHANGE";

const ADOBE_CLICK_ON_CANCEL_WITH_EXCHANGE = "OD_Exchange_Cancel";
export const ADOBE_MDE_CLICK_ON_CANCEL_WITH_EXCHANGE =
  "ADOBE_MDE_CLICK_ON_CANCEL_WITH_EXCHANGE";

const ADOBE_CLICK_ON_RETURN_WITH_EXCHANGE = "OD_Exchange_Returns";
export const ADOBE_MDE_CLICK_ON_RETURN_WITH_EXCHANGE =
  "ADOBE_MDE_CLICK_ON_RETURN_WITH_EXCHANGE";

const ADOBE_CLICK_ON_CHANGE_ACCOUNT_EXCHANGE = "OC_Change_Account";
export const ADOBE_MDE_CLICK_ON_CHANGE_ACCOUNT_EXCHANGE =
  "ADOBE_MDE_CLICK_ON_CHANGE_ACCOUNT_EXCHANGE";

const ADOBE_CASHBACK_MODE_CLIQCASH_EXCHANGE = "OC_Cliq_Cash";
export const ADOBE_MDE_CASHBACK_MODE_CLIQCASH_EXCHANGE =
  "ADOBE_MDE_CASHBACK_MODE_CLIQCASH_EXCHANGE";

const ADOBE_CASHBACK_MODE_BANK_ACCOUNT_EXCHANGE = "OC_Account_Details_CM";
export const ADOBE_MDE_CASHBACK_MODE_BANK_ACCOUNT_EXCHANGE =
  "ADOBE_MDE_CASHBACK_MODE_BANK_ACCOUNT_EXCHANGE";
const MSD_AUTOMATED_BRAND_PRODUCT_CAROUSAL_ADOBE =
  "msdAutomatedBannerProductCarouselComponent";

// for product bundling
const ADOBE_ADD_BUNDLED_PRODUCTS_TO_CART_FROM_PDP = "add_both_product_to_cart";
export const ADOBE_PB_ADD_BUNDLED_PRODUCTS_TO_CART_FROM_PDP =
  "ADOBE_PB_ADD_BUNDLED_PRODUCTS_TO_CART_FROM_PDP";

const ADOBE_ADD_BUNDLED_PRODUCTS_TO_CART_FROM_CART = "add_to_continue_click";
export const ADOBE_PB_ADD_BUNDLED_PRODUCTS_TO_CART_FROM_CART =
  "ADOBE_PB_ADD_BUNDLED_PRODUCTS_TO_CART_FROM_CART";

const ADOBE_REMOVE_BUNDLED_PRODUCT_FROM_CART = "cpj_cart_removal";
export const ADOBE_PB_REMOVE_BUNDLED_PRODUCT_FROM_CART =
  "ADOBE_PB_REMOVE_BUNDLED_PRODUCT_FROM_CART";

//Cliq care Page
const SELF_SERVE_OTHER_ISSUES = "selfserve_OtherIssue";
const SELF_SERVE_ALL_HELP_TOPIC_SELECTION = "selfserve_Topic_Selection";
const SELF_SERVE_PAGE_LOAD = "selfserve_PageLoad";
const SELF_SERVE_QUESTION_SELECTION = "selfserve_Issue_Selection";
const SELF_SERVE_FEEDBACK_SELECTION = "selfserve_Feedback_Selection";
const SELF_SERVE_CONTINUE_BUTTON_CLICK = "selfserve_Continue_button";
const SELF_SERVE_MORE_HELP_PAGE_BUTTON_CLICK = "selfserve_Buttons_Click";
const SELF_SERVE_NON_ORDER_CATEGORY_CLICK = "selfserve_Tab_Click";
const SELF_SERVE_SUBMIT_BUTTON_CLICK = "selfserve_Submit";
const SELF_SERVE_NON_ORDER_PAGE_LOAD = "selfserve_AR_Load";
const SELF_SERVE_NON_ORDER_QUESTION_CLICK = "selfserve_AR_Topic_Selection";
const SELF_SERVE_FAQ_PAGE_LOAD = "selfserve_IW_Load";

// for appliances exchange
const MDE = "MDE";
export const ADOBE_TRACK_APPLIANCES_EXCHANGE_JOURNEY =
  "ADOBE_TRACK_APPLIANCES_EXCHANGE_JOURNEY";
export const ADOBE_TRACK_APPLIANCES_EXCHANGE_AC_JOURNEY =
  "ADOBE_TRACK_APPLIANCES_EXCHANGE_AC_JOURNEY";

export const ADOBE_SELF_SERVE_OTHER_ISSUES_CLICK =
  "ADOBE_SELF_SERVE_OTHER_ISSUES_CLICK";
export const ADOBE_SELF_SERVE_ALL_HELP_TOPIC_CLICK =
  "ADOBE_SELF_SERVE_ALL_HELP_TOPIC_CLICK";
export const ADOBE_SELF_SERVE_PAGE_LOAD = "ADOBE_SELF_SERVE_PAGE_LOAD";
export const ADOBE_SELF_SERVE_ISSUE_SELECTION =
  "ADOBE_SELF_SERVE_ISSUE_SELECTION";
export const ADOBE_SELF_SERVE_FEEDBACK_SELECTION =
  "ADOBE_SELF_SERVE_FEEDBACK_SELECTION";
export const ADOBE_SELF_SERVE_CONTINUE_BUTTON_CLICK =
  "ADOBE_SELF_SERVE_CONTINUE_BUTTON_CLICK";
export const ADOBE_SELF_SERVE_MORE_HELP_PAGE_BUTTON_CLICK =
  "ADOBE_SELF_SERVE_MORE_HELP_PAGE_BUTTON_CLICK";
export const ADOBE_SELF_SERVE_NON_ORDER_CATEGORY_CLICK =
  "ADOBE_SELF_SERVE_NON_ORDER_CATEGORY_CLICK";
export const ADOBE_SELF_SERVE_SUBMIT_CLICK = "ADOBE_SELF_SERVE_SUBMIT_CLICK";
export const ADOBE_SELF_SERVE_NON_ORDER_QUESTION_CLICK =
  "ADOBE_SELF_SERVE_NON_ORDER_QUESTION_CLICK";
export const ADOBE_SELF_SERVE_NON_ORDER_PAGE_LOAD =
  "ADOBE_SELF_SERVE_NON_ORDER_PAGE_LOAD";
export const ADOBE_SELF_SERVE_FAQ_PAGE_LOAD = "ADOBE_SELF_SERVE_FAQ_PAGE_LOAD";

export async function setDataLayer(
  type,
  apiResponse,
  icid,
  icidType,
  behaviorOfPage
) {
  const response = cloneDeep(apiResponse);

  let userDetails = getCookie(constants.LOGGED_IN_USER_DETAILS);
  let userLoginFailed = getCookie(constants.NON_LOGGED_IN_USER_DETAILS);
  if (userDetails) {
    userDetails = JSON.parse(userDetails);
  } else if (userLoginFailed) {
    userLoginFailed = JSON.parse(userLoginFailed);
  }

  if (userDetails && window.digitalData && window.digitalData.account) {
    if (userDetails.loginType === LOGIN_WITH_EMAIL) {
      Object.assign(window.digitalData.account, {
        login: {
          customerID: userDetails.customerId,
          type: EMAIL
        }
      });
    } else if (userDetails.loginType === LOGIN_WITH_MOBILE) {
      Object.assign(window.digitalData.account, {
        login: {
          customerID: userDetails.customerId,
          type: MOBILE
        }
      });
    } else if (userDetails.loginType === FACEBOOK_PLATFORM) {
      Object.assign(window.digitalData.account, {
        login: {
          customerID: userDetails.customerId,
          type: FACEBOOK
        }
      });
    } else if (userDetails.loginType === GOOGLE_PLUS_PLATFORM) {
      Object.assign(window.digitalData.account, {
        login: {
          customerID: userDetails.customerId,
          type: GOOGLE
        }
      });
    }
  } else if (userLoginFailed) {
    if (userLoginFailed.loginType === LOGIN_WITH_EMAIL) {
      Object.assign(window.digitalData, {
        account: {
          login: {
            customerID: userLoginFailed.customerId,
            type: EMAIL
          }
        }
      });
    } else if (userLoginFailed.loginType === LOGIN_WITH_MOBILE) {
      Object.assign(window.digitalData, {
        account: {
          login: {
            customerID: userLoginFailed.customerId,
            type: MOBILE
          }
        }
      });
    } else if (userLoginFailed.loginType === FACEBOOK_PLATFORM) {
      Object.assign(window.digitalData, {
        account: {
          login: {
            customerID: userLoginFailed.customerId,
            type: FACEBOOK
          }
        }
      });
    } else if (userLoginFailed.loginType === GOOGLE_PLUS_PLATFORM) {
      Object.assign(window.digitalData, {
        account: {
          login: {
            customerID: userLoginFailed.customerId,
            type: GOOGLE
          }
        }
      });
    }
    const mcvId = await getMcvId();
    if (window.digitalData && window.digitalData.account) {
      Object.assign(window.digitalData.account, {
        mcvId: mcvId
      });
    }
  }
  if (window.digitalData && window.digitalData.account) {
    localStorage.setItem(
      "loginType",
      JSON.stringify(window.digitalData.account)
    );
  }
  // if (type === ADOBE_PDP_SIMILAR_PRODUCT) {
  //   if (window._satellite) {
  //     window._satellite.track(PDP_PRODUCT_SIMILAR);
  //   }
  // }
  if (type === ADOBE_MY_ACCOUNT_TAB_CLICKED) {
    let currentDigitalData = window.digitalData;
    if (apiResponse) {
      Object.assign(currentDigitalData, {
        cpj: {
          tab: { name: apiResponse }
        }
      });
      window.digitalData = currentDigitalData;
    }
    if (window._satellite) {
      window._satellite.track(MY_ACCOUNT_TAB_CLICKED);
    }
  }
  if (type === ADOBE_SORT_SELECT) {
    let dataSort;
    if (window.digitalData) {
      dataSort = {
        sortby: {
          value: response
        }
      };
    }
    window.digitalData = Object.assign(window.digitalData, dataSort);
    // window.digitalData = getDigitalDataForSort(response);
    if (window._satellite) {
      window._satellite.track(ADOBE_SORT_BY_CLICK);
    }
  }
  if (type === ADOBE_PLP_TYPE) {
    let newVariable = getDigitalDataForPlp(type, response);
    window.digitalData = Object.assign(window.digitalData, newVariable);
    if (window._satellite) {
      window._satellite.track(ADOBE_PLP_CPJ);
    }
  }
  if (type === ADOBE_SIMILAR_PRODUCTS_PLP) {
    let newVariable = getDigitalDataForPlp(type, response);
    window.digitalData = Object.assign(window.digitalData, newVariable);
    if (window._satellite) {
      window._satellite.track(SIMILAR_PRODUCTS_PLP);
    }
  }
  if (type === ADOBE_ADD_TO_WISHLIST_PDP) {
    if (window._satellite) {
      window._satellite.track(ADD_TO_WISHLIST_PDP);
    }
  }
  if (type === ADOBE_ADD_TO_WISHLIST_PLP) {
    if (window._satellite) {
      window._satellite.track(ADD_TO_WISHLIST_PLP);
    }
  }
  if (type === ADOBE_WISHLIST_PLP_REMOVE) {
    if (window._satellite) {
      window._satellite.track(WISHLIST_PLP_REMOVE);
    }
  }
  if (type === ADOBE_WISHLIST_PDP_REMOVE) {
    if (window._satellite) {
      window._satellite.track(WISHLIST_PDP_REMOVE);
    }
  }

  if (
    type === ADOBE_INTERNAL_SEARCH_CALL_ON_GET_PRODUCT &&
    behaviorOfPage !== "Popular brands" &&
    behaviorOfPage !== "isSortTrue" &&
    behaviorOfPage !== "isFilterTrue"
  ) {
    let newVariable = getDigitalDataForSearchPageSuccess(response, type);
    window.digitalData = Object.assign(window.digitalData, newVariable);
    if (window._satellite) {
      window._satellite.track(ADOBE_INTERNAL_SEARCH_SUCCESS);
    }
  }
  if (type === ADOBE_INTERNAL_SEARCH_CALL_ON_GET_PRODUCT_SP) {
    let newVariable = getDigitalDataForSearchPageSuccess(response, type);
    window.digitalData = Object.assign(window.digitalData, newVariable);
    if (window._satellite) {
      window._satellite.track(ADOBE_INTERNAL_SEARCH_SUCCESS_SP);
    }
  }
  if (type === ADOBE_INTERNAL_SEARCH_CALL_ON_GET_PRODUCT_TRENDING) {
    let newVariable = getDigitalDataForSearchPageSuccess(response, type);
    window.digitalData = Object.assign(window.digitalData, newVariable);
    if (window._satellite) {
      window._satellite.track(ADOBE_INTERNAL_SEARCH_SUCCESS_TRENDING);
    }
  }
  if (type === ADOBE_INTERNAL_SEARCH_CALL_ON_GET_NULL) {
    let newVariable = getDigitalDataForSearchPageForNullResult(response);
    window.digitalData = Object.assign(window.digitalData, newVariable);
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
    window.digitalData = Object.assign(window.digitalData, digitalDataForPDP);
    if (response && response.allOOStock) {
      if (window._satellite) {
        window._satellite.track(ADOBE_OUT_OF_STOCK_PDP);
      }
    }
    if (window._satellite) {
      window._satellite.track(ADOBE_PDP_CPJ);
    }
  }
  if (type === ADOBE_ERROR_TOAST_MESSAGE) {
    let previousData = cloneDeep(window.digitalData);
    if (window.digitalData) {
      if (previousData && previousData.page) {
        Object.assign(previousData.page, {
          error: {
            name: response.msg,
            type: response.type
          },
          pageInfo: {
            pageName:
              previousData && previousData.page && previousData.page.pageInfo
                ? previousData.page.pageInfo.pageName
                : previousData.cpj &&
                  previousData.cpj.pdp &&
                  previousData.cpj.pdp.findingMethod,
            pageType:
              previousData &&
              previousData.page &&
              previousData.page.pageInfo &&
              previousData.page.pageInfo.pageType
          }
        });
      } else {
        Object.assign(previousData, {
          page: {
            error: {
              name: response.msg,
              type: response.type
            },
            pageInfo: {
              pageName:
                previousData && previousData.page && previousData.page.pageInfo
                  ? previousData.page.pageInfo.pageName
                  : previousData.cpj &&
                    previousData.cpj.pdp &&
                    previousData.cpj.pdp.findingMethod,
              pageType:
                previousData &&
                previousData.page &&
                previousData.page.pageInfo &&
                previousData.page.pageInfo.pageType
            }
          }
        });
      }
    }
    Object.assign(window.digitalData, previousData);
    if (window._satellite) {
      window._satellite.track(ERROR_TOAST_MESSAGE);
    }
  }
  if (type === ADOBE_SIMILAR_PRODUCTS_PDP) {
    const digitalDataForPDP = getDigitalDataForPdp(type, response);
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
    window.digitalData = Object.assign(window.digitalData, digitalDataForPDP);
    if (response && response.allOOStock) {
      if (window._satellite) {
        window._satellite.track(ADOBE_OUT_OF_STOCK_PDP);
      }
    }
    if (window._satellite) {
      window._satellite.track(SIMILAR_PRODUCT_PDP);
    }
  }
  //bundledProduct
  if (type === ADOBE_PRODUCT_BUNDLED_OFFER) {
    if (window._satellite) {
      window._satellite.track(PRODUCT_BUNDLED_OFFER);
    }
  }
  if (type === ADOBE_MY_ACCOUNT_WRITE_REVIEW) {
    if (window._satellite) {
      window._satellite.track(MY_ACCOUNT_WRITE_REVIEW);
    }
  }
  if (type === ADOBE_REVIEW_SUBMIT_BUTTON) {
    if (window._satellite) {
      window._satellite.track(REVIEW_SUBMIT_BUTTON);
    }
  }
  if (type === ADOBE_BUNDLED_ADD_BOTH_PRODUCT_TO_CART) {
    window.digitalData.cpj.product.id = apiResponse.id;
    window.digitalData.cpj.product.category = apiResponse.category;
    window.digitalData.cpj.product.price = apiResponse.price;
    if (window._satellite) {
      window._satellite.track(BUNDLED_ADD_BOTH_PRODUCT_TO_CART);
    }
  }
  if (type === ADOBE_BUNDLED_ADD_TO_CONTINUE_CLICK) {
    window.digitalData.cpj.product.id = apiResponse.id;
    window.digitalData.cpj.product.category = apiResponse.category;
    window.digitalData.cpj.product.price = apiResponse.price;
    if (window._satellite) {
      window._satellite.track(BUNDLED_ADD_TO_CONTINUE_CLICK);
    }
  }
  if (type === ADOBE_CHECKOUT_TYPE) {
    window.digitalData = getDigitalDataForCheckout(type, response);
  }
  if (type === ADOBE_CART_TYPE) {
    let newVariable = getDigitalDataForCart(type, response);
    window.digitalData = Object.assign(window.digitalData, newVariable);
    if (window.digitalData) {
      localStorage.setItem(
        constants.DIGITAL_DATA_FOR_CART,
        JSON.stringify(window.digitalData)
      );
    }
    if (window._satellite) {
      window._satellite.track(ADOBE_DIRECT_CALL_FOR_LANDING_USER);
    }
  }
  if (type === ADOBE_ORDER_CONFIRMATION) {
    window.digitalData = getDigitalDataForOrderConfirmation(type, response);
  }
  if (type === ADOBE_MY_ACCOUNT_LANDING_PAGE) {
    let newVariable = getDigitalDataForMyAccount(MY_ACCOUNT_OVERVIEW);
    window.digitalData = Object.assign(window.digitalData, newVariable);
  }
  if (type === ADOBE_MY_ACCOUNT_SAVED_LIST) {
    let myAccountDetails = getDigitalDataForMyAccount(
      MY_ACCOUNT_SAVED_LIST,
      response
    );
    window.digitalData = Object.assign(window.digitalData, myAccountDetails);
  }
  if (type === ADOBE_MY_ACCOUNT_ADDRESS_BOOK) {
    let myAccountDetails = getDigitalDataForMyAccount(MY_ACCOUNT_ADDRESS_BOOK);
    window.digitalData = Object.assign(window.digitalData, myAccountDetails);
  }
  if (type === ADOBE_MY_ACCOUNT_BRANDS) {
    let myAccountDetails = getDigitalDataForMyAccount(MY_ACCOUNT_BRANDS);
    window.digitalData = Object.assign(window.digitalData, myAccountDetails);
  }
  if (type === ADOBE_MY_ACCOUNT_ORDER_HISTORY) {
    let myAccountDetails = getDigitalDataForMyAccount(MY_ACCOUNT_ORDER_HISTORY);
    window.digitalData = Object.assign(window.digitalData, myAccountDetails);
  }
  if (type === ADOBE_MY_ACCOUNT_SAVED_PAYMENTS) {
    let myAccountDetails = getDigitalDataForMyAccount(
      MY_ACCOUNT_SAVED_PAYMENTS
    );
    window.digitalData = Object.assign(window.digitalData, myAccountDetails);
  }
  if (type === ADOBE_MY_ACCOUNT_ALERTS) {
    let myAccountDetails = getDigitalDataForMyAccount(MY_ACCOUNT_ALERTS);
    window.digitalData = Object.assign(window.digitalData, myAccountDetails);
  }
  if (type === ADOBE_MY_ACCOUNT_USEFUL_LINKS) {
    let myAccountDetails = getDigitalDataForMyAccount(MY_ACCOUNT_USEFUL_LINKS);
    window.digitalData = Object.assign(window.digitalData, myAccountDetails);
  }
  if (type === ADOBE_MY_ACCOUNT_COUPONS) {
    let myAccountDetails = getDigitalDataForMyAccount(MY_ACCOUNT_COUPONS);
    window.digitalData = Object.assign(window.digitalData, myAccountDetails);
  }
  if (type === ADOBE_MY_ACCOUNT_GIFT_CARD) {
    let myAccountDetails = getDigitalDataForMyAccount(MY_ACCOUNT_GIFT_CARD);
    window.digitalData = Object.assign(window.digitalData, myAccountDetails);
  }
  if (type === ADOBE_MY_ACCOUNT_CLIQ_CASH) {
    let myAccountDetails = getDigitalDataForMyAccount(MY_ACCOUNT_CLIQ_CASH);
    window.digitalData = Object.assign(window.digitalData, myAccountDetails);
  }
  if (type === AODBE_MY_ACCOUNT_SETTINGS) {
    let myAccountDetails = getDigitalDataForMyAccount(MY_ACCOUNT_SETTING);
    window.digitalData = Object.assign(window.digitalData, myAccountDetails);
  }
  if (type === AODBE_MY_ACCOUNT_REVIEW) {
    let myAccountDetails = getDigitalDataForMyAccount(MY_ACCOUNT_REVIEW);
    window.digitalData = Object.assign(window.digitalData, myAccountDetails);
  }
  if (type === ADOBE_MY_ACCOUNT_ORDER_DETAILS) {
    let myAccountDetails = getDigitalDataForMyAccount(MY_ACCOUNT_ORDER_DETAIL);
    window.digitalData = Object.assign(window.digitalData, myAccountDetails);
  }
  if (type === ADOBE_BLP_PAGE_LOAD) {
    let digitalDataForBrandPage = getDigitalDataForBLP(BRAND_PAGE, response);
    window.digitalData = Object.assign(
      window.digitalData,
      digitalDataForBrandPage
    );
    if (window._satellite) {
      window._satellite.track(ADOBE_BLP_DIRECT_CALL);
    }
  }
  if (type === ADOBE_CLP_PAGE_LOAD) {
    let digitalDataForCategoryPage = getDigitalDataForCLP(response);
    window.digitalData = Object.assign(
      window.digitalData,
      digitalDataForCategoryPage
    );
    if (window._satellite) {
      window._satellite.track(ADOBE_CLP_DIRECT_CALL);
    }
  }
  if (type === ADOBE_REVIEW_STAR_RATING) {
    if (window._satellite) {
      window._satellite.track(REVIEW_STAR_RATING);
    }
  }
  if (
    type === ADOBE_DEFAULT_BLP_PAGE_LOAD ||
    type === ADOBE_DEFAULT_CLP_PAGE_LOAD
  ) {
    let digitalDataForBlpOrClp = getDigitalDataForDefaultBlpOrClp(response);
    window.digitalData = Object.assign(
      window.digitalData,
      digitalDataForBlpOrClp
    );
  }
  if (type === ADOBE_LOGIN_AND_SIGN_UP_PAGE) {
    let digitalDataForLogin = getDigitalDataForLoginAndSignup(response);
    window.digitalData = Object.assign(window.digitalData, digitalDataForLogin);
  }
  if (type === ADOBE_STATIC_PAGE) {
    let digitalDataForStaticData = getDigitalDataForStatic(response);
    window.digitalData = Object.assign(
      window.digitalData,
      digitalDataForStaticData
    );
  }
  if (type === ADOBE_HELP) {
    const data = window.digitalData;
    if (data && data.page) {
      Object.assign(data.page, {
        pageInfo: {
          pageName: window.location.pathname.replace(/\//g, "")
        }
      });
    } else {
      Object.assign(data, {
        page: {
          pageInfo: {
            pageName: window.location.pathname.replace(/\//g, "")
          }
        }
      });
    }
    window.digitalData = data;
  }

  if (icidType === ICID2) {
    let data = window.digitalData;
    data.flag = INTERNAL_CAMPAIGN;
    data.internal = {
      campaign: {
        id: icid
      }
    };
    window.digitalData = data;
    if (window._satellite) {
      window._satellite.track(INTERNAL_CAMPAIGN_TRACK);
    }
  } else if (icidType === CID) {
    let data = window.digitalData;
    data.external = {
      campaign: {
        id: icid
      }
    };
    data.flag = EXTERNAL_CAMPAIGN;
    window.digitalData = data;
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
    window.digitalData &&
    window.digitalData.page &&
    window.digitalData.page.pageInfo &&
    window.digitalData.page.pageInfo.pageName
  ) {
    const currentDigitalData = window.digitalData;
    if (currentDigitalData.cpj) {
      if (currentDigitalData.cpj.pdp) {
        Object.assign(currentDigitalData.cpj.pdp, {
          findingMethod: window.digitalData.page.pageInfo.pageName
        });
      } else {
        Object.assign(currentDigitalData.cpj, {
          pdp: {
            findingMethod: window.digitalData.page.pageInfo.pageName
          }
        });
      }
    } else {
      Object.assign(currentDigitalData, {
        cpj: {
          pdp: {
            findingMethod: window.digitalData.page.pageInfo.pageName
          }
        }
      });
    }
    window.digitalData = Object.assign(window.digitalData, currentDigitalData);
  }

  if (type === ADOBE_VIRTUAL_PAGELOAD) {
    if (window._satellite) {
      window._satellite.track(ADOBE_SATELLITE_CODE);
    }
  }

  //return flow
  if (type === ADOBE_ORDER_DETAILS_LINK_CLICKED) {
    if (window._satellite) {
      window._satellite.track(ORDER_DETAILS_LINK_CLICKED);
    }
  }
  if (type === ADOBE_ITEM_DETAILS_LINK_CLICKED) {
    if (window._satellite) {
      window._satellite.track(ITEM_DETAILS_LINK_CLICKED);
    }
  }
  if (type === ADOBE_RETURN_LINK_CLICKED) {
    if (window._satellite) {
      window._satellite.track(RETURN_LINK_CLICKED);
    }
  }
  if (type === ADOBE_REQUEST_INVOICE_LINK_CLICKED) {
    if (window._satellite) {
      window._satellite.track(REQUEST_INVOICE_LINK_CLICKED);
    }
  }
  if (type === ADOBE_HELP_SUPPORT_LINK_CLICKED) {
    if (window._satellite) {
      window._satellite.track(HELP_SUPPORT_LINK_CLICKED);
    }
  }
  if (type === ADOBE_MY_ACCOUNT_HELP_AND_SUPPORT) {
    if (window._satellite) {
      window._satellite.track(MY_ACCOUNT_HELP_AND_SUPPORT);
    }
  }
  if (type === ADOBE_RETURN_REASON_BUTTON_CLICKED) {
    if (window._satellite) {
      window._satellite.track(RETURN_REASON_BUTTON_CLICKED);
    }
  }
  if (type === ADOBE_RETURN_JOURNEY_INITIATED) {
    if (window._satellite) {
      window._satellite.track(RETURN_JOURNEY_INITIATED);
    }
  }

  //refund flow
  if (type === ADOBE_REFUNDSUMMARY_ORDERDETAILS_BUTTON_CLICKED) {
    if (window._satellite) {
      window._satellite.track(REFUNDSUMMARY_ORDERDETAILS_BUTTON_CLICKED);
    }
  }
  if (type === ADOBE_REFUNDSUMMARY_CONTINUESHOPPING_BUTTON_CLICKED) {
    if (window._satellite) {
      window._satellite.track(REFUNDSUMMARY_CONTINUESHOPPING_BUTTON_CLICKED);
    }
  }
  if (type === ADOBE_REFUNDSUMMARY_PAGE_LANDED) {
    if (window._satellite) {
      window._satellite.track(REFUNDSUMMARY_PAGE_LANDED);
    }
  }
  if (type === ADOBE_ADD_BANKDETAILS_BUTTON_CLICKED) {
    if (window._satellite) {
      window._satellite.track(ADD_BANKDETAILS_BUTTON_CLICKED);
    }
  }
  if (type === ADOBE_CHANGE_PICKUPADDRESS_LINK_CLICKED) {
    if (window._satellite) {
      window._satellite.track(CHANGE_PICKUPADDRESS_LINK_CLICKED);
    }
  }
  if (type === ADOBE_SAVE_BANKDETAILS_BUTTON_CLICKED) {
    if (window._satellite) {
      window._satellite.track(SAVE_BANKDETAILS_BUTTON_CLICKED);
    }
  }
  if (type === ADOBE_SHOW_REFUND_BUTTON_CLICKED) {
    if (window._satellite) {
      window._satellite.track(SHOW_REFUND_BUTTON_CLICKED);
    }
  }
  if (type === ADOBE_MODE_OF_REFUND_SUBMITTED) {
    Object.assign(window.digitalData, {
      modeOfRefund: apiResponse
    });
    //window.digitalData.modeOfRefund = apiResponse;
    if (window._satellite) {
      window._satellite.track(MODE_OF_REFUND_SUBMITTED);
    }
  }
  if (type === ADOBE_MODE_OF_RETURN_SUBMITTED) {
    Object.assign(window.digitalData, {
      modeOfRefund: apiResponse.modeOfReturn,
      refundAddressPincode: apiResponse.refundAddressPincode
    });
    // window.digitalData.modeOfReturn = apiResponse.modeOfReturn;
    // window.digitalData.refundAddressPincode =
    //   apiResponse.refundAddressPincode;
    if (window._satellite) {
      window._satellite.track(MODE_OF_RETURN_SUBMITTED);
    }
  }

  if (type === SET_DATA_LAYER_VERIFY_BUTTON_UPI) {
    if (window._satellite) {
      window._satellite.track(UPI_VERIFY_CLICK);
      Object.assign(window.digitalData, {
        upi: {
          status: response
        }
      });
    }
  }

  if (type === SET_DATA_LAYER_UID_SELECTION) {
    if (window._satellite) {
      window._satellite.track(UID_SELECTION);
      Object.assign(window.digitalData, {
        upi: {
          status: response
        }
      });
    }
  }
  if (type === SET_DATA_LAYER_UID_REMOVE) {
    if (window._satellite) {
      window._satellite.track(TRACK_UID_REMOVE);
    }
  }
  if (type === SET_DATA_LAYER_UID_ADD) {
    if (window._satellite) {
      window._satellite.track(TRACK_UID_ADD);
    }
  }

  if (type === SET_DATA_LAYER_UID_SAVE) {
    if (window._satellite) {
      window._satellite.track(TRACK_UID_SAVE);
      Object.assign(window.digitalData, {
        upi: {
          status: response
        }
      });
    }
  }

  if (type === ADOBE_HOME_TYPE) {
    let newVariable = getDigitalDataForHome(response);
    window.digitalData = Object.assign(window.digitalData, newVariable);
  }
  if (type === ADOBE_PDP_KNOW_MORE_CLICK) {
    if (window._satellite) {
      window._satellite.track(PDP_KNOW_MORE_CLICK);
    }
  }

  // mobile device exchnage

  if (type === ADOBE_MDE_CLICK_ON_EXCHANGE_AVAILABLE_FILTER) {
    if (window._satellite) {
      window._satellite.track(ADOBE_CLICK_ON_EXCHANGE_AVAILABLE_FILTER);
    }
  }
  if (type === ADOBE_CLICK_ON_PRODUCTS_PLP_WITH_EXCHANGE) {
    window.digitalData.cpj.product = { id: apiResponse };
    if (window._satellite) {
      window._satellite.track(
        ADOBE_FOR_CLICK_ON_PRODUCT_ON_PLP_MOBILE_EXCHANGE
      );
    }
  }
  if (type === ADOBE_CLICK_ON_PRODUCTS_PLP_WITHOUT_EXCHANGE) {
    window.digitalData.cpj.product = { id: apiResponse };
    if (window._satellite) {
      window._satellite.track(
        ADOBE_FOR_CLICK_ON_PRODUCT_ON_PLP_WITHOUT_MOBILE_EXCHANGE
      );
    }
  }
  if (type === ADOBE_MDE_CLICK_ON_EXCHANGE_LINK) {
    window.digitalData.cpj.product = { id: apiResponse };
    if (window._satellite) {
      window._satellite.track(ADOBE_CLICK_ON_EXCHANGE_LINK);
    }
  }
  if (type === ADOBE_MDE_CLICK_ON_CHANGE_DEVICE) {
    if (window._satellite) {
      window._satellite.track(ADOBE_CLICK_ON_CHANGE_DEVICE);
    }
  }
  if (type === ADOBE_MDE_CLICK_ON_HOW_EXCHANGE_WORKS) {
    if (window._satellite) {
      window._satellite.track(ADOBE_CLICK_ON_HOW_EXCHANGE_WORKS);
    }
  }
  if (type === ADOBE_MDE_PRODUCT_ALREADY_IN_CART) {
    if (window._satellite) {
      window._satellite.track(ADOBE_PRODUCT_ALREADY_IN_CART);
    }
  }
  if (type === ADOBE_MDE_PRODUCT_ALREADY_IN_CART_GO_TO_BAG) {
    if (window._satellite) {
      window._satellite.track(ADOBE_PRODUCT_ALREADY_IN_CART_GO_TO_BAG);
    }
  }
  if (type === ADOBE_MDE_PRODUCT_ALREADY_IN_CART_CANCEL) {
    if (window._satellite) {
      window._satellite.track(ADOBE_PRODUCT_ALREADY_IN_CART_CANCEL);
    }
  }
  if (type === ADOBE_MDE_CLICK_ON_EXCHANGE_LINK_THROUGH_SELLER) {
    if (window._satellite) {
      window._satellite.track(ADOBE_CLICK_ON_EXCHANGE_LINK_THROUGH_SELLER);
    }
  }
  if (type === ADOBE_MDE_CLICK_ON_EXCHANGE_MODAL_KNOW_MORE) {
    if (window._satellite) {
      window._satellite.track(ADOBE_CLICK_ON_EXCHANGE_MODAL_KNOW_MORE);
    }
  }
  if (type === ADOBE_MDE_CLICK_ON_EXCHANGE_MODAL_TNC) {
    if (window._satellite) {
      window._satellite.track(ADOBE_CLICK_ON_EXCHANGE_MODAL_TNC);
    }
  }
  if (type === ADOBE_MDE_CLICK_ON_EXCHANGE_MODAL_ADD_ANOTHER_DEVICE) {
    if (window._satellite) {
      window._satellite.track(ADOBE_CLICK_ON_EXCHANGE_MODAL_ADD_ANOTHER_DEVICE);
    }
  }
  if (type === ADOBE_MDE_CLICK_ON_PROCEED_WITH_EXCHANGE) {
    if (window._satellite) {
      window._satellite.track(ADOBE_CLICK_ON_PROCEED_WITH_EXCHANGE);
    }
  }
  if (type === ADOBE_MDE_CLICK_ON_CASHBACK_DETAILS) {
    if (window._satellite) {
      window._satellite.track(ADOBE_CLICK_ON_CASHBACK_DETAILS);
    }
  }
  if (type === ADOBE_MDE_CLICK_ON_VERIFY_IMEI) {
    window.digitalData.exchange = { imei: { status: apiResponse } };
    if (window._satellite) {
      window._satellite.track(ADOBE_CLICK_ON_VERIFY_IMEI);
    }
  }
  if (type === ADOBE_MDE_CLICK_ON_REMOVE_EXCHANGE) {
    if (window._satellite) {
      window._satellite.track(ADOBE_CLICK_ON_REMOVE_EXCHANGE);
    }
  }
  if (type === ADOBE_MDE_CLICK_ON_GET_NEW_PRICE) {
    if (window._satellite) {
      window._satellite.track(ADOBE_CLICK_ON_GET_NEW_PRICE);
    }
  }
  if (type === ADOBE_MDE_CLICK_ON_CART_VIEW_MORE) {
    if (window._satellite) {
      window._satellite.track(ADOBE_CLICK_ON_CART_VIEW_MORE);
    }
  }
  if (type === ADOBE_MDE_CLICK_ON_CART_VIEW_LESS) {
    if (window._satellite) {
      window._satellite.track(ADOBE_CLICK_ON_CART_VIEW_LESS);
    }
  }
  if (type === ADOBE_MDE_CLICK_ON_CART_TNC) {
    if (window._satellite) {
      window._satellite.track(ADOBE_CLICK_ON_CART_TNC);
    }
  }
  if (type === ADOBE_MDE_CLICK_ON_SAVE_TO_WISHLIST) {
    if (window._satellite) {
      window._satellite.track(ADOBE_CLICK_ON_SAVE_TO_WISHLIST);
    }
  }
  if (type === ADOBE_MDE_CLICK_ON_CHECKOUT_BTN_CART_WITH_EXCHANGE) {
    if (window._satellite) {
      window._satellite.track(ADOBE_CLICK_ON_CHECKOUT_BTN_CART_WITH_EXCHANGE);
    }
  }
  if (type === ADOBE_MDE_CLICK_ON_CLIQCASH_CHECKOUT_WITH_EXCHANGE) {
    if (window._satellite) {
      window._satellite.track(ADOBE_CLICK_ON_CLIQCASH_CHECKOUT_WITH_EXCHANGE);
    }
  }
  if (type === ADOBE_MDE_CLICK_ON_CANCEL_WITH_EXCHANGE) {
    if (window._satellite) {
      window._satellite.track(ADOBE_CLICK_ON_CANCEL_WITH_EXCHANGE);
    }
  }
  if (type === ADOBE_MDE_CLICK_ON_RETURN_WITH_EXCHANGE) {
    if (window._satellite) {
      window._satellite.track(ADOBE_CLICK_ON_RETURN_WITH_EXCHANGE);
    }
  }
  if (type === ADOBE_MDE_CLICK_ON_CHANGE_ACCOUNT_EXCHANGE) {
    if (window._satellite) {
      window._satellite.track(ADOBE_CLICK_ON_CHANGE_ACCOUNT_EXCHANGE);
    }
  }
  if (type === ADOBE_MDE_CASHBACK_MODE_CLIQCASH_EXCHANGE) {
    if (window._satellite) {
      window._satellite.track(ADOBE_CASHBACK_MODE_CLIQCASH_EXCHANGE);
    }
  }
  if (type === ADOBE_MDE_CASHBACK_MODE_BANK_ACCOUNT_EXCHANGE) {
    if (window._satellite) {
      window._satellite.track(ADOBE_CASHBACK_MODE_BANK_ACCOUNT_EXCHANGE);
    }
  }
  // for product bundling
  if (type === ADOBE_PB_ADD_BUNDLED_PRODUCTS_TO_CART_FROM_PDP) {
    let data = window.digitalData;
    if (data && data.cpj && data.cpj.product && apiResponse) {
      data.cpj.product.category = apiResponse.productCategories;
      data.cpj.product.id = apiResponse.productIds;
      data.cpj.product.price = apiResponse.productPrices;
      window.digitalData = data;
    }
    if (window._satellite) {
      window._satellite.track(ADOBE_ADD_BUNDLED_PRODUCTS_TO_CART_FROM_PDP);
    }
  }
  if (type === ADOBE_PB_ADD_BUNDLED_PRODUCTS_TO_CART_FROM_CART) {
    let data = window.digitalData;
    if (data && data.cpj && data.cpj.product && apiResponse) {
      data.cpj.product.category = apiResponse.productCategory;
      data.cpj.product.id = apiResponse.productId;
      data.cpj.product.price = apiResponse.productPrice;
      window.digitalData = data;
    }
    if (window._satellite) {
      window._satellite.track(ADOBE_ADD_BUNDLED_PRODUCTS_TO_CART_FROM_CART);
    }
  }
  if (type === ADOBE_PB_REMOVE_BUNDLED_PRODUCT_FROM_CART) {
    let data = window.digitalData;
    if (data && data.cpj && data.cpj.product && apiResponse) {
      data.cpj.product.category = apiResponse.productCategory;
      data.cpj.product.id = apiResponse.productId;
      window.digitalData = data;
    }
    if (window._satellite) {
      window._satellite.track(ADOBE_REMOVE_BUNDLED_PRODUCT_FROM_CART);
    }
  }
  if (type === ADOBE_TRACK_APPLIANCES_EXCHANGE_JOURNEY) {
    Object.assign(window.digitalData, {
      journey: {
        name: MDE
      }
    });
  }
  if (type === ADOBE_TRACK_APPLIANCES_EXCHANGE_AC_JOURNEY) {
    if (apiResponse) {
      Object.assign(window.digitalData, {
        journey: {
          name: apiResponse
        }
      });
    }
  }
}

export function getDigitalDataForPdp(type, pdpResponse, behaviorOfPage) {
  let userDetails = getCookie(constants.LOGGED_IN_USER_DETAILS);
  if (userDetails) {
    userDetails = JSON.parse(userDetails);
    Object.assign(window.digitalData, {
      account: {
        login: {
          customerID: userDetails.customerId,
          type: userDetails.loginType
        }
      }
    });
  }
  const selectedColour =
    pdpResponse &&
    pdpResponse.variantOptions &&
    pdpResponse.variantOptions.filter(val => {
      return val.colorlink.selected;
    })[0].colorlink.color;
  let seasonData = {};
  if (pdpResponse && pdpResponse.seasonDetails !== undefined) {
    seasonData = pdpResponse.seasonDetails.find(item => {
      return item.key === "Season";
    });
  }
  let productTag =
    pdpResponse && pdpResponse.allOOStock === true
      ? "Out of Stock"
      : pdpResponse && pdpResponse.isProductNew === "Y"
      ? "New"
      : seasonData && seasonData.key === "Season"
      ? seasonData.value
      : pdpResponse.isOnlineExclusive === "Y"
      ? "New"
      : pdpResponse.isExchangeAvailable === true &&
        pdpResponse.showExchangeTag === true
      ? "Exchange Offer"
      : pdpResponse && pdpResponse.discount && pdpResponse.discount !== "0"
      ? `${parseInt(pdpResponse.discount, 10)}% off`
      : pdpResponse &&
        pdpResponse.isOfferExisting &&
        pdpResponse.isOfferExisting == "Y"
      ? "On Offer"
      : "";
  let productCategoryId = pdpResponse && pdpResponse.categoryHierarchy;
  let APlusTamplete =
    pdpResponse &&
    pdpResponse.APlusContent &&
    pdpResponse.APlusContent.temlateName;
  const date = new Date(),
    dateFormat =
      date &&
      [date.getDate(), date.getMonth() + 1, date.getFullYear()].join("/") +
        " " +
        [date.getHours(), date.getMinutes()].join(":");
  let data = {
    cpj: {
      product: {
        id: pdpResponse ? pdpResponse.productListingId : "",
        category: pdpResponse ? pdpResponse.rootCategory : "",
        category_id:
          productCategoryId && productCategoryId[productCategoryId.length - 1],
        colour: selectedColour ? selectedColour : "",
        tag: productTag ? productTag : ""
      },
      brand: {
        name: pdpResponse ? pdpResponse.brandName : ""
      }
    },

    page: {
      ...window.digitalData.page,
      category: {
        primaryCategory: "product"
      }
    },
    video: APlusTamplete ? APlusTamplete : "",
    CTSource: "Desktop",
    Date: dateFormat
  };
  if (window.digitalData && window.digitalData.account) {
    Object.assign(data, {
      account: window.digitalData.account
    });
  }
  const subCategories = getSubCategories(pdpResponse);
  if (subCategories) {
    if (data.page && data.page.category) {
      Object.assign(data.page.category, { ...subCategories });
    } else {
      Object.assign(data.page, {
        category: { ...subCategories }
      });
    }
  }

  const productBreadcrumbs = getProductBreadCrumbs(pdpResponse);
  if (productBreadcrumbs) {
    if (behaviorOfPage === IS_COMING_FOR_REVIEW_PAGE) {
      if (data.page) {
        Object.assign(data.page, {
          pageInfo: {
            pageName: "product review:".concat(
              productBreadcrumbs ? productBreadcrumbs : ""
            )
          }
        });
      } else {
        Object.assign(data, {
          page: {
            pageInfo: {
              pageName: "product review:".concat(
                productBreadcrumbs ? productBreadcrumbs : ""
              )
            }
          }
        });
      }
    } else {
      if (data.page) {
        Object.assign(data.page, {
          pageInfo: {
            pageName: "product details:".concat(
              productBreadcrumbs ? productBreadcrumbs : ""
            ),
            pageType: "PDP"
          }
        });
      } else {
        Object.assign(data, {
          page: {
            pageInfo: {
              pageName: "product details:".concat(
                productBreadcrumbs ? productBreadcrumbs : ""
              ),
              pageType: "PDP"
            }
          }
        });
      }
    }
  }
  const displayHierarchy = getDisplayHierarchy(pdpResponse);
  if (data.page) {
    Object.assign(data.page, {
      display: {
        hierarchy: displayHierarchy
      }
    });
  } else {
    Object.assign(data, {
      page: {
        display: {
          hierarchy: displayHierarchy
        }
      }
    });
  }
  if (pdpResponse && pdpResponse.mrpPrice && pdpResponse.mrpPrice.doubleValue) {
    Object.assign(data.cpj.product, {
      price:
        pdpResponse &&
        pdpResponse.winningSellerPrice &&
        pdpResponse.winningSellerPrice.doubleValue
          ? pdpResponse.winningSellerPrice.doubleValue
          : pdpResponse.mrpPrice.doubleValue
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
  Object.assign(window.digitalData, data);
  return data;
}

async function getDigitalDataForHome() {
  let userDetails = getCookie(constants.LOGGED_IN_USER_DETAILS);
  const mcvId = await getMcvId();
  if (userDetails) {
    userDetails = JSON.parse(userDetails);
  }
  const previousDigitalData = cloneDeep(window.digitalData);
  let data = {};
  if (!userDetails) {
    data = {
      page: {
        category: {
          primaryCategory: "home"
        },
        pageInfo: {
          pageName: "homepage",
          pageType: "Homepage"
        }
      },
      account: {
        mvcId: mcvId,
        login: {
          customerID: "anonymous"
        }
      }
    };
  }
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
  localStorage.setItem("loginType", JSON.stringify(data.account));
  window.digitalData = Object.assign(previousDigitalData, data);
  return window.digitalData;
}

export function setDataLayerForRetryPaymentAccountSection(
  cartResponse,
  retryData
) {
  let data = { ...window.digitalData };
  let userDetails = getCookie(constants.LOGGED_IN_USER_DETAILS);
  if (userDetails) {
    userDetails = JSON.parse(userDetails);
    Object.assign(data, {
      account: {
        login: {
          customerID: userDetails.customerId,
          type: userDetails.loginType
        }
      },
      page: {
        category: {
          primaryCategory: "multistepcheckoutsummary"
        },
        pageInfo: {
          pageName: "multi checkout summary page",
          pageType: "Checkout"
        }
      }
    });
  }
  if (cartResponse && cartResponse.length > 0) {
    let productIdsArray = [],
      productQuantityArray = [],
      productPriceArray = [],
      productBrandArray = [],
      categoryArray = [],
      subCategory1 = [],
      subCategory2 = [],
      subCategory3 = [];
    cartResponse.forEach(function(product, index) {
      if (
        retryData &&
        product.productListingId === retryData[index].productcode
      ) {
        let totalPrice = parseInt(retryData[index].price);
        let originalPrice =
          product.winningSellerPrice && product.winningSellerPrice.doubleValue
            ? product.winningSellerPrice.doubleValue
            : product.mrpPrice && product.mrpPrice.doubleValue
            ? product.mrpPrice.doubleValue
            : null;
        let quantity =
          totalPrice > originalPrice ? totalPrice / originalPrice : 1;
        productQuantityArray.push(quantity);
        productPriceArray.push(
          totalPrice
            ? totalPrice
            : product.mrpPrice && product.mrpPrice.doubleValue
            ? product.mrpPrice.doubleValue
            : null
        );
      } else {
        productPriceArray.push(
          product.winningSellerPrice && product.winningSellerPrice.doubleValue
            ? product.winningSellerPrice.doubleValue
            : product.mrpPrice && product.mrpPrice.doubleValue
            ? product.mrpPrice.doubleValue
            : null
        );
        productQuantityArray.push(1);
      }
      productIdsArray.push(
        product.productListingId && product.productListingId.toLowerCase()
      );
      productBrandArray.push(
        product.brandName && product.brandName.replace(/ /g, "_").toLowerCase()
      );
      product &&
        product.rootCategory &&
        categoryArray.push(product.rootCategory);
      if (
        product.categoryHierarchy &&
        Array.isArray(product.categoryHierarchy)
      ) {
        subCategory1.push(
          product.categoryHierarchy[0].category_name
            ? product.categoryHierarchy[0].category_name
                .replace(/\s+/g, "_")
                .toLowerCase()
            : null
        );
        subCategory2.push(
          product.categoryHierarchy[1].category_name
            ? product.categoryHierarchy[1].category_name
                .replace(/\s+/g, "_")
                .toLowerCase()
            : null
        );
        subCategory3.push(
          product.categoryHierarchy[2].category_name
            ? product.categoryHierarchy[2].category_name
                .replace(/\s+/g, "_")
                .toLowerCase()
            : null
        );
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
        //totalAmount: totalAmount,
        brand: {
          name: productBrandArray
        }
      }
    });
    Object.assign(data && data.page && data.page.category, {
      subCategory1: subCategory1,
      subCategory2: subCategory2,
      subCategory3: subCategory3
    });
  }
  Object.assign(window.digitalData, data);
}
function getDigitalDataForCart(type, cartResponse) {
  let userDetails = getCookie(constants.LOGGED_IN_USER_DETAILS);
  if (userDetails) {
    userDetails = JSON.parse(userDetails);
    Object.assign(window.digitalData, {
      account: {
        login: {
          customerID: userDetails.customerId,
          type: userDetails.loginType
        }
      }
    });
  }
  const date = new Date(),
    dateFormat =
      date &&
      [date.getDate(), date.getMonth() + 1, date.getFullYear()].join("/") +
        " " +
        [date.getHours(), date.getMinutes()].join(":");
  let data = {
    page: {
      category: {
        primaryCategory: "cart"
      },
      pageInfo: {
        pageName: "Cart Page",
        pageType: "Cart Page"
      }
    },
    CTSource: "Desktop",
    Date: dateFormat
  };
  if (window.digitalData && window.digitalData.account) {
    Object.assign(data, {
      account: window.digitalData.account
    });
  }
  const getProductData = getProductsDigitalData(cartResponse);
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
    if (data.page && data.page.category) {
      Object.assign(data.page.category, categoryHierarchy);
    } else {
      Object.assign(data.page, {
        category: categoryHierarchy
      });
    }
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
        pageName: "multi checkout summary page",
        pageType: "Checkout"
      }
    }
  };
  let userDetails = getCookie(constants.LOGGED_IN_USER_DETAILS);
  if (userDetails) {
    userDetails = JSON.parse(userDetails);
    Object.assign(data, {
      account: {
        login: {
          customerID: userDetails.customerId,
          type: userDetails.loginType
        }
      }
    });
  }
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
    if (data.page && data.page.category) {
      Object.assign(data.page.category, categoryHierarchy);
    } else {
      Object.assign(data.page, {
        category: categoryHierarchy
      });
    }
  }
  return data;
}

function getDigitalDataForOrderConfirmation(type, response) {
  let orderData = localStorage.getItem(
    constants.DIGITAL_DATA_FOR_PAYMENT_CONFIRMATION
  );
  if (orderData && orderData !== "undefined") {
    Object.assign(window.digitalData, JSON.parse(orderData));
  }
  let userDetails = getCookie(constants.LOGGED_IN_USER_DETAILS);
  if (userDetails) {
    userDetails = JSON.parse(userDetails);
    Object.assign(window.digitalData, {
      account: {
        login: {
          customerID: userDetails.customerId,
          type: userDetails.loginType
        }
      }
    });
  }
  let data = window.digitalData;
  if (data && data.page && data.page.pageInfo) {
    Object.assign(data.page.pageInfo, {
      pageName: "order confirmation",
      pageType: "Order Successfull"
    });
  }
  if (data && data.page && data.page.category) {
    Object.assign(data.page.category, {
      primaryCategory: "orderconfirmation",
      subCategory1:
        window.digitalData.page &&
        window.digitalData.page.category &&
        window.digitalData.page.category.subCategory1,
      subCategory2:
        window.digitalData.page &&
        window.digitalData.page.category &&
        window.digitalData.page.category.subCategory2,
      subCategory3:
        window.digitalData.page &&
        window.digitalData.page.category &&
        window.digitalData.page.category.subCategory3
    });
  }

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
          id: productIdsArray
            ? productIdsArray
            : window.digitalData &&
              window.digitalData.cpj &&
              window.digitalData.cpj.product &&
              window.digitalData.cpj.product.id,
          quantity: productQuantityArray
            ? productQuantityArray
            : window.digitalData &&
              window.digitalData.cpj &&
              window.digitalData.cpj.product &&
              window.digitalData.cpj.product.quantity,
          price: productPriceArray
            ? productPriceArray
            : window.digitalData &&
              window.digitalData.cpj &&
              window.digitalData.cpj.product &&
              window.digitalData.cpj.product.price,
          category: categoryArray
            ? categoryArray
            : window.digitalData &&
              window.digitalData.cpj &&
              window.digitalData.cpj.product &&
              window.digitalData.cpj.product.category
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
    if (data.page && data.page.category) {
      Object.assign(data.page.category, categoryHierarchy);
    } else {
      Object.assign(data.page, {
        category: categoryHierarchy
      });
    }
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
            : 1,
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
        if (reverseArrayLength) {
          categoryArray.push(
            product.productName === "Gift Card"
              ? "Gift card"
              : product.categoryHierarchy &&
                  product.categoryHierarchy[currentReverseArray] &&
                  product.categoryHierarchy[currentReverseArray]
                    .category_name &&
                  product.categoryHierarchy[currentReverseArray].category_name
                    .replace(/ /g, "_")
                    .toLowerCase()
          );
        } else if (product.rootCategory) {
          categoryArray.push(product.rootCategory);
        }
      } else if (!type || !type.isReverse) {
        if (product.categoryHierarchy) {
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
        } else if (product.rootCategory) {
          categoryArray.push(product.rootCategory);
        }
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
export function getDeliveryModeForMyAccountReturn(type, apiResponse) {
  const response = cloneDeep(apiResponse);
  if (type === "ADOBE_MYACCOUNT_DELIVERYMODE_CHANGE_INITIATE") {
    if (window._satellite) {
      window._satellite.track(MYACCOUNT_DELIVERYMODE_CHANGE_INITIATE);
    }
  }
  if (type === "ADOBE_MYACCOUNT_DELIVERYMODE_CHANGE_SUCCESS") {
    if (window._satellite) {
      window._satellite.track(MYACCOUNT_DELIVERYMODE_CHANGE_SUCCESS);
    }
  }
}
export function setDataLayerForPdpDirectCalls(type, layerData: null, response) {
  const previousDigitalData = cloneDeep(window.digitalData);
  if (response) {
    Object.assign(
      previousDigitalData &&
        previousDigitalData.cpj &&
        previousDigitalData.cpj.product,
      {
        size: response
      }
    );
  }
  window.digitalData = previousDigitalData;
  let data = window.digitalData;
  if (type === SET_DATA_LAYER_FOR_ADD_TO_BAG_EVENT) {
    if (window._satellite) {
      window._satellite.track(ADOBE_ADD_TO_CART);
    }
  }
  if (type === ADOBE_SUMSUNG_CHAT_ICON) {
    if (window._satellite) {
      window._satellite.track(SUMSUNG_CHAT_ICON);
    }
  }
  if (type === ADOBE_SUMSUNG_CHAT_LINK_CLICK) {
    if (window._satellite) {
      window._satellite.track(SUMSUNG_CHAT_LINK_CLICK);
    }
  }
  if (type === SET_DATA_LAYER_FOR_ADOBE_ADD_TO_CART_BUTTON) {
    if (window._satellite) {
      window._satellite.track(ADOBE_ADD_TO_CART_BUTTON);
    }
  }

  if (type === SET_DATA_LAYER_FOR_SIZE_GUIDE) {
    if (window._satellite) {
      window._satellite.track(ADOBE_DIRECT_CALL_FOR_SIZE_GUIDE);
    }
  }
  if (type === SET_DATA_LAYER_FOR_BUY_NOW_EVENT) {
    if (window._satellite) {
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
    window.digitalData = Object.assign(previousDigitalData, data);
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
  let userDetails = getCookie(constants.LOGGED_IN_USER_DETAILS);
  if (userDetails) {
    userDetails = JSON.parse(userDetails);
    Object.assign(window.digitalData, {
      account: {
        login: {
          customerID: userDetails.customerId,
          type: userDetails.loginType
        }
      }
    });
  }
  if (window.digitalData && window.digitalData.account) {
    Object.assign(data, {
      account: window.digitalData.account
    });
  }
  if (type === ADOBE_REMOVE_ITEM) {
    const getProductData = getProductsDigitalData(response);
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

    if (window._satellite) {
      window._satellite.track(ADOBE_DIRECT_CALL_ON_CART_FOR_REMOVE_TRIGGER);
    }
  }
  if (type === ADOBE_CALLS_FOR_ON_CLICK_CHECKOUT) {
    Object.assign(data.page, {
      pageInfo: { pageName: "multi checkout summary page" }
    });

    if (window._satellite) {
      window._satellite.track(ADOBE_DIRECT_CALL_ON_CLICK_CHECKOUT);
    }
  }
  if (type === ADOBE_CALLS_FOR_CHANGE_QUANTITY) {
    if (window._satellite) {
      window._satellite.track(ADOBE_DIRECT_CALL_FOR_CHANGE_QUANTITY_ON_CART);
    }
  }
  if (type === ADOBE_CALLS_FOR_APPLY_COUPON_SUCCESS) {
    Object.assign(data.cpj, {
      coupon: { code: response }
    });

    if (window._satellite) {
      window._satellite.track(ADOBE_CHECKOUT_APPLY_COUPON_SUCCESS);
    }
  }
  if (type === ADOBE_CALLS_FOR_APPLY_COUPON_FAIL) {
    Object.assign(data.cpj, {
      coupon: { code: response }
    });

    if (window._satellite) {
      window._satellite.track(ADOBE_CHECKOUT_APPLY_COUPON_FAILURE);
    }
  }
  if (type === ADOBE_DIRECT_CALL_FOR_SAVE_ITEM_ON_CART) {
    if (window._satellite) {
      window._satellite.track(ADOBE_DIRECT_CALL_FOR_SAVE_PORDUCT_ON_CART);
    }
  }
  if (type === ADOBE_DIRECT_CALL_FOR_PINCODE_SUCCESS) {
    let pinCodeData = setDataLayerForPinCode(response, type);
    Object.assign(data, pinCodeData);
    if (window._satellite) {
      window._satellite.track(PINCODE_SUCCESS);
    }
  }
  if (type === ADOBE_DIRECT_CALL_FOR_PINCODE_FAILURE) {
    let pinCodeData = setDataLayerForPinCode(response, type);
    Object.assign(data, pinCodeData);
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

    if (window._satellite) {
      window._satellite.track(CART_FOOTER_LINK_CLICK);
    }
  }

  window.digitalData = data;
}
export function getDigitalDataForPlp(type, response) {
  let userDetails = getCookie(constants.LOGGED_IN_USER_DETAILS);
  if (userDetails) {
    userDetails = JSON.parse(userDetails);
    Object.assign(window.digitalData, {
      account: {
        login: {
          customerID: userDetails.customerId,
          type: userDetails.loginType
        }
      }
    });
  }
  let data = {
    page: {
      category: {
        primaryCategory: "category"
      },
      pageInfo: {
        pageName: "product grid",
        pageType: "PLP"
      }
    }
  };
  if (window.digitalData && window.digitalData.account) {
    Object.assign(data, {
      account: window.digitalData.account
    });
  }
  if (response && response.searchresult && response.searchresult.length > 0) {
    const productCodes = response.searchresult.splice(0, 9).map(product => {
      return product.productId.toLowerCase();
    });
    const impression = productCodes.join("|");
    if (data.page) {
      Object.assign(data.page, {
        products: {
          impression
        }
      });
    } else {
      Object.assign(data, {
        page: {
          products: {
            impression
          }
        }
      });
    }
  }
  const hierarchy = getDisplayHierarchy(response);
  if (hierarchy) {
    if (data.page) {
      Object.assign(data.page, {
        display: {
          hierarchy
        }
      });
    } else {
      Object.assign(data, {
        page: {
          display: {
            hierarchy
          }
        }
      });
    }
  }
  const subCategories = getSubCategories(response);
  if (subCategories) {
    // Object.assign(data.page.category, { ...subCategories });
    Object.assign(data.page, {
      pageInfo: {
        pageName: `product grid:${
          subCategories.subCategory1 ? subCategories.subCategory1 : ""
        }:${subCategories.subCategory2 ? subCategories.subCategory2 : ""}:${
          subCategories.subCategory3 ? subCategories.subCategory3 : ""
        }`,
        pageType: "PLP"
      },
      category: { ...subCategories }
    });
  } else {
    Object.assign(data.page, {
      pageInfo: {
        pageName: "product grid"
      },
      category: { ...subCategories }
    });
  }
  return data;
}
export function setDataLayerForMsdItemWidgets(response, type) {
  let digitalDataForCarousel = window.digitalData;
  if (type === ADOBE_CAROUSEL_SWIPE) {
    let dataSwipe = Object.assign(digitalDataForCarousel, response);
    window.digitalData = dataSwipe;
    if (window._satellite) {
      window._satellite.track("carouselSwipe");
    }
  }
  if (type === ADOBE_CAROUSEL_CLICK) {
    let dataClick = Object.assign(digitalDataForCarousel, response);
    window.digitalData = dataClick;
    if (window._satellite) {
      window._satellite.track("carouselClick");
    }
  }
  if (type === ADOBE_CAROUSEL_SHOW) {
    let dataShow = Object.assign(digitalDataForCarousel, response);
    window.digitalData = dataShow;
    if (window._satellite) {
      window._satellite.track("CarouselShow");
    }
  }
}
export function getDigitalDataForSearchPageSuccess(response, type) {
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
    cpj: {
      search: {
        term: response.currentQuery ? response.currentQuery.searchQuery : null,
        offersCount,
        newCount
      }
    },
    page: {
      pageInfo: { pageName: "search results page", pageType: "PLP" },
      category: { primaryCategory: "productsearch" },
      display: {
        hierarchy: `home |${
          response.currentQuery ? response.currentQuery.searchQuery : null
        }`
      }
    },
    internal: {
      search: {
        category: response.currentQuery
          ? response.currentQuery.searchQuery
          : "all",
        results:
          response && response.pagination && response.pagination.totalResults
            ? response.pagination.totalResults
            : 0,
        term: response.currentQuery ? response.currentQuery.searchQuery : null,
        offersCount,
        newCount
      }
    },
    cpj: {
      search: {
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
          : "all",
      results:
        response && response.pagination && response.pagination.totalResults,
      term:
        response &&
        response.currentQuery &&
        response.currentQuery.query &&
        response.currentQuery.query.value &&
        response.currentQuery.query.value.split(":")[0],
      offersCount: offersCount,
      newCount: newCount
    });
    Object.assign(data.cpj.search, {
      offersCount: offersCount,
      newCount: newCount
    });
  } else {
    Object.assign(data.internal.search, {
      category: "all",
      results:
        response && response.pagination && response.pagination.totalResults,
      term:
        response &&
        response.currentQuery &&
        response.currentQuery.query &&
        response.currentQuery.query.value &&
        response.currentQuery.query.value.split(":")[0],
      offersCount: offersCount,
      newCount: newCount
    });
    Object.assign(data.cpj.search, {
      offersCount: offersCount,
      newCount: newCount
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
    let searchResultObj = {
      category: response.currentQuery.query.value.split(":")[0],
      results:
        response && response.pagination && response.pagination.totalResults,
      term:
        response &&
        response.currentQuery &&
        response.currentQuery.query &&
        response.currentQuery.query.value &&
        response.currentQuery.query.value.split(":")[0],
      offersCount: offersCount,
      newCount: newCount
    };
    if (type === ADOBE_INTERNAL_SEARCH_CALL_ON_GET_PRODUCT_SP) {
      searchResultObj["searchType"] = "Search History";
      searchResultObj["searchHistory"] = {
        keyword:
          response &&
          response.currentQuery &&
          response.currentQuery.query &&
          response.currentQuery.query.value &&
          response.currentQuery.query.value.split(":")[0]
      };
    } else if (type === ADOBE_INTERNAL_SEARCH_CALL_ON_GET_PRODUCT_TRENDING) {
      searchResultObj["searchType"] = "Trending Now";
      searchResultObj["trendingNow"] = {
        keyword:
          response &&
          response.currentQuery &&
          response.currentQuery.query &&
          response.currentQuery.query.value &&
          response.currentQuery.query.value.split(":")[0]
      };
    }
    Object.assign(data.internal, {
      search: searchResultObj
    });
    Object.assign(data.cpj, {
      search: {
        offersCount: searchResultObj.offersCount,
        newCount: searchResultObj.newCount
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
        pathname: "search results page",
        pageType: "PLP"
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
        newCount: 0,
        category: {
          primaryCategory: "productsearch"
        }
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
export async function setDataLayerForLogin(type, lastLocation) {
  let userDetails = getCookie(constants.LOGGED_IN_USER_DETAILS);
  let userLoginFailed = getCookie(constants.NON_LOGGED_IN_USER_DETAILS);
  if (userDetails) {
    userDetails = JSON.parse(userDetails);
  } else if (userLoginFailed) {
    userLoginFailed = JSON.parse(userLoginFailed);
  }
  let data = window.digitalData;
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
    //window.digitalData = data;
    window.digitalData.flag = ADOBE_LOGIN_SUCCESS;
    if (
      data &&
      data.page &&
      data.page.pageInfo &&
      data.page.pageInfo.pageName
    ) {
      Object.assign(window.digitalData, {
        page: {
          pageInfo: { pageName: data.page.pageInfo.pageName }
        }
      });
    }
    if (window._satellite) {
      window._satellite.track(ADOBE_LOGIN_SUCCESS);
    }
  }
  if (type === ADOBE_DIRECT_CALL_FOR_LOGIN_FAILURE) {
    if (userLoginFailed) {
      if (userLoginFailed.loginType === LOGIN_WITH_EMAIL) {
        Object.assign(data, {
          account: {
            login: {
              customerID: userLoginFailed.customerId,
              type: EMAIL
            }
          }
        });
      } else if (userLoginFailed.loginType === LOGIN_WITH_MOBILE) {
        if (data.account) {
          Object.assign(data.account, {
            login: {
              customerID: userLoginFailed.customerId,
              type: MOBILE
            }
          });
        } else {
          Object.assign(data, {
            account: {
              login: {
                customerID: userLoginFailed.customerId,
                type: MOBILE
              }
            }
          });
        }
      } else if (userLoginFailed.loginType === FACEBOOK_PLATFORM) {
        if (data.account) {
          Object.assign(data.account, {
            login: {
              customerID: userLoginFailed.customerId,
              type: FACEBOOK
            }
          });
        } else {
          Object.assign(data, {
            account: {
              login: {
                customerID: userLoginFailed.customerId,
                type: FACEBOOK
              }
            }
          });
        }
      } else if (userLoginFailed.loginType === GOOGLE_PLUS_PLATFORM) {
        if (data.account) {
          Object.assign(data.account, {
            login: {
              customerID: userLoginFailed.customerId,
              type: GOOGLE
            }
          });
        } else {
          Object.assign(data, {
            account: {
              login: {
                customerID: userLoginFailed.customerId,
                type: GOOGLE
              }
            }
          });
        }
      }
    }
    window.digitalData = Object.assign(window.digitalData, data);
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
  if (type === ADOBE_DIRECT_CALL_FOR_ANONYMOUS_USER) {
    const mcvId = await getMcvId();
    window.digitalData = data;
    if (window.digitalData) {
      Object.assign(data, {
        account: {
          login: {
            customerID: "anonymous"
          },
          mcvId: mcvId
        },
        page: {
          category: {
            primaryCategory:
              data &&
              data.page &&
              data.page.category &&
              data.page.category.primaryCategory
          },
          pageInfo: {
            pageName:
              data &&
              data.page &&
              data.page.pageInfo &&
              data.page.pageInfo.pageName,
            pageType:
              data &&
              data.page &&
              data.page.pageInfo &&
              data.page.pageInfo.pageType
          }
        }
      });
      window.digitalData = data;
    }
  }
  localStorage.setItem("loginType", JSON.stringify(data.account));
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
      // window._satellite.track(TARGET_EVENT_FOR_PAGEVIEW);
      window._satellite.track(ADOBE_ORDER_CONFIRMATION_SUCCESS);
      window._satellite.track(ADOBE_PAYMENT_CHECKOUT_SUCCESSFUL);
    }
  }
  if (type === ADOBE_DIRECT_CALLS_FOR_ORDER_CONFIRMATION_FAILURE) {
    let data = window.digitalData;
    if (data && data.page) {
      Object.assign(data.page, {
        pageInfo: {
          pageName: "order failed",
          pageType: "Order Fail"
        },
        category: {
          primaryCategory: "orderfailed",
          subCategory1:
            window.digitalData.page &&
            window.digitalData.page.category &&
            window.digitalData.page.category.subCategory1,
          subCategory2:
            window.digitalData.page &&
            window.digitalData.page.category &&
            window.digitalData.page.category.subCategory2,
          subCategory3:
            window.digitalData.page &&
            window.digitalData.page.category &&
            window.digitalData.page.category.subCategory3
        }
      });
    } else {
      Object.assign(data, {
        page: {
          pageInfo: {
            pageName: "order failed",
            pageType: "Order Fail"
          },
          category: {
            primaryCategory: "orderfailed",
            subCategory1:
              window.digitalData.page &&
              window.digitalData.page.category &&
              window.digitalData.page.category.subCategory1,
            subCategory2:
              window.digitalData.page &&
              window.digitalData.page.category &&
              window.digitalData.page.category.subCategory2,
            subCategory3:
              window.digitalData.page &&
              window.digitalData.page.category &&
              window.digitalData.page.category.subCategory3
          }
        }
      });
    }
    if (data && data.cpj) {
      Object.assign(data.cpj, {
        order: {
          failureReason:
            orderConfirmationResponse && orderConfirmationResponse.failureReason
              ? orderConfirmationResponse.failureReason
              : "",
          id:
            orderConfirmationResponse && orderConfirmationResponse.orderId
              ? orderConfirmationResponse.orderId
              : ""
        }
      });
    } else {
      Object.assign(data, {
        cpj: {
          order: {
            failureReason:
              orderConfirmationResponse &&
              orderConfirmationResponse.failureReason
                ? orderConfirmationResponse.failureReason
                : "",
            id:
              orderConfirmationResponse && orderConfirmationResponse.orderId
                ? orderConfirmationResponse.orderId
                : ""
          }
        }
      });
    }

    window.digitalData = data;
    if (window._satellite) {
      window._satellite.track(ADOBE_ORDER_CONFIRMATION_FAILURE);
    }
  }
}
export function setDataLayerForCheckoutDirectCalls(type, response) {
  let data = cloneDeep(window.digitalData);
  let cartData = localStorage.getItem(constants.DIGITAL_DATA_FOR_CART);
  if (cartData && type !== ADOBE_ADD_NEW_ADDRESS_ON_MY_ACCOUNT_PAGE) {
    cartData = JSON.parse(cartData);
    Object.assign(data, cartData);
    Object.assign(data, {
      page: {
        category: {
          primaryCategory: "multistepcheckoutsummary",
          subCategory1:
            cartData &&
            cartData.page &&
            cartData.page.category &&
            cartData.page.category.subCategory1,
          subCategory2:
            cartData &&
            cartData.page &&
            cartData.page.category &&
            cartData.page.category.subCategory2,
          subCategory3:
            cartData &&
            cartData.page &&
            cartData.page.category &&
            cartData.page.category.subCategory3
        },
        pageInfo: {
          pageName: "multi checkout summary page",
          pageType: "Checkout"
        }
      }
    });
  }
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
  if (type === ADOBE_CHECKOUT_DEFAULT_NEW_ADDRESS) {
    if (window._satellite) {
      window._satellite.track(ADOBE_CHECKOUT_DEFAULT_ADDRESS);
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

    if (window._satellite) {
      window._satellite.track(ADOBE_SELECT_DELIVERY_MODES);
    }
  }
  if (type === ADOBE_CALL_FOR_PROCCEED_FROM_DELIVERY_MODE) {
    if (window._satellite) {
      window._satellite.track(ADOBE_PROCEED_FROM_DELIVERY_MODE);
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
          Object.assign(data.cpj.coupon, {
            code: response
          });
        } else {
          Object.assign(data.cpj, {
            coupon: { code: response }
          });
        }
      } else {
        Object.assign(data, {
          cpj: { coupon: { code: response } }
        });
      }
    } else {
      Object.assign(data, { cpj: { coupon: { code: response } } });
    }

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
      data = Object.assign(window.digitalData, data);
      localStorage.setItem(
        "digitalDataForPaymentConfirmation",
        JSON.stringify(data)
      );
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
      data = Object.assign(window.digitalData, data);
      localStorage.setItem(
        "digitalDataForPaymentConfirmation",
        JSON.stringify(data)
      );
    }
    data = Object.assign(window.digitalData, data);
    if (window._satellite) {
      window._satellite.track(ADOBE_SELECT_PAYMENT_MODES);
    }
  }
  data = Object.assign(window.digitalData, data);
  window.digitalData = data;
  // localStorage.setItem(
  //   "digitalDataForPaymentConfirmation",
  //   JSON.stringify(data)
  // );
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
  if (type === ADOBE_MY_ACCOUNT_RETURN_CANCEL) {
    if (window._satellite) {
      window._satellite.track(ADOBE_RETURN_CANCEL);
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
      pageInfo: { pageName: pageTitle, pageType: "My Account" },
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
  }
  return data;
}
export function getDigitalDataForBLP(pgName, response) {
  const data = {};
  let pageTitle = "";
  if (response.pageName) {
    Object.assign(data, {
      page: {
        pageName: pgName
        // pageName: response.pageName
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
    // Object.assign(data.page.category, { ...subCategories });
    Object.assign(data, {
      header: {
        headerName: "Categories",
        categoryName: subCategories.subCategory1
      }
    });
    Object.assign(data.page, {
      pageInfo: {
        pageName: `product grid: ${
          subCategories.subCategory1 ? subCategories.subCategory1 : null
        } : ${
          subCategories.subCategory2 ? subCategories.subCategory2 : null
        } : ${subCategories.subCategory3 ? subCategories.subCategory3 : null}`,
        pageType: "PLP"
      },
      category: { ...subCategories }
    });
  } else {
    Object.assign(data.page, {
      pageInfo: {
        pageName: `product grid: ${null}: ${null}: ${null}`,
        pageType: "PLP"
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
export function setDataLayerForPinCode(response, type) {
  const previousData = cloneDeep(window.digitalData);
  if (previousData) {
    if (previousData.geolocation) {
      Object.assign(previousData.geolocation, {
        pin: { code: response }
      });
    } else {
      Object.assign(previousData, {
        geolocation: { pin: { code: response } }
      });
    }
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
    if (previousData.cpj) {
      Object.assign(previousData.cpj, {
        pin: {
          status:
            type === ADOBE_DIRECT_CALL_FOR_PINCODE_SUCCESS
              ? "success"
              : "failure"
        }
      });
    } else {
      Object.assign(previousData, {
        cpj: {
          pin: {
            status:
              type === ADOBE_DIRECT_CALL_FOR_PINCODE_SUCCESS
                ? "success"
                : "failure"
          }
        }
      });
    }
  } else {
    if (previousData.cpj) {
      Object.assign(previousData.cpj, {
        pin: {
          status:
            type === ADOBE_DIRECT_CALL_FOR_PINCODE_SUCCESS
              ? "success"
              : "failure"
        }
      });
    } else {
      Object.assign(previousData, {
        cpj: {
          pin: {
            status:
              type === ADOBE_DIRECT_CALL_FOR_PINCODE_SUCCESS
                ? "success"
                : "failure"
          }
        }
      });
    }
    Object.assign(previousData, {
      page: { pin: { value: response } }
    });
  }
  return previousData;
}
export function getDigitalDataForDefaultBlpOrClp(response) {
  const data = {
    page: { category: { primaryCategory: "category" } }
  };
  const subCategories = getSubCategories(response);
  if (subCategories) {
    if (data.page && data.page.category) {
      Object.assign(data.page.category, { ...subCategories });
    } else {
      Object.assign(data.page, {
        category: { ...subCategories }
      });
    }
  }
  if (response && response.pageName) {
    if (response.pageName.replace(/ /g, "_").toLowerCase() == "atoz_brands") {
      Object.assign(data.page, {
        pageInfo: {
          pageName: "brand page"
        }
      });
    } else {
      Object.assign(data.page, {
        pageInfo: {
          pageName: response.pageName.replace(/ /g, "_").toLowerCase()
        }
      });
    }
    // Object.assign(data.page, {
    //   pageInfo: {
    //     pageName: response.pageName.replace(/ /g, "_").toLowerCase()
    //   }
    // });
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

export function getDigitalDataForLoginAndSignup(isLoginFromCheckoutPage) {
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
export function getDigitalDataForStatic(response) {
  const data = {
    page: { category: { primaryCategory: "category" } }
  };
  const subCategories = getSubCategories(response);
  if (subCategories) {
    if (data.page && data.page.category) {
      Object.assign(data.page.category, { ...subCategories });
    } else {
      Object.assign(data.page, {
        category: { ...subCategories }
      });
    }
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
        position: response ? response.position : "",
        category: response ? response.category : ""
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
  let widgetType, widgetID;
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
      widgetID = 111;
      break;
    case DISCOVER_MORE:
      widgetType = DISCOVER_MORE_ADOBE;
      widgetID = 110;
      break;
    case ABOUT_THE_BRAND:
      widgetType = ABOUT_THE_BRAND_ADOBE;
      widgetID = 114;
      break;
    case SIMILAR_PRODUCTS:
      widgetType = PDP_SIMILAR_PRODUCT;
      widgetID = 0;
      break;
    case FREQUENTLY_BOUGHT_TOGETHER:
      widgetType = FREQUENTLY_BOUGHT_TOGETHER_ADOBE;
      break;
    case AUTOMATED_BRAND_PRODUCT_CAROUSAL:
      widgetType = AUTOMATED_BRAND_PRODUCT_CAROUSAL_ADOBE;
      widgetID = 113;
      if (window._satellite) {
        window._satellite.track(AUTOMATED_BRAND_PRODUCT_CAROUSAL);
      }
      break;
    case MSD_AUTOMATED_BRAND_PRODUCT_CAROUSAL_ADOBE:
      widgetType = MSD_AUTOMATED_BRAND_PRODUCT_CAROUSAL_ADOBE;
      widgetID = 113;
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
  if (data && data.cpj) {
    Object.assign(data.cpj, {
      widgetName: `${widgetObj.productId ? widgetObj.productId : "x"}:${
        widgetObj.widgetName
      }:${widgetObj.sourceOfWidget ? widgetObj.sourceOfWidget : ""}:${
        widgetObj.type ? widgetObj.type : "product"
      }:${widgetObj.brandName ? widgetObj.brandName : "x"}:${
        widgetObj.categoryName ? widgetObj.categoryName : "x"
      }:${widgetObj.widgetId ? widgetObj.widgetId : widgetID ? widgetID : "x"}`
    });
  } else {
    Object.assign(data, {
      cpj: {
        widgetName: `${widgetObj.productId ? widgetObj.productId : "x"}:${
          widgetObj.widgetName
        }:${widgetObj.sourceOfWidget ? widgetObj.sourceOfWidget : ""}:${
          widgetObj.type ? widgetObj.type : "product"
        }:${widgetObj.brandName ? widgetObj.brandName : "x"}:${
          widgetObj.categoryName ? widgetObj.categoryName : "x"
        }:${
          widgetObj.widgetId ? widgetObj.widgetId : widgetID ? widgetID : "x"
        }`
      }
    });
  }
  if (data && data.cpj) {
    Object.assign(data.cpj, {
      widgetName: `${widgetObj.productId ? widgetObj.productId : "x"}:${
        widgetObj.widgetName
      }:${widgetObj.sourceOfWidget ? widgetObj.sourceOfWidget : ""}:${
        widgetObj.type ? widgetObj.type : "product"
      }:${widgetObj.brandName ? widgetObj.brandName : "x"}:${
        widgetObj.categoryName ? widgetObj.categoryName : "x"
      }:${widgetObj.widgetId ? widgetObj.widgetId : widgetID ? widgetID : "x"}`
    });
  } else if (data && data.page) {
    Object.assign(data.page, {
      widget: {
        name: `${widgetObj.productId ? widgetObj.productId : "x"}:${
          widgetObj.widgetName
        }:${widgetObj.sourceOfWidget ? widgetObj.sourceOfWidget : ""}:${
          widgetObj.type ? widgetObj.type : "product"
        }:${widgetObj.brandName ? widgetObj.brandName : "x"}:${
          widgetObj.categoryName ? widgetObj.categoryName : "x"
        }:${
          widgetObj.widgetId ? widgetObj.widgetId : widgetID ? widgetID : "x"
        }`
      }
    });
  } else {
    Object.assign(data, {
      page: {
        widget: {
          name: `${widgetObj.productId ? widgetObj.productId : "x"}:${
            widgetObj.widgetName
          }:${widgetObj.sourceOfWidget ? widgetObj.sourceOfWidget : ""}:${
            widgetObj.type ? widgetObj.type : "product"
          }:${widgetObj.brandName ? widgetObj.brandName : "x"}:${
            widgetObj.categoryName ? widgetObj.categoryName : "x"
          }:${
            widgetObj.widgetId ? widgetObj.widgetId : widgetID ? widgetID : "x"
          }`
        }
      }
    });
  }
  window.digitalData = data;
  if (window._satellite) {
    window._satellite.track(widgetType);
    window._satellite.track(ADOBE_WIDGET_TRACKING);
  }
}
export function widgetsTrackingForRecommendation(widgetObject: {}) {
  if (!widgetObject.widgetName) {
    return;
  }
  const data = cloneDeep(window.digitalData);
  Object.assign(window.digitalData, {
    page: {
      ...data.page,
      widget: {
        name: `${widgetObject.productId ? widgetObject.productId : "x"}:${
          widgetObject.widgetName
        }:${widgetObject.pageName ? widgetObject.pageName : ""}:${
          widgetObject.brandName ? widgetObject.brandName : "x"
        }:${widgetObject.category ? widgetObject.category : "x"}:${
          widgetObject.PositionOfProduct ? widgetObject.PositionOfProduct : "x"
        }:${widgetObject.widgetID ? widgetObject.widgetID : "x"}`
      }
    }
  });
  if (window._satellite) {
    window._satellite.track(ADOBE_WIDGET_TRACKING);
  }
}
export function ICIDTracking(value) {
  Object.assign(window.digitalData, { icid2: value });
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
        pageInfo: {
          pageName:
            value === "Tata CLiQ Logo"
              ? "Homepage"
              : previousDigitalData.page.pageInfo.pageName
        },
        pageType: value === "Tata CLiQ Logo" ? "Homepage" : ""
      }
    });
    window.digitalData = Object.assign(previousDigitalData, currentDigitalData);
  }
  if (type === ADOBE_DIRECT_CALL_FOR_HEADER_CLICK) {
    if (value) {
      Object.assign(currentDigitalData, {
        header: {
          headerName: value
        }
      });
      window.digitalData = Object.assign(
        previousDigitalData,
        currentDigitalData
      );
    }
    if (window._satellite) {
      window._satellite.track(HEADER_CLICK);
    }
  }
  if (type === ADOBE_LOGOUT_SUCCESSFULL) {
    if (value) {
      Object.assign(currentDigitalData, {
        header: {
          headerName: value
        }
      });
      window.digitalData = Object.assign(
        previousDigitalData,
        currentDigitalData
      );
    }
  }
  if (type === ADOBE_DIRECT_CALL_FOR_CATEGORY_CLICK) {
    Object.assign(currentDigitalData, {
      header: {
        headerName: "Categories",
        categoryName: value
      }
    });
    if (
      currentDigitalData &&
      currentDigitalData.page &&
      currentDigitalData.page.pageInfo
    ) {
      Object.assign(currentDigitalData.page.pageInfo, {
        pageType: "CLP"
      });
    }
    window.digitalData = Object.assign(previousDigitalData, currentDigitalData);
    if (window._satellite) {
      window._satellite.track(ADOBE_CLP_DIRECT_CALL);
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
    if (
      currentDigitalData &&
      currentDigitalData.page &&
      currentDigitalData.page.pageInfo
    ) {
      Object.assign(currentDigitalData.page.pageInfo, {
        pageType: "BLP"
      });
    }
    window.digitalData.page.pageInfo.pageName = "brand page";
    window.digitalData = Object.assign(previousDigitalData, currentDigitalData);
    if (window._satellite) {
      window._satellite.track(ADOBE_BLP_DIRECT_CALL);
    }
  }
  if (type === ADOBE_DIRECT_CALL_FOR_FOOTER_CLICK) {
    Object.assign(currentDigitalData, {
      footer: {
        footerName: value
      }
    });
    window.digitalData = Object.assign(previousDigitalData, currentDigitalData);
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
    window.digitalData = Object.assign(previousDigitalData, currentDigitalData);
    if (window._satellite) {
      window._satellite.track(SOCIALMEDIA_CLICK);
    }
  }
  if (type === ADOBE_DIRECT_CALL_FOR_FOOTER_SUBSCRIBE) {
    Object.assign(currentDigitalData, {
      subscriberemail: value
    });
    window.digitalData = Object.assign(previousDigitalData, currentDigitalData);
    if (window._satellite) {
      window._satellite.track(FOOTER_SUBSCRIBE);
    }
  }
}
export function setDataLayerForSelectedAddressTypeDirectCalls(type) {
  if (type === ADOBE_DIRECT_CALL_FOR_CHOOSE_DELIVERY_ADDRESS_HOME) {
    if (window._satellite) {
      window._satellite.track(CHECKOUT_DEFAULT_ADDRESS_HOME);
      window._satellite.track(CHOOSE_DELIVERY_ADDRESS_HOME);
    }
  }
  if (type === ADOBE_DIRECT_CALL_FOR_CHOOSE_DELIVERY_ADDRESS_OFFICE) {
    if (window._satellite) {
      window._satellite.track(CHECKOUT_DEFAULT_ADDRESS_OFFICE);
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
      filterValue: filterValue,
      filterName: filterValue
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
          pageName: reviewPage,
          pageType: reviewPage
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
    let data = window.digitalData;
    Object.assign(data, {
      page: {
        pageInfo: {
          pageName: FAQ,
          pageType: FAQ
        }
      }
    });
    window.digitalData = data;
    if (window._satellite) {
      window._satellite.track(FAQ);
    }
  }
  if (type === SET_DATA_LAYER_TC) {
    if (window._satellite) {
      window._satellite.track(TC);
    }
  }
  if (type == SET_DATA_LAYER_ABOUTUS) {
    let data = window.digitalData;
    Object.assign(data, {
      page: {
        pageInfo: {
          pageName: ABOUT_US,
          pageType: ABOUT_US
        }
      }
    });
    window.digitalData = data;
  }
  if (type == SET_DATA_LAYER_HELP) {
    let data = window.digitalData;
    Object.assign(data, {
      page: {
        pageInfo: {
          pageName: HELP,
          pageType: HELP
        }
      }
    });
    window.digitalData = data;
  }
  if (type == SET_DATA_LAYER_CC) {
    let data = window.digitalData;
    Object.assign(data, {
      page: {
        pageInfo: {
          pageName: CUSTOMER_CARE,
          pageType: CUSTOMER_CARE
        }
      }
    });
    window.digitalData = data;
  }
  if (type == SET_DATA_LAYER_CONTACTUS) {
    let data = window.digitalData;
    Object.assign(data, {
      page: {
        pageInfo: {
          pageName: CONTACT_US,
          pageType: CONTACT_US
        }
      }
    });
    window.digitalData = data;
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

export function setDataLayerForWhatsappCheckUncheck(type) {
  if (type === WHATSAPP_CHECKBOX_UNCHECK) {
    if (window._satellite) {
      window._satellite.track(WHATSAPP_CHECKBOX_UNCHECK);
    }
  }
}

export function setDataLayerForRatingAndReview(type, reviewData) {
  let previousDigitalData = cloneDeep(window.digitalData);

  if (type === SET_DATA_LAYER_RATING_STAR_CLICK) {
    Object.assign(previousDigitalData, {
      rating: {
        star: {
          count: reviewData.rating
        }
      }
    });
    if (window._satellite) {
      window._satellite.track(RATING_STAR_CLICK);
    }
  }
  if (type === SET_DATA_LAYER_RATING_MESSAGE) {
    Object.assign(previousDigitalData, {
      rating: {
        message: { value: reviewData.statusText }
      }
    });
    if (window._satellite) {
      window._satellite.track(RATING_MESSAGE);
    }
  }
  if (type === SET_DATA_LAYER_RATING_MODAL_STAR_CLICK) {
    Object.assign(previousDigitalData, {
      rating: {
        star: { count: reviewData.rating }
      }
    });
    if (window._satellite) {
      window._satellite.track(RATING_MODAL_STAR_CLICK);
    }
  }
  if (type === SET_DATA_LAYER_REVIEW_SUBMIT_CLICK) {
    if (window._satellite) {
      window._satellite.track(REVIEW_SUBMIT_CLICK);
    }
  }
  if (type === SET_DATA_LAYER_REVIEW_CANCEL_CLICK) {
    if (window._satellite) {
      window._satellite.track(REVIEW_CANCEL_CLICk);
    }
  }
  if (type === SET_DATA_LAYER_REVIEW_GUIDELINE) {
    if (window._satellite) {
      window._satellite.track(REVIEW_GUIDELINE);
    }
  }
  window.digitalData = previousDigitalData;
}
export function setPageNameAndPageType(response) {
  if (response) {
    let digitalDataForPageName = window.digitalData;
    if (digitalDataForPageName.page && digitalDataForPageName.page.pageInfo) {
      Object.assign(digitalDataForPageName.page.pageInfo, {
        pageName: response.pageName,
        pageType: "homePage"
      });
    }
    Object.assign(window.digitalData, digitalDataForPageName);
  }
}

export function getWhatsAppNotification(type) {
  if (type === WHATSAPP_NOTIFICATION_CHECKED) {
    if (window._satellite) {
      window._satellite.track(whatsAppNotificationChecked);
    }
  }
  if (type === WHATSAPP_NOTIFICATION_UNCHECKED) {
    if (window._satellite) {
      window._satellite.track(whatsAppNotificationUnChecked);
    }
  }
}

// export function targetPageViewEvent(type, response, pageType) {
//   if (response && pageType === "PDP") {
//     Object.assign(window.digitalData, getDigitalDataForPdp(type, response));
//   } else if (response && pageType === "PLP") {
//     Object.assign(window.digitalData, getDigitalDataForPlp(type, response));
//   } else if (response && pageType === "CART") {
//     Object.assign(window.digitalData, getDigitalDataForCart(type, response));
//   } else if (response && pageType === "HOME") {
//     Object.assign(window.digitalData, getDigitalDataForHome());
//   } else if (response && pageType === "ORDER_CONFIRMATION") {
//     Object.assign(
//       window.digitalData,
//       getDigitalDataForOrderConfirmation(type, response)
//     );
//   }
//   if (type === TARGET_EVENT_FOR_PAGELOAD) {
//     if (window._satellite) {
//       window._satellite.track(TARGET_EVENT_FOR_PAGELOAD);
//     }
//   } else if (type === TARGET_EVENT_FOR_PAGEVIEW) {
//     if (window._satellite) {
//       window._satellite.track(TARGET_EVENT_FOR_PAGEVIEW);
//     }
//   }
// }

export function setDataLayerForCLiQCarePage(type, data, pageName) {
  let previousDigitalData = { ...window.digitalData };
  if (type === ADOBE_SELF_SERVE_OTHER_ISSUES_CLICK) {
    if (window._satellite) {
      window._satellite.track(SELF_SERVE_OTHER_ISSUES);
    }
  }

  if (type === ADOBE_SELF_SERVE_ALL_HELP_TOPIC_CLICK) {
    window.digitalData = Object.assign(previousDigitalData, {
      selfserve: {
        topics: {
          name: data
        }
      }
    });
    if (window._satellite) {
      window._satellite.track(SELF_SERVE_ALL_HELP_TOPIC_SELECTION);
    }
  }

  if (type === ADOBE_SELF_SERVE_PAGE_LOAD) {
    if (!data) {
      window.digitalData = {
        page: {
          pageInfo: {
            pageType: pageName[0],
            pageName: pageName[1]
          }
        }
      };
    } else if (pageName[1] === "TicketCreation") {
      window.digitalData = {
        ...previousDigitalData,
        page: {
          pageInfo: {
            ...previousDigitalData.page.pageInfo,
            pageName: pageName[0]
          }
        },
        selfserve: {
          response: data
        }
      };
    } else {
      window.digitalData = Object.assign(previousDigitalData, {
        page: {
          pageInfo: {
            ...previousDigitalData.page.pageInfo,
            pageName: pageName
          }
        },
        selfserve: data
      });
    }
    if (window._satellite) {
      window._satellite.track(SELF_SERVE_PAGE_LOAD);
    }
  }

  if (type === ADOBE_SELF_SERVE_ISSUE_SELECTION) {
    window.digitalData = Object.assign(previousDigitalData, {
      selfserve: {
        issue: {
          title: data
        }
      }
    });
    if (window._satellite) {
      window._satellite.track(SELF_SERVE_QUESTION_SELECTION);
    }
  }

  if (type === ADOBE_SELF_SERVE_FEEDBACK_SELECTION) {
    if (previousDigitalData && previousDigitalData.selfserve) {
      window.digitalData = Object.assign(previousDigitalData, {
        selfserve: {
          ...previousDigitalData.selfserve,
          feedback: {
            optionName: data
          }
        }
      });
    } else {
      window.digitalData = Object.assign(previousDigitalData, {
        selfserve: {
          feedback: {
            optionName: data
          }
        }
      });
    }

    if (window._satellite) {
      window._satellite.track(SELF_SERVE_FEEDBACK_SELECTION);
    }
  }

  if (type === ADOBE_SELF_SERVE_CONTINUE_BUTTON_CLICK) {
    if (window._satellite) {
      window._satellite.track(SELF_SERVE_CONTINUE_BUTTON_CLICK);
    }
  }

  if (type === ADOBE_SELF_SERVE_MORE_HELP_PAGE_BUTTON_CLICK) {
    if (previousDigitalData && previousDigitalData.selfserve) {
      window.digitalData = Object.assign(previousDigitalData, {
        selfserve: {
          ...previousDigitalData.selfserve,
          button: {
            name: data
          }
        }
      });
    } else {
      window.digitalData = Object.assign(previousDigitalData, {
        selfserve: {
          button: {
            name: data
          }
        }
      });
    }
    if (window._satellite) {
      window._satellite.track(SELF_SERVE_MORE_HELP_PAGE_BUTTON_CLICK);
    }
  }

  if (type === ADOBE_SELF_SERVE_NON_ORDER_CATEGORY_CLICK) {
    window.digitalData = Object.assign(previousDigitalData, {
      selfserve: {
        issue: {
          Tab: data
        }
      }
    });
    if (window._satellite) {
      window._satellite.track(SELF_SERVE_NON_ORDER_CATEGORY_CLICK);
    }
  }

  if (type === ADOBE_SELF_SERVE_SUBMIT_CLICK) {
    if (window._satellite) {
      window._satellite.track(SELF_SERVE_SUBMIT_BUTTON_CLICK);
    }
  }

  if (type === ADOBE_SELF_SERVE_NON_ORDER_PAGE_LOAD) {
    window.digitalData = Object.assign(previousDigitalData, {
      page: {
        pageInfo: {
          ...previousDigitalData.page.pageInfo,
          pageName: pageName
        }
      },
      selfserve: {
        topics: data
      }
    });

    if (window._satellite) {
      window._satellite.track(SELF_SERVE_NON_ORDER_PAGE_LOAD);
    }
  }

  if (type === ADOBE_SELF_SERVE_NON_ORDER_QUESTION_CLICK) {
    window.digitalData = Object.assign(previousDigitalData, {
      selfserve: {
        topics: {
          ...previousDigitalData.selfserve.topics,
          question: data
        }
      }
    });
    if (window._satellite) {
      window._satellite.track(SELF_SERVE_NON_ORDER_QUESTION_CLICK);
    }
  }

  if (type === ADOBE_SELF_SERVE_FAQ_PAGE_LOAD) {
    window.digitalData = {
      ...previousDigitalData,
      page: {
        pageInfo: {
          pageType: pageName[0],
          pageName: pageName[1]
        }
      }
    };
    if (window._satellite) {
      window._satellite.track(SELF_SERVE_FAQ_PAGE_LOAD);
    }
  }
  if (type === ADOBE_LOGIN_START) {
    if (window._satellite) {
      window._satellite.track(LOGIN_START);
    }
  }
}
