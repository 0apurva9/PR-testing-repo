import React from "react";
import styles from "./ChangePasswordForDesktop.css";
import Button from "./Button.js";
import PasswordInput from "../../auth/components/PasswordInput.js";
export default class ChangePasswordForDesktop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: "",
      newPassword: "",
      confirmPassword: ""
    };
  }
  onChange = val => {
    this.setState(val);
  };

  cancelModal() {
    if (this.props.closeModal) {
      this.props.closeModal();
    }
  }
  updateProfile() {
    if (this.props.updateProfile) {
      this.props.updateProfile(this.state);
    }
  }
  render() {
    return (
      <div className={styles.base}>
        <div
          className={styles.cancel}
          onClick={() => {
            this.cancelModal();
          }}
        />
        <div className={styles.header}>{this.props.header}</div>
        <div className={styles.dataHolder}>
          <div className={styles.subHeader}>{this.props.subHeader}</div>
          <div className={styles.subHeaderDetail}>
            {this.props.subHeaderDetail}
          </div>
          <div className={styles.inputDetails}>
            <div className={styles.oldPassword}>
              <PasswordInput
                placeholder={"Old Password"}
                password={this.state.oldPassword}
                onChange={oldPassword => this.onChange({ oldPassword })}
              />
            </div>
            <div className={styles.input}>
              <PasswordInput
                placeholder={"New Password"}
                password={this.state.newPassword}
                onChange={newPassword => this.onChange({ newPassword })}
              />
            </div>
            <PasswordInput
              placeholder={"Confirm Password"}
              password={this.state.confirmPassword}
              onChange={confirmPassword => this.onChange({ confirmPassword })}
            />
          </div>
          <div className={styles.buttonHolder}>
            <div className={styles.continueButtonHolder}>
              <Button
                type="primary"
                backgroundColor="#ff1744"
                height={35}
                label="Continue"
                width={155}
                textStyle={{ color: "#FFF", fontSize: 14 }}
                onClick={() => this.updateProfile()}
              />
            </div>
            <div className={styles.cancelButtonHolder}>
              <Button
                type="hollow"
                color="#000"
                height={35}
                label="Cancel"
                width={155}
                onClick={() => this.cancelModal()}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
ChangePasswordForDesktop.defaultProps = {
  header: "Account Setting",
  subHeader: "Please enter your details to complete password verification",
  subHeaderDetail: "Any changes will automatically reflect in your account"
};
