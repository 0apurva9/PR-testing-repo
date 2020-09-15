import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { displayToast } from "../../general/toast.actions";
import CliqGiftCard from "../components/CliqGiftCard.js";
import { setUrlToRedirectToAfterAuth } from "../../auth/actions/auth.actions";
import { getGiftCardDetails } from "../actions/account.actions";
import { setHeaderText } from "../../general/header.actions";
import {
  showModal,
  GENERATE_OTP_FOR_CLIQ_CASH,
  CLIQ_CASH_MODULE
} from "../../general/modal.actions";

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
    }
  };
};

const mapStateToProps = state => {
  return {
    giftCardsDetails: state.profile.giftCards,
    cliqCashUserDetails: state.profile.cliqCashUserDetails,
    userAddress: state.profile.userAddress
  };
};

const CliqGiftCardContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CliqGiftCard)
);

export default CliqGiftCardContainer;
