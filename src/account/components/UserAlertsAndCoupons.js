import React from "react";
import PropTypes from "prop-types";
import TabHolder from "./TabHolder";
import TabData from "./TabData";
import UserAlerts from "./UserAlerts";
import UserCoupons from "./UserCoupons";
import Loader from "../../general/components/Loader";
import * as Cookie from "../../lib/Cookie";
import {
  MY_ACCOUNT_PAGE,
  MY_ACCOUNT_ALERTS_PAGE,
  MY_ACCOUNT_COUPON_PAGE,
  LOGGED_IN_USER_DETAILS,
  CUSTOMER_ACCESS_TOKEN,
  LOGIN_PATH,
  ALERTS_COUPON,
  HOME_ROUTER
} from "../../lib/constants";
import * as UserAgent from "../../lib/UserAgent.js";
import * as styles from "./UserAlertsAndCoupons.css";
import {
  setDataLayer,
  ADOBE_MY_ACCOUNT_ALERTS,
  ADOBE_MY_ACCOUNT_COUPONS
} from "../../lib/adobeUtils";
import ProfileMenu from "./ProfileMenu";
import UserProfile from "./UserProfile";
import DesktopOnly from "../../general/components/DesktopOnly";
import * as myAccountStyles from "./MyAccountDesktop.css";
const URL_PATH_ALERTS = `${MY_ACCOUNT_PAGE}${MY_ACCOUNT_ALERTS_PAGE}`;
const URL_PATH_COUPONS = `${MY_ACCOUNT_PAGE}${MY_ACCOUNT_COUPON_PAGE}`;
const COUPONS = "coupons";
const ALERTS = "alerts";
export default class UserAlertsAndCoupons extends React.Component {
  componentDidMount() {
    const { pathname } = this.props.history.location;
    if (pathname === URL_PATH_ALERTS) {
      setDataLayer(ADOBE_MY_ACCOUNT_ALERTS);
    } else if (pathname === URL_PATH_COUPONS) {
      setDataLayer(ADOBE_MY_ACCOUNT_COUPONS);
    }
    this.props.setHeaderText(ALERTS_COUPON);
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);

    if (userDetails && customerCookie) {
      this.props.getUserAlerts();
      this.props.getUserCoupons();
    } else {
      if (UserAgent.checkUserAgentIsMobile()) {
        this.props.history.push(LOGIN_PATH);
      } else {
        if (this.props.showAuthPopUp) {
          this.props.history.push(HOME_ROUTER);
          this.props.showAuthPopUp();
          return null;
        }
      }
    }
  }
  componentDidUpdate() {
    this.props.setHeaderText(ALERTS_COUPON);
  }
  renderToAlerts() {
    this.props.history.push(URL_PATH_ALERTS);
  }

  renderToCoupons() {
    this.props.history.push(URL_PATH_COUPONS);
  }
  renderLoader() {
    return <Loader />;
  }
  navigateToLogin() {
    if (UserAgent.checkUserAgentIsMobile()) {
      this.props.history.push(LOGIN_PATH);
      return null;
    } else {
      if (this.props.showAuthPopUp) {
        this.props.history.push(HOME_ROUTER);
        this.props.showAuthPopUp();
        return null;
      }
    }
  }
  render() {
    const userDetailsCookie = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    if (!userDetailsCookie || !customerCookie) {
      return this.navigateToLogin();
    }
    if (this.props.loadingForUserCoupons || this.props.loadingForUserAlerts) {
      return this.renderLoader();
    }
    const { pathname } = this.props.history.location;
    let currentActivePath;
    if (pathname === URL_PATH_ALERTS) {
      currentActivePath = ALERTS;
    } else if (pathname === URL_PATH_COUPONS) {
      currentActivePath = COUPONS;
    }

    const userDetails = JSON.parse(userDetailsCookie);
    return (
      <div className={styles.base}>
        <div className={myAccountStyles.holder}>
          <DesktopOnly>
            <div className={myAccountStyles.profileMenu}>
              <ProfileMenu {...this.props} />
            </div>
          </DesktopOnly>
          <div className={styles.alertAndCouponDetail}>
            <div className={styles.alertAndCouponDetailsWithHolder}>
              <div className={styles.tabHeader}>
                <TabHolder>
                  <TabData
                    width="50%"
                    label="Alerts"
                    selected={currentActivePath === ALERTS}
                    selectItem={() => this.renderToAlerts()}
                  />
                  <TabData
                    width="50%"
                    label="Coupons "
                    selected={currentActivePath === COUPONS}
                    selectItem={() => this.renderToCoupons()}
                  />
                </TabHolder>
              </div>
              <div className={styles.tabBody}>
                {currentActivePath === ALERTS && (
                  <UserAlerts userAlerts={this.props.userAlerts} />
                )}
                {currentActivePath === COUPONS && (
                  <UserCoupons userCoupons={this.props.userCoupons} />
                )}
              </div>
            </div>
          </div>
          <DesktopOnly>
            <div className={myAccountStyles.userProfile}>
              <UserProfile
                image={userDetails.imageUrl}
                userLogin={userDetails.userName}
                loginType={userDetails.loginType}
                onClick={() => this.renderToAccountSetting()}
                firstName={
                  userDetails &&
                  userDetails.firstName &&
                  userDetails.firstName.trim().charAt(0)
                }
                heading={
                  userDetails &&
                  userDetails.firstName &&
                  `${userDetails.firstName} `
                }
                lastName={
                  userDetails &&
                  userDetails.lastName &&
                  `${userDetails.lastName}`
                }
              />
            </div>
          </DesktopOnly>
        </div>
      </div>
    );
  }
}
UserAlertsAndCoupons.propTypes = {
  loadingForUserAlerts: PropTypes.bool,
  loadingForUserCoupons: PropTypes.bool,
  userAlerts: PropTypes.shape({ orderNotifications: PropTypes.array }),
  userCoupons: PropTypes.shape({ unusedCouponsList: PropTypes.array }),
  getUserAlerts: PropTypes.func,
  getUserCoupons: PropTypes.func
};
