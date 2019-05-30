import { connect } from "react-redux";
import {
  getCliqCashDetails,
  redeemCliqVoucher,
  getTransactionDetails
} from "../actions/account.actions";
import { withRouter } from "react-router-dom";
import CliqAndCash from "../components/CliqAndCash.js";
import { setHeaderText, SUCCESS } from "../../general/header.actions";
import {
  showSecondaryLoader,
  hideSecondaryLoader
} from "../../general/secondaryLoader.actions";
import { showModal, DESKTOP_AUTH } from "../../general/modal.actions";
import { SUCCESS_CAMEL_CASE, SUCCESS_UPPERCASE } from "../../lib/constants";
import { displayToast } from "../../general/toast.actions";
import CliqCash from "../components/CliqCash";
const CLIQ_CASH_REDEEM_SUCCESS =
  "Congrats!  Money has been added to your Cliq Cash balance";
const mapDispatchToProps = dispatch => {
  return {
    getCliqCashDetails: () => {
      dispatch(getCliqCashDetails());
    },
    getTransactionDetails: (startDate, endDate) => {
      dispatch(getTransactionDetails(startDate, endDate));
    },
    redeemCliqVoucher: cliqCashDetails => {
      dispatch(redeemCliqVoucher(cliqCashDetails)).then(result => {
        if (
          result.status === "success" ||
          result.status === SUCCESS_CAMEL_CASE ||
          result.status === SUCCESS_UPPERCASE
        ) {
          dispatch(displayToast(CLIQ_CASH_REDEEM_SUCCESS));
          dispatch(getCliqCashDetails());
        } else {
          dispatch(displayToast(result.error));
        }
      });
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
    showAuthPopUp: () => {
      dispatch(showModal(DESKTOP_AUTH));
    }
  };
};

const mapStateToProps = state => {
  return {
    cliqCashUserDetails: state.profile.cliqCashUserDetails,
    cliqCashVoucherDetailsStatus: state.profile.cliqCashVoucherDetailsStatus,
    cliqCashVoucherDetails: state.profile.cliqCashVoucherDetails,
    cliqCashVoucherDetailsError: state.profile.cliqCashVoucherDetailsError,
    transactionDetails: state.profile.transactionDetails,
    transactionDetailsStatus: state.profile.transactionDetailsStatus,
    transactionDetailsError: state.profile.transactionDetailsError,
    loading: state.profile.loading,
    userAddress: state.profile.userAddress
  };
};

const CliqCashContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CliqCash)
);

export default CliqCashContainer;
