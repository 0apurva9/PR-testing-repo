import React from "react";
import PropTypes from "prop-types";
import styles from "./AddressItem.css";

export default class AddressItem extends React.Component {
  handleClick() {
    if (this.props.selectItem) {
      this.props.selectItem();
    }
  }
  render() {
    return (
      <div className={styles.base}>
        <div className={styles.head}>
          {this.props.heading}
          <div
            className={
              this.props.selected ? styles.activeCheckBox : styles.checkBox
            }
            onClick={() => this.handleClick()}
          />
        </div>
        <div className={styles.address}>{this.props.address}</div>
      </div>
    );
  }
}
AddressItem.propTypes = {
  heading: PropTypes.string,
  address: PropTypes.string,
  selectItem: PropTypes.func,
  selected: PropTypes.bool
};
