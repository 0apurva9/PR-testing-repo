import { connect } from "react-redux";
import ValidateCliqCashPopUp from "../components/ValidateCliqCashPopUp";
import {
    releaseBankOffer,
    releaseUserCoupon,
    removeCliqCash,
    resetAllPaymentModes,
    loyaltyDetails,
    applyRemoveloyaltyPoints,
} from "../actions/cart.actions";
import { withRouter } from "react-router";
import { showModal, hideModal } from "../../general/modal.actions";
const mapDispatchToProps = dispatch => {
    return {
        releaseBankOffer: couponCode => {
            return dispatch(releaseBankOffer(couponCode));
        },
        releaseUserCoupon: couponCode => {
            return dispatch(releaseUserCoupon(couponCode));
        },
        showModal: (type, couponList) => {
            dispatch(showModal(type, couponList));
        },
        closeModal: () => {
            dispatch(hideModal());
        },
        removeCliqCash: () => {
            return dispatch(removeCliqCash());
        },
        resetAllPaymentModes: () => {
            return dispatch(resetAllPaymentModes());
        },
        loyaltyDetails: () => {
            return dispatch(loyaltyDetails());
        },
        removeloyaltyPoints: async (guId, method, totalLoyaltyPoints, appliedLoyaltyPoints) => {
            return await dispatch(applyRemoveloyaltyPoints(guId, method, totalLoyaltyPoints, appliedLoyaltyPoints));
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
const ValidateCliqCashPopUpContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(ValidateCliqCashPopUp));
export default ValidateCliqCashPopUpContainer;
