import React from "react";
import PropTypes from "prop-types";
import ProductImage from "../../general/components/ProductImage.js";
import CheckBox from "../../general/components/CheckBox.js";
import styles from "./OrderCard.css";
import { RUPEE_SYMBOL, NO } from "../../lib/constants";
import * as NumberFormatter from "../../lib/NumberFormatter.js";
import DesktopOnly from "../../general/components/DesktopOnly";
import MobileOnly from "../../general/components/MobileOnly";
export default class OrderCard extends React.Component {
  onClick() {
    if (this.props.onClick) {
      this.props.onClick();
    }
  }

  reSendEmailForGiftCard = () => {
    if (this.props.reSendEmailForGiftCard) {
      this.props.reSendEmailForGiftCard();
    }
  };
  render() {
    return (
      <div className={this.props.onHollow ? styles.onHollow : styles.base}>
        <DesktopOnly>
          {(this.props.orderPlace || this.props.orderId) && (
            <div className={styles.orderPlaceAndId}>
              {this.props.orderPlace && (
                <div className={styles.orderPlace}>
                  <span className={styles.orderHeader}>Order Placed: </span>
                  <span className={styles.orderText}>
                    {this.props.orderPlace}
                  </span>
                </div>
              )}
              {this.props.orderId && (
                <div className={styles.orderId}>
                  <span className={styles.orderHeader}>Order ID: </span>
                  <span className={styles.orderText}>{this.props.orderId}</span>
                </div>
              )}
            </div>
          )}
        </DesktopOnly>

        {this.props.estimatedDeliveryDate &&
          (this.props.statusDisplay !== "CANCEL" &&
            this.props.statusDisplay !== "RETURN") && (
            <div className={styles.estimatedDeliveryDate}>
              <b>Estimated Delivery Date:</b> {this.props.estimatedDeliveryDate}
            </div>
          )}
        <div className={styles.productImageHolder}>
          <ProductImage
            image={this.props.imageUrl}
            onClickImage={() => this.onClick()}
            flatImage={this.props.productName === "Gift Card"}
          />
        </div>
        <div className={styles.productDetails}>
          <DesktopOnly>
            {this.props.productBrand && (
              <div className={styles.productBrand}>
                {this.props.productBrand}
              </div>
            )}
          </DesktopOnly>
          <div
            className={
              this.props.isSelect ? styles.withCheckBox : styles.productName
            }
          >
            {this.props.isSelect && (
              <div className={styles.checkBoxHolder}>
                <CheckBox selected />
              </div>
            )}
            {this.props.productName}
          </div>
          <div className={styles.priceWithQuantity}>
            {this.props.isGiveAway === NO || !this.props.isGiveAway ? (
              <div className={styles.priceHolderForGiftCard}>
                <div className={styles.price}>
                  {this.props.isEgvOrder && this.props.egvCardNumber
                    ? this.props.egvCardNumber
                    : this.props.isGiveAway === NO &&
                      !this.props.isEgvOrder &&
                      this.props.productName === "Gift Card"
                      ? "Gift card detail will be sent you on your specified email id shortly."
                      : `${RUPEE_SYMBOL} ${NumberFormatter.convertNumber(
                          this.props.price
                        )}`}
                </div>
                {this.props.isEgvOrder &&
                  this.props.resendAvailable && (
                    <div
                      className={styles.reSendEmail}
                      onClick={() => this.reSendEmailForGiftCard()}
                    >
                      Resend Email
                    </div>
                  )}
                {this.props.discountPrice &&
                  this.props.discountPrice !== this.props.price && (
                    <div className={styles.discountPrice}>
                      {`${RUPEE_SYMBOL} ${NumberFormatter.convertNumber(
                        this.props.price
                      )}`}
                    </div>
                  )}
              </div>
            ) : (
              <div className={styles.priceHolder}>
                <div className={styles.price}>Free</div>
              </div>
            )}
            {this.props.quantity && (
              <div className={styles.quantityHolder}>
                <div className={styles.price}>Qty</div>
                <div className={styles.quantity}>
                  {this.props.numberOfQuantity}
                </div>
              </div>
            )}
          </div>
          {this.props.children &&
            this.props.showQuantity &&
            this.props.productName !== "Gift Card" && (
              <div className={styles.additionalContent}>
                {this.props.children}
              </div>
            )}
        </div>
      </div>
    );
  }
}
OrderCard.propTypes = {
  productImage: PropTypes.string,
  productName: PropTypes.string,
  price: PropTypes.number,
  discountPrice: PropTypes.string,
  isSelect: PropTypes.bool
};
OrderCard.defaultProps = {
  quantity: false,
  numberOfQuantity: 1,
  onHollow: false,
  showQuantity: true
};
