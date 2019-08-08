import { connect } from "react-redux";
import { displayToast } from "../../general/toast.actions";
import AddToWishListButton from "../components/AddToWishListButton";
import {
  addProductToWishList,
  getWishListItems,
  removeProductFromWishList
} from "../actions/wishlist.actions";
import { SUCCESS } from "../../lib/constants";
import { withRouter } from "react-router-dom";
import { setUrlToRedirectToAfterAuth } from "../../auth/actions/auth.actions.js";
import { removeItemFromCartLoggedIn } from "../../cart/actions/cart.actions";
import {
  DEFAULT_PIN_CODE_LOCAL_STORAGE,
  PRODUCT_ADDED_TO_WISHLIST
} from "../../lib/constants";
import { showModal, DESKTOP_AUTH } from "../../general/modal.actions.js";
//const toastMessageOnSuccessAddToWishlist = "Added";
const toastMessageOnAlreadyInWishlist = "Already in wishlist";
const REMOVED_SAVELIST = "Removed Successfully";
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addProductToWishList: async productObj => {
      const wishlistResponse = await dispatch(
        addProductToWishList(productObj, ownProps.setDataLayerType)
      );
      if (wishlistResponse.status === SUCCESS) {
        //checking here the index, if its grater than or equal to 0 then we are removing item from the cart
        if (ownProps.index >= 0) {
          dispatch(
            removeItemFromCartLoggedIn(
              ownProps.index,
              localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE)
            )
          );
        }
        dispatch(displayToast(PRODUCT_ADDED_TO_WISHLIST));
        dispatch(getWishListItems());
      }
    },
    displayToast: () => {
      dispatch(displayToast(toastMessageOnAlreadyInWishlist));
    },

    setUrlToRedirectToAfterAuth: url => {
      dispatch(setUrlToRedirectToAfterAuth(url));
    },
    removeProductFromWishList: productDetails => {
      dispatch(removeProductFromWishList(productDetails)).then(response => {
        if (response.status === SUCCESS) {
          dispatch(displayToast(REMOVED_SAVELIST));
          dispatch(getWishListItems());
        }
      });
    },
    showAuthPopUp: () => {
      dispatch(showModal(DESKTOP_AUTH));
    }
  };
};
// here mandatory props is product ojb.
const mapStateToProps = (state, ownProps) => {
  return {
    productListingId: ownProps.productListingId,
    winningUssID: ownProps.winningUssID,
    isWhite: ownProps.isWhite,
    wishlistItems: state.wishlistItems.wishlistItems,
    type: ownProps.type,
    index: ownProps.index,
    isSizeSelectedForAddToWishlist: ownProps.isSizeSelectedForAddToWishlist,
    showSizeSelector: ownProps.showSizeSelector
  };
};
const AddToWishListButtonContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddToWishListButton)
);
export default AddToWishListButtonContainer;
