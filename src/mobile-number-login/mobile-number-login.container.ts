import { connect } from "react-redux";
import { MobileNumberLogin } from "./mobile-number-login.component";
import { withRouter } from "react-router";
import { hideMobileNumberLoginModal } from "../general/modal.actions.js";
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
    validateEmailOtp,
    addnewEmail,
    updateEmailOtp
} from "./store/mobile-number-login.actions";

const mapDispatchToProps = (disptach: Function) => {
    return {
        hideMobileNumberLoginModal: () => {
            disptach(changeLoginStep("isStepLoginChallenge"));
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
        updateEmailOtp: () => {
            disptach(updateEmailOtp());
        },

    };
};

const mapStateToProps = (state: RootState) => {
    return {
        steps: state.mobileNumberLogin.steps,
        mnlApiData: state.mobileNumberLogin.mnlApiData,
        mnlApiResponse: state.mobileNumberLogin.mnlApiResponse,
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MobileNumberLogin));
