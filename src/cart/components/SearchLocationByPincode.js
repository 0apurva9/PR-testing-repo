import React from "react";
import PropTypes from "prop-types";
import Input2 from "../../general/components/Input2.js";
import Icon from "../../xelpmoc-core/Icon";
import Location from "./img/location.png";
import styles from "./SearchLocationByPincode.css";
import { DEFAULT_PIN_CODE_LOCAL_STORAGE } from "../../lib/constants";

export default class SearchLocationByPincode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pinCode: this.props.pincode
        ? this.props.pincode
        : localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE)
          ? localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE)
          : null,
      errorMessage: null
    };
  }

  getValue(pincode) {
    if (pincode.length <= 6) {
      this.setState({ pinCode: pincode });
    }
  }

  checkPincode() {
    let currentPincode = localStorage.getItem(DEFAULT_PIN_CODE_LOCAL_STORAGE);
    if (
      this.state.pinCode &&
      this.state.pinCode !== currentPincode &&
      this.state.pinCode.length === 6
    ) {
      this.onUpdate(this.state.pinCode);
    }
  }

  onUpdate(pinCode) {
    if (pinCode && pinCode.match(/^\d{6}$/)) {
      if (this.props.changePincode) {
        this.props.changePincode(pinCode);
      }
      this.setState({ errorMessage: null });
    } else {
      this.setState({ errorMessage: "Please enter a  valid pincode" });
    }
  }

  render() {
    return (
      <div className={styles.base}>
        {this.props.header && (
          <div className={styles.header}>{this.props.header}</div>
        )}
        {this.state.errorMessage && (
          <div className={styles.errorMessage}>{this.state.errorMessage}</div>
        )}
        <div
          className={
            this.props.disabled ? styles.disabledInput : styles.inputHolder
          }
        >
          <Input2
            placeholder={
              this.props.pincode
                ? `Your pincode: ${this.props.pincode}`
                : this.state.pincode
                  ? `Your pincode: ${this.state.pinCode}`
                  : "Enter your Pincode "
            }
            onlyNumber={true}
            maxLength={"6"}
            value={
              this.props.pincode
                ? `Your pincode: ${this.props.pincode}`
                : this.state.pincode
            }
            onChange={val => this.getValue(val)}
            textStyle={{ fontSize: 14 }}
            height={35}
            disabled={this.props.disabled}
          />
          {!this.props.disabled && (
            <div
              className={styles.checkPincodeButton}
              onClick={() => this.checkPincode()}
            >
              <Icon image={Location} size={21} />
            </div>
          )}
        </div>
      </div>
    );
  }
}
SearchLocationByPincode.propTypes = {
  header: PropTypes.string,
  pincode: PropTypes.string,
  getLocation: PropTypes.func,
  changePincode: PropTypes.func,
  disabled: PropTypes.bool
};
SearchLocationByPincode.defaultProps = {
  disabled: false
};
