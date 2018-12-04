import React from "react";
import { HOME_ROUTER, SUCCESS, SUCCESS_UPPERCASE } from "../../lib/constants";
import PropTypes from "prop-types";
import styles from "./LogoutButton.css";
import UnderLinedButton from "../../general/components/UnderLinedButton";
import Button from "../../general/components/Button";
import DesktopOnly from "../../general/components/DesktopOnly";
import MobileOnly from "../../general/components/MobileOnly";
import {
  setDataLayerForHeaderAndFooterDirectCalls,
  ADOBE_DIRECT_CALL_FOR_HEADER_CLICK
} from "../../lib/adobeUtils";
const LOGOUT_TEXT = "You have logged out successfully";
const clevertap = window.clevertap;
export default class LogoutButton extends React.Component {
  async logoutUser() {
    if (this.props.logoutUser) {
      setDataLayerForHeaderAndFooterDirectCalls(
        ADOBE_DIRECT_CALL_FOR_HEADER_CLICK,
        "Logout"
      );
      const logoutResponse = await this.props.logoutUser();
      this.props.displayToast(LOGOUT_TEXT);
      if (this.props.location.pathname != "/checkout") {
        this.props.history.push(
          `${this.props.location.pathname}${this.props.location.search}`
        );
      } else {
        this.props.history.push(`${HOME_ROUTER}`);
      }
      if (logoutResponse.status === SUCCESS) {
        if (this.props.setBagCount) {
          this.props.setBagCount(0);
        }

        const generateCartIdForAnonymous = await this.props.generateCartIdForAnonymous();
        if (generateCartIdForAnonymous.status === SUCCESS) {
          this.props.setFalseForAllAuthCallHasSucceedFlag();
        }
      }
      clevertap.logout();
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
