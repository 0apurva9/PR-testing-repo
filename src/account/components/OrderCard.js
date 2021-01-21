import React from "react";
import PropTypes from "prop-types";
import ProductImage from "../../general/components/ProductImage.js";
import CheckBox from "../../general/components/CheckBox.js";
import DigitalBundledProduct from "../../cart/components/DigitalBundledProduct";
import styles from "./OrderCard.css";
import format from "date-fns/format";
import {
  RUPEE_SYMBOL,
  NO,
  MY_ACCOUNT,
  ORDER,
  ORDER_CODE,
  PRODUCT_CANCEL,
  EDD_TEXT,
  PAYMENT_PENDING,
  PAYMENT_TIMEOUT,
  PAYMENT_FAILED,
  CANCEL_REASON_FOR_BUNDLED_PRODUCT
} from "../../lib/constants";
import {
  setDataLayer,
  ADOBE_ITEM_DETAILS_LINK_CLICKED
} from "../../lib/adobeUtils";
import * as NumberFormatter from "../../lib/NumberFormatter.js";
import exchangeIconLight from "../../cart/components/img/exchangeIconLight.svg";
const dateFormat = "DD MMM YYYY";
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
    setDataLayer(ADOBE_ITEM_DETAILS_LINK_CLICKED);
    this.props.history.push(
      `${MY_ACCOUNT}${ORDER}/?${ORDER_CODE}=${orderId}&transactionId=${transactionId}`
    );
  }
  getSelectedDeliveryModeName(deliveryModeName) {
    let deliveryModeNameLowerCase = deliveryModeName.toLowerCase();
    switch (deliveryModeNameLowerCase) {
      case "click and collect":
        return "QuiQ PiQ";

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
      if (
        orderStatusCode &&
        orderStatusCode != "DELIVERED" &&
        orderStatusCode != "ORDER_UNCOLLECTED" &&
        orderStatusCode != "ORDER_COLLECTED"
      ) {
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

  copyToClipBoard = event => {
    event.preventDefault();
    event.stopPropagation();
    let copyText = this.refs.copyThisLink;

    document.addEventListener(
      "copy",
      function(e) {
        e.clipboardData.setData("text/plain", copyText.innerHTML);
        e.preventDefault();
      },
      true
    );

    document.execCommand("copy");
    window.open(copyText.innerHTML, "_blank");
  };
  getDateMonthFormate(dateWithMonth) {
    let todayDate = new Date().getDate();
    let nextDayDate = todayDate + 1;
    let date = dateWithMonth.getDate();
    let month = dateWithMonth.getMonth() + 1;
    let year = dateWithMonth.getFullYear();
    let newExpressOrSddText = "";
    let monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    if (date === todayDate) {
      newExpressOrSddText = `Today, `;
    } else if (date === nextDayDate) {
      newExpressOrSddText = `Tomorrow, `;
    }
    switch (date) {
      case 1:
      case 21:
      case 31:
        if (newExpressOrSddText) {
          return (
            newExpressOrSddText +
            date +
            "st " +
            monthNames[month - 1] +
            " " +
            year
          );
        } else {
          return "" + date + "st " + monthNames[month - 1] + " " + year;
        }
      case 2:
      case 22:
        if (newExpressOrSddText) {
          return (
            newExpressOrSddText +
            date +
            "nd " +
            monthNames[month - 1] +
            " " +
            year
          );
        } else {
          return "" + date + "nd " + monthNames[month - 1] + " " + year;
        }
      case 3:
      case 23:
        if (newExpressOrSddText) {
          return (
            newExpressOrSddText +
            date +
            "rd " +
            monthNames[month - 1] +
            " " +
            year
          );
        } else {
          return "" + date + "rd " + monthNames[month - 1];
        }
      default:
        if (newExpressOrSddText) {
          return (
            newExpressOrSddText +
            date +
            "th " +
            monthNames[month - 1] +
            " " +
            year
          );
        } else {
          return "" + date + "th " + monthNames[month - 1] + " " + year;
        }
    }
  }
  getDayNumberSuffix(d) {
    let dateWithMonth = d.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3");
    dateWithMonth = new Date(dateWithMonth);

    if (dateWithMonth) {
      return this.getDateMonthFormate(dateWithMonth);
    } else return "";
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
    if (
      this.props.estimatedDeliveryDate &&
      !this.props.estimatedDeliveryDate.includes("DeliveryTAT not found")
    ) {
      estimatedDeliveryDateFormatted = this.getDayNumberSuffix(
        this.props.estimatedDeliveryDate
      );
    }
    if (!estimatedDeliveryDateFormatted && this.props.selectedDeliveryMode) {
      estimatedDeliveryDateFormatted = this.props.selectedDeliveryMode.desc;
    }
    if (this.props && this.props.deliveryDate) {
      deliveryDate = this.props.deliveryDate;
      let deliveryD = new Date(deliveryDate);
      deliveryDateFormatted = format(deliveryD, dateFormat);
    }

    let date = "",
      shipmentStatus = "",
      responseCode = "";
    if (statusDisplayMsg && statusDisplayMsg.length > 0) {
      let statusDisplayMsgL1 = statusDisplayMsg[statusDisplayMsg.length - 1];
      let statusList =
        statusDisplayMsgL1 &&
        statusDisplayMsgL1.value &&
        statusDisplayMsgL1.value.statusList;
      let LaststatusDisplayList = statusList
        ? statusList[statusList.length - 1]
        : "";

      //written to avoid for loop
      if (
        LaststatusDisplayList &&
        LaststatusDisplayList.statusMessageList &&
        LaststatusDisplayList.statusMessageList[0] &&
        LaststatusDisplayList.statusMessageList[0].date
      ) {
        date = LaststatusDisplayList.statusMessageList[0].date;
      }
      if (LaststatusDisplayList && LaststatusDisplayList.shipmentStatus) {
        shipmentStatus = LaststatusDisplayList.shipmentStatus.trim();
        responseCode = LaststatusDisplayList.responseCode;
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
    let CNCcallOut = "";
    let EstDeliveryDate =
      shipmentStatus && shipmentStatus.includes("Estimated Delivery Date");
    if (this.props.clickAndCollect === true) {
      checkStatus =
        shipmentStatus && shipmentStatus.includes("Estimated Delivery Date");
      CNCcallOut =
        this.props &&
        this.props.calloutMessage &&
        this.props.calloutMessage.includes("Estimated Delivery Date");
    }

    let isPaymentFailure = false;
    if (
      this.props.orderStatusCode === PAYMENT_PENDING ||
      this.props.orderStatusCode === PAYMENT_TIMEOUT ||
      this.props.orderStatusCode === PAYMENT_FAILED
    ) {
      isPaymentFailure = true;
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
            isClickable={this.props.isClickable}
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

          {this.props.exchangeDetails &&
            this.props.idFromAllOrderDetails === "Y" && (
              <div className={styles.exchangeDetailsContainer}>
                <img
                  src={exchangeIconLight}
                  alt="exchange icon"
                  className={styles.exchangeIconLight}
                />
                <div className={styles.exchangeProductText}>
                  Exchange Product:{" "}
                  {this.props.exchangeDetails.exchangeModelName}
                </div>
              </div>
            )}

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
            !this.props.retryPaymentUrl &&
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

          {this.props &&
            this.props.orderStatusCode &&
            !CNCcallOut &&
            this.props.price != 0.01 &&
            this.props.calloutMessage &&
            !this.props.calloutMessage.includes(EDD_TEXT) && (
              <div
                className={
                  this.props.orderStatusCode === PAYMENT_PENDING ||
                  this.props.orderStatusCode === PAYMENT_TIMEOUT
                    ? styles.calloutMessagePayment
                    : styles.calloutMessage
                }
              >
                <div className={styles.calloutMessage}>
                  {`${updatedCalloutMessage}`}
                </div>
                {/* {this.props.orderBreachMessage && (
                  <div className={styles.breachMessage}>
                    * {this.props.orderBreachMessage}
                  </div>
                )} */}
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
          {this.props.idFromAllOrderDetails != "Y" &&
            this.props.quantity && (
              <div className={styles.priceWithQuantity}>
                <div className={styles.price}>Qty</div>
                <div className={styles.quantity}>
                  {this.props.numberOfQuantity}
                </div>
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
          {this.props.orderStatusCode &&
            this.props.orderStatusCode !== "DELIVERED" &&
            this.props.orderStatusCode !== "PAYMENT_PENDING" &&
            estimatedDeliveryDateFormatted && (
              <React.Fragment>
                <div className={styles.edd}>
                  <span className={styles.ffsemibold}>
                    {this.props.clickAndCollect === true
                      ? "Pickup Date"
                      : EDD_TEXT}
                    :
                  </span>
                  <span>
                    &nbsp;
                    {estimatedDeliveryDateFormatted}
                  </span>
                </div>
                {this.props.orderBreachMessage && (
                  <div className={styles.breachMessage}>
                    * {this.props.orderBreachMessage}
                  </div>
                )}
              </React.Fragment>
            )}

          {!isPaymentFailure &&
            !this.props.isEgvOrder &&
            !this.props.retryPaymentUrl &&
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
            (this.props.retryPaymentUrl || isPaymentFailure) &&
            this.props.showRightArrow && (
              <span
                className={styles.rightArrow}
                onClick={() => this.showToastMessage()}
              />
            )}

          {!isPaymentFailure &&
            this.props.isGiveAway === NO &&
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
                <div className={styles.pickupAddressHolder}>
                  <div className={styles.pickupAddressTitle}>
                    {this.props.returnModeSelected == "Pick Up"
                      ? "Pick up from"
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

        {this.props.additionalContent && (
          <React.Fragment>{this.props.additionalContent}</React.Fragment>
        )}

        {(this.props.title === PRODUCT_CANCEL || this.props.returnFlow) &&
          this.props.exchangeDetails &&
          this.props.exchangeDetails.exchangeCancelMessage && (
            <React.Fragment>
              <div className={styles.divider} />
              <div className={styles.cancelExchangeMessage}>
                {this.props.exchangeDetails.exchangeCancelMessage}
              </div>
            </React.Fragment>
          )}

        {this.props.title === PRODUCT_CANCEL &&
          this.props.discountBundlingCancelable && (
            <React.Fragment>
              <div className={styles.divider} />
              <div className={styles.cancelExchangeMessage}>
                {CANCEL_REASON_FOR_BUNDLED_PRODUCT}
              </div>
            </React.Fragment>
          )}

        {(this.props.title === PRODUCT_CANCEL || this.props.returnFlow) &&
          this.props.bundledAssociatedItems && (
            <React.Fragment>
              {this.props.title === PRODUCT_CANCEL &&
                !this.props.returnFlow && (
                  <div className={styles.bundledProductCancelSectionTitle}>
                    Attached Product will also get cancelled
                  </div>
                )}
              {this.props.returnFlow && (
                <div className={styles.bundledProductCancelSectionTitle}>
                  Attached Product will also be returned
                </div>
              )}

              {this.props.bundledAssociatedItems.map(
                (bundledProduct, index) => {
                  return (
                    <DigitalBundledProduct
                      key={index}
                      digitalProduct={bundledProduct}
                      pageType={"CANCEL"}
                      showRemoveButton={false}
                    />
                  );
                }
              )}
            </React.Fragment>
          )}

        {this.props.selectedDeliveryMode &&
          this.props.selectedDeliveryMode.name &&
          this.props.selectedDeliveryMode.name.toLowerCase() ===
            "click and collect" && (
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
        {this.props.installationRequestCancelled &&
          this.props.installationRequestCancelled.value.status ===
            "Completed" && (
            <div className={styles.deliveryDate}>
              Installation Cancelled On:{" "}
              <span className={styles.estimatedDate}>
                {this.props.installationRequestCancelled.value.date}
              </span>
            </div>
          )}
        {this.props.installationCompletedDate &&
          this.props.installationRequestCompleted &&
          this.props.installationRequestCompleted.value.customerFacingName ===
            "Request Completed" &&
          this.props.installationRequestCompleted.value.status ===
            "Completed" && (
            <div className={styles.deliveryDate}>
              Installation Completed On:{" "}
              <span className={styles.estimatedDate}>
                {this.props.installationCompletedDate}
              </span>
            </div>
          )}
        {this.props.installationRequestReschedule &&
          this.props.installationRequestReschedule.value.status ===
            "Completed" && (
            <div className={styles.commonTitle}>
              <span className={styles.ffsemibold}>
                Installation Rescheduled On:{" "}
              </span>
              {this.props.installationRequestReschedule.value.date}
            </div>
          )}
        {this.props.installationRequestClosed &&
          this.props.installationRequestClosed.value.status === "Completed" && (
            <div className={styles.commonTitle}>
              <span className={styles.ffsemibold}>
                Installation Closed On:{" "}
              </span>
              {this.props.installationRequestClosed.value.date}
            </div>
          )}
        {this.props.estimatedCompletionDate &&
          !this.props.hideEstimatedInstallationDate && (
            <div className={styles.deliveryDate}>
              Estimated Installation Date by:{" "}
              <span className={styles.estimatedDate}>
                {this.props.estimatedCompletionDate}
              </span>
            </div>
          )}
        {this.props.isGiveAway === "N" &&
          this.props.consignmentStatus &&
          this.props.consignmentStatus.includes("CANCEL") &&
          !shipmentStatus.includes("Estimated Delivery Date") &&
          date && (
            <div className={styles.commonTitle}>
              <span className={styles.ffsemibold}>{shipmentStatus}</span>
            </div>
          )}
        {this.props.isGiveAway === "N" &&
          this.props.consignmentStatus &&
          !this.props.consignmentStatus.includes("CANCEL") &&
          date && (
            <div className={styles.commonTitle}>
              {!this.props.calloutMessage ? (
                <React.Fragment>
                  {!this.props.isDigitalProduct &&
                    estimatedDeliveryDateFormatted &&
                    !checkStatus &&
                    (date || returnEligibleDate) && (
                      <React.Fragment>
                        <span className={styles.ffsemibold}>
                          {shipmentStatus &&
                          shipmentStatus.includes("Eligible for Return till") &&
                          !this.props.deliveryDate
                            ? ""
                            : this.props.clickAndCollect === true &&
                              !shipmentStatus.includes(
                                "Order Could be collected by"
                              )
                              ? "Pickup Date:"
                              : responseCode !== "REFUND_INITIATED"
                                ? `${
                                    shipmentStatus ? shipmentStatus + ":" : ""
                                  }`
                                : null}{" "}
                        </span>
                        {shipmentStatus.includes(EDD_TEXT) &&
                        estimatedDeliveryDateFormatted ? (
                          <span className={styles.styleDate}>
                            {estimatedDeliveryDateFormatted}
                          </span>
                        ) : null}
                        {shipmentStatus &&
                          shipmentStatus.includes(
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
                  {!this.props.isDigitalProduct &&
                    !estimatedDeliveryDateFormatted &&
                    !checkStatus &&
                    (date || returnEligibleDate) && (
                      <React.Fragment>
                        <span className={styles.ffsemibold}>
                          {shipmentStatus &&
                          shipmentStatus.includes("Eligible for Return till") &&
                          !this.props.deliveryDate
                            ? ""
                            : shipmentStatus}{" "}
                        </span>
                        {shipmentStatus &&
                          shipmentStatus.includes(
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
                <React.Fragment>
                  {!this.props.calloutMessage.includes(EDD_TEXT) && (
                    <div className={styles.commonTitle}>
                      {this.props.calloutMessage}
                    </div>
                  )}
                </React.Fragment>
              )}
            </div>
          )}
        {this.props.itemBreachMessage && (
          <div className={styles.breachMessage}>
            * {this.props.itemBreachMessage}
          </div>
        )}
        {this.props.sellerName && (
          <div className={styles.sellerName}>
            Sold By : {this.props.sellerName}
          </div>
        )}
        {this.props.sshipLPUrl && (
          <div
            ref="copyThisLink"
            onClick={event => this.copyToClipBoard(event)}
          >
            {this.props.sshipLPUrl}
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
