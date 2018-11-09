import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { displayToast } from "../../general/toast.actions.js";
import { clearUrlToRedirectToAfterAuth } from "../../auth/actions/auth.actions.js";
import {
  SUCCESS,
  FAILURE,
  CART_DETAILS_FOR_ANONYMOUS,
  CART_DETAILS_FOR_LOGGED_IN_USER,
  CUSTOMER_ACCESS_TOKEN,
  LOGGED_IN_USER_DETAILS,
  DEFAULT_PIN_CODE_LOCAL_STORAGE,
  PRODUCT_ADDED_TO_WISHLIST,
  ERROR
} from "../../lib/constants";
import {
  signUpUser,
  customerAccessToken
} from "../../auth/actions/user.actions";
import {
  mergeCartId,
  generateCartIdForLoggedInUser,
  getCartId,
  getCartDetails
} from "../../cart/actions/cart.actions";
import {
  createWishlist,
  addProductToWishList
} from "../../wishlist/actions/wishlist.actions";
import * as Cookies from "../../lib/Cookie";
import SignUp from "../components/SignUp.js";
import {
  setDataLayerForSignupProcess,
  ADOBE_SIGN_UP_START
} from "../../lib/adobeUtils.js";
import {
  singleAuthCallHasFailed,
  setIfAllAuthCallsHaveSucceeded
} from "../../auth/actions/auth.actions.js";
const mapDispatchToProps = dispatch => {
  return {
    onSubmit: async userSignUpDetails => {
      setDataLayerForSignupProcess(ADOBE_SIGN_UP_START);
      const signUpResult = await dispatch(signUpUser(userSignUpDetails));
      if (signUpResult.status === SUCCESS) {
        const customerAccessResponse = await dispatch(
          customerAccessToken(userSignUpDetails)
        );
        if (customerAccessResponse.status === SUCCESS) {
          const createdCartVal = await dispatch(
            generateCartIdForLoggedInUser()
          );
          if (createdCartVal.status === SUCCESS) {
            await dispatch(createWishlist());
            const mergeCartIdResponse = await dispatch(
              mergeCartId(createdCartVal.cartDetails.guid)
            );
            if (mergeCartIdResponse.status === SUCCESS) {
              const customerCookie = Cookies.getCookie(CUSTOMER_ACCESS_TOKEN);
              const userDetails = Cookies.getCookie(LOGGED_IN_USER_DETAILS);
              const cartDetailsLoggedInUser = Cookies.getCookie(
                CART_DETAILS_FOR_LOGGED_IN_USER
              );
              dispatch(
                getCartDetails(
                  JSON.parse(userDetails).userName,
                  JSON.parse(customerCookie).access_token,
                  JSON.parse(cartDetailsLoggedInUser).code,
                  localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE)
                )
              );
              dispatch(setIfAllAuthCallsHaveSucceeded());
            } else {
              Cookies.deleteCookie(CART_DETAILS_FOR_ANONYMOUS);
              Cookies.createCookie(
                CART_DETAILS_FOR_LOGGED_IN_USER,
                JSON.stringify(createdCartVal.cartDetails)
              );
              dispatch(setIfAllAuthCallsHaveSucceeded());
            }
          } else if (createdCartVal.status === FAILURE) {
            dispatch(singleAuthCallHasFailed(signUpResult.error));
          }
        } else if (customerAccessResponse.status === FAILURE) {
          dispatch(singleAuthCallHasFailed(signUpResult.error));
        }
      } else if (signUpResult.status === FAILURE) {
        dispatch(singleAuthCallHasFailed(signUpResult.error));
      }
    },
    displayToast: message => {
      dispatch(displayToast(message));
    },
    clearUrlToRedirectToAfterAuth: () => {
      dispatch(clearUrlToRedirectToAfterAuth());
    },
    addProductToWishList: async productObj => {
      const wishlistResponse = await dispatch(addProductToWishList(productObj));
      if (wishlistResponse.status === SUCCESS) {
        dispatch(displayToast(PRODUCT_ADDED_TO_WISHLIST));
      }
    }
  };
};

const mapStateToProps = state => {
  return {
    authCallsInProcess: state.auth.authCallsInProcess,
    authCallsIsSucceed: state.auth.authCallsIsSucceed,
    redirectToAfterAuthUrl: state.auth.redirectToAfterAuthUrl,
    tempCartIdForLoggedInUserLoading:
      state.cart.tempCartIdForLoggedInUserLoading,
    loadingForAddProductToWishList:
      state.wishlistItems.loadingForAddProductToWishList
  };
};

const SignUpContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SignUp)
);
export default SignUpContainer;
