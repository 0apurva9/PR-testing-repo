import { connect } from "react-redux";
import {
  getProductDescription,
  addProductToCart
} from "../actions/pdp.actions";
import {
  SUCCESS,
  DEFAULT_PIN_CODE_LOCAL_STORAGE,
  PRODUCT_CART_ROUTER
} from "../../lib/constants.js";
import SizeSelectModal from "../components/SizeSelectModal";
import { displayToast } from "../../general/toast.actions.js";
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getProductDescription: productCode => {
      return dispatch(getProductDescription(productCode));
    },
    addProductToCart: async (userId, cartId, accessToken, productDetails) => {
      const setProductToCart = await dispatch(
        addProductToCart(userId, cartId, accessToken, productDetails)
      );
      if (
        setProductToCart &&
        setProductToCart.status &&
        setProductToCart.status === SUCCESS
      ) {
        if (ownProps.defaultFlag === true) {
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
