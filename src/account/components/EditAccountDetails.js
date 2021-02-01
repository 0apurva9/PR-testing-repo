import React from "react";
import { RouterPropTypes } from "../../general/router-prop-types";
import styles from "./EditAccountDetails.css";
import PropTypes from "prop-types";
import ControlInput from "../../general/components/ControlInput";
import SelectBoxMobile2 from "../../general/components/SelectBoxMobile2";
import MobileDatePicker from "../../general/components/MobileDatePicker";
import ShopByBrandLists from "../../blp/components/ShopByBrandLists.js";
import AccountFooter from "./AccountFooter.js";
import format from "date-fns/format";
import Button from "../../general/components/Button";
import { LOG_OUT_USER_SUCCESS } from "../actions/account.actions.js";
import ChangePassword from "./ChangePassword.js";
import * as Cookie from "../../lib/Cookie";
import ProfilePicture from "../../blp/components/ProfilePicture.js";
import { EMAIL_REGULAR_EXPRESSION, MOBILE_PATTERN } from "../../auth/components/Login";
import {
    LOGGED_IN_USER_DETAILS,
    CUSTOMER_ACCESS_TOKEN,
    LOGIN_PATH,
    ERROR,
    HOME_ROUTER,
    REQUESTING,
    NAME_TEXT,
    NAME_VALID_TEXT,
    LAST_NAME_TEXT,
    LAST_VALID_TEXT,
    PREVENT_NUMBERS_VALIDATION,
    NAME_VALIDATION,
} from "../../lib/constants";
import * as UserAgent from "../../lib/UserAgent.js";
import MobileOnly from "../../general/components/MobileOnly";
import ProfileMenu from "./ProfileMenu";
import myAccountStyles from "./MyAccountDesktop.css";
import UserProfile from "./UserProfile";
const ACCOUNT_SETTING_HEADER = "Account Settings";
const MINIMUM_PASSWORD_LENGTH = 8;
const OLD_PASSWORD_TEXT = "Please enter old password";
const NEW_PASSWORD_TEXT = "Please enter new password";
const PASSWORD_LENGTH_TEXT = "Password length should be minimum 8 character";
const CONFIRM_PASSWORD_TEXT = "Please confirm your passowrd";
const PASSWORD_MATCH_TEXT = "Password did not match";
const OLD_NEW_PASSWORD_MATCH_TEXT = "Current and New password cannot be same";
export default class EditAccountDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: this.props.firstName && this.props.firstName !== "undefined" ? this.props.firstName : "",
            lastName: this.props.lastName && this.props.lastName !== "undefined" ? this.props.lastName : "",
            dateOfBirth: "",
            gender: "",
            mobileNumber: "",
            emailId: "",
            changePassword: false,
            isGenderUpdate: false,
        };
    }

    componentDidMount() {
        document.title = "My Profile Details";
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

            if (nextProps.userDetails.dateOfBirth && nextProps.userDetails.dateOfBirth.indexOf("IST") > -1) {
                let dateOfBirth = new Date(nextProps.userDetails.dateOfBirth.split("IST").join());
                formattedDate = format(dateOfBirth, "YYYY-MM-DD");
            } else if (nextProps.userDetails.dateOfBirth) {
                formattedDate = nextProps.userDetails.dateOfBirth
                    .split("/")
                    .reverse()
                    .join("-");
            }
            let email = nextProps.userDetails.emailId ? nextProps.userDetails.emailId : nextProps.userDetails.emailID;

            this.setState({
                firstName: nextProps.userDetails.firstName,
                lastName: nextProps.userDetails.lastName,
                dateOfBirth: formattedDate,
                gender: nextProps.userDetails.gender,
                mobileNumber: nextProps.userDetails.mobileNumber,
                emailId: email,
            });
        }
        if (nextProps.type === LOG_OUT_USER_SUCCESS) {
            if (this.props.clearAccountUpdateType) {
                this.props.clearAccountUpdateType();
            }
            this.props.history.push(LOGIN_PATH);
        }
        if (nextProps.changePasswordStatus === REQUESTING || nextProps.changePasswordStatus === ERROR) {
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
        if (val === "" || /^[0-9]+$/.test(val))
            if (val.length <= 10) {
                this.setState({ mobileNumber: val });
            }
    }

    updateProfile = () => {
        if (this.state.firstName && !PREVENT_NUMBERS_VALIDATION.test(this.state.firstName.trim())) {
            this.props.displayToast(NAME_VALID_TEXT);
            return false;
        }
        if (this.state.lastName && !PREVENT_NUMBERS_VALIDATION.test(this.state.lastName.trim())) {
            this.props.displayToast(LAST_VALID_TEXT);
            return false;
        }
        if (!this.state.firstName.trim() || !NAME_VALIDATION.test(this.state.firstName.trim())) {
            this.props.displayToast(NAME_TEXT);
            return false;
        }
        if (!this.state.lastName.trim() || !NAME_VALIDATION.test(this.state.lastName.trim())) {
            this.props.displayToast(LAST_NAME_TEXT);
            return false;
        }
        if (this.state.emailId && !EMAIL_REGULAR_EXPRESSION.test(this.state.emailId)) {
            this.props.displayToast("Please fill valid emailId");
            return false;
        }
        if (this.state.mobileNumber && !MOBILE_PATTERN.test(this.state.mobileNumber)) {
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
        if (oldPassword === newPassword) {
            this.props.displayToast(OLD_NEW_PASSWORD_MATCH_TEXT);
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

    render() {
        let userData;
        const userProfileDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
        if (userProfileDetails) {
            userData = JSON.parse(userProfileDetails);
        }

        let userDetails = this.props.userDetails;
        if (userDetails && !this.state.changePassword && UserAgent.checkUserAgentIsMobile()) {
            return (
                <div className={styles.base}>
                    <div className={myAccountStyles.holder}>
                        <div className={styles.editAccountDetail}>
                            <div className={styles.editAccountDetailWithHolder}>
                                <div className={styles.profileImage}>
                                    <ProfilePicture
                                        firstName={this.state.firstName !== "undefined" ? this.state.firstName : ""}
                                        lastName={this.state.lastName !== "undefined" ? this.state.lastName : ""}
                                    />
                                </div>
                                <div className={styles.userDataHolder}>
                                    <div className={styles.holder}>
                                        <div className={styles.container}>
                                            <div className={styles.inputHolder}>
                                                <ControlInput
                                                    placeholder="First Name"
                                                    value={
                                                        this.state.firstName !== "undefined" ? this.state.firstName : ""
                                                    }
                                                    boxy={true}
                                                    textStyle={{ fontSize: 14 }}
                                                    height={33}
                                                    onChange={firstName => this.onChange({ firstName })}
                                                />
                                            </div>
                                        </div>
                                        <div className={styles.container}>
                                            <div className={styles.inputHolder}>
                                                <ControlInput
                                                    placeholder="Last Name"
                                                    value={
                                                        this.state.lastName !== "undefined" ? this.state.lastName : ""
                                                    }
                                                    boxy={true}
                                                    textStyle={{ fontSize: 14 }}
                                                    height={33}
                                                    onChange={lastName => this.onChange({ lastName })}
                                                />
                                            </div>
                                        </div>
                                        <div className={styles.container}>
                                            <div className={styles.inputHolder}>
                                                <ControlInput
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
                                            <div className={styles.inputHolder}>
                                                <ControlInput
                                                    placeholder="Mobile Number"
                                                    value={this.state.mobileNumber}
                                                    boxy={true}
                                                    textStyle={{ fontSize: 14 }}
                                                    height={33}
                                                    onChange={mobileNumber => this.onChangeMobileNumber(mobileNumber)}
                                                    disabled={false}
                                                />
                                            </div>
                                        </div>
                                        <div className={styles.container}>
                                            <div className={styles.inputHolder}>
                                                <SelectBoxMobile2
                                                    placeholder={"Gender"}
                                                    label={this.state.gender}
                                                    value={this.state.gender}
                                                    options={[
                                                        { label: "Female", value: "FEMALE" },
                                                        { label: "Male", value: "MALE" },
                                                    ]}
                                                    arrowColour="grey"
                                                    height={33}
                                                    onChange={gender => this.onChangeGender(gender)}
                                                />
                                            </div>
                                        </div>
                                        <div className={styles.container}>
                                            <div className={styles.inputHolder}>
                                                <MobileDatePicker
                                                    value={this.state.dateOfBirth}
                                                    onChange={dateOfBirth => this.onChangeDateOfBirth(dateOfBirth)}
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

                                    <AccountFooter cancel={() => this.cancel()} update={() => this.updateProfile()} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else if (!UserAgent.checkUserAgentIsMobile()) {
            return (
                <div className={styles.base}>
                    <div className={myAccountStyles.holder}>
                        <div className={myAccountStyles.profileMenu}>
                            <ProfileMenu {...this.props} />
                        </div>
                        <div className={styles.editAccountDetail}>
                            <div className={styles.editAccountDetailWithHolder}>
                                <div className={styles.infoHeader}>General Information</div>

                                <div className={styles.userDataHolder}>
                                    <div className={styles.holder}>
                                        <div className={styles.container}>
                                            <div className={styles.textHolder}>First Name</div>

                                            <div className={styles.inputHolder}>
                                                <ControlInput
                                                    placeholder="First Name"
                                                    value={
                                                        this.state.firstName !== "undefined" ? this.state.firstName : ""
                                                    }
                                                    boxy={true}
                                                    textStyle={{ fontSize: 14 }}
                                                    height={33}
                                                    onChange={firstName => this.onChange({ firstName })}
                                                    maxLength={20}
                                                />
                                            </div>
                                        </div>
                                        <div className={styles.container}>
                                            <div className={styles.textHolder}>Last Name</div>

                                            <div className={styles.inputHolder}>
                                                <ControlInput
                                                    placeholder="Last Name"
                                                    value={
                                                        this.state.lastName !== "undefined" ? this.state.lastName : ""
                                                    }
                                                    boxy={true}
                                                    textStyle={{ fontSize: 14 }}
                                                    height={33}
                                                    onChange={lastName => this.onChange({ lastName })}
                                                    maxLength={20}
                                                />
                                            </div>
                                        </div>
                                        <div className={styles.container}>
                                            <div className={styles.textHolder}>Email</div>

                                            <div className={styles.inputHolder}>
                                                <ControlInput
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
                                            <div className={styles.textHolder}>Phone</div>

                                            <div className={styles.inputHolder}>
                                                <ControlInput
                                                    placeholder="Mobile Number"
                                                    value={this.state.mobileNumber}
                                                    boxy={true}
                                                    textStyle={{ fontSize: 14 }}
                                                    height={33}
                                                    onChange={mobileNumber => this.onChangeMobileNumber(mobileNumber)}
                                                    disabled={false}
                                                />
                                            </div>
                                        </div>
                                        <div className={styles.container}>
                                            <div className={styles.textHolder}>Gender</div>

                                            <div className={styles.inputHolder}>
                                                <SelectBoxMobile2
                                                    placeholder={"Gender"}
                                                    label={this.state.gender}
                                                    value={this.state.gender}
                                                    options={[
                                                        { label: "Female", value: "FEMALE" },
                                                        { label: "Male", value: "MALE" },
                                                    ]}
                                                    arrowColour="grey"
                                                    height={33}
                                                    onChange={gender => this.onChangeGender(gender)}
                                                />
                                            </div>
                                        </div>
                                        <div className={styles.container}>
                                            <div className={styles.textHolder}>Date of Birth</div>

                                            <div className={styles.inputHolder}>
                                                <MobileDatePicker
                                                    value={this.state.dateOfBirth}
                                                    onChange={dateOfBirth => this.onChangeDateOfBirth(dateOfBirth)}
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
                                </div>
                            </div>
                        </div>

                        <div className={myAccountStyles.userProfile}>
                            <UserProfile
                                image={userData && userData.imageUrl}
                                userLogin={userData && userData.userName}
                                loginType={userData && userData.loginType}
                                onClick={() => this.renderToAccountSetting()}
                                firstName={userData && userData.firstName && userData.firstName.trim().charAt(0)}
                                heading={userData && userData.firstName && `${userData.firstName} `}
                                lastName={userData && userData.lastName && `${userData.lastName}`}
                                userAddress={this.props.userAddress}
                            />
                        </div>
                    </div>
                </div>
            );
        } else if (this.state.changePassword) {
            return (
                <MobileOnly>
                    <div className={styles.changePasswordPageHolder}>
                        <ChangePassword
                            updatePassword={passwordDetails => this.changePassword(passwordDetails)}
                            clearChangePasswordDetails={() => this.props.clearChangePasswordDetails()}
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
    onChange: PropTypes.func,
    lastName:PropTypes.string,
    getUserDetails:PropTypes.func,
    showAuthPopUp:PropTypes.func,
    setHeaderText:PropTypes.func,
    userDetails:PropTypes.shape({
        dateOfBirth:PropTypes.string,
        emailID:PropTypes.string,
        emailId:PropTypes.string,
        firstName:PropTypes.string,
        lastName:PropTypes.string,
        gender:PropTypes.string,
        mobileNumber:PropTypes.string,
    }),
    displayToast:PropTypes.func,
    clearAccountUpdateType:PropTypes.func,
    changePasswordStatus:PropTypes.string,
    updateProfile:PropTypes.func,
    changePassword:PropTypes.func,
    showChangePasswordModal:PropTypes.func,
    userAddress:PropTypes.object,
    clearChangePasswordDetails:PropTypes.func,
    type:PropTypes.string,
    ...RouterPropTypes
};
