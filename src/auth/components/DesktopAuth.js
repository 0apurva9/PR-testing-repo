import React from "react";
import styles from "./DesktopAuthStyles.css";
import LoginContainer from "../containers/LoginContainer";
import SignUpContainer from "../containers/SignUpContainer";
import SocialButtonsContainer from "../containers/SocialButtonsContainer";
import { TERMS_AND_CONDITION_URL } from "../../lib/constants";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";
export default class DesktopAuth extends React.Component {
  handleClose() {
    if (this.props.closeModal) {
      this.props.closeModal();
    }
  }
  redirectToHelp = url => {
    const urlSuffix = url.replace(TATA_CLIQ_ROOT, "$1");
    this.props.history.push(urlSuffix);
  };
  render() {
    return (
      <div className={styles.popup}>
        <div className={styles.closeModal} onClick={() => this.handleClose()} />
        <div className={styles.base}>
          <div className={styles.leftDesktopHolder}>
            <div className={styles.header}>Welcome back</div>
            <LoginContainer />
          </div>
          <div className={styles.rightDesktopHolder}>
            <div className={styles.header}>New to CliQ?</div>
            <SignUpContainer />
          </div>
          <div className={styles.socialButtonHolder}>
            <SocialButtonsContainer />
            <div
              className={styles.termsAndConditionText}
              onClick={() => this.redirectToHelp(TERMS_AND_CONDITION_URL)}
            >
              By signing up, you agree to our <span>T&C</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
