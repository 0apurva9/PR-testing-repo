import React, { Component } from "react";
import PlpContainer from "../containers/PlpContainer";
import queryString from "query-string";
import {
  CATEGORY_PRODUCT_LISTINGS_WITH_PAGE,
  BRAND_AND_CATEGORY_PAGE,
  SKU_PAGE,
  CATEGORY_PAGE_WITH_SLUG,
  BRAND_PRODUCT_LISTINGS_WITH_PAGE,
  BRAND_PAGE_WITH_SLUG,
  CHANNEL,
  PRODUCT_LISTINGS,
  CATEGORY_PAGE,
  BRAND_PAGE
} from "../../lib/constants.js";
import delay from "lodash.delay";
import {
  CATEGORY_CAPTURE_REGEX,
  BRAND_CAPTURE_REGEX
} from "./PlpBrandCategoryWrapper.js";
import { setDataLayer, ADOBE_PLP_TYPE, ICID2, CID } from "../../lib/adobeUtils";
import { isBrowser } from "browser-or-node";
import * as Cookie from "../../lib/Cookie";

const OUT_OF_STOCK_FLAG = "inStockFlag";
const SEARCH_CATEGORY_TO_IGNORE = "all";
const SUFFIX = `&isTextSearch=false&isFilter=false`;
const SKU_SUFFIX = `&isFilter=false&channel=${CHANNEL}`;
const PAGE_REGEX = /page-(\d+)/;
const MAX_PRICE_FROM_API = "and Above";
const MAX_PRICE_FROM_API_2 = "Greater than";
const MAX_PRICE_FROM_UI = "-₹9,999,999";
const CATEGORY_TEXT = "category";
const DEFAULT_PLP_VIEW = "defaultPlpView";

class ProductListingsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVirtualPageLoaded: false,
      defaultViewData: []
    };
  }

  /**
   * To check whether category exists in query string if not then append one.
   *
   * @access     private
   *
   * @param {string} searchText              Query String.
   * @param {string} textToReplace           Value to replace eg :relevance.
   * @param {string} replaceWith             Replace textToReplace value with replaceWith value
   *                                         eg :relevance:category.
   * @param {string} categoryCodeParameter   category code.
   *
   * @return {string}                        Returns query string.
   */
  categoryQueryStringURL(
    searchText,
    textToReplace,
    replaceWith,
    categoryCodeParameter
  ) {
    if (!searchText.includes(`${CATEGORY_TEXT}:${categoryCodeParameter}`)) {
      searchText = searchText.replace(textToReplace, replaceWith);
    }

    return searchText;
  }

  getSearchTextFromUrl(currentUrl) {
    const parsedQueryString = currentUrl
      ? queryString.parseUrl(currentUrl).query
      : queryString.parse(this.props.location.search);
    const searchCategory = parsedQueryString.searchCategory;
    let searchText = parsedQueryString.q;
    if (
      searchCategory &&
      searchCategory !== "" &&
      searchCategory !== SEARCH_CATEGORY_TO_IGNORE
    ) {
      searchText = `:brand:${searchCategory}`;
    }
    if (!searchText) {
      searchText = parsedQueryString.text;
    }
    if (this.props.match.path === SKU_PAGE) {
      if (searchText) {
        if (searchText.includes("relevance")) {
          searchText = searchText.replace(
            ":relevance",
            `:relevance:collectionIds:${this.props.match.params.slug}`
          );
        } else if (
          searchText.includes("price-asc") &&
          !searchText.includes(
            `:price-asc:collectionIds:${this.props.match.params.slug}`
          )
        ) {
          searchText = searchText.replace(
            ":price-asc",
            `:price-asc:collectionIds:${this.props.match.params.slug}`
          );
        } else if (
          searchText.includes("price-desc") &&
          !searchText.includes(
            `:price-desc:collectionIds:${this.props.match.params.slug}`
          )
        ) {
          searchText = searchText.replace(
            ":price-desc",
            `:price-desc:collectionIds:${this.props.match.params.slug}`
          );
        }
      } else {
        searchText = `:relevance:collectionIds:${this.props.match.params.slug}`;
      }
    }
    if (
      this.props.match.path === CATEGORY_PAGE ||
      this.props.match.path === CATEGORY_PRODUCT_LISTINGS_WITH_PAGE ||
      this.props.match.path === CATEGORY_PAGE_WITH_SLUG ||
      CATEGORY_CAPTURE_REGEX.test(currentUrl)
    ) {
      let catParams =
        this.props.match.params && this.props.match.params[0]
          ? this.props.match.params[0].toUpperCase()
          : currentUrl
              .match(CATEGORY_CAPTURE_REGEX)[0]
              .replace(/c-/g, "")
              .toUpperCase();

      if (searchText) {
        if (searchText.includes("relevance")) {
          searchText = this.categoryQueryStringURL(
            searchText,
            ":relevance",
            `:relevance:${CATEGORY_TEXT}:${catParams}`,
            catParams
          );
        } else if (
          searchText.includes("price-asc") &&
          !searchText.includes(`${CATEGORY_TEXT}:${catParams}`)
        ) {
          searchText = searchText.replace(
            ":price-asc",
            `:price-asc:${CATEGORY_TEXT}:${catParams}`
          );
        } else if (
          searchText.includes("price-desc") &&
          !searchText.includes(`${CATEGORY_TEXT}:${catParams}`)
        ) {
          searchText = searchText.replace(
            ":price-desc",
            `:price-desc:${CATEGORY_TEXT}:${catParams}`
          );
        }
      } else {
        searchText = `:relevance:${CATEGORY_TEXT}:${catParams}`;
      }
    }
    if (this.props.match.path === BRAND_AND_CATEGORY_PAGE) {
      const categoryId = this.props.match.params[0].toUpperCase();
      const brandId = this.props.match.params[1].toUpperCase();
      if (searchText) {
        if (searchText.includes("relevance")) {
          searchText = searchText.replace(
            ":relevance",
            `:relevance:${CATEGORY_TEXT}:${categoryId}:brand:${brandId}`
          );
        }
      } else {
        searchText = `:relevance:${CATEGORY_TEXT}:${categoryId}:brand:${brandId}`;
      }
    }

    if (
      this.props.match.path === BRAND_PAGE ||
      this.props.match.path === BRAND_PRODUCT_LISTINGS_WITH_PAGE ||
      this.props.match.path === BRAND_PAGE_WITH_SLUG ||
      BRAND_CAPTURE_REGEX.test(currentUrl)
    ) {
      let brandParams =
        this.props.match.params && this.props.match.params[0]
          ? this.props.match.params[0].toUpperCase()
          : currentUrl
              .match(BRAND_CAPTURE_REGEX)[0]
              .replace(/c-/g, "")
              .toUpperCase();
      if (searchText) {
        if (searchText.includes("relevance")) {
          searchText = searchText.replace(
            ":relevance",
            `:relevance:brand:${brandParams}`
          );
        } else if (
          searchText.includes("price-asc") &&
          !searchText.includes(`:price-asc:brand:${brandParams}`)
        ) {
          searchText = searchText.replace(
            ":price-asc",
            `:price-asc:brand:${brandParams}`
          );
        } else if (
          searchText.includes("price-desc") &&
          !searchText.includes(`:price-desc:brand:${brandParams}`)
        ) {
          searchText = searchText.replace(
            ":price-desc",
            `:price-desc:brand:${brandParams}`
          );
        }
      } else {
        searchText = `:relevance:brand:${brandParams}`;
      }
    }
    if (this.props.match.path === PRODUCT_LISTINGS) {
      if (searchText && !searchText.includes("relevance")) {
        if (
          searchText.includes("price-asc") ||
          searchText.includes("price-desc") ||
          searchText.includes("isDiscountedPrice") ||
          searchText.includes("isProductNew")
        ) {
          searchText = `${searchText}`;
        } else {
          searchText = `${searchText}:relevance`;
        }
      }
    }
    if (searchText) {
      if (
        !searchText.includes("capacityCC-classification") &&
        !searchText.includes("internalStorage-classification") &&
        !searchText.includes("type-classification")
      ) {
        searchText = searchText.replace("+", " ");
      }
      if (
        !searchText.includes("screenSize-classification") &&
        !searchText.includes("capacityLitreCC-classification")
      ) {
        searchText = searchText.replace(MAX_PRICE_FROM_API, MAX_PRICE_FROM_UI);
      }
      searchText = searchText.replace(MAX_PRICE_FROM_API_2, MAX_PRICE_FROM_UI);
    }
    if (searchText && !searchText.includes("relevance")) {
      if (
        searchText.includes("price-asc") ||
        searchText.includes("price-desc") ||
        searchText.includes("isDiscountedPrice") ||
        searchText.includes("isProductNew")
      ) {
        searchText = `${searchText}`;
      } else {
        searchText = `${searchText}:relevance`;
      }
    }
    return encodeURIComponent(searchText);
  }

  getCategoryId(searchText = "") {
    searchText = decodeURIComponent(searchText);
    let searchParts = searchText.split(":");
    let categoryIndex = searchParts.indexOf("category");
    if (categoryIndex !== -1) {
      return searchParts[categoryIndex + 1];
    }
    return "";
  }

  componentDidMount() {
    const defaultViewCookie = Cookie.getCookie(DEFAULT_PLP_VIEW);

    if (!defaultViewCookie) {
      if (this.props.getDefaultPlpView) {
        this.props.getDefaultPlpView();
      }
    } else {
      this.setState({ defaultViewData: JSON.parse(defaultViewCookie) });
    }

    if (
      this.props.location.state &&
      this.props.location.state.disableSerpSearch === true
    ) {
      return;
    }
    if (isBrowser) {
      if (
        !this.props.urlString &&
        this.props.lastVisitedPlpUrl === window.location.href
      ) {
        if (this.props.clickedProductModuleRef) {
          const clickedElement = document.getElementById(
            this.props.clickedProductModuleRef
          );
          if (clickedElement) {
            delay(() => {
              clickedElement.scrollIntoView();
            }, 50);
          }
        }
        let icid, icidType;
        if (
          this.props.lastVisitedPlpUrl &&
          (this.props.lastVisitedPlpUrl.includes("icid2") ||
            this.props.lastVisitedPlpUrl.includes("cid"))
        ) {
          const search = queryString.parse(
            this.props.location && this.props.location.search
          );
          if (search.icid2) {
            icid = search.icid2;
            icidType = ICID2;
          } else if (search.cid) {
            icid = search.cid;
            icidType = CID;
          }
          const breadcrumbs =
            this.props.productListings &&
            this.props.productListings.seo &&
            this.props.productListings.seo.breadcrumbs &&
            Array.isArray(this.props.productListings.seo.breadcrumbs) &&
            this.props.productListings.seo.breadcrumbs.reverse();
          if (
            (breadcrumbs &&
              breadcrumbs[0] &&
              window.digitalData &&
              window.digitalData.page &&
              window.digitalData.page.category &&
              window.digitalData.page.category.subCategory1 &&
              breadcrumbs[0].name &&
              breadcrumbs[0].name.replace(/ /g, "_").toLowerCase() !==
                window.digitalData.page.category.subCategory1 &&
              breadcrumbs[1].name &&
              breadcrumbs[1].name.replace(/ /g, "_").toLowerCase() !==
                window.digitalData.page.category.subCategory2) ||
            (breadcrumbs[0] &&
              window.digitalData &&
              window.digitalData.page &&
              window.digitalData.page.category &&
              !window.digitalData.page.category.subCategory1)
          ) {
            setDataLayer(
              ADOBE_PLP_TYPE,
              this.props.productListings,
              icid,
              icidType
            );
          }
        }

        return;
      }
    }

    if (this.props.match.path === SKU_PAGE) {
      const skuId = this.props.match.params.slug;
      let searchText = `:relevance:collectionIds:${skuId}:${OUT_OF_STOCK_FLAG}:true`;
      this.props.getProductListings(searchText, SKU_SUFFIX, 0);
      return;
    }
    if (this.props.searchText) {
      let searchText = this.getSearchTextFromUrl();
      this.props.getProductListings(searchText, SUFFIX, 0);
      // get categoryid from search text and get banners for category listing
      let categoryId = this.getCategoryId(searchText);
      if (categoryId) {
        this.props.getPlpBanners(categoryId);
      }
      return;
    }
    let page = 0;
    if (
      this.props.match.path === CATEGORY_PRODUCT_LISTINGS_WITH_PAGE ||
      this.props.match.path === CATEGORY_PAGE_WITH_SLUG
    ) {
      page = this.props.match.params[1] ? this.props.match.params[1] : 1;
      let searchText = this.getSearchTextFromUrl();
      // get categoryid from search text and get banners for category listing
      let categoryId = this.getCategoryId(searchText);

      if (categoryId) {
        this.props.getPlpBanners(categoryId);
      }
      this.props.getProductListings(searchText, SUFFIX, page - 1);
      return;
    }
    if (
      this.props.match.path === BRAND_PRODUCT_LISTINGS_WITH_PAGE ||
      this.props.match.path === BRAND_PAGE_WITH_SLUG
    ) {
      page = this.props.match.params[1] ? this.props.match.params[1] : 1;
      let searchText = this.getSearchTextFromUrl();
      this.props.getProductListings(searchText, SUFFIX, page - 1);
      return;
    }
    if (this.props.match.path === BRAND_AND_CATEGORY_PAGE) {
      const searchText = this.getSearchTextFromUrl();
      this.props.getProductListings(searchText, SUFFIX, 0, false);
      let categoryId = this.getCategoryId(searchText);
      // get banners for category listing
      if (categoryId) {
        this.props.getPlpBanners(categoryId);
      }
      return;
    }
    page = 0;
    if (this.props.location.state && this.props.location.state.isFilter) {
      const suffix = "&isFilter=true";
      const searchText = this.getSearchTextFromUrl();
      const pageMatch = PAGE_REGEX.exec(this.props.location.pathname);
      if (pageMatch) {
        page = pageMatch[1] ? pageMatch[1] : 1;
        page = page - 1;
      }
      this.props.getProductListings(searchText, suffix, page, true);
      return;
    }
    if (this.props.location.state && !this.props.location.state.isFilter) {
      const searchText = this.getSearchTextFromUrl();
      const pageMatch = PAGE_REGEX.exec(this.props.location.pathname);
      if (pageMatch) {
        page = pageMatch[1] ? pageMatch[1] : 1;
        page = page - 1;
      }
      this.props.getProductListings(searchText, SUFFIX, page, false);
      return;
    }
    if (!this.props.location.state) {
      const searchText = this.getSearchTextFromUrl();
      const pageMatch = PAGE_REGEX.exec(this.props.location.pathname);
      if (pageMatch) {
        page = pageMatch[1] ? pageMatch[1] : 1;
        page = page - 1;
      }

      let suffix = SUFFIX;
      const parsedQueryString = queryString.parse(this.props.location.search);
      if (parsedQueryString.text) {
        suffix = `${suffix}&qc=true&test=v2`;
      }

      this.props.getProductListings(searchText, suffix, page);
      return;
    }
  }

  componentDidUpdate(prevProps) {
    const defaultViewCookie = Cookie.getCookie(DEFAULT_PLP_VIEW);

    if (!defaultViewCookie) {
      if (this.props.getDefaultPlpView) {
        this.props.getDefaultPlpView();
      }
    } else {
      if (this.state.defaultViewData && this.state.defaultViewData.length < 1) {
        this.setState({ defaultViewData: JSON.parse(defaultViewCookie) });
      }
    }

    if (
      !this.props.urlString &&
      this.props.lastVisitedPlpUrl === window.location.href
    ) {
      if (this.props.clickedProductModuleRef) {
        const clickedElement = document.getElementById(
          this.props.clickedProductModuleRef
        );
        if (clickedElement) {
          delay(() => {
            clickedElement.scrollIntoView();
          }, 50);
        }
      }
      return;
    }
    if (this.props.urlString) {
      let windowLocation = window.location.href.replace(/^.*\/\/[^\\/]+/, "");
      let newUrlString = this.props.urlString.replace(/^.*\/\/[^\\/]+/, "");
      if (
        this.props.urlString &&
        windowLocation !== newUrlString &&
        prevProps.urlString !== this.props.urlString
      ) {
        if (
          this.props.urlString.includes("https") ||
          this.props.urlString.includes("http")
        ) {
          let urlString = this.props.urlString;
          urlString = urlString.replace(/^.*\/\/[^\\/]+/, "");
          this.props.history.replace(urlString);
        }
      }
    }

    if (this.props.location.search !== prevProps.location.search) {
      let page = 0;
      if (this.props.match.path === SKU_PAGE) {
        const searchText = this.getSearchTextFromUrl();
        this.props.getProductListings(searchText, SKU_SUFFIX, 0);
        return;
      }
      if (
        this.props.match.path === CATEGORY_PRODUCT_LISTINGS_WITH_PAGE ||
        this.props.match.path === CATEGORY_PAGE_WITH_SLUG
      ) {
        page = this.props.match.params[1] ? this.props.match.params[1] : 1;
        page = page - 1;
        const searchText = this.getSearchTextFromUrl();
        this.props.getProductListings(searchText, SUFFIX, page);
        return;
      } else if (this.props.urlString) {
        let currentURL = window.location.href;
        if (CATEGORY_CAPTURE_REGEX.test(currentURL)) {
          const searchText = this.getSearchTextFromUrl(currentURL);
          this.props.getProductListings(searchText, SUFFIX, 0);
          return;
        }
      }
      if (
        this.props.match.path === BRAND_PRODUCT_LISTINGS_WITH_PAGE ||
        this.props.match.path === BRAND_PAGE_WITH_SLUG
      ) {
        page = this.props.match.params[1] ? this.props.match.params[1] : 1;
        let searchText = this.getSearchTextFromUrl();
        this.props.getProductListings(searchText, SUFFIX, page - 1);
        return;
      } else if (this.props.urlString) {
        let currentURL = window.location.href;
        if (BRAND_CAPTURE_REGEX.test(currentURL)) {
          const searchText = this.getSearchTextFromUrl(currentURL);
          this.props.getProductListings(searchText, SUFFIX, 0);
          return;
        }
      }
      if (this.props.match.path === BRAND_AND_CATEGORY_PAGE) {
        const searchText = this.getSearchTextFromUrl();
        this.props.getProductListings(searchText, SUFFIX, 0, false);
        return;
      }
      if (
        this.props.location.state &&
        this.props.location.state.disableSerpSearch === true
      ) {
        return;
      }
      page = 0;
      if (
        this.props.location.state &&
        this.props.location.state.isFilter === true
      ) {
        const suffix = "&isFilter=true";
        const searchText = this.getSearchTextFromUrl();
        const pageMatch = PAGE_REGEX.exec(this.props.location.pathname);
        if (pageMatch) {
          page = pageMatch[1] ? pageMatch[1] : 1;
          page = page - 1;
        }
        this.props.getProductListings(searchText, suffix, page, true);
        return;
      } else if (
        this.props.location.state &&
        this.props.location.state.isFilter === false
      ) {
        const searchText = this.getSearchTextFromUrl();
        const pageMatch = PAGE_REGEX.exec(this.props.location.pathname);
        if (pageMatch) {
          page = pageMatch[1] ? pageMatch[1] : 1;
          page = page - 1;
        }
        this.props.getProductListings(searchText, SUFFIX, page);
        return;
      }
      if (!this.props.location.state) {
        const searchText = this.getSearchTextFromUrl();
        const pageMatch = PAGE_REGEX.exec(this.props.location.pathname);
        if (pageMatch) {
          page = pageMatch[1] ? pageMatch[1] : 1;
          page = page - 1;
        }
        this.props.getProductListings(searchText, SUFFIX, page);
        return;
      }
    }
  }

  render() {
    let isFilter = false;
    if (this.props.location.state && this.props.location.state.isFilter) {
      isFilter = true;
    }
    return (
      <PlpContainer
        paginate={this.props.paginate}
        onFilterClick={this.onFilterClick}
        isFilter={isFilter}
        urlString={this.props.urlString}
        defaultViewData={this.state.defaultViewData}
      />
    );
  }
}

export default ProductListingsPage;
