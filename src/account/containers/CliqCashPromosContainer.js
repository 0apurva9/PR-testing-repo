import { connect } from "react-redux";
import { getPromotionalCashStatement } from "../actions/account.actions";
import { withRouter } from "react-router-dom";
import { setHeaderText } from "../../general/header.actions";
import {
  showSecondaryLoader,
  hideSecondaryLoader
} from "../../general/secondaryLoader.actions";
import CliqCashPromos from "../components/CliqCashPromos";

const mapDispatchToProps = dispatch => {
  return {
    getPromotionalCashStatement: data => {
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
    }
  };
};

const mapStateToProps = state => {
  return {
    promotionalCashStatementDetails:
      state.profile.promotionalCashStatementDetails
  };
};

const CliqCashPromosContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CliqCashPromos)
);

export default CliqCashPromosContainer;
