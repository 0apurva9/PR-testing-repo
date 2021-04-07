import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import HeaderWrapper from "../components/HeaderWrapper";
import { setHeaderText } from "../header.actions.js";
import { showFilter, hideFilter, userSelectedOutOfStock, isMPLWebMNLLogin } from "../../plp/actions/plp.actions.js";
import { showModal, DESKTOP_AUTH, showMobileNumberLoginModal } from "../../general/modal.actions.js";
import { setUrlToRedirectToAfterAuth } from "../../auth/actions/auth.actions.js";
import { getHeader } from "../../clp/actions/clp.actions";
import { seachAbVersion } from "../../plp/actions/plp.actions.js";
import { getWishListItems, getWishlist } from "../../wishlist/actions/wishlist.actions";
const mapDispatchToProps = dispatch => {
    return {
        setHeaderText: text => {
            dispatch(setHeaderText(text));
        },
        showFilter: () => {
            dispatch(showFilter());
        },
        hideFilter: () => {
            dispatch(hideFilter());
        },
        showAuthPopUp: () => {
            dispatch(showModal(DESKTOP_AUTH));
        },
        setUrlToRedirectToAfterAuth: url => {
            dispatch(setUrlToRedirectToAfterAuth(url));
        },
        getHeader: () => {
            dispatch(getHeader());
        },
        getWishListItems: isSetDataLayer => {
            dispatch(getWishListItems(isSetDataLayer));
        },
        userSelectedOutOfStock: () => {
            dispatch(userSelectedOutOfStock(false));
        },
        getWishlist: () => {
            dispatch(getWishlist());
        },
        seachAbVersion: () => {
            dispatch(seachAbVersion());
        },
        openMobileNumberLoginModal: () => {
            dispatch(showMobileNumberLoginModal());
        },
        isMPLWebMNLLogin: () => {
            dispatch(isMPLWebMNLLogin());
        },
    };
};
const mapStateToProps = state => {
    return {
        headerText: state.header.text,
        isPlpFilterOpen: state.productListings.isFilterOpen,
        bagCount: state.header.bagCount,
        orderConfirmationDetails: state.cart.orderConfirmationDetails,
        cliqCashJusPayDetails: state.cart.cliqCashJusPayDetails,
        headerDetails: state.categoryDefault.headerDetails,
        // wishListCount: state.wishlistItems.wishlistItems,
        wishListCount: state.wishlistItems,
        minicart: state.cart.minicart,
        isMNLLogin: state.mobileNumberLogin.isMNLLogin,
    };
};

const HeaderContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderWrapper));
export default HeaderContainer;
