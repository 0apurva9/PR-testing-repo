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
import { SUCCESS_CAMEL_CASE, SUCCESS_UPPERCASE } from "../../lib/constants";
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
