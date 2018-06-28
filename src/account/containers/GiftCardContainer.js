import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import GiftCard from "../components/GiftCard.js";
import {
  getGiftCardDetails,
  createGiftCardDetails,
  clearGiftCardStatus
} from "../actions/account.actions";
import { setHeaderText } from "../../general/header.actions";
import { displayToast } from "../../general/toast.actions";
import {
  showSecondaryLoader,
  hideSecondaryLoader
} from "../../general/secondaryLoader.actions";
import { showModal, DESKTOP_AUTH } from "../../general/modal.actions";
import { setUrlToRedirectToAfterAuth } from "../../auth/actions/auth.actions.js";
const mapDispatchToProps = dispatch => {
  return {
    displayToast: toastMessage => {
      dispatch(displayToast(toastMessage));
    },
    getGiftCardDetails: () => {
      dispatch(getGiftCardDetails());
    },
    setHeaderText: text => {
      dispatch(setHeaderText(text));
    },
    createGiftCardDetails: giftCardDetails => {
      dispatch(createGiftCardDetails(giftCardDetails));
    },
    clearGiftCardStatus: () => {
      dispatch(clearGiftCardStatus());
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
    giftCardsDetails: state.profile.giftCards,
    giftCardDetailsStatus: state.profile.giftCardDetailsStatus,
    giftCardDetails: state.profile.giftCardDetails,
    loadingForGiftCardDetails: state.profile.loadingForGiftCardDetails
  };
};

const GiftCardContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(GiftCard)
);

export default GiftCardContainer;
