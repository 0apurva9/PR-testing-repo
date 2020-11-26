import {
    MobileNumberLoginActions,
    CHANGE_LOGIN_STEP,
    SET_MNL_API_DATA,
    SET_MNL_API_Response,
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
    },
    mnlApiData: {
        email: "",
        maskedPhoneNumber: "",
        otp: "",
        pass: "",
        phoneNumber: "",
        platformNumber: PLAT_FORM_NUMBER,
    },
    mnlApiResponse: null,
};

export function mobileNumberLoginReducer(
    state = initailState,
    action: MobileNumberLoginActions
): MobileNumberLoginReduxState {
    switch (action.type) {
        case CHANGE_LOGIN_STEP:
            const newState: MobileNumberLoginReduxState = JSON.parse(JSON.stringify(state));
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
            return {
                ...state,
                mnlApiResponse: action.payload,
            };
        default:
            return state;
    }
}
