import * as userActions from "../actions/user.actions";
import { CLEAR_ERROR } from "../../general/error.actions.js";
import * as Cookies from "../../lib/Cookie";
import {
  GLOBAL_ACCESS_TOKEN,
  CUSTOMER_ACCESS_TOKEN,
  REFRESH_TOKEN,
  LOGGED_IN_USER_DETAILS
} from "../../lib/constants";
const user = (
  state = {
    user: null,
    status: null,
    error: null,
    loading: false,
    message: null,
    isLoggedIn: false
  },
  action
) => {
  let userDetails = {};
  switch (action.type) {
    case CLEAR_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: null,
        status: null
      });
    case userActions.LOGIN_USER_REQUEST:
      return Object.assign({}, state, {
        status: action.status,
        loading: true
      });

    case userActions.LOGIN_USER_SUCCESS:
      userDetails.userName = action.userName;
      userDetails.customerId = action.user.customerId;
      userDetails.dateOfBirth = action.user.customerInfo.dateOfBirth;
      userDetails.firstName = action.user.customerInfo.firstName;
      userDetails.gender = action.user.customerInfo.gender;
      userDetails.lastName = action.user.customerInfo.lastName;

      Cookies.createCookie(LOGGED_IN_USER_DETAILS, JSON.stringify(userDetails));
      return Object.assign({}, state, {
        status: action.status,
        user: action.user,
        loading: false,
        isLoggedIn: true
      });
    case userActions.LOGIN_USER_FAILURE:
      return Object.assign({}, state, {
        status: action.status,
        error: action.error,
        loading: false,
        isLoggedIn: false
      });

    case userActions.SIGN_UP_USER_REQUEST:
      return Object.assign({}, state, {
        status: action.status,
        loading: true
      });

    case userActions.SIGN_UP_USER_SUCCESS:
      return Object.assign({}, state, {
        status: action.status,
        loading: false
      });
    case userActions.SIGN_UP_USER_FAILURE:
      return Object.assign({}, state, {
        status: action.status,
        error: action.error,
        loading: false
      });

    case userActions.OTP_VERIFICATION_REQUEST:
      return Object.assign({}, state, {
        status: action.status,
        loading: true,
        isLoggedIn: false
      });

    case userActions.OTP_VERIFICATION_SUCCESS:
      userDetails = {};
      userDetails.userName = action.userName;
      userDetails.customerId = action.user.customerInfo.customerId;
      userDetails.dateOfBirth = action.user.customerInfo.dateOfBirth;
      userDetails.firstName = action.user.customerInfo.firstName;
      userDetails.gender = action.user.customerInfo.gender;
      userDetails.lastName = action.user.customerInfo.lastName;
      Cookies.createCookie(LOGGED_IN_USER_DETAILS, JSON.stringify(userDetails));

      return Object.assign({}, state, {
        status: action.status,
        user: action.user,
        loading: false,
        isLoggedIn: true
      });

    case userActions.OTP_VERIFICATION_FAILURE:
      return Object.assign({}, state, {
        status: action.status,
        error: action.error,
        loading: false,
        isLoggedIn: false
      });

    case userActions.FORGOT_PASSWORD_REQUEST:
      return Object.assign({}, state, {
        status: action.status,
        loading: true
      });

    case userActions.FORGOT_PASSWORD_SUCCESS:
      return Object.assign({}, state, {
        status: action.status,
        loading: false,
        message: action.message
      });

    case userActions.FORGOT_PASSWORD_FAILURE:
      return Object.assign({}, state, {
        status: action.status,
        loading: false,
        error: action.error
      });

    case userActions.FORGOT_PASSWORD_OTP_VERIFICATION_REQUEST:
      return Object.assign({}, state, {
        status: action.status,
        loading: true
      });

    case userActions.FORGOT_PASSWORD_OTP_VERIFICATION_SUCCESS:
      return Object.assign({}, state, {
        status: action.status,
        loading: false,
        message: action.message
      });

    case userActions.FORGOT_PASSWORD_OTP_VERIFICATION_FAILURE:
      return Object.assign({}, state, {
        status: action.status,
        loading: false,
        error: action.error
      });

    case userActions.RESET_PASSWORD_REQUEST:
      return Object.assign({}, state, {
        status: action.status,
        loading: true
      });

    case userActions.RESET_PASSWORD_SUCCESS:
      return Object.assign({}, state, {
        status: action.status,
        loading: false,
        message: action.message
      });

    case userActions.RESET_PASSWORD_FAILURE:
      return Object.assign({}, state, {
        status: action.status,
        loading: false,
        error: action.error
      });

    case userActions.GLOBAL_ACCESS_TOKEN_REQUEST:
      return Object.assign({}, state, {
        status: action.status,
        loading: true
      });

    case userActions.GLOBAL_ACCESS_TOKEN_SUCCESS:
      Cookies.createCookie(
        GLOBAL_ACCESS_TOKEN,
        JSON.stringify(action.globalAccessTokenDetails),
        action.globalAccessTokenDetails.expires_in
      );

      return Object.assign({}, state, {
        status: action.status,
        loading: false
      });

    case userActions.GLOBAL_ACCESS_TOKEN_FAILURE:
      return Object.assign({}, state, {
        status: action.status,
        loading: false,
        error: action.error
      });

    case userActions.CUSTOMER_ACCESS_TOKEN_REQUEST:
      return Object.assign({}, state, {
        status: action.status,
        loading: true
      });

    case userActions.CUSTOMER_ACCESS_TOKEN_SUCCESS:
      Cookies.createCookie(
        CUSTOMER_ACCESS_TOKEN,
        JSON.stringify(action.customerAccessTokenDetails),
        action.customerAccessTokenDetails.expires_in
      );
      localStorage.setItem(
        REFRESH_TOKEN,
        action.customerAccessTokenDetails.refresh_token
      );

      return Object.assign({}, state, {
        status: action.status,
        loading: false
      });

    case userActions.CUSTOMER_ACCESS_TOKEN_FAILURE:
      return Object.assign({}, state, {
        status: action.status,
        loading: false,
        error: action.error
      });
    case userActions.FACE_BOOK_LOGIN_REQUEST:
      return Object.assign({}, state, {
        status: action.status,
        loading: true
      });

    case userActions.FACE_BOOK_LOGIN_FAILURE:
      return Object.assign({}, state, {
        status: action.status,
        loading: false,
        error: action.error
      });

    case userActions.GOOGLE_PLUS_LOGIN_REQUEST:
      return Object.assign({}, state, {
        status: action.status,
        loading: true
      });

    case userActions.GOOGLE_PLUS_LOGIN_FAILURE:
      return Object.assign({}, state, {
        status: action.status,
        loading: false,
        error: action.error
      });

    case userActions.GENERATE_CUSTOMER_LEVEL_ACCESS_TOKEN_REQUEST:
      return Object.assign({}, state, {
        status: action.status,
        loading: true
      });

    case userActions.GENERATE_CUSTOMER_LEVEL_ACCESS_TOKEN_FAILURE:
      return Object.assign({}, state, {
        status: action.status,
        loading: false,
        error: action.error
      });

    case userActions.SOCIAL_MEDIA_REGISTRATION_REQUEST:
      return Object.assign({}, state, {
        status: action.status,
        loading: true
      });

    case userActions.SOCIAL_MEDIA_REGISTRATION_SUCCESS:
      return Object.assign({}, state, {
        status: action.status,
        loading: false,
        user: action.user
      });

    case userActions.SOCIAL_MEDIA_REGISTRATION_FAILURE:
      return Object.assign({}, state, {
        status: action.status,
        loading: false,
        error: action.error
      });

    case userActions.SOCIAL_MEDIA_LOGIN_REQUEST:
      return Object.assign({}, state, {
        status: action.status,
        loading: true,
        isLoggedIn: false
      });

    case userActions.SOCIAL_MEDIA_LOGIN_SUCCESS:
      userDetails.userName = action.user.customerInfo.emailId;
      userDetails.customerId = action.user.customerId;

      Cookies.createCookie(LOGGED_IN_USER_DETAILS, JSON.stringify(userDetails));
      return Object.assign({}, state, {
        status: action.status,
        loading: false,
        user: action.user,
        isLoggedIn: true
      });

    case userActions.SOCIAL_MEDIA_LOGIN_FAILURE:
      return Object.assign({}, state, {
        status: action.status,
        loading: false,
        error: action.error,
        isLoggedIn: false
      });

    case userActions.REFRESH_TOKEN_REQUEST:
      return Object.assign({}, state, {
        status: action.status
      });

    case userActions.REFRESH_TOKEN_SUCCESS:
      Cookies.createCookie(
        CUSTOMER_ACCESS_TOKEN,
        JSON.stringify(action.customerAccessTokenDetails),
        action.customerAccessTokenDetails.expires_in
      );
      localStorage.setItem(
        REFRESH_TOKEN,
        action.customerAccessTokenDetails.refresh_token
      );

      return Object.assign({}, state, {
        status: action.status,
        loading: false
      });

    case userActions.REFRESH_TOKEN_FAILURE:
      localStorage.removeItem(REFRESH_TOKEN);
      return Object.assign({}, state, {
        status: action.status,
        loading: false,
        error: action.error
      });

    default:
      return state;
  }
};

export default user;
