import { RootState } from "common/models/root-state";
import { MnlApiData, MnlApiResponse, UserDetails } from "../mobile-number-login.types";
import { hideSecondaryLoader } from "../../general/secondaryLoader.actions.js";
import * as Cookie from "../../lib/Cookie.js";
import { GLOBAL_ACCESS_TOKEN, CLIENT_ID, CLIENT_SECRET, PLAT_FORM_NUMBER } from "../../lib/constants.js";
import { getGlobalAccessToken, customerAccessTokenSuccess, refreshTokenSuccess } from "../../auth/actions/user.actions.js";
import * as ErrorHandling from "../../general/ErrorHandling.js";
import { displayToast } from "../../general/toast.actions.js";
import { showMobileNumberLoginModal } from "../../general/modal.actions";
import { getUserDetails } from "../../account/actions/account.actions";
import { loginUser } from "../../auth/actions/user.actions";
import { CUSTOMER_ACCESS_TOKEN, LOGGED_IN_USER_DETAILS } from "../../lib/constants";

export const CHANGE_LOGIN_STEP = "ChangeLoginStep";
export const SET_MNL_API_DATA = "SetMnlApiData";
export const SET_MNL_API_Response = "SetMnlApiResponse";
export const SET_RESEND_OTP_TIME = "SetResendOtpTimmer";

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

interface SetResendOtpTimmer {
    readonly type: typeof SET_RESEND_OTP_TIME;
    readonly payload: number;
}

export function setLoginCustomerData(mnlApiResponse: MnlApiResponse) {
    return async (dispatch: Function, getState: () => RootState, { api }: { api: any }) => {
        const apiData = getState().mobileNumberLogin.mnlApiData;
        const mnlApiResponseState = getState().mobileNumberLogin.mnlApiResponse;
        const userDetails: UserDetails = {};

        if (mnlApiResponseState) {
            if (mnlApiResponseState.userData.customer.loginVia == "email") {
                userDetails.userName = apiData.email;
                userDetails.loginType = mnlApiResponseState.userData.customer.loginVia;
            } else {
                userDetails.userName = apiData.phoneNumber;
                userDetails.loginType = mnlApiResponseState.userData.customer.loginVia;
            }
        }

        Cookie.createCookie(LOGGED_IN_USER_DETAILS, JSON.stringify(userDetails));
        dispatch(customerAccessTokenSuccess(mnlApiResponse.userData.authentication));
        dispatch(refreshTokenSuccess(mnlApiResponse.userData.authentication));
        dispatch(getUserDetails(true));
        dispatch(loginUser({ "username": userDetails.userName, "password": apiData.pass, "otp": apiData.otp }));

    }
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

export function setResendOtpTimmer(resendOtpTimmer: number): MobileNumberLoginActions {
    return {
        type: SET_RESEND_OTP_TIME,
        payload: resendOtpTimmer,
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
        if (mnlApiResponse.userData.customer.loginVia == "email" && mnlApiResponse.userData.customer.passwordSet) {
            dispatch(changeLoginStep("isStepLoginPassword"));
        }
        else if (mnlApiResponse.userData.customer.newUser) {
            dispatch(changeLoginStep("isStepAddMobileNumber"));
        }
        else if (mnlApiResponse.userData.customer.maskedPhoneNumber.length) {
            mnlApiResponse.userData.customer.loginVia === "email" ? dispatch(generateOTP()) : dispatch(changeLoginStep("isStepValidateOtp"));
        }
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
                dispatch(setLoginCustomerData(mnlApiResponse));
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
                dispatch(hideSecondaryLoader()); dispatch(setLoginCustomerData(mnlApiResponse));
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
        const mnlApiResponseState = getState().mobileNumberLogin.mnlApiResponse;
        let globalAccessToken = await getFetchGlobalAccessToken(dispatch);

        if (mnlApiResponseState && mnlApiResponseState.userData.customer && mnlApiResponseState.userData.customer.maskedPhoneNumber.length) {
            apiData.maskedPhoneNumber = mnlApiResponseState.userData.customer.maskedPhoneNumber;
        }

        const result: Response = await api.post("mobileloginapi/v1/authnuser/otp", apiData, true, {
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
        if (mnlApiResponse.userData.validation && mnlApiResponse.userData.validation.otpSent) {
            dispatch(changeLoginStep("isStepValidateOtp"));
        }
        dispatch(hideSecondaryLoader());
    };
}

export function validateOtp() {
    return async (dispatch: Function, getState: () => RootState, { api }: { api: any }) => {
        const apiData = getState().mobileNumberLogin.mnlApiData;
        const mnlApiResponseState = getState().mobileNumberLogin.mnlApiResponse;
        if (mnlApiResponseState && mnlApiResponseState.userData && !mnlApiResponseState.userData.customer.numberAdded) {
            apiData.pass = "";
        }
        if (mnlApiResponseState && mnlApiResponseState.userData && mnlApiResponseState.userData.validation && mnlApiResponseState.userData.validation.changedmailId) {
            apiData.email = mnlApiResponseState.userData.validation.changedmailId;
        }
        let globalAccessToken = await getFetchGlobalAccessToken(dispatch);

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
            dispatch(setLoginCustomerData(mnlApiResponse));
        }
        dispatch(hideSecondaryLoader());
    };
}

export function updateEmailOtp() {
    return async (dispatch: Function, getState: () => RootState, { api }: { api: any }) => {

        const authentication: any = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);

        const userEmail = getState().profile.userDetails.emailID;

        const userDetailsCookies = Cookie.getCookie(LOGGED_IN_USER_DETAILS);

        const userDetails: UserDetails = userDetailsCookies ? JSON.parse(userDetailsCookies) : {};

        const loginId = userDetails.userName || null;

        const result: Response = await api.post(`marketplacewebservices/v2/mpl/users/${loginId}/updateprofile_V1?emailOld=${userEmail}&ProfileDataRequired=false&isPwa=true`, null, true, {
            Authorization: `Bearer ${JSON.parse(authentication).accessToken}`,
            "register-user": true,
            registerviamobile: false,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            platformnumber: PLAT_FORM_NUMBER,
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

        if (mnlApiResponse.status === "Success") {
            dispatch(showMobileNumberLoginModal());
            dispatch(changeLoginStep("isStepChangeEmailOtp"));
        }
        dispatch(hideSecondaryLoader());
    };
}

export function validateEmailOtp() {
    return async (dispatch: Function, getState: () => RootState, { api }: { api: any }) => {

        const apiData = getState().mobileNumberLogin.mnlApiData;

        const userEmail = getState().profile.userDetails.emailID;

        const authentication: any = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);

        const userDetailsCookies = Cookie.getCookie(LOGGED_IN_USER_DETAILS);

        const userDetails: UserDetails = userDetailsCookies ? JSON.parse(userDetailsCookies) : {};

        const loginId = userDetails.userName || null;


        const result: Response = await api.post(`marketplacewebservices/v2/mpl/users/${loginId}/updateprofile_V1?emailOld=${userEmail}&otpOld=${apiData.otp}&ProfileDataRequired=false&isPwa=true`, null, true, {
            Authorization: `Bearer ${JSON.parse(authentication).accessToken}`,
            "register-user": true,
            registerviamobile: false,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            platformnumber: PLAT_FORM_NUMBER,
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

        if (mnlApiResponse.status === "Success") {

            dispatch(changeLoginStep("isStepChangeEmail"));
        }
        dispatch(hideSecondaryLoader());
    };
}

export function addnewEmail() {
    return async (dispatch: Function, getState: () => RootState, { api }: { api: any }) => {

        const apiData = getState().mobileNumberLogin.mnlApiData;

        const userEmail = getState().profile.userDetails.emailID;

        const authentication: any = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);

        const userDetailsCookies = Cookie.getCookie(LOGGED_IN_USER_DETAILS);

        const userDetails: UserDetails = userDetailsCookies ? JSON.parse(userDetailsCookies) : {};

        const loginId = userDetails.userName || null;

        const result: Response = await api.post(`marketplacewebservices/v2/mpl/users/${loginId}/updateprofile_V1?emailOld=${userEmail}&otpOld=${apiData.otp}&emailid=${apiData.email}&ProfileDataRequired=false&isPwa=true`, null, true, {
            Authorization: `Bearer ${JSON.parse(authentication).accessToken}`,
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

        dispatch(changeLoginStep("isStepChangeEmailSucess"));
        if (mnlApiResponse.status === "Success") {

            userDetails.email = apiData.email;

            Cookie.createCookie(LOGGED_IN_USER_DETAILS, JSON.stringify(userDetails));

            dispatch(changeLoginStep("isStepChangeEmailSucess"));

            dispatch(getUserDetails(true));

        }
        dispatch(hideSecondaryLoader());
    };
}

export type MobileNumberLoginActions = ChangeLoginStepAction | SetMnlApiData | SetMnlApiResponse | SetResendOtpTimmer;
