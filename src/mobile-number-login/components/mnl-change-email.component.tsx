import React from "react";
import styles from "../mobile-number-login.css";
import { EMAIL_REGULAR_EXPRESSION } from "../../lib/constants";
import { MnlApiData, MnlApiResponse } from "../mobile-number-login.types";

export class MnlEmailChange extends React.Component<MnlEmailChangeProps, MnlEmailChangeState> {
    constructor(props: MnlEmailChangeProps) {
        super(props);
        this.state = {
            isInputValid: false,
            emailAddress: "",
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

    private onContinueBtnClick() {
        const mnlApiData: MnlApiData = JSON.parse(JSON.stringify(this.props.mnlApidata));
        mnlApiData.email = this.state.emailAddress;
        this.props.addnewEmail(mnlApiData);
    }

    public render() {
        return (
            <div className={styles.whiteBox}>
                <div className={styles.headSec}>
                    <h2>Here You Go</h2>
                    <p>Please enter a new email address</p>
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
                            />
                            <label htmlFor="emailAddress">E-Mail Address</label>
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

export interface MnlEmailChangeState {
    emailAddress: string;
    isInputValid: boolean;
}

export interface MnlEmailChangeProps {
    mnlApidata: MnlApiData;
    addnewEmail: (mnlApiData: MnlApiData) => void;
    mnlApiResponse: MnlApiResponse | null;
}
