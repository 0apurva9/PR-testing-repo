import React from "react";
import FeedComponent from "./FeedComponent";
import PropTypes from "prop-types";
import ProductImageHeader from "../../general/components/ProductImageHeader";
import { transformData, transformItem } from "./utils.js";
import { PRODUCT_LISTINGS } from "../../lib/constants";
export default class BannerProductCarousal extends React.Component {
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
