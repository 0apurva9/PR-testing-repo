import RelevantBundling from "../components/RelevantBundling";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { addProductToCart } from "../actions/pdp.actions";

const mapDispatchToProps = dispatch => {
  return {
    addProductToCart: async (productDetails, callback) => {
      return await dispatch(addProductToCart(productDetails), callback());
    },
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
    flexMediaHtml: state.productDescription.flexMediaDetails,
    offers: state.productDescription.offerDetails,
    wishlistItems: state.wishlistItems.wishlistItems,
    manufacturerDetails: state.productDescription.manufacturerDetails,
    showBrandInfo: state.productDescription.showBrandInfo,
    impulseOfferCalloutList: state.productDescription.impulseOfferCalloutList,
    relevantBundleProductData:
      state.productDescription.relevantBundleProductData,
    secondaryBundleProductData:
      state.productDescription.secondaryBundleProductData
  };
};

const RelevantBundleContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RelevantBundling)
);

export default RelevantBundleContainer;
