import React from "react";

export default class OrderCountdown extends React.Component {
  constructor(props) {
    super(props);
    this.difference = 4;
    this.state = {
      hrs: 0,
      mins: 0,
      sec: 0
    };
  }

  componentDidMount() {
    // update every second
    this.interval = setInterval(() => {
      const cutOffTime = this.calculateCountdown(this.props.cutOffTime);
      if (cutOffTime) {
        this.setState(cutOffTime);
      } else {
        this.stop();
      }
    }, 1000);
  }

  componentWillUnmount() {
    this.stop();
  }

  calculateCountdown(cutOffTime) {
    let d = new Date();
    let [hrs, mins, sec] = cutOffTime.split(":");
    hrs ? d.setHours(hrs) : d.setHours("00");
    mins ? d.setMinutes(mins) : d.setMinutes("00");
    sec ? d.setSeconds(sec) : d.setSeconds("00");

    let diff =
      (Date.parse(new Date(d.toString())) - Date.parse(new Date())) / 1000;

    // clear countdown when time difference between cut-off time and current time is reached
    if (diff <= 0) return false;

    const timeLeft = {
      hrs: 0,
      mins: 0,
      sec: 0
    };

    // calculate time difference between cut-off time and current time.
    // if (diff >= 86400) { // 24 * 60 * 60
    //   timeLeft.days = Math.floor(diff / 86400);
    //   diff -= timeLeft.days * 86400;
    // }
    if (diff >= 3600) {
      // 60 * 60
      timeLeft.hrs = Math.floor(diff / 3600);
      diff -= timeLeft.hrs * 3600;
    }
    if (timeLeft.hrs >= this.difference) return false;
    if (diff >= 60) {
      timeLeft.mins = Math.floor(diff / 60);
      diff -= timeLeft.mins * 60;
    }
    timeLeft.sec = diff;

    return timeLeft;
  }

  stop() {
    clearInterval(this.interval);
  }

  render() {
    if (this.state.hrs || this.state.mins) {
      return (
        <div>
          Order within {this.state.hrs ? this.state.hrs + " hours" : null}{" "}
          {this.state.mins ? this.state.mins + " mins" : null}
        </div>
      );
    } else {
      return null;
    }
  }
}
