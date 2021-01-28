import React, { Component } from "react";
import BottomSlideModal from "../../general/components/BottomSlideModal";
import styles from "./DatePickerModule.css";
import Calender from "./Calender";
import {
  getUTCWeek,
  getUTCMonthsText,
  getCurrentDate
} from "../../lib/dateTimeFunction.js";
var today = getCurrentDate();
var dd = today.getDate();
var mm = today.getMonth();
export default class DatePickerModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFromSelected: true,
      isToSelected: false,
      fromDate: today,
      toDate: today
    };
  }

  handleSubmit = () => {
    if (this.state.fromDate && this.state.toDate) {
      let selectDates = {
        fromDate: this.state.fromDate,
        toDate: this.state.toDate
      };

      if (this.props.setDate) {
        this.props.setDate(selectDates);
        this.props.closeModal();
      }
    } else {
      this.props.displayToast("please select date");
    }
  };

  handleDateSelect(date) {
    let selectedDate = date.getDate();
    let selectedMonth = date.getMonth();
    let selectedYear = date.getFullYear();
    let fromSelectedDate = this.state.fromDate.getDate();
    let fromSelectedMonth = this.state.fromDate.getMonth();
    let fromSelectedYear = this.state.fromDate.getFullYear();
    if (this.state.isFromSelected) {
      if (selectedMonth === mm) {
        if (selectedDate <= dd) {
          this.setState({
            fromDate: date,
            isToSelected: true,
            toDate: date,
            isFromSelected: false
          });
        }
      } else {
        this.setState({
          fromDate: date,
          isToSelected: true,
          toDate: date,
          isFromSelected: false
        });
      }
    } else {
      if (
        selectedMonth >= fromSelectedMonth &&
        selectedYear === fromSelectedYear
      ) {
        if (fromSelectedMonth === mm) {
          if (
            selectedDate <= dd &&
            selectedDate >= fromSelectedDate &&
            selectedMonth === fromSelectedMonth
          ) {
            this.setState({
              isToSelected: true,
              toDate: date
            });
          }
        } else {
          if (selectedMonth === mm) {
            if (selectedDate <= dd) {
              this.setState({
                isToSelected: true,
                toDate: date
              });
            }
          } else if (selectedMonth === fromSelectedMonth) {
            if (selectedDate >= fromSelectedDate) {
              this.setState({
                isToSelected: true,
                toDate: date
              });
            }
          } else {
            this.setState({
              isToSelected: true,
              toDate: date
            });
          }
        }
      } else {
        if (fromSelectedYear < selectedYear) {
          if (selectedMonth === mm) {
            if (selectedDate <= dd) {
              this.setState({
                isToSelected: true,
                toDate: date
              });
            }
          } else {
            this.setState({
              isToSelected: true,
              toDate: date
            });
          }
        }
      }
    }
  }

  onFromSelect = () => {
    this.setState({
      isFromSelected: true,
      isToSelected: false
    });
    this.scrollToView();
  };

  onToSelect = () => {
    this.setState({
      isFromSelected: false,
      isToSelected: true
    });
  };

  scrollToView = () => {
    let selectedDay = this.state.isFromSelected
      ? this.state.toDate
      : this.state.fromDate;
    if (selectedDay != null) {
      let day = getUTCWeek(selectedDay, 3);
      let year = selectedDay.getFullYear();
      let date = selectedDay.getDate();
      if (date < 10) {
        date = "0" + date;
      }
      let month = getUTCMonthsText(selectedDay, 3);
      let currentDate = day + " " + month + " " + date + " " + year;
      let qs = '[aria-label="' + currentDate + '"]';
      let element = document.querySelector(qs);
      element.scrollIntoView();
    }
  };

  componentDidMount() {
    this.scrollToView();
  }

  render() {
    return (
      <BottomSlideModal hideCancelIcon="true">
        <div className={styles.base}>
          <div className={styles.heading}>Select dates</div>
          <div className={styles.dateHolderContainer}>
            <div
              className={
                this.state.isFromSelected
                  ? styles.fromDateConatinerSelected
                  : styles.fromDateConatiner
              }
              onClick={() => {
                this.onFromSelect();
              }}
            >
              <div className={styles.fromAndTo}>From</div>
              <div className={styles.dateHolder}>
                <div className={styles.date}>
                  {this.state.fromDate && this.state.fromDate.getDate() < 10
                    ? "0" + this.state.fromDate.getDate()
                    : this.state.fromDate.getDate()}
                </div>
                <div className={styles.monthAndYearHolder}>
                  <div className={styles.monthAndYear}>
                    {this.state.fromDate &&
                      getUTCMonthsText(this.state.fromDate)}{" "}
                    {this.state.fromDate && this.state.fromDate.getFullYear()}
                  </div>
                  <div className={styles.day}>
                    {this.state.fromDate && getUTCWeek(this.state.fromDate)}
                  </div>
                </div>
              </div>
            </div>
            <div
              className={
                this.state.isToSelected
                  ? styles.toDateConatinerSelected
                  : styles.toDateConatiner
              }
              onClick={() => {
                this.onToSelect();
              }}
            >
              <div className={styles.dateHolder}>
                <div className={styles.dateAndLabelHolder}>
                  <div className={styles.to}>To</div>
                  <div className={styles.date}>
                    {this.state.toDate && this.state.toDate.getDate() < 10
                      ? "0" + this.state.toDate.getDate()
                      : this.state.toDate.getDate()}
                  </div>
                  <div className={styles.monthAndYearHolder}>
                    <div className={styles.monthAndYear}>
                      {this.state.toDate && getUTCMonthsText(this.state.toDate)}{" "}
                      {this.state.toDate && this.state.toDate.getFullYear()}
                    </div>
                    <div className={styles.day}>
                      {this.state.toDate && getUTCWeek(this.state.toDate)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.calenderHolder}>
            <Calender
              onDateSelect={date => this.handleDateSelect(date)}
              disableDates={
                this.state.isToSelected ? this.state.fromDate : null
              }
              selectedDay={[this.state.fromDate, this.state.toDate]}
            />
          </div>
          <div
            className={styles.buttonHolder}
            onClick={() => this.handleSubmit()}
          >
            <div className={styles.button}>
              <div className={styles.buttonText}>Confirm</div>
            </div>
          </div>
        </div>
      </BottomSlideModal>
    );
  }
}
