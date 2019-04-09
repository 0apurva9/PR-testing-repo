import React from "react";
import styles from "./IconWithHeader.css";
import Icon from "../../xelpmoc-core/Icon";
import PropTypes from "prop-types";
import UnderLinedButton from "./UnderLinedButton";
import VisibilityChild from "../../home/components/VisibilityChild";
import {
  EXPRESS,
  COLLECT,
  HOME_DELIVERY,
  SHORT_EXPRESS,
  SAME_DAY_DELIVERY,
  SELECTED_DELIVERY_MODE,
  SHORT_SAME_DAY_DELIVERY
} from "../../lib/constants";
import format from "date-fns/format";
export default class IconWithHeader extends React.Component {
  getDateMonthFormate(date, month) {
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
  getDayNumberSuffix(d) {
    let dateWithMonth = "";
    let date = "";
    let month = "";
    dateWithMonth = new Date(d);
    date = dateWithMonth.getUTCDate();
    month = dateWithMonth.getUTCMonth();
    return this.getDateMonthFormate(date, month);
  }
  render() {
    let placedTime = "";
    let getClickAndPiqSelectedDate = "";
    let productDayFormatOfClqAndPiq = "";
    if (this.props.deliveryInformationWithDate) {
      placedTime =
        this.props &&
        this.props.deliveryInformationWithDate &&
        this.props.deliveryInformationWithDate.find(val => {
          if (val.code === "CNC") {
            return this.props.code === COLLECT;
          } else if (val.type === "HD") {
            return this.props.code === HOME_DELIVERY;
          } else if (val.type === "SDD") {
            return this.props.code === SAME_DAY_DELIVERY;
          } else if (val.type === "ED") {
            return this.props.code === EXPRESS;
          }
        });
    } else {
      placedTime = this.props.placedTime;
    }
    let day = new Date();
    let dayFormat = format(day, "DD-MMM-YYYY");
    let nextWithOutFormatDay = day.setDate(day.getDate() + 1);
    let nextDay = new Date(nextWithOutFormatDay);
    let nextDayFormat = format(nextDay, "DD-MMM-YYYY");
    let productDayFormat = format(
      placedTime && placedTime.deliveryDate,
      "DD-MMM-YYYY"
    );
    if (this.props.selectedDeliveryMode === COLLECT) {
      let getClickAndPiqSelectedSlaveId =
        this.props &&
        this.props.selectedStoreDetails &&
        this.props.selectedStoreDetails.slaveId;
      let getCNCProduct =
        this.props &&
        this.props.deliveryInformationWithDate &&
        this.props.deliveryInformationWithDate.find(val => {
          return val.type === "CNC";
        });
      getClickAndPiqSelectedDate = getCNCProduct.CNCServiceableSlavesData.find(
        cncDetails => {
          return cncDetails.storeId === getClickAndPiqSelectedSlaveId;
        }
      );
      productDayFormatOfClqAndPiq = format(
        getClickAndPiqSelectedDate && getClickAndPiqSelectedDate.pickupDate,
        "DD-MMM-YYYY"
      );
    }

    return (
      <div
        className={styles.base}
        style={{ marginBottom: this.props.marginBottom }}
      >
        <div className={styles.iconHolder}>
          <Icon
            image={this.props.image}
            size={this.props.iconSize ? this.props.iconSize : 30}
          />
        </div>
        <div
          id={this.props.header}
          className={styles.textHolder}
          style={{
            fontFamily: this.props.fontFamily,
            fontSize: this.props.fontSize
          }}
        >
          {this.props.isTop && (
            <div className={styles.labelHolder}> {this.props.header}</div>
          )}
          {this.props.placedTime &&
            this.props.code !== SAME_DAY_DELIVERY &&
            this.props.code !== SHORT_SAME_DAY_DELIVERY &&
            this.props.code !== EXPRESS &&
            this.props.code !== SHORT_EXPRESS && (
              <div
                className={
                  this.props.isHomeDelivery ? styles.spanBlock : styles.span
                }
              >
                {this.props.deliveryInformationByCart && (
                  <span className={styles.titleAboutTime}>Delivery By </span>
                )}
                {!this.props.deliveryInformationByCart &&
                  this.props.placedTime &&
                  this.props.placedTime.deliveryDate &&
                  this.getDayNumberSuffix(this.props.placedTime.deliveryDate)}
                {this.props.deliveryInformationByCart &&
                  placedTime &&
                  placedTime.deliveryDate &&
                  this.getDayNumberSuffix(placedTime.deliveryDate)}
              </div>
            )}
          {(this.props.code === SAME_DAY_DELIVERY ||
            this.props.code === SHORT_SAME_DAY_DELIVERY) && (
            <div
              className={
                this.props.isHomeDelivery ? styles.spanBlock : styles.span
              }
            >
              {this.props.deliveryInformationByCart && (
                <span className={styles.titleAboutTime}>Delivery By </span>
              )}
              Today
            </div>
          )}
          {(this.props.code === EXPRESS ||
            this.props.code === SHORT_EXPRESS) && (
            <div
              className={
                this.props.isHomeDelivery ? styles.spanBlock : styles.span
              }
            >
              {this.props.deliveryInformationByCart && (
                <span className={styles.titleAboutTime}>Delivery By </span>
              )}
              Tomorrow
            </div>
          )}
          {!this.props.isTop && (
            <span>
              {this.props.deliveryModes === "Express delivery"
                ? "Express Delivery"
                : this.props.header}
            </span>
          )}
          {this.props.placedTimeForCod && (
            <div className={styles.spanBlock}>
              {this.props.placedTimeForCod}
            </div>
          )}
          {this.props.selectedDeliveryMode !== COLLECT &&
            this.props.isShowCliqAndPiqUnderLineText &&
            !this.props.isNotUnderLineButton && (
              <span
                className={
                  this.props.isHomeDelivery ? styles.spanBlock : styles.span
                }
              >
                <UnderLinedButton
                  id="checkForPickUpOpt"
                  size="14px"
                  fontFamily="light"
                  color="#ff1744"
                  label={this.props.numberOfStore}
                  onClick={() => this.props.onPiq()}
                />
              </span>
            )}
          {this.props.isShowCliqAndPiqUnderLineText &&
            !this.props.isNotUnderLineButton &&
            this.props.selectedDeliveryMode === COLLECT && (
              <React.Fragment>
                <div className={styles.storeDetails}>
                  <span>
                    {this.props &&
                      this.props.selectedStoreDetails &&
                      this.props.selectedStoreDetails.returnAddress1}
                  </span>{" "}
                  <span>
                    {this.props &&
                      this.props.selectedStoreDetails &&
                      this.props.selectedStoreDetails.returnAddress2}
                  </span>
                  {getClickAndPiqSelectedDate &&
                  getClickAndPiqSelectedDate.pickupDate
                    ? dayFormat === productDayFormatOfClqAndPiq &&
                      !this.props.notShowDay
                      ? `, Today , ${this.getDayNumberSuffix(
                          getClickAndPiqSelectedDate.pickupDate
                        )}`
                      : nextDayFormat === productDayFormatOfClqAndPiq &&
                        !this.props.notShowDay
                        ? `, Tomorrow , ${this.getDayNumberSuffix(
                            getClickAndPiqSelectedDate.pickupDate
                          )}`
                        : `, ${this.getDayNumberSuffix(
                            getClickAndPiqSelectedDate.pickupDate
                          )}`
                    : ""}
                </div>
                <div className={styles.changeButtonHolder}>
                  <UnderLinedButton
                    size="13px"
                    fontFamily="semibold"
                    color="#ff1744"
                    label={"Change"}
                    onClick={() => this.props.onPiq()}
                  />
                </div>
              </React.Fragment>
            )}
          {this.props.isShowCliqAndPiqUnderLineText &&
            this.props.isNotUnderLineButton && (
              <span
                id="checkForPickUpOpt"
                className={styles.storeClass}
                onClick={() => this.props.onPiq()}
              >
                {" "}
                {this.props.numberOfStore}
              </span>
            )}
        </div>
        {this.props.children}
      </div>
    );
  }
}
IconWithHeader.propTypes = {
  image: PropTypes.string,
  text: PropTypes.string,
  isHomeDelivery: PropTypes.bool,
  isTop: PropTypes.bool,
  isNotUnderLineButton: PropTypes.bool,
  notShowDay: PropTypes.bool
};
IconWithHeader.defaultProps = {
  isHomeDelivery: false,
  deliveryInformationByCart: false,
  isTop: true,
  isNotUnderLineButton: false,
  notShowDay: false
};
