import * as React from "react";
import SelectReturnDate from "../../account/components/SelectReturnDate";
import * as styles from "./ReturnModesForDesktop.css";
import ReturnToStoreContainer from "../../account/containers/ReturnToStoreContainer.js";
import ReturnCliqAndPiqContainer from "../../account/containers/ReturnCliqAndPiqContainer.js";
import SelfCourierContainer from "../../account/containers/SelfCourierContainer.js";
import SelectedReasonForReturn from "../../account/components/SelectedReasonForReturn";
import { IProps, IState } from "./interface/ReturnModesForDesktop";

import {
  QUICK_DROP,
  SCHEDULED_PICKUP,
  SELF_COURIER
} from "../../lib/constants";
export default class ReturnModesForDesktop extends React.Component<
  IProps,
  IState
> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      selectedMode: ""
    };
  }
  private handleSelect(val: string) {
    this.setState({ selectedMode: val });
  }

  private isReturnModesEnabled = () => {
    const data = this.props.returnProductDetails;
    if (
      (data && data.returnModes && data.returnModes.quickDrop) ||
      (data && data.returnModes && data.returnModes.schedulePickup) ||
      (data && data.returnModes && data.returnModes.selfCourier)
    ) {
      return true;
    }
    return false;
  };

  private selectReturnMode() {
    console.log("comes");
  }
  private cancelReturnMode = () => {
    this.setState({ selectedMode: "" });
  };
  public render() {
    const data = this.props.returnProductDetails;
    return (
      <div className={styles.base}>
        <SelectedReasonForReturn
          header={"Select reason for your return"}
          titleDescription={
            this.props.selectedReasonAndCommentObj &&
            this.props.selectedReasonAndCommentObj.reason
          }
          handleCancel={() => this.props.changeReturnReason()}
        />
        {this.isReturnModesEnabled() && (
          <div className={styles.refundableModes}>
            <div className={styles.header}>
              <div className={styles.circleHolder}>
                <div className={styles.circle}>2</div>
              </div>
              Select mode of return
              <div className={styles.returnModesWithBorder}>
                {data.returnModes.quickDrop && (
                  <SelectReturnDate
                    label="Return to store"
                    selected={this.state.selectedMode === QUICK_DROP}
                    selectItem={() => {
                      this.handleSelect(QUICK_DROP);
                    }}
                  />
                )}
                {data.returnModes.schedulePickup && (
                  <SelectReturnDate
                    label="Tata CliQ Pick Up"
                    selectItem={() => {
                      this.handleSelect(SCHEDULED_PICKUP);
                    }}
                    selected={this.state.selectedMode === SCHEDULED_PICKUP}
                  />
                )}
                {data.returnModes.selfCourier && (
                  <SelectReturnDate
                    selectItem={() => {
                      this.handleSelect(SELF_COURIER);
                    }}
                    label="Self Courier"
                    selected={this.state.selectedMode === SELF_COURIER}
                  />
                )}
              </div>
              {this.state.selectedMode === QUICK_DROP && (
                <ReturnToStoreContainer
                  {...this.props}
                  selectReturnMode={() => this.selectReturnMode()}
                  cancelReturnMode={() => this.cancelReturnMode()}
                />
              )}
              {this.state.selectedMode === SCHEDULED_PICKUP && (
                <ReturnCliqAndPiqContainer
                  {...this.state}
                  {...this.props}
                  selectReturnMode={() => this.selectReturnMode()}
                  cancelReturnMode={() => this.cancelReturnMode()}
                />
              )}
              {this.state.selectedMode === SELF_COURIER && (
                <SelfCourierContainer {...this.state} {...this.props} />
              )}
            </div>

            {!this.isReturnModesEnabled() && (
              <div className={styles.text}>
                sorry we are not able to process your request, contact customer
                care 90291 08282
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
