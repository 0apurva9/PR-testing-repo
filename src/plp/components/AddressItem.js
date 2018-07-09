import React from "react";
import styles from "./AddressItem.css";

export default class AddressList extends React.Component {
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
              this.props.active ? styles.activeCheckBox : styles.checkBox
            }
            onClick={() => this.handleClick()}
          />
        </div>
        <div className={styles.address}>{this.props.address}</div>
      </div>
    );
  }
}
