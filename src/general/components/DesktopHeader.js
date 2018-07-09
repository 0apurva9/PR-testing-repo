import React from "react";
import styles from "./DesktopHeader.css";
export default class DesktopHeader extends React.Component {
  redirectToHome() {
    if (this.props.redirectToHome) {
      this.props.redirectToHome();
    }
  }
  openSignUpPopUp() {
    if (this.props.openSignUp) {
      this.props.openSignUp();
    }
  }
  render() {
    return (
      <div className={styles.base}>
        <div className={styles.dummyColorHeader} />
        <div className={styles.headerHolder}>
          <div
            className={styles.logoHolder}
            onClick={() => this.redirectToHome()}
          />
          <div className={styles.upperHeader}>
            <div className={styles.luxeryTab}>Visit Luxury Store</div>
            <div className={styles.loginAndTrackTab}>
              <div
                className={styles.loginTab}
                onClick={() => this.openSignUpPopUp()}
              >
                Sign in / Sign Up
              </div>
              <div className={styles.loginTab}>Track Orders</div>
            </div>
          </div>
          <div className={styles.lowerHeader}>
            <div className={styles.cataGoryAndBrand}>Categories</div>
            <div className={styles.cataGoryAndBrand}>Brands</div>
            <div className={styles.myBagShow}>(0)</div>
            <div className={styles.mywishList} />
            <div className={styles.searchHolder}>
              <input
                type="text"
                className={styles.inputText}
                placeholder="Search"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
