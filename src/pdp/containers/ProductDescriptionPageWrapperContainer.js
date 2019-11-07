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
  relevantBundleProductCode
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
  SIZE_GUIDE,
  CLIQ_PIQ_MODAL,
  MANUFACTURER_MODAL,
  TERMSNCONDITIONS_MODAL,
  BUNDLEDPRODUCT_MODAL,
  SIMILAR_PRODUCTS_MODAL,
  SIMILAR_PRODUCTS_OOS_MODAL,
  SIZE_SELECTOR_OOS_MODAL
} from "../../general/modal.actions.js";
import ProductDescriptionPageWrapper from "../components/ProductDescriptionPageWrapper";
import { withRouter } from "react-router-dom";
import {
  SUCCESS,
  DEFAULT_PIN_CODE_LOCAL_STORAGE
} from "../../lib/constants.js";
import { tempCartIdForLoggedInUser } from "../../cart/actions/cart.actions";
import { setUrlToRedirectToAfterAuth } from "../../auth/actions/auth.actions";
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
    showBundledProduct: data => {
      //debugger;
      dispatch(showModal(BUNDLEDPRODUCT_MODAL, data));
    },
    showTermsNConditions: data => {
      dispatch(showModal(TERMSNCONDITIONS_MODAL, data));
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
      state.productDescription.relevantBundleProductCodeData
  };
};

const ProductDescriptionPageWrapperContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProductDescriptionPageWrapper)
);

export default ProductDescriptionPageWrapperContainer;
