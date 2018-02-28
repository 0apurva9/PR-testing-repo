import React from "react";
import FeedComponent from "./FeedComponent";
import ProductVideo from "../../general/components/ProductVideo";
import { transformData } from "./utils.js";
import { PRODUCT_LISTINGS } from "../../lib/constants";
export default class VideoProductCarousel extends React.Component {
  handleClick() {
    this.props.history.push(PRODUCT_LISTINGS);
  }

  componentDidUpdate() {
    const data = this.props.feedComponentData;
    if (data.items.length === 0 && data.itemIds && data.itemIds.length > 0) {
      this.props.getItems(this.props.positionInFeed, data.itemIds);
    }
  }

  render() {
    const feedComponentData = this.props.feedComponentData;
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
          />
        }
        backgroundColor="#e4e4e4"
        carouselOptions={{
          buttonText: "See All",
          seeAll: () => {
            this.handleClick();
          }
        }}
        data={data}
      />
    );
  }
}
