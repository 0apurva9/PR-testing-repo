import React from "react";
import BrandLandingPageContainer from "../../blp/containers/BrandLandingPageContainer";
import { Redirect } from "react-router";
import MDSpinner from "react-md-spinner";
import { BLP_OR_CLP_FEED_TYPE } from "../../lib/constants";

export const CATEGORY_REGEX = /c-msh*/;
export const BRAND_REGEX = /c-mbh*/;
export const CATEGORY_CAPTURE_REGEX = /c-msh([a-zA-Z0-9]+)/;
export const BRAND_CAPTURE_REGEX = /c-mbh([a-zA-Z0-9])/;
export const BRAND_CATEGORY_PREFIX = "c-";

export default class PlpBrandCategoryWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageType: props.location.pathname,
      redirectToPlp: false
    };
  }

  componentWillMount() {
    const url = this.props.location.pathname;
    let categoryOrBrandId = null;

    if (CATEGORY_REGEX.test(url)) {
      categoryOrBrandId = url.match(CATEGORY_CAPTURE_REGEX)[0];
    }

    if (BRAND_REGEX.test(url)) {
      categoryOrBrandId = url.match(BRAND_CAPTURE_REGEX)[0];
    }

    categoryOrBrandId = categoryOrBrandId.replace(BRAND_CATEGORY_PREFIX, "");

    this.props.homeFeed(categoryOrBrandId);
  }

  renderLoader() {
    return <MDSpinner />;
  }

  getPlpUrl = () => {
    const url = this.props.location.pathname;
    let match;
    let searchText;
    if (CATEGORY_REGEX.test(url)) {
      match = CATEGORY_CAPTURE_REGEX.exec(url)[0];
      match = match.replace(BRAND_CATEGORY_PREFIX, "");

      match = match.toUpperCase();

      searchText = `:relevance:category:${match}`;
    }

    if (BRAND_REGEX.test(url)) {
      match = BRAND_CAPTURE_REGEX.exec(url)[0];
      match = match.replace(BRAND_CATEGORY_PREFIX, "");

      match = match.toUpperCase();

      searchText = `:relevance:brand:${match}`;
    }

    return `/search/?q=${searchText}`;
  };

  render() {
    console.log("PLP BRAND CATEGORY WRAPPER BEING RENDERED");
    if (
      this.props.homeFeedData.loading ||
      this.props.homeFeedData.feedType === null
    ) {
      return this.renderLoader();
    }

    if (this.props.homeFeedData.feedType === BLP_OR_CLP_FEED_TYPE) {
      if (this.props.homeFeedData.homeFeed.length > 0) {
        return <BrandLandingPageContainer />;
      } else {
        return <Redirect to={this.getPlpUrl()} />;
      }
    }
    return null;
  }
}
