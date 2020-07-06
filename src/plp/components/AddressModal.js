import React from "react";
import AddressCarousel from "./AddressCarousel";
import AddressList from "./AddressList";
import BottomSlideModal from "../../general/components/BottomSlideModal";
import DesktopOnly from "../../general/components/DesktopOnly";
import MobileOnly from "../../general/components/MobileOnly";
import SearchAndUpdate from "../../pdp/components/SearchAndUpdate";
import PropTypes from "prop-types";
import styles from "./AddressModal.css";
import * as Cookie from "../../lib/Cookie";
import {
  CUSTOMER_ACCESS_TOKEN,
  LOGGED_IN_USER_DETAILS
} from "../../lib/constants";

export default class AddressModal extends React.Component {
  checkPinCodeAvailability(pincode) {
    if (this.props.addressModalForCartPage) {
      this.props.checkPinCodeAvailability(pincode);
      this.props.closeModal();
      return;
    }
    this.props.getProductPinCode(
      pincode,
      this.props.productCode,
      null,
      false,
      this.props.exchangeAvailable,
      true
    );
    this.props.closeModal();
  }
  componentDidMount() {
    let customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    let userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);

    if (customerCookie && userDetails) this.props.getUserAddress();
  }
  render() {
    return (
      <BottomSlideModal
        heading={"Pick an address"}
        closeModal={() => this.props.closeModal()}
      >
        <div className={styles.base}>
          <MobileOnly>
            <div className={styles.labelText}>Please enter your PIN code</div>

            <div className={styles.searchHolder}>
              <SearchAndUpdate
                checkPinCodeAvailability={pincode =>
                  this.checkPinCodeAvailability(pincode)
                }
                hasAutoFocus={true}
                labelText={this.props.labelText}
              />
            </div>
          </MobileOnly>
          <DesktopOnly>
            <div className={styles.searchHolder}>
              <SearchAndUpdate
                checkPinCodeAvailability={pincode =>
                  this.checkPinCodeAvailability(pincode)
                }
                hasAutoFocus={false}
                labelText={this.props.labelText}
              />
            </div>
          </DesktopOnly>
          {this.props.userAddress && (
            <React.Fragment>
              <MobileOnly>
                <AddressCarousel
                  data={this.props.userAddress.addresses}
                  selectAddress={pincode =>
                    this.checkPinCodeAvailability(pincode)
                  }
                />
              </MobileOnly>
              <DesktopOnly>
                {this.props &&
                  this.props.userAddress &&
                  this.props.userAddress.addresses && (
                    <AddressList
                      data={this.props.userAddress.addresses}
                      selectAddress={pincode =>
                        this.checkPinCodeAvailability(pincode)
                      }
                    />
                  )}
              </DesktopOnly>
            </React.Fragment>
          )}
        </div>
      </BottomSlideModal>
    );
  }
}
AddressModal.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      heading: PropTypes.string,
      address: PropTypes.string,
      value: PropTypes.string
    })
  )
};
AddressModal.defaultProps = {
  data: [
    {
      heading: "Home",
      address:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ",
      value: "Home"
    },
    {
      heading: "Office",
      address:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ",
      value: "Office"
    },
    {
      heading: "Home2",
      address:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ",
      value: "Home2"
    },
    {
      heading: "Home3",
      address:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ",
      value: "Home3"
    },
    {
      heading: "Home4",
      address:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ",
      value: "Home4"
    }
  ]
};
