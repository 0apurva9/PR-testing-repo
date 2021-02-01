import React from "react";

import Input2 from "../../../../../general/components/Input2.js";
import styles from "./BeautyPdpPincode.css";
import * as Cookie from "../../../../../lib/Cookie";
import { LOGGED_IN_USER_DETAILS } from "../../../../../lib/constants";

export default class BeautyPdpPincode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pincode: this.props.pincode ? this.props.pincode : "",
      showDropDown: false,
      showCity: true
    };
    this.showDropdownMenu = this.showDropdownMenu.bind(this);
    this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
  }

  onClick() {
    if (this.props.onClick) {
      this.props.onClick();
    }
  }

  enterPassword(val) {
    if (val === "Enter") {
      this.onCheckPinCode(this.state.pincode);
      this.setState({ showDropDown: false });
    }
  }

  onChange(val) {
    this.setState({ pincode: val });
    if (val.length >= 3) {
      this.showDropdownMenu();
    } else if (val.length < 3) {
      this.hideDropdownMenu();
    }
  }

  onFocus() {
    this.setState({ showCity: false });
  }

  onBlur() {
    this.setState({ showCity: true });
  }

  showDropdownMenu() {
    this.setState({ showDropDown: true }, () => {
      document.addEventListener("click", this.hideDropdownMenu);
    });
  }

  hideDropdownMenu() {
    this.setState({ showDropDown: false }, () => {
      document.removeEventListener("click", this.hideDropdownMenu);
    });
  }

  onCheckPinCode(val) {
    if (val.length < 6) {
      this.props.displayToast("Please enter valid pincode");
    } else {
      if (this.props.onCheckPinCode) {
        this.props.onCheckPinCode(val);
      }
    }
  }

  dropDownClick = val => {
    this.setState({ pincode: val });
    if (this.props.onCheckPinCode) {
      this.props.onCheckPinCode(val);
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.pincode && nextProps.pincode !== this.state.pincode) {
      this.setState({ pincode: nextProps.pincode });
    }
  }

  redirectToLoginPage() {
    if (this.props.redirectToLoginPage) {
      this.props.redirectToLoginPage();
    }
  }

  render() {
    const listOfAllPinCode = this.props.listOfAllPinCode;
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);

    return this.props.hasPincode ? (
      <React.Fragment>
        <div className={styles["pin-code-heading"]}>SHIP TO</div>
        <div className={styles["pin-code-change-block"]}>
          <div className={styles["pin-code-change-input"]}>
            <Input2
              boxy={true}
              textStyle={{ fontSize: 16, fontWeight: 600 }}
              height={25}
              maxLength={"6"}
              onChange={val => this.onChange(val)}
              onlyNumber={true}
              border={"none"}
              value={
                this.state.showCity && this.props.city
                  ? `${this.props.city}, ${this.state.pincode}`
                  : this.state.pincode
              }
              noPadding={true}
              onKeyUp={event => {
                this.enterPassword(event.key);
              }}
              onFocus={event => this.onFocus(event)}
              onBlur={event => this.onBlur(event)}
              className={styles["pin-code-change-input"]}
            />
          </div>
          <div className={styles["pin-code-change-button-block"]}>
            <div
              className={styles["pin-code-change-button"]}
              id="change"
              onClick={() => this.onCheckPinCode(this.state.pincode)}
            >
              Change
            </div>
          </div>
        </div>
        {this.state.showDropDown && (
          <div className={styles.pincodeListDropDown}>
            <div className={styles.listOfPincode}>
              {userDetails &&
                listOfAllPinCode &&
                listOfAllPinCode.map((val, i) => {
                  if (i < 2) {
                    return (
                      <div
                        className={styles.dropdownList}
                        onClick={() => this.dropDownClick(val.postalCode)}
                      >
                        <div className={styles.addressHeader}>
                          {val.addressType}
                        </div>
                        <div className={styles.addressDetails}>
                          <span className={styles.pinSection}>
                            {val.postalCode}
                          </span>
                          ,{val.line1},{val.town},{val.state}
                        </div>
                      </div>
                    );
                  }
                })}
              {!userDetails && (
                <div
                  className={styles.withoutLoginSection}
                  onClick={() => this.redirectToLoginPage()}
                >
                  <div className={styles.addressHeaderWithoutLogin}>
                    <span>Sign In</span> to view saved addresses
                  </div>
                </div>
              )}
            </div>
            {userDetails && listOfAllPinCode && listOfAllPinCode.length > 2 && (
              <div
                className={styles.moreAddress}
                onClick={() => this.onClick()}
              >{`+ ${listOfAllPinCode.length - 2} more saved addresses`}</div>
            )}
          </div>
        )}
      </React.Fragment>
    ) : (
      <React.Fragment>
        {this.state.showDropDown && (
          <div className={styles.pincodeListDropDownForNotDefault}>
            <div className={styles.listOfPincode}>
              {userDetails &&
                listOfAllPinCode &&
                listOfAllPinCode.map((val, i) => {
                  if (i < 2) {
                    return (
                      <div
                        className={styles.dropdownList}
                        onClick={() => this.dropDownClick(val.postalCode)}
                      >
                        <div className={styles.addressHeader}>
                          {val.addressType}
                        </div>
                        <div className={styles.addressDetails}>
                          <span className={styles.pinSection}>
                            {val.postalCode}
                          </span>
                          ,{val.line1},{val.town},{val.state}
                        </div>
                      </div>
                    );
                  }
                })}
              {!userDetails && (
                <div
                  className={styles.withoutLoginSection}
                  onClick={() => this.redirectToLoginPage()}
                >
                  <div className={styles.addressHeaderWithoutLogin}>
                    <span>Sign In</span> to view saved addresses
                  </div>
                </div>
              )}
            </div>
            {userDetails && listOfAllPinCode && listOfAllPinCode.length > 2 && (
              <div
                className={styles.moreAddress}
                onClick={() => this.onClick()}
              >{`+ ${listOfAllPinCode.length - 2} more saved addresses`}</div>
            )}
          </div>
        )}
        <div className={styles["pin-code-heading"]}>SHIP TO</div>
        <div className={styles["pin-code-change-block"]}>
          <div className={styles["pin-code-change-input"]}>
            <Input2
              placeholder={"Enter Pincode"}
              boxy={true}
              textStyle={{ fontSize: 16, fontWeight: 500 }}
              height={25}
              maxLength={"6"}
              onChange={val => this.onChange(val)}
              onlyNumber={true}
              border={"none"}
              value={this.state.pincode}
              noPadding={true}
              onKeyUp={event => {
                this.enterPassword(event.key);
              }}
            />
          </div>
          <div className={styles["pin-code-change-button-block"]}>
            <div
              className={styles["pin-code-change-button"]}
              onClick={() => this.onCheckPinCode(this.state.pincode)}
            >
              Check
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
