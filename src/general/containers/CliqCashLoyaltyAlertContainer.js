import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { showModal, hideModal, CLIQ_CASH_LOYALTY_ALERT } from "../modal.actions";
import CliqCashLoyaltyAlert from "../components/CliqCashLoyaltyAlert";

const mapDispatchToProps = dispatch => {
    return {
        showCliqCashModule: data => {
            dispatch(showModal(CLIQ_CASH_LOYALTY_ALERT, data));
        },
        hideModal: () => {
            dispatch(hideModal());
        },
    };
};

const mapStateToProps = state => {
    return state;
};

const CliqCashLoyaltyAlertContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(CliqCashLoyaltyAlert));

export default CliqCashLoyaltyAlertContainer;
