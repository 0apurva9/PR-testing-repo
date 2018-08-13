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
      defaultFlag
    ) => {
      const setProductToCart = await dispatch(
        addProductToCart(
          userId,
          cartId,
          accessToken,
          productDetails,
          defaultFlag
        )
      );
      if (
        setProductToCart &&
        setProductToCart.status &&
        setProductToCart.status === SUCCESS
      ) {
        if (defaultFlag === true) {
          const defaultPinCode = localStorage.getItem(
            DEFAULT_PIN_CODE_LOCAL_STORAGE
          );
          ownProps.history.push({
            pathname: PRODUCT_CART_ROUTER,
            state: {
              ProductCode: productDetails.code,
              pinCode: defaultPinCode
            }
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
