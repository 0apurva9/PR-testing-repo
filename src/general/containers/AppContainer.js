import { connect } from "react-redux";
import { showModal } from "../modal.actions.js";
import {
  facebookLogin,
  googlePlusLogin,
  getGlobalAccessToken,
  refreshToken
} from "../../auth/actions/user.actions";
import {
  generateCartIdForLoggedInUser,
  generateCartIdForAnonymous,
  mergeCartId
} from "../../cart/actions/cart.actions.js";
import { withRouter } from "react-router-dom";
import App from "../../App.js";

const mapDispatchToProps = dispatch => {
  return {
    showModal: type => {
      dispatch(showModal(type));
    },
    facebookLogin: type => {
      dispatch(facebookLogin(type));
    },
    googlePlusLogin: type => {
      dispatch(googlePlusLogin(type));
    },
    getGlobalAccessToken: () => {
      dispatch(getGlobalAccessToken());
    },
    refreshToken: () => {
      dispatch(refreshToken());
    },
    generateCartIdForLoggedInUser: () => {
      dispatch(generateCartIdForLoggedInUser());
    },
    generateCartIdForAnonymous: () => {
      dispatch(generateCartIdForAnonymous());
    }
  };
};

const mapStateToProps = state => {
  return {
    modalStatus: state.modal.modalDisplayed,
    cart: state.cart
  };
};

const AppContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(App)
);

export default AppContainer;
