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
export function getDesktopFooter(pathName) {
  let requestSource = "https://www.tatacliq.com/";
  if (process.env.REACT_APP_STAGE === "e2e") {
    requestSource = "https://e2e.tataunistore.com/";
  }
  return async (dispatch, getState, { api }) => {
    dispatch(getDesktopFooterRequest());
    try {
      let footerApi;
      if (
        (pathName.search("msh") !== -1 || pathName.search("mbh") !== -1) &&
        pathName.search("/c-") !== -1
      ) {
        var urlSearch = pathName && pathName.split("/c-");
        if (urlSearch[1].search("/") !== -1) {
          var urlSearch2 = urlSearch[1].split("/");
          footerApi = `${requestSource}marketplacewebservices/v2/mpl/cms/desktopservice/footer?pageID=${
            urlSearch2[0]
          }`;
        } else {
          footerApi = `${requestSource}marketplacewebservices/v2/mpl/cms/desktopservice/footer?pageID=${
            urlSearch[1]
          }`;
        }
      } else {
        footerApi = `${requestSource}marketplacewebservices/v2/mpl/cms/desktopservice/footer`;
      }

      const result = await fetch(footerApi);
      const resultJson = await result.json();
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
