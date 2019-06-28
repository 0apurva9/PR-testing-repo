import React from "react";
import GridSelect from "../../general/components/GridSelect";
//import CheckOutHeader from './CheckOutHeader.js';
import styles from "./ReturnChangeAddress.css";
import UnderLinedButton from "../../general/components/UnderLinedButton.js";
import DeliveryAddressCart from "../../cart/components/DeliveryAddressCart";
import Button from "../../general/components/Button.js";
import DesktopOnly from "../../general/components/DesktopOnly";

import PropTypes from "prop-types";
import * as UserAgent from "../../lib/UserAgent.js";
import { checkUserAgentIsMobile } from "../../lib/UserAgent.js";
import {
  RETURNS_PREFIX,
  CHANGE_RETURN_ADDRESS,
  RETURN_CLIQ_PIQ,
  RETURNS_NEW_ADDRESS
} from "../../lib/constants";

export default class ConfirmAddress extends React.Component {
  componentWillMount() {
    document.title = "Select Delivery Address";
  }
  constructor(props) {
    super(props);
    this.orderCode = props.location.pathname.split("/")[2];
    this.state = {
      showAll: this.props.isReturn ? true : false,
      label: UserAgent.checkUserAgentIsMobile() ? "More" : "See all",
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
    //console.log('props in address change:', this.props);
  }
  showMore() {
    this.setState({ showAll: !this.state.showAll }, () => {
      if (this.state.label === "More" || this.state.label === "See all") {
        this.setState({ label: "Hide" });
      } else {
        this.setState({
          label: UserAgent.checkUserAgentIsMobile() ? "More" : "See all"
        });
      }
    });
  }
  onNewAddress = () => {
    this.setState({ addNewAddress: true });
    if (checkUserAgentIsMobile()) {
      this.props.history.push(
        `${RETURNS_PREFIX}/${
          this.orderCode
        }${RETURN_CLIQ_PIQ}${RETURNS_NEW_ADDRESS}`
      );
    }
  };

  onSelectAddress = async selectedAddress => {
    this.setState({
      selectedAddress: ""
    });
    this.setState({ addressSelectedByUser: false });
    // let addressSelected = filter(this.props.returnRequest.deliveryAddressesList, address => {
    // 	return address.id === selectedAddress[0];
    // });
    let productObject = {};
    productObject.orderCode =
      this.props.returnProducts &&
      this.props.returnProducts.orderProductWsDTO &&
      this.props.returnProducts.orderProductWsDTO[0] &&
      this.props.returnProducts.orderProductWsDTO[0].sellerorderno;
    //productObject.pinCode = addressSelected && addressSelected[0].postalCode;
    productObject.transactionId =
      this.props.returnProducts &&
      this.props.returnProducts.orderProductWsDTO &&
      this.props.returnProducts.orderProductWsDTO[0] &&
      this.props.returnProducts.orderProductWsDTO[0].transactionId;
    if (this.props.returnPinCode) {
      let returnPinCodeResponse = await this.props.returnPinCode(productObject);
      // if (returnPinCodeResponse.status === SUCCESS) {
      // this.setState({
      // 	selectedAddress: addressSelected[0],
      // });
      // }
    }
  };

  onRedirectionToNextSection() {
    if (this.props.onRedirectionToNextSection) {
      this.props.onRedirectionToNextSection();
    }
  }
  render() {
    //console.log('props in address change:', this.props);
    let buttonHolder = styles.buttonHolder;
    if (
      this.props.userAddress.addresses &&
      this.props.userAddress.addresses.length % 2 === 0 &&
      this.state.showAll &&
      this.props.userAddress.addresses.length > 2 &&
      !this.props.isReturn
    ) {
      buttonHolder = styles.buttonHolderwithPadding;
    }
    return (
      <div className={this.props.isReturn ? styles.baseForReturn : styles.base}>
        <div className={styles.header}>
          Confirm address
          {/* <CheckOutHeader confirmTitle="Confirm address" indexNumber={this.props.indexNumber} /> */}
        </div>
        <div className={styles.addressHolder}>
          {/* {this.props.isReturn && ( */}
          <div className={styles.addressHeader}>
            <span>Select pickup address</span>
          </div>
          {/* )} */}

          <div className={styles.gridHolder}>
            <GridSelect
              limit={1}
              offset={0}
              elementWidthMobile={100}
              // this.props.isReturn ? 100 : 50
              elementWidthDesktop={100}
              selected={this.props.selected}
              onSelect={addressId => this.onSelectAddress(addressId)}
            >
              {this.props.userAddress.addresses &&
                this.props.userAddress.addresses
                  .filter((val, i) => {
                    return !this.state.showAll ? i < 3 : true;
                  })
                  .map((val, i) => {
                    return (
                      <DeliveryAddressCart
                        addressTitle={val.addressTitle}
                        addressDescription={val.addressDescription}
                        contact={val.phone}
                        key={i}
                        phone={val.phone}
                        value={val.value}
                        selected={val.selected}
                        isReturn={this.props.isReturn}
                      />
                    );
                  })}
            </GridSelect>
          </div>

          <div className={buttonHolder}>
            {!this.props.isReturn &&
              this.props.userAddress.addresses &&
              this.props.userAddress.addresses.length > 3 && (
                <div className={styles.moreButtonHolder}>
                  <UnderLinedButton
                    size="14px"
                    fontFamily="regular"
                    color="#000"
                    label={this.state.label}
                    onClick={() => this.showMore()}
                  />
                </div>
              )}
            <DesktopOnly>
              {/* {this.props.onRedirectionToNextSection && (
								<div className={styles.continueButtonHolder}>
									<Button
										disabled={this.props.disabled}
										type="primary"
										backgroundColor="#ff1744"
										height={40}
										label="Continue"
										width={135}
										textStyle={{
											color: '#FFF',
											fontSize: 14,
										}}
										onClick={() => this.onRedirectionToNextSection()}
									/>
								</div>
							)} */}
            </DesktopOnly>
            {/* {!this.props.isReturn && ( */}
            <div className={styles.newAddress}>
              <UnderLinedButton
                size="14px"
                fontFamily="regular"
                color="#ff1744"
                label="Add new address"
                onClick={() => this.onNewAddress()}
              />
            </div>
            {/* )} */}
          </div>
        </div>
      </div>
    );
  }
}
ConfirmAddress.propTypes = {
  onNewAddress: PropTypes.func,
  indexNumber: PropTypes.string,
  isReturn: PropTypes.bool,
  address: PropTypes.arrayOf(
    PropTypes.shape({
      addressTitle: PropTypes.string,
      addressDescription: PropTypes.string
    })
  )
};
ConfirmAddress.defaultProps = {
  indexNumber: "1",
  isReturn: false
};
