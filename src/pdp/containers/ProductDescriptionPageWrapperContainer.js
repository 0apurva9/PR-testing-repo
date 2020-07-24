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
  hidePdpPiqPage,
  getPdpOffers,
  getManufacturerDetails,
  getBundleproduct,
  getBundleProductPinCode,
  openInApp,
  getRelevantBundleProduct,
  relevantProductServibilty,
  relevantBundleProductCode,
  getExchangeDetails
} from "../actions/pdp.actions";
import { displayToast } from "../../general/toast.actions.js";
import {
  showSecondaryLoader,
  hideSecondaryLoader
} from "../../general/secondaryLoader.actions";
import { setHeaderText } from "../../general/header.actions";
import {
  getUserAddress,
  getMinicartProducts
} from "../../cart/actions/cart.actions";
import {
  showModal,
  EMI_MODAL,
  OFFER_MODAL,
  ADDRESS,
  PRICE_BREAKUP,
  SIZE_SELECTOR,
  SIZE_SELECTOR_FOR_EYEWEAR,
  SIZE_GUIDE,
  CLIQ_PIQ_MODAL,
  MANUFACTURER_MODAL,
  TERMSNCONDITIONS_MODAL,
  BUNDLEDPRODUCT_MODAL,
  SIMILAR_PRODUCTS_MODAL,
  SIMILAR_PRODUCTS_OOS_MODAL,
  SIZE_SELECTOR_OOS_MODAL,
  EXCHANGE_MODAL
} from "../../general/modal.actions.js";
import ProductDescriptionPageWrapper from "../components/ProductDescriptionPageWrapper";
import { withRouter } from "react-router-dom";
import {
  SUCCESS,
  DEFAULT_PIN_CODE_LOCAL_STORAGE,
  NO,
  SELECTED_STORE
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
import { getChatbotDetails } from "../../plp/actions/plp.actions";
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getProductDescription: async productCode => {
      const productDetailsResponse = await dispatch(
        getProductDescription(productCode)
      );
      if (productDetailsResponse && productDetailsResponse.status === SUCCESS) {
        const pinCode = localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE);
        if (pinCode) {
          dispatch(
            getProductPinCode(
              pinCode,
              productCode,
              productDetailsResponse.productDescription.winningUssID,
              false,
              productDetailsResponse.productDescription.exchangeAvailable,
              false
            )
          );
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
    showBundledProduct: data => {
      dispatch(showModal(BUNDLEDPRODUCT_MODAL, data));
    },
    showTermsNConditions: data => {
      dispatch(showModal(TERMSNCONDITIONS_MODAL, data));
    },
    showExchangeModal: data => {
      dispatch(showModal(EXCHANGE_MODAL, data));
    },
    showManufactureDetailsModal: data => {
      dispatch(showModal(MANUFACTURER_MODAL, data));
    },
    showSimilarProducts: () => {
      dispatch(showModal(SIMILAR_PRODUCTS_MODAL));
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
    showSizeSelectorForEyeWear: data => {
      dispatch(showModal(SIZE_SELECTOR_FOR_EYEWEAR, data));
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
    showPincodeModal: (productCode, winningUssID) => {
      dispatch(showModal(ADDRESS, { productCode }, { winningUssID }));
    },
    getProductPinCode: (
      pinCode,
      productCode,
      winningUssID,
      isComingFromPiqPage,
      isExchangeAvailable,
      isComingFromClickEvent
    ) => {
      localStorage.removeItem(SELECTED_STORE);
      return dispatch(
        getProductPinCode(
          pinCode,
          productCode,
          winningUssID,
          isComingFromPiqPage,
          isExchangeAvailable,
          isComingFromClickEvent
        )
      );
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
    getPdpOffers: async () => {
      await dispatch(getPdpOffers());
    },
    getManufacturerDetails: async () => {
      await dispatch(getManufacturerDetails());
    },
    getUserAddress: async () => {
      await dispatch(getUserAddress());
    },
    showSimilarSizeOOSModal: data => {
      dispatch(showModal(SIMILAR_PRODUCTS_OOS_MODAL, data));
    },
    showOOSSizeSelectorModal: data => {
      dispatch(showModal(SIZE_SELECTOR_OOS_MODAL, data));
    },
    getMinicartProducts: async () => {
      return dispatch(getMinicartProducts());
    },
    getBundleproduct: async data => {
      return dispatch(getBundleproduct(data));
    },
    getBundleProductPinCode: async (pinCode, productCode, ussId) => {
      return await dispatch(
        getBundleProductPinCode(pinCode, productCode, ussId)
      );
    },
    openInApp: async () => {
      return await dispatch(openInApp());
    },
    getRelevantBundleProduct: async (productCode, temp, sequence) => {
      return await dispatch(
        getRelevantBundleProduct(productCode, temp, sequence)
      );
    },
    relevantProductServibilty: async (pinCode, productCode, ussId) => {
      return await dispatch(
        relevantProductServibilty(pinCode, productCode, ussId)
      );
    },
    relevantBundleProductCode: async () => {
      return await dispatch(relevantBundleProductCode());
    },
    // addProductToCart: (productDetails, callback) => {
    // 	return dispatch(addProductToCart(productDetails), callback());
    // },
    addProductToCart1: async productDetails => {
      return await dispatch(addProductToCart(productDetails));
    },
    getExchangeDetails: async (
      listingId,
      ussid,
      maxExchangeAmount,
      pickupCharge
    ) => {
      return await dispatch(
        getExchangeDetails(listingId, ussid, maxExchangeAmount, pickupCharge)
      );
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
    /** */
    getUserDetails: () => {
      dispatch(getUserDetails());
    },
    addStoreCNC: (ussId, slaveId) => {
      return dispatch(addStoreCNC(ussId, slaveId));
    },
    addPickupPersonCNC: (personMobile, personName) => {
      return dispatch(addPickupPersonCNC(personMobile, personName));
    },
    mergeTempCartWithOldCart: () => {
      dispatch(mergeTempCartWithOldCart());
    },
    getChatbotDetails: async () => {
      await dispatch(getChatbotDetails());
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
    offers: state.productDescription.offerDetails,
    impulseOfferCalloutList: state.productDescription.impulseOfferCalloutList,
    manufacturerDetails: state.productDescription.manufacturerDetails,
    bundleProductData: state.productDescription.bundleProductData,
    relevantBundleProductData:
      state.productDescription.relevantBundleProductData,
    relevantProductPinCodeStatus:
      state.productDescription.relevantProductPinCodeStatus,
    secondaryBundleProductData:
      state.productDescription.secondaryBundleProductData,
    relevantBundleProductCodeData:
      state.productDescription.relevantBundleProductCodeData,
    exchangeDetails: state.productDescription.exchangeDetails,
    userDetails: state.profile.userDetails,
    loadingOfBuyNowSuccess: state.cart.tempCartIdForLoggedInUserStatus,
    loadingForAddStoreToCnc: state.cart.loadingForAddStore,
    loadingForCartDetail: state.cart.loadingForCartDetail,
    pincodeError: state.productDescription.pincodeError,
    serviceableOtherSellersUssid:
      state.productDescription.serviceableOtherSellersUssid,
    chatbotDetailsData: state.productListings.getChatbotDetailsData,
    addToCartResponseDetails: state.productDescription.addToCartResponseDetails,
    addToCartResponseLoading: state.productDescription.addToCartResponseLoading,
    cartCountDetails: state.cart.cartCountDetails
  };
};

const ProductDescriptionPageWrapperContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductDescriptionPageWrapper)
);

export default ProductDescriptionPageWrapperContainer;
