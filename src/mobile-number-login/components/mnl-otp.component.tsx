import React from "react";
import styles from "../mobile-number-login.css";
import { MnlApiData, MnlApiResponse } from "../mobile-number-login.types";
import { OTP_RESEND_TIME } from "../../lib/constants";

export class MnlOtp extends React.Component<MnlOtpProps, MnlOtpState> {
    public state: Readonly<MnlOtpState> = {
        otp: "      ",
        isInputValid: false,
        resendOtp: false,
        resendOtpIn:
            this.props.resendOtpTime == 0
                ? OTP_RESEND_TIME
                : this.props.resendOtpTime > 0
                ? this.props.resendOtpTime
                : 0,
    };

    private _otfDivRef = React.createRef<HTMLDivElement>();

    public componentDidMount() {
        this.startTimer();
    }

    public startTimer = () => {
        let maxTime = this.state.resendOtpIn;
        if (!maxTime) {
            this.setState({ resendOtp: true });
        } else {
            const intervalId = setInterval(() => {
                this.setState({ resendOtpIn: maxTime });
                if (maxTime === 0) {
                    clearInterval(intervalId);
                    this.setState({ resendOtp: true });
                }
                maxTime--;
            }, 1000);
        }
    };

    private moveToNext(event: React.KeyboardEvent<HTMLInputElement>, id: string) {
        if (this._otfDivRef.current && !Object.is(parseInt(event.key), NaN)) {
            const focusEle = this._otfDivRef.current.querySelector<HTMLInputElement>(`#${id}`);
            if (focusEle) {
                focusEle.focus();
            }
        }
    }

    private onKeyDown(event: React.KeyboardEvent<HTMLInputElement>, id: string, idx: number) {
        event.stopPropagation();
        if (event.keyCode === 8) {
            const otpArr = this.state.otp.split("");
            otpArr[idx] = " ";
            const otp = otpArr.join("");
            if (!/ /g.test(otp)) {
                this.setState({ otp, isInputValid: true });
            } else {
                this.setState({ otp, isInputValid: false });
            }
            if (this._otfDivRef.current) {
                const focusEle = this._otfDivRef.current.querySelector<HTMLInputElement>(`#${id}`);
                if (focusEle) {
                    focusEle.focus();
                }
            }
        }
    }

    private onChangeInput(event: React.ChangeEvent<HTMLInputElement>, index: number) {
        if (!event.target.value || event.target.value.length > 1) {
            return;
        }
        const otpArr = this.state.otp.split("");
        otpArr[index] = event.target.value;
        const otp = otpArr.join("");
        if (!/ /g.test(otp)) {
            this.setState({ otp, isInputValid: true });
        } else {
            this.setState({ otp, isInputValid: false });
        }
    }

    private editMobileNumber() {
        this.props.changeLoginStep("isStepLoginChallenge");
    }

    private onClickResendOtp() {
        const mnlApidata = Object.assign({}, this.props.mnlApidata, {
            otp: "",
        });
        if (this.props.mnlApiResponse?.userData.customer?.loginVia == "email") {
            this.props.resendOtpEmail(mnlApidata);
        } else {
            this.props.resendOtp(mnlApidata);
        }
        this.setState({ resendOtp: false, resendOtpIn: OTP_RESEND_TIME }, () => this.startTimer());
    }

    private onClickUsePassword() {
        this.props.changeLoginStep("isStepLoginPassword");
        const resendOtpTimmer = this.state.resendOtpIn;
        resendOtpTimmer ? this.props.setResendOtpTimmer(resendOtpTimmer) : this.props.setResendOtpTimmer(-1);
    }

    private onContinueBtnClick() {
        const mnlApidata: MnlApiData = Object.assign({}, this.props.mnlApidata, {
            otp: this.state.otp,
        });

        if (this.props.isStepValidateProfileOtp) {
            this.props.validateProfileOtp(mnlApidata);
            return;
        }
        if (this.props.isForgotPasswordClicked) {
            this.props.changeLoginStep("isForgotPassword");
        } else if (
            this.props.mnlApiResponse?.userData.customer?.newUser &&
            this.props.mnlApiResponse.userData.validation &&
            this.props.mnlApiResponse.userData.validation.changedmailId
        ) {
            //login with new email id and registered mobile number
            this.props.validateOtp(mnlApidata);
        } else if (
            this.props.mnlApiResponse?.userData.customer?.newUser &&
            !this.props.mnlApiResponse.userData.customer?.passwordSet &&
            this.props.mnlApiResponse.userData.customer?.loginVia === "mobile"
        ) {
            //login with new mobile number
            this.props.validateChallenge(mnlApidata);
        } else {
            //login with new email id and new mobile number
            this.props.validateOtp(mnlApidata);
        }
    }

    public render() {
        return (
            <div className={styles.whiteBox}>
                <div className={styles.headSec}>
                    <h2>Almost There</h2>
                    <p>
                        Please enter the 6 digit OTP that we just sent on +91{" "}
                        {this.props.mnlApiResponse &&
                        this.props.mnlApiResponse.userData &&
                        this.props.mnlApiResponse.userData.customer?.loginVia == "mobile"
                            ? this.props.mnlApidata.phoneNumber
                            : this.props.mnlApiResponse?.userData.customer?.maskedPhoneNumber ||
                              this.props.mnlApidata.phoneNumber}
                    </p>
                    {this.props.mnlApiResponse?.userData.customer?.passwordSet &&
                        this.props.mnlApiResponse.userData.customer?.loginVia === "mobile" && (
                            <button type="button" className={styles.btnLink} onClick={() => this.editMobileNumber()}>
                                Edit Number
                            </button>
                        )}
                </div>
                <div className={styles.formSec}>
                    <div className={styles.feildSec}>
                        <div className={styles.otpRow} ref={this._otfDivRef}>
                            {this.state.otp.split("").map((val, idx) => {
                                return (
                                    <div className={styles.otpCol} key={idx}>
                                        <input
                                            type="number"
                                            className={styles.otpInput}
                                            id={`otp_${idx}`}
                                            size={1}
                                            onKeyUp={event => this.moveToNext(event, `otp_${idx + 1}`)}
                                            onKeyDown={event => this.onKeyDown(event, `otp_${idx - 1}`, idx)}
                                            maxLength={1}
                                            value={this.state.otp.split("")[idx]}
                                            onChange={event => this.onChangeInput(event, idx)}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                        <div className={[styles.flexRow50, styles.justify_space].join(" ")}>
                            <div className={styles.flexRow50Cols}>
                                {this.props.mnlApiResponse?.userData.customer?.passwordSet ? (
                                    <button
                                        type="button"
                                        className={styles.btnLink}
                                        onClick={() => this.onClickUsePassword()}
                                    >
                                        Use Password
                                    </button>
                                ) : (
                                    !(
                                        this.props.mnlApiResponse?.userData.customer?.maskedPhoneNumber &&
                                        this.props.mnlApiResponse?.userData.customer?.loginVia === "email"
                                    ) && (
                                        <button
                                            type="button"
                                            className={styles.btnLink}
                                            onClick={() => this.editMobileNumber()}
                                        >
                                            Edit Number
                                        </button>
                                    )
                                )}
                            </div>
                            <div className={[styles.flexRow50Cols, styles.text_right].join(" ")}>
                                {this.state.resendOtp ? (
                                    <button
                                        type="button"
                                        className={styles.btnLink}
                                        onClick={() => this.onClickResendOtp()}
                                    >
                                        Resend OTP
                                    </button>
                                ) : (
                                    <p>Resend OTP in 0:{this.state.resendOtpIn}</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <button
                        type="button"
                        className={styles.btnPrimary}
                        disabled={!this.state.isInputValid}
                        onClick={() => this.onContinueBtnClick()}
                    >
                        Continue
                    </button>
                </div>
            </div>
        );
    }
}

export interface MnlOtpProps {
    mnlApidata: MnlApiData;
    validateOtp: (mnlApiData: MnlApiData) => void;
    changeLoginStep: (stepKey: string) => void;
    mnlApiResponse: MnlApiResponse | null;
    resendOtp: (mnlApiData: MnlApiData) => void;
    setResendOtpTimmer: (resendOtpTimmer: number) => void;
    resendOtpTime: number;
    validateChallenge: (apiData: MnlApiData) => void;
    isStepValidateOtp: boolean;
    validateProfileOtp: (apiData: MnlApiData) => void;
    isForgotPasswordClicked: boolean;
    isStepValidateProfileOtp: boolean;
    resendOtpEmail: (apiData: MnlApiData) => void;
}

export interface MnlOtpState {
    otp: string;
    isInputValid: boolean;
    resendOtp: boolean;
    resendOtpIn: number;
}
