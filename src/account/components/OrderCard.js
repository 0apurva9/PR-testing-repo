import React from "react";
import PropTypes from "prop-types";
import ProductImage from "../../general/components/ProductImage.js";
import CheckBox from "../../general/components/CheckBox.js";
import styles from "./OrderCard.css";
import {
  RUPEE_SYMBOL,
  NO,
  SAME_DAY_DELIVERY,
  HOME_DELIVERY,
  STANDARD_SHIPPING,
  EXPRESS,
  COLLECT,
  EXPRESS_SHIPPING,
  SAME_DAY_DELIVERY_SHIPPING
} from "../../lib/constants";
import * as NumberFormatter from "../../lib/NumberFormatter.js";
import DesktopOnly from "../../general/components/DesktopOnly";
import MobileOnly from "../../general/components/MobileOnly";
import format from "date-fns/format";
const dateFormat = "DD MMM YYYY";
export default class OrderCard extends React.Component {
  hoursToMeridiem = (hour, minute) => {
    const min = minute === 0 ? "00" : minute.toString();
    if (hour > 12) {
      return `${hour - 12}:${min}PM`;
    }
    if (hour === 0) {
      return `${12}:${min}AM`;
    }
    if (hour === 12) {
      return `${12}:${min}PM`;
    }
    if (hour < 12) {
      return `${hour}:${min}AM`;
    }
  };
  dateConverter(day) {
    const integerDayMapping = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let closedDays = [];
    const dayNumbers = day.split(",");
    if (dayNumbers.length === 7) {
      closedDays = null;
    } else {
      closedDays = integerDayMapping.filter((val, i) => {
        return !dayNumbers.includes(i.toString());
      });
    }
    return closedDays;
  }
  getDayNumberSuffix(d) {
    let dateWithMonth = new Date(d);
    let date = dateWithMonth.getDate();
    let month = dateWithMonth.getMonth();
    let year = dateWithMonth.getFullYear();
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
    switch (date) {
      case 1:
      case 21:
      case 31:
        return "" + date + "st " + monthNames[month] + " " + year;
      case 2:
      case 22:
        return "" + date + "nd " + monthNames[month] + " " + year;
      case 3:
      case 23:
        return "" + date + "rd " + monthNames[month] + " " + year;
      default:
        return "" + date + "th " + monthNames[month] + " " + year;
    }
  }
  getDayNumberSuffixWithOutYear(d) {
    let dateWithMonth = new Date(d);
    let date = dateWithMonth.getDate();
    let month = dateWithMonth.getMonth();
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
    switch (date) {
      case 1:
      case 21:
      case 31:
        return "" + date + "st " + monthNames[month];
      case 2:
      case 22:
        return "" + date + "nd " + monthNames[month];
      case 3:
      case 23:
        return "" + date + "rd " + monthNames[month];
      default:
        return "" + date + "th " + monthNames[month];
    }
  }
  displayDeliveryText(status) {
    switch (status) {
      case HOME_DELIVERY:
        return STANDARD_SHIPPING;
      case "Home Delivery":
        return STANDARD_SHIPPING;
      case EXPRESS:
        return EXPRESS_SHIPPING;
      case "Express Delivery":
        return EXPRESS_SHIPPING;
      case COLLECT:
        return "QUiQ";
      case "Click and Collect":
        return "QUiQ";
      case SAME_DAY_DELIVERY:
        return SAME_DAY_DELIVERY_SHIPPING;
      case "Same Day Delivery":
        return SAME_DAY_DELIVERY_SHIPPING;
      default:
        return false;
    }
  }
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
  onClickCncToHd() {
    if (this.props.onClickCncToHd) {
      this.props.onClickCncToHd();
    }
  }
  render() {
    let strTime = "";
    let openingTime = "";
    let closingTime = "";

    if (this.props.selectedDeliveryMode === COLLECT) {
      var date = new Date(format(this.props.estimatedDeliveryDateWithTime));
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var salutationOfTime = hours >= 12 ? "pm" : "am";
      hours = hours % 12;
      hours = hours ? hours : 0;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      strTime = hours + ":" + minutes + " " + salutationOfTime;
    }
    if (this.props.storeDetails && this.props.storeDetails.mplOpeningTime) {
      const openingHour = parseInt(
        this.props.storeDetails.mplOpeningTime.split(":")[0],
        10
      );
      const openingMinute = parseInt(
        this.props.storeDetails.mplOpeningTime.split(":")[1],
        10
      );
      openingTime = this.hoursToMeridiem(openingHour, openingMinute);
    }
    if (this.props.storeDetails && this.props.storeDetails.mplClosingTime) {
      const closingHour = parseInt(
        this.props.storeDetails.mplClosingTime.split(":")[0],
        10
      );
      const closingMinute = parseInt(
        this.props.storeDetails.mplClosingTime.split(":")[1],
        10
      );
      closingTime = this.hoursToMeridiem(closingHour, closingMinute);
    }
    let isShowEddMessage = false;
    let shippingData =
      this.props.statusDisplayMsg &&
      this.props.statusDisplayMsg.find(val => {
        return val.key === "SHIPPING";
      });
    isShowEddMessage =
      shippingData &&
      shippingData.value &&
      shippingData.value.statusList &&
      shippingData.value.statusList.find(val => {
        if (
          val.responseCode !== "READY_FOR_COLLECTION" ||
          val.responseCode !== "DELIVERED" ||
          val.responseCode !== "ORDER_COLLECTED"
        ) {
          return true;
        } else {
          return false;
        }
      });
    let isShowDeliveryDateByTimeOut = false;
    let paymentData =
      this.props.statusDisplayMsg &&
      this.props.statusDisplayMsg.find(val => {
        return val.key === "PAYMENT";
      });
    isShowDeliveryDateByTimeOut =
      paymentData &&
      paymentData.value &&
      paymentData.value.statusList &&
      paymentData.value.statusList.find(val => {
        if (
          val.responseCode === "PAYMENT_TIMEOUT" ||
          val.responseCode === "PAYMENT_FAILED"
        ) {
          return true;
        } else {
          return false;
        }
      });
    return (
      <div className={this.props.onHollow ? styles.onHollow : styles.base}>
        <DesktopOnly>
          {(this.props.orderPlace || this.props.orderId) &&
            !this.props.isOrderDetails &&
            !this.props.isComingFromAllOrderPage && (
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
                    <span className={styles.orderText}>
                      {this.props.orderId}
                    </span>
                  </div>
                )}
              </div>
            )}
        </DesktopOnly>
        <React.Fragment>
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
                  {this.props.showIsGiveAway && (
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
                <div
                  className={
                    this.props.isComingFromAllOrderPage
                      ? styles.quantityHolderRight
                      : styles.quantityHolder
                  }
                >
                  <div className={styles.price}>Qty</div>
                  <div className={styles.quantity}>
                    {this.props.numberOfQuantity}
                  </div>
                </div>
              )}
              {this.props.isComingFromAllOrderPage && (
                <React.Fragment>
                  {this.props.selectedDeliveryMode && (
                    <div
                      className={
                        styles.deliveryModeHolderByOrderHistoryForOutSide
                      }
                    >
                      <span className={styles.boldText}>Delivery Mode:</span>
                      {`${this.displayDeliveryText(
                        this.props.selectedDeliveryMode
                      )}`}
                    </div>
                  )}
                  {this.props.estimatedDeliveryDate &&
                    this.props.selectedDeliveryMode &&
                    this.props.selectedDeliveryMode !== COLLECT && (
                      <div
                        className={styles.estimatedDeliveryDateByOrderHistory}
                      >
                        <span className={styles.boldText}>
                          {"Estimated Delivery Date:"}
                        </span>{" "}
                        {this.getDayNumberSuffix(
                          this.props.estimatedDeliveryDate
                        )}
                      </div>
                    )}
                  {!this.props.isCNCToHDConverted &&
                    this.props.selectedDeliveryMode === COLLECT &&
                    this.props.isCncToHd && (
                      <div
                        className={styles.changeButtonForOrderHistory}
                        onClick={() => this.onClickCncToHd()}
                      >
                        Change Delivery Mode
                      </div>
                    )}
                </React.Fragment>
              )}
              {this.props.estimatedDeliveryDateWithTime &&
                this.props.selectedDeliveryMode &&
                this.props.selectedDeliveryMode === COLLECT &&
                this.props.isComingFromAllOrderPage && (
                  <div className={styles.estimatedDeliveryDateForHistory}>
                    <span className={styles.boldText}>Pick Up By: </span>{" "}
                    {this.getDayNumberSuffixWithOutYear(
                      format(
                        this.props.estimatedDeliveryDateWithTime,
                        dateFormat
                      )
                    )}
                    {strTime &&
                      hours !== 0 && <span>{` | After ${strTime}`}</span>}
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
        </React.Fragment>
        {this.props.isOrderDetails &&
          this.props.selectedDeliveryMode && (
            <div className={styles.deliveryModeHolder}>
              <div>
                <span className={styles.boldText}>Delivery Mode:</span>
                {`${this.displayDeliveryText(this.props.selectedDeliveryMode)}`}
              </div>
              {!this.props.isCNCToHDConverted &&
                this.props.selectedDeliveryMode === COLLECT &&
                this.props.isCncToHd && (
                  <div
                    className={styles.changeButton}
                    onClick={() => this.onClickCncToHd()}
                  >
                    Change
                  </div>
                )}
            </div>
          )}
        {this.props.estimatedDeliveryDate &&
          !isShowDeliveryDateByTimeOut &&
          this.props.isOrderDetails &&
          this.props.selectedDeliveryMode !== COLLECT &&
          this.props.paymentMethod &&
          this.props.paymentMethod !== undefined && (
            <div className={styles.estimatedDeliveryDate}>
              <span className={styles.boldText}>
                {"Estimated Delivery Date:"}
              </span>{" "}
              {this.getDayNumberSuffix(this.props.estimatedDeliveryDate)}
            </div>
          )}
        {isShowEddMessage &&
          this.props.breechMessage &&
          this.props.breechMessage !== "" &&
          this.props.breechMessage !== null &&
          this.props.breechMessage !== "null" &&
          this.props.isOrderDetails && (
            <div className={styles.eddMessage}>
              * {this.props.breechMessage}
            </div>
          )}
        {this.props.soldBy &&
          this.props.isOrderDetails && (
            <div className={styles.message}>{`Sold by ${
              this.props.soldBy
            }`}</div>
          )}
        {this.props.isOrderDetails &&
          this.props.selectedDeliveryMode === COLLECT && (
            <div className={styles.qPicDetailsHolder}>
              {this.props &&
                this.props.statusDisplay && (
                  <div className={styles.labelHolder}>
                    <div className={styles.label}>Status</div>
                    <div className={styles.semiColon}>:</div>
                    <div className={styles.labelDetails}>
                      {this.props.statusDisplay}
                    </div>
                  </div>
                )}
              {this.props.storeDetails &&
                this.props.storeDetails.address && (
                  <div className={styles.labelHolder}>
                    <div className={styles.label}>Store Details</div>
                    <div className={styles.semiColon}>:</div>
                    <div className={styles.labelDetails}>
                      {` ${
                        this.props.storeDetails.displayName
                          ? this.props.storeDetails.displayName
                          : ""
                      }, ${
                        this.props.storeDetails.returnAddress1
                          ? this.props.storeDetails.returnAddress1
                          : ""
                      }, ${
                        this.props.storeDetails.returnAddress2
                          ? this.props.storeDetails.returnAddress2
                          : ""
                      }, ${
                        this.props.storeDetails.returnCity
                          ? this.props.storeDetails.address.city
                          : ""
                      } ${
                        this.props.storeDetails.returnPin
                          ? this.props.storeDetails.returnPin
                          : ""
                      }`}
                    </div>
                  </div>
                )}
              {this.props &&
                this.props.storeDetails &&
                (this.props.storeDetails.mplClosingTime ||
                  this.props.storeDetails.mplOpeningTime ||
                  this.props.storeDetails.mplWorkingDays) && (
                  <div className={styles.labelHolder}>
                    <div className={styles.label}>Open from</div>
                    <div className={styles.semiColon}>:</div>
                    <div className={styles.labelDetails}>
                      {(openingTime || closingTime) && (
                        <div className={styles.timeSection}>
                          <span>{openingTime}</span>
                          <span className={styles.timeSpan}>-</span>
                          <span>{closingTime}</span>
                        </div>
                      )}
                      {this.dateConverter(
                        this.props.storeDetails.mplWorkingDays
                      ) && (
                        <div className={styles.dayForStore}>
                          <span className={styles.closedOnLabel}>
                            Closed on
                          </span>
                          {this.dateConverter(
                            this.props.storeDetails.mplWorkingDays
                          ).map((val, i) => {
                            return `${val}${
                              7 -
                                this.props.storeDetails.mplWorkingDays.split(
                                  ","
                                ).length -
                                1 !==
                              i
                                ? ","
                                : ""
                            } `;
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              {this.props &&
                this.props.estimatedDeliveryDateWithTime && (
                  <div className={styles.labelHolder}>
                    <div className={styles.label}>Pickup </div>
                    <div className={styles.semiColon}>:</div>
                    <div className={styles.labelDetails}>
                      {this.getDayNumberSuffixWithOutYear(
                        format(
                          this.props.estimatedDeliveryDateWithTime,
                          dateFormat
                        )
                      )}
                      {strTime && <span>{` | After ${strTime}`}</span>}
                    </div>
                  </div>
                )}
              {this.props &&
                this.props.phoneNumber && (
                  <div className={styles.labelHolder}>
                    <div className={styles.label}>Pickup details</div>
                    <div className={styles.semiColon}>:</div>
                    <div className={styles.labelDetails}>
                      {`+91 ${this.props.phoneNumber}`}
                    </div>
                  </div>
                )}
            </div>
          )}
        <div>{this.props.additionalContent}</div>
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
  isCNCToHDConverted: PropTypes.bool,
  isCncToHd: PropTypes.bool
};
OrderCard.defaultProps = {
  quantity: false,
  numberOfQuantity: 1,
  onHollow: false,
  showQuantity: true,
  showIsGiveAway: true,
  isComingFromAllOrderPage: false,
  isOrderDetails: false,
  isCNCToHDConverted: false,
  isCncToHd: false
};
