import React, { Component } from "react";
import styles from "./CustomerIssue.css";
import { getDayNumberSuffix } from "../../lib/dateTimeFunction";
import Button from "../../general/components/Button.js";
import ProductImage from "../../general/components/ProductImage.js";
const ORDER_IN_PROCESS = "Order in Process";
const READY_FOR_COLLECTION = "Ready for Collection";
const PICKUP_DATE = "Pickup Date:";
const SHIPPED = "Shipped";
const ORDER_CONFIRMED = "Order Confirmed";
const ITEM_PACKED = "Item Packed";
const OUT_FOR_DELIVERY = "Out For Delivery";
const ESTIMATED_DATE = "Estimated Delivery Date:";
const DELIVERY_TEXT = "Delivered on:";

export default class AllOrdersList extends Component {
  componentDidMount() {
    window.scroll(0, 0);
  }
  render() {
    return (
      <div className={styles.whiteCard}>
        <div className={styles.headerBox}>
          <div className={styles.header}>Recent orders</div>
          <div className={styles.headerButton}>
            <Button
              type="hollow"
              label="Back to CLiQ Care Homepage"
              borderColor={""}
              color={"#da1c5c"}
              onClick={() => this.props.hideAllOrder()}
            />
          </div>
        </div>
        {this.props.ordersTransactionData &&
          this.props.ordersTransactionData.orderData &&
          this.props.ordersTransactionData.orderData.map(orderData => {
            return (
              <div
                className={styles.orderDataCard}
                onClick={() => this.props.getOrderRelatedQuestions(orderData)}
              >
                <div className={styles.allOrderDataBox}>
                  <div className={styles.allOrderImageBox}>
                    <ProductImage image={orderData.products[0].imageURL} />
                  </div>
                  <div className={styles.allOrderDatils}>
                    <div className={styles.productName}>
                      {orderData.products[0].productName}
                    </div>
                    <div className={styles.orderStatus}>
                      Order status:
                      <span className={styles.fontBold}>
                        {" "}
                        {orderData.products[0].statusDisplay}
                      </span>
                    </div>
                    {orderData.products[0].pickUpDateCNC ? (
                      orderData.products[0].statusDisplay ===
                        ORDER_IN_PROCESS ||
                      orderData.products[0].statusDisplay ===
                        READY_FOR_COLLECTION ? (
                        <div className={styles.orderStatus}>
                          {PICKUP_DATE}&nbsp;
                          <span className={styles.fontBold}>
                            {getDayNumberSuffix(
                              orderData.products[0].pickUpDateCNC,
                              true
                            )}
                          </span>
                        </div>
                      ) : null
                    ) : (orderData.products[0].statusDisplay ===
                      ORDER_CONFIRMED ||
                      orderData.products[0].statusDisplay ===
                        ORDER_IN_PROCESS ||
                      orderData.products[0].statusDisplay === SHIPPED ||
                      orderData.products[0].statusDisplay === ITEM_PACKED ||
                      orderData.products[0].statusDisplay ===
                        OUT_FOR_DELIVERY ||
                      orderData.products[0].statusDisplay ===
                        READY_FOR_COLLECTION) &&
                    (orderData.products[0].EDD ||
                      orderData.products[0].estimateddeliverydate) ? (
                      <div className={styles.orderStatus}>
                        {ESTIMATED_DATE}&nbsp;
                        <span className={styles.fontBold}>
                          {getDayNumberSuffix(
                            orderData.products[0].EDD ||
                              orderData.products[0].estimateddeliverydate
                          )}
                        </span>
                      </div>
                    ) : orderData.products[0].deliveryDate ? (
                      <div className={styles.orderStatus}>
                        {DELIVERY_TEXT}&nbsp;
                        <span className={styles.fontBold}>
                          {getDayNumberSuffix(
                            orderData.products[0].deliveryDate,
                            true
                          )}
                        </span>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}
        {this.props.ordersTransactionData &&
          (this.props.ordersTransactionData.currentPage + 1) *
            this.props.ordersTransactionData.pageSize <
            this.props.ordersTransactionData.totalNoOfOrders && (
            <div className={styles.loadMore}>
              <div
                className={styles.loadMoreText}
                onClick={() => this.props.getMoreOrder()}
              >
                Load More
              </div>
            </div>
          )}
      </div>
    );
  }
}
