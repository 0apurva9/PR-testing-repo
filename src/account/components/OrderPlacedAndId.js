import React from "react";
import styles from "./OrderPlacedAndId.css";
import PropTypes from "prop-types";
import DesktopOnly from "../../general/components/DesktopOnly";
import MobileOnly from "../../general/components/MobileOnly";
import { MY_ACCOUNT, ORDER, ORDER_CODE } from "../../lib/constants";
import { MY_ACCOUNT_ORDERS_PAGE, MY_ACCOUNT_PAGE } from "../../lib/constants";
import {
  setDataLayer,
  ADOBE_ORDER_DETAILS_LINK_CLICKED
} from "../../lib/adobeUtils";
export default class OrderPlacedAndId extends React.Component {
  onViewDetails(orderId) {
    setDataLayer(ADOBE_ORDER_DETAILS_LINK_CLICKED);
    this.props.pushDetails.push(
      `${MY_ACCOUNT}${ORDER}/?${ORDER_CODE}=${orderId}`
    );
  }

  backToOrderHistory() {
    this.props.backToOrderHistory.push(
      `${MY_ACCOUNT_PAGE}${MY_ACCOUNT_ORDERS_PAGE}`
    );
  }

  render() {
    return (
      <div className={styles.base}>
        <MobileOnly>
          {this.props.placedTime && (
            <div className={styles.orderPlacedHolder}>
              <div className={styles.labelHeader}>{this.props.label}:</div>
              <div className={styles.dataInformationText}>
                {this.props.placedTime}
              </div>
            </div>
          )}

          <div className={styles.orderIdHolder}>
            <div className={styles.labelHeader}>Order ID:</div>
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
                  <div className={styles.labelHeader}>{this.props.label}:</div>
                  <div className={styles.dataInformationText}>
                    {this.props.placedTime}
                  </div>
                </div>
              )}
              {!this.props.isEgvOrder && (
                <div className={styles.orderIdHolder}>
                  {this.props.backHistory === "true" ? (
                    <div
                      className={styles.labelOrderDetailsHeader}
                      onClick={() => this.backToOrderHistory()}
                    >
                      Back to Order History
                    </div>
                  ) : (
                    <div
                      className={styles.labelOrderDetailsHeader}
                      onClick={() => this.onViewDetails(this.props.orderId)}
                    >
                      Order Details
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className={styles.dataHolder}>
              {this.props.placedTime && (
                <div>
                  <div className={styles.labelHeader}>Order ID:</div>
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
  orderId: PropTypes.string,
  isEgvOrder:PropTypes.bool,
  backHistory:PropTypes.bool,
  pushDetails:PropTypes.shape({
    push:PropTypes.func
  }),
  backToOrderHistory:PropTypes.shape({
    push:PropTypes.func
  })
};
OrderPlacedAndId.defaultProps = {
  label: "Order placed on"
};
