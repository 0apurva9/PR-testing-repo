import React from "react";
import FeedComponent from "./FeedComponent";
import ProductVideo from "../../general/components/ProductVideo";
import { transformData } from "./utils.js";
export default class VideoProductCarousel extends React.Component {
  handleClick() {
    this.props.history.push("/productListings");
  }
  render() {
    const feedComponentData = this.props.feedComponentData.data;
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
