import * as Cookie from "./Cookie";
import {
  CUSTOMER_ACCESS_TOKEN,
  LOGGED_IN_USER_DETAILS,
  CART_DETAILS_FOR_LOGGED_IN_USER
} from "./constants";
export function checkUserLoggedIn() {
  const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
  const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
  const cartDetailsForLoggedInUser = Cookie.getCookie(
    CART_DETAILS_FOR_LOGGED_IN_USER
  );
  return customerCookie && userDetails && cartDetailsForLoggedInUser;
}
