import { RootState } from "common/models/root-state";
import { MnlApiData, MnlApiResponse, UserDetails } from "../mobile-number-login.types";
import { hideSecondaryLoader } from "../../general/secondaryLoader.actions.js";
import * as Cookie from "../../lib/Cookie.js";
import { GLOBAL_ACCESS_TOKEN, CLIENT_ID, CLIENT_SECRET, PLAT_FORM_NUMBER } from "../../lib/constants.js";
import { getGlobalAccessToken, customerAccessTokenSuccess, refreshTokenSuccess } from "../../auth/actions/user.actions.js";
import * as ErrorHandling from "../../general/ErrorHandling.js";
import { displayToast } from "../../general/toast.actions.js";
import { showMobileNumberLoginModal } from "../../general/modal.actions";
import { getUserDetails } from '../../account/actions/account.actions'
import { CUSTOMER_ACCESS_TOKEN, LOGGED_IN_USER_DETAILS } from "../../lib/constants";

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

export function setLoginCustomerData(mnlApiResponse: MnlApiResponse) {
    return async (dispatch: Function, getState: () => RootState, { api }: { api: any }) => {
        const apiData = getState().mobileNumberLogin.mnlApiData;
        const mnlApiResponseState = getState().mobileNumberLogin.mnlApiResponse;
        const userDetails: UserDetails = {};

        if (mnlApiResponseState) {
            if (mnlApiResponseState.userData.customer.loginVia == "email") {
                userDetails.userName = apiData.email;
                userDetails.email = apiData.email;
                userDetails.loginType = mnlApiResponseState.userData.customer.loginVia;
            } else {
                userDetails.userName = apiData.phoneNumber;
                userDetails.mobileNumber = apiData.email;
                userDetails.loginType = mnlApiResponseState.userData.customer.loginVia;
            }
        }

        Cookie.createCookie(LOGGED_IN_USER_DETAILS, JSON.stringify(userDetails));
        dispatch(customerAccessTokenSuccess(mnlApiResponse.userData.authentication));
        dispatch(refreshTokenSuccess(mnlApiResponse.userData.authentication));
        dispatch(getUserDetails(true))
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
        const globalAccessToken = await getFetchGlobalAccessToken(dispatch);
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
        if (mnlApiResponse.userData.customer && mnlApiResponse.userData.customer.passwordSet) {
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
        const globalAccessToken = await getFetchGlobalAccessToken(dispatch);
        const mnlApiResponseState = getState().mobileNumberLogin.mnlApiResponse;

        if (mnlApiResponseState && mnlApiResponseState.userData.customer && mnlApiResponseState.userData.customer.maskedPhoneNumber.length) {
            apiData.maskedPhoneNumber = mnlApiResponseState.userData.customer.maskedPhoneNumber;
        }

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
        const globalAccessToken = await getFetchGlobalAccessToken(dispatch);
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
        if (mnlApiResponseState && mnlApiResponseState.userData && !mnlApiResponseState.userData.customer.numberAdded) {
            apiData.pass = "";
        }
        if (mnlApiResponseState && mnlApiResponseState.userData && mnlApiResponseState.userData.validation && mnlApiResponseState.userData.validation.changedmailId) {
            apiData.email = mnlApiResponseState.userData.validation.changedmailId;
        }
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

        const userDetailsCookies = Cookie.getCookie(LOGGED_IN_USER_DETAILS);

        const userDetails: UserDetails = userDetailsCookies ? JSON.parse(userDetailsCookies) : {};

        const loginId = userDetails.userName || null;

        const result: Response = await api.post(`marketplacewebservices/v2/mpl/users/${loginId}/updateprofile_V1?emailOld=${userDetails.email}&ProfileDataRequired=false&isPwa=true`, null, true, {
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

        const authentication: any = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);

        const userDetailsCookies = Cookie.getCookie(LOGGED_IN_USER_DETAILS);

        const userDetails: UserDetails = userDetailsCookies ? JSON.parse(userDetailsCookies) : {};

        const loginId = userDetails.userName || null;


        const result: Response = await api.post(`marketplacewebservices/v2/mpl/users/${loginId}/updateprofile_V1?emailOld=${userDetails.email}&otpOld=${apiData.otp}&ProfileDataRequired=false&isPwa=true`, null, true, {
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

        const authentication: any = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);

        const userDetailsCookies = Cookie.getCookie(LOGGED_IN_USER_DETAILS);

        const userDetails: UserDetails = userDetailsCookies ? JSON.parse(userDetailsCookies) : {};

        const loginId = userDetails.userName || null;

        const result: Response = await api.post(`marketplacewebservices/v2/mpl/users/${loginId}/updateprofile_V1?emailOld=${userDetails.email}&otpOld=${apiData.otp}&emailid=${apiData.email}&ProfileDataRequired=false&isPwa=true`, null, true, {
            Authorization: `Bearer ${JSON.parse(authentication).accessToken}`,
            // "register-user": true,
            // registerviamobile: false,
            // //grant_type: "password",
            // client_id: CLIENT_ID,
            // client_secret: CLIENT_SECRET,
            // platformnumber: PLAT_FORM_NUMBER,
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

        }
        dispatch(hideSecondaryLoader());
    };
}

export function updatePassword() {
    return async (dispatch: Function, getState: () => RootState, { api }: { api: any }) => {
        const apiData = getState().mobileNumberLogin.mnlApiData;
        const mnlApiResponseState: any = getState().mobileNumberLogin.mnlApiResponse;
        const globalAccessToken = await getFetchGlobalAccessToken(dispatch);
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
        if (mnlApiResponseState.userData.customer.numberAdded) {
            const response = await dispatch(validateOtp());
            console.log(response);
        }
    }
}

export function sendOtpUpdatePassword() {
    console.log("Generate OTP");
    let result = JSON.parse(Cookie.getCookie("MNL_ACCESS_TOKEN") || "");
    let token = result.accessToken;
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
    let result = JSON.parse(Cookie.getCookie("MNL_ACCESS_TOKEN") || "");
    let token = result.accessToken;
    return async (dispatch: Function, getState: () => RootState, { api }: { api: any }) => {
        const apiData = getState().mobileNumberLogin.mnlApiData;
        const result: Response = await api.post("marketplacewebservices/v2/mpl/users/shashankk@yopmail.com/verifyOtpUpdatePassword", apiData, true, {

            Authorization: `Bearer ${token}`
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
        dispatch(changeLoginStep("isForgotPasswordProfile"))

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
        const mnlApiResponse: MnlApiResponse = await result.json();
        const errorStatus = ErrorHandling.getFailureResponse(mnlApiResponse);
        if (errorStatus.status) {
            dispatch(hideSecondaryLoader());
            if (errorStatus.message) {
                await dispatch(displayToast(errorStatus.message));
            }
            return;
        }
        dispatch(changeLoginStep("isChangeProfilePasswordSuccess"))
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
        const { otp, otp2 } = apiData;
        const result: Response = await api.post(`marketplacewebservices/v2/mpl/users/shashankk@yopmail.com/updateprofile_V1?emailid&mobilenumber=9205028341&${otp}&emailOld&mobileOld=9717768747&${otp2}&firstName&lastName&dateOfBirth&dateOfAnniversary&nickName&gender&ProfileDataRequired=true&isPwa=true`, {}, true, {
            Authorization: `Bearer ${token}`
        });
        console.log(result);
    }
}

export type MobileNumberLoginActions = ChangeLoginStepAction | SetMnlApiData | SetMnlApiResponse;
