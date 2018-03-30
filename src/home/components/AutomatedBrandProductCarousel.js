import React from "react";
import FeedComponent from "./FeedComponent";
import PropTypes from "prop-types";
import ProductImageHeader from "../../general/components/ProductImageHeader";
import Logo from "../../general/components/Logo";
import { transformData } from "./utils.js";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";

export default class AutomatedBrandProductCarousel extends React.Component {
  handleClick() {
    const urlSuffix = this.props.feedComponentData.data[0].webURL.replace(
      TATA_CLIQ_ROOT,
      "$1"
    );
    this.props.history.push(urlSuffix);
  }

  componentDidUpdate() {
    const data =
      this.props.feedComponentData.data && this.props.feedComponentData.data[0];
    if (data) {
      if (
        this.props.feedComponentData.items.length === 0 &&
        data.itemIds &&
        data.itemIds.length > 0
      ) {
        this.props.getItems(this.props.positionInFeed, [
          "MP000000000155861",
          "MP000000000114700",
          "MP000000000169248",
          "MP000000000113243"
        ]);
      }
    }
  }

  render() {
    const componentData =
      this.props.feedComponentData.data && this.props.feedComponentData.data[0];
    console.log(componentData);
    let carouselData;
    if (!componentData) {
      return null;
    }

    if (this.props.feedComponentData.items instanceof Array) {
      carouselData = this.props.feedComponentData.items.map(transformData);
    }

    const buttonText = this.props.feedComponentData.btnText;
    return componentData ? (
      <FeedComponent
        banner={
          <ProductImageHeader
            image={componentData.imageURL}
            description={componentData.description}
            logo={<Logo image={componentData.brandLogo} />}
          />
        }
        backgroundColor="#e4e4e4"
        carouselOptions={{
          buttonText,
          seeAll: () => {
            this.handleClick();
          }
        }}
        data={carouselData}
      />
    ) : null;
  }
}
AutomatedBrandProductCarousel.propTypes = {
  bannerImage: PropTypes.string,
  bannerLogo: PropTypes.string,
  bannerDescription: PropTypes.string,
  seeAll: PropTypes.func
};
