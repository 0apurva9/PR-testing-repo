import React from "react";
import styles from "./ReturnAddressBook.css";
import ReturnChangeAddress from "./ReturnChangeAddress";
import AddDeliveryAddress from "../../cart/components/AddDeliveryAddress";
import Loader from "../../general/components/Loader";
import {
  RETURNS_PREFIX,
  RETURN_LANDING,
  RETURNS_MODES,
  ORDER,
  MY_ACCOUNT,
  ORDER_CODE,
  RETURN_TO_ADDRESS
} from "../../lib/constants.js";
const EDIT = "/edit";
const ADD = "/add";

export default class ReturnAddressBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = { defaultAddress: "" };
  }

  componentDidMount() {
    this.props.getUserAddress();
    let defaultAddress =
      this.props.userAddress &&
      this.props.userAddress.addresses &&
      this.props.userAddress.addresses.find(value => {
        if (value.defaultAddress === true) {
          return value;
        }
      });

    this.setState({
      defaultAddress: defaultAddress,
      defaultAddressClone: defaultAddress
    });
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps &&
      nextProps.getPinCodeDetails &&
      nextProps.getPinCodeDetails.isPincodeServiceable === false
    ) {
      this.setState({
        defaultAddress: this.state.defaultAddressClone
      });
    } else if (
      nextProps &&
      nextProps.getPinCodeDetails &&
      nextProps.getPinCodeDetails.isPincodeServiceable === true
    ) {
      this.setState({
        defaultAddress: this.state.defaultAddress
      });
    }
  }

  removeAddress = addressId => {
    if (this.props.removeAddress) {
      this.props.removeAddress(addressId);
    }
  };

  renderLoader = () => {
    return <Loader />;
  };

  editAddress = (address, orderId) => {
    if (
      this.props &&
      this.props.history &&
      this.props.history.location &&
      this.props.history.location.state &&
      this.props.history.location.state.urlAddress.includes(
        "/my-account/order/"
      )
    ) {
      this.props.history.push({
        pathname: `${MY_ACCOUNT}${ORDER}/?${ORDER_CODE}=${
          this.props.history.location.state.orderId
        }${RETURN_TO_ADDRESS}${EDIT}`,
        state: {
          path: this.props.location.pathname,
          addAddress: true,
          urlAddress: window.location.href,
          addressDetails: address,
          isFromOrderDetailsPage: true
        }
      });
    } else
      this.props.history.push({
        pathname: `${RETURNS_PREFIX}/${orderId}${RETURN_LANDING}${EDIT}`,
        state: {
          addressDetails: address,
          path: this.props.location.pathname,
          authorizedRequest: true
        }
      });
  };

  addAddress = orderId => {
    if (
      this.props &&
      this.props.history &&
      this.props.history.location &&
      this.props.history.location.state &&
      this.props.history.location.state.urlAddress.includes(
        "/my-account/order/"
      )
    ) {
      this.props.history.push({
        pathname: `${MY_ACCOUNT}${ORDER}/?${ORDER_CODE}=${
          this.props.history.location.state.orderId
        }${RETURN_TO_ADDRESS}${ADD}`,
        state: {
          path: this.props.location.pathname,
          addAddress: true,
          urlAddress: window.location.href
        }
      });
    } else {
      this.props.history.push({
        pathname: `${RETURNS_PREFIX}/${orderId}${RETURN_LANDING}${ADD}`,
        state: {
          path: this.props.location.pathname,
          addAddress: true,
          urlAddress: window.location.href
        }
      });
    }
  };

  async handleClick(address) {
    if (
      this.props &&
      this.props.history &&
      this.props.history.location &&
      this.props.history.location.state &&
      this.props.history.location.state.urlAddress.includes(
        "/my-account/order/"
      )
    ) {
      await this.props.getPinCodeChangeAddressOrderedProduct(
        address,
        this.props.history.location.state.orderId
      );

      this.props &&
        this.props.history &&
        this.props.history.location &&
        this.props.history.location.state &&
        this.props.history.location.state.urlAddress.includes(
          "/my-account/order/"
        ) &&
        this.setState({ defaultAddress: address });
    }
  }

  onChange(val) {
    this.setState(val);
  }

  handleSubmit = () => {
    if (this.props.history.location.state.includes("/my-account/order/")) {
      this.props.history.push({
        pathname: `${RETURNS_PREFIX}/${
          this.props.data.sellerorderno
        }${RETURN_LANDING}${RETURNS_MODES}`,
        state: {
          address: this.state.defaultAddress,
          authorizedRequest: true
        }
      });
    }
    this.props.history.push({
      pathname: `${RETURNS_PREFIX}/${
        this.props.data.sellerorderno
      }${RETURN_LANDING}${RETURNS_MODES}`,
      state: {
        address: this.state.defaultAddress,
        authorizedRequest: true
      }
    });
  };
  // checkDefaultAddress = address => {
  // 	return address.defaultAddress === true;
  // };

  render() {
    let orderId =
      this.props && this.props.data && this.props.data.sellerorderno;
    let addressSelectedId =
      this.props.returnRequest && this.props.returnRequest.deliveryAddress;
    let fetchId = addressSelectedId && addressSelectedId.id;
    let defaultAddressId = fetchId;
    // let defaultAddress = addressSelectedId;
    if (this.state.defaultAddress) {
      defaultAddressId = this.state.defaultAddress.id;
    }
    // if (
    //   this.props &&
    //   this.props.returnRequest &&
    //   this.props.returnRequest.deliveryAddress &&
    //   this.props.returnRequest.deliveryAddress.id
    // ) {
    //   defaultAddressId = fetchId;
    // } else {
    //   if (this.state.defaultAddress) {
    //     defaultAddressId = this.state.defaultAddress.id;
    //     //defaultAddress = this.state.defaultAddress;
    //   }
    // }

    return (
      <div className={styles.addressBase}>
        {this.props.userAddress && (
          <ReturnChangeAddress
            {...this.props}
            orderId={
              this.props &&
              this.props.history &&
              this.props.history.location &&
              this.props.history.location.state &&
              this.props.history.location.state.orderId
            }
            address={this.props.userAddress.addresses.map(address => {
              return {
                addressType: address.addressType,
                addressDescription: `${address.line1 ? address.line1 : ""} ${
                  address.line2 ? address.line2 : ""
                }  ${address.state ? address.state : ""} ${
                  address.postalCode ? address.postalCode : ""
                }`,
                id: address.id,
                phone: address.phone,
                defaultAddress: address.defaultAddress,
                line1: address.line1,
                line2: address.line2,
                landmark: address.landmark,
                town: address.town,
                state: address.state,
                postalCode: address.postalCode,
                firstName: address.firstName,
                lastName: address.lastName,
                city: address.city
              };
            })}
            onSelectAddress={address => this.handleClick(address)}
            selected={[defaultAddressId]}
            onRedirectionToNextSection={() => this.handleSubmit}
            disabled={defaultAddressId ? false : true}
            onNewAddress={() => this.addAddress(orderId)}
            onEditAddress={() =>
              this.editAddress(this.state.defaultAddress, orderId)
            }
            defaultAddress={this.state.defaultAddress}
            isPincodeServiceable={
              this.props &&
              this.props.getPinCodeDetails &&
              this.props.getPinCodeDetails.isPincodeServiceable
            }
          />
        )}
        {!this.props.userAddress && (
          <AddDeliveryAddress
            {...this.state}
            onChange={val => this.onChange(val)}
          />
        )}
      </div>
    );
  }
}
ReturnAddressBook.defaultProps = {
  addressSet: false,
  deliveryModeSet: false
};
