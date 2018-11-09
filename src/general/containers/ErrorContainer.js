import { connect } from "react-redux";
import { displayToast, TOAST_DELAY } from "../toast.actions.js";
import { clearError } from "../error.actions.js";
import React from "react";
import delay from "lodash.delay";
import keys from "lodash.keys";
import each from "lodash.foreach";
const FAILED_TO_FETCH = "Failed to fetch";
const TYPE_ERROR = "Type error";
const CANNOT_READ_PROPERTY = /Cannot read property/i;
const REG_EX_FOR_UNEXPECTED_TOKEN = /unexpected token/i;
const CLEAR_ERROR_DELAY = TOAST_DELAY + 1000;

// The errors for user, pdp and plp are universal errors
// This means that they need to be dealt with separately here (meaning that the entire reducer has an error key)
// The other types of errors (like state.cart.userCartError) NEED to have the same key

const mapStateToProps = state => {
  return {
    loginError: state.auth.error,
    userError: state.user.error,
    // pdpError: state.productDescription.error, // commented for  reusing this error state
    plpError: state.productListings.error,
    userCartError: state.cart.userCartError,
    cartDetailsError: state.cart.cartDetailsError,
    cartDetailsCNCError: state.cart.cartDetailsCNCError,
    couponError: state.cart.couponError,
    paymentsModeError: state.cart.paymentsModeError,
    // bankOfferError: state.cart.bankOfferError,
    cliqCashPaymentStatusError: state.cart.cliqCashPaymentStatusError,
    jusPayError: state.cart.jusPayError,
    transactionDetailsError: state.cart.transactionDetailsError,
    orderConfirmationDetailsError: state.cart.orderConfirmationDetailsError,
    jusPayPaymentDetailsError: state.cart.jusPayPaymentDetailsError,
    addItemToWishlistError: state.wishlistItems.addItemError,
    removeWishlistError: state.wishlistItems.removeItemError,
    reviewsError: state.productDescription.reviewsError,
    orderDetailsError: state.profile.orderDetailsError,
    fetchOrderDetailsError: state.profile.fetchOrderDetailsError,
    userDetailsError: state.profile.userDetailsError,
    userCouponsError: state.profile.userCouponsError,
    userAlertsError: state.profile.userAlertsError,
    sendInvoiceError: state.profile.sendInvoiceError,
    userAddressError: state.profile.userAddressError,
    removeAddressError: state.profile.removeAddressError,
    editAddressError: state.profile.editAddressError,
    addUserAddressError: state.profile.addUserAddressError,
    followedBrandsError: state.profile.followedBrandsError,
    cliqCashUserDetailsError: state.profile.cliqCashUserDetailsError,
    cliqCashVoucherDetailsError: state.profile.cliqCashVoucherDetailsError,
    returnPinCodeError: state.profile.returnPinCodeError,
    giftCardsError: state.profile.giftCardsError,
    giftCardDetailsError: state.profile.giftCardDetailsError,
    getOtpToActivateWalletError: state.profile.getOtpToActivateWalletError,
    getPinCodeError: state.profile.getPinCodeError,
    updateReturnDetailsError: state.profile.updateReturnDetailsError,
    cancelProductDetailsError: state.profile.cancelProductDetailsError,
    cancelProductError: state.profile.cancelProductError,
    updateQuantityLoggedInError: state.cart.updateQuantityLoggedInError,
    updateQuantityLoggedOutError: state.cart.updateQuantityLoggedOutError,
    justPayPaymentDetailsError: state.cart.justPayPaymentDetailsError,
    orderSummaryError: state.cart.orderSummaryError,
    storeError: state.cart.storeError,
    paymentModesError: state.cart.paymentModesError,
    transactionCODError: state.cart.transactionCODError,
    orderExperienceError: state.cart.orderExperienceError,
    removeCartItemError: state.cart.removeCartItemError,
    removeCartItemLoggedOutError: state.cart.removeCartItemLoggedOutError,
    jusPayTokenizeError: state.cart.jusPayTokenizeError,
    createJusPayOrderError: state.cart.createJusPayOrderError,
    getUserAddressError: state.cart.getUserAddressError,
    netBankDetailsError: state.cart.netBankDetailsError,
    updateProfileError: state.profile.updateProfileError,
    verifyWalletError: state.profile.verifyWalletError,
    emiEligibilityError: state.cart.emiEligibilityError,
    bankAndTenureError: state.cart.bankAndTenureError,
    emiTermsAndConditionError: state.cart.emiTermsAndConditionError,
    // noCostEmiError: state.cart.noCostEmiError,
    emiItemBreakUpError: state.cart.emiItemBreakUpError,
    emiBankError: state.cart.emiBankError,
    reSendEmailError: state.profile.reSendEmailError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    displayToast: message => {
      dispatch(displayToast(message));
    },
    clearError: () => {
      dispatch(clearError());
    }
  };
};

class ErrorDisplay extends React.Component {
  componentDidUpdate(prevProps) {
    const errorKeys = keys(this.props);
    let seenError = false;

    if (
      this.props.userError !== "" &&
      this.props.userError !== null &&
      this.props.userError !== undefined
    ) {
      this.displayError(this.props.userError);
      return;
    }

    if (
      this.props.plpError !== "" &&
      this.props.plpError !== null &&
      this.props.plpError !== undefined
    ) {
      this.displayError(this.props.plpError);
      return;
    }

    if (
      this.props.pdpError !== "" &&
      this.props.pdpError !== null &&
      this.props.pdpError !== undefined
    ) {
      this.displayError(this.props.pdpError);
      return;
    }

    each(errorKeys, key => {
      const currentError = this.props[key];

      if (
        currentError !== undefined &&
        currentError !== "" &&
        currentError !== null &&
        !seenError &&
        typeof currentError === "string"
      ) {
        this.displayError(currentError);
        seenError = true;
      }
    });
  }

  displayError(message) {
    if (
      message !== FAILED_TO_FETCH &&
      message !== TYPE_ERROR &&
      !REG_EX_FOR_UNEXPECTED_TOKEN.test(message) &&
      !CANNOT_READ_PROPERTY.test(message)
    ) {
      this.props.displayToast(message);
      delay(() => this.props.clearError(), CLEAR_ERROR_DELAY);
    }
  }

  render() {
    return null;
  }
}

const ErrorContainer = connect(mapStateToProps, mapDispatchToProps)(
  ErrorDisplay
);

export default ErrorContainer;
