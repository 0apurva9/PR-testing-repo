import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { CASHBACK_DETAILS_POPUP, showModal, hideModal } from "../modal.actions";
import CashBackDetailsPopup from "../components/CashBackDetailsPopup";

const mapDispatchToProps = dispatch => {
  return {
    showCliqCashModule: data => {
      dispatch(showModal(CASHBACK_DETAILS_POPUP, data));
    },
    hideModal: () => {
      dispatch(hideModal());
    }
  };
};

const mapStateToProps = () => {
  return {};
};

const CashBackDetailsPopupContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CashBackDetailsPopup)
);

export default CashBackDetailsPopupContainer;
