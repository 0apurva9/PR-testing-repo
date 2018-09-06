import { SUCCESS, REQUESTING, ERROR } from "../lib/constants";
import * as ErrorHandling from "../general/ErrorHandling";
export const GET_DESKTOP_FOOTER_REQUEST = "GET_DESKTOP_FOOTER_REQUEST";
export const GET_DESKTOP_FOOTER_SUCCESS = "GET_DESKTOP_FOOTER_SUCCESS";
export const GET_DESKTOP_FOOTER_FAILURE = "GET_DESKTOP_FOOTER_FAILURE";
export const FOOTER_URL =
  "https://www.tatacliq.com/getFooterContent?id=FooterSlot";
export function getDesktopFooterRequest() {
  return {
    type: GET_DESKTOP_FOOTER_REQUEST,
    status: REQUESTING
  };
}
export function getDesktopFooterSuccess(DesktopFooterDetails) {
  return {
    type: GET_DESKTOP_FOOTER_SUCCESS,
    status: SUCCESS,
    DesktopFooterDetails
  };
}
export function getDesktopFooterFailure(error) {
  return {
    type: GET_DESKTOP_FOOTER_FAILURE,
    status: ERROR,
    error
  };
}
export function getDesktopFooter() {
  return async (dispatch, getState, { api }) => {
    dispatch(getDesktopFooterRequest());
    try {
      const resultJson = api.get("footer");
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      return dispatch(getDesktopFooterSuccess(resultJson));
    } catch (e) {
      dispatch(getDesktopFooterFailure(e.message));
    }
  };
}
