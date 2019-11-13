import { connect } from "react-redux";
import {
  getAllSellersDetails,
  submitSellerReviewByUser,
  getAllOrdersDetails
} from "../actions/account.actions";
import { withRouter } from "react-router-dom";
import AllSellerDetails from "../components/AllSellerDetails";
import { setHeaderText } from "../../general/header.actions";
import { displayToast } from "../../general/toast.actions.js";
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getAllSellerDetails: showDataAccordingToUser => {
      dispatch(
        getAllSellersDetails(
          false,
          false,
          ownProps.shouldCallSetDataLayer,
          showDataAccordingToUser
        )
      );
    },
    getAllOrdersDetails: showDataAccordingToUser => {
      dispatch(
        getAllOrdersDetails(
          false,
          false,
          ownProps.shouldCallSetDataLayer,
          showDataAccordingToUser
        )
      );
    },
    submitSellerReviewByUser: params => {
      dispatch(submitSellerReviewByUser(params));
    },

    setHeaderText: text => {
      dispatch(setHeaderText(text));
    },

    displayToast: message => {
      dispatch(displayToast(message));
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

const AllSellerContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AllSellerDetails)
);

export default AllSellerContainer;
