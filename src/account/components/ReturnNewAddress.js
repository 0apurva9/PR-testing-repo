import React from "react";
import styles from "../../cart/components/AddDeliveryAddress.css";
import PropTypes from "prop-types";
import Input2 from "../../general/components/Input2.js";
import ControlInput from "../../general/components/ControlInput";
import Icon from "../../xelpmoc-core/Icon";
import SelectBoxMobile2 from "../../general/components/SelectBoxMobile2";
import CircleButton from "../../xelpmoc-core/CircleButton";
import informationIcon from "../../general/components/img/GPS.svg";
import GridSelect from "../../general/components/GridSelect";
import CheckboxAndText from "../../cart/components/CheckboxAndText";
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
//import AddEmailAddress from "../components/AddEmailAddress";
import DesktopOnly from "../../general/components/DesktopOnly";
import MobileOnly from "../../general/components/MobileOnly";
import CheckOutHeader from "../../cart/components/CheckOutHeader.js";
import CancelAndContinueButton from "../../account/components/CancelAndContinueButton";
import DesktopCheckout from "../../cart/components/DesktopCheckout";
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
  MY_ACCOUNT_ADDRESS_PAGE,
  LOGIN_PATH,
  PINCODE_NOT_SERVICEABLE_TEXT,
  CHECKOUT_ROUTER
} from "../../lib/constants";
import {
  setDataLayerForSelectedAddressTypeDirectCalls,
  ADOBE_DIRECT_CALL_FOR_CHOOSE_DELIVERY_ADDRESS_HOME,
  ADOBE_DIRECT_CALL_FOR_CHOOSE_DELIVERY_ADDRESS_OFFICE,
  setDataLayerForCheckoutDirectCalls,
  ADOBE_ADD_NEW_ADDRESS_ON_CHECKOUT_PAGE,
  ADOBE_ADD_NEW_ADDRESS_ON_MY_ACCOUNT_PAGE
} from "../../lib/adobeUtils";
const DISCLAIMER =
  "Safe and secure payments. Easy returns. 100% Authentic products.";
export default class ReturnNewAddress extends React.Component {
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
      isEnable: false,
      pinCodeFailure: false
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
    if (val === "" || /^[0-9]+$/.test(val)) {
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
    }
  };
  handlePhoneInput(val) {
    if (val === "" || /^[0-9]+$/.test(val)) {
      if (val.length <= 10) {
        const cloneAddress = cloneDeep(this.state);
        Object.assign(cloneAddress, { phone: val });
        this.setState({ phone: val });
        if (this.props.getAddressDetails) {
          this.props.getAddressDetails(cloneAddress);
        }
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
    if (val.firstName) {
      if (/^[a-zA-Z]+$/.test(val.firstName)) {
        this.setState(val);
      }
    } else if (val.lastName) {
      if (/^[a-zA-Z]+$/.test(val.lastName)) {
        this.setState(val);
      }
    } else {
      this.setState(val);
      if (
        this.props.history.location.pathname === CHECKOUT_ROUTER &&
        val &&
        val.addressType
      ) {
        if (val.addressType === "Home") {
          setDataLayerForSelectedAddressTypeDirectCalls(
            ADOBE_DIRECT_CALL_FOR_CHOOSE_DELIVERY_ADDRESS_HOME
          );
        } else {
          setDataLayerForSelectedAddressTypeDirectCalls(
            ADOBE_DIRECT_CALL_FOR_CHOOSE_DELIVERY_ADDRESS_OFFICE
          );
        }
      }
    }
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
      Object.assign(cloneAddress, {
        defaultFlag: this.state.defaultFlag
      });
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
      this.setState({ pinCodeFailure: true });
      if (this.props.clearPinCodeStatus) {
        this.props.clearPinCodeStatus();
      }
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
      this.setState({ pinCodeFailure: false });
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
    if (this.state.pinCodeFailure) {
      this.props.displayToast(PINCODE_NOT_SERVICEABLE_TEXT);
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
      const getUrl = this.props.history.location.pathname;
      if (this.props.history.location.pathname === CHECKOUT_ROUTER) {
        setDataLayerForCheckoutDirectCalls(
          ADOBE_ADD_NEW_ADDRESS_ON_CHECKOUT_PAGE
        );
      } else {
        setDataLayerForCheckoutDirectCalls(
          ADOBE_ADD_NEW_ADDRESS_ON_MY_ACCOUNT_PAGE
        );
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
        <div>Newwwwwwwwwwwwwww Addresssssssssssssssss</div>
      </React.Fragment>
    );
  }
}
ReturnNewAddress.propTypes = {
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
  titleValue: PropTypes.string,
  isReturn: PropTypes.bool
};
ReturnNewAddress.defaultProps = {
  heading: "Add address",
  defaultAddress: false,
  notRenderMyAccount: true,
  isReturn: false
};
