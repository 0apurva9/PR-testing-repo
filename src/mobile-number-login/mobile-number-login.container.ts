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
    updatePassword
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
            disptach(changeLoginStep("isStepValidateOtp"))
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
        forgotPassword: () => {
            disptach(showSecondaryLoader());
            disptach(updatePassword())
        } 
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
