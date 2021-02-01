import React from "react";
import AddressItem from "./AddressItem";
import styles from "./AddressList.css";
export default class AddressList extends React.Component {
  render() {
    return (
      <div className={styles.base}>
        {this.props.data &&
          this.props.data.map((val, i) => {
            return (
              <AddressItem
                key={i}
                heading={val.addressType}
                address={`${val.line1 ? val.line1 : ""} ${
                  val.town ? val.town : ""
                } ${val.city ? val.city : ""}, ${val.state ? val.state : ""} ${
                  val.postalCode ? val.postalCode : ""
                }`}
                value={val.postalCode}
                selectItem={() =>
                  this.props.selectAddress(val.postalCode, val.id)
                }
              />
            );
          })}
      </div>
    );
  }
}
