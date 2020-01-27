import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import UserSavedCard from "../components/UserSavedCard.js";
import { setHeaderText } from "../../general/header.actions";
import {
  getSavedCardDetails,
  removeSavedCardDetails,
  removeSavedUpiDetails,
  addUPIDetails
} from "../actions/account.actions";
import {
  showSecondaryLoader,
  hideSecondaryLoader
} from "../../general/secondaryLoader.actions";
import {
  showModal,
  DESKTOP_AUTH
  // UPIHOWTOPAY_MODAL
} from "../../general/modal.actions";
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
    removeSavedUpiDetails: upiId => {
      dispatch(removeSavedUpiDetails(upiId));
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
    addUPIDetails: async (val, pageType) => {
      const res = await dispatch(addUPIDetails(val, pageType));
      return res;
    }
  };
};

const mapStateToProps = state => {
  return {
    profile: state.profile,
    userAddress: state.profile.userAddress,
    loading: state.profile.loading,
    addUserUPIStatus: state.profile.addUserUPIStatus
  };
};

const SavedCardContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserSavedCard)
);

export default SavedCardContainer;
