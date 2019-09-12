import { connect } from "react-redux";
import ProductSellerPage from "../components/ProductSellerPage";
import { withRouter } from "react-router-dom";
import {
  addProductToCart,
  getProductDescription,
  getProductPinCode
} from "../actions/pdp.actions";
import { displayToast } from "../../general/toast.actions.js";
import { setUrlToRedirectToAfterAuth } from "../../auth/actions/auth.actions";
import { tempCartIdForLoggedInUser } from "../../cart/actions/cart.actions";
import { SUCCESS, DEFAULT_PIN_CODE_LOCAL_STORAGE } from "../../lib/constants";
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addProductToCart: async productDetails => {
      return dispatch(addProductToCart(productDetails));
    },
    getProductDescription: productCode => {
      return dispatch(getProductDescription(productCode));
    },
    displayToast: val => {
      dispatch(displayToast(val));
    },
    setUrlToRedirectToAfterAuth: url => {
      dispatch(setUrlToRedirectToAfterAuth(url));
    },
    buyNow: async productDetails => {
      return dispatch(tempCartIdForLoggedInUser(productDetails));
    },
    getProductPinCode: (pinCode, productCode) => {
      dispatch(getProductPinCode(pinCode, productCode));
    }
  };
};
const mapStateToProps = state => {
  return {
    productDetails: state.productDescription.productDetails,
    serviceablePincodeList:
      state.productDescription.serviceablePincodeListResponse
  };
};

const ProductSellerContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductSellerPage)
);

export default ProductSellerContainer;
