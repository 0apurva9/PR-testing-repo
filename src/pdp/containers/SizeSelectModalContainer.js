import { connect } from "react-redux";
import {
  getProductDescription,
  addProductToCart
} from "../actions/pdp.actions";
import { SUCCESS, ADD_TO_BAG_TEXT } from "../../lib/constants.js";
import SizeSelectModal from "../components/SizeSelectModal";
import { displayToast } from "../../general/toast.actions.js";
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
    }
  };
};
const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    isFromModal: true
  };
};
const SizeSelectModalContainer = connect(mapStateToProps, mapDispatchToProps)(
  SizeSelectModal
);
export default SizeSelectModalContainer;
