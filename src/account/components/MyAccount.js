import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import InformationHeader from "../../general/components/InformationHeader.js";
import AllOrderContainer from "../containers/AllOrderContainer";
import UserCoupons from "./UserCoupons";
import UserAlerts from "./UserAlerts";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";
import ProfileMenuGrid from "../../blp/components/ProfileMenuGrid.js";
import AccountSetting from "./AccountSetting.js";
import AccountUsefulLink from "./AccountUsefulLink.js";
import TabHolder from "./TabHolder";
import TabData from "./TabData";
import styles from "./MyAccount.css";
import LogoutButtonContainer from "../containers/LogoutButtonContainer";
import {
  LOGGED_IN_USER_DETAILS,
  CUSTOMER_ACCESS_TOKEN,
  LOGIN_PATH,
  MY_CLIQ,
  MY_ACCOUNT_PAGE,
  MY_ACCOUNT_UPDATE_PROFILE_PAGE,
  QUE_MAGAZINE,
  TERMS_AND_CONDITION_URL,
  ABOUT_US_URL,
  PRIVACY_POLICY_URL,
  CANCEL_URL,
  RETURN_URL,
  FAQ_URL
} from "../../lib/constants";

import * as Cookie from "../../lib/Cookie";
import {
  setDataLayer,
  ADOBE_MY_ACCOUNT_LANDING_PAGE
} from "../../lib/adobeUtils";
export default class MyAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: 0
    };
  }
  tabSelect(val) {
    this.setState({ isSelected: val });
  }

  renderToAccountSetting() {
    this.props.history.push(
      `${MY_ACCOUNT_PAGE}${MY_ACCOUNT_UPDATE_PROFILE_PAGE}`
    );
  }
  redirectPage = url => {
    const urlSuffix = url.replace(TATA_CLIQ_ROOT, "$1");
    this.props.history.push(urlSuffix);
  };

  componentDidUpdate() {
    this.props.setHeaderText(MY_CLIQ);
  }

  componentDidMount() {
    this.props.setHeaderText(MY_CLIQ);
    setDataLayer(ADOBE_MY_ACCOUNT_LANDING_PAGE);
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    if (userDetails && customerCookie) {
      this.props.getUserCoupons();
      this.props.getUserAlerts();
    }
  }

  navigateToLogin() {
    const url = this.props.location.pathname;
    this.props.setUrlToRedirectToAfterAuth(url);
    return <Redirect to={LOGIN_PATH} />;
  }
  render() {
    const userDetailsCookie = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    if (!userDetailsCookie || !customerCookie) {
      return this.navigateToLogin();
    }
    const userDetails = JSON.parse(userDetailsCookie);
    return (
      <div className={styles.base}>
        <ProfileMenuGrid {...this.props} />
        <div className={styles.accountHolder}>
          <AccountSetting
            image={userDetails.imageUrl}
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
              userDetails && userDetails.lastName && `${userDetails.lastName}`
            }
          />
          <div className={styles.logoutButton}>
            <LogoutButtonContainer />
          </div>
        </div>
        <div className={styles.tabHolder}>
          <TabHolder>
            <TabData
              width="40%"
              label="Recent Orders "
              selected={this.state.isSelected === 0}
              selectItem={() => this.tabSelect(0)}
            />
            <TabData
              width="40%"
              label="Useful Links "
              selected={this.state.isSelected === 3}
              selectItem={() => this.tabSelect(3)}
            />
            <TabData
              width="40%"
              label="Alerts "
              selected={this.state.isSelected === 1}
              selectItem={() => this.tabSelect(1)}
            />
            <TabData
              width="40%"
              label="Coupons "
              selected={this.state.isSelected === 2}
              selectItem={() => this.tabSelect(2)}
            />
          </TabHolder>
        </div>
        <div className={styles.dataHolder}>
          {this.state.isSelected === 0 && (
            <div className={styles.ordersHolder}>
              <div className={styles.recentOrderHolder}>
                <AllOrderContainer
                  shouldCallHeaderContainer={false}
                  shouldCallSetDataLayer={false}
                />
              </div>
            </div>
          )}
          {this.state.isSelected === 3 && (
            <div className={styles.useFulLinkHolder}>
              <div className={styles.linkTabHolder}>
                <a target="_blank" href="https://www.tatacliq.com/que">
                  <AccountUsefulLink>
                    <div className={styles.usefulLinkText}>Que Magazine</div>
                  </AccountUsefulLink>
                </a>
                {/* <AccountUsefulLink>
                  <div className={styles.usefulLinkText}>Our Stores</div>
                </AccountUsefulLink> */}
              </div>
              <div className={styles.linkTabHolder}>
                {/* <AccountUsefulLink>
                  <div className={styles.usefulLinkText}>Help & Services</div>
                </AccountUsefulLink> */}
                <AccountUsefulLink
                  onClick={() => this.redirectPage(PRIVACY_POLICY_URL)}
                >
                  <div className={styles.usefulLinkText}>Privacy policy</div>
                </AccountUsefulLink>
                <AccountUsefulLink>
                  <div className={styles.usefulLinkText}>
                    <a href="tel:5551234567">Call Tata CLIQ Care</a>
                  </div>
                </AccountUsefulLink>
                <AccountUsefulLink
                  onClick={() => this.redirectPage(TERMS_AND_CONDITION_URL)}
                >
                  <div className={styles.usefulLinkText}>
                    Terms & Conditions
                  </div>
                </AccountUsefulLink>
                <AccountUsefulLink
                  onClick={() => this.redirectPage(ABOUT_US_URL)}
                >
                  <div className={styles.usefulLinkText}>About us</div>
                </AccountUsefulLink>
              </div>
            </div>
          )}
          {this.state.isSelected === 1 && (
            <div className={styles.alertsHolder}>
              <UserAlerts userAlerts={this.props.userAlerts} />
            </div>
          )}
          {this.state.isSelected === 2 && (
            <div className={styles.couponHolder}>
              <UserCoupons
                userCoupons={this.props.userCoupons}
                displayToast={message => this.props.displayToast(message)}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}
