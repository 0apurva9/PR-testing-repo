import { connect } from "react-redux";
import {
  loginUser,
  customerAccessToken,
  refreshToken,
  loginUserRequest
} from "../actions/user.actions";
import {
  mergeCartId,
  generateCartIdForLoggedInUser,
  getCartId
} from "../../cart/actions/cart.actions";
import * as Cookies from "../../lib/Cookie";

import { withRouter } from "react-router-dom";
import {
  showModal,
  RESTORE_PASSWORD,
  OTP_LOGIN_MODAL
} from "../../general/modal.actions.js";
import { homeFeed } from "../../home/actions/home.actions";
import Login from "../components/Login.js";
import {
  SUCCESS,
  CART_DETAILS_FOR_ANONYMOUS,
  CART_DETAILS_FOR_LOGGED_IN_USER,
  ERROR
} from "../../lib/constants";
import { displayToast } from "../../general/toast.actions";
import { clearUrlToRedirectToAfterAuth } from "../../auth/actions/auth.actions.js";

import {
  singleAuthCallHasFailed,
  setIfAllAuthCallsHaveSucceeded
} from "../../auth/actions/auth.actions";
import {
  setDataLayerForLogin,
  ADOBE_DIRECT_CALL_FOR_LOGIN_SUCCESS,
  ADOBE_DIRECT_CALL_FOR_LOGIN_FAILURE
} from "../../lib/adobeUtils";
export const OTP_VERIFICATION_REQUIRED_MESSAGE = "OTP VERIFICATION REQUIRED";

const mapDispatchToProps = dispatch => {
  return {
    displayToast: toastMessage => {
      dispatch(displayToast(toastMessage));
    },
    onForgotPassword: () => {
      dispatch(showModal(RESTORE_PASSWORD));
    },
    homeFeed: () => {
      dispatch(homeFeed());
    },
    clearUrlToRedirectToAfterAuth: () => {
      dispatch(clearUrlToRedirectToAfterAuth());
    },
    onSubmit: async userDetails => {
      const userDetailsResponse = await dispatch(
        customerAccessToken(userDetails)
      );
      // checking condition for the failure customer access token api
      if (userDetailsResponse.status === ERROR) {
        dispatch(singleAuthCallHasFailed(userDetailsResponse.error));
      } else if (userDetailsResponse.status === SUCCESS) {
        const loginUserResponse = await dispatch(loginUser(userDetails));
        if (loginUserResponse.status === SUCCESS) {
          setDataLayerForLogin(ADOBE_DIRECT_CALL_FOR_LOGIN_SUCCESS);
          const cartVal = await dispatch(getCartId());
          if (
            cartVal.status === SUCCESS &&
            cartVal.cartDetails.guid &&
            cartVal.cartDetails.code
          ) {
            // if get old cart id then just merge it with anonymous cart id
            const mergeCartIdWithOldOneResponse = await dispatch(
              mergeCartId(cartVal.cartDetails.guid)
            );

            if (mergeCartIdWithOldOneResponse.status === SUCCESS) {
              dispatch(setIfAllAuthCallsHaveSucceeded());
            } else if (mergeCartIdWithOldOneResponse.status === ERROR) {
              Cookies.deleteCookie(CART_DETAILS_FOR_ANONYMOUS);
              Cookies.createCookie(
                CART_DETAILS_FOR_LOGGED_IN_USER,
                JSON.stringify(cartVal.cartDetails)
              );
              dispatch(setIfAllAuthCallsHaveSucceeded());
            }
            //end of  merge old cart id with anonymous cart id
          } else {
            // generating new cart if if wont get any existing cartId
            const newCartIdObj = await dispatch(
              generateCartIdForLoggedInUser()
            );

            if (newCartIdObj.status === SUCCESS) {
              const mergeCartIdResponse = await dispatch(
                mergeCartId(cartVal.cartDetails.guid)
              );
              // merging cart id with new cart id
              if (mergeCartIdResponse.status === SUCCESS) {
                dispatch(setIfAllAuthCallsHaveSucceeded());
              } else if (mergeCartIdResponse.status === ERROR) {
                Cookies.deleteCookie(CART_DETAILS_FOR_ANONYMOUS);
                Cookies.createCookie(
                  CART_DETAILS_FOR_LOGGED_IN_USER,
                  JSON.stringify(newCartIdObj.cartDetails)
                );
                dispatch(setIfAllAuthCallsHaveSucceeded());
              }
              // end of merging cart id with new cart id
            } else if (newCartIdObj.status === ERROR) {
              dispatch(singleAuthCallHasFailed(newCartIdObj.error));
            }
            // end of generating new cart if if wont get any existing cartId
          }
        } else if (
          loginUserResponse.error === OTP_VERIFICATION_REQUIRED_MESSAGE
        ) {
          dispatch(showModal(OTP_LOGIN_MODAL, userDetails));
        } else {
          setDataLayerForLogin(ADOBE_DIRECT_CALL_FOR_LOGIN_FAILURE);
        }
      }
    },
    refreshToken: sessionData => {
      dispatch(refreshToken(sessionData));
    }
  };
};

const mapStateToProps = state => {
  return {
    authCallsInProcess: state.auth.authCallsInProcess,
    authCallsIsSucceed: state.auth.authCallsIsSucceed,
    redirectToAfterAuthUrl: state.auth.redirectToAfterAuthUrl
  };
};

const LoginContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Login)
);

export default LoginContainer;
