import { withRouter } from "react-router-dom";
import { newReturnInitial } from "../actions/account.actions.js";
import { connect } from "react-redux";
import SelfCourier from "../components/SelfCourier";
import { SUCCESS } from "../../lib/constants.js";
import { checkUserAgentIsMobile } from "../../lib/UserAgent";
import { displayToast } from "../../general/toast.actions.js";
const RETURN_SUCCESS_MESSAGE = "Return has been initiated";
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    newReturnInitial: async returnDetails => {
      const returnInitiate = await dispatch(newReturnInitial(returnDetails));
      if (returnInitiate.status === SUCCESS) {
        dispatch(displayToast(RETURN_SUCCESS_MESSAGE));
        if (checkUserAgentIsMobile()) {
          if (ownProps.isCOD) {
            ownProps.history.go(-4);
          } else {
            ownProps.history.go(-3);
          }
        } else {
          ownProps.history.go(-1);
        }
      }
    }
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    returnRequest: state.profile.returnRequest,
    returnProductDetails: state.profile.returnProductDetails,
    loading: state.profile.loading,
    ...ownProps
  };
};

const SelfCourierContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SelfCourier)
);
export default SelfCourierContainer;
