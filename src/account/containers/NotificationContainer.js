import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Notification from "../components/Notification.js";
import {
  getUserNotifications,
  setSMSNotification
} from "../actions/account.actions";
import {
  showSecondaryLoader,
  hideSecondaryLoader
} from "../../general/secondaryLoader.actions";

const mapDispatchToProps = dispatch => {
  return {
    getUserNotifications: () => {
      dispatch(getUserNotifications());
    },
    showSecondaryLoader: () => {
      dispatch(showSecondaryLoader());
    },
    hideSecondaryLoader: () => {
      dispatch(hideSecondaryLoader());
    },
    onSMSToggle: val => {
      dispatch(setSMSNotification(val));
    }
  };
};
const mapStateToProps = state => {
  return {
    userAddress: state.profile.userAddress,
    loading: state.profile.loading,
    UserNotificationDetails: state.profile.UserNotificationDetails
  };
};

const NotificationContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Notification)
);

export default NotificationContainer;
