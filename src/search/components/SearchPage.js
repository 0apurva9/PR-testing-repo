import React from "react";
import cloneDeep from "lodash.clonedeep";
import styles from "./SearchPage.css";
import SearchHeader from "./SearchHeader";
import SearchResultItem from "./SearchResultItem";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";
import { HOME_ROUTER } from "../../lib/constants";
import { setDataLayerForAutoSuggestSearch } from "../../lib/adobeUtils";
import DesktopOnly from "../../general/components/DesktopOnly";
import MobileOnly from "../../general/components/MobileOnly";
import each from "lodash.foreach";
let searchDown = [];

export default class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showResults: false,
      showSearchBar: false,
      searchString: null,
      currentFlag: null
    };
  }

  onSearchOrCloseIconClick = () => {
    const showResults = this.state.showResults;
    this.props.clearSearchResults();
    this.setState({
      showResults: !showResults,
      searchString: null,
      showSearchBar: !this.state.showSearchBar
    });
  };

  handleBrandClick(webURL, dtmDataObject, position) {
    Object.assign(dtmDataObject, {
      position: position + 1
    });
    const brandCode = `${webURL}`.replace(TATA_CLIQ_ROOT, "$1");
    const searchQuery = this.state.searchString;
    setDataLayerForAutoSuggestSearch(dtmDataObject);
    this.props.clearSearchResults();
    this.setState({
      showResults: false,
      searchString: null,
      showSearchBar: false
    });
    const url = `/search/?searchCategory=all&text=${searchQuery}:relevance:brand:${brandCode}`;
    this.props.history.push(url, {
      isFilter: false
    });
  }

  handleCategoryClick(webURL, dtmDataObject, position) {
    const data = this.props.searchResult;
    const categoryCode = `${webURL}`.replace(TATA_CLIQ_ROOT, "$1");
    const searchQuery = this.state.searchString;
    Object.assign(dtmDataObject, {
      position:
        data && data.topBrands
          ? data.topBrands.length + position + 1
          : position + 1
    });
    setDataLayerForAutoSuggestSearch(dtmDataObject);
    const url = `/search/?searchCategory=all&text=${searchQuery}:relevance:category:${categoryCode}`;
    this.props.clearSearchResults();
    this.setState({
      showResults: false,
      searchString: null,
      showSearchBar: false
    });

    this.props.history.push(url, {
      isFilter: false
    });
  }
  handleSearch(val, e) {
    if (this.props.getSearchResults) {
      this.setState({ searchString: val });
      this.props.getSearchResults(val);
    }
  }
  handleBackClick() {
    if (this.props.canGoBack) {
      this.props.canGoBack();
    }
  }
  redirectToHome() {
    this.props.history.push(HOME_ROUTER);
  }
  checkIfSingleWordinSearchString() {
    return this.state.searchString
      ? this.state.searchString.trim().split(" ").length === 1
      : true;
  }
  handleOnSearchString(searchString) {
    this.props.history.push(
      `/search/?searchCategory=all&text=${searchString}`,
      {
        isFilter: false
      }
    );
    this.props.clearSearchResults();
    this.setState({
      showResults: false,
      searchString,
      showSearchBar: false
    });
  }
  handleUpDownArrow(val) {
    var element = document.getElementById("box");

    const currentSelectedIndex = cloneDeep(this.state.currentFlag);
    if (val === "ArrowDown") {
      if (
        this.state.currentFlag !== null &&
        this.state.currentFlag <= searchDown.length - 2
      ) {
        this.setState({
          currentFlag: currentSelectedIndex + 1,
          searchString: ` ${searchDown[currentSelectedIndex + 1].categoryName}`
        });
      } else if (this.state.currentFlag === searchDown.length - 1) {
        this.setState({
          currentFlag: this.state.currentFlag,
          searchString: ` ${searchDown[this.state.currentFlag].categoryName}`
        });
      } else {
        this.setState({
          currentFlag: 0,
          searchString: ` ${searchDown[0].categoryName}`
        });
      }
      if (this.state.currentFlag > 3) {
        element.scrollIntoView();
      }
    }
    if (val === "ArrowUp") {
      if (this.state.currentFlag !== null && this.state.currentFlag > 0) {
        this.setState({
          currentFlag: currentSelectedIndex - 1,
          searchString: `${searchDown[currentSelectedIndex - 1].categoryName}`
        });
      } else {
        this.setState({
          currentFlag: 0,
          searchString: ` ${searchDown[0].categoryName}`
        });
      }
      if (this.state.currentFlag < 3) {
        element.scrollIntoView(false);
      }
    }
  }

  render() {
    const data = this.props.searchResult;
    if (data) {
      searchDown = [
        ...this.props.searchResult.topBrands,
        ...this.props.searchResult.topCategories
      ];
    }
    return (
      <div className={styles.base}>
        <div className={styles.searchBar}>
          <SearchHeader
            onSearchOrCloseIconClick={this.onSearchOrCloseIconClick}
            onSearch={val => this.handleSearch(val)}
            onClickBack={() => {
              this.handleBackClick();
            }}
            isGoBack={this.props.hasBackButton}
            text={this.props.header}
            isLogo={this.props.isLogo}
            hasCrossButton={this.props.hasCrossButton}
            toggleSearchBar={this.toggleSearchBar}
            display={this.state.showSearchBar}
            onSearchString={val => this.handleOnSearchString(val)}
            redirectToHome={() => this.redirectToHome()}
            searchString={this.state.searchString}
            value={this.state.searchString}
            onKeyUp={event => {
              this.handleUpDownArrow(event);
            }}
          />
        </div>
        <MobileOnly>
          {this.state.showResults && (
            <div className={styles.searchResults}>
              {data &&
                data.topBrands &&
                data.topBrands.map((val, i) => {
                  return (
                    <SearchResultItem
                      key={i}
                      suggestedText={data.suggestionText[0]}
                      singleWord={this.checkIfSingleWordinSearchString()}
                      text={val.categoryName}
                      value={val.categoryCode}
                      onClick={() => {
                        this.handleBrandClick(
                          val.categoryCode,
                          {
                            term: `${data.suggestionText[0]} in ${
                              val.categoryName
                            }`
                          },
                          i
                        );
                      }}
                    />
                  );
                })}
              {data &&
                data.topCategories &&
                data.topCategories.map((val, i) => {
                  return (
                    <SearchResultItem
                      key={i}
                      suggestedText={data.suggestionText[0]}
                      singleWord={this.checkIfSingleWordinSearchString()}
                      text={val.categoryName}
                      value={val.categoryCode}
                      onClick={() => {
                        this.handleCategoryClick(
                          val.categoryCode,
                          {
                            term: `${data.suggestionText[0]} in ${
                              val.categoryName
                            }`
                          },
                          i
                        );
                      }}
                    />
                  );
                })}
            </div>
          )}
        </MobileOnly>
        <DesktopOnly>
          <div className={styles.searchResults}>
            {data &&
              data.topBrands &&
              data.topBrands.map((val, i) => {
                return (
                  <div
                    className={
                      this.state.currentFlag === i ? styles.color : styles.back
                    }
                  >
                    <SearchResultItem
                      key={i}
                      suggestedText={data.suggestionText[0]}
                      singleWord={this.checkIfSingleWordinSearchString()}
                      text={val.categoryName}
                      value={val.categoryCode}
                      onClick={() => {
                        this.handleBrandClick(
                          val.categoryCode,
                          {
                            term: `${data.suggestionText[0]} in ${
                              val.categoryName
                            }`
                          },
                          i
                        );
                      }}
                    />
                  </div>
                );
              })}
            {data &&
              data.topCategories &&
              data.topCategories.map((val, i) => {
                return (
                  <div
                    id={"box"}
                    className={
                      this.state.currentFlag === i + data.topBrands.length
                        ? styles.color
                        : styles.back
                    }
                  >
                    <SearchResultItem
                      key={i}
                      suggestedText={data.suggestionText[0]}
                      singleWord={this.checkIfSingleWordinSearchString()}
                      text={val.categoryName}
                      value={val.categoryCode}
                      onClick={() => {
                        this.handleCategoryClick(
                          val.categoryCode,
                          {
                            term: `${data.suggestionText[0]} in ${
                              val.categoryName
                            }`
                          },
                          i
                        );
                      }}
                    />
                  </div>
                );
              })}
          </div>
        </DesktopOnly>
      </div>
    );
  }
}
