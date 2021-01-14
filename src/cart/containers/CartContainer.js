import { connect } from "react-redux";
import {
  getUserAddress,
  getEmiBankDetails,
  getNetBankDetails,
  getCartDetails,
  checkPinCodeServiceAvailability,
  removeItemFromCartLoggedIn,
  removeItemFromCartLoggedOut,
  updateQuantityInCartLoggedIn,
  updateQuantityInCartLoggedOut,
  displayCouponsForLoggedInUser,
  displayCouponsForAnonymous,
  clearCartDetails,
  getPaymentModes,
  mergeTempCartWithOldCart,
  getMinicartProducts,
  getAllStoresCNC,
  getCartCodeAndGuidForLoggedInUser,
  removeNoCostEmi
} from "../actions/cart.actions.js";
import { displayToast } from "../../general/toast.actions";
import { withRouter } from "react-router-dom";
import CartPage from "../components/CartPage";
import { setHeaderText } from "../../general/header.actions";
import {
  getWishListItems,
  getWishlist
} from "../../wishlist/actions/wishlist.actions";
import { setUrlToRedirectToAfterAuth } from "../../auth/actions/auth.actions.js";

import {
  showSecondaryLoader,
  hideSecondaryLoader
} from "../../general/secondaryLoader.actions";
import {
  PRODUCT_COUPONS,
  showModal,
  ADDRESS,
  DESKTOP_AUTH,
  EXCHANGE_TnC_MODAL,
  EXCHANGE_REMOVE_MODAL,
  CLIQ_PIQ_MODAL,
  APPLIANCES_EXCHANGE_MODAL
} from "../../general/modal.actions";
import { SUCCESS, NO } from "../../lib/constants";
import {
  setDataLayerForCartDirectCalls,
  ADOBE_DIRECT_CALL_FOR_PINCODE_SUCCESS,
  ADOBE_DIRECT_CALL_FOR_PINCODE_FAILURE
} from "../../lib/adobeUtils";
import {
  verifyIMEINumber,
  getBundledProductSuggestion,
  addBundledProductsToCart,
  appliancesExchangeCheckPincode
} from "../../pdp/actions/pdp.actions";
const mapDispatchToProps = dispatch => {
  return {
    displayToast: toastMessage => {
      dispatch(displayToast(toastMessage));
    },
    showAuthPopUp: () => {
      dispatch(showModal(DESKTOP_AUTH));
    },
    getUserAddress: () => {
      dispatch(getUserAddress());
    },
    getNetBankDetails: () => {
      dispatch(getNetBankDetails());
    },
    getEmiBankDetails: cartDetails => {
      dispatch(getEmiBankDetails(cartDetails));
    },

    getPaymentModes: guIdDetails => {
      dispatch(getPaymentModes(guIdDetails));
    },
    getCartDetails: async (
      cartId,
      userId,
      accessToken,
      pinCode,
      setDataLayerForPincode: false
    ) => {
      if (!accessToken) {
        return false;
      }
      const cartDetailsObj = await dispatch(
        getCartDetails(cartId, userId, accessToken, pinCode, true)
      );
      let productServiceAvailability =
        cartDetailsObj &&
        cartDetailsObj.cartDetails &&
        cartDetailsObj.cartDetails.products &&
        cartDetailsObj.cartDetails.products.filter(product => {
          return (
            product.isGiveAway === NO &&
            (product.pinCodeResponse === undefined ||
              (product.pinCodeResponse &&
                product.pinCodeResponse.isServicable === "N") ||
              product.isOutOfStock)
          );
        });
      // here we are setting data layer for pincode change on cart page
      if (setDataLayerForPincode) {
        if (
          cartDetailsObj &&
          cartDetailsObj.status === SUCCESS &&
          productServiceAvailability &&
          productServiceAvailability.length === 0
        ) {
          setDataLayerForCartDirectCalls(
            ADOBE_DIRECT_CALL_FOR_PINCODE_SUCCESS,
            pinCode
          );
        } else {
          setDataLayerForCartDirectCalls(
            ADOBE_DIRECT_CALL_FOR_PINCODE_FAILURE,
            pinCode
          );
        }
      }
    },
    setHeaderText: text => {
      dispatch(setHeaderText(text));
    },
    setUrlToRedirectToAfterAuth: url => {
      dispatch(setUrlToRedirectToAfterAuth(url));
    },
    showCouponModal: data => {
      dispatch(showModal(PRODUCT_COUPONS, data));
    },

    checkPinCodeServiceAvailability: (
      userName,
      accessToken,
      pinCode,
      productCode
    ) => {
      dispatch(
        checkPinCodeServiceAvailability(
          userName,
          accessToken,
          pinCode,
          productCode
        )
      );
    },

    removeItemFromCartLoggedIn: (
      entryNumber,
      pinCode,
      mainProductUssid,
      isForDigitalBundledProduct
    ) => {
      dispatch(
        removeItemFromCartLoggedIn(
          entryNumber,
          pinCode,
          mainProductUssid,
          isForDigitalBundledProduct
        )
      );
    },
    removeItemFromCartLoggedOut: (
      entryNumber,
      pinCode,
      mainProductUssid,
      isForDigitalBundledProduct
    ) => {
      dispatch(
        removeItemFromCartLoggedOut(
          entryNumber,
          pinCode,
          mainProductUssid,
          isForDigitalBundledProduct
        )
      );
    },
    getWishListItems: isSetDataLayer => {
      dispatch(getWishListItems(isSetDataLayer));
    },
    updateQuantityInCartLoggedIn: (selectedItem, quantity, pinCode) => {
      dispatch(updateQuantityInCartLoggedIn(selectedItem, quantity, pinCode));
    },
    updateQuantityInCartLoggedOut: (selectedItem, quantity, pinCode) => {
      dispatch(updateQuantityInCartLoggedOut(selectedItem, quantity, pinCode));
    },
    displayCouponsForLoggedInUser: (userId, accessToken, guId) => {
      dispatch(displayCouponsForLoggedInUser(userId, accessToken, guId));
    },
    displayCouponsForAnonymous: (userId, accessToken, guId) => {
      dispatch(displayCouponsForAnonymous(userId, accessToken, guId));
    },
    showSecondaryLoader: () => {
      dispatch(showSecondaryLoader());
    },
    hideSecondaryLoader: () => {
      dispatch(hideSecondaryLoader());
    },
    clearCartDetails: () => {
      dispatch(clearCartDetails());
    },
    addressModal: pinCodeObj => {
      dispatch(showModal(ADDRESS, pinCodeObj));
    },
    mergeTempCartWithOldCart: () => {
      dispatch(mergeTempCartWithOldCart());
    },
    getMinicartProducts: () => {
      dispatch(getMinicartProducts());
    },
    showExchangeTnCModal: () => {
      dispatch(showModal(EXCHANGE_TnC_MODAL));
    },
    showRemoveExchangeModal: data => {
      dispatch(showModal(EXCHANGE_REMOVE_MODAL, data));
    },
    getAllStoresCNC: pinCode => {
      return dispatch(getAllStoresCNC(pinCode));
    },
    showPdpCliqAndPiqPage: storeDetails => {
      dispatch(showModal(CLIQ_PIQ_MODAL, storeDetails));
    },
    verifyIMEINumber: async (
      IMEINumber,
      exchangeProductId,
      exchangeAmountCashify,
      tulBump,
      pickUpCharge,
      listingId,
      ussId,
      guid,
      entry
    ) => {
      return await dispatch(
        verifyIMEINumber(
          IMEINumber,
          exchangeProductId,
          exchangeAmountCashify,
          tulBump,
          pickUpCharge,
          listingId,
          ussId,
          guid,
          entry
        )
      );
    },
    getCartCodeAndGuidForLoggedInUser: async () => {
      return await dispatch(getCartCodeAndGuidForLoggedInUser());
    },
    getBundledProductSuggestion: (
      productId,
      ussId,
      categoryCode,
      brandCode,
      source,
      pincode
    ) => {
      dispatch(
        getBundledProductSuggestion(
          productId,
          ussId,
          categoryCode,
          brandCode,
          source,
          pincode
        )
      );
    },
    addBundledProductsToCart: data => {
      dispatch(addBundledProductsToCart(data));
    },
    getWishlist: () => {
      dispatch(getWishlist());
    },
    openAppliancesExchangeModal: data => {
      dispatch(showModal(APPLIANCES_EXCHANGE_MODAL, data));
    },
    appliancesExchangeCheckPincode: (productCode, pincode) => {
      dispatch(appliancesExchangeCheckPincode(productCode, pincode));
    },
    removeNoCostEmi: (couponCode, carGuId, cartId) => {
      return dispatch(removeNoCostEmi(couponCode, carGuId, cartId));
    }
  };
};

const mapStateToProps = state => {
  return {
    cart: state.cart,
    user: state.user,
    loginFromMyBag: state.cart.loginFromMyBag,
    loadingForCartDetail: state.cart.loadingForCartDetail,
    wishListCount: state.wishlistItems.count,
    bundledProductSuggestionDetails:
      state.productDescription.getBundledProductSuggestionDetails,
    addBundledProductsToCartDetails:
      state.productDescription.addBundledProductsToCartDetails,
    bundledProductSuggestionStatus:
      state.productDescription.getBundledProductSuggestionStatus,
    appliancesExchangePincodeDetails:
      state.productDescription.appliancesExchangeCheckPincodeDetails
  };
};
const CartContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CartPage)
);

export default CartContainer;
