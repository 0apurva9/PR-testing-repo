import React from "react";
import styles from "./AddDeliveryAddress.css";
import PropTypes from "prop-types";
import Input2 from "../../general/components/Input2.js";
import Icon from "../../xelpmoc-core/Icon";
import SelectBoxMobile2 from "../../general/components/SelectBoxMobile2";
import CircleButton from "../../xelpmoc-core/CircleButton";
import informationIcon from "../../general/components/img/GPS.svg";
import GridSelect from "../../general/components/GridSelect";
import CheckboxAndText from "./CheckboxAndText";
import TextArea from "../../general/components/TextArea.js";
import cloneDeep from "lodash.clonedeep";
import UnderLinedButton from "../../general/components/UnderLinedButton";
import Button from "../../general/components/Button";
import { SUCCESS, ERROR } from "../../lib/constants.js";
import SelectBoxMobile from "../../general/components/SelectBoxMobile";
import {
  EMAIL_REGULAR_EXPRESSION,
  MOBILE_PATTERN
} from "../../auth/components/Login";
import * as UserAgent from "../../lib/UserAgent.js";
import * as Cookie from "../../lib/Cookie";
import AddEmailAddress from "../components/AddEmailAddress";
import DesktopOnly from "../../general/components/DesktopOnly";
import MobileOnly from "../../general/components/MobileOnly";
import CheckOutHeader from "./CheckOutHeader.js";
import CancelAndContinueButton from "../../account/components/CancelAndContinueButton";
import DesktopCheckout from "./DesktopCheckout";
import ReturnAndOrderCancelWrapper from "../../return/components/ReturnAndOrderCancelWrapper";
import {
  SAVE_TEXT,
  PINCODE_TEXT,
  NAME_TEXT,
  LAST_NAME_TEXT,
  ADDRESS_TEXT,
  ADDRESS_VALIDATION_TEXT,
  ADDRESS_MINLENGTH_VALID_TEXT,
  ADDRESS_MAXLENGTH_VALID_TEXT,
  EMAIL_TEXT,
  LANDMARK_TEXT,
  LANDMARK_ENTER_TEXT,
  MOBILE_TEXT,
  PINCODE_VALID_TEXT,
  EMAIL_VALID_TEXT,
  PHONE_VALID_TEXT,
  PHONE_TEXT,
  CITY_TEXT,
  STATE_TEXT,
  SELECT_ADDRESS_TYPE,
  ISO_CODE,
  OTHER_LANDMARK,
  ADDRESS_VALIDATION,
  NAME_VALIDATION,
  MY_ACCOUNT_ADDRESS_ADD_PAGE,
  MY_ACCOUNT,
  LOGGED_IN_USER_DETAILS,
  CUSTOMER_ACCESS_TOKEN,
  MY_ACCOUNT_ADDRESS_PAGE
} from "../../lib/constants";
const DISCLAIMER =
  "Safe and secure payments. Easy returns. 100% Authentic products.";
export default class AddDeliveryAddress extends React.Component {
  constructor(props) {
    super(props);
    const getUrl = this.props.history.location.pathname;
    this.state = {
      flag:
        `${MY_ACCOUNT}${MY_ACCOUNT_ADDRESS_ADD_PAGE}` === getUrl &&
        !UserAgent.checkUserAgentIsMobile()
          ? true
          : false,
      countryIso: ISO_CODE,
      addressType: "Home",
      phone: "",
      firstName: "",
      lastName: "",
      postalCode: "",
      line1: "",
      state: "",
      emailId: "",
      line2: "",
      line3: "",
      town: "",
      defaultFlag: true,
      isOtherLandMarkSelected: false,
      selectedLandmarkLabel: "Landmark",
      landmarkList: [],
      userEmailId: "",
      isEnable: false
    };
  }
  handleOnFocusInput() {
    if (this.props.onFocusInput) {
      this.props.onFocusInput();
    }
  }

  componentDidMount() {
    if (this.props.getUserDetails) {
      this.props.getUserDetails();
    }
  }

  getPinCodeDetails = val => {
    let landmarkList = [];
    if (val.length <= 6) {
      this.setState({
        postalCode: val,
        state: "",
        town: "",
        landmarkList,
        isEnable: false,
        line2: ""
      });
    }
    if (val.length === 6 && this.props.getPinCode) {
      this.setState({ isEnable: true });
      this.props.getPinCode(val);
    }
  };
  handlePhoneInput(val) {
    if (val.length <= 10) {
      const cloneAddress = cloneDeep(this.state);
      Object.assign(cloneAddress, { phone: val });
      this.setState({ phone: val });
      if (this.props.getAddressDetails) {
        this.props.getAddressDetails(cloneAddress);
      }
    }
  }

  onChangeEmailId(val) {
    const cloneAddress = cloneDeep(this.state);
    Object.assign(cloneAddress, { emailId: val });
    this.setState({ emailId: val });
    if (this.props.getAddressDetails) {
      this.props.getAddressDetails(cloneAddress);
    }
  }
  onChange(val) {
    this.setState(val);
    if (this.props.getAddressDetails) {
      const cloneAddress = cloneDeep(this.state);
      Object.assign(cloneAddress, val);
      this.props.getAddressDetails(cloneAddress);
    }
  }
  onChangeDefaultFlag() {
    this.setState(prevState => ({
      defaultFlag: !prevState.defaultFlag
    }));
    if (this.props.getAddressDetails) {
      const cloneAddress = cloneDeep(this.state);
      Object.assign(cloneAddress, { defaultFlag: this.state.defaultFlag });
      this.props.getAddressDetails(cloneAddress);
    }
  }
  componentWillUnmount() {
    if (this.props.resetAddAddressDetails) {
      this.props.resetAddAddressDetails();
    }
    if (this.props.resetAutoPopulateDataForPinCode) {
      this.props.resetAutoPopulateDataForPinCode();
    }
  }
  componentWillReceiveProps(nextProps) {
    let landmarkList = [];
    if (nextProps.addUserAddressStatus === SUCCESS) {
      this.props.history.goBack();
    }
    if (nextProps.getPincodeStatus === ERROR) {
      landmarkList = [{ landmark: OTHER_LANDMARK }];
      this.setState({
        state: "",
        town: "",
        landmarkList
      });
    }
    if (nextProps.userDetails) {
      this.setState({
        userEmailId: nextProps.userDetails.emailID
          ? nextProps.userDetails.emailID
          : ""
      });
    }
    if (nextProps.getPincodeStatus === SUCCESS && nextProps.getPinCodeDetails) {
      if (nextProps.getPinCodeDetails.landMarks) {
        landmarkList = [
          ...nextProps.getPinCodeDetails.landMarks,
          { landmark: OTHER_LANDMARK }
        ];
        this.setState({
          state:
            nextProps.getPinCodeDetails &&
            nextProps.getPinCodeDetails.state &&
            nextProps.getPinCodeDetails.state.name,
          town:
            nextProps.getPinCodeDetails && nextProps.getPinCodeDetails.cityName,
          landmarkList
        });
      } else {
        landmarkList = [{ landmark: OTHER_LANDMARK }];
        let stateName =
          nextProps.getPinCodeDetails &&
          nextProps.getPinCodeDetails.state &&
          nextProps.getPinCodeDetails.state.name
            ? nextProps.getPinCodeDetails.state.name
            : "";
        let townName =
          nextProps.getPinCodeDetails && nextProps.getPinCodeDetails.cityName
            ? nextProps.getPinCodeDetails.cityName
            : "";
        this.setState({
          state: stateName,
          town: townName,
          landmarkList
        });
      }
    }
  }
  onSelectLandmark = landmark => {
    if (landmark.value === OTHER_LANDMARK) {
      if (this.props.clearPinCodeStatus) {
        this.props.clearPinCodeStatus();
      }

      this.setState({
        isOtherLandMarkSelected: true,
        selectedLandmarkLabel: landmark.value
      });
    } else {
      this.setState({
        isOtherLandMarkSelected: false,
        landmark: landmark.value,
        selectedLandmarkLabel: landmark.value
      });
    }
  };
  handleCancel() {
    if (this.props.handleCancelAddress) {
      this.props.handleCancelAddress();
    }
  }
  onAddressPage() {
    this.props.history.push(`${MY_ACCOUNT}${MY_ACCOUNT_ADDRESS_PAGE}`);
  }
  addNewAddress = () => {
    if (!this.state.postalCode) {
      this.props.displayToast(PINCODE_TEXT);
      return false;
    }
    if (this.state.postalCode && this.state.postalCode.length < 6) {
      this.props.displayToast(PINCODE_VALID_TEXT);
      return false;
    }
    if (
      !this.state.firstName.trim() ||
      !NAME_VALIDATION.test(this.state.firstName.trim())
    ) {
      this.props.displayToast(NAME_TEXT);
      return false;
    }
    if (
      !this.state.lastName.trim() ||
      !NAME_VALIDATION.test(this.state.lastName.trim())
    ) {
      this.props.displayToast(LAST_NAME_TEXT);
      return false;
    }
    if (!this.state.line1.trim()) {
      this.props.displayToast(ADDRESS_TEXT);
      return false;
    }
    if (this.state.line1.length < 15) {
      this.props.displayToast(ADDRESS_MINLENGTH_VALID_TEXT);
      return false;
    }
    if (this.state.line1.length > 120) {
      this.props.displayToast(ADDRESS_MAXLENGTH_VALID_TEXT);
      return false;
    }
    if (!ADDRESS_VALIDATION.test(this.state.line1.trim())) {
      this.props.displayToast(ADDRESS_VALIDATION_TEXT);
      return false;
    }

    if (!this.state.town) {
      this.props.displayToast(CITY_TEXT);
      return false;
    }
    if (!this.state.state) {
      this.props.displayToast(STATE_TEXT);
      return false;
    }
    if (!this.state.phone) {
      this.props.displayToast(PHONE_TEXT);
      return false;
    }
    if (this.state.phone && !MOBILE_PATTERN.test(this.state.phone)) {
      this.props.displayToast(PHONE_VALID_TEXT);
      return false;
    }
    if (!this.state.addressType) {
      this.props.displayToast(SELECT_ADDRESS_TYPE);
      return false;
    }
    if (
      !this.state.userEmailId &&
      !this.state.emailId &&
      this.state.emailId === ""
    ) {
      this.props.displayToast("Please enter the EmailId");
      return false;
    }
    if (
      this.state.emailId &&
      this.state.emailId !== "" &&
      !EMAIL_REGULAR_EXPRESSION.test(this.state.emailId)
    ) {
      this.props.displayToast(EMAIL_VALID_TEXT);
      return false;
    } else {
      const addressObj = cloneDeep(this.state);
      let firstName = addressObj.firstName;
      let salutation = addressObj.salutation;
      if (salutation) {
        Object.assign(addressObj, {
          firstName: `${salutation} ${firstName}`
        });
      }
      this.props.addUserAddress(addressObj);
    }
  };

  clearAllValue = () => {
    this.setState({
      postalCode: "",
      firstName: "",
      lastName: "",
      line2: "",
      town: "",
      state: "",
      phone: "",
      line1: " ",
      titleValue: "",
      addressType: "",
      defaultFlag: false,
      landmarkList: [],
      emailId: "",
      isEnable: false
    });
  };
  onChangeSalutation(val) {
    this.setState({ salutation: val.value });
  }
  render() {
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    if (!userDetails || !customerCookie) {
      return this.navigateToLogin();
    }
    if (this.props.loading) {
      if (this.props.showSecondaryLoader) {
        this.props.showSecondaryLoader();
      }
    } else {
      if (this.props.hideSecondaryLoader) {
        this.props.hideSecondaryLoader();
      }
    }

    const dataLabel = [
      {
        label: "Home"
      },
      {
        label: "Office"
      }
    ];

    return (
      <React.Fragment>
        {!this.state.flag && (
          <div className={!this.props.label ? styles.onlyLeft : styles.base}>
            <div className={styles.pageCenter}>
              <div className={styles.leftSection}>
                <div className={styles.formHolder}>
                  <div className={styles.addressInnerBox}>
                    <DesktopOnly>
                      <div className={styles.header}>
                        <CheckOutHeader
                          confirmTitle="Choose delivery address "
                          indexNumber={"1"}
                        />
                      </div>
                    </DesktopOnly>
                    <MobileOnly>
                      <div className={styles.headingText}>
                        {this.props.heading}
                      </div>
                    </MobileOnly>
                    <div className={styles.button} onClick={this.clearAllValue}>
                      <UnderLinedButton label="Clear all" />
                    </div>
                  </div>
                  <div className={styles.content}>
                    <Input2
                      placeholder="Enter your PIN code*"
                      onChange={postalCode =>
                        this.getPinCodeDetails(postalCode)
                      }
                      textStyle={{ fontSize: 14 }}
                      value={
                        this.props.postalCode
                          ? this.props.postalCode
                          : this.state.postalCode
                      }
                      maxLength={"6"}
                      onlyNumber={true}
                      height={33}
                      rightChildSize={33}
                      onFocus={() => {
                        this.handleOnFocusInput();
                      }}
                    />
                  </div>
                  <div className={styles.content}>
                    <Input2
                      option={this.state.options}
                      placeholder="First Name*"
                      value={
                        this.props.firstName
                          ? this.props.firstName
                          : this.state.firstName
                      }
                      onChange={firstName => this.onChange({ firstName })}
                      textStyle={{ fontSize: 14 }}
                      height={33}
                      onFocus={() => {
                        this.handleOnFocusInput();
                      }}
                      onlyAlphabet={true}
                    />
                  </div>
                  <div className={styles.threeSection}>
                    <div className={styles.content}>
                      <div className={styles.leftFirst}>
                        <Input2
                          boxy={true}
                          placeholder="Last Name*"
                          value={
                            this.props.lastName
                              ? this.props.lastName
                              : this.state.lastName
                          }
                          onChange={lastName => this.onChange({ lastName })}
                          textStyle={{ fontSize: 14 }}
                          height={33}
                          onFocus={() => {
                            this.handleOnFocusInput();
                          }}
                          onlyAlphabet={true}
                        />
                      </div>
                      <DesktopOnly>
                        <div className={styles.leftSecond}>
                          <SelectBoxMobile2
                            height={33}
                            placeholder={"Landmark"}
                            options={
                              this.state.landmarkList.length > 0 &&
                              this.state.landmarkList.map((val, i) => {
                                return {
                                  value: val && val.landmark,
                                  label: val && val.landmark
                                };
                              })
                            }
                            isEnable={this.state.isEnable}
                            onChange={landmark =>
                              this.onSelectLandmark(landmark)
                            }
                          />
                        </div>
                        {this.state.isOtherLandMarkSelected && (
                          <div className={styles.leftSecond}>
                            <Input2
                              boxy={true}
                              placeholder="Landmark*"
                              value={
                                this.props.line2
                                  ? this.props.line2
                                  : this.state.line2
                              }
                              onChange={line2 => this.onChange({ line2 })}
                              textStyle={{ fontSize: 14 }}
                              height={33}
                              onFocus={() => {
                                this.handleOnFocusInput();
                              }}
                            />
                          </div>
                        )}
                      </DesktopOnly>
                    </div>
                    <div className={styles.content}>
                      <TextArea
                        placeholder="Address*"
                        value={
                          this.props.line1 ? this.props.line1 : this.state.line1
                        }
                        onChange={line1 => this.onChange({ line1 })}
                        onFocus={() => {
                          this.handleOnFocusInput();
                        }}
                      />
                    </div>
                    <MobileOnly>
                      <div className={styles.validAddress}>
                        Character Limit : 120
                      </div>
                      <div className={styles.validAddress}>
                        Special characters allowed are - # & ( ) ' ' . , \ / + _
                      </div>
                    </MobileOnly>
                  </div>
                  <MobileOnly>
                    <div className={styles.content}>
                      <SelectBoxMobile2
                        height={33}
                        placeholder={"Landmark"}
                        options={
                          this.state.landmarkList.length > 0 &&
                          this.state.landmarkList.map((val, i) => {
                            return {
                              value: val && val.landmark,
                              label: val && val.landmark
                            };
                          })
                        }
                        isEnable={this.state.isEnable}
                        onChange={landmark => this.onSelectLandmark(landmark)}
                      />
                    </div>
                    {this.state.isOtherLandMarkSelected && (
                      <div className={styles.content}>
                        <Input2
                          boxy={true}
                          placeholder="Landmark*"
                          value={
                            this.props.line2
                              ? this.props.line2
                              : this.state.line2
                          }
                          onChange={line2 => this.onChange({ line2 })}
                          textStyle={{ fontSize: 14 }}
                          height={33}
                          onFocus={() => {
                            this.handleOnFocusInput();
                          }}
                        />
                      </div>
                    )}
                  </MobileOnly>
                  <div className={styles.content}>
                    <Input2
                      boxy={true}
                      placeholder="City/district*"
                      value={
                        this.props.town && this.props.town !== ""
                          ? this.props.town
                          : this.state.town
                      }
                      onChange={town => this.onChange({ town })}
                      textStyle={{ fontSize: 14 }}
                      height={33}
                      onFocus={() => {
                        this.handleOnFocusInput();
                      }}
                    />
                  </div>
                  <div className={styles.content}>
                    <Input2
                      placeholder="State*"
                      value={
                        this.props.state && this.props.state !== ""
                          ? this.props.state
                          : this.state.state
                      }
                      boxy={true}
                      onChange={state => this.onChange({ state })}
                      textStyle={{ fontSize: 14 }}
                      height={33}
                      onFocus={() => {
                        this.handleOnFocusInput();
                      }}
                    />
                  </div>
                  <MobileOnly>
                    <div className={styles.content}>
                      <Input2
                        onlyNumber={true}
                        placeholder="Phone number*"
                        value={
                          this.props.phone ? this.props.phone : this.state.phone
                        }
                        boxy={true}
                        onChange={phone => this.handlePhoneInput(phone)}
                        textStyle={{ fontSize: 14 }}
                        height={33}
                        onFocus={() => {
                          this.handleOnFocusInput();
                        }}
                      />
                    </div>
                  </MobileOnly>
                  <div className={styles.content}>
                    <GridSelect
                      limit={1}
                      offset={0}
                      elementWidthMobile={50}
                      elementWidthDesktop={50}
                      onSelect={val => this.onChange({ addressType: val[0] })}
                      selected={[this.state.addressType]}
                    >
                      {dataLabel.map((val, i) => {
                        return (
                          <CheckboxAndText
                            key={i}
                            label={val.label}
                            value={val.label}
                          />
                        );
                      })}
                    </GridSelect>
                  </div>
                  <DesktopOnly>
                    <div className={styles.content}>
                      <Input2
                        onlyNumber={true}
                        placeholder="Phone number*"
                        value={
                          this.props.phone ? this.props.phone : this.state.phone
                        }
                        boxy={true}
                        onChange={phone => this.handlePhoneInput(phone)}
                        textStyle={{ fontSize: 14 }}
                        height={33}
                        onFocus={() => {
                          this.handleOnFocusInput();
                        }}
                      />
                    </div>
                  </DesktopOnly>
                  <div className={styles.defaultText}>
                    <div className={styles.defaultTextWithButton}>
                      <CheckboxAndText
                        label="Make this default address"
                        selected={this.state.defaultFlag}
                        selectItem={() => this.onChangeDefaultFlag()}
                      />
                    </div>
                    <DesktopOnly>
                      <div className={styles.buttonHolder}>
                        <CancelAndContinueButton
                          continueText={"Save & Continue"}
                          handleCancel={() => this.handleCancel()}
                          handleContinue={() => this.addNewAddress()}
                        />
                      </div>
                    </DesktopOnly>
                  </div>
                </div>
                {!this.state.userEmailId &&
                  this.state.userEmailId === "" && (
                    <div className={styles.emailHolder}>
                      <AddEmailAddress
                        value={
                          this.props.emailId
                            ? this.props.emailId
                            : this.state.emailId
                        }
                        onChange={emailId => this.onChangeEmailId(emailId)}
                      />
                    </div>
                  )}
                <MobileOnly>
                  <div className={styles.buttonHolder}>
                    <div className={styles.saveAndContinueButton}>
                      {!this.props.isFirstAddress && (
                        <Button
                          type="primary"
                          label={SAVE_TEXT}
                          width={176}
                          height={38}
                          onClick={() => this.addNewAddress()}
                          textStyle={{ color: "#FFF", fontSize: 14 }}
                        />
                      )}
                    </div>
                  </div>
                </MobileOnly>
              </div>
              <DesktopOnly>
                {this.props &&
                  this.props.label && (
                    <div className={styles.rightSection}>
                      <DesktopCheckout
                        onContinue={false}
                        padding={this.props.padding}
                        disabled={this.props.disabled}
                        label={this.props.label}
                        noCostEmiEligibility={this.props.noCostEmiEligibility}
                        isNoCostEmiApplied={this.props.isNoCostEmiApplied}
                        noCostEmiDiscount={this.props.noCostEmiDiscount}
                        amount={this.props.amount}
                        bagTotal={this.props.bagTotal}
                        payable={this.props.payable}
                        coupons={this.props.coupons}
                        discount={this.props.discount}
                        delivery={this.props.delivery}
                        showDetails={this.props.showCartDetails}
                        showHideDetails={this.props.showHideDetails}
                        onCheckout={() => this.handleCancel()}
                        isCliqCashApplied={this.props.isCliqCashApplied}
                        cliqCashPaidAmount={this.props.cliqCashPaidAmount}
                      />
                      <div className={styles.disclaimer}>{DISCLAIMER}</div>
                    </div>
                  )}
              </DesktopOnly>
            </div>
          </div>
        )}
        {this.state.flag && (
          <div className={styles.formHolder1}>
            <ReturnAndOrderCancelWrapper
              userDetails={userDetails}
              history={this.props.history}
              userAddress={this.props.userAddress}
            >
              <div className={styles.addAddressHolder}>
                <div className={styles.addressInnerBox1}>
                  <DesktopOnly>
                    <div className={styles.header}>
                      <CheckOutHeader
                        confirmTitle="Add Address "
                        indexNumber={"0"}
                      />
                    </div>
                  </DesktopOnly>

                  <div className={styles.button} onClick={this.clearAllValue}>
                    <UnderLinedButton label="Clear all" />
                  </div>
                </div>
                <div className={styles.contentAddAddress}>
                  <Input2
                    placeholder="Enter your PIN code*"
                    onChange={postalCode => this.getPinCodeDetails(postalCode)}
                    textStyle={{ fontSize: 14 }}
                    value={
                      this.props.postalCode
                        ? this.props.postalCode
                        : this.state.postalCode
                    }
                    maxLength={"6"}
                    onlyNumber={true}
                    height={33}
                    rightChildSize={33}
                    onFocus={() => {
                      this.handleOnFocusInput();
                    }}
                  />
                </div>
                <div className={styles.contentAddAddress}>
                  <Input2
                    option={this.state.options}
                    placeholder="First Name*"
                    value={
                      this.props.firstName
                        ? this.props.firstName
                        : this.state.firstName
                    }
                    onChange={firstName => this.onChange({ firstName })}
                    textStyle={{ fontSize: 14 }}
                    height={33}
                    onFocus={() => {
                      this.handleOnFocusInput();
                    }}
                    onlyAlphabet={true}
                  />
                </div>
                <div className={styles.threeSection}>
                  <div className={styles.contentAddAddress}>
                    <div className={styles.leftFirst}>
                      <Input2
                        boxy={true}
                        placeholder="Last Name*"
                        value={
                          this.props.lastName
                            ? this.props.lastName
                            : this.state.lastName
                        }
                        onChange={lastName => this.onChange({ lastName })}
                        textStyle={{ fontSize: 14 }}
                        height={33}
                        onFocus={() => {
                          this.handleOnFocusInput();
                        }}
                        onlyAlphabet={true}
                      />
                    </div>
                    <div className={styles.contentAddAddress}>
                      <TextArea
                        placeholder="Address*"
                        value={
                          this.props.line1 ? this.props.line1 : this.state.line1
                        }
                        onChange={line1 => this.onChange({ line1 })}
                        onFocus={() => {
                          this.handleOnFocusInput();
                        }}
                      />
                    </div>
                    <DesktopOnly>
                      <div className={styles.leftSecond}>
                        <SelectBoxMobile2
                          height={33}
                          placeholder={"Landmark"}
                          options={
                            this.state.landmarkList.length > 0 &&
                            this.state.landmarkList.map((val, i) => {
                              return {
                                value: val && val.landmark,
                                label: val && val.landmark
                              };
                            })
                          }
                          isEnable={this.state.isEnable}
                          onChange={landmark => this.onSelectLandmark(landmark)}
                        />
                      </div>
                      {this.state.isOtherLandMarkSelected && (
                        <div className={styles.leftSecond}>
                          <Input2
                            boxy={true}
                            placeholder="Landmark*"
                            value={
                              this.props.line2
                                ? this.props.line2
                                : this.state.line2
                            }
                            onChange={line2 => this.onChange({ line2 })}
                            textStyle={{ fontSize: 14 }}
                            height={33}
                            onFocus={() => {
                              this.handleOnFocusInput();
                            }}
                          />
                        </div>
                      )}
                    </DesktopOnly>
                  </div>
                </div>

                <div className={styles.contentAddAddress}>
                  <Input2
                    boxy={true}
                    placeholder="City/district*"
                    value={
                      this.props.town && this.props.town !== ""
                        ? this.props.town
                        : this.state.town
                    }
                    onChange={town => this.onChange({ town })}
                    textStyle={{ fontSize: 14 }}
                    height={33}
                    onFocus={() => {
                      this.handleOnFocusInput();
                    }}
                  />
                </div>
                <div className={styles.contentAddAddress}>
                  <Input2
                    placeholder="State*"
                    value={
                      this.props.state && this.props.state !== ""
                        ? this.props.state
                        : this.state.state
                    }
                    boxy={true}
                    onChange={state => this.onChange({ state })}
                    textStyle={{ fontSize: 14 }}
                    height={33}
                    onFocus={() => {
                      this.handleOnFocusInput();
                    }}
                  />
                </div>
                <DesktopOnly>
                  <div className={styles.contentAddAddress}>
                    <Input2
                      onlyNumber={true}
                      placeholder="Phone number*"
                      value={
                        this.props.phone ? this.props.phone : this.state.phone
                      }
                      boxy={true}
                      onChange={phone => this.handlePhoneInput(phone)}
                      textStyle={{ fontSize: 14 }}
                      height={33}
                      onFocus={() => {
                        this.handleOnFocusInput();
                      }}
                    />
                  </div>
                </DesktopOnly>
                <div className={styles.contentAddAddress}>
                  <GridSelect
                    limit={1}
                    offset={0}
                    elementWidthMobile={50}
                    elementWidthDesktop={50}
                    onSelect={val => this.onChange({ addressType: val[0] })}
                    selected={[this.state.addressType]}
                  >
                    {dataLabel.map((val, i) => {
                      return (
                        <CheckboxAndText
                          key={i}
                          label={val.label}
                          value={val.label}
                        />
                      );
                    })}
                  </GridSelect>
                </div>

                <div className={styles.defaultTextSpecial}>
                  <div className={styles.defaultTextWithButton1}>
                    <CheckboxAndText
                      label="Make this default address"
                      selected={this.state.defaultFlag}
                      selectItem={() => this.onChangeDefaultFlag()}
                    />
                  </div>
                  <DesktopOnly>
                    <div className={styles.defaultTextWithButton1}>
                      <CancelAndContinueButton
                        isEditAddress={true}
                        continueText={"Save & Continue"}
                        handleCancel={() => this.onAddressPage()}
                        handleContinue={() => this.addNewAddress()}
                      />
                    </div>
                  </DesktopOnly>
                </div>
              </div>
            </ReturnAndOrderCancelWrapper>
          </div>
        )}
      </React.Fragment>
    );
  }
}
AddDeliveryAddress.propTypes = {
  onClick: PropTypes.func,
  saveDefaultTextItem: PropTypes.string,
  selected: PropTypes.bool,
  onSaveData: PropTypes.func,
  heading: PropTypes.string,
  home: PropTypes.string,
  office: PropTypes.string,
  other: PropTypes.string,
  default: PropTypes.string,
  clearAllValue: PropTypes.func,
  buttonText: PropTypes.string,
  options: PropTypes.string,
  titleValue: PropTypes.string
};
AddDeliveryAddress.defaultProps = {
  heading: "Add address",
  defaultAddress: false,
  notRenderMyAccount: true
};
