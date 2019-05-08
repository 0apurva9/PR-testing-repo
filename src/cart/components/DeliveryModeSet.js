import React from "react";
import PropTypes from "prop-types";
import DeliveryCard from "./DeliveryCard.js";
import styles from "./DeliveryModeSet.css";
import { COLLECT, SAME_DAY_DELIVERY_SHIPPING, YES } from "../../lib/constants";
import format from "date-fns/format";
export default class DeliveryModeSet extends React.Component {
  handleClick() {
    if (this.props.changeDeliveryModes) {
      this.props.changeDeliveryModes();
    }
  }
  getDayNumberSuffix(selectedDeliveryModes, USSID) {
    if (selectedDeliveryModes === SAME_DAY_DELIVERY_SHIPPING) {
      return `Today`;
    }
    if (selectedDeliveryModes === "Express Delivery") {
      return `Tomorrow`;
    }
    let placedTime = "";
    let currentProduct =
      this.props &&
      this.props.productDelivery &&
      this.props.productDelivery.find(val => {
        return val.USSID === USSID;
      });
    placedTime =
      currentProduct &&
      currentProduct.pinCodeResponse &&
      currentProduct.pinCodeResponse.validDeliveryModes &&
      currentProduct.pinCodeResponse.validDeliveryModes.find(val => {
        if (val.code === "CNC") {
          return selectedDeliveryModes === COLLECT;
        } else if (val.type === "HD") {
          return selectedDeliveryModes === "Home Delivery";
        } else if (val.type === "SDD") {
          return selectedDeliveryModes === SAME_DAY_DELIVERY_SHIPPING;
        } else if (val.type === "ED") {
          return selectedDeliveryModes === "Express Delivery";
        }
      });
    let day = new Date();
    let dayFormat = format(day, "DD-MMM-YYYY");
    let nextWithOutFormatDay = day.setDate(day.getDate() + 1);
    let nextDay = new Date(nextWithOutFormatDay);
    let nextDayFormat = format(nextDay, "DD-MMM-YYYY");
    let productDayFormat = format(
      placedTime && placedTime.deliveryDate,
      "DD-MMM-YYYY"
    );
    let dateWithMonth = new Date(placedTime && placedTime.deliveryDate);
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
    let dayBehavior =
      dayFormat === productDayFormat
        ? `Today ,`
        : nextDayFormat === productDayFormat
          ? `Tomorrow ,`
          : "";
    switch (date) {
      case 1:
      case 21:
      case 31:
        return "" + dayBehavior + date + "st " + monthNames[month];
      case 2:
      case 22:
        return "" + dayBehavior + date + "nd " + monthNames[month];
      case 3:
      case 23:
        return "" + dayBehavior + date + "rd " + monthNames[month];
      default:
        return "" + dayBehavior + date + "th " + monthNames[month];
    }
  }
  render() {
    return (
      <DeliveryCard
        onClick={() => this.handleClick()}
        confirmTitle="Delivery Mode"
        indexNumber="2"
        completed={true}
      >
        {this.props.productDelivery &&
          this.props.productDelivery.map((data, i) => {
            if (data.isGiveAway === YES) {
              return <div />;
            }
            const selectedDeliveryModes = this.props.selectedDeliveryDetails[
              data.USSID
            ];
            const deliveryOption =
              data &&
              data.elligibleDeliveryMode &&
              data.elligibleDeliveryMode.find(mode => {
                return mode.code === selectedDeliveryModes;
              });
            let expectedDeliveryDate =
              deliveryOption && deliveryOption.desc
                ? `:${deliveryOption.desc}`
                : "";

            let textForCollect;
            if (deliveryOption.code === COLLECT) {
              textForCollect =
                data.storeDetails &&
                `Pickup Store: ${
                  data.storeDetails.displayName
                    ? data.storeDetails.displayName
                    : ""
                } ${
                  data.storeDetails.address && data.storeDetails.address.city
                    ? data.storeDetails.address.city
                    : ""
                }`;
            }
            return (
              <div className={styles.base} key={i}>
                <div className={styles.productName}>{data.productName}</div>
                <div className={styles.deliveryWay}>
                  {deliveryOption &&
                    `${
                      deliveryOption.name === "Home Delivery"
                        ? "Standard Shipping"
                        : deliveryOption.name === "Express Delivery"
                          ? "Express Delivery"
                          : deliveryOption.name
                    } ${
                      deliveryOption.code === COLLECT
                        ? textForCollect
                          ? textForCollect
                          : ""
                        : this.props.isShowDate
                          ? ` : ${this.getDayNumberSuffix(
                              deliveryOption.name,
                              data.USSID
                            )}`
                          : expectedDeliveryDate
                            ? expectedDeliveryDate
                            : ""
                    }`}
                </div>
              </div>
            );
          })}
      </DeliveryCard>
    );
  }
}
DeliveryModeSet.propTypes = {
  productDelivery: PropTypes.arrayOf(
    PropTypes.shape({
      productName: PropTypes.string,
      deliveryWay: PropTypes.string
    })
  ),
  onClick: PropTypes.func
};
