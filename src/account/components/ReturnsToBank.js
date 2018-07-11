import React from "react";
import PropTypes from "prop-types";
import styles from "./ReturnsToBank.css";
import Logo from "../../general/components/Logo";
import DesktopOnly from "../../general/components/DesktopOnly.js";
export default class ReturnsToBank extends React.Component {
  render() {
    return (
      <div className={styles.base}>
        <DesktopOnly>
          <div className={styles.header}>
            <div className={styles.circleHolder}>
              <div className={styles.circle}>3</div>
            </div>
            Refund Details
          </div>
        </DesktopOnly>
        <div className={styles.headingText}>We will process your refund to</div>
        <div className={styles.cardLogoAndNumberHolder}>
          {this.props.cardLogo && (
            <div className={styles.cardLogo}>
              <Logo image={this.props.cardLogo} />
            </div>
          )}
          <div className={styles.dummyCardDataHolder}>
            <div className={styles.circleDesign} />
            <div className={styles.circleDesign} />
            <div className={styles.circleDesign} />
            <div className={styles.circleDesign} />
            <div className={styles.circleTransparent} />
            <div className={styles.circleDesign} />
            <div className={styles.circleDesign} />
            <div className={styles.circleDesign} />
            <div className={styles.circleDesign} />
            <DesktopOnly>
              <div className={styles.circleTransparent} />
              <div className={styles.circleDesign} />
              <div className={styles.circleDesign} />
              <div className={styles.circleDesign} />
              <div className={styles.circleDesign} />
            </DesktopOnly>
          </div>
          <div className={styles.cardNumber}>{this.props.cartNumber}</div>
        </div>
        <div className={styles.footerText}>{this.props.footerText}</div>
      </div>
    );
  }
}
ReturnsToBank.propTypes = {
  cardNumber: PropTypes.string,
  cardLogo: PropTypes.string,
  footerText: PropTypes.string
};
ReturnsToBank.defaultProps = {
  footerText: "The refund generally takes 5-8 business days to complete"
};
