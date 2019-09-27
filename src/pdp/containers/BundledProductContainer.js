import BundledProductModal from "../components/BundledProductModal";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { addProductToCart } from "../actions/pdp.actions";

const mapDispatchToProps = dispatch => {
  return {
    addProductToCart: async (productDetails, callback) => {
      return await dispatch(addProductToCart(productDetails), callback());
    }
  };
};

const mapStateToProps = state => {
  return {
    productDetails: state.productDescription.productDetails,
    loading: state.productDescription.loading,
    offers: state.productDescription.offerDetails,
    showBrandInfo: state.productDescription.showBrandInfo,
    bundleProductData: state.productDescription.bundleProductData
  };
};

const BundledProductContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BundledProductModal)
);

export default BundledProductContainer;
