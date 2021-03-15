import { connect } from "react-redux";
import ProductReviewPage from "../components/ProductReviewPage";
import { withRouter } from "react-router-dom";
import {
    addProductToCart,
    getProductReviews,
    getProductDescription,
    addProductReview,
    getParametersEligibleToRate,
} from "../actions/pdp.actions";
import { displayToast } from "../../general/toast.actions";
import { showSecondaryLoader, hideSecondaryLoader } from "../../general/secondaryLoader.actions";
import {
    showModal,
    DESKTOP_AUTH,
    REVIEW_GUIDLINE_MODAL,
    RATING_AND_REVIEW_MODAL,
    RATING_REVIEW_MODAL_V2,
} from "../../general/modal.actions.js";
import { setUrlToRedirectToAfterAuth } from "../../auth/actions/auth.actions";

import { tempCartIdForLoggedInUser } from "../../cart/actions/cart.actions";
const mapDispatchToProps = dispatch => {
    return {
        addProductToCart: productDetails => {
            return dispatch(addProductToCart(productDetails));
        },
        getProductReviews: (productCode, pageIndex, orderBy, sortBy, filteredProducts) => {
            dispatch(getProductReviews(productCode, pageIndex, orderBy, sortBy, filteredProducts));
        },
        getProductDescription: (productCode, isComingForReviewPage) => {
            dispatch(getProductDescription(productCode, isComingForReviewPage));
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

        showAuthPopUp: () => {
            dispatch(showModal(DESKTOP_AUTH));
        },
        showReviewGuidelineModal: () => {
            dispatch(showModal(REVIEW_GUIDLINE_MODAL));
        },
        showRatingAndReviewModal: () => {
            dispatch(showModal(RATING_AND_REVIEW_MODAL));
        },
        setUrlToRedirectToAfterAuth: url => {
            dispatch(setUrlToRedirectToAfterAuth(url));
        },
        buyNow: async productDetails => {
            return dispatch(tempCartIdForLoggedInUser(productDetails));
        },
        openRatingReviewModal: data => {
            dispatch(showModal(RATING_REVIEW_MODAL_V2, data));
        },
        getParametersEligibleToRate: productCode => {
            dispatch(getParametersEligibleToRate(productCode));
        },
    };
};

const mapStateToProps = state => {
    return {
        productDetails: state.productDescription.productDetails,
        reviews: state.productDescription.reviews,
        addReviewStatus: state.productDescription.addReviewStatus,
        loadingForAddProduct: state.productDescription.loadingForAddProduct,
        loading: state.productDescription.loading,
    };
};

const ProductReviewContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductReviewPage));

export default ProductReviewContainer;
