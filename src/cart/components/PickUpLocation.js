import React from "react";
import styles from "./PickUpLocation.css";
import PropTypes from "prop-types";
import Button from "../../general/components/Button";
import MobileOnly from "../../general/components/MobileOnly";
import DesktopOnly from "../../general/components/DesktopOnly";
import CheckBox from "../../general/components/CheckBox.js";
import format from "date-fns/format";
export default class PickUpLocation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isCheckBoxSelected: false,
        };
    }

    handleClick() {
        if (this.props.onClick) {
            this.props.onClick();
        }
    }

    handleClickForDesktop() {
        if (this.props.isReturn) {
            this.setState({ isCheckBoxSelected: !this.state.isCheckBoxSelected }, function() {
                if (this.props.handleClickForDesktop) {
                    let slaveId = this.state.isCheckBoxSelected ? this.props.slaveId : "";
                    this.props.handleClickForDesktop(slaveId);
                }
            });
        } else {
            if (this.props.selectItem) {
                this.props.selectItem();
            }
            if (this.props.canSelectStore) {
                if (this.props.onClick) {
                    this.props.onClick();
                }
            }
        }
    }

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
        let month = dateWithMonth.getMonth();
        let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
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

    hoursTohoursToMeridiem = (hour, minute) => {
        const min = minute === 0 ? "00" : minute.toString();
        if (hour > 12) {
          return `${hour - 12}:${min} PM`;
        }
        if (hour === 0) {
          return `${12}:${min} AM`;
        }
        if (hour === 12) {
          return `${12}:${min} PM`;
        }
        if (hour < 12) {
          return `${hour}:${min} AM`;
        }
      };


    render() {
        let getClickAndPiqSelectedDate = "";
        let productDayFormatOfClqAndPiq = "";
        let getCNCProduct =
            this.props &&
            this.props.deliveryInformationWithDate &&
            this.props.deliveryInformationWithDate.find(val => {
                return val.type === "CNC";
            });
        getClickAndPiqSelectedDate = getCNCProduct;

        let day = new Date();
        let dayFormat = format(day, "DD-MMM-YYYY");
        let nextWithOutFormatDay = day.setDate(day.getDate() + 1);
        let nextDay = new Date(nextWithOutFormatDay);
        let nextDayFormat = format(nextDay, "DD-MMM-YYYY");
        productDayFormatOfClqAndPiq = format(
            getClickAndPiqSelectedDate && getClickAndPiqSelectedDate.deliveryDate,
            "DD-MMM-YYYY"
        );
        var date = new Date(getClickAndPiqSelectedDate && getClickAndPiqSelectedDate.deliveryDate.replace(/-/g, "/"));

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

        let isSelected = this.props.isReturn
            ? this.props.selectedId === this.props.slaveId
                ? true
                : false
            : this.props.selected;
        let baseClass = styles.base;
        let thumbailClass = styles.thumbnail;
        if (isSelected) {
            baseClass = `${styles.base} ${styles.selectedStore}`;
            thumbailClass = `${styles.thumbnail} ${styles.selectedThumbnail}`;
        }

        let formattedDeliveryDate = null;
        if (getClickAndPiqSelectedDate && getClickAndPiqSelectedDate.deliveryDate) {
            //converting "MM-DD-YYYY HH:MM:SS"(API value) to "MM/DD/YYYY" for cross browser support
            // JS date object does'nt support "MM-DD-YYYY HH:MM:SS" format in safari, mozilla and IE
            let dateArray = getClickAndPiqSelectedDate.deliveryDate.split(" ")[0].split("-");
            formattedDeliveryDate = `${dateArray[0]}/${dateArray[1]}/${dateArray[2]}`;
        }

        return (
            <div className={baseClass}>
                <div className={styles.holder} onClick={() => this.handleClickForDesktop()}>
                    <span className={thumbailClass}>{this.props.count}</span>
                    {this.props.headingText && <div className={styles.headingText}>{this.props.headingText}</div>}
                    <DesktopOnly>
                        <div className={styles.checkBoxHolder}>
                            <CheckBox selected={isSelected} />
                        </div>
                    </DesktopOnly>
                    {this.props.iconText && <div className={styles.textIcon}>{this.props.iconText}</div>}
                    {this.props.address && <div className={styles.addressText}>{this.props.address}</div>}
                    {this.props.address2 && <div className={styles.addressText}>{this.props.address2}</div>}
                    <div className={styles.opemimgAndClosingTime}>
                        <div className={styles.labelHolder}>
                            <span className={styles.labelTimings}>Store Timings: </span>
                        </div>
                        <div className={styles.dataHolder}>
                            {(openingTime || closingTime) && (
                                <div>
                                    {" "}
                                    {openingTime} - {closingTime}
                                </div>
                            )}
                        </div>
                        {this.dateConverter(this.props.workingDays) && (
                            <div className={styles.pickUpDay}>
                                <span className={styles.closedOnLabel}>Closed on </span>
                                {this.dateConverter(this.props.workingDays).map((val, i) => {
                                    return `${val}${
                                        7 - this.props.workingDays.split(",").length - 1 !== i ? "," : ""
                                    } `;
                                })}
                            </div>
                        )}
                    </div>
                    {getClickAndPiqSelectedDate && getClickAndPiqSelectedDate.deliveryDate && (
                        <div className={styles.opemimgAndClosingTime}>
                            <div className={styles.labelHolder}>
                                <span className={styles.labelTimings}>Pick up by:</span>
                            </div>
                            <div className={styles.dataHolder}>
                                <span>
                                    {getClickAndPiqSelectedDate && getClickAndPiqSelectedDate.deliveryDate
                                        ? dayFormat === productDayFormatOfClqAndPiq
                                            ? `Today, ${this.getDayNumberSuffix(formattedDeliveryDate)}`
                                            : nextDayFormat === productDayFormatOfClqAndPiq
                                            ? `Tomorrow, ${this.getDayNumberSuffix(formattedDeliveryDate)}`
                                            : `${this.getDayNumberSuffix(formattedDeliveryDate)}`
                                        : ""}
                                </span>

                                {strTime && hours !== 0 && <span> {`, after ${strTime}`}</span>}
                            </div>
                        </div>
                    )}
                </div>
                {this.props.canSelectStore && (
                    <MobileOnly>
                        <div className={styles.buttonHolder}>
                            <div className={styles.buttonContainer} onClick={() => this.handleClick()}>
                                <Button type="primary" color="#fff" label={this.props.buttonText} width={121} />
                            </div>
                        </div>
                    </MobileOnly>
                )}
            </div>
        );
    }
}
PickUpLocation.propTypes = {
  headingText: PropTypes.string,
  address: PropTypes.string,
  pickUpKey: PropTypes.string,
  closingTime: PropTypes.string,
  openingTime: PropTypes.string,
  workingDays: PropTypes.string,
  iconText: PropTypes.string,
  onClick: PropTypes.func,
  buttonText: PropTypes.string,
  isReturn: PropTypes.bool,
  handleClickForDesktop: PropTypes.func,
  slaveId: PropTypes.string,
  selectItem: PropTypes.func,
  canSelectStore: PropTypes.bool,
  deliveryInformationWithDate: PropTypes.array,
  selectedId: PropTypes.string,
  count: PropTypes.number,
  address2: PropTypes.string,
  selected: PropTypes.bool,
};
PickUpLocation.defaultProps = {
    canSelectStore: true,
};
