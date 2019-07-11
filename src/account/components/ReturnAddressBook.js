import React from "react";
import { PRODUCT_CART_DELIVERY_MODES } from "../../lib/constants";
import CheckoutFrame from "../../cart/components/CheckoutFrame";
import ReturnChangeAddress from "./ReturnChangeAddress";
import AddDeliveryAddress from "../../cart/components/AddDeliveryAddress";
import Loader from "../../general/components/Loader";
import {
  MY_ACCOUNT_PAGE,
  MY_ACCOUNT_ADDRESS_EDIT_PAGE,
  MY_ACCOUNT_ADDRESS_ADD_PAGE,
  PICKUP_ADDRESS,
  RETURNS_PREFIX,
  RETURN_LANDING,
  RETURNS_MODES
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
    console.log(this.props, "this.props");
    this.setState({ defaultAddress: defaultAddress });
    console.log("defaultAddress", defaultAddress);
  }
  componentWillReceiveProps(nextProps) {
    let defaultAddress =
      nextProps.userAddress &&
      nextProps.userAddress.addresses &&
      nextProps.userAddress.addresses.find(value => {
        if (value.defaultAddress === true) {
          return value;
        }
      });

    if (
      this.state.defaultAddress &&
      this.state.defaultAddress.id !== defaultAddress.id
    ) {
      this.setState({
        defaultAddress: defaultAddress
      });
    }
    console.log("updated Default Address:", defaultAddress);
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
    this.props.history.push({
      pathname: `${RETURNS_PREFIX}/${orderId}${RETURN_LANDING}${ADD}`,
      state: {
        path: this.props.location.pathname,
        addAddress: true
      }
    });
  };

  handleClick(address) {
    debugger;
    this.setState({ defaultAddress: address });
  }

  onChange(val) {
    this.setState(val);
  }

  // onSelectAddress(addressId) {
  // 	this.props.addAddressToCart(addressId[0]);
  // }
  onSelectAddress(selectedAddress) {
    let addressSelected =
      this.props.returnRequest &&
      this.props.returnRequest.deliveryAddressesList &&
      this.props.returnRequest.addressDetailsList.addresses.find(address => {
        return address.id === selectedAddress[0];
      });
    this.updateLocalStoragePinCode(
      addressSelected && addressSelected.postalCode
    );
    // here we are checking the if user selected any address then setting our state
    // and in else condition if user deselect then this function will again call and
    //  then we are resetting the previous selected address
    if (selectedAddress[0]) {
      this.setState({
        confirmAddress: false,
        selectedAddress: addressSelected,
        isCheckoutAddressSelected: true,
        addressId: addressSelected.id,
        isDeliveryModeSelected: false
      });
    } else {
      this.setState({
        addressId: null,
        selectedAddress: null,
        isDeliveryModeSelected: false
      });
    }
  }
  handleSubmit = () => {
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
  render() {
    let orderId =
      this.props && this.props.data && this.props.data.sellerorderno;
    let defaultAddressId;
    if (this.state.defaultAddress) {
      defaultAddressId = this.state.defaultAddress.id;
    }
    return (
      <React.Fragment>
        {this.props.userAddress && (
          <ReturnChangeAddress
            {...this.props}
            address={this.props.userAddress.addresses.map(address => {
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
            })}
            // onSelectAddress={addressId => this.onSelectAddress(addressId)}
            onSelectAddress={address => this.handleClick(address)}
            selected={defaultAddressId}
            onRedirectionToNextSection={() => this.handleSubmit}
            disabled={this.state.defaultAddress.id ? false : true}
            onNewAddress={() => this.addAddress(orderId)}
            onEditAddress={() =>
              this.editAddress(this.state.defaultAddress, orderId)
            }
          />
        )}
        {!this.props.userAddress && (
          <AddDeliveryAddress
            {...this.state}
            onChange={val => this.onChange(val)}
          />
        )}
      </React.Fragment>
    );
  }
}
ReturnAddressBook.defaultProps = {
  addressSet: false,
  deliveryModeSet: false
};
