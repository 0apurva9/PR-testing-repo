import React from "react";
import ConfirmAddress from "../../cart/components/ConfirmAddress.js";
import BagPageItem from "../../cart/components/BagPageItem";
import Icon from "../../xelpmoc-core/Icon";
import CheckBox from "../../general/components/CheckBox";
import Checkout from "../../cart/components/Checkout.js";
import styles from "./CncToHdFlow.css";
import HomeImage from "../../general/components/img/homeDelivery.svg";
import {
  DEFAULT_PIN_CODE_LOCAL_STORAGE,
  SUCCESS,
  HOME_ROUTER,
  MY_ACCOUNT,
  ORDER,
  ORDER_CODE,
  LOGIN_PATH,
  LOGGED_IN_USER_DETAILS,
  CUSTOMER_ACCESS_TOKEN,
  FAILURE_LOWERCASE
} from "../../lib/constants";
import AddDeliveryAddress from "../../cart/components/AddDeliveryAddress.js";
import OrderConfirmation from "../../cart/components/OrderConfirmation.js";
import { Redirect } from "react-router-dom";
import queryString from "query-string";
import * as Cookie from "../../lib/Cookie";
export default class CncToHdFlow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAddressObj: null,
      changeAddress: false,
      addNewAddress: false,
      addressId: null,
      addressSelected: false,
      thankYouPage: false
    };
  }
  onChangeAddress() {
    this.setState({
      changeAddress: true,
      addNewAddress: false
    });
  }
  onSelectAddress(selectedAddress) {
    let addressSelectedByUser = this.props.userAddress.addresses.find(
      address => {
        return address.id === selectedAddress[0];
      }
    );
    this.updateLocalStoragePinCode(
      addressSelectedByUser && addressSelectedByUser.postalCode
    );
    if (selectedAddress[0]) {
      this.setState({
        selectedAddressObj: addressSelectedByUser,
        addressId: addressSelectedByUser.id,
        addressSelected: true
      });
    } else {
      this.setState({
        addressId: null,
        selectedAddressObj: null
      });
    }
  }
  updateLocalStoragePinCode(pinCode) {
    const postalCode = parseInt(pinCode, 10);
    localStorage.setItem(DEFAULT_PIN_CODE_LOCAL_STORAGE, postalCode);
  }
  addNewAddress() {
    this.setState({
      addNewAddress: true,
      changeAddress: false
    });
  }
  renderToCncPage() {
    this.setState({
      addNewAddress: false,
      changeAddress: false
    });
  }
  getPinCodeDetails = pinCode => {
    if (this.props.getPinCode) {
      this.props.getPinCode(pinCode);
    }
  };
  async addAddress(address) {
    if (this.props.addUserAddress) {
      let addressResponse = await this.props.addUserAddress(address);
      if (addressResponse && addressResponse.status === SUCCESS) {
        this.props.getUserAddress();
        this.setState({
          addNewAddress: false,
          changeAddress: true
        });
      }
    }
  }
  async submitCncToHdDetails() {
    let orderCode = this.props.orderId;
    if (this.props.submitCncToHdDetails) {
      let submitCncToHdDetailsResponse = await this.props.submitCncToHdDetails(
        this.state.selectedAddressObj,
        this.props.orderDetails.transactionId,
        orderCode
      );
      if (submitCncToHdDetailsResponse.status === SUCCESS) {
        // setDataLayerForMyAccountDirectCalls(
        //   MYACCOUNT_CHANGE_DELIVERY_MODE_SUCCESS
        // );
        this.setState({
          thankYouPage: true
        });
      } else if (submitCncToHdDetailsResponse.status === FAILURE_LOWERCASE) {
        this.props.displayToast(submitCncToHdDetailsResponse.userErrorMsg);
      }
    }
  }
  componentDidMount() {
    this.props.getUserAddress();
    if (!this.state.changeAddress && !this.state.addNewAddress) {
      this.props.setHeaderText("Change Delivery Mode");
    }
    if (this.state.changeAddress && !this.state.addNewAddress) {
      this.props.setHeaderText("Choose Delivery Address");
    }
    if (!this.state.changeAddress && this.state.addNewAddress) {
      this.props.setHeaderText("Add Address");
    }
  }
  componentDidUpdate(prevProps) {
    if (!this.state.changeAddress && !this.state.addNewAddress) {
      this.props.setHeaderText("Change Delivery Mode");
    }
    if (this.state.changeAddress && !this.state.addNewAddress) {
      this.props.setHeaderText("Choose Delivery Address");
    }
    if (!this.state.changeAddress && this.state.addNewAddress) {
      this.props.setHeaderText("Add Address");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (
      !this.state.addressSelected &&
      nextProps.userAddress &&
      nextProps.userAddress.addresses
    ) {
      let defaultAddressId = null;
      let defaultAddress;
      defaultAddress = nextProps.userAddress.addresses.find(address => {
        return address.defaultAddress;
      });
      if (defaultAddress) {
        defaultAddressId = defaultAddress.id;
      }
      this.updateLocalStoragePinCode(defaultAddress.postalCode);
      this.setState({
        addressId: defaultAddressId,
        selectedAddressObj: defaultAddress
      });
    }
  }
  continueShopping = () => {
    this.props.history.push(HOME_ROUTER);
  };
  navigateToOrderDetailPage() {
    let orderId = queryString.parse(this.props.location.search).orderCode;
    return <Redirect to={`${MY_ACCOUNT}${ORDER}/?${ORDER_CODE}=${orderId}`} />;
  }
  onViewDetails() {
    let orderId = this.props.orderId
      ? this.props.orderId
      : queryString.parse(this.props.location.search).orderCode;
    this.props.history.push(`${MY_ACCOUNT}${ORDER}/?${ORDER_CODE}=${orderId}`);
  }
  captureOrderExperience = rating => {
    const orderCode = this.props.orderId;
    if (this.props.captureOrderExperience) {
      this.props.captureOrderExperience(orderCode, rating);
    }
  };
  navigateToLogin() {
    return <Redirect to={LOGIN_PATH} />;
  }
  render() {
    let isCncToHdOrderDetails = "";
    isCncToHdOrderDetails = this.props.orderDetails;
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    if (!userDetails || !customerCookie) {
      return this.navigateToLogin();
    }
    if (!isCncToHdOrderDetails) {
      return this.navigateToOrderDetailPage();
    }
    if (
      !this.state.changeAddress &&
      !this.state.addNewAddress &&
      !this.state.thankYouPage
    ) {
      return (
        <div className={styles.base}>
          <div className={styles.product}>
            <BagPageItem
              productImage={
                isCncToHdOrderDetails && isCncToHdOrderDetails.imageURL
              }
              productName={
                isCncToHdOrderDetails && isCncToHdOrderDetails.productName
              }
              price={isCncToHdOrderDetails && isCncToHdOrderDetails.price}
              borderBottom={"none"}
              isImageLeft={true}
              isGiveAway={"N"}
              isServiceAvailable={"Y"}
            />
            <div className={styles.standardDelivery}>
              <div className={styles.iconHolder}>
                <Icon image={HomeImage} size={22} />
              </div>
              <div className={styles.deliveryText}>Standard Delivery</div>
              <div className={styles.checkBoxHolder}>
                <CheckBox selected={true} />
              </div>
            </div>
          </div>
          <ConfirmAddress
            showOneAddress={true}
            showAllAddress={false}
            indexNumber={"0"}
            address={
              this.props.userAddress &&
              this.props.userAddress.addresses.map(address => {
                return {
                  addressTitle: address.addressType,
                  addressDescription: `${address.line1 ? address.line1 : ""} ${
                    address.town ? address.town : ""
                  } ${address.city ? address.city : ""}, ${
                    address.state ? address.state : ""
                  } ${address.postalCode ? address.postalCode : ""}`,
                  value: address.id,
                  selected: address.defaultAddress
                };
              })
            }
            selected={[
              this.state.selectedAddressObj && this.state.selectedAddressObj.id
            ]}
            onNewAddress={() => this.addNewAddress()}
            onSelectAddress={addressId => this.onSelectAddress(addressId)}
          />
        </div>
      );
    }
    if (
      this.state.changeAddress &&
      !this.state.addNewAddress &&
      !this.state.thankYouPage
    ) {
      let defaultAddressId = null;
      if (this.state.addressId) {
        defaultAddressId = this.state.addressId;
      }
      return (
        <div className={styles.baseWithAddress}>
          <ConfirmAddress
            address={
              this.props.userAddress &&
              this.props.userAddress.addresses.map(address => {
                return {
                  addressTitle: address.addressType,
                  addressDescription: `${address.line1 ? address.line1 : ""} ${
                    address.town ? address.town : ""
                  } ${address.city ? address.city : ""}, ${
                    address.state ? address.state : ""
                  } ${address.postalCode ? address.postalCode : ""}`,
                  value: address.id,
                  selected: address.defaultAddress
                };
              })
            }
            selected={[defaultAddressId]}
            onNewAddress={() => this.addNewAddress()}
            onSelectAddress={addressId => this.onSelectAddress(addressId)}
            title={"Your saved addresses"}
            indexNumber={"0"}
          />
          <Checkout
            disabled={false}
            onCheckout={() => this.renderToCncPage()}
            label={"continue"}
            handleShowDetails={false}
          />
        </div>
      );
    }
    if (
      !this.state.changeAddress &&
      this.state.addNewAddress &&
      !this.state.thankYouPage
    ) {
      return (
        <div className={styles.base}>
          <AddDeliveryAddress
            addUserAddress={address => this.addAddress(address)}
            saveText={"Continue"}
            displayToast={message => this.props.displayToast(message)}
            getPinCode={val => this.getPinCodeDetails(val)}
            getPinCodeDetails={this.props.getPinCodeDetails}
            getPincodeStatus={this.props.getPincodeStatus}
            getUserDetails={() => this.props.getUserDetails()}
            userDetails={this.props.userDetails}
          />
        </div>
      );
    }
    if (this.state.thankYouPage) {
      return (
        <div className={styles.base}>
          <OrderConfirmation
            orderId={this.props.orderId}
            continueShopping={() => this.continueShopping()}
            trackOrder={() => this.onViewDetails()}
            captureOrderExperience={val => this.captureOrderExperience(val)}
            orderDetails={this.props.orderDetails}
            isComingFromCncToHd={true}
          />
        </div>
      );
    }
  }
}
