import { RootState } from "common/models/root-state";
import { MnlApiData } from "../mobile-number-login.types";
import { MnlApiResponse } from "../mobile-number-login.types";
import { hideSecondaryLoader } from "../../general/secondaryLoader.actions.js";
import * as Cookie from "../../lib/Cookie.js";
import { GLOBAL_ACCESS_TOKEN, CLIENT_ID, CLIENT_SECRET, PLAT_FORM_NUMBER } from "../../lib/constants.js";
import { getGlobalAccessToken, customerAccessTokenSuccess } from "../../auth/actions/user.actions.js";
import * as ErrorHandling from "../../general/ErrorHandling.js";
import { displayToast } from "../../general/toast.actions.js";
export const CHANGE_LOGIN_STEP = "ChangeLoginStep";
export const SET_MNL_API_DATA = "SetMnlApiData";
export const SET_MNL_API_Response = "SetMnlApiResponse";

interface ChangeLoginStepAction {
    readonly type: typeof CHANGE_LOGIN_STEP;
    /** Key Of Login Step */
    readonly payload: string;
}

interface SetMnlApiData {
    readonly type: typeof SET_MNL_API_DATA;
    readonly payload: MnlApiData;
}

interface SetMnlApiResponse {
    readonly type: typeof SET_MNL_API_Response;
    readonly payload: MnlApiResponse;
}

export function changeLoginStep(loginStepKey: string): MobileNumberLoginActions {
    return {
        type: CHANGE_LOGIN_STEP,
        payload: loginStepKey,
    };
}

export function setMnlApiData(payload: MnlApiData): MobileNumberLoginActions {
    return {
        type: SET_MNL_API_DATA,
        payload,
    };
}

export function setMnlApiResponse(payload: MnlApiResponse): MobileNumberLoginActions {
    return {
        type: SET_MNL_API_Response,
        payload,
    };
}

async function getFetchGlobalAccessToken(dispatch: Function) {
    let globalAccessTokenCookie = Cookie.getCookie(GLOBAL_ACCESS_TOKEN);
    if (!globalAccessTokenCookie) {
        await dispatch(getGlobalAccessToken());
        globalAccessTokenCookie = Cookie.getCookie(GLOBAL_ACCESS_TOKEN);
    }
    let globalAccessToken;
    if (globalAccessTokenCookie) {
        globalAccessToken = JSON.parse(globalAccessTokenCookie);
    }
    return globalAccessToken;
}

export function validateMnlChallenge() {
    return async (dispatch: Function, getState: () => RootState, { api }: { api: any }) => {
        const apiData = getState().mobileNumberLogin.mnlApiData;
        let globalAccessToken = await getFetchGlobalAccessToken(dispatch);
        const result: Response = await api.post("mobileloginapi/v1/authnuser/validate", apiData, true, {
            Authorization: `Bearer ${globalAccessToken.access_token}`,
            "register-user": false,
            registerviamobile: false,
        });
        const mnlApiResponse: MnlApiResponse = await result.json();
        const errorStatus = ErrorHandling.getFailureResponse(mnlApiResponse);
        if (errorStatus.status) {
            dispatch(hideSecondaryLoader());
            if (errorStatus.message) {
                await dispatch(displayToast(errorStatus.message));
            }
            return;
        }
        dispatch(setMnlApiResponse(mnlApiResponse));
        if (mnlApiResponse.userData.customer && mnlApiResponse.userData.customer.passwordSet) {	        //need to update condition
            dispatch(changeLoginStep("isStepLoginPassword"));	        // 1. check response for profile updated
        }
        //need to update condition
        // 1. check response for profile updated
        // 2. remove current conditions
        // if (mnlApiResponse.userData.customer && mnlApiResponse.userData.customer.passwordSet) {
        //     dispatch(changeLoginStep("isStepLoginPassword"));
        // }
        dispatch(hideSecondaryLoader());
    };
}

export function loginWithPassword() {
    return async (dispatch: Function, getState: () => RootState, { api }: { api: any }) => {
        const apiData = getState().mobileNumberLogin.mnlApiData;
        const mnlApiResponseState = getState().mobileNumberLogin.mnlApiResponse;
        let globalAccessTokenCookie = Cookie.getCookie(GLOBAL_ACCESS_TOKEN);
        if (!globalAccessTokenCookie) {
            await dispatch(getGlobalAccessToken());
            globalAccessTokenCookie = Cookie.getCookie(GLOBAL_ACCESS_TOKEN);
        }
        let globalAccessToken;
        if (globalAccessTokenCookie) {
            globalAccessToken = JSON.parse(globalAccessTokenCookie);
        }
        if (mnlApiResponseState && mnlApiResponseState.userData.customer.numberAdded) {
            const result: Response = await api.post("mobileloginapi/v1/authnuser/authenticate", apiData, true, {
                Authorization: `Bearer ${globalAccessToken.access_token}`,
                "register-user": false,
                registerviamobile: false,
                grant_type: "password",
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                platformnumber: PLAT_FORM_NUMBER,
            });
            const mnlApiResponse: MnlApiResponse = await result.json();
            Cookie.createCookie("MNL_ACCESS_TOKEN", JSON.stringify(mnlApiResponse.userData.authentication));
            // console.log(Cookie.getCookie("MNL_ACCESS_TOKEN").authentication.access_token, "mnlApiResponse")
            const errorStatus = ErrorHandling.getFailureResponse(mnlApiResponse);
            if (errorStatus.status) {
                dispatch(hideSecondaryLoader());
                if (errorStatus.message) {
                    await dispatch(displayToast(errorStatus.message));
                }
                return;
            }
            dispatch(setMnlApiResponse(mnlApiResponse));
            if (mnlApiResponse.userData.authentication && mnlApiResponse.userData.authentication.accessToken) {
                dispatch(changeLoginStep("isStepLoginSuccess1"));
                dispatch(customerAccessTokenSuccess(mnlApiResponse.userData.authentication));
            }
            dispatch(hideSecondaryLoader());
        } else {
            const result: Response = await api.post("mobileloginapi/v1/authnuser/validate", apiData, true, {
                Authorization: `Bearer ${globalAccessToken.access_token}`,
                "register-user": false,
                registerviamobile: false,
            });
            const mnlApiResponse: MnlApiResponse = await result.json();
            const errorStatus = ErrorHandling.getFailureResponse(mnlApiResponse);
            if (errorStatus.status) {
                dispatch(hideSecondaryLoader());
                if (errorStatus.message) {
                    await dispatch(displayToast(errorStatus.message));
                }
                return;
            }

            dispatch(setMnlApiResponse(mnlApiResponse));
            if (mnlApiResponse.userData.validation && mnlApiResponse.userData.validation.validated) {
                dispatch(changeLoginStep("isStepAddMobileNumber"));
            }
            dispatch(hideSecondaryLoader());
        }
    };
}

export function generateOTP() {
    return async (dispatch: Function, getState: () => RootState, { api }: { api: any }) => {
        const apiData = getState().mobileNumberLogin.mnlApiData;
        let globalAccessToken = await getFetchGlobalAccessToken(dispatch);
        const mnlApiResponseState = getState().mobileNumberLogin.mnlApiResponse;
        let otpHeader = {
            Authorization: `Bearer ${globalAccessToken.access_token}`,
            "register-user": false,
            registerviamobile: false,
        }
        if (mnlApiResponseState && mnlApiResponseState.userData && mnlApiResponseState.userData.customer && mnlApiResponseState.userData.validation && mnlApiResponseState.userData.validation.validated) {
            otpHeader = {
                Authorization: `Bearer ${globalAccessToken.access_token}`,
                "register-user": true,
                registerviamobile: false,
            }
        }

        const result: Response = await api.post("mobileloginapi/v1/authnuser/otp", apiData, true, otpHeader);
        const mnlApiResponse: MnlApiResponse = await result.json();
        const errorStatus = ErrorHandling.getFailureResponse(mnlApiResponse);
        if (errorStatus.status) {
            dispatch(hideSecondaryLoader());
            if (errorStatus.message) {
                await dispatch(displayToast(errorStatus.message));
            }
            return;
        }

        dispatch(setMnlApiResponse(mnlApiResponse));
        if (mnlApiResponse.userData.validation && mnlApiResponse.userData.validation.otpSent) {
            dispatch(changeLoginStep("isStepValidateOtp"));
        }
        dispatch(hideSecondaryLoader());
    };
}

export function validateOtp() {
    return async (dispatch: Function, getState: () => RootState, { api }: { api: any }) => {
        const apiData = getState().mobileNumberLogin.mnlApiData;
        let globalAccessToken = await getFetchGlobalAccessToken(dispatch);
        const mnlApiResponseState = getState().mobileNumberLogin.mnlApiResponse;
        let header = {
            Authorization: `Bearer ${globalAccessToken.access_token}`,
            "register-user": false,
            registerviamobile: false,
            grant_type: "password",
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            platformnumber: PLAT_FORM_NUMBER,
        };
        if (mnlApiResponseState && !mnlApiResponseState.userData.customer.numberAdded) {
            apiData.pass = "";
        }
        if (mnlApiResponseState && mnlApiResponseState.userData.customer.loginVia === "mobile") {
            header = {
                Authorization: `Bearer ${globalAccessToken.access_token}`,
                "register-user": true,
                registerviamobile: true,
                grant_type: "password",
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                platformnumber: PLAT_FORM_NUMBER,
            };
        }
        const result: Response = await api.post("mobileloginapi/v1/authnuser/authenticate", apiData, true, header);
        const mnlApiResponse: MnlApiResponse = await result.json();
        console.log(mnlApiResponse, "mnlApiResponse")
        const errorStatus = ErrorHandling.getFailureResponse(mnlApiResponse);
        if (errorStatus.status) {
            dispatch(hideSecondaryLoader());
            if (errorStatus.message) {
                await dispatch(displayToast(errorStatus.message));
            }
            return;
        }

        dispatch(setMnlApiResponse(mnlApiResponse));
        if (mnlApiResponse.userData.authentication && mnlApiResponse.userData.authentication.accessToken) {
            dispatch(changeLoginStep("isStepLoginSuccess1"));
            dispatch(customerAccessTokenSuccess(mnlApiResponse.userData.authentication));
        }
        dispatch(hideSecondaryLoader());
    };
}

export function updatePassword() {
    return async (dispatch: Function, getState: () => RootState, { api }: { api: any }) => {
        const apiData = getState().mobileNumberLogin.mnlApiData;
        const mnlApiResponseState :any   = getState().mobileNumberLogin.mnlApiResponse;
        let globalAccessToken = await getFetchGlobalAccessToken(dispatch);
        const result: Response = await api.post("mobileloginapi/v1/update/password", apiData, true, {
            Authorization: `Bearer ${globalAccessToken.access_token}`
        });
        const mnlApiResponse: MnlApiResponse = await result.json();
        const errorStatus = ErrorHandling.getFailureResponse(mnlApiResponse);
        if (errorStatus.status) {
            dispatch(hideSecondaryLoader());
            if (errorStatus.message) {
                await dispatch(displayToast(errorStatus.message));
            }
            return;
        }
        dispatch(setMnlApiResponse(mnlApiResponse));
        dispatch(hideSecondaryLoader());
        if(mnlApiResponseState.userData.customer.numberAdded){
            const response =  await dispatch(validateOtp());
            console.log(response);
        }
    }
}

export function sendOtpUpdatePassword() {
    console.log("Generate OTP");
    let result = JSON.parse(Cookie.getCookie("MNL_ACCESS_TOKEN") || "");
    let token = result.accessToken;
    console.log(typeof result, result.accessToken);
    return async (dispatch: Function, getState: () => RootState, { api }: { api: any }) => {
        const result: Response = await api.post("marketplacewebservices/v2/mpl/users/shashankk@yopmail.com/sendotpUpdatepassword", {
            "email": "shashankk@yopmail.com",
            "pass": "",
            "phoneNumber": "9717768747",
            "otp": ""
        }, true, {

            Authorization: `Bearer ${token}`
        });
        console.log(result);
    }
}

export function verifyOtpUpdatePassword() {
    console.log("verifyOtpUpdatePassword");
    let result = JSON.parse(Cookie.getCookie("MNL_ACCESS_TOKEN") || "");
    let token = result.accessToken;
    return async (dispatch: Function, getState: () => RootState, { api }: { api: any }) => {
        const apiData = getState().mobileNumberLogin.mnlApiData;
        const result: Response = await api.post("marketplacewebservices/v2/mpl/users/shashankk@yopmail.com/verifyOtpUpdatePassword", apiData, true, {

            Authorization: `Bearer ${token}`
        });
        dispatch(changeLoginStep("isForgotPassword"))
        console.log(result);
    }
}

export function updatePasswordProfile() {
    let result = JSON.parse(Cookie.getCookie("MNL_ACCESS_TOKEN") || "");
    let token = result.accessToken;
    return async (dispatch: Function, getState: () => RootState, { api }: { api: any }) => {
        const apiData = getState().mobileNumberLogin.mnlApiData;
        delete apiData.platformNumber;
        delete apiData.maskedPhoneNumber;
        const result: Response = await api.post("marketplacewebservices/v2/mpl/users/shashankk@yopmail.com/updatepassword", apiData, true, {

            Authorization: `Bearer ${token}`
        });
        console.log(result);
    }

}

export function generateOtpChangeProfileNumber() {
    let result = JSON.parse(Cookie.getCookie("MNL_ACCESS_TOKEN") || "");
    let token = result.accessToken;
    return async (dispatch: Function, getState: () => RootState, { api }: { api: any }) => {
        const result: Response = await api.post(`marketplacewebservices/v2/mpl/users/shashankk@yopmail.com/updateprofile_V1?emailid&mobilenumber=9205028341&otp&emailOld&mobileOld=9717768747&otpOld&firstName&lastName&dateOfBirth&dateOfAnniversary&nickName&gender&ProfileDataRequired=true&isPwa=true`, {}, true, {
            Authorization: `Bearer ${token}`
        });
        console.log(result);
    }
}

export function validateOtpChangeProfileNumber() {
    let result = JSON.parse(Cookie.getCookie("MNL_ACCESS_TOKEN") || "");
    let token = result.accessToken;
    return async (dispatch: Function, getState: () => RootState, { api }: { api: any }) => {
        const apiData = getState().mobileNumberLogin.mnlApiData;
        const {otp, otp2} = apiData;
        const result: Response = await api.post(`marketplacewebservices/v2/mpl/users/shashankk@yopmail.com/updateprofile_V1?emailid&mobilenumber=9205028341&${otp}&emailOld&mobileOld=9717768747&${otp2}&firstName&lastName&dateOfBirth&dateOfAnniversary&nickName&gender&ProfileDataRequired=true&isPwa=true`, {}, true, {
            Authorization: `Bearer ${token}`
        });
        console.log(result);
    }
}

export type MobileNumberLoginActions = ChangeLoginStepAction | SetMnlApiData | SetMnlApiResponse;
