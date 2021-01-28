import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import format from "date-fns/format";

import {
  setDataLayer,
  ADOBE_MY_ACCOUNT_WRITE_REVIEW,
  setDataLayerForMyAccountDirectCalls,
  ADOBE_MY_ACCOUNT_ORDER_RETURN_CANCEL,
  ADOBE_RETURN_LINK_CLICKED,
  ADOBE_REQUEST_INVOICE_LINK_CLICKED,
  ADOBE_RETURN_JOURNEY_INITIATED,
  ADOBE_MY_ACCOUNT_RETURN_CANCEL,
  ADOBE_ITEM_DETAILS_LINK_CLICKED
} from "../../lib/adobeUtils";
import {
  CASH_ON_DELIVERY,
  RETURNS_PREFIX,
  RETURN_LANDING,
  RETURNS_REASON,
  CANCEL,
  WRITE_REVIEW,
  CANCEL_RETURN_REQUEST,
  MY_ACCOUNT,
  ORDER_CODE,
  ORDER
} from "../../lib/constants";
import styles from "./CustomerIssue.css";

const dateFormat = "DD MMM YYYY";
const PAY_PAL = "PayPal";
export const NO = "N";
const SHIPPED = "Shipped";
const ITEM_PACKED = "Item Packed";
const OUT_FOR_DELIVERY = "Out For Delivery";
const ATTEMPTED_NOT_DELIVERED = "Attempted not delivered";
const COULD_NOT_BE_DELIVERED = "Could not be delivered";
const RETURN_INITIATED = "Return Initiated";
const PICKUP_SCHEDULED = "Pick up Scheduled";
const RETURN_REQUESTED = "Return Requested";
class OrderActionButton extends Component {
  writeReview(productCode) {
    setDataLayer(ADOBE_MY_ACCOUNT_WRITE_REVIEW);
    this.props.history.push(`/p-${productCode.toLowerCase()}${WRITE_REVIEW}`);
  }

  requestInvoice(lineID, orderNumber) {
    setDataLayer(ADOBE_REQUEST_INVOICE_LINK_CLICKED);
    if (this.props.sendInvoice) {
      this.props.sendInvoice(lineID, orderNumber);
    }
  }

  cancelItem(transactionId, ussid, orderCode, orderId, orderDate) {
    setDataLayerForMyAccountDirectCalls(ADOBE_MY_ACCOUNT_ORDER_RETURN_CANCEL);
    this.props.history.push({
      pathname: `${CANCEL}/${orderCode}`,
      state: {
        transactionId: transactionId,
        ussid: ussid,
        orderId: orderId,
        orderDate: orderDate
      }
    });
  }

  cancelReturnRequest(transactionId, orderCode) {
    setDataLayerForMyAccountDirectCalls(ADOBE_MY_ACCOUNT_RETURN_CANCEL);
    this.props.history.push({
      pathname: `${CANCEL_RETURN_REQUEST}/${orderCode}/${transactionId}`
    });
  }

  replaceItem(sellerorderno, paymentMethod, transactionId) {
    sessionStorage.setItem("returnTransactionId", transactionId);
    if (sellerorderno) {
      let isCOD = false;
      let isPaypal = false;
      if (paymentMethod === CASH_ON_DELIVERY) {
        isCOD = true;
      }
      if (paymentMethod === PAY_PAL) {
        isPaypal = true;
      }
      setDataLayer(ADOBE_RETURN_LINK_CLICKED);
      setDataLayer(ADOBE_RETURN_JOURNEY_INITIATED);
      this.props.history.push({
        pathname: `${RETURNS_PREFIX}/${sellerorderno}${RETURN_LANDING}${RETURNS_REASON}`,
        state: {
          isCOD,
          isPaypal: isPaypal,
          authorizedRequest: true,
          transactionId: transactionId
        }
      });
    }
  }

  onViewItemDetails(orderId, transactionId) {
    setDataLayer(ADOBE_ITEM_DETAILS_LINK_CLICKED);
    this.props.history.push(
      `${MY_ACCOUNT}${ORDER}/?${ORDER_CODE}=${orderId}&transactionId=${transactionId}`
    );
  }

  getTrackOrderText(statusDisplay, isGiveAway, isEgvOrder) {
    let trackOrderText = "View Order";
    if (!isEgvOrder && isGiveAway === NO) {
      if (
        statusDisplay === ITEM_PACKED ||
        statusDisplay === SHIPPED ||
        statusDisplay === OUT_FOR_DELIVERY ||
        statusDisplay === ATTEMPTED_NOT_DELIVERED ||
        statusDisplay === COULD_NOT_BE_DELIVERED ||
        statusDisplay === RETURN_INITIATED ||
        statusDisplay === PICKUP_SCHEDULED ||
        statusDisplay === RETURN_REQUESTED
      ) {
        trackOrderText = "Track Order";
      }
    }
    return trackOrderText;
  }

  render() {
    const { selectedOrder } = this.props;
    return (
      <div>
        {selectedOrder &&
          selectedOrder.products &&
          selectedOrder.products[0].isGiveAway === NO &&
          (selectedOrder.products[0].consignmentStatus != "PAYMENT_PENDING" ||
            selectedOrder.products[0].consignmentStatus !=
              "PAYMENT_TIMEOUT") && (
            <div
              className={styles.orderActionButton}
              onClick={() =>
                this.onViewItemDetails(
                  selectedOrder.orderId,
                  selectedOrder.products[0].transactionId
                )
              }
            >
              {this.getTrackOrderText(
                selectedOrder.products[0].statusDisplay,
                selectedOrder.products[0].isGiveAway,
                selectedOrder.isEgvOrder
              )}
            </div>
          )}
        {selectedOrder &&
          selectedOrder.products &&
          selectedOrder.products[0].cancel && (
            <div
              className={styles.orderActionButton}
              onClick={() =>
                this.cancelItem(
                  selectedOrder.products[0].transactionId,
                  selectedOrder.products[0].USSID,
                  selectedOrder.products[0].sellerorderno,
                  selectedOrder.orderId,
                  format(selectedOrder.orderDate, dateFormat)
                )
              }
            >
              Cancel Order
            </div>
          )}
        {selectedOrder &&
          selectedOrder.products &&
          selectedOrder.products[0].isReturned && (
            <div
              className={styles.orderActionButton}
              onClick={() =>
                this.replaceItem(
                  selectedOrder.products[0].sellerorderno,
                  selectedOrder.paymentMethod,
                  selectedOrder.products[0].transactionId
                )
              }
            >
              Return Order
            </div>
          )}

        {selectedOrder &&
          selectedOrder.products &&
          selectedOrder.products[0].isInvoiceAvailable &&
          (selectedOrder.products[0].consignmentStatus === "DELIVERED" ||
            selectedOrder.products[0].consignmentStatus === "HOTC" ||
            selectedOrder.products[0].consignmentStatus === "ORDER_COLLECTED" ||
            selectedOrder.products[0].consignmentStatus ===
              "RETURN_CANCELLED_CUS") && (
            <div
              className={styles.orderActionButton}
              onClick={() =>
                this.requestInvoice(
                  selectedOrder.products[0].transactionId,
                  selectedOrder.products[0].sellerorderno
                )
              }
            >
              Request Invoice
            </div>
          )}

        {selectedOrder &&
          selectedOrder.products &&
          selectedOrder.products[0].isReturnCancelable && (
            <div
              className={styles.orderActionButton}
              onClick={() =>
                this.cancelReturnRequest(
                  selectedOrder.products[0].transactionId,
                  selectedOrder.products[0].sellerorderno
                )
              }
            >
              Cancel Return Request
            </div>
          )}
        {selectedOrder &&
          selectedOrder.products &&
          selectedOrder.products[0] &&
          selectedOrder.products[0].consignmentStatus &&
          selectedOrder.products[0].consignmentStatus != "ORDER_ALLOCATED" &&
          selectedOrder.products[0].consignmentStatus != "PACKED" &&
          selectedOrder.products[0].consignmentStatus !=
            "RETURNINITIATED_BY_RTO" &&
          selectedOrder.products[0].consignmentStatus != "OUT_FOR_DELIVERY" &&
          selectedOrder.products[0].consignmentStatus != "HOTC" &&
          selectedOrder.products[0].consignmentStatus != "UNDELIVERED" &&
          selectedOrder.products[0].consignmentStatus !=
            "CANCELLATION_INITIATED" &&
          selectedOrder.products[0].consignmentStatus != "PAYMENT_TIMEOUT" &&
          selectedOrder.products[0].consignmentStatus != "PICK_CONFIRMED" &&
          selectedOrder.products[0].consignmentStatus !=
            "ORDER_UNCOLLECTED" && (
            <div
              className={styles.orderActionButton}
              onClick={() =>
                this.writeReview(selectedOrder.products[0].productcode)
              }
            >
              Write Review
            </div>
          )}
      </div>
    );
  }
}

export default withRouter(OrderActionButton);
