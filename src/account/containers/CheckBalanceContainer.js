import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { setHeaderText } from "../../general/header.actions";
import CheckBalance from "../components/CheckBalance";
import {
  redeemCliqVoucher,
  getCliqCashDetails
} from "../actions/account.actions";
import {
  CLIQ_CASH_MODULE,
  showModal,
  POP_UP,
  hideModal,
  CLIQ_CASH_SUCESS_MODULE
} from "../../general/modal.actions";
import { displayToast } from "../../general/toast.actions";

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
    },
    redeemCliqVoucher: cliqCashDetails => {
      dispatch(redeemCliqVoucher(cliqCashDetails));
      dispatch(getCliqCashDetails());
    },
    cliqCashSuccessModule: result => {
      dispatch(
        showModal(CLIQ_CASH_SUCESS_MODULE, {
          ...result,
          showCliqCashModule: data => {
            dispatch(showModal(CLIQ_CASH_MODULE, data));
          }
        })
      );
    },
    displayToast: error => {
      dispatch(displayToast(error));
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
    userAddress: state.profile.userAddress,
    cliqCashVoucherDetailsStatus: state.profile.cliqCashVoucherDetailsStatus,
    cliqCashVoucherDetails: state.profile.cliqCashVoucherDetails,
    cliqCashVoucherDetailsError: state.profile.cliqCashVoucherDetailsError
  };
};

const CheckBalanceContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CheckBalance)
);

export default CheckBalanceContainer;
