import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import MyAccount from "../components/MyAccount";
import { setHeaderText } from "../../general/header.actions";
import { setUrlToRedirectToAfterAuth } from "../../auth/actions/auth.actions.js";
import { displayToast } from "../../general/toast.actions.js";
import { getUserAddress } from "../../cart/actions/cart.actions";
const mapDispatchToProps = dispatch => {
  return {
    displayToast: message => {
      dispatch(displayToast(message));
    },
    setHeaderText: text => {
      dispatch(setHeaderText(text));
    },
    setUrlToRedirectToAfterAuth: url => {
      dispatch(setUrlToRedirectToAfterAuth(url));
    },
    getUserAddress: () => {
      dispatch(getUserAddress(true));
    }
  };
};
const mapStateToProps = state => {
  return {
    userDetails: state.profile.userDetails,
    userAddress: state.profile.userAddress
  };
};
const MyAccountContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MyAccount)
);
export default MyAccountContainer;
