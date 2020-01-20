import React from "react";
import PropTypes from "prop-types";
import ProductImage from "../../general/components/ProductImage.js";
import styles from "./OrderSucessCard.css";
const EDD_TEXT = "Estimated Delivery Date";
export default class OrderSucessCard extends React.Component {
  render() {
    const deliveryOption = this.props.selectedDeliveryMode;
    return (
      <div className={styles.base}>
        <div className={styles.imageHolder}>
          <ProductImage
            image={this.props.imageURL}
            flatImage={this.props.productName === "Gift Card"}
          />
        </div>
        <div className={styles.dataShowingHolder}>
          <div className={styles.dataShow}>
            <div className={styles.productNameWithPrice}>
              <div className={styles.productName}>{this.props.productName}</div>
              <div className={styles.productPrice}>{`Rs. ${
                this.props.price
              }`}</div>
            </div>
            <div className={styles.quantity}>{`Quantity: ${
              this.props.quantity
            }`}</div>
          </div>
          <div className={styles.deliveryTimingShow}>
            <div className={styles.timingAndMode}>
              {this.props.edd &&
                this.props.productName !== "Gift Card" && (
                  <React.Fragment>
                    <div className={styles.deliveyMode}>{EDD_TEXT}</div>
                    <div className={styles.deliveryTime}>
                      {deliveryOption.edd}
                    </div>
                  </React.Fragment>
                )}
              {this.props.productName === "Gift Card" &&
                "Gift card detail will be sent you on your specified email id shortly."}
            </div>
            <div className={styles.sucessIconHolder}>
              <div className={styles.sucessIconHolder}>
                <div className={styles.sucessIcon} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
OrderSucessCard.propTypes = {
  imageUrl: PropTypes.string,
  productName: PropTypes.string,
  quantity: PropTypes.string
};
