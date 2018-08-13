import { connect } from "react-redux";
import ProductSellerPage from "../components/ProductSellerPage";
import { withRouter } from "react-router-dom";
import {
  addProductToCart,
  getProductDescription
} from "../actions/pdp.actions";
import {
  SUCCESS,
  ADD_TO_BAG_TEXT,
  PRODUCT_CART_ROUTER
} from "../../lib/constants.js";
import { displayToast } from "../../general/toast.actions.js";
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addProductToCart: async (
      userId,
      cartId,
      accessToken,
      productDetails,
      buyNowFlag
    ) => {
      const addProductToCartResponse = await dispatch(
        addProductToCart(
          userId,
          cartId,
          accessToken,
          productDetails,
          buyNowFlag
        )
      );
      if (
        addProductToCartResponse &&
        addProductToCartResponse.status === SUCCESS
      ) {
        if (buyNowFlag === true) {
          ownProps.history.push({
            pathname: PRODUCT_CART_ROUTER
          });
        } else {
          dispatch(displayToast(ADD_TO_BAG_TEXT));
        }
      }
    },
    getProductDescription: productCode => {
      dispatch(getProductDescription(productCode));
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
