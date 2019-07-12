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
    this.setState({ defaultAddress: defaultAddress });
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
    this.props.addAddressToCart(address[0]);
  }

  onChange(val) {
    this.setState(val);
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
    let addressSelectedId =
      this.props.returnRequest && this.props.returnRequest.deliveryAddress;
    let fetchId = addressSelectedId && addressSelectedId.id;
    let defaultAddressId = fetchId;
    let defaultAddress = addressSelectedId;
    if (this.state.defaultAddress) {
      defaultAddressId = this.state.defaultAddress.id;
      defaultAddress = this.state.defaultAddress;
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
                selected: address.defaultAddress,
                line1: address.line1,
                line2: address.line2,
                landmark: address.landmark,
                town: address.town,
                state: address.state,
                postalCode: address.postalCode
              };
            })}
            onSelectAddress={address => this.handleClick(address)}
            selected={[defaultAddressId]}
            onRedirectionToNextSection={() => this.handleSubmit}
            disabled={[defaultAddressId] ? false : true}
            onNewAddress={() => this.addAddress(orderId)}
            onEditAddress={() =>
              this.editAddress(this.state.defaultAddress, orderId)
            }
            defaultAddress={defaultAddress}
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
