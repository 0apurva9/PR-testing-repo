import React from "react";
import styles from "./OrderDelivered.css";
import PropTypes from "prop-types";
import DesktopOnly from "../../general/components/DesktopOnly";
import MobileOnly from "../../general/components/MobileOnly";
export default class OrderDelivered extends React.Component {
  render() {
    let deliveredAddress, address;
    if (this.props.deliveredAddress) {
      address = this.props.deliveredAddress;
      deliveredAddress = address.trim();
    }
    return (
      <div className={styles.base}>
        {deliveredAddress && (
          <div className={styles.addressHolder}>
            <div className={styles.deliveredTo}>
              {`${this.props.orderDeliveryHeaderText} :`}
            </div>
            <MobileOnly>
              <div className={styles.address}>
                {this.props.deliveredAddress}
              </div>
            </MobileOnly>
          </div>
        )}
        <DesktopOnly>
          <React.Fragment>
            <div className={styles.deliveredTo}>
              {`${this.props.orderDeliveryHeaderText} :`}
            </div>
            {this.props.deliveredAddress1 && (
              <div className={styles.address}>
                {this.props.deliveredAddress1}
              </div>
            )}
            {this.props.deliveredAddress2 && (
              <div className={styles.address}>
                {this.props.deliveredAddress2}
              </div>
            )}
            {this.props.deliveredAddress3 && (
              <div className={styles.address}>
                {this.props.deliveredAddress3}
              </div>
            )}
          </React.Fragment>
        </DesktopOnly>
        {this.props.deliveredDate && (
          <div className={styles.deliverDateHolder}>
            <div className={styles.labelText}>Delivered on:</div>
            <div className={styles.infoText}>{this.props.deliveredDate}</div>
          </div>
        )}
        {this.props.soldBy && (
          <div className={styles.orderSoldBy}>
            <div className={styles.labelText}>Sold by:</div>
            <div className={styles.infoText}>{this.props.soldBy}</div>
          </div>
        )}
      </div>
    );
  }
}
OrderDelivered.propTypes = {
  deliveredAddress: PropTypes.string,
  deliveredDate: PropTypes.string,
  soldBy: PropTypes.string
};
OrderDelivered.defaultProps = {
  orderDeliveryHeaderText: "Delivery address"
};
