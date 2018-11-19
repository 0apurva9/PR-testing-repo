import React from "react";
import Observer from "@researchgate/react-intersection-observer";

export default class VisibilityChild extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  handleIntersection = event => {
    if (this.props.visible) {
      this.setState({ visible: true });
    } else {
      this.setState({ visible: event.isIntersecting });
    }
  };
  render() {
    const options = {
      onChange: this.handleIntersection,
      rootMargin: "0% 0% -25%"
    };
    return !this.state.visible ? (
      <Observer {...options}>
        <div style={{ minHeight: 50 }} />
      </Observer>
    ) : (
      this.props.children
    );
  }
}
