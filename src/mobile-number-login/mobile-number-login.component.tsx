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
import { MnlForgotPassword } from "./components/mnl-forgot-password.component";
import { MnlEmail } from "./components/mnl-email-component";
import { MnlProfileOtp } from './components/mnl-profile-otp.component';
import { MnlEmailChangeOtp } from "./components/mnl-change-email-otp.component";
import { MnlChangeEmailSucess } from "./components/mnl-change-email-succes.component"

export class MobileNumberLogin extends React.Component<MobileNumberLoginProps, MobileNumberLoginState> {

    public state: Readonly<MobileNumberLoginState> = {
        isForgotPasswordClicked: false
    }

    public toggleForgotPassswordClick = () => {
        this.setState({ isForgotPasswordClicked: !this.state.isForgotPasswordClicked })
    }

    public render() {
        return (
            <div className={styles.overLay}>
                <div className={styles.overLayInner}>
                    <div className={styles.signIn}>
                        {
                            this.props.steps.isChangeNumberOtp &&
                            <MnlProfileOtp
                                validateOtp={(apidata) => this.props.validateOtp(apidata)}
                                mnlApidata={this.props.mnlApiData}
                                changeLoginStep={(stepKey) => this.props.changeLoginStep(stepKey)}
                                mnlApiResponse={this.props.mnlApiResponse}
                                validateChallenge={(mnlApiData) => this.props.validateChallenge(mnlApiData)}
                                isStepValidateOtp={this.props.steps.isStepValidateOtp}
                                validateProfileOtp={(apidata) => this.props.validateProfileOtp(apidata)}
                                updateProfileMobileNumber={(apidata) => this.props.updateProfileMobileNumber(apidata)}
                            />
                        }
                        {this.props.steps.isStepEmail && (
                            <MnlEmail
                                setMnlApiData={(mnlApiData) => this.props.validateChallenge(mnlApiData)}
                                validateOtp={(apidata) => this.props.validateOtp(apidata)}
                                mnlApiData={this.props.mnlApiData}
                            />

                        )}
                        {this.props.steps.isForgotPassword && (
                            <MnlForgotPassword
                                mnlApiData={this.props.mnlApiData}
                                setMnlApiData={(apiData) => this.props.loginWithPassword(apiData)}
                                changeLoginStep={(stepKey) => this.props.changeLoginStep(stepKey)}
                                generateOtp={(apiData) => this.props.generateOtp(apiData)}
                                forgotPassword={(apiData) => this.props.forgotPassword(apiData)}
                                isForgotPassword={this.props.steps.isForgotPassword}
                                changeProfilePassword={(apiData) => this.props.changeProfilePassword(apiData)}
                            />
                        )}
                        {this.props.steps.isStepLoginChallenge && (
                            <MnlChallenge setMnlApiData={(mnlApiData) => this.props.validateChallenge(mnlApiData)} />
                        )}
                        {this.props.steps.isStepLoginPassword && (
                            <MnlPassword
                                mnlApiData={this.props.mnlApiData}
                                setMnlApiData={(apiData) => this.props.loginWithPassword(apiData)}
                                changeLoginStep={(stepKey) => this.props.changeLoginStep(stepKey)}
                                generateOtp={(apiData) => this.props.generateOtp(apiData)}
                                forgotPassword={(apiData) => this.props.forgotPassword(apiData)}
                                toggleForgotPassswordClick={() => this.toggleForgotPassswordClick()}
                                useOtp={(apiData) => this.props.generateOtp(apiData)}
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
                                validateChallenge={(mnlApiData) => this.props.validateChallenge(mnlApiData)}
                                isStepValidateOtp={this.props.steps.isStepValidateOtp}
                                validateProfileOtp={(apidata) => this.props.validateProfileOtp(apidata)}
                                isForgotPasswordClicked={this.state.isForgotPasswordClicked}
                                resendOtp={(apiData) => this.props.validateChallenge(apiData)}
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
    forgotPassword: (apiData: MnlApiData) => void;
    validateProfileOtp: (apiData: MnlApiData) => void;
    changeProfilePassword: (apiData: MnlApiData) => void;
    updateProfileMobileNumber: (apiData: MnlApiData) => void;
    validateEmailOtp: (apiData: MnlApiData) => void;
    addnewEmail: (apiData: MnlApiData) => void;
    updateEmailOtp: () => void;
}


export interface MobileNumberLoginState {
    isForgotPasswordClicked: boolean;
}
