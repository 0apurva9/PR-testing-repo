import React from "react";
import styles from "./BeautyIconWithHeader.css";
import PropTypes from "prop-types";
import UnderLinedButton from "../../../../../general/components/UnderLinedButton";
import {
    EXPRESS,
    COLLECT,
    HOME_DELIVERY,
    SHORT_EXPRESS,
    SAME_DAY_DELIVERY,
    SHORT_SAME_DAY_DELIVERY,
} from "../../../../../lib/constants";
import OrderCountdown from "../../../../../general/components/OrderCountdown";
import format from "date-fns/format";
export default class BeautyIconWithHeader extends React.Component {
    getDateMonthFormate(date, month) {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
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
        date = dateWithMonth.getDate();
        month = dateWithMonth.getMonth();
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
                    if (val.type === "CNC") {
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
        if (this.props.selectedDeliveryMode === COLLECT) {
            let getClickAndPiqSelectedSlaveId =
                this.props && this.props.selectedStoreDetails && this.props.selectedStoreDetails.slaveId;
            let getCNCProduct =
                this.props &&
                this.props.deliveryInformationWithDate &&
                this.props.deliveryInformationWithDate.find(val => {
                    return val.type === "CNC";
                });
            getClickAndPiqSelectedDate = getCNCProduct.CNCServiceableSlavesData.find(cncDetails => {
                return cncDetails.storeId === getClickAndPiqSelectedSlaveId;
            });
            productDayFormatOfClqAndPiq = format(
                getClickAndPiqSelectedDate && getClickAndPiqSelectedDate.pickupDate,
                "DD-MMM-YYYY"
            );
        }
        /*     let classForSplit = styles.labelHolder;
    if (this.props.splitIntoTwoLine) {
      if (this.props.type === QUIQPIQ) {
        classForSplit = styles.autoLabelHolderQuiqPiq;
      } else {
        classForSplit = styles.autoLabelHolder;
      }
    } */
        let styleInSameLine = styles.span;
        if (this.props.splitIntoTwoLine) {
            styleInSameLine = styles.spanInSameLine;
        }

        return (
            <React.Fragment>
                <div
                    className={styles["pin-delivery-icon"]}
                    style={{ backgroundImage: `url(${this.props.image})` }}
                ></div>
                <div
                    id={`${this.props.dateFormatted} ${this.props.dateFormattedText}`}
                    className={[styles["ship-date-txt"], this.props.isCod ? styles.cashOnDelTxt : ""].join(" ")}
                    style={{
                        fontFamily: this.props.fontFamily,
                        fontSize: this.props.fontSize,
                    }}
                >
                    {this.props.isTop && (
                        <React.Fragment>
                            {" "}
                            <span>{this.props.dateFormattedText}</span> <span>{this.props.dateFormatted}</span>
                            {this.props.header && <span className={styles.deliveyCharge}>{this.props.header}</span>}
                        </React.Fragment>
                    )}
                    {this.props.placedTime &&
                        this.props.code !== SAME_DAY_DELIVERY &&
                        this.props.code !== SHORT_SAME_DAY_DELIVERY &&
                        this.props.code !== EXPRESS &&
                        this.props.code !== SHORT_EXPRESS && (
                            <div className={this.props.isHomeDelivery ? styles.spanBlock : styles.span}>
                                {this.props.deliveryInformationByCart && !this.props.inCartPage && (
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
                    {(this.props.code === SAME_DAY_DELIVERY || this.props.code === SHORT_SAME_DAY_DELIVERY) &&
                        (this.props.inCartPage ? (
                            <div className={this.props.isHomeDelivery ? styles.spanBlock : styles.cartPageData}>
                                Today
                                <OrderCountdown cutOffTime="14:00" />
                            </div>
                        ) : (
                            <div className={this.props.isHomeDelivery ? styles.spanBlock : styleInSameLine}>
                                {this.props.deliveryInformationByCart && (
                                    <span className={styles.titleAboutTime}>Delivery By </span>
                                )}
                                Today
                                <OrderCountdown cutOffTime="14:00" />
                            </div>
                        ))}

                    {(this.props.code === EXPRESS || this.props.code === SHORT_EXPRESS) &&
                        (this.props.inCartPage ? (
                            <div className={this.props.isHomeDelivery ? styles.spanBlock : styles.cartPageData}>
                                Tomorrow
                                <OrderCountdown cutOffTime="14:00" />
                            </div>
                        ) : (
                            <div className={this.props.isHomeDelivery ? styles.spanBlock : styleInSameLine}>
                                {this.props.deliveryInformationByCart && (
                                    <span className={styles.titleAboutTime}>Delivery By </span>
                                )}
                                Tomorrow
                                <OrderCountdown cutOffTime="14:00" />
                            </div>
                        ))}

                    {!this.props.isTop && (
                        <span className={this.props.inCartPage ? styles.classLight : ""}>
                            {this.props.deliveryModes === "Express delivery" ? "Express Delivery" : this.props.header}
                        </span>
                    )}
                    {this.props.placedTimeForCod && (
                        <div className={styles.spanBlock}>{this.props.placedTimeForCod}</div>
                    )}
                    {this.props.selectedDeliveryMode !== COLLECT &&
                        this.props.isShowCliqAndPiqUnderLineText &&
                        !this.props.isNotUnderLineButton && (
                            <span className={this.props.isHomeDelivery ? styles.spanBlock : styles.span}>
                                <span
                                    className={styles.storeCount}
                                    onClick={() => this.props.onPiq()}
                                    id="checkForPickUpOpt"
                                >
                                    {this.props.numberOfStore}
                                </span>
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
                                    {getClickAndPiqSelectedDate && getClickAndPiqSelectedDate.pickupDate
                                        ? dayFormat === productDayFormatOfClqAndPiq && !this.props.notShowDay
                                            ? `, Today , ${this.getDayNumberSuffix(
                                                  getClickAndPiqSelectedDate.pickupDate
                                              )}`
                                            : nextDayFormat === productDayFormatOfClqAndPiq && !this.props.notShowDay
                                            ? `, Tomorrow , ${this.getDayNumberSuffix(
                                                  getClickAndPiqSelectedDate.pickupDate
                                              )}`
                                            : `, ${this.getDayNumberSuffix(getClickAndPiqSelectedDate.pickupDate)}`
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
                    {this.props.isShowCliqAndPiqUnderLineText && this.props.isNotUnderLineButton && (
                        <span id="checkForPickUpOpt" className={styles.storeClass} onClick={() => this.props.onPiq()}>
                            {" "}
                            {this.props.numberOfStore}
                        </span>
                    )}
                </div>
                {this.props.children}
            </React.Fragment>
        );
    }
}
BeautyIconWithHeader.propTypes = {
    image: PropTypes.string,
    text: PropTypes.string,
    isHomeDelivery: PropTypes.bool,
    isTop: PropTypes.bool,
    isNotUnderLineButton: PropTypes.bool,
    notShowDay: PropTypes.bool,
    splitIntoTwoLine: PropTypes.bool,
    inCartPage: PropTypes.bool,
    deliveryInformationWithDate: PropTypes.array,
    code: PropTypes.string,
    placedTime: PropTypes.string,
    selectedDeliveryMode: PropTypes.string,
    selectedStoreDetails: PropTypes.object,
    type: PropTypes.string,
    dateFormatted: PropTypes.string,
    dateFormattedText: PropTypes.string,
    isCod: PropTypes.bool,
    fontFamily: PropTypes.string,
    fontSize: PropTypes.number,
    header: PropTypes.string,
    deliveryInformationByCart: PropTypes.bool,
    deliveryModes: PropTypes.string,
    placedTimeForCod: PropTypes.string,
    isShowCliqAndPiqUnderLineText: PropTypes.bool,
    onPiq: PropTypes.func,
    numberOfStore: PropTypes.number,
    children: PropTypes.node,
};
BeautyIconWithHeader.defaultProps = {
    isHomeDelivery: false,
    deliveryInformationByCart: false,
    isTop: true,
    isNotUnderLineButton: false,
    notShowDay: false,
    splitIntoTwoLine: true,
    inCartPage: false,
};
