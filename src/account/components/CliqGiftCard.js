import React, { Component } from "react";
import styles from "./CliqCashDesktop.css";
import { default as MyAccountStyles } from "./MyAccountDesktop.css";
import ProfileMenu from "./ProfileMenu";
import * as Cookie from "../../lib/Cookie";
import FaqAndTcBase from "./FaqAndTcBase";
import UserProfile from "./UserProfile";
import {
  LOGGED_IN_USER_DETAILS,
  LOGIN_PATH,
  GIFT_CARD
} from "../../lib/constants";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import headerBg from "./img/headerBg.png";
import { getCustomerAccessToken } from "../../common/services/common.services";

export default class CliqGiftCard extends Component {
  componentDidMount() {
    this.props.setHeaderText(GIFT_CARD);
    if (this.props.getGiftCardDetails) {
      this.props.getGiftCardDetails();
    }
  }
  navigateToLogin() {
    const url = this.props.location.pathname;
    this.props.setUrlToRedirectToAfterAuth(url);
    return <Redirect to={LOGIN_PATH} />;
  }
  render() {
    let userData;
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerAccessToken = getCustomerAccessToken();

    if (userDetails) {
      userData = JSON.parse(userDetails);
    }

    if (!userDetails || !customerAccessToken) {
      return this.navigateToLogin();
    }

    return (
      <div className={styles.base}>
        <div className={MyAccountStyles.holder}>
          <div className={MyAccountStyles.profileMenu}>
            <ProfileMenu {...this.props} />
          </div>
          <div className={styles.cliqCashDetail}>
            <div>
              <div className={styles.cliqGiftCardWithHolderCheckBal}>
                <div className={styles.heading}>
                  <div className={styles.cliqGiftCardHeaderText}>
                    CLiQ Gift Card
                  </div>
                  <div className={styles.cliqGiftCardSubHeader}>
                    Experience the joy of <b>gifting</b>, delivered straight to
                    the <b>inbox</b>
                  </div>
                </div>
                <div className={styles.cardImage}>
                  <img src={headerBg} alt="" className={styles.cardImageImg} />
                </div>
              </div>
            </div>

            <div className={styles.faqAndTcHolder}>
              <FaqAndTcBase history={this.props.history} />
            </div>
          </div>
          <div className={MyAccountStyles.userProfile}>
            <UserProfile
              image={userData && userData.imageUrl}
              userLogin={userData && userData.userName}
              loginType={userData && userData.loginType}
              firstName={
                userData &&
                userData.firstName &&
                userData.firstName.trim().charAt(0)
              }
              heading={
                userData && userData.firstName && `${userData.firstName} `
              }
              lastName={userData && userData.lastName && `${userData.lastName}`}
              userAddress={this.props.userAddress}
            />
          </div>
        </div>
      </div>
    );
  }
}
CliqGiftCard.defaultProps = {
  isModal: true
};
CliqGiftCard.propTypes = {
  userAddress: PropTypes.object,
  history: PropTypes.object,
  setUrlToRedirectToAfterAuth: PropTypes.func.isRequired,
  location: PropTypes.object,
  setHeaderText: PropTypes.func.isRequired,
  getGiftCardDetails: PropTypes.func.isRequired
};
