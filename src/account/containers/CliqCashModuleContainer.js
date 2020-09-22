import { connect } from "react-redux";
import {
  getCliqCashDetails,
  redeemCliqVoucher,
  checkBalance
} from "../actions/account.actions";
import { withRouter } from "react-router-dom";
import {
  showSecondaryLoader,
  hideSecondaryLoader
} from "../../general/secondaryLoader.actions";
import {
  showModal,
  CLIQ_CASH_MODULE,
  CLIQ_CASH_SUCESS_MODULE
} from "../../general/modal.actions";
import { SUCCESS_CAMEL_CASE, SUCCESS_UPPERCASE } from "../../lib/constants";
import { displayToast } from "../../general/toast.actions";
import CliqCashModule from "../components/CliqCashModule";
import { setHeaderText } from "../../general/header.actions";
const mapDispatchToProps = dispatch => {
  return {
    redeemCliqVoucher: cliqCashDetails => {
      dispatch(redeemCliqVoucher(cliqCashDetails)).then(result => {
        if (
          result.status === "success" ||
          result.status === SUCCESS_CAMEL_CASE ||
          result.status === SUCCESS_UPPERCASE
        ) {
          dispatch(
            showModal(CLIQ_CASH_SUCESS_MODULE, {
              ...result,
              showCliqCashModule: data => {
                dispatch(showModal(CLIQ_CASH_MODULE, data));
              }
            })
          );
          dispatch(getCliqCashDetails());
        } else {
          dispatch(displayToast(result.error));
        }
      });
    },
    setHeaderText: text => {
      dispatch(setHeaderText(text));
    },
    checkBalance: checkBalanceDetails => {
      dispatch(checkBalance(checkBalanceDetails));
    },
    showSecondaryLoader: () => {
      dispatch(showSecondaryLoader());
    },
    hideSecondaryLoader: () => {
      dispatch(hideSecondaryLoader());
    },
    showCliqCashModule: data => {
      dispatch(showModal(CLIQ_CASH_MODULE, data));
    }
  };
};

const mapStateToProps = state => {
  return {
    loading: state.profile.loading,
    checkBalanceDetailsError: state.profile.checkBalanceDetailsError,
    checkBalanceStatus: state.profile.checkBalanceStatus
  };
};
const CliqCashModuleContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CliqCashModule)
);

export default CliqCashModuleContainer;
