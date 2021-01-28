import React from "react";
import PropTypes from "prop-types";
import UnderLinedButton from "../../general/components/UnderLinedButton.js";
import Image from "../../xelpmoc-core/Image";
import checkIcon from "./img/check.svg";
import styles from "./GetLocationDetails.css";
import format from "date-fns/format";
export default class GetLocationDetails extends React.Component {
    handleClick() {
        if (this.props.changeLocation) {
            this.props.changeLocation();
        }
    }

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
        const integerDayMapping = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
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
        switch (date) {
            case 1:
            case 21:
            case 31:
                return "" + date + "st " + format(d, "MMM");
            case 2:
            case 22:
                return "" + date + "nd " + format(d, "MMM");
            case 3:
            case 23:
                return "" + date + "rd " + format(d, "MMM");
            default:
                return "" + date + "th " + format(d, "MMM");
        }
    }

    render() {
        let selectedPickUpDateObject = "";
        let validDeliveryModeByPinCodeResponse = "";
        if (this.props.isFromCheckOut) {
            validDeliveryModeByPinCodeResponse = this.props.pincodeDetails;
        } else {
            validDeliveryModeByPinCodeResponse =
                this.props && this.props.pincodeDetails && this.props.pincodeDetails.validDeliveryModes;
        }
        let cncDetailsList =
            validDeliveryModeByPinCodeResponse &&
            validDeliveryModeByPinCodeResponse.find(val => {
                return val.type === "CNC";
            });
        if (cncDetailsList && cncDetailsList.CNCServiceableSlavesData) {
            selectedPickUpDateObject = cncDetailsList;
        }
        let day = new Date();
        let dayFormat = format(day, "DD-MMM-YYYY");
        let nextWithOutFormatDay = day.setDate(day.getDate() + 1);
        let nextDay = new Date(nextWithOutFormatDay);
        let nextDayFormat = format(nextDay, "DD-MMM-YYYY");
        let productDayFormat = format(selectedPickUpDateObject && selectedPickUpDateObject.deliveryDate, "DD-MMM-YYYY");
        var date = new Date(selectedPickUpDateObject && selectedPickUpDateObject.deliveryDate.replace(/-/g, "/"));
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var salutationOfTime = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? "0" + minutes : minutes;
        var strTime = hours + ":" + minutes + " " + salutationOfTime;
        let openingTime = "";
        let closingTime = "";
        if (this.props.openingTime) {
            const openingHour = parseInt(this.props.openingTime.split(":")[0], 10);
            const openingMinute = parseInt(this.props.openingTime.split(":")[1], 10);
            openingTime = this.hoursToMeridiem(openingHour, openingMinute);
        }
        if (this.props.closingTime) {
            const closingHour = parseInt(this.props.closingTime.split(":")[0], 10);
            const closingMinute = parseInt(this.props.closingTime.split(":")[1], 10);
            closingTime = this.hoursToMeridiem(closingHour, closingMinute);
        }

        let formattedDeliveryDate = null;
        if (selectedPickUpDateObject && selectedPickUpDateObject.deliveryDate) {
            //converting "MM-DD-YYYY HH:MM:SS"(API value) to "MM/DD/YYYY" for cross browser support
            // JS date object does'nt support "MM-DD-YYYY HH:MM:SS" format in safari, mozilla and IE
            let dateArray = selectedPickUpDateObject.deliveryDate.split(" ")[0].split("-");
            formattedDeliveryDate = `${dateArray[0]}/${dateArray[1]}/${dateArray[2]}`;
        }

        return (
            <div className={styles.base}>
                <div className={styles.address}>
                    <div className={styles.headerTextHolder}>{this.props.headingText}</div>
                    <div className={styles.subText}>{this.props.address}</div>
                    <div className={styles.buttonHolder}>
                        <UnderLinedButton
                            size="13px"
                            fontFamily="regular"
                            color="#ff1744"
                            label="Change"
                            onClick={() => this.handleClick()}
                        />
                    </div>
                    <div className={styles.checkIconHolder}>
                        <Image image={checkIcon} fit="cover" />
                    </div>
                </div>
                <div className={styles.openingTime}>
                    <div className={styles.labelHolderForPopUp}>
                        <span className={styles.label}>Store Timings :</span>
                    </div>
                    <div className={styles.dataHolderForPoUp}>
                        {(openingTime || closingTime) && (
                            <div className={styles.timeHolder}>
                                <span className={styles.timeSpan}>{openingTime}</span> -{" "}
                                <span className={styles.timeSpan}>{closingTime}</span>
                            </div>
                        )}
                    </div>
                </div>
                {this.dateConverter(this.props.workingDays) && (
                    <div className={styles.pickUpDay}>
                        <span className={styles.closedOnLabel}>Closed on </span>
                        {this.dateConverter(this.props.workingDays).map((val, i) => {
                            return `${val}${7 - this.props.workingDays.split(",").length - 1 !== i ? "," : ""} `;
                        })}
                    </div>
                )}
                <div className={styles.openingTime}>
                    <span className={styles.label}>Pick up by:</span>
                    <span className={styles.dateSpan}>
                        {selectedPickUpDateObject && selectedPickUpDateObject.deliveryDate ? (
                            dayFormat === productDayFormat ? (
                                <span>
                                    <span className={styles.dayBold}>Today,</span>{" "}
                                    {this.getDayNumberSuffix(formattedDeliveryDate)}
                                </span>
                            ) : nextDayFormat === productDayFormat ? (
                                <span>
                                    <span className={styles.dayBold}>Tomorrow,</span>{" "}
                                    {this.getDayNumberSuffix(formattedDeliveryDate)}
                                </span>
                            ) : (
                                this.getDayNumberSuffix(formattedDeliveryDate)
                            )
                        ) : (
                            ""
                        )}
                        {strTime && hours !== 0 && <span className={styles.timeForPickUp}>{`, after ${strTime}`}</span>}
                    </span>
                </div>
            </div>
        );
    }
}
GetLocationDetails.propTypes = {
    headingText: PropTypes.string,
    address: PropTypes.string,
    pickUpKey: PropTypes.string,
    pickUpValue: PropTypes.string,
    changeLocation: PropTypes.func,
    isFromCheckOut: PropTypes.bool,
    pincodeDetails: PropTypes.object,
    openingTime: PropTypes.string,
    closingTime: PropTypes.string,
    workingDays: PropTypes.string,
};
