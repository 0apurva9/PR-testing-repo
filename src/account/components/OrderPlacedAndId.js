import React from "react";
import styles from "./OrderPlacedAndId.css";
import PropTypes from "prop-types";
import DesktopOnly from "../../general/components/DesktopOnly";
import MobileOnly from "../../general/components/MobileOnly";
import { MY_ACCOUNT, ORDER, ORDER_CODE } from "../../lib/constants";
import { Redirect } from "react-router-dom";
// import { push } from 'react-router-redux';
export default class OrderPlacedAndId extends React.Component {
  onViewDetails(orderId) {
    console.log("this.props:", this.props);
    this.props.pushDetails.push(
      `${MY_ACCOUNT}${ORDER}/?${ORDER_CODE}=${orderId}`
    );
  }
  render() {
    return (
      <div className={styles.base}>
        <MobileOnly>
          {this.props.placedTime && (
            <div className={styles.orderPlacedHolder}>
              <div className={styles.labelHeader}>{this.props.label} :</div>
              <div className={styles.dataInformationText}>
                {this.props.placedTime}
              </div>
            </div>
          )}

          <div className={styles.orderIdHolder}>
            <div className={styles.labelHeader}>Order ID :</div>
            <div className={styles.dataInformationText}>
              {this.props.orderId}
            </div>
          </div>
        </MobileOnly>
        <DesktopOnly>
          <div>
            <div className={styles.dataHolder}>
              {this.props.placedTime && (
                <div className={styles.orderPlacedHolder}>
                  <div className={styles.labelHeader}>{this.props.label} :</div>
                  <div className={styles.dataInformationText}>
                    {this.props.placedTime}
                  </div>
                  <div className={styles.orderIdHolder}>
                    <div
                      className={styles.labelOrderDetailsHeader}
                      onClick={() => this.onViewDetails(this.props.orderId)}
                    >
                      Order Details
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className={styles.dataHolder}>
              {this.props.placedTime && (
                <div>
                  <div className={styles.labelHeader}> Order ID: </div>
                  <div className={styles.dataInformationText}>
                    {this.props.orderId}
                  </div>
                </div>
              )}
            </div>
          </div>
        </DesktopOnly>
      </div>
    );
  }
}
OrderPlacedAndId.propTypes = {
  label: PropTypes.string,
  placedTime: PropTypes.string,
  orderId: PropTypes.string
};
OrderPlacedAndId.defaultProps = {
  label: "Order placed"
};
