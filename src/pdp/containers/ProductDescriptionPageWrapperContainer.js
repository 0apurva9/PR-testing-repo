import { connect } from "react-redux";
import {
  getProductDescription,
  addProductToCart,
  getProductSizeGuide,
  getMsdRequest,
  getPdpEmi,
  getEmiTerms,
  pdpAboutBrand,
  getProductPinCode,
  getAllStoresForCliqAndPiq,
  showPdpPiqPage,
  hidePdpPiqPage
} from "../actions/pdp.actions";
import { displayToast } from "../../general/toast.actions.js";
import {
  showSecondaryLoader,
  hideSecondaryLoader
} from "../../general/secondaryLoader.actions";
import { setHeaderText } from "../../general/header.actions";
import { getUserAddress } from "../../cart/actions/cart.actions";
import {
  showModal,
  EMI_MODAL,
  OFFER_MODAL,
  ADDRESS,
  PRICE_BREAKUP,
  SIZE_SELECTOR,
  SIZE_GUIDE,
  CLIQ_PIQ_MODAL
} from "../../general/modal.actions.js";
import ProductDescriptionPageWrapper from "../components/ProductDescriptionPageWrapper";
import { withRouter } from "react-router-dom";
import {
  SUCCESS,
  DEFAULT_PIN_CODE_LOCAL_STORAGE,
  NO
} from "../../lib/constants.js";
import { setUrlToRedirectToAfterAuth } from "../../auth/actions/auth.actions";
import {
  tempCartIdForLoggedInUser,
  getCartDetails,
  addStoreCNC,
  addPickupPersonCNC,
  mergeTempCartWithOldCart
} from "../../cart/actions/cart.actions";
import {
  setDataLayerForCartDirectCalls,
  ADOBE_DIRECT_CALL_FOR_PINCODE_SUCCESS,
  ADOBE_DIRECT_CALL_FOR_PINCODE_FAILURE
} from "../../lib/adobeUtils";
import { getUserDetails } from "../../account/actions/account.actions.js";
const mapDispatchToProps = (dispatch, ownProps) => {
  let componentName =
    ownProps &&
    ownProps.location &&
    ownProps.location.state &&
    ownProps.location.state.componentName
      ? ownProps.location.state.componentName
      : "";
  return {
    getProductDescription: async productCode => {
      const productDetailsResponse = await dispatch(
        getProductDescription(productCode, componentName)
      );

      if (productDetailsResponse && productDetailsResponse.status === SUCCESS) {
        const pinCode = localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE);
        if (pinCode) {
          dispatch(getProductPinCode(pinCode, productCode));
        }
      }
    },
    addProductToCart: async productDetails => {
      return dispatch(addProductToCart(productDetails));
    },
    buyNow: async productDetails => {
      return dispatch(tempCartIdForLoggedInUser(productDetails));
    },
    showSizeSelector: data => {
      dispatch(showModal(SIZE_SELECTOR, data));
    },
    showPriceBreakup: data => {
      dispatch(showModal(PRICE_BREAKUP, data));
    },
    showOfferDetails: data => {
      dispatch(showModal(OFFER_MODAL, data));
    },
    getProductSizeGuide: productCode => {
      dispatch(getProductSizeGuide(productCode));
    },
    getMsdRequest: productCode => {
      dispatch(getMsdRequest(productCode));
    },
    pdpAboutBrand: productCode => {
      dispatch(pdpAboutBrand(productCode));
    },
    showSizeGuide: () => {
      dispatch(showModal(SIZE_GUIDE));
    },
    getPdpEmi: (token, cartValue, productCode, ussId) => {
      dispatch(getPdpEmi(token, cartValue, productCode, ussId));
    },
    getEmiTerms: (token, productValue) => {
      dispatch(getEmiTerms(token, productValue));
    },
    showEmiModal: () => {
      dispatch(showModal(EMI_MODAL));
    },
    showPincodeModal: productCode => {
      dispatch(showModal(ADDRESS, { productCode }));
    },
    getProductPinCode: (pinCode, productCode) => {
      return dispatch(getProductPinCode(pinCode, productCode));
    },
    hideSecondaryLoader: () => {
      dispatch(hideSecondaryLoader());
    },
    showSecondaryLoader: () => {
      dispatch(showSecondaryLoader());
    },
    setHeaderText: text => {
      dispatch(setHeaderText(text));
    },
    displayToast: val => {
      dispatch(displayToast(val));
    },
    getAllStoresForCliqAndPiq: pinCode => {
      dispatch(getAllStoresForCliqAndPiq(pinCode));
    },
    showPdpPiqPage: () => {
      dispatch(showPdpPiqPage());
    },
    hidePdpPiqPage: () => {
      dispatch(hidePdpPiqPage());
    },
    showPdpCliqAndPiqPage: storeDetails => {
      dispatch(showModal(CLIQ_PIQ_MODAL, storeDetails));
    },
    setUrlToRedirectToAfterAuth: url => {
      dispatch(setUrlToRedirectToAfterAuth(url));
    },
    getUserAddress: () => {
      dispatch(getUserAddress());
    },
    /** */
    addressModal: pinCodeObj => {
      dispatch(showModal(ADDRESS, pinCodeObj));
    },
    getCartDetails: async (
      cartId,
      userId,
      accessToken,
      pinCode,
      setDataLayerForPincode: false
    ) => {
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
          cartDetailsObj.status === SUCCESS &&
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
    getUserDetails: () => {
      dispatch(getUserDetails());
    },
    /** */
    addStoreCNC: (ussId, slaveId) => {
      return dispatch(addStoreCNC(ussId, slaveId));
    },
    addPickupPersonCNC: (personMobile, personName) => {
      return dispatch(addPickupPersonCNC(personMobile, personName));
    },
    mergeTempCartWithOldCart: () => {
      dispatch(mergeTempCartWithOldCart());
    }
  };
};

const mapStateToProps = state => {
  return {
    productDetails: state.productDescription.productDetails,
    loading: state.productDescription.loading,
    stores: state.productDescription.storeDetails,
    showPiqPage: state.productDescription.showPiqPage,
    slaveData: state.productDescription.slaveData,
    loadingForCliqAndPiq: state.productDescription.loadingForCliqAndPiq,
    userAddress: state.profile.userAddress,
    userDetails: state.profile.userDetails,
    loadingOfBuyNowSuccess: state.cart.tempCartIdForLoggedInUserStatus,
    loadingForAddStoreToCnc: state.cart.loadingForAddStore,
    loadingForCartDetail: state.cart.loadingForCartDetail
  };
};

const ProductDescriptionPageWrapperContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductDescriptionPageWrapper)
);

export default ProductDescriptionPageWrapperContainer;
