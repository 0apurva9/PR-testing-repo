import React from "react";
import UnderLinedButton from "../../general/components/UnderLinedButton";
import PropTypes from "prop-types";
import Button from "../../general/components/Button";
import styles from "./ReturnsFrameV2.css";
import DesktopOnly from "../../general/components/DesktopOnly";
export default class ReturnsFrameV2 extends React.Component {
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
        <div className={styles.content}>{this.props.children}</div>
        {this.props.isFooterNeeded && (
          <DesktopOnly>
            <div className={styles.bankDetailFooter}>
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
        )}
      </div>
    );
  }
}
ReturnsFrameV2.propTypes = {
  headerText: PropTypes.string,
  onContinue: PropTypes.func,
  onCancel: PropTypes.func
};
ReturnsFrameV2.defaultProps = {
  buttonText: "Continue"
};
