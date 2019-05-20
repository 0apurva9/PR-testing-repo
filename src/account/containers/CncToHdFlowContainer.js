import { connect } from "react-redux";
import {
  getPinCode,
  getUserDetails,
  submitCncToHdDetails
} from "../actions/account.actions";
import { withRouter } from "react-router-dom";
import CncToHdFlow from "../components/CncToHdFlow";
import { displayToast } from "../../general/toast.actions";
import { setHeaderText } from "../../general/header.actions";
import {
  showSecondaryLoader,
  hideSecondaryLoader
} from "../../general/secondaryLoader.actions";
import {
  getUserAddress,
  addUserAddress,
  captureOrderExperience
} from "../../cart/actions/cart.actions";
const mapDispatchToProps = dispatch => {
  return {
    displayToast: toastMessage => {
      dispatch(displayToast(toastMessage));
    },
    setHeaderText: text => {
      dispatch(setHeaderText(text));
    },
    showSecondaryLoader: () => {
      dispatch(showSecondaryLoader());
    },
    hideSecondaryLoader: () => {
      dispatch(hideSecondaryLoader());
    },
    getUserAddress: () => {
      dispatch(getUserAddress());
    },
    getPinCode: pinCode => {
      dispatch(getPinCode(pinCode));
    },
    addUserAddress: addressDetails => {
      return dispatch(addUserAddress(addressDetails));
    },
    getUserDetails: () => {
      dispatch(getUserDetails());
    },
    submitCncToHdDetails: (addressDetails, transactionId, orderId) => {
      return dispatch(
        submitCncToHdDetails(addressDetails, transactionId, orderId)
      );
    },
    captureOrderExperience: async (orderId, Rating) => {
      const response = await dispatch(captureOrderExperience(orderId, Rating));
      if (response.status === "success") {
        dispatch(displayToast(response.orderExperience.message));
      }
    }
  };
};
const mapStateToProps = (state, ownProps) => {
  return {
    orderDetails:
      ownProps &&
      ownProps.location &&
      ownProps.location.state &&
      ownProps.location.state.orderDetails,
    userAddress: state.cart.userAddress,
    getPincodeStatus: state.profile.getPinCodeStatus,
    getPinCodeDetails: state.profile.getPinCodeDetails,
    userDetails: state.profile.userDetails,
    orderId:
      ownProps &&
      ownProps.location &&
      ownProps.location.state &&
      ownProps.location.state.orderId
  };
};

const CncToHdFlowContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CncToHdFlow)
);

export default CncToHdFlowContainer;
