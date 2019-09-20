import { connect } from "react-redux";
//import { getUserAddress } from '"../../cart/actions/cart.actions"';
import {
  editAddress,
  getPinCode,
  getPinCodeSuccess
} from "../../account/actions/account.actions";
import { withRouter } from "react-router-dom";
import ReturnEditAddress from "../../account/components/ReturnEditAddress.js";
// import { setHeaderText } from '../../general/header.actions';
import { displayToast } from "../../general/toast.actions";
const mapDispatchToProps = dispatch => {
  return {
    editAddress: addressDetails => {
      return dispatch(editAddress(addressDetails));
    },
    getPinCode: pinCode => {
      dispatch(getPinCode(pinCode));
    },
    // setHeaderText: text => {
    // 	dispatch(setHeaderText(text));
    // },
    resetAutoPopulateDataForPinCode: () => {
      dispatch(getPinCodeSuccess(null));
    },
    displayToast: message => {
      dispatch(displayToast(message));
    }
  };
};

const mapStateToProps = state => {
  return {
    editAddressStatus: state.profile.editAddressStatus,
    editAddressError: state.profile.editAddressError,
    getPinCodeStatus: state.profile.getPinCodeStatus,
    getPinCodeDetails: state.profile.getPinCodeDetails,
    getPincodeStatus: state.profile.getPinCodeStatus
  };
};

const ReturnEditAddressContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ReturnEditAddress)
);

export default ReturnEditAddressContainer;
