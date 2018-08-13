import { connect } from "react-redux";
import ProductSellerPage from "../components/ProductSellerPage";
import { withRouter } from "react-router-dom";
import {
  addProductToCart,
  getProductDescription
} from "../actions/pdp.actions";
import {
  SUCCESS,
  DEFAULT_PIN_CODE_LOCAL_STORAGE,
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
          dispatch(displayToast(" The item has been added to your bag"));
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
