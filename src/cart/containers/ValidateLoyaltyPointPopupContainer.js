import { connect } from "react-redux";
import ValidateLoyaltyPointPopup from "../components/ValidateLoyaltyPointPopup";
import {
    applyRemoveloyaltyPoints,
    releaseUserCoupon,
    resetAllPaymentModes,
    loyaltyDetails,
} from "../actions/cart.actions";
import { withRouter } from "react-router";
import { showModal, hideModal } from "../../general/modal.actions";
const mapDispatchToProps = dispatch => {
    return {
        releaseUserCoupon: couponCode => {
            return dispatch(releaseUserCoupon(couponCode));
        },
        showModal: (type, couponList) => {
            dispatch(showModal(type, couponList));
        },
        closeModal: () => {
            dispatch(hideModal());
        },
        resetAllPaymentModes: () => {
            return dispatch(resetAllPaymentModes());
        },
        removeloyaltyPoints: async (guId, method, totalLoyaltyPoints, appliedLoyaltyPoints) => {
            return await dispatch(applyRemoveloyaltyPoints(guId, method, totalLoyaltyPoints, appliedLoyaltyPoints));
        },
        loyaltyDetails: () => {
            return dispatch(loyaltyDetails());
        },
    };
};

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        bankOffers: state.cart.paymentModes && state.cart.paymentModes.paymentOffers,
        nceOffers: state.cart.bankAndTenureDetails,
        cart: state.cart,
    };
};
const ValidateLoyaltyPointPopupContainer = withRouter(
    connect(mapStateToProps, mapDispatchToProps)(ValidateLoyaltyPointPopup)
);
export default ValidateLoyaltyPointPopupContainer;
