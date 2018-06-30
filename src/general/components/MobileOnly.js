import React from "react";
import MediaQuery from "react-responsive";
export default class DesktopOnly extends React.Component {
  render() {
    return (
      <MediaQuery query="(max-device-width: 1024px)">
        {this.props.children}
      </MediaQuery>
    );
  }
}
