import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import UserSavedCard from "../components/UserSavedCard.js";
import { setHeaderText } from "../../general/header.actions";
import {
  getSavedCardDetails,
  removeSavedCardDetails
} from "../actions/account.actions";
import {
  showSecondaryLoader,
  hideSecondaryLoader
} from "../../general/secondaryLoader.actions";
import { showModal, DESKTOP_AUTH } from "../../general/modal.actions";
import { setUrlToRedirectToAfterAuth } from "../../auth/actions/auth.actions.js";
const mapDispatchToProps = dispatch => {
  return {
    getSavedCardDetails: (userId, customerAccessToken) => {
      dispatch(getSavedCardDetails(userId, customerAccessToken));
    },
    setHeaderText: text => {
      dispatch(setHeaderText(text));
    },
    removeSavedCardDetails: cardToken => {
      dispatch(removeSavedCardDetails(cardToken));
    },
    showSecondaryLoader: () => {
      dispatch(showSecondaryLoader());
    },
    hideSecondaryLoader: () => {
      dispatch(hideSecondaryLoader());
    },
    showAuthPopUp: () => {
      dispatch(showModal(DESKTOP_AUTH));
    },
    setUrlToRedirectToAfterAuth: url => {
      dispatch(setUrlToRedirectToAfterAuth(url));
    }
  };
};

const mapStateToProps = state => {
  return {
    profile: state.profile,
    userAddress: state.profile.userAddress
  };
};

const SavedCardContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserSavedCard)
);

export default SavedCardContainer;
