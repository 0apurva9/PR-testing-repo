import { connect } from "react-redux";
import ValidateOffersPopUp from "../components/ValidateOffersPopUp";
import {
  releaseBankOffer,
  releaseUserCoupon,
  removeNoCostEmi
} from "../actions/cart.actions";
import { withRouter } from "react-router";
import { showModal } from "../../general/modal.actions";
const mapDispatchToProps = dispatch => {
  return {
    releaseBankOffer: couponCode => {
      return dispatch(releaseBankOffer(couponCode));
    },
    releaseUserCoupon: couponCode => {
      return dispatch(releaseUserCoupon(couponCode));
    },
    releaseNoCostEmiCoupon: couponCode => {
      return dispatch(removeNoCostEmi(couponCode));
    },
    showModal: (type, couponList) => {
      dispatch(showModal(type, couponList));
    }
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    bankOffers:
      state.cart.paymentModes && state.cart.paymentModes.paymentOffers,
    nceOffers: state.cart.bankAndTenureDetails
  };
};
const ValidateOffersPopUpContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ValidateOffersPopUp)
);
export default ValidateOffersPopUpContainer;
