import React from "react";
import styles from "./DesktopAuthStyles.css";
import LoginContainer from "../containers/LoginContainer";
import SignUpContainer from "../containers/SignUpContainer";
import SocialButtonsContainer from "../containers/SocialButtonsContainer";
export default class DesktopAuth extends React.Component {
  handleClose() {
    if (this.props.closeModal) {
      this.props.closeModal();
    }
  }
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
          </div>
        </div>
      </div>
    );
  }
}
