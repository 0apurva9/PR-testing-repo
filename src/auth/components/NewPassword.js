import React from "react";
import AuthPopUp from "./AuthPopUp";
import PropTypes from "prop-types";
import Button from "../../xelpmoc-core/Button";
import PasswordInput from "../../auth/components/PasswordInput";
import { default as styles } from "./AuthPopUp.css";
import { default as ownStyles } from "./RestorePassword.css";
import lockIcon from "./img/otpLock.svg";
import Icon from "../../xelpmoc-core/Icon";
import MobileOnly from "../../general/components/MobileOnly";
import DesktopOnly from "../../general/components/DesktopOnly";
const MINIMUM_PASSWORD_LENGTH = 8;
const NEW_PASSWORD_TEXT = "Please enter password";
const PASSWORD_LENGTH_TEXT = "Password length should be minimum 8 character";
const CONFIRM_PASSWORD_TEXT = "Please confirm your passowrd";
const PASSWORD_MATCH_TEXT = "Password did not match";
export default class NewPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      error: false
    };
  }

  handleCancelClick() {
    if (this.props.handleCancel) {
      this.props.handleCancel();
    }
  }

  handleContinue() {
    const newPassword = this.state.newPassword;
    const confirmedPassword = this.state.confirmedPassword;
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
      this.setState({ error: true });
    } else {
      this.setState({ error: false });
      if (this.props.onContinue) {
        if (this.props.userObj && this.props.userObj.userName) {
          this.props.onContinue({
            newPassword: this.state.newPassword,
            username: this.props.userObj.userName,
            otp: this.props.userObj.otpDetails
          });
        } else {
          this.props.onContinue({
            newPassword: this.state.newPassword,
            username: this.props.userName,
            otp: this.props.otpDetails
          });
        }
      }
    }
  }
  onEnter(val) {
    if (val === "Enter") {
      this.handleContinue();
    }
  }
  render() {
    let emailIdOrMobileNumber;
    if (this.props.userObj && this.props.userObj.userName) {
      emailIdOrMobileNumber = this.props.userObj.userName;
    } else {
      emailIdOrMobileNumber = "";
    }
    return (
      <AuthPopUp>
        <div className={ownStyles.lockIcon}>
          <Icon image={lockIcon} size={50} />
        </div>
        <div className={ownStyles.content}>
          <div className={ownStyles.password}>
            Password reset for
            <MobileOnly>
              <span className={styles.header}>
                {" "}
                {emailIdOrMobileNumber.indexOf("@") !== -1
                  ? emailIdOrMobileNumber
                  : `+91${emailIdOrMobileNumber}`}
              </span>
            </MobileOnly>
            <DesktopOnly>
              <span className={styles.particulatEmail}>
                {" "}
                {emailIdOrMobileNumber.indexOf("@") !== -1
                  ? emailIdOrMobileNumber
                  : `+91${emailIdOrMobileNumber}`}
              </span>
            </DesktopOnly>
          </div>
        </div>
        <div className={styles.input}>
          <PasswordInput
            hollow={true}
            placeholder="New Password"
            onChange={val => this.setState({ newPassword: val })}
          />
        </div>
        <div className={styles.input}>
          <PasswordInput
            hollow={true}
            type="password"
            placeholder="Confirm Password"
            onKeyUp={event => {
              this.onEnter(event.key);
            }}
            onChange={val => this.setState({ confirmedPassword: val })}
          />
        </div>
        <div className={styles.button}>
          <div className={ownStyles.submit}>
            <Button
              label={"Continue"}
              width={150}
              height={40}
              borderRadius={20}
              backgroundColor={"#FF1744"}
              onClick={() => this.handleContinue()}
              loading={this.props.loading}
              textStyle={{ color: "#FFF", fontSize: 14 }}
            />
          </div>
          <DesktopOnly>
            <div className={ownStyles.cancel}>
              <Button
                label={"Cancel"}
                width={150}
                height={40}
                borderColor={"#000000"}
                borderRadius={20}
                backgroundColor={"#f9f9f9"}
                onClick={() => this.handleCancelClick()}
                loading={this.props.loading}
                textStyle={{
                  color: "#000000",
                  fontSize: 14,
                  fontFamily: "regular"
                }}
              />
            </div>
          </DesktopOnly>
        </div>
        <MobileOnly>
          <div className={styles.button}>
            <div className={ownStyles.cancel}>
              <Button
                label={"Cancel"}
                onClick={() => this.handleCancelClick()}
                backgroundColor="transparent"
                width={100}
                height={40}
                borderRadius={20}
                loading={this.props.loading}
                textStyle={{ color: "#FFF", fontSize: 14 }}
              />
            </div>
          </div>
        </MobileOnly>
      </AuthPopUp>
    );
  }
}

NewPassword.propTypes = {
  handleCancel: PropTypes.func,
  onContinue: PropTypes.func
};
