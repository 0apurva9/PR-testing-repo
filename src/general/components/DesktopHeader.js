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
  handleSelect() {
    if (this.props.onSelect) {
      this.props.onSelect();
    }
  }
  goToTrackOrders() {
    if (this.props.goToTrackOrders) {
      this.props.goToTrackOrders();
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
              <div
                className={styles.loginTab}
                onClick={() => this.goToTrackOrders()}
              >
                Track Orders
              </div>
            </div>
          </div>
          <div className={styles.lowerHeader}>
            <div className={styles.leftTabHolder}>
              <div className={styles.CateGoryAndBrand}>Categories</div>
              <div className={styles.CateGoryAndBrand}>Brands</div>
            </div>
            <div className={styles.rightTabHolder}>
              <div
                className={styles.myBagShow}
                onClick={() => this.handleSelect()}
              >
                {`(${this.props.bagCount})`}
              </div>
              <div className={styles.mywishList} />
            </div>
            {this.props.searchHolder && (
              <div className={styles.searchHolder}>
                <div className={styles.searchWrapper}>
                  {this.props.searchHolder}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
