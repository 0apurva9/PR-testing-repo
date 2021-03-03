import { connect } from "react-redux";
import {
  loginUser,
  customerAccessToken,
  refreshToken,
  LOGIN_WITH_EMAIL
} from "../actions/user.actions";
import {
  mergeCartId,
  getCartId,
  tempCartIdForLoggedInUser,
  getCartCountForLoggedInUser,
  removeItemFromCartLoggedIn,
} from "../../cart/actions/cart.actions";
import * as Cookies from "../../lib/Cookie";
import { withRouter } from "react-router-dom";
import { showModal, RESTORE_PASSWORD } from "../../general/modal.actions.js";
import { getFeed } from "../../home/actions/home.actions";
import Login from "../components/Login.js";
import {
  SUCCESS,
  CART_DETAILS_FOR_ANONYMOUS,
  CART_DETAILS_FOR_LOGGED_IN_USER,
  ERROR,
  CUSTOMER_ACCESS_TOKEN,
  LOGGED_IN_USER_DETAILS,
  DEFAULT_PIN_CODE_LOCAL_STORAGE,
  PRODUCT_ADDED_TO_WISHLIST,
  CART_BAG_DETAILS,
  NON_LOGGED_IN_USER_DETAILS
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
import { getCartDetails } from "../../cart/actions/cart.actions.js";
import {
  createWishlist,
  addProductToWishList,
  getWishlist
} from "../../wishlist/actions/wishlist.actions";
import {
  showSecondaryLoader,
  hideSecondaryLoader
} from "../../general/secondaryLoader.actions.js";
import { retryPayment } from "../../account/actions/account.actions";
export const OTP_VERIFICATION_REQUIRED_MESSAGE = "OTP VERIFICATION REQUIRED";
const mapDispatchToProps = dispatch => {
  const currentBagObject = localStorage.getItem(CART_BAG_DETAILS);
  const currentBagCount = currentBagObject
    ? JSON.parse(currentBagObject).length
    : 0;
  return {
    displayToast: toastMessage => {
      dispatch(displayToast(toastMessage));
    },
    onForgotPassword: () => {
      dispatch(showModal(RESTORE_PASSWORD));
    },
    homeFeed: () => {
      dispatch(getFeed());
    },
    clearUrlToRedirectToAfterAuth: () => {
      dispatch(clearUrlToRedirectToAfterAuth());
    },
    onSubmit: async (userDetails, lastUrl) => {
      const userDetailsResponse = await dispatch(
        customerAccessToken(userDetails)
      );
      // checking condition for the failure customer access token api
      if (userDetailsResponse.status === ERROR) {
        let userDetailsType = {};
        Object.assign(userDetailsType, {
          loginType: LOGIN_WITH_EMAIL,
          customerId: userDetails.username
        });
        Cookies.createCookie(
          NON_LOGGED_IN_USER_DETAILS,
          JSON.stringify(userDetailsType)
        );
        setDataLayerForLogin(ADOBE_DIRECT_CALL_FOR_LOGIN_FAILURE);
        dispatch(singleAuthCallHasFailed(userDetailsResponse.error));
      } else if (userDetailsResponse.status === SUCCESS) {
        const loginUserResponse = await dispatch(loginUser(userDetails));
        if (loginUserResponse.status === SUCCESS) {
          setDataLayerForLogin(ADOBE_DIRECT_CALL_FOR_LOGIN_SUCCESS, lastUrl);
          // Get cartDetails if user already has cart created
          const cartVal = await dispatch(getCartId());
          let guid;
          let cartCode;
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
                    parseInt(
                      mergeCartIdWithOldOneResponse.cartDetails.count,
                      10
                    ) !== currentBagCount
                    ? true
                    : false
                )
              );
              // At the time of login Get Cart GUID for logged-in user
              guid = JSON.parse(cartDetailsLoggedInUser).guid;
              cartCode = JSON.parse(cartDetailsLoggedInUser).code;
              const existingWishList = await dispatch(getWishlist());

              if (!existingWishList || !existingWishList.wishlist) {
                dispatch(createWishlist());
              }
              dispatch(setIfAllAuthCallsHaveSucceeded());
            } else if (mergeCartIdWithOldOneResponse.status === ERROR) {
              Cookies.deleteCookie(CART_DETAILS_FOR_ANONYMOUS);
              guid = cartVal;
              cartCode = cartVal.cartDetails.code;
              dispatch(setIfAllAuthCallsHaveSucceeded());
            }
            //end of  merge old cart id with anonymous cart id
          } else {
            // If cart is not available check if cartDetailsForAnonymous is created
            let cartDetailsAnonymous = Cookies.getCookie(
              CART_DETAILS_FOR_ANONYMOUS
            );
            if (cartDetailsAnonymous) {
              let anonymousCart = JSON.parse(cartDetailsAnonymous);
              if (anonymousCart.guid) {
                // Create a new cart using Anonymous cartGUID
                const mergeCartIdWithAnonymousResponse = await dispatch(
                  mergeCartId()
                );
                if (mergeCartIdWithAnonymousResponse.status === SUCCESS) {
                  const newCartDetailsLoggedInUser = Cookies.getCookie(
                    CART_DETAILS_FOR_LOGGED_IN_USER
                  );

                  guid = JSON.parse(newCartDetailsLoggedInUser).guid;
                  cartCode = JSON.parse(newCartDetailsLoggedInUser).code
                    ? JSON.parse(newCartDetailsLoggedInUser).code
                    : null;
                  dispatch(setIfAllAuthCallsHaveSucceeded());
                } else if (mergeCartIdWithAnonymousResponse.status === ERROR) {
                  Cookies.deleteCookie(CART_DETAILS_FOR_ANONYMOUS);
                  guid = anonymousCart;
                  cartCode = anonymousCart.guid ? anonymousCart.guid : null;
                  dispatch(setIfAllAuthCallsHaveSucceeded());
                }
              }
            }
            const existingWishList = await dispatch(getWishlist());
            if (!existingWishList || !existingWishList.wishlist) {
              dispatch(createWishlist());
            }
            dispatch(setIfAllAuthCallsHaveSucceeded());
            // dispatch(getCartCountForLoggedInUser());
          }

          if (guid) {
            // Get the bagCount if Cart GUID exists for Logged-in user
            await dispatch(
              getCartCountForLoggedInUser(
                typeof guid === "object" ? guid : null
              )
            );
          }
          if (cartCode) {
            // dispatch(getMinicartProducts());
          }
        } else {
          setDataLayerForLogin(ADOBE_DIRECT_CALL_FOR_LOGIN_FAILURE);
        }
      }
    },
    refreshToken: sessionData => {
      dispatch(refreshToken(sessionData));
    },
    tempCartIdForLoggedInUser: productDetails => {
      return dispatch(tempCartIdForLoggedInUser(productDetails));
    },
    addProductToWishList: async productObj => {
      const wishlistResponse = await dispatch(addProductToWishList(productObj));
      if (wishlistResponse.status === SUCCESS) {
        dispatch(showSecondaryLoader());
        const cartDetailsLoggedInUser = Cookies.getCookie(
          CART_DETAILS_FOR_LOGGED_IN_USER
        );

        //Get bag details before login
        const cartDetails = localStorage.getItem(CART_BAG_DETAILS);
        const cartDetailsCount = cartDetails
          ? JSON.parse(cartDetails).length
          : 0;
        const cartDetailsLoggedInUserCount = cartDetailsLoggedInUser
          ? parseInt(JSON.parse(cartDetailsLoggedInUser).count)
          : 0;
        if (productObj.index >= 0) {
          await dispatch(
            removeItemFromCartLoggedIn(
              cartDetailsLoggedInUserCount -
                cartDetailsCount +
                productObj.index,
              localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE)
            )
          );
        }
        dispatch(hideSecondaryLoader());
        dispatch(displayToast(PRODUCT_ADDED_TO_WISHLIST));
        dispatch(getWishlist());
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
    error: state.auth.error,
    redirectToAfterAuthUrl: state.auth.redirectToAfterAuthUrl,
    tempCartIdForLoggedInUserLoading:
      state.cart.tempCartIdForLoggedInUserLoading,
    loadingForAddProductToWishList:
      state.wishlistItems.loadingForAddProductToWishList,
    retryPaymentDetailsStatus: state.profile.retryPaymentDetailsStatus
  };
};

const LoginContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Login)
);

export default LoginContainer;
