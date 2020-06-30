import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { displayToast } from "../../general/toast.actions";
import CliqGiftCard from "../components/CliqGiftCard.js";

const mapDispatchToProps = dispatch => {
  return {
    displayToast: toastMessage => {
      dispatch(displayToast(toastMessage));
    }
  };
};

const mapStateToProps = state => {
  return {
    userAddress: state.profile.userAddress
  };
};

const CliqGiftCardContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CliqGiftCard)
);

export default CliqGiftCardContainer;
