import React, { Component } from "react";
import PropTypes from "prop-types";
import Loadable from "react-loadable";
import WidgetContainer from "../containers/WidgetContainer";
import { SECONDARY_FEED_TYPE } from "../../lib/constants";

const PlpBannerComponent = Loadable({
  loader: () => import("../../staticpage/components/PlpBannerComponent.js"),
  loading() {
    return <div />;
  }
});

const PlpBannerComponentMonetization = Loadable({
  loader: () =>
    import("../../staticpage/components/PlpBannerComponentMonetization.js"),
  loading() {
    return <div />;
  }
});

// export const typeComponentMapping = {
//   plpBannerComponent: (
//     <PlpBannerComponent {...this.props} />
//   ),
//   plpShortBannerComponent: (
//     <PlpBannerComponent {...this.props} />
//   ),
//   plpBannerComponent_Monetization: (
//     <PlpBannerComponentMonetization {...this.props} />
//   ),
//   plpShortBannerComponent_Monetization: (
//     <PlpBannerComponentMonetization {...this.props} />
//   )
// };

const typeKeyMapping = {
  plpBannerComponent: "plpBannerComponent",
  plpShortBannerComponent: "plpShortBannerComponent"
};

class PlpBannerFeed extends Component {
  constructor(props) {
    super(props);
  }

  renderFeedComponent(feedData, index) {
    const typeComponentMapping = {
      plpBannerComponent: (
        <PlpBannerComponent feedComponentData={feedData} {...this.props} />
      ),
      plpShortBannerComponent: (
        <PlpBannerComponent feedComponentData={feedData} {...this.props} />
      ),
      plpBannerComponent_Monetization: (
        <PlpBannerComponentMonetization
          feedComponentData={feedData}
          {...this.props}
        />
      ),
      plpShortBannerComponent_Monetization: (
        <PlpBannerComponentMonetization
          feedComponentData={feedData}
          {...this.props}
        />
      )
    };

    if (typeComponentMapping[feedData.type]) {
      return typeComponentMapping[feedData.type];
    } else {
      return null;
    }
  }

  renderFeedComponents() {
    return (
      this.props.plpFeedData &&
      this.props.plpFeedData.map((feedData, i) => {
        return this.renderFeedComponent(feedData, this.props.index);
      })
    );
  }

  render() {
    return <React.Fragment>{this.renderFeedComponents()}</React.Fragment>;
  }
}

export default PlpBannerFeed;
