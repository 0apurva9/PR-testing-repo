import { connect } from "react-redux";
import NonEmiEligibleToWishlist from "../components/NonEmiEligibleToWishlist";
import { hideModal } from "../../general/modal.actions";
import { addAllToWishList } from "../../wishlist/actions/wishlist.actions";
import {
  SUCCESS,
  PRODUCT_ADDED_TO_WISHLIST,
  DEFAULT_PIN_CODE_LOCAL_STORAGE
} from "../../lib/constants";
import { displayToast } from "../../general/toast.actions";
import { getOrderSummary } from "../actions/cart.actions";
const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => {
      dispatch(hideModal());
    },
    addAllToWishList: async ussid => {
      const wishlistResponse = await dispatch(addAllToWishList(ussid));
      if (wishlistResponse.status === SUCCESS) {
        let pinCode = localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE);
        dispatch(getOrderSummary(pinCode));
        dispatch(hideModal());
        dispatch(displayToast(PRODUCT_ADDED_TO_WISHLIST));
      }
    }
  };
};
const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps
  };
};
const NonEmiEligibleToWishlistContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NonEmiEligibleToWishlist);
export default NonEmiEligibleToWishlistContainer;
