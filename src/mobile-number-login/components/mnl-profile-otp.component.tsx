import React from "react";
import * as styles from "../mobile-number-login.css";
import { MnlApiData, MnlApiResponse } from "../mobile-number-login.types";

export class MnlProfileOtp extends React.Component<MnlOtpProps, MnlOtpState> {
  public state: Readonly<MnlOtpState> = {
    otp: "123123",
    otp2 : "123123",
    isInputValid: false,
    isInputValid2: false,
    resendOtp: false,
    resendOtpIn: 30
  };
  private _otfDivRef = React.createRef<HTMLDivElement>();

  public componentDidMount() {
    let maxTime = this.state.resendOtpIn;
    const intervalId = setInterval(() => {
      this.setState({ resendOtpIn: maxTime });
      if (maxTime === 0) {
        clearInterval(intervalId);
        this.setState({ resendOtp: true });
      }
      maxTime--;
    }, 1000);
  }

  private moveToNext(event: React.KeyboardEvent<HTMLInputElement>, id: string) {
    if (this._otfDivRef.current && !Object.is(parseInt(event.key), NaN)) {
      const focusEle = this._otfDivRef.current.querySelector<HTMLInputElement>(
        `#${id}`
      );
      if (focusEle) {
        focusEle.focus();
      }
    }
  }

  private onKeyDown(
    event: React.KeyboardEvent<HTMLInputElement>,
    id: string,
    idx: number
  ) {
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
        const focusEle = this._otfDivRef.current.querySelector<
          HTMLInputElement
        >(`#${id}`);
        if (focusEle) {
          focusEle.focus();
        }
      }
    }
  }

  private onKeyDown2(
    event: React.KeyboardEvent<HTMLInputElement>,
    id: string,
    idx: number
  ) {
    event.stopPropagation();
    if (event.keyCode === 8) {
      const otpArr = this.state.otp2.split("");
      otpArr[idx] = " ";
      const otp = otpArr.join("");
      if (!/ /g.test(otp)) {
        this.setState({ otp2 : otp, isInputValid2: true });
      } else {
        this.setState({ otp2 : otp, isInputValid2: false });
      }
      if (this._otfDivRef.current) {
        const focusEle = this._otfDivRef.current.querySelector<
          HTMLInputElement
        >(`#${id}`);
        if (focusEle) {
          focusEle.focus();
        }
      }
    }
  }

  private onChangeInput(
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) {
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

  private onChangeInput2(
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) {
    if (!event.target.value || event.target.value.length > 1) {
      return;
    }
    const otpArr = this.state.otp2.split("");
    otpArr[index] = event.target.value;
    const otp = otpArr.join("");
    if (!/ /g.test(otp)) {
      this.setState({ otp2 : otp, isInputValid: true });
    } else {
      this.setState({ otp2 : otp, isInputValid: false });
    }
  }

  private editMobileNumber() {
    this.props.changeLoginStep("isStepAddMobileNumber");
  }

  private onContinueBtnClick() {
    const mnlApidata = Object.assign({}, this.props.mnlApidata, {
      otp: this.state.otp,
      otp2: this.state.otp2
    });

    this.props.updateProfileMobileNumber(mnlApidata);

  }

  public render() {
    return (
      <div className={styles.whiteBox}>
        <div className={styles.headSec}>
          <h2>Almost There</h2>
          <p>
            Please enter the 6 digit OTP that we just sent on +91{" "}
            {this.props.mnlApiResponse && this.props.mnlApiResponse.userData.customer.maskedPhoneNumber ||
              this.props.mnlApidata.phoneNumber}
          </p>
        </div>
        <div className={styles.formSec}>
          <div className={styles.feildSec}>
            <div className={styles.otpRow} ref={this._otfDivRef}>
              {this.state.otp.split("").map((val, idx) => {
                return (
                  <div className={styles.otpCol}>
                    <input
                      type="number"
                      className={styles.otpInput}
                      id={`otp_${idx}`}
                      size={1}
                      onKeyUp={event =>
                        this.moveToNext(event, `otp_${idx + 1}`)
                      }
                      onKeyDown={event =>
                        this.onKeyDown(event, `otp_${idx - 1}`, idx)
                      }
                      maxLength={1}
                      value={this.state.otp.split("")[idx]}
                      onChange={event => this.onChangeInput(event, idx)}
                    />
                  </div>
                );
              })}
            </div>
            <div className={styles.otpRow} ref={this._otfDivRef}>
              {this.state.otp.split("").map((val, idx) => {
                return (
                  <div className={styles.otpCol}>
                    <input
                      type="number"
                      className={styles.otpInput}
                      id={`otp_${idx}`}
                      size={1}
                      onKeyUp={event =>
                        this.moveToNext(event, `otp_${idx + 1}`)
                      }
                      onKeyDown={event =>
                        this.onKeyDown2(event, `otp_${idx - 1}`, idx)
                      }
                      maxLength={1}
                      value={this.state.otp2.split("")[idx]}
                      onChange={event => this.onChangeInput2(event, idx)}
                    />
                  </div>
                );
              })}
            </div>
            <div className={[styles.flexRow50, styles.justify_space].join(" ")}>
              <div className={styles.flexRow50Cols}>
                <button
                  type="button"
                  className={styles.btnLink}
                  onClick={() => this.editMobileNumber()}
                >
                  Edit Number
                </button>
              </div>
              <div
                className={[styles.flexRow50Cols, styles.text_right].join(" ")}
              >
                {this.state.resendOtp ? (
                  <button type="button" className={styles.btnLink}>
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
  mnlApiResponse: MnlApiResponse;
  validateChallenge: (apiData: MnlApiData) => void;
  isStepValidateOtp : boolean;
  validateProfileOtp : (apiData: MnlApiData) => void;
  updateProfileMobileNumber : (apiData: MnlApiData) => void;
}

export interface MnlOtpState {
  otp: string;
  otp2 : string;
  isInputValid: boolean;
  resendOtp: boolean;
  resendOtpIn: number;
  isInputValid2: boolean;
}
