import React from "react";
import * as styles from "../mobile-number-login.css";

export class MnlChangeMobileSucess extends React.Component<MnlSucess1Props> {
    public componentDidMount() {
        setTimeout(() => {
            this.props.hideMobileNumberLoginModal();
            this.props.routeToHome();
        }, 5000);
    }

    public render() {
        return (
            <div className={styles.signIn}>
                <div className={[styles.whiteBox, styles.login_sucess].join(" ")}>
                    <div className={styles.lognSucess_TxtSec}>
                        <h3>You’re Successfully updated your phone number. Please Loggin again.</h3>
                    </div>
                </div>
            </div>
        );
    }
}

export interface MnlSucess1Props {
    hideMobileNumberLoginModal: () => void;
    changeLoginStep: (stepKey: string) => void;
    routeToHome: () => void;
}
