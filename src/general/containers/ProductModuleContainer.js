import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { showModal, SIMILAR_PRODUCTS_MODAL } from "../modal.actions.js";
import ProductModule from "../components/ProductModule";
import { viewSimilarProducts } from "../../plp/actions/plp.actions.js";
const mapDispatchToProps = dispatch => {
  return {
    setviewSimilarProductsOfId: id => {
      dispatch(viewSimilarProducts(id));
    },
    showSimilarProducts: data => {
      dispatch(showModal(SIMILAR_PRODUCTS_MODAL, data));
    }
  };
};
const mapStateToProps = state => {
  return {
    loading: state.productDescription.loading,
    status: state.productDescription.status
  };
};
const ProductModuleContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductModule)
);
export default ProductModuleContainer;
