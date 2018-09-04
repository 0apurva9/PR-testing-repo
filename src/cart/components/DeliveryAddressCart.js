import React from "react";
import styles from "./DeliveryAddressCart.css";
import CheckBox from "../../general/components/CheckBox.js";
import PropTypes from "prop-types";
export default class DeliveryAddressCopy extends React.Component {
  handleClick() {
    if (this.props.selectItem) {
      this.props.selectItem();
    }
  }
  render() {
    return (
      <div
        className={this.props.isReturn ? styles.baseForReturn : styles.base}
        onClick={() => this.handleClick()}
      >
        <div className={styles.titleAddress}>{this.props.addressTitle}</div>
        <div
          className={
            this.props.isReturn
              ? styles.titleDescriptionForReturn
              : styles.titleDescription
          }
        >
          {this.props.addressDescription}
          <div className={styles.checkCircle}>
            <CheckBox selected={this.props.selected} />
          </div>
        </div>
      </div>
    );
  }
}

DeliveryAddressCopy.propTypes = {
  addressTitle: PropTypes.string,
  addressDescription: PropTypes.string,
  selected: PropTypes.bool,
  selectItem: PropTypes.func,
  isReturn: PropTypes.bool
};
DeliveryAddressCopy.defaultProps = {
  isReturn: false
};
