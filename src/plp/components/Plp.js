import React from "react";
import FilterContainer from "../containers/FilterContainer";
import ProductGrid from "./ProductGrid";
import PlpMobileFooter from "./PlpMobileFooter";
import styles from "./Plp.css";
import throttle from "lodash/throttle";
import Loader from "../../general/components/Loader";
const SUFFIX = `&isTextSearch=false&isFilter=false`;
const SCROLL_CHECK_INTERVAL = 500;
const OFFSET_BOTTOM = 800;
export default class Plp extends React.Component {
  toggleFilter = () => {
    if (this.props.isFilterOpen) {
      this.props.hideFilter();
    } else {
      const pathName = this.props.location.pathname;
      const search = this.props.location.search;
      const url = `${pathName}${search}`;
      this.props.setClearUrl(url);
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
  };

  onClear = () => {
    this.props.history.push(this.props.clearUrl);
    this.props.hideFilter();
    this.props.setClearUrlToNull();
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
  }

  componentDidMount() {
    this.throttledScroll = this.handleScroll();
    window.addEventListener("scroll", this.throttledScroll);
  }
  componentDidUpdate(prevProps) {
    if (this.props.productListings !== null) {
      const slug = this.props.match.params.slug;
      let splitSlug = "Tata Cliq";
      if (slug) {
        splitSlug = this.props.match.params.slug.replace(/-/g, " ");
        splitSlug = splitSlug.replace(/\b\w/g, l => l.toUpperCase());
      }
      if (this.props.showFilter) {
        this.props.setHeaderText("Refine by");
      } else {
        this.props.setHeaderText(
          `${splitSlug[splitSlug.length - 1]} (${
            this.props.productListings.pagination.totalResults
          })`
        );
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

  render() {
    return (
      this.props.productListings && (
        <div className={styles.base}>
          <div className={styles.main}>
            <ProductGrid
              history={this.props.history}
              data={this.props.productListings.searchresult}
              totalResults={this.props.productListings.pagination.totalResults}
            />
          </div>
          <FilterContainer
            backPage={this.backPage}
            showFilter={this.props.isFilterOpen}
            onApply={this.onApply}
            onClear={this.onClear}
            onL3CategorySelect={this.onL3CategorySelect}
          />
          <div className={styles.footer}>
            <PlpMobileFooter
              onFilter={this.toggleFilter}
              onSort={this.onSortClick}
            />
          </div>
        </div>
      )
    );
  }
}
