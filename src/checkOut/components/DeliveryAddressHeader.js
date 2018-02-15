import React from "react";
import styles from "./DeliveryAddressHeader.css";
import DeliveryAddressCopy from "../../Cart/components/DeliveryAddressCopy";
export default class DeliveryAddressHeader extends React.Component {
  render() {
    return (
      <div className={styles.base}>
        <div className={styles.confirm}>
          {this.props.confirmTitle}
          <div className={styles.circle}>1</div>
        </div>
        <DeliveryAddressCopy
          addressTitle={this.props.addressTitle}
          addressDescription={this.props.addressDescription}
          selected={this.props.selected}
        />
      </div>
    );
  }
}
