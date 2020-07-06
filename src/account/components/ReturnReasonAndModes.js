import React from "react";
import Loader from "../../general/components/Loader";
import ReturnReasonForm from "./ReturnReasonForm.js";
import ReplaceRefundSelection from "./ReplaceRefundSelection.js";
import ReturnBankForm from "./ReturnBankForm.js";
import ReturnModes from "./ReturnModes.js";
import {
  RETURNS_PREFIX,
  RETURN_LANDING,
  QUICK_DROP,
  RETURN_TO_STORE,
  RETURNS_STORE_MAP,
  RETURN_CLIQ_PIQ,
  SCHEDULED_PICKUP,
  RETURN_CLIQ_PIQ_ADDRESS,
  SELF_COURIER,
  RETURNS_SELF_COURIER,
  REPLACE_REFUND_SELECTION,
  MY_ACCOUNT_ADDRESS_EDIT_PAGE,
  ADDRESS_TEXT,
  ADDRESS_MINLENGTH_VALID_TEXT,
  ADDRESS_MAXLENGTH_VALID_TEXT,
  ADDRESS_VALIDATION_TEXT,
  CITY_TEXT,
  STATE_TEXT,
  PHONE_TEXT,
  PHONE_VALID_TEXT,
  SELECT_ADDRESS_TYPE,
  PINCODE_TEXT,
  PINCODE_VALID_TEXT,
  NAME_VALIDATION,
  NAME_TEXT,
  LAST_NAME_TEXT,
  ADDRESS_VALIDATION,
  EMAIL_VALID_TEXT,
  CUSTOMER_ACCESS_TOKEN,
  LOGGED_IN_USER_DETAILS,
  CART_DETAILS_FOR_LOGGED_IN_USER
} from "../../lib/constants";
import {
  EMAIL_REGULAR_EXPRESSION,
  MOBILE_PATTERN
} from "../../auth/components/Login";
import {
  setDataLayerForMyAccountDirectCalls,
  ADOBE_MY_ACCOUNT_ORDER_RETURN_CANCEL
} from "../../lib/adobeUtils";
import * as Cookie from "../../lib/Cookie";
import ReturnDateTime from "../../account/components/ReturnDateTime.js";
import format from "date-fns/format";
const REG_X_FOR_REASON = /reason/i;
const REG_X_FOR_MODES = /modes/i;
const dateFormat = "DD MMM YYYY";
const REG_X_FOR_RNRSELECTION = /replace-refund-selection/i;
const REG_X_FOR_BANKDETAILS = /bankDetail/i;

export default class ReturnReasonAndModes extends React.Component {
  constructor(props) {
    super();
    this.orderCode = props.location.pathname.split("/")[2];
    this.state = {
      isReasonSelected: false,
      selectedReason: null,
      selectedAddressId: ""
    };
  }
  renderLoader() {
    return <Loader />;
  }

  onCancel() {
    this.setState({ isReasonSelected: false });
    setDataLayerForMyAccountDirectCalls(ADOBE_MY_ACCOUNT_ORDER_RETURN_CANCEL);
    this.props.history.goBack();
  }
  onChange(val) {
    if (this.props.onChange) {
      this.props.onChange(val);
    }
  }

  onChangeBankDetails(val) {
    if (this.props.onChangeBankDetails) {
      this.props.onChangeBankDetails(val);
    }
  }
  renderToModes(data) {
    // if (!data.reason) {
    //   this.props.displayToast("Please select reason ");
    //   return false;
    // }
    if (
      this.props.returnProductDetails &&
      this.props.returnProductDetails.showReverseSealFrJwlry === "yes" &&
      !data.reverseSeal
    ) {
      this.props.displayToast("Please Select Reverse Seal ");
      return false;
    } else {
      this.setState({ isReasonSelected: true, selectedReason: data.reason });
      this.props.onChange({ data });
      this.props.history.push({
        pathname: `${RETURNS_PREFIX}/${this.orderCode}${RETURN_LANDING}${REPLACE_REFUND_SELECTION}`,
        state: {
          authorizedRequest: true
        }
      });
    }
  }
  onSelectMode(mode) {
    if (mode === QUICK_DROP) {
      this.props.history.push({
        pathname: `${RETURNS_PREFIX}/${this.orderCode}${RETURN_TO_STORE}${RETURNS_STORE_MAP}`,
        state: {
          authorizedRequest: true
        }
      });
    } else if (mode === SCHEDULED_PICKUP) {
      this.props.history.push({
        pathname: `${RETURNS_PREFIX}/${this.orderCode}${RETURN_CLIQ_PIQ}${RETURN_CLIQ_PIQ_ADDRESS}`,
        state: {
          authorizedRequest: true
        }
      });
    } else if (mode === SELF_COURIER) {
      this.props.history.push({
        pathname: `${RETURNS_PREFIX}/${this.orderCode}${RETURNS_SELF_COURIER}`,
        state: {
          authorizedRequest: true
        }
      });
    }
  }
  onSelectAddress(addressId) {
    this.setState({ selectedAddressId: addressId });
    this.props.addAddressToCart(addressId[0]);
  }

  handleCancelAddress() {
    this.setState({ addNewAddress: false });
    if (this.state.isFirstAddress) {
      this.props.history.push(MY_ACCOUNT_ADDRESS_EDIT_PAGE);
    }
  }

  addAddress = address => {
    if (!address) {
      this.props.displayToast("Please enter the valid details");
      return false;
    }
    if (address && !address.postalCode) {
      this.props.displayToast(PINCODE_TEXT);
      return false;
    }
    if (address && address.postalCode && address.postalCode.length < 6) {
      this.props.displayToast(PINCODE_VALID_TEXT);
      return false;
    }
    if (
      !address ||
      !address.firstName ||
      !address.firstName.trim() ||
      !NAME_VALIDATION.test(address.firstName.trim())
    ) {
      this.props.displayToast(NAME_TEXT);
      return false;
    }
    if (
      !address ||
      !address.lastName ||
      !address.lastName.trim() ||
      !NAME_VALIDATION.test(address.lastName.trim())
    ) {
      this.props.displayToast(LAST_NAME_TEXT);
      return false;
    }

    if (!address.line1 || !address.line1.trim()) {
      this.props.displayToast(ADDRESS_TEXT);
      return false;
    }

    if (address.line1.length < 15) {
      this.props.displayToast(ADDRESS_MINLENGTH_VALID_TEXT);
      return false;
    }
    if (address.line1.length > 120) {
      this.props.displayToast(ADDRESS_MAXLENGTH_VALID_TEXT);
      return false;
    }

    if (!ADDRESS_VALIDATION.test(address.line1.trim())) {
      this.props.displayToast(ADDRESS_VALIDATION_TEXT);
      return false;
    }

    if (address && !address.town) {
      this.props.displayToast(CITY_TEXT);
      return false;
    }
    if (address && !address.state) {
      this.props.displayToast(STATE_TEXT);
      return false;
    }
    if (address && !address.phone) {
      this.props.displayToast(PHONE_TEXT);
      return false;
    }
    if (address && !MOBILE_PATTERN.test(address.phone)) {
      this.props.displayToast(PHONE_VALID_TEXT);
      return false;
    }
    if (address && !address.addressType) {
      this.props.displayToast(SELECT_ADDRESS_TYPE);
      return false;
    }
    if (
      address.emailId &&
      address.emailId != "" &&
      !EMAIL_REGULAR_EXPRESSION.test(address.emailId)
    ) {
      this.props.displayToast(EMAIL_VALID_TEXT);
      return false;
    } else {
      if (this.props.addUserAddress) {
        let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
        let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
        let cartDetailsLoggedInUser = Cookie.getCookie(
          CART_DETAILS_FOR_LOGGED_IN_USER
        );
        let getCartDetailCNCObj = {
          userId: JSON.parse(userDetails).userName,
          accessToken: JSON.parse(customerCookie).access_token,
          cartId: JSON.parse(cartDetailsLoggedInUser).code,
          pinCode: address && address.postalCode,
          isSoftReservation: false
        };
        this.props.addUserAddress(address, getCartDetailCNCObj);
        this.setState({ addNewAddress: false });
      }
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

  getPinCodeDetails = pinCode => {
    if (this.props.getPinCode) {
      this.props.getPinCode(pinCode);
    }
  };
  render() {
    const { pathname } = this.props.location;
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    if (!userDetails || !customerCookie) {
      return this.navigateToLogin();
    }
    const renderReasonForm = (
      <ReturnReasonForm
        {...this.props}
        {...this.state}
        returnProductDetails={this.props.returnProductDetails}
        orderDate={
          this.props.orderDetails &&
          format(this.props.orderDetails.orderDate, dateFormat)
        }
        history={this.props.history}
        orderId={this.props.orderDetails && this.props.orderDetails.orderId}
        productBrand={
          this.props.orderDetails &&
          this.props.orderDetails.products &&
          this.props.orderDetails.products[0] &&
          this.props.orderDetails.products[0].productBrand
        }
        onChange={comment => this.onChange({ comment })}
        onChangePrimary={reason => this.onChange({ reason })}
        onContinue={data => this.renderToModes(data)}
        onCancel={() => this.onCancel()}
        onHollow={true}
        displayToast={this.props.displayToast}
        uploadProductImages={this.props.uploadProductImages}
        setHeaderText={this.props.setHeaderText}
      />
    );
    const renderReturnMode = (
      <ReturnModes
        {...this.props}
        {...this.state}
        returnProductDetails={this.props.returnProductDetails}
        onHollow={true}
        productInfo={
          this.props.returnRequest &&
          this.props.returnRequest.returnEntry &&
          this.props.returnRequest.returnEntry.orderEntries[0]
        }
        orderDate={
          this.props.orderDetails &&
          format(this.props.orderDetails.orderDate, dateFormat)
        }
        orderId={this.props.orderDetails && this.props.orderDetails.orderId}
        productBrand={
          this.props.orderDetails &&
          this.props.orderDetails.products &&
          this.props.orderDetails.products[0] &&
          this.props.orderDetails.products[0].productBrand
        }
        history={this.props.history}
        selectMode={mode => this.onSelectMode(mode)}
        onCancel={() => this.onCancel()}
        onChange={this.props.onChange()}
        selectedReason={this.state.selectedReason}
        onChangeBankDetails={val => this.props.onChangeBankDetails(val)}
        selectedAddressId={this.state.selectedAddressId}
        onSelectAddress={addressId => this.onSelectAddress(addressId)}
      />
    );
    const replaceRefundSelection = (
      <ReplaceRefundSelection
        {...this.props}
        {...this.state}
        productInfo={
          this.props.returnRequest &&
          this.props.returnRequest.returnEntry &&
          this.props.returnRequest.returnEntry.orderEntries[0]
        }
        history={this.props.history}
        selectMode={mode => this.onSelectMode(mode)}
        returnProductDetails={this.props.returnProductDetails}
        uploadProductImages={this.props.uploadProductImages}
        onCancel={() => this.onCancel()}
        getRefundOptionsData={this.props.getRefundOptionsData} //function
        getRefundOptionsDetails={this.props.getRefundOptionsDetails} //data
        getRefundModes={this.props.getRefundModes} //function
        getRefundModesDetails={this.props.getRefundModesDetails} //data
        displayToast={this.props.displayToast}
        updateRefundMode={this.props.updateRefundMode} //function
        getCliqCashDetailsRefund={this.props.getCliqCashDetailsRefund} //function
        getCustomerBankDetails={this.props.getCustomerBankDetails}
        onChange={data => this.onChange({ data })}
        //changeReturnReason={this.props.changeReturnReason()}
      />
    );

    const renderBankDetails = (
      <ReturnBankForm
        {...this.state}
        {...this.props}
        onChange={val => this.props.onChangeBankingDetail(val)}
        onContinue={BankDetails => this.props.onContinue(BankDetails)}
        returnProductDetails={this.props.returnProductDetails}
        onCancel={() => this.onCancel()}
        clearForm={() => this.props.clearForm()}
        history={this.props.history}
        updateStateForBankDetails={data =>
          this.props.updateStateForBankDetails(data)
        }
        bankDetail={this.props.bankDetail}
        returnFlow={this.props.returnFlow}
      />
    );
    /* const refundTransactionSummary = (
      <RefundTransactionSummary
        {...this.props}
        {...this.state}
        displayToast={this.props.displayToast}
        getRefundTransactionSummary={this.props.getRefundTransactionSummary}
      />
    );
    let data = this.props.returnProductDetails;
    let disableHeader = pathname.match(REG_X_FOR_BANKDETAILS) ? true : false;
    let disableforRefundPage =
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.isRefundTransactionPage &&
      this.props.location.state.isRefundTransactionPage; */
    return (
      <React.Fragment>
        {pathname.match(REG_X_FOR_REASON) && renderReasonForm}
        {pathname.match(REG_X_FOR_RNRSELECTION) && replaceRefundSelection}
        {pathname.match(REG_X_FOR_MODES) && renderReturnMode}
        {pathname.match(REG_X_FOR_BANKDETAILS) && renderBankDetails}
      </React.Fragment>
    );
  }
}
