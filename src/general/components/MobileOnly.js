import React from "react";
import MediaQuery from "react-responsive";
export default class DesktopOnly extends React.Component {
  render() {
    return (
      <MediaQuery
        query="(max-device-width: 1024px)"
        values={{ deviceWidth: 1024 }}
      >
        {this.props.children}
      </MediaQuery>
    );
  }
}
