import { connect } from "react-redux";
import {
  getProductDescription,
  addProductToCart
} from "../actions/pdp.actions";
import SizeSelectModal from "../components/SizeSelectModal";
const mapDispatchToProps = dispatch => {
  return {
    getProductDescription: productCode => {
      return dispatch(getProductDescription(productCode));
    },
    addProductToCart: (userId, cartId, accessToken, productDetails) => {
      return dispatch(
        addProductToCart(userId, cartId, accessToken, productDetails)
      );
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
