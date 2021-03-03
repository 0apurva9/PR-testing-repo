import React from "react";
import GridSelect from "../../general/components/GridSelect";
import CheckOutHeader from "./CheckOutHeader.js";
import styles from "./ConfirmAddress.css";
import UnderLinedButton from "../../general/components/UnderLinedButton.js";
import DeliveryAddressCart from "./DeliveryAddressCart.js";
import Button from "../../general/components/Button.js";
import DesktopOnly from "../../general/components/DesktopOnly";

import PropTypes from "prop-types";
import * as UserAgent from "../../lib/UserAgent.js";

export default class ConfirmAddress extends React.Component {
  UNSAFE_componentWillMount() {
    document.title = "Select Delivery Address";
  }

  constructor(props) {
    super(props);
    this.state = {
      showAll: this.props.isReturn ? true : false,
      label: UserAgent.checkUserAgentIsMobile() ? "More" : "See all"
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
      this.props.onNewAddress(true);
    }
  }

  onSelectAddress(addressId) {
    if (this.props.onSelectAddress) {
      this.props.onSelectAddress(addressId);
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
    return (
      <div className={this.props.isReturn ? styles.baseForReturn : styles.base}>
        <div className={styles.headerwrapper}>
          {!this.props.isReturn && (
            <div className={styles.header}>
              <CheckOutHeader
                confirmTitle={this.props.title}
                indexNumber={this.props.indexNumber}
              />
            </div>
          )}
          {!this.props.isReturn &&
            this.props.address &&
            this.props.address.length > 0 && (
              <div className={styles.addnewAddress}>
                <UnderLinedButton
                  inConfirmAddressPage={true}
                  size="14px"
                  fontFamily="regular"
                  color="#ff1744"
                  label="Add new address"
                  onClick={() => this.onNewAddress()}
                />
              </div>
            )}
        </div>
        {this.props.showAllAddress && (
          <React.Fragment>
            <div className={styles.addressHolder}>
              {this.props.isReturn && (
                <div className={styles.addressHeader}>
                  <span>Select pickup address</span>
                  <div className={styles.underLineButtonHolder}>
                    <UnderLinedButton
                      size="14px"
                      fontFamily="regular"
                      color="#000"
                      label="Add new address"
                      onClick={() => this.onNewAddress()}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className={styles.gridHolder}>
              <GridSelect
                limit={1}
                offset={0}
                elementWidthMobile={100}
                elementWidthDesktop={this.props.isReturn ? 100 : 50}
                selected={this.props.selected}
                onSelect={addressId => this.onSelectAddress(addressId)}
              >
                {this.props.address &&
                  this.props.address
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
                this.props.address &&
                this.props.address.length > 3 && (
                  <div className={styles.moreButtonHolder}>
                    <UnderLinedButton
                      inConfirmAddressPage={true}
                      size="14px"
                      fontFamily="regular"
                      color="#ff1744"
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
                      onClick={() => this.onRedirectionToNextSection()}
                    />
                  </div>
                )}
              </DesktopOnly>
            </div>
          </React.Fragment>
        )}
        {this.props.showOneAddress && (
          <React.Fragment>
            <div className={styles.addressHolderByCnc}>
              {this.props.isReturn && (
                <div className={styles.addressHeaderByCnc}>
                  <span>Select pickup address</span>
                  <div className={styles.underLineButtonHolderByCnc}>
                    <UnderLinedButton
                      size="14px"
                      fontFamily="regular"
                      color="#000"
                      label="Add new address"
                      onClick={() => this.onNewAddress()}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className={styles.gridHolderByCnc}>
              <GridSelect
                limit={1}
                offset={0}
                elementWidthMobile={100}
                elementWidthDesktop={this.props.isReturn ? 100 : 50}
                selected={this.props.selected}
                onSelect={addressId => this.onSelectAddress(addressId)}
              >
                {this.props.address &&
                  this.props.address
                    .filter((val, i) => {
                      return !this.state.showAll ? i < 3 : true;
                    })
                    .map((val, i) => {
                      return (
                        <DeliveryAddressCart
                          addressTitle={val.addressTitle}
                          addressDescription={val.addressDescription}
                          key={i}
                          value={val.value}
                          selected={val.selected}
                          isReturn={this.props.isReturn}
                        />
                      );
                    })}
              </GridSelect>
            </div>
            <div
              className={styles.newAddressByCnc}
              onClick={() => this.onNewAddress()}
            >
              Add new address
            </div>
            <div className={styles.cncToHdButtonHolder}>
              {!this.props.isReturn &&
                this.props.address &&
                this.props.address.length > 3 && (
                  <div
                    className={styles.moreButtonHolderByCnc}
                    onClick={() => this.showMore()}
                  >
                    {this.state.label}
                  </div>
                )}
              <div className={styles.continueButtonHolderByCnc}>
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
                  onClick={() => this.onRedirectionToNextSection()}
                />
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}
ConfirmAddress.propTypes = {
  onNewAddress: PropTypes.func,
  indexNumber: PropTypes.string,
  isReturn: PropTypes.bool,
  selected: PropTypes.bool,
  disabled: PropTypes.bool,
  showAllAddress: PropTypes.bool,
  showOneAddress: PropTypes.bool,
  onSelectAddress: PropTypes.func,
  title: PropTypes.string,
  onRedirectionToNextSection: PropTypes.func,
  address: PropTypes.arrayOf(
    PropTypes.shape({
      addressTitle: PropTypes.string,
      addressDescription: PropTypes.string
    })
  )
};
ConfirmAddress.defaultProps = {
  indexNumber: "1",
  isReturn: false,
  showAllAddress: true,
  showOneAddress: false,
  title: "Confirm address"
};
