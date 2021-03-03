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
        {!this.props.isEditAddress && (
          <React.Fragment>
            <div className={styles.continueButtonHolder}>
              <Button
                type="primary"
                backgroundColor="#ff1744"
                height={40}
                label={this.props.continueText}
                width={175}
                textStyle={{ color: "#FFF", fontSize: 14 }}
                disabled={this.props.disabled}
                onClick={() => this.handleContinue()}
                disabledBgGrey={true}
              />
            </div>
            <div className={styles.cancelButtonHolder}>
              <Button
                // size="14px"
                // fontFamily="semibold"
                // color="#FF1744"
                backgroundColor="#fff"
                label={this.props.cancelText}
                textStyle={{
                  color: "#FF1744",
                  fontSize: 14,
                  fontFamily: "semibold"
                }}
                onClick={() => this.handleCancel()}
              />
            </div>
          </React.Fragment>
        )}
        {this.props.isEditAddress && (
          <React.Fragment>
            <div className={styles.continueButtonHolder1}>
              <Button
                type="primary"
                backgroundColor="#ff1744"
                height={40}
                label={this.props.continueText}
                width={175}
                textStyle={{ color: "#FFF", fontSize: 14 }}
                onClick={() => this.handleContinue()}
                disabledBgGrey={true}
              />
            </div>
            <div className={styles.cancelButtonHolder1}>
              <UnderLinedButton
                size="14px"
                fontFamily="regular"
                color="#000000"
                label={this.props.cancelText}
                onClick={() => this.handleCancel()}
              />
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}
CancelAndContinueButton.defaultProps = {
  continueText: "CONTINUE",
  cancelText: "Cancel",
  isEditAddress: false
};
