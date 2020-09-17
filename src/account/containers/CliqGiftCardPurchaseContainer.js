import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { displayToast } from "../../general/toast.actions";
import { setUrlToRedirectToAfterAuth } from "../../auth/actions/auth.actions";
import {
  getGiftCardDetails,
  createGiftCardDetails,
  clearGiftCardStatus
} from "../actions/account.actions";
import { setHeaderText } from "../../general/header.actions";
import {
  showModal,
  GENERATE_OTP_FOR_CLIQ_CASH,
  CLIQ_CASH_MODULE,
  CASHBACK_DETAILS_POPUP
} from "../../general/modal.actions";
import CliqGiftCardPurchase from "../components/CliqGiftCardPurchase";

const mapDispatchToProps = dispatch => {
  return {
    displayToast: toastMessage => {
      dispatch(displayToast(toastMessage));
    },
    setUrlToRedirectToAfterAuth: url => {
      dispatch(setUrlToRedirectToAfterAuth(url));
    },
    getGiftCardDetails: () => {
      dispatch(getGiftCardDetails());
    },
    setHeaderText: text => {
      dispatch(setHeaderText(text));
    },
    showKycVerification: data => {
      dispatch(showModal(GENERATE_OTP_FOR_CLIQ_CASH, data));
    },
    showCliqCashModule: data => {
      dispatch(showModal(CLIQ_CASH_MODULE, data));
    },
    createGiftCardDetails: giftCardDetails => {
      dispatch(createGiftCardDetails(giftCardDetails));
    },
    clearGiftCardStatus: () => {
      dispatch(clearGiftCardStatus());
    },
    showCashBackDetailsPopup: data => {
      dispatch(showModal(CASHBACK_DETAILS_POPUP, data));
    }
  };
};

const mapStateToProps = state => {
  return {
    giftCardsDetails: state.profile.giftCards,
    cliqCashUserDetails: state.profile.cliqCashUserDetails,
    giftCardDetailsStatus: state.profile.giftCardDetailsStatus,
    giftCardDetails: state.profile.giftCardDetails,
    loadingForGiftCardDetails: state.profile.loadingForGiftCardDetails,
    userAddress: state.profile.userAddress
  };
};

const CliqGiftCardPurchaseContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CliqGiftCardPurchase)
);

export default CliqGiftCardPurchaseContainer;
