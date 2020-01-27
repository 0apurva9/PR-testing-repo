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
import { displayToast } from "../../general/toast.actions.js";

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
    },
    displayToast: val => {
      dispatch(displayToast(val));
    }
  };
};
const mapStateToProps = state => {
  return {
    userAddress: state.profile.userAddress,
    loading: state.profile.loading,
    UserNotificationDetails: state.profile.UserNotificationDetails,
    UserNotificationConfig: state.profile.UserNotificationConfig,
    notificationHeaderText: state.profile.UserNotificationHeaderText
  };
};

const NotificationContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Notification)
);

export default NotificationContainer;
