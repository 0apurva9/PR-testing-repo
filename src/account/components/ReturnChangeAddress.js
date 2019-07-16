import React from "react";
import GridSelect from "../../general/components/GridSelect";
import CheckOutHeader from "../../cart/components/CheckOutHeader.js";
import styles from "./ReturnAddressBook.css";
import UnderLinedButton from "../../general/components/UnderLinedButton.js";
import DeliveryAddressReturn from "./DeliveryAddressReturn.js";
import Button from "../../general/components/Button.js";
import DesktopOnly from "../../general/components/DesktopOnly";
import {
  RETURNS_PREFIX,
  RETURN_LANDING,
  RETURNS_MODES
} from "../../lib/constants.js";
import PropTypes from "prop-types";
import * as UserAgent from "../../lib/UserAgent.js";

export default class ReturnChangeAddress extends React.Component {
  componentWillMount() {
    document.title = "Select Delivery Address";
  }
  constructor(props) {
    super(props);
    this.state = {
      showAll: this.props.isReturn ? true : false,
      label: UserAgent.checkUserAgentIsMobile() ? "More" : "See all",
      selectedAddress: ""
    };
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
  onNewAddress() {
    if (this.props.onNewAddress) {
      this.props.onNewAddress();
    }
  }
  onSelectAddress(address) {
    this.setState({ selectedAddress: address });
    debugger;
    if (this.props.onSelectAddress) {
      this.props.onSelectAddress(address);
    }
  }

  onRedirectionToNextSection() {
    if (this.props.onRedirectionToNextSection) {
      this.props.onRedirectionToNextSection();
    }
  }
  render() {
    let buttonHolder = styles.buttonHolder;
    if (
      this.props.address &&
      this.props.address.length % 2 === 0 &&
      this.state.showAll &&
      this.props.address.length > 2 &&
      !this.props.isReturn
    ) {
      buttonHolder = styles.buttonHolderwithPadding;
    }
    let orderId =
      this.props && this.props.data && this.props.data.sellerorderno;
    let addressSelected =
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.address;
    return (
      <div className={styles.base}>
        <div className={styles.addressHolder}>
          {!this.props.isReturn && (
            <div className={styles.addressHeader}>
              <span>Select pickup address</span>
              <div className={styles.underLineButtonHolder}>
                <UnderLinedButton
                  size="14px"
                  fontFamily="regular"
                  color="#ff1744"
                  label="Add new address"
                  onClick={() => this.onNewAddress()}
                />
              </div>
            </div>
          )}

          <div className={styles.gridHolder}>
            <GridSelect
              limit={1}
              offset={0}
              elementWidthMobile={100}
              elementWidthDesktop={this.props.isReturn ? 100 : 50}
              selected={this.props.selected}
              //onSelect={addressId => this.onSelectAddress(addressId)}
            >
              {this.props.address &&
                this.props.address
                  .filter((val, i) => {
                    return !this.state.showAll ? i < 3 : true;
                  })
                  .map((val, i) => {
                    return (
                      <DeliveryAddressReturn
                        {...this.props}
                        addressTitle={val.addressTitle}
                        addressDescription={val.addressDescription}
                        contact={val.phone}
                        key={i}
                        phone={val.phone}
                        value={val.value}
                        selected={val.selected}
                        isReturn={this.props.isReturn}
                        address={val}
                        onSelectAddress={val => this.onSelectAddress(val)}
                        //onSelectAddress={val = > this.onSelectAddress(val)}
                        addressId={
                          this.props.stateDefaultAddress.id
                            ? this.props.stateDefaultAddress.id
                            : this.props.stateDefaultAddress.value
                        }
                      />
                    );
                  })}
            </GridSelect>
          </div>

          <div className={buttonHolder}>
            {!this.props.isReturn &&
              this.props.address &&
              this.props.address.length > 3 && (
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
              {this.props.onRedirectionToNextSection && (
                <div className={styles.continueButtonHolder}>
                  <Button
                    disabled={this.props.disabled}
                    type="primary"
                    backgroundColor="#ff1744"
                    height={40}
                    label="Continue"
                    width={135}
                    textStyle={{
                      color: "#FFF",
                      fontSize: 14
                    }}
                    onClick={() =>
                      this.props.history.push({
                        pathname: `${RETURNS_PREFIX}/${orderId}${RETURN_LANDING}${RETURNS_MODES}`,
                        state: {
                          address: addressSelected
                            ? addressSelected
                            : this.state.selectedAddress
                              ? this.state.selectedAddress
                              : this.props.defaultAddress,
                          authorizedRequest: true
                        }
                      })
                    }
                  />
                </div>
              )}
            </DesktopOnly>
          </div>
        </div>
      </div>
    );
  }
}

ReturnChangeAddress.propTypes = {
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
ReturnChangeAddress.defaultProps = {
  indexNumber: "1",
  isReturn: false
};
