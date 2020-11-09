import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "../../general/components/Button.js";
import onOrder from "../components/img/onOrder.svg";
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
  orderListRender = () => {
    let { ordersTransactionData } = this.props;
    let orderList = [];
    if (ordersTransactionData && ordersTransactionData.orderData.length) {
      orderList = ordersTransactionData.orderData.slice(0, 5);
    }
    let productList = [];
    orderList.forEach(orderItem => {
      if (orderItem.products.length) {
        orderItem.products.forEach(product => {
          if (productList.length < 5) {
            productList.push(
              <div
                className={styles.orderDataCard}
                onClick={() =>
                  this.props.getOrderRelatedQuestions(orderItem, product)
                }
              >
                <div className={styles.orderDataBox}>
                  <div className={styles.orderImageBox}>
                    <ProductImage image={product.imageURL} />
                  </div>
                  <div className={styles.orderDatils}>
                    <div className={styles.productName}>
                      {product.productName}
                    </div>
                    <div className={styles.orderStatus}>
                      Order status:
                      <span className={styles.fontBold}>
                        {" "}
                        {product.statusDisplay}{" "}
                      </span>
                    </div>

                    {product.pickUpDateCNC ? (
                      product.statusDisplay === ORDER_IN_PROCESS ||
                      product.statusDisplay === READY_FOR_COLLECTION ? (
                        <div className={styles.orderStatus}>
                          {PICKUP_DATE}&nbsp;
                          <span className={styles.fontBold}>
                            {getDayNumberSuffix(product.pickUpDateCNC, true)}
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
                        <div className={styles.fontBold}>
                          {getDayNumberSuffix(
                            product.EDD || product.estimateddeliverydate
                          )}
                        </div>
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
          }
        });
      }
    });
    return productList;
  };

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
            {this.orderListRender()}
          </Carousel>
        </React.Fragment>
      );
    } else {
      return (
        <div className={styles.noOrderBox}>
          <div className={styles.loginImg}>
            <img src={onOrder} alt="on Order image" />
          </div>
          <div className={styles.noOrderHeader}>Your have no recent orders</div>
          <div className={styles.noOrderTxt}>
            You dont have any orders with us recently.
            <br />
            You can go to home page to view more items or else.
          </div>
          <div className={styles.continueShoping}>
            <div
              className={styles.loginBtn}
              onClick={() => this.renderToContinueShopping()}
            >
              {" "}
              START SHOPPING{" "}
            </div>
          </div>
        </div>
      );
    }
  }
}
export default withRouter(OrderList);
OrderList.propTypes = {
  showAllOrdersList: PropTypes.func,
  getOrderRelatedQuestions: PropTypes.func,
  ordersTransactionData: PropTypes.shape({
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
