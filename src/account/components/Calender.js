import React, { Component } from "react";
import DayPicker from "react-day-picker";
import dayPickerstyle from "./DayPicker.css";
import styles from "./DatePickerModule.css";
import { getCurrentDate } from "../../lib/dateTimeFunction";
const WEEKDAYS_SHORT = ["S", "M", "T", "W", "T", "F", "S"];
var currentDay = getCurrentDate();

export default class Calender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDay: currentDay
    };
  }

  handleDayClick = day => {
    this.setState({ selectedDay: day });
    if (this.props.onDateSelect) {
      this.props.onDateSelect(day);
    }
  };

  render() {
    let currentMonth = currentDay.getMonth();
    let currentDate = currentDay.getDate();
    let currentYear = currentDay.getFullYear();
    let previousYear = 2018;
    let yearDiffrence = currentYear - previousYear;
    let numberOfMonths = 12 * yearDiffrence + currentMonth;
    return (
      <div className={styles.calender} id="height">
        <DayPicker
          classNames={dayPickerstyle}
          numberOfMonths={numberOfMonths}
          month={new Date(currentYear, currentMonth)}
          fromMonth={new Date(previousYear, 0)}
          toMonth={new Date(currentYear, currentMonth)}
          selectedDays={
            this.props.selectedDay
              ? this.props.selectedDay
              : this.state.selectedDay
          }
          disabledDays={{
            before: this.props.disableDates
              ? new Date(
                  this.props.disableDates.getFullYear(),
                  this.props.disableDates.getMonth(),
                  this.props.disableDates.getDate()
                )
              : null,
            after: new Date(currentYear, currentMonth, currentDate)
          }}
          weekdaysShort={WEEKDAYS_SHORT}
          onDayClick={this.handleDayClick}
        />
      </div>
    );
  }
}
