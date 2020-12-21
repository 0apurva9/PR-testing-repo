import React from "react";
import {
  HOME_ROUTER,
  SUCCESS,
  SUCCESS_UPPERCASE,
  SUCCESS_CAMEL_CASE,
  AC_PDP_EXCHANGE_DETAILS,
  AC_CART_EXCHANGE_DETAILS
} from "../../lib/constants";
import PropTypes from "prop-types";
import styles from "./LogoutButton.css";
import UnderLinedButton from "../../general/components/UnderLinedButton";
import Button from "../../general/components/Button";
import DesktopOnly from "../../general/components/DesktopOnly";
import MobileOnly from "../../general/components/MobileOnly";
import {
  setDataLayerForHeaderAndFooterDirectCalls,
  setDataLayerForLogin,
  ADOBE_DIRECT_CALL_FOR_ANONYMOUS_USER,
  ADOBE_DIRECT_CALL_FOR_HEADER_CLICK,
  ADOBE_LOGOUT_SUCCESSFULL
} from "../../lib/adobeUtils";
const LOGOUT_TEXT = "You have logged out successfully";
let clevertap = { logout: () => {} };
if (typeof window !== "undefined") {
  clevertap = window.clevertap;
}
export default class LogoutButton extends React.Component {
  async logoutUser() {
    if (this.props.logoutUser) {
      setDataLayerForHeaderAndFooterDirectCalls(
        ADOBE_DIRECT_CALL_FOR_HEADER_CLICK,
        "Logout"
      );
      setDataLayerForHeaderAndFooterDirectCalls(
        ADOBE_LOGOUT_SUCCESSFULL,
        "logout_successful"
      );
      setDataLayerForLogin(ADOBE_DIRECT_CALL_FOR_ANONYMOUS_USER);
      const logoutResponse = await this.props.logoutUser();
      this.props.displayToast(LOGOUT_TEXT);
      if (
        this.props.location.pathname != "/checkout" &&
        this.props.location.pathname != "/cart"
      ) {
        this.props.history.push(
          `${this.props.location.pathname}${this.props.location.search}`
        );
      } else {
        this.props.history.push(`${HOME_ROUTER}`);
      }
      if (logoutResponse.status == SUCCESS) {
        this.props.resetUserAddressAfterLogout();
        if (this.props.setBagCount) {
          this.props.setBagCount(0);
        }

        this.props.setFalseForAllAuthCallHasSucceedFlag();
        // this.props.getMinicartProducts();
        let acPdpExchangeDetails = localStorage.getItem(
          AC_PDP_EXCHANGE_DETAILS
        );
        let cartExchangeDetails = localStorage.getItem(
          AC_CART_EXCHANGE_DETAILS
        );
        if (acPdpExchangeDetails || cartExchangeDetails) {
          localStorage.removeItem(AC_PDP_EXCHANGE_DETAILS);
          localStorage.removeItem(AC_CART_EXCHANGE_DETAILS);
        }
      }
    }
  }
  render() {
    return (
      <React.Fragment>
        <MobileOnly>
          <div className={styles.base}>
            <UnderLinedButton
              size={this.props.size}
              fontFamily={this.props.fontFamily}
              color={this.props.color}
              label={this.props.label}
              onClick={() => this.logoutUser()}
            />
          </div>
        </MobileOnly>
        <DesktopOnly>
          <div onClick={() => this.logoutUser()}>
            <div className={styles.menuIconLogOut} />
            Logout
          </div>
        </DesktopOnly>
      </React.Fragment>
    );
  }
}
LogoutButton.propTypes = {
  label: PropTypes.string,
  logout: PropTypes.func
};
LogoutButton.defaultProps = {
  size: "14px",
  label: "Logout",
  color: "#ff1744",
  fontFamily: "regular"
};
