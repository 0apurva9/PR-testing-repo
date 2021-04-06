import React from "react";
import styles from "../mobile-number-login.css";
import {
    EMAIL_REGULAR_EXPRESSION,
    MOBILE_PATTERN,
    PLAT_FORM_NUMBER,
    MOBILE_PATTERN_11_DIGIT,
} from "../../lib/constants";
import { MnlApiData } from "../mobile-number-login.types";

export class MnlChallenge extends React.Component<MnlChallengeProps, MnlChallengeState> {
    constructor(props: MnlChallengeProps) {
        super(props);
        this.state = {
            isMobileNumberActive: true,
            mobileNumber: "",
            emailAddress: "",
            isInputValid: false,
        };
        this.props.setMnlApiResponseNull();
    }

    private onChangeInput(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.name === "mobileNumber" && !isNaN(Number(event.target.value))) {
            if (MOBILE_PATTERN.test(event.target.value) || MOBILE_PATTERN_11_DIGIT.test(event.target.value)) {
                this.setState({ mobileNumber: event.target.value, isInputValid: true });
                return;
            }
            this.setState({ mobileNumber: event.target.value, isInputValid: false });
        } else if (event.target.name === "emailAddress") {
            if (EMAIL_REGULAR_EXPRESSION.test(event.target.value)) {
                this.setState({ emailAddress: event.target.value, isInputValid: true });
                return;
            }
            this.setState({ emailAddress: event.target.value, isInputValid: false });
        }
    }

    private onContinueBtnClick() {
        this.props.setMnlApiData({
            email: this.state.emailAddress,
            maskedPhoneNumber: "",
            otp: "",
            pass: "",
            phoneNumber: this.state.mobileNumber,
            platformNumber: PLAT_FORM_NUMBER,
            currentOtp: "",
            newOtp: "",
        });
    }

    public render() {
        return (
            <div className={styles.whiteBox}>
                <div className={styles.headSec}>
                    <h2>Welcome to Tata CLiQ</h2>
                    {this.state.isMobileNumberActive ? (
                        <p>Please enter your mobile number</p>
                    ) : (
                        <p>Please enter your email address</p>
                    )}
                </div>
                <div className={styles.formSec}>
                    {this.state.isMobileNumberActive ? (
                        <div className={styles.feildSec}>
                            <div className={[styles.form_outer, styles.countryCode].join(" ")}>
                                <div className={styles.dateSlct}>+91</div>
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    className={styles.form_control}
                                    name="mobileNumber"
                                    placeholder="Enter Mobile Number"
                                    value={this.state.mobileNumber}
                                    onChange={event => this.onChangeInput(event)}
                                />
                                <label htmlFor="mobileNumber">Mobile Number</label>
                            </div>
                            <div className={styles.formInfoTxt}>
                                <button
                                    type="button"
                                    className={styles.btnLink}
                                    onClick={() =>
                                        this.setState({
                                            isMobileNumberActive: false,
                                            isInputValid: false,
                                            mobileNumber: "",
                                        })
                                    }
                                >
                                    Use Email Address
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.feildSec}>
                            <div className={styles.form_outer}>
                                <input
                                    type="email"
                                    className={styles.form_control}
                                    name="emailAddress"
                                    placeholder="Enter Email Address"
                                    value={this.state.emailAddress}
                                    onChange={event => this.onChangeInput(event)}
                                />
                                <label htmlFor="emailAddress">E-Mail Address</label>
                            </div>
                            <div className={styles.formInfoTxt}>
                                <button
                                    type="button"
                                    className={styles.btnLink}
                                    onClick={() =>
                                        this.setState({
                                            isMobileNumberActive: true,
                                            isInputValid: false,
                                            emailAddress: "",
                                        })
                                    }
                                >
                                    Use Mobile Number
                                </button>
                            </div>
                        </div>
                    )}
                    <button
                        type="button"
                        disabled={!this.state.isInputValid}
                        className={styles.btnPrimary}
                        onClick={() => this.onContinueBtnClick()}
                    >
                        Continue
                    </button>
                </div>
            </div>
        );
    }
}

export interface MnlChallengeState {
    isMobileNumberActive: boolean;
    mobileNumber: string;
    emailAddress: string;
    isInputValid: boolean;
}

export interface MnlChallengeProps {
    setMnlApiData: (mnlApiData: MnlApiData) => void;
    setMnlApiResponseNull: () => void;
}
