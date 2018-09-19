import { getUserReview } from "../actions/account.actions";
import { connect } from "react-redux";
import UserReview from "../components/UserReview";

const mapDispatchToProps = dispatch => {
  return {
    getUserReview: pageIndex => {
      dispatch(getUserReview(pageIndex));
    }
  };
};

const mapStateToProps = state => {
  return {
    userReview: state.profile.userReview
  };
};

const UserReviewContainer = connect(mapStateToProps, mapDispatchToProps)(
  UserReview
);

export default UserReviewContainer;
