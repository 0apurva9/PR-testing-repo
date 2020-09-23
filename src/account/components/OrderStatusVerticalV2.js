import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import styles from "./OrderStatusHorizontal.css";
import PropTypes from "prop-types";
import {
  ORDER_CONFIRMED,
  ORDER_IN_PROCESS,
  CANCEL_STATUS,
  SHIPPED,
  DELIVERED,
  REFUND_INITIATED,
  READY_FOR_COLLECTION,
  ORDER_COLLECTED,
  ORDER_NOT_COLLECTED,
  ORDER_CANCELLED,
  ITEM_PACKED,
  RETURN_INITIATED,
  PICKUP_SCHEDULED,
  RETURN_CANCELLED,
  UNDELIVERED,
  NOT_DELIVERED,
  OUT_FOR_DELIVERY,
  RETURN_REQUESTED,
  RETURN_DECLINED,
  REFUND_SUCCESSFUL,
  HOTC,
  RETURNINITIATED_BY_RTO,
  RTO_INITIATED,
  REFUND_IN_PROGRESS,
  RETURN_CLOSED,
  RETURN_COMPLETED,
  CASH_ON_DELIVERY,
  ORDER_REJECTED,
  RTO_DELIVERED,
  RTO_IN_PROGRESS
} from "../../lib/constants";

export default class OrderStatusVerticalV2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: false
    };
  }
  handleMoreDetails(val) {
    // Changes done for CSFIC-153
    if (this.props.sshipAwbTrackingUrl) {
      this.copySshipAwbTrackingUrl(
        this.props.sshipAwbTrackingUrl,
        this.props.trackingAWB
      );
    } else {
      if (
        this.props.consignmentStatus == HOTC &&
        this.props.statusDisplay.toUpperCase() !== SHIPPED
      ) {
        const showAlertMessage = {
          orderNotShiped: true,
          alertMessage: "Item will be trackable when the order is Shipped",
          orderCode: this.props.orderCode
        };
        this.props.showShippingDetails(showAlertMessage);
      } else {
        if (this.props.showShippingDetails && val) {
          this.props.showShippingDetails(val);
        }
      }
    }
  }

  copySshipAwbTrackingUrl = (sshipAwbTrackingUrl, trackingAWB) => {
    // event.preventDefault();
    // event.stopPropagation();
    let copyText = this.refs.copyThisLink;

    document.addEventListener(
      "copy",
      function(e) {
        e.clipboardData.setData("text/plain", trackingAWB);
        e.preventDefault();
      },
      true
    );

    document.execCommand("copy");
    this.props.displayToast("AWB Copied to Clipboard!");
    setTimeout(function() {
      window.open(sshipAwbTrackingUrl, "_blank");
    }, 1000);
  };
  render() {
    if (!this.props.statusMessageList) {
      return null;
    }
    const completedSteps = this.props.statusMessageList.map(val => {
      return val.key;
    });
    const orderConfirmedData = this.props.statusMessageList.find(val => {
      return val.key === ORDER_CONFIRMED;
    });
    const orderInProcessData = this.props.statusMessageList.find(val => {
      return val.key === ORDER_IN_PROCESS;
    });
    const deliveredData = this.props.statusMessageList.find(val => {
      return val.key === DELIVERED;
    });
    const readyForCollectionData = this.props.statusMessageList.find(val => {
      return val.key === READY_FOR_COLLECTION;
    });
    const orderCollectedData = this.props.statusMessageList.find(val => {
      return val.key === ORDER_COLLECTED;
    });
    const orderNotCollectedData = this.props.statusMessageList.find(val => {
      return val.key === ORDER_NOT_COLLECTED;
    });
    const cancelledData = this.props.statusMessageList.find(val => {
      return val.key === ORDER_CANCELLED;
    });
    const itemPackedData = this.props.statusMessageList.find(val => {
      return val.key === ITEM_PACKED;
    });
    const shippedData = this.props.statusMessageList.find(val => {
      return val.key === SHIPPED;
    });
    const returnInitiatedData = this.props.statusMessageList.find(val => {
      return val.key === RETURN_INITIATED;
    });
    const returnCancelledData = this.props.statusMessageList.find(val => {
      return val.key === RETURN_CANCELLED;
    });
    const pickupScheduledData = this.props.statusMessageList.find(val => {
      return val.key === PICKUP_SCHEDULED;
    });

    const unDeliveredData = this.props.statusMessageList.find(val => {
      return val.key === UNDELIVERED;
    });
    const notDeliveredData = this.props.statusMessageList.find(val => {
      return val.key === NOT_DELIVERED;
    });
    const outForDeliveryData = this.props.statusMessageList.find(val => {
      return val.key === OUT_FOR_DELIVERY;
    });
    const returnRequestedData = this.props.statusMessageList.find(val => {
      return val.key === RETURN_REQUESTED;
    });
    const returnDeclinedData = this.props.statusMessageList.find(val => {
      return val.key === RETURN_DECLINED;
    });
    const refundInitiatedData = this.props.statusMessageList.find(val => {
      return val.key === REFUND_INITIATED;
    });
    const refundSuccessfulData = this.props.statusMessageList.find(val => {
      return val.key === REFUND_SUCCESSFUL;
    });
    //to get the active order status
    //sequence should be maintained
    let activeOrderStatus = "";
    let orderEDHD = [];
    if (!this.props.isCNC) {
      // let orderEDHD = [];
      if (orderConfirmedData && orderConfirmedData.key) {
        orderEDHD.push(orderConfirmedData.key);
      }
      if (orderInProcessData && orderInProcessData.key) {
        orderEDHD.push(orderInProcessData.key);
      }
      if (itemPackedData && itemPackedData.key) {
        orderEDHD.push(itemPackedData.key);
      }
      if (shippedData && shippedData.key) {
        orderEDHD.push(shippedData.key);
      }
      if (deliveredData && deliveredData.key) {
        orderEDHD.push(deliveredData.key);
      }
      if (outForDeliveryData && outForDeliveryData.key) {
        orderEDHD.push(outForDeliveryData.key);
      }
      if (orderNotCollectedData && orderNotCollectedData.key) {
        orderEDHD.push(orderNotCollectedData.key);
      }
      if (cancelledData && cancelledData.key) {
        orderEDHD.push(cancelledData.key);
      }
      if (returnRequestedData && returnRequestedData.key) {
        orderEDHD.push(returnRequestedData.key);
      }
      if (returnInitiatedData && returnInitiatedData.key) {
        orderEDHD.push(returnInitiatedData.key);
      }

      if (pickupScheduledData && pickupScheduledData.key) {
        orderEDHD.push(pickupScheduledData.key);
      }

      if (returnCancelledData && returnCancelledData.key) {
        orderEDHD.push(returnCancelledData.key);
      }

      if (unDeliveredData && unDeliveredData.key) {
        orderEDHD.push(unDeliveredData.key);
      }
      if (notDeliveredData && notDeliveredData.key) {
        orderEDHD.push(notDeliveredData.key);
      }
      if (returnDeclinedData && returnDeclinedData.key) {
        orderEDHD.push(returnDeclinedData.key);
      }
      if (refundInitiatedData && refundInitiatedData.key) {
        orderEDHD.push(refundInitiatedData.key);
      }
      if (refundSuccessfulData && refundSuccessfulData.key) {
        orderEDHD.push(refundSuccessfulData.key);
      }
      activeOrderStatus = orderEDHD[orderEDHD.length - 1];
    }
    let orderCNC = [];
    if (this.props.isCNC) {
      if (orderConfirmedData && orderConfirmedData.key) {
        orderCNC.push(orderConfirmedData.key);
      }
      if (orderInProcessData && orderInProcessData.key) {
        orderCNC.push(orderInProcessData.key);
      }
      if (itemPackedData && itemPackedData.key) {
        orderCNC.push(itemPackedData.key);
      }
      if (shippedData && shippedData.key) {
        orderCNC.push(shippedData.key);
      }
      if (outForDeliveryData && outForDeliveryData.key) {
        orderCNC.push(outForDeliveryData.key);
      }
      if (readyForCollectionData && readyForCollectionData.key) {
        orderCNC.push(readyForCollectionData.key);
      }
      if (returnRequestedData && returnRequestedData.key) {
        orderCNC.push(returnRequestedData.key);
      }
      if (orderCollectedData && orderCollectedData.key) {
        orderCNC.push(orderCollectedData.key);
      }
      if (orderNotCollectedData && orderNotCollectedData.key) {
        orderCNC.push(orderNotCollectedData.key);
      }
      if (cancelledData && cancelledData.key) {
        orderCNC.push(cancelledData.key);
      }
      if (returnInitiatedData && returnInitiatedData.key) {
        orderCNC.push(returnInitiatedData.key);
      }
      if (pickupScheduledData && pickupScheduledData.key) {
        orderCNC.push(pickupScheduledData.key);
      }
      if (returnCancelledData && returnCancelledData.key) {
        orderCNC.push(returnCancelledData.key);
      }
      if (unDeliveredData && unDeliveredData.key) {
        orderCNC.push(unDeliveredData.key);
      }
      if (notDeliveredData && notDeliveredData.key) {
        orderCNC.push(notDeliveredData.key);
      }
      if (returnDeclinedData && returnDeclinedData.key) {
        orderCNC.push(returnDeclinedData.key);
      }
      if (refundInitiatedData && refundInitiatedData.key) {
        orderCNC.push(refundInitiatedData.key);
      }
      if (refundSuccessfulData && refundSuccessfulData.key) {
        orderCNC.push(refundSuccessfulData.key);
      }
      activeOrderStatus = orderCNC[orderCNC.length - 1];
    }
    //order confirmed
    let orderConfirmedDate = "";
    let orderConfirmedTime = "";
    let orderConfirmedCustomerFacingName = "Order Confirmed";
    if (orderConfirmedData && orderConfirmedData.value.customerFacingName) {
      orderConfirmedCustomerFacingName =
        orderConfirmedData.value.customerFacingName;
    }
    if (
      orderConfirmedData &&
      orderConfirmedData.value.statusList &&
      orderConfirmedData.value.statusList[0] &&
      orderConfirmedData.value.statusList[0].statusMessageList &&
      orderConfirmedData.value.statusList[0].statusMessageList[0]
    ) {
      orderConfirmedDate =
        orderConfirmedData.value.statusList[0].statusMessageList[0].date;
      orderConfirmedTime =
        orderConfirmedData.value.statusList[0].statusMessageList[0].time;
    }

    //order in process
    let orderInProcessDate = "";
    let orderInProcessTime = "";
    let orderInProcessCustomerFacingName = "Order In Process";
    if (orderInProcessData && orderInProcessData.value.customerFacingName) {
      orderInProcessCustomerFacingName =
        orderInProcessData.value.customerFacingName;
    }
    if (
      orderInProcessData &&
      orderInProcessData.value.statusList &&
      orderInProcessData.value.statusList[0] &&
      orderInProcessData.value.statusList[0].statusMessageList &&
      orderInProcessData.value.statusList[0].statusMessageList[0]
    ) {
      orderInProcessDate =
        orderInProcessData.value.statusList[0].statusMessageList[0].date;
      orderInProcessTime =
        orderInProcessData.value.statusList[0].statusMessageList[0].time;
    }

    //item packed
    let itemPackedDate = " ";
    let itemPackedTime = " ";
    let itemPackedCustomerFacingName = "Item Packed";
    if (itemPackedData && itemPackedData.value.customerFacingName) {
      itemPackedCustomerFacingName = itemPackedData.value.customerFacingName;
    }
    if (
      itemPackedData &&
      itemPackedData.value.statusList &&
      itemPackedData.value.statusList[0] &&
      itemPackedData.value.statusList[0].statusMessageList &&
      itemPackedData.value.statusList[0].statusMessageList[0]
    ) {
      //show date time from HOTC or Packed
      itemPackedDate =
        itemPackedData.value.statusList[1] &&
        itemPackedData.value.statusList[1].statusMessageList[0].date
          ? itemPackedData.value.statusList[1].statusMessageList[0].date
          : itemPackedData.value.statusList[0].statusMessageList[0].date;

      itemPackedTime =
        itemPackedData.value.statusList[1] &&
        itemPackedData.value.statusList[1].statusMessageList[0].time
          ? itemPackedData.value.statusList[1].statusMessageList[0].time
          : itemPackedData.value.statusList[0].statusMessageList[0].time;
    }

    //shipped
    let shippedDate = " ";
    let shippedTime = " ";
    let shippingList = null;
    let shippedDataCustomerFacingName = "Shipped";
    if (shippedData && shippedData.value.customerFacingName) {
      shippedDataCustomerFacingName = shippedData.value.customerFacingName;
    }

    if (
      shippedData &&
      shippedData.value.statusList &&
      shippedData.value.statusList[0] &&
      shippedData.value.statusList[0].statusMessageList &&
      shippedData.value.statusList[0].statusMessageList[0]
    ) {
      //show date time from HOTC or Packed
      shippedDate =
        shippedData.value.statusList[1] &&
        shippedData.value.statusList[1].statusMessageList[0].date
          ? shippedData.value.statusList[1].statusMessageList[0].date
          : shippedData.value.statusList[0].statusMessageList[0].date;

      shippedTime =
        shippedData.value.statusList[1] &&
        shippedData.value.statusList[1].statusMessageList[0].time
          ? shippedData.value.statusList[1].statusMessageList[0].time
          : shippedData.value.statusList[0].statusMessageList[0].time;
      shippingList = shippedData.value.statusList[0].statusMessageList;
    }

    //out for delivery
    let outForDeliveryDate = "";
    let outForDeliveryTime = "";
    let outForDeliveryCustomerFacingName = "Out For Delivery";
    if (outForDeliveryData && outForDeliveryData.value.customerFacingName) {
      outForDeliveryCustomerFacingName =
        outForDeliveryData.value.customerFacingName;
    }
    if (
      outForDeliveryData &&
      outForDeliveryData.value.statusList &&
      outForDeliveryData.value.statusList[0] &&
      outForDeliveryData.value.statusList[0].statusMessageList &&
      outForDeliveryData.value.statusList[0].statusMessageList[0]
    ) {
      //show date time from HOTC or Packed
      outForDeliveryDate =
        outForDeliveryData.value.statusList[1] &&
        outForDeliveryData.value.statusList[1].statusMessageList[0].date
          ? outForDeliveryData.value.statusList[1].statusMessageList[0].date
          : outForDeliveryData.value.statusList[0].statusMessageList[0].date;

      outForDeliveryTime =
        outForDeliveryData.value.statusList[1] &&
        outForDeliveryData.value.statusList[1].statusMessageList[0].time
          ? outForDeliveryData.value.statusList[1].statusMessageList[0].time
          : outForDeliveryData.value.statusList[0].statusMessageList[0].time;
    }

    //delivered
    let deliveredDate = "";
    let deliveredTime = "";
    let deliveredCustomerFacingName = "Delivered";
    if (deliveredData && deliveredData.value.customerFacingName) {
      deliveredCustomerFacingName = deliveredData.value.customerFacingName;
    }
    if (
      deliveredData &&
      deliveredData.value.statusList &&
      deliveredData.value.statusList[0] &&
      deliveredData.value.statusList[0].statusMessageList &&
      deliveredData.value.statusList[0].statusMessageList[0]
    ) {
      deliveredDate =
        deliveredData.value.statusList[0].statusMessageList[0].date;
      deliveredTime =
        deliveredData.value.statusList[0].statusMessageList[0].time;
    }
    //return requested
    let returnRequestedDate = "";
    let returnRequestedTime = "";
    let returnRequestedShipmentStatus = "";
    let returnRequestedCustomerFacingName = "Return Requested";
    if (returnRequestedData && returnRequestedData.value.customerFacingName) {
      returnRequestedCustomerFacingName =
        returnRequestedData.value.customerFacingName;
    }
    if (
      returnRequestedData &&
      returnRequestedData.value.statusList &&
      returnRequestedData.value.statusList[0] &&
      returnRequestedData.value.statusList[0].statusMessageList &&
      returnRequestedData.value.statusList[0].statusMessageList[0]
    ) {
      returnRequestedDate =
        returnRequestedData.value.statusList[0].statusMessageList[0].date;
      returnRequestedTime =
        returnRequestedData.value.statusList[0].statusMessageList[0].time;
    }
    if (
      returnRequestedData &&
      returnRequestedData.value.statusList &&
      returnRequestedData.value.statusList[0]
    ) {
      returnRequestedShipmentStatus =
        returnRequestedData.value.statusList[0].shipmentStatus;
    }
    //not delivered
    let notDeliveredDate = "";
    let notDeliveredTime = "";
    let responseCodeForNotDelivered = "";
    let notDeliveredCustomerFacingName = "Not Delivered";
    if (notDeliveredData && notDeliveredData.value.customerFacingName) {
      notDeliveredCustomerFacingName =
        notDeliveredData.value.customerFacingName;
    }
    if (
      notDeliveredData &&
      notDeliveredData.value.statusList &&
      notDeliveredData.value.statusList[0] &&
      notDeliveredData.value.statusList[0].statusMessageList &&
      notDeliveredData.value.statusList[0].statusMessageList[0]
    ) {
      notDeliveredDate =
        notDeliveredData.value.statusList[0].statusMessageList[0].date;
      notDeliveredTime =
        notDeliveredData.value.statusList[0].statusMessageList[0].time;
      responseCodeForNotDelivered =
        notDeliveredData.value.statusList[0].responseCode;
    }

    //un delivered
    let unDeliveredDate = "";
    let unDeliveredTime = "";
    let unDeliveredCustomerFacingName = "Attempted not delivered";
    if (unDeliveredData && unDeliveredData.value.customerFacingName) {
      unDeliveredCustomerFacingName = unDeliveredData.value.customerFacingName;
    }
    if (
      unDeliveredData &&
      unDeliveredData.value.statusList &&
      unDeliveredData.value.statusList[0] &&
      unDeliveredData.value.statusList[0].statusMessageList &&
      unDeliveredData.value.statusList[0].statusMessageList[0]
    ) {
      unDeliveredDate =
        unDeliveredData.value.statusList[0].statusMessageList[0].date;
      unDeliveredTime =
        unDeliveredData.value.statusList[0].statusMessageList[0].time;
    }

    //cancelled
    let cancelledDate = "";
    let cancelledTime = "";
    let cancelledCustomerFacingName = "Order Cancelled";
    if (cancelledData && cancelledData.value.customerFacingName) {
      cancelledCustomerFacingName = cancelledData.value.customerFacingName;
    }
    if (
      cancelledData &&
      cancelledData.value.statusList &&
      cancelledData.value.statusList[0] &&
      cancelledData.value.statusList[0].statusMessageList &&
      cancelledData.value.statusList[0].statusMessageList[0]
    ) {
      cancelledDate =
        cancelledData.value.statusList[0].statusMessageList[0].date;
      cancelledTime =
        cancelledData.value.statusList[0].statusMessageList[0].time;
    }

    //ready for collection
    let readyForCollectionDate = "";
    let readyForCollectionTime = "";
    let readyForCollectionCustomerFacingName = "Ready For Collection";
    if (
      readyForCollectionData &&
      readyForCollectionData.value.customerFacingName
    ) {
      readyForCollectionCustomerFacingName =
        readyForCollectionData.value.customerFacingName;
    }
    if (
      readyForCollectionData &&
      readyForCollectionData.value.statusList &&
      readyForCollectionData.value.statusList[0] &&
      readyForCollectionData.value.statusList[0].statusMessageList &&
      readyForCollectionData.value.statusList[0].statusMessageList[0]
    ) {
      readyForCollectionDate =
        readyForCollectionData.value.statusList[0].statusMessageList[0].date;
      readyForCollectionTime =
        readyForCollectionData.value.statusList[0].statusMessageList[0].time;
    }

    //order collected
    let orderCollectedDate = "";
    let orderCollectedTime = "";
    let orderCollectedCustomerFacingName = "Order Collected";
    if (orderCollectedData && orderCollectedData.value.customerFacingName) {
      orderCollectedCustomerFacingName =
        orderCollectedData.value.customerFacingName;
    }
    if (
      orderCollectedData &&
      orderCollectedData.value.statusList &&
      orderCollectedData.value.statusList[0] &&
      orderCollectedData.value.statusList[0].statusMessageList &&
      orderCollectedData.value.statusList[0].statusMessageList[0]
    ) {
      orderCollectedDate =
        orderCollectedData.value.statusList[0].statusMessageList[0].date;
      orderCollectedTime =
        orderCollectedData.value.statusList[0].statusMessageList[0].time;
    }

    //order uncollected
    let orderNotCollectedDate = "";
    let orderNotCollectedTime = "";
    let orderNotCollectedCustomerFacingName = "Order Not Collected";
    if (
      orderNotCollectedData &&
      orderNotCollectedData.value.customerFacingName
    ) {
      orderNotCollectedCustomerFacingName =
        orderNotCollectedData.value.customerFacingName;
    }
    if (
      orderNotCollectedData &&
      orderNotCollectedData.value.statusList &&
      orderNotCollectedData.value.statusList[0] &&
      orderNotCollectedData.value.statusList[0].statusMessageList &&
      orderNotCollectedData.value.statusList[0].statusMessageList[0]
    ) {
      orderNotCollectedDate =
        orderNotCollectedData.value.statusList[0].statusMessageList[0].date;
      orderNotCollectedTime =
        orderNotCollectedData.value.statusList[0].statusMessageList[0].time;
    }

    //return initiated
    let returnInitiatedDate = "";
    let returnInitiatedTime = "";
    let returnInitiatedShipmentStatus = "";
    let returnInitiatedCustomerFacingName = "Return Initiated";
    if (returnInitiatedData && returnInitiatedData.value.customerFacingName) {
      returnInitiatedCustomerFacingName =
        returnInitiatedData.value.customerFacingName;
    }
    if (
      returnInitiatedData &&
      returnInitiatedData.value.statusList &&
      returnInitiatedData.value.statusList[0] &&
      returnInitiatedData.value.statusList[0].statusMessageList &&
      returnInitiatedData.value.statusList[0].statusMessageList[0]
    ) {
      returnInitiatedDate =
        returnInitiatedData.value.statusList[0].statusMessageList[0].date;
      returnInitiatedTime =
        returnInitiatedData.value.statusList[0].statusMessageList[0].time;
    }
    if (
      returnInitiatedData &&
      returnInitiatedData.value.statusList &&
      returnInitiatedData.value.statusList[0]
    ) {
      returnInitiatedShipmentStatus =
        returnInitiatedData.value.statusList[0].shipmentStatus;
    }

    //return cancelled
    let returnCancelledDate = "";
    let returnCancelledTime = "";
    // let returnCancelledShipmentStatus = "";
    let returnCancelledCustomerFacingName = "Return Cancelled";
    if (returnCancelledData && returnCancelledData.value.customerFacingName) {
      returnCancelledCustomerFacingName =
        returnCancelledData.value.customerFacingName;
    }
    if (
      returnCancelledData &&
      returnCancelledData.value.statusList &&
      returnCancelledData.value.statusList[0] &&
      returnCancelledData.value.statusList[0].statusMessageList &&
      returnCancelledData.value.statusList[0].statusMessageList[0]
    ) {
      returnCancelledDate =
        returnCancelledData.value.statusList[0].statusMessageList[0].date;
      returnCancelledTime =
        returnCancelledData.value.statusList[0].statusMessageList[0].time;
    }
    // if (
    //   returnCancelledData &&
    //   returnCancelledData.value.statusList &&
    //   returnCancelledData.value.statusList[0]
    // ) {
    //   returnCancelledShipmentStatus =
    //     returnCancelledData.value.statusList[0].shipmentStatus;
    // }
    //pickup scheduled
    let pickupScheduledDate = "";
    let pickupScheduledTime = "";
    let pickupScheduledShipmentStatus = "";
    let pickupScheduledCustomerFacingName = "Pick up Scheduled";
    if (pickupScheduledData && pickupScheduledData.value.customerFacingName) {
      pickupScheduledCustomerFacingName =
        pickupScheduledData.value.customerFacingName;
    }
    if (
      pickupScheduledData &&
      pickupScheduledData.value.statusList &&
      pickupScheduledData.value.statusList[0] &&
      pickupScheduledData.value.statusList[0].statusMessageList &&
      pickupScheduledData.value.statusList[0].statusMessageList[0]
    ) {
      pickupScheduledDate =
        pickupScheduledData.value.statusList[0].statusMessageList[0].date;
      pickupScheduledTime =
        pickupScheduledData.value.statusList[0].statusMessageList[0].time;
    }
    if (
      pickupScheduledData &&
      pickupScheduledData.value.statusList &&
      pickupScheduledData.value.statusList[0]
    ) {
      pickupScheduledShipmentStatus =
        pickupScheduledData.value.statusList[0].shipmentStatus;
    }

    //refund initiated
    let refundInitiatedDate = "";
    let refundInitiatedTime = "";
    let refundInitiatedCustomerFacingName = "Refund Initiated";
    let refundInitiatedShipmentStatus = "";
    let statusList =
      refundInitiatedData &&
      refundInitiatedData.value &&
      refundInitiatedData.value.statusList;
    let responseCode = "";
    if (refundInitiatedData && refundInitiatedData.value.customerFacingName) {
      refundInitiatedCustomerFacingName =
        refundInitiatedData.value.customerFacingName;
    }
    if (
      refundInitiatedData &&
      refundInitiatedData.value.statusList &&
      refundInitiatedData.value.statusList[0] &&
      refundInitiatedData.value.statusList[0].statusMessageList &&
      refundInitiatedData.value.statusList[0].statusMessageList[0]
    ) {
      refundInitiatedDate =
        refundInitiatedData.value.statusList[0].statusMessageList[0].date;
      refundInitiatedTime =
        refundInitiatedData.value.statusList[0].statusMessageList[0].time;
    }
    if (
      refundInitiatedData &&
      refundInitiatedData.value.statusList &&
      refundInitiatedData.value.statusList[0]
    ) {
      refundInitiatedShipmentStatus =
        refundInitiatedData.value.statusList[0].shipmentStatus;
      let lastArrayResponseCode = statusList[statusList.length - 1];
      responseCode = lastArrayResponseCode.responseCode;
    }

    //return declined
    let returnDeclinedDate = "";
    let returnDeclinedTime = "";
    let returnDeclinedCustomerFacingName = "Return Declined";
    if (returnDeclinedData && returnDeclinedData.value.customerFacingName) {
      returnDeclinedCustomerFacingName =
        returnDeclinedData.value.customerFacingName;
    }

    if (
      returnDeclinedData &&
      returnDeclinedData.value.statusList &&
      returnDeclinedData.value.statusList[0] &&
      returnDeclinedData.value.statusList[0].statusMessageList &&
      returnDeclinedData.value.statusList[0].statusMessageList[0]
    ) {
      returnDeclinedDate =
        returnDeclinedData.value.statusList[0].statusMessageList[0].date;
      returnDeclinedTime =
        returnDeclinedData.value.statusList[0].statusMessageList[0].time;
    }
    //refund successful
    let refundSuccessfulDate = "";
    let refundSuccessfulTime = "";
    let refundSuccessfulCustomerFacingName = "Refund Successful";
    if (refundSuccessfulData && refundSuccessfulData.value.customerFacingName) {
      refundSuccessfulCustomerFacingName =
        refundSuccessfulData.value.customerFacingName;
    }
    if (
      refundSuccessfulData &&
      refundSuccessfulData.value.statusList &&
      refundSuccessfulData.value.statusList[0] &&
      refundSuccessfulData.value.statusList[0].statusMessageList &&
      refundSuccessfulData.value.statusList[0].statusMessageList[0]
    ) {
      refundSuccessfulDate =
        refundSuccessfulData.value.statusList[0].statusMessageList[0].date;
      refundSuccessfulTime =
        refundSuccessfulData.value.statusList[0].statusMessageList[0].time;
    }
    let showOrderDetails = false;
    if (
      this.props.consignmentStatus == HOTC ||
      this.props.consignmentStatus === OUT_FOR_DELIVERY ||
      this.props.consignmentStatus === UNDELIVERED
    ) {
      showOrderDetails = true;
    }

    const orderCode = this.props.orderCode;

    return (
      <React.Fragment>
        <div className={styles.base}>
          {/* <div className={styles.trackOrderTitle}>Track Order</div> */}
          {this.props.returnMode && this.props.returnType ? (
            <React.Fragment>
              {completedSteps.includes(RETURN_REQUESTED) && (
                <div className={styles.step}>
                  <div className={styles.checkActive} />
                  <div
                    className={
                      activeOrderStatus === RETURN_REQUESTED
                        ? styles.processNameHolderBold
                        : styles.processNameHolder
                    }
                  >
                    {returnRequestedCustomerFacingName}
                    {/* <span className={styles.shipmentStatus}>
                      {returnRequestedShipmentStatus}
                    </span> */}
                  </div>
                  <div className={styles.dateAndTimeHolder}>
                    <div className={styles.timeHolder}>
                      {returnRequestedTime}
                    </div>
                    <div className={styles.dateHolder}>
                      {returnRequestedDate}
                    </div>
                  </div>
                </div>
              )}
              {completedSteps.includes(RETURN_INITIATED) &&
                !this.props.mediationRequired && (
                  <div className={styles.step}>
                    <div className={styles.checkActive} />
                    <div
                      className={
                        activeOrderStatus === RETURN_INITIATED
                          ? styles.processNameHolderBold
                          : styles.processNameHolder
                      }
                    >
                      {returnInitiatedCustomerFacingName}
                      {/* <span className={styles.shipmentStatus}>
                    {returnInitiatedShipmentStatus}
                  </span> */}
                    </div>
                    <div className={styles.dateAndTimeHolder}>
                      <div className={styles.timeHolder}>
                        {returnInitiatedTime}
                      </div>
                      <div className={styles.dateHolder}>
                        {returnInitiatedDate}
                      </div>
                    </div>
                  </div>
                )}

              {completedSteps.includes(REFUND_INITIATED) ? (
                <React.Fragment>
                  <div className={styles.step}>
                    <div
                      className={
                        completedSteps.includes(REFUND_INITIATED)
                          ? styles.checkActive
                          : styles.check
                      }
                    />
                    <div
                      className={
                        activeOrderStatus === REFUND_INITIATED
                          ? styles.processNameHolderBold
                          : styles.processNameHolder
                      }
                    >
                      {refundInitiatedCustomerFacingName}
                    </div>
                    <div className={styles.dateAndTimeHolder}>
                      <div className={styles.timeHolder}>
                        {refundInitiatedTime}
                      </div>
                      <div className={styles.dateHolder}>
                        {refundInitiatedDate}
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {!completedSteps.includes(RETURN_CANCELLED) &&
                  !completedSteps.includes(RETURN_DECLINED) ? (
                    <React.Fragment>
                      {this.props.returnType === "selfShipment" && (
                        <div className={styles.step}>
                          <div
                            className={
                              completedSteps.includes(REFUND_INITIATED)
                                ? styles.checkActive
                                : styles.check
                            }
                          />
                          <div className={styles.processNameHolder}>
                            {refundInitiatedCustomerFacingName}
                          </div>
                          <div className={styles.dateAndTimeHolder}>
                            <div className={styles.timeHolder}>
                              {refundInitiatedTime}
                            </div>
                            <div className={styles.dateHolder}>
                              {refundInitiatedDate}
                            </div>
                          </div>
                        </div>
                      )}
                      {this.props.returnType !== "selfShipment" && (
                        <div
                          className={
                            completedSteps.includes(PICKUP_SCHEDULED)
                              ? styles.step
                              : styles.stepInactive
                          }
                        >
                          <div
                            className={
                              completedSteps.includes(PICKUP_SCHEDULED)
                                ? styles.checkActive
                                : styles.check
                            }
                          />
                          <div
                            className={
                              activeOrderStatus === PICKUP_SCHEDULED
                                ? styles.processNameHolderBold
                                : styles.processNameHolder
                            }
                          >
                            {pickupScheduledCustomerFacingName}
                            {/* <span className={styles.shipmentStatus}>
                            {pickupScheduledShipmentStatus}
                          </span> */}
                          </div>
                          <div className={styles.dateAndTimeHolder}>
                            <div className={styles.timeHolder}>
                              {pickupScheduledTime}
                            </div>
                            <div className={styles.dateHolder}>
                              {pickupScheduledDate}
                            </div>
                          </div>
                        </div>
                      )}
                    </React.Fragment>
                  ) : null}
                </React.Fragment>
              )}

              {completedSteps.includes(RETURN_CANCELLED) ? (
                <React.Fragment>
                  <div className={styles.step}>
                    <div className={styles.checkActive} />
                    <div
                      className={
                        activeOrderStatus === RETURN_CANCELLED
                          ? styles.processNameHolderBold
                          : styles.processNameHolder
                      }
                    >
                      {returnCancelledCustomerFacingName}
                    </div>
                    <div className={styles.dateAndTimeHolder}>
                      <div className={styles.timeHolder}>
                        {returnCancelledTime}
                      </div>
                      <div className={styles.dateHolder}>
                        {returnCancelledDate}
                      </div>
                    </div>
                  </div>
                  {returnCancelledCustomerFacingName ===
                    "Return Cancelled QC Failed" && (
                    <div className={styles.step}>
                      <div className={styles.check} />
                      <div className={styles.processNameHolder}>
                        Refund Rejected
                      </div>
                    </div>
                  )}
                </React.Fragment>
              ) : completedSteps.includes(RETURN_DECLINED) ? (
                <React.Fragment>
                  <div className={styles.step}>
                    <div className={styles.checkActive} />
                    <div
                      className={
                        activeOrderStatus === RETURN_DECLINED
                          ? styles.processNameHolderBold
                          : styles.processNameHolder
                      }
                    >
                      {returnDeclinedCustomerFacingName}
                      {/* <span className={styles.shipmentStatus}>
                    {returnInitiatedShipmentStatus}
                  </span> */}
                    </div>
                    <div className={styles.dateAndTimeHolder}>
                      <div className={styles.timeHolder}>
                        {returnDeclinedTime}
                      </div>
                      <div className={styles.dateHolder}>
                        {returnDeclinedDate}
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              ) : (
                <div
                  className={
                    completedSteps.includes(REFUND_SUCCESSFUL)
                      ? styles.step
                      : styles.stepInactive
                  }
                >
                  <div
                    className={
                      completedSteps.includes(REFUND_SUCCESSFUL)
                        ? styles.checkActive
                        : styles.check
                    }
                  />
                  <div
                    className={
                      activeOrderStatus === REFUND_SUCCESSFUL
                        ? styles.processNameHolderBold
                        : styles.processNameHolder
                    }
                  >
                    {refundSuccessfulCustomerFacingName}
                  </div>
                  <div className={styles.dateAndTimeHolder}>
                    <div className={styles.timeHolder}>
                      {refundSuccessfulTime}
                    </div>
                    <div className={styles.dateHolder}>
                      {refundSuccessfulDate}
                    </div>
                  </div>
                </div>
              )}
            </React.Fragment>
          ) : (
            <React.Fragment>
              {completedSteps.includes(ORDER_CONFIRMED) && (
                <React.Fragment>
                  {/* <div className={styles.orderProcessHolder}>{orderConfirmedCustomerFacingName}</div> */}
                  <div className={styles.step}>
                    <div
                      className={
                        activeOrderStatus === ORDER_CONFIRMED
                          ? styles.processNameHolderBold
                          : styles.processNameHolder
                      }
                    >
                      {orderConfirmedCustomerFacingName}
                    </div>
                    <div className={styles.checkActive} />
                    <div className={styles.dateAndTimeHolder}>
                      <div className={styles.timeHolder}>
                        {orderConfirmedTime}
                      </div>
                      <div className={styles.dateHolder}>
                        {orderConfirmedDate}
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              )}
              {!this.props.isCNC &&
                !responseCode.includes(RETURN_CLOSED) &&
                !responseCode.includes(RETURNINITIATED_BY_RTO) &&
                !responseCode.includes(RTO_INITIATED) &&
                !responseCode.includes(RTO_DELIVERED) &&
                !responseCode.includes(RTO_IN_PROGRESS) &&
                !responseCode.includes(REFUND_IN_PROGRESS) &&
                !responseCode.includes(REFUND_INITIATED) && (
                  <React.Fragment>
                    {/* {check if order is cancelled then show cancelled status} */}
                    {completedSteps.includes(ORDER_CANCELLED) &&
                    this.props.consignmentStatus !== REFUND_IN_PROGRESS ? (
                      <React.Fragment>
                        {/* {completedSteps.includes(ORDER_IN_PROCESS) && (
                          <div className={styles.step}>
                            <div className={styles.checkActive} />
                            <div
                              className={
                                activeOrderStatus === ORDER_IN_PROCESS
                                  ? styles.processNameHolderBold
                                  : styles.processNameHolder
                              }
                            >
                              {orderInProcessCustomerFacingName}
                            </div>
                          </div>
                        )} */}
                        <div
                          className={
                            completedSteps.includes(ORDER_CANCELLED)
                              ? styles.step
                              : styles.stepInactive
                          }
                        >
                          <div
                            className={
                              completedSteps.includes(ORDER_CANCELLED)
                                ? styles.checkActive
                                : styles.check
                            }
                          />
                          <div
                            className={
                              activeOrderStatus === ORDER_CANCELLED
                                ? styles.processNameHolderBold
                                : styles.processNameHolder
                            }
                          >
                            {cancelledCustomerFacingName}
                          </div>

                          <div className={styles.dateAndTimeHolder}>
                            <div className={styles.timeHolder}>
                              {cancelledTime}
                            </div>
                            <div className={styles.dateHolder}>
                              {cancelledDate}
                            </div>
                          </div>
                        </div>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        {completedSteps.includes(NOT_DELIVERED) ? (
                          <React.Fragment>
                            <div className={styles.step}>
                              <div className={styles.checkActive} />
                              <div className={styles.processNameHolder}>
                                {unDeliveredCustomerFacingName}
                              </div>
                              <div className={styles.dateAndTimeHolder}>
                                <div className={styles.timeHolder}>
                                  {unDeliveredTime}
                                </div>
                                <div className={styles.dateHolder}>
                                  {unDeliveredDate}
                                </div>
                              </div>
                            </div>
                            <div className={styles.step}>
                              <div className={styles.checkActive} />
                              <div className={styles.processNameHolderBold}>
                                {notDeliveredCustomerFacingName}
                              </div>
                              <div className={styles.dateAndTimeHolder}>
                                {showOrderDetails ? (
                                  <React.Fragment>
                                    {this.props.logisticName && (
                                      <span
                                        className={styles.itemPackedDetails}
                                      >
                                        Courier: {this.props.logisticName}
                                      </span>
                                    )}
                                    {this.props.trackingAWB && (
                                      <span
                                        className={styles.itemPackedDetails}
                                      >
                                        AWB No: {this.props.trackingAWB}
                                      </span>
                                    )}
                                    <div
                                      className={styles.courierInfoHolder}
                                      onClick={() =>
                                        this.handleMoreDetails({
                                          shippingList,
                                          orderCode
                                        })
                                      }
                                    >
                                      More details
                                    </div>
                                  </React.Fragment>
                                ) : (
                                  <React.Fragment>
                                    <div className={styles.timeHolder}>
                                      {notDeliveredTime}
                                    </div>
                                    <div className={styles.dateHolder}>
                                      {notDeliveredDate}
                                    </div>
                                  </React.Fragment>
                                )}
                              </div>
                            </div>
                          </React.Fragment>
                        ) : (
                          <React.Fragment>
                            {completedSteps.includes(UNDELIVERED) ? (
                              <div className={styles.stepInactive}>
                                <div className={styles.checkActive} />
                                <div className={styles.processNameHolderBold}>
                                  {unDeliveredCustomerFacingName}
                                </div>
                                <div className={styles.dateAndTimeHolder}>
                                  <div className={styles.timeHolder}>
                                    {unDeliveredTime}
                                  </div>
                                  <div className={styles.dateHolder}>
                                    {unDeliveredDate}
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <React.Fragment>
                                {completedSteps.includes(OUT_FOR_DELIVERY) ? (
                                  <div
                                    className={
                                      completedSteps.includes(OUT_FOR_DELIVERY)
                                        ? styles.step
                                        : styles.stepInactive
                                    }
                                  >
                                    <div
                                      className={
                                        completedSteps.includes(
                                          OUT_FOR_DELIVERY
                                        )
                                          ? styles.checkActive
                                          : styles.check
                                      }
                                    />
                                    <div
                                      className={
                                        activeOrderStatus === OUT_FOR_DELIVERY
                                          ? styles.processNameHolderBold
                                          : styles.processNameHolder
                                      }
                                    >
                                      {outForDeliveryCustomerFacingName}
                                    </div>
                                    <div className={styles.dateAndTimeHolder}>
                                      {showOrderDetails ? (
                                        <React.Fragment>
                                          {this.props.logisticName && (
                                            <span
                                              className={
                                                styles.itemPackedDetails
                                              }
                                            >
                                              Courier: {this.props.logisticName}
                                            </span>
                                          )}
                                          {this.props.trackingAWB && (
                                            <span
                                              className={
                                                styles.itemPackedDetails
                                              }
                                            >
                                              AWB No: {this.props.trackingAWB}
                                            </span>
                                          )}
                                          <div
                                            className={styles.courierInfoHolder}
                                            onClick={() =>
                                              this.handleMoreDetails({
                                                shippingList,
                                                orderCode
                                              })
                                            }
                                          >
                                            More details
                                          </div>
                                        </React.Fragment>
                                      ) : (
                                        <React.Fragment>
                                          <div className={styles.timeHolder}>
                                            {outForDeliveryTime}
                                          </div>
                                          <div className={styles.dateHolder}>
                                            {outForDeliveryDate}
                                          </div>
                                        </React.Fragment>
                                      )}
                                      {/* <div className={styles.timeHolder}>
                                        {outForDeliveryTime}
                                      </div>
                                      <div className={styles.dateHolder}>
                                        {outForDeliveryDate}
                                      </div> */}
                                    </div>
                                  </div>
                                ) : completedSteps.includes(SHIPPED) ? (
                                  <div
                                    className={
                                      completedSteps.includes(SHIPPED)
                                        ? styles.step
                                        : styles.stepInactive
                                    }
                                  >
                                    <div
                                      className={
                                        completedSteps.includes(SHIPPED)
                                          ? styles.checkActive
                                          : styles.check
                                      }
                                    />
                                    <div
                                      className={
                                        activeOrderStatus === SHIPPED
                                          ? styles.processNameHolderBold
                                          : styles.processNameHolder
                                      }
                                    >
                                      {shippedDataCustomerFacingName}
                                    </div>
                                    {showOrderDetails ? (
                                      <React.Fragment>
                                        {this.props.logisticName && (
                                          <span
                                            className={styles.itemPackedDetails}
                                          >
                                            Courier: {this.props.logisticName}
                                          </span>
                                        )}
                                        {this.props.trackingAWB && (
                                          <span
                                            className={styles.itemPackedDetails}
                                          >
                                            AWB No: {this.props.trackingAWB}
                                          </span>
                                        )}
                                        <div
                                          className={styles.courierInfoHolder}
                                          onClick={() =>
                                            this.handleMoreDetails({
                                              shippingList,
                                              orderCode
                                            })
                                          }
                                        >
                                          More details
                                        </div>
                                      </React.Fragment>
                                    ) : (
                                      <React.Fragment>
                                        <div className={styles.timeHolder}>
                                          {shippedTime}
                                        </div>
                                        <div className={styles.dateHolder}>
                                          {shippedDate}
                                        </div>
                                      </React.Fragment>
                                    )}
                                  </div>
                                ) : completedSteps.includes(ITEM_PACKED) &&
                                  this.props.consignmentStatus !==
                                    "ORDER_REJECTED" &&
                                  this.props.consignmentStatus !==
                                    "REFUND_IN_PROGRESS" ? (
                                  <React.Fragment>
                                    {/* <div className={styles.orderProcessHolder}>{itemPackedCustomerFacingName}</div> */}
                                    <div
                                      className={
                                        completedSteps.includes(ITEM_PACKED)
                                          ? styles.step
                                          : styles.stepInactive
                                      }
                                    >
                                      <div
                                        className={
                                          completedSteps.includes(ITEM_PACKED)
                                            ? styles.checkActive
                                            : styles.check
                                        }
                                      />
                                      <div
                                        className={
                                          activeOrderStatus === ITEM_PACKED
                                            ? styles.processNameHolderBold
                                            : styles.processNameHolder
                                        }
                                      >
                                        {itemPackedCustomerFacingName}
                                      </div>
                                      <div className={styles.dateAndTimeHolder}>
                                        {showOrderDetails ? (
                                          <React.Fragment>
                                            {this.props.logisticName && (
                                              <span
                                                className={
                                                  styles.itemPackedDetails
                                                }
                                              >
                                                Courier:{" "}
                                                {this.props.logisticName}
                                              </span>
                                            )}
                                            {this.props.trackingAWB && (
                                              <span
                                                className={
                                                  styles.itemPackedDetails
                                                }
                                              >
                                                AWB No: {this.props.trackingAWB}
                                              </span>
                                            )}
                                            <div
                                              className={
                                                styles.courierInfoHolder
                                              }
                                              onClick={() =>
                                                this.handleMoreDetails({
                                                  shippingList,
                                                  orderCode
                                                })
                                              }
                                            >
                                              More details
                                            </div>
                                          </React.Fragment>
                                        ) : (
                                          <React.Fragment>
                                            <div className={styles.timeHolder}>
                                              {itemPackedTime}
                                            </div>
                                            <div className={styles.dateHolder}>
                                              {itemPackedDate}
                                            </div>
                                          </React.Fragment>
                                        )}
                                      </div>
                                    </div>
                                  </React.Fragment>
                                ) : (
                                  this.props.consignmentStatus !=
                                    REFUND_IN_PROGRESS && (
                                    <div
                                      className={
                                        completedSteps.includes(
                                          ORDER_IN_PROCESS
                                        )
                                          ? styles.step
                                          : styles.stepInactive
                                      }
                                    >
                                      <div
                                        className={
                                          activeOrderStatus === ORDER_IN_PROCESS
                                            ? styles.processNameHolderBold
                                            : styles.processNameHolder
                                        }
                                      >
                                        {orderInProcessCustomerFacingName}
                                      </div>
                                      <div
                                        className={
                                          completedSteps.includes(
                                            ORDER_IN_PROCESS
                                          )
                                            ? styles.checkActive
                                            : styles.check
                                        }
                                      />

                                      <div className={styles.dateAndTimeHolder}>
                                        <div className={styles.timeHolder}>
                                          {orderInProcessTime}
                                        </div>
                                        <div className={styles.dateHolder}>
                                          {orderInProcessDate}
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )}
                              </React.Fragment>
                            )}

                            {this.props.consignmentStatus !=
                              REFUND_IN_PROGRESS && (
                              <div
                                className={
                                  completedSteps.includes(DELIVERED)
                                    ? styles.step
                                    : styles.stepInactive
                                }
                              >
                                <div
                                  className={
                                    activeOrderStatus === DELIVERED
                                      ? styles.processNameHolderBold
                                      : styles.processNameHolder
                                  }
                                >
                                  {deliveredCustomerFacingName}
                                </div>
                                <div
                                  className={
                                    completedSteps.includes(DELIVERED)
                                      ? styles.checkActive
                                      : styles.check
                                  }
                                />

                                <div className={styles.dateAndTimeHolder}>
                                  <div className={styles.timeHolder}>
                                    {deliveredTime}
                                  </div>
                                  <div className={styles.dateHolder}>
                                    {deliveredDate}
                                  </div>
                                </div>
                              </div>
                            )}
                          </React.Fragment>
                        )}
                      </React.Fragment>
                    )}
                  </React.Fragment>
                )}

              {/* for return closed */}
              {!this.props.isCNC &&
                (responseCode.includes(RETURN_CLOSED) ||
                  responseCode.includes(RETURNINITIATED_BY_RTO) ||
                  responseCode.includes(RTO_INITIATED) ||
                  responseCode.includes(RTO_DELIVERED) ||
                  responseCode.includes(RTO_IN_PROGRESS) ||
                  this.props.consignmentStatus === RETURN_COMPLETED ||
                  this.props.consignmentStatus === ORDER_CANCELLED ||
                  this.props.consignmentStatus === REFUND_IN_PROGRESS ||
                  this.props.consignmentStatus === REFUND_INITIATED) && (
                  <React.Fragment>
                    {completedSteps.includes(REFUND_INITIATED) && (
                      <div className={styles.step}>
                        <div
                          className={
                            completedSteps.includes(REFUND_INITIATED)
                              ? styles.checkActive
                              : styles.check
                          }
                        />
                        <div
                          className={
                            responseCodeForNotDelivered ===
                              "CLOSED_ON_RETURN_TO_ORIGIN" ||
                            completedSteps.includes(RETURN_CANCELLED) ||
                            completedSteps.includes(RETURN_DECLINED) ||
                            completedSteps.includes(REFUND_SUCCESSFUL)
                              ? styles.processNameHolder
                              : styles.processNameHolderBold
                          }
                        >
                          {refundInitiatedCustomerFacingName}
                        </div>
                        <div className={styles.dateAndTimeHolder}>
                          {showOrderDetails ? (
                            <React.Fragment>
                              {this.props.logisticName && (
                                <span className={styles.itemPackedDetails}>
                                  Courier: {this.props.logisticName}
                                </span>
                              )}
                              {this.props.trackingAWB && (
                                <span className={styles.itemPackedDetails}>
                                  AWB No: {this.props.trackingAWB}
                                </span>
                              )}
                              <div
                                className={styles.courierInfoHolder}
                                onClick={() =>
                                  this.handleMoreDetails({
                                    shippingList,
                                    orderCode
                                  })
                                }
                              >
                                More details
                              </div>
                            </React.Fragment>
                          ) : (
                            <React.Fragment>
                              <div className={styles.timeHolder}>
                                {refundInitiatedTime}
                              </div>
                              <div className={styles.dateHolder}>
                                {refundInitiatedDate}
                              </div>
                            </React.Fragment>
                          )}
                        </div>
                      </div>
                    )}

                    {this.props.paymentMethod === CASH_ON_DELIVERY &&
                      completedSteps.includes(NOT_DELIVERED) &&
                      responseCodeForNotDelivered ===
                        "CLOSED_ON_RETURN_TO_ORIGIN" && (
                        <div className={styles.step}>
                          <div className={styles.checkActive} />
                          <div className={styles.processNameHolderBold}>
                            {notDeliveredCustomerFacingName}
                          </div>
                          <div className={styles.dateAndTimeHolder}>
                            <div className={styles.timeHolder}>
                              {notDeliveredTime}
                            </div>
                            <div className={styles.dateHolder}>
                              {notDeliveredDate}
                            </div>
                          </div>
                        </div>
                      )}
                    {/* if prepaid show refund flow - RNR-2539 */}
                    {this.props.paymentMethod !== CASH_ON_DELIVERY && (
                      <React.Fragment>
                        {completedSteps.includes(RETURN_CANCELLED) ? (
                          <React.Fragment>
                            <div className={styles.step}>
                              <div className={styles.checkActive} />
                              <div className={styles.processNameHolder}>
                                {pickupScheduledCustomerFacingName}
                              </div>
                            </div>
                            <div className={styles.step}>
                              <div className={styles.checkActive} />
                              <div
                                className={
                                  activeOrderStatus === RETURN_CANCELLED
                                    ? styles.processNameHolderBold
                                    : styles.processNameHolder
                                }
                              >
                                {returnCancelledCustomerFacingName}
                              </div>
                              <div className={styles.dateAndTimeHolder}>
                                <div className={styles.timeHolder}>
                                  {returnCancelledTime}
                                </div>
                                <div className={styles.dateHolder}>
                                  {returnCancelledDate}
                                </div>
                              </div>
                            </div>
                          </React.Fragment>
                        ) : completedSteps.includes(RETURN_DECLINED) ? (
                          <React.Fragment>
                            <div className={styles.step}>
                              <div className={styles.checkActive} />
                              <div
                                className={
                                  activeOrderStatus === RETURN_DECLINED
                                    ? styles.processNameHolderBold
                                    : styles.processNameHolder
                                }
                              >
                                {returnDeclinedCustomerFacingName}
                              </div>
                              <div className={styles.dateAndTimeHolder}>
                                <div className={styles.timeHolder}>
                                  {returnDeclinedTime}
                                </div>
                                <div className={styles.dateHolder}>
                                  {returnDeclinedDate}
                                </div>
                              </div>
                            </div>
                          </React.Fragment>
                        ) : !(
                            this.props.consignmentStatus === RTO_INITIATED ||
                            this.props.consignmentStatus === RTO_DELIVERED ||
                            this.props.consignmentStatus === RTO_IN_PROGRESS
                          ) ? (
                          <div
                            className={
                              completedSteps.includes(REFUND_SUCCESSFUL)
                                ? styles.step
                                : styles.stepInactive
                            }
                          >
                            <div
                              className={
                                completedSteps.includes(REFUND_SUCCESSFUL)
                                  ? styles.checkActive
                                  : styles.check
                              }
                            />
                            <div
                              className={
                                activeOrderStatus === REFUND_SUCCESSFUL
                                  ? styles.processNameHolderBold
                                  : styles.processNameHolder
                              }
                            >
                              {refundSuccessfulCustomerFacingName}
                            </div>
                            <div className={styles.dateAndTimeHolder}>
                              <div className={styles.timeHolder}>
                                {refundSuccessfulTime}
                              </div>
                              <div className={styles.dateHolder}>
                                {refundSuccessfulDate}
                              </div>
                            </div>
                          </div>
                        ) : null}
                      </React.Fragment>
                    )}
                  </React.Fragment>
                )}

              {/* for CNC orders */}
              {this.props.isCNC && (
                <React.Fragment>
                  {/* {check if order is cancelled then show cancelled status} */}
                  {completedSteps.includes(ORDER_CANCELLED) ? (
                    <React.Fragment>
                      {completedSteps.includes(ORDER_IN_PROCESS) && (
                        <div className={styles.step}>
                          <div className={styles.checkActive} />
                          <div
                            className={
                              activeOrderStatus === ORDER_IN_PROCESS
                                ? styles.processNameHolderBold
                                : styles.processNameHolder
                            }
                          >
                            {orderInProcessCustomerFacingName}
                          </div>
                        </div>
                      )}
                      <div
                        className={
                          completedSteps.includes(ORDER_CANCELLED)
                            ? styles.step
                            : styles.stepInactive
                        }
                      >
                        <div
                          className={
                            completedSteps.includes(ORDER_CANCELLED)
                              ? styles.checkActive
                              : styles.check
                          }
                        />
                        <div
                          className={
                            activeOrderStatus === ORDER_CANCELLED
                              ? styles.processNameHolderBold
                              : styles.processNameHolder
                          }
                        >
                          {cancelledCustomerFacingName}
                        </div>
                        <div className={styles.dateAndTimeHolder}>
                          <div className={styles.timeHolder}>
                            {cancelledTime}
                          </div>
                          <div className={styles.dateHolder}>
                            {cancelledDate}
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      {completedSteps.includes(READY_FOR_COLLECTION) ? (
                        <div
                          className={
                            completedSteps.includes(READY_FOR_COLLECTION)
                              ? styles.step
                              : styles.stepInactive
                          }
                        >
                          <div
                            className={
                              completedSteps.includes(READY_FOR_COLLECTION)
                                ? styles.checkActive
                                : styles.check
                            }
                          />
                          <div
                            className={
                              activeOrderStatus === READY_FOR_COLLECTION
                                ? styles.processNameHolderBold
                                : styles.processNameHolder
                            }
                          >
                            {readyForCollectionCustomerFacingName}
                          </div>
                          <div className={styles.dateAndTimeHolder}>
                            <div className={styles.timeHolder}>
                              {readyForCollectionTime}
                            </div>
                            <div className={styles.dateHolder}>
                              {readyForCollectionDate}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <React.Fragment>
                          {completedSteps.includes(SHIPPED) ? (
                            <div
                              className={
                                completedSteps.includes(SHIPPED)
                                  ? styles.step
                                  : styles.stepInactive
                              }
                            >
                              <div
                                className={
                                  completedSteps.includes(SHIPPED)
                                    ? styles.checkActive
                                    : styles.check
                                }
                              />
                              <div
                                className={
                                  activeOrderStatus === SHIPPED
                                    ? styles.processNameHolderBold
                                    : styles.processNameHolder
                                }
                              >
                                {shippedDataCustomerFacingName}
                              </div>
                              <div className={styles.dateAndTimeHolder}>
                                {showOrderDetails ? (
                                  <React.Fragment>
                                    {this.props.logisticName && (
                                      <span
                                        className={styles.itemPackedDetails}
                                      >
                                        Courier: {this.props.logisticName}
                                      </span>
                                    )}
                                    {this.props.trackingAWB && (
                                      <span
                                        className={styles.itemPackedDetails}
                                      >
                                        AWB No: {this.props.trackingAWB}
                                      </span>
                                    )}
                                    <div
                                      className={styles.courierInfoHolder}
                                      onClick={() =>
                                        this.handleMoreDetails({
                                          shippingList,
                                          orderCode
                                        })
                                      }
                                    >
                                      More details
                                    </div>
                                  </React.Fragment>
                                ) : (
                                  <React.Fragment>
                                    <div className={styles.timeHolder}>
                                      {shippedTime}
                                    </div>
                                    <div className={styles.dateHolder}>
                                      {shippedDate}
                                    </div>
                                  </React.Fragment>
                                )}
                              </div>
                            </div>
                          ) : completedSteps.includes(ITEM_PACKED) &&
                            this.props.consignmentStatus !== ORDER_REJECTED ? (
                            <div
                              className={
                                completedSteps.includes(ITEM_PACKED)
                                  ? styles.step
                                  : styles.stepInactive
                              }
                            >
                              <div
                                className={
                                  completedSteps.includes(ITEM_PACKED)
                                    ? styles.checkActive
                                    : styles.check
                                }
                              />
                              <div
                                className={
                                  activeOrderStatus === ITEM_PACKED
                                    ? styles.processNameHolderBold
                                    : styles.processNameHolder
                                }
                              >
                                {itemPackedCustomerFacingName}
                              </div>
                              <div className={styles.dateAndTimeHolder}>
                                {showOrderDetails ? (
                                  <React.Fragment>
                                    {this.props.logisticName && (
                                      <span
                                        className={styles.itemPackedDetails}
                                      >
                                        Courier: {this.props.logisticName}
                                      </span>
                                    )}
                                    {this.props.trackingAWB && (
                                      <span
                                        className={styles.itemPackedDetails}
                                      >
                                        AWB No: {this.props.trackingAWB}
                                      </span>
                                    )}
                                    <div
                                      className={styles.courierInfoHolder}
                                      onClick={() =>
                                        this.handleMoreDetails({
                                          shippingList,
                                          orderCode
                                        })
                                      }
                                    >
                                      More details
                                    </div>
                                  </React.Fragment>
                                ) : (
                                  <React.Fragment>
                                    <div className={styles.timeHolder}>
                                      {itemPackedTime}
                                    </div>
                                    <div className={styles.dateHolder}>
                                      {itemPackedDate}
                                    </div>
                                  </React.Fragment>
                                )}
                              </div>
                            </div>
                          ) : (
                            <div
                              className={
                                completedSteps.includes(ORDER_IN_PROCESS)
                                  ? styles.step
                                  : styles.stepInactive
                              }
                            >
                              <div
                                className={
                                  completedSteps.includes(ORDER_IN_PROCESS)
                                    ? styles.checkActive
                                    : styles.check
                                }
                              />
                              <div
                                className={
                                  activeOrderStatus === ORDER_IN_PROCESS
                                    ? styles.processNameHolderBold
                                    : styles.processNameHolder
                                }
                              >
                                {orderInProcessCustomerFacingName}
                              </div>
                              <div className={styles.dateAndTimeHolder}>
                                <div className={styles.timeHolder}>
                                  {orderInProcessTime}
                                </div>
                                <div className={styles.dateHolder}>
                                  {orderInProcessDate}
                                </div>
                              </div>
                            </div>
                          )}
                        </React.Fragment>
                      )}

                      {completedSteps.includes(ORDER_NOT_COLLECTED) ? (
                        <div
                          className={
                            completedSteps.includes(ORDER_NOT_COLLECTED)
                              ? styles.step
                              : styles.stepInactive
                          }
                        >
                          <div
                            className={
                              activeOrderStatus === ORDER_NOT_COLLECTED
                                ? styles.processNameHolderBold
                                : styles.processNameHolder
                            }
                          >
                            {orderNotCollectedCustomerFacingName}
                          </div>
                          <div
                            className={
                              completedSteps.includes(ORDER_NOT_COLLECTED)
                                ? styles.checkActive
                                : styles.check
                            }
                          />

                          <div className={styles.dateAndTimeHolder}>
                            <div className={styles.timeHolder}>
                              {orderNotCollectedTime}
                            </div>
                            <div className={styles.dateHolder}>
                              {orderNotCollectedDate}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div
                          className={
                            completedSteps.includes(ORDER_COLLECTED)
                              ? styles.step
                              : styles.stepInactive
                          }
                        >
                          <div
                            className={
                              activeOrderStatus === ORDER_COLLECTED
                                ? styles.processNameHolderBold
                                : styles.processNameHolder
                            }
                          >
                            {orderCollectedCustomerFacingName}
                          </div>
                          <div
                            className={
                              completedSteps.includes(ORDER_COLLECTED)
                                ? styles.checkActive
                                : styles.check
                            }
                          />

                          <div className={styles.dateAndTimeHolder}>
                            <div className={styles.timeHolder}>
                              {orderCollectedTime}
                            </div>
                            <div className={styles.dateHolder}>
                              {orderCollectedDate}
                            </div>
                          </div>
                        </div>
                      )}
                    </React.Fragment>
                  )}
                </React.Fragment>
              )}
              {completedSteps.includes(CANCEL_STATUS) && (
                <div className={styles.step}>
                  <div className={styles.checkActive} />
                  <div className={styles.processNameHolder}>Cancelled</div>
                  <div className={styles.dateAndTimeHolder}>
                    <div className={styles.dateHolder}>{cancelledDate}</div>
                    <div className={styles.timeHolder}>{cancelledTime}</div>
                  </div>
                </div>
              )}
            </React.Fragment>
          )}
        </div>
        {/* {activeOrderStatus === PICKUP_SCHEDULED && (
          <div className={styles.shipmentStatus}>
            {pickupScheduledShipmentStatus}
          </div>
        )} */}
      </React.Fragment>
    );
  }
}
OrderStatusVerticalV2.propTypes = {
  moreDetails: PropTypes.func,
  statusDisplay: PropTypes.string,
  orderCode: PropTypes.string,
  logisticName: PropTypes.string,
  trackingAWB: PropTypes.string,
  consignmentStatus: PropTypes.string,
  sshipAwbTrackingUrl: PropTypes.string,
  statusMessageList: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string,
      statusDescription: PropTypes.string,
      time: PropTypes.string
    })
  )
};
