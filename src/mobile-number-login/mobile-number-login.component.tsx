import * as React from "react";
import { RouteComponentProps } from "react-router";
import * as styles from "./mobile-number-login.css";
import { MobileNumberLoginSteps, MnlApiData, MnlApiResponse } from "mobile-number-login/mobile-number-login.types";
import { MnlChallenge } from "./components/mnl-challenge.component";
import { MnlPassword } from "./components/mnl-password.component";
import { MnlSucess1 } from "./components/mnl-succes1.component";
import { MnlEmailChange } from "./components/mnl-change-email.component";
import { MnlAddMobileNumber } from "./components/mnl-add-mobile-number.component";
import { MnlOtp } from "./components/mnl-otp.component";
import { MnlEmailChangeOtp } from "./components/mnl-change-email-otp.component";
import { MnlChangeEmailSucess } from "./components/mnl-change-email-succes.component"

export class MobileNumberLogin extends React.Component<MobileNumberLoginProps, MobileNumberLoginState> {
    public render() {
        return (
            <div className={styles.overLay}>
                <div className={styles.overLayInner}>
                    <div className={styles.signIn}>
                        {this.props.steps.isStepLoginChallenge && (
                            <MnlChallenge setMnlApiData={(mnlApiData) => this.props.validateChallenge(mnlApiData)} />
                        )}
                        {this.props.steps.isStepLoginPassword && (
                            <MnlPassword
                                mnlApiData={this.props.mnlApiData}
                                setMnlApiData={(apiData) => this.props.loginWithPassword(apiData)}
                                useOtpViaEmail={(apiData) => this.props.generateOtp(apiData)}
                                useOtpViaMobile={() => this.props.changeLoginStep("isStepValidateOtp")}
                                mnlApiResponse={this.props.mnlApiResponse}
                            />
                        )}
                        {this.props.steps.isStepAddMobileNumber && (
                            <MnlAddMobileNumber
                                mnlApiData={this.props.mnlApiData}
                                addMobileNumber={(apiData) => this.props.generateOtp(apiData)}
                            />
                        )}
                        {this.props.steps.isStepValidateOtp && (
                            <MnlOtp
                                validateOtp={(apidata) => this.props.validateOtp(apidata)}
                                mnlApidata={this.props.mnlApiData}
                                changeLoginStep={(stepKey) => this.props.changeLoginStep(stepKey)}
                                mnlApiResponse={this.props.mnlApiResponse}
                                resendOtp={(apiData) => this.props.validateChallenge(apiData)}
                                resendOtpTime={this.props.resendOtpTime}
                                setResendOtpTimmer={(resendOtpTimmer) => this.props.setResendOtpTimmer(resendOtpTimmer)}
                            />
                        )}
                        {this.props.steps.isStepChangeEmailOtp && (
                            <MnlEmailChangeOtp
                                validateEmailOtp={(apidata) => this.props.validateEmailOtp(apidata)}
                                mnlApidata={this.props.mnlApiData}
                                changeLoginStep={(stepKey) => this.props.changeLoginStep(stepKey)}
                                mnlApiResponse={this.props.mnlApiResponse}
                                resendEmailOtp={() => this.props.updateEmailOtp()}
                            />
                        )}
                        {this.props.steps.isStepChangeEmail && (
                            <MnlEmailChange
                                addnewEmail={(apidata) => this.props.addnewEmail(apidata)}
                                mnlApidata={this.props.mnlApiData}
                                mnlApiResponse={this.props.mnlApiResponse}
                            />
                        )}
                        {this.props.steps.isStepChangeEmailSucess &&
                            <MnlChangeEmailSucess
                                hideMobileNumberLoginModal={() => this.props.hideMobileNumberLoginModal()}
                                changeLoginStep={(stepKey) => this.props.changeLoginStep(stepKey)} />}

                        {this.props.steps.isStepLoginSuccess1 && (
                            <MnlSucess1
                                hideMobileNumberLoginModal={() => this.props.hideMobileNumberLoginModal()}
                                changeLoginStep={(stepKey) => this.props.changeLoginStep(stepKey)}
                            />
                        )}
                        <button
                            type="button"
                            className={styles.loginCloseBtn}
                            onClick={() => this.props.hideMobileNumberLoginModal()}
                        ></button>
                    </div>
                </div>
            </div>
        );
    }
}

export interface MobileNumberLoginProps extends RouteComponentProps {
    hideMobileNumberLoginModal: () => void;
    steps: MobileNumberLoginSteps;
    mnlApiData: MnlApiData;
    mnlApiResponse: MnlApiResponse;
    validateChallenge: (apiData: MnlApiData) => void;
    loginWithPassword: (apiData: MnlApiData) => void;
    changeLoginStep: (stepKey: string) => void;
    generateOtp: (apiData: MnlApiData) => void;
    validateOtp: (apiData: MnlApiData) => void;
    validateEmailOtp: (apiData: MnlApiData) => void;
    addnewEmail: (apiData: MnlApiData) => void;
    updateEmailOtp: () => void;
    setResendOtpTimmer: (resendOtpTimmer: number) => void;
    resendOtpTime: number;
}

export interface MobileNumberLoginState { }
