import React from "react";
import styles from "../mobile-number-login.css";
import { MnlApiData, MnlApiResponse } from "../mobile-number-login.types";
import { OTP_RESEND_TIME } from "../../lib/constants";

export class MnlProfileOtp extends React.Component<MnlOtpProps, MnlOtpState> {
    public state: Readonly<MnlOtpState> = {
        currentOtp: "      ",
        newOtp: "      ",
        isInputValid: false,
        resendOtp: false,
        resendOtpIn: OTP_RESEND_TIME,
    };

    private _currentMobileOtpRef = React.createRef<HTMLDivElement>();

    private _newMobileOtpRef = React.createRef<HTMLDivElement>();

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

    private moveToNext(event: React.KeyboardEvent<HTMLInputElement>, id: string, ref: React.RefObject<HTMLDivElement>) {
        if (ref.current && !Object.is(parseInt(event.key), NaN)) {
            const focusEle = ref.current.querySelector<HTMLInputElement>(`#${id}`);
            if (focusEle) {
                focusEle.focus();
            }
        }
    }

    private onKeyDown(event: React.KeyboardEvent<HTMLInputElement>, id: string, idx: number) {
        event.stopPropagation();
        if (event.keyCode === 8) {
            const otpArr = this.state.currentOtp.split("");
            otpArr[idx] = " ";
            const currentOtp = otpArr.join("");
            if (!/ /g.test(currentOtp) && !/ /g.test(this.state.newOtp)) {
                this.setState({ currentOtp, isInputValid: true });
            } else {
                this.setState({ currentOtp, isInputValid: false });
            }
            if (this._currentMobileOtpRef.current) {
                const focusEle = this._currentMobileOtpRef.current.querySelector<HTMLInputElement>(`#${id}`);
                if (focusEle) {
                    focusEle.focus();
                }
            }
        }
    }

    private onKeyDownNew(event: React.KeyboardEvent<HTMLInputElement>, id: string, idx: number) {
        event.stopPropagation();
        if (event.keyCode === 8) {
            const otpArr = this.state.newOtp.split("");
            otpArr[idx] = " ";
            const currentOtp = otpArr.join("");
            if (!/ /g.test(currentOtp) && !/ /g.test(this.state.currentOtp)) {
                this.setState({ newOtp: currentOtp, isInputValid: true });
            } else {
                this.setState({ newOtp: currentOtp, isInputValid: false });
            }
            if (this._newMobileOtpRef.current) {
                const focusEle = this._newMobileOtpRef.current.querySelector<HTMLInputElement>(`#${id}`);
                if (focusEle) {
                    focusEle.focus();
                }
            }
        }
    }

    private onChangeInput(event: React.ChangeEvent<HTMLInputElement>, index: number) {
        event.target.value = event.target.value.trim();
        if (!event.target.value || event.target.value.length > 1 || isNaN(Number(event.target.value))) {
            return;
        }
        const otpArr = this.state.currentOtp.split("");
        otpArr[index] = event.target.value;
        const currentOtp = otpArr.join("");
        if (!/ /g.test(currentOtp) && !/ /g.test(this.state.newOtp)) {
            this.setState({ currentOtp, isInputValid: true });
        } else {
            this.setState({ currentOtp, isInputValid: false });
        }
    }

    private onChangeInput2(event: React.ChangeEvent<HTMLInputElement>, index: number) {
        event.target.value = event.target.value.trim();
        if (!event.target.value || event.target.value.length > 1 || isNaN(Number(event.target.value))) {
            return;
        }
        const otpArr = this.state.newOtp.split("");
        otpArr[index] = event.target.value;
        const currentOtp = otpArr.join("");
        if (!/ /g.test(currentOtp) && !/ /g.test(this.state.currentOtp)) {
            this.setState({ newOtp: currentOtp, isInputValid: true });
        } else {
            this.setState({ newOtp: currentOtp, isInputValid: false });
        }
    }

    private onContinueBtnClick() {
        const mnlApidata = Object.assign({}, this.props.mnlApidata, {
            currentOtp: this.state.currentOtp,
            newOtp: this.state.newOtp,
        });

        this.props.updateProfileMobileNumber(mnlApidata);
    }

    private onClickResendOtp() {
        const mnlApidata = Object.assign({}, this.props.mnlApidata);
        this.props.resendOtpChangeProfileNumber(mnlApidata);
        this.setState({ resendOtp: false, resendOtpIn: OTP_RESEND_TIME }, () => this.startTimer());
    }

    public render() {
        return (
            <div className={styles.whiteBox}>
                <div className={styles.headSec}>
                    <h2>Almost There</h2>
                    <p>Please enter the 6 digit OTP that we just sent on +91 {this.props.userMobileNumber}</p>
                </div>
                <div className={styles.formSec}>
                    <div className={styles.feildSec}>
                        <div className={styles.otpRow} ref={this._currentMobileOtpRef}>
                            {this.state.currentOtp.split("").map((val, idx) => {
                                return (
                                    <div className={styles.otpCol} key={idx}>
                                        <input
                                            type="text"
                                            inputMode="numeric"
                                            className={styles.otpInput}
                                            id={`otp_${idx}`}
                                            size={1}
                                            onKeyUp={event =>
                                                this.moveToNext(event, `otp_${idx + 1}`, this._currentMobileOtpRef)
                                            }
                                            onKeyDown={event => this.onKeyDown(event, `otp_${idx - 1}`, idx)}
                                            value={this.state.currentOtp.split("")[idx]}
                                            onChange={event => this.onChangeInput(event, idx)}
                                            autoComplete="off"
                                        />
                                    </div>
                                );
                            })}
                        </div>
                        <div className={styles.headSec}>
                            <p>
                                Please enter the 6 digit OTP that we just sent on +91{" "}
                                {this.props.mnlApidata && this.props.mnlApidata.phoneNumber}
                            </p>
                        </div>
                        <div className={styles.otpRow} ref={this._newMobileOtpRef}>
                            {this.state.newOtp.split("").map((val, idx) => {
                                return (
                                    <div className={styles.otpCol} key={idx}>
                                        <input
                                            type="text"
                                            inputMode="numeric"
                                            className={styles.otpInput}
                                            id={`otp_${idx}`}
                                            size={1}
                                            onKeyUp={event =>
                                                this.moveToNext(event, `otp_${idx + 1}`, this._newMobileOtpRef)
                                            }
                                            onKeyDown={event => this.onKeyDownNew(event, `otp_${idx - 1}`, idx)}
                                            value={this.state.newOtp.split("")[idx]}
                                            onChange={event => this.onChangeInput2(event, idx)}
                                            autoComplete="off"
                                        />
                                    </div>
                                );
                            })}
                        </div>
                        <div className={styles.formInfoTxt}>
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
    validateChallenge: (apiData: MnlApiData) => void;
    isStepValidateOtp: boolean;
    validateProfileOtp: (apiData: MnlApiData) => void;
    updateProfileMobileNumber: (apiData: MnlApiData) => void;
    userMobileNumber: string;
    resendOtpChangeProfileNumber: (apiData: MnlApiData) => void;
}

export interface MnlOtpState {
    currentOtp: string;
    newOtp: string;
    isInputValid: boolean;
    resendOtp: boolean;
    resendOtpIn: number;
}
