import React from "react";
import styles from "./CancelAndContinueButton.css";
import UnderLinedButton from "../../general/components/UnderLinedButton";
import Button from "../../general/components/Button";
export default class CancelAndContinueButton extends React.Component {
  handleCancel() {
    if (this.props.handleCancel) {
      this.props.handleCancel();
    }
  }
  handleContinue() {
    if (this.props.handleContinue) {
      this.props.handleContinue();
    }
  }
  render() {
    return (
      <div className={styles.base}>
        <div className={styles.continueButtonHolder}>
          <Button
            type="primary"
            backgroundColor="#ff1744"
            height={40}
            label={this.props.continueText}
            width={175}
            textStyle={{ color: "#FFF", fontSize: 14 }}
            onClick={() => this.handleContinue()}
          />
        </div>
        <div className={styles.cancelButtonHolder}>
          <UnderLinedButton
            size="14px"
            fontFamily="regular"
            color="#000000"
            label={this.props.cancelText}
            onClick={() => this.handleCancel()}
          />
        </div>
      </div>
    );
  }
}
CancelAndContinueButton.defaultProps = {
  continueText: "Continue",
  cancelText: "Cancel"
};
