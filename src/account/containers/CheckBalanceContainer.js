import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { setHeaderText } from "../../general/header.actions";
import CheckBalance from "../components/CheckBalance";
import {} from "../actions/account.actions";
import {
  CLIQ_CASH_MODULE,
  showModal,
  POP_UP,
  hideModal
} from "../../general/modal.actions";

const mapDispatchToProps = dispatch => {
  return {
    setHeaderText: text => {
      dispatch(setHeaderText(text));
    },
    showCliqCashModule: data => {
      dispatch(showModal(CLIQ_CASH_MODULE, data));
    },
    hideModal: () => {
      dispatch(hideModal(CLIQ_CASH_MODULE));
    },
    openPopUp: data => {
      dispatch(showModal(POP_UP, data));
    }
  };
};

const mapStateToProps = state => {
  return {
    checkBalanceDetails: state.profile.checkBalanceDetails,
    checkBalanceDetailsError: state.profile.checkBalanceDetailsError,
    checkBalanceStatus: state.profile.checkBalanceStatus,
    isModal: state.profile.isModal,
    loading: state.profile.loading,
    userAddress: state.profile.userAddress
  };
};

const CheckBalanceContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CheckBalance)
);

export default CheckBalanceContainer;
