import React from "react";
import styles from "../mobile-number-login.css";
import { EMAIL_REGULAR_EXPRESSION } from "../../lib/constants";
import { MnlApiData, isMNLLogin } from "../mobile-number-login.types";

export class MnlEmail extends React.Component<MnlChallengeProps, MnlChallengeState> {
    constructor(props: MnlChallengeProps) {
        super(props);
        this.state = {
            isMobileNumberActive: false,
            mobileNumber: "",
            emailAddress: "",
            isInputValid: false,
        };
    }

    private onChangeInput(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.name === "emailAddress") {
            if (EMAIL_REGULAR_EXPRESSION.test(event.target.value)) {
                this.setState({ emailAddress: event.target.value, isInputValid: true });
                return;
            }
            this.setState({ emailAddress: event.target.value, isInputValid: false });
        }
    }

    private validateCall() {
        this.props.validateOtp(this.props.mnlApiData);
    }

    private onContinueBtnClick() {
        const mnlApidata = Object.assign({}, this.props.mnlApiData, {
            email: this.state.emailAddress,
        });
        this.props.validateOtp(mnlApidata);
    }

    public render() {
        return (
            <div className={styles.whiteBox}>
                <div className={styles.headSec}>
                    <h2>Welcome to Tata CLiQ</h2>
                    <p>Please enter your email address</p>
                </div>
                <div className={styles.formSec}>
                    <div className={styles.feildSec}>
                        <div className={styles.form_outer}>
                            <input
                                type="email"
                                className={styles.form_control}
                                name="emailAddress"
                                placeholder="Enter Email Address"
                                value={this.state.emailAddress}
                                onChange={event => this.onChangeInput(event)}
                                autoComplete="off"
                            />
                            <label htmlFor="emailAddress">E-Mail Address</label>
                        </div>
                        {!this.props.isWebMNLEmailHidden.value && (
                            <div className={styles.formInfoTxt}>
                                <button type="button" className={styles.btnLink} onClick={() => this.validateCall()}>
                                    Do it later
                                </button>
                            </div>
                        )}
                    </div>
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
    validateOtp: (mnlApiData: MnlApiData) => void;
    mnlApiData: MnlApiData;
    isWebMNLEmailHidden: isMNLLogin;
}
