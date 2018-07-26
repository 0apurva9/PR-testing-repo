import { SUCCESS, REQUESTING, ERROR, FAILURE } from "../../lib/constants";
import {
  setDataLayer,
  ADOBE_DEFAULT_CLP_PAGE_LOAD
} from "../../lib/adobeUtils";
import * as ErrorHandling from "../../general/ErrorHandling.js";
export const GET_CATEGORIES_REQUEST = "GET_CATEGORIES_REQUEST";
export const GET_CATEGORIES_SUCCESS = "GET_CATEGORIES_SUCCESS";
export const GET_CATEGORIES_FAILURE = "GET_CATEGORIES_FAILURE";

export const GET_HEADER_REQUEST = "GET_HEADER_REQUEST";
export const GET_HEADER_SUCCESS = "GET_HEADER_SUCCESS";
export const GET_HEADER_FAILURE = "GET_HEADER_FAILURE";
const USER_CATEGORY_PATH = "v2/mpl/catalogs";
export function getCategoriesRequest() {
  return {
    type: GET_CATEGORIES_REQUEST,
    status: REQUESTING
  };
}
export function getCategoriesSuccess(categories) {
  return {
    type: GET_CATEGORIES_SUCCESS,
    status: SUCCESS,
    categories
  };
}

export function getCategoriesFailure(error) {
  return {
    type: GET_CATEGORIES_FAILURE,
    status: ERROR,
    error
  };
}

export function getCategories(userId, accessToken, cartId) {
  return async (dispatch, getState, { api }) => {
    dispatch(getCategoriesRequest());

    try {
      const result = await api.get(
        `${USER_CATEGORY_PATH}/getAllCategorieshierarchy?`
      );
      const resultJson = await result.json();
      if (resultJson.status === FAILURE) {
        throw new Error(resultJson.error);
      }
      dispatch(getCategoriesSuccess(resultJson));
      setDataLayer(ADOBE_DEFAULT_CLP_PAGE_LOAD, resultJson);
    } catch (e) {
      dispatch(getCategoriesFailure(e.message));
    }
  };
}

export function getHeaderRequest() {
  return {
    type: GET_HEADER_REQUEST,
    status: REQUESTING
  };
}
export function getHeaderSuccess(headerDetails) {
  return {
    type: GET_HEADER_SUCCESS,
    status: SUCCESS,
    headerDetails
  };
}

export function getHeaderFailure(error) {
  return {
    type: GET_HEADER_FAILURE,
    status: ERROR,
    error
  };
}

export function getHeader() {
  return async (dispatch, getState, { api }) => {
    dispatch(getHeaderRequest());
    try {
      const result = api.get("header");
      const resultJson = result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      dispatch(getHeaderSuccess(resultJson));
    } catch (e) {
      dispatch(getHeaderFailure(e.message));
    }
  };
}
