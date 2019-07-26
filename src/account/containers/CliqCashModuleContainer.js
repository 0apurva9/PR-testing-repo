import { connect } from "react-redux";
import {
  getCliqCashDetails,
  redeemCliqVoucher
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
    loading: state.profile.loading
  };
};
const CliqCashModuleContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CliqCashModule)
);

export default CliqCashModuleContainer;
