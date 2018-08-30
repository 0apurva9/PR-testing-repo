import React from "react";
import styles from "./OrderBanner.css";
import PropTypes from "prop-types";
import Button from "../../general/components/Button";
import * as Cookie from "../../lib/Cookie.js";
import { LOGGED_IN_USER_DETAILS, HOME_ROUTER } from "../../lib/constants.js";
import DesktopOnly from "../../general/components/DesktopOnly";
const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
export default class OrderBanner extends React.Component {
  handleClick() {
    if (this.props.onClick) {
      this.props.onClick();
    }
  }
  onContinueShopping() {
    this.props.history.push(HOME_ROUTER);
  }
  render() {
    let firstName =
      userDetails &&
      JSON.parse(userDetails) &&
      JSON.parse(userDetails).firstName
        ? `${JSON.parse(userDetails).firstName}!`
        : "";
    return (
      <div className={styles.base}>
        <div className={styles.orderInnerBox}>
          <div
            className={styles.orderHeading}
          >{`Thanks ${firstName} We've received your order`}</div>
          <div className={styles.orderLabel}>{`Order Id: ${
            this.props.label
          }`}</div>
          {this.props.isTrack && (
            <div className={styles.buttonHolder}>
              <Button
                type="hollow"
                color="#fff"
                label={this.props.buttonText}
                width={150}
                onClick={() => this.handleClick()}
              />
            </div>
          )}
          <DesktopOnly>
            {this.props.isContinueShopping && (
              <div className={styles.buttonHolder}>
                <Button
                  type="hollow"
                  color="#fff"
                  label={this.props.continueButton}
                  height={37}
                  width={175}
                  onClick={() => this.onContinueShopping()}
                />
              </div>
            )}
          </DesktopOnly>
        </div>
      </div>
    );
  }
}
OrderBanner.propTypes = {
  headingText: PropTypes.string,
  label: PropTypes.string,
  buttonText: PropTypes.string,
  onClick: PropTypes.func,
  isTrack: PropTypes.bool
};

OrderBanner.defaultProps = {
  buttonText: "Track Order",
  isTrack: false,
  isContinueShopping: false,
  continueButton: "Continue shopping"
};
