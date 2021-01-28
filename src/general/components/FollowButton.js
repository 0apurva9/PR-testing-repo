import React, { Component } from "react";
import MediaQuery from "react-responsive";
import CoreButton from "./Button";
import Icon from "../../xelpmoc-core/Icon";
import CircleIconWhite from "./img/circle_plus_white.svg";
import CircleIconBlack from "./img/circle_plus_black.svg";

export default class FollowButton extends Component {
  render() {
    const { ...other } = this.props;
    return (
      <div>
        <MediaQuery query="(min-device-width: 1025px)">
          <CoreButton
            width={180}
            type={"secondary"}
            label={"Start following"}
            icon={{
              element: <Icon image={CircleIconBlack} size={20} />,
              size: 20,
              offset: 10
            }}
            {...other}
          />
        </MediaQuery>
        <MediaQuery query="(max-device-width:1024px)">
          <CoreButton
            width={180}
            type={"primary"}
            label={"Start following"}
            icon={{
              element: <Icon image={CircleIconWhite} size={20} />,
              size: 20,
              offset: 10
            }}
            {...other}
          />
        </MediaQuery>
      </div>
    );
  }
}
