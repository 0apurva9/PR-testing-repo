import React from "react";
import styles from "./PaymentBanner.css";
import PropTypes from "prop-types";
import Button from "../../general/components/Button";
import * as Cookie from "../../lib/Cookie.js";
import { LOGGED_IN_USER_DETAILS, HOME_ROUTER } from "../../lib/constants.js";
import DesktopOnly from "../../general/components/DesktopOnly";
import Image from "../../xelpmoc-core/Image";
import paymentConfirmation from "./img/PaymentConfirmation.svg";
const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
export default class PaymentBanner extends React.Component {
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
          <div className={styles.PaymentConfirmationImage}>
            <Image image={paymentConfirmation} />
          </div>

          <div className={styles.orderHeading}>
            Thank You! Your payment is confirmed.
          </div>
          <div className={styles.orderSubText}>
            We will send you an e-mail and SMS confirmation for your order
            within the next 30 minutes.
          </div>

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
                <div
                  className={styles.button}
                  onClick={() => this.onContinueShopping()}
                >
                  {this.props.continueButton}
                </div>
              </div>
            )}
            {!this.props.isGiftCard && (
              <div className={styles.buttonHolder} style={{ marginLeft: 10 }}>
                <Button
                  type="hollow"
                  color="#212121"
                  label="View Orders"
                  height={37}
                  width={175}
                  onClick={() => this.handleClick()}
                />
              </div>
            )}
          </DesktopOnly>
        </div>
      </div>
    );
  }
}
PaymentBanner.propTypes = {
  headingText: PropTypes.string,
  label: PropTypes.string,
  buttonText: PropTypes.string,
  onClick: PropTypes.func,
  isTrack: PropTypes.bool
};

PaymentBanner.defaultProps = {
  buttonText: "Track Order",
  isTrack: false,
  isContinueShopping: false,
  continueButton: "Continue shopping"
};
