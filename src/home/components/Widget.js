import React from "react";
import PropTypes from "prop-types";
import { SUCCESS } from "../../lib/constants";

export default class Widget extends React.Component {
  async componentDidMount() {
    if (
      this.props.feedComponentData.fetchURL &&
      this.props.feedComponentData.status !== SUCCESS
    ) {
      this.props.getComponentData(
        this.props.feedComponentData.fetchURL,
        this.props.positionInFeed,
        this.props.postData,
        this.props.feedComponentData.backupURL,
        this.props.feedComponentData.type,
        this.props.feedType,
        this.props.msdABPCBrandCount
      );
    }
    if (this.props.feedComponentData.type === "msdAutoDiscoverMoreComponent") {
      this.props.msdDiscoverMoreHomeComponents();
    } else if (
      this.props.feedComponentData.type ===
      "msdAutomatedBannerProductCarouselComponent"
    ) {
      this.props.msdAbcComponents();
    } else if (this.props.feedComponentData.type === "AutoWidget") {
      await this.props.automatedWidgetsForHome(
        this.props.feedComponentData.items[0]
      );
    }
  }

  render() {
    return (
      <React.Fragment>
        <span id={this.props.id} />
        {this.props.children(this.props)}
      </React.Fragment>
    );
  }
}

Widget.propTypes = {
  feedComponentData: PropTypes.object,
  positionInFeed: PropTypes.number,
  type: PropTypes.string,
  postData: PropTypes.object,
  disableGetComponentDataCall: PropTypes.bool
};

Widget.defaultProps = {
  disableGetComponentDataCall: false
};
