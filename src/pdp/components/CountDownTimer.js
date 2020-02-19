import React, { Component } from "react";
import styles from "./CountDownTimer.css";

export default class Timer extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    hours: 0,
    minutes: 0,
    seconds: 0
  };

  convertToHrsMinsSecs = totalSeconds => {
    let dateObj, hours, minutes, seconds;
    dateObj = new Date(totalSeconds * 1000);
    hours = parseInt(dateObj.getUTCHours().toString());
    minutes = parseInt(dateObj.getUTCMinutes().toString());
    seconds = parseInt(dateObj.getSeconds().toString());
    this.setState({
      hours: hours,
      minutes: minutes,
      seconds: seconds
    });
  };

  componentDidMount() {
    this.convertToHrsMinsSecs(this.props.cutOffSeconds);
    this.myInterval = setInterval(() => {
      const { hours, seconds, minutes } = this.state;

      if (seconds > 0) {
        this.setState(({ seconds }) => ({
          seconds: seconds - 1
        }));
      }
      if (seconds === 0) {
        if (minutes === 0) {
          if (hours === 0) {
            clearInterval(this.myInterval);
          } else {
            this.setState(({ hours }) => ({
              hours: hours - 1,
              minutes: 59
            }));
          }
        } else {
          this.setState(({ minutes }) => ({
            minutes: minutes - 1,
            seconds: 59
          }));
        }
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  render() {
    let { hours, minutes, seconds } = this.state;
    return (
      <div>
        {minutes === 0 && seconds === 0 ? null : (
          <p className={styles.pdpTimeTxt}>
            Order within{" "}
            <span>
              {`${hours} hrs`}{" "}
              {minutes < 10 ? `0${minutes} mins` : `${minutes} mins`}
            </span>
          </p>
        )}
      </div>
    );
  }
}
