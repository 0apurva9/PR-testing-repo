import * as React from "react";
import { IProps } from "./interface/OrderCancelWrapper";

import ProfileMenu from "../../account/components/ProfileMenu.js";
import UserProfile from "../../account/components/UserProfile.js";
import { default as OrderCancelWrapperForDesktop } from "./OrderCancelWrapperForDesktop.css";
import * as Cookie from "../../lib/Cookie";

import { LOGGED_IN_USER_DETAILS } from "../../lib/constants";

export default class OrderCancelWrapper extends React.Component<IProps, any> {
  componentDidMount() {
    if (!this.props.userDetails) {
      if (this.props.getUserAddress) {
        this.props.getUserAddress();
      }
    }
  }

  public render() {
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const userAccountDetails = JSON.parse(userDetails);

    return (
      <div className={styles.base}>
        <div className={OrderCancelWrapperForDesktop.holder}>
          <div className={OrderCancelWrapperForDesktop.profileMenu}>
            <ProfileMenu {...this.props} />
          </div>
          <div className={styles.returnReasonDetail}>
            <div className={styles.returnReasonDetailHolder}>
              {this.props.children}
            </div>
          </div>

          <div className={OrderCancelWrapperForDesktop.userProfile}>
            <UserProfile
              image={userAccountDetails.imageUrl}
              userLogin={userAccountDetails.userName}
              loginType={userAccountDetails.loginType}
              firstName={
                userAccountDetails &&
                userAccountDetails.firstName &&
                userAccountDetails.firstName.trim().charAt(0)
              }
              heading={
                userAccountDetails &&
                userAccountDetails.firstName &&
                `${userAccountDetails.firstName} `
              }
              lastName={
                userAccountDetails &&
                userAccountDetails.lastName &&
                `${userAccountDetails.lastName}`
              }
              userAddress={this.props.userAddress}
            />
          </div>
        </div>
      </div>
    );
  }
}
