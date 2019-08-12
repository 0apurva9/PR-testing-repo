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
        return "Cliq n Piq";

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
      if (orderStatusCode && orderStatusCode != "DELIVERED") {
        if (!orderStatusCode.includes("CANCEL")) {
          trackOrderText = "Track Order";
        }
      }
    }
    return trackOrderText;
  }

  showToastMessage() {
    this.props.displayToast(
      "Your order is not confirmed yet. Please see order details."
    );
  }

  render() {
    let calloutMessage = this.props.calloutMessage;

    let updatedCalloutMessage =
      calloutMessage && calloutMessage.replace("Date", "Date: ");
    let statusDisplayMsg =
      this.props.statusDisplayMsg && this.props.statusDisplayMsg;
    let estimatedDeliveryDate = "";
    let estimatedDeliveryDateFormatted = "";
    let deliveryDate = "",
      deliveryDateFormatted = "";
    if (this.props && this.props.estimatedDeliveryDate) {
      estimatedDeliveryDate = this.props.estimatedDeliveryDate;
      let edd = new Date(estimatedDeliveryDate);
      estimatedDeliveryDateFormatted = format(edd, dateFormat);
    }
    if (this.props && this.props.deliveryDate) {
      deliveryDate = this.props.deliveryDate;
      let deliveryD = new Date(deliveryDate);
      deliveryDateFormatted = format(deliveryD, dateFormat);
    }

    let date = "",
      shipmentStatus = "";
    if (statusDisplayMsg && statusDisplayMsg.length > 0) {
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
        date = statusDisplayMsgL1.value.statusList[0].statusMessageList[0].date;
      }
      if (
        statusDisplayMsgL1 &&
        statusDisplayMsgL1.value &&
        statusDisplayMsgL1.value.statusList &&
        statusDisplayMsgL1.value.statusList[0]
      ) {
        shipmentStatus = statusDisplayMsgL1.value.statusList[0].shipmentStatus;
      }
    }
    let returnEligibleDate = "";
    if (date && this.props.returnPolicy) {
      returnEligibleDate = new Date(this.props.deliveryDate);
      returnEligibleDate.setDate(
        returnEligibleDate.getDate() + parseInt(this.props.returnPolicy)
      );
    }
    let orderCouldbeCollected = "";
    if (date && this.props.returnPolicy) {
      orderCouldbeCollected = new Date(date);
      orderCouldbeCollected.setDate(
        orderCouldbeCollected.getDate() + parseInt(this.props.returnPolicy)
      );
    }
    let EstDeliveryFormatted = "";
    if (this.props.consignmentStatus === "DELIVERED") {
      let EstDelivery = new Date(this.props.deliveryDate);
      EstDeliveryFormatted = format(EstDelivery, dateFormat);
    }
    let checkStatus = "";
    let EstDeliveryDate =
      shipmentStatus && shipmentStatus.includes("Estimated Delivery Date");
    if (this.props.clickAndCollect === true) {
      checkStatus =
        shipmentStatus && shipmentStatus.includes("Estimated Delivery Date");
    }
    // console.log(
    //   "giftCardStatus",
    //   this.props.giftCardStatus,
    //   "displayStatusName",
    //   this.props.displayStatusName,
    //   "props in order card:",
    //   this.props
    // );
    //console.log("estomated Delivery Date:", estimatedDeliveryDateFormatted)
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

        {/* {this.props.estimatedDeliveryDate &&
          (this.props.statusDisplay !== "CANCEL" &&
            this.props.statusDisplay !== "RETURN") && (
            <div className={styles.estimatedDeliveryDate}>
              Estimated Delivery Date: {estimatedDeliveryDateFormatted}
            </div>
          )} */}
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
                {this.props.cartExpiryDate && (
                  <div className={styles.priceHolder}>
                    <div className={styles.egvPrice}>
                      Expiry Date: <span className={styles.five} />
                      {format(this.props.cartExpiryDate, dateTimeFormat)}
                    </div>
                  </div>
                )}
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
          {/* {!this.props.isEgvOrder &&
            this.props.orderStatusCode &&
            this.props.orderStatusCode !== "DELIVERED" && (
              <div className={styles.deliveryDate}>
                {this.props.displayStatusName}
                {this.props.orderCancelDate && (
                  <span> on {this.props.orderCancelDate}</span>
                )}
              </div>
            )} */}
          {!this.props.isEgvOrder &&
            this.props.orderStatusCode &&
            this.props.orderStatusCode != "DELIVERED" &&
            this.props.price != 0.01 && (
              <div className={styles.deliveryDate}>
                {this.props.displayStatusName === "Your payment is in process"
                  ? "Payment Pending"
                  : this.props.displayStatusName}
                {this.props.orderCancelDate && (
                  <span> on {this.props.orderCancelDate}</span>
                )}
              </div>
            )}
          {this.props.orderStatusCode &&
            this.props.orderStatusCode === "DELIVERED" &&
            this.props.deliveryDate && (
              <div className={styles.deliveryDate}>
                Delivered on {this.props.deliveryDate}
              </div>
            )}

          {this.props.orderStatusCode && (
            <div
              className={
                this.props.orderStatusCode === "PAYMENT_PENDING" ||
                this.props.orderStatusCode === "PAYMENT_TIMEOUT"
                  ? styles.calloutMessagePayment
                  : styles.calloutMessage
              }
            >
              <div className={styles.calloutMessage}>
                {updatedCalloutMessage}
              </div>
            </div>
          )}

          {this.props.idFromAllOrderDetails != "Y" && (
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
                    this.props.discountPrice != this.props.price && (
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
          {this.props.idFromAllOrderDetails != "Y" && (
            <div className={styles.priceHolder}>
              {this.props.productSize && (
                <div className={styles.price}>
                  {this.props.productSize}{" "}
                  {this.props.productColourName ? "|" : ""}
                </div>
              )}
              {this.props.productColourName && (
                <div className={styles.price}>
                  &nbsp;{this.props.productColourName}
                </div>
              )}
            </div>
          )}
          {this.props.idFromAllOrderDetails != "Y" && (
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
            this.props.idFromAllOrderDetails != "Y" &&
            this.props.showQuantity &&
            this.props.productName != "Gift Card" && (
              <div className={styles.additionalContent}>
                {this.props.children}
              </div>
            )}

          {!this.props.isEgvOrder &&
            !this.props.retryPaymentUrl &&
            this.props.orderStatusCode != "PAYMENT_PENDING" &&
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

          {!this.props.isEgvOrder &&
            (this.props.retryPaymentUrl ||
              this.props.orderStatusCode === "PAYMENT_PENDING") &&
            this.props.showRightArrow && (
              <span
                className={styles.rightArrow}
                onClick={() => this.showToastMessage()}
              />
            )}

          {this.props.isGiveAway === NO &&
            this.props.orderStatusCode != "PAYMENT_PENDING" &&
            !this.props.retryPaymentUrl && (
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
          {this.props &&
            this.props.returnMode != "REFNOPCK" && (
              <React.Fragment>
                {this.props.pickupAddress &&
                  this.props.returnStoreAddress && (
                    <div className={styles.pickupAddressHolder}>
                      <div className={styles.pickupAddressTitle}>
                        {this.props.returnModeSelected == "Pick Up"
                          ? "Customer pick up address"
                          : this.props.returnModeSelected == "Self Courier"
                            ? "Delivery Address"
                            : this.props.returnModeSelected == "Return To Store"
                              ? "Store Address"
                              : ""}
                      </div>
                      {this.props.pickupAddress && (
                        <div className={styles.pickupAddressText}>
                          {this.props.pickupAddress.line1}{" "}
                          {this.props.pickupAddress.line1 ? "," : ""}&nbsp;
                          {this.props.pickupAddress.landmark}{" "}
                          {this.props.pickupAddress.landmark ? "," : ""}&nbsp;
                          {this.props.pickupAddress.city}{" "}
                          {this.props.pickupAddress.city ? "," : ""}&nbsp;
                          {this.props.pickupAddress.state}{" "}
                          {this.props.pickupAddress.state ? "," : ""}&nbsp;
                          {this.props.pickupAddress.postalCode}
                        </div>
                      )}
                      {this.props.returnStoreAddress && (
                        <div className={styles.pickupAddressText}>
                          {this.props.returnStoreAddress.address &&
                            this.props.returnStoreAddress.address.line1}{" "}
                          ,&nbsp;
                          {this.props.returnStoreAddress.address &&
                            this.props.returnStoreAddress.address.city}{" "}
                          ,&nbsp;
                          {this.props.returnStoreAddress.address &&
                            this.props.returnStoreAddress.address.postalCode}
                        </div>
                      )}
                    </div>
                  )}
              </React.Fragment>
            )}
        </div>
        {this.props.children &&
          this.props.idFromAllOrderDetails === "Y" &&
          this.props.productName != "Gift Card" && (
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
        {this.props.consignmentStatus == "PAYMENT_PENDING" && (
          <React.Fragment>
            <div className={styles.commonTitle}>
              <span className={styles.ffsemibold}>Status: </span>
              <span className={styles.estimatedDate}>
                Your payment is in process
              </span>
            </div>
            <div className={styles.calloutMessage}>{calloutMessage}</div>
          </React.Fragment>
        )}
        {/* {this.props.statusDisplay && (
          <div className={styles.commonTitle}>
            <span className={styles.ffsemibold}>Status: </span>
            <span className={styles.estimatedDate}>{this.props.statusDisplay}</span>
          </div>
        )} */}
        {/* {this.props.consignmentStatus === "DELIVERED" && (
          <React.Fragment>
            <div className={styles.commonTitle}>
              <span className={styles.ffsemibold}>Delivered On: </span>
              <span className={styles.estimatedDate}>
                {deliveryDateFormatted}
              </span>
            </div> */}
        {/* <div className={styles.commonTitle}>
              {this.props.shipmentStatusText}
              {this.props.statusMessageListDate}
            </div> */}
        {/* </React.Fragment>
        )} */}
        {/* {this.props.isGiveAway === "N" && this.props.consignmentStatus &&
          this.props.consignmentStatus !== "DELIVERED" &&
          !this.props.consignmentStatus.includes("CANCEL") &&
          this.props.showEDD === "Y" &&
          estimatedDeliveryDate && (
            <div className={styles.commonTitle}>
               <span className={styles.ffsemibold}>{shipmentStatus}</span>

               {this.props.selectedDeliveryMode.code === "click-and-collect" && (
                <span className={styles.ffsemibold}>
                  Order could be collected by:{" "}
                </span>
              )} */}

        {/* {this.props.selectedDeliveryMode.code !== "click-and-collect" && (
                <span className={styles.ffsemibold}>
                  Estimated Delivery Date:{" "}
                </span>
              )} */}
        {/* {!this.props.returnMode &&
                this.props.consignmentStatus !== "DELIVERED" && date && (
                  <span className={styles.styleDate}>
                    {this.props.estimateddeliverydate
                      ? estimatedDeliveryDateFormatted
                      : date} :{" "}
                  </span>
                )}
              {this.props.consignmentStatus === "DELIVERED" &&
                format(returnEligibleDate.toString(), dateFormat)} */}
        {/* <span className={styles.styleDate}>
                {estimatedDeliveryDateFormatted}
              </span> */}
        {/* </div>
          )} */}

        {this.props.isGiveAway === "N" &&
          this.props.consignmentStatus === "DELIVERED" &&
          this.props.deliveryDate && (
            <div className={styles.deliveryDate}>
              Delivered on:{" "}
              <span className={styles.estimatedDate}>
                {deliveryDateFormatted}
              </span>
            </div>
          )}

        {this.props.isGiveAway === "N" &&
          (this.props.consignmentStatus &&
            !this.props.consignmentStatus.includes("CANCEL")) &&
          date && (
            <div className={styles.commonTitle}>
              {!this.props.calloutMessage ? (
                <React.Fragment>
                  {this.props.estimatedDeliveryDate &&
                    !checkStatus &&
                    (date || returnEligibleDate) && (
                      <React.Fragment>
                        <span className={styles.ffsemibold}>
                          {shipmentStatus.includes(
                            "Eligible for Return till"
                          ) && !this.props.deliveryDate
                            ? ""
                            : shipmentStatus}{" "}
                        </span>
                        {EstDeliveryDate && (
                          <span className={styles.styleDate}>
                            &nbsp;
                            {this.props.estimatedDeliveryDate
                              ? estimatedDeliveryDateFormatted
                              : ""}
                          </span>
                        )}
                        {shipmentStatus.includes(
                          "Order Could be collected by"
                        ) && (
                          <span className={styles.styleDate}>
                            {format(
                              orderCouldbeCollected.toString(),
                              dateFormat
                            )}
                          </span>
                        )}

                        <span className={styles.styleDate}>
                          {(this.props.consignmentStatus === "DELIVERED" ||
                            this.props.consignmentStatus ===
                              "ORDER_COLLECTED") &&
                            this.props.deliveryDate &&
                            format(returnEligibleDate.toString(), dateFormat)}
                        </span>
                      </React.Fragment>
                    )}
                </React.Fragment>
              ) : (
                <div className={styles.commonTitle}>
                  {this.props.calloutMessage}
                </div>
              )}
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
        {/* <div
          className={this.props.title ? styles.noPayments : styles.payments}
        /> */}
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
