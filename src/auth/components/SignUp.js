import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "../../xelpmoc-core/Button";
import MediaQuery from "react-responsive";
import Input from "../../general/components/Input";
import PasswordInput from "./PasswordInput";
import styles from "./SignUp.css";
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
  BUY_NOW_PRODUCT_DETAIL,
  PRODUCT_DETAIL_FOR_ADD_TO_WISHLIST
} from "../../lib/constants";
import { EMAIL_REGULAR_EXPRESSION, MOBILE_PATTERN } from "./Login";
import {
  setDataLayer,
  ADOBE_LOGIN_AND_SIGN_UP_PAGE,
  setDataLayerForSignupProcess,
  ADOBE_SIGN_UP_START,
  ADOBE_SIGN_UP_SUCCESS
} from "../../lib/adobeUtils";
const PASSWORD_MATCH_TEXT = "Password did not match";
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameValue: props.nameValue ? props.nameValue : "",
      emailValue: props.emailValue ? props.emailValue : "",
      passwordValue: props.passwordValue ? props.passwordValue : ""
      // reEnterPasswordValue: ""
    };
  }
  componentDidMount() {
    if (this.props.location.pathname === SIGN_UP_PATH) {
      setDataLayer(ADOBE_LOGIN_AND_SIGN_UP_PAGE);
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
      const productDetailsForAddToWishList = localStorage.getItem(
        PRODUCT_DETAIL_FOR_ADD_TO_WISHLIST
      );
      if (
        productDetailsForBuyNow &&
        !nextProps.tempCartIdForLoggedInUserLoading
      ) {
        return this.goForBuyNow();
      }
      if (
        productDetailsForAddToWishList &&
        !nextProps.loadingForAddProductToWishList
      ) {
        return this.goForWishlist();
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
  }
  checkSignUp(val) {
    if (val === "Enter") {
      this.onSubmit();
    }
  }
  onSubmit() {
    if (!this.state.emailValue) {
      this.props.displayToast("Please enter email address ");
      return false;
    }
    if (this.state.emailValue) {
      if (!EMAIL_REGULAR_EXPRESSION.test(this.state.emailValue)) {
        this.props.displayToast("Please enter a valid email address");
        return false;
      }
    }

    if (!this.state.passwordValue) {
      this.props.displayToast("Please enter your password");
      return false;
    }
    if (this.state.passwordValue.length < "8") {
      this.props.displayToast("Password length should be minimum 8 character");
      return false;
    } else {
      this.props.onSubmit(
        {
          emailId: this.state.emailValue,
          username: this.state.emailValue,
          password: this.state.passwordValue
        },
        this.props.redirectToAfterAuthUrl
      );
    }
  }
  goBack() {
    this.props.history.push(HOME_ROUTER);
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

  onPhoneNumberChange(val) {
    if (this.props.onPhoneNumberChange) {
      this.props.onPhoneNumberChange(val);
    }
    if (val.length <= 10) {
      this.setState({ phoneNumberValue: val });
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
  // onChangeReEnterPassword(val) {
  //   this.setState({ reEnterPasswordValue: val });
  // }

  goForWishlist() {
    const productDetailsForWishList = localStorage.getItem(
      PRODUCT_DETAIL_FOR_ADD_TO_WISHLIST
    );
    this.props.addProductToWishList(JSON.parse(productDetailsForWishList));
    if (this.props.redirectToAfterAuthUrl) {
      localStorage.removeItem(PRODUCT_DETAIL_FOR_ADD_TO_WISHLIST);
      this.props.history.replace({
        pathname: this.props.redirectToAfterAuthUrl,
        state: { isSizeSelected: true, goToCartPageFlag: false }
      });
      this.props.clearUrlToRedirectToAfterAuth();
    }
  }
  render() {
    const pathName = this.props.location && this.props.location.pathname;
    let footerText = "";
    let footerClick;
    let showSocialButtons;
    let buttonLabel;
    if (pathName === LOGIN_PATH || MAIN_ROUTER) {
      footerText = "New to Tata CLiQ?";
      footerClick = () => this.navigateToSignUp();
      buttonLabel = "Sign Up";
      showSocialButtons = true;
    }

    if (pathName === SIGN_UP_PATH) {
      footerText = "Already have an account?";
      footerClick = () => this.navigateToLogin();
      showSocialButtons = true;
      buttonLabel = "Already have an account? LOGIN";
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
        isSignUp={true}
        goBack={() => this.goBack()}
        buttonLabel={buttonLabel}
      >
        <div>
          <div>
            <div className={styles.input}>
              <Input
                placeholder={"Email"}
                value={
                  this.props.emailValue
                    ? this.props.emailValue
                    : this.state.emailValue
                }
                onChange={val => this.onChangeEmail(val)}
                fontSize={14}
                maxLength={240}
              />
            </div>
            <PasswordInput
              onKeyUp={event => {
                this.checkSignUp(event.key);
              }}
              placeholder={"Password"}
              password={
                this.props.passwordValue
                  ? this.props.passwordValue
                  : this.state.passwordValue
              }
              onChange={val => this.onChangePassword(val)}
              fontSize={14}
              maxLength={200}
            />
          </div>
          {/* <MediaQuery query="(min-device-width: 1025px)">
            <div className={styles.dummyDiv}>
              <PasswordInput
                onKeyUp={event => {
                  this.checkSignUp(event.key);
                }}
                placeholder={"Re-enter Password"}
                password={this.state.reEnterPasswordValue}
                onChange={val => this.onChangeReEnterPassword(val)}
                fontSize={14}
                maxLength={200}
              />
            </div>
          </MediaQuery> */}
          <div className={styles.buttonSignup}>
            <div className={styles.buttonHolder}>
              <MediaQuery query="(min-device-width: 1025px)">
                <Button
                  label={"Sign Up"}
                  width={180}
                  height={40}
                  borderColor={"#000000"}
                  borderRadius={20}
                  backgroundColor={"#f9f9f9"}
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
                  width="100%"
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
