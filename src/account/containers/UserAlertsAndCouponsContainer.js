import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import UserAlertsAndCoupons from "../components/UserAlertsAndCoupons";
import { getUserCoupons, getUserAlerts } from "../actions/account.actions";
import { setHeaderText } from "../../general/header.actions";
import { showModal, DESKTOP_AUTH } from "../../general/modal.actions";
const mapDispatchToProps = dispatch => {
  return {
    getUserCoupons: () => {
      dispatch(getUserCoupons());
    },
    getUserAlerts: () => {
      dispatch(getUserAlerts());
    },
    setHeaderText: text => {
      dispatch(setHeaderText(text));
    },
    showAuthPopUp: () => {
      dispatch(showModal(DESKTOP_AUTH));
    }
  };
};
const mapStateToProps = state => {
  return {
    userCoupons: state.profile.userCoupons,
    userAlerts: state.profile.userAlerts,
    loadingForUserCoupons: state.profile.loadingForUserCoupons,
    loadingForUserAlerts: state.profile.loadingForUserAlerts,
    userAddress: state.profile.userAddress
  };
};
const UserAlertsAndCouponsContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserAlertsAndCoupons)
);
export default UserAlertsAndCouponsContainer;
