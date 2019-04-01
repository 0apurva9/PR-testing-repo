import {
  SUCCESS,
  REQUESTING,
  ERROR,
  FAILURE,
  FAILURE_LOWERCASE,
  SUCCESS_CAMEL_CASE,
  PANCARD_SUCCES_MESSAGE
} from "../lib/constants";

import * as ErrorHandling from "./ErrorHandling.js";
import { displayToast } from "./toast.actions";
export const GET_PANCARDDETAILS_REQUEST = "GET_PANCARDDETAILS_REQUEST";
export const GET_PANCARDDETAILS_SUCCESS = "GET_PANCARDDETAILS_SUCCESS";
export const GET_PANCARDDETAILS_FAILURE = "GET_PANCARDDETAILS_FAILURE";
export const SUBMIT_PANCARD_DETAILS_REQUEST = "SUBMIT_PANCARD_DETAILS_REQUEST";
export const SUBMIT_PANCARD_DETAILS_SUCCESS = "SUBMIT_PANCARD_DETAILS_SUCCESS";
export const SUBMIT_PANCARD_DETAILS_FAILURE = "SUBMIT_PANCARD_DETAILS_FAILURE";
export function getPanCardDetailsRequest() {
  return {
    type: GET_PANCARDDETAILS_REQUEST,
    status: REQUESTING
  };
}
export function getPanCardDetailsSuccess(panCardDetails) {
  return {
    type: GET_PANCARDDETAILS_SUCCESS,
    status: SUCCESS,
    panCardDetails
  };
}
export function getPanCardDetailsFailure(error) {
  return {
    type: GET_PANCARDDETAILS_FAILURE,
    status: ERROR,
    error
  };
}
export function getPanCardDetails(getPanCardDetails) {
  return async (dispatch, getState, { api }) => {
    dispatch(getPanCardDetailsRequest());
    try {
      const result = await api.get(
        `v2/mpl/panCard/panCardDetailsUpload/?orderReferanceNumber=${getPanCardDetails &&
          getPanCardDetails.orderReferanceNumber}&customerName=${getPanCardDetails &&
          getPanCardDetails.customerName}`
      );
      const resultJson = await result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      dispatch(getPanCardDetailsSuccess(resultJson));
    } catch (e) {
      dispatch(getPanCardDetailsFailure(e.message));
    }
  };
}
export function submitPancardDetailsRequest() {
  return {
    type: SUBMIT_PANCARD_DETAILS_REQUEST,
    status: REQUESTING
  };
}

export function submitPancardDetailsSuccess(submitPandcardDetails) {
  return {
    type: SUBMIT_PANCARD_DETAILS_SUCCESS,
    status: SUCCESS,
    submitPandcardDetails
  };
}
export function submitPancardDetailsFailure(error) {
  return {
    type: SUBMIT_PANCARD_DETAILS_FAILURE,
    status: ERROR,
    error
  };
}
export function submitPancardDetails(
  orderNumber,
  Customer_name,
  Pancard_number,
  file
) {
  return async (dispatch, getState, { api }) => {
    dispatch(submitPancardDetailsRequest());
    try {
      let uploadFile = new FormData();
      uploadFile.append("orderNumber", orderNumber);
      uploadFile.append("Customer_name", Customer_name);
      uploadFile.append("Pancard_number", Pancard_number);
      uploadFile.append("file", file);
      const result = await api.postFormData(
        `v2/mpl/panCard/panCardUpload/`,
        uploadFile
      );

      const resultJson = await result.json();
      if (
        resultJson.status === SUCCESS_CAMEL_CASE ||
        resultJson.status === SUCCESS
      ) {
        dispatch(displayToast(PANCARD_SUCCES_MESSAGE));
      }
      if (
        resultJson.status === FAILURE ||
        resultJson.status === FAILURE_LOWERCASE
      ) {
        dispatch(displayToast(resultJson.message));
      }
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      return dispatch(submitPancardDetailsSuccess(resultJson));
    } catch (e) {
      return dispatch(submitPancardDetailsFailure(e.message));
    }
  };
}
