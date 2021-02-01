import { connect } from "react-redux";
import { getPromotionalCashStatement } from "../actions/account.actions";
import { withRouter } from "react-router-dom";
import { setHeaderText } from "../../general/header.actions";
import {
  showSecondaryLoader,
  hideSecondaryLoader
} from "../../general/secondaryLoader.actions";
import CliqCashPromos from "../components/CliqCashPromos";
import {
  showModal,
  GENERATE_OTP_FOR_CLIQ_CASH
} from "../../general/modal.actions";

const mapDispatchToProps = dispatch => {
  return {
    getPromotionalCashStatement: () => {
      dispatch(getPromotionalCashStatement());
    },
    setHeaderText: text => {
      dispatch(setHeaderText(text));
    },
    showSecondaryLoader: () => {
      dispatch(showSecondaryLoader());
    },
    hideSecondaryLoader: () => {
      dispatch(hideSecondaryLoader());
    },
    showKycVerification: data => {
      dispatch(showModal(GENERATE_OTP_FOR_CLIQ_CASH, data));
    }
  };
};

const mapStateToProps = state => {
  return {
    promotionalCashStatementDetails:
      state.profile.promotionalCashStatementDetails,
    userAddress: state.profile.userAddress
  };
};

const CliqCashPromosContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CliqCashPromos)
);

export default CliqCashPromosContainer;
