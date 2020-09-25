import React from "react";
import styles from "./ExchangeDetailsTrack.css";
const EXCHANGE_INITIATED = "EXCHANGE_INITIATED"; // Exchange Initiated
const PICK_UP_IN_PROGRESS = "PICKUP_INITIATED"; //Pick Up in Progress
const PICKED_UP = "PICKUP_COMPLETE"; // Picked Up
const CASHBACK_CREDITED = "PAYMENT_COMPLETED"; // Cashback Credited
const CANCELLED = "PICKUP_CANCEL"; //Cancelled

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
              exchangeInitiated
                ? exchangeInitiated.status === "Pending"
                  ? styles.stepInactive
                  : styles.step
                : styles.stepInactive
            }
          >
            <div
              className={
                exchangeInitiated
                  ? exchangeInitiated.status === "Pending"
                    ? styles.check
                    : styles.checkActive
                  : styles.check
              }
            />
            <div
              className={
                activeCompletedStatus === EXCHANGE_INITIATED
                  ? styles.processNameHolderBold
                  : styles.processNameHolder
              }
            >
              {exchangeInitiated && exchangeInitiated.customerFacingName}
            </div>
            <div className={styles.eieDateAndTimeHolder}>
              {exchangeInitiated && exchangeInitiated.displayDate && (
                <div className={styles.eieDateNTimeContainer}>
                  {exchangeInitiated.displayDate}
                </div>
              )}
              {exchangeInitiated && exchangeInitiated.displayTime && (
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
              {pickUpInProgress && pickUpInProgress.customerFacingName
                ? pickUpInProgress.customerFacingName
                : "Pick Up in Progress"}
            </div>
            <div className={styles.eieDateAndTimeHolder}>
              {pickUpInProgress && pickUpInProgress.displayDate && (
                <div className={styles.eieDateNTimeContainer}>
                  {pickUpInProgress.displayDate}
                </div>
              )}
              {pickUpInProgress && pickUpInProgress.displayTime && (
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
                {pickedUp && pickedUp.customerFacingName
                  ? pickedUp.customerFacingName
                  : "Picked Up"}
              </div>
              <div className={styles.eieDateAndTimeHolder}>
                {pickedUp && pickedUp.displayDate && (
                  <div className={styles.eieDateNTimeContainer}>
                    {pickedUp.displayDate}
                  </div>
                )}
                {pickedUp && pickedUp.displayTime && (
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
                {cashbackCredited && cashbackCredited.customerFacingName
                  ? cashbackCredited.customerFacingName
                  : "Cashback Credited"}
              </div>
              <div className={styles.eieDateAndTimeHolder}>
                {cashbackCredited && cashbackCredited.displayDate && (
                  <div className={styles.eieDateNTimeContainer}>
                    {cashbackCredited.displayDate}
                  </div>
                )}
                {cashbackCredited && cashbackCredited.displayTime && (
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
                  {Cancelled && Cancelled.customerFacingName
                    ? Cancelled.customerFacingName
                    : "Cancelled"}
                </div>
                <div className={styles.eieDateAndTimeHolder}>
                  {Cancelled && Cancelled.displayDate && (
                    <div className={styles.eieDateNTimeContainer}>
                      {Cancelled.displayDate}
                    </div>
                  )}
                  {Cancelled && Cancelled.displayTime && (
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
