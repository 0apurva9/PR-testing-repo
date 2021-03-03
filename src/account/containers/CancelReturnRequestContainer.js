import { connect } from "react-redux";
import { getReturnReasons } from "../actions/account.actions";
import { withRouter } from "react-router-dom";
import { displayToast } from "../../general/toast.actions";
import CancelReturnRequest from "../components/CancelReturnRequest";
import { showModal, CANCEL_RETURN_REQUEST_POP_UP } from "../../general/modal.actions";

const mapDispatchToProps = (dispatch) => {
    return {
        getReturnReasons: (orderId, transactionId) => {
            dispatch(getReturnReasons(orderId, transactionId));
        },
        displayToast: (message) => {
            dispatch(displayToast(message));
        },
        showCancelReturnRequestModal: (data) => {
            dispatch(showModal(CANCEL_RETURN_REQUEST_POP_UP, data));
        },
    };
};
const mapStateToProps = (state) => {
    return {
        getReturnReasonsDetails: state.profile.getReturnReasonsDetails,
        loadingForGetReturnReasons: state.profile.loadingForGetReturnReasons,
        error: state.profile.getReturnReasonsError,
    };
};

const CancelReturnRequestContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(CancelReturnRequest));

export default CancelReturnRequestContainer;
