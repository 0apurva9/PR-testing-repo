import React from "react";
import FeedComponentABPC from "./FeedComponentABPC";
import ProductImageHeader from "../../general/components/ProductImageHeader";
import Logo from "../../general/components/Logo";
import each from "lodash.foreach";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";
const env = process.env;

export default class PreAutomatedBrandProductCarousel extends React.Component {
  handleClick(url) {
    const urlSuffix = url.replace(TATA_CLIQ_ROOT, "$1");
    this.props.history.push(urlSuffix);
    this.props.setClickedElementId();
  }
  doSome(value) {
    let apiUrl = "";
    if (env.REACT_APP_STAGE === "production") {
      apiUrl = "https://www.tatacliq.com";
    }
    // let productCodes;
    // each(value.itemIds, itemId => {
    //   productCodes = `${itemId},${productCodes}`;
    // });
    // let productCodes = value.itemIds && value.itemIds.toString();
    // const url = `${apiUrl}/marketplacewebservices/v2/mpl/cms/page/getProductInfo?isPwa=true&productCodes=${productCodes}`;
    // return fetch(url)
    //   .then(response => response.json())
    //   .then(function(response) {
    //     return response;
    //   });
    let requests =
      value.itemIds &&
      value.itemIds.map(id => {
        return fetch(
          `${apiUrl}/marketplacewebservices/v2/mpl/cms/page/getProductInfo?isPwa=true&productCodes=${id}`
        );
      });

    return Promise.all(requests)
      .then(response =>
        Promise.all(
          response.map(r => {
            return r.json();
          })
        )
      )
      .then(res => {
        let list = [];
        res.forEach(item => {
          if (item && item.status !== "FAILURE") {
            list.push(item.results[0]);
          }
        });
        return { results: list };
      });
  }

  render() {
    if (this.props.homeAbcMsdData && this.props.homeAbcMsdData.length > 0) {
      return this.props.homeAbcMsdData.map((value, index) => {
        let res = this.doSome(value);
        const buttonText = this.props.feedComponentData.btnText;
        return (
          <FeedComponentABPC
            banner={
              <ProductImageHeader
                image={value.imageURL}
                description={value.description}
                logo={<Logo image={value.brandLogo} />}
                onClick={() => this.handleClick(value.webURL)}
              />
            }
            backgroundColor="#e4e4e4"
            carouselOptions={{
              buttonText,
              seeAll: () => {
                this.handleClick(value.webURL);
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
    } else {
      return null;
    }
  }
}
