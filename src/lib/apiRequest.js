import "isomorphic-fetch";
import cloneDeep from "lodash.clonedeep";
import * as Cookie from "./Cookie";
import { SUCCESS, FAILURE } from "./constants.js";
import * as ErrorHandling from "../general/ErrorHandling.js";
import { CUSTOMER_ACCESS_TOKEN, GLOBAL_ACCESS_TOKEN } from "../lib/constants";
let API_URL_ROOT = "https://uat2.tataunistore.com/marketplacewebservices";
export let TATA_CLIQ_ROOT = /https?:[\/]{2}\S*?(\/\S*)/;
export const TOKEN_PATH = "oauth/token";

if (
  process.env.REACT_APP_STAGE === "devxelp" ||
  process.env.REACT_APP_STAGE === "uat2" ||
  process.env.REACT_APP_STAGE === "local"
) {
  API_URL_ROOT = "https://uat2.tataunistore.com/marketplacewebservices";
} else if (process.env.REACT_APP_STAGE === "tmpprod") {
  API_URL_ROOT = "https://p2tmppprd.tataunistore.com/marketplacewebservices";
} else if (process.env.REACT_APP_STAGE === "production") {
  API_URL_ROOT = "https://www.tatacliq.com/marketplacewebservices";
} else if (process.env.REACT_APP_STAGE === "p2") {
  API_URL_ROOT = "https://p2.tatacliq.com/marketplacewebservices";
} else if (process.env.REACT_APP_STAGE === "stage") {
  API_URL_ROOT = "https://stg.tatacliq.com/marketplacewebservices";
}

export const API_URL_ROOT_DUMMY =
  "https://www.tatacliq.com/marketplacewebservices";
// export const API_URL_ROOT = API_URL_ROOT_DUMMY;
export const API_URL_ROOT_MOCK = "https://cliq-json-server.herokuapp.com";
export const HOME_FEED_API_ROOT =
  "https://tataunistore.tt.omtrdc.net/rest/v1/mbox?client=tataunistore";
export const JUS_PAY_API_URL_ROOT = process.env.REACT_APP_JUS_PAY_API_URL_ROOT;

const ACCESS_TOKEN_EXPIRED_MESSAGE = "Access token expired";
const ACCESS_TOKEN_INVALID_MESSAGE = "Invalid access token";
const CLIENT_ID = "gauravj@dewsolutions.in";
const CUSTOMER_ACCESS_TOKEN_INVALID = "customerAccessTokenInvalid";
const GLOBAL_ACCESS_TOKEN_INVALID = "globalAccessTokenInvalid";
export const API_MSD_URL_ROOT = "https://ap-southeast-1-api.madstreetden.com";

export async function postAdobeTargetUrl(
  path: null,
  mbox,
  marketingCloudVisitorId: null,
  tntId: null,
  useApiRoot: true
) {
  const result = await new Promise((resolve, reject) => {
    window.adobe.target.getOffer({
      mbox: mbox,
      success: function(offer) {
        resolve(offer);
      },
      error: function(status, error) {
        reject(error);
      }
    });
  });

  return result;
}

async function corePost(path, postData, doNotUseApiSuffix) {
  const url = `${API_URL_ROOT}/${path}`;
  return await fetch(url, {
    method: "POST",
    body: JSON.stringify(postData),
    headers: {
      Authorization: "Basic " + btoa("gauravj@dewsolutions.in:gauravj@12#"),
      "Content-Type": "application/json"
    }
  });
}

export async function coreGet(url) {
  return await fetch(`${API_URL_ROOT}/${url}`, {
    headers: {
      Authorization: "Basic " + btoa("gauravj@dewsolutions.in:gauravj@12#")
    }
  });
}

export async function get(url) {
  const result = await coreGet(url);
  const resultClone = result.clone();
  const resultJson = await result.json();
  const errorStatus = ErrorHandling.getFailureResponse(resultJson);
  if (!errorStatus.status || !isInvalidAccessTokenError(errorStatus.message)) {
    return resultClone;
  }
  return await handleRedoFunctionCall(errorStatus.message, url);
}

async function corePostFormData(url, payload) {
  return await fetch(`${API_URL_ROOT}/${url}`, {
    method: "POST",
    body: payload
  });
}

export async function postFormData(url, payload) {
  const result = await corePostFormData(url, payload);
  const resultClone = result.clone();
  const resultJson = await result.json();
  const errorStatus = ErrorHandling.getFailureResponse(resultJson);
  if (!errorStatus.status || !isInvalidAccessTokenError(errorStatus.message)) {
    return resultClone;
  }
  return await handleRedoFunctionCall(errorStatus.message, url);
}

async function handleRedoFunctionCall(message, url) {
  let newUrl = url;
  newUrl = await handleInvalidCustomerAccessToken(message, url);
  if (newUrl) {
    return corePostFormData(newUrl);
  }
  newUrl = await handleInvalidGlobalAccessToken(message, url);
  if (newUrl) {
    return corePostFormData(newUrl);
  }
  return await corePostFormData(newUrl);
}

async function handleInvalidCustomerAccessToken(message, oldUrl) {
  let newUrl = null;
  if (isCustomerAccessTokenFailure(message)) {
    const customerAccessTokenResponse = await refreshCustomerAccessToken();
    if (!customerAccessTokenResponse) {
      throw new Error("Customer Access Token refresh failure");
    }
    newUrl = replaceOldCustomerCookie(oldUrl, customerAccessTokenResponse);
  }
  return newUrl;
}

async function handleInvalidGlobalAccessToken(message, oldUrl) {
  let newUrl = oldUrl;
  if (isGlobalAccessTokenFailure(message)) {
    const globalAccessTokenResponse = await refreshGlobalAccessToken();
    if (!globalAccessTokenResponse) {
      throw new Error("Global Access Token refresh failure");
    }

    newUrl = replaceOldGlobalTokenCookie(oldUrl, globalAccessTokenResponse);
  }
  return newUrl;
}

function replaceOldGlobalTokenCookie(url, newGlobalTokenCookie) {
  let oldGlobalCookie = JSON.parse(Cookie.getCookie(GLOBAL_ACCESS_TOKEN));
  Cookie.deleteCookie(GLOBAL_ACCESS_TOKEN);
  Cookie.createCookie(
    GLOBAL_ACCESS_TOKEN,
    JSON.stringify(newGlobalTokenCookie)
  );

  return url.replace(
    oldGlobalCookie.access_token,
    newGlobalTokenCookie.access_token
  );
}

function replaceOldCustomerCookie(url, newCustomerCookie) {
  let oldCustomerCookie = JSON.parse(Cookie.getCookie(CUSTOMER_ACCESS_TOKEN));
  Cookie.deleteCookie(CUSTOMER_ACCESS_TOKEN);
  Cookie.createCookie(CUSTOMER_ACCESS_TOKEN, JSON.stringify(newCustomerCookie));
  return url.replace(
    oldCustomerCookie.access_token,
    newCustomerCookie.access_token
  );
}

export async function post(path, postData, doNotUseApiSuffix: true) {
  const result = await corePost(path, postData, doNotUseApiSuffix);
  const resultClone = result.clone();
  const resultJson = await result.json();
  const errorStatus = ErrorHandling.getFailureResponse(resultJson);
  if (!errorStatus.status) {
    // there was no error
    return resultClone;
  }

  if (!isInvalidAccessTokenError(errorStatus.message)) {
    return resultClone;
  }

  if (isCustomerAccessTokenFailure(errorStatus.message)) {
    const customerAccessTokenResponse = await refreshCustomerAccessToken();
    if (!customerAccessTokenResponse) {
      throw new Error("Customer Access Token refresh failure");
    }
    // redo the call
    return await corePost(path, postData, doNotUseApiSuffix);
  }

  if (isGlobalAccessTokenFailure(errorStatus.message)) {
    const globalAccessTokenResponse = await refreshGlobalAccessToken();
    if (!globalAccessTokenResponse) {
      throw new Error("Global Access Token refresh failure");
    }
    return await corePost(path, postData, doNotUseApiSuffix);
  }
}

async function refreshCustomerAccessToken() {
  let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
  const refreshTokenResponse = await post(
    `${TOKEN_PATH}?refresh_token=${
      JSON.parse(customerCookie).refresh_token
    }&client_id=${CLIENT_ID}&client_secret=secret&grant_type=refresh_token`
  );
  const refreshTokenResultJson = await refreshTokenResponse.json();
  const errorStatusObject = ErrorHandling.getFailureResponse(
    refreshTokenResultJson
  );
  if (errorStatusObject.status) {
    // the refresh token has failed
    // what do I do in this case?
    // I return null, so that I can throw an error which will be caught.
    return null;
  }

  return refreshTokenResultJson;
}

async function refreshGlobalAccessToken() {
  const result = await post(
    `${TOKEN_PATH}?grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=secret&isPwa=true`
  );
  const resultJson = await result.json();
  const errorStatusObj = ErrorHandling.getFailureResponse(resultJson);
  if (errorStatusObj.status) {
    return null;
  }

  return resultJson;
}

function isCustomerAccessTokenFailure(message) {
  const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
  const customerAccessToken =
    customerCookie && JSON.parse(customerCookie).access_token;
  if (message.indexOf(customerAccessToken) >= 0) {
    return true;
  }
  return false;
}

function isGlobalAccessTokenFailure(message) {
  const globalAccessTokenCookie = Cookie.getCookie(GLOBAL_ACCESS_TOKEN);
  const globalAccessToken =
    globalAccessTokenCookie && JSON.parse(globalAccessTokenCookie).access_token;
  if (message.indexOf(globalAccessToken) >= 0) {
    return true;
  }
  return false;
}

function isInvalidAccessTokenError(message) {
  return (
    message.indexOf(ACCESS_TOKEN_EXPIRED_MESSAGE) >= 0 ||
    message.indexOf(ACCESS_TOKEN_INVALID_MESSAGE) >= 0
  );
}

export async function getWithoutApiUrlRoot(url) {
  return await fetch(url, {
    headers: {
      Authorization: "Basic " + btoa("gauravj@dewsolutions.in:gauravj@12#")
    }
  });
}

export async function postMsd(url, payload) {
  return await fetch(url, {
    method: "POST",
    body: payload
  });
}

export async function postJusPay(path, postData) {
  return await fetch(path, {
    method: "POST",
    body: postData
  });
}

// this function is using in follow and un follow brands
// because there we have to send payload in formData or Row Data format in msd api

export async function postMsdRowData(url, payload) {
  return await fetch(`${API_MSD_URL_ROOT}/${url}`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json"
    }
  });
}
