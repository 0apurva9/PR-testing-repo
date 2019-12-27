import React from "react";
import styles from "./OrderStatusHorizontal.css";
const REQUEST_CREATED = "REQUEST_CREATED";
const ENGINEER_ASSIGNED = "ENGINEER_ASSIGNED";
const REQUEST_RESCHEDULE = "REQUEST_RESCHEDULE";
const REQUEST_CANCELLED = "REQUEST_CANCELLED";
const REQUEST_COMPLETED = "REQUEST_COMPLETED";

export default class InstallationExperience extends React.Component {
  render() {
    if (!this.props.installationDisplayMsg) {
      return null;
    }

    let completedStatus = [];
    const completedSteps = this.props.installationDisplayMsg.map(val => {
      //get current completed steps
      if (val.value.status === "Completed") {
        completedStatus.push(val.key);
      }
      //get all steps
      return val.key;
    });
    //get current active completed step
    const activeCompletedStatus = completedStatus[completedStatus.length - 1];

    const requestCreated = this.props.installationDisplayMsg.find(val => {
      return val.key === REQUEST_CREATED;
    });
    const engineerAssigned = this.props.installationDisplayMsg.find(val => {
      return val.key === ENGINEER_ASSIGNED;
    });
    const requestReschedule = this.props.installationDisplayMsg.find(val => {
      return val.key === REQUEST_RESCHEDULE;
    });
    const requestCancelled = this.props.installationDisplayMsg.find(val => {
      return val.key === REQUEST_CANCELLED;
    });
    const requestCompleted = this.props.installationDisplayMsg.find(val => {
      return val.key === REQUEST_COMPLETED;
    });

    //request created
    let requestCreatedDate = "";
    let requestCreatedTime = "";
    let requestCreatedCallout = "";
    let requestCreatedStatus = "";
    let requestCreatedCustomerFacingName = "Request Created";

    if (requestCreated && requestCreated.value) {
      requestCreatedCustomerFacingName =
        requestCreated.value.customerFacingName;
      requestCreatedStatus = requestCreated.value.status;
      requestCreatedDate = requestCreated.value.date;
      requestCreatedTime = requestCreated.value.time;
      requestCreatedCallout = requestCreated.value.callout;
    }

    //engineer assigned
    let engineerAssignedDate = "";
    let engineerAssignedTime = "";
    let engineerAssignedCallout = "";
    let engineerAssignedStatus = "";
    let engineerAssignedCustomerFacingName = "Engineer Assigned";

    if (engineerAssigned && engineerAssigned.value) {
      engineerAssignedCustomerFacingName =
        engineerAssigned.value.customerFacingName;
      engineerAssignedStatus = engineerAssigned.value.status;
      engineerAssignedDate = engineerAssigned.value.date;
      engineerAssignedTime = engineerAssigned.value.time;
      engineerAssignedCallout = engineerAssigned.value.callout;
    }

    //Request Reschedule
    let requestRescheduleDate = "";
    let requestRescheduleTime = "";
    let requestRescheduleCallout = "";
    let requestRescheduleStatus = "";
    let requestRescheduleCustomerFacingName = "Request Reschedule";

    if (requestReschedule && requestReschedule.value) {
      requestRescheduleCustomerFacingName =
        requestReschedule.value.customerFacingName;
      requestRescheduleStatus = requestReschedule.value.status;
      requestRescheduleDate = requestReschedule.value.date;
      requestRescheduleTime = requestReschedule.value.time;
      requestRescheduleCallout = requestReschedule.value.callout;
    }

    //Request Cancelled
    let requestCancelledDate = "";
    let requestCancelledTime = "";
    let requestCancelledCallout = "";
    let requestCancelledStatus = "";
    let requestCancelledCustomerFacingName = "Request Cancelled";

    if (requestCancelled && requestCancelled.value) {
      requestCancelledCustomerFacingName =
        requestCancelled.value.customerFacingName;
      requestCancelledStatus = requestCancelled.value.status;
      requestCancelledDate = requestCancelled.value.date;
      requestCancelledTime = requestCancelled.value.time;
      requestCancelledCallout = requestCancelled.value.callout;
    }

    //Request Completed
    let requestCompletedDate = "";
    let requestCompletedTime = "";
    let requestCompletedCallout = "";
    let requestCompletedStatus = "";
    let requestCompletedCustomerFacingName = "Request Completed";

    if (requestCompleted && requestCompleted.value) {
      requestCompletedCustomerFacingName =
        requestCompleted.value.customerFacingName;
      requestCompletedStatus = requestCompleted.value.status;
      requestCompletedDate = requestCompleted.value.date;
      requestCompletedTime = requestCompleted.value.time;
      requestCompletedCallout = requestCompleted.value.callout;
    }

    return (
      <div className={styles.base}>
        <React.Fragment>
          <div
            className={
              requestCreatedStatus === "Pending"
                ? styles.stepInactive
                : styles.step
            }
          >
            <div
              className={
                requestCreatedStatus === "Pending"
                  ? styles.check
                  : styles.checkActive
              }
            />
            <div
              className={
                activeCompletedStatus === REQUEST_CREATED
                  ? styles.processNameHolderBold
                  : styles.processNameHolder
              }
            >
              {requestCreatedCustomerFacingName}
            </div>
            <div className={styles.eieDateAndTimeHolder}>
              {requestCreatedDate && (
                <div className={styles.eieDateNTimeContainer}>
                  {requestCreatedDate}
                </div>
              )}
              {requestCreatedTime && (
                <div className={styles.eieDateNTimeContainer}>
                  {requestCreatedTime}
                </div>
              )}
              {requestCreatedStatus === "Completed" && (
                <div className={styles.eieStatus}>{requestCreatedCallout}</div>
              )}
            </div>
          </div>

          <div
            className={
              engineerAssignedStatus === "Pending"
                ? styles.stepInactive
                : styles.step
            }
          >
            <div
              className={
                engineerAssignedStatus === "Pending"
                  ? styles.check
                  : styles.checkActive
              }
            />
            <div
              className={
                activeCompletedStatus === ENGINEER_ASSIGNED
                  ? styles.processNameHolderBold
                  : styles.processNameHolder
              }
            >
              {engineerAssignedCustomerFacingName}
            </div>
            <div className={styles.eieDateAndTimeHolder}>
              {engineerAssignedDate && (
                <div className={styles.eieDateNTimeContainer}>
                  {engineerAssignedDate}
                </div>
              )}
              {engineerAssignedTime && (
                <div className={styles.eieDateNTimeContainer}>
                  {engineerAssignedTime}
                </div>
              )}
              {engineerAssignedStatus === "Completed" && (
                <div className={styles.eieStatus}>
                  {engineerAssignedCallout}
                </div>
              )}
            </div>
          </div>

          {!completedSteps.includes(REQUEST_COMPLETED) &&
            completedSteps.includes(REQUEST_RESCHEDULE) && (
              <div
                className={
                  requestRescheduleStatus === "Pending"
                    ? styles.stepInactive
                    : styles.step
                }
              >
                <div
                  className={
                    requestRescheduleStatus === "Pending"
                      ? styles.check
                      : styles.checkActive
                  }
                />
                <div
                  className={
                    activeCompletedStatus === REQUEST_RESCHEDULE
                      ? styles.processNameHolderBold
                      : styles.processNameHolder
                  }
                >
                  {requestRescheduleCustomerFacingName}
                </div>
                <div className={styles.eieDateAndTimeHolder}>
                  {requestRescheduleDate && (
                    <div className={styles.eieDateNTimeContainer}>
                      {requestRescheduleDate}
                    </div>
                  )}
                  {requestRescheduleTime && (
                    <div className={styles.eieDateNTimeContainer}>
                      {requestRescheduleTime}
                    </div>
                  )}
                  {requestRescheduleStatus === "Completed" && (
                    <div className={styles.eieStatus}>
                      {requestRescheduleCallout}
                    </div>
                  )}
                </div>
              </div>
            )}

          {!completedSteps.includes(REQUEST_COMPLETED) &&
            completedSteps.includes(REQUEST_CANCELLED) && (
              <div
                className={
                  requestCancelledStatus === "Pending"
                    ? styles.stepInactive
                    : styles.step
                }
              >
                <div
                  className={
                    requestCancelledStatus === "Pending"
                      ? styles.check
                      : styles.checkActive
                  }
                />
                <div
                  className={
                    activeCompletedStatus === REQUEST_CANCELLED
                      ? styles.processNameHolderBold
                      : styles.processNameHolder
                  }
                >
                  {requestCancelledCustomerFacingName}
                </div>
                <div className={styles.eieDateAndTimeHolder}>
                  {requestCancelledDate && (
                    <div className={styles.eieDateNTimeContainer}>
                      {requestCancelledDate}
                    </div>
                  )}
                  {requestCancelledTime && (
                    <div className={styles.eieDateNTimeContainer}>
                      {requestCancelledTime}
                    </div>
                  )}
                  {requestCancelledStatus === "Completed" && (
                    <div className={styles.eieStatus}>
                      {requestCancelledCallout}
                    </div>
                  )}
                </div>
              </div>
            )}

          {!completedSteps.includes(REQUEST_RESCHEDULE) &&
            !completedSteps.includes(REQUEST_CANCELLED) && (
              <div
                className={
                  requestCompletedStatus === "Pending"
                    ? styles.stepInactive
                    : styles.step
                }
              >
                <div
                  className={
                    requestCompletedStatus === "Pending"
                      ? styles.check
                      : styles.checkActive
                  }
                />
                <div
                  className={
                    activeCompletedStatus === REQUEST_COMPLETED
                      ? styles.processNameHolderBold
                      : styles.processNameHolder
                  }
                >
                  {requestCompletedCustomerFacingName}
                </div>
                <div className={styles.eieDateAndTimeHolder}>
                  {requestCompletedDate && (
                    <div className={styles.eieDateNTimeContainer}>
                      {requestCompletedDate}
                    </div>
                  )}
                  {requestCompletedTime && (
                    <div className={styles.eieDateNTimeContainer}>
                      {requestCompletedTime}
                    </div>
                  )}
                  {requestCompletedStatus === "Completed" && (
                    <div className={styles.eieStatus}>
                      {requestCompletedCallout}
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
