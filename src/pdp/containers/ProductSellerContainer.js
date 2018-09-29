import { connect } from "react-redux";
import ProductSellerPage from "../components/ProductSellerPage";
import { withRouter } from "react-router-dom";
import {
  addProductToCart,
  getProductDescription
} from "../actions/pdp.actions";
import { displayToast } from "../../general/toast.actions.js";
import { setUrlToRedirectToAfterAuth } from "../../auth/actions/auth.actions";
import { tempCartIdForLoggedInUser } from "../../cart/actions/cart.actions";
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addProductToCart: async productDetails => {
      return dispatch(addProductToCart(productDetails));
    },
    getProductDescription: productCode => {
      dispatch(getProductDescription(productCode));
    },
    displayToast: val => {
      dispatch(displayToast(val));
    },
    setUrlToRedirectToAfterAuth: url => {
      dispatch(setUrlToRedirectToAfterAuth(url));
    },
    buyNow: async productDetails => {
      return dispatch(tempCartIdForLoggedInUser(productDetails));
    }
  };
};
const mapStateToProps = state => {
  return {
    productDetails: state.productDescription.productDetails
  };
};

const ProductSellerContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductSellerPage)
);

export default ProductSellerContainer;
