import { connect } from "react-redux";
import {
  getProductDescription,
  getProductPinCode,
  addProductToWishList,
  removeProductFromWishList,
  addProductToCart,
  getProductSizeGuide,
  getPdpEmi,
  getProductSpecification,
  getProductWishList
} from "../actions/pdp.actions";
import ProductDescriptionPage from "../components/ProductDescriptionPage";
import { withRouter } from "react-router-dom";
import {
  showModal,
  ADDRESS,
  PRODUCT_COUPONS,
  SIZE_GUIDE,
  SIZE_SELECTOR,
  EMI_MODAL
} from "../../general/modal.actions";
const mapDispatchToProps = dispatch => {
  return {
    getProductDescription: productCode => {
      dispatch(getProductDescription(productCode));
    },
    getProductPinCode: productDetails => {
      dispatch(getProductPinCode(productDetails));
    },
    addProductToWishList: productDetails => {
      dispatch(addProductToWishList(productDetails));
    },
    removeProductFromWishList: productDetails => {
      dispatch(removeProductFromWishList(productDetails));
    },
    addProductToCart: productDetails => {
      dispatch(addProductToCart(productDetails));
    },

    showAddress: data => {
      dispatch(showModal(ADDRESS, data));
    },
    showSizeSelector: data => {
      dispatch(showModal(SIZE_SELECTOR, data));
    },

    getProductSizeGuide: () => {
      dispatch(getProductSizeGuide());
    },
    getPdpEmi: () => {
      dispatch(getPdpEmi());
    },
    showSizeGuide: () => {
      dispatch(showModal(SIZE_GUIDE));
    },

    getProductWishList: () => {
      dispatch(getProductWishList());
    },
    showEmiPlans: () => {
      dispatch(showModal(EMI_MODAL));
    },
    getProductSpecification: productId => {
      dispatch(getProductSpecification(productId));
    },
    showCouponModal: data => {
      dispatch(showModal(PRODUCT_COUPONS, data));
    }
  };
};

const mapStateToProps = state => {
  return {
    loading: state.productDescription.loading,
    productDetails: state.productDescription.productDetails,
    wishList: state.productDescription.wishList
  };
};

const ProductDescriptionContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductDescriptionPage)
);

export default ProductDescriptionContainer;
