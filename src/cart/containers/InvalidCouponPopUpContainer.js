import { connect } from "react-redux";
import InvalidCouponPopUp from "../components/InvalidCouponPopUp";
import {
  releaseBankOffer,
  releaseUserCoupon,
  removeNoCostEmi
} from "../actions/cart.actions";
import { withRouter } from "react-router";
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
    }
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps
  };
};
const InvalidCouponPopUpContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(InvalidCouponPopUp)
);
export default InvalidCouponPopUpContainer;
