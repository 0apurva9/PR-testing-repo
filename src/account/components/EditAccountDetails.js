import React from "react";
import styles from "./EditAccountDetails.css";
import PropTypes from "prop-types";
import Input2 from "../../general/components/Input2.js";
import SelectBoxMobile2 from "../../general/components/SelectBoxMobile2";
import MobileDatePicker from "../../general/components/MobileDatePicker";
import ShopByBrandLists from "../../blp/components/ShopByBrandLists.js";
import CheckboxAndText from "../../cart/components/CheckboxAndText.js";
import AccountFooter from "./AccountFooter.js";
import format from "date-fns/format";
import Button from "../../general/components/Button";
import { LOG_OUT_USER_SUCCESS } from "../actions/account.actions.js";
import ChangePassword from "./ChangePassword.js";
import * as Cookie from "../../lib/Cookie";
import ProfilePicture from "../../blp/components/ProfilePicture.js";
import {
  EMAIL_REGULAR_EXPRESSION,
  MOBILE_PATTERN
} from "../../auth/components/Login";
import {
  LOGGED_IN_USER_DETAILS,
  CUSTOMER_ACCESS_TOKEN,
  LOGIN_PATH,
  ERROR,
  HOME_ROUTER,
  REQUESTING
} from "../../lib/constants";
import * as UserAgent from "../../lib/UserAgent.js";
import DesktopOnly from "../../general/components/DesktopOnly";
import MobileOnly from "../../general/components/MobileOnly";
import ProfileMenu from "./ProfileMenu";
import * as myAccountStyles from "./MyAccountDesktop.css";
import UserProfile from "./UserProfile";
const ACCOUNT_SETTING_HEADER = "Account Settings";
const MINIMUM_PASSWORD_LENGTH = 8;
const OLD_PASSWORD_TEXT = "Please enter old password";
const NEW_PASSWORD_TEXT = "Please enter new password";
const PASSWORD_LENGTH_TEXT = "Password length should be minimum 8 character";
const CONFIRM_PASSWORD_TEXT = "Please confirm your passowrd";
const PASSWORD_MATCH_TEXT = "Password did not match";
const DATE_FORMAT_TO_UPDATE_PROFILE = "DD/MM/YYYY";
export default class EditAccountDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName:
        this.props.firstName && this.props.firstName !== "undefined"
          ? this.props.firstName
          : "",
      lastName:
        this.props.lastName && this.props.lastName !== "undefined"
          ? this.props.lastName
          : "",
      dateOfBirth: "",
      gender: "",
      mobileNumber: "",
      emailId: "",
      changePassword: false,
      isGenderUpdate: false
    };
  }
  componentDidMount() {
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    if (userDetails && customerCookie) {
      this.props.getUserDetails();
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
    this.props.setHeaderText(ACCOUNT_SETTING_HEADER);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userDetails) {
      let formattedDate = "";

      if (
        nextProps.userDetails.dateOfBirth &&
        nextProps.userDetails.dateOfBirth.indexOf("IST") > -1
      ) {
        let dateOfBirth = new Date(
          nextProps.userDetails.dateOfBirth.split("IST").join()
        );
        formattedDate = format(dateOfBirth, "YYYY-MM-DD");
      } else if (nextProps.userDetails.dateOfBirth) {
        formattedDate = nextProps.userDetails.dateOfBirth
          .split("/")
          .reverse()
          .join("-");
      }
      let email = nextProps.userDetails.emailId
        ? nextProps.userDetails.emailId
        : nextProps.userDetails.emailID;

      this.setState({
        firstName: nextProps.userDetails.firstName,
        lastName: nextProps.userDetails.lastName,
        dateOfBirth: formattedDate,
        gender: nextProps.userDetails.gender,
        mobileNumber: nextProps.userDetails.mobileNumber,
        emailId: email
      });
    }
    if (nextProps.type === LOG_OUT_USER_SUCCESS) {
      if (this.props.clearAccountUpdateType) {
        this.props.clearAccountUpdateType();
      }
      this.props.history.push(LOGIN_PATH);
    }
    if (
      nextProps.changePasswordStatus === REQUESTING ||
      nextProps.changePasswordStatus === ERROR
    ) {
      this.setState({ changePassword: true });
    } else {
      this.setState({ changePassword: false });
    }
  }
  onChangeGender(val) {
    this.setState({ gender: val.value, isGenderUpdate: true });
  }
  onChange(val) {
    this.setState(val);
  }
  onChangeDateOfBirth = val => {
    this.setState({ dateOfBirth: val });
  };
  onChangeMobileNumber(val) {
    if (val.length <= 10) {
      this.setState({ mobileNumber: val });
    }
  }
  updateProfile = () => {
    if (
      this.state.emailId &&
      !EMAIL_REGULAR_EXPRESSION.test(this.state.emailId)
    ) {
      this.props.displayToast("Please fill valid emailId");
      return false;
    }
    if (
      this.state.mobileNumber &&
      !MOBILE_PATTERN.test(this.state.mobileNumber)
    ) {
      this.props.displayToast("Please fill valid mobile number");
      return false;
    } else {
      if (this.props.updateProfile) {
        this.props.updateProfile(this.state);
      }
    }
  };

  cancel = () => {
    this.props.history.goBack();
  };
  changePassword(passwordDetails) {
    const oldPassword = passwordDetails.oldPassword;
    const newPassword = passwordDetails.newPassword;
    const confirmedPassword = passwordDetails.confirmPassword;
    if (!oldPassword) {
      this.props.displayToast(OLD_PASSWORD_TEXT);
      return false;
    }
    if (!newPassword) {
      this.props.displayToast(NEW_PASSWORD_TEXT);
      return false;
    }
    if (newPassword.length < MINIMUM_PASSWORD_LENGTH) {
      this.props.displayToast(PASSWORD_LENGTH_TEXT);
      return false;
    }
    if (!confirmedPassword) {
      this.props.displayToast(CONFIRM_PASSWORD_TEXT);
      return false;
    }
    if (newPassword !== confirmedPassword) {
      this.props.displayToast(PASSWORD_MATCH_TEXT);
    } else {
      this.props.changePassword(passwordDetails);
    }
  }
  renderChangePassword = () => {
    if (UserAgent.checkUserAgentIsMobile()) {
      this.setState({ changePassword: true });
    } else {
      if (this.props.showChangePasswordModal) {
        this.props.showChangePasswordModal();
      }
    }
  };
  navigateToLogin() {
    this.props.history.push(LOGIN_PATH);
    return null;
  }
  render() {
    const userProfileDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    if (!userProfileDetails || !customerCookie) {
      return this.navigateToLogin();
    }
    const userData = JSON.parse(userProfileDetails);
    let userDetails = this.props.userDetails;
    if (userDetails && !this.state.changePassword) {
      return (
        <div className={styles.base}>
          <div className={myAccountStyles.holder}>
            <DesktopOnly>
              <div className={myAccountStyles.profileMenu}>
                <ProfileMenu {...this.props} />
              </div>
            </DesktopOnly>
            <div className={styles.editAccountDetail}>
              <div className={styles.editAccountDetailWithHolder}>
                <DesktopOnly>
                  <div className={styles.infoHeader}>General Information</div>
                </DesktopOnly>
                <MobileOnly>
                  <div className={styles.profileImage}>
                    <ProfilePicture
                      firstName={
                        this.state.firstName !== "undefined"
                          ? this.state.firstName
                          : ""
                      }
                      lastName={
                        this.state.lastName !== "undefined"
                          ? this.state.lastName
                          : ""
                      }
                    />
                  </div>
                </MobileOnly>
                <div className={styles.userDataHolder}>
                  <div className={styles.holder}>
                    <div className={styles.container}>
                      <DesktopOnly>
                        <div className={styles.textHolder}>First Name</div>
                      </DesktopOnly>
                      <div className={styles.inputHolder}>
                        <Input2
                          placeholder="First Name"
                          value={
                            this.state.firstName !== "undefined"
                              ? this.state.firstName
                              : ""
                          }
                          boxy={true}
                          textStyle={{ fontSize: 14 }}
                          height={33}
                          onChange={firstName => this.onChange({ firstName })}
                          onlyAlphabet={true}
                        />
                      </div>
                    </div>
                    <div className={styles.container}>
                      <DesktopOnly>
                        <div className={styles.textHolder}>Last Name</div>
                      </DesktopOnly>
                      <div className={styles.inputHolder}>
                        <Input2
                          placeholder="Last Name"
                          value={
                            this.state.lastName !== "undefined"
                              ? this.state.lastName
                              : ""
                          }
                          boxy={true}
                          textStyle={{ fontSize: 14 }}
                          height={33}
                          onChange={lastName => this.onChange({ lastName })}
                          onlyAlphabet={true}
                        />
                      </div>
                    </div>
                    <div className={styles.container}>
                      <DesktopOnly>
                        <div className={styles.textHolder}>Email</div>
                      </DesktopOnly>
                      <div className={styles.inputHolder}>
                        <Input2
                          placeholder="Email"
                          value={this.state.emailId}
                          boxy={true}
                          textStyle={{ fontSize: 14 }}
                          height={33}
                          onChange={emailId => this.onChange({ emailId })}
                        />
                      </div>
                    </div>
                    <div className={styles.container}>
                      <DesktopOnly>
                        <div className={styles.textHolder}>Phone</div>
                      </DesktopOnly>
                      <div className={styles.inputHolder}>
                        <Input2
                          placeholder="Mobile Number"
                          value={this.state.mobileNumber}
                          boxy={true}
                          textStyle={{ fontSize: 14 }}
                          height={33}
                          onChange={mobileNumber =>
                            this.onChangeMobileNumber(mobileNumber)
                          }
                          disabled={false}
                          onlyNumber={true}
                        />
                      </div>
                    </div>
                    <div className={styles.container}>
                      <DesktopOnly>
                        <div className={styles.textHolder}>Gender</div>
                      </DesktopOnly>
                      <div className={styles.inputHolder}>
                        <SelectBoxMobile2
                          placeholder={"Gender"}
                          label={this.state.gender}
                          value={this.state.gender}
                          options={[
                            { label: "Female", value: "FEMALE" },
                            { label: "Male", value: "MALE" }
                          ]}
                          arrowColour="grey"
                          height={33}
                          onChange={gender => this.onChangeGender(gender)}
                        />
                      </div>
                    </div>
                    <div className={styles.container}>
                      <DesktopOnly>
                        <div className={styles.textHolder}>Date of Birth</div>
                      </DesktopOnly>
                      <div className={styles.inputHolder}>
                        <MobileDatePicker
                          value={this.state.dateOfBirth}
                          onChange={dateOfBirth =>
                            this.onChangeDateOfBirth(dateOfBirth)
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className={styles.changePassword}>
                    <ShopByBrandLists
                      brandList={"Change Password"}
                      onClick={() => this.renderChangePassword()}
                    />
                  </div>
                  <DesktopOnly>
                    <div className={styles.updateButtonHolder}>
                      <div className={styles.updateButton}>
                        <Button
                          type="hollow"
                          color="#000"
                          label={"Update"}
                          width={150}
                          onClick={() => this.updateProfile()}
                        />
                      </div>
                    </div>
                  </DesktopOnly>
                  <MobileOnly>
                    <AccountFooter
                      cancel={() => this.cancel()}
                      update={() => this.updateProfile()}
                    />
                  </MobileOnly>
                </div>
              </div>
            </div>
            <DesktopOnly>
              <div className={myAccountStyles.userProfile}>
                <UserProfile
                  image={userData.imageUrl}
                  userLogin={userData.userName}
                  loginType={userData.loginType}
                  onClick={() => this.renderToAccountSetting()}
                  firstName={
                    userData &&
                    userData.firstName &&
                    userData.firstName.trim().charAt(0)
                  }
                  heading={
                    userData && userData.firstName && `${userData.firstName} `
                  }
                  lastName={
                    userData && userData.lastName && `${userData.lastName}`
                  }
                  userAddress={this.props.userAddress}
                />
              </div>
            </DesktopOnly>
          </div>
        </div>
      );
    } else if (this.state.changePassword) {
      return (
        <MobileOnly>
          <div className={styles.changePasswordPageHolder}>
            <ChangePassword
              updatePassword={passwordDetails =>
                this.changePassword(passwordDetails)
              }
              clearChangePasswordDetails={() =>
                this.props.clearChangePasswordDetails()
              }
            />
          </div>
        </MobileOnly>
      );
    } else {
      return null;
    }
  }
}
EditAccountDetails.propTypes = {
  emailId: PropTypes.string,
  mobileNumber: PropTypes.string,
  firstName: PropTypes.string,
  gender: PropTypes.string,
  onChange: PropTypes.func
};
