import React from "react";
import UnderLinedButton from "../../general/components/UnderLinedButton";
import PropTypes from "prop-types";
import Button from "../../general/components/Button";
import styles from "./ReturnsFrame.css";
import MobileOnly from "../../general/components/MobileOnly.js";
import DesktopOnly from "../../general/components/DesktopOnly";
export default class ReturnsFrame extends React.Component {
  handleContinue() {
    if (this.props.onContinue) {
      this.props.onContinue();
    }
  }
  handleCancel() {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  }
  render() {
    return (
      <div className={styles.base}>
        <MobileOnly>
          <div className={styles.header}>
            {this.props.headerText}
            <div className={styles.cancel}>
              <UnderLinedButton
                label="Cancel"
                color="#ff1744"
                onClick={() => this.handleCancel()}
              />
            </div>
          </div>
        </MobileOnly>
        <div className={styles.content}>{this.props.children}</div>
        <MobileOnly>
          {this.props.onContinue && (
            <div className={styles.buttonHolder}>
              <div className={styles.button}>
                <Button
                  width={175}
                  type="primary"
                  label={this.props.buttonText}
                  onClick={() => this.handleContinue()}
                />
              </div>
            </div>
          )}
        </MobileOnly>
        <DesktopOnly>
          <div className={styles.bankDetailFooter}>
            <div className={styles.cancelButton}>
              <UnderLinedButton
                label="Cancel"
                onClick={() => this.handleCancel()}
              />
            </div>

            <div className={styles.continueButton}>
              <Button
                width={175}
                type="primary"
                label={this.props.buttonText}
                onClick={() => this.handleContinue()}
              />
            </div>
          </div>
        </DesktopOnly>
      </div>
    );
  }
}
ReturnsFrame.propTypes = {
  headerText: PropTypes.string,
  onContinue: PropTypes.func,
  onCancel: PropTypes.func
};
ReturnsFrame.defaultProps = {
  buttonText: "Continue"
};
