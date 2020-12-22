import { connect } from "react-redux";
import { logoutUser } from "../actions/account.actions";
import { withRouter } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";
import { displayToast } from "../../general/toast.actions";
import {
  generateCartIdForAnonymous,
  getMinicartProducts,
} from "../../cart/actions/cart.actions";
import { resetUserAddressAfterLogout } from "../../account/actions/account.actions.js";
import { setFalseForAllAuthCallHasSucceedFlag } from "../../auth/actions/auth.actions";
import { setBagCount } from "../../general/header.actions";
const mapDispatchToProps = dispatch => {
  return {
    displayToast: message => {
      dispatch(displayToast(message));
    },
    logoutUser: async () => {
      return await dispatch(logoutUser());
    },
    generateCartIdForAnonymous: async () => {
      return await dispatch(generateCartIdForAnonymous());
    },
    setFalseForAllAuthCallHasSucceedFlag: () => {
      dispatch(setFalseForAllAuthCallHasSucceedFlag());
    },
    setBagCount: bagCount => {
      dispatch(setBagCount(bagCount));
    },
    getMinicartProducts: async () => {
      return dispatch(getMinicartProducts());
    },
    resetUserAddressAfterLogout: () => {
      dispatch(resetUserAddressAfterLogout());
    },
  };
};

const mapStateToProps = state => {
  return {
    isMNLLogin: state.mobileNumberLogin.isMNLLogin,
  };
};

const LogoutButtonContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LogoutButton)
);

export default LogoutButtonContainer;
