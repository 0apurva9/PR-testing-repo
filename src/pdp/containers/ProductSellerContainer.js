import { connect } from "react-redux";
import ProductSellerPage from "../components/ProductSellerPage";
import { withRouter } from "react-router-dom";
import {
  addProductToCart,
  getProductDescription,
  getProductPinCode,
  getExchangeDetails,
  showPdpPiqPage,
  getAllStoresForCliqAndPiq
} from "../actions/pdp.actions";
import { displayToast } from "../../general/toast.actions.js";
import { setUrlToRedirectToAfterAuth } from "../../auth/actions/auth.actions";
import { tempCartIdForLoggedInUser } from "../../cart/actions/cart.actions";
import {
  showModal,
  CLIQ_PIQ_MODAL,
  EXCHANGE_MODAL
} from "../../general/modal.actions.js";
import {
  showSecondaryLoader,
  hideSecondaryLoader
} from "../../general/secondaryLoader.actions";
const mapDispatchToProps = (dispatch) => {
  return {
    addProductToCart: async productDetails => {
      return dispatch(addProductToCart(productDetails));
    },
    getProductDescription: productCode => {
      return dispatch(getProductDescription(productCode));
    },
    displayToast: val => {
      dispatch(displayToast(val));
    },
    setUrlToRedirectToAfterAuth: url => {
      dispatch(setUrlToRedirectToAfterAuth(url));
    },
    buyNow: async productDetails => {
      return dispatch(tempCartIdForLoggedInUser(productDetails));
    },
    getProductPinCode: (
      pinCode,
      productCode,
      winningUssID,
      isComingFromPiqPage,
      isExchangeAvailable,
      isComingFromClickEvent
    ) => {
      dispatch(
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
    showExchangeModal: data => {
      dispatch(showModal(EXCHANGE_MODAL, data));
    },
    getAllStoresForCliqAndPiq: pinCode => {
      dispatch(getAllStoresForCliqAndPiq(pinCode));
    },
    showPdpPiqPage: () => {
      dispatch(showPdpPiqPage());
    },
    showPdpCliqAndPiqPage: storeDetails => {
      dispatch(showModal(CLIQ_PIQ_MODAL, storeDetails));
    },
    hideSecondaryLoader: () => {
      dispatch(hideSecondaryLoader());
    },
    showSecondaryLoader: () => {
      dispatch(showSecondaryLoader());
    }
  };
};
const mapStateToProps = state => {
  return {
    productDetails: state.productDescription.productDetails,
    serviceablePincodeList:
      state.productDescription.serviceablePincodeListResponse,
    exchangeDetails: state.productDescription.exchangeDetails,
    loading: state.productDescription.loading,
    stores: state.productDescription.storeDetails,
    showPiqPage: state.productDescription.showPiqPage
  };
};

const ProductSellerContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductSellerPage)
);

export default ProductSellerContainer;
