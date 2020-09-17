import React, { Component } from "react";
import BottomSlideModal from "../../general/components/BottomSlideModal";
import Button from "../../general/components/Button.js";
import TabHolder from "../../account/components/TabHolder";
import TabData from "../../account/components/TabData";
import PropTypes from "prop-types";
import styles from "./TimeSlotPopUp.css";
import format from "date-fns/format";
import { withRouter } from "react-router-dom";
import { isCallBackBtnEnable } from "./Cliq2CallPopUp";

const DATE_FORMAT = "Do MMMM";
const TODAY = "Today";
const TOMORROW = "Tomorrow";
const EMPTY_SLOTS = "No Available Slots Found ";
const CALL_REQUEST_LIMIT_ECXCEEDED = "Call limit has exceeded for ";
const WEEK_DAY = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
class TimeSlotPopUp extends Component {
  state = {
    isSelected: 0,
    noTimeSlot: false
  };

  tabSelect(val) {
    this.setState({ isSelected: val });
  }
  setTimeSlot = (time, date) => {
    this.props.closeModal();
    if (this.props.setTimeSlot) {
      this.props.setTimeSlot(time, date);
    }
  };

  get24HrsTime(date) {
    return date.toLocaleTimeString("en-US", { hour12: false });
  }

  onContinueShoppingClick() {
    this.props.closeModal();
    this.props.callMeBackCallClick();
  }

  renderCallSlot = (slot, shift, callData, date, slotDuration) => {
    let header =
      slot === "morning"
        ? "Morning"
        : slot === "afternoon"
        ? "Afternoon"
        : "Evening";
    let today = new Date(),
      isTimeSlotDisabled = false,
      isAlreadySelected = false,
      slotRangeList = [];

    today.setHours(today.getHours() + slotDuration + 1);
    const currentTime = this.get24HrsTime(today);

    return (
      <React.Fragment>
        <span className={styles.slotHeader}>{header}</span>
        <div className={styles.slotAvailabilityHolder}>
          {callData.map(timeSlot => {
            if (shift === TODAY.toLowerCase()) {
              slotRangeList = timeSlot.value && timeSlot.value.split("-");
              isTimeSlotDisabled =
                currentTime > slotRangeList[0] &&
                currentTime > slotRangeList[1];
            }
            if (
              this.props.selectedSlot &&
              this.props.selectedSlot.slotTime &&
              this.props.selectedSlot.slotTime.shift === shift
            ) {
              isAlreadySelected =
                timeSlot.value === this.props.selectedSlot.slotTime.value;
            }
            return (
              <div
                key={timeSlot.label}
                className={styles.activeTimeSlot}
                style={
                  isTimeSlotDisabled
                    ? { border: "1px solid #e7e7e7" }
                    : isAlreadySelected
                    ? { border: "1px solid #da1c5c" }
                    : null
                }
                onClick={() =>
                  !isTimeSlotDisabled
                    ? this.setTimeSlot({ ...timeSlot, shift }, date)
                    : null
                }
              >
                <span
                  className={
                    isTimeSlotDisabled
                      ? styles.disabledSlotText
                      : styles.slotText
                  }
                >
                  {timeSlot.label}
                </span>
              </div>
            );
          })}
        </div>
      </React.Fragment>
    );
  };

  render() {
    const {
      callBackNowFlag = false,
      businessStartTime = "",
      businessEndTime = "",
      allowedRequestLimit = 0,
      slotDuration = 0,
      availableSlots = {}
    } = this.props && this.props.cliq2CallConfigData;

    const { WaitTime = 0, TotalRequestsToday = 0, TotalRequestsNextDay = 0 } =
      (this.props && this.props.genesysCallConfigData) || {};

    let slotKey = this.state.isSelected
        ? TOMORROW.toLowerCase()
        : TODAY.toLowerCase(),
      slotsData = availableSlots[slotKey];

    let today = new Date(),
      currentDate = `${WEEK_DAY[today.getDay()]}, ${format(
        today,
        DATE_FORMAT
      )}`,
      tomorrow = today;
    tomorrow.setDate(tomorrow.getDate() + 1);
    let nextDate = `${WEEK_DAY[tomorrow.getDay()]}, ${format(
      tomorrow,
      DATE_FORMAT
    )}`;

    let isSlotsNotAvailable = true;
    Object.keys(slotsData).forEach(slot => {
      if (slotsData[slot].length) {
        isSlotsNotAvailable = false;
      }
    });

    today.setHours(today.getHours() + slotDuration + 1);
    if (
      slotKey === TODAY.toLowerCase() &&
      this.get24HrsTime(today) > businessEndTime
    ) {
      isSlotsNotAvailable = true;
    }

    let callRequestLimit = 0;
    if (this.state.isSelected) {
      callRequestLimit = TotalRequestsNextDay;
    } else {
      callRequestLimit = TotalRequestsToday;
    }
    return (
      <BottomSlideModal>
        <div className={styles.timeslotBox}>
          <TabHolder>
            <TabData
              width="50%"
              label={`${TODAY} <br/> ${currentDate}`}
              subHeding={true}
              selected={this.state.isSelected === 0}
              selectItem={() => this.tabSelect(0)}
            />
            <TabData
              width="50%"
              label={`${TOMORROW} <br/> ${nextDate}`}
              subHeding={true}
              selected={this.state.isSelected === 1}
              selectItem={() => this.tabSelect(1)}
            />
          </TabHolder>

          <div className={styles.dateBox}>
            <div className={styles.dateSection}>
              {isSlotsNotAvailable ? (
                <div className={styles.noTimeSlotAvailabe}>
                  <span className={styles.noTimeSlotTxt}>{`${EMPTY_SLOTS}${
                    this.state.isSelected ? TOMORROW : TODAY
                  }`}</span>
                  {isCallBackBtnEnable(
                    callBackNowFlag,
                    businessStartTime,
                    businessEndTime,
                    TotalRequestsToday,
                    allowedRequestLimit,
                    WaitTime
                  ) ? (
                    <div className={styles.callMeBackBtn}>
                      <Button
                        type="primary"
                        backgroundColor="#da1c5c"
                        height={40}
                        borderRadius={6}
                        label={"Call Me Back Now"}
                        width={210}
                        textStyle={{ color: "#FFF", fontSize: 14 }}
                        // disabled={true}
                        onClick={() => this.onContinueShoppingClick()}
                      />
                    </div>
                  ) : null}
                </div>
              ) : callRequestLimit >= allowedRequestLimit ? (
                <span>
                  {`${CALL_REQUEST_LIMIT_ECXCEEDED}${
                    this.state.selectedTab
                      ? TOMORROW.toLowerCase()
                      : TODAY.toLowerCase()
                  }`}
                </span>
              ) : (
                Object.keys(slotsData).map(slot => {
                  return (
                    <div key={slot} className={styles.slotsContainer}>
                      {this.renderCallSlot(
                        slot,
                        slotKey,
                        slotsData[slot],
                        this.state.isSelected ? nextDate : currentDate,
                        slotDuration
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </BottomSlideModal>
    );
  }
}

export default withRouter(TimeSlotPopUp);

const timeSlotObj = PropTypes.shape({
  label: PropTypes.string,
  value: PropTypes.string
});

const shiftSlotObj = PropTypes.shape({
  morning: PropTypes.arrayOf(timeSlotObj),
  afternoon: PropTypes.arrayOf(timeSlotObj),
  evening: PropTypes.arrayOf(timeSlotObj)
});

TimeSlotPopUp.propTypes = {
  closeModal: PropTypes.func,
  setTimeSlot: PropTypes.func,
  callMeBackCallClick: PropTypes.func,
  genesysCallConfigData: PropTypes.shape({
    WaitTime: PropTypes.number,
    TotalRequestsToday: PropTypes.number,
    TotalRequestsNextDay: PropTypes.number,
    OpenRequest: PropTypes.string
  }),
  cliq2CallConfigData: PropTypes.shape({
    callBackNowFlag: PropTypes.bool,
    businessStartTime: PropTypes.string,
    businessEndTime: PropTypes.string,
    allowedRequestLimit: PropTypes.number,
    slotDuration: PropTypes.number,
    availableSlots: PropTypes.shape({
      today: shiftSlotObj,
      tomorrow: shiftSlotObj
    })
  })
};
