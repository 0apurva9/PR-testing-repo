import { connect } from "react-redux";
import { getIntermittentPageData } from "../actions/cart.actions.js";
import { withRouter } from "react-router-dom";
import IntermittentFeedbackPage from "../components/IntermittentFeedbackPage";

const mapDispatchToProps = dispatch => {
  return {
    getIntermittentPageData: getUserDetails => {
      dispatch(getIntermittentPageData(getUserDetails));
    }
  };
};

const mapStateToProps = state => {
  return {
    feedBackPageData: state.cart.feedBackPageData,
    loadingForfeedBackPage: state.cart.loadingForfeedBackPage
  };
};

const IntermittentFeedBackContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(IntermittentFeedbackPage)
);
export default IntermittentFeedBackContainer;
