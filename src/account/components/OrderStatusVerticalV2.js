import React from "react";
import styles from "./OrderStatusHorizontal.css";
import UnderLinedButton from "../../general/components/UnderLinedButton.js";
import PropTypes from "prop-types";
const ORDER_CONFIRMED = "ORDER_CONFIRMED";
const ORDER_IN_PROCESS = "ORDER_IN_PROCESS";
// const PROCESSING = "PROCESSING";
const CANCEL = "CANCEL";
const SHIPPING = "SHIPPING";
const DELIVERED = "DELIVERED";
const REFUND_INITIATED = "REFUND_INITIATED";
const READY_FOR_COLLECTION = "READY_FOR_COLLECTION";
const ORDER_COLLECTED = "ORDER_COLLECTED";
const ORDER_CANCELLED = "ORDER_CANCELLED";
const ITEM_PACKED = "ITEM_PACKED";
export default class OrderStatusVerticalV2 extends React.Component {
  handleMoreDetails(val) {
    if (this.props.showShippingDetails && val) {
      this.props.showShippingDetails(val);
    }
  }
  render() {
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
    // const processingData = this.props.statusMessageList.find(val => {
    //   return val.key === PROCESSING;
    // });
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
      activeOrderStatus = orderCNC[orderCNC.length - 1];
    }

    const shippingData = this.props.statusMessageList.find(val => {
      return val.key === SHIPPING;
    });

    // const cancelledData = this.props.statusMessageList.find(val => {
    //   return val.key === CANCEL;
    // });
    // const readyForCollectionData = shippingData
    //   ? shippingData.value.statusList.find(val => {
    //     return val.responseCode === READY_FOR_COLLECTION;
    //   })
    //   : null;

    // const orderCollectedData = shippingData
    //   ? shippingData.value.statusList.find(val => {
    //     return val.responseCode === ORDER_COLLECTED;
    //   })
    //   : null;

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
    let itemPackedDate = "";
    let itemPackedTime = "";
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
    // let processingDate = "";
    // let processingTime = "";
    // if (
    //   processingData &&
    //   processingData.value.statusList &&
    //   processingData.value.statusList[0] &&
    //   processingData.value.statusList[0].statusMessageList &&
    //   processingData.value.statusList[0].statusMessageList[0]
    // ) {
    //   processingDate =
    //     processingData.value.statusList[0].statusMessageList[0].date;
    //   processingTime =
    //     processingData.value.statusList[0].statusMessageList[0].time;
    // }
    // let shippingDate = "";
    // let shippingTime = "";
    // let shippingList = null;
    // let shippingResponseCode = "";
    // let deliveredData = null;
    // let deliveredDate = "";
    // let deliveredTime = "";
    // let isDelivered = false;
    // if (
    //   shippingData &&
    //   shippingData.value.statusList &&
    //   shippingData.value.statusList[0] &&
    //   shippingData.value.statusList[0].statusMessageList &&
    //   shippingData.value.statusList[0].statusMessageList[0]
    // ) {
    //   shippingDate = shippingData.value.statusList[0].statusMessageList[0].date;
    //   shippingTime = shippingData.value.statusList[0].statusMessageList[0].time;
    //   shippingList = shippingData.value.statusList[0].statusMessageList;
    //   shippingResponseCode = shippingData.value.statusList[0].responseCode;

    //   isDelivered = shippingData.value.statusList
    //     .map(val => {
    //       return val.responseCode;
    //     })
    //     .includes(DELIVERED);
    //   if (isDelivered) {
    //     deliveredData = shippingData.value.statusList.filter(val => {
    //       return val.responseCode === DELIVERED;
    //     });
    //     if (
    //       deliveredData[0].statusMessageList &&
    //       deliveredData[0].statusMessageList[0]
    //     ) {
    //       deliveredDate = deliveredData[0].statusMessageList[0].date;
    //       deliveredTime = deliveredData[0].statusMessageList[0].time;
    //     }
    //   }
    // }

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
    const orderCode = this.props.orderCode;

    return (
      <div className={styles.base}>
        {/* <div className={styles.trackOrderTitle}>Track Order</div> */}
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
                <div className={styles.timeHolder}>{orderConfirmedTime}</div>
                <div className={styles.dateHolder}>{orderConfirmedDate}</div>
              </div>
            </div>
          </React.Fragment>
        )}
        {!this.props.isCNC && (
          <React.Fragment>
            {/* {check if order is cancelled then show cancelled status} */}
            {completedSteps.includes(ORDER_CANCELLED) ? (
              <div
                className={
                  completedSteps.includes(ORDER_CANCELLED)
                    ? styles.step
                    : styles.stepInactive
                }
              >
                <div
                  className={
                    activeOrderStatus === ORDER_CANCELLED
                      ? styles.processNameHolderBold
                      : styles.processNameHolder
                  }
                >
                  {cancelledCustomerFacingName}
                </div>
                <div
                  className={
                    completedSteps.includes(ORDER_CANCELLED)
                      ? styles.checkActive
                      : styles.check
                  }
                />

                <div className={styles.dateAndTimeHolder}>
                  <div className={styles.timeHolder}>{cancelledTime}</div>
                  <div className={styles.dateHolder}>{cancelledDate}</div>
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
                    <div className={styles.timeHolder}>{deliveredTime}</div>
                    <div className={styles.dateHolder}>{deliveredDate}</div>
                  </div>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        )}
        {/* for CNC orders */}
        {this.props.isCNC && (
          <React.Fragment>
            {/* {check if order is cancelled then show cancelled status} */}
            {completedSteps.includes(ORDER_CANCELLED) ? (
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
        {/* <div
          className={
            completedSteps.includes(PROCESSING) ||
              completedSteps.includes(CANCEL)
              ? styles.step
              : styles.stepInactive
          }
        >
          <div
            className={
              completedSteps.includes(PROCESSING) ||
                completedSteps.includes(CANCEL)
                ? styles.checkActive
                : styles.check
            }
          />
          <div className={styles.processNameHolder}>Processing</div>
          <div className={styles.dateAndTimeHolder}>
            <div className={styles.dateHolder}>{processingDate}</div>
            <div className={styles.timeHolder}>{processingTime}</div>
          </div>
        </div> */}
        {/* {!completedSteps.includes(CANCEL) &&
          !this.props.isCNC && (
            <React.Fragment>
              {shippingResponseCode !== REFUND_INITIATED && (
                <div
                  className={
                    completedSteps.includes(SHIPPING)
                      ? styles.step
                      : styles.stepInactive
                  }
                >
                  <div
                    className={
                      completedSteps.includes(SHIPPING)
                        ? styles.checkActive
                        : styles.check
                    }
                  />
                  <div className={styles.processNameHolder}>Shipping</div>
                  <div className={styles.dateAndTimeHolder}>
                    <div className={styles.dateHolder}>{shippingDate}</div>
                    <div className={styles.timeHolder}>{shippingTime}</div>
                  </div>
                  {completedSteps.includes(SHIPPING) && (
                    <div>
                      {this.props.logisticName && (
                        <div className={styles.courierInfoHolder}>
                          <div className={styles.moreInfoQuestionHolder}>
                            Courier: {this.props.logisticName}
                          </div>
                        </div>
                      )}
                      {this.props.trackingAWB && (
                        <div className={styles.courierInfoHolder}>
                          <div className={styles.moreInfoQuestionHolder}>
                            AWB No: {this.props.trackingAWB}
                          </div>
                        </div>
                      )}
                      <div className={styles.courierInfoHolder}>
                        <UnderLinedButton
                          label="More details"
                          onClick={() =>
                            this.handleMoreDetails({
                              shippingList,
                              orderCode
                            })
                          }
                        />
                      </div>

                      <div className={styles.moreAnswerHolder} />
                    </div>
                  )}
                </div>
              )}
              {shippingResponseCode !== REFUND_INITIATED && (
                <div
                  className={isDelivered ? styles.step : styles.stepInactive}
                >
                  <div
                    className={isDelivered ? styles.checkActive : styles.check}
                  />
                  <div className={styles.processNameHolder}>Delivered</div>
                  <div className={styles.dateAndTimeHolder}>
                    <div className={styles.dateHolder}>{deliveredDate}</div>
                    <div className={styles.timeHolder}>{deliveredTime}</div>
                  </div>
                </div>
              )}
            </React.Fragment>
          )} */}
        {/* {!completedSteps.includes(CANCEL) &&
          this.props.isCNC && (
            <React.Fragment>
              {shippingResponseCode !== REFUND_INITIATED && (
                <div
                  className={
                    readyForCollectionData ? styles.step : styles.stepInactive
                  }
                >
                  <div
                    className={
                      readyForCollectionData ? styles.checkActive : styles.check
                    }
                  />
                  <div className={styles.processNameHolder}>
                    Ready for collection
                  </div>
                  <div className={styles.dateAndTimeHolder}>
                    <div className={styles.dateHolder}>
                      {readyForCollectionDate}
                    </div>
                    <div className={styles.timeHolder}>
                      {readyForCollectionTime}
                    </div>
                  </div>
                </div>
              )}
              {shippingResponseCode !== REFUND_INITIATED &&
                !this.props.isCNC && (
                  <div
                    className={isDelivered ? styles.step : styles.stepInactive}
                  >
                    <div
                      className={
                        isDelivered ? styles.checkActive : styles.check
                      }
                    />
                    <div className={styles.processNameHolder}>Delivered</div>
                    <div className={styles.dateAndTimeHolder}>
                      <div className={styles.dateHolder}>{deliveredDate}</div>
                      <div className={styles.timeHolder}>{deliveredTime}</div>
                    </div>
                  </div>
                )}
              {shippingResponseCode !== REFUND_INITIATED &&
                this.props.isCNC && (
                  <div
                    className={
                      orderCollectedData ? styles.step : styles.stepInactive
                    }
                  >
                    <div
                      className={
                        orderCollectedData ? styles.checkActive : styles.check
                      }
                    />
                    <div className={styles.processNameHolder}>
                      Order collected
                    </div>
                    <div className={styles.dateAndTimeHolder}>
                      <div className={styles.dateHolder}>
                        {orderCollectedDate}
                      </div>
                      <div className={styles.timeHolder}>
                        {orderCollectedTime}
                      </div>
                    </div>
                  </div>
                )}
            </React.Fragment>
          )} */}
        {completedSteps.includes(CANCEL) && (
          <div className={styles.step}>
            <div className={styles.checkActive} />
            <div className={styles.processNameHolder}>Cancelled</div>
            <div className={styles.dateAndTimeHolder}>
              <div className={styles.dateHolder}>{cancelledDate}</div>
              <div className={styles.timeHolder}>{cancelledTime}</div>
            </div>
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
