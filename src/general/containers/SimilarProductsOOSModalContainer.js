import { connect } from "react-redux";
import { getMsdRequest } from "../../pdp/actions/pdp.actions.js";
import { withRouter } from "react-router-dom";
import SimilarProductsOOSModal from "../components/SimilarProductOOSModal";

const mapDispatchToProps = dispatch => {
  return {
    getMsdRequest: async (productCode, similarProduct, filters) => {
      await dispatch(
        getMsdRequest(productCode, similarProduct, filters, [5, 5])
      );
    }
  };
};

const mapStateToProps = state => {
  return {
    msdItems: state.productDescription.msdItems,
    visitedNewProduct: state.productDescription.visitedNewProduct,
    viewSimilarProductOfId: state.productDescription.productDetails
      ? state.productDescription.productDetails.productListingId
      : state.productListings.viewSimilarProductOfId,
    status: state.productDescription.status,
    loading: state.productDescription.loading
  };
};

const SimilarProductsOOSModalContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SimilarProductsOOSModal)
);
export default SimilarProductsOOSModalContainer;
