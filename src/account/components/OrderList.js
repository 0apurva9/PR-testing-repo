import React from "react";
import Button from "../../general/components/Button.js";
import Carousel from "../../general/components/Carousel";
import styles from "./CustomerIssue.css";
const OrderList = props => {
  return (
    <div className={styles.orderList}>
      <div className={styles.headerBox}>
        <div className={styles.header}>Recent orders</div>
        <div className={styles.headerButton}>
          <Button
            type="hollow"
            label="View All"
            borderColor={""}
            color={"#da1c5c"}
            // onClick={() => generateOtp()}
          />
        </div>
      </div>

      <Carousel elementWidthDesktop={41}>
        {props.ordersTransactionData &&
          props.ordersTransactionData.orderData &&
          props.ordersTransactionData.orderData.map(orderData => {
            return (
              <div
                className={styles.orderDataCard}
                onClick={() => props.getOrderRelatedQuestions(orderData)}
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
                        {orderData.orderDate}
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
};

export default OrderList;
