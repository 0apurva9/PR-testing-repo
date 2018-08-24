import { connect } from "react-redux";
import { addUserAddress } from "../../cart/actions/cart.actions";
import { withRouter } from "react-router-dom";
import AddDeliveryAddress from "../../cart/components/AddDeliveryAddress.js";
import {
  getPinCode,
  getPinCodeSuccess,
  resetAddAddressDetails,
  getUserDetails,
  updateProfile,
  clearPinCodeStatus
} from "../actions/account.actions.js";
import {
  showSecondaryLoader,
  hideSecondaryLoader
} from "../../general/secondaryLoader.actions";
import { displayToast } from "../../general/toast.actions";
import {
  SUCCESS_CAMEL_CASE,
  SUCCESS,
  SUCCESS_UPPERCASE
} from "../../lib/constants";
import { setUrlToRedirectToAfterAuth } from "../../auth/actions/auth.actions.js";
const mapDispatchToProps = dispatch => {
  return {
    addUserAddress: addressDetails => {
      if (addressDetails.emailId && addressDetails.emailId !== "") {
        let userDetails = {};
        userDetails.emailId = addressDetails.emailId;
        dispatch(updateProfile(userDetails)).then(res => {
          if (
            res.status === SUCCESS ||
            res.status === SUCCESS_CAMEL_CASE ||
            res.status === SUCCESS_UPPERCASE
          ) {
            dispatch(addUserAddress(addressDetails));
          }
        });
      } else {
        dispatch(addUserAddress(addressDetails));
      }
    },
    getPinCode: pinCode => {
      dispatch(getPinCode(pinCode));
    },
    resetAutoPopulateDataForPinCode: () => {
      dispatch(getPinCodeSuccess(null));
    },
    showSecondaryLoader: () => {
      dispatch(showSecondaryLoader());
    },
    hideSecondaryLoader: () => {
      dispatch(hideSecondaryLoader());
    },
    displayToast: message => {
      dispatch(displayToast(message));
    },
    resetAddAddressDetails: () => {
      dispatch(resetAddAddressDetails());
    },
    getUserDetails: () => {
      dispatch(getUserDetails());
    },
    clearPinCodeStatus: () => {
      dispatch(clearPinCodeStatus());
    },
    setUrlToRedirectToAfterAuth: url => {
      dispatch(setUrlToRedirectToAfterAuth(url));
    }
  };
};

const mapStateToProps = state => {
  return {
    addUserAddressStatus: state.profile.addUserAddressStatus,
    getPinCodeDetails: state.profile.getPinCodeDetails,
    getPincodeStatus: state.profile.getPinCodeStatus,
    addUserAddressError: state.profile.addUserAddressError,
    userAddress: state.profile.userAddress,
    loading: state.profile.loading,
    userDetails: state.profile.userDetails
  };
};

const AddAddressContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddDeliveryAddress)
);

export default AddAddressContainer;
