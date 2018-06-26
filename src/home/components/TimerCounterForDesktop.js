import React from "react";
import Countdown from "react-countdown-now";
import PropTypes from "prop-types";
import styles from "./TimerCounterForDesktop.css";
const renderTimer = ({ days, hours, minutes, seconds }) => {
  const finalHour = days * 24 + parseInt(hours, 10);
  return (
    <div className={styles.base}>
      <span className={styles.countDownTime}>
        <div className={styles.time}>{finalHour}</div>
        <div className={styles.text}>Hrs</div>
      </span>
      <span className={styles.countDownTime}>
        <div className={styles.time}>{minutes}</div>
        <div className={styles.text}>Mins</div>
      </span>
      <span className={styles.countDown}>
        <div className={styles.time}>{seconds} </div>
        <div className={styles.text}>Secs</div>
      </span>
    </div>
  );
};
export default class TimerCounterForDesktop extends React.Component {
  render() {
    let endTime = new Date(this.props.endTime);
    return endTime ? (
      <Countdown
        date={endTime}
        renderer={renderTimer}
        onComplete={this.props.onComplete}
      />
    ) : null;
  }
}
TimerCounterForDesktop.propTypes = {
  endTime: PropTypes.string,
  onComplete: PropTypes.func
};
