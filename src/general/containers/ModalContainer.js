import { connect } from "react-redux";
import ModalRoot from "../components/ModalRoot.js";
import { withRouter } from "react-router-dom";
import * as modalActions from "../modal.actions.js";
import {
  resetPassword,
  otpVerification,
  forgotPassword,
  signUpUser,
  forgotPasswordOtpVerification,
  loginUser,
  loginUserRequest,
  customerAccessToken
} from "../../auth/actions/user.actions";
import {
  redeemCliqVoucher,
  removeAddress,
  cancelProduct
} from "../../account/actions/account.actions";
import {
  getTncForBankOffer,
  tempCartIdForLoggedInUser,
  getCartCountForLoggedInUser,
  getOrderUpdateOnWhatsapp,
  getMinicartProducts
} from "../../cart/actions/cart.actions";
import {
  SUCCESS,
  FAILURE,
  CART_DETAILS_FOR_ANONYMOUS,
  CART_DETAILS_FOR_LOGGED_IN_USER,
  ERROR_MESSAGE_FOR_VERIFY_OTP,
  CUSTOMER_ACCESS_TOKEN,
  LOGGED_IN_USER_DETAILS,
  DEFAULT_PIN_CODE_LOCAL_STORAGE,
  MY_ACCOUNT,
  MY_ACCOUNT_ORDERS_PAGE,
  ERROR
} from "../../lib/constants";
import {
  getAllStoresForCliqAndPiq,
  hidePdpPiqPage
} from "../../pdp/actions/pdp.actions";
import { updateProfile } from "../../account/actions/account.actions.js";
import { setUrlToRedirectToAfterAuth } from "../../auth/actions/auth.actions.js";
import * as Cookies from "../../lib/Cookie";
import { setDataLayerForMyAccountDirectCalls } from "../../lib/adobeUtils";
import {
  applyBankOffer,
  releaseBankOffer,
  applyUserCouponForAnonymous,
  getUserAddress,
  mergeCartId,
  generateCartIdForLoggedInUser,
  getCartId,
  applyUserCouponForLoggedInUsers,
  releaseCouponForAnonymous,
  releaseUserCoupon,
  removeNoCostEmi,
  getCartDetails
} from "../../cart/actions/cart.actions";
import {
  getOtpToActivateWallet,
  verifyWallet,
  submitSelfCourierReturnInfo,
  changePassword
} from "../../account/actions/account.actions";
import {
  createWishlist,
  getWishListItems
} from "../../wishlist/actions/wishlist.actions";
import {
  singleAuthCallHasFailed,
  setIfAllAuthCallsHaveSucceeded
} from "../../auth/actions/auth.actions.js";
import { displayToast } from "../../general/toast.actions";
import {
  setDataLayerForLogin,
  ADOBE_DIRECT_CALL_FOR_LOGIN_SUCCESS,
  ADOBE_DIRECT_CALL_FOR_LOGIN_FAILURE
} from "../../lib/adobeUtils";
import { addProductToCart } from "../../pdp/actions/pdp.actions.js";
const ERROR_MESSAGE_IN_CANCELING_ORDER = "Error in Canceling order";
const UPDATE_PASSWORD = "Password Updated Successfully";
const mapStateToProps = (state, ownProps) => {
  return {
    bankOfferTncDetails: state.cart.bankOfferTncDetails,
    modalType: state.modal.modalType,
    ownProps: state.modal.ownProps,
    modalStatus: state.modal.modalDisplayed,
    user: state.user,
    loadingForGetOtpToActivateWallet:
      state.profile.loadingForGetOtpToActivateWallet,
    loadingForVerifyWallet: state.profile.loadingForverifyWallet,
    loadingForCancelProduct: state.profile.loadingForCancelProduct,
    loading: state.profile.loading,
    stores: state.productDescription.storeDetails,
    redirectToAfterAuthUrl: state.auth.redirectToAfterAuthUrl
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    displayToast: toastMessage => {
      dispatch(displayToast(toastMessage));
    },
    showModal: (type, ownProps = null) => {
      dispatch(modalActions.showModal(type, ownProps));
    },
    hideModal: () => {
      dispatch(modalActions.hideModal());
    },
    changePassword: async passwordDetails => {
      const response = await dispatch(changePassword(passwordDetails));
      if (response && response.status === SUCCESS) {
        dispatch(displayToast(UPDATE_PASSWORD));
        dispatch(modalActions.hideModal());
      } else {
        dispatch(displayToast(response.error));
      }
    },
    loginUser: async userDetails => {
      const loginResponse = await dispatch(loginUser(userDetails));
      if (loginResponse.status === SUCCESS) {
        dispatch(modalActions.hideModal());
        setDataLayerForLogin(ADOBE_DIRECT_CALL_FOR_LOGIN_SUCCESS);
        // Get cartDetails if user already has cart created
        const cartVal = await dispatch(getCartId());
        let guid;
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
                localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE)
              )
            );
            // At the time of login Get Cart GUID for logged-in user
            guid = JSON.parse(cartDetailsLoggedInUser).guid;
            const existingWishList = await dispatch(getWishListItems());

            if (!existingWishList || !existingWishList.wishlist) {
              dispatch(createWishlist());
            }
            dispatch(setIfAllAuthCallsHaveSucceeded());
          } else if (mergeCartIdWithOldOneResponse.status === ERROR) {
            Cookies.deleteCookie(CART_DETAILS_FOR_ANONYMOUS);
            guid = cartVal;
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
              const mergeCartIdWithAnonymousResponse = await dispatch(
                mergeCartId()
              );
              if (mergeCartIdWithAnonymousResponse.status === SUCCESS) {
                const newCartDetailsLoggedInUser = Cookies.getCookie(
                  CART_DETAILS_FOR_LOGGED_IN_USER
                );

                guid = JSON.parse(newCartDetailsLoggedInUser).guid;
                dispatch(setIfAllAuthCallsHaveSucceeded());
              } else if (mergeCartIdWithAnonymousResponse.status === ERROR) {
                Cookies.deleteCookie(CART_DETAILS_FOR_ANONYMOUS);
                guid = anonymousCart;
                dispatch(setIfAllAuthCallsHaveSucceeded());
              }
            }
          }
          const existingWishList = await dispatch(getWishListItems());
          if (!existingWishList || !existingWishList.wishlist) {
            dispatch(createWishlist());
          }
          dispatch(setIfAllAuthCallsHaveSucceeded());
          // dispatch(getCartCountForLoggedInUser());
        }
        if (guid) {
          // Get the bagCount if Cart GUID exists for Logged-in user
          await dispatch(
            getCartCountForLoggedInUser(typeof guid === "object" ? guid : null)
          );
          dispatch(getMinicartProducts());
        }
      } else {
        setDataLayerForLogin(ADOBE_DIRECT_CALL_FOR_LOGIN_FAILURE);
      }
    },
    otpVerification: async (otpDetails, userDetails) => {
      const otpResponse = await dispatch(
        otpVerification(otpDetails, userDetails)
      );
      if (otpResponse.status === SUCCESS) {
        const customerAccessResponse = await dispatch(
          customerAccessToken(userDetails)
        );
        if (customerAccessResponse.status === SUCCESS) {
          await dispatch(createWishlist());
          const cartVal = await dispatch(getCartId());
          let guid;
          if (
            cartVal.status === SUCCESS &&
            cartVal.cartDetails.guid &&
            cartVal.cartDetails.code
          ) {
            const mergeCartIdResponse = await dispatch(
              mergeCartId(cartVal.cartDetails.guid)
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
                  cartDetailsLoggedInUser &&
                    JSON.parse(cartDetailsLoggedInUser).code,
                  localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE)
                )
              );
              dispatch(setIfAllAuthCallsHaveSucceeded());
            } else {
              Cookies.deleteCookie(CART_DETAILS_FOR_ANONYMOUS);
              Cookies.createCookie(
                CART_DETAILS_FOR_LOGGED_IN_USER,
                JSON.stringify(cartVal.cartDetails)
              );
              dispatch(setIfAllAuthCallsHaveSucceeded());
            }
            await dispatch(getCartCountForLoggedInUser());
            dispatch(getMinicartProducts());
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
                  dispatch(setIfAllAuthCallsHaveSucceeded());
                } else if (mergeCartIdWithAnonymousResponse.status === ERROR) {
                  Cookies.deleteCookie(CART_DETAILS_FOR_ANONYMOUS);
                  guid = anonymousCart;
                  dispatch(setIfAllAuthCallsHaveSucceeded());
                }
              }
            }
            const existingWishList = await dispatch(getWishListItems());
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
            dispatch(getMinicartProducts());
          }
        } else if (customerAccessResponse.status === FAILURE) {
          dispatch(singleAuthCallHasFailed(otpResponse.error));
        }
      } else if (otpResponse.status === FAILURE) {
        dispatch(singleAuthCallHasFailed(otpResponse.error));
      }
    },
    resetPassword: userDetails => {
      dispatch(resetPassword(userDetails));
    },
    forgotPassword: userDetails => {
      dispatch(forgotPassword(userDetails));
    },
    forgotPasswordOtpVerification: (otpDetails, userDetails) => {
      dispatch(forgotPasswordOtpVerification(otpDetails, userDetails));
    },
    resendOTP: userObj => {
      dispatch(signUpUser(userObj));
    },
    applyBankOffer: async couponCode => {
      return await dispatch(applyBankOffer(couponCode));
    },
    releaseBankOffer: (previousCouponCode, newCouponCode) => {
      return dispatch(releaseBankOffer(previousCouponCode, newCouponCode));
    },
    applyUserCouponForAnonymous: couponCode => {
      return dispatch(applyUserCouponForAnonymous(couponCode));
    },
    releaseCouponForAnonymous: (oldCouponCode, newCouponCode) => {
      return dispatch(releaseCouponForAnonymous(oldCouponCode, newCouponCode));
    },
    applyUserCouponForLoggedInUsers: couponCode => {
      return dispatch(applyUserCouponForLoggedInUsers(couponCode));
    },
    releaseUserCoupon: (oldCouponCode, newCouponCode) => {
      return dispatch(releaseUserCoupon(oldCouponCode, newCouponCode));
    },
    getUserAddress: () => {
      dispatch(getUserAddress());
    },
    getTNCForBankOffer: () => {
      dispatch(getTncForBankOffer());
    },
    updateProfile: (accountDetails, otp) => {
      dispatch(updateProfile(accountDetails, otp));
    },

    getOtpToActivateWallet: (customerDetails, isFromCliqCash) => {
      return dispatch(getOtpToActivateWallet(customerDetails, isFromCliqCash));
    },

    verifyWallet: async (customerDetailsWithOtp, isFromCliqCash) => {
      const createdCartVal = await dispatch(
        verifyWallet(customerDetailsWithOtp, isFromCliqCash)
      );
      // if (createdCartVal.error !== ERROR_MESSAGE_FOR_VERIFY_OTP) {
      //   dispatch(modalActions.hideModal());
      // }
    },

    submitSelfCourierReturnInfo: returnDetails => {
      dispatch(submitSelfCourierReturnInfo(returnDetails));
    },
    redeemCliqVoucher: (cliqCashDetails, fromCheckOut) => {
      dispatch(redeemCliqVoucher(cliqCashDetails, fromCheckOut));
    },
    setUrlToRedirectToAfterAuth: url => {
      dispatch(setUrlToRedirectToAfterAuth(url));
    },
    removeNoCostEmi: (couponCode, cartGuid, cartId) => {
      return dispatch(removeNoCostEmi(couponCode, cartGuid, cartId));
    },
    cancelProduct: async (cancelProductDetails, productDetails) => {
      const cancelOrderDetails = await dispatch(
        cancelProduct(cancelProductDetails, productDetails)
      );
      if (cancelOrderDetails.status === SUCCESS) {
        setDataLayerForMyAccountDirectCalls(productDetails);
        ownProps.history.goBack();
      } else {
        dispatch(displayToast(ERROR_MESSAGE_IN_CANCELING_ORDER));
      }
    },
    getAllStoresForCliqAndPiq: pinCode => {
      dispatch(getAllStoresForCliqAndPiq(pinCode));
    },
    hidePdpPiqPage: () => {
      dispatch(hidePdpPiqPage());
    },
    buyNow: productDetails => {
      dispatch(tempCartIdForLoggedInUser(productDetails));
    },
    addProductToCart: productDetails => {
      dispatch(addProductToCart(productDetails));
    },
    subscribeWhatsapp: () => {
      dispatch(getOrderUpdateOnWhatsapp());
    }
  };
};
const ModalContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ModalRoot)
);

export default ModalContainer;
