import { connect } from "react-redux";
import { logoutUser } from "../actions/account.actions";
import { withRouter } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";
import { displayToast } from "../../general/toast.actions";
import { generateCartIdForAnonymous } from "../../cart/actions/cart.actions";
import { setFalseForAllAuthCallHasSucceedFlag } from "../../auth/actions/auth.actions";
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
    }
  };
};
const LogoutButtonContainer = withRouter(
  connect(null, mapDispatchToProps)(LogoutButton)
);

export default LogoutButtonContainer;
