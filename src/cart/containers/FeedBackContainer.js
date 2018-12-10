import { connect } from "react-redux";
import { getFeedBackForm } from "../actions/cart.actions.js";
import { withRouter } from "react-router-dom";
import FeedBackForm from "../components/FeedBackFrom";
import { setHeaderText } from "../../general/header.actions";
const mapDispatchToProps = dispatch => {
  return {
    getFeedBackForm: getUserDetails => {
      dispatch(getFeedBackForm(getUserDetails));
    },
    setHeaderText: text => {
      dispatch(setHeaderText(text));
    }
  };
};
const mapStateToProps = state => {
  return {
    feedBackDetails: state.cart.feedBackDetails
  };
};
const FeedBackContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(FeedBackForm)
);
export default FeedBackContainer;
