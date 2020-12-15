import { connect } from "react-redux";
import {
    getUserDetails,
    updateProfile,
    changePassword,
    clearAccountUpdateType,
    clearChangePasswordDetails,
} from "../actions/account.actions";
import {
    sendOtpUpdatePassword,
    changeLoginStep,
    generateOtpChangeProfileNumber,
} from "../../mobile-number-login/store/mobile-number-login.actions";
import { showMobileNumberLoginModal } from "../../general/modal.actions";
import { setHeaderText } from "../../general/header.actions";
import { withRouter } from "react-router-dom";
import EditAccountDetails from "../components/EditAccountDetails.js";
import { displayToast } from "../../general/toast.actions";
import { SUCCESS } from "../../lib/constants.js";
import { DESKTOP_AUTH, showModal, CHANGE_PASSWORD_POP_UP } from "../../general/modal.actions";
import { changeLoginStep, updateEmailOtp } from "../../mobile-number-login/store/mobile-number-login.actions";
const UPDATE_PROFILE_SUCCESS = "Profile Updated Successfully";
const UPDATE_PASSWORD = "Password Updated Successfully";
const mapDispatchToProps = dispatch => {
    return {
        getUserDetails: () => {
            dispatch(getUserDetails(true)); //second param for setData Layer
        },
        showAuthPopUp: () => {
            dispatch(showModal(DESKTOP_AUTH));
        },
        updateProfile: async accountDetails => {
            const response = await dispatch(updateProfile(accountDetails));
            if (response && response.status === SUCCESS) {
                dispatch(getUserDetails());
                dispatch(displayToast(UPDATE_PROFILE_SUCCESS));
            }
        },
        changePassword: async passwordDetails => {
            const response = await dispatch(changePassword(passwordDetails));
            if (response && response.status === SUCCESS) {
                dispatch(displayToast(UPDATE_PASSWORD));
            } else {
                dispatch(displayToast(response.error));
            }
        },
        clearChangePasswordDetails: () => {
            dispatch(clearChangePasswordDetails());
        },
        clearAccountUpdateType: () => {
            dispatch(clearAccountUpdateType());
        },
        setHeaderText: text => {
            dispatch(setHeaderText(text));
        },

        displayToast: message => {
            dispatch(displayToast(message));
        },
        showChangePasswordModal: () => {
            // For change mobile number in profile
            dispatch(generateOtpChangeProfileNumber());
            dispatch(showMobileNumberLoginModal());
            dispatch(changeLoginStep("isChangeNumberOtp"));
        },
        showAddOtpMobileChange: () => {
            // For password changes
            dispatch(showMobileNumberLoginModal());
            dispatch(sendOtpUpdatePassword());
            dispatch(changeLoginStep("isStepValidateOtp"));
            dispatch(showModal(CHANGE_PASSWORD_POP_UP));
        },
        updateEmail: () => {
            dispatch(updateEmailOtp());
        },
    };
};

const mapStateToProps = state => {
    return {
        changePasswordStatus: state.profile.changePasswordStatus,
        userDetails: state.profile.userDetails,
        type: state.profile.type,
        userAddress: state.profile.userAddress,
    };
};

const UpdateProfileContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(EditAccountDetails));

export default UpdateProfileContainer;
