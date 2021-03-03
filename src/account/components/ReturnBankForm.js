import React from "react";
import ReturnsFrameV2 from "./ReturnsFrameV2";
import BankDetailsV2 from "./BankDetailsV2";
import ProfileMenu from "../../account/components/ProfileMenu.js";
import UserProfile from "../../account/components/UserProfile.js";
import * as Cookie from "../../lib/Cookie";
import stylesCommon from "./ReturnReasonAndModes.css";
import { LOGGED_IN_USER_DETAILS } from "../../lib/constants";
export default class ReturnBankForm extends React.Component {
  handleCancel() {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  }

  render() {
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const userAccountDetails = JSON.parse(userDetails);

    return (
      <React.Fragment>
        <div className={stylesCommon.base}>
          <div className={stylesCommon.holder}>
            <div className={stylesCommon.profileMenu}>
              <ProfileMenu {...this.props} />
            </div>
            <div className={stylesCommon.returnReasonDetail}>
              <div className={stylesCommon.returnReasonDetailHolder}>
                <ReturnsFrameV2
                  onContinue={this.props.onContinue}
                  isFooterNeeded={true}
                  bankData={this.props.bankDetail ? true : false}
                >
                  <BankDetailsV2
                    onChange={this.props.onChange}
                    clearForm={this.props.clearForm}
                    history={this.props.history}
                    updateStateForBankDetails={
                      this.props.updateStateForBankDetails
                    }
                    bankDetail={this.props.bankDetail}
                  />
                </ReturnsFrameV2>
              </div>
            </div>
            <div className={stylesCommon.userProfile}>
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
      </React.Fragment>
    );
  }
}
