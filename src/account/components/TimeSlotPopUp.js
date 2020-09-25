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
import { get24HrsTime } from "../../lib/dateTimeFunction";

const DATE_FORMAT = "Do MMMM";
const TODAY = "Today";
const TOMORROW = "Tomorrow";
const EMPTY_SLOTS = "Sorry. No slots are available for";
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
    isSelected: 0
  };

  componentDidMount() {
    const dataObj = getDetailsOfSlots(
      this.state.isSelected,
      this.props.cliq2CallConfigData.availableSlots,
      this.props.cliq2CallConfigData.slotDuration,
      this.props.cliq2CallConfigData.businessEndTime
    );
    if (
      (this.props &&
        this.props.genesysCallConfigData &&
        this.props.genesysCallConfigData.TotalRequestsToday >=
          this.props.cliq2CallConfigData.allowedRequestLimit) ||
      dataObj.isSlotsNotAvailable
    ) {
      this.setState({ isSelected: 1 });
    }
  }

  tabSelect(val) {
    this.setState({ isSelected: val });
  }

  setTimeSlot = (time, date) => {
    this.props.closeModal();
    if (this.props.setTimeSlot) {
      this.props.setTimeSlot(time, date);
    }
  };

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
    const currentTime = get24HrsTime(today);

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
                className={
                  isTimeSlotDisabled
                    ? styles.disableTimeSlot
                    : styles.activeTimeSlot
                }
                style={
                  isAlreadySelected ? { border: "1px solid #da1c5c" } : null
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

    const dataObj = getDetailsOfSlots(
      this.state.isSelected,
      availableSlots,
      slotDuration,
      businessEndTime
    );
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
              {dataObj.isSlotsNotAvailable ? (
                <div className={styles.noTimeSlotAvailabe}>
                  <span className={styles.noTimeSlotTxt}>{`${EMPTY_SLOTS} ${
                    this.state.isSelected
                      ? TOMORROW.toLowerCase()
                      : TODAY.toLowerCase()
                  }`}</span>
                  {isCallBackBtnEnable(
                    callBackNowFlag,
                    businessStartTime,
                    businessEndTime,
                    TotalRequestsToday,
                    allowedRequestLimit,
                    WaitTime
                  ) && WaitTime < 60 ? (
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
                <span className={styles.callLimittExceded}>
                  {`${CALL_REQUEST_LIMIT_ECXCEEDED}${
                    this.state.isSelected
                      ? TOMORROW.toLowerCase()
                      : TODAY.toLowerCase()
                  }`}
                </span>
              ) : (
                Object.keys(dataObj.slotsData).map(slot => {
                  return (
                    <div key={slot} className={styles.slotsContainer}>
                      {this.renderCallSlot(
                        slot,
                        dataObj.slotKey,
                        dataObj.slotsData[slot],
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

export function getDetailsOfSlots(
  selectedTab,
  availableSlots,
  slotDuration,
  endTime
) {
  const slotKey = selectedTab ? TOMORROW.toLowerCase() : TODAY.toLowerCase(),
    slotsData = availableSlots[slotKey];

  let today = new Date();
  today.setHours(today.getHours() + slotDuration + 1);

  let isSlotsNotAvailable = true;
  Object.keys(slotsData).forEach(slot => {
    if (slotsData[slot].length) {
      isSlotsNotAvailable = false;
    }
  });

  if (
    (slotKey === TODAY.toLowerCase() && get24HrsTime(today) > endTime) ||
    today.getHours() === 0
  ) {
    isSlotsNotAvailable = true;
  }

  return { slotKey, slotsData, isSlotsNotAvailable };
}

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
