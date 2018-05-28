import { connect } from "react-redux";
import { signUpUser } from "../actions/user.actions.js";
import { withRouter } from "react-router-dom";
import { displayToast } from "../../general/toast.actions.js";
import { clearUrlToRedirectToAfterAuth } from "../../auth/actions/auth.actions.js";

import SignUp from "../components/SignUp.js";
import {
  setDataLayerForSignupProcess,
  ADOBE_SIGN_UP_START
} from "../../lib/adobeUtils.js";
const mapDispatchToProps = dispatch => {
  return {
    onSubmit: userSignUpDetails => {
      setDataLayerForSignupProcess(ADOBE_SIGN_UP_START);
      dispatch(signUpUser(userSignUpDetails));
    },
    displayToast: message => {
      dispatch(displayToast(message));
    },
    clearUrlToRedirectToAfterAuth: () => {
      dispatch(clearUrlToRedirectToAfterAuth());
    }
  };
};

const mapStateToProps = state => {
  return {
    authCallsInProcess: state.auth.authCallsInProcess,
    authCallsIsSucceed: state.auth.authCallsIsSucceed,
    redirectToAfterAuthUrl: state.auth.redirectToAfterAuthUrl
  };
};

const SignUpContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SignUp)
);
export default SignUpContainer;
