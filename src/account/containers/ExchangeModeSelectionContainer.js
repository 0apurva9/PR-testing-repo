import { connect } from "react-redux";
import {
  getCliqCashDetailsRefund,
  submitProductRatingByUser
} from "../actions/account.actions";
import { withRouter } from "react-router-dom";
import ExchangeModeSelection from "../components/ExchangeModeSelection";
import { setHeaderText } from "../../general/header.actions";
import { displayToast } from "../../general/toast.actions";
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getCliqCashDetailsRefund: async () => {
      return await dispatch(getCliqCashDetailsRefund());
    },
    setHeaderText: text => {
      dispatch(setHeaderText(text));
    },
    displayToast: message => {
      dispatch(displayToast(message));
    },
    submitProductRatingByUser: (rating, productDetails) => {
      dispatch(submitProductRatingByUser(rating, productDetails));
    }
  };
};
const mapStateToProps = (state, ownProps) => {
  return {
    profile: state.profile,
    userAddress: state.profile.userAddress,
    ...ownProps
  };
};

const ExchangeModeSelectionContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ExchangeModeSelection)
);

export default ExchangeModeSelectionContainer;
