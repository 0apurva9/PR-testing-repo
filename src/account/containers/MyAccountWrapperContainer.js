import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import MyAccountWrapper from "../components/MyAccountWrapper.js";
import { getUserAddress } from "../../cart/actions/cart.actions";
import { setUrlToRedirectToAfterAuth } from "../../auth/actions/auth.actions.js";
import { showMobileNumberLoginModal } from "../../general/modal.actions";
const mapDispatchToProps = dispatch => {
    return {
        getUserAddress: () => {
            dispatch(getUserAddress());
        },
        setUrlToRedirectToAfterAuth: url => {
            dispatch(setUrlToRedirectToAfterAuth(url));
        },
        openMobileNumberLoginModal: () => {
            dispatch(showMobileNumberLoginModal());
        },
    };
};

const mapStateToProps = state => {
    return {
        userAddress: state.profile.userAddress,
        isMNLLogin: state.mobileNumberLogin.isMNLLogin,
    };
};

const MyAccountWrapperContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(MyAccountWrapper));
export default MyAccountWrapperContainer;
