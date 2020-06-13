import React, { Component } from "react";
import Button from "../../general/components/Button.js";
import Carousel from "../../general/components/Carousel";
import { getDayNumberSuffix } from "../../lib/dateTimeFunction";
import styles from "./CustomerIssue.css";
import { withRouter } from "react-router-dom";
import ProductImage from "../../general/components/ProductImage.js";
import { HOME_ROUTER } from "../../lib/constants.js";
import format from "date-fns/format";
const ORDER_IN_PROCESS = "Order in Process";
const READY_FOR_COLLECTION = "Ready for Collection";
const PICKUP_DATE = "Pickup Date:";
const SHIPPED = "Shipped";
const ORDER_CONFIRMED = "Order Confirmed";
const ITEM_PACKED = "Item Packed";
const OUT_FOR_DELIVERY = "Out For Delivery";
// const READY_FOR_COLLECTION = "Ready for Collection";
const ESTIMATED_DATE = "Estimated Delivery Date:";
const DELIVERY_TEXT = "Delivered on:";

const dateFormat = "DD MM YYYY";
class OrderList extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    window.scroll(0, 0);
  }
  renderToContinueShopping() {
    this.props.history.push(HOME_ROUTER);
  }

  render() {
    if (
      this.props.ordersTransactionData &&
      this.props.ordersTransactionData.orderData
    ) {
      return (
        <div className={styles.orderList}>
          <div className={styles.headerBox}>
            <div className={styles.header}>Recent orders</div>
            {/* {this.props.ordersTransactionData &&
            this.props.ordersTransactionData.totalNoOfOrders > 5 ? ( */}
            <div className={styles.headerButton}>
              <Button
                type="hollow"
                label="View All"
                borderColor={""}
                color={"#da1c5c"}
                onClick={() => this.props.showAllOrdersList()}
              />
            </div>
            {/* ) : null} */}
          </div>

          <Carousel elementWidthDesktop={50}>
            {this.props.ordersTransactionData &&
              this.props.ordersTransactionData.orderData &&
              this.props.ordersTransactionData.orderData.map(orderData => {
                return (
                  <div
                    className={styles.orderDataCard}
                    onClick={() =>
                      this.props.getOrderRelatedQuestions(orderData)
                    }
                  >
                    <div className={styles.orderDataBox}>
                      <div className={styles.orderImageBox}>
                        {/* <img
                          className={styles.orderImage}
                          src={orderData.products[0].imageURL}
                          alt="Order image"
                        /> */}
                        <ProductImage
                          image={orderData.products[0].imageURL}
                          // flatImage={this.props.productName === "Gift Card"}
                        />
                      </div>
                      <div className={styles.orderDatils}>
                        <div className={styles.productName}>
                          {orderData.products[0].productName}
                        </div>
                        <div className={styles.orderStatus}>
                          Order Status:
                          <span className={styles.fontBold}>
                            {" "}
                            {orderData.products[0].statusDisplay}{" "}
                            {orderData.orderid}
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

                        {/* {(orderData.products[0].EDD &&
                          orderData.products[0].statusDisplay ==
                            "Order Confirmed") ||
                        orderData.products[0].statusDisplay ==
                          "Order in Process" ||
                        orderData.products[0].statusDisplay == "Item Packed" ||
                        orderData.products[0].statusDisplay == "Shipped" ||
                        orderData.products[0].statusDisplay == "Delivered" ? (
                          <div className={styles.orderStatus}>
                            {orderData.products[0].statusDisplay == "Delivered"
                              ? "Delivered On: "
                              : "Estimated Delivery Date: "}
                            :{" "}
                            <span className={styles.fontBold}>
                              {getDayNumberSuffix(orderData.products[0].EDD)}
                            </span>
                          </div>
                        ) : null} */}
                        {/* {orderData.products[0].EDD &&
                          orderData.products[0].statusDisplay=="Order Confirmed"||
                          orderData.products[0].statusDisplay=="Order in Process"||
                          orderData.products[0].statusDisplay=="Item Packed"||
                          orderData.products[0].statusDisplay=="Shipped"||
                          orderData.products[0].statusDisplay=="Delivered"(
                          <div className={styles.orderStatus}>
                            {orderData.products[0].statusDisplay =="Delivered"?"Delivered On: ":"Est. delivery date: "}
                            :{" "}

                            <span className={styles.fontBold}>
                              {
                                getDayNumberSuffix(
                                orderData.products[0].EDD
                              )}
                            </span>
                          </div>
                        )} */}
                      </div>
                    </div>
                  </div>
                );
              })}
          </Carousel>
        </div>
      );
    } else {
      return (
        <div className={styles.noOrderBox}>
          <div className={styles.noOrderHeader}>Your have no recent orders</div>
          <div className={styles.noOrderTxt}>
            You can go to home page to view more items
          </div>
          <div className={styles.continueShoping}>
            <Button
              type="primary"
              backgroundColor="#da1c5c"
              height={40}
              label="START SHOPPING"
              borderRadius={6}
              width={205}
              textStyle={{ color: "#FFF", fontSize: 14 }}
              onClick={() => this.renderToContinueShopping()}
            />
          </div>
        </div>
      );
    }
  }
}

export default withRouter(OrderList);
