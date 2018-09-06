import React from "react";
import styles from "./OrderRelatedPopup.css";
import ProductImage from "../../general/components/ProductImage.js";
import CheckBox from "../../general/components/CheckBox";
import format from "date-fns/format";
export default class OrderRelatedPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      check: null
    };
  }
  setProductDetails(
    orderCode,
    transactionId,
    sellerOrderNumber,
    productImageURL,
    orderDate,
    productName,
    productPrice,
    productStatus,
    index
  ) {
    if (this.props.setProductDetails) {
      this.setState({ check: index });
      this.props.setProductDetails(
        orderCode,
        transactionId,
        sellerOrderNumber,
        productImageURL,
        orderDate,
        productName,
        productPrice,
        productStatus
      );
    }
  }
  getMoreOrder() {
    if (this.props.getMoreOrder) {
      this.props.getMoreOrder();
    }
  }
  closeModal() {
    if (this.props.closeModal) {
      this.props.closeModal();
    }
  }
  render() {
    return (
      <div className={styles.base}>
        <div className={styles.allOrderHolder}>
          <div
            className={styles.crossButton}
            onClick={() => this.closeModal()}
          />
          <div className={styles.header}>Select Orders from Below</div>
          <div className={styles.allDataHolder}>
            {this.props.ordersTransactionData &&
              this.props.ordersTransactionData.orderData &&
              this.props.ordersTransactionData.orderData.map(
                (orderDetails, index) => {
                  return (
                    <div className={styles.orderMainCard}>
                      {orderDetails.products &&
                        orderDetails.products.map((productsDetails, i) => {
                          return (
                            <div
                              className={styles.orderCard}
                              onClick={() =>
                                this.setProductDetails(
                                  orderDetails.orderId,
                                  productsDetails.transactionId,
                                  productsDetails.sellerorderno,
                                  productsDetails.imageURL,
                                  orderDetails.orderDate,
                                  productsDetails.productName,
                                  productsDetails.price,
                                  productsDetails.statusDisplay,
                                  index
                                )
                              }
                              key={i}
                            >
                              <div className={styles.checkboxHolder}>
                                <CheckBox
                                  selected={this.state.check === index}
                                />
                              </div>
                              <div className={styles.imageHolder}>
                                <ProductImage
                                  image={productsDetails.imageURL}
                                />
                              </div>
                              <div className={styles.dataHolder}>
                                <div
                                  className={styles.productDescriptionHolder}
                                >
                                  <div className={styles.productDescription}>
                                    {" "}
                                    {productsDetails.productName}
                                  </div>
                                </div>
                                <div
                                  className={styles.productDescriptionHolder}
                                >
                                  <div className={styles.productDescription}>
                                    {" "}
                                    {productsDetails.price}
                                  </div>
                                </div>
                                <div className={styles.deliveryTimeAndStatus}>
                                  <div className={styles.deliveryStatusHolder}>
                                    <div className={styles.statusHedaer}>
                                      Order Id
                                    </div>
                                    <div className={styles.statusData}>
                                      {orderDetails.orderId}
                                    </div>
                                  </div>
                                  <div className={styles.deliveryStatusHolder}>
                                    <div className={styles.statusHedaer}>
                                      Order Placed
                                    </div>
                                    <div
                                      className={styles.statusData}
                                    >{` ${format(
                                      orderDetails.orderDate,
                                      "DD MMM,YYYY"
                                    )}`}</div>
                                  </div>
                                  <div className={styles.deliveryStatusHolder}>
                                    <div className={styles.statusHedaer}>
                                      Status Display
                                    </div>
                                    <div className={styles.statusData}>
                                      {productsDetails.statusDisplay}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  );
                }
              )}
            <div className={styles.loadMore}>
              <div
                className={styles.loadMoreText}
                onClick={() => this.getMoreOrder()}
              >
                Load More
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
