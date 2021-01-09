export interface MobileNumberLoginReduxState {
    steps: MobileNumberLoginSteps;
    mnlApiData: MnlApiData;
    mnlApiResponse: MnlApiResponse | null;
    resendOtpTimmer: number;
    isMNLLogin: isMNLLogin;
    isWebMNLEmailHidden: isMNLLogin;
    isForgetPasswordValue: boolean;
}

export interface MobileNumberLoginSteps {
    isStepLoginChallenge: boolean;
    isStepLoginPassword: boolean;
    isStepAddMobileNumber: boolean;
    isStepValidateOtp: boolean;
    isStepLoginSuccess1: boolean;
    isStepLoginSuccess2: boolean;
    isStepLoginSuccess3: boolean;
    isStepAddEmail: boolean;
    isForgotPassword: boolean;
    isStepEmail: boolean;
    isChangeNumberOtp: boolean;
    isStepChangeEmailOtp: boolean;
    isStepChangeEmail: boolean;
    isStepChangeEmailSucess: boolean;
    isStepValidateProfileOtp: boolean;
    isForgotPasswordProfile: boolean;
    isChangeProfilePasswordSuccess: boolean;
    isChangeProfileMobile: false;
    isChangeMobileNumberSuccess: false;
    isStepForgotPasswordOtp: false;
}
export interface MnlApiData {
    email: string;
    phoneNumber: string;
    maskedPhoneNumber: string;
    otp: string;
    pass: string;
    platformNumber: string;
    currentOtp: string;
    newOtp: string;
}

export interface isMNLLogin {
    name: string;
    value: boolean;
}

export interface Authentication {
    accessToken: string;
    expiresIn: number;
    refreshToken: string;
    scope: string;
    tokenType: string;
    refresh_token?: string;
    access_token?: string;
}

export interface Customer {
    loginVia: string;
    maskedPhoneNumber: string;
    newUser: boolean;
    numberAdded: boolean;
    otpSent: boolean;
    passwordSet: boolean;
}

export interface ProfileUpdate {
    updated: boolean;
}

export interface Validation {
    changedmailId: string;
    emailIdChanged: boolean;
    maskedPhoneNumber: string;
    otpSent: boolean;
    validated: boolean;
}

export interface UserData {
    authentication?: Authentication;
    customer: Customer;
    profileUpdate?: ProfileUpdate;
    validation?: Validation;
}

export interface MnlApiResponse {
    message: string;
    status: string;
    statusCode: number;
    userData: UserData;
}

export interface UserDetails {
    userName?: string;
    loginType?: string;
    mobileNumber?: string;
    email?: string;
    userEmail?: string;
}