import React from "react";
import { Redirect } from "react-router-dom";
import AllOrderContainer from "../containers/AllOrderContainer";
import UserCouponsContainer from "../containers/UserCouponsContainer";
import UserAlertsContainer from "../containers/UserAlertsContainer";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";
import ProfileMenuGrid from "../../blp/components/ProfileMenuGrid.js";
import AccountSetting from "./AccountSetting.js";
import AccountUsefulLink from "./AccountUsefulLink.js";
import TabHolder from "./TabHolder";
import TabData from "./TabData";
import styles from "./MyAccount.css";
import LogoutButtonContainer from "../containers/LogoutButtonContainer";
import { default as MyAccountStyles } from "./MyAccountDesktop.css";
import UserReviewContainer from "../containers/UserReviewContainer";
import {
  LOGGED_IN_USER_DETAILS,
  LOGIN_PATH,
  MY_CLIQ,
  MY_ACCOUNT_PAGE,
  MY_ACCOUNT_UPDATE_PROFILE_PAGE,
  TERMS_AND_CONDITION_URL,
  ABOUT_US_URL,
  PRIVACY_POLICY_URL,
  FAQ_URL,
  HELP_URL,
  BUYER_POLICY_URL
} from "../../lib/constants";
import MobileOnly from "../../general/components/MobileOnly";
import * as Cookie from "../../lib/Cookie";
import {
  setDataLayer,
  ADOBE_MY_ACCOUNT_LANDING_PAGE,
  setDataLayerForFaqAndTc,
  SET_DATA_LAYER_FAQ,
  SET_DATA_LAYER_TC,
  FAQ,
  TC
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
  redirectPage = (url, type) => {
    if (type === FAQ) {
      setDataLayerForFaqAndTc(SET_DATA_LAYER_FAQ);
    } else if (type === TC) {
      setDataLayerForFaqAndTc(SET_DATA_LAYER_TC);
    }
    const urlSuffix = url.replace(TATA_CLIQ_ROOT, "$1");
    this.props.history.push(urlSuffix);
  };
  redirectToHelp = url => {
    const urlSuffix = url.replace(TATA_CLIQ_ROOT, "$1");
    this.props.history.push(urlSuffix);
  };
  componentDidUpdate() {
    this.props.setHeaderText(MY_CLIQ);
  }

  componentDidMount() {
    document.title = "My Account";
    this.props.setHeaderText(MY_CLIQ);
    setDataLayer(ADOBE_MY_ACCOUNT_LANDING_PAGE);
    if (window.od && window.od.messenger && window.od.messenger("show")) {
      window.od.messenger("show");
    }
  }

  navigateToLogin() {
    const url = this.props.location.pathname;
    this.props.setUrlToRedirectToAfterAuth(url);
    return <Redirect to={LOGIN_PATH} />;
  }
  render() {
    let userDetails;
    const userDetailsCookie = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    if (userDetailsCookie) {
      userDetails = JSON.parse(userDetailsCookie);
    }

    return (
      <div className={styles.base}>
        <div className={MyAccountStyles.holder}>
          <MobileOnly>
            <ProfileMenuGrid {...this.props} />
            <div className={styles.accountHolder}>
              <AccountSetting
                image={userDetails && userDetails.imageUrl}
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
                  label="My reviews "
                  selected={this.state.isSelected === 4}
                  selectItem={() => this.tabSelect(4)}
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
          </MobileOnly>
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
          </div>
          {this.state.isSelected === 1 && (
            <div className={styles.alertsHolder}>
              <UserAlertsContainer />
            </div>
          )}
          {this.state.isSelected === 2 && (
            <div className={styles.couponHolder}>
              <UserCouponsContainer
                displayToast={message => this.props.displayToast(message)}
              />
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
              </div>
              <div className={styles.linkTabHolder}>
                <AccountUsefulLink
                  onClick={() => this.redirectToHelp(HELP_URL)}
                >
                  <div className={styles.usefulLinkText}>Help & Services</div>
                </AccountUsefulLink>
                <AccountUsefulLink
                  onClick={() => this.redirectPage(PRIVACY_POLICY_URL)}
                >
                  <div className={styles.usefulLinkText}>Privacy policy</div>
                </AccountUsefulLink>
                <AccountUsefulLink
                  onClick={() => this.redirectPage(BUYER_POLICY_URL)}
                >
                  <div className={styles.usefulLinkText}>Buyer Policies</div>
                </AccountUsefulLink>
                <AccountUsefulLink
                  onClick={() => this.redirectPage(TERMS_AND_CONDITION_URL, TC)}
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
                <AccountUsefulLink
                  onClick={() => this.redirectPage(FAQ_URL, FAQ)}
                >
                  <div className={styles.usefulLinkText}>FAQ</div>
                </AccountUsefulLink>
              </div>
            </div>
          )}
          {this.state.isSelected === 4 && (
            <div className={styles.reviewHolder}>
              <UserReviewContainer />
            </div>
          )}
        </div>
      </div>
    );
  }
}
