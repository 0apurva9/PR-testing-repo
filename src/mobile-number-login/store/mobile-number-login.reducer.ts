import {
    MobileNumberLoginActions,
    CHANGE_LOGIN_STEP,
    SET_MNL_API_DATA,
    SET_MNL_API_Response,
    SET_RESEND_OTP_TIME,
    WEB_MNL_LOGIN_SUCCESS
} from "./mobile-number-login.actions";
import { PLAT_FORM_NUMBER } from "../../lib/constants";
import { MobileNumberLoginReduxState } from "../mobile-number-login.types";

const initailState: MobileNumberLoginReduxState = {
    steps: {
        isStepLoginChallenge: true,
        isStepAddEmail: false,
        isStepAddMobileNumber: false,
        isStepLoginPassword: false,
        isStepLoginSuccess1: false,
        isStepLoginSuccess2: false,
        isStepLoginSuccess3: false,
        isStepValidateOtp: false,
        isForgotPassword: false,
        isStepEmail : false,
        isChangeNumberOtp : false,
        isStepChangeEmailOtp: false,
        isStepChangeEmail: false,
        isStepChangeEmailSucess: false,
        isStepValidateProfileOtp:false,
        isForgotPasswordProfile : false,
        isChangeProfilePasswordSuccess : false,
        isChangeProfileMobile : false
    },
    mnlApiData: {
        email: "",
        maskedPhoneNumber: "",
        otp: "",
        pass: "",
        phoneNumber: "",
        platformNumber: PLAT_FORM_NUMBER,
        otp2 : ""
    },
    mnlApiResponse: null,
    resendOtpTimmer: 0,
    isMNLLogin : {
        name : "",
        value : false
    }
};

export function mobileNumberLoginReducer(
    state = initailState,
    action: MobileNumberLoginActions
): MobileNumberLoginReduxState {
    const newState: MobileNumberLoginReduxState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case CHANGE_LOGIN_STEP:
            Object.keys(newState.steps).forEach(
                (key) => ((newState.steps as any)[key] = key === action.payload ? true : false)
            );
            return newState;
        case SET_MNL_API_DATA:
            return {
                ...state,
                mnlApiData: action.payload,
            };
        case SET_MNL_API_Response:
            if (newState.mnlApiResponse) {
                newState.mnlApiResponse.userData = { ...newState.mnlApiResponse.userData, ...action.payload.userData };
            } else {
                newState.mnlApiResponse = action.payload;
            }

            return newState;
        case SET_RESEND_OTP_TIME:
            return {
                ...state,
                resendOtpTimmer: action.payload,
            }
        case WEB_MNL_LOGIN_SUCCESS:
            return Object.assign({}, state, {
                    isMNLLogin: action.payload,
            });
        default:
            return state;
    }
}
