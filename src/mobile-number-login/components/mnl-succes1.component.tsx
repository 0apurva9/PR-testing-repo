import React from "react";
import styles from "../mobile-number-login.css";
import successLoginImg from "../images/sucess_login.svg";

export class MnlSucess1 extends React.Component<MnlSucess1Props> {
    public componentDidMount() {
        setTimeout(() => {
            this.props.hideMobileNumberLoginModal();
            this.props.changeLoginStep("isStepLoginChallenge");
            this.props.checkLoginPath();
        }, 3000);
    }

    public render() {
        return (
            <div className={styles.signIn}>
                <div className={[styles.whiteBox, styles.login_sucess].join(" ")}>
                    <div className={styles.login_sucess_img}>
                        <img src={successLoginImg} />
                    </div>
                    <div className={styles.lognSucess_TxtSec}>
                        <h3>You’re Successfully Logged In</h3>
                        <h3>Start CLiQing</h3>
                    </div>
                </div>
            </div>
        );
    }
}

export interface MnlSucess1Props {
    hideMobileNumberLoginModal: () => void;
    changeLoginStep: (stepKey: string) => void;
    checkLoginPath: () => void;
}
