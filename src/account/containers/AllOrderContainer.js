import { connect } from "react-redux";
import {
  getAllOrdersDetails,
  clearOrderDetails,
  reSendEmailForGiftCard
} from "../actions/account.actions";
import { withRouter } from "react-router-dom";
import AllOrderDetails from "../components/AllOrderDetails";
import { setHeaderText } from "../../general/header.actions";
import { showModal, DESKTOP_AUTH } from "../../general/modal.actions.js";
import { setUrlToRedirectToAfterAuth } from "../../auth/actions/auth.actions.js";
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getAllOrdersDetails: () => {
      dispatch(
        getAllOrdersDetails(false, false, ownProps.shouldCallSetDataLayer)
      );
    },
    setHeaderText: text => {
      dispatch(setHeaderText(text));
    },
    paginate: suffix => {
      dispatch(getAllOrdersDetails(suffix, true)); //paginated is true
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
    setUrlToRedirectToAfterAuth: url => {
      dispatch(setUrlToRedirectToAfterAuth(url));
    }
  };
};
const mapStateToProps = (state, ownProps) => {
  return {
    loadingForClearOrderDetails: state.profile.loadingForClearOrderDetails,
    profile: state.profile,
    ...ownProps
  };
};

const AllOrderContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AllOrderDetails)
);

export default AllOrderContainer;
