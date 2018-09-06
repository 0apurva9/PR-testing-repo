import React from "react";
import PropTypes from "prop-types";
import Input2 from "../../general/components/Input2.js";
import DesktopOnly from "../../general/components/DesktopOnly";
import UnderLinedButton from "../../general/components/UnderLinedButton.js";
import styles from "./SearchAndUpdate.css";
import Button from "../../general/components/Button.js";
export default class SearchAndUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pinCode: this.props.value,
      errorMessage: null
    };
  }
  getValue(pinCode) {
    if (pinCode.length <= 6) {
      this.setState({ pinCode });
    }
    if (this.props.onChange) {
      this.props.onChange(pinCode);
    }
  }
  getLocation() {
    if (this.props.getLocation) {
      this.props.getLocation();
    }
  }
  handleOnFocusInput(event) {
    if (this.props.onFocusInput) {
      this.props.onFocusInput(event);
    }
  }

  handleBlurInput() {
    if (this.props.onBlur) {
      this.props.onBlur();
    }
    this.onUpdate();
  }

  handleKeyUp(event) {
    if (event.key === "Go" || event.key === "Enter") {
      this.onUpdate();
    }
  }
  onUpdate() {
    if (this.state.pinCode && this.state.pinCode.match(/^\d{6}$/)) {
      if (this.props.checkPinCodeAvailability) {
        this.props.checkPinCodeAvailability(this.state.pinCode);
      }
      this.setState({ errorMessage: null });
    } else {
      this.setState({ errorMessage: "Please enter a  valid pincode" });
    }
  }
  render() {
    return (
      <div className={styles.base}>
        {this.state.errorMessage && (
          <div
            className={
              this.props.ovalButton
                ? styles.alignLeftErrorMessage
                : styles.errorMessage
            }
          >
            {this.state.errorMessage}
          </div>
        )}
        <div
          className={
            this.props.ovalButton
              ? styles.inputSearchHolderWithPadding
              : styles.inputSearchHolder
          }
        >
          <DesktopOnly>
            {this.props.ovalButton && (
              <div className={styles.ovalButton}>
                <Button
                  type="hollow"
                  width={143}
                  height={33}
                  label="Update Pincode"
                  color="#ff1744"
                  onClick={() => this.onUpdate()}
                />
              </div>
            )}
          </DesktopOnly>
          {!this.props.ovalButton && (
            <div className={styles.buttonHolder}>
              <div className={styles.buttonCover}>
                <React.Fragment>
                  {this.props.uiType === "default" ? (
                    <UnderLinedButton
                      size="14px"
                      fontFamily="regular"
                      color="#000"
                      label={this.props.labelText}
                      onClick={() => this.onUpdate()}
                    />
                  ) : (
                    <div
                      className={styles.button}
                      onClick={() => this.onUpdate()}
                    >
                      {this.props.labelText}
                    </div>
                  )}
                </React.Fragment>
              </div>
            </div>
          )}
          <div className={styles.inputHolder}>
            <Input2
              boxy={this.props.uiType === "default" ? true : false}
              hollow={this.props.uiType === "hollow" ? true : false}
              id={this.props.id}
              value={this.state.pinCode}
              onlyNumber={true}
              placeholder={this.props.placeholder}
              onChange={val => this.getValue(val)}
              textStyle={{ fontSize: 14 }}
              height={35}
              autoFocus={this.props.hasAutoFocus}
              rightChildSize={35}
              borderColor={this.props.borderColor}
              borderBottom={this.props.borderBottom}
              onFocus={event => {
                this.handleOnFocusInput(event);
              }}
              onBlur={() => {
                this.handleBlurInput();
              }}
              onKeyUp={event => {
                this.handleKeyUp(event);
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}
SearchAndUpdate.propTypes = {
  getValue: PropTypes.func,
  getLocation: PropTypes.func,
  onUpdate: PropTypes.func,
  errorMessage: PropTypes.string,
  hasAutoFocus: PropTypes.bool,
  uiType: PropTypes.oneOf(["default", "hollow"]),
  placeholder: PropTypes.string,
  ovalButton: PropTypes.bool
};

SearchAndUpdate.defaultProps = {
  labelText: "Check",
  hasAutoFocus: false,
  uiType: "default",
  placeholder: "Enter your PIN code",
  ovalButton: false
};
