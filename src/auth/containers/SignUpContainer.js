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
  CART_BAG_DETAILS
} from "../../lib/constants";
import {
  signUpUser,
  customerAccessToken
} from "../../auth/actions/user.actions";
import {
  mergeCartId,
  getCartDetails,
  getCartCountForLoggedInUser,
} from "../../cart/actions/cart.actions";
import {
  createWishlist,
  addProductToWishList
} from "../../wishlist/actions/wishlist.actions";
import * as Cookies from "../../lib/Cookie";
import SignUp from "../components/SignUp.js";
import {
  setDataLayerForSignupProcess,
  ADOBE_SIGN_UP_START,
  ADOBE_SIGN_UP_SUCCESS
} from "../../lib/adobeUtils.js";
import {
  singleAuthCallHasFailed,
  setIfAllAuthCallsHaveSucceeded
} from "../../auth/actions/auth.actions.js";
import { retryPayment } from "../../account/actions/account.actions";
const mapDispatchToProps = dispatch => {
  const currentBagObject = localStorage.getItem(CART_BAG_DETAILS);
  const currentBagCount = currentBagObject
    ? JSON.parse(currentBagObject).length
    : 0;
  return {
    onSubmit: async (userSignUpDetails, lastUrl) => {
      setDataLayerForSignupProcess(ADOBE_SIGN_UP_START);
      const signUpResult = await dispatch(signUpUser(userSignUpDetails));
      if (signUpResult.status === SUCCESS) {
        const customerAccessResponse = await dispatch(
          customerAccessToken(userSignUpDetails)
        );
        if (customerAccessResponse.status === SUCCESS) {
          setDataLayerForSignupProcess(ADOBE_SIGN_UP_SUCCESS);
          await dispatch(createWishlist());
          const mergeCartIdResponse = await dispatch(mergeCartId());
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
                localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE),
                lastUrl === "/cart" &&
                parseInt(mergeCartIdResponse.cartDetails.count, 10) !==
                  currentBagCount
                  ? true
                  : false
              )
            );
            dispatch(setIfAllAuthCallsHaveSucceeded());
            await dispatch(getCartCountForLoggedInUser());
          } else {
            Cookies.deleteCookie(CART_DETAILS_FOR_ANONYMOUS);
            dispatch(setIfAllAuthCallsHaveSucceeded());
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
    },
    retryPayment: (retryPaymentGuId, retryPaymentUserId) => {
      return dispatch(retryPayment(retryPaymentGuId, retryPaymentUserId));
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
      state.wishlistItems.loadingForAddProductToWishList,
    retryPaymentDetailsStatus: state.profile.retryPaymentDetailsStatus
  };
};

const SignUpContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SignUp)
);
export default SignUpContainer;
