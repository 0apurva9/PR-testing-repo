import React from "react";
import FilterContainer from "../containers/FilterContainer";
import ProductGrid from "./ProductGrid";
import PlpMobileFooter from "./PlpMobileFooter";
import styles from "./Plp.css";
import throttle from "lodash.throttle";
import Loader from "../../general/components/Loader";
import { Helmet } from "react-helmet";
import MediaQuery from "react-responsive";
import PlpDesktopHeader from "../components/PlpDesktopHeader";
import { setDataLayer, ADOBE_PLP_TYPE } from "../../lib/adobeUtils";
import cancelIcon from "../../general/components/img/cancelGrey.svg";
import Icon from "../../xelpmoc-core/Icon";
import {
  renderMetaTags,
  renderMetaTagsWithoutSeoObject
} from "../../lib/seoUtils.js";
import { URL_ROOT } from "../../lib/apiRequest";
import SortDesktopContainer from "../containers/SortDesktopContainer";
const SUFFIX = `&isTextSearch=false&isFilter=false`;
const SCROLL_CHECK_INTERVAL = 500;
const OFFSET_BOTTOM = 800;
export default class Plp extends React.Component {
  toggleFilter = () => {
    if (this.props.isFilterOpen) {
      this.props.hideFilter();
    } else {
      this.props.showFilter();
    }
  };

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
        if (windowBottom >= docHeight - OFFSET_BOTTOM) {
          this.props.paginate(this.props.pageNumber + 1, SUFFIX);
        }
      }
    }, SCROLL_CHECK_INTERVAL);
  };

  componentWillUnmount() {
    window.removeEventListener("scroll", this.throttledScroll);
    this.props.plpHasBeenVisited();
  }

  componentDidMount() {
    this.throttledScroll = this.handleScroll();
    this.setHeaderText();
    window.addEventListener("scroll", this.throttledScroll);
    if (this.props.plpVisted) {
      setDataLayer(ADOBE_PLP_TYPE, this.props.productListings);
    }
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
  onClickCancelIcon(val) {
    const url = val.replace("{pageNo}", 1);
    this.props.setIsNotGoBackFromPDP();
    this.props.history.push(url, {
      isFilter: false
    });
  }
  componentDidUpdate(prevProps) {
    this.setHeaderText();
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
    let url = `${URL_ROOT}${this.props.productListings.currentQuery.url}`;
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
          <link rel="next" id="next" href={url} />
        </Helmet>
      );
    } else if (page === lastPage) {
      url = url.replace("{pageNo}", page - 1);

      return (
        <Helmet>
          <link rel="prev" id="prev" href={url} />
        </Helmet>
      );
    } else if (page > 1 && page < lastPage) {
      const prevUrl = url.replace("{pageNo}", page - 1);
      const nextUrl = url.replace("{pageNo}", page + 1);
      return (
        <Helmet>
          <link rel="next" id="next" href={nextUrl} />
          <link rel="prev" id="prev" href={prevUrl} />
        </Helmet>
      );
    }
    return null;
  };

  render() {
    let selectedFilterCount = 0;
    let selectedFilter = [];
    let filterSelected = false;
    let hasSorts = false;
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
    return (
      this.props.productListings && (
        <div className={styles.base}>
          {this.renderPageTags()}
          {this.props.productListings.seo
            ? renderMetaTags(this.props.productListings)
            : renderMetaTagsWithoutSeoObject(this.props.productListings)}
          <MediaQuery query="(min-device-width: 1025px)">
            <div className={styles.headerText}>
              <PlpDesktopHeader
                productListings={
                  this.props.productListings && this.props.productListings
                }
                match={this.props.match && this.props.match}
              />
            </div>
            <div className={styles.totalProduct}>
              {this.props.productListings &&
              this.props.productListings.pagination &&
              this.props.productListings.pagination.totalResults
                ? this.props.productListings.pagination.totalResults
                : 0}{" "}
              Products
            </div>
          </MediaQuery>
          <MediaQuery query="(min-device-width:1025px)">
            <div className={styles.headerSortWithFilter}>
              <div className={styles.sort}>
                <SortDesktopContainer />
              </div>
              {selectedFilter && (
                <div className={styles.selectedFilter}>
                  {selectedFilter.map(selectedFilterData => {
                    return (
                      <div
                        className={styles.selectedFilterWithIcon}
                        onClick={url =>
                          this.onClickCancelIcon(selectedFilterData.url)
                        }
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
              )}
            </div>
          </MediaQuery>
          <div className={styles.productWithFilter}>
            <div className={styles.main}>
              <ProductGrid
                history={this.props.history}
                location={this.props.location}
                data={this.props.productListings.searchresult}
                totalResults={
                  this.props.productListings.pagination.totalResults
                }
                setProductModuleRef={this.props.setProductModuleRef}
                sort={this.props.productListings.sorts}
                setIfSortHasBeenClicked={() =>
                  this.props.setIfSortHasBeenClicked()
                }
              />
            </div>
            <FilterContainer
              backPage={this.backPage}
              isFilterOpen={this.props.isFilterOpen}
              onApply={this.onApply}
              onClear={this.props.hideFilter}
              onL3CategorySelect={this.onL3CategorySelect}
            />
          </div>
          <MediaQuery query="(max-device-width:1024px)">
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
      )
    );
  }
}
