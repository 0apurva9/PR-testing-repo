import React, { Component } from "react";
import Button from "../../general/components/Button.js";
import Carousel from "../../general/components/Carousel";
import { getDayNumberSuffix } from "../../lib/dateTimeFunction";
import styles from "./CustomerIssue.css";
import { withRouter } from "react-router-dom";
import ProductImage from "../../general/components/ProductImage.js";
import { HOME_ROUTER } from "../../lib/constants.js";
const ORDER_IN_PROCESS = "Order in Process";
const READY_FOR_COLLECTION = "Ready for Collection";
const PICKUP_DATE = "Pickup Date:";
const SHIPPED = "Shipped";
const ORDER_CONFIRMED = "Order Confirmed";
const ITEM_PACKED = "Item Packed";
const OUT_FOR_DELIVERY = "Out For Delivery";
const ESTIMATED_DATE = "Estimated Delivery Date:";
const DELIVERY_TEXT = "Delivered on:";
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
        <React.Fragment>
          <div className={styles.headerBox}>
            <div className={styles.header}>Recent orders</div>
            <Button
              type="hollow"
              label="View All"
              borderColor={""}
              height={24}
              color={"#da1c5c"}
              onClick={() => this.props.showAllOrdersList()}
            />
          </div>

          <Carousel
            elementWidthDesktop={39}
            showBottomNav={true}
            buttonColor={true}
          >
            {this.props.ordersTransactionData &&
              this.props.ordersTransactionData.orderData &&
              this.props.ordersTransactionData.orderData
                .slice(0, 5)
                .map(orderData => {
                  return (
                    <div
                      className={styles.orderDataCard}
                      onClick={() =>
                        this.props.getOrderRelatedQuestions(orderData)
                      }
                    >
                      <div className={styles.orderDataBox}>
                        <div className={styles.orderImageBox}>
                          <ProductImage
                            image={orderData.products[0].imageURL}
                          />
                        </div>
                        <div className={styles.orderDatils}>
                          <div className={styles.productName}>
                            {orderData.products[0].productName}
                          </div>
                          <div className={styles.orderStatus}>
                            Order status:
                            <span className={styles.fontBold}>
                              {" "}
                              {orderData.products[0].statusDisplay}{" "}
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
                              orderData.products[0].statusDisplay ===
                                ITEM_PACKED ||
                              orderData.products[0].statusDisplay ===
                                OUT_FOR_DELIVERY ||
                              orderData.products[0].statusDisplay ===
                                READY_FOR_COLLECTION) &&
                            (orderData.products[0].EDD ||
                              orderData.products[0].estimateddeliverydate) ? (
                            <div className={styles.orderStatus}>
                              {ESTIMATED_DATE}&nbsp;
                              <div className={styles.fontBold}>
                                {getDayNumberSuffix(
                                  orderData.products[0].EDD ||
                                    orderData.products[0].estimateddeliverydate
                                )}
                              </div>
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
          </Carousel>
        </React.Fragment>
      );
    } else {
      return (
        <div className={styles.noOrderBox}>
          <div className={styles.noOrderHeader}>Your have no recent orders</div>
          <div className={styles.noOrderTxt}>
            You can go to the homepage to browse and start shopping.
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
