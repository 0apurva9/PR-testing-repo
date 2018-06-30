import React from "react";
import MediaQuery from "react-responsive";
export default class DesktopOnly extends React.Component {
  render() {
    return (
      <MediaQuery query="(min-device-width: 1025px)">
        {this.props.children}
      </MediaQuery>
    );
  }
}
