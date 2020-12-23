import React from "react";
import * as styles from "../mobile-number-login.css";
import { MOBILE_PATTERN, MOBILE_PATTERN_11_DIGIT } from "../../lib/constants";
import { MnlApiData } from "../mobile-number-login.types";

export class MnlAddMobileNumber extends React.Component<MnlAddMobileNumberProps, MnlAddMobileNumberState> {
    public state: Readonly<MnlAddMobileNumberState> = {
        mobileNumber: "",
        isInputValid: false,
    };

    private onChangeInput(event: React.ChangeEvent<HTMLInputElement>) {
        if (MOBILE_PATTERN.test(event.target.value) || MOBILE_PATTERN_11_DIGIT.test(event.target.value)) {
            this.setState({ mobileNumber: event.target.value, isInputValid: true });
            return;
        }
        this.setState({ mobileNumber: event.target.value, isInputValid: false });
    }

    private onContinueBtnClick() {
        const mnlApiData: MnlApiData = JSON.parse(JSON.stringify(this.props.mnlApiData));
        mnlApiData.phoneNumber = this.state.mobileNumber;
        if (this.props.isChangeProfileMobile) {
            this.props.generateOtpChangeProfileNumber(mnlApiData)
        } else if(this.props.isForgotPasswordClicked){
            this.props.generateOtp(mnlApiData)
            this.props.toggleForgotPassswordClick();
        }
        else {
            this.props.addMobileNumber(mnlApiData);
        }
    }

    public render() {
        return (
            <div className={styles.whiteBox}>
                <div className={styles.headSec}>
                    <h2>Just a CLiQ Away</h2>
                    <p>Please add your mobile number to proceed</p>
                </div>
                <div className={styles.formSec}>
                    <div className={styles.feildSec}>
                        <div className={[styles.form_outer, styles.countryCode].join(" ")}>
                            <div className={styles.dateSlct}>+91</div>
                            <input
                                type="number"
                                className={styles.form_control}
                                name="mobileNumber"
                                placeholder="Enter Mobile Number"
                                value={this.state.mobileNumber}
                                onChange={(event) => this.onChangeInput(event)}
                            />
                            <label htmlFor="mobileNumber">Mobile Number</label>
                        </div>
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

export interface MnlAddMobileNumberProps {
    addMobileNumber: (apiData: MnlApiData) => void;
    mnlApiData: MnlApiData;
    isChangeProfileMobile: boolean
    generateOtpChangeProfileNumber: (apiData: MnlApiData) => void;
    isForgotPasswordClicked : boolean;
    generateOtp: (apiData: MnlApiData) => void;
    toggleForgotPassswordClick : () => void

}

export interface MnlAddMobileNumberState {
    mobileNumber: string;
    isInputValid: boolean;
}
