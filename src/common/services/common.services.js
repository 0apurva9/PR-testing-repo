import {
  CUSTOMER_ACCESS_TOKEN,
  LOGGED_IN_USER_DETAILS
} from "./../../lib/constants";
import * as Cookies from "./../../lib/Cookie";

import {
  refreshCustomerAccessToken,
  logoutUserOnInvalidRefreshToken
} from "./../../lib/apiRequest";

export async function getCustomerAccessToken() {
  let customerCookie = Cookies.getCookie(CUSTOMER_ACCESS_TOKEN);
  if (!JSON.parse(customerCookie).access_token) {
    try {
      let refreshCustomerToken = await refreshCustomerAccessToken();
      if (!refreshCustomerToken) {
        let userDetails = Cookies.getCookie(LOGGED_IN_USER_DETAILS);
        if (userDetails) {
          logoutUserOnInvalidRefreshToken();
        }
      } else {
        Cookies.deleteCookie(CUSTOMER_ACCESS_TOKEN);
        Cookies.createCookie(
          CUSTOMER_ACCESS_TOKEN,
          JSON.stringify(refreshCustomerToken)
        );

        return JSON.parse(Cookies.getCookie(CUSTOMER_ACCESS_TOKEN))
          .access_token;
      }
    } catch (error) {
      let userDetails = Cookies.getCookie(LOGGED_IN_USER_DETAILS);
      if (userDetails) {
        logoutUserOnInvalidRefreshToken();
      }
    }
  } else {
    return JSON.parse(customerCookie).access_token;
  }
}

export function getLoggedInUserDetails() {
  const loggedInUserDetailsCookie = Cookies.getCookie(LOGGED_IN_USER_DETAILS);
  const loggedInUserDetails =
    loggedInUserDetailsCookie && JSON.parse(loggedInUserDetailsCookie);
  return loggedInUserDetails;
}

export function initiateHaptikScript() {
  const f = document.getElementsByTagName("SCRIPT")[0];
  const p = document.createElement("SCRIPT");
  const timestamp = new Date().getTime();
  const source_url = process.env.HAPTIK_CHATBOT_URL + "/static/aspectwise/js/haptik.js?" + timestamp;
  p.type = "text/javascript";
  p.setAttribute("charset", "utf-8");
  p.setAttribute("clientid", "tatacliq");
  p.async = true;
  p.id = "buzzosrc";
  p.src = source_url;
  if (!document.getElementById("buzzosrc")) {
      f.parentNode.insertBefore(p, f);
  }
}