import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button } from "xelpmoc-core";
import MediaQuery from "react-responsive";
import Input from "../../general/components/Input";
import PasswordInput from "../../auth/components/PasswordInput.js";
import MDSpinner from "react-md-spinner";
import styles from "./ChangePassword.css";
import AuthFrame from "../../auth/components/AuthFrame.js";

class ChangePassword extends Component {
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

  updatePassword = () => {
    if (this.state.newPassword === this.state.confirmPassword) {
      if (this.props.updatePassword) {
        this.props.updatePassword(this.state);
      }
    }
  };

  render() {
    return (
      <AuthFrame {...this.props} showSocialButtons={false}>
        <div>
          <div>
            <div className={styles.input}>
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
          <div className={styles.buttonSignup}>
            <div className={styles.buttonHolder}>
              <MediaQuery query="(min-device-width: 1025px)">
                <Button
                  label={"Update"}
                  width={200}
                  height={40}
                  borderColor={"#000000"}
                  borderRadius={20}
                  backgroundColor={"#ffffff"}
                  onClick={() => this.updatePassword()}
                  loading={this.props.loading}
                  textStyle={{
                    color: "#000000",
                    fontSize: 14,
                    fontFamily: "regular"
                  }}
                />
              </MediaQuery>
              <MediaQuery query="(max-device-width:1024px)">
                <Button
                  backgroundColor={"#FF1744"}
                  label={"Update"}
                  width={150}
                  height={45}
                  borderRadius={22.5}
                  onClick={() => this.updatePassword()}
                  loading={this.props.loading}
                  textStyle={{
                    color: "#FFFFFF",
                    fontSize: 14,
                    fontFamily: "regular"
                  }}
                />
              </MediaQuery>
            </div>
          </div>
        </div>
      </AuthFrame>
    );
  }
}

ChangePassword.propTypes = {
  onSubmit: PropTypes.func,
  onChangeName: PropTypes.func,
  onChangeEmail: PropTypes.func,
  onChangePassword: PropTypes.func,
  nameValue: PropTypes.string,
  emailValue: PropTypes.string,
  passwordValue: PropTypes.string,
  loading: PropTypes.bool
};

ChangePassword.defaultProps = {
  loading: false
};

export default ChangePassword;
