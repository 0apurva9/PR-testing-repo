import React from "react";
import GridSelect from "../../general/components/GridSelect";
import styles from "./ReturnAddressBook.css";
import UnderLinedButton from "../../general/components/UnderLinedButton.js";
import DeliveryAddressReturn from "./DeliveryAddressReturn.js";
import Button from "../../general/components/Button.js";
import DesktopOnly from "../../general/components/DesktopOnly";
import { RouterPropTypes } from "../../general/router-prop-types";

import {
  RETURNS_PREFIX,
  RETURN_LANDING,
  RETURNS_MODES,
  ORDER_CODE,
  ORDER,
  MY_ACCOUNT
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

    return (
      <div className={styles.base}>
        {/* {!this.props.isReturn && (
          <div className={styles.header}>
            <CheckOutHeader
              confirmTitle="Confirm address"
              indexNumber={this.props.indexNumber}
            />
          </div>
        )} */}

        <div className={styles.addressHolder}>
          {/* {this.props.isReturn && ( */}
          <div className={styles.addressHeader}>
            {this.props.changeAddress ? (
              <span>Select Delivery Address</span>
            ) : (
              <span>Select Pickup Address</span>
            )}
            {/* <div className={styles.underLineButtonHolder}>
							<UnderLinedButton
								size="14px"
								fontFamily="regular"
								color="#000"
								label="Add new address"
								onClick={() => this.onNewAddress()}
							/>
						</div> */}
          </div>
          {/* )} */}

          <div className={styles.gridHolder}>
            <GridSelect
              limit={1}
              offset={0}
              elementWidthMobile={100}
              elementWidthDesktop={this.props.isReturn ? 100 : 50}
              selected={this.props.selected}
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
                        addressType={val.addressType}
                        addressDescription={val.addressDescription}
                        contact={val.phone}
                        key={i}
                        phone={val.phone}
                        value={val.id}
                        selected={val.defaultAddress}
                        isReturn={this.props.isReturn}
                        address={val}
                        onSelectAddress={val => this.onSelectAddress(val)}
                        //onSelectAddress={val = > this.onSelectAddress(val)}
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
                    disabled={
                      this.props.disabled
                      // isPincodeServiceable === true ? false : true
                    }
                    type="primary"
                    backgroundColor="#ff1744"
                    height={40}
                    label="Continue"
                    width={135}
                    textStyle={{
                      color: "#FFF",
                      fontSize: 14
                    }}
                    onClick={() => {
                      this.props.changeAddress
                        ? this.props.history.push({
                            pathname: `${MY_ACCOUNT}${ORDER}/?${ORDER_CODE}=${
                              this.props.orderId
                            }`,
                            state: {
                              address: this.state.selectedAddress
                                ? this.state.selectedAddress
                                : this.props.defaultAddress,
                              authorizedRequest: true
                            }
                          })
                        : this.props.history.push({
                            pathname: `${RETURNS_PREFIX}/${orderId}${RETURN_LANDING}${RETURNS_MODES}`,
                            state: {
                              address: this.state.selectedAddress
                                ? this.state.selectedAddress
                                : this.props.defaultAddress,
                              authorizedRequest: true
                            }
                          });
                    }}
                  />
                </div>
              )}
            </DesktopOnly>
            {!this.props.isReturn && (
              <div className={styles.newAddress}>
                <UnderLinedButton
                  size="14px"
                  fontFamily="regular"
                  color="#ff1744"
                  label="Add new address"
                  onClick={() => this.onNewAddress()}
                />
              </div>
            )}
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
  ),
  onSelectAddress: PropTypes.func,
  onRedirectionToNextSection: PropTypes.func,
  data: PropTypes.shape({
    sellerorderno: PropTypes.string
  }),
  disabled: PropTypes.bool,
  changeAddress: PropTypes.bool,
  defaultAddress: PropTypes.string,
  orderId: PropTypes.string,
  history: RouterPropTypes.history,
  selected: PropTypes.string
};
ReturnChangeAddress.defaultProps = {
  indexNumber: "1",
  isReturn: false
};
