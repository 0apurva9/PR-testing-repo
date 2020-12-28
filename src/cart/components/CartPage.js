import React from "react";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import CheckoutStaticSection from "./CheckoutStaticSection.js";
import PropTypes from "prop-types";
import queryString from "query-string";
import SecondaryLoader from "../../general/components/SecondaryLoader";
import DesktopCheckout from "./DesktopCheckout.js";
import MobileOnly from "../../general/components/MobileOnly";
import DesktopOnly from "../../general/components/DesktopOnly";
import UnderLinedButton from "../../general/components/UnderLinedButton";
import CartItemForDesktop from "./CartItemForDesktop";
import Button from "../../general/components/Button.js";
import { renderMetaTagsWithoutSeoObject } from "../../lib/seoUtils";
import {
  HOME_ROUTER,
  NO,
  BANK_COUPON_COOKIE,
  ORDER_ID_FOR_ORDER_CONFIRMATION_PAGE,
  ORDER_ID_FOR_PAYMENT_CONFIRMATION_PAGE,
  BUY_NOW_PRODUCT_DETAIL,
  SUCCESS,
  CNC_CART,
  SELECTED_STORE,
  DEFAULT_PIN_CODE_ID_LOCAL_STORAGE,
  AC_CART_EXCHANGE_DETAILS
} from "../../lib/constants";
import SavedProduct from "./SavedProduct";
import filter from "lodash.filter";
import { Redirect } from "react-router-dom";
import TextWithUnderLine from "./TextWithUnderLine.js";
import EmptyBag from "./EmptyBag.js";
import {
  CUSTOMER_ACCESS_TOKEN,
  LOGGED_IN_USER_DETAILS,
  GLOBAL_ACCESS_TOKEN,
  CART_DETAILS_FOR_LOGGED_IN_USER,
  CART_DETAILS_FOR_ANONYMOUS,
  ANONYMOUS_USER,
  CHECKOUT_ROUTER,
  LOGIN_PATH,
  DEFAULT_PIN_CODE_LOCAL_STORAGE,
  YES,
  YOUR_BAG,
  MY_ACCOUNT_PAGE,
  SAVE_LIST_PAGE,
  CART_BAG_DETAILS
} from "../../lib/constants";
import * as Cookie from "../../lib/Cookie";
import {
  setDataLayerForCartDirectCalls,
  ADOBE_CALLS_FOR_ON_CLICK_CHECKOUT,
  ADOBE_DIRECT_CALL_FOR_CONTINUE_SHOPPING,
  ADOBE_DIRECT_CALL_FOR_CART_SAVED_LIST,
  setDataLayer,
  ADOBE_MDE_CLICK_ON_CHECKOUT_BTN_CART_WITH_EXCHANGE
} from "../../lib/adobeUtils";
import * as UserAgent from "../../lib/UserAgent.js";
import SaveAndSecure from "../../general/components/SaveAndSecure";
import styles from "./CartPage.css";
import CliqandPiqModal from "../../pdp//components/CliqandPiqModal.js";
import ModalPanel from "../../general/components/ModalPanel.js";
import { setTracker, VIEW_CART } from "../../lib/onlinesalesUtils";
import Icon from "../../xelpmoc-core/Icon";
import discountIcon from "../../pdp/components/img/discountIcon.svg";
const DISCLAIMER =
  "Safe and secure payments. Easy returns. 100% Authentic products.";
const PRODUCT_NOT_SERVICEABLE_MESSAGE =
  "Product is not Serviceable, Please try with another pin code";
const CHECKOUT_BUTTON_TEXT = "Continue";
const CHECKOUT__TEXT = "Checkout";
export const CLIQ_AND_PIQ_CART_CODE = "cliqAndPiqCartCode";
export const CLIQ_AND_PIQ_CART_ID = "cliqAndPiqCartId";
class CartPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pinCode: "",
      isServiceable: false,
      changePinCode: false,
      appliedCouponCode: null,
      showCheckoutSection: true,
      isComingFromCliqAndPiq: false,
      appliancesExchangePincodeData: null
    };
  }
  showHideDetails = () => {
    window.scroll({
      top:
        document &&
        document.body &&
        document.body.offsetHeight - window.innerHeight - 230,
      behavior: "smooth"
    });
  };
  navigateToHome() {
    setDataLayerForCartDirectCalls(ADOBE_DIRECT_CALL_FOR_CONTINUE_SHOPPING);
    this.props.history.push(HOME_ROUTER);
  }
  displayCoupons = () => {
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    const globalCookie = Cookie.getCookie(GLOBAL_ACCESS_TOKEN);
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const cartDetailsLoggedInUser = Cookie.getCookie(
      CART_DETAILS_FOR_LOGGED_IN_USER
    );
    const cartDetailsAnonymous = Cookie.getCookie(CART_DETAILS_FOR_ANONYMOUS);
    if (
      userDetails !== undefined &&
      customerCookie !== undefined &&
      cartDetailsLoggedInUser !== undefined
    ) {
      this.props.displayCouponsForLoggedInUser(
        JSON.parse(userDetails).userName,
        JSON.parse(customerCookie).access_token,
        JSON.parse(cartDetailsLoggedInUser).guid
      );
    }
    if (globalCookie !== undefined && cartDetailsAnonymous !== undefined) {
      this.props.displayCouponsForAnonymous(
        ANONYMOUS_USER,
        JSON.parse(globalCookie).access_token,
        cartDetailsAnonymous && JSON.parse(cartDetailsAnonymous).guid
      );
    }
  };
  componentDidMount() {
    //localStorage.removeItem(SELECTED_STORE);
    if (localStorage.getItem("cartPromotionText")) {
      let msg = localStorage.getItem("cartPromotionText");
      this.props.displayToast(msg);
    }
    document.title = "Shopping Cart - TATA CLiQ ";
    // this.props.getWishListItems();
    this.props.getWishlist();
    this.props.getUserAddress();
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    const globalCookie = Cookie.getCookie(GLOBAL_ACCESS_TOKEN);
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const cartDetailsLoggedInUser = Cookie.getCookie(
      CART_DETAILS_FOR_LOGGED_IN_USER
    );
    const cartDetailsAnonymous = Cookie.getCookie(CART_DETAILS_FOR_ANONYMOUS);

    const defaultPinCode = localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE);
    if (
      userDetails !== undefined &&
      customerCookie !== undefined &&
      cartDetailsLoggedInUser !== undefined
    ) {
      if (JSON.parse(cartDetailsLoggedInUser).isBuyNowCart) {
        localStorage.removeItem(BUY_NOW_PRODUCT_DETAIL);
      }
      let cliqPiqCartCode, cliqPiqCartId;
      if (
        this.props.location &&
        this.props.location.state &&
        this.props.location.state.isFromCliqAndPiq
      ) {
        cliqPiqCartCode =
          this.props.location &&
          this.props.location.state &&
          this.props.location.state.isCliqAndPiqCartCode
            ? this.props.location.state.isCliqAndPiqCartCode
            : JSON.parse(localStorage.getItem(CLIQ_AND_PIQ_CART_CODE));
        cliqPiqCartId =
          this.props.location &&
          this.props.location.state &&
          this.props.location.state.isCliqAndPiqCartGuid
            ? this.props.location.state.isCliqAndPiqCartGuid
            : JSON.parse(localStorage.getItem(CLIQ_AND_PIQ_CART_ID));
        this.setState({ isComingFromCliqAndPiq: true });
      }
      this.props.getCartDetails(
        JSON.parse(userDetails).userName,
        JSON.parse(customerCookie).access_token,
        cliqPiqCartCode
          ? cliqPiqCartCode
          : JSON.parse(cartDetailsLoggedInUser).code,
        defaultPinCode
      );

      // if (localStorage.getItem(CART_BAG_DETAILS)) {
      //   this.props.displayCouponsForLoggedInUser(
      //     JSON.parse(userDetails).userName,
      //     JSON.parse(customerCookie).access_token,
      //     JSON.parse(cartDetailsLoggedInUser).guid
      //   );
      // }
    } else {
      if (globalCookie !== undefined && cartDetailsAnonymous !== undefined) {
        this.props.getCartDetails(
          ANONYMOUS_USER,
          JSON.parse(globalCookie).access_token,
          JSON.parse(cartDetailsAnonymous).guid,
          defaultPinCode
        );
      }
    }
    // delete bank coupon localstorage if it is exits.
    // because we user can not have bank offer cookie on cart page
    // this code is not working need to comment for build hotFix_v1.1.7
    // this.getPaymentModes();
    if (localStorage.getItem(BANK_COUPON_COOKIE)) {
      localStorage.removeItem(BANK_COUPON_COOKIE);
    }
    if (localStorage.getItem(ORDER_ID_FOR_ORDER_CONFIRMATION_PAGE)) {
      localStorage.removeItem(ORDER_ID_FOR_ORDER_CONFIRMATION_PAGE);
    }
    if (localStorage.getItem(ORDER_ID_FOR_PAYMENT_CONFIRMATION_PAGE)) {
      localStorage.removeItem(ORDER_ID_FOR_PAYMENT_CONFIRMATION_PAGE);
    }
    // writting below code because of existing issue
    // cartDetails cookie sometimes not available because of that even if cart exists , cart page shown as blank
    // reference bug - https://tataunistore.atlassian.net/browse/MDEQ-96
    // logged in user, not having cart details
    if (!cartDetailsLoggedInUser && userDetails) {
      this.getCartCodeAndGuid(userDetails, customerCookie, defaultPinCode);
    }
  }

  async getCartCodeAndGuid(userDetails, customerCookie, defaultPinCode) {
    let response = await this.props.getCartCodeAndGuidForLoggedInUser();
    if (
      response &&
      response.status === "Success" &&
      response.count > 0 &&
      response.code
    ) {
      this.props.getCartDetails(
        JSON.parse(userDetails).userName,
        JSON.parse(customerCookie).access_token,
        response.code,
        defaultPinCode
      );
      Cookie.createCookie(
        CART_DETAILS_FOR_LOGGED_IN_USER,
        JSON.stringify(response)
      );
    }
  }

  componentWillReceiveProps(nextProps) {
    let cartCouponCode =
      nextProps.cart &&
      nextProps.cart.cartDetails &&
      nextProps.cart.cartDetails.appliedCoupon
        ? nextProps.cart.cartDetails.appliedCoupon
        : undefined;
    this.setState({
      appliedCouponCode: cartCouponCode
    });
    if (
      nextProps.location &&
      nextProps.location.state &&
      nextProps.location.state.isFromCliqAndPiq
    ) {
      this.setState({ isComingFromCliqAndPiq: true });
    }
    if (this.props.cart.coupons !== nextProps.cart.coupons) {
      let couponDetails =
        nextProps.cart && Object.assign(nextProps.cart.coupons, nextProps);
      this.props.showCouponModal(couponDetails);
    }

    if (
      nextProps.appliancesExchangePincodeDetails &&
      nextProps.appliancesExchangePincodeDetails.status &&
      nextProps.appliancesExchangePincodeDetails !==
        this.state.appliancesExchangePincodeData
    ) {
      this.setState({
        appliancesExchangePincodeData:
          nextProps.appliancesExchangePincodeDetails
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    this.props.setHeaderText(YOUR_BAG);
    if (prevProps.cart) {
      if (
        this.props.location.state &&
        this.props.location.state.isClickOnAddToBag
      ) {
        window.scrollTo(
          0,
          document.body.scrollHeight - window.outerHeight - 100
        );
      }
      if (prevProps.cart.cartDetails !== this.props.cart.cartDetails) {
        // Track Cart details
        setTracker(VIEW_CART, this.props.cart.cartDetails);
        let productServiceAvailability = filter(
          this.props.cart &&
            this.props.cart.cartDetails &&
            this.props.cart.cartDetails.products,
          product => {
            return (
              product.isGiveAway === NO &&
              (product.pinCodeResponse === undefined ||
                (product.pinCodeResponse &&
                  product.pinCodeResponse.isServicable === "N") ||
                product.isOutOfStock)
            );
          }
        );

        if (productServiceAvailability.length > 0) {
          this.setState({
            isServiceable: false
          });
        } else {
          this.setState({
            isServiceable: true
          });
        }
      }
    }
    if (this.props.cart.cartDetails !== prevProps.cart.cartDetails) {
      let cartExchangeDetails = localStorage.getItem(AC_CART_EXCHANGE_DETAILS);
      let parsedExchangeDetails =
        cartExchangeDetails && JSON.parse(cartExchangeDetails);
      if (parsedExchangeDetails && parsedExchangeDetails.length > 0) {
        let exchangeProductUssids = parsedExchangeDetails.map(
          exchangeProduct => {
            return exchangeProduct.ussid;
          }
        );
        let productIds = [];
        exchangeProductUssids.map(exchangeProductUssid => {
          this.props.cart.cartDetails &&
            this.props.cart.cartDetails.products.map(product => {
              if (product.USSID === exchangeProductUssid) {
                productIds.push(product.productcode);
              }
            });
        });
        let productIdList = productIds.join(",");
        const pincode = localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE);
        this.props.appliancesExchangeCheckPincode(productIdList, pincode);
      }
    }
  }
  renderLoader = () => {
    return (
      <div className={styles.cartLoader}>
        <div className={styles.spinner}>
          <SecondaryLoader />
        </div>
      </div>
    );
  };

  removeItemFromCart = (
    entryNumber,
    mainProductUssid,
    isForDigitalBundledProduct
  ) => {
    const pinCode = localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE);
    let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    if (userDetails) {
      if (this.props.removeItemFromCartLoggedIn) {
        this.props.removeItemFromCartLoggedIn(
          entryNumber,
          pinCode,
          mainProductUssid,
          isForDigitalBundledProduct
        );
      }
    } else {
      if (this.props.removeItemFromCartLoggedOut) {
        this.props.removeItemFromCartLoggedOut(
          entryNumber,
          pinCode,
          mainProductUssid,
          isForDigitalBundledProduct
        );
      }
    }
  };

  updateQuantityInCart = (selectedItem, quantity) => {
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    if (userDetails) {
      if (this.props.updateQuantityInCartLoggedIn) {
        this.props.updateQuantityInCartLoggedIn(
          selectedItem,
          quantity,
          localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE)
        );
      }
    } else {
      if (this.props.updateQuantityInCartLoggedOut) {
        this.props.updateQuantityInCartLoggedOut(
          selectedItem,
          quantity,
          localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE)
        );
      }
    }
  };

  releaseCoupon = couponCode => {
    if (this.props.releaseCoupon) {
      this.props.releaseCoupon();
    }
  };
  redirectToSaveList = () => {
    setDataLayerForCartDirectCalls(ADOBE_DIRECT_CALL_FOR_CART_SAVED_LIST);
    this.props.history.push(`${MY_ACCOUNT_PAGE}${SAVE_LIST_PAGE}`);
  };
  getPaymentModes = () => {
    if (
      (this.props.location &&
        this.props.location.state &&
        this.props.location.state.egvCartGuid) ||
      (this.state.isGiftCard && this.state.egvCartGuid)
    ) {
      let egvGiftCartGuId;
      if (this.state.egvCartGuid) {
        egvGiftCartGuId = this.state.egvCartGuid;
      } else {
        egvGiftCartGuId = this.props.location.state.egvCartGuid;
      }
      this.props.getPaymentModes(egvGiftCartGuId);
    } else {
      let cartGuId;
      const parsedQueryString = queryString.parse(this.props.location.search);
      if (parsedQueryString.value) {
        cartGuId = parsedQueryString.value;
      } else {
        let cartDetails = Cookie.getCookie(CART_DETAILS_FOR_LOGGED_IN_USER);
        if (cartDetails) {
          cartGuId = JSON.parse(cartDetails).guid;
        }
      }
      this.props.getPaymentModes(cartGuId);
    }
  };

  // goToCouponPage = () => {
  //   let couponDetails = Object.assign(this.props.cart.coupons, this.props);
  //   this.props.showCouponModal(couponDetails);
  // };
  navigateToLogin() {
    const url = this.props.location.pathname;
    if (this.props.setUrlToRedirectToAfterAuth) {
      this.props.setUrlToRedirectToAfterAuth(url);
    }
    if (UserAgent.checkUserAgentIsMobile()) {
      this.props.history.push(LOGIN_PATH);
    } else {
      if (this.props.showAuthPopUp) {
        this.props.showAuthPopUp();
      }
      return null;
    }
  }
  onClickImage(productCode) {
    if (productCode) {
      this.props.history.push(`/p-${productCode.toLowerCase()}`);
    }
  }
  renderToCheckOutPage(productExchangeServiceable) {
    // if product has exchange available
    if (
      productExchangeServiceable &&
      productExchangeServiceable.includes(true)
    ) {
      setDataLayer(ADOBE_MDE_CLICK_ON_CHECKOUT_BTN_CART_WITH_EXCHANGE);
    }
    let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);

    if (!customerCookie || !userDetails) {
      setDataLayerForCartDirectCalls(ADOBE_CALLS_FOR_ON_CLICK_CHECKOUT);
      return this.navigateToLogin();
    }
    let pinCode = localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE);

    if (pinCode && this.state.isServiceable === true) {
      setDataLayerForCartDirectCalls(ADOBE_CALLS_FOR_ON_CLICK_CHECKOUT);
      this.navigateToCheckout = true;
      if (
        this.props.location &&
        this.props.location.state &&
        this.props.location.state.isFromCliqAndPiq
      ) {
        this.props.history.push({
          pathname: CHECKOUT_ROUTER,
          state: {
            isFromCliqAndPiq: true
          }
        });
      } else {
        this.props.history.push({
          pathname: CHECKOUT_ROUTER
        });
      }
    }
    if (!pinCode) {
      this.props.displayToast("Please enter Pin code / Zip code");
    } else if (!this.state.isServiceable) {
      this.props.displayToast(PRODUCT_NOT_SERVICEABLE_MESSAGE);
    }
  }

  checkPinCodeAvailability = (val, addressId = "") => {
    this.setState({
      pinCode: val,
      changePinCode: false,
      showCheckoutSection: true
    });
    let storeDetails = localStorage.getItem(SELECTED_STORE);
    if (
      storeDetails &&
      localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE) !== val
    ) {
      localStorage.removeItem(SELECTED_STORE);
    }
    localStorage.setItem(DEFAULT_PIN_CODE_LOCAL_STORAGE, val);
    localStorage.setItem(DEFAULT_PIN_CODE_ID_LOCAL_STORAGE, addressId);
    let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    let globalCookie = Cookie.getCookie(GLOBAL_ACCESS_TOKEN);
    let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    let cartDetailsLoggedInUser = Cookie.getCookie(
      CART_DETAILS_FOR_LOGGED_IN_USER
    );
    let cartDetailsAnonymous = Cookie.getCookie(CART_DETAILS_FOR_ANONYMOUS);
    let cliqPiqCartCode;
    if (
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.isFromCliqAndPiq
    ) {
      cliqPiqCartCode =
        this.props.location &&
        this.props.location.state &&
        this.props.location.state.isCliqAndPiqCartCode
          ? this.props.location.state.isCliqAndPiqCartCode
          : JSON.parse(localStorage.getItem(CLIQ_AND_PIQ_CART_CODE));
    }

    if (userDetails) {
      this.props.getCartDetails(
        JSON.parse(userDetails).userName,
        JSON.parse(customerCookie).access_token,
        cliqPiqCartCode
          ? cliqPiqCartCode
          : JSON.parse(cartDetailsLoggedInUser).code,
        val,
        true // this is for setting data layer for change pincode
      );
    } else {
      this.props.getCartDetails(
        ANONYMOUS_USER,
        JSON.parse(globalCookie).access_token,
        JSON.parse(cartDetailsAnonymous).guid,
        val,
        true // this is for setting data layer for change pincode
      );
    }
  };

  goToWishList = () => {
    if (this.props.history) {
      const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
      const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
      if (!userDetails || !customerCookie) {
        const url = `${MY_ACCOUNT_PAGE}${SAVE_LIST_PAGE}`;
        if (this.props.setUrlToRedirectToAfterAuth) {
          this.props.setUrlToRedirectToAfterAuth(url);
        }
        if (UserAgent.checkUserAgentIsMobile()) {
          this.props.history.push(LOGIN_PATH);
        } else {
          if (this.props.showAuthPopUp) {
            this.props.showAuthPopUp();
            return null;
          }
        }
      } else {
        this.props.history.push(`${MY_ACCOUNT_PAGE}${SAVE_LIST_PAGE}`);
      }
    }
  };

  changePinCode = () => {
    // show modal for address here
    this.props.addressModal({
      addressModalForCartPage: true,
      labelText: "Submit",
      checkPinCodeAvailability: (pinCode, addressId) =>
        this.checkPinCodeAvailability(pinCode, addressId)
    });
  };
  renderBankOffers = () => {
    if (
      this.props.cart.paymentModes &&
      this.props.cart.paymentModes.paymentOffers &&
      this.props.cart.paymentModes.paymentOffers.coupons
    ) {
      return (
        <div className={styles.card}>
          <div className={styles.content}>
            <div className={styles.cardHeading}>Bank Offers</div>
            {this.props.cart.paymentModes.paymentOffers.coupons.map(
              (val, i) => {
                return (
                  <div className={styles.row} key={i}>
                    <div className={styles.bankOfferHeading}>
                      {val.offerTitle}
                    </div>
                    <div className={styles.bankOfferText}>
                      {val.offerDescription}
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      );
    }
  };

  renderEmptyBag = () => {
    let defaultPinCode = localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE);
    const getPinCode =
      this.props &&
      this.props.cart &&
      this.props.cart.userAddress &&
      this.props.cart.userAddress.addresses &&
      this.props.cart.userAddress.addresses[0] &&
      this.props.cart.userAddress.addresses[0].postalCode;

    const city =
      this.props &&
      this.props.cart &&
      this.props.cart.cartDetails &&
      this.props.cart.cartDetails.products &&
      this.props.cart.cartDetails.products[0].pinCodeResponse &&
      this.props.cart.cartDetails.products[0].pinCodeResponse.city;

    return (
      <div className={styles.base}>
        <DesktopOnly>
          <div className={styles.changePinCodeHolder}>
            <div className={styles.checkHolder}>
              <div className={styles.myBagTitle}>My Bag</div>
              {!defaultPinCode && (
                <div className={styles.dummyTextForPinCode}>
                  <span>Enter Pincode to check</span>
                  <span className={styles.bold}> Delivery Option.</span>
                </div>
              )}
              <div
                className={
                  !defaultPinCode
                    ? styles.inputAndButtonHolder
                    : styles.forDefault
                }
              >
                <div className={styles.inputAndButton}>
                  <TextWithUnderLine
                    onClick={() => this.changePinCode()}
                    buttonLabel="Change PIN code"
                    checkPinCodeAvailability={pinCode =>
                      this.checkPinCodeAvailability(pinCode)
                    }
                    onFocusInput={() => this.onFocusInput()}
                    onBlur={() => this.onBlur()}
                    onKeyPress={e => this.onKeyPress()}
                    ovalButton={true}
                    getPinCode={getPinCode}
                    city={city}
                  />
                </div>
                {renderMetaTagsWithoutSeoObject()}
              </div>
            </div>
          </div>
          <div className={styles.pageCenter}>
            <div className={styles.emptyBagHolder}>
              <EmptyBag
                onContinueShopping={() => this.navigateToHome()}
                viewSavedProduct={() => this.goToWishList()}
              />
            </div>
          </div>
        </DesktopOnly>
        <MobileOnly>
          <div className={styles.content}>
            <TextWithUnderLine
              heading={
                defaultPinCode && defaultPinCode !== "undefined"
                  ? `Pincode-${defaultPinCode}`
                  : "Enter Pincode"
              }
              boxShadow={
                defaultPinCode && defaultPinCode !== "undefined" ? true : false
              }
              onClick={() => this.changePinCode()}
              buttonLabel="Change"
            />
          </div>

          <div className={styles.pageCenter}>
            <div className={styles.content}>
              <EmptyBag
                onContinueShopping={() => this.navigateToHome()}
                viewSavedProduct={() => this.goToWishList()}
              />
            </div>
          </div>
        </MobileOnly>
      </div>
    );
  };

  onFocusInput() {
    this.setState({ showCheckoutSection: false });
  }
  onBlur() {
    this.setState({ showCheckoutSection: true });
  }

  onKeyPress() {
    this.setState({ showCheckoutSection: true });
  }
  getAllStores = async selectedProductsUssId => {
    const defalutPinCode = localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE);
    let getAllStoresCNCResponse = await this.props.getAllStoresCNC(
      defalutPinCode
    );
    if (getAllStoresCNCResponse.status === SUCCESS) {
      this.renderCliqAndPiq(selectedProductsUssId);
    }
  };
  renderCliqAndPiq(selectedProductsUssId) {
    let currentSelectedProduct =
      this.props.cart &&
      this.props.cart.cartDetails &&
      this.props.cart.cartDetails.products &&
      this.props.cart.cartDetails.products.find(product => {
        return product.USSID === selectedProductsUssId;
      });
    const firstSlaveData =
      currentSelectedProduct &&
      currentSelectedProduct.pinCodeResponse &&
      currentSelectedProduct.pinCodeResponse.validDeliveryModes;
    let cliqAndPiqDetails = {};
    cliqAndPiqDetails.from = "Cart";
    cliqAndPiqDetails.stores = this.props.cart.storeDetails;
    cliqAndPiqDetails.productDetails = currentSelectedProduct;
    cliqAndPiqDetails.winningUssID = currentSelectedProduct.USSID;
    cliqAndPiqDetails.pinCodeUpdateDisabled = true;
    cliqAndPiqDetails.pincodeResponse = firstSlaveData;
    cliqAndPiqDetails.pincode = localStorage.getItem(
      DEFAULT_PIN_CODE_LOCAL_STORAGE
    );
    this.props.showPdpCliqAndPiqPage(cliqAndPiqDetails);
  }
  render() {
    const getPinCode =
      this.props &&
      this.props.cart &&
      this.props.cart.userAddress &&
      this.props.cart.userAddress.addresses &&
      this.props.cart.userAddress.addresses[0] &&
      this.props.cart.userAddress.addresses[0].postalCode;
    const city =
      this.props &&
      this.props.cart &&
      this.props.cart.cartDetails &&
      this.props.cart.cartDetails.products &&
      this.props.cart.cartDetails.products[0].pinCodeResponse &&
      this.props.cart.cartDetails.products[0].pinCodeResponse.city;
    const globalAccessToken = Cookie.getCookie(GLOBAL_ACCESS_TOKEN);
    const cartDetailsForAnonymous = Cookie.getCookie(
      CART_DETAILS_FOR_ANONYMOUS
    );
    if (
      this.props.cart.loadingForDisplayCoupon ||
      this.props.cart.loadingForCartDetail
    ) {
      return this.renderLoader();
    } else {
      if (this.props.cart.loading) {
        this.props.showSecondaryLoader();
      } else {
        this.props.hideSecondaryLoader();
      }
    }

    if (!globalAccessToken && !cartDetailsForAnonymous) {
      return <Redirect exact to={HOME_ROUTER} />;
    }
    if (this.props.cart.cartDetails && this.props.cart.cartDetails.products) {
      const cartDetails = this.props.cart.cartDetails;
      let defaultPinCode = localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE);

      let deliveryCharge = "0.00";
      let couponDiscount = "0.00";
      let totalDiscount = "0.00";
      if (cartDetails.products) {
        if (cartDetails.deliveryCharge) {
          deliveryCharge = cartDetails.deliveryCharge
            ? cartDetails.deliveryCharge
            : "0.00";
        }
        if (cartDetails.cartAmount.totalDiscountAmount) {
          totalDiscount = cartDetails.cartAmount.totalDiscountAmount.value
            ? Math.round(
                cartDetails.cartAmount.totalDiscountAmount.value * 100
              ) / 100
            : "0.00";
        }

        if (cartDetails.cartAmount.couponDiscountAmount) {
          couponDiscount = cartDetails.cartAmount.couponDiscountAmount.value
            ? Math.round(
                cartDetails.cartAmount.couponDiscountAmount.value * 100
              ) / 100
            : "0.00";
        }
      }
      let productExchangeServiceable = [];
      let isQuoteExpired = [];
      console.log(this.props);
      return (
        <div className={styles.base}>
          <MobileOnly>
            {this.state.showCheckoutSection &&
              cartDetails.products &&
              cartDetails.cartAmount && (
                <Checkout
                  amount={
                    cartDetails.cartAmount.paybleAmount &&
                    cartDetails.cartAmount.paybleAmount.formattedValue
                  }
                  disabled={!this.state.isServiceable}
                  onCheckout={() => this.renderToCheckOutPage()}
                  label={CHECKOUT_BUTTON_TEXT}
                  isOnCartPage={true}
                  changePinCode={this.changePinCode}
                  isFromMyBag={true}
                  showHideDetails={this.showHideDetails}
                />
              )}
          </MobileOnly>
          <DesktopOnly>
            <div className={styles.changePinCodeHolder}>
              <div className={styles.checkHolder}>
                <div className={styles.myBagTitle}>My Bag</div>
                {!defaultPinCode && (
                  <div className={styles.dummyTextForPinCode}>
                    <span>Enter Pincode to check</span>
                    <span className={styles.bold}> Delivery Option.</span>
                  </div>
                )}

                <div
                  className={
                    !defaultPinCode
                      ? styles.inputAndButtonHolder
                      : styles.forDefault
                  }
                >
                  <div className={styles.inputAndButton}>
                    <TextWithUnderLine
                      onClick={() => this.changePinCode()}
                      buttonLabel="Change PIN code"
                      checkPinCodeAvailability={pinCode =>
                        this.checkPinCodeAvailability(pinCode)
                      }
                      onFocusInput={() => this.onFocusInput()}
                      onBlur={() => this.onBlur()}
                      onKeyPress={e => this.onKeyPress()}
                      ovalButton={true}
                      getPinCode={getPinCode}
                      city={city}
                    />
                  </div>
                </div>
              </div>
            </div>
          </DesktopOnly>
          <MobileOnly>
            <div className={styles.content}>
              <TextWithUnderLine
                onClick={() => this.changePinCode()}
                buttonLabel="Change PIN code"
                checkPinCodeAvailability={pinCode =>
                  this.checkPinCodeAvailability(pinCode)
                }
                onFocusInput={() => this.onFocusInput()}
                onBlur={() => this.onBlur()}
                onKeyPress={e => this.onKeyPress()}
              />
            </div>
          </MobileOnly>
          <div className={styles.pageCenter}>
            <DesktopOnly>
              <div className={styles.offerText}>
                Apply a relevant <span>coupon code</span> here to avail any
                additional discount. Applicable <span>cashback</span> if any
                will be credited to your account as per T&C.
              </div>
            </DesktopOnly>

            {this.props.cart.cartDetails.cartAmount.comboDiscountAmount && (
              <div className={styles.discountDetails}>
                <div className={styles.discountIconContainer}>
                  <Icon image={discountIcon} size={24} />
                </div>
                <div className={styles.bundlingDiscountTextContainer}>
                  <span className={styles.bundlingDiscountText}>
                    Combo Offer Applied
                  </span>
                  <span className={styles.fontFamilyLight}>
                    {" "}
                    with{" "}
                    {/* {this.trimProductName(this.props.mainProductName)} */}
                  </span>
                </div>
              </div>
            )}

            <div className={styles.content}>
              <div className={styles.desktopBuffer}>
                {cartDetails.products &&
                  cartDetails.products.map((product, i) => {
                    // check if exchange avail then create array and send values to disable checkout button with isPickupAvailableForExchange is true/false
                    if (product.exchangeDetails && product.pinCodeResponse) {
                      productExchangeServiceable.push(
                        product.pinCodeResponse.isPickupAvailableForExchange
                      );
                      isQuoteExpired.push(product.exchangeDetails.quoteExpired);
                    }
                    let serviceable = false;
                    if (product.pinCodeResponse) {
                      if (product.pinCodeResponse.isServicable === YES) {
                        serviceable = true;
                      }
                    }

                    return (
                      <div className={styles.cartItem} key={i}>
                        <MobileOnly>
                          <CartItem
                            pinCode={defaultPinCode}
                            product={product}
                            productIsServiceable={serviceable}
                            productImage={product.imageURL}
                            productDetails={product.description}
                            productName={product.productName}
                            color={product.color}
                            size={product.size}
                            price={product.price}
                            offerPrice={product.offerPrice}
                            isGiveAway={product.isGiveAway}
                            index={i}
                            entryNumber={product.entryNumber}
                            deliveryInformation={product.elligibleDeliveryMode}
                            deliverTime={
                              product.elligibleDeliveryMode &&
                              product.elligibleDeliveryMode[0].desc
                            }
                            deliveryType={
                              product.elligibleDeliveryMode &&
                              product.elligibleDeliveryMode[0].code
                            }
                            productOutOfStock={
                              product.pinCodeResponse &&
                              product.pinCodeResponse.productOutOfStockMessage
                            }
                            productNotServiceable={
                              product.pinCodeResponse &&
                              product.pinCodeResponse
                                .productNotServiceabilityMessage
                            }
                            onRemove={this.removeItemFromCart}
                            onQuantityChange={this.updateQuantityInCart}
                            maxQuantityAllowed={
                              parseInt(product.maxQuantityAllowed, 10) <
                              product.availableStockCount
                                ? parseInt(product.maxQuantityAllowed, 10)
                                : product.availableStockCount
                            }
                            isOutOfStock={product.isOutOfStock}
                            qtySelectedByUser={product.qtySelectedByUser}
                            isClickable={false}
                            onClickImage={() =>
                              this.onClickImage(product.productcode)
                            }
                          />
                        </MobileOnly>
                        <DesktopOnly>
                          <CartItemForDesktop
                            isCod={
                              product.pinCodeResponse &&
                              product.pinCodeResponse.cod
                            }
                            isFromCnc={
                              (this.props.location &&
                                this.props.location.state &&
                                this.props.location.state.isFromCliqAndPiq) ||
                              this.state.isComingFromCliqAndPiq
                                ? true
                                : false
                            }
                            pinCode={defaultPinCode}
                            product={product}
                            productIsServiceable={serviceable}
                            productImage={product.imageURL}
                            productDetails={product.description}
                            productName={product.productName}
                            color={product.color}
                            size={product.size}
                            price={product.price}
                            offerPrice={product.offerPrice}
                            isGiveAway={product.isGiveAway}
                            index={i}
                            entryNumber={product.entryNumber}
                            deliveryInformation={product.elligibleDeliveryMode}
                            deliverTime={
                              product.elligibleDeliveryMode &&
                              product.elligibleDeliveryMode[0].desc
                            }
                            deliveryInformationWithDate={
                              product.pinCodeResponse &&
                              product.pinCodeResponse.validDeliveryModes
                            }
                            productOutOfStocks={
                              product.pinCodeResponse &&
                              product.pinCodeResponse.productOutOfStockMessage
                            }
                            productNotServiceable={
                              product.pinCodeResponse &&
                              product.pinCodeResponse
                                .productNotServiceabilityMessage
                            }
                            onPiq={() => this.getAllStores(product.USSID)}
                            sizeType={product.isSizeOrLength}
                            deliveryType={
                              product.elligibleDeliveryMode &&
                              product.elligibleDeliveryMode[0].code
                            }
                            onRemove={this.removeItemFromCart}
                            onQuantityChange={this.updateQuantityInCart}
                            maxQuantityAllowed={
                              parseInt(product.maxQuantityAllowed, 10) <
                              product.availableStockCount
                                ? parseInt(product.maxQuantityAllowed, 10)
                                : product.availableStockCount
                            }
                            isOutOfStock={product.isOutOfStock}
                            qtySelectedByUser={product.qtySelectedByUser}
                            isClickable={false}
                            onClickImage={() =>
                              this.onClickImage(product.productcode)
                            }
                            showExchangeTnCModal={
                              this.props.showExchangeTnCModal
                            }
                            showRemoveExchangeModal={data =>
                              this.props.showRemoveExchangeModal(data)
                            }
                            cartGuid={cartDetails.cartGuid}
                            isTop={false}
                            inCartPage={true}
                            storeDetails={product.storeDetails}
                            verifyIMEINumber={(
                              IMEINumber,
                              exchangeProductId,
                              exchangeAmountCashify,
                              tulBump,
                              pickUpCharge,
                              listingId,
                              ussId,
                              guid,
                              entry
                            ) =>
                              this.props.verifyIMEINumber(
                                IMEINumber,
                                exchangeProductId,
                                exchangeAmountCashify,
                                tulBump,
                                pickUpCharge,
                                listingId,
                                ussId,
                                guid,
                                entry
                              )
                            }
                            displayToast={this.props.displayToast}
                            getCartDetails={this.props.getCartDetails}
                            isShippingObjAvailable={
                              this.props.cart &&
                              this.props.cart.cartDetails &&
                              this.props.cart.cartDetails.cartAmount &&
                              this.props.cart.cartDetails.cartAmount
                                .shippingCharge
                                ? true
                                : false
                            }
                            getBundledProductSuggestion={
                              this.props.getBundledProductSuggestion
                            }
                            bundledProductSuggestionDetails={
                              this.props.bundledProductSuggestionDetails
                            }
                            addBundledProductsToCart={
                              this.props.addBundledProductsToCart
                            }
                            addBundledProductsToCartDetails={
                              this.props.addBundledProductsToCartDetails
                            }
                            history={this.props.history}
                            bundledProductSuggestionStatus={
                              this.props.bundledProductSuggestionStatus
                            }
                            openAppliancesExchangeModal={
                              this.props.openAppliancesExchangeModal
                            }
                            appliancesExchangePincodeData={
                              this.state.appliancesExchangePincodeData
                            }
                          />
                        </DesktopOnly>
                      </div>
                    );
                  })}
              </div>
              <DesktopOnly>
                <div className={styles.continueButtonHolder}>
                  <div className={styles.buttonContinueShopping}>
                    <Button
                      type="hollow"
                      height={36}
                      label="Continue Shopping"
                      width={210}
                      textStyle={{ color: "#212121", fontSize: 14 }}
                      onClick={() => this.navigateToHome()}
                    />
                  </div>
                </div>
              </DesktopOnly>
              <MobileOnly>
                {cartDetails.products && (
                  <SavedProduct
                    saveProduct={() => this.goToWishList()}
                    onApplyCoupon={() => this.displayCoupons()}
                    appliedCouponCode={this.state.appliedCouponCode}
                  />
                )}

                {this.state.showCheckoutSection &&
                  cartDetails.products &&
                  cartDetails.cartAmount && (
                    <div className={styles.checkoutHolder}>
                      <Checkout
                        disabled={!this.state.isServiceable}
                        amount={
                          cartDetails.cartAmount.paybleAmount.value
                            ? Math.round(
                                cartDetails.cartAmount.paybleAmount.value * 100
                              ) / 100
                            : "0.00"
                        }
                        bagTotal={
                          cartDetails.cartAmount.bagTotal.value
                            ? Math.round(
                                cartDetails.cartAmount.bagTotal.value * 100
                              ) / 100
                            : "0.00"
                        }
                        coupons={couponDiscount}
                        discount={totalDiscount}
                        delivery={deliveryCharge}
                        payable={
                          cartDetails.cartAmount.paybleAmount.value
                            ? Math.round(
                                cartDetails.cartAmount.paybleAmount.value * 100
                              ) / 100
                            : "0.00"
                        }
                        onCheckout={() => this.renderToCheckOutPage()}
                        label={CHECKOUT_BUTTON_TEXT}
                        isOnCartPage={true}
                        changePinCode={this.changePinCode}
                        isFromMyBag={true}
                        desktopElement={
                          cartDetails.products && (
                            <div className={styles.couponWrapper}>
                              <SavedProduct
                                saveProduct={() => this.goToWishList()}
                                onApplyCoupon={() => this.displayCoupons()}
                                appliedCouponCode={this.state.appliedCouponCode}
                              />
                            </div>
                          )
                        }
                      />
                    </div>
                  )}

                {this.state.showCheckoutSection &&
                  cartDetails.products &&
                  cartDetails.cartAmount && (
                    <CheckoutStaticSection
                      disabled={!this.state.isServiceable}
                      amount={
                        cartDetails.cartAmount.paybleAmount.value
                          ? Math.round(
                              cartDetails.cartAmount.paybleAmount.value * 100
                            ) / 100
                          : "0.00"
                      }
                      bagTotal={
                        cartDetails.cartAmount.bagTotal.value
                          ? Math.round(
                              cartDetails.cartAmount.bagTotal.value * 100
                            ) / 100
                          : "0.00"
                      }
                      coupons={couponDiscount}
                      discount={totalDiscount}
                      delivery={deliveryCharge}
                      payable={
                        cartDetails.cartAmount.paybleAmount.value
                          ? Math.round(
                              cartDetails.cartAmount.paybleAmount.value * 100
                            ) / 100
                          : "0.00"
                      }
                      cartAmount={cartDetails.cartAmount}
                      onCheckout={() => this.renderToCheckOutPage()}
                      label={CHECKOUT_BUTTON_TEXT}
                      isOnCartPage={true}
                      changePinCode={this.changePinCode}
                      isFromMyBag={true}
                      showDetails={this.state.showCartDetails}
                    />
                  )}
              </MobileOnly>
            </div>
            <DesktopOnly>
              <div className={styles.bagTotal}>
                <div className={styles.bagTotalFixed}>
                  {cartDetails.products && (
                    <div className={styles.couponCard}>
                      <SavedProduct
                        saveProduct={() => this.goToWishList()}
                        onApplyCoupon={() => this.displayCoupons()}
                        appliedCouponCode={this.state.appliedCouponCode}
                      />
                    </div>
                  )}
                  {this.state.showCheckoutSection &&
                    cartDetails.products &&
                    cartDetails.cartAmount && (
                      <div className={styles.amountDetails}>
                        <DesktopCheckout
                          cartAmount={cartDetails.cartAmount}
                          disabled={!this.state.isServiceable}
                          amount={
                            cartDetails.cartAmount.paybleAmount.value
                              ? Math.round(
                                  cartDetails.cartAmount.paybleAmount.value *
                                    100
                                ) / 100
                              : "0.00"
                          }
                          carPageBagTotal={
                            cartDetails.cartAmount.bagTotal.value
                              ? Math.round(
                                  cartDetails.cartAmount.bagTotal.value * 100
                                ) / 100
                              : "0.00"
                          }
                          coupons={couponDiscount}
                          discount={totalDiscount}
                          delivery={deliveryCharge}
                          payableForCartPage={
                            cartDetails.cartAmount.paybleAmount.value
                              ? Math.round(
                                  cartDetails.cartAmount.paybleAmount.value *
                                    100
                                ) / 100
                              : "0.00"
                          }
                          onCheckout={() =>
                            this.renderToCheckOutPage(
                              productExchangeServiceable
                            )
                          }
                          label={CHECKOUT__TEXT}
                          isOnCartPage={true}
                          changePinCode={this.changePinCode}
                          isFromMyBag={true}
                          showDetails={this.state.showCartDetails}
                          productExchangeServiceable={
                            productExchangeServiceable
                          }
                          totalExchangeAmount={cartDetails.totalExchangeAmount}
                          isQuoteExpired={isQuoteExpired}
                          isShippingObjAvailable={
                            cartDetails.cartAmount &&
                            cartDetails.cartAmount.shippingCharge
                              ? true
                              : false
                          }
                          shippingPromoMessage={
                            cartDetails.shippingPromoMessage
                          }
                          showShippingMsg={true}
                          appliancesExchangePincodeData={
                            this.state.appliancesExchangePincodeData
                          }
                          cartProducts={cartDetails.products}
                        />
                      </div>
                    )}
                  {this.props &&
                    this.props.wishListCount !== null &&
                    this.props.wishListCount > 0 && (
                      <div className={styles.wishListCountSection}>
                        <div className={styles.iconWishList} />
                        <span>{`You have ${
                          this.props.wishListCount
                        } items in your saved list`}</span>
                        <div className={styles.buttonHolder}>
                          <UnderLinedButton
                            size="14px"
                            fontFamily="regular"
                            color="#000000"
                            label="See all"
                            onClick={() => this.redirectToSaveList()}
                          />
                        </div>
                      </div>
                    )}
                  <div className={styles.disclaimer}>{DISCLAIMER}</div>
                </div>
              </div>
            </DesktopOnly>
          </div>
          <DesktopOnly>
            <div className={styles.saveAndSecure}>
              <SaveAndSecure history={this.props.history} />
            </div>
          </DesktopOnly>
        </div>
      );
    } else {
      return this.renderEmptyBag();
    }
  }

  async componentWillUnmount() {
    /*
here we need to hit call for merging cart id if user
 has temp cart .
 in this case if user leave checkout in middle then we need
 to hit merge cart id
*/
    if (localStorage.getItem("cartPromotionText")) {
      localStorage.removeItem("cartPromotionText");
    }
    let cartDetails = Cookie.getCookie(CART_DETAILS_FOR_LOGGED_IN_USER);
    cartDetails = cartDetails && JSON.parse(cartDetails);

    if (!this.navigateToCheckout) {
      if (cartDetails && cartDetails.isBuyNowCart) {
        await this.props.mergeTempCartWithOldCart();
        if (localStorage.getItem(CNC_CART)) {
          localStorage.removeItem(CNC_CART);
        }
      } else {
        // Before leaving cart page call minicart
        this.props.getMinicartProducts();
      }
    } else {
      //localStorage.removeItem(SELECTED_STORE);
    }

    if (this.props.clearCartDetails) {
      this.props.clearCartDetails();
    }
    if (localStorage.getItem(CLIQ_AND_PIQ_CART_CODE)) {
      localStorage.removeItem(CLIQ_AND_PIQ_CART_CODE);
      localStorage.removeItem(CLIQ_AND_PIQ_CART_ID);
    }
  }
}

CartPage.propTypes = {
  cartOfferText: PropTypes.string,
  cartOffer: PropTypes.string,
  cartTax: PropTypes.string,
  delivery: PropTypes.string,
  offers: PropTypes.string,
  removeItemFromCartLoggedOut: PropTypes.func,
  removeItemFromCartLoggedIn: PropTypes.func,
  getCartDetails: PropTypes.func,
  updateQuantityInCartLoggedIn: PropTypes.func,
  updateQuantityInCartLoggedOut: PropTypes.func
};

CartPage.defaultProps = {
  cartOfferText: "Congratulations your cart qualifies for.",
  cartOffer: "FREE shipping",
  cartTax: "included",
  delivery: "Free",
  offers: "Apply"
};

export default CartPage;
