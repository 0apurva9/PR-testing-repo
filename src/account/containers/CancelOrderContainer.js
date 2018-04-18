import { connect } from "react-redux";
import {
  getDetailsOfCancelledProduct,
  cancelProduct
} from "../actions/account.actions";
import { withRouter } from "react-router-dom";
import { displayToast } from "../../general/toast.actions";
import CancelOrder from "../components/CancelOrder";
import {
  SUCCESS,
  MY_ACCOUNT,
  MY_ACCOUNT_ORDERS_PAGE
} from "../../lib/constants";
import { setDataLayerForMyAccountDirectCalls } from "../../lib/adobeUtils";
const ERROR_MESSAGE_IN_CANCELING_ORDER = "Error in Canceling order";
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getDetailsOfCancelledProduct: cancelProductDetails => {
      dispatch(getDetailsOfCancelledProduct(cancelProductDetails));
    },
    cancelProduct: async (cancelProductDetails, productDetials) => {
      const cancelOrderDetails = await dispatch(
        cancelProduct(cancelProductDetails)
      );
      if (cancelOrderDetails.status === SUCCESS) {
        setDataLayerForMyAccountDirectCalls(productDetials);
        ownProps.history.push(`${MY_ACCOUNT}${MY_ACCOUNT_ORDERS_PAGE}`);
      } else {
        dispatch(displayToast(ERROR_MESSAGE_IN_CANCELING_ORDER));
      }
    },
    displayToast: message => {
      dispatch(displayToast(message));
    }
  };
};
const mapStateToProps = state => {
  return {
    cancelProductDetails: state.profile.cancelProductDetails,
    loadingForCancelProductDetails: state.profile.loadingForCancelProductDetails
  };
};

const CancelOrderContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CancelOrder)
);

export default CancelOrderContainer;
