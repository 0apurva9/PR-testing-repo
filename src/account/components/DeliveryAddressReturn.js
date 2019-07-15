import React from "react";
import styles from "./DeliveryAddressReturn.css";
import CheckBox from "../../general/components/CheckBox.js";
import PropTypes from "prop-types";
import DesktopOnly from "../../general/components/DesktopOnly";
import MobileOnly from "../../general/components/MobileOnly";

export default class DeliveryAddressReturn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAddress: ""
    };
    // this.radioChange = this.radioChange.bind(this);
  }
  // radioChange(e) {
  // 	const target = e.currentTarget;
  // 	console.log(target);
  // 	console.log(this.state.selectedAddress);
  // 	this.setState({ selectedAddress: target.value });
  // }

  handleClick(address, value) {
    if (this.props.onSelectAddress) {
      this.props.onSelectAddress(address);
    }
    this.setState({ selectedAddress: value });
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
    //console.log(this.props.selected);
    return (
      <div
        className={this.props.isReturn ? styles.baseForReturn : styles.base}
        onClick={() => this.handleClick(this.props.address, this.props.value)}
      >
        <div className={styles.header}>
          <div
            className={
              this.props.isReturn
                ? styles.titleAddressForReturn
                : styles.titleAddress
            }
          >
            {this.props.addressTitle}
          </div>
          {this.props.selected ? (
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
          <div className={styles.checkCircle}>
            {/* <input
							className={styles.radioBtn}
							type="radio"
							checked={this.state.selectedAddress === this.props.value}
							onChange={this.radioChange}
							value={this.props.value}
						/> */}
            <CheckBox selected={this.props.selected} />
          </div>
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
  isReturn: PropTypes.bool
};
DeliveryAddressReturn.defaultProps = {
  isReturn: false
};
