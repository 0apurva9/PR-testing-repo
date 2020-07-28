import { connect } from "react-redux";
import {
  getAllOrdersDetails,
  clearOrderDetails,
  reSendEmailForGiftCard,
  retryPayment,
  submitProductRatingByUser
} from "../actions/account.actions";
import { withRouter } from "react-router-dom";
import AllOrderDetails from "../components/AllOrderDetails";
import { setHeaderText } from "../../general/header.actions";
import {
  showModal,
  hideModal,
  DESKTOP_AUTH,
  RATING_AND_REVIEW_MODAL
} from "../../general/modal.actions";
import { addProductReview } from "../../pdp/actions/pdp.actions";
import { displayToast } from "../../general/toast.actions";
import { getProductDescription } from "../../pdp/actions/pdp.actions";
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
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
    setHeaderText: text => {
      dispatch(setHeaderText(text));
    },
    paginate: (suffix, showDataAccordingToUser) => {
      dispatch(getAllOrdersDetails(suffix, true, "", showDataAccordingToUser)); //paginated is true
    },
    clearOrderDetails: () => {
      dispatch(clearOrderDetails());
    },
    reSendEmailForGiftCard: orderId => {
      dispatch(reSendEmailForGiftCard(orderId));
    },
    showAuthPopUp: () => {
      dispatch(showModal(DESKTOP_AUTH));
    },
    retryPayment: (retryPaymentGuId, retryPaymentUserId) => {
      return dispatch(retryPayment(retryPaymentGuId, retryPaymentUserId));
    },
    displayToast: message => {
      dispatch(displayToast(message));
    },
    submitProductRatingByUser: (rating, productDetails) => {
      dispatch(submitProductRatingByUser(rating, productDetails));
    },
    showRatingAndReviewModal: data => {
      dispatch(showModal(RATING_AND_REVIEW_MODAL, data));
    },
    addProductReview: (productCode, productReview) => {
      return dispatch(addProductReview(productCode, productReview));
    },
    hideModal: () => {
      dispatch(hideModal());
    },
    getProductDescription: productCode => {
      return dispatch(getProductDescription(productCode));
    }
  };
};
const mapStateToProps = (state, ownProps) => {
  return {
    loadingForClearOrderDetails: state.profile.loadingForClearOrderDetails,
    profile: state.profile,
    userAddress: state.profile.userAddress,
    ratedProductDetails: state.profile.ratedProductDetails,
    addReviewStatus: state.productDescription.addReviewStatus,
    ...ownProps
  };
};

const AllOrderContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AllOrderDetails)
);

export default AllOrderContainer;
