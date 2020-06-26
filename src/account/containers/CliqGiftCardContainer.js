import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { displayToast } from "../../general/toast.actions";
import CliqGiftCard from "../components/CliqGiftCard.js";
import { setUrlToRedirectToAfterAuth } from "../../auth/actions/auth.actions";

const mapDispatchToProps = dispatch => {
  return {
    displayToast: toastMessage => {
      dispatch(displayToast(toastMessage));
    },
    setUrlToRedirectToAfterAuth: url => {
      dispatch(setUrlToRedirectToAfterAuth(url));
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
