import { connect } from "react-redux";
import ProductReviewPage from "../components/ProductReviewPage";
import { withRouter } from "react-router-dom";
import {
  addProductToCart,
  getProductReviews,
  getProductDescription,
  addProductReview
} from "../actions/pdp.actions";
import { displayToast } from "../../general/toast.actions";
import {
  showSecondaryLoader,
  hideSecondaryLoader
} from "../../general/secondaryLoader.actions";
import { setUrlToRedirectToAfterAuth } from "../../auth/actions/auth.actions";
const mapDispatchToProps = dispatch => {
  return {
    addProductToCart: productDetails => {
      return dispatch(addProductToCart(productDetails));
    },
    getProductReviews: (productCode, pageIndex, orderBy, sortBy) => {
      dispatch(getProductReviews(productCode, pageIndex, orderBy, sortBy));
    },
    getProductDescription: productCode => {
      dispatch(getProductDescription(productCode));
    },
    addProductReview: (productCode, productReview) => {
      return dispatch(addProductReview(productCode, productReview));
    },

    displayToast: message => {
      dispatch(displayToast(message));
    },
    showSecondaryLoader: () => {
      dispatch(showSecondaryLoader());
    },
    hideSecondaryLoader: () => {
      dispatch(hideSecondaryLoader());
    },
    setUrlToRedirectToAfterAuth: url => {
      dispatch(setUrlToRedirectToAfterAuth(url));
    }
  };
};

const mapStateToProps = state => {
  return {
    productDetails: state.productDescription.productDetails,
    reviews: state.productDescription.reviews,
    addReviewStatus: state.productDescription.addReviewStatus,
    loadingForAddProduct: state.productDescription.loadingForAddProduct,
    loading: state.productDescription.loading
  };
};

const ProductReviewContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductReviewPage)
);

export default ProductReviewContainer;
