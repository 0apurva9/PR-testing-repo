import React from "react";

export default class Countdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hrs: 0,
      mins: 0
    };
  }

  render() {
    if (this.state.hrs || this.state.mins) {
      return (
        <div>
          {this.state.hrs} {this.state.mins}
        </div>
      );
    }
  }
}
