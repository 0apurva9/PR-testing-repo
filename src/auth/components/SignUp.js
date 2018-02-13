import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button } from "xelpmoc-core";
import MediaQuery from "react-responsive";
import Input from "../../general/components/Input";
import PasswordInput from "./PasswordInput";
import styles from "./SignUp.css";
import AuthFrame from "./AuthFrame.js";
import MDSpinner from "react-md-spinner";
import {
  LOGIN_PATH,
  SIGN_UP_PATH,
  HOME_ROUTER,
  MAIN_ROUTER,
  SOCIAL_SIGN_UP
} from "../../lib/constants";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameValue: props.nameValue ? props.nameValue : "",
      emailValue: props.emailValue ? props.emailValue : "",
      passwordValue: props.passwordValue ? props.passwordValue : ""
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      if (nextProps.user.isLoggedIn === true) {
        this.props.history.push(HOME_ROUTER);
      }
    }
  }
  onSubmit() {
    if (this.props.onSubmit) {
      this.props.onSubmit({
        loginId: this.state.emailValue,
        password: this.state.passwordValue
      });
    }
  }

  navigateToLogin() {
    this.props.history.push(LOGIN_PATH);
  }
  onChangeName(val) {
    if (this.props.onChangeName) {
      this.props.onChangeName(val);
    }
    this.setState({ nameValue: val });
  }

  onChangeEmail(val) {
    if (this.props.onChangeEmail) {
      this.props.onChangeEmail(val);
    }
    this.setState({ emailValue: val });
  }

  onChangePassword(val) {
    if (this.props.onChangePassword) {
      this.props.onChangePassword(val);
    }
    this.setState({ passwordValue: val });
  }

  render() {
    const pathName = this.props.location.pathname;
    let footerText = "";
    let footerClick;
    let showSocialButtons;
    if (pathName === LOGIN_PATH || MAIN_ROUTER) {
      footerText = "Don't have an account? Sign up";
      footerClick = () => this.navigateToSignUp();
      showSocialButtons = true;
    }

    if (pathName === SIGN_UP_PATH) {
      footerText = "Already have an account? Login";
      footerClick = () => this.navigateToLogin();
      showSocialButtons = true;
    }
    if (this.props.user.loading) {
      return (
        <div className={styles.loadingIndicator}>
          <MDSpinner />
        </div>
      );
    }
    return (
      <AuthFrame
        {...this.props}
        showSocialButtons={showSocialButtons}
        footerText={footerText}
        footerClick={footerClick}
        type={SOCIAL_SIGN_UP}
      >
        <div>
          <div>
            <div className={styles.input}>
              <Input
                value={this.props.value ? this.props.value : this.state.value}
                placeholder={"Name"}
                onChange={val => this.onChangeName(val)}
              />
            </div>
            <div className={styles.input}>
              <Input
                placeholder={"Email or phone number"}
                value={
                  this.props.emailValue
                    ? this.props.emailValue
                    : this.state.emailValue
                }
                onChange={val => this.onChangeEmail(val)}
              />
            </div>
            <PasswordInput
              placeholder={"Password"}
              password={
                this.props.passwordValue
                  ? this.props.passwordValue
                  : this.state.passwordValue
              }
              onChange={val => this.onChangePassword(val)}
            />
          </div>
          <div className={styles.buttonSignup}>
            <div className={styles.buttonHolder}>
              <MediaQuery query="(min-device-width: 1025px)">
                <Button
                  label={"Sign Up"}
                  width={200}
                  height={40}
                  borderColor={"#000000"}
                  borderRadius={20}
                  backgroundColor={"#ffffff"}
                  onClick={() => this.onSubmit()}
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
                  label={"Sign Up"}
                  width={150}
                  height={45}
                  borderRadius={22.5}
                  onClick={() => this.onSubmit()}
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

SignUp.propTypes = {
  onSubmit: PropTypes.func,
  onChangeName: PropTypes.func,
  onChangeEmail: PropTypes.func,
  onChangePassword: PropTypes.func,
  nameValue: PropTypes.string,
  emailValue: PropTypes.string,
  passwordValue: PropTypes.string,
  loading: PropTypes.bool
};

SignUp.defaultProps = {
  loading: false
};

export default SignUp;
