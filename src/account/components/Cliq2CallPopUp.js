import React, { Component } from "react";
import BottomSlideModal from "../../general/components/BottomSlideModal";
import { CUSTOMER_QUERY_ERROR_MODAL } from "../../general/modal.actions";
import PropTypes from "prop-types";
import styles from "./Cliq2CallPopUp.css";
import Icon from "../../xelpmoc-core/Icon";
import callMeBack from "../components/img/callMeBack.svg";
import scheduleaCall from "../components/img/scheduleaCall.svg";
import cancelGrey from "../components/img/cancelGrey.svg";
import Loader from "../../general/components/Loader";
import { getSlotTime } from "./CustomerCallSuccessModal";
import { getDetailsOfSlots } from "./TimeSlotPopUp";
const CALL_ME_BACK = "Call me back now";
const SCHEDULE_CALL_BACK = "Schedule a call";
export default class Cliq2CallPopUp extends Component {
  componentDidMount() {
    this.props.getGenesysCallConfigData();
  }
  callMeBackClick = () => {
    this.props.closeModal();
    this.props.callMeBackClick();
  };
  scheduleACallClick = () => {
    this.props.closeModal();
    this.props.scheduleACallClick();
  };
  render() {
    const {
      scheduleCallFlag = false,
      callBackNowFlag = false,
      businessEndTime = "",
      businessStartTime = "",
      allowedRequestLimit = 0,
      slotDuration = 0,
      availableSlots = {},
      genesysDataLoader
    } = this.props;
    let {
      WaitTime = "",
      TotalRequestsToday = 0,
      TotalRequestsNextDay = 0,
      OpenRequest = ""
    } = (this.props && this.props.genesysCallConfigData) || {};

    if (this.props.genesysDataLoader) {
      return <Loader />;
    }
    if (OpenRequest === "now") {
      this.props.showModal(CUSTOMER_QUERY_ERROR_MODAL, {
        heading: "We already have your callback request in the queue",
        subHeading: "Please be patient, our executive will call you soon",
        showBtn: true
      });
      return null;
    }

    let showCallMeBackBtn = false,
      showScheduleCallBtn = false;

    showCallMeBackBtn = isCallBackBtnEnable(
      callBackNowFlag,
      businessStartTime,
      businessEndTime,
      TotalRequestsToday,
      allowedRequestLimit,
      WaitTime
    );

    const todayObj = getDetailsOfSlots(
      0,
      availableSlots,
      slotDuration,
      businessEndTime
    );

    if (scheduleCallFlag) {
      if (
        (TotalRequestsToday < allowedRequestLimit ||
          TotalRequestsNextDay < allowedRequestLimit) &&
        !(
          (TotalRequestsToday >= allowedRequestLimit ||
            todayObj.isSlotsNotAvailable) &&
          TotalRequestsNextDay >= allowedRequestLimit
        )
      ) {
        showScheduleCallBtn = true;
      } else {
        this.props.showModal(CUSTOMER_QUERY_ERROR_MODAL, {
          heading: "Call limit has exceeded",
          subHeading:
            "You cannot place anymore call. Please try again after sometime",
          showBtn: false
        });
        return null;
      }
    }

    if (
      !(showCallMeBackBtn || scheduleCallFlag) ||
      (WaitTime > 60 && showCallMeBackBtn)
    ) {
      if (showCallMeBackBtn && showScheduleCallBtn) {
        showCallMeBackBtn = false;
      } else if (showCallMeBackBtn && !showScheduleCallBtn) {
        showCallMeBackBtn = true;
      } else if (TotalRequestsToday >= allowedRequestLimit && WaitTime <= 60) {
        this.props.showModal(CUSTOMER_QUERY_ERROR_MODAL, {
          heading: "Call limit has exceeded",
          subHeading:
            "You cannot place anymore call. Please try again after sometime",
          showBtn: false
        });
        return null;
      } else {
        this.props.showModal(CUSTOMER_QUERY_ERROR_MODAL, {
          heading: "Sorry, no agents are available right now",
          subHeading: "Please try again later or choose other help options",
          showBtn: false
        });
        return null;
      }
    }

    // if (WaitTime > 60) {
    //   if (!showScheduleCallBtn) {
    //     showCallMeBackBtn = true;
    //   } else {
    //     showCallMeBackBtn = false;
    //   }
    // }

    let scheduleCallObj = {};
    if (OpenRequest !== "now" && OpenRequest !== "") {
      scheduleCallObj = getSlotTime(OpenRequest.split("-"));
    }

    return (
      <BottomSlideModal>
        {}
        <div className={styles.popUpBox}>
          <div
            className={styles.crossIcon}
            onClick={() => this.props.closeModal()}
          >
            <Icon image={cancelGrey} size={17} />
          </div>
          {OpenRequest !== "now" && OpenRequest !== "" && (
            <div className={styles.alredySlotBookBox}>
              We have already scheduled a callback for <br />
              {`${scheduleCallObj.shift} between`}{" "}
              <span className={styles.fontBold}>
                {scheduleCallObj.timeSlot.split(",")[0]}
              </span>
            </div>
          )}

          {showCallMeBackBtn && (
            <React.Fragment>
              <div
                className={styles.buttonBox}
                onClick={() => this.callMeBackClick()}
              >
                <div className={styles.iconBox}>
                  <Icon image={callMeBack} size={20} />
                </div>
                {CALL_ME_BACK}
              </div>
              <div className={styles.labelTxt}>
                Expect a call within {WaitTime} Minutes
              </div>
            </React.Fragment>
          )}
          {showScheduleCallBtn && (
            <React.Fragment>
              <div
                className={styles.buttonBox}
                onClick={() => this.scheduleACallClick()}
              >
                <div className={styles.iconBox}>
                  <Icon image={scheduleaCall} size={20} />
                </div>
                {OpenRequest !== "" && OpenRequest !== "now"
                  ? `Re-${SCHEDULE_CALL_BACK}`
                  : SCHEDULE_CALL_BACK}
              </div>
              <div className={styles.labelTxt}>
                Call request can be placed only for <br /> business hours (
                {` ${businessStartTime &&
                  businessStartTime.split(":")[0]} AM - ${businessEndTime &&
                  businessEndTime.split(":")[0] - 12}PM`}
                )
              </div>
            </React.Fragment>
          )}
        </div>
      </BottomSlideModal>
    );
  }
}

export function isCallBackBtnEnable(
  callBackNowFlag,
  startTime,
  endTime,
  TotalRequestsToday,
  requestLimit,
  waitTime
) {
  let isCallMeBackEnabled = false;
  let today = new Date(),
    currentTime = today.toLocaleTimeString("en-US", { hour12: false }),
    isUserWithinBusinessTime =
      currentTime > startTime && currentTime < endTime ? true : false;
  if (callBackNowFlag && isUserWithinBusinessTime) {
    let checkBusinessTime = new Date(
      today.getTime() + parseInt(waitTime) * 60000
    ).toLocaleTimeString("en-US", { hour12: false });
    if (
      TotalRequestsToday < requestLimit &&
      checkBusinessTime > startTime &&
      checkBusinessTime < endTime
    ) {
      isCallMeBackEnabled = true;
    }
  }

  return isCallMeBackEnabled;
}

Cliq2CallPopUp.propTypes = {
  callMeBackClick: PropTypes.func,
  scheduleACallClick: PropTypes.func,
  getGenesysCallConfigData: PropTypes.func,
  callBackNowFlag: PropTypes.bool,
  scheduleCallFlag: PropTypes.bool,
  businessStartTime: PropTypes.string,
  businessEndTime: PropTypes.string,
  allowedRequestLimit: PropTypes.number,
  genesysCallConfigData: PropTypes.shape({
    WaitTime: PropTypes.number,
    TotalRequestsToday: PropTypes.number,
    TotalRequestsNextDay: PropTypes.number,
    OpenRequest: PropTypes.string
  }),
  genesysDataLoader: PropTypes.bool,
  closeModal: PropTypes.func,
  showModal: PropTypes.func
};
