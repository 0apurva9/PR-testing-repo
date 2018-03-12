import {
  SUCCESS,
  REQUESTING,
  ERROR,
  GLOBAL_ACCESS_TOKEN
} from "../../lib/constants";
import { FAILURE } from "../../lib/constants";
import * as Cookie from "../../lib/Cookie";
import each from "lodash/each";
import {
  CUSTOMER_ACCESS_TOKEN,
  LOGGED_IN_USER_DETAILS
} from "../../lib/constants";

export const PRODUCT_DESCRIPTION_REQUEST = "PRODUCT_DESCRIPTION_REQUEST";
export const PRODUCT_DESCRIPTION_SUCCESS = "PRODUCT_DESCRIPTION_SUCCESS";
export const PRODUCT_DESCRIPTION_FAILURE = "PRODUCT_DESCRIPTION_FAILURE";

export const CHECK_PRODUCT_PIN_CODE_REQUEST = "CHECK_PRODUCT_PIN_CODE_REQUEST";
export const CHECK_PRODUCT_PIN_CODE_SUCCESS = "CHECK_PRODUCT_PIN_CODE_SUCCESS";
export const CHECK_PRODUCT_PIN_CODE_FAILURE = "CHECK_PRODUCT_PIN_CODE_FAILURE";

export const ADD_PRODUCT_TO_WISH_LIST_REQUEST =
  "ADD_PRODUCT_TO_WISH_LIST_REQUEST";
export const ADD_PRODUCT_TO_WISH_LIST_SUCCESS =
  "ADD_PRODUCT_TO_WISH_LIST_SUCCESS";
export const ADD_PRODUCT_TO_WISH_LIST_FAILURE =
  "ADD_PRODUCT_TO_WISH_LIST_FAILURE";

export const REMOVE_PRODUCT_FROM_WISH_LIST_REQUEST =
  "REMOVE_PRODUCT_FROM_WISH_LIST_REQUEST";
export const REMOVE_PRODUCT_FROM_WISH_LIST_SUCCESS =
  "REMOVE_PRODUCT_FROM_WISH_LIST_SUCCESS";
export const REMOVE_PRODUCT_FROM_WISH_LIST_FAILURE =
  "REMOVE_PRODUCT_FROM_WISH_LIST_FAILURE";

export const ADD_PRODUCT_TO_CART_REQUEST = "ADD_PRODUCT_TO_CART_REQUEST";
export const ADD_PRODUCT_TO_CART_SUCCESS = "ADD_PRODUCT_TO_CART_SUCCESS";
export const ADD_PRODUCT_TO_CART_FAILURE = "ADD_PRODUCT_TO_CART_FAILURE";

export const PRODUCT_SIZE_GUIDE_REQUEST = "PRODUCT_SIZE_GUIDE_REQUEST";
export const PRODUCT_SIZE_GUIDE_SUCCESS = "PRODUCT_SIZE_GUIDE_SUCCESS";
export const PRODUCT_SIZE_GUIDE_FAILURE = "PRODUCT_SIZE_GUIDE_FAILURE";

export const PRODUCT_PDP_EMI_REQUEST = "PRODUCT_PDP_EMI_REQUEST";
export const PRODUCT_PDP_EMI_SUCCESS = "PRODUCT_PDP_EMI_SUCCESS";
export const PRODUCT_PDP_EMI_FAILURE = "PRODUCT_PDP_EMI_FAILURE";

export const GET_EMI_TERMS_AND_CONDITIONS_SUCCESS =
  "GET_EMI_TERMS_AND_CONDITIONS_SUCCESS";
export const GET_EMI_TERMS_AND_CONDITIONS_FAILURE =
  "GET_EMI_TERMS_AND_CONDITIONS_FAILURE";
export const GET_EMI_TERMS_AND_CONDITIONS_REQUEST =
  "GET_EMI_TERMS_AND_CONDITIONS_REQUEST";

export const PRODUCT_WISH_LIST_REQUEST = "PRODUCT_WISH_LIST_REQUEST";
export const PRODUCT_WISH_LIST_SUCCESS = "PRODUCT_WISH_LIST_SUCCESS";
export const PRODUCT_WISH_LIST_FAILURE = "PRODUCT_WISH_LIST_FAILURE";
export const PRODUCT_WISH_LIST_PATH = "wishList";

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

export const DELETE_PRODUCT_REVIEW_REQUEST = "DELETE_PRODUCT_REVIEW_REQUEST";
export const DELETE_PRODUCT_REVIEW_SUCCESS = "DELETE_PRODUCT_REVIEW_SUCCESS";
export const DELETE_PRODUCT_REVIEW_FAILURE = "DELETE_PRODUCT_REVIEW_FAILURE";

export const PRODUCT_MSD_REQUEST = "PRODUCT_MSD_REQUEST";
export const PRODUCT_MSD_SUCCESS = "PRODUCT_MSD_SUCCESS";
export const PRODUCT_MSD_FAILURE = "PRODUCT_MSD_FAILURE";

export const GET_PDP_ITEMS_REQUEST = "GET_PDP_ITEMS_REQUEST";
export const GET_PDP_ITEMS_SUCCESS = "GET_PDP_ITEMS_SUCCESS";
export const GET_PDP_ITEMS_FAILURE = "GET_PDP_ITEMS_FAILURE";

export const PRODUCT_DETAILS_PATH = "v2/mpl/users";
export const PIN_CODE_AVAILABILITY_PATH = "pincodeserviceability";
export const PRODUCT_SIZE_GUIDE_PATH = "sizeGuide";
export const PRODUCT_PDP_EMI_PATH =
  "v2/mpl/getBankDetailsforEMI?platformNumber=2";
export const EMI_TERMS_PATH = "/v2/mpl/cms/products/getEmiTermsAndConditions";

export const ABOUT_THE_BRAND_WIDGET_KEY = "aboutTheBrand";
export const RECOMMENDED_PRODUCTS_WIDGET_KEY = "recommendedProducts";
export const SIMILAR_PRODUCTS_WIDGET_KEY = "similarProducts";

const CHANNEL = "channel";
const MY_WISH_LIST = "MyWishList";
const CLIENT_ID = "gauravj@dewsolutions.in";
const ADD_PRODUCT_TO_WISH_LIST = "addToWishListInPDP";
const ADD_PRODUCT_TO_CART = "addProductToCart";
const REMOVE_FROM_WISH_LIST = "removeFromWl";
const PRODUCT_SPECIFICATION_PATH = "/v2/mpl/products";
const PRODUCT_DESCRIPTION_PATH = "v2/mpl/products";
const ORDER_BY = "desc";
const SORT = "byDate";
const PAGE_VALUE = "0";
const PAGE_NUMBER = "1";
const MSD_REQUEST_PATH = "widgets";
const API_KEY = "8783ef14595919d35b91cbc65b51b5b1da72a5c3";
const WIDGET_LIST = [0, 8];
const NUMBER_RESULTS = [20];
const MAD_UUID = "F4B82964-5E08-4531-87AF-7E03E3CD0307";

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
export function getProductDescription(productCode) {
  return async (dispatch, getState, { api }) => {
    dispatch(getProductDescriptionRequest());
    try {
      const result = await api.get(
        `${PRODUCT_DESCRIPTION_PATH}/${productCode}?&isPwa=true`
      );
      const resultJson = await result.json();
      if (resultJson.status === FAILURE) {
        throw new Error(`${resultJson.message}`);
      }

      dispatch(getProductDescriptionSuccess(resultJson));
    } catch (e) {
      dispatch(getProductDescriptionFailure(e.message));
    }
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

export function getProductPinCode(productDetails) {
  return async (dispatch, getState, { api }) => {
    dispatch(getProductPinCodeRequest());
    try {
      const result = await api.getMock(PIN_CODE_AVAILABILITY_PATH);
      const resultJson = await result.json();
      if (resultJson.status === FAILURE) {
        throw new Error(`${resultJson.message}`);
      }
      dispatch(getProductPinCodeSuccess(resultJson));
    } catch (e) {
      dispatch(getProductPinCodeFailure(e.message));
    }
  };
}

export function addProductToWishListRequest() {
  return {
    type: ADD_PRODUCT_TO_WISH_LIST_REQUEST,
    status: REQUESTING
  };
}
export function addProductToWishListSuccess() {
  return {
    type: ADD_PRODUCT_TO_WISH_LIST_SUCCESS,
    status: SUCCESS
  };
}

export function addProductToWishListFailure(error) {
  return {
    type: ADD_PRODUCT_TO_WISH_LIST_FAILURE,
    status: ERROR,
    error
  };
}

export function addProductToWishList(userId, accessToken, productDetails) {
  return async (dispatch, getState, { api }) => {
    dispatch(addProductToWishListRequest());
    try {
      const result = await api.post(
        `${PRODUCT_DETAILS_PATH}/${userId}/addProductInWishlist?platformNumber=2&access_token=${accessToken}&isPwa=true&ussid=${
          productDetails.ussId
        }&productCode=${productDetails.code}&wishlistName=${MY_WISH_LIST}`
      );
      const resultJson = await result.json();
      if (resultJson.status === FAILURE) {
        throw new Error(`${resultJson.message}`);
      }

      dispatch(addProductToWishListSuccess());
    } catch (e) {
      dispatch(addProductToWishListFailure(e.message));
    }
  };
}

export function removeProductFromWishListRequest() {
  return {
    type: REMOVE_PRODUCT_FROM_WISH_LIST_REQUEST,
    status: REQUESTING
  };
}
export function removeProductFromWishListSuccess() {
  return {
    type: REMOVE_PRODUCT_FROM_WISH_LIST_SUCCESS,
    status: SUCCESS
  };
}

export function removeProductFromWishListFailure(error) {
  return {
    type: REMOVE_PRODUCT_FROM_WISH_LIST_FAILURE,
    status: ERROR,
    error
  };
}

export function removeProductFromWishList(productDetails) {
  return async (dispatch, getState, { api }) => {
    dispatch(removeProductFromWishListRequest());
    try {
      const result = await api.postMock(REMOVE_FROM_WISH_LIST);
      const resultJson = await result.json();
      if (resultJson.status === FAILURE) {
        throw new Error(`${resultJson.message}`);
      }
      dispatch(removeProductFromWishListSuccess());
    } catch (e) {
      dispatch(removeProductFromWishListFailure(e.message));
    }
  };
}

export function addProductToCartRequest() {
  return {
    type: ADD_PRODUCT_TO_CART_REQUEST,
    status: REQUESTING
  };
}
export function addProductToCartSuccess() {
  return {
    type: ADD_PRODUCT_TO_CART_SUCCESS,
    status: SUCCESS
  };
}

export function addProductToCartFailure(error) {
  return {
    type: ADD_PRODUCT_TO_CART_FAILURE,
    status: ERROR,
    error
  };
}

export function addProductToCart(userId, cartId, accessToken, productDetails) {
  return async (dispatch, getState, { api }) => {
    dispatch(addProductToCartRequest());
    try {
      const result = await api.post(
        `${PRODUCT_DETAILS_PATH}/${userId}/carts/${cartId}/addProductToCart?access_token=${accessToken}&isPwa=true&platformNumber=2&productCode=${
          productDetails.code
        }&USSID=${productDetails.ussId}&quantity=${
          productDetails.quantity
        }&addedToCartWl=false`
      );
      const resultJson = await result.json();
      if (resultJson.status === FAILURE) {
        throw new Error(`${resultJson.message}`);
      }

      dispatch(addProductToCartSuccess());
    } catch (e) {
      dispatch(addProductToCartFailure(e.message));
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

export function getProductSizeGuide(productCode) {
  return async (dispatch, getState, { api }) => {
    dispatch(getProductSizeGuideRequest());
    try {
      const result = await api.get(
        `${PRODUCT_DESCRIPTION_PATH}/${productCode}/sizeGuide?isPwa=true`
      );
      const resultJson = await result.json();
      if (resultJson.status === FAILURE) {
        throw new Error(`${resultJson.message}`);
      }
      dispatch(getProductSizeGuideSuccess(resultJson));
    } catch (e) {
      dispatch(getProductSizeGuideFailure(e.message));
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
      if (resultJson.status === FAILURE) {
        throw new Error(`${resultJson.message}`);
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
export function getPdpEmi(token, cartValue) {
  return async (dispatch, getState, { api }) => {
    dispatch(getPdpEmiRequest());
    try {
      const url = `${PRODUCT_PDP_EMI_PATH}&productValue=${cartValue}&access_token=${token}`;
      const result = await api.get(url);
      const resultJson = await result.json();
      if (resultJson.status === FAILURE) {
        throw new Error(`${resultJson.message}`);
      }
      dispatch(getPdpEmiSuccess(resultJson));
    } catch (e) {
      dispatch(getPdpEmiFailure(e.message));
    }
  };
}

export function getProductWishListRequest() {
  return {
    type: PRODUCT_WISH_LIST_REQUEST,
    status: REQUESTING
  };
}
export function getProductWishListSuccess(wishList) {
  return {
    type: PRODUCT_WISH_LIST_SUCCESS,
    status: SUCCESS,
    wishList
  };
}

export function getProductWishListFailure(error) {
  return {
    type: PRODUCT_WISH_LIST_FAILURE,
    status: ERROR,
    error
  };
}
export function getProductWishList() {
  return async (dispatch, getState, { api }) => {
    dispatch(getProductWishListRequest());
    try {
      const result = await api.postMock(PRODUCT_WISH_LIST_PATH);
      const resultJson = await result.json();
      if (resultJson.status === FAILURE) {
        throw new Error(`${resultJson.message}`);
      }
      dispatch(getProductWishListSuccess(resultJson));
    } catch (e) {
      dispatch(getProductWishListFailure(e.message));
    }
  };
}

export function ProductSpecificationRequest() {
  return {
    type: PRODUCT_SPECIFICATION_REQUEST,
    status: REQUESTING
  };
}
export function ProductSpecificationSuccess(productDetails) {
  return {
    type: PRODUCT_SPECIFICATION_SUCCESS,
    status: SUCCESS,
    productDetails
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
      const result = await api.getMock(
        `${PRODUCT_SPECIFICATION_PATH}/${productId}`
      );
      const resultJson = await result.json();
      if (resultJson.status === FAILURE) {
        throw new Error(`${resultJson.message}`);
      }
      dispatch(ProductSpecificationSuccess(resultJson));
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
  let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
  return async (dispatch, getState, { api }) => {
    dispatch(addProductReviewRequest());
    try {
      const result = await api.post(
        `${PRODUCT_SPECIFICATION_PATH}/${productCode}/reviews?access_token=${
          JSON.parse(customerCookie).access_token
        }`,
        productReview
      );
      const resultJson = await result.json();
      if (resultJson.errors.length > 0) {
        throw new Error(`${resultJson.errors[0].message}`);
      }
      dispatch(addProductReviewSuccess(productReview));
    } catch (e) {
      dispatch(addProductReviewFailure(e.message));
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
      if (resultJson.status === FAILURE) {
        throw new Error(`${resultJson.message}`);
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
      if (resultJson.status === FAILURE) {
        throw new Error(`${resultJson.message}`);
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

export function getProductReviews(productCode) {
  let globalAccessToken = Cookie.getCookie(GLOBAL_ACCESS_TOKEN);
  return async (dispatch, getState, { api }) => {
    dispatch(getProductReviewsRequest());
    try {
      const result = await api.get(
        `${PRODUCT_SPECIFICATION_PATH}/${productCode.toUpperCase()}/users/anonymous/reviews?access_token=${
          JSON.parse(globalAccessToken).access_token
        }&page=${PAGE_VALUE}&pageSize=${PAGE_NUMBER}&orderBy=${ORDER_BY}&sort=${SORT}`
      );
      const resultJson = await result.json();
      if (resultJson.status === FAILURE) {
        throw new Error(`${resultJson.message}`);
      }
      dispatch(getProductReviewsSuccess(resultJson));
    } catch (e) {
      dispatch(getProductReviewsFailure(e.message));
    }
  };
}

export function productMsdRequest() {
  return {
    type: PRODUCT_MSD_REQUEST,
    status: REQUESTING
  };
}
export function productMsdSuccess(msdItems) {
  return {
    type: PRODUCT_MSD_SUCCESS,
    status: SUCCESS,
    msdItems
  };
}

export function productMsdFailure(error) {
  return {
    type: PRODUCT_MSD_FAILURE,
    status: ERROR,
    error
  };
}

export function getMsdRequest(productCode) {
  return async (dispatch, getState, { api }) => {
    let msdRequestObject = new FormData();
    msdRequestObject.append("api_key", API_KEY);
    msdRequestObject.append("widget_list", JSON.stringify(WIDGET_LIST));
    msdRequestObject.append("num_results", NUMBER_RESULTS);
    msdRequestObject.append("mad_uuid", MAD_UUID);
    msdRequestObject.append("details", false);
    msdRequestObject.append("product_id", productCode);

    dispatch(productMsdRequest());

    try {
      const result = await api.postMsd(MSD_REQUEST_PATH, msdRequestObject);
      const resultJson = await result.json();
      if (resultJson.status === FAILURE) {
        throw new Error(`${resultJson.message}`);
      }

      if (resultJson.data[0].length > 0) {
        dispatch(getPdpItems(resultJson.data[0], ABOUT_THE_BRAND_WIDGET_KEY));
      }
      if (resultJson.data[1].length > 0) {
        dispatch(
          getPdpItems(resultJson.data[1], RECOMMENDED_PRODUCTS_WIDGET_KEY)
        );
      }

      if (resultJson.data[2].length > 0) {
        dispatch(getPdpItems(resultJson.data[2], SIMILAR_PRODUCTS_WIDGET_KEY));
      }
    } catch (e) {
      dispatch(productMsdFailure(e.message));
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
export function getPdpItemsFailure(positionInFeed, errorMsg) {
  return {
    type: GET_PDP_ITEMS_FAILURE,
    errorMsg,
    status: FAILURE
  };
}

export function getPdpItems(itemIds, widgetKey) {
  return async (dispatch, getState, { api }) => {
    dispatch(getPdpItemsPdpRequest());
    try {
      let productCodes;
      each(itemIds, itemId => {
        productCodes = `${itemId},${productCodes}`;
      });
      const url = `v2/mpl/products/productInfo?productCodes=${productCodes}`;
      const result = await api.getMsd(url);

      const resultJson = await result.json();
      if (resultJson.status === "FAILURE") {
        throw new Error(`${resultJson.message}`);
      }
      dispatch(getPdpItemsPdpSuccess(resultJson.results, widgetKey));
    } catch (e) {
      dispatch(getPdpItemsFailure(e.message));
    }
  };
}
