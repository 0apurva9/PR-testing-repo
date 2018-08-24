import React from "react";
import styles from "./DesktopLogin.css";
import LoginContainer from "../containers/LoginContainer";
import SignUpContainer from "../containers/SignUpContainer";
import SocialButtonsContainer from "../containers/SocialButtonsContainer";
export default class DesktopLogin extends React.Component {
  render() {
    return (
      <div className={styles.base}>
        <div className={styles.loginAndSignUpHolder}>
          <div className={styles.loginAndSignUp}>
            <div className={styles.centerSection}>
              <div className={styles.leftDesktopHolder}>
                <div className={styles.header}>Welcome back</div>
                <div className={styles.loginContainerHolder}>
                  <LoginContainer />
                </div>
              </div>
              <div className={styles.rightDesktopHolder}>
                <div className={styles.header}>New to CliQ?</div>
                <div className={styles.loginContainerHolder}>
                  <SignUpContainer />
                </div>
              </div>
              <div className={styles.socialButtonHolder}>
                <SocialButtonsContainer />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
