import React from "react";
import FeedComponent from "./FeedComponent";
import PropTypes from "prop-types";
import ProductImageHeader from "../../general/components/ProductImageHeader";
import { transformData } from "./utils.js";
export default class BannerProductCarousal extends React.Component {
  handleClick() {
    if (this.props.seeAll) {
      this.props.seeAll();
    }
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
          <ProductImageHeader
            image={feedComponentData.imageURL}
            name={feedComponentData.title}
            label={feedComponentData.description}
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
BannerProductCarousal.propTypes = {
  seeAll: PropTypes.func,
  bannerImage: PropTypes.string,
  bannerHeading: PropTypes.string,
  bannerDescription: PropTypes.string
};
