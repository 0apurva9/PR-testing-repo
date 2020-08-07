import {
  SUCCESS,
  REQUESTING,
  ERROR,
  GLOBAL_ACCESS_TOKEN,
  SUCCESS_UPPERCASE,
  SUCCESS_CAMEL_CASE,
  DEFAULT_PIN_CODE_LOCAL_STORAGE,
  CART_BAG_DETAILS,
  PLAT_FORM_NUMBER,
  CART_DETAILS_FOR_LOGGED_IN_USER,
  CART_DETAILS_FOR_ANONYMOUS,
  FAILURE,
  CUSTOMER_ACCESS_TOKEN,
  LOGGED_IN_USER_DETAILS,
  ANONYMOUS_USER,
  TIME_OUT_FOR_APIS,
  LOW_INTERNET_CONNECTION_MESSAGE,
  CHANNEL
} from "../../lib/constants";
import * as Cookie from "../../lib/Cookie";
import {
  getMcvId,
  setDataLayerForPdpDirectCalls,
  SET_DATA_LAYER_FOR_ADD_TO_BAG_EVENT,
  QA2_MCV_ID,
  SET_DATA_LAYER_FOR_SUBMIT_REVIEW,
  setDataLayerForCartDirectCalls,
  ADOBE_DIRECT_CALL_FOR_PINCODE_FAILURE,
  ADOBE_DIRECT_CALL_FOR_PINCODE_SUCCESS,
  setDataLayer,
  ADOBE_PDP_TYPE
} from "../../lib/adobeUtils.js";
// import each from "lodash.foreach";
import {
  showModal,
  PRODUCT_IN_BAG_MODAL
} from "../../general/modal.actions.js";
import { setBagCount } from "../../general/header.actions";
import * as ErrorHandling from "../../general/ErrorHandling.js";
import { isBrowser } from "browser-or-node";
import { getCartCountForLoggedInUser } from "../../cart/actions/cart.actions.js";
import { API_MSD_URL_ROOT } from "../../lib/apiRequest.js";
import { displayToast } from "../../general/toast.actions.js";
export const SUBMIT_REVIEW_TEXT = "Thanks! Review submitted successfully";
export const PRODUCT_DESCRIPTION_REQUEST = "PRODUCT_DESCRIPTION_REQUEST";
export const PRODUCT_DESCRIPTION_SUCCESS = "PRODUCT_DESCRIPTION_SUCCESS";
export const PRODUCT_DESCRIPTION_FAILURE = "PRODUCT_DESCRIPTION_FAILURE";

export const CHECK_PRODUCT_PIN_CODE_REQUEST = "CHECK_PRODUCT_PIN_CODE_REQUEST";
export const CHECK_PRODUCT_PIN_CODE_SUCCESS = "CHECK_PRODUCT_PIN_CODE_SUCCESS";
export const CHECK_PRODUCT_PIN_CODE_FAILURE = "CHECK_PRODUCT_PIN_CODE_FAILURE";

export const ADD_PRODUCT_TO_CART_REQUEST = "ADD_PRODUCT_TO_CART_REQUEST";
export const ADD_PRODUCT_TO_CART_SUCCESS = "ADD_PRODUCT_TO_CART_SUCCESS";
export const ADD_PRODUCT_TO_CART_FAILURE = "ADD_PRODUCT_TO_CART_FAILURE";

export const PRODUCT_SIZE_GUIDE_REQUEST = "PRODUCT_SIZE_GUIDE_REQUEST";
export const PRODUCT_SIZE_GUIDE_SUCCESS = "PRODUCT_SIZE_GUIDE_SUCCESS";
export const PRODUCT_SIZE_GUIDE_FAILURE = "PRODUCT_SIZE_GUIDE_FAILURE";

export const PRODUCT_SIZE_CHART_REQUEST = "PRODUCT_SIZE_CHART_REQUEST";
export const PRODUCT_SIZE_CHART_SUCCESS = "PRODUCT_SIZE_CHART_SUCCESS";
export const PRODUCT_SIZE_CHART_FAILURE = "PRODUCT_SIZE_CHART_FAILURE";

export const PRODUCT_PDP_EMI_REQUEST = "PRODUCT_PDP_EMI_REQUEST";
export const PRODUCT_PDP_EMI_SUCCESS = "PRODUCT_PDP_EMI_SUCCESS";
export const PRODUCT_PDP_EMI_FAILURE = "PRODUCT_PDP_EMI_FAILURE";

export const GET_EMI_TERMS_AND_CONDITIONS_SUCCESS =
  "GET_EMI_TERMS_AND_CONDITIONS_SUCCESS";
export const GET_EMI_TERMS_AND_CONDITIONS_FAILURE =
  "GET_EMI_TERMS_AND_CONDITIONS_FAILURE";
export const GET_EMI_TERMS_AND_CONDITIONS_REQUEST =
  "GET_EMI_TERMS_AND_CONDITIONS_REQUEST";

export const PRODUCT_SPECIFICATION_REQUEST = "PRODUCT_SPECIFICATION_REQUEST";
export const PRODUCT_SPECIFICATION_SUCCESS = "PRODUCT_SPECIFICATION_SUCCESS";
export const PRODUCT_SPECIFICATION_FAILURE = "PRODUCT_SPECIFICATION_FAILURE";

export const ADD_PRODUCT_REVIEW_REQUEST = "ADD_PRODUCT_REVIEW_REQUEST";
export const ADD_PRODUCT_REVIEW_SUCCESS = "ADD_PRODUCT_REVIEW_SUCCESS";
export const ADD_PRODUCT_REVIEW_FAILURE = "ADD_PRODUCT_REVIEW_FAILURE";

export const EDIT_PRODUCT_REVIEW_REQUEST = "EDIT_PRODUCT_REVIEW_REQUEST";
export const EDIT_PRODUCT_REVIEW_SUCCESS = "EDIT_PRODUCT_REVIEW_SUCCESS";
export const EDIT_PRODUCT_REVIEW_FAILURE = "EDIT_PRODUCT_REVIEW_FAILURE";

export const GET_PRODUCT_REVIEW_REQUEST = "GET_PRODUCT_REVIEW_REQUEST";
export const GET_PRODUCT_REVIEW_SUCCESS = "GET_PRODUCT_REVIEW_SUCCESS";
export const GET_PRODUCT_REVIEW_FAILURE = "GET_PRODUCT_REVIEW_FAILURE";

export const FOLLOW_UN_FOLLOW_BRAND_REQUEST = "FOLLOW_UN_FOLLOW_BRAND_REQUEST";
export const FOLLOW_UN_FOLLOW_BRAND_SUCCESS = "FOLLOW_UN_FOLLOW_BRAND_SUCCESS";
export const FOLLOW_UN_FOLLOW_BRAND_FAILURE = "FOLLOW_UN_FOLLOW_BRAND_FAILURE";

export const DELETE_PRODUCT_REVIEW_REQUEST = "DELETE_PRODUCT_REVIEW_REQUEST";
export const DELETE_PRODUCT_REVIEW_SUCCESS = "DELETE_PRODUCT_REVIEW_SUCCESS";
export const DELETE_PRODUCT_REVIEW_FAILURE = "DELETE_PRODUCT_REVIEW_FAILURE";

export const PRODUCT_MSD_REQUEST = "PRODUCT_MSD_REQUEST";
export const PRODUCT_MSD_SUCCESS = "PRODUCT_MSD_SUCCESS";
export const PRODUCT_MSD_FAILURE = "PRODUCT_MSD_FAILURE";

export const GET_PDP_ITEMS_REQUEST = "GET_PDP_ITEMS_REQUEST";
export const GET_PDP_ITEMS_SUCCESS = "GET_PDP_ITEMS_SUCCESS";
export const GET_PDP_ITEMS_FAILURE = "GET_PDP_ITEMS_FAILURE";

export const PDP_ABOUT_BRAND_REQUEST = "PDP_ABOUT_BRAND_REQUEST";
export const PDP_ABOUT_BRAND_SUCCESS = "PDP_ABOUT_BRAND_SUCCESS";
export const PDP_ABOUT_BRAND_FAILURE = "PDP_ABOUT_BRAND_FAILURE";
//NU-385 for Desktop
export const PDP_OFFER_REQUEST = "PDP_OFFER_REQUEST";
export const PDP_OFFER_SUCCESS = "PDP_OFFER_SUCCESS";
export const PDP_OFFER_FAILURE = "PDP_OFFER_FAILURE";

//bundledProduct
export const BUNDLE_PRODUCT_REQUEST = "BUNDLE_PRODUCT_REQUEST";
export const BUNDLE_PRODUCT_SUCCESS = "BUNDLE_PRODUCT_SUCCESS";
export const BUNDLE_PRODUCT_FAILURE = "BUNDLE_PRODUCT_FAILURE";

export const CHECK_BUNDLE_PRODUCT_PIN_CODE_REQUEST =
  "CHECK_BUNDLE_PRODUCT_PIN_CODE_REQUEST";
export const CHECK_BUNDLE_PRODUCT_PIN_CODE_FAILURE =
  "CHECK_BUNDLE_PRODUCT_PIN_CODE_FAILURE";
export const CHECK_BUNDLE_PRODUCT_PIN_CODE_SUCCESS =
  "CHECK_BUNDLE_PRODUCT_PIN_CODE_SUCCESS";

export const PRODUCT_DETAILS_PATH = "v2/mpl/users";
export const PIN_CODE_AVAILABILITY_PATH = "pincodeserviceability";
export const PRODUCT_PDP_EMI_PATH = `v2/mpl/getEMIDetails`;
export const EMI_TERMS_PATH = "/v2/mpl/cms/products/getEmiTermsAndConditions";
export const FOLLOW_UN_FOLLOW_PATH = "v2/mpl/products";

export const ABOUT_THE_BRAND_WIDGET_KEY = "aboutTheBrand";
export const RECOMMENDED_PRODUCTS_WIDGET_KEY = "recommendedProducts";
export const SIMILAR_PRODUCTS_WIDGET_KEY = "similarProducts";

export const OPEN_IN_APP_REQUEST = "OPEN_IN_APP_REQUEST";
export const OPEN_IN_APP_SUCCESS = "OPEN_IN_APP_SUCCESS";
export const OPEN_IN_APP_FAILURE = "OPEN_IN_APP_FAILURE";

export const RELEVANT_BUNDLE_PRODUCT_REQUEST =
  "RELEVANT_BUNDLE_PRODUCT_REQUEST";
export const RELEVANT_BUNDLE_PRODUCT_SUCCESS =
  "RELEVANT_BUNDLE_PRODUCT_SUCCESS";
export const RELEVANT_BUNDLE_PRODUCT_FAILURE =
  "RELEVANT_BUNDLE_PRODUCT_SUCCESS";

export const CHECK_RELEVANT_PRODUCT_PIN_CODE_REQUEST =
  "CHECK_RELEVANT_PRODUCT_PIN_CODE_REQUEST";
export const CHECK_RELEVANT_PRODUCT_PIN_CODE_SUCCESS =
  "CHECK_RELEVANT_PRODUCT_PIN_CODE_SUCCESS";
export const CHECK_RELEVANT_PRODUCT_PIN_CODE_FAILURE =
  "CHECK_RELEVANT_PRODUCT_PIN_CODE_FAILURE";

export const RELAVANT_PRODUCT_DETAILS_REQUEST =
  "RELAVANT_PRODUCT_DETAILS_REQUEST";
export const RELAVANT_PRODUCT_DETAILS_SUCCESS =
  "RELAVANT_PRODUCT_DETAILS_SUCCESS";
export const RELAVANT_PRODUCT_DETAILS_FAILURE =
  "RELAVANT_PRODUCT_DETAILS_FAILURE";

export const SECONDARY_BUNDLE_PRODUCT_REQUEST =
  "SECONDARY_BUNDLE_PRODUCT_REQUEST";
export const SECONDARY_BUNDLE_PRODUCT_SUCCESS =
  "SECONDARY_BUNDLE_PRODUCT_SUCCESS";
export const SECONDARY_BUNDLE_PRODUCT_FAILURE =
  "SECONDARY_BUNDLE_PRODUCT_FAILURE";

export const RELEVANT_BUNDLE_PRODUCT_CODE_REQUEST =
  "RELEVANT_BUNDLE_PRODUCT_CODE_REQUEST";
export const RELEVANT_BUNDLE_PRODUCT_CODE_SUCCESS =
  "RELEVANT_BUNDLE_PRODUCT_CODE_SUCCESS";
export const RELEVANT_BUNDLE_PRODUCT_CODE_FAILURE =
  "RELEVANT_BUNDLE_PRODUCT_CODE_FAILURE";

export const GET_ALL_STORES_FOR_CLIQ_AND_PIQ_REQUEST =
  "GET_ALL_STORES_FOR_CLIQ_AND_PIQ_REQUEST";
export const GET_ALL_STORES_FOR_CLIQ_AND_PIQ_SUCCESS =
  "GET_ALL_STORES_FOR_CLIQ_AND_PIQ_SUCCESS";
export const GET_ALL_STORES_FOR_CLIQ_AND_PIQ_FAILURE =
  "GET_ALL_STORES_FOR_CLIQ_AND_PIQ_FAILURE";

export const EXCHANGE_DETAILS_REQUEST = "EXCHANGE_DETAILS_REQUEST";
export const EXCHANGE_DETAILS_SUCCESS = "EXCHANGE_DETAILS_SUCCESS";
export const EXCHANGE_DETAILS_FAILURE = "EXCHANGE_DETAILS_FAILURE";

export const UPDATE_DETAILS_SUCCESS = "UPDATE_DETAILS_SUCCESS";

export const CHECK_IMEI_NUMBER_REQUEST = "CHECK_IMEI_NUMBER_REQUEST";
export const CHECK_IMEI_NUMBER_SUCCESS = "CHECK_IMEI_NUMBER_SUCCESS";
export const CHECK_IMEI_NUMBER_FAILURE = "CHECK_IMEI_NUMBER_FAILURE";

export const SHOW_PDP_PIQ_PAGE = "showPdpPiqPage";
export const HIDE_PDP_PIQ_PAGE = "hidePdpPiqPage";
const ALL_STORES_FOR_CLIQ_AND_PIQ_PATH = "v2/mpl/allStores";
export const SET_TO_OLD = "SET_TO_OLD";
const MY_WISH_LIST = "MyWishList";
const PRODUCT_SPECIFICATION_PATH = "/v2/mpl/products/productDetails";
const PRODUCT_DESCRIPTION_PATH = "v2/mpl/products/productDetails";
const PRODUCT_SIZE_GUIDE_PATH = "v2/mpl/products/";
const ORDER_BY = "desc";
const SORT = "byDate";
const PAGE_VALUE = "0";
const PAGE_NUMBER = "25";
const MSD_REQUEST_PATH = "widgets";
const API_KEY = "8783ef14595919d35b91cbc65b51b5b1da72a5c3";
const WIDGET_LIST = [0, 4];
const WIDGET_LIST_FOR_ABOUT_BRAND = [114];
const NUMBER_RESULTS = [10, 10];
//TPR-9957 for Desktop
export const PDP_MANUFACTURER_REQUEST = "PDP_MANUFACTURER_REQUEST";
export const PDP_MANUFACTURER_SUCCESS = "PDP_MANUFACTURER_SUCCESS";
export const PDP_MANUFACTURER_FAILURE = "PDP_MANUFACTURER_FAILURE";
export const PDP_RECENTLY_VIEWED_REQUEST = "PDP_RECENTLY_VIEWED_REQUEST";
export const PDP_RECENTLY_VIEWED_SUCCESS = "PDP_RECENTLY_VIEWED_SUCCESS";
export const PDP_RECENTLY_VIEWED_FAILURE = "PDP_RECENTLY_VIEWED_FAILURE";

export const GET_BUNDLED_PRODUCT_SUGGESTION_REQUEST =
  "GET_BUNDLED_PRODUCT_SUGGESTION_REQUEST";
export const GET_BUNDLED_PRODUCT_SUGGESTION_SUCCESS =
  "GET_BUNDLED_PRODUCT_SUGGESTION_SUCCESS";
export const GET_BUNDLED_PRODUCT_SUGGESTION_FAILURE =
  "GET_BUNDLED_PRODUCT_SUGGESTION_FAILURE";

export const GET_TOTAL_BUNDLED_PRICE_REQUEST =
  "GET_TOTAL_BUNDLED_PRICE_REQUEST";
export const GET_TOTAL_BUNDLED_PRICE_SUCCESS =
  "GET_TOTAL_BUNDLED_PRICE_SUCCESS";
export const GET_TOTAL_BUNDLED_PRICE_FAILURE =
  "GET_TOTAL_BUNDLED_PRICE_FAILURE";

export function getProductDescriptionRequest() {
  return {
    type: PRODUCT_DESCRIPTION_REQUEST,
    status: REQUESTING
  };
}
export function getProductDescriptionSuccess(productDescription) {
  return {
    type: PRODUCT_DESCRIPTION_SUCCESS,
    status: SUCCESS,
    productDescription
  };
}

export function getProductDescriptionFailure(error) {
  return {
    type: PRODUCT_DESCRIPTION_FAILURE,
    status: ERROR,
    error
  };
}
export function getProductDescription(
  productCode,
  behaviorOfPage,
  isApiCall: 0,
  componentName
) {
  return async (dispatch, getState, { api }) => {
    dispatch(getProductDescriptionRequest());
    try {
      let behaviorOfPageTheCurrent = behaviorOfPage ? behaviorOfPage : null;
      setTimeout(() => {
        if (getState().productDescription.getProductDetailsLoading) {
          dispatch(displayToast(LOW_INTERNET_CONNECTION_MESSAGE));
        }
      }, TIME_OUT_FOR_APIS);
      const result = await api.getMiddlewareUrl(
        `${PRODUCT_DESCRIPTION_PATH}/${productCode}?isPwa=true&isMDE=true`
      );
      const resultJson = await result.json();
      if (
        resultJson.status === SUCCESS ||
        resultJson.status === SUCCESS_UPPERCASE ||
        resultJson.status === SUCCESS_CAMEL_CASE
      ) {
        let urlLength = window.location.pathname.split("/");
        if (
          resultJson.seo &&
          resultJson.seo.alternateURL &&
          urlLength.length === 2
        ) {
          window.location.pathname = resultJson.seo.alternateURL;
        }
        setDataLayer(
          ADOBE_PDP_TYPE,
          resultJson,
          null,
          null,
          behaviorOfPageTheCurrent
        );
        return dispatch(getProductDescriptionSuccess(resultJson));
      } else {
        if (resultJson.status === 404 && isApiCall === 0) {
          isApiCall = isApiCall + 1;
          dispatch(getProductDescription(productCode, isApiCall));
        } else {
          throw new Error(`${resultJson.error}`);
        }
      }
    } catch (e) {
      return dispatch(getProductDescriptionFailure(e.message));
    }
  };
}
export function setToOld() {
  return {
    type: SET_TO_OLD
  };
}
export function getProductPinCodeRequest() {
  return {
    type: CHECK_PRODUCT_PIN_CODE_REQUEST,
    status: REQUESTING
  };
}
export function getProductPinCodeSuccess(productPinCode) {
  return {
    type: CHECK_PRODUCT_PIN_CODE_SUCCESS,
    status: SUCCESS,
    productPinCode
  };
}

export function getProductPinCodeFailure(error) {
  return {
    type: CHECK_PRODUCT_PIN_CODE_FAILURE,
    status: ERROR,
    error
  };
}

export function getProductPinCode(
  pinCode: null,
  productCode,
  winningUssID,
  isComingFromPiqPage,
  isExchangeAvailable,
  isComingFromClickEvent = false
) {
  let validProductCode = productCode.toUpperCase();
  if (pinCode) {
    localStorage.setItem(DEFAULT_PIN_CODE_LOCAL_STORAGE, pinCode);
  }
  return async (dispatch, getState, { api }) => {
    dispatch(getProductPinCodeRequest());
    try {
      let url;
      let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
      let globalCookie = Cookie.getCookie(GLOBAL_ACCESS_TOKEN);
      let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
      if (userDetails) {
        let userName = JSON.parse(userDetails).userName;
        let accessToken = JSON.parse(customerCookie).access_token;
        if (isExchangeAvailable) {
          url = `${PRODUCT_DETAILS_PATH}/${userName}/checkPincode?access_token=${accessToken}&productCode=${validProductCode}&pin=${pinCode}&exchangeAvailable=true&isMDE=true`;
        } else {
          url = `${PRODUCT_DETAILS_PATH}/${userName}/checkPincode?access_token=${accessToken}&productCode=${validProductCode}&pin=${pinCode}&exchangeAvailable=false&isMDE=true`;
        }
      } else {
        let userName = ANONYMOUS_USER;
        let accessToken = JSON.parse(globalCookie).access_token;
        if (isExchangeAvailable) {
          url = `${PRODUCT_DETAILS_PATH}/${userName}/checkPincode?access_token=${accessToken}&productCode=${validProductCode}&pin=${pinCode}&exchangeAvailable=true&isMDE=true`;
        } else {
          url = `${PRODUCT_DETAILS_PATH}/${userName}/checkPincode?access_token=${accessToken}&productCode=${validProductCode}&pin=${pinCode}&exchangeAvailable=false&isMDE=true`;
        }
      }
      const result = await api.post(url);
      const resultJson = await result.json();
      // const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      let cncDeliveryModes = "";
      let getDeliveryModesByWinningUssid = "";
      let pincodeError;
      if (
        isComingFromPiqPage &&
        resultJson &&
        resultJson.listOfDataList &&
        resultJson.listOfDataList[0] &&
        resultJson.listOfDataList[0].value &&
        resultJson.listOfDataList[0].value.pincodeListResponse
      ) {
        getDeliveryModesByWinningUssid = resultJson.listOfDataList[0].value.pincodeListResponse.find(
          val => {
            return val.ussid === winningUssID;
          }
        );
      }
      if (
        isComingFromPiqPage &&
        getDeliveryModesByWinningUssid &&
        getDeliveryModesByWinningUssid.validDeliveryModes
      ) {
        cncDeliveryModes = getDeliveryModesByWinningUssid.validDeliveryModes.find(
          val => {
            return val.type === "CNC";
          }
        );
      }
      if (
        resultJson &&
        resultJson.listOfDataList &&
        resultJson.listOfDataList[0] &&
        resultJson.listOfDataList[0].value &&
        Object.keys(resultJson.listOfDataList[0].value).length === 0
      ) {
        if (
          !resultJson.productOutOfStockMessage ||
          !resultJson.productNotServiceableMessage
        ) {
          pincodeError = "Please enter a valid pincode";
          dispatch(displayToast("Please enter a valid pincode"));
        }
      } else if (
        isComingFromPiqPage &&
        getDeliveryModesByWinningUssid &&
        (!getDeliveryModesByWinningUssid.validDeliveryModes ||
          !cncDeliveryModes ||
          !cncDeliveryModes.CNCServiceableSlavesData)
      ) {
        dispatch(
          displayToast(
            "Unfortunately, we're currently unable to ship this item to your PIN code. Can we ship it to another address?"
          )
        );
        dispatch(hidePdpPiqPage());
        window.scroll({
          top: 230,
          behavior: "smooth"
        });
      }
      if (
        !resultJson.productNotServiceabilityMessage ||
        !resultJson.productOutOfStockMessage
      ) {
        if (isComingFromClickEvent && resultJson.isPickupAvailableForExchange) {
          dispatch(displayToast("Exchange is serviceable at your pincode"));
        }
      }
      // if (pinCode) {
      //   localStorage.removeItem(SELECTED_STORE);
      // }
      if (
        resultJson &&
        resultJson.listOfDataList[0] &&
        resultJson.listOfDataList[0].value &&
        resultJson.listOfDataList[0].value.pincodeListResponse &&
        resultJson.listOfDataList[0].value.pincodeListResponse[0] &&
        resultJson.listOfDataList[0].value.pincodeListResponse[0]
          .isServicable != "N"
      ) {
        setDataLayerForCartDirectCalls(
          ADOBE_DIRECT_CALL_FOR_PINCODE_SUCCESS,
          pinCode
        );
      } else {
        setDataLayerForCartDirectCalls(
          ADOBE_DIRECT_CALL_FOR_PINCODE_FAILURE,
          pinCode
        );
      }
      return dispatch(
        getProductPinCodeSuccess({
          pinCode,
          deliveryOptions:
            resultJson &&
            resultJson.listOfDataList &&
            resultJson.listOfDataList[0] &&
            resultJson.listOfDataList[0].value,
          isPickupAvailableForExchange: resultJson.isPickupAvailableForExchange,
          cashifyPickupCharge:
            resultJson.pickupCharge && resultJson.pickupCharge.value,
          city: resultJson.city,
          productOutOfStockMessage: resultJson.productOutOfStockMessage,
          productNotServiceableMessage:
            resultJson.productNotServiceabilityMessage,
          pincodeError
        })
      );
      // if (isComingFromPiqPage) {
      //   dispatch(getAllStoresForCliqAndPiq());
      // }
    } catch (e) {
      pinCode = "00000";
      setDataLayerForCartDirectCalls(
        ADOBE_DIRECT_CALL_FOR_PINCODE_FAILURE,
        pinCode
      );
      return dispatch(getProductPinCodeFailure(e.message));
    }
  };
}

export function addProductToCartRequest() {
  return {
    type: ADD_PRODUCT_TO_CART_REQUEST,
    status: REQUESTING
  };
}
export function addProductToCartSuccess(newProduct) {
  return {
    type: ADD_PRODUCT_TO_CART_SUCCESS,
    status: SUCCESS,
    newProduct
  };
}

export function addProductToCartFailure(error) {
  return {
    type: ADD_PRODUCT_TO_CART_FAILURE,
    status: ERROR,
    error
  };
}

export function addProductToCart(productDetails) {
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
  let cartId = cartDetails ? JSON.parse(cartDetails).code : null;

  return async (dispatch, getState, { api }) => {
    //get verify imei api response,check exchange avail or not,get product already in cart
    let IMEIApiResponse = productDetails.verifyIMEINumberAPIResponse;
    let disableNext = false;
    await dispatch(getCartCountForLoggedInUser()).then(data => {
      if (
        data &&
        data.status &&
        data.status.toLowerCase() === "success" &&
        data.cartDetails.products
      ) {
        let isProductInCart = data.cartDetails.products.find(val => {
          return val.USSID === productDetails.ussId;
        });
        if (
          isProductInCart &&
          isProductInCart.exchangeDetails &&
          productDetails.isFromMobileExchange
        ) {
          dispatch(
            showModal(PRODUCT_IN_BAG_MODAL, {
              isWithExchange: true
            })
          );
          disableNext = true;
        }
        if (
          isProductInCart &&
          !isProductInCart.exchangeDetails &&
          !productDetails.isFromMobileExchange
        ) {
          dispatch(showModal(PRODUCT_IN_BAG_MODAL));
          disableNext = true;
        }
      }
    });
    if (disableNext) {
      return false;
    }
    dispatch(addProductToCartRequest());
    try {
      let result;
      // Checked with string as local storage returns as string format
      // If exchange available and IMEI verified then only send exchange details
      if (IMEIApiResponse && productDetails.isFromMobileExchange) {
        let requestParams = {
          quoteId: IMEIApiResponse.quoteId,
          requestId: IMEIApiResponse.requestId,
          quoteExpiryDate: IMEIApiResponse.quoteExpiryDate,
          exchangeBrandId: IMEIApiResponse.exchangeBrandId,
          exchangeBrandName: IMEIApiResponse.exchangeBrandName,
          exchangeProductId: IMEIApiResponse.exchangeProductId,
          exchangeModelName: IMEIApiResponse.exchangeModelName,
          effectiveModelName: IMEIApiResponse.effectiveModelName,
          exchangeAmountCashify: IMEIApiResponse.exchangeAmountCashify.value,
          pickupCharge: IMEIApiResponse.pickupCharge.value,
          totalExchangeCashback: IMEIApiResponse.totalExchangeCashback.value,
          IMEINumber: IMEIApiResponse.IMEINumber
        };
        if (
          IMEIApiResponse.effectiveAmount &&
          IMEIApiResponse.effectiveAmount.value
        ) {
          requestParams.effectiveAmount = IMEIApiResponse.effectiveAmount.value;
        }
        if (IMEIApiResponse.TULBump && IMEIApiResponse.TULBump.value) {
          requestParams.TULBump = IMEIApiResponse.TULBump.value;
        }
        result = await api.post(
          `${PRODUCT_DETAILS_PATH}/${userId}/carts/${
            cartId ? cartId + "/" : ""
          }productAdditionToCart_V1?access_token=${accessToken}&isPwa=true&platformNumber=${PLAT_FORM_NUMBER}&productCode=${
            productDetails.code
          }&USSID=${productDetails.ussId}&quantity=${
            productDetails.quantity
          }&addedToCartWl=false&channel=${CHANNEL}&isMDE=true`,
          requestParams
        );
      } else {
        //normal add to cart
        result = await api.post(
          `${PRODUCT_DETAILS_PATH}/${userId}/carts/${
            cartId ? cartId + "/" : ""
          }productAdditionToCart_V1?access_token=${accessToken}&isPwa=true&platformNumber=${PLAT_FORM_NUMBER}&productCode=${
            productDetails.code
          }&USSID=${productDetails.ussId}&quantity=${
            productDetails.quantity
          }&addedToCartWl=false&channel=${CHANNEL}&isMDE=true`
        );
      }
      const resultJson = await result.json();
      // const resultJson = addToCartError;
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        if (
          resultJson.errorCode === "EX05" ||
          resultJson.errorCode === "NU011" ||
          resultJson.errorCode === "EX06" ||
          resultJson.errorCode === "B9069"
        ) {
          dispatch(displayToast(resultJson.error));
        }
        // throw new Error(resultJsonStatus.message);
        return dispatch(addProductToCartFailure(resultJson.error));
      }

      //set local storage
      let bagItem = localStorage.getItem(CART_BAG_DETAILS);
      let bagItemsInJsonFormat = bagItem ? JSON.parse(bagItem) : [];
      if (!bagItemsInJsonFormat.includes(productDetails.ussId)) {
        bagItemsInJsonFormat.push(productDetails.ussId);
      }
      localStorage.setItem(
        CART_BAG_DETAILS,
        JSON.stringify(bagItemsInJsonFormat)
      );

      // here we dispatch a modal to show something was added to the bag
      dispatch(setBagCount(bagItemsInJsonFormat.length));
      setDataLayerForPdpDirectCalls(SET_DATA_LAYER_FOR_ADD_TO_BAG_EVENT);
      return dispatch(addProductToCartSuccess(resultJson));
      // ADOBE_ADD_TO_CART
    } catch (e) {
      return dispatch(addProductToCartFailure(e.message));
    }
  };
}

export function getProductSizeGuideRequest() {
  return {
    type: PRODUCT_SIZE_GUIDE_REQUEST,
    status: REQUESTING
  };
}
export function getProductSizeGuideSuccess(sizeGuide) {
  return {
    type: PRODUCT_SIZE_GUIDE_SUCCESS,
    status: SUCCESS,
    sizeGuide
  };
}

export function getProductSizeGuideFailure(error) {
  return {
    type: PRODUCT_SIZE_GUIDE_FAILURE,
    status: ERROR,
    error
  };
}

export function getProductSizeChartRequest() {
  return {
    type: PRODUCT_SIZE_CHART_REQUEST,
    status: REQUESTING
  };
}
export function getProductSizeChartSuccess(sizeChart) {
  return {
    type: PRODUCT_SIZE_CHART_SUCCESS,
    status: SUCCESS,
    sizeChart
  };
}

export function getProductSizeChartFailure(error) {
  return {
    type: PRODUCT_SIZE_CHART_FAILURE,
    status: ERROR,
    error
  };
}

export function getProductSizeGuide(productCode) {
  return async (dispatch, getState, { api }) => {
    dispatch(getProductSizeGuideRequest());
    try {
      const result = await api.getMiddlewareUrl(
        `${PRODUCT_SIZE_GUIDE_PATH}${productCode}/sizeGuide?isPwa=true`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }

      dispatch(getProductSizeGuideSuccess(resultJson));
    } catch (e) {
      dispatch(getProductSizeGuideFailure(e.message));
    }
  };
}

export function getProductSizeChart(productCode) {
  return async (dispatch, getState, { api }) => {
    dispatch(getProductSizeChartRequest());
    try {
      const result = await api.getMiddlewareUrl(
        `${PRODUCT_SIZE_GUIDE_PATH}${productCode}/sizeGuideChart?isPwa=true`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      dispatch(getProductSizeChartSuccess(resultJson));
    } catch (e) {
      dispatch(getProductSizeChartFailure(e));
    }
  };
}

export function getEmiTermsRequest() {
  return {
    type: GET_EMI_TERMS_AND_CONDITIONS_REQUEST,
    status: REQUESTING
  };
}

export function getEmiTermsSuccess(emiTerms) {
  return {
    type: GET_EMI_TERMS_AND_CONDITIONS_SUCCESS,
    status: SUCCESS,
    emiTerms
  };
}

export function getEmiTermsFailure(error) {
  return {
    type: GET_EMI_TERMS_AND_CONDITIONS_FAILURE,
    status: FAILURE,
    error
  };
}

export function getEmiTerms(accessToken, productValue) {
  return async (dispatch, getState, { api }) => {
    dispatch(getEmiTermsRequest());
    try {
      const url = `${EMI_TERMS_PATH}?access_token=${accessToken}&productValue=${productValue}`;
      const result = await api.get(url);
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }

      dispatch(getEmiTermsSuccess(resultJson));
    } catch (e) {
      dispatch(getEmiTermsFailure(e.message));
    }
  };
}

export function getPdpEmiRequest() {
  return {
    type: PRODUCT_PDP_EMI_REQUEST,
    status: REQUESTING
  };
}
export function getPdpEmiSuccess(emiResult) {
  return {
    type: PRODUCT_PDP_EMI_SUCCESS,
    status: SUCCESS,
    emiResult
  };
}

export function getPdpEmiFailure(error) {
  return {
    type: PRODUCT_PDP_EMI_FAILURE,
    status: ERROR,
    error
  };
}
export function getPdpEmi(token, cartValue, productCode, ussId) {
  return async (dispatch, getState, { api }) => {
    dispatch(getPdpEmiRequest());
    try {
      const url = `${PRODUCT_PDP_EMI_PATH}?isPwa=true&channel=mobile&productValue=${cartValue}&ussids=${ussId}&productCode=${productCode}&nceFlag=true&access_token=${token}&emiConvChargeFlag=true`;
      const result = await api.get(url);
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      dispatch(getPdpEmiSuccess(resultJson));
    } catch (e) {
      dispatch(getPdpEmiFailure(e.message));
    }
  };
}

export function ProductSpecificationRequest() {
  return {
    type: PRODUCT_SPECIFICATION_REQUEST,
    status: REQUESTING
  };
}
export function ProductSpecificationSuccess(productDetails, productCode) {
  return {
    type: PRODUCT_SPECIFICATION_SUCCESS,
    status: SUCCESS,
    productDetails,
    productCode
  };
}

export function ProductSpecificationFailure(error) {
  return {
    type: PRODUCT_SPECIFICATION_FAILURE,
    status: ERROR,
    error
  };
}
export function getProductSpecification(productId) {
  return async (dispatch, getState, { api }) => {
    dispatch(ProductSpecificationRequest());
    try {
      const result = await api.getMiddlewareUrl(
        `${PRODUCT_SPECIFICATION_PATH}/${productId}`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }

      dispatch(ProductSpecificationSuccess(resultJson, productId));
    } catch (e) {
      dispatch(ProductSpecificationFailure(e.message));
    }
  };
}

export function addProductReviewRequest() {
  return {
    type: ADD_PRODUCT_REVIEW_REQUEST,
    status: REQUESTING
  };
}
export function addProductReviewSuccess(productReview) {
  return {
    type: ADD_PRODUCT_REVIEW_SUCCESS,
    status: SUCCESS,
    productReview
  };
}

export function addProductReviewFailure(error) {
  return {
    type: ADD_PRODUCT_REVIEW_FAILURE,
    status: ERROR,
    error
  };
}

export function addProductReview(productCode, productReview) {
  let reviewData = new FormData();
  reviewData.append("comment", productReview.comment);
  reviewData.append("rating", productReview.rating);
  reviewData.append("headline", productReview.headline);
  let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
  return async (dispatch, getState, { api }) => {
    dispatch(addProductReviewRequest());
    try {
      const result = await api.postFormData(
        `${PRODUCT_SIZE_GUIDE_PATH}${productCode}/reviews?access_token=${
          JSON.parse(customerCookie).access_token
        }`,
        reviewData
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      dispatch(displayToast(SUBMIT_REVIEW_TEXT));
      setDataLayerForPdpDirectCalls(SET_DATA_LAYER_FOR_SUBMIT_REVIEW);
      return dispatch(addProductReviewSuccess(productReview));
    } catch (e) {
      return dispatch(addProductReviewFailure(e.message));
    }
  };
}

export function editProductReviewRequest() {
  return {
    type: EDIT_PRODUCT_REVIEW_REQUEST,
    status: REQUESTING
  };
}
export function editProductReviewSuccess() {
  return {
    type: EDIT_PRODUCT_REVIEW_SUCCESS,
    status: SUCCESS
  };
}

export function editProductReviewFailure(error) {
  return {
    type: EDIT_PRODUCT_REVIEW_FAILURE,
    status: ERROR,
    error
  };
}

export function editProductReview(productCode, productReviews) {
  let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
  return async (dispatch, getState, { api }) => {
    dispatch(editProductReviewRequest());
    try {
      const result = await api.post(
        `${PRODUCT_SPECIFICATION_PATH}/${productCode}/reviews?access_token=${
          JSON.parse(customerCookie).access_token
        }&id={productReviews.id}&comment=${productReviews.comment}&rating=${
          productReviews.rating
        }&headline=${productReviews.headLine}`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }

      dispatch(editProductReviewSuccess());
    } catch (e) {
      dispatch(editProductReviewFailure(e.message));
    }
  };
}

export function deleteProductReviewRequest() {
  return {
    type: DELETE_PRODUCT_REVIEW_REQUEST,
    status: REQUESTING
  };
}
export function deleteProductReviewSuccess() {
  return {
    type: DELETE_PRODUCT_REVIEW_SUCCESS,
    status: SUCCESS
  };
}

export function deleteProductReviewFailure(error) {
  return {
    type: DELETE_PRODUCT_REVIEW_FAILURE,
    status: ERROR,
    error
  };
}

export function deleteProductReview(productCode, reviewId) {
  let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
  return async (dispatch, getState, { api }) => {
    dispatch(deleteProductReviewRequest());
    try {
      const result = await api.get(
        `${PRODUCT_SPECIFICATION_PATH}/${productCode}/reviewId/deleteReview?access_token=${
          JSON.parse(customerCookie).access_token
        }`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }

      dispatch(deleteProductReviewSuccess());
    } catch (e) {
      dispatch(deleteProductReviewFailure(e.message));
    }
  };
}

export function getProductReviewsRequest() {
  return {
    type: GET_PRODUCT_REVIEW_REQUEST,
    status: REQUESTING
  };
}
export function getProductReviewsSuccess(reviews) {
  return {
    type: GET_PRODUCT_REVIEW_SUCCESS,
    status: SUCCESS,
    reviews
  };
}

export function getProductReviewsFailure(error) {
  return {
    type: GET_PRODUCT_REVIEW_FAILURE,
    status: ERROR,
    error
  };
}

export function getProductReviews(productCode, pageIndex, orderBy, sortBy) {
  const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
  const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
  const globalCookie = Cookie.getCookie(GLOBAL_ACCESS_TOKEN);
  let accessToken, userName;
  if (userDetails && customerCookie) {
    userName = JSON.parse(userDetails).userName;
    accessToken = JSON.parse(customerCookie).access_token;
  } else {
    userName = ANONYMOUS_USER;
    accessToken = globalCookie && JSON.parse(globalCookie).access_token;
  }
  return async (dispatch, getState, { api }) => {
    dispatch(getProductReviewsRequest());
    try {
      const result = await api.get(
        `${PRODUCT_SIZE_GUIDE_PATH}${productCode.toUpperCase()}/users/${userName}/reviews?access_token=${accessToken}&page=${pageIndex}&pageSize=${PAGE_NUMBER}&orderBy=${orderBy}&sort=${sortBy}`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }

      dispatch(getProductReviewsSuccess(resultJson));
    } catch (e) {
      dispatch(getProductReviewsFailure(e.message));
    }
  };
}

export function followUnFollowBrandRequest() {
  return {
    type: FOLLOW_UN_FOLLOW_BRAND_REQUEST,
    status: REQUESTING
  };
}
export function followUnFollowBrandSuccess(brandDetails) {
  return {
    type: FOLLOW_UN_FOLLOW_BRAND_SUCCESS,
    status: SUCCESS,
    brandDetails
  };
}

export function followUnFollowBrandFailure(error) {
  return {
    type: FOLLOW_UN_FOLLOW_BRAND_FAILURE,
    status: ERROR,
    error
  };
}

export function followUnFollowBrand(brandCode) {
  return async (dispatch, getState, { api }) => {
    dispatch(followUnFollowBrandRequest());
    try {
      const currentFollowedStatus = getState().productDescription.aboutTheBrand
        .isFollowing;
      const isFollowing = !currentFollowedStatus;
      // getting market cloud id it is auto generated by use when use visti web MSSiteModeEvent
      // we just need to get it here
      const mcvId = await getMcvId();
      const result = await api.post(
        `${FOLLOW_UN_FOLLOW_PATH}/${mcvId}/updateFollowedBrands?brands=${brandCode}&follow=${isFollowing}&isPwa=true`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }

      dispatch(followUnFollowBrandSuccess({ isFollowing }));
    } catch (e) {
      dispatch(followUnFollowBrandFailure(e.message));
    }
  };
}

export function productMsdRequest() {
  return {
    type: PRODUCT_MSD_REQUEST,
    status: REQUESTING
  };
}
export function productMsdSuccess(recommendedItems, widgetKey) {
  return {
    type: PRODUCT_MSD_SUCCESS,
    status: SUCCESS,
    recommendedItems,
    widgetKey
  };
}

export function productMsdFailure(error) {
  return {
    type: PRODUCT_MSD_FAILURE,
    status: ERROR,
    error
  };
}
export function getMsdRequest(
  productCode,
  similarProducts,
  filters,
  resultsRequired
) {
  return async (dispatch, getState, { api }) => {
    let msdRequestObject = new FormData();
    let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    if (userDetails) {
      userDetails = JSON.parse(userDetails);
    }
    if (userDetails && userDetails.customerId) {
      msdRequestObject.append("user_id", userDetails.customerId);
    }
    msdRequestObject.append("api_key", API_KEY);
    // if (process.env.REACT_APP_STAGE === "qa2") {
    //   msdRequestObject.append("mad_uuid", QA2_MCV_ID);
    // } else {
    const mcvId = await getMcvId();
    msdRequestObject.append("mad_uuid", mcvId);
    // }
    msdRequestObject.append("widget_list", JSON.stringify(WIDGET_LIST));
    if (resultsRequired !== undefined && resultsRequired.length) {
      msdRequestObject.append("num_results", JSON.stringify(resultsRequired));
    } else {
      msdRequestObject.append("num_results", JSON.stringify(NUMBER_RESULTS));
    }
    msdRequestObject.append("details", true);
    msdRequestObject.append("product_id", productCode.toUpperCase());
    if (filters) {
      msdRequestObject.append("filters", JSON.stringify(filters));
    }
    dispatch(productMsdRequest());
    try {
      const result = await api.postMsd(
        `${API_MSD_URL_ROOT}/${MSD_REQUEST_PATH}`,
        msdRequestObject
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      // if (process.env.REACT_APP_STAGE == "tmpprod") {
      //   resultJson.data[0] = SIMILAR_PRODUCTS_TMPPROD;
      // } else if (process.env.REACT_APP_STAGE === "qa2") {
      //   resultJson.data[0] = SIMILAR_PRODUCTS_QA2;
      // }

      if (
        resultJson &&
        resultJson.data &&
        resultJson.data[0] &&
        resultJson.data[0].length > 0
      ) {
        dispatch(
          getPdpItems(resultJson.data[0], RECOMMENDED_PRODUCTS_WIDGET_KEY)
        );
        dispatch(
          productMsdSuccess(resultJson.data[0], RECOMMENDED_PRODUCTS_WIDGET_KEY)
        );
      } else {
        dispatch(getPdpItems([], RECOMMENDED_PRODUCTS_WIDGET_KEY));
      }
      if (
        resultJson &&
        resultJson.data &&
        resultJson.data[1] &&
        resultJson.data[1].length > 0
      ) {
        dispatch(getPdpItems(resultJson.data[1], SIMILAR_PRODUCTS_WIDGET_KEY));
        dispatch(
          productMsdSuccess(resultJson.data[1], SIMILAR_PRODUCTS_WIDGET_KEY)
        );
      }
    } catch (e) {
      dispatch(productMsdFailure(e.message));
    }
  };
}
export function productMsdRecentlyViewedRequest() {
  return {
    type: PDP_RECENTLY_VIEWED_REQUEST,
    status: REQUESTING
  };
}
export function productMsdRecentlyViewedFailure(error) {
  return {
    type: PDP_RECENTLY_VIEWED_FAILURE,
    status: ERROR,
    error
  };
}
export function productMsdRecentlyViewedSuccess(
  recentlyViewedProduct,
  widgetKey
) {
  return {
    type: PDP_RECENTLY_VIEWED_SUCCESS,
    status: SUCCESS,
    recentlyViewedProduct,
    widgetKey
  };
}
export function getRecentlyViewedProduct(productCode) {
  return async (dispatch, getState, { api }) => {
    let msdRequestObject = new FormData();
    let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    if (userDetails) {
      userDetails = JSON.parse(userDetails);
    }
    if (userDetails && userDetails.customerId) {
      msdRequestObject.append("user_id", userDetails.customerId);
    }
    msdRequestObject.append("api_key", API_KEY);
    if (process.env.REACT_APP_STAGE === "qa2") {
      msdRequestObject.append("mad_uuid", QA2_MCV_ID);
    } else {
      const mcvId = await getMcvId();
      msdRequestObject.append("mad_uuid", mcvId);
    }
    msdRequestObject.append("widget_list", [7]);
    msdRequestObject.append("num_results", [10]);
    msdRequestObject.append("details", false);
    dispatch(productMsdRecentlyViewedRequest());
    try {
      const result = await api.postMsd(
        `${API_MSD_URL_ROOT}/${MSD_REQUEST_PATH}`,
        msdRequestObject
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }

      if (
        resultJson &&
        resultJson.data &&
        resultJson.data[0] &&
        resultJson.data[0].length > 0
      ) {
        const removedDuplicate = [...new Set(resultJson.data[0])];
        let requests =
          removedDuplicate &&
          removedDuplicate.map(id =>
            api.getMiddlewareUrl(
              `${PRODUCT_DESCRIPTION_PATH}/${id}?isPwa=true&isMDE=true`
            )
          );
        //seprating each requests call
        let productList = [];
        await Promise.all(requests)
          .then(responses => Promise.all(responses.map(r => r.json())))
          .then(results =>
            results.forEach(res => {
              // if (res && res.results && res.results.length && res.results[0]) {
              //   productList.push(res.results[0]);
              // }
              if (res && res.status === "SUCCESS") {
                productList.push(res);
              }
            })
          );
        dispatch(
          productMsdRecentlyViewedSuccess(productList, "RecentlyViewed")
        );
      }
    } catch (e) {
      dispatch(productMsdRecentlyViewedFailure(e.message));
    }
  };
}
export function pdpAboutBrandRequest() {
  return {
    type: PDP_ABOUT_BRAND_REQUEST,
    status: REQUESTING
  };
}
export function pdpAboutBrandFailure(error) {
  return {
    type: PDP_ABOUT_BRAND_FAILURE,
    status: ERROR,
    error
  };
}
export function pdpAboutBrandSuccess(brandDetails) {
  return {
    type: PDP_ABOUT_BRAND_SUCCESS,
    status: SUCCESS,
    brandDetails
  };
}

export function pdpAboutBrand(productCode) {
  return async (dispatch, getState, { api }) => {
    let msdRequestObject = new FormData();
    let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    if (userDetails) {
      userDetails = JSON.parse(userDetails);
    }
    if (userDetails && userDetails.customerId) {
      msdRequestObject.append("user_id", userDetails.customerId);
    }
    msdRequestObject.append("api_key", API_KEY);
    msdRequestObject.append(
      "widget_list",
      JSON.stringify(WIDGET_LIST_FOR_ABOUT_BRAND)
    );
    msdRequestObject.append("num_results", JSON.stringify(NUMBER_RESULTS));
    const mcvId = await getMcvId();
    msdRequestObject.append("mad_uuid", mcvId);
    msdRequestObject.append("details", true);
    msdRequestObject.append("product_id", productCode.toUpperCase());

    dispatch(pdpAboutBrandRequest());
    try {
      // making call for fetch about brand and their items items
      // url may have to change as per api live get live
      const result = await api.postMsd(
        `${API_MSD_URL_ROOT}/${MSD_REQUEST_PATH}`,
        msdRequestObject
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }

      if (
        resultJson &&
        resultJson.data[0] &&
        resultJson.data[0].itemIds &&
        resultJson.data[0].itemIds.length > 0
      ) {
        dispatch(
          getPdpItems(resultJson.data[0].itemIds, ABOUT_THE_BRAND_WIDGET_KEY)
        );
        // updating reducer for follow brand  key
        dispatch(pdpAboutBrandSuccess(resultJson.data[0]));
      }
    } catch (e) {
      dispatch(pdpAboutBrandFailure(e.message));
    }
  };
}
export function getPdpItemsPdpRequest() {
  return {
    type: GET_PDP_ITEMS_REQUEST,
    status: REQUESTING
  };
}
export function getPdpItemsPdpSuccess(items, widgetKey) {
  return {
    type: GET_PDP_ITEMS_SUCCESS,
    status: SUCCESS,
    items,
    widgetKey
  };
}
export function getPdpItemsFailure(errorMsg) {
  return {
    type: GET_PDP_ITEMS_FAILURE,
    error: errorMsg,
    status: FAILURE
  };
}

export function getPdpItems(itemIds, widgetKey) {
  return async (dispatch, getState, { api }) => {
    dispatch(getPdpItemsPdpRequest());
    try {
      let productCodes;
      if (widgetKey === "aboutTheBrand") {
        productCodes = itemIds;
      } else {
        productCodes = itemIds.map(obj => {
          return obj.product_id;
        });
        productCodes = productCodes;
      }
      let requests =
        productCodes &&
        productCodes.map(id =>
          api.getMiddlewareUrl(
            `${PRODUCT_DESCRIPTION_PATH}/${id}?isPwa=true&isMDE=true`
          )
        );
      // seperating individual calls
      let productList = [];
      await Promise.all(requests)
        .then(responses => Promise.all(responses.map(r => r.json())))
        .then(results =>
          results.forEach(res => {
            // const resultJsonStatus = ErrorHandling.getFailureResponse(res);
            // if (resultJsonStatus.status) {
            //   throw new Error(resultJsonStatus.message);
            // }
            //changes done for handling error if product is not available
            if (res && res.status === "SUCCESS") {
              productList.push(res);
            }
          })
        );
      dispatch(getPdpItemsPdpSuccess(productList, widgetKey));
    } catch (e) {
      dispatch(getPdpItemsFailure(`MSD ${e.message}`));
    }
  };
}

//**Bundling product */
export function getbundleProductRequest() {
  return {
    type: BUNDLE_PRODUCT_REQUEST,
    status: REQUESTING
  };
}
export function getbundleProductSuccess(data) {
  return {
    type: BUNDLE_PRODUCT_SUCCESS,
    status: SUCCESS,
    data
  };
}
export function getbundleProductFailure() {
  return {
    type: BUNDLE_PRODUCT_FAILURE,
    status: FAILURE
  };
}
export function getBundleproduct(productCode, isApiCall = 0) {
  return async (dispatch, getState, { api }) => {
    dispatch(getbundleProductRequest());
    try {
      setTimeout(() => {
        if (getState().productDescription.getProductDetailsLoading) {
          dispatch(displayToast(LOW_INTERNET_CONNECTION_MESSAGE));
        }
      }, TIME_OUT_FOR_APIS);
      const result = await api.getMiddlewareUrl(
        `${PRODUCT_DESCRIPTION_PATH}/${productCode}?isPwa=true`
      );
      const resultJson = await result.json();
      if (
        resultJson.status === SUCCESS ||
        resultJson.status === SUCCESS_UPPERCASE ||
        resultJson.status === SUCCESS_CAMEL_CASE
      ) {
        return dispatch(getbundleProductSuccess(resultJson));
      } else {
        if (resultJson.status === 404 && isApiCall === 0) {
          isApiCall = isApiCall + 1;
          dispatch(getBundleproduct(productCode, isApiCall));
        } else {
          throw new Error(`${resultJson.error}`);
        }
      }
    } catch (e) {
      return dispatch(getbundleProductFailure(e.message));
    }
  };
}
//***Bundling end */

//NU-385 for Desktop
export function pdpOfferRequest() {
  return {
    type: PDP_OFFER_REQUEST,
    status: REQUESTING
  };
}

export function pdpOfferSuccess(offers, impulseOfferCalloutList) {
  return {
    type: PDP_OFFER_SUCCESS,
    status: SUCCESS,
    offers: offers,
    impulseOfferCalloutList: impulseOfferCalloutList
  };
}

export function pdpOfferFailure(error) {
  return {
    type: PDP_OFFER_FAILURE,
    status: ERROR,
    error: error
  };
}
export function getPdpOffers() {
  return async (dispatch, getState, { api }) => {
    dispatch(pdpOfferRequest());
    try {
      let productDetails = getState().productDescription.productDetails;
      let categoryCode =
        productDetails.categoryHierarchy[
          productDetails.categoryHierarchy.length - 1
        ].category_id;

      let brandCode = productDetails.brandURL.split("-");
      let brandCodeLength = brandCode.length;
      let brandCodeLast = brandCode[brandCodeLength - 1];
      const pdpOffersApi = await api.pdpOffersApi(
        productDetails.productListingId,
        productDetails.winningSellerID,
        categoryCode,
        brandCodeLast.toUpperCase()
      );
      const pdpOffersApiJson = await pdpOffersApi.json();

      if (pdpOffersApiJson.offerCalloutList) {
        dispatch(
          pdpOfferSuccess(
            pdpOffersApiJson.offerCalloutList,
            pdpOffersApiJson.impulseOfferCalloutList
              ? pdpOffersApiJson.impulseOfferCalloutList
              : []
          )
        );
      } else if (pdpOffersApiJson.impulseOfferCalloutList) {
        dispatch(pdpOfferSuccess([], pdpOffersApiJson.impulseOfferCalloutList));
      } else if (pdpOffersApiJson.status === "Success") {
        dispatch(pdpOfferSuccess([], []));
      } else {
        dispatch(pdpOfferFailure("error"));
      }
    } catch (e) {
      dispatch(pdpOfferFailure(e.message));
    }
  };
}
// Actions to get All Stores CNC
export function getAllStoresForCliqAndPiqRequest() {
  return {
    type: GET_ALL_STORES_FOR_CLIQ_AND_PIQ_REQUEST,
    status: REQUESTING
  };
}
export function getAllStoresForCliqAndPiqSuccess(storeDetails) {
  return {
    type: GET_ALL_STORES_FOR_CLIQ_AND_PIQ_SUCCESS,
    status: SUCCESS,
    storeDetails
  };
}

export function getAllStoresForCliqAndPiqFailure(error) {
  return {
    type: GET_ALL_STORES_FOR_CLIQ_AND_PIQ_FAILURE,
    status: ERROR,
    error
  };
}

// Action Creator for getting all stores CNC
export function getAllStoresForCliqAndPiq(
  newPinCode = null,
  isComingFromCliqAndPiq = false,
  isComingFromCheckoutPage = false
) {
  let pinCode;
  if (newPinCode && !isComingFromCliqAndPiq) {
    localStorage.setItem(DEFAULT_PIN_CODE_LOCAL_STORAGE, newPinCode);
    pinCode = newPinCode;
  } else {
    pinCode = localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE);
  }
  let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
  let globalCookie = Cookie.getCookie(GLOBAL_ACCESS_TOKEN);
  let accessToken;
  if (customerCookie) {
    accessToken = JSON.parse(customerCookie).access_token;
  } else {
    accessToken = JSON.parse(globalCookie).access_token;
  }
  return async (dispatch, getState, { api }) => {
    dispatch(getAllStoresForCliqAndPiqRequest());
    try {
      const result = await api.get(
        `${ALL_STORES_FOR_CLIQ_AND_PIQ_PATH}/${pinCode}?access_token=${accessToken}&isMDE=true`
      );

      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      dispatch(getAllStoresForCliqAndPiqSuccess(resultJson.stores));
    } catch (e) {
      dispatch(getAllStoresForCliqAndPiqFailure(e.message));
    }
  };
}

export function showPdpPiqPage() {
  return {
    type: SHOW_PDP_PIQ_PAGE
  };
}
export function hidePdpPiqPage() {
  return {
    type: HIDE_PDP_PIQ_PAGE
  };
}

/******Bundled Product pincode issue */
export function getBundleProductPinCodeRequest() {
  return {
    type: CHECK_BUNDLE_PRODUCT_PIN_CODE_REQUEST,
    status: REQUESTING
  };
}
export function getBundleProductPinCodeSuccess(productPinCode) {
  return {
    type: CHECK_BUNDLE_PRODUCT_PIN_CODE_SUCCESS,
    status: SUCCESS,
    productPinCode,
    ussId: productPinCode.ussId
  };
}

export function getBundleProductPinCodeFailure(error) {
  return {
    type: CHECK_BUNDLE_PRODUCT_PIN_CODE_FAILURE,
    status: ERROR,
    error
  };
}

export function getBundleProductPinCode(pinCode = null, productCode, ussId) {
  let validProductCode = productCode.toUpperCase();

  if (pinCode) {
    localStorage.setItem(DEFAULT_PIN_CODE_LOCAL_STORAGE, pinCode);
  }
  return async (dispatch, getState, { api }) => {
    dispatch(getBundleProductPinCodeRequest());
    try {
      let url;
      let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
      let globalCookie = Cookie.getCookie(GLOBAL_ACCESS_TOKEN);
      let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
      if (userDetails) {
        let userName = JSON.parse(userDetails).userName;
        let accessToken = JSON.parse(customerCookie).access_token;
        url = `${PRODUCT_DETAILS_PATH}/${userName}/checkPincode?access_token=${accessToken}&productCode=${validProductCode}&pin=${pinCode}`;
      } else {
        let userName = ANONYMOUS_USER;
        let accessToken = JSON.parse(globalCookie).access_token;
        url = `${PRODUCT_DETAILS_PATH}/${userName}/checkPincode?access_token=${accessToken}&productCode=${validProductCode}&pin=${pinCode}`;
      }
      const result = await api.post(url);

      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      // Checking listing Id
      let bundleProductResponse =
        resultJson &&
        resultJson.listOfDataList &&
        resultJson.listOfDataList[0] &&
        resultJson.listOfDataList[0].value;
      let listOfAllBundleServiceableUssid;
      if (bundleProductResponse && bundleProductResponse.pincodeListResponse) {
        listOfAllBundleServiceableUssid = bundleProductResponse.pincodeListResponse.filter(
          delivery => {
            return delivery.isServicable === "Y";
          }
        );
      }
      let serviceableForExistingBundleProductSeller = listOfAllBundleServiceableUssid.find(
        seller => {
          return seller.ussid === ussId;
        }
      );
      if (serviceableForExistingBundleProductSeller.stockCount > 0) {
        return dispatch(
          getBundleProductPinCodeSuccess({
            pinCode,
            deliveryOptions:
              resultJson &&
              resultJson.listOfDataList &&
              resultJson.listOfDataList[0] &&
              resultJson.listOfDataList[0].value,
            ussId
          })
        );
      } else {
        return dispatch(getBundleProductPinCodeFailure("stockCount:0"));
      }
    } catch (e) {
      return dispatch(getBundleProductPinCodeFailure(e.message));
    }
  };
}

export function pdpManufacturerRequest() {
  return {
    type: PDP_MANUFACTURER_REQUEST,
    status: REQUESTING
  };
}
export function pdpManufacturerSuccess(manufacturers) {
  return {
    type: PDP_MANUFACTURER_SUCCESS,
    status: SUCCESS,
    manufacturers: manufacturers
  };
}

export function pdpManufacturerFailure(error) {
  return {
    type: PDP_MANUFACTURER_FAILURE,
    status: ERROR,
    error: error
  };
}

export function getManufacturerDetails() {
  return async (dispatch, getState, { api }) => {
    dispatch(pdpManufacturerRequest());
    try {
      let productDetails = getState().productDescription.productDetails;
      let categoryCode =
        productDetails.categoryHierarchy[
          productDetails.categoryHierarchy.length - 1
        ].category_id;
      // let brandCode = productDetails.brandURL.length > 6 ? (productDetails.brandURL
      //   .substr(
      //     productDetails.brandURL.length - 6,
      //     productDetails.brandURL.length
      //   )
      //   .toUpperCase()) : (productDetails.brandURL.toUpperCase());
      let brandCode = productDetails.brandURL.split("-");
      let brandCodeLength = brandCode.length;
      let brandCodeLast = brandCode[brandCodeLength - 1];
      // let brandCodeLastLength = brandCodeLast.length;
      // let brandCodeFinal = "";
      // if(brandCodeLast.length > 6){
      //     brandCodeFinal = brandCodeLast.substr(brandCodeLastLength - 6,brandCodeLastLength)
      // }
      const pdpManufacturerApi = await api.pdpManufacturersApi(
        categoryCode.toUpperCase(),
        brandCodeLast.toUpperCase()
      );

      const pdpManufacturerApiJson = await pdpManufacturerApi.json();
      // if (pdpManufacturerApiJson.status == "Success") {

      // } else {
      if (pdpManufacturerApiJson.errorCode) {
        dispatch(pdpManufacturerFailure("error"));
      } else {
        dispatch(pdpManufacturerSuccess(pdpManufacturerApiJson));
      }
    } catch (e) {
      dispatch(pdpManufacturerFailure(e.message));
    }
  };
}

export function openInAppRequest() {
  return {
    type: OPEN_IN_APP_REQUEST,
    status: REQUESTING
  };
}
export function openInAppSuccess(openInAppDetails) {
  return {
    type: OPEN_IN_APP_SUCCESS,
    status: SUCCESS,
    openInAppDetails
  };
}
export function openInAppFailure(error) {
  return {
    type: OPEN_IN_APP_FAILURE,
    status: ERROR,
    error
  };
}

export function firstGetRelevantBundleProductRequest() {
  return {
    type: RELEVANT_BUNDLE_PRODUCT_REQUEST,
    status: REQUESTING
  };
}
export function firstGetRelevantBundleProductSuccess(data) {
  return {
    type: RELEVANT_BUNDLE_PRODUCT_SUCCESS,
    status: SUCCESS,
    data
  };
}
export function firstGetRelevantBundleProductFailure() {
  return {
    type: RELEVANT_BUNDLE_PRODUCT_FAILURE,
    status: FAILURE
  };
}
export function secondGetRelevantBundleProductRequest() {
  return {
    type: SECONDARY_BUNDLE_PRODUCT_REQUEST,
    status: REQUESTING
  };
}
export function secondGetRelevantBundleProductSuccess(data) {
  return {
    type: SECONDARY_BUNDLE_PRODUCT_SUCCESS,
    status: SUCCESS,
    data
  };
}
export function secondGetRelevantBundleProductFailure() {
  return {
    type: SECONDARY_BUNDLE_PRODUCT_FAILURE,
    status: FAILURE
  };
}
export function getRelevantBundleProduct(productCode, isApiCall = 0, sequence) {
  return async (dispatch, getState, { api }) => {
    sequence === 0
      ? dispatch(firstGetRelevantBundleProductRequest())
      : secondGetRelevantBundleProductRequest();
    try {
      setTimeout(() => {
        if (getState().productDescription.relevantBundleProductLoading) {
          dispatch(displayToast(LOW_INTERNET_CONNECTION_MESSAGE));
        }
      }, TIME_OUT_FOR_APIS);
      const result = await api.getMiddlewareUrl(
        `${PRODUCT_DESCRIPTION_PATH}/${productCode}?isPwa=true`
      );
      const resultJson = await result.json();
      if (
        resultJson.status === SUCCESS ||
        resultJson.status === SUCCESS_UPPERCASE ||
        resultJson.status === SUCCESS_CAMEL_CASE
      ) {
        if (sequence === 0) {
          return dispatch(firstGetRelevantBundleProductSuccess(resultJson));
        } else {
          return dispatch(secondGetRelevantBundleProductSuccess(resultJson));
        }
      } else {
        if (resultJson.status === 404 && isApiCall === 0) {
          isApiCall = isApiCall + 1;
          dispatch(getRelevantBundleProduct(productCode, isApiCall));
        } else {
          throw new Error(`${resultJson.error}`);
        }
      }
    } catch (e) {
      if (sequence === 0) {
        return dispatch(firstGetRelevantBundleProductFailure(e.message));
      } else {
        return dispatch(secondGetRelevantBundleProductFailure(e.message));
      }
    }
  };
}
export function getRelevantProductPinCodeRequest() {
  return {
    type: CHECK_RELEVANT_PRODUCT_PIN_CODE_REQUEST,
    status: REQUESTING
  };
}
export function getRelevantProductPinCodeSuccess(productPinCode) {
  return {
    type: CHECK_RELEVANT_PRODUCT_PIN_CODE_SUCCESS,
    status: SUCCESS,
    productPinCode,
    ussId: productPinCode.ussId
  };
}

export function getRelevantProductPinCodeFailure(error) {
  return {
    type: CHECK_RELEVANT_PRODUCT_PIN_CODE_FAILURE,
    status: ERROR,
    error
  };
}

export function openInApp() {
  return async (dispatch, getState, { api }) => {
    dispatch(openInAppRequest());
    try {
      const result = await api.customGetMiddlewareUrl(
        `/otatacliq/getApplicationProperties.json?propertyNames=isDesktopActive`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      return dispatch(openInAppSuccess(resultJson));
    } catch (e) {
      dispatch(openInAppFailure(e.message));
    }
  };
}

export function relevantProductServibilty(pinCode = null, productCode, ussId) {
  let validProductCode = productCode.toUpperCase();
  if (pinCode) {
    localStorage.setItem(DEFAULT_PIN_CODE_LOCAL_STORAGE, pinCode);
  }
  return async (dispatch, getState, { api }) => {
    dispatch(getRelevantProductPinCodeRequest());
    try {
      let url;
      let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
      let globalCookie = Cookie.getCookie(GLOBAL_ACCESS_TOKEN);
      let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
      if (userDetails) {
        let userName = JSON.parse(userDetails).userName;
        let accessToken = JSON.parse(customerCookie).access_token;
        url = `${PRODUCT_DETAILS_PATH}/${userName}/checkPincode?access_token=${accessToken}&productCode=${validProductCode}&pin=${pinCode}`;
      } else {
        let userName = ANONYMOUS_USER;
        let accessToken = JSON.parse(globalCookie).access_token;
        url = `${PRODUCT_DETAILS_PATH}/${userName}/checkPincode?access_token=${accessToken}&productCode=${validProductCode}&pin=${pinCode}`;
      }
      const result = await api.post(url);

      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }

      // Checking listing Id
      let bundleProductResponse = resultJson.listOfDataList[0].value;
      let listOfAllBundleServiceableUssid;
      if (bundleProductResponse && bundleProductResponse.pincodeListResponse) {
        listOfAllBundleServiceableUssid = bundleProductResponse.pincodeListResponse.filter(
          delivery => {
            return delivery.isServicable === "Y";
          }
        );
      }

      let serviceableForExistingBundleProductSeller = listOfAllBundleServiceableUssid.find(
        seller => {
          return seller.ussid === ussId;
        }
      );

      if (serviceableForExistingBundleProductSeller.stockCount > 0) {
        return dispatch(
          getRelevantProductPinCodeSuccess({
            pinCode,
            deliveryOptions:
              resultJson &&
              resultJson.listOfDataList &&
              resultJson.listOfDataList[0] &&
              resultJson.listOfDataList[0].value,
            ussId
          })
        );
      } else {
        return dispatch(getRelevantProductPinCodeFailure("stockCount:0"));
      }
    } catch (e) {
      return dispatch(getRelevantProductPinCodeFailure(e.message));
    }
  };
}
export function relevantBundleProductCodeRequest() {
  return {
    type: RELEVANT_BUNDLE_PRODUCT_CODE_REQUEST,
    status: REQUESTING
  };
}

export function relevantBundleProductCodeSuccess(
  relevantBundleProductCodeData
) {
  return {
    type: RELEVANT_BUNDLE_PRODUCT_CODE_SUCCESS,
    status: SUCCESS,
    relevantBundleProductCodeData
  };
}

export function relevantBundleProductCodeFailure(error) {
  return {
    type: RELEVANT_BUNDLE_PRODUCT_CODE_FAILURE,
    status: ERROR,
    error
  };
}

export function relevantBundleProductCode() {
  return async (dispatch, getState, { api }) => {
    dispatch(relevantBundleProductCodeRequest());
    try {
      const result = await api.customGetMiddlewareUrl(
        `/otatacliq/getApplicationProperties.json?propertyNames=PWA_PDP_BUNDLED_PRODUCT`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      return dispatch(relevantBundleProductCodeSuccess(resultJson));
    } catch (e) {
      dispatch(relevantBundleProductCodeFailure(e.message));
    }
  };
}

export function getExchangeDetailsRequest() {
  return {
    type: EXCHANGE_DETAILS_REQUEST,
    status: REQUESTING
  };
}
export function getExchangeDetailsSuccess(data) {
  return {
    type: EXCHANGE_DETAILS_SUCCESS,
    status: SUCCESS,
    data
  };
}

export function getExchangeDetailsFailure(error) {
  return {
    type: EXCHANGE_DETAILS_FAILURE,
    status: ERROR,
    error
  };
}

export function getExchangeDetails(
  listingId,
  ussid,
  maxExchangeAmount,
  pickupCharge
) {
  return async (dispatch, getState, { api }) => {
    dispatch(getExchangeDetailsRequest());
    try {
      const result = await api.getMiddlewareUrl(
        `v2/mpl/products/exchangeDetails?listingId=${listingId}&ussid=${ussid}&maxExchangeAmount=${maxExchangeAmount}&pickUpCharge=${pickupCharge}`
      );
      const resultJson = await result.json();
      if (resultJson.status && resultJson.status.toLowerCase() === "success") {
        return dispatch(getExchangeDetailsSuccess(resultJson));
      } else {
        throw new Error(`${resultJson.error}`);
      }
    } catch (e) {
      return dispatch(getExchangeDetailsFailure(e.message));
    }
  };
}

export function updateProductState(data) {
  return {
    type: UPDATE_DETAILS_SUCCESS,
    status: SUCCESS,
    data
  };
}

export function verifyIMEINumberRequest() {
  return {
    type: CHECK_IMEI_NUMBER_REQUEST,
    status: REQUESTING
  };
}
export function verifyIMEINumberSuccess(data) {
  return {
    type: CHECK_IMEI_NUMBER_SUCCESS,
    status: SUCCESS,
    data
  };
}

export function verifyIMEINumberFailure(error) {
  return {
    type: CHECK_IMEI_NUMBER_FAILURE,
    status: ERROR,
    error
  };
}
export function verifyIMEINumber(
  IMEINumber,
  exchangeProductId,
  exchangeAmountCashify,
  tulBump: null,
  pickUpCharge,
  listingId,
  ussId,
  guid: null,
  entry: null,
  wishlistName: null
) {
  return async (dispatch, getState, { api }) => {
    dispatch(verifyIMEINumberRequest());
    try {
      let bodyParams = {
        IMEINumber: IMEINumber,
        exchangeProductId: exchangeProductId,
        exchangeAmountCashify: exchangeAmountCashify,
        pickUpCharge: pickUpCharge,
        listingId: listingId,
        ussid: ussId
      };
      if (tulBump) {
        bodyParams.tulBump = tulBump;
      }
      if (guid && entry) {
        bodyParams.guid = guid;
        bodyParams.entry = entry;
      }
      if (wishlistName) {
        bodyParams.wishlistName = wishlistName;
      }
      const result = await api.post(`v2/mpl/verifyIMEINumber`, bodyParams);
      const resultJson = await result.json();
      return resultJson;
    } catch (e) {
      return dispatch(verifyIMEINumberFailure(e.message));
    }
  };
}

export function getBundledProductSuggestionRequest() {
  return {
    type: GET_BUNDLED_PRODUCT_SUGGESTION_REQUEST,
    status: REQUESTING
  };
}
export function getBundledProductSuggestionSuccess(data) {
  return {
    type: GET_BUNDLED_PRODUCT_SUGGESTION_SUCCESS,
    status: SUCCESS,
    data
  };
}

export function getBundledProductSuggestionFailure(error) {
  return {
    type: GET_BUNDLED_PRODUCT_SUGGESTION_FAILURE,
    status: ERROR,
    error
  };
}
export function getBundledProductSuggestion(
  productId,
  ussId,
  categoryCode,
  brandCode,
  source,
  pincode
) {
  return async (dispatch, getState, { api }) => {
    dispatch(getBundledProductSuggestionRequest());
    try {
      let globalCookie = Cookie.getCookie(GLOBAL_ACCESS_TOKEN);
      let accessToken = globalCookie && JSON.parse(globalCookie).access_token;
      const result = await api.get(
        `v2/mpl/products/${productId}/suggestion?access_token=${accessToken}&ussId=${ussId}&categoryCode=${categoryCode}&brandCode=${brandCode}&channel=${CHANNEL}&updatedFlag=true&source=${source}&pincode=${pincode}`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      dispatch(getBundledProductSuggestionSuccess(resultJson));
    } catch (e) {
      dispatch(getBundledProductSuggestionFailure(e.message));
    }
  };
}

export function getTotalBundledPriceRequest() {
  return {
    type: GET_TOTAL_BUNDLED_PRICE_REQUEST,
    status: REQUESTING
  };
}
export function getTotalBundledPriceSuccess(data) {
  return {
    type: GET_TOTAL_BUNDLED_PRICE_SUCCESS,
    status: SUCCESS,
    data
  };
}

export function getTotalBundledPriceFailure(error) {
  return {
    type: GET_TOTAL_BUNDLED_PRICE_FAILURE,
    status: ERROR,
    error
  };
}

export function getTotalBundledPrice(data) {
  return async (dispatch, getState, { api }) => {
    dispatch(getTotalBundledPriceRequest());
    try {
      const result = await api.post(`v2/mpl/products/bundledPrices`, data);
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status && result.status !== 200) {
        dispatch(getTotalBundledPriceFailure(resultJsonStatus.message));
      }
      dispatch(getTotalBundledPriceSuccess(resultJson));
    } catch (e) {
      dispatch(getTotalBundledPriceFailure(e.message));
    }
  };
}
