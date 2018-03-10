import { connect } from "react-redux";
import ProductSellerPage from "../components/ProductSellerPage";
import { withRouter } from "react-router-dom";
import {
  addProductToWishList,
  addProductToCart,
  getProductDescription
} from "../actions/pdp.actions";
const mapDispatchToProps = dispatch => {
  return {
    addProductToCart: (userId, cartId, accessToken, productDetails) => {
      dispatch(addProductToCart(userId, cartId, accessToken, productDetails));
    },
    addProductToWishList: (userId, accessToken, productDetails) => {
      dispatch(addProductToWishList(userId, accessToken, productDetails));
    },
    getProductDescription: productCode => {
      dispatch(getProductDescription(productCode));
    }
  };
};
const mapStateToProps = state => {
  console.log(state);
  return {
    productDetails: state.productDescription.productDetails
  };
};

const ProductSellerContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductSellerPage)
);

export default ProductSellerContainer;
