import React from "react";
import styles from "./DesktopHeader.css";
import PropTypes from "prop-types";
import { LOGGED_IN_USER_DETAILS } from "../../../src/lib/constants";
import * as Cookie from "../../lib/Cookie";

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
  goToWishList() {
    if (this.props.goToWishList) {
      this.props.goToWishList();
    }
  }
  render() {
    const userProfileDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const userData = JSON.parse(userProfileDetails);
    return (
      <div
        className={this.props.isSearch ? styles.base : styles.CheckoutHeader}
      >
        {this.props.isSearch && <div className={styles.dummyColorHeader} />}
        <div className={styles.headerHolder}>
          <div
            className={styles.logoHolder}
            onClick={() => this.redirectToHome()}
          />
          {this.props.profileDetails && (
            <div className={styles.profileWonerHolder}>
              <div className={styles.nameAndContact}>
                <div className={styles.iconPersonHolder} />
                <span className={styles.nameSpan}>
                  <span>
                    {userData && userData.firstName && `${userData.firstName} `}
                  </span>{" "}
                  <span>
                    {userData && userData.lastName && `${userData.lastName}`}
                  </span>
                </span>
                <span>{userData.userName}</span>
              </div>
            </div>
          )}

          {this.props.isSearch && (
            <div className={styles.headerFunctionality}>
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
                  <div
                    className={styles.mywishList}
                    onClick={() => this.goToWishList()}
                  />
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
          )}
        </div>
      </div>
    );
  }
}
DesktopHeader.propTypes = {
  openSignUp: PropTypes.func,
  onSelect: PropTypes.func,
  goToTrackOrders: PropTypes.func,
  bagCount: PropTypes.number,
  isSearch: PropTypes.bool,
  goToWishList: PropTypes.func
};
