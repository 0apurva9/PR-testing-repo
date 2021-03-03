import { connect } from "react-redux";
import { withRouter } from "react-router";
import ReturnAddressBook from "../../account/components/ReturnAddressBook.js";
import {
  getUserAddress,
  addUserAddress,
  addAddressToCart
} from "../../cart/actions/cart.actions";
import {
  removeAddress,
  resetAddAddressDetails,
  getPinCodeChangeAddressOrderedProduct,
} from "../../account/actions/account.actions";
import {
  showSecondaryLoader,
  hideSecondaryLoader
} from "../../general/secondaryLoader.actions";

const mapDispatchToProps = dispatch => {
  return {
    getUserAddress: () => {
      dispatch(getUserAddress());
    },
    addUserAddress: userAddress => {
      dispatch(addUserAddress(userAddress));
    },
    addAddressToCart: addressId => {
      dispatch(addAddressToCart(addressId));
    },
    removeAddress: addressId => {
      dispatch(removeAddress(addressId));
    },
    // setHeaderText: text => {
    // 	dispatch(setHeaderText(text));
    // },
    showSecondaryLoader: () => {
      dispatch(showSecondaryLoader());
    },
    hideSecondaryLoader: () => {
      dispatch(hideSecondaryLoader());
    },
    resetAddAddressDetails: () => {
      dispatch(resetAddAddressDetails());
    },
    getPinCodeChangeAddressOrderedProduct: (pinCode, orderCode) => {
      dispatch(getPinCodeChangeAddressOrderedProduct(pinCode, orderCode));
    }
  };
};
const mapStateToProps = state => {
  return {
    cart: state.cart,
    userAddress: state.profile.userAddress,
    loading: state.profile.loading,
    removeAddressStatus: state.profile.removeAddressStatus,
    getPinCodeDetails: state.profile.getPinCodeDetails
  };
};

const ReturnAddressContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ReturnAddressBook)
);
export default ReturnAddressContainer;
