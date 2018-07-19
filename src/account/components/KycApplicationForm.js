import React from "react";
import styles from "./KycApplicationForm.css";
import PropTypes from "prop-types";
import Button from "../../general/components/Button.js";
import Input2 from "../../general/components/Input2.js";
import MDSpinner from "../../general/components/SecondaryLoader";
import {
  NAME_TEXT,
  LAST_NAME_TEXT,
  PHONE_VALID_TEXT
} from "../../lib/constants";
import DesktopOnly from "../../general/components/DesktopOnly";
import MobileOnly from "../../general/components/MobileOnly";
export const MOBILE_PATTERN = /^[7,8,9]{1}[0-9]{9}$/;
export default class KycApplicationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: this.props.firstName ? this.props.firstName : "",
      lastName: this.props.lastName ? this.props.lastName : "",
      mobileNumber: this.props.mobileNumber ? this.props.mobileNumber : ""
    };
  }
  generateOtp() {
    if (!this.state.firstName || this.state.firstName === "") {
      this.props.displayToast(NAME_TEXT);
      return false;
    } else if (!this.state.lastName || this.state.lastName === "") {
      this.props.displayToast(LAST_NAME_TEXT);
      return false;
    } else if (
      !this.state.mobileNumber ||
      (this.state.mobileNumber && !MOBILE_PATTERN.test(this.state.mobileNumber))
    ) {
      this.props.displayToast(PHONE_VALID_TEXT);
      return false;
    } else {
      if (this.props.generateOtp) {
        this.props.generateOtp(this.state);
      }
    }
  }
  onCancel() {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  }

  render() {
    return (
      <div className={styles.base}>
        <div className={styles.bottomHolder}>
          <div className={styles.applicationForm}>
            <div className={styles.header}>
              Please enter below information to verify you KYC details.
            </div>
            <div className={styles.labelHedaer}>
              Any changes will automatically reflect in your account
            </div>
            <div className={styles.formHolder}>
              <div className={styles.inputHolder}>
                <Input2
                  boxy={true}
                  placeholder="First Name"
                  value={
                    this.props.firstName
                      ? this.props.firstName
                      : this.state.firstName
                  }
                  onChange={firstName => this.setState({ firstName })}
                  textStyle={{ fontSize: 14 }}
                  height={33}
                  type="text"
                  onlyAlphabet={true}
                />
              </div>
              <div className={styles.inputHolder}>
                <Input2
                  boxy={true}
                  placeholder="Last Name"
                  value={
                    this.props.lastName
                      ? this.props.lastName
                      : this.state.lastName
                  }
                  onChange={lastName => this.setState({ lastName })}
                  textStyle={{ fontSize: 14 }}
                  height={33}
                  onlyAlphabet={true}
                />
              </div>
              <div className={styles.inputHolder}>
                <Input2
                  boxy={true}
                  placeholder="Mobile Number"
                  value={
                    this.props.mobileNumber
                      ? this.props.mobileNumber
                      : this.state.mobileNumber
                  }
                  onChange={mobileNumber => this.setState({ mobileNumber })}
                  textStyle={{ fontSize: 14 }}
                  height={33}
                  maxLength={10}
                  onlyNumber={true}
                />
              </div>
            </div>
            <React.Fragment>
              <MobileOnly>
                <div className={styles.buttonHolder}>
                  <div className={styles.button}>
                    {this.props.loadingForGetOtpToActivateWallet && (
                      <div className={styles.loader}>
                        <MDSpinner />
                      </div>
                    )}
                    {!this.props.loadingForGetOtpToActivateWallet && (
                      <Button
                        type="primary"
                        backgroundColor="#ff1744"
                        height={36}
                        label="Generate OTP"
                        width={211}
                        textStyle={{ color: "#FFF", fontSize: 14 }}
                        onClick={() => this.generateOtp()}
                      />
                    )}
                  </div>
                </div>
                <div className={styles.buttonHolder}>
                  <div className={styles.button}>
                    <Button
                      type="hollow"
                      height={36}
                      label="Cancel"
                      width={211}
                      textStyle={{ color: "#212121", fontSize: 14 }}
                      onClick={() => this.onCancel()}
                    />
                  </div>
                </div>
              </MobileOnly>
              <DesktopOnly>
                <div className={styles.buttonHolder}>
                  <div className={styles.buttonleft}>
                    <div className={styles.button}>
                      <Button
                        type="hollow"
                        height={36}
                        label="Cancel"
                        width={160}
                        textStyle={{ color: "#212121", fontSize: 14 }}
                        onClick={() => this.onCancel()}
                      />
                    </div>
                  </div>
                  <div className={styles.buttonRight}>
                    <div className={styles.button}>
                      <Button
                        type="primary"
                        backgroundColor="#ff1744"
                        height={36}
                        label="Generate OTP"
                        width={160}
                        textStyle={{ color: "#FFF", fontSize: 14 }}
                        onClick={() => this.generateOtp()}
                      />
                    </div>
                  </div>
                </div>
              </DesktopOnly>
            </React.Fragment>
          </div>
        </div>
      </div>
    );
  }
}
KycApplicationForm.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  mobileNumber: PropTypes.string,
  generateOtp: PropTypes.func,
  onCancel: PropTypes.func
};
