import React from "react";
import styles from "../mobile-number-login.css";
import { MnlApiData } from "../mobile-number-login.types";
import { PASSWORD_VALIDATION_MESSAGE, PASSWORD_VALIDATION } from "./../../lib/constants";

export class MnlForgotPassword extends React.Component<MnlPasswordProps, MnlPasswordState> {
    public state: Readonly<MnlPasswordState> = {
        showPassword: false,
        password: "",
        isInputValid: false,
        passwordErrorMsg: "",
    };

    private onChangeInput(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ password: event.target.value });
    }

    public onForgotPasswordClick() {
        const mnlApiData: MnlApiData = Object.assign({}, this.props.mnlApiData);
        this.props.generateOtp(mnlApiData);
    }

    public onContinuButtonClick() {
        const mnlApiData: MnlApiData = Object.assign({}, this.props.mnlApiData);
        mnlApiData.pass = this.state.password;
        if (this.props.isForgotPasswordProfile) {
            if (this.state.password.length < 8) {
                this.setState({
                    passwordErrorMsg: "Password length should be minimum 8 character",
                });
                return false;
            } else if (!PASSWORD_VALIDATION.test(this.state.password)) {
                this.setState({
                    passwordErrorMsg: PASSWORD_VALIDATION_MESSAGE,
                });
                return false;
            } else {
                this.setState({ passwordErrorMsg: "" });
            }
            this.props.changeProfilePassword(mnlApiData);
        } else {
            this.props.forgotPassword(mnlApiData);
        }
    }

    public render() {
        const passwordIcon = this.state.showPassword ? styles.forGotBtn : `${styles.forGotBtn} ${styles.eyeClose}`;
        return (
            <div className={styles.signIn}>
                <div className={styles.whiteBox}>
                    <div className={styles.headSec}>
                        <h2>Welcome Back</h2>
                        <p>Please enter new password to Continue</p>
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
                                    autoComplete="off"
                                />
                                <label htmlFor="password">Enter Password</label>
                                <button
                                    type="button"
                                    className={passwordIcon}
                                    onClick={() => this.setState({ showPassword: !this.state.showPassword })}
                                ></button>
                                {this.props.passwordErrorMsg ? (
                                    <span className={styles.passwordErrorformat}>{this.props.passwordErrorMsg}</span>
                                ) : this.state["passwordErrorMsg"] ? (
                                    <span className={styles.passwordErrorformat}>{this.state["passwordErrorMsg"]}</span>
                                ) : (
                                    <span className={styles.passwordFormat}>{PASSWORD_VALIDATION_MESSAGE}</span>
                                )}
                            </div>
                        </div>

                        <button type="button" className={styles.btnPrimary} onClick={() => this.onContinuButtonClick()}>
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
    changeLoginStep: (stepKey: string) => void;
    generateOtp: (apiData: MnlApiData) => void;
    forgotPassword: (apiData: MnlApiData) => void;
    isForgotPassword: boolean;
    changeProfilePassword: (apiData: MnlApiData) => void;
    isForgotPasswordProfile: boolean;
    displayToast: (msg: string) => void;
    passwordErrorMsg: string;
}

export interface MnlPasswordState {
    showPassword: boolean;
    password: string;
    isInputValid: boolean;
    passwordErrorMsg: string;
}
