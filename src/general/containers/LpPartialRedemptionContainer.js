import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { showModal, hideModal, CLIQ_CASH_LOYALTY_ALERT } from "../modal.actions";
import LpPartialRedemption from "../components/LpPartialRedemption";
import { applyRemoveloyaltyPoints } from "../../cart/actions/cart.actions";
import { displayToast } from "../toast.actions";

const mapDispatchToProps = dispatch => {
    return {
        showCliqCashModule: data => {
            dispatch(showModal(CLIQ_CASH_LOYALTY_ALERT, data));
        },
        hideModal: () => {
            dispatch(hideModal());
        },
        displayToast: message => {
            dispatch(displayToast(message));
        },
        applyRemoveloyaltyPoints: async (guId, method, totalLoyaltyPoints, appliedLoyaltyPoints) => {
            return await dispatch(applyRemoveloyaltyPoints(guId, method, totalLoyaltyPoints, appliedLoyaltyPoints));
        },
    };
};

const mapStateToProps = state => {
    return state;
};

const LpPartialRedemptionContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(LpPartialRedemption));

export default LpPartialRedemptionContainer;
