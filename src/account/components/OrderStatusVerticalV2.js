import React from "react";
import styles from "./OrderStatusHorizontal.css";
import PropTypes from "prop-types";
import {
  ORDER_CONFIRMED,
  ORDER_IN_PROCESS,
  CANCEL_STATUS,
  SHIPPING,
  DELIVERED,
  REFUND_INITIATED,
  READY_FOR_COLLECTION,
  ORDER_COLLECTED,
  ORDER_CANCELLED,
  ITEM_PACKED,
  RETURN_INITIATED,
  PICKUP_SCHEDULED,
  RETURN_CANCELLED,
  UNDELIVERED,
  NOT_DELIVERED
} from "../../lib/constants";

export default class OrderStatusVerticalV2 extends React.Component {
  handleMoreDetails(val) {
    if (this.props.showShippingDetails && val) {
      this.props.showShippingDetails(val);
    }
  }
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
    const cancelledData = this.props.statusMessageList.find(val => {
      return val.key === ORDER_CANCELLED;
    });
    const itemPackedData = this.props.statusMessageList.find(val => {
      return val.key === ITEM_PACKED;
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
    const refundInitiatedData = this.props.statusMessageList.find(val => {
      return val.key === REFUND_INITIATED;
    });
    const unDeliveredData = this.props.statusMessageList.find(val => {
      return val.key === UNDELIVERED;
    });
    const notDeliveredData = this.props.statusMessageList.find(val => {
      return val.key === NOT_DELIVERED;
    });
    //to get the active order status
    //sequence should be maintained
    let activeOrderStatus = "";
    if (!this.props.isCNC) {
      let orderEDHD = [];
      if (orderConfirmedData && orderConfirmedData.key) {
        orderEDHD.push(orderConfirmedData.key);
      }
      if (orderInProcessData && orderInProcessData.key) {
        orderEDHD.push(orderInProcessData.key);
      }
      if (itemPackedData && itemPackedData.key) {
        orderEDHD.push(itemPackedData.key);
      }
      if (deliveredData && deliveredData.key) {
        orderEDHD.push(deliveredData.key);
      }
      if (cancelledData && cancelledData.key) {
        orderEDHD.push(cancelledData.key);
      }
      if (returnInitiatedData && returnInitiatedData.key) {
        orderEDHD.push(returnInitiatedData.key);
      }
      if (returnCancelledData && returnCancelledData.key) {
        orderEDHD.push(returnCancelledData.key);
      }
      if (pickupScheduledData && pickupScheduledData.key) {
        orderEDHD.push(pickupScheduledData.key);
      }
      if (refundInitiatedData && refundInitiatedData.key) {
        orderEDHD.push(refundInitiatedData.key);
      }
      if (unDeliveredData && unDeliveredData.key) {
        orderEDHD.push(unDeliveredData.key);
      }
      if (notDeliveredData && notDeliveredData.key) {
        orderEDHD.push(notDeliveredData.key);
      }
      activeOrderStatus = orderEDHD[orderEDHD.length - 1];
    }
    if (this.props.isCNC) {
      let orderCNC = [];
      if (orderConfirmedData && orderConfirmedData.key) {
        orderCNC.push(orderConfirmedData.key);
      }
      if (orderInProcessData && orderInProcessData.key) {
        orderCNC.push(orderInProcessData.key);
      }
      if (itemPackedData && itemPackedData.key) {
        orderCNC.push(itemPackedData.key);
      }
      if (readyForCollectionData && readyForCollectionData.key) {
        orderCNC.push(readyForCollectionData.key);
      }
      if (orderCollectedData && orderCollectedData.key) {
        orderCNC.push(orderCollectedData.key);
      }
      if (cancelledData && cancelledData.key) {
        orderCNC.push(cancelledData.key);
      }
      if (returnInitiatedData && returnInitiatedData.key) {
        orderCNC.push(returnInitiatedData.key);
      }
      if (returnCancelledData && returnCancelledData.key) {
        orderCNC.push(returnCancelledData.key);
      }
      if (pickupScheduledData && pickupScheduledData.key) {
        orderCNC.push(pickupScheduledData.key);
      }
      if (refundInitiatedData && refundInitiatedData.key) {
        orderCNC.push(refundInitiatedData.key);
      }
      if (unDeliveredData && unDeliveredData.key) {
        orderCNC.push(unDeliveredData.key);
      }
      if (notDeliveredData && notDeliveredData.key) {
        orderCNC.push(notDeliveredData.key);
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

    //not delivered
    let notDeliveredDate = "";
    let notDeliveredTime = "";
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
    let returnCancelledShipmentStatus = "";
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
    if (
      returnCancelledData &&
      returnCancelledData.value.statusList &&
      returnCancelledData.value.statusList[0]
    ) {
      returnCancelledShipmentStatus =
        returnCancelledData.value.statusList[0].shipmentStatus;
    }
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
    const orderCode = this.props.orderCode;

    return (
      <div className={styles.base}>
        {/* <div className={styles.trackOrderTitle}>Track Order</div> */}
        {this.props.returnMode && this.props.returnType ? (
          <React.Fragment>
            {completedSteps.includes(RETURN_INITIATED) && (
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
                  <div className={styles.timeHolder}>{returnInitiatedDate}</div>
                  <div className={styles.dateHolder}>{returnInitiatedTime}</div>
                </div>
              </div>
            )}
            {completedSteps.includes(REFUND_INITIATED) ? (
              <React.Fragment>
                {completedSteps.includes(REFUND_INITIATED) && (
                  <div className={styles.step}>
                    <div className={styles.checkActive} />
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
                        {refundInitiatedDate}
                      </div>
                      <div className={styles.dateHolder}>
                        {refundInitiatedTime}
                      </div>
                    </div>
                  </div>
                )}
              </React.Fragment>
            ) : (
              <React.Fragment>
                {completedSteps.includes(PICKUP_SCHEDULED) && (
                  <div className={styles.step}>
                    <div className={styles.checkActive} />
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
                        {pickupScheduledDate}
                      </div>
                      <div className={styles.dateHolder}>
                        {pickupScheduledTime}
                      </div>
                    </div>
                  </div>
                )}
              </React.Fragment>
            )}

            {completedSteps.includes(RETURN_CANCELLED) ? (
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
                  <div className={styles.timeHolder}>{returnCancelledDate}</div>
                  <div className={styles.dateHolder}>{returnCancelledTime}</div>
                </div>
              </div>
            ) : (
              <div className={styles.stepInactive}>
                <div className={styles.check} />
                <div className={styles.processNameHolder}>
                  Refund Successful
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
            {!this.props.isCNC && (
              <React.Fragment>
                {/* {check if order is cancelled then show cancelled status} */}
                {completedSteps.includes(ORDER_CANCELLED) ? (
                  <React.Fragment>
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
                        <div className={styles.timeHolder}>{cancelledTime}</div>
                        <div className={styles.dateHolder}>{cancelledDate}</div>
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
                        </div>
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
                            {completedSteps.includes(ITEM_PACKED) ? (
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
                                    {/* <div className={styles.timeHolder}>
                          {itemPackedTime}
                        </div>
                        <div className={styles.dateHolder}>
                          {itemPackedDate}
                        </div> */}
                                    <div className={styles.itemPackedDetails}>
                                      Courier: {this.props.logisticName}
                                    </div>
                                    <div className={styles.itemPackedDetails}>
                                      AWB No: {this.props.trackingAWB}
                                    </div>
                                  </div>
                                </div>
                              </React.Fragment>
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
                                    activeOrderStatus === ORDER_IN_PROCESS
                                      ? styles.processNameHolderBold
                                      : styles.processNameHolder
                                  }
                                >
                                  {orderInProcessCustomerFacingName}
                                </div>
                                <div
                                  className={
                                    completedSteps.includes(ORDER_IN_PROCESS)
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
                            )}
                          </React.Fragment>
                        )}

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
                      </React.Fragment>
                    )}
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
                        <div className={styles.timeHolder}>{cancelledTime}</div>
                        <div className={styles.dateHolder}>{cancelledDate}</div>
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
                        {completedSteps.includes(ITEM_PACKED) ? (
                          <div
                            className={
                              completedSteps.includes(ITEM_PACKED)
                                ? styles.step
                                : styles.stepInactive
                            }
                          >
                            <div
                              className={
                                activeOrderStatus === ITEM_PACKED
                                  ? styles.processNameHolderBold
                                  : styles.processNameHolder
                              }
                            >
                              {itemPackedCustomerFacingName}
                            </div>
                            <div
                              className={
                                completedSteps.includes(ITEM_PACKED)
                                  ? styles.checkActive
                                  : styles.check
                              }
                            />

                            <div className={styles.dateAndTimeHolder}>
                              {/* <div className={styles.timeHolder}>
                            {itemPackedTime}
                          </div>
                          <div className={styles.dateHolder}>
                            {itemPackedDate}
                          </div> */}
                              <div className={styles.itemPackedDetails}>
                                Courier: {this.props.logisticName}
                              </div>
                              <div className={styles.itemPackedDetails}>
                                AWB No: {this.props.trackingAWB}
                              </div>
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
        {completedSteps.includes(PICKUP_SCHEDULED) && (
          <div className={styles.shipmentStatus}>
            {pickupScheduledShipmentStatus}
          </div>
        )}
      </div>
    );
  }
}
OrderStatusVerticalV2.propTypes = {
  moreDetails: PropTypes.func,
  statusMessageList: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string,
      statusDescription: PropTypes.string,
      time: PropTypes.string
    })
  )
};
