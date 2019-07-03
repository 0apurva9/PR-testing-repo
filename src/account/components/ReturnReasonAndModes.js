import React from "react";
import Loader from "../../general/components/Loader";
import ReturnReasonForm from "./ReturnReasonForm.js";
import ReplaceRefundSelection from "./ReplaceRefundSelection.js";
import ReturnBankForm from "./ReturnBankForm.js";
import ReturnModes from "./ReturnModes.js";
import {
  CASH_ON_DELIVERY,
  RETURNS_PREFIX,
  RETURN_LANDING,
  RETURNS_MODES,
  RETURNS_REASON,
  QUICK_DROP,
  RETURN_TO_STORE,
  RETURNS_STORE_MAP,
  RETURN_CLIQ_PIQ,
  SCHEDULED_PICKUP,
  RETURN_CLIQ_PIQ_ADDRESS,
  RETURNS_STORE_BANK_FORM,
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
  EMAIL_VALID_TEXT
  //CHANGE_RETURN_ADDRESS
} from "../../lib/constants";
import {
  EMAIL_REGULAR_EXPRESSION,
  MOBILE_PATTERN
} from "../../auth/components/Login";
import {
  setDataLayerForMyAccountDirectCalls,
  ADOBE_MY_ACCOUNT_ORDER_RETURN_CANCEL
} from "../../lib/adobeUtils";

import {
  CUSTOMER_ACCESS_TOKEN,
  LOGGED_IN_USER_DETAILS,
  GLOBAL_ACCESS_TOKEN,
  CART_DETAILS_FOR_LOGGED_IN_USER,
  CART_DETAILS_FOR_ANONYMOUS,
  ANONYMOUS_USER,
  LOGIN_PATH,
  SAVED_LIST,
  PRODUCT_CANCEL
} from "../../lib/constants";
import * as Cookie from "../../lib/Cookie";
//import ProfileMenu from './ProfileMenu';
import { default as MyAccountStyles } from "./MyAccountDesktop.css";
import styles from "./ReturnReasonAndModes.css";
//import UserProfile from './UserProfile';
import DesktopOnly from "../../general/components/DesktopOnly.js";
import MobileOnly from "../../general/components/MobileOnly.js";
import ProfileMenu from "../../account/components/ProfileMenu.js";
import UserProfile from "../../account/components/UserProfile.js";
import ReturnDateTime from "../../account/components/ReturnDateTime.js";
import ReturnsFrame from "../../account/components/ReturnsFrame.js";
import OrderCard from "./OrderCard";
import format from "date-fns/format";
import { checkUserAgentIsMobile } from "../../lib/UserAgent.js";
//import CheckoutAddressContainer from "../../cart/containers/CheckoutAddressContainer";
import ConfirmAddress from "../../cart/components/ConfirmAddress";
import AddDeliveryAddress from "../../cart/components/AddDeliveryAddress";
import ReturnChangeAddress from "./ReturnChangeAddress";
import RefundTransactionSummary from "../../account/components/RefundTransactionSummary.js";
import ReturnAddressBook from "../components/ReturnAddressBook.js";
import ReturnNewAddress from "./ReturnNewAddress";
const REG_X_FOR_REASON = /reason/i;
const REG_X_FOR_MODES = /modes/i;
const dateFormat = "DD MMM YYYY";
const REG_X_FOR_RNRSELECTION = /replace-refund-selection/i;
const REG_X_FOR_BANKDETAILS = /bankDetail/i;
const REG_X_FOR_ADDRESS = /address/i;
const REG_X_FOR_DATE_TIME = /dateTime/i;
const REG_X_FOR_NEW_ADDRESS = /addDeliveryLocation/i;
const REG_X_FOR_RETURN_SUMMARY = /returnSummary/i;
//const REG_X_CHANGE_ADDRESS = /changeReturnAddress/i;
// const REG_X_CHANGE_ADDRESS = MY_ACCOUNT_ADDRESS_EDIT_PAGE;
const REG_X_FOR_REFUNDSUMMARY = /refund-summary/i;
// const REG_ADD_NEW_ADDRESS = /addDeliveryLocation/i;
//const REG_X_CHANGE_ADDRESS = /deliveryAddress/i;

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
    if (!data.reason) {
      this.props.displayToast("Please select reason ");
      return false;
    }
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
      //   if (data.showImageUpload) {
      //     if (data.validImgFiles.length > 0) {
      //       this.props.uploadProductImages(
      //         data.sellerorderno,
      //         data.transactionId,
      //         data.validImgFiles
      //       );

      //       this.props.history.push({
      //         pathname: `${RETURNS_PREFIX}/${
      //           this.orderCode
      //         }${RETURN_LANDING}${REPLACE_REFUND_SELECTION}`,
      //         state: {
      //           authorizedRequest: true
      //         }
      //       });
      //     }
      //      else {
      //       return this.props.displayToast("Please upload image");
      //     }
      //   } else {
      this.props.history.push({
        pathname: `${RETURNS_PREFIX}/${
          this.orderCode
        }${RETURN_LANDING}${REPLACE_REFUND_SELECTION}`,
        state: {
          authorizedRequest: true
        }
      });
      // --------------Image upload end---------------
      // if (this.props.isCOD && checkUserAgentIsMobile()) {
      //   this.props.history.push({
      //     pathname: `${RETURNS_PREFIX}/${
      //       this.orderCode
      //     }${RETURNS_STORE_BANK_FORM}`,
      //     state: {
      //       authorizedRequest: true
      //     }
      //   });
      // } else {
      //   this.props.history.push({
      //     pathname: `${RETURNS_PREFIX}/${
      //       this.orderCode
      //     }${RETURN_LANDING}${RETURNS_MODES}`,
      //     state: {
      //       authorizedRequest: true
      //     }
      //   });
      // }
    }
  }
  onSelectMode(mode) {
    if (mode === QUICK_DROP) {
      this.props.history.push({
        pathname: `${RETURNS_PREFIX}/${
          this.orderCode
        }${RETURN_TO_STORE}${RETURNS_STORE_MAP}`,
        state: {
          authorizedRequest: true
        }
      });
    } else if (mode === SCHEDULED_PICKUP) {
      this.props.history.push({
        pathname: `${RETURNS_PREFIX}/${
          this.orderCode
        }${RETURN_CLIQ_PIQ}${RETURN_CLIQ_PIQ_ADDRESS}`,
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
    // if (!address.userEmailId && !address.emailId && address.emailId === "") {
    //   this.props.displayToast("Please enter the EmailId");
    //   return false;
    // }
    if (
      address.emailId &&
      address.emailId !== "" &&
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
    const userData = JSON.parse(userDetails);
    const userAccountDetails = JSON.parse(userDetails);
    const returnProductDetails = this.props.returnProductDetails;
    const orderDetails = this.props.orderDetails;
    let returnFlow = this.props.returnFlow;
    let returnAddress =
      this.props.returnRequest && this.props.returnRequest.deliveryAddressesList
        ? this.props.returnRequest.deliveryAddressesList
        : this.props.userAddress.addresses;
    const renderReasonForm = (
      <ReturnReasonForm
        {...this.props}
        returnProductDetails={this.props.returnProductDetails}
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
        productInfo={
          this.props.returnRequest &&
          this.props.returnRequest.returnEntry &&
          this.props.returnRequest.returnEntry.orderEntries[0]
        }
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
        onChange={(val: any) => this.props.onChangeBankingDetail(val)}
        onContinue={(BankDetails: any) => this.props.onContinue(BankDetails)}
        returnProductDetails={this.props.returnProductDetails}
        onCancel={() => this.onCancel()}
        clearForm={() => this.props.clearForm()}
        history={this.props.history}
        updateStateForBankDetails={(data: any) =>
          this.props.updateStateForBankDetails(data)
        }
        bankDetail={this.props.bankDetail}
        returnFlow={this.props.returnFlow}
      />
    );
    const refundTransactionSummary = (
      <RefundTransactionSummary
        {...this.props}
        displayToast={this.props.displayToast}
        getRefundTransactionSummary={this.props.getRefundTransactionSummary}
      />
    );
    const renderAddress = (
      <ReturnAddressBook
        {...this.state}
        {...this.props}
        address={
          returnAddress &&
          returnAddress.map(addressSelected => {
            return {
              addressTitle: addressSelected.addressType,
              addressDescription: `${
                addressSelected.line1 ? addressSelected.line1 : ""
              } ${addressSelected.town ? addressSelected.town : ""}, ${
                addressSelected.state ? addressSelected.state : ""
              } ${
                addressSelected.postalCode ? addressSelected.postalCode : ""
              }`,
              value: addressSelected.id,
              selected: addressSelected.defaultAddress
            };
          })
        }
        onNewAddress={() => this.addNewAddress()}
        onSelectAddress={address => this.onSelectAddress(address)}
        // isReturn={checkUserAgentIsMobile() ? false : true}
      />
    );
    const renderNewAddress = (
      <ReturnNewAddress
        {...this.props}
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
        // resetAutoPopulateDataForPinCode={() =>
        //   this.props.resetAutoPopulateDataForPinCode()
        // }
        getUserDetails={() => this.props.getUserDetails()}
        userDetails={this.props.userDetails}
        resetAddAddressDetails={() => this.props.resetAddAddressDetails()}
        clearPinCodeStatus={() => this.props.clearPinCodeStatus()}
      />
    );
    const renderAddressChange = (
      <ReturnAddressBook
        {...this.props}
        address={
          this.props.userAddress.addresses &&
          this.props.userAddress.addresses.map(address => {
            return {
              addressTitle: address.addressType,
              addressDescription: `${address.line1 ? address.line1 : ""} ${
                address.line2 ? address.line2 : ""
              }  ${address.state ? address.state : ""} ${
                address.postalCode ? address.postalCode : ""
              }`,
              value: address.id,
              phone: address.phone,
              selected: address.defaultAddress
            };
          })
        }
        onSelectAddress={addressId => this.onSelectAddress(addressId)}
      />
      // <ReturnChangeAddress
      //   {...this.props}
      //   data={this.props.userAddress.addresses}
      //   isReturn={checkUserAgentIsMobile() ? false : true}
      // />
    );
    const renderAddNewAddress = (
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
    );
    let data = this.props.returnProductDetails;
    let disableHeader = pathname.match(REG_X_FOR_BANKDETAILS) ? true : false;
    let disableforRefundPage =
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.isRefundTransactionPage &&
      this.props.location.state.isRefundTransactionPage;
    return (
      <React.Fragment>
        <div className={styles.base}>
          <div className={styles.holder}>
            {!disableforRefundPage && (
              <div className={styles.profileMenu}>
                <ProfileMenu {...this.props} />
              </div>
            )}
            <div className={styles.returnReasonDetail}>
              <div className={styles.returnReasonDetailHolder}>
                {!disableforRefundPage && (
                  <React.Fragment>
                    {!disableHeader && (
                      <div>
                        {returnProductDetails && (
                          <div className={styles.orderCardWrapper}>
                            <OrderCard
                              imageUrl={
                                returnProductDetails &&
                                returnProductDetails.orderProductWsDTO &&
                                returnProductDetails.orderProductWsDTO[0] &&
                                returnProductDetails.orderProductWsDTO[0]
                                  .imageURL
                              }
                              productName={`${returnProductDetails &&
                                returnProductDetails.orderProductWsDTO &&
                                returnProductDetails.orderProductWsDTO[0] &&
                                returnProductDetails.orderProductWsDTO[0]
                                  .productBrand} ${returnProductDetails &&
                                returnProductDetails.orderProductWsDTO &&
                                returnProductDetails.orderProductWsDTO[0] &&
                                returnProductDetails.orderProductWsDTO[0]
                                  .productName}`}
                              price={
                                returnProductDetails &&
                                returnProductDetails.orderProductWsDTO &&
                                returnProductDetails.orderProductWsDTO[0] &&
                                returnProductDetails.orderProductWsDTO[0].price
                              }
                              isSelect={false}
                              quantity={true}
                              orderPlace={
                                orderDetails && orderDetails.orderDate
                                  ? orderDetails &&
                                    format(orderDetails.orderDate, dateFormat)
                                  : this.props.orderPlace
                              }
                              orderId={this.props.orderId}
                              productSize={
                                this.props.orderDetails.products[0].productSize
                              }
                              productColourName={
                                this.props.orderDetails.products[0]
                                  .productColourName
                              }
                              productBrand={
                                orderDetails && orderDetails.productBrand
                                  ? orderDetails.productBrand
                                  : returnProductDetails &&
                                    returnProductDetails.orderProductWsDTO &&
                                    returnProductDetails.orderProductWsDTO[0] &&
                                    returnProductDetails.orderProductWsDTO[0]
                                      .productBrand
                              }
                              onHollow={true}
                              returnFlow={returnFlow}
                              title={PRODUCT_CANCEL}
                              onClick={() =>
                                this.onClickImage(
                                  orderDetails &&
                                    orderDetails.orderProductWsDTO &&
                                    orderDetails.orderProductWsDTO[0] &&
                                    orderDetails.orderProductWsDTO[0]
                                      .productcode
                                )
                              }
                            >
                              {returnProductDetails &&
                                returnProductDetails.orderProductWsDTO &&
                                returnProductDetails.orderProductWsDTO[0] &&
                                returnProductDetails.orderProductWsDTO[0]
                                  .quantity && (
                                  <div className={styles.quantity}>
                                    Qty{" "}
                                    {
                                      returnProductDetails.orderProductWsDTO[0]
                                        .quantity
                                    }
                                  </div>
                                )}
                            </OrderCard>
                          </div>
                        )}
                      </div>
                    )}
                  </React.Fragment>
                )}
                <div>
                  {pathname.match(REG_X_FOR_REASON) && renderReasonForm}
                  {pathname.match(REG_X_FOR_RNRSELECTION) &&
                    replaceRefundSelection}
                  {pathname.match(REG_X_FOR_MODES) && renderReturnMode}
                  {pathname.match(REG_X_FOR_BANKDETAILS) && renderBankDetails}
                  {pathname.match(REG_X_FOR_ADDRESS) && renderAddress}
                  {pathname.match(REG_X_FOR_DATE_TIME) && this.renderDateTime()}
                  {pathname.match(REG_X_FOR_NEW_ADDRESS) && renderNewAddress}
                  {/* {pathname.match(REG_X_FOR_RETURN_SUMMARY) &&
                    this.renderReturnSummary()} */}
                  {/* {pathname.match(REG_X_CHANGE_ADDRESS) && renderAddressChange}
                  {pathname.match(REG_ADD_NEW_ADDRESS) && renderAddNewAddress}*/}
                  {pathname.match(REG_X_FOR_REFUNDSUMMARY) &&
                    refundTransactionSummary}
                </div>
                {/* {this.props.children} */}
              </div>
            </div>
            {!disableforRefundPage && (
              <div className={styles.userProfile}>
                <UserProfile
                  image={userAccountDetails.imageUrl}
                  userLogin={userAccountDetails.userName}
                  loginType={userAccountDetails.loginType}
                  firstName={
                    userAccountDetails &&
                    userAccountDetails.firstName &&
                    userAccountDetails.firstName.trim().charAt(0)
                  }
                  heading={
                    userAccountDetails &&
                    userAccountDetails.firstName &&
                    `${userAccountDetails.firstName} `
                  }
                  lastName={
                    userAccountDetails &&
                    userAccountDetails.lastName &&
                    `${userAccountDetails.lastName}`
                  }
                  userAddress={this.props.userAddress}
                />
              </div>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
