import React, { Component } from "react";
import Button from "../../general/components/Button.js";
import Carousel from "../../general/components/Carousel";
import { getDayNumberSuffix } from "../../lib/dateTimeFunction";
import styles from "./CustomerIssue.css";
export default class OrderList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
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
                  onClick={() => this.props.getOrderRelatedQuestions(orderData)}
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
                          {orderData.products[0].statusDisplay}
                        </span>
                      </div>
                      <div className={styles.orderStatus}>
                        Delivery On:{" "}
                        <span className={styles.fontBold}>
                          {getDayNumberSuffix(orderData.orderDate)}
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
  }
}
// }= props => {

// };

// export default OrderList;
