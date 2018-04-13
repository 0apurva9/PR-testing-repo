import { PRODUCT_DESCRIPTION_REQUEST } from "../pdp/actions/pdp.actions";

export const SUCCESS = "success";
export const SUCCESS_UPPERCASE = "SUCCESS";
export const SUCCESS_CAMEL_CASE = "Success";
export const SUCCESS_FOR_ADDING_TO_WSHLIST =
  "Product added successfully to the wishlist";

export const REQUESTING = "requesting";
export const ERROR = "error";
export const FAILURE = "Failure";
export const FAILURE_UPPERCASE = "FAILURE";
export const FAILURE_LOWERCASE = "failure";
export const JUS_PAY_PENDING = "PENDING_VBV";
export const JUS_PAY_CHARGED = "CHARGED";
export const JUS_PAY_AUTHENTICATION_FAILED = "AUTHENTICATION_FAILED";
export const SINGLE_SELECT_HEADING_COPY = "Thanks!!!";
export const SINGLE_SELECT_DESCRIPTION_COPY =
  "We will curate the experience based on your choices. Loading products...";

export const MULTI_SELECT_HEADING_COPY = "Thanks!!!";
export const MULTI_SELECT_DESCRIPTION_COPY =
  "We will curate the experience based on your choices. Loading products...";
export const MOBILE_PDP_VIEW = "mobilePdpView";
export const MAIN_ROUTER = "/";
export const CUSTOMER_ACCESS_TOKEN = "customerAccessToken";
export const GLOBAL_ACCESS_TOKEN = "globalAccessToken";
export const DEFAULT_PIN_CODE_LOCAL_STORAGE = "defaultPinCode";

export const STATIC_CATEGORY_PAGES = "/(.*)";

export const REFRESH_TOKEN = "refresh_token";
export const BRAND_PAGE = "/c-(mbh[a-zA-Z0-9]+)";
export const BRAND_PAGE_WITH_SLUG = `/:slug/c-(mbh[0-9a-zA-z]+)`;
export const BRAND_PAGE_WITH_QUERY_PARAMS = `/c-(mbh[0-9a-zA-z]+)?&`;
export const BRAND_PAGE_WITH_SLUG_WITH_QUERY_PARAMS = `/c-(mbh[0-9a-zA-z]+)?&`;

export const BRAND_AND_CATEGORY_PAGE =
  "/:slug/c-(msh[a-zA-Z0-9]+)/b-(mbh[a-zA-Z0-9]+)";

export const CATEGORY_PAGE = "/c-(msh[0-9A-Za-z]+)";
export const CATEGORY_PAGE_WITH_SLUG = `/:slug/c-(msh[0-9a-zA-Z]+)`;
export const CATEGORY_PAGE_WITH_QUERY_PARAMS = `${CATEGORY_PAGE}?&.*`;
export const CATEGORY_PAGE_WITH_SLUG_WITH_QUERY_PARAMS = `${CATEGORY_PAGE_WITH_SLUG}?&.*`;
export const PRODUCT_LISTINGS = "/search/(.*)";
export const CATEGORY_PRODUCT_LISTINGS_WITH_PAGE =
  "/:slug/c-(msh[0-9a-zA-Z]+)/page-([0-9]+)?";

export const BRAND_PRODUCT_LISTINGS_WITH_PAGE =
  "/:slug/c-(mbh[0-9a-zA-Z]+)/page-([0-9]+)?";
export const PLP_CATEGORY_SEARCH = "/search/?searchCategory=all&text=shirt";

export const SEARCH_RESULTS_PAGE = "/search/";
export const HOME_ROUTER = "/";

export const BRAND_LANDING_PAGE = "/brand";

export const PRODUCT_DESCRIPTION_PRODUCT_CODE = "/p-([a-z0-9A-Z]+)";
export const PRODUCT_DESCRIPTION_REVIEWS = `${PRODUCT_DESCRIPTION_PRODUCT_CODE}/product-reviews`;
export const PRODUCT_DESCRIPTION_REVIEWS_WITH_SLUG = `/:slug${PRODUCT_DESCRIPTION_REVIEWS}`;
export const PRODUCT_OTHER_SELLER_ROUTER = `${PRODUCT_DESCRIPTION_PRODUCT_CODE}/viewSellers`;
export const PRODUCT_DESCRIPTION_SLUG_PRODUCT_CODE =
  "/:slug/(p-)([a-zA-Z0-9]+)";
export const PRODUCT_REVIEWS_PATH_SUFFIX = "/product-reviews";
export const PRODUCT_DESCRIPTION_ROUTER = PRODUCT_DESCRIPTION_PRODUCT_CODE; //TODO remove this
export const PRODUCT_REVIEW_ROUTER = "/productReview";
export const LOGIN_PATH = "/login";
export const SIGN_UP_PATH = "/sign_up";
export const PRODUCT_FILTER_ROUTER = "/filter";
export const PRODUCT_SELLER_ROUTER_SUFFIX = "/viewSellers";
export const PRODUCT_CART_ROUTER = "/cart";
export const ORDER_SUMMARY_ROUTER = "/orderSummary";
export const CHECKOUT_ROUTER = "/checkout";
export const ACCOUNT_SAVED_CARD_ROUTER = "/savedCards";
export const MY_ACCOUNT = "/my-account";
export const SHORT_URL_ORDER_DETAIL = "/trackOrder/beforeTrack/:orderCode";
export const ORDER_PREFIX = "/my-account/order/(.*)";
export const ORDER_CODE = "orderCode";
export const ORDER = "/order";
// MyAccount Routes
export const MY_ACCOUNT_PAGE = "/my-account";
export const MY_ACCOUNT_WISHLIST_PAGE = "/wishList";
export const MY_ACCOUNT_ORDERS_PAGE = "/orders";
export const MY_ACCOUNT_GIFT_CARD_PAGE = "/giftCard";
export const MY_ACCOUNT_SAVED_CARDS_PAGE = "/payment-details";
export const MY_ACCOUNT_ADDRESS_PAGE = "/address-book";
export const MY_ACCOUNT_BRANDS_PAGE = "/brands";
export const MY_ACCOUNT_UPDATE_PROFILE_PAGE = "/update-profile";
export const MY_ACCOUNT_ALERTS_PAGE = "/alerts";
export const MY_ACCOUNT_COUPON_PAGE = "/coupons";
export const MY_ACCOUNT_CART_PAGE = "/cart";
export const MY_ACCOUNT_CLIQ_CASH_PAGE = "/cliq-cash";
export const EDIT_ADDRESS_BOOK = "/my-account/address-book/edit";
//returns
export const RETURNS_PREFIX = "/returns";
export const RETURNS = "/returns/(.*)";
export const RETURN_LANDING = "/initiate";
export const RETURNS_REASON = "/reason";
export const RETURNS_MODES = "/modes";
export const RETURNS_NEW_ADDRESS = "/addDeliveryLocation";
export const RETURN_CLIQ_PIQ = "/cliqpiq";
export const RETURN_CLIQ_PIQ_ADDRESS = "/address";
export const RETURN_CLIQ_PIQ_DATE = "/dateTime";

export const RETURN_CLIQ_PIQ_RETURN_SUMMARY = "/returnSummary";

export const RETURN_TO_STORE = "/store";
export const RETURNS_STORE_MAP = "/storePick";
export const RETURNS_STORE_BANK_FORM = "/bankDetail";
export const RETURNS_STORE_FINAL = "/submit";

export const RETURNS_SELF_COURIER = "/selfCourier";
export const MY_ACCOUNT_ADDRESS_EDIT_PAGE = "/address-book/edit";
export const MY_ACCOUNT_ADDRESS_ADD_PAGE = "/address-book/add";

export const CLIQ_AND_PIQ = "/select-stores";
export const PRODUCT_CART_DELIVERY_MODES = "/deliveryModes";
export const PRODUCT_DELIVERY_ADDRESSES = "/deliveryAddress";
export const DEFAULT_BRANDS_LANDING_PAGE = "/defaultBrandsLanding";
export const PRICE_TEXT = "Price";
export const OFFER_AVAILABLE = "Offer Available";
export const EMI_AVAILABLE = "EMI Available";
export const DELIVERY_INFORMATION_TEXT = "Delivery Information";
export const DELIVERY_RATES = "Delivery Rates & Return Policy";
export const CASH_TEXT = "Cash on Delivery Available!";
export const SOCIAL_LOG_IN = "logIn";
export const SOCIAL_SIGN_UP = "signUp";
export const OLD_CART_GU_ID = "oldCartGuId";
export const CART_DETAILS_FOR_ANONYMOUS = "cartDetailsForAnonymous";
export const CART_DETAILS_FOR_LOGGED_IN_USER = "cartDetails";
export const LOGGED_IN_USER_DETAILS = "userDetails";
export const CATEGORIES_LANDING_PAGE = "/categories";
export const ANONYMOUS_USER = "anonymous";
export const COUPON_COOKIE = "couponCode";

export const SAVE_LIST_PAGE = "/default/wishList";
export const PAYMENT_MODE_TYPE = "paymentMode";
// fetching feed information contant
export const BLP_OR_CLP_FEED_TYPE = "blpOrClp";
export const HOME_FEED_TYPE = "home";

export const YES = "Y";
export const NO = "N";

export const EXPRESS = "express-delivery";
export const COLLECT = "click-and-collect";
export const HOME_DELIVERY = "home-delivery";
export const SHORT_EXPRESS = "ED";
export const SHORT_COLLECT = "CNC";

export const FOLLOW = "Follow";
export const FOLLOWING = "Following";

export const PLAT_FORM_NUMBER = "2";

export const TRUE = "true";

export const QUICK_DROP = "quickDrop";
export const SCHEDULED_PICKUP = "schedulePickup";
export const SELF_COURIER = "selfCourier";

export const CASH_ON_DELIVERY = "COD";
export const ON_EXCLUSIVE = "onExclusive";
export const IS_OFFER_EXISTING = "isOfferExisting";
export const IS_NEW = "isNew";
export const DISCOUNT_PERCENT = "discountPercent";
export const PAYTM = "PAYTM";
export const CANCEL = "/cancel";
export const CANCEL_PREFIX = "/cancel/(.*)";

export const WALLET = "WALLET";

//header name
export const SAVED_PAYMENTS = "Saved Payments";
export const MY_CLIQ = "My Cliq";
export const SAVED_LIST = "Saved list";
export const ALERTS_COUPON = "Alerts & Coupons";
export const BRANDS = "Brands";
export const ADDRESS_BOOK = "Address Book";
export const ORDER_HISTORY = "Order History";
export const CLIQ_CASH = "Cliq Cash";
export const GIFT_CARD = "Gift Card";
export const YOUR_BAG = "Your Bag";
export const CATEGORIES = "Categories";
export const CHECKOUT = "Checkout";
export const THANK_YOU = "Thank You";
export const EDIT_YOUR_ADDRESS = "Edit Your Address";

// COPY

export const REVIEW_SUBMIT_TOAST_TEXT =
  "Your review has been submitted and will be displayed after moderation";

export const CDN_URL_ROOT =
  "https://assetsuat2.tataunistore.com/medias/sys_master/pwaImg/";
