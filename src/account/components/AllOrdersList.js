import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./CustomerIssue.css";
import { getDayNumberSuffix } from "../../lib/dateTimeFunction";
import Button from "../../general/components/Button.js";
import ProductImage from "../../general/components/ProductImage.js";
import {
  setDataLayerForCLiQCarePage,
  ADOBE_SELF_SERVE_PAGE_LOAD
} from "../../lib/adobeUtils";
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
    this.analyticCall(this.props.ordersTransactionData);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps &&
      nextProps.ordersTransactionData !== this.props.ordersTransactionData
    ) {
      this.analyticCall(nextProps.ordersTransactionData);
    }
  }

  analyticCall = ordersTransactionData => {
    let orderData = [];
    ordersTransactionData &&
      ordersTransactionData.orderData.map(orderItem => {
        if (orderItem.products) {
          orderItem.products.map(item => {
            orderData.push({
              status: item.statusDisplay,
              id: item.transactionId,
              productId: item.productcode
            });
          });
        }
      });
    setDataLayerForCLiQCarePage(
      ADOBE_SELF_SERVE_PAGE_LOAD,
      orderData,
      "Care_Order_All"
    );
  };

  render() {
    return (
      <div className={styles.whiteCard}>
        <div className={styles.headerBox}>
          <div className={styles.header}>All orders</div>
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
          this.props.ordersTransactionData.orderData.map(orderData => {
            if (orderData.products) {
              return orderData.products.map((product, index) => {
                return (
                  <div
                    key={`key${index}`}
                    className={styles.orderDataCard}
                    onClick={() =>
                      this.props.getOrderRelatedQuestions(orderData, product)
                    }
                  >
                    <div className={styles.allOrderDataBox}>
                      <div className={styles.allOrderImageBox}>
                        <ProductImage image={product.imageURL} />
                      </div>
                      <div className={styles.allOrderDatils}>
                        <div className={styles.productName}>
                          {product.productName}
                        </div>
                        <div className={styles.orderStatus}>
                          Order status:
                          <span className={styles.fontBold}>
                            {" "}
                            {product.statusDisplay}
                          </span>
                        </div>
                        {product.pickUpDateCNC ? (
                          product.statusDisplay === ORDER_IN_PROCESS ||
                            product.statusDisplay === READY_FOR_COLLECTION ? (
                              <div className={styles.orderStatus}>
                                {PICKUP_DATE}&nbsp;
                              <span className={styles.fontBold}>
                                  {getDayNumberSuffix(
                                    product.pickUpDateCNC,
                                    true
                                  )}
                                </span>
                              </div>
                            ) : null
                        ) : (product.statusDisplay === ORDER_CONFIRMED ||
                          product.statusDisplay === ORDER_IN_PROCESS ||
                          product.statusDisplay === SHIPPED ||
                          product.statusDisplay === ITEM_PACKED ||
                          product.statusDisplay === OUT_FOR_DELIVERY ||
                          product.statusDisplay === READY_FOR_COLLECTION) &&
                          (product.EDD || product.estimateddeliverydate) ? (
                              <div className={styles.orderStatus}>
                                {ESTIMATED_DATE}&nbsp;
                            <span className={styles.fontBold}>
                                  {getDayNumberSuffix(
                                    product.EDD || product.estimateddeliverydate
                                  )}
                                </span>
                              </div>
                            ) : product.deliveryDate ? (
                              <div className={styles.orderStatus}>
                                {DELIVERY_TEXT}&nbsp;
                            <span className={styles.fontBold}>
                                  {getDayNumberSuffix(product.deliveryDate, true)}
                                </span>
                              </div>
                            ) : null}
                      </div>
                    </div>
                  </div>
                );
              });
            }
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
AllOrdersList.propTypes = {
  hideAllOrder: PropTypes.func,
  getMoreOrder: PropTypes.func,
  getOrderRelatedQuestions: PropTypes.func,
  ordersTransactionData: PropTypes.shape({
    currentPage: PropTypes.number,
    pageSize: PropTypes.number,
    totalNoOfOrders: PropTypes.number,
    orderData: PropTypes.arrayOf(
      PropTypes.shape({
        products: PropTypes.arrayOf(
          PropTypes.shape({
            imageURL: PropTypes.string,
            productName: PropTypes.string,
            statusDisplay: PropTypes.string,
            pickUpDateCNC: PropTypes.string,
            EDD: PropTypes.string,
            estimateddeliverydate: PropTypes.string
          })
        )
      })
    )
  })
};
