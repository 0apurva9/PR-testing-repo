import React from "react";
import styles from "../mobile-number-login.css";
import { MnlApiData, MnlApiResponse } from "../mobile-number-login.types";
import { OTP_RESEND_TIME, CUSTOMER_ACCESS_TOKEN } from "../../lib/constants";
import * as Cookies from "../../lib/Cookie";

export class MnlForgotPasswordOtp extends React.Component<MnlForgotPasswordOtpProps, MnlForgotPasswordOtpState> {
    public state: Readonly<MnlForgotPasswordOtpState> = {
        otp: "      ",
        isInputValid: false,
        resendOtp: false,
        resendOtpIn: OTP_RESEND_TIME,
    };

    private _otfDivRef = React.createRef<HTMLDivElement>();

    public componentDidMount() {
        this.startTimer();
    }

    public startTimer = () => {
        let maxTime = this.state.resendOtpIn;
        const intervalId = setInterval(() => {
            this.setState({ resendOtpIn: maxTime });
            if (maxTime === 0) {
                clearInterval(intervalId);
                this.setState({ resendOtp: true });
            }
            maxTime--;
        }, 1000);
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

    private onContinueBtnClick() {
        const mnlApiData = Object.assign({}, this.props.mnlApidata, { otp: this.state.otp });
        const customerCookie = Cookies.getCookie(CUSTOMER_ACCESS_TOKEN);
        if (customerCookie) {
            this.props.validateProfileOtp(mnlApiData);
        } else {
            this.props.validateChallenge(mnlApiData);
        }
    }

    private onClickResendOtp() {
        const mnlApidata = Object.assign({}, this.props.mnlApidata, { otp: this.state.otp });
        const customerCookie = Cookies.getCookie(CUSTOMER_ACCESS_TOKEN);
        if (customerCookie) {
            this.props.resendOtpChangePassword(mnlApidata);
        } else {
            this.props.resendOtp(mnlApidata);
        }
        this.setState({ resendOtp: false, resendOtpIn: OTP_RESEND_TIME }, () => this.startTimer());
    }

    public render() {
        const customerCookie = Cookies.getCookie(CUSTOMER_ACCESS_TOKEN);
        return (
            <div className={styles.whiteBox}>
                <div className={styles.headSec}>
                    <h2>No Worries</h2>
                    <p>
                        Please enter the 6 digit OTP that we just sent on Email
                        {customerCookie && " & Mobile"}
                    </p>
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
                            <div className={[styles.text_right].join(" ")} style={{ flex: "1 0 50%" }}>
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

export interface MnlForgotPasswordOtpProps {
    mnlApidata: MnlApiData;
    validateOtp: (mnlApiData: MnlApiData) => void;
    mnlApiResponse: MnlApiResponse | null;
    validateChallenge: (mnlApiData: MnlApiData) => void;
    resendOtp: (mnlApiData: MnlApiData) => void;
    validateProfileOtp: (mnlApiData: MnlApiData) => void;
    resendOtpChangePassword: (mnlApiData: MnlApiData) => void;
}

export interface MnlForgotPasswordOtpState {
    otp: string;
    isInputValid: boolean;
    resendOtp: boolean;
    resendOtpIn: number;
}
