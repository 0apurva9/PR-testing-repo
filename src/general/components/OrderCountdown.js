import React from "react";

export default class OrderCountdown extends React.Component {
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
    } else {
      return null;
    }
  }
}
