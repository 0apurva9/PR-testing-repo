import { connect } from "react-redux";
import { MobileNumberLogin } from "./mobile-number-login.component";
import { withRouter } from "react-router";
import { hideMobileNumberLoginModal } from "../general/modal.actions.js";
import {displayToast} from "../general/toast.actions";
import { RootState } from "common/models/root-state";
import { MnlApiData } from "./mobile-number-login.types";
import { showSecondaryLoader } from "../general/secondaryLoader.actions";
import {
    setMnlApiData,
    validateMnlChallenge,
    loginWithPassword,
    changeLoginStep,
    generateOTP,
    validateOtp,
    updatePassword,
    verifyOtpUpdatePassword,
    updatePasswordProfile,
    validateOtpChangeProfileNumber,
    validateEmailOtp,
    addnewEmail,
    updateEmailOtp,
    setResendOtpTimmer,
    generateOtpChangeProfileNumber,
} from "./store/mobile-number-login.actions";

const mapDispatchToProps = (disptach: Function) => {
    return {
        hideMobileNumberLoginModal: () => {
            disptach(changeLoginStep("isStepLoginChallenge"));
            disptach(setResendOtpTimmer(0));
            disptach(hideMobileNumberLoginModal());
        },
        validateChallenge: (apidata: MnlApiData) => {
            disptach(showSecondaryLoader());
            disptach(setMnlApiData(apidata));
            disptach(validateMnlChallenge());
        },
        loginWithPassword: (apiData: MnlApiData) => {
            disptach(showSecondaryLoader());
            disptach(setMnlApiData(apiData));
            disptach(loginWithPassword());
        },
        changeLoginStep: (stepKey: string) => {
            disptach(changeLoginStep(stepKey));
        },
        generateOtp: (apiData: MnlApiData) => {
            disptach(showSecondaryLoader());
            disptach(setMnlApiData(apiData));
            disptach(generateOTP());
        },
        validateOtp: (apiData: MnlApiData) => {
            disptach(showSecondaryLoader());
            disptach(setMnlApiData(apiData));
            disptach(validateOtp());
        },
        forgotPassword: (apiData: MnlApiData) => {
            disptach(showSecondaryLoader());
            disptach(setMnlApiData(apiData));
            disptach(updatePassword())
        },
        validateProfileOtp: (apiData: MnlApiData) => {
            disptach(setMnlApiData(apiData));
            disptach(verifyOtpUpdatePassword())
        },
        changeProfilePassword: (apiData: MnlApiData) => {
            disptach(setMnlApiData(apiData));
            disptach(updatePasswordProfile())
        },
        updateProfileMobileNumber: (apiData: MnlApiData) => {
            disptach(setMnlApiData(apiData));
            disptach(validateOtpChangeProfileNumber())
        },
        validateEmailOtp: (apiData: MnlApiData) => {
            disptach(showSecondaryLoader());
            disptach(setMnlApiData(apiData));
            disptach(validateEmailOtp());
        },
        addnewEmail: (apiData: MnlApiData) => {
            disptach(showSecondaryLoader());
            disptach(setMnlApiData(apiData));
            disptach(addnewEmail());
        },
        generateOtpChangeProfileNumber: (apiData: MnlApiData) => {
            disptach(setMnlApiData(apiData));
            disptach(generateOtpChangeProfileNumber())
        },
        updateEmailOtp: () => {
            disptach(updateEmailOtp());
        },
        setResendOtpTimmer: (resendOtpTimmer: number) => {
            disptach(setResendOtpTimmer(resendOtpTimmer));
        },
        displayToast : (msg : string) => {
            disptach(displayToast(msg))
        }
    };
};

const mapStateToProps = (state: RootState) => {
    return {
        steps: state.mobileNumberLogin.steps,
        mnlApiData: state.mobileNumberLogin.mnlApiData,
        mnlApiResponse: state.mobileNumberLogin.mnlApiResponse,
        resendOtpTime: state.mobileNumberLogin.resendOtpTimmer,
        userMobileNumber: state.profile.userDetails && state.profile.userDetails.mobileNumber || "",
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MobileNumberLogin));
