import { connect } from "react-redux";
import { getFeedBackForm, postFeedBackForm } from "../actions/cart.actions.js";
import { withRouter } from "react-router-dom";
import FeedBackForm from "../components/FeedBackFrom";
import { setHeaderText } from "../../general/header.actions";
import { displayToast } from "../../general/toast.actions";
const mapDispatchToProps = dispatch => {
  return {
    getFeedBackForm: getUserDetails => {
      dispatch(getFeedBackForm(getUserDetails));
    },
    postFeedBackForm: (commemt, questionRatingArray, transactionId) => {
      dispatch(postFeedBackForm(commemt, questionRatingArray, transactionId));
    },
    setHeaderText: text => {
      dispatch(setHeaderText(text));
    },
    displayToast: message => {
      dispatch(displayToast(message));
    }
  };
};
const mapStateToProps = state => {
  return {
    feedBackDetails: state.cart.feedBackDetails,
    feedBackSent: state.cart.feedBackSent
  };
};
const FeedBackContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(FeedBackForm)
);
export default FeedBackContainer;
