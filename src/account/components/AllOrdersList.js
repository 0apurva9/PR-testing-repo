import React, { Component } from "react";
import styles from "./CustomerIssue.css";
import { getDayNumberSuffix } from "../../lib/dateTimeFunction";
import Button from "../../general/components/Button.js";

export default class AllOrdersList extends Component {
  render() {
    return (
      <div className={styles.whiteCard}>
        <div className={styles.headerBox}>
          <div className={styles.header}>Recent orders</div>
          <div className={styles.headerButton}>
            <Button
              type="hollow"
              label="Go Back"
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
                    <img
                      className={styles.allOrderImage}
                      src={orderData.products[0].imageURL}
                      alt="Order image"
                    />
                  </div>
                  <div className={styles.allOrderDatils}>
                    <div className={styles.productName}>
                      {orderData.products[0].productName}
                    </div>
                    <div className={styles.orderStatus}>
                      Order Status:
                      <span className={styles.fontBold}>
                        {" "}
                        {orderData.products[0].statusDisplay}
                      </span>
                    </div>
                    {(orderData.products[0].EDD &&
                      orderData.products[0].statusDisplay ==
                        "Order Confirmed") ||
                    orderData.products[0].statusDisplay == "Order in Process" ||
                    orderData.products[0].statusDisplay == "Item Packed" ||
                    orderData.products[0].statusDisplay == "Shipped" ||
                    orderData.products[0].statusDisplay == "Delivered" ? (
                      <div className={styles.orderStatus}>
                        {orderData.products[0].statusDisplay == "Delivered"
                          ? "Delivered On: "
                          : "Est. delivery date: "}
                        :{" "}
                        <span className={styles.fontBold}>
                          {getDayNumberSuffix(orderData.products[0].EDD)}
                        </span>
                      </div>
                    ) : null}
                    {/* {orderData.products[0].EDD && (
                          <div className={styles.orderStatus}>
                            {orderData.products[0].statusDisplay=="Delivered"?"Delivered On: ":"Est. delivery date: "}
                            :{" "}
                            <span className={styles.fontBold}>
                              {getDayNumberSuffix(
                                orderData.products[0].EDD
                                
                              )}
                            </span>
                          </div>
                        )} */}
                    {/* {orderData.products[0].EDD && (
                      <div className={styles.orderStatus}>
                        Delivery On:{" "}
                        <span className={styles.fontBold}>
                          {getDayNumberSuffix(orderData.products[0].EDD, false)}
                        </span>
                      </div>
                    )} */}
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
