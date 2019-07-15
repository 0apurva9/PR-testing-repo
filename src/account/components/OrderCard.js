import React from "react";
import PropTypes from "prop-types";
import ProductImage from "../../general/components/ProductImage.js";
import CheckBox from "../../general/components/CheckBox.js";
import styles from "./OrderCard.css";
import format from "date-fns/format";
import {
  RUPEE_SYMBOL,
  NO,
  MY_ACCOUNT,
  ORDER,
  ORDER_CODE,
  PRODUCT_CANCEL
} from "../../lib/constants";
import * as NumberFormatter from "../../lib/NumberFormatter.js";
const dateFormat = "Do MMM YYYY";
const PRODUCT_RETURN_WINDOW_CLOSED =
  "You cannot return this product as the window for returns has expired";
const dateTimeFormat = "DD MMM YYYY | HH:mm:ss";
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

      case "home delivery":
        return "Standard Delivery";

      case "express delivery":
        return "Express Delivery";

      default:
        break;
    }
  }
  getTrackOrderText(orderStatusCode, isEgvOrder) {
    let trackOrderText = "";
    if (!isEgvOrder) {
      if (orderStatusCode && orderStatusCode !== "DELIVERED") {
        if (!orderStatusCode.includes("CANCEL")) {
          trackOrderText = "Track Order";
        }
      }
    }
    return trackOrderText;
  }
  render() {
    let statusDisplayMsg =
      this.props.statusDisplayMsg && this.props.statusDisplayMsg;
    let estimatedDeliveryDate = "";
    let estimatedDeliveryDateFormatted = "";
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
        let edd = new Date(estimatedDeliveryDate);
        estimatedDeliveryDateFormatted = format(edd, dateFormat);
      }
    }
    return (
      <div className={this.props.onHollow ? styles.onHollow : styles.base}>
        {this.props.returnFlow && (
          <div className={styles.cancelTitle}>Return Item</div>
        )}
        {this.props.title &&
          this.props.title === "Cancel Item" &&
          !this.props.returnFlow && (
            <div className={styles.cancelTitle}>{PRODUCT_CANCEL}</div>
          )}

        {/* {this.props.title &&
					this.props.title === 'Cancel Item' &&(<div className={styles.cancelTitle}>{PRODUCT_CANCEL}</div>)} */}

        {this.props.estimatedDeliveryDate &&
          (this.props.statusDisplay !== "CANCEL" &&
            this.props.statusDisplay !== "RETURN") && (
            <div className={styles.estimatedDeliveryDate}>
              Estimated Delivery Date: {this.props.estimatedDeliveryDate}
            </div>
          )}
        <div
          className={styles.productImageHolder}
          style={{
            width: this.props.imageHolderWidth
              ? this.props.imageHolderWidth
              : null,
            height: this.props.imageHolderHeight
              ? this.props.imageHolderHeight
              : null
          }}
        >
          <ProductImage
            image={this.props.imageUrl}
            onClickImage={() => this.onClick()}
            flatImage={this.props.productName === "Gift Card"}
          />
        </div>
        <div className={styles.productDetails}>
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
            {this.props.isEgvOrder && (
              <React.Fragment>
                <div className={styles.egvCardNumber}>
                  {this.props.egvCardNumber}
                </div>
                <div className={styles.deliveryDate}>
                  <div className={styles.egvText}>
                    {this.props.giftCardStatus}
                  </div>
                </div>
                <div className={styles.priceHolder}>
                  <div className={styles.egvPrice}>
                    Expiry Date: <span className={styles.five} />
                    {format(this.props.cartExpiryDate, dateTimeFormat)}
                  </div>
                </div>
                <div className={styles.egvAmount}>
                  {this.props.totalFinalPayableOrderAmount}
                </div>
              </React.Fragment>
            )}
          </div>

          {this.props.retryPaymentUrl && (
            <React.Fragment>
              <div className={styles.deliveryDate}>
                {this.props.retryPayment}
              </div>
            </React.Fragment>
          )}
          {!this.props.isEgvOrder &&
            this.props.orderStatusCode &&
            this.props.orderStatusCode !== "DELIVERED" && (
              <div className={styles.deliveryDate}>
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
                <div className={styles.deliveryDate}>
                  Delivered on {this.props.deliveryDate}
                </div>
              )}
            {this.props.orderStatusCode && (
              <div className={styles.calloutMessage}>
                {this.props.calloutMessage}
              </div>
            )}
          </div>

          {this.props.idFromAllOrderDetails !== "Y" && (
            <div className={styles.priceWithQuantity}>
              {this.props.isGiveAway === NO || !this.props.isGiveAway ? (
                <div className={styles.priceHolderForGiftCard}>
                  {this.props.showIsGiveAway && (
                    <div className={styles.price}>
                      {this.props.isGiveAway === NO &&
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
            </div>
          )}
          {this.props.idFromAllOrderDetails !== "Y" && (
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
          )}
          {this.props.idFromAllOrderDetails !== "Y" && (
            <div>
              {this.props.quantity && (
                <div className={styles.priceHolder}>
                  <div className={styles.price}>Qty</div>
                  <div className={styles.quantity}>
                    {this.props.numberOfQuantity}
                  </div>
                </div>
              )}
            </div>
          )}

          {this.props.children &&
            this.props.idFromAllOrderDetails !== "Y" &&
            this.props.showQuantity &&
            this.props.productName !== "Gift Card" && (
              <div className={styles.additionalContent}>
                {this.props.children}
              </div>
            )}
          {!this.props.isEgvOrder &&
            this.props.showRightArrow && (
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

          {this.props.isGiveAway === NO &&
            this.props.orderStatusCode !== "PAYMENT_PENDING" && (
              <div
                className={styles.trackOrderText}
                onClick={() =>
                  this.onViewItemDetails(
                    this.props.orderId,
                    this.props.transactionId
                  )
                }
              >
                {this.getTrackOrderText(
                  this.props.orderStatusCode,
                  this.props.isEgvOrder
                )}
              </div>
            )}
          {this.props.pickupAddress && (
            <div className={styles.pickupAddressHolder}>
              <div className={styles.pickupAddressTitle}>Pick up from:</div>
              <div className={styles.pickupAddressText}>
                {this.props.pickupAddress.line1} ,&nbsp;
                {this.props.pickupAddress.landmark} ,&nbsp;
                {this.props.pickupAddress.city} ,&nbsp;
                {this.props.pickupAddress.state}&nbsp;
                {this.props.pickupAddress.postalCode}
              </div>
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
        {this.props.returnReason && (
          <div className={styles.returnReasonText}>
            <span className={styles.returnReasonTitle}>Reason for return:</span>{" "}
            {this.props.returnReason}
          </div>
        )}
        {this.props.returnSubReason && (
          <div className={styles.returnCommentText}>
            <span className={styles.returnCommentTitle}>Issue Detail:</span>{" "}
            {this.props.returnSubReason}
          </div>
        )}
        {this.props.returnComments && (
          <div className={styles.returnCommentText}>
            <span className={styles.returnCommentTitle}>Comments:</span>{" "}
            {this.props.returnComments}
          </div>
        )}

        <div>{this.props.additionalContent}</div>
        {this.props.selectedDeliveryMode &&
          this.props.selectedDeliveryMode.name && (
            <div className={styles.commonTitle}>
              <span className={styles.ffsemibold}>Delivery Mode: </span>
              <span className={styles.estimatedDate}>
                {this.getSelectedDeliveryModeName(
                  this.props.selectedDeliveryMode.name
                )}
              </span>
            </div>
          )}
        {this.props.consignmentStatus === "DELIVERED" && (
          <React.Fragment>
            <div className={styles.commonTitle}>
              <span className={styles.ffsemibold}>Delivered On: </span>
              <span className={styles.estimatedDate}>
                {this.props.deliveryDate}
              </span>
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
              <span className={styles.styleDate}>
                {estimatedDeliveryDateFormatted}
              </span>
            </div>
          )}
        {this.props.isOrderReturnable === false &&
          this.props.statusDisplay === "Delivered" && (
            <div className={styles.returnClosed}>
              {PRODUCT_RETURN_WINDOW_CLOSED}
            </div>
          )}
        {this.props.sellerName && (
          <div className={styles.sellerName}>
            Sold By : {this.props.sellerName}
          </div>
        )}
        <div className={this.props.title ? "" : styles.payments} />
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
  isSelect: PropTypes.bool,
  title: PropTypes.string
};
OrderCard.defaultProps = {
  quantity: false,
  numberOfQuantity: 1,
  onHollow: false,
  showQuantity: true,
  showIsGiveAway: true
};
