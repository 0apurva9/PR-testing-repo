import { connect } from "react-redux";
import { withRouter } from "react-router";
import CheckOutPage from "../components/CheckOutPage";
import {
  getCartDetailsCNC,
  addUserAddress,
  addAddressToCart,
  getUserAddress,
  selectDeliveryMode,
  getOrderSummary,
  getCoupons,
  applyUserCoupon,
  releaseUserCoupon,
  getAllStoresCNC,
  addStoreCNC,
  addPickupPersonCNC,
  softReservation,
  getPaymentModes,
  applyBankOffer,
  releaseBankOffer,
  getNetBankDetails,
  getEmiBankDetails,
  applyCliqCash,
  removeCliqCash,
  binValidation,
  softReservationForPayment,
  updateTransactionDetails
} from "../actions/cart.actions";
import { showModal, BANK_OFFERS } from "../../general/modal.actions";
const mapDispatchToProps = dispatch => {
  return {
    getCartDetailsCNC: (
      userId,
      accessToken,
      cartId,
      pinCode,
      isSoftReservation
    ) => {
      dispatch(
        getCartDetailsCNC(
          userId,
          accessToken,
          cartId,
          pinCode,
          isSoftReservation
        )
      );
    },
    getUserAddress: () => {
      dispatch(getUserAddress());
    },
    addUserAddress: userAddress => {
      dispatch(addUserAddress(userAddress));
    },
    addAddressToCart: (addressId, pinCode) => {
      dispatch(addAddressToCart(addressId, pinCode));
    },
    getOrderSummary: () => {
      dispatch(getOrderSummary());
    },
    getCoupons: () => {
      dispatch(getCoupons());
    },
    applyUserCoupon: () => {
      dispatch(applyUserCoupon());
    },
    releaseUserCoupon: () => {
      dispatch(releaseUserCoupon());
    },
    selectDeliveryMode: (deliveryUssId, pinCode) => {
      dispatch(selectDeliveryMode(deliveryUssId, pinCode));
    },
    getAllStoresCNC: pinCode => {
      dispatch(getAllStoresCNC(pinCode));
    },
    addStoreCNC: (ussId, slaveId) => {
      dispatch(addStoreCNC(ussId, slaveId));
    },
    addPickupPersonCNC: (personMobile, personName) => {
      dispatch(addPickupPersonCNC(personMobile, personName));
    },
    softReservation: (pinCode, payload) => {
      dispatch(softReservation(pinCode, payload));
    },
    getPaymentModes: () => {
      dispatch(getPaymentModes());
    },
    showCouponModal: data => {
      dispatch(showModal(BANK_OFFERS, data));
    },
    applyBankOffer: couponCode => {
      dispatch(applyBankOffer(couponCode));
    },
    releaseBankOffer: couponCode => {
      dispatch(releaseBankOffer(couponCode));
    },
    getNetBankDetails: () => {
      dispatch(getNetBankDetails());
    },
    getEmiBankDetails: () => {
      dispatch(getEmiBankDetails());
    },
    applyCliqCash: () => {
      dispatch(applyCliqCash());
    },
    removeCliqCash: () => {
      dispatch(removeCliqCash());
    },
    binValidation: (paymentMode, binNo) => {
      dispatch(binValidation(paymentMode, binNo));
    },
    softReservationForPayment: (cardDetails, address) => {
      dispatch(softReservationForPayment(cardDetails, address));
    },
    updateTransactionDetails: (paymentMode, juspayOrderID) => {
      dispatch(updateTransactionDetails(paymentMode, juspayOrderID));
    }
  };
};
const mapStateToProps = state => {
  return {
    cart: state.cart
  };
};

const CheckoutAddressContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CheckOutPage)
);
export default CheckoutAddressContainer;
