import { connect } from "react-redux";
import {
  getAllOrdersDetails,
  clearOrderDetails,
  reSendEmailForGiftCard
} from "../actions/account.actions";
import { withRouter } from "react-router-dom";
import AllOrderDetails from "../components/AllOrderDetails";
import { setHeaderText } from "../../general/header.actions";
import { showModal, DESKTOP_AUTH } from "../../general/modal.actions";
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

const AllOrderContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AllOrderDetails)
);

export default AllOrderContainer;
