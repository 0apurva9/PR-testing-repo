import React from "react";
import * as styles from "../mobile-number-login.css";

export class MnlOtp extends React.Component<MnlOtpProps, MnlOtpState> {
    private moveToNext(id: string) {}

    public render() {
        return (
            <div className={styles.whiteBox}>
                <div className={styles.headSec}>
                    <h2>Almost There</h2>
                    <p>Please enter the 6 digit OTP that we just sent on +91 98693 98368</p>
                </div>
                <div className={styles.formSec}>
                    <div className={styles.feildSec}>
                        <div className={styles.otpRow}>
                            <div className={styles.otpCol}>
                                <input
                                    type="text"
                                    className={styles.otpInput}
                                    id="otp_1"
                                    size={1}
                                    onKeyUp={() => this.moveToNext("otp_2")}
                                    // onkeyup="movetoNext(this, 'otp_2')"
                                    maxLength={1}
                                />
                            </div>
                            <div className={styles.otpCol}>
                                <input
                                    type="text"
                                    className={styles.otpInput}
                                    id="otp_2"
                                    size={1}
                                    // onkeyup="movetoNext(this, 'otp_2')"
                                    maxLength={1}
                                />
                            </div>
                            <div className={styles.otpCol}>
                                <input
                                    type="text"
                                    className={styles.otpInput}
                                    id="otp_3"
                                    size={1}
                                    // onkeyup="movetoNext(this, 'otp_2')"
                                    maxLength={1}
                                />
                            </div>
                            <div className={styles.otpCol}>
                                <input
                                    type="text"
                                    className={styles.otpInput}
                                    id="otp_4"
                                    size={1}
                                    // onkeyup="movetoNext(this, 'otp_2')"
                                    maxLength={1}
                                />
                            </div>
                            <div className={styles.otpCol}>
                                <input
                                    type="text"
                                    className={styles.otpInput}
                                    id="otp_5"
                                    size={1}
                                    // onkeyup="movetoNext(this, 'otp_2')"
                                    maxLength={1}
                                />
                            </div>
                            <div className={styles.otpCol}>
                                <input type="text" className={styles.otpInput} id="otp_6" size={1} maxLength={1} />
                            </div>
                        </div>
                        <div className={[styles.flexRow50, styles.justify_space].join(" ")}>
                            <div className={styles.flexRow50Cols}>
                                <button type="button" className={styles.btnLink}>
                                    Edit Mobile Number
                                </button>
                            </div>
                            <div className={[styles.flexRow50Cols, styles.text_right].join(" ")}>
                                <button type="button" className={styles.btnLink}>
                                    Resend OTP
                                </button>
                            </div>
                        </div>
                    </div>
                    <button type="button" className={styles.btnPrimary}>
                        Continue
                    </button>
                </div>
            </div>
        );
    }
}

export interface MnlOtpProps {}

export interface MnlOtpState {}
