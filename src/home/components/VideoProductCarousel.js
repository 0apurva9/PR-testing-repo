import React from "react";
import FeedComponent from "./FeedComponent";
import { transformData } from "./utils.js";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";
import { checkUserAgentIsMobile } from "../../lib/UserAgent.js";
import Loadable from "react-loadable";
const ProductVideo = Loadable({
  loader: () => import("../../general/components/ProductVideo"),
  loading() {
    return <div />;
  }
});
export default class VideoProductCarousel extends React.Component {
  handleClick() {
    const urlSuffix = this.props.feedComponentData.webURL.replace(
      TATA_CLIQ_ROOT,
      "$1"
    );
    this.props.history.push(urlSuffix);
    this.props.setClickedElementId();
  }

  componentDidUpdate() {
    const data = this.props.feedComponentData;

    if (
      data &&
      data.itemIds &&
      data.items.length === 0 &&
      data.itemIds.length > 0
    ) {
      this.props.getItems(this.props.positionInFeed, data.itemIds);
    }
  }

  render() {
    const feedComponentData = this.props.feedComponentData;
    if (!feedComponentData) {
      return null;
    }
    let data = [];
    if (feedComponentData.items) {
      data = feedComponentData.items.map(transformData);
    }
    return (
      <FeedComponent
        banner={
          <ProductVideo
            url={feedComponentData.videoURL}
            image={feedComponentData.imageURL}
            logo={feedComponentData.brandLogo}
            description={feedComponentData.description}
            postData={this.props.postData}
          />
        }
        carouselOptions={{
          buttonText: feedComponentData.btnText,
          header: checkUserAgentIsMobile() ? null : feedComponentData.title,
          seeAll: () => {
            this.handleClick();
          }
        }}
        setClickedElementId={this.props.setClickedElementId}
        data={data}
        widgetName={"Video product carousel"}
        sourceOfWidget={
          this.props.postData && this.props.postData.widgetPlatform
        }
      />
    );
  }
}
