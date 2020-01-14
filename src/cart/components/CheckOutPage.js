import React from "react";
import cloneDeep from "lodash.clonedeep";
import PropTypes from "prop-types";
import DummyTab from "./DummyTab";
import ConfirmAddress from "./ConfirmAddress";
import Checkout from "./Checkout";
import BankOfferWrapper from "./BankOfferWrapper.js";
import DesktopCheckout from "./DesktopCheckout";
import AddDeliveryAddress from "./AddDeliveryAddress";
import * as Cookie from "../../lib/Cookie";
import DeliveryAddressSet from "./DeliveryAddressSet";
import DeliveryModeSet from "./DeliveryModeSet";
import styles from "./CheckOutPage.css";
import CheckOutHeader from "./CheckOutHeader";
import PaymentCardWrapper from "./PaymentCardWrapper.js";
import CartItem from "./CartItem";
import CheckoutStaticSection from "./CheckoutStaticSection.js";
import GridSelect from "../../general/components/GridSelect";
import DesktopOnly from "../../general/components/DesktopOnly";
import MobileOnly from "../../general/components/MobileOnly";
import OrderConfirmation from "./OrderConfirmation";
import queryString, { parse } from "query-string";
import PiqPage from "./PiqPage";
import size from "lodash.size";
import TransactionFailed from "./TransactionFailed.js";
import cardValidator from "simple-card-validator";
import * as Cookies from "../../lib/Cookie";
import CliqandPiqModal from "../../pdp//components/CliqandPiqModal.js";
import ModalPanel from "../../general/components/ModalPanel.js";
import Button from "../../general/components/Button";
import {
  CUSTOMER_ACCESS_TOKEN,
  LOGGED_IN_USER_DETAILS,
  CART_DETAILS_FOR_LOGGED_IN_USER,
  COLLECT,
  PRODUCT_CART_ROUTER,
  DEFAULT_PIN_CODE_LOCAL_STORAGE,
  OLD_CART_GU_ID,
  PAYMENT_MODE_TYPE,
  PAYTM,
  WALLET,
  HOME_DELIVERY,
  EXPRESS,
  ORDER_PREFIX,
  MY_ACCOUNT,
  ORDER,
  ORDER_CODE,
  REQUESTING,
  THANK_YOU,
  COUPON_COOKIE,
  JUS_PAY_CHARGED,
  JUS_PAY_SUCCESS,
  JUS_PAY_AUTHORIZATION_FAILED,
  CREDIT_CARD,
  NET_BANKING_PAYMENT_MODE,
  DEBIT_CARD,
  EMI,
  CASH_ON_DELIVERY_PAYMENT_MODE,
  LOGIN_PATH,
  NO_COST_EMI_COUPON,
  OLD_CART_CART_ID,
  SAVED_CARD_PAYMENT_MODE,
  E_WALLET,
  NO_COST_EMI,
  STANDARD_EMI,
  CASH_ON_DELIVERY,
  YES,
  NO,
  SAVE_TEXT,
  PINCODE_TEXT,
  NAME_TEXT,
  LAST_NAME_TEXT,
  ADDRESS_TEXT,
  ADDRESS_VALIDATION_TEXT,
  ADDRESS_MINLENGTH_VALID_TEXT,
  ADDRESS_MAXLENGTH_VALID_TEXT,
  EMAIL_TEXT,
  LANDMARK_TEXT,
  LANDMARK_ENTER_TEXT,
  MOBILE_TEXT,
  PINCODE_VALID_TEXT,
  EMAIL_VALID_TEXT,
  PHONE_VALID_TEXT,
  PHONE_TEXT,
  CITY_TEXT,
  STATE_TEXT,
  SELECT_ADDRESS_TYPE,
  ISO_CODE,
  OTHER_LANDMARK,
  BANK_COUPON_COOKIE,
  SELECTED_BANK_NAME,
  MY_ACCOUNT_CART_PAGE,
  ADDRESS_VALIDATION,
  NAME_VALIDATION,
  SELECTED_DELIVERY_MODE,
  SHORT_EXPRESS,
  SHORT_COLLECT,
  SHORT_HOME_DELIVERY,
  ORDER_ID_FOR_ORDER_CONFIRMATION_PAGE,
  PAYPAL,
  E_WALLET_PAYPAL,
  RETRY_FAILED_ORDER,
  RETRY_PAYMENT_CART_AND_USER_ID_DETAILS,
  EMI_TENURE,
  WHATSAPP_NOTIFICATION,
  STRIPE_DETAILS,
  MY_ACCOUNT_ORDERS_PAGE,
  ORDER_ID_FOR_PAYMENT_CONFIRMATION_PAGE,
  FAILURE_LOWERCASE,
  BIN_CARD_TYPE,
  RETRY_FAILED_ORDER_COUPON_HEADER,
  RETRY_FAILED_ORDER_COUPON,
  RETRY_FAILED_ORDER_COUPON_NOTE,
  FAILURE_TEXT,
  SHORT_SAME_DAY_DELIVERY,
  SAME_DAY_DELIVERY,
  SAME_DAY_DELIVERY_SHIPPING,
  FAILED_ORDER,
  CNC_CART
} from "../../lib/constants";
import {
  EMAIL_REGULAR_EXPRESSION,
  MOBILE_PATTERN
} from "../../auth/components/Login";
import {
  HOME_ROUTER,
  SUCCESS,
  CHECKOUT,
  ERROR,
  SUCCESS_UPPERCASE
} from "../../lib/constants";
import SecondaryLoader from "../../general/components/SecondaryLoader";
import {
  setDataLayerForCheckoutDirectCalls,
  ADOBE_LANDING_ON_ADDRESS_TAB_ON_CHECKOUT_PAGE,
  ADOBE_CALL_FOR_SELECT_DELIVERY_MODE,
  ADOBE_CALL_FOR_PROCCEED_FROM_DELIVERY_MODE,
  setDataLayerForWhatsappUncheck
} from "../../lib/adobeUtils";
import {
  CART_ITEM_COOKIE,
  ADDRESS_FOR_PLACE_ORDER,
  CART_PATH
} from "../actions/cart.actions";
import { checkUserAgentIsMobile } from "../../lib/UserAgent.js";
import WhatsappUpdates from "./WhatsappUpdates";
import PaymentConfirmationPage from "./PaymentConfirmationPage";
const SEE_ALL_BANK_OFFERS = "See All Bank Offers";
const PAYMENT_MODE = "EMI";
const NET_BANKING = "NB";
const CART_GU_ID = "cartGuid";
const DELIVERY_MODE_ADDRESS_ERROR = "No Delivery Modes At Selected Address";
const CONTINUE = "Continue";
const PROCEED = "Proceed";
const COUPON_AVAILABILITY_ERROR_MESSAGE = "Your applied coupon has expired";
const PRODUCT_NOT_SERVICEABLE_MESSAGE =
  "Product is not Serviceable, Please try with another pin code";
const SELECT_DELIVERY_MODE_MESSAGE =
  "Please Select the delivery mode for all the products";
const ERROR_MESSAGE_FOR_PICK_UP_PERSON_NAME =
  "Please enter Pickup person name,character should be greater than 4 ";
const ERROR_MESSAGE_FOR_MOBILE_NUMBER = "Please enter valid mobile number";
const INVALID_CART_ERROR_MESSAGE =
  "Sorry your cart is not valid any more. Please Try again";
const PLACE_ORDER = "Place Order";
const PAY_NOW = "Pay Now";
const OUT_OF_STOCK_MESSAGE = "Some Products are out of stock";
export const EGV_GIFT_CART_ID = "giftCartId";
const CASH_ON_DELIVERY_TEXT = "Cash on Delivery";
const DISCLAIMER =
  "Safe and secure payments. Easy returns. 100% Authentic products.";
export const RETRY_PAYMENT_DETAILS = "retryPaymentDetails";
export const RETRY_PAYMENT_CART_ID = "retryPaymentCartId";
export const CLIQ_AND_PIQ_CART_ID = "cliqAndPiqCartId";
export const CLIQ_AND_PIQ_CART_CODE = "cliqAndPiqCartCode";
class CheckOutPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCheckoutAddressSelected: false,
      isDeliveryModeSelected: false,
      confirmAddress: false, //render the render delivery Modes if confirmAddress= true
      isSelectedDeliveryModes: false, // To select the delivery Modes
      deliverMode: false, // render the payment Modes if deliverMode = true
      paymentMethod: false, // render the payment mode if it is true
      addressId: null,
      addNewAddress: false,
      deliverModeUssId: "",
      appliedCoupons: false,
      paymentModeSelected: null,
      orderConfirmation: false,
      paymentConfirmation: false,
      showCliqAndPiq: false,
      showPickupPerson: false,
      selectedSlaveIdObj: {},
      ussIdAndDeliveryModesObj: {}, // this object we are using for check when user will continue after  delivery mode then we ll check for all products we selected delivery mode or not
      selectedProductsUssIdForCliqAndPiq: null,
      orderId: "",
      savedCardDetails: "",
      binValidationCOD: false,
      isGiftCard: false,
      isRemainingAmount: true,
      cliqCashAmount: "",
      userCliqCashAmount: "",
      bagAmount: "",
      selectedDeliveryDetails: null,
      ratingExperience: false,
      isFirstAddress: false,
      addressDetails: null,
      isNoCostEmiApplied: false,
      isNoCostEmiProceeded: false,
      selectedBankOfferCode: "",
      isPaymentFailed: false,
      deliveryCharge: "0.00",
      couponDiscount: "0.00",
      totalDiscount: "0.00",
      cliqPiqSelected: false,
      currentSelectedEMIType: null,
      currentPaymentMode: null, // holding selected payments modes
      cardDetails: {}, // for store card detail in card details
      cvvForCurrentPaymentMode: null, // in case on saved card
      bankCodeForNetBanking: null, // in case on net banking
      bankNameForNetBanking: null,
      captchaReseponseForCOD: null, // in case of COD order its holding that ceptcha verification
      noCostEmiDiscount: "0.00",
      egvCartGuid: null,
      noCostEmiBankName: null,
      isCliqCashApplied: false,
      cliqCashPaidAmount: "0.00",
      showCartDetails: false,
      padding: "15px 125px 15px 15px",
      isOpenTransactionFailedPopUp: true,
      isComingFromRetryUrl: false,
      retryCartGuid: null,
      retryFlagForEmiCoupon: false,
      emiBinValidationErrorMessage: null,
      emiBinValidationStatus: false,
      whatsappSelected: true,
      isComingFromCliqAndPiq: false,
      retryPaymentDetails: props.retryPaymentDetails
        ? props.retryPaymentDetails
        : null
    };
  }

  changeEmiPlan = () => {
    this.setState({
      cardDetails: {},
      emiBinValidationErrorMessage: null,
      emiBinValidationStatus: false
    });
  };
  onClickImage(productCode) {
    if (productCode) {
      this.props.history.push(`/p-${productCode.toLowerCase()}`);
    }
  }
  navigateToLogin() {
    const url = this.props.location.pathname;
    if (url === `${RETRY_FAILED_ORDER}`) {
      const parsedQueryString = queryString.parse(this.props.location.search);
      let guId = parsedQueryString.value;
      let userId = parsedQueryString.userId;
      let retryPaymentUserIdAndCartIdObject = {};
      retryPaymentUserIdAndCartIdObject.cartId = guId;
      retryPaymentUserIdAndCartIdObject.userId = userId;
      localStorage.setItem(
        RETRY_PAYMENT_CART_AND_USER_ID_DETAILS,
        JSON.stringify(retryPaymentUserIdAndCartIdObject)
      );
    } else {
      this.props.setUrlToRedirectToAfterAuth(url);
    }
    this.props.history.replace(LOGIN_PATH);
  }
  navigateUserToMyBagAfter15MinOfpaymentFailure() {
    this.props.displayToast(INVALID_CART_ERROR_MESSAGE);
    this.props.history.replace(HOME_ROUTER);
  }
  navigateToCartForOutOfStock() {
    this.props.displayToast(OUT_OF_STOCK_MESSAGE);
    if (this.state.isComingFromRetryUrl) {
      this.props.history.push(MY_ACCOUNT);
    } else {
      this.props.history.push(PRODUCT_CART_ROUTER);
    }
  }
  onChangeCardDetail = val => {
    const cardDetails = cloneDeep(this.state.cardDetails);
    Object.assign(cardDetails, val);
    this.setState({ cardDetails });
  };
  onChangePaymentMode = async val => {
    localStorage.removeItem(BIN_CARD_TYPE);
    let noCostEmiCouponCode = localStorage.getItem(NO_COST_EMI_COUPON);
    if (
      val &&
      val.currentPaymentMode !== EMI &&
      val.currentPaymentMode !== null &&
      noCostEmiCouponCode
    ) {
      await this.removeNoCostEmi(noCostEmiCouponCode);
    }
    //here we need to reset captch if if already done .but payment mode is changed
    if (this.state.captchaReseponseForCOD && window.grecaptcha) {
      window.grecaptcha.reset();
    }
    this.setState(val);
    this.setState({
      cardDetails: {},
      bankCodeForNetBanking: null,
      bankNameForNetBanking: null,
      savedCardDetails: null,
      captchaReseponseForCOD: null,
      noCostEmiBankName: null,
      noCostEmiDiscount: "0.00",
      isNoCostEmiProceeded: false,
      paymentModeSelected: null,
      binValidationCOD: false,
      emiBinValidationErrorMessage: null,
      emiBinValidationStatus: false,
      currentSelectedEMIType: null
    });
  };
  navigateToJusPayOnGET(url) {
    window.location.replace(url);
  }
  navigateToJusPayOnPOST(juspayResponse) {
    if (
      !juspayResponse ||
      !juspayResponse.payment ||
      !juspayResponse.payment.authentication ||
      !juspayResponse.payment.authentication.url
    ) {
      return this.props.displayToast("Opps some thing went wrong");
    }
    var url = juspayResponse.payment.authentication.url;
    var method = juspayResponse.payment.authentication.method;

    var frm = document.createElement("form");
    frm.style.display = "none"; // ensure that the form is hidden from the user
    frm.setAttribute("method", method);
    frm.setAttribute("action", url);

    if (method === "POST") {
      var params = juspayResponse.payment.authentication.params;
      for (var key in params) {
        var value = params[key];
        var field = document.createElement("input");
        field.setAttribute("type", "hidden");
        field.setAttribute("name", key);
        field.setAttribute("value", value);
        frm.appendChild(field);
      }
    }

    document.body.appendChild(frm);
    // form is now ready
    frm.submit();
  }
  changeSubEmiOption(currentSelectedEMIType) {
    let noCostEmiCouponCode = localStorage.getItem(NO_COST_EMI_COUPON);
    if (noCostEmiCouponCode) {
      this.removeNoCostEmi(noCostEmiCouponCode);
    }
    this.setState({
      currentSelectedEMIType,
      cardDetails: {},
      noCostEmiBankName: null,
      noCostEmiDiscount: "0.00",
      isNoCostEmiApplied: false,
      emiBinValidationErrorMessage: null,
      emiBinValidationStatus: false
    });
  }
  setSunEmiOption(currentSelectedEMIType) {
    this.setState({
      currentSelectedEMIType,
      cardDetails: {},
      noCostEmiBankName: null,
      noCostEmiDiscount: "0.00",
      isNoCostEmiApplied: false,
      emiBinValidationErrorMessage: null,
      emiBinValidationStatus: false
    });
  }
  updateLocalStoragePinCode(pincode) {
    const postalCode = parseInt(pincode);
    if (!this.state.isComingFromCliqAndPiq) {
      localStorage.setItem(DEFAULT_PIN_CODE_LOCAL_STORAGE, postalCode);
    }
  }
  navigateToMyBag() {
    if (this.props.displayToast) {
      this.props.displayToast(DELIVERY_MODE_ADDRESS_ERROR);
    }
    this.props.history.goBack();
  }
  selecteBankOffer(couponCode) {
    this.setState({ selectedBankOfferCode: couponCode });
  }
  renderLoader() {
    return (
      <div className={styles.cartLoader}>
        <div className={styles.spinner}>
          <SecondaryLoader />
        </div>
      </div>
    );
  }

  componentDidUpdate(prevProps) {
    const parsedQueryString = queryString.parse(this.props.location.search);
    const value = parsedQueryString.status;

    if (
      this.props.cart.paymentModes &&
      this.props.cart.paymentModes !== prevProps.cart.paymentModes
    ) {
      if (
        !this.props.cart.paymentModes.whatsapp &&
        this.props.cart.paymentModes.whatsappText
      ) {
        let whatsappNotification = Cookie.getCookie(WHATSAPP_NOTIFICATION);
        if (!whatsappNotification) {
          Cookie.createCookie(WHATSAPP_NOTIFICATION, true);
        }
      }
    }

    if (value && value !== JUS_PAY_CHARGED && value !== JUS_PAY_SUCCESS) {
      const oldCartId = Cookies.getCookie(OLD_CART_GU_ID);
      if (!oldCartId) {
        return this.navigateUserToMyBagAfter15MinOfpaymentFailure();
      }
    }
    if (
      this.props.cart.orderConfirmationDetails ||
      this.props.cart.getPrepaidOrderPaymentConfirmation ||
      this.props.cart.cliqCashJusPayDetails
    ) {
      this.props.setHeaderText(THANK_YOU);
    } else {
      this.props.setHeaderText(CHECKOUT);
    }
  }

  renderConfirmAddress = () => {
    if (this.state.confirmAddress) {
      return <div> Address Expand</div>;
    }
  };
  onSelectBankForNetBanking(bankCodeForNetBanking, bankNameForNetBanking) {
    this.setState({
      bankCodeForNetBanking: bankCodeForNetBanking,
      bankNameForNetBanking: bankNameForNetBanking
    });
  }

  handleSelectDeliveryMode(deliveryMode, ussId, cartId) {
    let deliverModeInShortTerm;
    if (deliveryMode === SHORT_HOME_DELIVERY) {
      deliverModeInShortTerm = SHORT_HOME_DELIVERY;
    } else if (
      deliveryMode === SHORT_SAME_DAY_DELIVERY ||
      deliveryMode === SAME_DAY_DELIVERY_SHIPPING
    ) {
      deliverModeInShortTerm = SHORT_SAME_DAY_DELIVERY;
    } else {
      deliverModeInShortTerm = SHORT_EXPRESS;
    }

    let newDeliveryObj = {};
    newDeliveryObj[ussId] = deliveryMode;
    let currentSelectedDeliveryModes = cloneDeep(
      this.state.ussIdAndDeliveryModesObj
    );

    Object.assign(currentSelectedDeliveryModes, newDeliveryObj);
    setDataLayerForCheckoutDirectCalls(
      ADOBE_CALL_FOR_SELECT_DELIVERY_MODE,
      currentSelectedDeliveryModes
    );
    localStorage.setItem(
      SELECTED_DELIVERY_MODE,
      JSON.stringify(currentSelectedDeliveryModes)
    );
    this.setState({
      ussIdAndDeliveryModesObj: currentSelectedDeliveryModes,
      isSelectedDeliveryModes: true,
      isDeliveryModeSelected: true
    });
  }

  getPaymentFailureOrderDetails = () => {
    if (this.props.getPaymentFailureOrderDetails) {
      this.props.getPaymentFailureOrderDetails();
    }
  };
  getAllStores = selectedProductsUssIdForCliqAndPiq => {
    const defalutPinCode = localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE);
    this.setState(
      { showCliqAndPiq: true, selectedProductsUssIdForCliqAndPiq },
      () => this.props.getAllStoresCNC(defalutPinCode)
    );
  };
  changePincodeOnCliqAndPiq = pincode => {
    this.updateLocalStoragePinCode(pincode);
    this.props.getAllStoresCNC(pincode);
  };
  showHideDetails = () => {
    window.scroll({
      top:
        document &&
        document.body &&
        document.body.offsetHeight - window.innerHeight - 230,
      behavior: "smooth"
    });
  };
  togglePickupPersonForm() {
    const currentSelectedSlaveIdObj = cloneDeep(this.state.selectedSlaveIdObj);
    if (
      currentSelectedSlaveIdObj[this.state.selectedProductsUssIdForCliqAndPiq]
    ) {
      delete currentSelectedSlaveIdObj[
        this.state.selectedProductsUssIdForCliqAndPiq
      ];
    }

    this.setState({ selectedSlaveIdObj: currentSelectedSlaveIdObj });
  }
  addStoreCNC(selectedSlaveId) {
    const selectedSlaveIdObj = cloneDeep(this.state.selectedSlaveIdObj);
    selectedSlaveIdObj[
      this.state.selectedProductsUssIdForCliqAndPiq
    ] = selectedSlaveId;
    this.setState({ selectedSlaveIdObj });
    this.props.addStoreCNC(
      this.state.selectedProductsUssIdForCliqAndPiq,
      selectedSlaveId
    );
  }
  async addPickupPersonCNC(mobile, name, productObj) {
    if (!name || name.length < 4) {
      return this.props.displayToast(ERROR_MESSAGE_FOR_PICK_UP_PERSON_NAME);
    } else if (!mobile || mobile.length !== 10) {
      return this.props.displayToast(ERROR_MESSAGE_FOR_MOBILE_NUMBER);
    }
    this.setState({ showCliqAndPiq: false });
    const addPickUpPerson = await this.props.addPickupPersonCNC(mobile, name);
    if (addPickUpPerson.status === SUCCESS_UPPERCASE) {
      const updatedDeliveryModeUssid = this.state.ussIdAndDeliveryModesObj;

      updatedDeliveryModeUssid[
        this.state.selectedProductsUssIdForCliqAndPiq
      ] = COLLECT;

      await this.setState(
        {
          ussIdAndDeliveryModesObj: updatedDeliveryModeUssid,
          cliqPiqSelected: true,
          isDeliveryModeSelected: true
        },
        () => {
          localStorage.setItem(
            SELECTED_DELIVERY_MODE,
            JSON.stringify(updatedDeliveryModeUssid)
          );
        }
      );
    }
  }
  removeCliqAndPiq() {
    this.setState({ showCliqAndPiq: false });
  }
  handleWhatsAppClick(isSelected) {
    this.setState({ whatsappSelected: isSelected });
    let whatsappNotification = Cookie.getCookie(WHATSAPP_NOTIFICATION);
    if (isSelected && !whatsappNotification) {
      Cookie.createCookie(WHATSAPP_NOTIFICATION, isSelected);
    } else {
      setDataLayerForWhatsappUncheck();
      Cookie.deleteCookie(WHATSAPP_NOTIFICATION);
    }
  }
  renderCheckoutAddress = disabled => {
    const cartData = this.props.cart;
    let addressSelectedId =
      this.props.cart.cartDetailsCNC &&
      this.props.cart.cartDetailsCNC.addressDetailsList &&
      this.props.cart.cartDetailsCNC.addressDetailsList.addresses[0];
    let fetchId = addressSelectedId && addressSelectedId.id;
    let defaultAddressId = fetchId;
    if (this.state.addressId) {
      defaultAddressId = this.state.addressId;
    }
    return (
      <div className={styles.addInitialAddAddress}>
        <ConfirmAddress
          address={
            cartData.userAddress.addresses &&
            cartData.userAddress.addresses.map(address => {
              return {
                addressTitle: address.addressType,
                addressDescription: `${address.line1 ? address.line1 : ""} ${
                  address.line2 ? address.line2 : ""
                }  ${address.state ? address.state : ""} ${
                  address.postalCode ? address.postalCode : ""
                }`,
                value: address.id,
                phone: address.phone,
                selected: address.defaultAddress
              };
            })
          }
          onRedirectionToNextSection={
            this.state.isPaymentFailed
              ? this.handleSubmitAfterPaymentFailure
              : this.handleSubmit
          }
          disabled={[defaultAddressId] ? false : true}
          selected={[defaultAddressId]}
          onNewAddress={() => this.addNewAddress()}
          onSelectAddress={address => this.onSelectAddress(address)}
        />
      </div>
    );
  };
  onFocusInput() {
    this.setState({
      showCartDetails: false,
      padding: "6px 125px 6px 15px"
    });
  }
  onBlue() {
    this.setState({ padding: "15px 125px 15px 15px" });
  }
  renderDeliverModes = checkoutButtonStatus => {
    return (
      <div className={styles.products}>
        <div className={styles.header}>
          <CheckOutHeader indexNumber="2" confirmTitle="Choose Delivery Mode" />
        </div>
        {this.props.cart.cartDetailsCNC.products &&
          this.props.cart.cartDetailsCNC.products.map((val, i) => {
            return (
              <div className={styles.row}>
                <CartItem
                  inCheckOutPage={true}
                  isTop={false}
                  key={i}
                  selected={this.state.ussIdAndDeliveryModesObj[val.USSID]}
                  productImage={val.imageURL}
                  hasFooter={false}
                  size={val.size}
                  color={val.color}
                  quantity={val.qtySelectedByUser}
                  isGiveAway={val.isGiveAway}
                  //productDetails={val.productBrand}
                  productName={val.productName}
                  price={val.price}
                  offerPrice={val.offerPrice}
                  deliveryInformation={val.elligibleDeliveryMode}
                  showDelivery={true}
                  deliveryInfoToggle={false}
                  productIsServiceable={val.pinCodeResponse}
                  selectDeliveryMode={code =>
                    this.handleSelectDeliveryMode(
                      code,
                      val.USSID,
                      this.state.cartId
                    )
                  }
                  onPiq={() => this.getAllStores(val.USSID)}
                  onClickImage={() => this.onClickImage(val.productcode)}
                  isClickable={true}
                  deliveryInformationWithDate={
                    val.pinCodeResponse &&
                    val.pinCodeResponse.validDeliveryModes
                  }
                  selectedStoreDetails={val.storeDetails}
                />
              </div>
            );
          })}
        <DesktopOnly>
          <div className={styles.bottomCap}>
            <div className={styles.alignRight}>
              <div className={styles.buttonHolder}>
                <Button
                  disabled={checkoutButtonStatus}
                  type="primary"
                  backgroundColor="#ff1744"
                  height={40}
                  label="Continue"
                  width={150}
                  textStyle={{
                    color: "#FFF",
                    fontSize: 14
                  }}
                  onClick={
                    this.state.isPaymentFailed
                      ? this.handleSubmitAfterPaymentFailure
                      : this.handleSubmit
                  }
                />
              </div>
            </div>
          </div>
        </DesktopOnly>
      </div>
    );
  };

  getUserDetails = () => {
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);

    if (userDetails && customerCookie) {
      if (this.props.getUserDetails) {
        this.props.getUserDetails();
      }
    }
  };

  renderCliqAndPiq() {
    let currentSelectedProduct = this.props.cart.cartDetailsCNC.products.find(
      product => {
        return product.USSID === this.state.selectedProductsUssIdForCliqAndPiq;
      }
    );
    const firstSlaveData =
      currentSelectedProduct.pinCodeResponse.validDeliveryModes;
    if (checkUserAgentIsMobile()) {
      const someData = firstSlaveData
        .map(slaves => {
          return (
            slaves.CNCServiceableSlavesData &&
            slaves.CNCServiceableSlavesData.map(slave => {
              return slave && slave.storeId;
            })
          );
        })
        .map(val => {
          return (
            val &&
            val.map(v => {
              return v;
            })
          );
        });

      // const allStoreIds = [].concat
      //   .apply([], [].concat.apply([], someData))
      //   .map(store => {
      //     return store && store.slaveId;
      //   });
      const allStoreIds = [].concat.apply([], someData).map(store => {
        return store;
      });
      const availableStores = this.props.cart.storeDetails
        ? this.props.cart.storeDetails.filter(val => {
            return (
              allStoreIds.includes(val.slaveId) && val.clicknCollect === "Y"
            );
          })
        : [];
      return (
        <PiqPage
          availableStores={availableStores}
          selectedSlaveId={
            this.state.selectedSlaveIdObj[
              this.state.selectedProductsUssIdForCliqAndPiq
            ] &&
            this.state.selectedSlaveIdObj[
              this.state.selectedProductsUssIdForCliqAndPiq
            ]
          }
          pinCodeUpdateDisabled={true}
          numberOfStores={availableStores.length}
          showPickupPerson={
            this.state.selectedSlaveIdObj[
              this.state.selectedProductsUssIdForCliqAndPiq
            ]
              ? true
              : false
          }
          productName={currentSelectedProduct.productName}
          productColour={currentSelectedProduct.color}
          hidePickupPersonDetail={() => this.togglePickupPersonForm()}
          addStoreCNC={slavesId => this.addStoreCNC(slavesId)}
          addPickupPersonCNC={(mobile, name) =>
            this.addPickupPersonCNC(mobile, name, currentSelectedProduct)
          }
          changePincode={pincode => this.changePincodeOnCliqAndPiq(pincode)}
          goBack={() => this.removeCliqAndPiq()}
          getUserDetails={() => this.getUserDetails()}
          userDetails={this.props.userDetails}
        />
      );
    } else {
      let currentSelectedProduct = this.props.cart.cartDetailsCNC.products.find(
        product => {
          return (
            product.USSID === this.state.selectedProductsUssIdForCliqAndPiq
          );
        }
      );

      return (
        <ModalPanel>
          <CliqandPiqModal
            stores={this.props.cart.storeDetails}
            productDetails={currentSelectedProduct}
            pinCodeUpdateDisabled={true}
            userDetails={this.props.userDetails}
            from="Checkout"
            addPickupPersonCNC={(mobile, name) =>
              this.addPickupPersonCNC(mobile, name, currentSelectedProduct)
            }
            addStoreCNC={slavesId => this.addStoreCNC(slavesId)}
            CloseCliqAndPiqModal={() =>
              this.setState({ showCliqAndPiq: false })
            }
            pincodeResponse={firstSlaveData}
            pincode={localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE)}
            isFromCheckOut={true}
          />
        </ModalPanel>
      );
    }
  }
  renderPaymentModes = () => {
    if (this.state.paymentMethod) {
      return <div>Payment Modes Expand</div>;
    }
  };

  renderInitialAddAddressForm() {
    if (
      !this.state.isFirstAddress &&
      this.props.cart.userAddress &&
      !this.props.cart.userAddress.addresses
    ) {
      this.setState({ isFirstAddress: true });
    }

    return (
      <div className={styles.addInitialAddAddress}>
        <AddDeliveryAddress
          history={this.props.history}
          handleCancelAddress={() => this.handleCancelAddress()}
          addUserAddress={address => this.addAddress(address)}
          {...this.state}
          onChange={val => this.onChange(val)}
          isFirstAddress={true}
          showSecondaryLoader={this.props.showSecondaryLoader}
          hideSecondaryLoader={this.props.hideSecondaryLoader}
          loading={this.props.cart.loading}
          displayToast={message => this.props.displayToast(message)}
          getAddressDetails={val => this.setState({ addressDetails: val })}
          getPinCode={val => this.getPinCodeDetails(val)}
          getPinCodeDetails={this.props.getPinCodeDetails}
          resetAutoPopulateDataForPinCode={() =>
            this.props.resetAutoPopulateDataForPinCode()
          }
          onFocusInput={() => this.onFocusInput()}
          getPincodeStatus={this.props.getPincodeStatus}
          resetAddAddressDetails={() => this.props.resetAddAddressDetails()}
          getUserDetails={() => this.getUserDetails()}
          userDetails={this.props.userDetails}
          clearPinCodeStatus={() => this.props.clearPinCodeStatus()}
        />
      </div>
    );
  }
  changeDeliveryAddress = () => {
    let noCostEmiCouponCode = localStorage.getItem(NO_COST_EMI_COUPON);
    if (this.state.captchaReseponseForCOD) {
      window.grecaptcha.reset();
    }
    if (this.state.isCliqCashApplied) {
      this.removeCliqCash();
    }
    if (noCostEmiCouponCode) {
      this.removeNoCostEmi(noCostEmiCouponCode);
    }
    if (this.state.selectedBankOfferCode && !this.state.isPaymentFailed) {
      this.props.releaseBankOffer(this.state.selectedBankOfferCode);
    }
    this.setState({
      cardDetails: {},
      bankCodeForNetBanking: null,
      bankNameForNetBanking: null,
      savedCardDetails: null,
      captchaReseponseForCOD: null,
      noCostEmiBankName: null,
      noCostEmiDiscount: "0.00",
      isNoCostEmiProceeded: false,
      paymentModeSelected: null,
      binValidationCOD: false,
      confirmAddress: false,
      deliverMode: false,
      isSelectedDeliveryModes: false,
      currentPaymentMode: null,
      isCliqCashApplied: false
    });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.cart.resetAllPaymentModeFlag) {
      this.props.preventRestingAllPaymentMode();
      this.onChangePaymentMode({ currentPaymentMode: null });
    }
    if (nextProps.cart.isSoftReservationFailed) {
      return this.navigateToCartForOutOfStock();
    }

    if (
      (nextProps.cart &&
        nextProps.cart.jusPayError &&
        this.state.isPaymentFailed === false) ||
      (nextProps.cart &&
        nextProps.cart.isGetPrepaidOrderPaymentConfirmationFailed &&
        this.state.isPaymentFailed === false)
    ) {
      const oldCartId = Cookies.getCookie(OLD_CART_GU_ID);
      if (!oldCartId) {
        return this.navigateUserToMyBagAfter15MinOfpaymentFailure();
      }
      this.setState({ isPaymentFailed: true });
      this.props.getPaymentFailureOrderDetails();
      if (localStorage.getItem(EGV_GIFT_CART_ID)) {
        let giftCartObj = JSON.parse(localStorage.getItem(EGV_GIFT_CART_ID));
        this.setState({
          isGiftCard: true,
          isRemainingAmount: true,
          payableAmount: Math.round(giftCartObj.amount * 100) / 100,
          bagAmount: Math.round(giftCartObj.amount * 100) / 100,
          egvCartGuid: giftCartObj.egvCartGuid
        });
      }

      if (localStorage.getItem(RETRY_PAYMENT_CART_ID)) {
        let retryPaymentDetailsObj = JSON.parse(
          localStorage.getItem(RETRY_PAYMENT_DETAILS)
        );
        let retryCartId = JSON.parse(
          localStorage.getItem(RETRY_PAYMENT_CART_ID)
        );
        this.setState({
          isComingFromRetryUrl: true,
          payableAmount:
            Math.round(
              retryPaymentDetailsObj.retryPaymentDetails.cartAmount.paybleAmount
                .doubleValue * 100
            ) / 100,
          bagAmount:
            Math.round(
              retryPaymentDetailsObj.retryPaymentDetails.cartAmount.bagTotal
                .doubleValue * 100
            ) / 100,
          retryCartGuid: retryCartId,
          retryFlagForEmiCoupon:
            retryPaymentDetailsObj &&
            retryPaymentDetailsObj.retryPaymentDetails &&
            retryPaymentDetailsObj.retryPaymentDetails.retryFlagEmiCoupon
              ? retryPaymentDetailsObj.retryPaymentDetails.retryFlagEmiCoupon
              : false,
          isRemainingAmount: true,
          deliverMode: true,
          confirmAddress: true
        });
      }
      this.getPaymentModes(oldCartId);
    }
    if (
      this.state.isPaymentFailed === false &&
      !this.state.isComingFromRetryUrl &&
      (nextProps.cart.cartDetailsCNCError ||
        (nextProps.cart.cartDetailsCNC &&
          !nextProps.cart.cartDetailsCNC.products))
    ) {
      this.props.history.push(HOME_ROUTER);
    }
    if (
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.isFromCliqAndPiq
    ) {
      this.setState({
        isComingFromCliqAndPiq: true
      });
    }
    //update cliqCash Amount
    if (
      nextProps.cart.paymentModes &&
      nextProps.cart.paymentModes.cliqCash &&
      nextProps.cart.paymentModes.cliqCash.totalCliqCashBalance
    ) {
      this.setState({
        cliqCashAmount: nextProps.cart.paymentModes.cliqCash
          .totalCliqCashBalance.value
          ? Math.round(
              nextProps.cart.paymentModes.cliqCash.totalCliqCashBalance.value *
                100
            ) / 100
          : "0.00"
      });
    }
    if (nextProps.cart.isNoCostEmiApplied && !this.state.isNoCostEmiApplied) {
      this.setState({
        isNoCostEmiApplied: true,
        isNoCostEmiProceeded: false
      });
    }
    if (
      !nextProps.cart.isNoCostEmiApplied &&
      !this.state.isNoCostEmiApplied &&
      nextProps.retryPaymentDetails
    ) {
      if (nextProps.retryPaymentDetails.retryFlagEmiCoupon) {
        this.setState({
          isNoCostEmiApplied: true,
          isNoCostEmiProceeded: false
        });
      }
    }
    this.availabilityOfUserCoupon();
    if (
      !this.state.isCheckoutAddressSelected &&
      nextProps.cart.getUserAddressStatus === SUCCESS &&
      nextProps.cart &&
      nextProps.cart.userAddress &&
      nextProps.cart.userAddress.addresses
    ) {
      let defaultAddressId = null;
      let defaultAddress;
      if (this.state.isFirstAddress) {
        defaultAddress = nextProps.cart.userAddress.addresses[0];
        this.setState({ isFirstAddress: false, confirmAddress: true });
        this.props.addAddressToCart(
          defaultAddress.id,
          defaultAddress.postalCode,
          this.state.isComingFromCliqAndPiq
        );
        if (this.state.isComingFromCliqAndPiq) {
          this.setState({ confirmAddress: true });
          this.getPaymentModes();
        }
      } else {
        defaultAddress = nextProps.cart.userAddress.addresses.find(address => {
          return address.defaultAddress;
        });
      }
      if (defaultAddress) {
        defaultAddressId = defaultAddress.id;
      }
      if (!localStorage.getItem(CNC_CART)) {
        this.updateLocalStoragePinCode(
          defaultAddress && defaultAddress.postalCode
        );
      }
      this.setState({
        addressId: defaultAddressId,
        selectedAddress: defaultAddress
      });
    }

    if (
      nextProps.retryPaymentDetails &&
      nextProps.retryPaymentDetailsStatus === "success"
    ) {
      const parsedQueryString = queryString.parse(this.props.location.search);
      let guId = parsedQueryString.value
        ? parsedQueryString.value
        : Cookie.getCookie(OLD_CART_GU_ID);
      let retryPaymentDetailsObject = {};
      retryPaymentDetailsObject.retryCartGuid = guId;
      if (localStorage.getItem(RETRY_PAYMENT_DETAILS)) {
        localStorage.removeItem(RETRY_PAYMENT_DETAILS);
      }
      if (
        this.props.cart.cartDetails &&
        this.props.cart.cartDetails.cartAmount
      ) {
        const { cartAmount, ...paymentDetails } = nextProps.retryPaymentDetails;
        const updatedPaymentDetails = {
          ...this.props.cart.cartDetails,
          ...paymentDetails
        };
        retryPaymentDetailsObject.retryPaymentDetails = updatedPaymentDetails;
        localStorage.setItem(
          RETRY_PAYMENT_DETAILS,
          JSON.stringify(retryPaymentDetailsObject)
        );
      } else {
        retryPaymentDetailsObject.retryPaymentDetails =
          nextProps.retryPaymentDetails;
        localStorage.setItem(
          RETRY_PAYMENT_DETAILS,
          JSON.stringify(retryPaymentDetailsObject)
        );
      }
      // Updated total amount in state for retry payment
      this.setState({
        payableAmount:
          Math.round(
            retryPaymentDetailsObject &&
              retryPaymentDetailsObject.retryPaymentDetails &&
              retryPaymentDetailsObject.retryPaymentDetails.cartAmount &&
              retryPaymentDetailsObject.retryPaymentDetails.cartAmount
                .paybleAmount.doubleValue * 100
          ) / 100
      });
    }
    // end of adding default address is selected
    // adding selected default delivery modes for every product for retry payment
    if (
      this.state.isComingFromRetryUrl &&
      nextProps.cart &&
      nextProps.cart.getUserAddressAndDeliveryModesByRetryPaymentStatus ===
        SUCCESS &&
      nextProps.cart.getUserAddressAndDeliveryModesByRetryPayment &&
      nextProps.cart.getUserAddressAndDeliveryModesByRetryPayment
        .selectedAddress
    ) {
      let defaultAddressId = null;
      let defaultAddress;
      defaultAddress =
        nextProps.cart.getUserAddressAndDeliveryModesByRetryPayment
          .selectedAddress;
      if (defaultAddress) {
        defaultAddressId = defaultAddress.id;
      }
      if (!localStorage.getItem(CNC_CART)) {
        this.updateLocalStoragePinCode(defaultAddress.postalCode);
      }
      this.setState({
        addressId: defaultAddressId,
        selectedAddress: defaultAddress
      });
    }
    if (
      this.state.isComingFromRetryUrl &&
      nextProps.cart &&
      nextProps.cart.getUserAddressAndDeliveryModesByRetryPaymentStatus ===
        SUCCESS &&
      nextProps.cart.getUserAddressAndDeliveryModesByRetryPayment &&
      nextProps.cart.getUserAddressAndDeliveryModesByRetryPayment.products
    ) {
      let defaultSelectedDeliveryModes = {};

      nextProps.cart.getUserAddressAndDeliveryModesByRetryPayment.products.forEach(
        product => {
          if (
            product.selectedDeliveryModeCode === "SDD" ||
            product.selectedDeliveryModeCode === SAME_DAY_DELIVERY
          ) {
            let newObjectAdd = {};
            newObjectAdd[product.USSID] = SAME_DAY_DELIVERY;
            Object.assign(defaultSelectedDeliveryModes, newObjectAdd);
          } else if (product.selectedDeliveryModeCode === "ED") {
            let newObjectAdd = {};
            newObjectAdd[product.USSID] = EXPRESS;
            Object.assign(defaultSelectedDeliveryModes, newObjectAdd);
          } else if (product.selectedDeliveryModeCode === "HD") {
            let newObjectAdd = {};
            newObjectAdd[product.USSID] = HOME_DELIVERY;
            Object.assign(defaultSelectedDeliveryModes, newObjectAdd);
          } else if (product.selectedDeliveryModeCode === "CNC") {
            this.setState(
              {
                selectedProductsUssIdForCliqAndPiq: product && product.USSID
              },
              () => {
                const updatedDeliveryModeUssid = this.state
                  .ussIdAndDeliveryModesObj;
                let selectedSlaveIdObj = "";
                updatedDeliveryModeUssid[product && product.USSID] = COLLECT;
                selectedSlaveIdObj = cloneDeep(this.state.selectedSlaveIdObj);
                selectedSlaveIdObj[
                  this.state.selectedProductsUssIdForCliqAndPiq
                ] = product.selectedStoreCNC;
                this.setState(
                  {
                    ussIdAndDeliveryModesObj: updatedDeliveryModeUssid,
                    cliqPiqSelected: true,
                    isDeliveryModeSelected: true,
                    deliverMode: true,
                    selectedSlaveIdObj,
                    isCheckoutAddressSelected: true
                  },
                  () => {
                    localStorage.setItem(
                      SELECTED_DELIVERY_MODE,
                      JSON.stringify(updatedDeliveryModeUssid)
                    );
                  }
                );
              }
            );
          }
        }
      );
      localStorage.setItem(
        SELECTED_DELIVERY_MODE,
        JSON.stringify(defaultSelectedDeliveryModes)
      );
      this.setState({ ussIdAndDeliveryModesObj: defaultSelectedDeliveryModes });
    }

    if (
      nextProps.location &&
      nextProps.location.state &&
      nextProps.location.state.isFromCliqAndPiq &&
      nextProps.cart.cartDetailsCNCStatus === SUCCESS &&
      nextProps.cart &&
      nextProps.cart.cartDetailsCNC &&
      this.state.confirmAddress
    ) {
      if (
        nextProps.cart.cartDetailsCNC &&
        nextProps.cart.cartDetailsCNC.products
      ) {
        this.setState(
          {
            selectedProductsUssIdForCliqAndPiq:
              nextProps.cart.cartDetailsCNC.products[0] &&
              nextProps.cart.cartDetailsCNC.products[0].USSID
          },
          () => {
            const updatedDeliveryModeUssid = this.state
              .ussIdAndDeliveryModesObj;
            let selectedSlaveIdObj;
            updatedDeliveryModeUssid[
              nextProps.cart.cartDetailsCNC.products[0] &&
                nextProps.cart.cartDetailsCNC.products[0].USSID
            ] = COLLECT;
            if (
              nextProps.cart.cartDetailsCNC.products[0] &&
              nextProps.cart.cartDetailsCNC.products[0].storeDetails &&
              nextProps.cart.cartDetailsCNC.products[0].storeDetails.slaveId
            ) {
              selectedSlaveIdObj = cloneDeep(this.state.selectedSlaveIdObj);
              selectedSlaveIdObj[
                this.state.selectedProductsUssIdForCliqAndPiq
              ] =
                nextProps.cart.cartDetailsCNC.products[0].storeDetails.slaveId;
            }
            this.setState(
              {
                ussIdAndDeliveryModesObj: updatedDeliveryModeUssid,
                cliqPiqSelected: true,
                isDeliveryModeSelected: true,
                isComingFromCliqAndPiq: true,
                deliverMode: true,
                selectedSlaveIdObj
              },
              () => {
                localStorage.setItem(
                  SELECTED_DELIVERY_MODE,
                  JSON.stringify(updatedDeliveryModeUssid)
                );
              }
            );
          }
        );
      }
    }
    if (!nextProps.cart.getUserAddressStatus && !this.state.isPaymentFailed) {
      this.props.getUserAddress(
        localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE)
      );
    }
    if (
      !this.state.isComingFromCliqAndPiq &&
      !this.state.isDeliveryModeSelected &&
      !this.state.isSelectedDeliveryModes &&
      nextProps.cart.cartDetailsCNCStatus === SUCCESS &&
      nextProps.cart &&
      nextProps.cart.cartDetailsCNC
    ) {
      let defaultSelectedDeliveryModes = {};
      if (
        nextProps.cart.cartDetailsCNC &&
        nextProps.cart.cartDetailsCNC.products
      ) {
        nextProps.cart.cartDetailsCNC.products.forEach(product => {
          if (
            product.pinCodeResponse &&
            product.pinCodeResponse.isServicable === NO
          ) {
            this.props.history.push(PRODUCT_CART_ROUTER);
          }
          if (
            product.isGiveAway === NO &&
            product.pinCodeResponse &&
            product.pinCodeResponse.isServicable !== NO
          ) {
            if (
              product.elligibleDeliveryMode &&
              product.elligibleDeliveryMode.findIndex(mode => {
                return mode.code === SAME_DAY_DELIVERY;
              }) >= 0
            ) {
              let newObjectAdd = {};
              newObjectAdd[product.USSID] = SAME_DAY_DELIVERY;
              Object.assign(defaultSelectedDeliveryModes, newObjectAdd);
            } else if (
              product.elligibleDeliveryMode &&
              product.elligibleDeliveryMode.findIndex(mode => {
                return mode.code === EXPRESS;
              }) >= 0
            ) {
              let newObjectAdd = {};
              newObjectAdd[product.USSID] = EXPRESS;
              Object.assign(defaultSelectedDeliveryModes, newObjectAdd);
            } else if (
              product.elligibleDeliveryMode &&
              product.elligibleDeliveryMode.findIndex(mode => {
                return mode.code === HOME_DELIVERY;
              }) >= 0
            ) {
              let newObjectAdd = {};
              newObjectAdd[product.USSID] = HOME_DELIVERY;
              Object.assign(defaultSelectedDeliveryModes, newObjectAdd);
            }
          }
        });
        localStorage.setItem(
          SELECTED_DELIVERY_MODE,
          JSON.stringify(defaultSelectedDeliveryModes)
        );
      }
      if (
        this.props.cart.cartDetailsCNC &&
        this.state.confirmAddress &&
        !this.state.deliverMode &&
        !this.state.isGiftCard &&
        !this.state.showCliqAndPiq
      ) {
        setDataLayerForCheckoutDirectCalls(
          ADOBE_CALL_FOR_SELECT_DELIVERY_MODE,
          defaultSelectedDeliveryModes
        );
      }

      this.setState({
        ussIdAndDeliveryModesObj: defaultSelectedDeliveryModes
      });
    }
    // end if adding selected default delivery modes for every product
    if (nextProps.cart.cliqCashPaymentDetails && !this.state.isPaymentFailed) {
      this.setState({
        isRemainingAmount:
          nextProps.cart.cliqCashPaymentDetails.isRemainingAmount,
        cliqCashAmount:
          nextProps.cart.cliqCashPaymentDetails.cliqCashBalance.value > 0
            ? Math.round(
                nextProps.cart.cliqCashPaymentDetails.cliqCashBalance.value *
                  100
              ) / 100
            : "0.00",
        cliqCashPaidAmount:
          nextProps.cart.cliqCashPaymentDetails.cliqCashPaidAmount.value > 0
            ? Math.round(
                nextProps.cart.cliqCashPaymentDetails.cliqCashPaidAmount.value *
                  100
              ) / 100
            : "0.00"
      });
    } else {
      if (nextProps.cart.cartDetailsCNC && this.state.isRemainingAmount) {
        let cliqCashAmount = 0;
        if (
          nextProps.cart.paymentModes &&
          nextProps.cart.paymentModes.cliqCash &&
          nextProps.cart.paymentModes.cliqCash.totalCliqCashBalance
        ) {
          cliqCashAmount = nextProps.cart.paymentModes.cliqCash
            .totalCliqCashBalance.value
            ? Math.round(
                nextProps.cart.paymentModes.cliqCash.totalCliqCashBalance
                  .value * 100
              ) / 100
            : "0.00";
        }
        if (
          nextProps.cart &&
          nextProps.cart.emiEligibilityDetails &&
          nextProps.cart.emiEligibilityDetails.isNoCostEMIEligible &&
          nextProps.cart.cartDetailsCNC.cartAmount &&
          nextProps.cart.cartDetailsCNC.cartAmount.noCostEMIDiscountValue
        ) {
          this.setState({
            noCostEmiDiscount: nextProps.cart.cartDetailsCNC.cartAmount
              .noCostEMIDiscountValue.value
              ? Math.round(
                  nextProps.cart.cartDetailsCNC.cartAmount
                    .noCostEMIDiscountValue.value * 100
                ) / 100
              : "0.00"
          });
        } else {
          this.setState({
            noCostEmiDiscount: "0.00"
          });
        }

        this.setState({
          cliqCashAmount: cliqCashAmount,
          userCliqCashAmount: cliqCashAmount
        });

        if (
          !this.state.isPaymentFailed &&
          nextProps.cart.cartDetailsCNC &&
          nextProps.cart.cartDetailsCNC.deliveryCharge
        ) {
          this.setState({
            deliveryCharge:
              nextProps.cart.cartDetailsCNC &&
              nextProps.cart.cartDetailsCNC.deliveryCharge
          });
        } else {
          this.setState({
            deliveryCharge:
              nextProps.cart.paymentFailureOrderDetails &&
              nextProps.cart.paymentFailureOrderDetails.deliveryCharges &&
              nextProps.cart.paymentFailureOrderDetails.deliveryCharges.value
                ? Math.round(
                    nextProps.cart.paymentFailureOrderDetails.deliveryCharges
                      .value * 100
                  ) / 100
                : "0.00"
          });
        }

        if (
          this.state.isPaymentFailed &&
          nextProps.cart.paymentFailureOrderDetails
        ) {
          this.setState({
            isCliqCashApplied:
              nextProps.cart.paymentFailureOrderDetails.cliqCashApplied,
            cliqCashPaidAmount:
              nextProps.cart.paymentFailureOrderDetails.cliqCashPaidAmount &&
              nextProps.cart.paymentFailureOrderDetails.cliqCashPaidAmount.value
          });
        }

        this.setState({
          couponDiscount:
            nextProps.cart.cartDetailsCNC &&
            nextProps.cart.cartDetailsCNC.cartAmount &&
            nextProps.cart.cartDetailsCNC.cartAmount.couponDiscountAmount
              ? Math.round(
                  nextProps.cart.cartDetailsCNC.cartAmount.couponDiscountAmount
                    .value * 100
                ) / 100
              : "0.00"
        });
      }
    }
    if (nextProps.cart.justPayPaymentDetails !== null) {
      if (nextProps.cart.justPayPaymentDetails.payment) {
        if (
          nextProps.cart.justPayPaymentDetails &&
          nextProps.cart.justPayPaymentDetails.payment &&
          nextProps.cart.justPayPaymentDetails.payment.authentication &&
          nextProps.cart.justPayPaymentDetails.payment.authentication.method ===
            "GET"
        ) {
          if (nextProps.cart.justPayPaymentDetails.payment.authentication.url) {
            this.navigateToJusPayOnGET(
              nextProps.cart.justPayPaymentDetails.payment.authentication.url
            );
          } else {
            this.props.displayToast("Opps Some thing went wrong");
          }
        } else if (
          nextProps.cart.justPayPaymentDetails &&
          nextProps.cart.justPayPaymentDetails.payment &&
          nextProps.cart.justPayPaymentDetails.payment.authentication &&
          nextProps.cart.justPayPaymentDetails.payment.authentication.method ===
            "POST"
        ) {
          var juspayResponse = nextProps.cart.justPayPaymentDetails; // assuming that `res` holds the data return by JusPay API
          this.navigateToJusPayOnPOST(juspayResponse);
        } else {
          window.location.replace(
            nextProps.cart.justPayPaymentDetails.payment.authentication.url
          );
        }
      }
    }
    if (nextProps.cart.orderConfirmationDetailsStatus === SUCCESS) {
      window.scrollTo(0, 0);
      this.setState({ orderConfirmation: true, paymentConfirmation: false });
    }

    if (nextProps.cart.getPrepaidOrderPaymentConfirmationStatus === SUCCESS) {
      window.scrollTo(0, 0);
      this.setState({ paymentConfirmation: true, orderConfirmation: false });
    }

    if (
      nextProps.cart.cliqCashJusPayDetails &&
      nextProps.cart.orderConfirmationDetailsStatus !== "requesting"
    ) {
      this.setState({
        orderId: nextProps.cart.cliqCashJusPayDetails.orderId
      });
      this.props.orderConfirmation(
        nextProps.cart.cliqCashJusPayDetails.orderId
      );
    }
    if (
      nextProps.cart.cliqCashStripeDetails &&
      nextProps.cart.getPrepaidOrderPaymentConfirmationStatus !== "requesting"
    ) {
      this.setState({
        orderId: nextProps.cart.cliqCashStripeDetails.pspOrderId
      });
      const stripeDetails = JSON.parse(localStorage.getItem(STRIPE_DETAILS));
      if (stripeDetails) {
        this.props.getPrepaidOrderPaymentConfirmation(stripeDetails);
      }
    }
  }

  componentWillUnmount() {
    // Navigating from checkout page call minicart
    this.props.getMinicartProducts();

    if (localStorage.getItem(CNC_CART)) {
      localStorage.removeItem(CNC_CART);
      this.props.history.goBack();
    }
    // if user go back from checkout page then
    // we have relsease coupon if user applied any coupon
    if (this.props.history.action === "POP") {
      if (this.state.selectedBankOfferCode && !this.state.isPaymentFailed) {
        this.props.releaseBankOffer(this.state.selectedBankOfferCode);
      }
    }
    if (
      this.props.cart &&
      this.props.cart.orderConfirmationDetailsStatus === SUCCESS
    ) {
      localStorage.removeItem(ORDER_ID_FOR_ORDER_CONFIRMATION_PAGE);
    }
    if (
      this.props.cart &&
      this.props.cart.getPrepaidOrderPaymentConfirmationStatus === SUCCESS
    ) {
      localStorage.removeItem(ORDER_ID_FOR_PAYMENT_CONFIRMATION_PAGE);
    }
    this.props.clearCartDetails();
    this.props.resetIsSoftReservationFailed();
    if (this.props.retryPaymentDetails) {
      this.props.resetFailedOrderDetails();
    }
    if (localStorage.getItem(FAILED_ORDER)) {
      localStorage.removeItem(FAILED_ORDER);
    }
  }
  componentDidMount() {
    let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    let cartDetailsLoggedInUser = Cookie.getCookie(
      CART_DETAILS_FOR_LOGGED_IN_USER
    );

    if (!customerCookie || !userDetails) {
      return this.navigateToLogin();
    }
    /*

adding check for order confirmation page after non juspay payment methods
if you have order id in local storage then you have to show order confirmation page

*/
    const OrderIdForOrderUsingNonJusPayPayments = localStorage.getItem(
      ORDER_ID_FOR_ORDER_CONFIRMATION_PAGE
    );
    if (OrderIdForOrderUsingNonJusPayPayments) {
      this.props.orderConfirmation(OrderIdForOrderUsingNonJusPayPayments);
      return;
    }
    const orderIdForPaymentConfirmationPage = localStorage.getItem(
      ORDER_ID_FOR_PAYMENT_CONFIRMATION_PAGE
    );
    const stripeDetails = JSON.parse(localStorage.getItem(STRIPE_DETAILS));
    if (orderIdForPaymentConfirmationPage && stripeDetails) {
      this.props.getPrepaidOrderPaymentConfirmation(stripeDetails);
      return;
    }
    const parsedQueryString = queryString.parse(this.props.location.search);
    const value = parsedQueryString.status;
    const orderId = parsedQueryString.order_id;
    if (!orderId) {
      setDataLayerForCheckoutDirectCalls(
        ADOBE_LANDING_ON_ADDRESS_TAB_ON_CHECKOUT_PAGE
      );
    }
    this.setState({ orderId: orderId });
    if (
      (value &&
        value !== JUS_PAY_CHARGED &&
        value !== JUS_PAY_SUCCESS &&
        !this.props.cart.isPaymentProceeded) ||
      (parsedQueryString.payment_intent &&
        this.props.cart.isGetPrepaidOrderPaymentConfirmationFailed &&
        !this.props.cart.isPaymentProceeded)
    ) {
      const oldCartId = Cookies.getCookie(OLD_CART_GU_ID);
      if (!oldCartId) {
        return this.navigateUserToMyBagAfter15MinOfpaymentFailure();
      }
      this.setState({ isPaymentFailed: true });
      if (stripeDetails) {
        if (this.props.getPrepaidOrderPaymentConfirmation) {
          this.props.getPrepaidOrderPaymentConfirmation(stripeDetails);
        }
      }
      this.props.getPaymentFailureOrderDetails();

      if (localStorage.getItem(EGV_GIFT_CART_ID)) {
        let giftCartObj = JSON.parse(localStorage.getItem(EGV_GIFT_CART_ID));
        this.setState({
          isGiftCard: true,
          isRemainingAmount: true,
          payableAmount: Math.round(giftCartObj.amount * 100) / 100,
          bagAmount: Math.round(giftCartObj.amount * 100) / 100,
          egvCartGuid: giftCartObj.egvCartGuid
        });
      } else if (localStorage.getItem(RETRY_PAYMENT_CART_ID)) {
        let retryPaymentDetailsObj = JSON.parse(
          localStorage.getItem(RETRY_PAYMENT_DETAILS)
        );
        let retryCartId = JSON.parse(
          localStorage.getItem(RETRY_PAYMENT_CART_ID)
        );
        this.setState(
          {
            isComingFromRetryUrl: true,
            payableAmount:
              Math.round(
                retryPaymentDetailsObj &&
                  retryPaymentDetailsObj.retryPaymentDetails &&
                  retryPaymentDetailsObj.retryPaymentDetails.cartAmount &&
                  retryPaymentDetailsObj.retryPaymentDetails.cartAmount
                    .paybleAmount.doubleValue * 100
              ) / 100,
            bagAmount:
              Math.round(
                retryPaymentDetailsObj &&
                  retryPaymentDetailsObj.retryPaymentDetails &&
                  retryPaymentDetailsObj.retryPaymentDetails.cartAmount &&
                  retryPaymentDetailsObj.retryPaymentDetails.cartAmount.bagTotal
                    .doubleValue * 100
              ) / 100,
            retryCartGuid: retryCartId,
            retryFlagForEmiCoupon:
              retryPaymentDetailsObj &&
              retryPaymentDetailsObj.retryPaymentDetails &&
              retryPaymentDetailsObj.retryPaymentDetails.retryFlagEmiCoupon
                ? retryPaymentDetailsObj.retryPaymentDetails.retryFlagEmiCoupon
                : false,
            isRemainingAmount: true,
            deliverMode: true,
            confirmAddress: true
          },
          () => {
            if (
              (this.props.location &&
                this.props.location.state &&
                this.props.location.state.retryPaymentGuid) ||
              (this.state.isComingFromRetryUrl && this.state.retryCartGuid)
            ) {
              let retryCartGuId;
              if (this.state.retryCartGuid) {
                retryCartGuId = this.state.retryCartGuid;
              } else {
                retryCartGuId = this.props.location.state.retryPaymentGuid;
              }
              this.props.getUserAddressAndDeliveryModesByRetryPayment(
                retryCartGuId
              );
            }
          }
        );
      }
      this.getPaymentModes();
    } else if (value === JUS_PAY_CHARGED) {
      const stripeDetails = JSON.parse(localStorage.getItem(STRIPE_DETAILS));
      if (stripeDetails) {
        if (this.props.getPrepaidOrderPaymentConfirmation) {
          this.props.getPrepaidOrderPaymentConfirmation(stripeDetails);
        }
      }
      // Show popup if OrderConfirmation returns whatsapp false
      // let showWhatsappPopup =
      //   this.props.cart.orderConfirmationDetails &&
      //   this.props.cart.orderConfirmationDetails.whatsapp
      //     ? this.props.cart.orderConfirmationDetails.whatsapp
      //     : null;
      let showWhatsappPopup = true;
      if (!showWhatsappPopup) {
        let orderId =
          this.props.cart.orderConfirmationDetails &&
          this.props.cart.orderConfirmationDetails.orderRefNo;
        this.whatsappNotification(orderId);
      }
    } else if (parsedQueryString.payment_intent) {
      const stripeDetails = JSON.parse(localStorage.getItem(STRIPE_DETAILS));
      if (this.props.getPrepaidOrderPaymentConfirmation) {
        this.props.getPrepaidOrderPaymentConfirmation(stripeDetails);
      }
    } else if (
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.isFromGiftCard &&
      this.props.location.state.amount
    ) {
      let giftCartObj = JSON.parse(localStorage.getItem(EGV_GIFT_CART_ID));
      if (!giftCartObj) {
        giftCartObj = this.props.location.state;
      }
      this.getPaymentModes();
      this.setState({
        isGiftCard: true,
        isRemainingAmount: true,
        payableAmount: Math.round(giftCartObj.amount * 100) / 100,
        bagAmount: Math.round(giftCartObj.amount * 100) / 100,
        egvCartGuid: giftCartObj.egvCartGuid
      });
    } else if (
      (this.props.location &&
        this.props.location.state &&
        this.props.location.state.isFromRetryUrl) ||
      this.props.location.pathname === `${RETRY_FAILED_ORDER}`
    ) {
      let retryPaymentDetailsObj = JSON.parse(
        localStorage.getItem(RETRY_PAYMENT_DETAILS)
      );
      let retryCartId = JSON.parse(localStorage.getItem(RETRY_PAYMENT_CART_ID));
      if (!retryCartId) {
        let querySearch = this.props.location.search;
        const parsedQueryString = queryString.parse(querySearch);
        retryCartId = parsedQueryString.value;
      }

      this.setState(
        {
          isComingFromRetryUrl: true,
          payableAmount:
            Math.round(
              retryPaymentDetailsObj &&
                retryPaymentDetailsObj.retryPaymentDetails &&
                retryPaymentDetailsObj.retryPaymentDetails.cartAmount &&
                retryPaymentDetailsObj.retryPaymentDetails.cartAmount
                  .paybleAmount.doubleValue * 100
            ) / 100,
          bagAmount:
            Math.round(
              retryPaymentDetailsObj &&
                retryPaymentDetailsObj.retryPaymentDetails &&
                retryPaymentDetailsObj.retryPaymentDetails.cartAmount &&
                retryPaymentDetailsObj.retryPaymentDetails.cartAmount.bagTotal
                  .doubleValue * 100
            ) / 100,
          retryCartGuid: retryCartId,
          retryFlagForEmiCoupon:
            retryPaymentDetailsObj &&
            retryPaymentDetailsObj.retryPaymentDetails &&
            retryPaymentDetailsObj.retryPaymentDetails.retryFlagEmiCoupon
              ? retryPaymentDetailsObj.retryPaymentDetails.retryFlagEmiCoupon
              : false,
          isRemainingAmount: true,
          deliverMode: true,
          confirmAddress: true
        },
        () => {
          this.getPaymentModes();
          if (
            (this.props.location &&
              this.props.location.state &&
              this.props.location.state.retryPaymentGuid) ||
            (this.state.isComingFromRetryUrl && this.state.retryCartGuid)
          ) {
            let retryCartGuId;
            if (this.state.retryCartGuid) {
              retryCartGuId = this.state.retryCartGuid;
            } else {
              retryCartGuId = this.props.location.state.retryPaymentGuid;
            }
            this.props.getUserAddressAndDeliveryModesByRetryPayment(
              retryCartGuId
            );
          }
        }
      );
    } else {
      if (this.props.getCartDetailsCNC && this.props.getUserAddress) {
        let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
        let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
        let cartDetailsLoggedInUser = Cookie.getCookie(
          CART_DETAILS_FOR_LOGGED_IN_USER
        );

        if (
          userDetails &&
          customerCookie &&
          cartDetailsLoggedInUser &&
          !this.state.isPaymentFailed
        ) {
          this.props.getCartDetailsCNC(
            JSON.parse(userDetails).userName,
            JSON.parse(customerCookie).access_token,
            JSON.parse(cartDetailsLoggedInUser).code,
            localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE),
            false
          );
        }
        if (
          this.props.location &&
          this.props.location.state &&
          this.props.location.state.isFromCliqAndPiq
        ) {
          this.setState({
            isComingFromCliqAndPiq: true
          });
        }
        if (!this.props.cart.userAddress && !this.state.isPaymentFailed) {
          this.props.getUserAddress(
            localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE)
          );
        }
        if (!cartDetailsLoggedInUser) {
          this.props.history.push(HOME_ROUTER);
        }
      }
    }
    if (
      this.props.location.state &&
      this.props.location.state.retryPaymentGuid
    ) {
      localStorage.setItem(
        RETRY_PAYMENT_CART_ID,
        JSON.stringify(this.props.location.state.retryPaymentGuid)
      );
    }
    if (this.props.location.state && this.props.location.state.egvCartGuid) {
      localStorage.setItem(
        EGV_GIFT_CART_ID,
        JSON.stringify(this.props.location.state)
      );
    }
    let failedorderRetryPayment = localStorage.getItem(FAILED_ORDER);
    if (this.props.location.pathname === `${RETRY_FAILED_ORDER}`) {
      let querySearch = this.props.location.search
        ? this.props.location.search
        : window.location.search;
      if (
        !querySearch &&
        failedorderRetryPayment &&
        !this.state.isComingFromRetryUrl
      ) {
        querySearch = failedorderRetryPayment.includes("?")
          ? failedorderRetryPayment.split("?")[1]
          : failedorderRetryPayment;
      }
      const parsedQueryString = queryString.parse(querySearch);

      let guId = parsedQueryString.value;

      let userId = parsedQueryString.userId;
      let userDetailsCookie = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
      const userDetails = JSON.parse(userDetailsCookie);
      if (userId === userDetails.customerId) {
        localStorage.setItem(RETRY_PAYMENT_CART_ID, JSON.stringify(guId));
        if (this.props.retryPayment) {
          this.props.retryPayment(guId, userId);
        }
      } else {
        this.props.displayToast(
          "PLease use your login credentials to complete this transaction"
        );
        this.props.history.push(HOME_ROUTER);
      }
    }
    let orderRetryCartId = JSON.parse(
      localStorage.getItem(RETRY_PAYMENT_CART_ID)
    );
    if (!cartDetailsLoggedInUser && orderRetryCartId) {
      Cookie.createCookie(
        CART_DETAILS_FOR_LOGGED_IN_USER,
        JSON.stringify({ guid: orderRetryCartId })
      );
    }
  }

  getEmiBankDetails = () => {
    if (this.props.getEmiBankDetails) {
      if (this.state.isPaymentFailed) {
        this.props.getEmiBankDetails(
          this.props.cart.paymentFailureOrderDetails &&
            this.props.cart.paymentFailureOrderDetails.cartAmount &&
            this.props.cart.paymentFailureOrderDetails.cartAmount.paybleAmount
              .value
        );
      } else {
        let noCostEmiCouponCode = localStorage.getItem(NO_COST_EMI_COUPON);
        if (noCostEmiCouponCode) {
          this.removeNoCostEmi(noCostEmiCouponCode);
        }
        this.setState({
          isNoCostEmiApplied: false,
          isNoCostEmiProceeded: false,
          noCostEmiBankName: null,
          noCostEmiDiscount: "0.00"
        });
        if (this.state.isComingFromRetryUrl) {
          this.props.getEmiBankDetails(this.state.payableAmount);
        } else {
          this.props.getEmiBankDetails(
            this.props.cart.cartDetailsCNC.cartAmount &&
              this.props.cart.cartDetailsCNC.cartAmount.paybleAmount.value
          );
        }
      }
    }
  };

  getEmiEligibility = () => {
    let carGuId;
    const parsedQueryString = queryString.parse(this.props.location.search);
    const value = parsedQueryString.status;

    if (value && value !== JUS_PAY_CHARGED && value !== JUS_PAY_SUCCESS) {
      carGuId = parsedQueryString.value;

      //get the NoCost Emi Coupon Code to release
      let noCostEmiCouponCode = localStorage.getItem(NO_COST_EMI_COUPON);

      if (noCostEmiCouponCode) {
        let cartId = localStorage.getItem(OLD_CART_CART_ID);
        this.props.removeNoCostEmi(noCostEmiCouponCode, carGuId, cartId);
      }
    } else {
      let cartDetailsLoggedInUser = Cookie.getCookie(
        CART_DETAILS_FOR_LOGGED_IN_USER
      );
      cartDetailsLoggedInUser &&
        localStorage.setItem(
          OLD_CART_CART_ID,
          JSON.parse(cartDetailsLoggedInUser).code
        );

      if (cartDetailsLoggedInUser) {
        carGuId = JSON.parse(cartDetailsLoggedInUser).guid;
      } else {
        carGuId = Cookie.getCookie(OLD_CART_GU_ID);
      }
    }
    if (this.props.getEmiEligibility) {
      this.setState({
        isNoCostEmiApplied: false,
        isNoCostEmiProceeded: false
      });
      if (
        (this.props.location &&
          this.props.location.state &&
          this.props.location.state.retryPaymentGuid) ||
        (this.state.isComingFromRetryUrl && this.state.retryCartGuid)
      ) {
        let retryCartGuId;
        if (this.state.retryCartGuid) {
          retryCartGuId = this.state.retryCartGuid;
        } else {
          retryCartGuId = this.props.location.state.retryPaymentGuid;
        }
        this.props.getEmiEligibility(retryCartGuId);
      } else {
        this.props.getEmiEligibility(carGuId);
      }
    }
  };

  getBankAndTenureDetails = () => {
    if (this.props.getBankAndTenureDetails) {
      this.setState({
        isNoCostEmiApplied: false,
        isNoCostEmiProceeded: false
      });
      this.props.getBankAndTenureDetails(
        this.state.retryFlagForEmiCoupon,
        this.state.isComingFromRetryUrl,
        this.state.retryCartGuid
      );
    }
  };

  getEmiTermsAndConditionsForBank = (bankCode, bankName) => {
    if (this.props.getEmiTermsAndConditionsForBank) {
      this.props.getEmiTermsAndConditionsForBank(bankCode, bankName);
    }
  };
  applyNoCostEmi = async (couponCode, bankName) => {
    if (this.state.isPaymentFailed) {
      const parsedQueryString = queryString.parse(this.props.location.search);
      const cartGuId = parsedQueryString.value
        ? parsedQueryString.value
        : Cookie.getCookie(OLD_CART_GU_ID);
      const cartId = localStorage.getItem(OLD_CART_CART_ID);
      if (this.props.applyNoCostEmi) {
        const applyNoCostEmiResponse = await this.props.applyNoCostEmi(
          couponCode,
          cartGuId,
          cartId
        );
        if (applyNoCostEmiResponse.status === SUCCESS) {
          this.setState({
            isNoCostEmiApplied: true,
            isNoCostEmiProceeded: false,
            noCostEmiBankName: bankName
          });
        }
        return applyNoCostEmiResponse;
      }
    } else {
      let cartDetailsLoggedInUser = Cookie.getCookie(
        CART_DETAILS_FOR_LOGGED_IN_USER
      );
      if (cartDetailsLoggedInUser) {
        let carGuId = JSON.parse(cartDetailsLoggedInUser).guid;
        let cartId = JSON.parse(cartDetailsLoggedInUser).code;
        if (this.props.applyNoCostEmi) {
          let applyNoCostEmiResponse = await this.props.applyNoCostEmi(
            couponCode,
            this.state.isComingFromRetryUrl
              ? this.state.retryCartGuid
              : carGuId,
            cartId,
            this.state.isComingFromRetryUrl
          );
          if (applyNoCostEmiResponse.status === SUCCESS) {
            this.setState({
              isNoCostEmiApplied: true,
              isNoCostEmiProceeded: false,
              noCostEmiBankName: bankName
            });
          }
          return applyNoCostEmiResponse;
        }
      }
    }
  };

  removeNoCostEmi = async couponCode => {
    if (this.state.isPaymentFailed) {
      const parsedQueryString = queryString.parse(this.props.location.search);
      const cartGuId = parsedQueryString.value
        ? parsedQueryString.value
        : Cookie.getCookie(OLD_CART_GU_ID);
      const cartId = localStorage.getItem(OLD_CART_CART_ID);
      if (this.props.removeNoCostEmi) {
        const removeNoCostEmiResponse = this.props.removeNoCostEmi(
          couponCode,
          cartGuId,
          cartId
        );
        if (removeNoCostEmiResponse.status === SUCCESS) {
          this.setState({
            isNoCostEmiApplied: false,
            isNoCostEmiProceeded: false,
            noCostEmiBankName: null,
            noCostEmiDiscount: "0.00"
          });
        }
        return removeNoCostEmiResponse;
      }
    } else {
      let cartDetailsLoggedInUser = Cookie.getCookie(
        CART_DETAILS_FOR_LOGGED_IN_USER
      );

      if (this.props.removeNoCostEmi) {
        let carGuId = JSON.parse(cartDetailsLoggedInUser).guid;
        let cartId = JSON.parse(cartDetailsLoggedInUser).code;
        const removeNoCostEmiResponse = await this.props.removeNoCostEmi(
          couponCode,
          carGuId,
          cartId
        );
        if (removeNoCostEmiResponse.status === SUCCESS) {
          this.setState({
            isNoCostEmiApplied: false,
            isNoCostEmiProceeded: false,
            noCostEmiBankName: null,
            noCostEmiDiscount: "0.00"
          });
        }
        return removeNoCostEmiResponse;
      }
    }
  };

  getItemBreakUpDetails = (couponCode, noCostEmiText, noCostProductCount) => {
    if (this.state.isPaymentFailed) {
      const parsedQueryString = queryString.parse(this.props.location.search);
      const cartGuId = parsedQueryString.value
        ? parsedQueryString.value
        : Cookie.getCookie(OLD_CART_GU_ID);
      this.props.getItemBreakUpDetails(
        couponCode,
        cartGuId,
        noCostEmiText,
        noCostProductCount
      );
    } else {
      if (this.props.getItemBreakUpDetails) {
        this.props.getItemBreakUpDetails(
          couponCode,
          null,
          noCostEmiText,
          noCostProductCount
        );
      }
    }
  };

  getNetBankDetails = () => {
    if (this.props.getNetBankDetails) {
      this.props.getNetBankDetails();
    }
  };

  getCODEligibility = cartId => {
    if (!this.state.isCliqCashApplied) {
      if (this.props.getCODEligibility) {
        this.props.getCODEligibility(
          this.state.isPaymentFailed,
          this.state.isComingFromRetryUrl,
          this.state.retryCartGuid
        );
      }
    }
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
    } else if (
      (this.props.location &&
        this.props.location.state &&
        this.props.location.state.retryPaymentGuid) ||
      (this.state.isComingFromRetryUrl && this.state.retryCartGuid)
    ) {
      let retryCartGuId;
      if (this.state.retryCartGuid) {
        retryCartGuId = this.state.retryCartGuid;
      } else {
        retryCartGuId = this.props.location.state.retryPaymentGuid;
      }
      this.props.getPaymentModes(retryCartGuId);
    } else {
      let cartGuId;
      const parsedQueryString = queryString.parse(this.props.location.search);
      if (parsedQueryString.value) {
        cartGuId = parsedQueryString.value
          ? parsedQueryString.value
          : Cookie.getCookie(OLD_CART_GU_ID);
      } else if (this.state.isPaymentFailed && !parsedQueryString.value) {
        cartGuId = Cookie.getCookie(OLD_CART_GU_ID);
      } else if (parsedQueryString.payment_intent) {
        cartGuId = Cookie.getCookie(OLD_CART_GU_ID);
      } else {
        let cartDetails = Cookie.getCookie(CART_DETAILS_FOR_LOGGED_IN_USER);
        cartGuId = cartDetails && JSON.parse(cartDetails).guid;
      }
      this.props.getPaymentModes(cartGuId);
    }
  };
  onSelectAddress(selectedAddress) {
    let addressSelected =
      this.props.cart.cartDetailsCNC &&
      this.props.cart.cartDetailsCNC.addressDetailsList &&
      this.props.cart.cartDetailsCNC.addressDetailsList.addresses.find(
        address => {
          return address.id === selectedAddress[0];
        }
      );
    this.updateLocalStoragePinCode(
      addressSelected && addressSelected.postalCode
    );
    // here we are checking the if user selected any address then setting our state
    // and in else condition if user deselect then this function will again call and
    //  then we are resetting the previous selected address
    if (selectedAddress[0]) {
      this.setState({
        confirmAddress: false,
        selectedAddress: addressSelected,
        isCheckoutAddressSelected: true,
        addressId: addressSelected && addressSelected.id,
        isDeliveryModeSelected: false
      });
    } else {
      this.setState({
        addressId: null,
        selectedAddress: null,
        isDeliveryModeSelected: false
      });
    }
  }
  changeDeliveryModes = () => {
    let noCostEmiCouponCode = localStorage.getItem(NO_COST_EMI_COUPON);
    if (this.state.captchaReseponseForCOD) {
      window.grecaptcha.reset();
    }
    if (this.state.isCliqCashApplied) {
      this.removeCliqCash();
    }
    if (noCostEmiCouponCode) {
      this.removeNoCostEmi(noCostEmiCouponCode);
    }
    if (this.state.selectedBankOfferCode && !this.state.isPaymentFailed) {
      this.props.releaseBankOffer(this.state.selectedBankOfferCode);
    }
    this.setState({
      cardDetails: {},
      bankCodeForNetBanking: null,
      bankNameForNetBanking: null,
      savedCardDetails: null,
      captchaReseponseForCOD: null,
      noCostEmiBankName: null,
      noCostEmiDiscount: "0.00",
      isNoCostEmiProceeded: false,
      paymentModeSelected: null,
      binValidationCOD: false,
      deliverMode: false,
      currentPaymentMode: null,
      isCliqCashApplied: false
    });
  };

  onChange(val) {
    this.setState(val);
  }

  getPinCodeDetails = pinCode => {
    if (this.props.getPinCode) {
      this.props.getPinCode(pinCode);
    }
  };

  availabilityOfUserCoupon = () => {
    if (!this.state.isGiftCard || !this.state.isComingFromRetryUrl) {
      let couponCookie = Cookie.getCookie(COUPON_COOKIE);
      let cartDetailsCouponDiscount;
      if (
        this.props.cart &&
        this.props.cart.cartDetailsCNC &&
        this.props.cart.cartDetailsCNC.cartAmount &&
        (this.props.cart.cartDetailsCNC.cartAmount.couponDiscountAmount ||
          this.props.cart.cartDetailsCNC.cartAmount.appliedCouponDiscount)
      ) {
        cartDetailsCouponDiscount = true;
      } else {
        cartDetailsCouponDiscount = false;
      }

      if (
        couponCookie &&
        !this.state.isCliqCashApplied &&
        !cartDetailsCouponDiscount &&
        this.props.cart.cartDetailsCNCStatus === SUCCESS
      ) {
        Cookies.deleteCookie(COUPON_COOKIE);
        this.props.displayToast(COUPON_AVAILABILITY_ERROR_MESSAGE);
      }
    }
  };

  checkAvailabilityOfService = () => {
    let productServiceAvailability =
      this.props &&
      this.props.cart &&
      this.props.cart.cartDetailsCNC &&
      this.props.cart.cartDetailsCNC.products.find(product => {
        return (
          product.isGiveAway === NO &&
          (product.pinCodeResponse === undefined ||
            (product.pinCodeResponse &&
              product.pinCodeResponse.isServicable === "N"))
        );
      });

    return productServiceAvailability;
  };
  handleSubmitAfterPaymentFailure = () => {
    if (this.state.isNoCostEmiApplied) {
      this.setState({ isNoCostEmiProceeded: true });
    }
    // navigate user to myBag page is old cart dose not exist
    const oldCartId = Cookies.getCookie(OLD_CART_GU_ID);
    if (!oldCartId) {
      return this.navigateUserToMyBagAfter15MinOfpaymentFailure();
    }
    if (
      this.state.savedCardDetails !== "" &&
      this.state.savedCardDetails !== null
    ) {
      if (this.state.isGiftCard) {
        if (this.props.cart.isCreatePaymentOrderFailed) {
          this.props.createPaymentOrder(this.state.egvCartGuid);
        }
        this.props.collectPaymentOrderForGiftCardFromSavedCards(
          this.state.savedCardDetails,
          this.state.egvCartGuid
        );
      } else if (this.state.isComingFromRetryUrl) {
        if (this.props.cart.isCreatePaymentOrderFailed) {
          this.props.createPaymentOrder(this.state.retryCartGuid);
        }
        this.props.collectPaymentOrderForSavedCards(
          this.state.savedCardDetails,
          JSON.parse(localStorage.getItem(CART_ITEM_COOKIE)),
          true,
          true,
          this.state.retryCartGuid
        );
      } else {
        if (this.props.cart.isCreatePaymentOrderFailed) {
          this.props.createPaymentOrder();
        }
        this.props.collectPaymentOrderForSavedCards(
          this.state.savedCardDetails,
          JSON.parse(localStorage.getItem(CART_ITEM_COOKIE)),
          true // for payment failure we need to use old cart id);
        );
      }
    }
    if (
      this.state.currentPaymentMode === CREDIT_CARD ||
      (this.state.currentPaymentMode === EMI &&
        !this.state.isNoCostEmiApplied) ||
      this.state.currentPaymentMode === DEBIT_CARD
    ) {
      if (this.state.isGiftCard) {
        this.props.stripe_juspay_TokenizeGiftCard(
          this.state.cardDetails,
          this.state.paymentModeSelected,
          this.state.egvCartGuid
        );
      } else if (this.state.isComingFromRetryUrl) {
        this.props.stripe_juspay_Tokenize(
          this.state.cardDetails,
          JSON.parse(localStorage.getItem(ADDRESS_FOR_PLACE_ORDER)),
          JSON.parse(localStorage.getItem(CART_ITEM_COOKIE)),
          this.state.paymentModeSelected,
          true,
          true,
          this.state.retryCartGuid
        );
      } else {
        this.props.stripe_juspay_Tokenize(
          this.state.cardDetails,
          JSON.parse(localStorage.getItem(ADDRESS_FOR_PLACE_ORDER)),
          JSON.parse(localStorage.getItem(CART_ITEM_COOKIE)),
          this.state.paymentModeSelected,
          true
        );
      }
    }
    if (
      this.state.currentPaymentMode === EMI &&
      this.state.isNoCostEmiProceeded
    ) {
      if (this.state.isComingFromRetryUrl) {
        this.props.stripe_juspay_Tokenize(
          this.state.cardDetails,
          JSON.parse(localStorage.getItem(ADDRESS_FOR_PLACE_ORDER)),
          JSON.parse(localStorage.getItem(CART_ITEM_COOKIE)),
          this.state.paymentModeSelected,
          true,
          true,
          this.state.retryCartGuid
        );
      } else {
        this.props.stripe_juspay_Tokenize(
          this.state.cardDetails,
          JSON.parse(localStorage.getItem(ADDRESS_FOR_PLACE_ORDER)),
          JSON.parse(localStorage.getItem(CART_ITEM_COOKIE)),
          this.state.paymentModeSelected,
          true
        );
      }
    }
    if (this.state.currentPaymentMode === NET_BANKING_PAYMENT_MODE) {
      if (this.state.isGiftCard) {
        if (this.props.cart.isCreatePaymentOrderFailed) {
          this.props.createPaymentOrder(this.state.egvCartGuid);
        }
        if (this.props.collectPaymentOrderForGiftCardNetBanking) {
          this.props.collectPaymentOrderForGiftCardNetBanking(
            this.state.egvCartGuid,
            this.state.bankCodeForNetBanking,
            this.state.bankNameForNetBanking
          );
        }
      } else if (this.state.isComingFromRetryUrl) {
        if (this.props.cart.isCreatePaymentOrderFailed) {
          this.props.createPaymentOrder(this.state.retryCartGuid);
        }
        this.props.collectPaymentOrderForNetBanking(
          NET_BANKING,
          JSON.parse(localStorage.getItem(CART_ITEM_COOKIE)),
          this.state.bankCodeForNetBanking,
          localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE),
          true,
          this.state.retryCartGuid,
          this.state.bankNameForNetBanking,
          true
        );
      } else {
        if (this.props.cart.isCreatePaymentOrderFailed) {
          this.props.createPaymentOrder();
        }
        this.props.collectPaymentOrderForNetBanking(
          NET_BANKING,
          JSON.parse(localStorage.getItem(CART_ITEM_COOKIE)),
          this.state.bankCodeForNetBanking,
          localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE),
          false,
          "",
          this.state.bankNameForNetBanking,
          true
        );
      }
    }
    if (this.state.paymentModeSelected === PAYTM) {
      if (this.state.isGiftCard) {
        if (this.props.cart.isCreatePaymentOrderFailed) {
          this.props.createPaymentOrder(this.state.egvCartGuid);
        }
        if (this.props.collectPaymentOrderForGiftCardNetBanking) {
          this.props.collectPaymentOrderForGiftCardNetBanking(
            this.state.egvCartGuid
          );
        }
      } else if (this.state.isComingFromRetryUrl) {
        if (this.props.cart.isCreatePaymentOrderFailed) {
          this.props.createPaymentOrder(this.state.retryCartGuid);
        }
        this.props.collectPaymentOrderForNetBanking(
          WALLET,
          JSON.parse(localStorage.getItem(CART_ITEM_COOKIE)),
          "",
          localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE),
          true,
          this.state.retryCartGuid,
          "",
          true
        );
      } else {
        if (this.props.cart.isCreatePaymentOrderFailed) {
          this.props.createPaymentOrder();
        }
        this.props.collectPaymentOrderForNetBanking(
          WALLET,
          JSON.parse(localStorage.getItem(CART_ITEM_COOKIE)),
          "",
          localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE),
          false,
          "",
          "",
          true
        );
      }
    }
    if (this.state.paymentModeSelected === PAYPAL) {
      if (this.state.isGiftCard) {
        if (this.props.cart.isCreatePaymentOrderFailed) {
          this.props.createPaymentOrder(this.state.egvCartGuid);
        }
        if (this.props.collectPaymentOrderForGiftCardNetBanking) {
          this.props.collectPaymentOrderForGiftCardNetBanking(
            this.state.egvCartGuid
          );
        }
      } else if (this.state.isComingFromRetryUrl) {
        if (this.props.cart.isCreatePaymentOrderFailed) {
          this.props.createPaymentOrder(this.state.retryCartGuid);
        }
        this.props.collectPaymentOrderForNetBanking(
          PAYPAL,
          JSON.parse(localStorage.getItem(CART_ITEM_COOKIE)),
          "",
          localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE),
          true,
          this.state.retryCartGuid,
          "",
          true
        );
      } else {
        if (this.props.cart.isCreatePaymentOrderFailed) {
          this.props.createPaymentOrder();
        }
        this.props.collectPaymentOrderForNetBanking(
          PAYPAL,
          JSON.parse(localStorage.getItem(CART_ITEM_COOKIE)),
          "",
          localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE),
          false,
          "",
          "",
          true
        );
      }
    }
    if (!this.state.isRemainingAmount && this.state.isCliqCashApplied) {
      if (this.props.cart.isCreatePaymentOrderFailed) {
        this.props.createPaymentOrder();
      }
      this.props.collectPaymentOrderForCliqCash(
        localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE),
        JSON.parse(localStorage.getItem(CART_ITEM_COOKIE)),
        true // for payment failure we need to use old cart id
      );
    }
    if (
      this.state.currentPaymentMode === CASH_ON_DELIVERY_TEXT &&
      this.state.binValidationCOD &&
      !this.state.isCliqCashApplied
    ) {
      if (this.state.isComingFromRetryUrl) {
        this.props.updateTransactionDetailsForCOD(
          CASH_ON_DELIVERY,
          "",
          true,
          this.state.retryCartGuid
        );
      } else {
        this.props.updateTransactionDetailsForCOD(CASH_ON_DELIVERY, "");
      }
    }
  };
  handleSubmit = () => {
    localStorage.setItem(
      ADDRESS_FOR_PLACE_ORDER,
      JSON.stringify(this.state.selectedAddress)
    );
    if (!this.state.isPaymentFailed) {
      if (this.state.isFirstAddress) {
        this.addAddress(this.state.addressDetails);
      }
      if (
        !this.state.confirmAddress &&
        !this.state.isGiftCard &&
        !this.state.isComingFromRetryUrl &&
        this.state.addressId &&
        this.state.selectedAddress.postalCode
      ) {
        this.props.addAddressToCart(
          this.state.addressId,
          this.state.selectedAddress.postalCode,
          this.state.isComingFromCliqAndPiq
        );
        this.setState({ confirmAddress: true });
        if (this.state.isComingFromCliqAndPiq) {
          this.getPaymentModes();
        }
      }
      if (
        !this.state.deliverMode &&
        this.state.confirmAddress &&
        !this.state.isComingFromRetryUrl &&
        !this.state.isGiftCard
      ) {
        if (
          this.props.selectDeliveryMode &&
          !this.checkAvailabilityOfService()
        ) {
          let sizeNew = size(this.state.ussIdAndDeliveryModesObj);
          let actualProductSize =
            this.props &&
            this.props.cart &&
            this.props.cart.cartDetailsCNC &&
            this.props.cart.cartDetailsCNC.products &&
            this.props.cart.cartDetailsCNC.products.filter(product => {
              return product.isGiveAway === NO;
            }).length;
          if (sizeNew === actualProductSize) {
            this.setState(
              {
                deliverMode: true
              },
              () =>
                this.props.selectDeliveryMode(
                  this.state.ussIdAndDeliveryModesObj,
                  localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE)
                )
            );
          } else {
            this.props.displayToast(SELECT_DELIVERY_MODE_MESSAGE);
          }
        } else {
          if (this.props.displayToast) {
            this.props.displayToast(PRODUCT_NOT_SERVICEABLE_MESSAGE);
          }
        }
      }
      if (
        this.state.savedCardDetails &&
        this.state.savedCardDetails !== "" &&
        this.state.savedCardDetails !== null
      ) {
        if (this.state.isGiftCard) {
          if (this.props.cart.isCreatePaymentOrderFailed) {
            this.props.createPaymentOrder(
              this.props.location.state.egvCartGuid
            );
          }
          this.props.collectPaymentOrderForGiftCardFromSavedCards(
            this.state.savedCardDetails,
            this.props.location.state.egvCartGuid
          );
        } else if (this.state.isComingFromRetryUrl) {
          if (this.props.cart.isCreatePaymentOrderFailed) {
            this.props.createPaymentOrder(this.state.retryCartGuid);
          }
          this.props.collectPaymentOrderForSavedCards(
            this.state.savedCardDetails,
            JSON.parse(localStorage.getItem(CART_ITEM_COOKIE)),
            false,
            true,
            this.state.retryCartGuid
          );
        } else {
          if (this.props.cart.isCreatePaymentOrderFailed) {
            this.props.createPaymentOrder();
          }
          this.props.softReservationPaymentForSavedCard(
            this.state.savedCardDetails,
            this.state.addressId,
            this.state.paymentModeSelected
          );
        }
      }
      if (
        this.state.currentPaymentMode === CREDIT_CARD ||
        (this.state.currentPaymentMode === EMI &&
          !this.state.isNoCostEmiApplied) ||
        this.state.currentPaymentMode === DEBIT_CARD ||
        (this.state.currentPaymentMode === EMI &&
          this.state.isNoCostEmiProceeded)
      ) {
        if (this.state.isGiftCard) {
          this.props.stripe_juspay_TokenizeGiftCard(
            this.state.cardDetails,
            this.state.paymentModeSelected,
            this.props.location.state.egvCartGuid
          );
        } else if (this.state.isComingFromRetryUrl) {
          this.props.stripe_juspay_Tokenize(
            this.state.cardDetails,
            JSON.parse(localStorage.getItem(ADDRESS_FOR_PLACE_ORDER)),
            JSON.parse(localStorage.getItem(CART_ITEM_COOKIE)),
            this.state.paymentModeSelected,
            false,
            true,
            this.state.retryCartGuid
          );
        } else {
          this.softReservationForPayment(this.state.cardDetails);
        }
      }

      if (this.state.currentPaymentMode === NET_BANKING_PAYMENT_MODE) {
        if (this.state.isGiftCard) {
          if (this.props.cart.isCreatePaymentOrderFailed) {
            this.props.createPaymentOrder(
              this.props.location.state.egvCartGuid
            );
          }
          this.props.collectPaymentOrderForGiftCardNetBanking(
            this.props.location.state.egvCartGuid,
            this.state.bankCodeForNetBanking,
            this.state.bankNameForNetBanking
          );
        } else if (this.state.isComingFromRetryUrl) {
          if (this.props.cart.isCreatePaymentOrderFailed) {
            this.props.createPaymentOrder(this.state.retryCartGuid);
          }
          this.props.collectPaymentOrderForNetBanking(
            NET_BANKING,
            JSON.parse(localStorage.getItem(CART_ITEM_COOKIE)),
            this.state.bankCodeForNetBanking,
            localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE),
            true,
            this.state.retryCartGuid,
            this.state.bankNameForNetBanking
          );
        } else {
          this.softReservationPaymentForNetBanking(
            this.state.bankCodeForNetBanking,
            this.state.bankNameForNetBanking
          );
        }
      }

      if (!this.state.isRemainingAmount) {
        if (this.props.cart.isCreatePaymentOrderFailed) {
          this.props.createPaymentOrder();
        }
        this.props.softReservationForCliqCash(
          localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE)
        );
      }
      if (
        this.state.currentPaymentMode === CASH_ON_DELIVERY_TEXT &&
        this.state.binValidationCOD &&
        !this.state.isCliqCashApplied
      ) {
        if (this.state.isComingFromRetryUrl) {
          this.props.updateTransactionDetailsForCOD(
            CASH_ON_DELIVERY,
            "",
            true,
            this.state.retryCartGuid
          );
        } else {
          this.softReservationForCODPayment();
        }
      }
      if (this.state.paymentModeSelected === PAYTM) {
        if (this.state.isGiftCard) {
          if (this.props.cart.isCreatePaymentOrderFailed) {
            this.props.createPaymentOrder(
              this.props.location.state.egvCartGuid
            );
          }
          this.props.collectPaymentOrderForGiftCardNetBanking(
            this.props.location.state.egvCartGuid,
            this.state.bankCodeForNetBanking,
            this.state.bankNameForNetBanking
          );
        } else if (this.state.isComingFromRetryUrl) {
          if (this.props.cart.isCreatePaymentOrderFailed) {
            this.props.createPaymentOrder(this.state.retryCartGuid);
          }
          this.props.collectPaymentOrderForNetBanking(
            PAYTM,
            JSON.parse(localStorage.getItem(CART_ITEM_COOKIE)),
            this.state.bankCodeForNetBanking,
            localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE),
            true,
            this.state.retryCartGuid,
            this.state.bankNameForNetBanking
          );
        } else {
          this.softReservationPaymentForWallet(PAYTM, PAYTM);
        }
      }
      if (this.state.paymentModeSelected === PAYPAL) {
        if (this.state.isGiftCard) {
          if (this.props.cart.isCreatePaymentOrderFailed) {
            this.props.createPaymentOrder(
              this.props.location.state.egvCartGuid
            );
          }
          this.props.collectPaymentOrderForGiftCardNetBanking(
            this.props.location.state.egvCartGuid,
            this.state.bankCodeForNetBanking,
            this.state.bankNameForNetBanking
          );
        } else if (this.state.isComingFromRetryUrl) {
          if (this.props.cart.isCreatePaymentOrderFailed) {
            this.props.createPaymentOrder(this.state.retryCartGuid);
          }
          this.props.collectPaymentOrderForNetBanking(
            PAYPAL,
            JSON.parse(localStorage.getItem(CART_ITEM_COOKIE)),
            this.state.bankCodeForNetBanking,
            localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE),
            true,
            this.state.retryCartGuid,
            this.state.bankNameForNetBanking
          );
        } else {
          if (this.props.cart.isCreatePaymentOrderFailed) {
            this.props.createPaymentOrder();
          }
          this.props.softReservationPaymentForNetBanking(
            WALLET,
            PAYPAL,
            "",
            localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE),
            ""
          );
        }
      }
      if (this.state.isNoCostEmiApplied) {
        this.setState({ isNoCostEmiProceeded: true });
      }
    }
  };

  addAddress = address => {
    if (!this.state.isGiftCard) {
      if (!address) {
        this.props.displayToast("Please enter the valid details");
        return false;
      }
      if (address && !address.postalCode) {
        this.props.displayToast(PINCODE_TEXT);
        return false;
      }
      if (address && address.postalCode && address.postalCode.length < 6) {
        this.props.displayToast(PINCODE_VALID_TEXT);
        return false;
      }
      if (
        !address ||
        !address.firstName ||
        !address.firstName.trim() ||
        !NAME_VALIDATION.test(address.firstName.trim())
      ) {
        this.props.displayToast(NAME_TEXT);
        return false;
      }
      if (
        !address ||
        !address.lastName ||
        !address.lastName.trim() ||
        !NAME_VALIDATION.test(address.lastName.trim())
      ) {
        this.props.displayToast(LAST_NAME_TEXT);
        return false;
      }

      if (!address.line1 || !address.line1.trim()) {
        this.props.displayToast(ADDRESS_TEXT);
        return false;
      }

      if (address.line1.length < 15) {
        this.props.displayToast(ADDRESS_MINLENGTH_VALID_TEXT);
        return false;
      }
      if (address.line1.length > 120) {
        this.props.displayToast(ADDRESS_MAXLENGTH_VALID_TEXT);
        return false;
      }

      if (!ADDRESS_VALIDATION.test(address.line1.trim())) {
        this.props.displayToast(ADDRESS_VALIDATION_TEXT);
        return false;
      }

      if (address && !address.town) {
        this.props.displayToast(CITY_TEXT);
        return false;
      }
      if (address && !address.state) {
        this.props.displayToast(STATE_TEXT);
        return false;
      }
      if (address && !address.phone) {
        this.props.displayToast(PHONE_TEXT);
        return false;
      }
      if (address && !MOBILE_PATTERN.test(address.phone)) {
        this.props.displayToast(PHONE_VALID_TEXT);
        return false;
      }
      if (address && !address.addressType) {
        this.props.displayToast(SELECT_ADDRESS_TYPE);
        return false;
      }
      if (!address.userEmailId && !address.emailId && address.emailId === "") {
        this.props.displayToast("Please enter the EmailId");
        return false;
      }
      if (
        address.emailId &&
        address.emailId !== "" &&
        !EMAIL_REGULAR_EXPRESSION.test(address.emailId)
      ) {
        this.props.displayToast(EMAIL_VALID_TEXT);
        return false;
      } else {
        if (this.props.addUserAddress) {
          let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
          let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
          let cartDetailsLoggedInUser = Cookie.getCookie(
            CART_DETAILS_FOR_LOGGED_IN_USER
          );
          let getCartDetailCNCObj = {
            userId: JSON.parse(userDetails).userName,
            accessToken: JSON.parse(customerCookie).access_token,
            cartId: JSON.parse(cartDetailsLoggedInUser).code,
            pinCode: address && address.postalCode,
            isSoftReservation: false
          };
          this.props.addUserAddress(address, getCartDetailCNCObj);
          this.setState({ addNewAddress: false });
        }
      }
    }
  };
  handleCancelAddress() {
    this.setState({ addNewAddress: false });
    if (this.state.isFirstAddress) {
      this.props.history.push(PRODUCT_CART_ROUTER);
    }
  }
  onCloseTransactionFailed() {
    this.setState({ isOpenTransactionFailedPopUp: false });
  }
  addNewAddress = () => {
    this.setState({ addNewAddress: true });
  };
  binValidationForPaytm = val => {
    if (val) {
      localStorage.setItem(PAYMENT_MODE_TYPE, PAYTM);
      this.setState({ paymentModeSelected: PAYTM });
      this.props.binValidation(
        PAYTM,
        "",
        this.state.isComingFromRetryUrl,
        this.state.retryCartGuid
      );
    } else {
      this.setState({ paymentModeSelected: null });
    }
  };
  selectPayPal = val => {
    if (val) {
      localStorage.setItem(PAYMENT_MODE_TYPE, PAYPAL);
      this.setState({ paymentModeSelected: PAYPAL });
      this.props.binValidationForNetBanking(
        NET_BANKING_PAYMENT_MODE,
        "PAYPAL",
        this.state.isComingFromRetryUrl,
        this.state.retryCartGuid
      );
    } else {
      if (localStorage.getItem(PAYMENT_MODE_TYPE)) {
        localStorage.removeItem(PAYMENT_MODE_TYPE);
      }
      this.setState({ paymentModeSelected: null });
    }
  };
  applyBankCoupons = async val => {
    if (val.length > 0) {
      const applyCouponReq = await this.props.applyBankOffer(val[0]);

      if (applyCouponReq.status === SUCCESS) {
        this.setState({ selectedBankOfferCode: val[0] });
      } else {
        if (applyCouponReq.status === ERROR) {
          this.props.displayToast(applyCouponReq.error);
        }
      }
    } else {
      let bankOffer = localStorage.getItem(BANK_COUPON_COOKIE);
      if (bankOffer) {
        const releaseCouponReq = await this.props.releaseBankOffer(bankOffer);
        if (releaseCouponReq.status === SUCCESS) {
          this.setState({ selectedBankOfferCode: "" });
        }
      }
    }
    this.onChangePaymentMode({ currentPaymentMode: null });
  };
  openBankOffers = () => {
    this.props.showCouponModal({
      selectedBankOfferCode: localStorage.getItem(BANK_COUPON_COOKIE),
      coupons: this.props.cart.paymentModes.paymentOffers,
      selecteBankOffer: val => {
        this.selecteBankOffer(val);
      }
    });
  };

  applyCliqCash = async () => {
    if (this.state.isNoCostEmiApplied) {
      const doCallForApplyCliqCash = () => {
        this.setState({
          isCliqCashApplied: true,
          currentPaymentMode: null,
          isNoCostEmiApplied: false,
          binValidationCOD: false,
          captchaReseponseForCOD: null,
          PAYMENT_MODE_TYPE: "Cliq Cash"
        });
        this.props.applyCliqCash();
      };
      this.props.showModalForCliqCashOrNoCostEmi({
        doCallForApplyCliqCash
      });
    } else {
      this.setState({
        isCliqCashApplied: true,
        binValidationCOD: false,
        captchaReseponseForCOD: null,
        PAYMENT_MODE_TYPE: "Cliq Cash"
      });
      this.props.applyCliqCash();
    }
  };
  removeCliqCash = () => {
    this.setState({
      isCliqCashApplied: false,
      captchaReseponseForCOD: null,
      PAYMENT_MODE_TYPE: null,
      binValidationCOD: false
    });
    this.props.removeCliqCash();
  };

  binValidation = async (paymentMode, binNo) => {
    if (paymentMode === EMI) {
      let binValidationOfEmiEligibleResponse = await this.props.binValidationOfEmiEligible(
        binNo
      );
      if (
        binValidationOfEmiEligibleResponse &&
        binValidationOfEmiEligibleResponse.status === "success"
      ) {
        let minAmountOfEmiEligible =
          binValidationOfEmiEligibleResponse.binValidationOfEmiEligible &&
          binValidationOfEmiEligibleResponse.binValidationOfEmiEligible
            .minAmount;
        let integerValueOfMinAmount =
          minAmountOfEmiEligible && parseInt(minAmountOfEmiEligible, 10);
        if (
          binValidationOfEmiEligibleResponse.binValidationOfEmiEligible &&
          binValidationOfEmiEligibleResponse.binValidationOfEmiEligible
            .isEMIEligibleBin === false
        ) {
          this.setState({
            emiBinValidationStatus: true,
            emiBinValidationErrorMessage: `Currently, there are no EMI options available for your ${this.state.cardDetails.emi_bank} card.`
          });
        } else if (
          binValidationOfEmiEligibleResponse.binValidationOfEmiEligible &&
          this.state.cardDetails &&
          !this.state.cardDetails.emi_bank.includes(
            binValidationOfEmiEligibleResponse.binValidationOfEmiEligible.bank
          )
        ) {
          this.setState({
            emiBinValidationStatus: true,
            emiBinValidationErrorMessage: `This card can’t be used to avail this EMI option. Please use a ${this.state.cardDetails.selectedBankName} card only.`
          });
        } else if (
          this.props.cart &&
          this.props.cart.cartDetailsCNC &&
          this.props.cart.cartDetailsCNC.cartAmount &&
          this.props.cart.cartDetailsCNC.cartAmount.paybleAmount &&
          this.props.cart.cartDetailsCNC.cartAmount.paybleAmount.doubleValue &&
          integerValueOfMinAmount &&
          integerValueOfMinAmount >
            this.props.cart.cartDetailsCNC.cartAmount.paybleAmount.doubleValue
        ) {
          this.setState({
            emiBinValidationStatus: true,
            emiBinValidationErrorMessage:
              "This order amount doesn't meet the EMI eligibility criterion."
          });
        } else if (
          this.state.payableAmount &&
          integerValueOfMinAmount &&
          integerValueOfMinAmount > this.state.payableAmount
        ) {
          this.setState({
            emiBinValidationStatus: true,
            emiBinValidationErrorMessage:
              "This order amount doesn't meet the EMI eligibility criterion."
          });
        } else {
          this.setState({
            emiBinValidationStatus: false,
            emiBinValidationErrorMessage: null
          });
          if (this.state.isPaymentFailed) {
            localStorage.setItem(PAYMENT_MODE_TYPE, paymentMode);
            const parsedQueryString = queryString.parse(
              this.props.location.search
            );
            let cartGuId = parsedQueryString.value
              ? parsedQueryString.value
              : Cookie.getCookie(OLD_CART_GU_ID);
            if (this.state.isComingFromRetryUrl) {
              cartGuId = this.state.retryCartGuid;
            }
            this.props.binValidation(
              paymentMode,
              binNo,
              this.state.isComingFromRetryUrl,
              cartGuId
            );
          } else {
            localStorage.setItem(PAYMENT_MODE_TYPE, paymentMode);
            this.setState({ paymentModeSelected: paymentMode });
            this.props.binValidation(
              paymentMode,
              binNo,
              this.state.isComingFromRetryUrl,
              this.state.retryCartGuid
            );
          }
        }
      } else if (
        binValidationOfEmiEligibleResponse &&
        binValidationOfEmiEligibleResponse.status &&
        binValidationOfEmiEligibleResponse.status.toLowerCase() ===
          FAILURE_LOWERCASE
      ) {
        this.setState({
          emiBinValidationStatus: true,
          emiBinValidationErrorMessage: `Currently, there are no EMI options available for your ${this.state.cardDetails.emi_bank} card.`
        });
      } else {
        this.setState({
          emiBinValidationErrorMessage: null,
          emiBinValidationStatus: false
        });
        if (this.state.isPaymentFailed) {
          localStorage.setItem(PAYMENT_MODE_TYPE, paymentMode);
          const parsedQueryString = queryString.parse(
            this.props.location.search
          );
          let cartGuId = parsedQueryString.value
            ? parsedQueryString.value
            : Cookie.getCookie(OLD_CART_GU_ID);
          if (this.state.isComingFromRetryUrl) {
            cartGuId = this.state.retryCartGuid;
          }
          this.props.binValidation(
            paymentMode,
            binNo,
            this.state.isComingFromRetryUrl,
            cartGuId
          );
        } else {
          localStorage.setItem(PAYMENT_MODE_TYPE, paymentMode);
          this.setState({ paymentModeSelected: paymentMode });
          this.props.binValidation(
            paymentMode,
            binNo,
            this.state.isComingFromRetryUrl,
            this.state.retryCartGuid
          );
        }
      }
    } else {
      if (this.state.isPaymentFailed) {
        localStorage.setItem(PAYMENT_MODE_TYPE, paymentMode);
        const parsedQueryString = queryString.parse(this.props.location.search);
        let cartGuId = parsedQueryString.value
          ? parsedQueryString.value
          : Cookie.getCookie(OLD_CART_GU_ID);
        if (this.state.isComingFromRetryUrl) {
          cartGuId = this.state.retryCartGuid;
        }
        this.props.binValidation(
          paymentMode,
          binNo,
          this.state.isComingFromRetryUrl,
          cartGuId
        );
      } else {
        localStorage.setItem(PAYMENT_MODE_TYPE, paymentMode);
        this.setState({ paymentModeSelected: paymentMode });
        this.props.binValidation(
          paymentMode,
          binNo,
          this.state.isComingFromRetryUrl,
          this.state.retryCartGuid
        );
      }
    }
  };
  softReservationPaymentForWallet = (bankName, bankCode) => {
    if (this.props.cart.isCreatePaymentOrderFailed) {
      this.props.createPaymentOrder();
    }
    this.props.softReservationPaymentForNetBanking(
      WALLET,
      PAYTM,
      bankCode,
      localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE),
      bankName
    );
  };
  binValidationForCOD = paymentMode => {
    localStorage.setItem(PAYMENT_MODE_TYPE, paymentMode);
    this.setState({
      paymentModeSelected: paymentMode,
      binValidationCOD: true
    });
    this.props.binValidationForCOD(
      paymentMode,
      this.state.isComingFromRetryUrl,
      this.state.retryCartGuid
    );
  };

  binValidationForNetBank = (paymentMode, bankName) => {
    localStorage.setItem(PAYMENT_MODE_TYPE, paymentMode);
    this.setState({ paymentModeSelected: paymentMode });
    this.props.binValidationForNetBanking(
      paymentMode,
      bankName,
      this.state.isComingFromRetryUrl,
      this.state.retryCartGuid
    );
  };

  binValidationForSavedCard = cardDetails => {
    if (cardDetails) {
      this.setState({
        paymentModeSelected: `${cardDetails.cardType} Card`
      });
      localStorage.setItem(PAYMENT_MODE_TYPE, `${cardDetails.cardType} Card`);
      this.setState({ savedCardDetails: cardDetails });
      if (
        !this.state.savedCardDetails ||
        (this.state.savedCardDetails &&
          this.state.savedCardDetails.cardEndingDigits !==
            cardDetails.cardEndingDigits)
      ) {
        this.props.binValidation(
          `${cardDetails.cardType} Card`,
          cardDetails.cardISIN,
          this.state.isComingFromRetryUrl,
          this.state.retryCartGuid
        );
      }
    } else {
      this.setState({ savedCardDetails: null });
    }
  };

  softReservationForPayment = cardDetails => {
    if (this.props.cart.isCreatePaymentOrderFailed) {
      this.props.createPaymentOrder();
    }
    cardDetails.pinCode = localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE);
    this.props.softReservationForPayment(
      cardDetails,
      this.state.selectedAddress,
      this.state.paymentModeSelected
    );
  };

  softReservationPaymentForNetBanking = (bankCode, bankName) => {
    if (this.props.cart.isCreatePaymentOrderFailed) {
      this.props.createPaymentOrder();
    }
    this.props.softReservationPaymentForNetBanking(
      NET_BANKING,
      this.state.paymentModeSelected,
      bankCode,
      localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE),
      bankName
    );
  };

  collectPaymentOrderForGiftCardNetBanking = () => {
    if (this.props.cart.isCreatePaymentOrderFailed) {
      this.props.createPaymentOrder(this.props.location.state.egvCartGuid);
    }
    if (this.props.collectPaymentOrderForGiftCardNetBanking) {
      this.props.collectPaymentOrderForGiftCardNetBanking(
        this.props.location.state.egvCartGuid,
        this.state.bankCodeForNetBanking,
        this.state.bankNameForNetBanking
      );
    }
  };

  renderDesktopCheckout = checkoutButtonStatus => {
    let retryPaymentDetailsObj = JSON.parse(
      localStorage.getItem(RETRY_PAYMENT_DETAILS)
    );
    return (
      <DesktopCheckout
        padding={this.state.padding}
        disabled={checkoutButtonStatus}
        onContinue={false}
        noCostEmiEligibility={
          this.props.cart &&
          this.props.cart.cartDetailsCNC &&
          this.props.cart.cartDetailsCNC.cartAmount &&
          this.props.cart.cartDetailsCNC.cartAmount
        }
        isNoCostEmiApplied={this.state.isNoCostEmiApplied}
        noCostEmiDiscount={this.state.noCostEmiDiscount}
        amount={this.state.payableAmount}
        bagTotal={
          this.props.cart &&
          this.props.cart.cartDetailsCNC &&
          this.props.cart.cartDetailsCNC.cartAmount &&
          this.props.cart.cartDetailsCNC.cartAmount
        }
        payable={
          this.state.isGiftCard
            ? this.state.payableAmount
            : this.props.cart &&
              this.props.cart.cartDetailsCNC &&
              this.props.cart.cartDetailsCNC.cartAmount
        }
        coupons={
          this.props.cart &&
          this.props.cart.cartDetailsCNC &&
          this.props.cart.cartDetailsCNC.cartAmount &&
          this.props.cart.cartDetailsCNC.cartAmount
        }
        totalDiscount={
          this.props.cart &&
          this.props.cart.cartDetailsCNC &&
          this.props.cart.cartDetailsCNC.cartAmount
        }
        delivery={
          this.props.cart &&
          this.props.cart.cartDetailsCNC &&
          this.props.cart.cartDetailsCNC.cartAmount
        }
        showDetails={this.state.showCartDetails}
        showHideDetails={this.showHideDetails}
        isCliqCashApplied={this.state.isCliqCashApplied}
        cliqCashPaidAmount={this.state.cliqCashPaidAmount}
        isFromMyBag={false}
        isGiftCard={this.state.isGiftCard}
        cartAmount={
          this.state.isComingFromRetryUrl
            ? retryPaymentDetailsObj &&
              retryPaymentDetailsObj.retryPaymentDetails &&
              retryPaymentDetailsObj.retryPaymentDetails.cartAmount
            : this.props.cart &&
              this.props.cart.cartDetailsCNC &&
              this.props.cart.cartDetailsCNC.cartAmount
        }
        isFromRetryUrl={this.state.isComingFromRetryUrl}
      />
    );
  };
  captureOrderExperience = rating => {
    let orderId;
    if (this.props.cart.cliqCashJusPayDetails) {
      orderId = this.props.cart.cliqCashJusPayDetails.orderId;
    } else {
      orderId = this.props.cart.orderConfirmationDetails.orderRefNo;
    }
    if (this.props.captureOrderExperience) {
      this.props.captureOrderExperience(orderId, rating);
    }
  };
  captureOrderExperienceForStripe = rating => {
    let stripeDetails = JSON.parse(localStorage.getItem(STRIPE_DETAILS));
    let orderId = stripeDetails.orderId;
    if (this.props.captureOrderExperience) {
      this.props.captureOrderExperience(orderId, rating);
    }
  };

  continueShopping = () => {
    this.props.history.index = 0;
    this.props.history.push(HOME_ROUTER);
  };

  softReservationForCODPayment = () => {
    this.props.softReservationForCODPayment(
      localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE)
    );
  };

  addGiftCard = () => {
    this.props.addGiftCard();
  };
  redeemCliqVoucher = cliqCashDetails => {
    if (this.props.redeemCliqVoucher) {
      this.props.redeemCliqVoucher(cliqCashDetails);
    }
  };

  orderConfirmationUpdate = () => {
    if (this.props.clearCaptureOrderExperience) {
      this.props.clearCaptureOrderExperience();
    }
  };
  navigateToOrderDetailPage(orderId) {
    this.props.history.push(`${MY_ACCOUNT}${ORDER}/?${ORDER_CODE}=${orderId}`);
  }
  navigateToOrderHistoryPage() {
    this.props.history.push(`${MY_ACCOUNT}${MY_ACCOUNT_ORDERS_PAGE}`);
  }
  validateCard() {
    if (
      !this.state.cardDetails.cardNumber ||
      !this.state.cardDetails.cardName ||
      (this.state.cardDetails.cardName &&
        this.state.cardDetails.cardName.length < 3) ||
      (this.state.cardDetails.cardName &&
        this.state.cardDetails.cardName.length < 1) ||
      !this.state.cardDetails.monthValue ||
      !this.state.cardDetails.yearValue
    ) {
      return true;
    } else {
      const card = new cardValidator(this.state.cardDetails.cardNumber);
      let cardDetails = card.getCardDetails();

      if (card.validateCard()) {
        if (
          cardDetails &&
          cardDetails.cvv_length &&
          cardDetails.cvv_length.includes(
            this.state.cardDetails.cvvNumber
              ? this.state.cardDetails.cvvNumber.length
              : 0
          )
        ) {
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    }
  }
  validateCreditCard = () => {
    if (
      this.state.currentPaymentMode === CREDIT_CARD ||
      this.state.currentPaymentMode === EMI
    ) {
      if (
        this.state.currentPaymentMode === EMI &&
        this.state.emiBinValidationStatus
      ) {
        return true;
      } else {
        return this.validateCard();
      }
    }
  };
  validateDebitCard = () => {
    if (this.state.currentPaymentMode === DEBIT_CARD) {
      return this.validateCard();
    }
  };
  validateNetBanking = () => {
    if (this.state.currentPaymentMode === NET_BANKING_PAYMENT_MODE)
      if (
        !this.state.bankCodeForNetBanking &&
        !this.state.bankNameForNetBanking
      ) {
        return true;
      } else {
        return false;
      }
    else return false;
  };
  validateCOD = () => {
    if (this.state.currentPaymentMode === CASH_ON_DELIVERY_PAYMENT_MODE) {
      if (this.state.captchaReseponseForCOD === null) {
        return true;
      } else {
        return false;
      }
    } else return false;
  };
  validateSavedCard = () => {
    if (this.state.currentPaymentMode === SAVED_CARD_PAYMENT_MODE) {
      if (!this.state.savedCardDetails) {
        return true;
      } else {
        if (this.props.binValidationStatus !== "success") {
          return true;
        } else {
          return false;
        }
      }
    } else return false;
  };

  whatsappNotification = () => {
    this.props.whatsappNotification();
  };

  validateSubmitButton() {
    if (this.state.cardDetails) {
      if (
        this.state.currentPaymentMode === CREDIT_CARD ||
        this.state.currentPaymentMode === DEBIT_CARD
      ) {
        return this.validateCard();
      }
      if (this.state.currentPaymentMode === SAVED_CARD_PAYMENT_MODE) {
        if (!this.state.savedCardDetails) {
          return true;
        } else {
          return false;
        }
      } else if (this.state.currentPaymentMode === EMI) {
        if (this.state.isNoCostEmiApplied || this.state.cardDetails.emi_bank) {
          return false;
        } else {
          return true;
        }
      } else if (this.state.currentPaymentMode === NET_BANKING_PAYMENT_MODE) {
        if (
          !this.state.bankCodeForNetBanking &&
          !this.state.bankNameForNetBanking
        ) {
          return true;
        } else {
          return false;
        }
      } else if (
        this.state.currentPaymentMode === CASH_ON_DELIVERY_PAYMENT_MODE
      ) {
        if (this.state.captchaReseponseForCOD === null) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  render() {
    console.log(
      "ussidanddeliverymodesobj is ",
      this.state.ussIdAndDeliveryModesObj
    );
    let labelForButton,
      checkoutButtonStatus = false;
    if (
      !this.state.isPaymentFailed &&
      !this.state.confirmAddress &&
      !this.state.isGiftCard &&
      !this.state.isComingFromRetryUrl &&
      this.props.cart.userAddress &&
      this.props.cart.userAddress.addresses &&
      !this.state.isGiftCard &&
      !this.state.isComingFromRetryUrl
    ) {
      if (!this.state.addressId) {
        checkoutButtonStatus = true;
      }

      labelForButton = CONTINUE;
    } else if (
      this.state.confirmAddress &&
      !this.state.deliverMode &&
      !this.state.isComingFromRetryUrl &&
      !this.state.isGiftCard &&
      !this.state.isComingFromCliqAndPiq
    ) {
      labelForButton = CONTINUE;
    } else if (
      this.state.currentPaymentMode === CASH_ON_DELIVERY_PAYMENT_MODE
    ) {
      checkoutButtonStatus = this.validateSubmitButton();
      labelForButton = PLACE_ORDER;
    } else if (this.state.currentPaymentMode === EMI) {
      if (this.state.currentSelectedEMIType === NO_COST_EMI) {
        if (this.state.isNoCostEmiProceeded) {
          checkoutButtonStatus = this.validateCard();
          labelForButton = PAY_NOW;
        } else {
          if (this.state.isNoCostEmiApplied) {
            checkoutButtonStatus = false;
            labelForButton = CONTINUE;
          } else {
            checkoutButtonStatus = true;
            labelForButton = CONTINUE;
          }
        }
      } else if (this.state.currentSelectedEMIType === STANDARD_EMI) {
        if (
          this.state.cardDetails &&
          this.state.cardDetails.emi_bank &&
          this.state.cardDetails.emi_bank !== null
        ) {
          checkoutButtonStatus = this.validateCard();
          labelForButton = PAY_NOW;
        } else {
          checkoutButtonStatus = true;
        }
      } else {
        checkoutButtonStatus = true;
        labelForButton = PAY_NOW;
      }
    } else if (this.state.currentPaymentMode === E_WALLET) {
      if (this.state.paymentModeSelected === PAYTM) {
        labelForButton = PAY_NOW;
        checkoutButtonStatus = false;
      } else {
        labelForButton = CONTINUE;

        checkoutButtonStatus = true;
      }
    } else if (this.state.currentPaymentMode === E_WALLET_PAYPAL) {
      if (this.state.paymentModeSelected === PAYPAL) {
        labelForButton = PAY_NOW;
        checkoutButtonStatus = false;
      } else {
        labelForButton = CONTINUE;

        checkoutButtonStatus = true;
      }
    } else if (this.state.currentPaymentMode === null) {
      labelForButton = CONTINUE;
      checkoutButtonStatus = true;
    } else {
      checkoutButtonStatus = this.validateSubmitButton();
      labelForButton = PAY_NOW;
    }
    if (this.state.isFirstAddress) {
      labelForButton = CONTINUE;
      checkoutButtonStatus = false;
    }
    if (!this.state.isRemainingAmount && this.state.isCliqCashApplied) {
      checkoutButtonStatus = false;
      labelForButton = PAY_NOW;
    }
    const OrderIdForOrderUsingNonJusPayPayments = localStorage.getItem(
      ORDER_ID_FOR_ORDER_CONFIRMATION_PAGE
    );
    if (
      this.props.cart.getUserAddressStatus === REQUESTING ||
      (OrderIdForOrderUsingNonJusPayPayments &&
        this.props.cart &&
        this.props.cart.orderConfirmationDetailsStatus === REQUESTING)
    ) {
      return this.renderLoader();
    } else {
      if (
        this.props.cart.loading ||
        this.props.cart.cartDetailsCNCLoader ||
        this.props.cart.jusPaymentLoader ||
        this.props.cart.selectDeliveryModeLoader ||
        (!this.props.cart.paymentModes && this.state.deliverMode) ||
        this.props.cart.isPaymentProceeded ||
        this.props.cart.paymentModeLoader ||
        this.props.loading
      ) {
        this.props.showSecondaryLoader();
      } else {
        this.props.hideSecondaryLoader();
      }
    }
    if (this.props.cart.getPrepaidOrderPaymentConfirmation) {
      this.props.hideSecondaryLoader();
    }
    if (this.props.cart.transactionStatus === REQUESTING) {
      return false;
    }
    if (
      this.state.addNewAddress &&
      !this.state.orderConfirmation &&
      !this.state.paymentConfirmation &&
      !this.state.isGiftCard &&
      !this.state.isComingFromRetryUrl &&
      !this.props.cart.isPaymentProceeded
    ) {
      return (
        <div className={styles.addDeliveryAddressHolder}>
          <div className={styles.pageCenter}>
            <div className={styles.leftSection}>
              {" "}
              <AddDeliveryAddress
                history={this.props.history}
                handleCancelAddress={() => this.handleCancelAddress()}
                addUserAddress={address => this.addAddress(address)}
                {...this.state}
                showSecondaryLoader={this.props.showSecondaryLoader}
                hideSecondaryLoader={this.props.hideSecondaryLoader}
                loading={this.props.cart.loading}
                onChange={val => this.onChange(val)}
                isFirstAddress={false}
                displayToast={message => this.props.displayToast(message)}
                getPinCode={val => this.getPinCodeDetails(val)}
                getPinCodeDetails={this.props.getPinCodeDetails}
                getPincodeStatus={this.props.getPincodeStatus}
                onFocusInput={() => this.onFocusInput()}
                resetAddAddressDetails={() =>
                  this.props.resetAddAddressDetails()
                }
                getUserDetails={() => this.getUserDetails()}
                userDetails={this.props.userDetails}
                clearPinCodeStatus={() => this.props.clearPinCodeStatus()}
                padding={this.state.padding}
                disabled={checkoutButtonStatus}
                label={labelForButton}
                noCostEmiEligibility={
                  this.props.cart &&
                  this.props.cart.emiEligibilityDetails &&
                  this.props.cart.emiEligibilityDetails.isNoCostEMIEligible
                }
                isNoCostEmiApplied={this.state.isNoCostEmiApplied}
                noCostEmiDiscount={this.state.noCostEmiDiscount}
                amount={this.state.payableAmount}
                bagTotal={this.state.bagAmount}
                payable={this.state.payableAmount}
                coupons={this.state.couponDiscount}
                discount={this.state.totalDiscount}
                delivery={this.state.deliveryCharge}
                showDetails={this.state.showCartDetails}
                showHideDetails={this.showHideDetails}
                onCheckout={
                  this.state.isPaymentFailed
                    ? this.handleSubmitAfterPaymentFailure
                    : this.handleSubmit
                }
                isCliqCashApplied={this.state.isCliqCashApplied}
                cliqCashPaidAmount={this.state.cliqCashPaidAmount}
                isFromMyBag={false}
              />
            </div>
            <div className={styles.rightSection}>
              {this.renderDesktopCheckout(false)}
            </div>
          </div>
        </div>
      );
    } else if (
      (!this.state.addNewAddress &&
        this.props.cart &&
        !this.state.orderConfirmation &&
        !this.state.paymentConfirmation &&
        !this.props.cart.isPaymentProceeded) ||
      this.state.isGiftCard ||
      (!this.state.paymentConfirmation &&
        this.state.isComingFromRetryUrl &&
        !this.state.orderConfirmation)
    ) {
      let retryPaymentDetailsObj = JSON.parse(
        localStorage.getItem(RETRY_PAYMENT_DETAILS)
      );
      let cartAmount = this.state.isComingFromRetryUrl
        ? retryPaymentDetailsObj &&
          retryPaymentDetailsObj.retryPaymentDetails &&
          retryPaymentDetailsObj.retryPaymentDetails.cartAmount
        : this.props.cart &&
          this.props.cart.cartDetailsCNC &&
          this.props.cart.cartDetailsCNC.cartAmount;

      let couponDiscountAmount =
        cartAmount &&
        cartAmount.couponDiscountAmount &&
        cartAmount.couponDiscountAmount.value !== 0;
      let cartDiscount =
        cartAmount &&
        cartAmount.cartDiscount &&
        cartAmount.cartDiscount.value !== 0;
      let noCostEMIDiscountValue =
        cartAmount &&
        cartAmount.noCostEMIDiscountValue &&
        cartAmount.noCostEMIDiscountValue.value !== 0;

      return (
        <React.Fragment>
          <DesktopOnly>
            {this.state.isPaymentFailed && (
              <div
                className={
                  this.state.isOpenTransactionFailedPopUp
                    ? couponDiscountAmount ||
                      cartDiscount ||
                      noCostEMIDiscountValue
                      ? styles.paymentFailureCoupon
                      : styles.paymentFailure
                    : styles.paymentFailureClose
                }
              >
                <div className={styles.paymentFailureWrap}>
                  {couponDiscountAmount ||
                  cartDiscount ||
                  noCostEMIDiscountValue ? (
                    <div className={styles.paymentCouponText}>
                      {RETRY_FAILED_ORDER_COUPON}
                      <div>{RETRY_FAILED_ORDER_COUPON_NOTE}</div>
                    </div>
                  ) : (
                    <div className={styles.paymentText}>{FAILURE_TEXT}</div>
                  )}
                  <div className={styles.paymentFailButtonHolder}>
                    <div className={styles.closeButton}>
                      <Button
                        type="hollow"
                        color="#000"
                        label="Close"
                        height={36}
                        width={121}
                        onClick={() => this.onCloseTransactionFailed()}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </DesktopOnly>
          <div className={styles.noSubHeader}>
            <div className={styles.pageCenter}>
              <DesktopOnly>
                <div className={styles.checkoutHeader}>Checkout</div>
              </DesktopOnly>
              <div className={styles.leftSection}>
                <MobileOnly>
                  {!this.state.showCliqAndPiq && (
                    <Checkout
                      padding={this.state.padding}
                      disabled={checkoutButtonStatus}
                      label={labelForButton}
                      noCostEmiEligibility={
                        this.props.cart &&
                        this.props.cart.emiEligibilityDetails &&
                        this.props.cart.emiEligibilityDetails
                          .isNoCostEMIEligible
                      }
                      isNoCostEmiApplied={this.state.isNoCostEmiApplied}
                      amount={
                        this.state.isGiftCard || this.state.isComingFromRetryUrl
                          ? this.state.payableAmount
                          : this.props.cart &&
                            this.props.cart.cartDetailsCNC &&
                            this.props.cart.cartDetailsCNC.cartAmount &&
                            this.props.cart.cartDetailsCNC.cartAmount
                              .paybleAmount.formattedValue
                      }
                      showHideDetails={this.showHideDetails}
                      onCheckout={
                        this.state.isPaymentFailed
                          ? this.handleSubmitAfterPaymentFailure
                          : this.handleSubmit
                      }
                      isRetryUrl={this.state.isComingFromRetryUrl}
                      isCliqCashApplied={this.state.isCliqCashApplied}
                      cliqCashPaidAmount={this.state.cliqCashPaidAmount}
                      isFromMyBag={false}
                    />
                  )}
                </MobileOnly>
                {!this.state.isPaymentFailed &&
                  !this.state.confirmAddress &&
                  !this.state.isGiftCard &&
                  !this.state.isComingFromRetryUrl &&
                  (this.props.cart.userAddress &&
                  this.props.cart.userAddress.addresses
                    ? this.renderCheckoutAddress(checkoutButtonStatus)
                    : this.renderInitialAddAddressForm())}

                {!this.state.isPaymentFailed &&
                  this.state.confirmAddress &&
                  !this.state.isGiftCard &&
                  !this.state.isComingFromRetryUrl &&
                  !this.state.showCliqAndPiq && (
                    <div className={styles.deliveryAddress}>
                      <DeliveryAddressSet
                        addressType={this.state.selectedAddress.addressType}
                        address={this.state.selectedAddress.line1}
                        changeDeliveryAddress={() =>
                          this.changeDeliveryAddress()
                        }
                      />
                    </div>
                  )}
                <MobileOnly>
                  {!this.state.isPaymentFailed &&
                    this.props.cart.cartDetailsCNC &&
                    this.state.confirmAddress &&
                    !this.state.deliverMode &&
                    !this.state.isGiftCard &&
                    !this.state.isComingFromRetryUrl &&
                    (this.state.showCliqAndPiq
                      ? this.renderCliqAndPiq()
                      : this.renderDeliverModes(checkoutButtonStatus))}
                </MobileOnly>
                <DesktopOnly>
                  {!this.state.isPaymentFailed &&
                    this.props.cart.cartDetailsCNC &&
                    this.state.confirmAddress &&
                    !this.state.deliverMode &&
                    !this.state.isComingFromCliqAndPiq &&
                    !this.state.isGiftCard &&
                    !this.state.isComingFromRetryUrl &&
                    this.renderDeliverModes(checkoutButtonStatus)}
                  {this.state.showCliqAndPiq && this.renderCliqAndPiq()}
                </DesktopOnly>
                {!this.state.isPaymentFailed &&
                  this.state.deliverMode &&
                  !this.state.isComingFromRetryUrl &&
                  !this.state.isComingFromCliqAndPiq &&
                  !this.state.isGiftCard && (
                    <div className={styles.deliveryAddress}>
                      <DeliveryModeSet
                        productDelivery={
                          this.props.cart.cartDetailsCNC.products
                        }
                        changeDeliveryModes={() => this.changeDeliveryModes()}
                        selectedDeliveryDetails={
                          this.state.ussIdAndDeliveryModesObj
                        }
                        isShowDate={true}
                      />
                    </div>
                  )}
                <MobileOnly>
                  {this.state.isPaymentFailed && (
                    <div className={styles.paymentFailedCardHolder}>
                      <TransactionFailed />
                    </div>
                  )}
                </MobileOnly>
                <DesktopOnly>
                  {!this.state.isGiftCard &&
                    this.state.isRemainingAmount &&
                    !(
                      this.state.isPaymentFailed && this.state.isCliqCashApplied
                    ) &&
                    !this.state.paymentMethod &&
                    this.state.confirmAddress &&
                    this.state.deliverMode &&
                    this.props.cart.paymentModes &&
                    this.props.cart.paymentModes.paymentOffers &&
                    this.props.cart.paymentModes.paymentOffers.coupons && (
                      <BankOfferWrapper
                        cart={this.props.cart}
                        applyBankCoupons={val => this.applyBankCoupons(val)}
                        openBankOffers={() => this.openBankOffers()}
                        openBankOfferTncModal={() =>
                          this.props.openBankOfferTncModal()
                        }
                      />
                    )}
                </DesktopOnly>
                {((!this.state.paymentMethod &&
                  this.state.confirmAddress &&
                  this.state.deliverMode) ||
                  this.state.isPaymentFailed ||
                  this.state.isGiftCard ||
                  this.state.isComingFromRetryUrl) && (
                  <div className={styles.paymentCardHolderπp}>
                    <PaymentCardWrapper
                      creditCardValid={this.validateCreditCard}
                      debitCardValid={this.validateDebitCard}
                      validateNetBanking={this.validateNetBanking}
                      validateCOD={this.validateCOD}
                      validateSavedCard={this.validateSavedCard}
                      applyBankCoupons={val => this.applyBankCoupons(val)}
                      openBankOfferTncModal={() =>
                        this.props.openBankOfferTncModal()
                      }
                      isCliqCashApplied={this.state.isCliqCashApplied}
                      isRemainingBalance={this.state.isRemainingAmount}
                      isPaymentFailed={this.state.isPaymentFailed}
                      isFromGiftCard={this.state.isGiftCard}
                      isFromRetryUrl={this.state.isComingFromRetryUrl}
                      isNoCostEmiApplied={this.state.isNoCostEmiApplied}
                      cart={this.props.cart}
                      paymentModeSelected={this.state.paymentModeSelected}
                      changeSubEmiOption={currentSelectedEMIType =>
                        this.changeSubEmiOption(currentSelectedEMIType)
                      }
                      setSunEmiOption={currentSelectedEMIType =>
                        this.setSunEmiOption(currentSelectedEMIType)
                      }
                      selectedSavedCardDetails={this.state.savedCardDetails}
                      selectedBankOfferCode={this.state.selectedBankOfferCode}
                      openBankOffers={() => this.openBankOffers()}
                      cliqCashAmount={this.state.cliqCashAmount}
                      userCliqCashAmount={this.state.userCliqCashAmount}
                      applyCliqCash={() => this.applyCliqCash()}
                      removeCliqCash={() => this.removeCliqCash()}
                      currentPaymentMode={this.state.currentPaymentMode}
                      cardDetails={this.state.cardDetails}
                      captchaReseponseForCOD={this.state.captchaReseponseForCOD}
                      verifyCaptcha={captchaReseponseForCOD =>
                        this.setState({
                          captchaReseponseForCOD
                        })
                      }
                      onChange={val => this.onChangePaymentMode(val)}
                      bankCodeForNetBanking={this.state.bankCodeForNetBanking}
                      bankNameForNetBanking={this.state.bankNameForNetBanking}
                      onSelectBankForNetBanking={(
                        bankCodeForNetBanking,
                        bankNameForNetBanking
                      ) =>
                        this.onSelectBankForNetBanking(
                          bankCodeForNetBanking,
                          bankNameForNetBanking
                        )
                      }
                      onChangeCardDetail={val => this.onChangeCardDetail(val)}
                      binValidation={(paymentMode, binNo) =>
                        this.binValidation(paymentMode, binNo)
                      }
                      binValidationForCOD={paymentMode =>
                        this.binValidationForCOD(paymentMode)
                      }
                      softReservationForPayment={cardDetails =>
                        this.softReservationForPayment(cardDetails)
                      }
                      softReservationForCODPayment={() =>
                        this.softReservationForCODPayment()
                      }
                      binValidationForNetBank={(paymentMode, bankName) =>
                        this.binValidationForNetBank(paymentMode, bankName)
                      }
                      softReservationPaymentForNetBanking={bankName =>
                        this.softReservationPaymentForNetBanking(bankName)
                      }
                      binValidationForSavedCard={cardDetails =>
                        this.binValidationForSavedCard(cardDetails)
                      }
                      createJusPayOrderForGiftCardNetBanking={() =>
                        this.collectPaymentOrderForGiftCardNetBanking()
                      }
                      onFocusInput={() => this.onFocusInput()}
                      onBlur={() => this.onBlue()}
                      addGiftCard={() => this.addGiftCard()}
                      binValidationForPaytm={val =>
                        this.binValidationForPaytm(val)
                      }
                      selectPayPal={val => this.selectPayPal(val)}
                      displayToast={message => this.props.displayToast(message)}
                      getCODEligibility={() => this.getCODEligibility()}
                      getNetBankDetails={() => this.getNetBankDetails()}
                      getEmiBankDetails={() => this.getEmiBankDetails()}
                      getEmiEligibility={() => this.getEmiEligibility()}
                      getBankAndTenureDetails={() =>
                        this.getBankAndTenureDetails()
                      }
                      getEmiTermsAndConditionsForBank={(bankCode, bankName) =>
                        this.getEmiTermsAndConditionsForBank(bankCode, bankName)
                      }
                      applyNoCostEmi={(couponCode, bankName) =>
                        this.applyNoCostEmi(couponCode, bankName)
                      }
                      removeNoCostEmi={couponCode =>
                        this.removeNoCostEmi(couponCode)
                      }
                      getItemBreakUpDetails={(
                        couponCode,
                        noCostEmiText,
                        noCostProductCount
                      ) =>
                        this.getItemBreakUpDetails(
                          couponCode,
                          noCostEmiText,
                          noCostProductCount
                        )
                      }
                      isNoCostEmiProceeded={this.state.isNoCostEmiProceeded}
                      changeNoCostEmiPlan={() =>
                        this.setState({
                          isNoCostEmiApplied: false,
                          isNoCostEmiProceeded: false
                        })
                      }
                      totalProductCount={
                        this.props.cart &&
                        this.props.cart.cartDetailsCNC &&
                        this.props.cart.cartDetailsCNC.products &&
                        this.props.cart.cartDetailsCNC.products.length
                      }
                      changeEmiPlan={() => this.changeEmiPlan()}
                      subEmiOption={this.state.currentSelectedEMIType}
                      onCheckout={
                        this.state.isPaymentFailed
                          ? this.handleSubmitAfterPaymentFailure
                          : this.handleSubmit
                      }
                      redeemCliqVoucher={val => this.redeemCliqVoucher(val)}
                      emiBinValidationErrorMessage={
                        this.state.emiBinValidationErrorMessage
                      }
                      isFromCliqAndPiq={this.state.isComingFromCliqAndPiq}
                      retryPaymentDetails={this.props.retryPaymentDetails}
                    />
                  </div>
                )}
                <MobileOnly>
                  {!this.state.showCliqAndPiq && (
                    <CheckoutStaticSection
                      padding={this.state.padding}
                      disabled={checkoutButtonStatus}
                      label={labelForButton}
                      cartAmount={
                        this.state.isComingFromRetryUrl
                          ? retryPaymentDetailsObj &&
                            retryPaymentDetailsObj.retryPaymentDetails &&
                            retryPaymentDetailsObj.retryPaymentDetails
                              .cartAmount
                          : this.props.cart &&
                            this.props.cart.cartDetailsCNC &&
                            this.props.cart.cartDetailsCNC.cartAmount
                      }
                      onCheckout={
                        this.state.isPaymentFailed
                          ? this.handleSubmitAfterPaymentFailure
                          : this.handleSubmit
                      }
                      isCliqCashApplied={this.state.isCliqCashApplied}
                      cliqCashPaidAmount={this.state.cliqCashPaidAmount}
                    />
                  )}
                </MobileOnly>
              </div>
              <DesktopOnly>
                <div className={styles.rightSection}>
                  {this.renderDesktopCheckout(checkoutButtonStatus)}
                  <div className={styles.disclaimer}>{DISCLAIMER}</div>
                  {this.props.cart.paymentModes &&
                    this.props.cart.paymentModes.whatsappText && (
                      <WhatsappUpdates
                        text={this.props.cart.paymentModes.whatsappText}
                        handleWhatsAppClick={isSelected =>
                          this.handleWhatsAppClick(isSelected)
                        }
                      />
                    )}
                </div>
              </DesktopOnly>
            </div>
          </div>
        </React.Fragment>
      );
    } else if (this.state.orderConfirmation) {
      return (
        <div>
          {this.props.cart.orderConfirmationDetails && (
            <div className={styles.orderConfirmationHolder}>
              <OrderConfirmation
                history={this.props.history}
                clearCartDetails={() => this.props.clearCartDetails()}
                orderId={this.props.cart.orderConfirmationDetails.orderRefNo}
                captureOrderExperience={rating =>
                  this.captureOrderExperience(rating)
                }
                orderStatusMessage={
                  this.props.cart.orderConfirmationDetails.orderStatusMessage
                }
                continueShopping={() => this.continueShopping()}
                orderConfirmationUpdate={() => this.orderConfirmationUpdate()}
                trackOrder={() =>
                  this.navigateToOrderDetailPage(
                    this.props.cart.orderConfirmationDetails.orderRefNo
                  )
                }
                orderDetails={this.props.cart.orderConfirmationDetails}
                orderConfirmationBanner={() =>
                  this.props.orderConfirmationBanner()
                }
              />
            </div>
          )}
          {this.props.cart.cliqCashJusPayDetails && (
            <div className={styles.orderConfirmationHolder}>
              <OrderConfirmation
                history={this.props.history}
                clearCartDetails={this.props.clearCartDetails}
                orderId={this.props.cart.cliqCashJusPayDetails.orderId}
                orderStatusMessage={this.props.orderConfirmationText}
                captureOrderExperience={rating =>
                  this.captureOrderExperience(rating)
                }
                continueShopping={() => this.continueShopping()}
                orderConfirmationUpdate={() => this.orderConfirmationUpdate()}
                trackOrder={() =>
                  this.navigateToOrderDetailPage(
                    this.props.cart.cliqCashJusPayDetails.orderId
                  )
                }
                orderDetails={this.props.cart.cliqCashJusPayDetails}
              />
            </div>
          )}
        </div>
      );
    } else if (this.state.paymentConfirmation) {
      return (
        <div className={styles.orderConfirmationHolder}>
          <PaymentConfirmationPage
            orderStatusMessage={this.props.orderConfirmationText}
            orderId={this.props.cart.getPrepaidOrderPaymentConfirmation.orderId}
            orderDetails={this.props.cart.cliqCashJusPayDetails}
            continueShopping={() => this.continueShopping()}
            trackOrder={() => this.navigateToOrderHistoryPage()}
            captureOrderExperience={rating =>
              this.captureOrderExperienceForStripe(rating)
            }
            history={this.props.history}
            fetchOrderDetails={(orderId, pageName) =>
              this.props.fetchOrderDetails(orderId, pageName)
            }
          />
        </div>
      );
    } else {
      return null;
    }
  }
}

export default CheckOutPage;

CheckOutPage.propTypes = {
  getCartDetailsCNC: PropTypes.func,
  selectDeliveryMode: PropTypes.func,
  getAllStoresCNC: PropTypes.func,
  addStoreCNC: PropTypes.func,
  addPickupPersonCNC: PropTypes.func
};

CheckOutPage.defaultProps = {
  cartTax: "included",
  delivery: "Free",
  offers: "Apply",
  orderConfirmationText: "Your Order Successfully Placed"
};
