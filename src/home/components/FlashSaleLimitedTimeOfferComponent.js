import React from "react";
import styles from "./FlashSaleLimitedTimeOfferComponent.css";
import Button from "../../general/components/Button.js";
export default class FlashSaleLimitedTimeOfferComponent extends React.Component {
  onClickViewAll() {
    if (this.props.onClick) {
      this.props.onClick();
    }
  }
  render() {
    return (
      <div className={styles.base}>
        <div className={styles.limitedTimeHolder}>
          <div className={styles.limitedTimeText}>
            Grab these offers for a limited time only!
          </div>
          <div className={styles.countDownTimerHolder}>
            <div className={styles.countDownTime}>25</div>
            <div className={styles.countDownTime}>45</div>
            <div className={styles.countDown}>56</div>
          </div>
          <div className={styles.buttonHolder}>
            <div className={styles.button}>
              <Button
                type="hollow"
                color="#fff"
                label={this.props.buttonText}
                width={130}
                onClick={() => this.onClickViewAll()}
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
