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
        <MobileOnly>
          {deliveredAddress && (
            <div className={styles.addressHolder}>
              <div className={styles.deliveredTo}>
                {`${this.props.orderDeliveryHeaderText} :`}
              </div>

              <div className={styles.address}>
                {this.props.deliveredAddress}
              </div>
            </div>
          )}
        </MobileOnly>
        <div className={styles.addressHolder}>
          <DesktopOnly>
            <React.Fragment>
              {(this.props.deliveredAddress1 ||
                this.props.deliveredAddress2 ||
                this.props.deliveredAddress3) && (
                <div className={styles.deliveredTo}>
                  {`${this.props.orderDeliveryHeaderText} :`}
                </div>
              )}
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
        </div>
        {!this.props.isShowDataHorizontal && (
          <React.Fragment>
            <DesktopOnly>
              {this.props.soldBy && (
                <div className={styles.orderSoldBy}>
                  <div className={styles.soldLabelText}>Sold by:</div>
                  <div className={styles.soldInfoText}>{this.props.soldBy}</div>
                </div>
              )}
            </DesktopOnly>
            {this.props.deliveredDate && (
              <div className={styles.deliverDateHolder}>
                <div className={styles.labelText}>Delivered on:</div>
                <div className={styles.infoText}>
                  {this.props.deliveredDate}
                </div>
              </div>
            )}
            <MobileOnly>
              {this.props.soldBy && (
                <div className={styles.orderSoldBy}>
                  <div className={styles.soldLabelText}>Sold by:</div>
                  <div className={styles.soldInfoText}>{this.props.soldBy}</div>
                </div>
              )}
            </MobileOnly>
          </React.Fragment>
        )}
        {this.props.children}
        {this.props.isShowDataHorizontal && (
          <div className={styles.inLineShowData}>
            {this.props.deliveredDate && (
              <div className={styles.deliveryDateOnHorizontal}>
                <div className={styles.labelText}>Delivered on:</div>
                <div className={styles.infoText}>
                  {this.props.deliveredDate}
                </div>
              </div>
            )}

            {this.props.soldBy && (
              <div className={styles.orderSoldBy}>
                <div className={styles.soldLabelText}>Sold by:</div>
                <div className={styles.soldInfoText}>{this.props.soldBy}</div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
OrderDelivered.propTypes = {
  deliveredAddress: PropTypes.string,
  deliveredDate: PropTypes.string,
  soldBy: PropTypes.string,
  isShowDataHorizontal: PropTypes.bool
};
OrderDelivered.defaultProps = {
  orderDeliveryHeaderText: "Delivery address",
  isShowDataHorizontal: false
};
