import React, { Component } from "react";
import BottomSlideModal from "../../general/components/BottomSlideModal";
import styles from "./Cliq2CallPopUp.css";
import Icon from "../../xelpmoc-core/Icon";
import Button from "../../general/components/Button.js";
import callMeBack from "../components/img/callMeBack.svg";
export default class Cliq2CallPopUp extends Component {
  callMeBackClick = () => {
    this.props.closeModal();
    this.props.callMeBackClick();
  };
  scheduleACallClick = () => {
    this.props.closeModal();
    this.props.scheduleACallClick();
  };
  render() {
    console.log("this", this.props);
    const startTime = this.props.businessStartTime.split(":")[0];
    const endTime = this.props.businessEndTime.split(":")[0];
    let startTimeDisplay = "";
    let endTimeDisplay = "";
    if (startTime < 12) {
      startTimeDisplay = startTime + " AM ";
    } else {
      startTimeDisplay = startTime + " PM ";
    }
    if (endTime < 12) {
      endTimeDisplay = endTime + " AM ";
    } else {
      endTimeDisplay = endTime + " PM ";
    }
    return (
      <BottomSlideModal>
        <div className={styles.popUpBox}>
          <div
            className={styles.crossIcon}
            onClick={() => this.props.closeModal()}
          >
            X
          </div>
          <div className={styles.alredySlotBookBox}>
            We have already scheduled a callback for
            <br /> today at
            <span className={styles.fontBold}> 03:00 PM - 04:00 PM</span>
          </div>
          {this.props.callBackNowFlag && (
            <React.Fragment>
              <div
                className={styles.buttonBox}
                onClick={() => this.callMeBackClick()}
              >
                <div className={styles.iconBox}>
                  <Icon image={callMeBack} size={20} />
                </div>
                Call me back now
              </div>
              <div className={styles.labelTxt}>
                Expect a call within 15 Minutes
              </div>
            </React.Fragment>
          )}
          {this.props.scheduleCallFlag && (
            <React.Fragment>
              <div
                className={styles.buttonBox}
                onClick={() => this.scheduleACallClick()}
              >
                <div className={styles.iconBox}>
                  <Icon image={callMeBack} size={20} />
                </div>
                Schedule a call
              </div>
              <div className={styles.labelTxt}>
                Call request can be placed only for <br /> business hours ({" "}
                {startTimeDisplay} - {endTimeDisplay})
              </div>
            </React.Fragment>
          )}
        </div>
      </BottomSlideModal>
    );
  }
}
