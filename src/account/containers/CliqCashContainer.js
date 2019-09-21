import { connect } from "react-redux";
import {
  getCliqCashDetails,
  redeemCliqVoucher,
  getTransactionDetails,
  clearTransaction
} from "../actions/account.actions";
import { withRouter } from "react-router-dom";
import { setHeaderText } from "../../general/header.actions";
import {
  showSecondaryLoader,
  hideSecondaryLoader
} from "../../general/secondaryLoader.actions";
import {
  showModal,
  DESKTOP_AUTH,
  CLIQ_CASH_MODULE,
  CLIQ_CASH_SUCESS_MODULE,
  GENERATE_OTP_FOR_CLIQ_CASH,
  CLIQ_CASH_KNOW_MORE
} from "../../general/modal.actions";
import { SUCCESS_CAMEL_CASE, SUCCESS_UPPERCASE } from "../../lib/constants";
import { displayToast } from "../../general/toast.actions";
import CliqCashDesktop from "../components/CliqCashDesktop";
// const CLIQ_CASH_REDEEM_SUCCESS =
//   "Congrats!  Money has been added to your Cliq Cash balance";
const mapDispatchToProps = dispatch => {
  return {
    getCliqCashDetails: () => {
      dispatch(getCliqCashDetails());
    },
    clearTransaction: () => {
      dispatch(clearTransaction());
    },
    getTransactionDetails: () => {
      dispatch(getTransactionDetails());
    },
    redeemCliqVoucher: cliqCashDetails => {
      dispatch(redeemCliqVoucher(cliqCashDetails)).then(result => {
        if (
          result.status === "success" ||
          result.status === SUCCESS_CAMEL_CASE ||
          result.status === SUCCESS_UPPERCASE
        ) {
          dispatch(showModal(CLIQ_CASH_SUCESS_MODULE, result));
          dispatch(getCliqCashDetails());
        } else {
          dispatch(displayToast(result.error));
        }
      });
    },
    setHeaderText: text => {
      dispatch(setHeaderText(text));
    },
    showKycVerification: data => {
      dispatch(showModal(GENERATE_OTP_FOR_CLIQ_CASH, data));
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
    showCliqCashModule: data => {
      dispatch(showModal(CLIQ_CASH_MODULE, data));
    },
    showCliqCashSucessModule: data => {
      dispatch(showModal(CLIQ_CASH_SUCESS_MODULE, data));
    },
    cliqCashKnowMore: data => {
      dispatch(showModal(CLIQ_CASH_KNOW_MORE, data));
    }
  };
};

const mapStateToProps = state => {
  return {
    cliqCashUserDetails: state.profile.cliqCashUserDetails,
    cliqCashVoucherDetailsStatus: state.profile.cliqCashVoucherDetailsStatus,
    cliqCashVoucherDetails: state.profile.cliqCashVoucherDetails,
    cliqCashVoucherDetailsError: state.profile.cliqCashVoucherDetailsError,
    transactionDetails:
      state.profile.transactionDetails &&
      state.profile.transactionDetails.transactions,
    transactionDetailsStatus: state.profile.transactionDetailsStatus,
    transactionDetailsError: state.profile.transactionDetailsError,
    loading: state.profile.loading,
    userAddress: state.profile.userAddress
  };
};

const CliqCashContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CliqCashDesktop)
);

export default CliqCashContainer;
