import React from "react";
import ProductListingsContainer from "../containers/ProductListingsContainer.js";
import throttle from "lodash/throttle";

const CATEGORY_REGEX = /c-msh*/;
const BRAND_REGEX = /c-mbh*/;
const CAPTURE_REGEX = /c-(.*)/;
const SUFFIX = `&isTextSearch=false&isFilter=false`;

// ?searchText=:relevance:category:MSH1012100&isFilter=false&isTextSearch=false&isPwa=false&page=0&pageSize=20&typeID=all --> is an url

export default class PlpBrandCategoryWrapper extends React.Component {
  componentDidMount() {
    console.log("COMPONENT DID MOUNT CALLED");
    // this will do the check for category or brand
    // which does not happen now
    window.addEventListener("scroll", this.handleScroll);

    const brandOrCategoryId = this.props.match.params.brandOrCategoryId;
    let match;
    let filters;
    if (CATEGORY_REGEX.test(brandOrCategoryId)) {
      match = CAPTURE_REGEX.exec(brandOrCategoryId)[1];
      match = match.toUpperCase();
      filters = [{ key: "category", filters: [`${match}`] }];
    }

    if (BRAND_REGEX.test(brandOrCategoryId)) {
      match = CAPTURE_REGEX.exec(brandOrCategoryId)[1];
      match = match.toUpperCase();
      filters = [{ key: "brand", filters: [`${match}`] }];
    }

    // I can just assume that we need to set filters here.
    this.props.getProductListings(filters, SUFFIX, 0);
  }

  handleScroll = () => {
    const windowHeight =
      "innerHeight" in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      this.props.paginate(this.props.page + 1, SUFFIX);
      // this is where I need to  update the page
      // I do a getProductListings call, but I need to throttle it.
    }
  };

  componentWillUnmount() {
    window.removeEventListener("scroll", throttle(this.handleScroll, 300));
  }

  // from the url I construct filters

  // and execute a search

  // so this page needs a container that will supply those actions
  // getProductListings works on the search state, so I will need to update that from the url
  // then call getProductListings

  // so this thing will need setFIlters, getProductListings

  render() {
    return <ProductListingsContainer />;
  }
}

// Brand Page
// https://uat2.tataunistore.com/marketplacewebservices/v2/mpl/products/serpsearch?type=category&channel=mobile&pageSize=20&typeID=all&page=0&searchText=:relevance:brand:MBH12E00001&isFilter=false&isTextSearch=false&isPwa=false

// Category Page
// https://uat2.tataunistore.com/marketplacewebservices/v2/mpl/products/serpsearch?type=category&channel=mobile&pageSize=20&typeID=all&page=0&searchText=:relevance:category:MSH1012100&isFilter=false&isTextSearch=false&isPwa=false
