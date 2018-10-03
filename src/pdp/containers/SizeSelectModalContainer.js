import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  getProductDescription,
  addProductToCart
} from "../actions/pdp.actions";
import { SUCCESS, ADD_TO_BAG_TEXT } from "../../lib/constants.js";
import SizeSelectModal from "../components/SizeSelectModal";
import { displayToast } from "../../general/toast.actions.js";
import { tempCartIdForLoggedInUser } from "../../cart/actions/cart.actions";
import { setUrlToRedirectToAfterAuth } from "../../auth/actions/auth.actions";
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getProductDescription: productCode => {
      return dispatch(getProductDescription(productCode));
    },
    addProductToCart: async productDetails => {
      const addProductToCartResponse = await dispatch(
        addProductToCart(productDetails)
      );
      if (
        addProductToCartResponse &&
        addProductToCartResponse.status === SUCCESS
      ) {
        dispatch(displayToast(ADD_TO_BAG_TEXT));
      }
    },
    buyNow: productDetails => {
      return dispatch(tempCartIdForLoggedInUser(productDetails));
    },
    displayToast: errorMessage => {
      dispatch(displayToast(errorMessage));
    },
    setUrlToRedirectToAfterAuth: url => {
      dispatch(setUrlToRedirectToAfterAuth(url));
    }
  };
};
const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    isFromModal: true
  };
};
const SizeSelectModalContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SizeSelectModal)
);
export default SizeSelectModalContainer;
