import React, { Component } from "react";
import Button from "../../general/components/Button.js";
import Carousel from "../../general/components/Carousel";
import { getDayNumberSuffix } from "../../lib/dateTimeFunction";
import styles from "./CustomerIssue.css";
import { withRouter } from "react-router-dom";
import { HOME_ROUTER } from "../../lib/constants.js";
import format from "date-fns/format";
const dateFormat = "DD MM YYYY";
class OrderList extends Component {
  constructor(props) {
    super(props);
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
            {this.props.ordersTransactionData &&
            this.props.ordersTransactionData.totalNoOfOrders > 5 ? (
              <div className={styles.headerButton}>
                <Button
                  type="hollow"
                  label="View All"
                  borderColor={""}
                  color={"#da1c5c"}
                  onClick={() => this.props.showAllOrdersList()}
                />
              </div>
            ) : null}
          </div>

          <Carousel elementWidthDesktop={41}>
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
                        <img
                          className={styles.orderImage}
                          src={orderData.products[0].imageURL}
                          alt="Order image"
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
                        <div className={styles.orderStatus}>
                          Delivered On:{" "}
                          <span className={styles.fontBold}>
                            {getDayNumberSuffix(
                              orderData.products[0].EDD,
                              false
                            )}
                          </span>
                        </div>
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
