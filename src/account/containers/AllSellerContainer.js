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
import {
  SELLER_REVIEW_SUBMIT_REMOVAL_POP_UP,
  showModal
} from "../../general/modal.actions";
import { setUrlToRedirectToAfterAuth } from "../../auth/actions/auth.actions.js";

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
    },
    sellerReviewSubmitRemovalPopup: () => {
      dispatch(showModal(SELLER_REVIEW_SUBMIT_REMOVAL_POP_UP));
    },
    setUrlToRedirectToAfterAuth: url => {
      dispatch(setUrlToRedirectToAfterAuth(url));
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
