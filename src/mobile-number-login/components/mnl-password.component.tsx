import React from "react";
import styles from "../mobile-number-login.css";
import { MnlApiData, MnlApiResponse } from "../mobile-number-login.types";

export class MnlPassword extends React.Component<MnlPasswordProps, MnlPasswordState> {
    public state: Readonly<MnlPasswordState> = {
        showPassword: false,
        password: "",
        isInputValid: false,
    };

    private onChangeInput(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.value.length >= 8) {
            this.setState({ password: event.target.value, isInputValid: true });
        } else {
            this.setState({ password: event.target.value, isInputValid: false });
        }
    }

    public onForgotPasswordClick() {
        const mnlApiData: MnlApiData = JSON.parse(JSON.stringify(this.props.mnlApiData));
        mnlApiData.maskedPhoneNumber = "";
        mnlApiData.pass = "";
        this.props.setForgetPassword(true);
        this.props.generateOtp(mnlApiData);
    }

    public onContinuButtonClick() {
        const mnlApiData: MnlApiData = JSON.parse(JSON.stringify(this.props.mnlApiData));
        mnlApiData.pass = this.state.password;
        this.props.setMnlApiData(mnlApiData);
    }

    private onClickUseOtp() {
        if (this.props.mnlApiResponse?.userData.customer?.loginVia == "email") {
            const mnlApiResponseState = this.props.mnlApiResponse;
            const mnlApiData: MnlApiData = JSON.parse(JSON.stringify(this.props.mnlApiData));
            mnlApiData.maskedPhoneNumber = mnlApiResponseState.userData.customer?.maskedPhoneNumber;
            this.props.useOtpViaEmail(mnlApiData);
        } else {
            this.props.useOtpViaMobile();
        }
    }

    public render() {
        const passwordIcon = this.state.showPassword ? styles.forGotBtn : `${styles.forGotBtn} ${styles.eyeClose}`;
        return (
            <div className={styles.signIn}>
                <div className={styles.whiteBox}>
                    <div className={styles.headSec}>
                        <h2>Welcome Back</h2>
                        <p>Please enter your password to proceed</p>
                    </div>
                    <div className={styles.formSec}>
                        <div className={styles.feildSec}>
                            <div className={[styles.form_outer, styles.forgotPass].join(" ")}>
                                <input
                                    type={this.state.showPassword ? "text" : "password"}
                                    className={styles.form_control}
                                    name="password"
                                    placeholder="Enter Password"
                                    value={this.state.password}
                                    onChange={event => this.onChangeInput(event)}
                                />
                                <label htmlFor="password">Enter Password</label>
                                <button
                                    type="button"
                                    className={passwordIcon}
                                    onClick={() => this.setState({ showPassword: !this.state.showPassword })}
                                ></button>
                            </div>
                            <div className={[styles.flexRow50, styles.justify_space].join(" ")}>
                                <div className={styles.flexRow50Cols}>
                                    {!!this.props.mnlApiResponse?.userData.customer?.maskedPhoneNumber.length && (
                                        <button
                                            type="button"
                                            className={styles.btnLink}
                                            style={{ float: "left" }}
                                            onClick={() => this.onClickUseOtp()}
                                        >
                                            Use OTP
                                        </button>
                                    )}
                                </div>
                                {this.props.mnlApiResponse?.userData.customer?.loginVia === "email" && (
                                    <div className={[styles.flexRow50Cols, styles.text_right].join(" ")}>
                                        <button
                                            type="button"
                                            className={styles.btnLink}
                                            style={{ float: "right" }}
                                            onClick={() => this.onForgotPasswordClick()}
                                        >
                                            Forgot Password?
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <button
                            type="button"
                            className={styles.btnPrimary}
                            disabled={!this.state.isInputValid}
                            onClick={() => this.onContinuButtonClick()}
                        >
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export interface MnlPasswordProps {
    mnlApiData: MnlApiData;
    setMnlApiData: (mnlApiData: MnlApiData) => void;
    useOtpViaEmail: (mnlApiData: MnlApiData) => void;
    useOtpViaMobile: () => void;
    changeLoginStep: (stepKey: string) => void;
    generateOtp: (apiData: MnlApiData) => void;
    mnlApiResponse: MnlApiResponse | null;
    isStepForgotPasswordOtp: () => void;
    setForgetPassword: (setForgetPassword: boolean) => void;
}

export interface MnlPasswordState {
    showPassword: boolean;
    password: string;
    isInputValid: boolean;
}
