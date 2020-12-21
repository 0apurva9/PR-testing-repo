import { connect } from "react-redux";
import { getUserAddress } from "../../cart/actions/cart.actions";
import { getProductPinCode } from "../../pdp/actions/pdp.actions";
import AddressModal from "../components/AddressModal";
const mapDispatchToProps = dispatch => {
  return {
    getUserAddress: () => {
      dispatch(getUserAddress());
    },
    getProductPinCode: (
      pincode,
      productCode,
      winningUssID,
      isComingFromPiqPage,
      isExchangeAvailable,
      isComingFromClickEvent
    ) => {
      dispatch(
        getProductPinCode(
          pincode,
          productCode,
          winningUssID,
          isComingFromPiqPage,
          isExchangeAvailable,
          isComingFromClickEvent
        )
      );
    }
  };
};
const mapStateToProps = (state, ownProps) => {
  return {
    userAddress: state.cart.userAddress,
    ...ownProps,
    exchangeAvailable:
      state.productDescription.productDetails &&
      state.productDescription.productDetails.exchangeAvailable
  };
};
const AddressModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddressModal);
export default AddressModalContainer;
