import { connect } from "react-redux";
import { getWishListItems, removeProductFromWishList, getWishlist } from "../../wishlist/actions/wishlist.actions";
import { withRouter } from "react-router-dom";
import SaveListDetails from "../components/SaveListDetails";
import { setHeaderText } from "../../general/header.actions";
import { displayToast } from "../../general/toast.actions";
import { addProductToCart, verifyIMEINumber } from "../../pdp/actions/pdp.actions";
import { SUCCESS } from "../../lib/constants";
import { SUCCESS_FOR_ADDING_TO_BAG } from "../../lib/constants.js";
import { showModal, DESKTOP_AUTH } from "../../general/modal.actions";
import { showSecondaryLoader, hideSecondaryLoader } from "../../general/secondaryLoader.actions";
const REMOVED_SAVELIST = "Removed Successfully";

const mapDispatchToProps = dispatch => {
    return {
        getWishList: () => {
            dispatch(getWishListItems(true)); // true is passing for set data layer on my account save list tab
        },
        setHeaderText: text => {
            dispatch(setHeaderText(text));
        },
        showAuthPopUp: () => {
            dispatch(showModal(DESKTOP_AUTH));
        },
        addProductToCart: productDetails => {
            dispatch(showSecondaryLoader());
            dispatch(addProductToCart(productDetails)).then(result => {
                if (result.status === SUCCESS) {
                    dispatch(removeProductFromWishList(productDetails)).then(response => {
                        if (response.status === SUCCESS) {
                            dispatch(displayToast(SUCCESS_FOR_ADDING_TO_BAG));
                        }
                        dispatch(hideSecondaryLoader());
                    });
                }
                if (result.status === "error") {
                    dispatch(hideSecondaryLoader());
                }
            });
        },
        removeProductFromWishList: productDetails => {
            dispatch(removeProductFromWishList(productDetails)).then(response => {
                if (response.status === SUCCESS) {
                    dispatch(displayToast(REMOVED_SAVELIST));
                    dispatch(getWishlist());
                }
            });
        },
        verifyIMEINumber: async (
            IMEINumber,
            exchangeProductId,
            exchangeAmountCashify,
            tulBump,
            pickUpCharge,
            listingId,
            ussId,
            wishlistName
        ) => {
            return await dispatch(
                verifyIMEINumber(
                    IMEINumber,
                    exchangeProductId,
                    exchangeAmountCashify,
                    tulBump,
                    pickUpCharge,
                    listingId,
                    ussId,
                    wishlistName
                )
            );
        },
    };
};
const mapStateToProps = state => {
    return {
        wishList: state.wishlistItems.wishlistItems,
        loading: state.wishlistItems.loading,
        count: state.wishlistItems.count,
        userAddress: state.profile.userAddress,
        wishlistName: state.wishlistItems.name,
    };
};

const SaveListContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(SaveListDetails));

export default SaveListContainer;
