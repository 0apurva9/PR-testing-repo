import React from "react";
import styles from "./FlashSaleLimitedTimeOfferComponent.css";
import Button from "../../general/components/Button.js";
import TimerCounterForDesktop from "./TimerCounterForDesktop.js";
export default class FlashSaleLimitedTimeOfferComponent extends React.Component {
  onClickViewAll() {
    if (this.props.onClick) {
      this.props.onClick();
    }
  }
  onComplete = () => {
    if (this.props.onComplete) {
      this.props.onComplete();
    }
  };
  render() {
    return (
      <div className={styles.base}>
        <div className={styles.limitedTimeHolder}>
          <div className={styles.limitedTimeHolderWithText}>
            <div className={styles.limitedTimeText}>
              Grab these offers for a limited time only!
            </div>
            <div className={styles.countDownTimerHolder}>
              <TimerCounterForDesktop
                endTime={this.props.endTime}
                onComplete={this.onComplete}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
FlashSaleLimitedTimeOfferComponent.defaultProps = {
  buttonText: "View all"
};
