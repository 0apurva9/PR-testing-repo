import { connect } from "react-redux";
import {
  getAllSellersReviewDetails,
  removeSellerReviewByUser
} from "../actions/account.actions";
import { withRouter } from "react-router-dom";
import AllSellerReviewed from "../components/AllSellerReviewed";
import { setHeaderText } from "../../general/header.actions";
import { displayToast } from "../../general/toast.actions.js";
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getAllSellersReviewDetails: showDataAccordingToUser => {
      dispatch(
        getAllSellersReviewDetails(
          false,
          false,
          ownProps.shouldCallSetDataLayer,
          showDataAccordingToUser
        )
      );
    },

    setHeaderText: text => {
      dispatch(setHeaderText(text));
    },

    displayToast: message => {
      dispatch(displayToast(message));
    },

    removeSellerReviewByUser: params => {
      dispatch(removeSellerReviewByUser(params));
    }
  };
};
const mapStateToProps = (state, ownProps) => {
  return {
    loadingForClearOrderDetails: state.profile.loadingForClearOrderDetails,
    profile: state.profile,
    userAddress: state.profile.userAddress,
    ...ownProps
  };
};

const AllSellerReviewContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AllSellerReviewed)
);

export default AllSellerReviewContainer;
