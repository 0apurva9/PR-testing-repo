import React from "react";
import styles from "../mobile-number-login.css";

export class MnlSocialLogin extends React.Component<MnlSocialLoginProps, MnlSocialLoginState> {
    public render() {
        return (
            <div className={styles.socilActn}>
                <div className={styles.flexRow50}>
                    <div className={styles.flexRow50Cols}>
                        <button type="button" className={styles.btnSecondry}>
                            <span className={styles.gogleIcon}></span>Google
                        </button>
                    </div>
                    <div className={styles.flexRow50Cols}>
                        <button type="button" className={styles.btnSecondry}>
                            <span className={styles.fbIcon}></span>Facebook
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export interface MnlSocialLoginProps {}

export interface MnlSocialLoginState {}
