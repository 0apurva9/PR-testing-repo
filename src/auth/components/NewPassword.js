import React from "react";
import AuthPopUp from "./AuthPopUp";
import PropTypes from "prop-types";
import Button from "../../xelpmoc-core/Button";
import PasswordInput from "../../auth/components/PasswordInput";
import { default as styles } from "./AuthPopUp.css";
import { default as ownStyles } from "./RestorePassword.css";
const MINIMUM_PASSWORD_LENGTH = "8";
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
        if (newPassword === confirmedPassword) {
          this.props.onContinue({
            newPassword: this.state.newPassword,
            username: this.props.userName,
            otp: this.props.otpDetails
          });
        }
      }
    }
  }
  render() {
    return (
      <AuthPopUp>
        <div className={styles.header}>Create new password</div>
        {/* <div className={styles.content}>
          Please enter your Email or phone number to restore the password
        </div> */}
        <div className={styles.input}>
          <PasswordInput
            hollow={true}
            placeholder="New password"
            onChange={val => this.setState({ newPassword: val })}
          />
        </div>
        <div className={styles.input}>
          <PasswordInput
            hollow={true}
            type="password"
            placeholder="Confirm Password"
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
        </div>
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
      </AuthPopUp>
    );
  }
}

NewPassword.propTypes = {
  handleCancel: PropTypes.func,
  onContinue: PropTypes.func
};
