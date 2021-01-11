import {
  SUCCESS,
  SUCCESS_UPPERCASE,
  SUCCESS_CAMEL_CASE,
  REQUESTING,
  ERROR,
  FAILURE,
  CUSTOMER_ACCESS_TOKEN,
  LOGGED_IN_USER_DETAILS,
  SUCCESS_FOR_ADDING_TO_WSHLIST,
  PLAT_FORM_NUMBER,
  CHANNEL,
  CART_DETAILS_FOR_LOGGED_IN_USER,
  OLD_CART_GU_ID
} from "../../lib/constants";
import * as Cookie from "../../lib/Cookie";
import * as ErrorHandling from "../../general/ErrorHandling.js";
import {
  showSecondaryLoader,
  hideSecondaryLoader
} from "../../general/secondaryLoader.actions.js";
import {
  setDataLayerForPdpDirectCalls,
  ADOBE_DIRECT_CALL_FOR_SAVE_ITEM_ON_CART,
  setDataLayerForCartDirectCalls,
  SET_DATA_LAYER_FOR_SAVE_PRODUCT_EVENT_ON_PDP,
  setDataLayer,
  ADOBE_MY_ACCOUNT_SAVED_LIST
} from "../../lib/adobeUtils";
import { displayToast } from "../../general/toast.actions.js";

export const GET_WISH_LIST_ITEMS_REQUEST = "GET_WISH_LIST_ITEMS_REQUEST";
export const GET_WISH_LIST_ITEMS_SUCCESS = "GET_WISH_LIST_ITEMS_SUCCESS";
export const GET_WISH_LIST_ITEMS_FAILURE = "GET_WISH_LIST_ITEMS_FAILURE";

export const CREATE_WISHLIST_REQUEST = "CREATE_WISHLIST_REQUEST";
export const CREATE_WISHLIST_SUCCESS = "CREATE_WISHLIST_SUCCESS";
export const CREATE_WISHLIST_FAILURE = "CREATE_WISHLIST_FAILURE";

export const ADD_PRODUCT_TO_WISH_LIST_REQUEST =
  "ADD_PRODUCT_TO_WISH_LIST_REQUEST";
export const ADD_PRODUCT_TO_WISH_LIST_SUCCESS =
  "ADD_PRODUCT_TO_WISH_LIST_SUCCESS";
export const ADD_PRODUCT_TO_WISH_LIST_FAILURE =
  "ADD_PRODUCT_TO_WISH_LIST_FAILURE";

export const ADD_ALL_PRODUCT_TO_WISH_LIST_REQUEST =
  "ADD_ALL_PRODUCT_TO_WISH_LIST_REQUEST";
export const ADD_ALL_PRODUCT_TO_WISH_LIST_SUCCESS =
  "ADD_ALL_PRODUCT_TO_WISH_LIST_SUCCESS";
export const ADD_ALL_PRODUCT_TO_WISH_LIST_FAILURE =
  "ADD_ALL_PRODUCT_TO_WISH_LIST_FAILURE";

export const REMOVE_PRODUCT_FROM_WISH_LIST_REQUEST =
  "REMOVE_PRODUCT_FROM_WISH_LIST_REQUEST";
export const REMOVE_PRODUCT_FROM_WISH_LIST_SUCCESS =
  "REMOVE_PRODUCT_FROM_WISH_LIST_SUCCESS";
export const REMOVE_PRODUCT_FROM_WISH_LIST_FAILURE =
  "REMOVE_PRODUCT_FROM_WISH_LIST_FAILURE";

export const GET_WISHLIST_REQUEST = "GET_WISHLIST_REQUEST";
export const GET_WISHLIST_SUCCESS = "GET_WISHLIST_SUCCESS";
export const GET_WISHLIST_FAILURE = "GET_WISHLIST_FAILURE";

export const PRODUCT_DETAILS_PATH = "v2/mpl/users";
const MY_WISH_LIST = "MyWishList";

const WISHLIST_USER_NOTFOUND_CODE = "W0001";
const WISHLIST_NOTFOUND_CODE = "W0002";
const WISHLIST_CATALOG_NOTFOUND_CODE = "W0003";
const WISHLIST_UNEXPECTED_BACKEND_ERROR_CODE = "W0004";

export function getWishListItemsRequest() {
  return {
    type: GET_WISH_LIST_ITEMS_REQUEST,
    status: REQUESTING
  };
}
export function getWishListItemsSuccess(wishlist) {
  return {
    type: GET_WISH_LIST_ITEMS_SUCCESS,
    status: SUCCESS,
    wishlist
  };
}

export function getWishListItemsFailure(error) {
  return {
    type: GET_WISH_LIST_ITEMS_FAILURE,
    status: ERROR,
    error
  };
}

export function getWishListItems(isSetDataLayer) {
  const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
  const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
  return async (dispatch, getState, { api }) => {
    dispatch(getWishListItemsRequest());
    try {
      const result = await api.postFormData(
        `${PRODUCT_DETAILS_PATH}/${
          JSON.parse(userDetails).userName
        }/getAllWishlist?platformNumber=${PLAT_FORM_NUMBER}&access_token=${
          JSON.parse(customerCookie).access_token
        }&isPwa=true&isMDE=true`
      );

      const resultJson = await result.json();

      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      let currentWishlist = [];
      if (resultJson.wishList) {
        currentWishlist = resultJson.wishList.filter(wishlist => {
          return wishlist.name === MY_WISH_LIST;
        });
      }
      if (isSetDataLayer) {
        setDataLayer(ADOBE_MY_ACCOUNT_SAVED_LIST, currentWishlist[0]);
      }
      return dispatch(getWishListItemsSuccess(currentWishlist[0]));
    } catch (e) {
      return dispatch(getWishListItemsFailure(e.message));
    }
  };
}

export function addProductToWishListRequest() {
  return {
    type: ADD_PRODUCT_TO_WISH_LIST_REQUEST,
    status: REQUESTING
  };
}
export function addProductToWishListSuccess(product) {
  return {
    type: ADD_PRODUCT_TO_WISH_LIST_SUCCESS,
    status: SUCCESS,
    product
  };
}

export function addProductToWishListFailure(error) {
  return {
    type: ADD_PRODUCT_TO_WISH_LIST_FAILURE,
    status: ERROR,
    error
  };
}

export function addProductToWishList(productDetails, setDataLayerType: null) {
  const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
  const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
  return async (dispatch, getState, { api }) => {
    dispatch(addProductToWishListRequest());
    const productToBeAdd = new FormData();
    productToBeAdd.append("ussid", productDetails.winningUssID);
    productToBeAdd.append("productCode", productDetails.productListingId);
    productToBeAdd.append("wishlistName", MY_WISH_LIST);
    // send exchange related details
    if (productDetails.addToWlWithExchangeTrue) {
      productToBeAdd.append("addToWlWithExchange", true);
      productToBeAdd.append("quoteId", productDetails.quoteId);
      productToBeAdd.append("IMEINumber", productDetails.IMEINumber);
      productToBeAdd.append("exchangeId", productDetails.exchangeId);
    }
    try {
      const result = await api.postFormData(
        `${PRODUCT_DETAILS_PATH}/${
          JSON.parse(userDetails).userName
        }/addProductInWishlist?platformNumber=${PLAT_FORM_NUMBER}&access_token=${
          JSON.parse(customerCookie).access_token
        }&isPwa=true&isMDE=true`,
        productToBeAdd
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }

      if (setDataLayerType === SET_DATA_LAYER_FOR_SAVE_PRODUCT_EVENT_ON_PDP) {
        setDataLayerForPdpDirectCalls(
          SET_DATA_LAYER_FOR_SAVE_PRODUCT_EVENT_ON_PDP
        );
      } else if (setDataLayerType === ADOBE_DIRECT_CALL_FOR_SAVE_ITEM_ON_CART) {
        setDataLayerForCartDirectCalls(ADOBE_DIRECT_CALL_FOR_SAVE_ITEM_ON_CART);
      }
      return dispatch(addProductToWishListSuccess(productDetails));
    } catch (e) {
      return dispatch(addProductToWishListFailure(e.message));
    }
  };
}
export function addAllToWishListRequest() {
  return {
    type: ADD_ALL_PRODUCT_TO_WISH_LIST_REQUEST,
    status: REQUESTING
  };
}
export function addAllToWishListSuccess(response) {
  return {
    type: ADD_ALL_PRODUCT_TO_WISH_LIST_SUCCESS,
    status: SUCCESS,
    response
  };
}

export function addAllToWishListFailure(error) {
  return {
    type: ADD_ALL_PRODUCT_TO_WISH_LIST_FAILURE,
    status: ERROR,
    error
  };
}

export function addAllToWishList(ussid) {
  const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
  const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
  return async (dispatch, getState, { api }) => {
    dispatch(addAllToWishListRequest());

    let cartDetails = Cookie.getCookie(CART_DETAILS_FOR_LOGGED_IN_USER);
    let cartGuid =
      cartDetails && JSON.parse(cartDetails).guid
        ? JSON.parse(cartDetails).guid
        : Cookie.getCookie(OLD_CART_GU_ID);

    const ussidList = ussid;
    try {
      const result = await api.post(
        `${PRODUCT_DETAILS_PATH}/${
          JSON.parse(userDetails).userName
        }/addAllToWishList?guid=${cartGuid}&ussids=${ussidList}&platformNumber=${PLAT_FORM_NUMBER}&access_token=${
          JSON.parse(customerCookie).access_token
        }`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      return dispatch(addAllToWishListSuccess(resultJson));
    } catch (e) {
      return dispatch(addAllToWishListFailure(e.message));
    }
  };
}

export function removeProductFromWishListRequest() {
  return {
    type: REMOVE_PRODUCT_FROM_WISH_LIST_REQUEST,
    status: REQUESTING
  };
}
export function removeProductFromWishListSuccess(product) {
  return {
    type: REMOVE_PRODUCT_FROM_WISH_LIST_SUCCESS,
    status: SUCCESS,
    product
  };
}

export function removeProductFromWishListFailure(error) {
  return {
    type: REMOVE_PRODUCT_FROM_WISH_LIST_FAILURE,
    status: ERROR,
    error
  };
}

export function removeProductFromWishList(productDetails, onPLP = null) {
  return async (dispatch, getState, { api }) => {
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    const productToBeRemove = new FormData();
    productToBeRemove.append("USSID", productDetails.ussId);
    productToBeRemove.append("wishlistName", MY_WISH_LIST);
    // if exchange details present
    if (productDetails.removeFromWlWithExchange) {
      productToBeRemove.append(
        "removeFromWlWithExchange",
        productDetails.removeFromWlWithExchange
      );
      productToBeRemove.append("quoteId", productDetails.quoteId);
      productToBeRemove.append("IMEINumber", productDetails.IMEINumber);
      productToBeRemove.append("exchangeId", productDetails.exchangeId);
    }
    dispatch(removeProductFromWishListRequest());
    dispatch(showSecondaryLoader());
    try {
      const result = await api.postFormData(
        `${PRODUCT_DETAILS_PATH}/${
          JSON.parse(userDetails).userName
        }/removeProductFromWishlist?access_token=${
          JSON.parse(customerCookie).access_token
        }&isMDE=true`,
        productToBeRemove
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      dispatch(hideSecondaryLoader());
      if (!onPLP) {
        dispatch(getWishListItems());
      }
      return dispatch(removeProductFromWishListSuccess(productDetails));
    } catch (e) {
      dispatch(hideSecondaryLoader());

      return dispatch(removeProductFromWishListFailure(e.message));
    }
  };
}
export function createWishlistRequest() {
  return {
    type: CREATE_WISHLIST_REQUEST,
    status: REQUESTING
  };
}
export function createWishlistSuccess() {
  return {
    type: CREATE_WISHLIST_SUCCESS,
    status: SUCCESS
  };
}

export function createWishlistFailure(error) {
  return {
    type: CREATE_WISHLIST_FAILURE,
    status: ERROR,
    error
  };
}

export function createWishlist(productDetails) {
  const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
  const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
  return async (dispatch, getState, { api }) => {
    dispatch(createWishlistRequest());
    const createWishlistObj = new FormData();
    createWishlistObj.append("wishlistName", MY_WISH_LIST);
    try {
      const result = await api.postFormData(
        `${PRODUCT_DETAILS_PATH}/${
          JSON.parse(userDetails).userName
        }/CreateWishlist?channel=${CHANNEL}&access_token=${
          JSON.parse(customerCookie).access_token
        }&isPwa=true`,
        createWishlistObj
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }

      return dispatch(createWishlistSuccess());
    } catch (e) {
      return dispatch(createWishlistFailure(e.message));
    }
  };
}

// wishlist
export function getWishlistRequest() {
  return {
    type: GET_WISHLIST_REQUEST,
    status: REQUESTING
  };
}
export function getWishlistSuccess(wishlist) {
  return {
    type: GET_WISHLIST_SUCCESS,
    status: SUCCESS,
    wishlist
  };
}

export function getWishlistFailure(error) {
  return {
    type: GET_WISHLIST_FAILURE,
    status: ERROR,
    error
  };
}

export function getWishlist(isSetDataLayer) {
  const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
  const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
  return async (dispatch, getState, { api }) => {
    dispatch(getWishlistRequest());
    try {
      const result = await api.postFormData(
        `${PRODUCT_DETAILS_PATH}/${
          JSON.parse(userDetails).userName
        }/wishlist?platformNumber=${PLAT_FORM_NUMBER}&access_token=${
          JSON.parse(customerCookie).access_token
        }&isPwa=true&wishlistName=${MY_WISH_LIST}`
      );

      const resultJson = await result.json();

      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

      if (resultJsonStatus.status) {
        if (
          resultJson.errorCode === WISHLIST_USER_NOTFOUND_CODE ||
          resultJson.errorCode === WISHLIST_NOTFOUND_CODE ||
          resultJson.errorCode === WISHLIST_CATALOG_NOTFOUND_CODE ||
          resultJson.errorCode === WISHLIST_UNEXPECTED_BACKEND_ERROR_CODE
        ) {
          dispatch(displayToast(resultJson.error));
          throw new Error(resultJson.error);
        } else {
          throw new Error(resultJsonStatus.message);
        }
      }
      return dispatch(getWishlistSuccess(resultJson));
    } catch (e) {
      return dispatch(getWishlistFailure(e.message));
    }
  };
}
