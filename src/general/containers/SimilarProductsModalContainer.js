import { connect } from "react-redux";
import { getMsdRequest } from "../../pdp/actions/pdp.actions.js";
import { withRouter } from "react-router-dom";
import SimilarProductsModal from "../components/SimilarProductsModal";

const mapDispatchToProps = dispatch => {
  return {
    getMsdRequest: async (productCode, similarProduct) => {
      await dispatch(
        getMsdRequest(productCode, similarProduct, null, [20, 20])
      );
    }
  };
};

const mapStateToProps = state => {
  return {
    msdItems: state.productDescription.msdItems,
    visitedNewProduct: state.productDescription.visitedNewProduct,
    viewSimilarProductOfId: state.productListings.viewSimilarProductOfId
      ? state.productListings.viewSimilarProductOfId
      : state.productDescription.productDetails.productListingId,
    status: state.productDescription.status,
    loading: state.productDescription.loading
  };
};

const SimilarProductsModalContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SimilarProductsModal)
);
export default SimilarProductsModalContainer;
