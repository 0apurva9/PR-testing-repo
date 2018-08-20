import { connect } from "react-redux";
import ProductSellerPage from "../components/ProductSellerPage";
import { withRouter } from "react-router-dom";
import {
  addProductToCart,
  getProductDescription
} from "../actions/pdp.actions";
import { displayToast } from "../../general/toast.actions.js";
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addProductToCart: async (userId, cartId, accessToken, productDetails) => {
      return dispatch(
        addProductToCart(userId, cartId, accessToken, productDetails)
      );
    },
    getProductDescription: productCode => {
      dispatch(getProductDescription(productCode));
    },
    displayToast: val => {
      dispatch(displayToast(val));
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
