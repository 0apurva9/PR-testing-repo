import React from "react";
import PropTypes from "prop-types";
import ProductImage from "../../general/components/ProductImage.js";
import CheckBox from "../../general/components/CheckBox.js";
import styles from "./OrderCard.css";
import {
  RUPEE_SYMBOL,
  NO,
  MY_ACCOUNT,
  ORDER,
  ORDER_CODE
} from "../../lib/constants";
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
  onViewItemDetails(orderId, transactionId) {
    this.props.history.push(
      `${MY_ACCOUNT}${ORDER}/?${ORDER_CODE}=${orderId}&transactionId=${transactionId}`
    );
  }
  getSelectedDeliveryModeName(deliveryModeName) {
    let deliveryModeNameLowerCase = deliveryModeName.toLowerCase();
    switch (deliveryModeNameLowerCase) {
      case "click and collect":
        return "QUiQ PiQ";
        break;

      case "home delivery":
        return "Standard Delivery";
        break;

      case "express delivery":
        return "Express Delivery";
        break;

      default:
        break;
    }
  }
  getTrackOrderText(orderStatusCode) {
    let trackOrderText = "";
    if (orderStatusCode !== "DELIVERED") {
      if (orderStatusCode && !orderStatusCode.includes("CANCEL")) {
        trackOrderText = "Track Order";
      }
    }
    return trackOrderText;
  }
  render() {
    let statusDisplayMsg =
      this.props.statusDisplayMsg && this.props.statusDisplayMsg;
    let estimatedDeliveryDate = "";
    if (
      statusDisplayMsg &&
      statusDisplayMsg.length > 0 &&
      this.props.showEDD === "Y"
    ) {
      let statusDisplayMsgL1 = statusDisplayMsg[statusDisplayMsg.length - 1];
      //written to avoid for loop
      if (
        statusDisplayMsgL1 &&
        statusDisplayMsgL1.value &&
        statusDisplayMsgL1.value.statusList &&
        statusDisplayMsgL1.value.statusList[0] &&
        statusDisplayMsgL1.value.statusList[0].statusMessageList &&
        statusDisplayMsgL1.value.statusList[0].statusMessageList[0] &&
        statusDisplayMsgL1.value.statusList[0].statusMessageList[0].date
      ) {
        estimatedDeliveryDate =
          statusDisplayMsgL1.value.statusList[0].statusMessageList[0].date;
      }
    }
    return (
      <div className={this.props.onHollow ? styles.onHollow : styles.base}>
        <DesktopOnly>
          {(this.props.orderPlace || this.props.orderId) && (
            <div className={styles.orderPlaceAndId}>
              {this.props.orderPlace && (
                <div className={styles.orderPlace}>
                  <span className={styles.orderHeader}>Order Placed on: </span>
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
          {this.props.orderStatusCode &&
            this.props.orderStatusCode !== "DELIVERED" && (
              <div className={styles.orderStatusName}>
                {this.props.displayStatusName}
                {this.props.orderCancelDate && (
                  <span> on {this.props.orderCancelDate}</span>
                )}
              </div>
            )}
          <div>
            {this.props.orderStatusCode &&
              this.props.orderStatusCode === "DELIVERED" &&
              this.props.deliveryDate && (
                <React.Fragment>
                  <div className={styles.deliveryDate}>
                    Delivered on {this.props.deliveryDate}
                  </div>
                  <div className={styles.calloutMessage}>
                    {this.props.calloutMessage}
                  </div>
                </React.Fragment>
              )}
          </div>
          <div className={styles.priceWithQuantity}>
            {this.props.isGiveAway === NO || !this.props.isGiveAway ? (
              <div className={styles.priceHolderForGiftCard}>
                {this.props.showIsGiveAway && (
                  <div className={styles.price}>
                    {this.props.isEgvOrder && this.props.egvCardNumber
                      ? this.props.egvCardNumber
                      : this.props.isGiveAway === NO &&
                        !this.props.isEgvOrder &&
                        this.props.productName === "Gift Card"
                        ? "Gift card detail will be sent you on your specified email id shortly."
                        : this.props.price
                        ? `${RUPEE_SYMBOL} ${NumberFormatter.convertNumber(
                          this.props.price
                        )}`
                      : null}
                  </div>
                )}
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
            <div className={styles.priceHolder}>
            {this.props.productSize && (
              <div className={styles.price}>{this.props.productSize} |</div>
            )}
            {this.props.productColourName && (
              <div className={styles.price}>
                &nbsp;{this.props.productColourName}
              </div>
            )}
          </div>

          </div>
          {this.props.children &&
            this.props.idFromAllOrderDetails !== "Y" &&
            this.props.showQuantity &&
            this.props.productName !== "Gift Card" && (
              <div className={styles.additionalContent}>
                {this.props.children}
              </div>
            )}
           {this.props.showRightArrow && (
            <span
              className={styles.rightArrow}
              onClick={() =>
                this.onViewItemDetails(
                  this.props.orderId,
                  this.props.transactionId
                )
              }
            />
          )}

          {this.props.isGiveAway === NO && (
            <div
              className={styles.trackOrderText}
              onClick={() =>
                this.onViewItemDetails(
                  this.props.orderId,
                  this.props.transactionId
                )
              }
            >
              {this.getTrackOrderText(this.props.orderStatusCode)}
            </div>
          )}
        
        </div>
        {this.props.children &&
          this.props.idFromAllOrderDetails === "Y" &&
          this.props.productName !== "Gift Card" && (
            <div className={styles.additionalContent}>
              {this.props.children}
            </div>
          )}

        <div>{this.props.additionalContent}</div>
        {this.props.selectedDeliveryMode &&
          this.props.selectedDeliveryMode.name && (
            <div className={styles.commonTitle}>
              <span className={styles.ffsemibold}>Delivery Mode: </span>
              {this.getSelectedDeliveryModeName(
                this.props.selectedDeliveryMode.name
              )}
            </div>
          )}
        {this.props.consignmentStatus === "DELIVERED" && (
          <React.Fragment>
            <div className={styles.commonTitle}>
              <span className={styles.ffsemibold}>Delivered On: </span>
              {this.props.deliveryDate}
            </div>
            {/* <div className={styles.commonTitle}>
              {this.props.shipmentStatusText}
              {this.props.statusMessageListDate}
            </div> */}
          </React.Fragment>
        )}
        {this.props.consignmentStatus &&
          this.props.consignmentStatus !== "DELIVERED" &&
          !this.props.consignmentStatus.includes("CANCEL") &&
          this.props.showEDD === "Y" &&
          estimatedDeliveryDate && (
            <div className={styles.commonTitle}>
              {this.props.selectedDeliveryMode.code === "click-and-collect" && (
                <span className={styles.ffsemibold}>
                  Order could be collected by:{" "}
                </span>
              )}
              {this.props.selectedDeliveryMode.code !== "click-and-collect" && (
                <span className={styles.ffsemibold}>
                  Estimated Delivery Date:{" "}
                </span>
              )}
              {estimatedDeliveryDate}
            </div>
          )}

        {this.props.sellerName && (
          <div className={styles.sellerName}>
            Sold By : {this.props.sellerName}
          </div>
        )}
     
      </div>
    );
  }
}
OrderCard.propTypes = {
  productImage: PropTypes.string,
  productName: PropTypes.string,
  additionalContent: PropTypes.element,
  price: PropTypes.number,
  discountPrice: PropTypes.string,
  isSelect: PropTypes.bool
};
OrderCard.defaultProps = {
  quantity: false,
  numberOfQuantity: 1,
  onHollow: false,
  showQuantity: true,
  showIsGiveAway: true
};
