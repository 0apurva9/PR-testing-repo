import React from "react";
import throttle from "lodash.throttle";
import Loader from "../../general/components/Loader";
import { Helmet } from "react-helmet";
import MediaQuery from "react-responsive";
import { setDataLayer, ADOBE_PLP_TYPE, ICID2, CID } from "../../lib/adobeUtils";
import cancelIcon from "../../general/components/img/cancelGrey.svg";
import Icon from "../../xelpmoc-core/Icon";
import MobileOnly from "../../general/components/MobileOnly";
import DesktopOnly from "../../general/components/DesktopOnly";
import * as UserAgent from "../../lib/UserAgent.js";
import queryString, { parse } from "query-string";
import Loadable from "react-loadable";
import SearchresultNullpage from "./SearchresultNullpage";
import {
  renderMetaTags,
  renderMetaTagsWithoutSeoObject
} from "../../lib/seoUtils.js";
import Button from "../../general/components/Button.js";
import { URL_ROOT } from "../../lib/apiRequest";
import styles from "./Plp.css";

import { checkUserAgentIsMobile } from "../../lib/UserAgent.js";
import {
  REQUESTING,
  AMP_BRAND_AND_CATEGORY_REG_EX,
  AMP_CATEGORY_REG_EX,
  AMP_BRAND_REG_EX,
  AMP_SEARCH_REG_EX
} from "../../lib/constants";
import { filterScroll, filterFixed } from "./FilterDesktop.css";
import gridImage from "./img/grid.svg";
import listImage from "./img/list.svg";
import { isBrowser } from "browser-or-node";
import SortDesktopContainer from "../containers/SortDesktopContainer";
import FilterContainer from "../containers/FilterContainer";
import ProductGrid from "./ProductGrid";
import PlpMobileFooter from "./PlpMobileFooter";

export const SUFFIX = `&isTextSearch=false&isFilter=false`;
const SCROLL_CHECK_INTERVAL = 500;
const OFFSET_BOTTOM = 800;
const LIST = "list";
const GRID = "grid";
const PAGE_REGEX = /\/page-(\d+)/;
export default class Plp extends React.Component {
  constructor() {
    super();
    this.state = {
      totalHeight: 0,
      fixedScroll: false,
      view: GRID,
      gridBreakup: false,
      isCurrentUrl: 0
    };
  }
  toggleFilter = () => {
    if (this.props.isFilterOpen) {
      this.props.hideFilter();
    } else {
      this.props.showFilter();
    }
  };
  switchView() {
    if (checkUserAgentIsMobile()) {
      if (this.state.view === LIST) {
        this.setState({ view: GRID });
      } else {
        this.setState({ view: LIST });
      }
    } else {
      this.setState({ gridBreakup: !this.state.gridBreakup });
      if (this.state.view === LIST) {
        this.setState({ view: GRID });
      } else {
        this.setState({ view: LIST });
      }
    }
  }
  onApply = () => {
    const pathName = this.props.location.pathname;
    const search = this.props.location.search;
    const url = `${pathName}${search}`;
    this.props.history.push(url, {
      isFilter: false
    });
    this.props.hideFilter();
    if (!this.props.filterHasBeenClicked) {
      this.props.setIfFilterHasBeenClicked();
    }
  };

  handleScroll = () => {
    if (!UserAgent.checkUserAgentIsMobile()) {
      const filterDOM = document.getElementById("filter_desktop");
      const filterWrapperDOM = document.getElementById("filterWrapper_desktop");
      const girdWrapper = document.getElementById("grid-container");
      if (filterDOM) {
        const filterSectionHeight = filterDOM.offsetHeight;
        const pageHeight = window.pageYOffset;
        const subTractOffset = window.screen.height - 400;
        const scrollHeight = window.scrollY;
        const totalGridHeight = girdWrapper ? girdWrapper.clientHeight : 0;
        if (totalGridHeight <= scrollHeight + subTractOffset) {
          this.setState({ fixedScroll: false });
          filterWrapperDOM.className = filterScroll;
          filterWrapperDOM.style.marginTop = `${totalGridHeight -
            filterSectionHeight}px`;
        } else if (filterSectionHeight - subTractOffset <= pageHeight) {
          filterWrapperDOM.style.marginTop = `auto`;
          if (!this.state.fixedScroll) {
            this.setState({ fixedScroll: true });
            filterWrapperDOM.className = filterFixed;
          }
        } else {
          filterWrapperDOM.style.marginTop = `auto`;
          if (this.state.fixedScroll) {
            this.setState({ fixedScroll: false });
            filterWrapperDOM.className = filterScroll;
          }
        }
      }
      return;
    }

    return throttle(() => {
      if (
        !this.props.isFilterOpen &&
        this.props.productListings &&
        this.props.pageNumber <
          this.props.productListings.pagination.totalPages - 1
      ) {
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
        if (
          windowBottom >= docHeight - OFFSET_BOTTOM &&
          window.pageYOffset > 0 &&
          this.props.status !== REQUESTING
        ) {
          this.props.paginate(this.props.pageNumber + 1, SUFFIX);
        }
      }
    }, SCROLL_CHECK_INTERVAL);
  };

  componentWillUnmount() {
    window.removeEventListener("scroll", this.throttledScroll);
  }
  viewMore() {
    if (
      this.props.productListings &&
      this.props.pageNumber <
        this.props.productListings.pagination.totalPages - 1
    ) {
      if (this.props.status !== REQUESTING) {
        this.props.paginate(this.props.pageNumber + 1, SUFFIX);
      }
    }
  }
  componentDidMount() {
    this.throttledScroll = !UserAgent.checkUserAgentIsMobile()
      ? () => this.handleScroll()
      : this.handleScroll();
    window.addEventListener("scroll", this.throttledScroll);
    this.setHeaderText();
    if (this.props.lastVisitedPlpUrl === window.location.href) {
      this.setState({ isCurrentUrl: this.state.isCurrentUrl + 1 }, () => {
        if (this.state.isCurrentUrl === 1) {
          if (
            !window.digitalData ||
            !window.digitalData.page ||
            !window.digitalData.page.pageInfo ||
            window.digitalData.page.pageInfo.pageName !== "product grid"
          ) {
            if (
              this.props.lastVisitedPlpUrl &&
              (this.props.lastVisitedPlpUrl.includes("icid2") ||
                this.props.lastVisitedPlpUrl.includes("cid"))
            ) {
              const search = parse(
                this.props.location && this.props.location.search
              );
              let icid, icidType;
              if (search.icid2) {
                icid = search.icid2;
                icidType = ICID2;
              } else if (search.cid) {
                icid = search.cid;
                icidType = CID;
              }
              // setDataLayer(
              //   ADOBE_PLP_TYPE,
              //   this.props.productListings,
              //   icid,
              //   icidType
              // );
            } else {
              // setDataLayer(ADOBE_PLP_TYPE, this.props.productListings);
            }
          }
        }
      });
    }

    //show refine if filtersOpenAmp is true
    const parsedQueryString = queryString.parse(this.props.location.search);
    if (parsedQueryString.filtersOpenAmp === "true") {
      this.props.showFilter();
    }
    /* Start - Gemini Script */
    //gemini JS object check.
    if (typeof window.GEM === "object") {
      //gemini custom ID for Product Listing Page
      window.GEM.setGeminiPageId("0002321000100200");
    } else {
      window.gemPageId = "0002321000100200";
    }
    /* End - Gemini Script */
  }

  setHeaderText = () => {
    if (this.props.productListings !== null) {
      if (this.props.isFilterOpen) {
        this.props.setHeaderText("Refine by");
      } else {
        if (
          this.props.productListings.seo &&
          this.props.productListings.seo.breadcrumbs &&
          this.props.productListings.seo.breadcrumbs[0] &&
          this.props.productListings.seo.breadcrumbs[0].name
        )
          this.props.setHeaderText(
            `${this.props.productListings.seo.breadcrumbs[0].name}`
          );
        else {
          const slug = this.props.match.params.slug;
          let splitSlug = "Tata Cliq";
          if (slug) {
            splitSlug = this.props.match.params.slug.replace(/-/g, " ");
            splitSlug = splitSlug.replace(/\b\w/g, l => l.toUpperCase());
            this.props.setHeaderText(`${splitSlug}`);
          } else {
            this.props.setHeaderText(`Search results`);
          }
        }
      }
    }
  };
  setHeaderTextDesktop = () => {
    const slug = this.props.match.params.slug;
    let splitSlug = "Tata Cliq";
    const searchresult =
      this.props &&
      this.props.productListings &&
      this.props.productListings.searchresult;

    const brandName = searchresult && searchresult[0].brandname;
    const brandData =
      searchresult &&
      searchresult.filter(brand => {
        return brand.brandname === brandName;
      });

    const isBrand = /c-mbh/.test(this.props.location.pathname) ? true : false;
    const isCustom = /custom/.test(this.props.location.pathname) ? true : false;

    if (this.props.productListings.seo && this.props.productListings.seo.tag) {
      const tagText =
        (brandData && brandData.length) ===
          (searchresult && searchresult.length) && !isBrand
          ? brandName + " " + this.props.productListings.seo.tag
          : this.props.productListings.seo.tag;
      return tagText;
    }
    if (!this.props.productListings && this.props.headerText) {
      return this.props.headerText;
    }
    if (isCustom) {
      let customHeaderText = this.props && this.props.headerText;
      if (customHeaderText && customHeaderText.includes("&")) {
        let header = customHeaderText.split("&");
        return header[0];
      } else return customHeaderText;
    }
    if (
      this.props.productListings.seo &&
      this.props.productListings.seo.breadcrumbs &&
      this.props.productListings.seo.breadcrumbs[0] &&
      this.props.productListings.seo.breadcrumbs[0].name
    ) {
      const headerText =
        (brandData && brandData.length) ===
          (searchresult && searchresult.length) && !isBrand
          ? brandName + " " + this.props.productListings.seo.breadcrumbs[0].name
          : this.props.productListings.seo.breadcrumbs[0].name;
      return headerText;
    }
    if (slug) {
      splitSlug = this.props.match.params.slug.replace(/-/g, " ");
      splitSlug = splitSlug.replace(/\b\w/g, l => l.toUpperCase());
      return splitSlug;
    } else {
      return (
        <React.Fragment>
          {this.props.productListings &&
            this.props.productListings.facetdatacategory &&
            this.props.productListings.facetdatacategory.filters &&
            this.props.productListings.facetdatacategory.filters[0] &&
            this.props.productListings.facetdatacategory.filters[0]
              .categoryName}
        </React.Fragment>
      );
    }
  };
  onClickCancelIcon(val, filterName, allData) {
    let url = "";
    let colourSlug = "";
    if ("hexColor" in allData && allData.webURL) {
      colourSlug = `/${allData.webURL.split("/")[2]}`;
    }
    url = val.replace("page-{pageNo}", "page-1");
    filterName = filterName.replace("&", " and ");
    filterName = filterName.replace("'", "%27");

    let parsingurl = url;

    parsingurl = url.replace(/\+/g, " ");

    // if (parsingurl.match(filterName)) {
    //   parsingurl = url.split("?");
    //   url = parsingurl[0];
    // }

    if (url.match("/search")) {
      url = url.replace("/search", "");
      let pathname = this.props.location.pathname.replace(PAGE_REGEX, "");
      if (pathname.charAt(pathname.length - 1).match("/")) {
        url = url.replace(/\//g, "");
      }
      url = pathname + url;
    }

    if (colourSlug) {
      if ((colourSlug.match(/~/g) || []).length > 1) {
        url = url.replace(`${filterName.toLowerCase()}~`, "");
      } else {
        url = url.replace(`${filterName.toLowerCase()}~color/`, "");
      }
    }
    if (filterName.includes("Exclude out of stock")) {
      this.props.userSelectedOutOfStock(true);
    }
    this.props.history.push(url, {
      isFilter: false
    });
  }
  componentDidUpdate(prevProps) {
    this.setHeaderText();
    if (!UserAgent.checkUserAgentIsMobile()) {
      const filterDOM = document.getElementById("filter_desktop");
      const gridDOM = document.getElementById("grid-wrapper_desktop");

      const filterHeight = filterDOM ? filterDOM.offsetHeight : 0;
      const gridHeight = gridDOM ? gridDOM.offsetHeight : 0;
      const maxHeight =
        filterHeight ^
        ((filterHeight ^ gridHeight) & -(filterHeight < gridHeight));
      if (this.state.totalHeight !== maxHeight) {
        this.setState({ totalHeight: maxHeight });
      }
    }
  }
  backPage = () => {
    if (this.props.isFilterOpen) {
      this.props.hideFilter();
    } else {
      this.props.showFilter();
    }
  };
  onSortClick = () => {
    if (this.props.showSort) {
      this.props.showSort();
    }
  };

  renderLoader() {
    return <Loader />;
  }

  onL3CategorySelect = () => {
    this.props.hideFilter();
  };

  renderPageTags = () => {
    console.log("RENDER PAGE TAGS");
    console.log(this.props.productListings.currentQuery);
    let url = `${URL_ROOT}${this.props.productListings.currentQuery.url}`;
    if (this.props.productListings.pagination) {
      const lastPage = Number.parseInt(
        this.props.productListings.pagination.totalPages,
        10
      );
      const page =
        Number.parseInt(this.props.productListings.pagination.currentPage, 10) +
        1;

      if (page === 1) {
        url = url.replace("{pageNo}", page + 1);
        return (
          <Helmet>
            <link
              rel="next"
              id="next"
              href={
                this.props.productListings.seo &&
                this.props.productListings.seo.relNext
                  ? this.props.productListings.seo.relNext
                  : url
              }
            />
          </Helmet>
        );
      } else if (page === lastPage) {
        url = url.replace("{pageNo}", page - 1);

        return (
          <Helmet>
            <link
              rel="prev"
              id="prev"
              href={
                this.props.productListings.seo &&
                this.props.productListings.seo.relPrev
                  ? this.props.productListings.seo.relPrev
                  : url
              }
            />
          </Helmet>
        );
      } else if (page > 1 && page < lastPage) {
        const prevUrl = url.replace("{pageNo}", page - 1);
        const nextUrl = url.replace("{pageNo}", page + 1);
        return (
          <Helmet>
            <link
              rel="next"
              id="next"
              href={
                this.props.productListings.seo &&
                this.props.productListings.seo.relNext
                  ? this.props.productListings.seo.relNext
                  : nextUrl
              }
            />
            <link
              rel="prev"
              id="prev"
              href={
                this.props.productListings.seo &&
                this.props.productListings.seo.relPrev
                  ? this.props.productListings.seo.relPrev
                  : prevUrl
              }
            />
          </Helmet>
        );
      }
    }

    return null;
  };
  renderAmpTags = () => {
    if (
      AMP_BRAND_AND_CATEGORY_REG_EX.test(
        this.props.history.location.pathname
      ) ||
      AMP_CATEGORY_REG_EX.test(this.props.history.location.pathname) ||
      AMP_BRAND_REG_EX.test(this.props.history.location.pathname)
    ) {
      let ampUrl = this.props.history.location.pathname;
      return (
        <Helmet>
          <link rel="amphtml" href={`${window.location.origin}/amp${ampUrl}`} />
          <link
            rel="canonical"
            href={`${window.location.origin}/amp${ampUrl}`}
          />
        </Helmet>
      );
    }
    if (AMP_SEARCH_REG_EX.test(this.props.history.location.pathname)) {
      let ampUrl = `${this.props.history.location.pathname}${
        this.props.location.search
      }`;
      return (
        <Helmet>
          <link rel="amphtml" href={`${window.location.origin}/amp${ampUrl}`} />
          <link
            rel="canonical"
            href={`${window.location.origin}/amp${ampUrl}`}
          />
        </Helmet>
      );
    }
  };

  render() {
    console.log("ARE WE RENDERING HTE PLP?");
    let selectedFilterCount = 0;
    let selectedFilter = [];
    let filterSelected = false;
    let hasSorts = false;
    // let electronicView =
    //   this.props &&
    //   this.props.productListings &&
    //   this.props.productListings.facetdatacategory &&
    //   this.props.productListings.facetdatacategory.filters &&
    //   this.props.productListings.facetdatacategory.filters[0].categoryName ===
    //     "Electronics";
    let electronicView = false;
    if (this.props.productListings && this.props.productListings.facetdata) {
      this.props.productListings.facetdata.forEach(filter => {
        selectedFilterCount += filter.selectedFilterCount;
        filter.values &&
          filter.values.forEach(selectedFilterObject => {
            if (
              selectedFilterObject &&
              selectedFilterObject.selected === true
            ) {
              selectedFilter.push(selectedFilterObject);
            }
          });
      });

      if (selectedFilterCount > 0) {
        filterSelected = true;
      }
      this.props.productListings.sorts.forEach(sort => {
        if (sort.selected && !hasSorts) {
          hasSorts = true;
        }
      });
    }
    const headerName =
      this.props.productListings &&
      this.props.productListings.seo &&
      this.props.productListings.seo.breadcrumbs;
    console.log("PRODUCT LISTINGS");
    console.log(this.props.productListings);
    return (
      <React.Fragment>
        {this.props.productListings && (
          <div className={styles.base}>
            {this.renderPageTags()}
            {isBrowser && this.renderAmpTags()}
            {this.props.productListings.seo
              ? renderMetaTags(this.props.productListings)
              : renderMetaTagsWithoutSeoObject(this.props.productListings)}
            <MediaQuery
              query="(min-device-width: 1025px)"
              values={{ deviceWidth: 1026 }}
            >
              {this.props.productListings &&
              this.props.productListings &&
              this.props.productListings.currentQuery &&
              this.props.productListings.currentQuery.searchQuery &&
              !this.props.productListings.currentQuery.searchQuery.includes(
                ":relevance"
              ) ? (
                <div className={styles.headerText}>
                  <div className={styles.plpHeading}>
                    {`Showing "${
                      this.props.productListings &&
                      this.props.productListings.pagination &&
                      this.props.productListings.pagination.totalResults
                        ? this.props.productListings.pagination.totalResults
                        : 0
                    }" items for "`}
                    <span className={styles.camelCase}>
                      {headerName
                        ? headerName[0].name
                        : this.props.productListings &&
                          this.props.productListings.currentQuery &&
                          this.props.productListings.currentQuery.searchQuery.replace(
                            "%22",
                            '"'
                          )}
                      "
                    </span>
                  </div>
                </div>
              ) : (
                <div className={styles.headerTextWithTotalProducts}>
                  <div className={styles.headerHeading}>
                    <h1>{this.setHeaderTextDesktop()}</h1>
                  </div>
                  <div className={styles.totalProducts}>
                    {this.props.productListings &&
                      this.props.productListings.pagination &&
                      this.props.productListings.pagination.totalResults &&
                      `${
                        this.props.productListings.pagination.totalResults
                      } Products`}
                  </div>
                </div>
              )}
            </MediaQuery>
            <MediaQuery
              query="(min-device-width:1025px)"
              values={{ deviceWidth: 1026 }}
            >
              <div className={styles.headerSortWithFilter}>
                <div
                  className={
                    electronicView
                      ? styles.selectedFilterElectronicView
                      : styles.selectedFilter
                  }
                >
                  {selectedFilter &&
                    selectedFilter.map((selectedFilterData, i) => {
                      return (
                        <div
                          className={styles.selectedFilterWithIcon}
                          onClick={(url, name) =>
                            this.onClickCancelIcon(
                              selectedFilterData.url,
                              selectedFilterData.name,
                              selectedFilterData
                            )
                          }
                          key={i}
                        >
                          {selectedFilterData.name}
                          <div className={styles.cancelIcon}>
                            <Icon
                              image={cancelIcon}
                              size={10}
                              backgroundSize="auto 20px"
                            />
                          </div>
                        </div>
                      );
                    })}
                </div>
                <div className={styles.sort}>
                  <SortDesktopContainer />
                </div>

                {!electronicView && (
                  <div className={styles.gridIcon}>
                    <DesktopOnly>
                      <div
                        className={styles.icon}
                        onClick={() => this.switchView()}
                      >
                        {this.state.gridBreakup && (
                          <Icon image={gridImage} size={20} />
                        )}
                        {!this.state.gridBreakup && (
                          <Icon image={listImage} size={20} />
                        )}
                      </div>
                    </DesktopOnly>
                  </div>
                )}
              </div>
            </MediaQuery>

            {checkUserAgentIsMobile() && (
              <MobileOnly>
                <div className={styles.productWithFilter}>
                  <div className={styles.main}>
                    <ProductGrid
                      banners={this.props.banners}
                      history={this.props.history}
                      location={this.props.location}
                      data={this.props.productListings.searchresult}
                      totalResults={
                        this.props.productListings.pagination &&
                        this.props.productListings.pagination.totalResults
                      }
                      setProductModuleRef={this.props.setProductModuleRef}
                      sort={this.props.productListings.sorts}
                      setIfSortHasBeenClicked={() =>
                        this.props.setIfSortHasBeenClicked()
                      }
                      view={this.state.view}
                      gridBreakup={this.state.gridBreakup}
                      isPosition={true}
                      productListings={this.props.productListings}
                    >
                      <div
                        className={styles.icon}
                        onClick={() => this.switchView()}
                      >
                        {this.state.view === LIST && (
                          <Icon image={gridImage} size={20} />
                        )}
                        {this.state.view === GRID && (
                          <Icon image={listImage} size={20} />
                        )}
                      </div>
                    </ProductGrid>
                  </div>
                  <FilterContainer
                    backPage={this.backPage}
                    isFilterOpen={this.props.isFilterOpen}
                    onApply={this.onApply}
                    onClear={this.props.hideFilter}
                    onL3CategorySelect={this.onL3CategorySelect}
                  />
                </div>
              </MobileOnly>
            )}

            <DesktopOnly>
              <div
                className={styles.productWithFilterDesktop}
                id="plp-container"
              >
                <div
                  className={styles.filterDesktopWrapper}
                  id="filter-container"
                >
                  <FilterContainer
                    backPage={this.backPage}
                    isFilterOpen={this.props.isFilterOpen}
                    onApply={this.onApply}
                    onClear={this.props.hideFilter}
                    onL3CategorySelect={this.onL3CategorySelect}
                  />
                </div>
                <div
                  className={styles.productGridDesktop}
                  id="grid-container"
                  style={{
                    minHeight: `${this.state.totalHeight}px`
                  }}
                >
                  <div id="grid-wrapper_desktop">
                    <ProductGrid
                      banners={this.props.banners}
                      electronicView={false}
                      history={this.props.history}
                      location={this.props.location}
                      data={this.props.productListings.searchresult}
                      totalResults={
                        this.props.productListings.pagination &&
                        this.props.productListings.pagination.totalResults
                      }
                      setProductModuleRef={this.props.setProductModuleRef}
                      sort={this.props.productListings.sorts}
                      setIfSortHasBeenClicked={() =>
                        this.props.setIfSortHasBeenClicked()
                      }
                      view={this.state.view}
                      gridBreakup={this.state.gridBreakup}
                      productListings={this.props.productListings}
                    />
                  </div>
                  <DesktopOnly>
                    {this.props.productListings &&
                      this.props.productListings.pagination &&
                      this.props.pageNumber <
                        this.props.productListings.pagination.totalPages -
                          1 && (
                        <div className={styles.viewMoreButtonHolder}>
                          <div className={styles.viewMoreButton}>
                            <Button
                              type="hollow"
                              width={180}
                              height={36}
                              label="Show more products"
                              color="#212121"
                              onClick={() => this.viewMore()}
                            />
                          </div>
                        </div>
                      )}
                  </DesktopOnly>
                </div>
              </div>
            </DesktopOnly>
            <MediaQuery
              query="(max-device-width:1024px)"
              values={{ deviceWidth: 1026 }}
            >
              <div className={styles.footer}>
                <PlpMobileFooter
                  hasFilters={filterSelected && this.props.filterHasBeenClicked}
                  hasSort={hasSorts && this.props.sortHasBeenClicked}
                  onFilter={this.toggleFilter}
                  onSort={this.onSortClick}
                />
              </div>
            </MediaQuery>
          </div>
        )}
        {!this.props.productListings &&
          !this.props.productListings &&
          this.props.searchMsdData && (
            <div className={styles.dummyHolder}>
              <SearchresultNullpage
                history={this.props.history}
                feeds={this.props.searchMsdData}
                showTrendingProducts={true}
              />
            </div>
          )}
      </React.Fragment>
    );
  }
}
