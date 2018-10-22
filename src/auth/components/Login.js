import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "../../xelpmoc-core/Button";
import MediaQuery from "react-responsive";
import Input from "../../general/components/Input";
import PasswordInput from "./PasswordInput";
import styles from "./Login.css";
import LoginButton from "./LogInButton";
import {
  CART_DETAILS_FOR_ANONYMOUS,
  MY_ACCOUNT_CART_PAGE,
  BUY_NOW_PRODUCT_DETAIL,
  SUCCESS,
  BUY_NOW_ERROR_MESSAGE
} from "../../lib/constants";
import * as Cookie from "../../lib/Cookie";
import AuthFrame from "./AuthFrame.js";
import DesktopOnly from "../../general/components/DesktopOnly";
import MobileOnly from "../../general/components/MobileOnly";
import SecondaryLoader from "../../general/components/SecondaryLoader";
import SectionLoaderDesktop from "../../general/components/SectionLoaderDesktop";

import {
  LOGIN_PATH,
  SIGN_UP_PATH,
  HOME_ROUTER,
  MAIN_ROUTER,
  SOCIAL_LOG_IN,
  CHECKOUT_ROUTER,
  PRODUCT_CART_ROUTER
} from "../../lib/constants";
import {
  setDataLayer,
  ADOBE_LOGIN_AND_SIGN_UP_PAGE
} from "../../lib/adobeUtils";

export const EMAIL_REGULAR_EXPRESSION = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const MOBILE_PATTERN = /^[7,8,9]{1}[0-9]{9}$/;
const MINIMUM_PASSWORD_LENGTH = "8";
const EMAIL_ID_DOSE_NOT_EXIST = "Email ID or phone number does not exist";
const FAILED_TO_FETCH = "Failed to fetch";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailValue: props.emailValue ? props.emailValue : "",
      passwordValue: props.passwordValue ? props.passwordValue : ""
    };
  }
  componentDidMount() {
    const digitalData = window.digitalData;
    if (
      digitalData &&
      digitalData.page &&
      digitalData.page &&
      digitalData.page.pageInfo &&
      digitalData.page.pageInfo.pageName !== "login"
    ) {
      let isLoginFromCheckoutPage =
        this.props.redirectToAfterAuthUrl === MY_ACCOUNT_CART_PAGE;
      setDataLayer(ADOBE_LOGIN_AND_SIGN_UP_PAGE, isLoginFromCheckoutPage);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.authCallsIsSucceed) {
      /*
check for user is coming from buy now option
then in this case we have to hit generate temp cart id for user
      */
      const productDetailsForBuyNow = localStorage.getItem(
        BUY_NOW_PRODUCT_DETAIL
      );

      if (
        productDetailsForBuyNow &&
        !nextProps.tempCartIdForLoggedInUserLoading
      ) {
        return this.goForBuyNow();
      }
      if (!nextProps.tempCartIdForLoggedInUserLoading) {
        if (this.props.redirectToAfterAuthUrl) {
          this.props.history.replace(this.props.redirectToAfterAuthUrl);
          this.props.clearUrlToRedirectToAfterAuth();
        } else {
          this.props.history.replace(HOME_ROUTER);
        }
      }
    }
    if (nextProps.error === EMAIL_ID_DOSE_NOT_EXIST) {
      this.setState({
        passwordValue: ""
      });
    }
    if (nextProps.error === FAILED_TO_FETCH) {
      this.setState({
        passwordValue: ""
      });
      this.props.displayToast("Can't connect to the internet");
    }
  }

  async goForBuyNow() {
    const productDetailsForBuyNow = localStorage.getItem(
      BUY_NOW_PRODUCT_DETAIL
    );
    const buyNowResponse = await this.props.tempCartIdForLoggedInUser(
      JSON.parse(productDetailsForBuyNow)
    );
    if (buyNowResponse && buyNowResponse.status === SUCCESS) {
      this.props.history.push(PRODUCT_CART_ROUTER);
    } else {
      this.props.displayToast(BUY_NOW_ERROR_MESSAGE);
      if (this.props.redirectToAfterAuthUrl) {
        this.props.history.replace(this.props.redirectToAfterAuthUrl);
        this.props.clearUrlToRedirectToAfterAuth();
      }
    }
  }
  navigateToSignUp() {
    this.props.history.push(SIGN_UP_PATH);
  }
  goBack() {
    if (this.props.history.length <= 3) {
      this.props.history.replace(HOME_ROUTER);
    }
    if (this.props.history.length === 2) {
      this.props.history.push(HOME_ROUTER);
    }
    if (this.props.redirectToAfterAuthUrl === CHECKOUT_ROUTER) {
      this.props.history.replace(PRODUCT_CART_ROUTER);
    } else {
      this.props.history.goBack();
    }
  }
  onSubmit = () => {
    if (this.props.onSubmit) {
      let userDetails = {};
      userDetails.username = this.state.emailValue.trim();
      userDetails.password = this.state.passwordValue;
      if (!userDetails.username) {
        this.props.displayToast("Please enter a valid email address");
        return false;
      }
      if (userDetails.username.indexOf("@") !== -1) {
        if (!EMAIL_REGULAR_EXPRESSION.test(userDetails.username)) {
          this.props.displayToast("Please enter a valid email address");
          return false;
        }
      } else {
        if (!MOBILE_PATTERN.test(userDetails.username)) {
          this.props.displayToast("Please enter a valid phone number");
          return false;
        }
      }
      if (!userDetails.password) {
        this.props.displayToast("Please enter your password");
        return false;
      }
      if (userDetails.password.length < MINIMUM_PASSWORD_LENGTH) {
        this.props.displayToast(
          "Password length should be minimum 8 character"
        );
        return false;
      } else {
        this.props.onSubmit(userDetails, this.props.redirectToAfterAuthUrl);
      }
    }
  };
  checkLogin(val) {
    if (val === "Enter") {
      this.onSubmit();
    }
  }
  onForgotPassword() {
    if (this.props.onForgotPassword) {
      this.props.onForgotPassword();
    }
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
    const pathName = this.props.location && this.props.location.pathname;
    let footerText = "";
    let footerClick;
    let showSocialButtons;
    let buttonLabel;

    if (pathName === LOGIN_PATH || MAIN_ROUTER) {
      footerText = "New to Tata CLiQ? ";
      footerClick = () => this.navigateToSignUp();
      buttonLabel = "New to TataCLiQ ? Sign Up";
      showSocialButtons = true;
    }

    if (pathName === SIGN_UP_PATH) {
      footerText = "Already have an account? Login";
      footerClick = () => this.navigateToLogin();
      showSocialButtons = false;
    }

    if (
      this.props.authCallsInProcess ||
      this.props.tempCartIdForLoggedInUserLoading
    ) {
      return (
        <div className={styles.loadingIndicator}>
          <React.Fragment>
            <MobileOnly>
              <SecondaryLoader />
            </MobileOnly>
            <DesktopOnly>
              <SectionLoaderDesktop />
            </DesktopOnly>
          </React.Fragment>
        </div>
      );
    }
    return (
      <AuthFrame
        {...this.props}
        showSocialButtons={showSocialButtons}
        footerText={footerText}
        footerClick={footerClick}
        type={SOCIAL_LOG_IN}
        goBack={() => this.goBack()}
        buttonLabel={buttonLabel}
      >
        <React.Fragment>
          <div>
            <div className={styles.input}>
              <Input
                placeholder={"Email & phone number"}
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
              onKeyUp={event => {
                this.checkLogin(event.key);
              }}
              password={
                this.props.passwordValue
                  ? this.props.passwordValue
                  : this.state.passwordValue
              }
              onChange={val => this.onChangePassword(val)}
            />

            <div className={styles.forgotButton}>
              <MediaQuery query="(min-device-width: 1025px)">
                <Button
                  backgroundColor={"transparent"}
                  label={"Forgot Password?"}
                  onClick={() => this.onForgotPassword()}
                  loading={this.props.loading}
                  textStyle={{
                    color: "#FF1744",
                    fontSize: 14,
                    fontFamily: "regular"
                  }}
                />
              </MediaQuery>

              <MediaQuery query="(max-device-width:1024px)">
                <div className={styles.forgotButtonPosition}>
                  <Button
                    height={25}
                    backgroundColor={"transparent"}
                    label={"Forgot Password?"}
                    onClick={() => this.onForgotPassword()}
                    loading={this.props.loading}
                    textStyle={{
                      color: "#fffff",
                      fontSize: 14,
                      fontFamily: "regular"
                    }}
                  />
                </div>
              </MediaQuery>
            </div>
          </div>
          <div className={styles.buttonLogin}>
            <div className={styles.buttonHolder}>
              <LoginButton
                onClick={this.onSubmit}
                loading={this.props.loading}
              />
            </div>
          </div>
        </React.Fragment>
      </AuthFrame>
    );
  }
}

Login.propTypes = {
  onSubmit: PropTypes.func,
  onForgotPassword: PropTypes.func,
  onChangeEmail: PropTypes.func,
  onChangePassword: PropTypes.func,
  emailValue: PropTypes.string,
  passwordValue: PropTypes.string,
  loading: PropTypes.bool
};

Login.defaultProps = {
  loading: false
};

export default Login;
