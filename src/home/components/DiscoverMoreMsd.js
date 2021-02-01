import React from "react";
import DiscoverMoreL1ForDesktopMsd from "./DiscoverMoreL1ForDesktopMsd";
import DiscoverMoreL3DesktopMsd from "./DiscoverMoreL3DesktopMsd.js";
import PropTypes from "prop-types";

export default class DiscoverMoreMsd extends React.Component {
  render() {
    if (
      this.props.homeMsdData &&
      this.props.homeMsdData[0] &&
      this.props.homeMsdData[0].length > 0
    ) {
      if (this.props.feedComponentData.category === "L3") {
        return (
          <DiscoverMoreL3DesktopMsd
            {...this.props}
            feedComponentData={this.props.feedComponentData}
            setClickedElementId={this.props.setClickedElementId}
            history={this.props.history}
          />
        );
      } else {
        return (
          <DiscoverMoreL1ForDesktopMsd
            homeMsdData={this.props.homeMsdData}
            history={this.props.history}
            feedComponentData={this.props.feedComponentData}
            setClickedElementId={this.props.setClickedElementId}
          />
        );
      }
    }

    return null;
  }
}

DiscoverMoreMsd.propTypes = {
  feedComponentData: PropTypes.shape({
    title: PropTypes.string,
    category: PropTypes.string,
    data: PropTypes.shape({
      data: PropTypes.arrayOf(
        PropTypes.shape({
          imageURL: PropTypes.string,
          title: PropTypes.string
        })
      )
    })
  }),
  history: PropTypes.object,
  setClickedElementId: PropTypes.func,
  homeMsdData: PropTypes.array
};
