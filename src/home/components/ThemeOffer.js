import React from "react";
import FeedComponent from "./FeedComponent";
import PropTypes from "prop-types";
import concat from "lodash.concat";
import { transformData } from "./utils.js";
import MediaQuery from "react-responsive";
import ProductImageHeaderDesktop from "../../general/components/ProductImageHeaderDesktop.js";
import ThemOfferComponentDesktop from "./ThemOfferComponentDesktop.js";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";
import { widgetsTracking } from "../../lib/adobeUtils.js";
const OFFER_AND_ITEM_LIMIT = 10;

export default class ThemeOffer extends React.Component {
  handleClick = webUrl => {
    widgetsTracking({
      widgetName: "Theme offers component",
      sourceOfWidget: this.props.postData && this.props.postData.widgetPlatform
    });
    if (webUrl) {
      const urlSuffix = webUrl.replace(TATA_CLIQ_ROOT, "$1").trim();
      this.props.history.push(urlSuffix);
      // this.props.history.push({
      //   pathname: urlSuffix,
      //   state: {
      //     componentName: "Theme offers component"
      //   }
      // });
      if (this.props.setClickedElementId) {
        this.props.setClickedElementId();
      }
    }
  };
  handleClickOnLink = event => {
    event.preventDefault();
  };
  componentDidUpdate() {
    const offers = this.props.feedComponentData.offers;

    const itemIds = this.props.feedComponentData.itemIds;
    let itemIdsToAdd;

    if (offers && offers.length < OFFER_AND_ITEM_LIMIT && itemIds) {
      const numberOfItemsToTake = OFFER_AND_ITEM_LIMIT - offers.length;
      itemIdsToAdd = itemIds.slice(0, numberOfItemsToTake);
      if (
        itemIds.length > 0 &&
        this.props.feedComponentData.items.length === 0
      ) {
        this.props.getItems(this.props.positionInFeed, itemIdsToAdd);
      }
    }
  }

  render() {
    let themeData = [],
      items = [];
    const { feedComponentData, ...rest } = this.props;
    if (!feedComponentData) {
      return null;
    }
    if (feedComponentData.items && feedComponentData.items instanceof Array) {
      items = feedComponentData.items.map(transformData);
    }

    let offers = [];
    if (feedComponentData.offers) {
      offers = feedComponentData.offers.map(offer => {
        return transformData(offer);
      });
    }

    themeData = concat(offers, items);
    return (
      <React.Fragment>
        <MediaQuery query="(max-device-width: 1024px)">
          <FeedComponent
            backgroundImage={feedComponentData.backgroundImageURL}
            backgroundColor={feedComponentData.backgroundHexCode}
            carouselOptions={{
              header: feedComponentData.title,
              buttonText: feedComponentData.btnText,
              isWhite: true,
              seeAll: () => {
                this.handleClick();
              }
            }}
            {...rest}
            data={themeData}
            sourceOfWidget={
              this.props.postData && this.props.postData.widgetPlatform
            }
          />
        </MediaQuery>
        <MediaQuery query="(min-device-width: 1025px)">
          <React.Fragment>
            <ThemOfferComponentDesktop
              carouselOptions={{
                header: feedComponentData.title,
                buttonText: feedComponentData.btnText,
                seeAll: val => {
                  this.handleClick(this.props.feedComponentData.webURL);
                }
              }}
              banner={
                <a
                  href={this.props.feedComponentData.webURL}
                  target="_blank"
                  onClick={event => this.handleClickOnLink(event)}
                >
                  <ProductImageHeaderDesktop
                    backgroundColor={feedComponentData.backgroundHexCode}
                    backgroundImage={feedComponentData.backgroundImageURL}
                    onClick={val =>
                      this.handleClick(this.props.feedComponentData.webURL)
                    }
                  />
                </a>
              }
              {...rest}
              data={themeData}
            />
          </React.Fragment>
        </MediaQuery>
      </React.Fragment>
    );
  }
}
ThemeOffer.propTypes = {
  header: PropTypes.string,
  seeAll: PropTypes.func,
  buttonText: PropTypes.string,
  feedComponentData: PropTypes.object
};
