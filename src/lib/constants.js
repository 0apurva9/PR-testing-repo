import { PRODUCT_DESCRIPTION_REQUEST } from "../pdp/actions/pdp.actions";

export const SUCCESS = "success";
export const SUCCESS_UPPERCASE = "SUCCESS";
export const SUCCESS_CAMEL_CASE = "Success";
export const SUCCESS_FOR_ADDING_TO_WSHLIST =
  "Product added successfully to the wishlist";
export const SUCCESS_FOR_ADDING_TO_BAG = "Product added successfully to bag";
export const ADD_TO_BAG_TEXT = "The item has been added to your bag";
export const REQUESTING = "requesting";
export const ERROR = "error";
export const FAILURE = "Failure";
export const FAILURE_UPPERCASE = "FAILURE";
export const FAILURE_LOWERCASE = "failure";
export const WRONG_FAILURE = "faliure";
export const JUS_PAY_PENDING = "PENDING_VBV";
export const JUS_PAY_CHARGED = "CHARGED";
export const JUS_PAY_SUCCESS = "S";
export const JUS_PAY_AUTHENTICATION_FAILED = "AUTHENTICATION_FAILED";
export const JUS_PAY_AUTHORIZATION_FAILED = "JUS_PAY_AUTHORIZATION_FAILED";
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
export const SOFT_RESERVATION_ITEM = "softReservationItem";
export const ADDRESS_DETAILS_FOR_PAYMENT = "addressDetailsForPayment";
export const SKU_PAGE = "/custom/:slug";

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
export const PRODUCT_LISTINGS_WITHOUT_SLASH = "/search/";
export const SKU_PAGE_FILTER = "/CustomSkuCollection/:slug/page-([0-9]+)";
export const CATEGORY_PRODUCT_LISTINGS_WITH_PAGE =
  "/:slug/c-(msh[0-9a-zA-Z]+)/page-([0-9]+)?";

export const BRAND_PRODUCT_LISTINGS_WITH_PAGE =
  "/:slug/c-(mbh[0-9a-zA-Z]+)/page-([0-9]+)?";

export const SEARCH_RESULTS_PAGE = "/search/";
export const HOME_ROUTER = "/";

export const BRAND_LANDING_PAGE = "/brand";
export const PRODUCT_DETAIL_FOR_ADD_TO_WISHLIST =
  "productDetailsForAddToWishList";
export const PRODUCT_ADDED_TO_WISHLIST = "Product added to wishlist";
export const PRODUCT_DESCRIPTION_PRODUCT_CODE = "/p-([a-z0-9A-Z]+)";
export const PRODUCT_DESCRIPTION_REVIEWS = `${PRODUCT_DESCRIPTION_PRODUCT_CODE}/product-reviews`;
export const WRITE_REVIEW = `/write-review`;
export const WRITE_REVIEWS = `${PRODUCT_DESCRIPTION_PRODUCT_CODE}/write-review`;
export const WRITE_REVIEWS_WITH_SLUG = `/:slug${WRITE_REVIEWS}`;
export const PRODUCT_DESCRIPTION_REVIEWS_WITH_SLUG = `/:slug${PRODUCT_DESCRIPTION_REVIEWS}`;
export const PRODUCT_OTHER_SELLER_ROUTER = `${PRODUCT_DESCRIPTION_PRODUCT_CODE}/viewSellers`;
export const PRODUCT_DESCRIPTION_SLUG_PRODUCT_CODE =
  "/:slug/(p-)([a-zA-Z0-9]+)";
export const PRODUCT_REVIEWS_PATH_SUFFIX = "product-reviews";
export const PRODUCT_DESCRIPTION_ROUTER = PRODUCT_DESCRIPTION_PRODUCT_CODE; //TODO remove this
export const PRODUCT_REVIEW_ROUTER = "/productReview";
export const LOGIN_PATH = "/login";
export const SIGN_UP_PATH = "/sign_up";
export const PRODUCT_FILTER_ROUTER = "/filter";
export const PRODUCT_SELLER_ROUTER_SUFFIX = "/viewSellers";
export const PRODUCT_CART_ROUTER = "/cart";
export const ORDER_SUMMARY_ROUTER = "/orderSummary";
export const CHECKOUT_ROUTER = "/checkout";
export const CHECKOUT_ROUTER_THANKYOU = "/checkout/";
export const ACCOUNT_SAVED_CARD_ROUTER = "/savedCards";
export const MY_ACCOUNT = "/my-account";
export const SHORT_URL_ORDER_DETAIL = "/trackOrder/beforeTrack/:orderCode";
export const ORDER_PREFIX = "/my-account/order/(.*)";
export const ORDER_CODE = "orderCode";
export const ORDER = "/order";
export const RETURN_SUCCESS_MESSAGE = "Return has been initiated";
// MyAccount Routes
export const MY_ACCOUNT_PAGE_ROOT = "/my-account/.*";
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
export const COSTUMER_ORDER_RELATED_QUERY_ROUTE = "/order-related";
export const CUSTOMER_CARE = "Customer Care";
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
export const SUCCESS_MESSAGE_IN_CANCELING_ORDER =
  "Your order cancelled successfully";
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
export const DEFAULT_BRANDS_LANDING_PAGE = "/brands";
export const PRICE_TEXT = "Price";
export const OFFER_AVAILABLE = "Offer Available";
export const EMI_AVAILABLE = "EMI Available";
export const DELIVERY_INFORMATION_TEXT = "Delivery Information";
export const DELIVERY_RATES = "Delivery Rates & Return Policy";
export const CASH_TEXT = "Cash on Delivery Available!";
export const SOCIAL_LOG_IN = "logIn";
export const SOCIAL_SIGN_UP = "signUp";
export const OLD_CART_GU_ID = "oldCartGuId";
export const OLD_CART_CART_ID = "oldCartCartId";
export const NO_COST_EMI_COUPON = "noCostEmiCoupon";
export const EMI_TYPE = "emiType";
export const CART_DETAILS_FOR_ANONYMOUS = "cartDetailsForAnonymous";
export const CART_DETAILS_FOR_LOGGED_IN_USER = "cartDetails";
export const LOGGED_IN_USER_DETAILS = "userDetails";
export const CATEGORIES_LANDING_PAGE = "/categories";
export const ANONYMOUS_USER = "anonymous";
export const COUPON_COOKIE = "couponCode";
export const BANK_COUPON_COOKIE = "bankCoupon";
export const CART_BAG_DETAILS = "cartBagDetails";
export const APP_VIEW = "isAppView";
export const ORDER_ID_FOR_ORDER_CONFIRMATION_PAGE = "orderConfirmationPageId";

export const SAVE_LIST_PAGE = "/default/wishList";
export const PAYMENT_MODE_TYPE = "paymentMode";
// fetching feed information contant
export const HOME_FEED_TYPE = "home";
export const SECONDARY_FEED_TYPE = "secondaryFeed";

export const YES = "Y";
export const NO = "N";

export const EXPRESS = "express-delivery";
export const COLLECT = "click-and-collect";
export const HOME_DELIVERY = "home-delivery";
export const SHORT_EXPRESS = "ED";
export const SHORT_COLLECT = "CNC";
export const SHORT_HOME_DELIVERY = "HD";
export const EXPRESS_TEXT = "Express Shipping";
export const HOME_TEXT = "Standard Shipping";
export const STANDARD_SHIPPING = "Standard delivery";
export const COLLECT_TEXT = "CLiQ & PiQ";
export const FOLLOW = "Follow";
export const FOLLOWING = "Following";

export const PLAT_FORM_NUMBER = "5";
export const CHANNEL = "web";

export const TRUE = "true";

export const QUICK_DROP = "quickDrop";
export const SCHEDULED_PICKUP = "schedulePickup";
export const SELF_COURIER = "selfCourier";

export const CASH_ON_DELIVERY = "COD";
export const ON_EXCLUSIVE = "onExclusive";
export const IS_OFFER_EXISTING = "isOfferExisting";
export const IS_NEW = "isNew";
export const DISCOUNT_PERCENT = "discountPercent";

// page type for following and un following container
export const HOME_FEED_FOLLOW_AND_UN_FOLLOW = "homeFeed";
export const PDP_FOLLOW_AND_UN_FOLLOW = "pdpFollow";
export const MY_ACCOUNT_FOLLOW_AND_UN_FOLLOW = "myAccountFollow";
export const PAYTM = "PAYTM";
export const CANCEL = "/cancel";
export const CANCEL_PREFIX = "/cancel/(.*)";

export const WALLET = "WALLET";

//header name
export const SAVED_PAYMENTS = "Saved Cards";
export const MY_CLIQ = "My Account";
export const SAVED_LIST = "My Wish List";
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
export const ERROR_MESSAGE_FOR_VERIFY_OTP = "Please Enter an Valid OTP";
export const HELP = "Help";

// COPY
//STATIC PAGE
export const STATIC_PAGE = "/:slug";
export const NOT_FOUND = "/404-not-found";
export const REVIEW_SUBMIT_TOAST_TEXT =
  "Your review has been submitted and will be displayed after moderation";

export const CDN_URL_ROOT =
  "https://assets.tatacliq.com/medias/sys_master/pwaImg/";
export const QUE_MAGAZINE = "https://www.tatacliq.com/que";

export const TERMS_AND_CONDITION_URL = "/terms-of-use";
export const ABOUT_US_URL = "/aboutus";
export const PRIVACY_POLICY_URL = "/privacy-policy";
export const CANCEL_URL = "/cancellation-faq";
export const RETURN_URL = "/returns-faq";
export const FAQ_URL = "/faq-page";
export const HELP_URL = "/help";
export const CONTACT_URL = "/contact";
export const BUYER_POLICY_URL = "/buyer-policies";

// constants for payments method
export const EASY_MONTHLY_INSTALLMENTS = "Easy monthly installments";
export const NET_BANKING_PAYMENT_MODE = "Netbanking";
export const SAVED_CARD_PAYMENT_MODE = "Saved Cards";
export const EMI = "EMI";
export const NO_COST_EMI = "No Cost EMI";
export const STANDARD_EMI = "Standard EMI";
export const CREDIT_CARD = "Credit Card";
export const DEBIT_CARD = "Debit Card";
export const E_WALLET = "E - Wallet";
export const PAYPAL = "PayPal";
export const E_WALLET_PAYPAL = "PayPal";
export const CASH_ON_DELIVERY_PAYMENT_MODE = "Cash on Delivery";
export const RUPEE_SYMBOL = "₹";

// META TAGS CONSTANTS

export const GOOGLE_TAG_TITLE_DEFAULT =
  "Online Shopping Site in India - Upto 60% Off On Mobiles, Electronics & Fashion at Tata CLiQ";
export const GOOGLE_TAG_IMAGE_DEFAULT =
  "https://assets.tatacliq.com/medias/sys_master/images/10963640156190.jpg";
export const TWITTER_TAG_TITLE_DEFAULT = GOOGLE_TAG_TITLE_DEFAULT;
export const TWITTER_TAG_IMAGE_DEFAULT = GOOGLE_TAG_IMAGE_DEFAULT;
export const FACEBOOK_TAG_IMAGE_DEFAULT = GOOGLE_TAG_IMAGE_DEFAULT;
export const TITLE_DEFAULT = GOOGLE_TAG_TITLE_DEFAULT;

// card type
export const RUPAY_CARD = "RUPAY";
export const VISA_CARD = "VISA";
export const MASTER_CARD = "MASTERCARD";
export const MASTER = "MASTER";
export const AMEX_CARD = "AMEX";
export const MESTRO_CARD = "MAESTRO";
export const DINERS_CARD = "DINERS";
export const DISCOVER_CARD = "DISCOVER";
export const JCB_CARD = "JCB";

export const INVALID_USER_COUPON_TYPE = "COUPON";
export const INVALID_BANK_OFFER_TYPE = "BANKOFFER";
export const INVALID_NO_COST_EMI_TYPE = "NOCOSTEMI";

export const SELECTED_BANK_NAME = "selectedBankName";
//add address Constants

export const SAVE_TEXT = "Save Address";
export const PINCODE_TEXT = "Please enter pincode";
export const NAME_TEXT = "Please enter first name";
export const LAST_NAME_TEXT = "Please enter last name";
export const ADDRESS_TEXT = "Please enter address";
export const ADDRESS_MINLENGTH_VALID_TEXT =
  "Minimum address length is 15 characters";
export const ADDRESS_MAXLENGTH_VALID_TEXT =
  "Address should not exceed 120 characters";
export const ADDRESS_VALIDATION_TEXT =
  "Special characters accepted are - # & ( ) ' ' . ,  / \\ + _ . Please remove other special characters";
export const EMAIL_TEXT = "Please enter email id";
export const LANDMARK_TEXT = "Please select landmark";
export const LANDMARK_ENTER_TEXT = "Please enter landmark";
export const MOBILE_TEXT = "Please enter mobile number";
export const PINCODE_VALID_TEXT = "Please enter valid pincode";
export const EMAIL_VALID_TEXT = "Please enter valid emailId";
export const PHONE_VALID_TEXT = "Please fill valid mobile number";
export const PHONE_TEXT = "Please enter mobile number";
export const CITY_TEXT = "please enter city";
export const STATE_TEXT = "please enter state";
export const SELECT_ADDRESS_TYPE = "please select address type";
export const ISO_CODE = "IN";
export const OTHER_LANDMARK = "other";
export const OTP_VERIFICATION_REQUIRED_CODE = "NU0002";
export const RESET_PASSWORD_SUCCESS_MESSAGE =
  "Password reset successfully. Kindly login with your new password";
export const OTP_VERIFICATION_REQUIRED_TEXT = "OTP VERIFICATION REQUIRED";
export const STORE_NOT_AVAILABLE_TEXT = "Store not available";
export const BACK_END_ISSUE_ERROR_MESSAGE =
  "An exception occurred at back-end.";
export const TOAST_MESSAGE_AFTER_MERGE_CART =
  "Your bag contains product from your last visit";
export const EMAIL_ID_ALREADY_NOT_EXIST_SIGN_UP =
  "Email Id already exists, please try with another email Id!";
export const EMAIL_SENT_SUCCESS_MESSAGE = "Email sent successfully";
export const FEMALE = "FEMALE";
export const MALE = "MALE";

export const CLIQ_CASH_APPLIED_LOCAL_STORAGE = "cliqCashApplied";
export const IFSC_PATTERN = /^[A-Za-z]{4}0[A-Z0-9a-z]{6}$/;
export const ACCOUNT_NUMBER = "Please enter account number";
export const RE_ENTER_ACCOUNT_NUMBER = "Please re-enter account number";
export const ACCOUNT_NUMBER_MATCH_TEXT = "Account number did not match";
export const ACCOUNT_HOLDER_NAME = "Please enter account holder name";
export const BANK_NAME = "Please enter bank name";
export const IFSC_CODE_TEXT = "Please enter ifsc code";
export const IFSC_CODE_VALID_TEXT = "Please enter valid ifsc code";
export const REFUND_MODE_TEXT = "please select refund mode";
export const ADDRESS_VALIDATION = /^[\\&()''+_#./0-9a-zA-Z\s,-]{15,}$/;
export const NAME_VALIDATION = /^[A-Za-z ]+$/;

export const AMP_BRAND_AND_CATEGORY_REG_EX = /\/[a-zA-z0-9-]+\/c-msh[0-9a-zA-Z]+\/b-mbh[0-9a-zA-Z]+/;
export const AMP_BRAND_REG_EX = /\/[a-zA-z0-9-]+\/c-mbh[0-9a-zA-Z]+/;
export const AMP_CATEGORY_REG_EX = /\/[a-zA-z0-9-]+\/c-msh[0-9a-zA-Z]+/;
export const AMP_SEARCH_REG_EX = /\/search\//;
export const AMP_PRODUCT_CODE_REG_EX = /\/p-mp[0-9]+/;

export const TIME_OUT_FOR_APIS = 5000;
export const LOW_INTERNET_CONNECTION_MESSAGE =
  "Slow Internet Connection Detected";
export const MODE_OF_RETURN = "Select mode of return";
export const REFUND_DETAILS = "Refund Details";
export const SELECTED_DELIVERY_MODE = "selectedDeliverMode";
export const PINCODE_NOT_SERVICEABLE_TEXT =
  "We are sorry, this pincode is not serviceable. Please enter another pincode.";
export const BUY_NOW_PRODUCT_DETAIL = "buyNowTempProduct";
export const DEFAULT_PINCODE = 110001;
export const BANK_OFFER_TYPE = "bankOffer";
export const NCE_OFFER_TYPE = "nceOfferType";
export const OFFER_ERROR_PAYMENT_MODE_TYPE = "paymentModeType";

export const BUY_NOW_ERROR_MESSAGE = "Something Went wrong.Please try again";

export const BANK_OFFER_COMPONENT_NAME_HC = "bankOfferComponent";
export const MULTIPLE_BANNER_COMPONENT_NAME_HC = "multipleBannerComponent";
export const QUICK_LINKS_COMPONENT_NAME_HC = "quickLinksComponent";
export const HARD_CODED_KEY_FOR_COMPONENT = "singleBannerComponent";
export const IS_COMING_FOR_REVIEW_PAGE = "isComingForProductReview";

export const DESKTOP_THEME_OFFER_CN = "desktopThemeOfferComponent";
export const THEME_OFFER_CN = "themeOffersComponent";
