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
} from "./store/mobile-number-login.actions";

const mapDispatchToProps = (disptach: Function) => {
    return {
        hideMobileNumberLoginModal: () => {
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
    };
};

const mapStateToProps = (state: RootState) => {
    return {
        steps: state.mobileNumberLogin.steps,
        mnlApiData: state.mobileNumberLogin.mnlApiData,
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MobileNumberLogin));
