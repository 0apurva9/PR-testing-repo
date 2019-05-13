import React from "react";
import FeedComponentABPC from "./FeedComponentABPC";
import ProductImageHeader from "../../general/components/ProductImageHeader";
import Logo from "../../general/components/Logo";
import each from "lodash.foreach";
const env = process.env;

export default class PreAutomatedBrandProductCarousel extends React.Component {
  doSome(value) {
    let apiUrl = "https://www.tatacliq.com";
    let productCodes;
    each(value.itemIds, itemId => {
      productCodes = `${itemId},${productCodes}`;
    });
    const url = `${apiUrl}/marketplacewebservices/v2/mpl/cms/page/getProductInfo?isPwa=true&productCodes=${productCodes}`;
    return fetch(url)
      .then(response => response.json())
      .then(function(response) {
        return response;
      });
  }

  render() {
    return this.props.feedComponentData.data.map((value, index) => {
      let res = this.doSome(value);
      const buttonText = this.props.feedComponentData.btnText;
      return (
        <FeedComponentABPC
          banner={
            <ProductImageHeader
              image={value.imageURL}
              description={value.description}
              logo={<Logo image={value.brandLogo} />}
            />
          }
          backgroundColor="#e4e4e4"
          carouselOptions={{
            buttonText,
            seeAll: () => {
              this.handleClick();
            }
          }}
          widgetName={"Automated Brand Product Carousal"}
          setClickedElementId={this.props.setClickedElementId}
          data={res}
          sourceOfWidget={
            this.props.postData && this.props.postData.widgetPlatform
          }
        />
      );
    });
  }
}
