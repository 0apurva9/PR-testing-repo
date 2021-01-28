import React from "react";
import styles from "./DeliveryAddressReturn.css";
import CheckBox from "../../general/components/CheckBox.js";
import PropTypes from "prop-types";
import DesktopOnly from "../../general/components/DesktopOnly";
import MobileOnly from "../../general/components/MobileOnly";

export default class DeliveryAddressReturn extends React.Component {
  handleClick(address) {
    if (this.props.onSelectAddress) {
      this.props.onSelectAddress(address);
    }
    if (this.props.selectItem) {
      this.props.selectItem();
    }
  }

  editAddress(address) {
    if (this.props.onEditAddress) {
      this.props.onEditAddress(address);
    }
  }

  render() {
    return (
      <div
        className={this.props.isReturn ? styles.baseForReturn : styles.base}
        onClick={() => this.handleClick(this.props.address)}
      >
        <div className={styles.header}>
          <div
            className={
              this.props.isReturn
                ? styles.titleAddressForReturn
                : styles.titleAddress
            }
          >
            {this.props.addressType}
          </div>
          {this.props.selected == true ? (
            <div
              className={styles.buttonEdit}
              onClick={() => {
                this.editAddress(this.props.address);
              }}
            >
              Edit
            </div>
          ) : (
              ""
            )}
        </div>
        <div
          className={
            this.props.isReturn
              ? styles.titleDescriptionForReturn
              : styles.titleDescription
          }
        >
          {this.props.addressDescription}
          <MobileOnly>
            {!this.props.isReturn && (
              <div className={styles.checkCircle}>
                <CheckBox selected={this.props.selected} />
              </div>
            )}
          </MobileOnly>
          {this.props.isReturn && (
            <div className={styles.checkCircleForReturn}>
              <CheckBox selected={this.props.selected} />
            </div>
          )}
        </div>
        {this.props.contact && (
          <div
            className={
              this.props.isReturn
                ? styles.titleContactForReturn
                : styles.titleContact
            }
          >
            Ph. {this.props.phone}
          </div>
        )}
        <DesktopOnly>
          {!this.props.isReturn && (
            <div className={styles.checkCircle}>
              <CheckBox selected={this.props.selected} />
            </div>
          )}
        </DesktopOnly>
      </div>
    );
  }
}

DeliveryAddressReturn.propTypes = {
  addressTitle: PropTypes.string,
  addressDescription: PropTypes.string,
  selected: PropTypes.bool,
  selectItem: PropTypes.func,
  isReturn: PropTypes.bool,
  onSelectAddress: PropTypes.func,
  onEditAddress: PropTypes.func,
  address: PropTypes.object,
  addressType: PropTypes.string,
  contact: PropTypes.number,
  phone: PropTypes.number
};
DeliveryAddressReturn.defaultProps = {
  isReturn: false
};
