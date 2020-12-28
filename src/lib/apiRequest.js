import "isomorphic-fetch";
import * as Cookie from "./Cookie";
import {
  LOGGED_IN_USER_DETAILS,
  CART_DETAILS_FOR_LOGGED_IN_USER,
  CART_DETAILS_FOR_ANONYMOUS
} from "./constants.js";
import { isNode, isBrowser } from "browser-or-node";
import axios from "axios";
import * as ErrorHandling from "../general/ErrorHandling.js";
import { CUSTOMER_ACCESS_TOKEN, GLOBAL_ACCESS_TOKEN } from "../lib/constants";
import { USER_CART_PATH } from "../cart/actions/cart.actions";
let API_URL_ROOT = "/marketplacewebservices";
let MIDDLEWARE_API_URL_ROOT = "/que-marketplacewebservices";
export let TATA_CLIQ_ROOT = /https?:[\/]{2}\S*?(\/\S*)/;
export const TOKEN_PATH = "oauth/token";
export let URL_ROOT = "";
const ACEESS_TOKEN_REGEX = /(access_token=).*?(&)/;

let count = 0;
if (
  process.env.REACT_APP_STAGE === "devxelp" ||
  process.env.REACT_APP_STAGE === "uat2" ||
  process.env.REACT_APP_STAGE === "local"
) {
  API_URL_ROOT = "https://uat2.tataunistore.com/marketplacewebservices";
  MIDDLEWARE_API_URL_ROOT =
    "https://uat2.tataunistore.com/marketplacewebservices";
} else if (process.env.REACT_APP_STAGE === "tmpprod") {
  API_URL_ROOT = "https://tmppprd.tataunistore.com/marketplacewebservices";
  MIDDLEWARE_API_URL_ROOT =
    "https://tmppprd.tataunistore.com/marketplacewebservices";
} else if (process.env.REACT_APP_STAGE === "production") {
  API_URL_ROOT = "https://www.tatacliq.com/marketplacewebservices";
  MIDDLEWARE_API_URL_ROOT = "https://www.tatacliq.com/marketplacewebservices";
} else if (process.env.REACT_APP_STAGE === "p2") {
  API_URL_ROOT = "https://www.tatacliq.com/marketplacewebservices";
  MIDDLEWARE_API_URL_ROOT = "https://www.tatacliq.com/marketplacewebservices";
} else if (process.env.REACT_APP_STAGE === "stage") {
  API_URL_ROOT = "https://stg.tatacliq.com/marketplacewebservices";
  MIDDLEWARE_API_URL_ROOT = "https://stg.tatacliq.com/marketplacewebservices";
} else if (process.env.REACT_APP_STAGE === "uat") {
  API_URL_ROOT = "https://uat.tataunistore.com/marketplacewebservices";
  MIDDLEWARE_API_URL_ROOT =
    "https://uat.tataunistore.com/marketplacewebservices";
} else if (process.env.REACT_APP_STAGE === "uat6tcs") {
  API_URL_ROOT = "https://uat6-tcs.tataunistore.com/marketplacewebservices";
  MIDDLEWARE_API_URL_ROOT =
    "https://uat6-tcs.tataunistore.com/marketplacewebservices";
} else if (process.env.REACT_APP_STAGE === "pt") {
  API_URL_ROOT = "https://pt.tatacliq.com/marketplacewebservices";
  MIDDLEWARE_API_URL_ROOT = "https://pt.tatacliq.com/marketplacewebservices";
} else if (process.env.REACT_APP_STAGE === "uat5") {
  API_URL_ROOT = "https://uat5.tataunistore.com/marketplacewebservices";
  MIDDLEWARE_API_URL_ROOT =
    "https://uat5.tataunistore.com/marketplacewebservices";
} else if (process.env.REACT_APP_STAGE === "uat6") {
  API_URL_ROOT = "https://uat6.tataunistore.com/marketplacewebservices";
  MIDDLEWARE_API_URL_ROOT =
    "https://uat6.tataunistore.com/marketplacewebservices";
} else if (process.env.REACT_APP_STAGE === "e2e") {
  API_URL_ROOT = "https://e2e.tataunistore.com/marketplacewebservices";
  MIDDLEWARE_API_URL_ROOT =
    "https://e2e.tataunistore.com/marketplacewebservices";
} else if (process.env.REACT_APP_STAGE === "e2e1") {
  API_URL_ROOT = "https://e2e1.tataunistore.com/marketplacewebservices";
  MIDDLEWARE_API_URL_ROOT =
    "https://e2e1.tataunistore.com/marketplacewebservices";
} else if (process.env.REACT_APP_STAGE === "preprod3") {
  API_URL_ROOT = "https://preprod3.tataunistore.com/marketplacewebservices";
  MIDDLEWARE_API_URL_ROOT =
    "https://preprod3.tataunistore.com/marketplacewebservices";
} else if (process.env.REACT_APP_STAGE === "preprod2") {
  API_URL_ROOT = "https://preprod2.tataunistore.com/marketplacewebservices";
  MIDDLEWARE_API_URL_ROOT =
    "https://preprod2.tataunistore.com/marketplacewebservices";
} else if (process.env.REACT_APP_STAGE === "qa8") {
  API_URL_ROOT = "https://qa8.tataunistore.com/marketplacewebservices";
  MIDDLEWARE_API_URL_ROOT =
    "https://qa8.tataunistore.com/marketplacewebservices";
} else if (process.env.REACT_APP_STAGE === "qa9") {
  API_URL_ROOT = "https://qa9.tataunistore.com/marketplacewebservices";
  MIDDLEWARE_API_URL_ROOT =
    "https://qa9.tataunistore.com/marketplacewebservices";
} else if (process.env.REACT_APP_STAGE === "qa3") {
  API_URL_ROOT = "https://qa3.tataunistore.com/marketplacewebservices";
  MIDDLEWARE_API_URL_ROOT =
    "https://qa3.tataunistore.com/marketplacewebservices";
} else if (process.env.REACT_APP_STAGE === "qa10") {
  API_URL_ROOT = "https://qa10.tataunistore.com/marketplacewebservices";
  MIDDLEWARE_API_URL_ROOT =
    "https://qa10.tataunistore.com/marketplacewebservices";
} else if (process.env.REACT_APP_STAGE === "preprod1") {
  API_URL_ROOT = "https://preprod1.tataunistore.com/marketplacewebservices";
  MIDDLEWARE_API_URL_ROOT =
    "https://preprod1.tataunistore.com/marketplacewebservices";
} else if (process.env.REACT_APP_STAGE === "prod1") {
  API_URL_ROOT = "https://prod1.tataunistore.com/marketplacewebservices";
  MIDDLEWARE_API_URL_ROOT =
    "https://prod1.tataunistore.com/marketplacewebservices";
} else if (process.env.REACT_APP_STAGE === "awsprod1") {
  API_URL_ROOT = "https://awsprod1.tataunistore.com/marketplacewebservices";
  MIDDLEWARE_API_URL_ROOT =
    "https://awsprod1.tataunistore.com/marketplacewebservices";
} else if (process.env.REACT_APP_STAGE === "awsprod2") {
  API_URL_ROOT = "https://awsprod2.tataunistore.com/marketplacewebservices";
  MIDDLEWARE_API_URL_ROOT =
    "https://awsprod2.tataunistore.com/marketplacewebservices";
} else if (process.env.REACT_APP_STAGE === "awsprod3") {
  API_URL_ROOT = "https://awsprod3.tataunistore.com/marketplacewebservices";
  MIDDLEWARE_API_URL_ROOT =
    "https://awsprod3.tataunistore.com/marketplacewebservices";
} else if (process.env.REACT_APP_STAGE === "awspreprod1") {
  API_URL_ROOT = "https://awspreprod1.tataunistore.com/marketplacewebservices";
  MIDDLEWARE_API_URL_ROOT =
    "https://awspreprod1.tataunistore.com/marketplacewebservices";
} else if (process.env.REACT_APP_STAGE === "awspreprod2") {
  API_URL_ROOT = "https://awspreprod2.tataunistore.com/marketplacewebservices";
  MIDDLEWARE_API_URL_ROOT =
    "https://awspreprod2.tataunistore.com/marketplacewebservices";
} else if (process.env.REACT_APP_STAGE === "awspreprod3") {
  API_URL_ROOT = "https://awspreprod3.tataunistore.com/marketplacewebservices";
  MIDDLEWARE_API_URL_ROOT =
    "https://awspreprod3.tataunistore.com/marketplacewebservices";
} else if (process.env.REACT_APP_STAGE === "dev1") {
  API_URL_ROOT = "https://dev1.tataunistore.com/marketplacewebservices";
  MIDDLEWARE_API_URL_ROOT =
    "https://dev1.tataunistore.com/marketplacewebservices";
} else if (process.env.REACT_APP_STAGE === "dev2") {
  API_URL_ROOT = "https://dev2.tataunistore.com/marketplacewebservices";
  MIDDLEWARE_API_URL_ROOT =
    "https://dev2.tataunistore.com/marketplacewebservices";
} else if (process.env.REACT_APP_STAGE === "qa1") {
  API_URL_ROOT = "https://qa1.tataunistore.com/marketplacewebservices";
  MIDDLEWARE_API_URL_ROOT =
    "https://qa1.tataunistore.com/marketplacewebservices";
} else if (process.env.REACT_APP_STAGE === "qa2") {
  API_URL_ROOT = "https://qa2.tataunistore.com/marketplacewebservices";
  MIDDLEWARE_API_URL_ROOT =
    "https://qa2.tataunistore.com/marketplacewebservices";
} else if (process.env.REACT_APP_STAGE === "qa3") {
  API_URL_ROOT = "https://qa3.tataunistore.com/marketplacewebservices";
  MIDDLEWARE_API_URL_ROOT =
    "https://qa3.tataunistore.com/marketplacewebservices";
} else if (process.env.REACT_APP_STAGE === "qa4") {
  API_URL_ROOT = "https://qa4.tataunistore.com/marketplacewebservices";
  MIDDLEWARE_API_URL_ROOT =
    "https://qa4.tataunistore.com/marketplacewebservices";
} else if (process.env.REACT_APP_STAGE === "qa5") {
  API_URL_ROOT = "https://qa5.tataunistore.com/marketplacewebservices";
  MIDDLEWARE_API_URL_ROOT =
    "https://qa5.tataunistore.com/marketplacewebservices";
} else if (process.env.REACT_APP_STAGE === "qa6") {
  API_URL_ROOT = "https://qa6.tataunistore.com/marketplacewebservices";
  MIDDLEWARE_API_URL_ROOT =
    "https://qa6.tataunistore.com/marketplacewebservices";
} else if (process.env.REACT_APP_STAGE === "pt1") {
  API_URL_ROOT = "https://pt1.tataunistore.com/marketplacewebservices";
  MIDDLEWARE_API_URL_ROOT =
    "https://pt1.tataunistore.com/marketplacewebservices";
} else if (process.env.REACT_APP_STAGE === "pt2") {
  API_URL_ROOT = "https://pt2.tataunistore.com/marketplacewebservices";
  MIDDLEWARE_API_URL_ROOT =
    "https://pt2.tataunistore.com/marketplacewebservices";
} else if (process.env.REACT_APP_STAGE === "mock") {
  API_URL_ROOT = "https://mock.tatacliq.com/marketplacewebservices";
  MIDDLEWARE_API_URL_ROOT = "https://mock.tatacliq.com/marketplacewebservices";
} else if (process.env.REACT_APP_STAGE === "qa6") {
  API_URL_ROOT = "https://qa6.tataunistore.com/marketplacewebservices";
  MIDDLEWARE_API_URL_ROOT =
    "https://qa6.tataunistore.com/marketplacewebservices";
}

if (process.env.REACT_APP_STAGE === "tmpprod") {
  URL_ROOT = "https://tmpprd.tataunistore.com";
} else if (process.env.REACT_APP_STAGE === "production") {
  URL_ROOT = "https://www.tatacliq.com";
} else if (process.env.REACT_APP_STAGE === "p2") {
  URL_ROOT = "https://p2.tatacliq.com";
} else if (process.env.REACT_APP_STAGE === "stage") {
  URL_ROOT = "https://stg.tatacliq.com";
} else if (process.env.REACT_APP_STAGE === "devxelp") {
  URL_ROOT = "http://54.147.12.99:3000";
} else if (process.env.REACT_APP_STAGE === "uat2") {
  URL_ROOT = "https://uat2.tataunistore.com";
} else if (process.env.REACT_APP_STAGE === "local") {
  URL_ROOT = "https://uat2.tataunistore.com";
} else if (process.env.REACT_APP_STAGE === "uat") {
  URL_ROOT = "https://uat.tataunistore.com";
} else if (process.env.REACT_APP_STAGE === "uat6tcs") {
  URL_ROOT = "https://uat6-tcs.tataunistore.com";
} else if (process.env.REACT_APP_STAGE === "pt") {
  URL_ROOT = "https://pt.tatacliq.com";
} else if (process.env.REACT_APP_STAGE === "uat5") {
  URL_ROOT = "https://uat5.tataunistore.com";
} else if (process.env.REACT_APP_STAGE === "uat6") {
  URL_ROOT = "https://uat6.tataunistore.com";
} else if (process.env.REACT_APP_STAGE === "e2e") {
  URL_ROOT = "https://e2e.tataunistore.com";
} else if (process.env.REACT_APP_STAGE === "e2e1") {
  URL_ROOT = "https://e2e1.tataunistore.com";
} else if (process.env.REACT_APP_STAGE === "preprod3") {
  URL_ROOT = "https://preprod3.tataunistore.com";
} else if (process.env.REACT_APP_STAGE === "qa8") {
  URL_ROOT = "https://qa8.tataunistore.com";
} else if (process.env.REACT_APP_STAGE === "qa9") {
  URL_ROOT = "https://qa9.tataunistore.com";
} else if (process.env.REACT_APP_STAGE === "qa10") {
  URL_ROOT = "https://qa10.tataunistore.com";
} else if (process.env.REACT_APP_STAGE === "preprod1") {
  URL_ROOT = "https://preprod1.tataunistore.com";
} else if (process.env.REACT_APP_STAGE === "prod1") {
  URL_ROOT = "https://prod1.tataunistore.com";
} else if (process.env.REACT_APP_STAGE === "awsprod1") {
  URL_ROOT = "https://awsprod1.tataunistore.com";
} else if (process.env.REACT_APP_STAGE === "awsprod2") {
  URL_ROOT = "https://awsprod2.tataunistore.com";
} else if (process.env.REACT_APP_STAGE === "awsprod3") {
  URL_ROOT = "https://awsprod3.tataunistore.com";
} else if (process.env.REACT_APP_STAGE === "awspreprod1") {
  URL_ROOT = "https://awspreprod1.tataunistore.com";
} else if (process.env.REACT_APP_STAGE === "awspreprod2") {
  URL_ROOT = "https://awspreprod2.tataunistore.com";
} else if (process.env.REACT_APP_STAGE === "awspreprod3") {
  URL_ROOT = "https://awspreprod3.tataunistore.com";
} else if (process.env.REACT_APP_STAGE === "dev1") {
  URL_ROOT = "https://dev1.tataunistore.com";
} else if (process.env.REACT_APP_STAGE === "dev2") {
  URL_ROOT = "https://dev2.tataunistore.com";
} else if (process.env.REACT_APP_STAGE === "qa1") {
  URL_ROOT = "https://qa1.tataunistore.com";
} else if (process.env.REACT_APP_STAGE === "qa2") {
  URL_ROOT = "https://qa2.tataunistore.com";
} else if (process.env.REACT_APP_STAGE === "qa3") {
  URL_ROOT = "https://qa3.tataunistore.com";
} else if (process.env.REACT_APP_STAGE === "qa4") {
  URL_ROOT = "https://qa4.tataunistore.com";
} else if (process.env.REACT_APP_STAGE === "qa5") {
  URL_ROOT = "https://qa5.tataunistore.com";
} else if (process.env.REACT_APP_STAGE === "qa6") {
  URL_ROOT = "https://qa6.tataunistore.com";
} else if (process.env.REACT_APP_STAGE === "pt1") {
  URL_ROOT = "https://pt1.tataunistore.com";
} else if (process.env.REACT_APP_STAGE === "pt2") {
  URL_ROOT = "https://pt2.tataunistore.com";
} else if (process.env.REACT_APP_STAGE === "mock") {
  URL_ROOT = "https://mock.tatacliq.com";
} else if (process.env.REACT_APP_STAGE === "qa4") {
  URL_ROOT = "https://qa4.tataunistore.com";
}
export const API_URL_ROOT_DUMMY =
  "https://www.tatacliq.com/marketplacewebservices";
// export const API_URL_ROOT = API_URL_ROOT_DUMMY;
export const API_URL_ROOT_MOCK = "https://cliq-json-server.herokuapp.com";
export const HOME_FEED_API_ROOT =
  "https://tataunistore.tt.omtrdc.net/rest/v1/mbox?client=tataunistore";
export const JUS_PAY_API_URL_ROOT = process.env.REACT_APP_JUS_PAY_API_URL_ROOT;
export const STRIPE_API_URL_ROOT = process.env.REACT_APP_STRIPE_API_URL_ROOT;
const STRIPE_ACCESTOKEN = process.env.REACT_APP_STRIPE_ACCESTOKEN;
const ACCESS_TOKEN_EXPIRED_MESSAGE = "Access token expired";
const ACCESS_TOKEN_INVALID_MESSAGE = "Invalid access token";
const CLIENT_ID = "gauravj@dewsolutions.in";
const CART_NOT_FOUND_ERROR = "CartError";
const NO_DATA = "No data found.";

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

export async function mockGetFooter() {
  const url = "https://assessable-fridays.000webhostapp.com/footer.json";
  return await fetch(url);
}

export async function coreGet(url, channel) {
  function btoa(str) {
    if (Buffer.byteLength(str) !== str.length) throw new Error("bad string!");
    return Buffer(str, "binary").toString("base64");
  }
  const headers = {
    Authorization: "Basic " + btoa("gauravj@dewsolutions.in:gauravj@12#"),
    "Cache-Control": "no-store, must-revalidate, no-cache, max-age=0",
    "Content-Length": 1897,
    "Content-Type": "application/json; charset=utf-8",
    Expires: "Mon, 01 Jan 1990 00:00:00 GMT",
    Pragma: "no-cache",
    Server: "Microsoft-IIS/8.0"
  };
  if (channel) {
    headers.appPlatform = channel;
  }
  return await fetch(`${API_URL_ROOT}/${url}`, {
    headers
  });
}

export async function get(url, channel) {
  const result = await coreGet(url, channel);
  const resultClone = result.clone();
  const resultJson = await result.json();
  const errorStatus = ErrorHandling.getFailureResponse(resultJson);

  try {
    if (errorStatus.status && url.includes("cartDetails")) {
      throw errorStatus;
    }

    if (
      (!errorStatus.status ||
        !isInvalidAccessTokenError(errorStatus.message)) &&
      !isCartNotFoundError(resultJson)
    ) {
      return resultClone;
    }
    let newUrl;

    if (isCartNotFoundError(resultJson)) {
      newUrl = await handleCartNotFoundError(resultJson, url);
    }
    if (isInvalidAccessTokenError(errorStatus.message)) {
      newUrl = await handleInvalidGlobalAccesssTokenOrCustomerAccessToken(
        errorStatus.message,
        url
      );
    }
    return await coreGet(newUrl);
  } catch (e) {
    throw e;
  }
}

export async function coreGetMiddlewareUrl(url) {
  function btoa(str) {
    if (Buffer.byteLength(str) !== str.length) throw new Error("bad string!");
    return Buffer(str, "binary").toString("base64");
  }
  if (isNode) {
    try {
      const result = await axios.get(`${MIDDLEWARE_API_URL_ROOT}/${url}`, {
        headers: {
          Authorization: "Basic " + btoa("gauravj@dewsolutions.in:gauravj@12#")
        }
      });
      // doing thisbecause isoomrphic-fetch is failing and I want to make a minimal change
      // to use axios in Node.
      const resultJson = {
        clone: () => {
          return {
            json: () => result.data
          };
        }
      };
      return resultJson;
    } catch (e) {
      throw e;
    }
  }

  return await fetch(`${MIDDLEWARE_API_URL_ROOT}/${url}`, {
    headers: {
      Authorization: "Basic " + btoa("gauravj@dewsolutions.in:gauravj@12#"),
      mode: "no-cors"
    }
  });
}

export async function getMiddlewareUrl(url) {
  try {
    const result = await coreGetMiddlewareUrl(url);
    const resultClone = await result.clone();
    const resultJson = await resultClone.json();
    const errorStatus = ErrorHandling.getFailureResponse(resultJson);
    if (
      (!errorStatus.status ||
        !isInvalidAccessTokenError(errorStatus.message)) &&
      !isCartNotFoundError(resultJson)
    ) {
      return result.clone();
    }
    let newUrl;

    if (isCartNotFoundError(resultJson)) {
      newUrl = await handleCartNotFoundError(resultJson, url);
    }
    if (isInvalidAccessTokenError(errorStatus.message)) {
      newUrl = await handleInvalidGlobalAccesssTokenOrCustomerAccessToken(
        errorStatus.message,
        url
      );
    }
    return await coreGetMiddlewareUrl(newUrl);
  } catch (e) {
    throw e;
  }
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
  try {
    if (
      (!errorStatus.status ||
        !isInvalidAccessTokenError(errorStatus.message)) &&
      !isCartNotFoundError(resultJson)
    ) {
      return resultClone;
    }
    let newUrl;
    if (isCartNotFoundError(resultJson)) {
      newUrl = await handleCartNotFoundError(resultJson, url);
    }
    if (isInvalidAccessTokenError(errorStatus.message)) {
      newUrl = await handleInvalidGlobalAccesssTokenOrCustomerAccessToken(
        errorStatus.message,
        url
      );
    }
    return await corePostFormData(newUrl, payload);
  } catch (e) {
    throw e;
  }
}

export async function post(path, postData, doNotUseApiSuffix: true) {
  const result = await corePost(path, postData, doNotUseApiSuffix);
  const resultClone = result.clone();
  const resultJson = await result.json();
  const errorStatus = ErrorHandling.getFailureResponse(resultJson);

  try {
    if (
      (!errorStatus.status ||
        !isInvalidAccessTokenError(errorStatus.message)) &&
      !isCartNotFoundError(resultJson)
    ) {
      return resultClone;
    }
    let newUrl;
    if (isCartNotFoundError(resultJson)) {
      newUrl = await handleCartNotFoundError(resultJson, path);
    }
    if (isInvalidAccessTokenError(errorStatus.message)) {
      newUrl = await handleInvalidGlobalAccesssTokenOrCustomerAccessToken(
        errorStatus.message,
        path
      );
    }

    return await corePost(newUrl, postData);
  } catch (e) {
    throw e;
  }
}

async function handleInvalidGlobalAccesssTokenOrCustomerAccessToken(
  message,
  url
) {
  // clearCookie();
  // window.location.replace("/");
  let newUrl = url;
  try {
    newUrl = await handleInvalidCustomerAccessToken(message, url);
    if (newUrl) {
      return newUrl;
    }
    newUrl = await handleInvalidGlobalAccessToken(message, url);
    if (newUrl) {
      return newUrl;
    }
    return newUrl;
  } catch (e) {
    throw e;
  }
}

async function handleInvalidCustomerAccessToken(message, oldUrl) {
  let newUrl = null;
  if (isCustomerAccessTokenFailure(message)) {
    const customerAccessTokenResponse = await refreshCustomerAccessToken();
    if (!customerAccessTokenResponse) {
      //check if user is logged in
      let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
      if (userDetails) {
        logoutUserOnInvalidRefreshToken();
      }
      // throw new Error("Customer Access Token refresh failure ");
    } else {
      newUrl = await replaceOldCustomerCookie(
        oldUrl,
        customerAccessTokenResponse
      );
    }
  }
  return newUrl;
}

export async function logoutUserOnInvalidRefreshToken() {
  const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
  const globalAccessToken = Cookie.getCookie(GLOBAL_ACCESS_TOKEN);
  try {
    const result = await postFormData(
      `v2/mpl/users/logout?userId=${
        JSON.parse(userDetails).userName
      }&access_token=${JSON.parse(globalAccessToken).access_token}`
    );
    const resultJson = await result.json();
    const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
    if (resultJsonStatus.status) {
      throw new Error(resultJsonStatus.message);
    }
    await clearCookie();
    window.location.reload();
  } catch (e) {}
}

async function clearCookie() {
  Cookie.deleteCookie(CUSTOMER_ACCESS_TOKEN);
  Cookie.deleteCookie(GLOBAL_ACCESS_TOKEN);
  Cookie.deleteCookie(CART_DETAILS_FOR_LOGGED_IN_USER);
  Cookie.deleteCookie(CART_DETAILS_FOR_ANONYMOUS);
  Cookie.deleteCookie(LOGGED_IN_USER_DETAILS);
  localStorage.clear();
  return;
}

async function handleCartNotFoundError(response, oldUrl) {
  let newUrl = null;
  const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
  const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);

  if (isCartNotFoundError(response)) {
    const refreshCartIdResponse = await refreshCartId();

    if (!refreshCartIdResponse) {
      throw new Error("Customer Cart id refresh failure");
    }
    if (userDetails && customerCookie) {
      newUrl = replaceOldCartCookieForLoggedInUser(
        oldUrl,
        refreshCartIdResponse
      );
    } else {
      newUrl = replaceOldCartCookieForAnonymnous(oldUrl, refreshCartIdResponse);
    }
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
    newUrl = await replaceOldGlobalTokenCookie(
      oldUrl,
      globalAccessTokenResponse
    );
  }
  return newUrl;
}

async function replaceOldGlobalTokenCookie(url, newGlobalTokenCookie) {
  let oldGlobalCookie = JSON.parse(Cookie.getCookie(GLOBAL_ACCESS_TOKEN));
  await Cookie.deleteCookie(GLOBAL_ACCESS_TOKEN);
  await Cookie.createCookie(
    GLOBAL_ACCESS_TOKEN,
    JSON.stringify(newGlobalTokenCookie)
  );

  if (
    !url.includes(newGlobalTokenCookie.access_token) &&
    oldGlobalCookie.access_token === newGlobalTokenCookie.access_token
  ) {
    return url.replace(
      ACEESS_TOKEN_REGEX,
      `$1${newGlobalTokenCookie.access_token}$2`
    );
  } else if (oldGlobalCookie && !oldGlobalCookie.access_token) {
    return url.replace(
      ACEESS_TOKEN_REGEX,
      `$1${newGlobalTokenCookie.access_token}$2`
    );
  } else {
    return url.replace(
      oldGlobalCookie.access_token,
      newGlobalTokenCookie.access_token
    );
  }
}

async function replaceOldCustomerCookie(url, newCustomerCookie) {
  let oldCustomerCookie = JSON.parse(Cookie.getCookie(CUSTOMER_ACCESS_TOKEN));
  await Cookie.deleteCookie(CUSTOMER_ACCESS_TOKEN);
  await Cookie.createCookie(
    CUSTOMER_ACCESS_TOKEN,
    JSON.stringify(newCustomerCookie)
  );
  if (
    !url.includes(newCustomerCookie.access_token) &&
    oldCustomerCookie.access_token === newCustomerCookie.access_token
  ) {
    return url.replace(
      ACEESS_TOKEN_REGEX,
      `$1${newCustomerCookie.access_token}$2`
    );
  } else if (oldCustomerCookie && !oldCustomerCookie.access_token) {
    return url.replace(
      ACEESS_TOKEN_REGEX,
      `$1${newCustomerCookie.access_token}$2`
    );
  } else {
    return url.replace(
      oldCustomerCookie.access_token,
      newCustomerCookie.access_token
    );
  }
}
async function replaceOldCartCookieForLoggedInUser(url, newCustomerCookie) {
  let oldCustomerCookie = JSON.parse(
    Cookie.getCookie(CART_DETAILS_FOR_LOGGED_IN_USER)
  );
  Cookie.deleteCookie(CART_DETAILS_FOR_LOGGED_IN_USER);
  Cookie.createCookie(
    CART_DETAILS_FOR_LOGGED_IN_USER,
    JSON.stringify(newCustomerCookie)
  );
  return url.replace(oldCustomerCookie.code, newCustomerCookie.code);
}

async function replaceOldCartCookieForAnonymnous(url, newCustomerCookie) {
  let oldCustomerCookie = JSON.parse(
    Cookie.getCookie(CART_DETAILS_FOR_ANONYMOUS)
  );

  Cookie.deleteCookie(CART_DETAILS_FOR_ANONYMOUS);
  Cookie.createCookie(
    CART_DETAILS_FOR_ANONYMOUS,
    JSON.stringify(newCustomerCookie)
  );
  return url.replace(oldCustomerCookie.guid, newCustomerCookie.guid);
}

export async function refreshCustomerAccessToken() {
  let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
  if (!JSON.parse(customerCookie).refresh_token) {
    throw new Error("No refresh token for expired customer access token");
  }
  const refreshTokenResponse = await post(
    `${TOKEN_PATH}?refresh_token=${
      JSON.parse(customerCookie).refresh_token
    }&client_id=${CLIENT_ID}&client_secret=secret&grant_type=refresh_token`
  );
  let refreshTokenResultJson = await refreshTokenResponse.json();
  //Invalid refresh token scenario
  if (
    refreshTokenResultJson.errors &&
    refreshTokenResultJson.errors[0] &&
    refreshTokenResultJson.errors[0].type === "InvalidGrantError"
  ) {
    return null;
  }

  return refreshTokenResultJson;
}

export async function refreshGlobalAccessToken() {
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

async function refreshCartId() {
  const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
  const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);

  if (userDetails && customerCookie) {
    return await refreshCartIdForLoggedUser();
  } else {
    return await refreshCartIdForAnonymous();
  }
}

async function refreshCartIdForLoggedUser() {
  const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
  const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);

  const resultForGetCartId = await get(
    `${USER_CART_PATH}/${JSON.parse(userDetails).userName}/carts?access_token=${
      JSON.parse(customerCookie).access_token
    }&isPwa=true`
  );
  const resultForGetCartIdJson = await resultForGetCartId.json();
  const errorStatusForGetCartIdObj = ErrorHandling.getFailureResponse(
    resultForGetCartIdJson
  );
  if (
    errorStatusForGetCartIdObj.status ||
    !resultForGetCartIdJson ||
    !resultForGetCartIdJson.code
  ) {
    const resultForCreateCartId = await post(
      `${USER_CART_PATH}/${
        JSON.parse(userDetails).userName
      }/carts?access_token=${
        JSON.parse(customerCookie).access_token
      }&isPwa=true`
    );
    const resultForCreateCartIdJson = await resultForCreateCartId.json();
    const errorStatusForCreateCartObj = ErrorHandling.getFailureResponse(
      resultForCreateCartIdJson
    );
    if (errorStatusForCreateCartObj.status) {
      return null;
    }
    return resultForCreateCartIdJson;
  }
  return resultForGetCartIdJson;
}
async function refreshCartIdForAnonymous() {
  let globalCookie = Cookie.getCookie(GLOBAL_ACCESS_TOKEN);
  const resultForCreateCartId = await post(
    `${USER_CART_PATH}/anonymous/carts?access_token=${
      JSON.parse(globalCookie).access_token
    }&isPwa=true`
  );
  const resultForCreateCartIdJson = await resultForCreateCartId.json();
  const errorStatusForCreateCartObj = ErrorHandling.getFailureResponse(
    resultForCreateCartIdJson
  );
  if (errorStatusForCreateCartObj.status) {
    return null;
  }
  return resultForCreateCartIdJson;
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
function isCartNotFoundError(resultJson) {
  return (
    resultJson &&
    resultJson.errors &&
    resultJson.errors[0] &&
    resultJson.errors[0].type === CART_NOT_FOUND_ERROR
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
  let url = `${JUS_PAY_API_URL_ROOT}/${path}`;
  return await fetch(url, {
    method: "POST",
    body: postData
  });
}

export async function postStripe(postData) {
  if (window.Stripe) {
    const stripe = window.Stripe;
    stripe.setPublishableKey(STRIPE_ACCESTOKEN);
    let stripeResponse = new Promise(function(resolve, reject) {
      stripe.card.createToken(postData, (status, response) => {
        resolve(response);
      });
    });
    return await stripeResponse.then(function(result) {
      return result;
    });
  }
}

export async function postJusPayUrlEncode(path, postData) {
  let url = `${JUS_PAY_API_URL_ROOT}/${path}`;
  return await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    },
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
export async function corePostByUrlEncoded(path, postData) {
  const url = `${API_URL_ROOT}/${path}`;
  return await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: postData
  });
}

export async function pdpOffersApi(code, sellerId, categoryCode, brandCode) {
  let accessToken = JSON.parse(Cookie.getCookie(GLOBAL_ACCESS_TOKEN));
  const customerToken = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
  if (customerToken) {
    accessToken = JSON.parse(customerToken);
  }
  return await fetch(
    API_URL_ROOT +
      "/v2/mpl/products/" +
      code +
      "/voucherSequence?access_token=" +
      accessToken.access_token +
      "&sellerId=" +
      sellerId +
      "&categoryCode=" +
      categoryCode +
      "&brandCode=" +
      brandCode +
      "&channel=web&updatedFlag=true"
  );
}
export async function pdpManufacturersApi(categoryCode, brandCode) {
  return await fetch(
    API_URL_ROOT +
      "/v2/mpl/products/manufacturingdetails?category=" +
      categoryCode +
      "&brand=" +
      brandCode
  );
}
export async function getPlpBanners(categoryCode) {
  return await fetch(
    API_URL_ROOT + "/v2/mpl/cms/plpBanners?categoryCode=" + categoryCode
  );
}
//created custom function only to call tataque api
//previous functions are using tatacliq
export async function customGetMiddlewareUrl(url) {
  let APIUrl = "https://www.tataque.com" + url;
  return await fetch(APIUrl);
}
export async function postWithoutApiUrlRoot(url, postData) {
  return await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(postData)
  });
}

export async function getDataWithMicroservicesWithHeaders(path, headers) {
  const url = `${URL_ROOT}/${path}`;
  return await fetch(url, {
    method: "GET",
    headers: headers
  });
}

// OnlineSales fetch
export async function getOnlineSalesAds(componentName, pageType) {
  const objWindow = window;
  if (objWindow._osFetchBrandAds) {
    return await objWindow
      ._osFetchBrandAds({
        au: componentName,
        pt: pageType
      })
      .then(response => {
        if (response) {
          let ifNoData = false;
          if (!response.ads) {
            ifNoData = true;
            console.error(`Error: ${NO_DATA}`);
          } else if (response.ads.length <= 0) {
            ifNoData = true;
            console.error(`Error: ${NO_DATA}`);
          } else if (response.ads.length > 0 && !response.ads[0]) {
            ifNoData = true;
            console.error(`Error: ${NO_DATA}`);
          }
          if (ifNoData) {
            return null;
          }
        }
        return response;
      })
      .catch(err => {
        console.error(err);
        return null;
      });
  }
}
