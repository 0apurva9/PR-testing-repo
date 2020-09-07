import React, { Component } from "react";
import BottomSlideModal from "../../general/components/BottomSlideModal";
import Button from "../../general/components/Button.js";
import TabHolder from "../../account/components/TabHolder";
import TabData from "../../account/components/TabData";
import styles from "./TimeSlotPopUp.css";
export default class TimeSlotPopUp extends Component {
  state = {
    isSelected: 0,
    noTimeSlot: false
  };

  tabSelect(val) {
    // if (this.state.isSelected !== val) {
    //   this.setState({ openIndex: null, showEmi: false, showBank: false });
    // }
    this.setState({ isSelected: val });
  }
  setTimeSlot = (time, date) => {
    this.props.closeModal();
    if (this.props.setTimeSlot) {
      this.props.setTimeSlot(time, date);
    }
  };
  getDayNumberSuffix = date => {
    switch (date) {
      case 1:
      case 21:
      case 31:
        return "" + date + "st ";
      case 2:
      case 22:
        return "" + date + "nd ";
      case 3:
      case 23:
        return "" + date + "rd ";
      default:
        return "" + date + "th ";
    }
  };
  dateMothFormat = nextDay => {
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    let d = new Date();

    let formatedDate = "";
    if (nextDay) {
      let dayName = days[d.getDay() + 1];
      let monthName = months[d.getMonth()];
      let date = d.getDate() + 1;
      if (date == 1) {
        monthName = months[d.getMonth() + 1];
      }
      formatedDate =
        dayName + "," + this.getDayNumberSuffix(date) + " " + monthName;
    } else {
      let dayName = days[d.getDay()];
      let monthName = months[d.getMonth()];
      let date = d.getDate();
      formatedDate =
        dayName + ", " + this.getDayNumberSuffix(date) + " " + monthName;
    }
    return formatedDate;
    // console.log("getMonth",getMonth);
  };

  render() {
    console.log(this.props);
    const todayDate = this.dateMothFormat(false);
    const tomorrowDate = this.dateMothFormat(true);
    const { cliq2CallConfigData } = this.props;
    return (
      <BottomSlideModal>
        <div className={styles.timeslotBox}>
          <TabHolder>
            <TabData
              width="50%"
              label={`Today <br/> ${todayDate}`}
              subHeding={true}
              selected={this.state.isSelected === 0}
              selectItem={() => this.tabSelect(0)}
            />
            <TabData
              width="50%"
              label={`Tomorrow <br/> ${tomorrowDate}`}
              subHeding={true}
              selected={this.state.isSelected === 1}
              selectItem={() => this.tabSelect(1)}
            />
          </TabHolder>

          <div className={styles.dateBox}>
            {this.state.isSelected === 0 && (
              <div className={styles.dateSection}>
                {!cliq2CallConfigData.availableSlots &&
                cliq2CallConfigData.availableSlots.today ? (
                  <div className={styles.noTimeSlotBox}>
                    <div className={styles.noTimeSlot}>
                      No Available Slots Found Today
                    </div>
                    <Button
                      type="primary"
                      backgroundColor="#da1c5c"
                      height={40}
                      label={"CALL ME BACK NOW"}
                      borderRadius={6}
                      width={205}
                      textStyle={{ color: "#FFF", fontSize: 14 }}
                      disabled={this.state.btnDisable}
                      disabledLightGray={this.state.btnDisable}
                      // onClick={() => this.nextField(currentStep)}
                    />
                  </div>
                ) : (
                  <React.Fragment>
                    <div className={styles.morningSlot}>
                      <div className={styles.txt}>Morning</div>
                      {cliq2CallConfigData &&
                        cliq2CallConfigData.availableSlots &&
                        cliq2CallConfigData.availableSlots.today &&
                        cliq2CallConfigData.availableSlots.today.morning.map(
                          time => {
                            return (
                              <div
                                className={styles.timeCard}
                                onClick={() =>
                                  this.setTimeSlot(time.value, todayDate)
                                }
                              >
                                {time.label}
                              </div>
                            );
                          }
                        )}
                    </div>
                    <div className={styles.afternoonSlot}>
                      <div className={styles.txt}> afternoon</div>
                      {cliq2CallConfigData &&
                        cliq2CallConfigData.availableSlots &&
                        cliq2CallConfigData.availableSlots.today &&
                        cliq2CallConfigData.availableSlots.today.afternoon.map(
                          time => {
                            return (
                              <div
                                className={styles.timeCard}
                                onClick={() =>
                                  this.setTimeSlot(time.value, todayDate)
                                }
                              >
                                {time.label}
                              </div>
                            );
                          }
                        )}
                    </div>
                    <div className={styles.eveingSlot}>
                      <div className={styles.txt}>evening</div>
                      {cliq2CallConfigData &&
                        cliq2CallConfigData.availableSlots &&
                        cliq2CallConfigData.availableSlots.today &&
                        cliq2CallConfigData.availableSlots.today.evening.map(
                          time => {
                            return (
                              <div
                                className={styles.timeCard}
                                onClick={() =>
                                  this.setTimeSlot(time.value, todayDate)
                                }
                              >
                                {time.label}
                              </div>
                            );
                          }
                        )}
                    </div>
                  </React.Fragment>
                )}
              </div>
            )}
            {this.state.isSelected === 1 && (
              <div className={styles.dateSection}>
                {!cliq2CallConfigData.availableSlots &&
                cliq2CallConfigData.availableSlots.today ? (
                  <div className={styles.noTimeSlotBox}>
                    <div className={styles.noTimeSlot}>
                      No Available Slots Found Today
                    </div>
                    <Button
                      type="primary"
                      backgroundColor="#da1c5c"
                      height={40}
                      label={"CALL ME BACK NOW"}
                      borderRadius={6}
                      width={205}
                      textStyle={{ color: "#FFF", fontSize: 14 }}
                      disabled={this.state.btnDisable}
                      disabledLightGray={this.state.btnDisable}
                      // onClick={() => this.nextField(currentStep)}
                    />
                  </div>
                ) : (
                  <React.Fragment>
                    <div className={styles.morningSlot}>
                      <div className={styles.txt}>Morning</div>
                      {cliq2CallConfigData &&
                        cliq2CallConfigData.availableSlots &&
                        cliq2CallConfigData.availableSlots.tommorrow &&
                        cliq2CallConfigData.availableSlots.tommorrow.morning.map(
                          time => {
                            return (
                              <div
                                className={styles.timeCard}
                                onClick={() =>
                                  this.setTimeSlot(time.value, tomorrowDate)
                                }
                              >
                                {time.label}
                              </div>
                            );
                          }
                        )}
                    </div>
                    <div className={styles.afternoonSlot}>
                      <div className={styles.txt}> afternoon</div>
                      {cliq2CallConfigData &&
                        cliq2CallConfigData.availableSlots &&
                        cliq2CallConfigData.availableSlots.tommorrow &&
                        cliq2CallConfigData.availableSlots.tommorrow.afternoon.map(
                          time => {
                            return (
                              <div
                                className={styles.timeCard}
                                onClick={() =>
                                  this.setTimeSlot(time.value, tomorrowDate)
                                }
                              >
                                {time.label}
                              </div>
                            );
                          }
                        )}
                    </div>
                    <div className={styles.eveingSlot}>
                      <div className={styles.txt}>evening</div>
                      {cliq2CallConfigData &&
                        cliq2CallConfigData.availableSlots &&
                        cliq2CallConfigData.availableSlots.tommorrow &&
                        cliq2CallConfigData.availableSlots.tommorrow.evening.map(
                          time => {
                            return (
                              <div
                                className={styles.timeCard}
                                onClick={() =>
                                  this.setTimeSlot(time.value, tomorrowDate)
                                }
                              >
                                {time.label}
                              </div>
                            );
                          }
                        )}
                    </div>
                  </React.Fragment>
                )}
              </div>
            )}
          </div>
        </div>
      </BottomSlideModal>
    );
  }
}
