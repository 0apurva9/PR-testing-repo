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

export const typeComponentMapping = {
  plpBannerComponent: props => <PlpBannerComponent {...props} />,
  plpShortBannerComponent: props => <PlpBannerComponent {...props} />,
  plpBannerComponent_Monetization: props => (
    <PlpBannerComponentMonetization {...props} />
  ),
  plpShortBannerComponent_Monetization: props => (
    <PlpBannerComponentMonetization {...props} />
  )
};

const typeKeyMapping = {
  plpBannerComponent: "plpBannerComponent"
};

class PlpBannerFeed extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const feedData = this.props.plpFeedData[0];
    let index = 0;
    let props = {
      positionInFeed: index,
      key: index,
      id: `Feed-${index}`,
      type: typeKeyMapping[feedData.type],
      postData: feedData.postParams,
      feedType: SECONDARY_FEED_TYPE
    };
    console.log("1===================", feedData.type);
    return (
      typeComponentMapping[feedData.type] && (
        <WidgetContainer {...props}>
          {typeComponentMapping[feedData.type] &&
            typeComponentMapping[feedData.type]}
        </WidgetContainer>
      )
    );
  }
}

export default PlpBannerFeed;
