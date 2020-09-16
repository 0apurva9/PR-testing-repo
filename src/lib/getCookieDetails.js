import * as Cookie from "./Cookie";
import {
  GLOBAL_ACCESS_TOKEN,
  CUSTOMER_ACCESS_TOKEN,
  LOGGED_IN_USER_DETAILS,
  CART_DETAILS_FOR_LOGGED_IN_USER,
  CART_DETAILS_FOR_ANONYMOUS
} from "./constants";

export function getGlobalAccessToken() {
  const globalAccessTokenCookie = Cookie.getCookie(GLOBAL_ACCESS_TOKEN);
  const globalAccessToken =
    globalAccessTokenCookie && JSON.parse(globalAccessTokenCookie).access_token;
  return globalAccessToken;
}

export function getCustomerAccessToken() {
  const customerAccessTokenCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
  const customerAccessToken =
    customerAccessTokenCookie &&
    JSON.parse(customerAccessTokenCookie).access_token;
  return customerAccessToken;
}

export function getLoggedInUserDetails() {
  const loggedInUserDetailsCookie = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
  const loggedInUserDetails =
    loggedInUserDetailsCookie && JSON.parse(loggedInUserDetailsCookie);
  return loggedInUserDetails;
}

export function getCartDetailsForLoggedInUser() {
  const cartDetailsForLoggedInUserCookie = Cookie.getCookie(
    CART_DETAILS_FOR_LOGGED_IN_USER
  );
  const cartDetailsForLoggedInUser =
    cartDetailsForLoggedInUserCookie &&
    JSON.parse(cartDetailsForLoggedInUserCookie);
  return cartDetailsForLoggedInUser;
}

export function getCartDetailsForAnonymousInUser() {
  const cartDetailsForAnonymousInUserCookie = Cookie.getCookie(
    CART_DETAILS_FOR_ANONYMOUS
  );
  const cartDetailsForAnonymousInUser =
    cartDetailsForAnonymousInUserCookie &&
    JSON.parse(cartDetailsForAnonymousInUserCookie);
  return cartDetailsForAnonymousInUser;
}
