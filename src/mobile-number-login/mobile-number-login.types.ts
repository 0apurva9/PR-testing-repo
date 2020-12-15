export interface MobileNumberLoginReduxState {
    steps: MobileNumberLoginSteps;
    mnlApiData: MnlApiData;
    mnlApiResponse: MnlApiResponse | null;
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
    isStepChangeEmailOtp: boolean;
    isStepChangeEmail: boolean;
    isStepChangeEmailSucess: boolean;
}
export interface MnlApiData {
    email: string;
    phoneNumber: string;
    maskedPhoneNumber: string;
    otp: string;
    pass: string;
    platformNumber: string;
}

export interface Authentication {
    accessToken: string;
    expiresIn: number;
    refreshToken: string;
    scope: string;
    tokenType: string;
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
}