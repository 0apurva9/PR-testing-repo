import React from "react";
import PropTypes from "prop-types";
import ProductImage from "../../general/components/ProductImage.js";
import styles from "./OrderSucessCard.css";
import AppliancesExchangeCheckout from "./AppliancesExchangeCheckout";
const EDD_TEXT = "Estimated Delivery Date";

export default class OrderSucessCard extends React.Component {
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
    let estimatedDeliveryDateFormatted = "";
    const deliveryOption = this.props.selectedDeliveryMode;
    if (this.props.edd && !this.props.edd.includes("DeliveryTAT not found")) {
      estimatedDeliveryDateFormatted = this.getDayNumberSuffix(this.props.edd);
    }
    if (!estimatedDeliveryDateFormatted && deliveryOption) {
      estimatedDeliveryDateFormatted = deliveryOption.desc;
    }

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
              <div
                className={styles.productPrice}
              >{`₹ ${this.props.price}`}</div>
            </div>
            <div
              className={styles.quantity}
            >{`Quantity: ${this.props.quantity}`}</div>
          </div>
          <div className={styles.deliveryTimingShow}>
            <div className={styles.timingAndMode}>
              {estimatedDeliveryDateFormatted &&
                this.props.productName !== "Gift Card" && (
                  <React.Fragment>
                    <div className={styles.deliveyMode}>{EDD_TEXT}</div>
                    <div className={styles.deliveryTime}>
                      {estimatedDeliveryDateFormatted}
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
          {this.props.exchangeDetails && (
            <div>
              <div className={styles.exchangeProductName}>
                <span>Exchange Product: </span>
                <span>{this.props.exchangeDetails.exchangeModelName}</span>
              </div>
              {this.props.exchangeDetails.exchangePriceDetail && (
                <React.Fragment>
                  <div className={styles.exchangeCashback}>
                    <span>Total Exchange Cashback: </span>
                    <span>
                      {this.props.exchangeDetails.exchangePriceDetail
                        .totalExchangeCashback &&
                        this.props.exchangeDetails.exchangePriceDetail
                          .totalExchangeCashback.formattedValueNoDecimal}
                    </span>
                  </div>
                  <div className={styles.exchangePickup}>
                    <span>Pick up: Within 3 days of product delivery</span>
                    <span className={styles.spacer}>|</span>
                    {this.props.exchangeDetails.exchangePriceDetail
                      .pickupCharge &&
                    this.props.exchangeDetails.exchangePriceDetail.pickupCharge
                      .doubleValue === 0 ? (
                      <span className={styles.freePickup}>FREE</span>
                    ) : (
                      <span>
                        {
                          this.props.exchangeDetails.exchangePriceDetail
                            .pickupCharge.formattedValueNoDecimal
                        }
                      </span>
                    )}
                  </div>
                </React.Fragment>
              )}
            </div>
          )}
          <div className={styles.AppliancesExchangeDetails}>
            <AppliancesExchangeCheckout productUssid={this.props.ussid} />
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
