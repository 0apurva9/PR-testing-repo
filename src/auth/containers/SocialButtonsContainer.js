import { connect } from "react-redux";
import SocialButtons from "../components/SocialButtons.js";
import {
  facebookLogin,
  googlePlusLogin,
  generateCustomerLevelAccessTokenForSocialMedia,
  socialMediaLogin,
  FACEBOOK_PLATFORM,
  SOCIAL_CHANNEL_FACEBOOK,
  GOOGLE_PLUS_PLATFORM,
  SOCIAL_CHANNEL_GOOGLE_PLUS,
  loginUserRequest,
  socialMediaRegistration,
  loadGoogleSignInApi,
  CUSTOMER_ACCESS_TOKEN_FAILURE
} from "../../auth/actions/user.actions";
import * as Cookies from "../../lib/Cookie";

import {
  singleAuthCallHasFailed,
  setIfAllAuthCallsHaveSucceeded,
  authCallsAreInProgress
} from "../../auth/actions/auth.actions";
import {
  mergeCartId,
  getCartId,
  getCartCountForLoggedInUser,
  getCartDetails,
  getMinicartProducts
} from "../../cart/actions/cart.actions";
import {
  SUCCESS,
  ERROR,
  CART_DETAILS_FOR_ANONYMOUS,
  CART_DETAILS_FOR_LOGGED_IN_USER,
  EMAIL_ID_ALREADY_NOT_EXIST_SIGN_UP,
  CART_BAG_DETAILS,
  LOGGED_IN_USER_DETAILS,
  DEFAULT_PIN_CODE_LOCAL_STORAGE,
  CUSTOMER_ACCESS_TOKEN
} from "../../lib/constants";
import {
  createWishlist,
  getWishlist
} from "../../wishlist/actions/wishlist.actions.js";
import { clearUrlToRedirectToAfterAuth } from "../../auth/actions/auth.actions.js";
import {
  setDataLayerForLogin,
  ADOBE_DIRECT_CALL_FOR_LOGIN_SUCCESS,
  ADOBE_DIRECT_CALL_FOR_LOGIN_FAILURE,
  setDataLayerForSignupProcess,
  ADOBE_SIGN_UP_START
} from "../../lib/adobeUtils";
const EMAIL_ID_DOSE_NOT_EXIST = "Email ID or phone number does not exist";

const mapDispatchToProps = dispatch => {
  const currentBagObject = localStorage.getItem(CART_BAG_DETAILS);
  const currentBagCount = currentBagObject
    ? JSON.parse(currentBagObject).length
    : 0;
  return {
    clearUrlToRedirectToAfterAuth: () => {
      dispatch(clearUrlToRedirectToAfterAuth());
    },
    loadGoogleSdk: async () => {
      const loadGoogleSdkResponse = await loadGoogleSignInApi();
      if (loadGoogleSdkResponse.status === ERROR) {
        dispatch(singleAuthCallHasFailed(loadGoogleSdkResponse.description));
        return;
      }
    },
    facebookLogin: async isSignUp => {
      dispatch(authCallsAreInProgress());
      const facebookResponse = await dispatch(facebookLogin(isSignUp));
      if (facebookResponse.status === ERROR) {
        dispatch(singleAuthCallHasFailed(facebookResponse.error));
        return;
      }
      // if user doesn't have any email id linked to their fb account then
      // we have to show toast that
      if (!facebookResponse.email) {
        dispatch(
          singleAuthCallHasFailed(
            "Something went wrong. Please try with different account"
          )
        );
        return;
      }

      if (isSignUp) {
        setDataLayerForSignupProcess(ADOBE_SIGN_UP_START);
        const signUpResponse = await dispatch(
          socialMediaRegistration(
            facebookResponse.email,
            facebookResponse.id,
            facebookResponse.accessToken,
            FACEBOOK_PLATFORM,
            SOCIAL_CHANNEL_FACEBOOK
          )
        );
        if (
          signUpResponse.status !== SUCCESS &&
          signUpResponse.error !== EMAIL_ID_ALREADY_NOT_EXIST_SIGN_UP
        ) {
          dispatch(singleAuthCallHasFailed(signUpResponse.error));
          return;
        }
      }

      let customerAccessTokenActionResponse = await dispatch(
        generateCustomerLevelAccessTokenForSocialMedia(
          facebookResponse.email,
          facebookResponse.id,
          facebookResponse.accessToken,
          FACEBOOK_PLATFORM,
          SOCIAL_CHANNEL_FACEBOOK
        )
      );

      if (
        customerAccessTokenActionResponse.type ===
          CUSTOMER_ACCESS_TOKEN_FAILURE &&
        customerAccessTokenActionResponse.error === EMAIL_ID_DOSE_NOT_EXIST
      ) {
        const signUpResponse = await dispatch(
          socialMediaRegistration(
            facebookResponse.email,
            facebookResponse.id,
            facebookResponse.accessToken,
            FACEBOOK_PLATFORM,
            SOCIAL_CHANNEL_FACEBOOK
          )
        );

        if (signUpResponse.status !== SUCCESS) {
          dispatch(singleAuthCallHasFailed(signUpResponse.error));
          return;
        }
        customerAccessTokenActionResponse = await dispatch(
          generateCustomerLevelAccessTokenForSocialMedia(
            facebookResponse.email,
            facebookResponse.id,
            facebookResponse.accessToken,
            FACEBOOK_PLATFORM,
            SOCIAL_CHANNEL_FACEBOOK
          )
        );
      }

      // now I need to actually login
      let profileImage;
      if (
        facebookResponse &&
        facebookResponse.profileImage &&
        facebookResponse.profileImage.data
      ) {
        profileImage = facebookResponse.profileImage.data.url;
      }
      if (customerAccessTokenActionResponse.status === SUCCESS) {
        const loginUserResponse = await dispatch(
          socialMediaLogin(
            facebookResponse.email,
            FACEBOOK_PLATFORM,
            customerAccessTokenActionResponse.customerAccessTokenDetails
              .access_token,
            {
              profileImage,
              firstName: facebookResponse.firstName,
              lastName: facebookResponse.lastName
            }
          )
        );

        if (loginUserResponse.status === SUCCESS) {
          setDataLayerForLogin(ADOBE_DIRECT_CALL_FOR_LOGIN_SUCCESS);
          const cartVal = await dispatch(getCartId());
          let guid;
          let cartCode;
          let lastUrl = window.location.pathname;
          if (
            cartVal.status === SUCCESS &&
            cartVal.cartDetails.guid &&
            cartVal.cartDetails.code
          ) {
            const mergeCartResponse = await dispatch(
              mergeCartId(cartVal.cartDetails.guid)
            );

            if (mergeCartResponse.status === SUCCESS) {
              const customerCookie = Cookies.getCookie(CUSTOMER_ACCESS_TOKEN);
              const userDetails = Cookies.getCookie(LOGGED_IN_USER_DETAILS);
              const cartDetailsLoggedInUser = Cookies.getCookie(
                CART_DETAILS_FOR_LOGGED_IN_USER
              );

              dispatch(
                getCartDetails(
                  userDetails && JSON.parse(userDetails).userName,
                  customerCookie && JSON.parse(customerCookie).access_token,
                  cartDetailsLoggedInUser &&
                    JSON.parse(cartDetailsLoggedInUser).code,
                  localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE),
                  lastUrl === "/cart" &&
                    parseInt(mergeCartResponse.cartDetails.count, 10) !==
                      currentBagCount
                    ? true
                    : false
                )
              );

              guid = JSON.parse(cartDetailsLoggedInUser).guid;
              cartCode = JSON.parse(cartDetailsLoggedInUser).code;
              const existingWishList = await dispatch(getWishlist());

              if (!existingWishList || !existingWishList.wishlist) {
                dispatch(createWishlist());
              }

              dispatch(setIfAllAuthCallsHaveSucceeded());
            } else {
              Cookies.deleteCookie(CART_DETAILS_FOR_ANONYMOUS);
              guid = cartVal;
              cartCode = cartVal.cartDetails.guid;
              dispatch(setIfAllAuthCallsHaveSucceeded());
            }
          } else {
            let cartDetailsAnonymous = Cookies.getCookie(
              CART_DETAILS_FOR_ANONYMOUS
            );
            if (cartDetailsAnonymous) {
              let anonymousCart = JSON.parse(cartDetailsAnonymous);
              if (anonymousCart.guid) {
                const mergeCartIdWithAnonymousResponse = await dispatch(
                  mergeCartId()
                );
                if (mergeCartIdWithAnonymousResponse.status === SUCCESS) {
                  const newCartDetailsLoggedInUser = Cookies.getCookie(
                    CART_DETAILS_FOR_LOGGED_IN_USER
                  );
                  guid = JSON.parse(newCartDetailsLoggedInUser).guid;
                  cartCode = JSON.parse(newCartDetailsLoggedInUser).code;
                  dispatch(setIfAllAuthCallsHaveSucceeded());
                } else if (mergeCartIdWithAnonymousResponse.status === ERROR) {
                  Cookies.deleteCookie(CART_DETAILS_FOR_ANONYMOUS);
                  guid = anonymousCart;
                  cartCode = anonymousCart.guid;
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
            await dispatch(
              getCartCountForLoggedInUser(
                typeof guid === "object" ? guid : null
              )
            );
          }
          if (cartCode) {
            dispatch(getMinicartProducts());
          }
        } else {
          setDataLayerForLogin(ADOBE_DIRECT_CALL_FOR_LOGIN_FAILURE);
          dispatch(singleAuthCallHasFailed(loginUserRequest.error));
        }
      } else {
        dispatch(
          singleAuthCallHasFailed(customerAccessTokenActionResponse.error)
        );
      }
    },
    googlePlusLogin: async isSignUp => {
      dispatch(authCallsAreInProgress());
      const googlePlusResponse = await dispatch(googlePlusLogin(isSignUp));
      if (googlePlusResponse.status && googlePlusResponse.status !== SUCCESS) {
        dispatch(singleAuthCallHasFailed());
        return;
      }

      if (isSignUp) {
        setDataLayerForSignupProcess(ADOBE_SIGN_UP_START);
        const signUpResponse = await dispatch(
          socialMediaRegistration(
            googlePlusResponse.email,
            googlePlusResponse.email,
            googlePlusResponse.id,
            GOOGLE_PLUS_PLATFORM,
            SOCIAL_CHANNEL_GOOGLE_PLUS
          )
        );
        if (
          signUpResponse.status !== SUCCESS &&
          signUpResponse.error !== EMAIL_ID_ALREADY_NOT_EXIST_SIGN_UP
        ) {
          dispatch(singleAuthCallHasFailed(signUpResponse.error));
          return;
        }
      }

      let customerAccessTokenActionResponse = await dispatch(
        generateCustomerLevelAccessTokenForSocialMedia(
          googlePlusResponse.email,
          googlePlusResponse.id,
          googlePlusResponse.id_token,
          GOOGLE_PLUS_PLATFORM,
          SOCIAL_CHANNEL_GOOGLE_PLUS
        )
      );

      if (
        customerAccessTokenActionResponse.type ===
          CUSTOMER_ACCESS_TOKEN_FAILURE &&
        customerAccessTokenActionResponse.error === EMAIL_ID_DOSE_NOT_EXIST
      ) {
        const signUpResponse = await dispatch(
          socialMediaRegistration(
            googlePlusResponse.email,
            googlePlusResponse.email,
            googlePlusResponse.id,
            GOOGLE_PLUS_PLATFORM,
            SOCIAL_CHANNEL_GOOGLE_PLUS
          )
        );
        if (signUpResponse.status !== SUCCESS) {
          dispatch(singleAuthCallHasFailed(signUpResponse.error));
          return;
        }
        customerAccessTokenActionResponse = await dispatch(
          generateCustomerLevelAccessTokenForSocialMedia(
            googlePlusResponse.email,
            googlePlusResponse.id,
            googlePlusResponse.id_token,
            GOOGLE_PLUS_PLATFORM,
            SOCIAL_CHANNEL_GOOGLE_PLUS
          )
        );
      }
      if (customerAccessTokenActionResponse.status === SUCCESS) {
        const loginUserResponse = await dispatch(
          socialMediaLogin(
            googlePlusResponse.email,
            GOOGLE_PLUS_PLATFORM,
            customerAccessTokenActionResponse.customerAccessTokenDetails
              .access_token,
            {
              profileImage: googlePlusResponse.profileImage,
              firstName: googlePlusResponse.firstName,
              lastName: googlePlusResponse.lastName
            }
          )
        );
        if (loginUserResponse.status === SUCCESS) {
          setDataLayerForLogin(ADOBE_DIRECT_CALL_FOR_LOGIN_SUCCESS);
          const cartVal = await dispatch(getCartId());
          let guid;
          let cartCode;
          let lastUrl = window.location.pathname;
          if (
            cartVal.status === SUCCESS &&
            cartVal.cartDetails &&
            cartVal.cartDetails.guid &&
            cartVal.cartDetails.code
          ) {
            const mergeCartResponse = await dispatch(
              mergeCartId(cartVal.cartDetails.guid)
            );

            if (mergeCartResponse.status === SUCCESS) {
              const customerCookie = Cookies.getCookie(CUSTOMER_ACCESS_TOKEN);
              const userDetails = Cookies.getCookie(LOGGED_IN_USER_DETAILS);
              const cartDetailsLoggedInUser = Cookies.getCookie(
                CART_DETAILS_FOR_LOGGED_IN_USER
              );
              dispatch(
                getCartDetails(
                  userDetails && JSON.parse(userDetails).userName,
                  customerCookie && JSON.parse(customerCookie).access_token,
                  cartDetailsLoggedInUser &&
                    JSON.parse(cartDetailsLoggedInUser).code,
                  localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE),
                  lastUrl === "/cart" &&
                    parseInt(mergeCartResponse.cartDetails.count, 10) !==
                      currentBagCount
                    ? true
                    : false
                )
              );
              guid = JSON.parse(cartDetailsLoggedInUser).guid;
              cartCode = JSON.parse(cartDetailsLoggedInUser).code;
              const existingWishList = await dispatch(getWishlist());

              if (!existingWishList || !existingWishList.wishlist) {
                dispatch(createWishlist());
              }
              dispatch(setIfAllAuthCallsHaveSucceeded());
            } else {
              Cookies.deleteCookie(CART_DETAILS_FOR_ANONYMOUS);
              guid = cartVal;
              cartCode = cartVal.cartDetails.code;
              dispatch(setIfAllAuthCallsHaveSucceeded());

              // merge cart has failed, so all I need to do is remove the cart details for anonymous
              // and use the cart as a logged in cart.
            }
          } else {
            let cartDetailsAnonymous = Cookies.getCookie(
              CART_DETAILS_FOR_ANONYMOUS
            );
            if (cartDetailsAnonymous) {
              let anonymousCart = JSON.parse(cartDetailsAnonymous);
              if (anonymousCart.guid) {
                const mergeCartIdWithAnonymousResponse = await dispatch(
                  mergeCartId()
                );
                if (mergeCartIdWithAnonymousResponse.status === SUCCESS) {
                  const newCartDetailsLoggedInUser = Cookies.getCookie(
                    CART_DETAILS_FOR_LOGGED_IN_USER
                  );
                  guid = JSON.parse(newCartDetailsLoggedInUser).guid;
                  cartCode = JSON.parse(newCartDetailsLoggedInUser).code;
                  dispatch(setIfAllAuthCallsHaveSucceeded());
                } else if (mergeCartIdWithAnonymousResponse.status === ERROR) {
                  Cookies.deleteCookie(CART_DETAILS_FOR_ANONYMOUS);
                  guid = anonymousCart;
                  cartCode = anonymousCart.guid;
                  dispatch(setIfAllAuthCallsHaveSucceeded());
                }
              }
            }
            const existingWishList = await dispatch(getWishlist());

            if (!existingWishList || !existingWishList.wishlist) {
              dispatch(createWishlist());
            }
            dispatch(setIfAllAuthCallsHaveSucceeded());
          }
          if (guid) {
            await dispatch(
              getCartCountForLoggedInUser(
                typeof guid === "object" ? guid : null
              )
            );
          }
          if (cartCode) {
            dispatch(getMinicartProducts());
          }
        } else {
          dispatch(singleAuthCallHasFailed(loginUserRequest.error));
        }
      } else {
        dispatch(
          singleAuthCallHasFailed(customerAccessTokenActionResponse.error)
        );
      }
    }
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    signUp: ownProps.isSignUp,
    redirectToAfterAuthUrl: state.auth.redirectToAfterAuthUrl
  };
};

const SocialButtonsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SocialButtons);

export default SocialButtonsContainer;
