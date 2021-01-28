import React from "react";
import styles from "./ReturnAddressList.css";
import PropTypes from "prop-types";
import CheckBox from "../../general/components/CheckBox.js";
import ConfirmAddress from "../../cart/components/ConfirmAddress.js";
import ReturnsFrame from "./ReturnsFrame.js";
import filter from "lodash.filter";
import ReturnDateTime from "./ReturnDateTime.js";
import AddDeliveryAddress from "../../cart/components/AddDeliveryAddress.js";
import ReturnSummary from "./ReturnSummary.js";
import Error from "../../general/components/Error.js";
import MobileOnly from "../../general/components/MobileOnly.js";
import DesktopOnly from "../../general/components/DesktopOnly.js";
import { checkUserAgentIsMobile } from "../../lib/UserAgent.js";
import CancelAndContinueButton from "./CancelAndContinueButton";
import SelectedReasonForReturn from "./SelectedReasonForReturn";
import { RouterPropTypes } from "../../general/router-prop-types";
import {
  RETURN_CLIQ_PIQ,
  RETURN_CLIQ_PIQ_DATE,
  RETURNS_PREFIX,
  RETURNS_NEW_ADDRESS,
  RETURN_CLIQ_PIQ_RETURN_SUMMARY,
  SUCCESS,
  FAILURE,
  YES,
  NO,
  REQUESTING
} from "../../lib/constants";
import {
  setDataLayerForMyAccountDirectCalls,
  ADOBE_MY_ACCOUNT_ORDER_RETURN_CANCEL
} from "../../lib/adobeUtils";
const REG_X_FOR_ADDRESS = /address/i;
const REG_X_FOR_DATE_TIME = /dateTime/i;
const REG_X_FOR_NEW_ADDRESS = /addDeliveryLocation/i;
const REG_X_FOR_RETURN_SUMMARY = /returnSummary/i;
const PICK_UP_ADDRESS = "Select pick up Address";

export default class ReturnAddressList extends React.Component {
  constructor(props) {
    super(props);
    this.orderCode = props.location.pathname.split("/")[2];
    this.state = {
      selectedAddress: "",
      addressSelectedByUser: false,
      selectedDate: this.props.returnRequest
        ? this.props.returnRequest &&
          this.props.returnRequest.returnDates &&
          this.props.returnRequest.returnDates[0]
        : "",
      selectedTime: this.props.returnRequest
        ? this.props.returnRequest &&
          this.props.returnRequest.returnTimeSlots &&
          this.props.returnRequest.returnTimeSlots[0]
        : "",
      addNewAddress: false,
      errorMessage: "",
      error: false,
      userEmailId: "",
      isReturnAddressSelected: false,
      isReturnModeProcessCompleted: false
    };
  }

  getPinCodeDetails = pinCode => {
    if (this.props.getPinCode) {
      this.props.getPinCode(pinCode);
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.addUserAddressStatus === SUCCESS) {
      if (this.state.addNewAddress === true) {
        this.setState({ addNewAddress: false });
        if (checkUserAgentIsMobile()) {
          this.props.history.goBack();
        }
      }
    }
    if (nextProps.userDetails) {
      this.setState({ userEmailId: nextProps.userDetails.emailID });
    }

    if (nextProps.returnPinCodeStatus === FAILURE) {
      this.setState({
        errorMessage: nextProps.returnPinCodeError,
        error: true
      });
      if (checkUserAgentIsMobile()) {
        this.props.history.goBack();
      } else {
        this.setState({ isReturnModeProcessCompleted: false });
        if (this.props.cancelReturnMode) {
          this.props.cancelReturnMode();
        }
      }
    } else if (
      nextProps.returnPinCodeStatus === SUCCESS &&
      !this.state.addressSelectedByUser
    ) {
      this.setState({ addressSelectedByUser: true });
      if (checkUserAgentIsMobile()) {
        this.props.history.push(
          `${RETURNS_PREFIX}/${
            this.orderCode
          }${RETURN_CLIQ_PIQ}${RETURN_CLIQ_PIQ_DATE}`
        );
      }
    }
  }

  onSelectAddress = async selectedAddress => {
    this.setState({
      selectedAddress: ""
    });
    this.setState({ addressSelectedByUser: false });
    let addressSelected = filter(
      this.props.returnRequest.deliveryAddressesList,
      address => {
        return address.id === selectedAddress[0];
      }
    );
    let productObject = {};
    productObject.orderCode =
      this.props.returnProducts &&
      this.props.returnProducts.orderProductWsDTO &&
      this.props.returnProducts.orderProductWsDTO[0] &&
      this.props.returnProducts.orderProductWsDTO[0].sellerorderno;
    productObject.pinCode = addressSelected && addressSelected[0].postalCode;
    productObject.transactionId =
      this.props.returnProducts &&
      this.props.returnProducts.orderProductWsDTO &&
      this.props.returnProducts.orderProductWsDTO[0] &&
      this.props.returnProducts.orderProductWsDTO[0].transactionId;
    if (this.props.returnPinCode) {
      let returnPinCodeResponse = await this.props.returnPinCode(productObject);
      if (returnPinCodeResponse.status === SUCCESS) {
        this.setState({
          selectedAddress: addressSelected[0]
        });
      }
    }
  };

  handleCancelAddress = () => {
    this.setState({ addNewAddress: false });
  };

  addNewAddress = () => {
    this.setState({ addNewAddress: true });
    if (checkUserAgentIsMobile()) {
      this.props.history.push(
        `${RETURNS_PREFIX}/${
          this.orderCode
        }${RETURN_CLIQ_PIQ}${RETURNS_NEW_ADDRESS}`
      );
    }
  };

  renderAddress = () => {
    // let defaultAddress =
    //   this.props.returnRequest &&
    //   this.props.returnRequest.deliveryAddressesList &&
    //   this.props.returnRequest.deliveryAddressesList.find(address => {
    //     return address.defaultAddress === true;
    //   });
    if (this.props.returnRequest) {
      return (
        <ReturnsFrame
          headerText={PICK_UP_ADDRESS}
          onCancel={() => this.cancel()}
        >
          <div className={styles.addInitialAddAddress}>
            <ConfirmAddress
              address={
                this.props.returnRequest.deliveryAddressesList &&
                this.props.returnRequest.deliveryAddressesList.map(
                  addressSelected => {
                    return {
                      addressTitle: addressSelected.addressType,
                      addressDescription: `${
                        addressSelected.line1 ? addressSelected.line1 : ""
                      } ${addressSelected.town ? addressSelected.town : ""}, ${
                        addressSelected.state ? addressSelected.state : ""
                      } ${
                        addressSelected.postalCode
                          ? addressSelected.postalCode
                          : ""
                      }`,
                      value: addressSelected.id,
                      selected: addressSelected.defaultAddress
                    };
                  }
                )
              }
              onNewAddress={() => this.addNewAddress()}
              onSelectAddress={address => this.onSelectAddress(address)}
              isReturn={checkUserAgentIsMobile() ? false : true}
            />
          </div>
        </ReturnsFrame>
      );
    } else {
      return null;
    }
  };

  addAddress = address => {
    if (this.props.addUserAddress) {
      this.props.addUserAddress(address, true);
    }
  };

  renderNewAddress = () => {
    return (
      <div className={styles.base}>
        <AddDeliveryAddress
          isReturn={checkUserAgentIsMobile() ? false : true}
          label={checkUserAgentIsMobile() ? false : true}
          history={this.props.history}
          addUserAddress={address => this.addAddress(address)}
          handleCancelAddress={() => this.handleCancelAddress()}
          {...this.state}
          onChange={val => this.onChange(val)}
          displayToast={message => this.props.displayToast(message)}
          getPincodeStatus={this.props.getPincodeStatus}
          getPinCode={val => this.getPinCodeDetails(val)}
          getPinCodeDetails={this.props.getPinCodeDetails}
          resetAutoPopulateDataForPinCode={() =>
            this.props.resetAutoPopulateDataForPinCode()
          }
          getUserDetails={() => this.props.getUserDetails()}
          userDetails={this.props.userDetails}
          resetAddAddressDetails={() => this.props.resetAddAddressDetails()}
          clearPinCodeStatus={() => this.props.clearPinCodeStatus()}
        />
      </div>
    );
  };

  renderAddressCard = () => {
    return (
      <div className={styles.cardOffset}>
        <div className={styles.content}>
          <div className={styles.checkBoxHolder}>
            <CheckBox selected={true} />
          </div>

          <div className={styles.home}>
            {this.state.selectedAddress.addressType}
          </div>

          <div className={styles.addressDetails}>
            {this.state.selectedAddress.formattedAddress}
          </div>

          <div className={styles.address}>
            {this.state.selectedAddress.state}
          </div>
        </div>
      </div>
    );
  };

  onSelectTime = val => {
    this.setState({ selectedTime: val });
    if (checkUserAgentIsMobile()) {
      this.props.history.push(
        `${RETURNS_PREFIX}/${
          this.orderCode
        }${RETURN_CLIQ_PIQ}${RETURN_CLIQ_PIQ_RETURN_SUMMARY}`
      );
    }
  };

  renderDateTime = () => {
    if (this.props.returnRequest) {
      return (
        <ReturnDateTime
          timeSlot={this.props.returnRequest.returnTimeSlots}
          dateSlot={this.props.returnRequest.returnDates}
          selectedAddress={this.state.selectedAddress}
          onDateSelect={val => this.setState({ selectedDate: val })}
          onTimeSelect={val => this.onSelectTime(val)}
          onCancel={() => this.cancel()}
        />
      );
    } else {
      return null;
    }
  };

  newReturnInitiate = () => {
    let isCodOrder = NO;
    let reverseSealAvailable = "N";
    if (this.props.isCOD) {
      isCodOrder = YES;
    }
    let reasonAndCommentDetails = this.props.selectedReasonAndCommentObj
      ? this.props.selectedReasonAndCommentObj
      : this.props.data;
    if (
      reasonAndCommentDetails &&
      reasonAndCommentDetails.reverseSeal &&
      reasonAndCommentDetails.reverseSeal[0] === "Yes"
    ) {
      reverseSealAvailable = "Y";
    }
    let returnCliqAndPiqObject = {};
    returnCliqAndPiqObject.returnReasonCode =
      reasonAndCommentDetails.returnReasonCode;

    returnCliqAndPiqObject.refundType = "R";
    returnCliqAndPiqObject.isCODorder = isCodOrder;
    returnCliqAndPiqObject.orderCode = this.props.returnProducts.orderProductWsDTO[0].sellerorderno;
    returnCliqAndPiqObject.transactionId = this.props.returnProducts.orderProductWsDTO[0].transactionId;
    returnCliqAndPiqObject.ussid = this.props.returnProducts.orderProductWsDTO[0].USSID;
    returnCliqAndPiqObject.transactionType = "01";
    returnCliqAndPiqObject.returnMethod = "schedule";
    returnCliqAndPiqObject.subReasonCode =
      this.props &&
      this.props.selectedReasonAndCommentObj &&
      this.props.selectedReasonAndCommentObj.subReasonCode;
    returnCliqAndPiqObject.comment = reasonAndCommentDetails.comment;
    returnCliqAndPiqObject.addressType = this.state.selectedAddress.addressType;
    returnCliqAndPiqObject.firstName = this.state.selectedAddress.firstName;
    returnCliqAndPiqObject.lastName = this.state.selectedAddress.lastName;
    returnCliqAndPiqObject.addrLine1 = this.state.selectedAddress.line1;
    returnCliqAndPiqObject.addrLine2 = "";
    returnCliqAndPiqObject.addrLine3 = "";
    returnCliqAndPiqObject.landMark = this.state.selectedAddress.landmark;
    returnCliqAndPiqObject.pincode = this.state.selectedAddress.postalCode;
    returnCliqAndPiqObject.phoneNumber = this.state.selectedAddress.phone;
    returnCliqAndPiqObject.city = this.state.selectedAddress.town;
    returnCliqAndPiqObject.state = this.state.selectedAddress.state;
    returnCliqAndPiqObject.country = this.state.selectedAddress.country.name;
    returnCliqAndPiqObject.reverseSealAvailable = reverseSealAvailable;
    returnCliqAndPiqObject.isDefault = this.state.selectedAddress.returnPinCodeValues;
    returnCliqAndPiqObject.scheduleReturnDate = this.state.selectedDate;
    returnCliqAndPiqObject.scheduleReturnTime = this.state.selectedTime;
    if (isCodOrder === YES) {
      if (this.props.bankDetail) {
        returnCliqAndPiqObject.accountNumber = this.props.bankDetail.accountNumber;
        returnCliqAndPiqObject.reEnterAccountNumber = this.props.bankDetail.reEnterAccountNumber;
        returnCliqAndPiqObject.accountHolderName = this.props.bankDetail.userName;
        returnCliqAndPiqObject.bankName = this.props.bankDetail.bankName;
        returnCliqAndPiqObject.IFSCCode = this.props.bankDetail.code;
        if (this.props.returnRequest) {
          returnCliqAndPiqObject.refundMode =
            this.props.returnRequest.codSelfShipData &&
            this.props.returnRequest.codSelfShipData.paymentMode
              ? this.props.returnRequest.codSelfShipData.paymentMode
              : null;
          returnCliqAndPiqObject.title =
            this.props.returnRequest.codSelfShipData &&
            this.props.returnRequest.codSelfShipData.title
              ? this.props.returnRequest.codSelfShipData.title
              : null;
        }
      }
    }
    this.props.newReturnInitial(
      returnCliqAndPiqObject,
      this.props.returnProducts.orderProductWsDTO[0]
    );
  };

  renderReturnSummary = () => {
    return (
      <ReturnSummary
        onCancel={() => this.cancel()}
        onContinue={() => this.newReturnInitiate()}
        selectedAddress={this.state.selectedAddress}
        dateSelected={this.state.dateSelected}
        timeSelected={this.state.timeSelected}
        onChangeAddress={() => this.cancel()}
        returnProducts={this.props.returnProducts}
        returnRequest={this.props.returnRequest}
        orderDetails={this.props.orderDetails}
        isCod={this.props.isCOD}
        onChangeBankDetails={val => this.props.onChangeBankDetails(val)}
        isPaypal={this.props.isPaypal}
      />
    );
  };

  handleContinuePickUp = () => {
    if (!this.state.isReturnModeProcessCompleted) {
      if (
        this.state.selectedAddress !== "" &&
        this.state.selectedDate !== "" &&
        this.state.selectedTime !== ""
      ) {
        this.setState({ isReturnModeProcessCompleted: true });
        if (this.props.selectReturnMode) {
          this.props.selectReturnMode();
        }
      } else {
        this.props.displayToast("Please Select all detail.");
      }
    } else {
      this.newReturnInitiate();
    }
  };

  handleCancelPickUP = () => {
    this.setState({ isReturnModeProcessCompleted: false });
    if (this.props.cancelReturnMode) {
      this.props.cancelReturnMode();
    }
  };

  handleCancelForReturn = () => {
    this.setState({
      selectedAddress: "",
      selectedDate: "",
      selectedTime: "",
      isReturnModeProcessCompleted: false
    });
    this.props.cancelReturnMode();
  };

  cancel = () => {
    setDataLayerForMyAccountDirectCalls(ADOBE_MY_ACCOUNT_ORDER_RETURN_CANCEL);
    this.props.history.goBack();
  };

  render() {
    if (this.props.loading || this.props.returnPinCodeStatus === REQUESTING) {
      this.props.showSecondaryLoader();
    } else {
      this.props.hideSecondaryLoader();
    }

    if (this.props.returnRequest && this.props.returnProducts) {
      const { pathname } = this.props.location;
      return (
        <React.Fragment>
          <DesktopOnly>
            {!this.state.isReturnModeProcessCompleted &&
              !this.state.addNewAddress &&
              this.renderAddress()}
            {!this.state.isReturnModeProcessCompleted &&
              !this.state.addNewAddress &&
              this.state.selectedAddress && (
                <div className={styles.renderDateAndTime}>
                  {this.renderDateTime()}
                </div>
              )}
            {this.state.addNewAddress && this.renderNewAddress()}
            {this.state.isReturnModeProcessCompleted && (
              <React.Fragment>
                <SelectedReasonForReturn
                  header={"Select mode of return "}
                  title={this.state.selectedAddress.addressType}
                  titleDescription={`${this.state.selectedAddress.line1} ,${
                    this.state.selectedAddress.landmark
                  }`}
                  subTitleDescription={`${this.state.selectedAddress.city} ,${
                    this.state.selectedAddress.state
                  } ,${this.state.selectedAddress.postalCode}`}
                  date={this.state.selectedDate}
                  time={this.state.selectedTime}
                  handleCancel={() => this.handleCancelForReturn()}
                />
              </React.Fragment>
            )}
            {this.state.isReturnModeProcessCompleted &&
              this.renderReturnSummary()}
            {!this.state.addNewAddress && (
              <div className={styles.cancelPickUpButtonHolder}>
                <CancelAndContinueButton
                  handleCancel={() => this.handleCancelPickUP()}
                  handleContinue={() => this.handleContinuePickUp()}
                />
              </div>
            )}
          </DesktopOnly>
          <MobileOnly>
            <Error message={this.state.errorMessage} show={this.state.error} />
            <React.Fragment>
              {pathname.match(REG_X_FOR_ADDRESS) && this.renderAddress()}
              {pathname.match(REG_X_FOR_DATE_TIME) && this.renderDateTime()}
              {pathname.match(REG_X_FOR_NEW_ADDRESS) && this.renderNewAddress()}
              {pathname.match(REG_X_FOR_RETURN_SUMMARY) &&
                this.renderReturnSummary()}
            </React.Fragment>
          </MobileOnly>
        </React.Fragment>
      );
    } else {
      return null;
    }
  }
}
ReturnAddressList.propTypes = {
  getPinCode: PropTypes.func,
  displayToast: PropTypes.func,
  clearPinCodeStatus: PropTypes.func,
  onChangeBankDetails: PropTypes.func,
  isPaypal: PropTypes.bool,
  selectReturnMode: PropTypes.func,
  getPincodeStatus: PropTypes.string,
  getPinCodeDetails: PropTypes.object,
  orderDetails: PropTypes.object,
  getUserDetails: PropTypes.func,
  resetAutoPopulateDataForPinCode: PropTypes.func,
  resetAddAddressDetails: PropTypes.func,
  addUserAddress: PropTypes.func,
  addUserAddressStatus: PropTypes.string,
  returnPinCode: PropTypes.func,
  userDetails: PropTypes.shape({
    emailID: PropTypes.string
  }),
  returnPinCodeStatus: PropTypes.string,
  returnPinCodeError: PropTypes.string,
  address: PropTypes.string,
  subAddress: PropTypes.string,
  addressType: PropTypes.string,
  location: RouterPropTypes.location,
  history: RouterPropTypes.history,
  cancelReturnMode: PropTypes.func,
  selectedReasonAndCommentObj: PropTypes.shape({
    subReasonCode: PropTypes.string
  }),
  data: PropTypes.object,
  loading: PropTypes.bool,
  showSecondaryLoader: PropTypes.func,
  hideSecondaryLoader: PropTypes.func,
  newReturnInitial: PropTypes.func,
  returnRequest: PropTypes.shape({
    codSelfShipData: PropTypes.shape({
      paymentMode: PropTypes.string,
      title: PropTypes.string,
    }),
    returnDates: PropTypes.array,
    returnTimeSlots: PropTypes.array,
    deliveryAddressesList: PropTypes.array,

  }),
  isCOD: PropTypes.bool,
  bankDetail: PropTypes.shape({
    accountNumber: PropTypes.string,
    reEnterAccountNumber: PropTypes.string,
    userName: PropTypes.string,
    bankName: PropTypes.string,
    code: PropTypes.string,
  }),
  returnProducts: PropTypes.shape({
    orderProductWsDTO: PropTypes.arrayOf(
      PropTypes.shape({
        transactionId: PropTypes.string,
        USSID: PropTypes.string,
        sellerorderno: PropTypes.string
      })
    )
  })
};
