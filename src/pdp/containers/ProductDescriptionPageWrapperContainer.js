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
  DEFAULT_PIN_CODE_LOCAL_STORAGE
} from "../../lib/constants.js";
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getProductDescription: async productCode => {
      const productDetailsResponse = await dispatch(
        getProductDescription(productCode)
      );

      if (productDetailsResponse && productDetailsResponse.status === SUCCESS) {
        const pinCode = localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE);
        if (pinCode) {
          dispatch(getProductPinCode(pinCode, productCode));
        }
      }
    },
    addProductToCart: async (userId, cartId, accessToken, productDetails) => {
      return dispatch(
        addProductToCart(userId, cartId, accessToken, productDetails)
      );
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
    getPdpEmi: (token, cartValue) => {
      dispatch(getPdpEmi(token, cartValue));
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
      dispatch(getProductPinCode(pinCode, productCode));
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
    loadingForCliqAndPiq: state.productDescription.loadingForCliqAndPiq
  };
};

const ProductDescriptionPageWrapperContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductDescriptionPageWrapper)
);

export default ProductDescriptionPageWrapperContainer;
