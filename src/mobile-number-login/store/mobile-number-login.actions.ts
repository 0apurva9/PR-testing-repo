import { RootState } from "common/models/root-state";
import { MnlApiData, MnlApiResponse, UserDetails, isMNLLogin } from "../mobile-number-login.types";
import { hideSecondaryLoader } from "../../general/secondaryLoader.actions.js";
import * as Cookie from "../../lib/Cookie.js";
import { GLOBAL_ACCESS_TOKEN, CLIENT_ID, CLIENT_SECRET, PLAT_FORM_NUMBER } from "../../lib/constants.js";
import {
    getGlobalAccessToken,
    customerAccessTokenSuccess,
    refreshTokenSuccess,
} from "../../auth/actions/user.actions.js";
import * as ErrorHandling from "../../general/ErrorHandling.js";
import { displayToast } from "../../general/toast.actions.js";
import { showMobileNumberLoginModal, hideMobileNumberLoginModal } from "../../general/modal.actions";
import { getUserDetails, logoutUserByMobileNumber } from "../../account/actions/account.actions";
import { loginUser } from "../../auth/actions/user.actions";
import { CUSTOMER_ACCESS_TOKEN, LOGGED_IN_USER_DETAILS, GLOBAL_ACCESS_TOKEN_REFRESH_CODE } from "../../lib/constants";
import { getWishlist, createWishlist } from "../../wishlist/actions/wishlist.actions";

export const CHANGE_LOGIN_STEP = "ChangeLoginStep";
export const SET_MNL_API_DATA = "SetMnlApiData";
export const SET_MNL_API_Response = "SetMnlApiResponse";
export const SET_RESEND_OTP_TIME = "SetResendOtpTimmer";
export const WEB_MNL_LOGIN_SUCCESS = "WebMNLLoginSuccess";
export const WEB_MNL_EMAIL_HIDDEN_SUCCESS = "WebMNLEmailHiddenSuccess";
export const SET_FORGET_PASSWORD = "SetForgotPassword";
export const SET_PASSWORD_ERROR_MSG = "SetPasswordErrorMsg";

interface ChangeLoginStepAction {
    readonly type: typeof CHANGE_LOGIN_STEP;
    /** Key Of Login Step */
    readonly payload: string;
}

interface setWebMNLApiSuccessAction {
    readonly type: typeof WEB_MNL_LOGIN_SUCCESS;
    readonly payload: isMNLLogin;
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

interface SetWebMNLEmailHiddenSuccess {
    readonly type: typeof WEB_MNL_EMAIL_HIDDEN_SUCCESS;
    readonly payload: isMNLLogin;
}

interface SetForgetPassword {
    readonly type: typeof SET_FORGET_PASSWORD;
    readonly payload: boolean;
}

interface SetPasswordErrorMsg {
    readonly type: typeof SET_PASSWORD_ERROR_MSG;
    readonly payload: string;
}

export function setLoginCustomerData(mnlApiResponse: MnlApiResponse) {
    return async (dispatch: Function, getState: () => RootState, { api }: { api: any }) => {
        const apiData = getState().mobileNumberLogin.mnlApiData;
        const mnlApiResponseState = getState().mobileNumberLogin.mnlApiResponse;
        const userDetails: UserDetails = {};

        if (mnlApiResponseState) {
            if (mnlApiResponseState.userData.customer?.loginVia == "email") {
                userDetails.userName = apiData.email;
                userDetails.loginType = mnlApiResponseState.userData.customer?.loginVia;
            } else {
                userDetails.userName = apiData.phoneNumber;
                userDetails.loginType = mnlApiResponseState.userData.customer?.loginVia;
            }
        }

        const tokens = mnlApiResponse.userData.authentication;
        if (tokens) {
            tokens.refresh_token =
                mnlApiResponse.userData.authentication && mnlApiResponse.userData.authentication.refreshToken;
            tokens.access_token =
                mnlApiResponse.userData.authentication && mnlApiResponse.userData.authentication.accessToken;
        }

        dispatch(customerAccessTokenSuccess(tokens));
        dispatch(refreshTokenSuccess(tokens));
        await dispatch(loginUser({ username: userDetails.userName, password: apiData.pass, otp: apiData.otp }));
        dispatch(getUserDetails(true));
        const existingWishList = await dispatch(getWishlist());
        if (!existingWishList || !existingWishList.wishlist) {
            dispatch(createWishlist());
        }
    };
}

export function setWebMNLApiSuccess(result: isMNLLogin): MobileNumberLoginActions {
    return {
        type: WEB_MNL_LOGIN_SUCCESS,
        payload: result,
    };
}

export function setWebMNLEmailHiddenSuccess(result: isMNLLogin): MobileNumberLoginActions {
    return {
        type: WEB_MNL_EMAIL_HIDDEN_SUCCESS,
        payload: result,
    };
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

export function setForgetPassword(isForgetPasswordValue: boolean): MobileNumberLoginActions {
    return {
        type: SET_FORGET_PASSWORD,
        payload: isForgetPasswordValue,
    };
}

export function setPasswordErrorMsg(passwordErrorMsg: string): MobileNumberLoginActions {
    return {
        type: SET_PASSWORD_ERROR_MSG,
        payload: passwordErrorMsg,
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
        const mnlApiResponseState = getState().mobileNumberLogin.mnlApiResponse;
        const result: Response = await api.post("mobileloginapi/v1/authnuser/validate", apiData, null, true, {
            Authorization: `Bearer ${globalAccessToken.access_token}`,
            "register-user": false,
            registerviamobile: false,
        });
        const mnlApiResponse: MnlApiResponse = await result.json();
        const errorStatus = ErrorHandling.getFailureResponse(mnlApiResponse);
        await dispatch(setPasswordErrorMsg(""));
        if (errorStatus.status) {
            if (mnlApiResponse.statusCode === GLOBAL_ACCESS_TOKEN_REFRESH_CODE) {
                await Cookie.deleteCookie(GLOBAL_ACCESS_TOKEN);
                dispatch(validateMnlChallenge());
            } else {
                dispatch(hideSecondaryLoader());
                if (errorStatus.message) {
                    await dispatch(displayToast(errorStatus.message));
                }
            }

            return;
        }
        dispatch(setMnlApiResponse(mnlApiResponse));
        if (
            mnlApiResponse.userData.customer &&
            mnlApiResponse.userData.customer.loginVia == "email" &&
            mnlApiResponse.userData.customer.passwordSet
        ) {
            dispatch(changeLoginStep("isStepLoginPassword"));
        } else if (mnlApiResponse.userData.customer && mnlApiResponse.userData.customer.newUser) {
            mnlApiResponse.userData.customer?.loginVia === "email"
                ? dispatch(changeLoginStep("isStepAddMobileNumber"))
                : dispatch(changeLoginStep("isStepValidateOtp"));
        } else if (mnlApiResponse.userData.customer && mnlApiResponse.userData.customer?.maskedPhoneNumber.length) {
            if (mnlApiResponse.userData.customer?.loginVia === "email") {
                /* login with email, varified email/mob and password not set */
                apiData.maskedPhoneNumber = mnlApiResponse.userData.customer?.maskedPhoneNumber;
                dispatch(setMnlApiData(apiData));
                dispatch(generateOTP());
            } else {
                /* login with mobile, varified email/mob and password not set */
                dispatch(changeLoginStep("isStepValidateOtp"));
            }
        } else if (
            mnlApiResponseState &&
            mnlApiResponseState.userData.customer &&
            mnlApiResponseState.userData.customer?.loginVia === "mobile" &&
            mnlApiResponseState.userData.customer?.newUser &&
            !mnlApiResponseState.userData.customer?.numberAdded &&
            !mnlApiResponseState.userData.customer?.passwordSet
        ) {
            dispatch(changeLoginStep("isStepEmail"));
        } else if (
            mnlApiResponse.userData &&
            mnlApiResponse.userData.validation &&
            mnlApiResponse.userData.validation.validated
        ) {
            dispatch(setForgetPassword(false));
            dispatch(changeLoginStep("isForgotPassword"));
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
        if (mnlApiResponseState && mnlApiResponseState.userData.customer?.numberAdded) {
            const result: Response = await api.post("mobileloginapi/v1/authnuser/authenticate", apiData, null, true, {
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
            const result: Response = await api.post("mobileloginapi/v1/authnuser/validate", apiData, null, true, {
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
        const globalAccessToken = await getFetchGlobalAccessToken(dispatch);
        const isForgetPasswordValue = getState().mobileNumberLogin.isForgetPasswordValue;

        let otpHeader = {
            Authorization: `Bearer ${globalAccessToken.access_token}`,
            "register-user": false,
            registerviamobile: false,
        };
        if (isForgetPasswordValue) {
            //case for forgot password
            otpHeader = {
                Authorization: `Bearer ${globalAccessToken.access_token}`,
                "register-user": true,
                registerviamobile: false,
            };
        }

        const result: Response = await api.post("mobileloginapi/v1/authnuser/otp", apiData, null, true, otpHeader);
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
        if (isForgetPasswordValue) {
            dispatch(changeLoginStep("isStepForgotPasswordOtp"));
        } else if (
            mnlApiResponse.userData &&
            mnlApiResponse.userData.validation &&
            mnlApiResponse.userData.validation.otpSent
        ) {
            dispatch(changeLoginStep("isStepValidateOtp"));
        } else if (
            mnlApiResponse.userData &&
            mnlApiResponse.userData.customer &&
            mnlApiResponse.userData.validation &&
            mnlApiResponse.userData.validation.validated &&
            mnlApiResponse.userData.customer?.passwordSet
        ) {
            dispatch(changeLoginStep("isForgotPassword"));
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
        if (
            mnlApiResponseState &&
            mnlApiResponseState.userData &&
            !mnlApiResponseState.userData.customer?.passwordSet &&
            mnlApiResponseState.userData.customer?.loginVia === "mobile" &&
            mnlApiResponseState.userData.validation &&
            mnlApiResponseState.userData.validation.validated
        ) {
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
        if (
            mnlApiResponseState &&
            mnlApiResponseState.userData &&
            mnlApiResponseState.userData.customer &&
            mnlApiResponseState.userData.customer?.loginVia === "email" &&
            mnlApiResponseState.userData.validation &&
            !mnlApiResponseState.userData.validation.validated &&
            mnlApiResponseState.userData.customer?.newUser &&
            !mnlApiResponseState.userData.customer?.passwordSet &&
            !mnlApiResponseState.userData.validation.emailIdChanged
        ) {
            header = {
                Authorization: `Bearer ${globalAccessToken.access_token}`,
                "register-user": true,
                registerviamobile: false,
                grant_type: "password",
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                platformnumber: PLAT_FORM_NUMBER,
            };
        }
        if (
            mnlApiResponseState &&
            mnlApiResponseState.userData &&
            !mnlApiResponseState.userData.customer?.numberAdded
        ) {
            apiData.pass = "";
        }
        if (
            mnlApiResponseState &&
            mnlApiResponseState.userData &&
            mnlApiResponseState.userData.validation &&
            mnlApiResponseState.userData.validation.changedmailId
        ) {
            apiData.email = mnlApiResponseState.userData.validation.changedmailId;
        }
        const result: Response = await api.post(
            "mobileloginapi/v1/authnuser/authenticate",
            apiData,
            null,
            true,
            header
        );
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

        const result: Response = await api.post(
            `marketplacewebservices/v2/mpl/users/${loginId}/updateprofile_V1?emailOld=${userEmail}&ProfileDataRequired=false&isPwa=true`,
            {},
            null,
            true,
            {
                Authorization: `Bearer ${JSON.parse(authentication).accessToken}`,
                "register-user": true,
                registerviamobile: false,
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                platformnumber: PLAT_FORM_NUMBER,
            }
        );
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

        if (mnlApiResponse.status.toLowerCase() === "success") {
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

        const result: Response = await api.post(
            `marketplacewebservices/v2/mpl/users/${loginId}/updateprofile_V1?emailOld=${userEmail}&otpOld=${apiData.otp}&ProfileDataRequired=false&isPwa=true`,
            {},
            null,
            true,
            {
                Authorization: `Bearer ${JSON.parse(authentication).accessToken}`,
            }
        );
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

        if (mnlApiResponse.status.toLowerCase() === "success") {
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

        const result: Response = await api.post(
            `marketplacewebservices/v2/mpl/users/${loginId}/updateprofile_V1?emailOld=${userEmail}&otpOld=${apiData.otp}&emailid=${apiData.email}&ProfileDataRequired=false&isPwa=true`,
            {},
            null,
            true,
            {
                Authorization: `Bearer ${JSON.parse(authentication).accessToken}`,
            }
        );
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

        if (mnlApiResponse.status.toLowerCase() === "success") {
            dispatch(changeLoginStep("isStepChangeEmailSucess"));

            dispatch(logoutUserByMobileNumber());
        }
        dispatch(hideSecondaryLoader());
    };
}

export function updatePassword() {
    return async (dispatch: Function, getState: () => RootState, { api }: { api: any }) => {
        const apiData = getState().mobileNumberLogin.mnlApiData;
        const mnlApiResponseState: any = getState().mobileNumberLogin.mnlApiResponse;
        const globalAccessToken = await getFetchGlobalAccessToken(dispatch);
        const result: Response = await api.post("mobileloginapi/v1/update/password", apiData, null, true, {
            Authorization: `Bearer ${globalAccessToken.access_token}`,
        });
        const mnlApiResponse: MnlApiResponse = await result.json();
        const errorStatus = ErrorHandling.getFailureResponse(mnlApiResponse);
        await dispatch(setPasswordErrorMsg(""));
        if (errorStatus.status) {
            dispatch(hideSecondaryLoader());
            if (errorStatus.message) {
                await dispatch(displayToast(errorStatus.message));
            }
            return;
        }

        if (mnlApiResponse.statusCode === 5005) {
            dispatch(hideSecondaryLoader());
            if (mnlApiResponse.message) {
                await dispatch(setPasswordErrorMsg(mnlApiResponse.message));
            }
            return;
        }

        dispatch(setMnlApiResponse(mnlApiResponse));
        dispatch(hideSecondaryLoader());
        if (
            mnlApiResponse.userData &&
            mnlApiResponse.userData.profileUpdate &&
            mnlApiResponse.userData.profileUpdate.updated
        ) {
            dispatch(loginWithPassword());
        } else if (mnlApiResponseState.userData && mnlApiResponseState.userData.customer?.maskedPhoneNumber) {
            await dispatch(validateOtp());
            dispatch(changeLoginStep("isStepLoginSuccess1"));
        } else {
            dispatch(changeLoginStep("isStepAddMobileNumber"));
        }
    };
}

export function sendOtpUpdatePassword() {
    const authentication: any = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    const userDetailsCookies = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const userDetails: UserDetails = userDetailsCookies ? JSON.parse(userDetailsCookies) : {};
    const loginId = userDetails.userName || null;
    return async (dispatch: Function, getState: () => RootState, { api }: { api: any }) => {
        const apiData = getState().profile.userDetails;
        const result: Response = await api.post(
            `marketplacewebservices/v2/mpl/users/${loginId}/sendotpUpdatepassword`,
            {
                email: apiData.emailID,
                pass: "",
                phoneNumber: apiData.mobileNumber,
                otp: "",
            },
            null,
            true,
            {
                Authorization: `Bearer ${JSON.parse(authentication).accessToken}`,
            }
        );
        const mnlApiResponse: MnlApiResponse = await result.json();
        const errorStatus = ErrorHandling.getFailureResponse(mnlApiResponse);
        if (errorStatus.status) {
            dispatch(hideSecondaryLoader());
            if (errorStatus.message) {
                await dispatch(displayToast(errorStatus.message));
            }
            return;
        }
        if (mnlApiResponse.status.toLowerCase() === "success") {
            dispatch(showMobileNumberLoginModal());
            dispatch(changeLoginStep("isStepForgotPasswordOtp"));
        }

        dispatch(hideSecondaryLoader());
    };
}

export function verifyOtpUpdatePassword() {
    const authentication: any = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    const userDetailsCookies = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const userDetails: UserDetails = userDetailsCookies ? JSON.parse(userDetailsCookies) : {};
    const loginId = userDetails.userName || null;
    return async (dispatch: Function, getState: () => RootState, { api }: { api: any }) => {
        const apiData = getState().mobileNumberLogin.mnlApiData;
        const loginUserData = getState().profile.userDetails;
        apiData.email = loginUserData.emailID;
        apiData.phoneNumber = loginUserData.mobileNumber;
        const result: Response = await api.post(
            `marketplacewebservices/v2/mpl/users/${loginId}/verifyOtpUpdatePassword`,
            apiData,
            null,
            true,
            {
                Authorization: `Bearer ${JSON.parse(authentication).accessToken}`,
            }
        );
        const mnlApiResponse: MnlApiResponse = await result.json();
        const errorStatus = ErrorHandling.getFailureResponse(mnlApiResponse);
        await dispatch(setPasswordErrorMsg(""));
        if (errorStatus.status) {
            dispatch(hideSecondaryLoader());
            if (errorStatus.message) {
                await dispatch(displayToast(errorStatus.message));
            }
            return;
        }
        dispatch(changeLoginStep("isForgotPasswordProfile"));
    };
}

export function updatePasswordProfile() {
    const authentication: any = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    const userDetailsCookies = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const userDetails: UserDetails = userDetailsCookies ? JSON.parse(userDetailsCookies) : {};
    const loginId = userDetails.userName || null;
    return async (dispatch: Function, getState: () => RootState, { api }: { api: any }) => {
        let apiData: MnlApiData = getState().mobileNumberLogin.mnlApiData;
        const loginUserData = getState().profile.userDetails;
        apiData.platformNumber = "";
        apiData.maskedPhoneNumber = "";
        apiData.email = loginUserData.emailID;
        apiData.phoneNumber = loginUserData.mobileNumber;
        apiData = JSON.parse(JSON.stringify(apiData));
        const result: Response = await api.post(
            `marketplacewebservices/v2/mpl/users/${loginId}/updatepassword`,
            apiData,
            null,
            true,
            {
                Authorization: `Bearer ${JSON.parse(authentication).accessToken}`,
            }
        );
        const mnlApiResponse: MnlApiResponse = await result.json();
        const errorStatus = ErrorHandling.getFailureResponse(mnlApiResponse);
        await dispatch(setPasswordErrorMsg(""));
        if (errorStatus.status) {
            dispatch(hideSecondaryLoader());
            if (errorStatus.errorcode === "406") {
                await dispatch(setPasswordErrorMsg(errorStatus.message));
            } else if (errorStatus.errorcode === "4011") {
                dispatch(hideMobileNumberLoginModal());
            } else if (errorStatus.errorcode === "4009") {
                dispatch(hideMobileNumberLoginModal());
            } else if (errorStatus.message) {
                await dispatch(displayToast(errorStatus.message));
            }
            return;
        }
        if (mnlApiResponse.status.toLowerCase() === "success") {
            dispatch(changeLoginStep("isChangeProfilePasswordSuccess"));
        }
        dispatch(hideSecondaryLoader());
    };
}

export function generateOtpChangeProfileNumber() {
    const authentication: any = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    const userDetailsCookies = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const userDetails: UserDetails = userDetailsCookies ? JSON.parse(userDetailsCookies) : {};
    const loginId = userDetails.userName || null;
    return async (dispatch: Function, getState: () => RootState, { api }: { api: any }) => {
        const apiData = getState().profile.userDetails;
        const mnlApiData = getState().mobileNumberLogin.mnlApiData;
        const result: Response = await api.post(
            `marketplacewebservices/v2/mpl/users/${loginId}/updateprofile_V1?mobilenumber=${mnlApiData.phoneNumber}&mobileOld=${apiData.mobileNumber}&ProfileDataRequired=false&isPwa=true`,
            {},
            null,
            true,
            {
                Authorization: `Bearer ${JSON.parse(authentication).accessToken}`,
            }
        );
        const mnlApiResponse: MnlApiResponse = await result.json();
        const errorStatus = ErrorHandling.getFailureResponse(mnlApiResponse);
        if (errorStatus.status) {
            dispatch(hideSecondaryLoader());
            if (errorStatus.message) {
                await dispatch(displayToast(errorStatus.message));
            }
            return;
        }
        dispatch(changeLoginStep("isChangeNumberOtp"));
    };
}

export function validateOtpChangeProfileNumber() {
    const authentication: any = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    const userDetailsCookies = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const userDetails: UserDetails = userDetailsCookies ? JSON.parse(userDetailsCookies) : {};
    const loginId = userDetails.userName || null;
    return async (dispatch: Function, getState: () => RootState, { api }: { api: any }) => {
        const apiData = getState().profile.userDetails;
        const mnlApiData = getState().mobileNumberLogin.mnlApiData;
        const { currentOtp, newOtp } = mnlApiData;
        const result: Response = await api.post(
            `marketplacewebservices/v2/mpl/users/${loginId}/updateprofile_V1?mobilenumber=${mnlApiData.phoneNumber}&otp=${newOtp}&mobileOld=${apiData.mobileNumber}&otpOld=${currentOtp}&ProfileDataRequired=false&isPwa=true`,
            {},
            null,
            true,
            {
                Authorization: `Bearer ${JSON.parse(authentication).accessToken}`,
            }
        );
        const mnlApiResponse: MnlApiResponse = await result.json();
        const errorStatus = ErrorHandling.getFailureResponse(mnlApiResponse);
        if (errorStatus.status) {
            dispatch(hideSecondaryLoader());
            if (errorStatus.message) {
                await dispatch(displayToast(errorStatus.message));
            }
            return;
        }
        if (mnlApiResponse.status.toLowerCase() === "success") {
            dispatch(changeLoginStep("isChangeMobileNumberSuccess"));

            dispatch(logoutUserByMobileNumber());
        }
        dispatch(hideSecondaryLoader());
    };
}

export function webMnlEmailHidden() {
    return async (dispatch: Function, getState: () => RootState, { api }: { api: any }) => {
        try {
            const result = await api.customGetMiddlewareUrl(
                `/otatacliq/getApplicationProperties.json?propertyNames=is_WEB_MNL_EMAIL_HIDDEN`
            );
            const resultJson = await result.json();
            const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);

            if (resultJsonStatus.status) {
                throw new Error(resultJsonStatus.message);
            }
            return dispatch(setWebMNLEmailHiddenSuccess(resultJson.applicationProperties[0]));
        } catch (e) {
            throw new Error(`${e.message}`);
        }
    };
}

export type MobileNumberLoginActions =
    | ChangeLoginStepAction
    | SetMnlApiData
    | SetMnlApiResponse
    | SetResendOtpTimmer
    | setWebMNLApiSuccessAction
    | SetWebMNLEmailHiddenSuccess
    | SetForgetPassword
    | SetPasswordErrorMsg;
