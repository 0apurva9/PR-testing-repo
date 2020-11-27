import * as React from "react";
import { RouteComponentProps } from "react-router";
import * as styles from "./mobile-number-login.css";
import { MobileNumberLoginSteps, MnlApiData, MnlApiResponse } from "mobile-number-login/mobile-number-login.types";
import { MnlChallenge } from "./components/mnl-challenge.component";
import { MnlPassword } from "./components/mnl-password.component";
import { MnlSucess1 } from "./components/mnl-succes1.component";
import { MnlAddMobileNumber } from "./components/mnl-add-mobile-number.component";
import { MnlOtp } from "./components/mnl-otp.component";

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
                            />
                        )}
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
}

export interface MobileNumberLoginState {}
