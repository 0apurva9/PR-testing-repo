import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { hideModal } from "../modal.actions";
import GstPopUp from "../components/GstPopUp";
import { getValidateGstDetails } from "../../cart/actions/cart.actions";
import { displayToast } from "../toast.actions";

const mapDispatchToProps = dispatch => {
    return {
        hideModal: () => {
            dispatch(hideModal());
        },
        displayToast: message => {
            dispatch(displayToast(message));
        },
        getValidateGstDetails: async (gstin, companyName, operation) => {
            return await dispatch(getValidateGstDetails(gstin, companyName, operation));
        },
    };
};

const mapStateToProps = state => {
    return state;
};

const GstPopUpContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(GstPopUp));

export default GstPopUpContainer;
