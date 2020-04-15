import React from "react";
import styles from "./ExchangeDetailsTrack.css";
const EXCHANGE_INITIATED = "Exchange Initiated";
const PICK_UP_IN_PROGRESS = "Pick Up in Progress";
const PICKED_UP = "Picked Up";
const CASHBACK_CREDITED = "Cashback Credited";
const CANCELLED = "Cancelled";

export default class ExchangeDetailsTrack extends React.Component {
  render() {
    if (!this.props.exchangeTrackDiagram) {
      return null;
    }
    let completedStatus = [];
    const completedSteps = this.props.exchangeTrackDiagram.map(val => {
      //get current completed steps
      if (val.status === "Complete") {
        completedStatus.push(val.displayMessage);
      }
      //get all steps
      return val.displayMessage;
    });
    //get current active completed step
    const activeCompletedStatus = completedStatus[completedStatus.length - 1];
    const exchangeInitiated = this.props.exchangeTrackDiagram.find(val => {
      return val.displayMessage === EXCHANGE_INITIATED;
    });
    const pickUpInProgress = this.props.exchangeTrackDiagram.find(val => {
      return val.displayMessage === PICK_UP_IN_PROGRESS;
    });
    const pickedUp = this.props.exchangeTrackDiagram.find(val => {
      return val.displayMessage === PICKED_UP;
    });
    const cashbackCredited = this.props.exchangeTrackDiagram.find(val => {
      return val.displayMessage === CASHBACK_CREDITED;
    });
    const Cancelled = this.props.exchangeTrackDiagram.find(val => {
      return val.displayMessage === CANCELLED;
    });

    return (
      <div className={styles.base}>
        <React.Fragment>
          <div
            className={
              exchangeInitiated.status === "Pending"
                ? styles.stepInactive
                : styles.step
            }
          >
            <div
              className={
                exchangeInitiated.status === "Pending"
                  ? styles.check
                  : styles.checkActive
              }
            />
            <div
              className={
                activeCompletedStatus === EXCHANGE_INITIATED
                  ? styles.processNameHolderBold
                  : styles.processNameHolder
              }
            >
              {exchangeInitiated.displayMessage}
            </div>
            <div className={styles.eieDateAndTimeHolder}>
              {exchangeInitiated.displayDate && (
                <div className={styles.eieDateNTimeContainer}>
                  {exchangeInitiated.displayDate}
                </div>
              )}
              {exchangeInitiated.displayTime && (
                <div className={styles.eieDateNTimeContainer}>
                  {exchangeInitiated.displayTime}
                </div>
              )}
            </div>
          </div>

          <div
            className={
              pickUpInProgress
                ? pickUpInProgress.status === "Pending"
                  ? styles.stepInactive
                  : styles.step
                : styles.stepInactive
            }
          >
            <div
              className={
                pickUpInProgress
                  ? pickUpInProgress.status === "Pending"
                    ? styles.check
                    : styles.checkActive
                  : styles.check
              }
            />
            <div
              className={
                activeCompletedStatus === PICK_UP_IN_PROGRESS
                  ? styles.processNameHolderBold
                  : styles.processNameHolder
              }
            >
              {pickUpInProgress && pickUpInProgress.displayMessage
                ? pickUpInProgress.displayMessage
                : "Pick Up in Progress"}
            </div>
            <div className={styles.eieDateAndTimeHolder}>
              {pickUpInProgress &&
                pickUpInProgress.displayDate && (
                  <div className={styles.eieDateNTimeContainer}>
                    {pickUpInProgress.displayDate}
                  </div>
                )}
              {pickUpInProgress &&
                pickUpInProgress.displayTime && (
                  <div className={styles.eieDateNTimeContainer}>
                    {pickUpInProgress.displayTime}
                  </div>
                )}
            </div>
          </div>

          {!completedSteps.includes(CANCELLED) && (
            <div
              className={
                pickedUp
                  ? pickedUp.status === "Pending"
                    ? styles.stepInactive
                    : styles.step
                  : styles.stepInactive
              }
            >
              <div
                className={
                  pickedUp
                    ? pickedUp.status === "Pending"
                      ? styles.check
                      : styles.checkActive
                    : styles.check
                }
              />
              <div
                className={
                  activeCompletedStatus === PICKED_UP
                    ? styles.processNameHolderBold
                    : styles.processNameHolder
                }
              >
                {pickedUp && pickedUp.displayMessage
                  ? pickedUp.displayMessage
                  : "Picked Up"}
              </div>
              <div className={styles.eieDateAndTimeHolder}>
                {pickedUp &&
                  pickedUp.displayDate && (
                    <div className={styles.eieDateNTimeContainer}>
                      {pickedUp.displayDate}
                    </div>
                  )}
                {pickedUp &&
                  pickedUp.displayTime && (
                    <div className={styles.eieDateNTimeContainer}>
                      {pickedUp.displayTime}
                    </div>
                  )}
              </div>
            </div>
          )}

          {!completedSteps.includes(CANCELLED) && (
            <div
              className={
                cashbackCredited
                  ? cashbackCredited.status === "Pending"
                    ? styles.stepInactive
                    : styles.step
                  : styles.stepInactive
              }
            >
              <div
                className={
                  cashbackCredited
                    ? cashbackCredited.status === "Pending"
                      ? styles.check
                      : styles.checkActive
                    : styles.check
                }
              />
              <div
                className={
                  activeCompletedStatus === CASHBACK_CREDITED
                    ? styles.processNameHolderBold
                    : styles.processNameHolder
                }
              >
                {cashbackCredited && cashbackCredited.displayMessage
                  ? cashbackCredited.displayMessage
                  : "Cashback Credited"}
              </div>
              <div className={styles.eieDateAndTimeHolder}>
                {cashbackCredited &&
                  cashbackCredited.displayDate && (
                    <div className={styles.eieDateNTimeContainer}>
                      {cashbackCredited.displayDate}
                    </div>
                  )}
                {cashbackCredited &&
                  cashbackCredited.displayTime && (
                    <div className={styles.eieDateNTimeContainer}>
                      {cashbackCredited.displayTime}
                    </div>
                  )}
              </div>
            </div>
          )}

          {!completedSteps.includes(PICKED_UP) &&
            !completedSteps.includes(CASHBACK_CREDITED) &&
            completedSteps.includes(CANCELLED) && (
              <div
                className={
                  Cancelled
                    ? Cancelled.status === "Pending"
                      ? styles.stepInactive
                      : styles.step
                    : styles.stepInactive
                }
              >
                <div
                  className={
                    Cancelled
                      ? Cancelled.status === "Pending"
                        ? styles.check
                        : styles.checkActive
                      : styles.check
                  }
                />
                <div
                  className={
                    activeCompletedStatus === CANCELLED
                      ? styles.processNameHolderBold
                      : styles.processNameHolder
                  }
                >
                  {Cancelled && Cancelled.displayMessage
                    ? Cancelled.displayMessage
                    : "Cancelled"}
                </div>
                <div className={styles.eieDateAndTimeHolder}>
                  {Cancelled &&
                    Cancelled.displayDate && (
                      <div className={styles.eieDateNTimeContainer}>
                        {Cancelled.displayDate}
                      </div>
                    )}
                  {Cancelled &&
                    Cancelled.displayTime && (
                      <div className={styles.eieDateNTimeContainer}>
                        {Cancelled.displayTime}
                      </div>
                    )}
                </div>
              </div>
            )}
        </React.Fragment>
      </div>
    );
  }
}
