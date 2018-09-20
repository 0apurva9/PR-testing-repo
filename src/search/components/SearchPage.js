import React from "react";
import styles from "./SearchPage.css";
import SearchHeader from "./SearchHeader";
import SearchResultItem from "./SearchResultItem";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";
import { HOME_ROUTER } from "../../lib/constants";
import { setDataLayerForAutoSuggestSearch } from "../../lib/adobeUtils";
import DesktopOnly from "../../general/components/DesktopOnly";
import MobileOnly from "../../general/components/MobileOnly";

export default class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showResults: false,
      showSearchBar: false,
      searchString: null,
      currentFlag: null,
      showData: true,
      setOnClick: false
    };
    this.searchDown = [];
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }
  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ showData: false });
    }
  }
  setWrapperRef(node) {
    this.wrapperRef = node;
  }
  onSearchOrCloseIconClick = () => {
    const showResults = this.state.showResults;
    this.props.clearSearchResults();
    this.setState({
      showResults: !showResults,
      searchString: null,
      currentFlag: null,
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
      currentFlag: null,
      showSearchBar: false,
      setOnClick: true
    });
    this.setState({ showData: false });
    setTimeout(() => {
      this.setState({ setOnClick: false });
    }, 50);
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
      showSearchBar: false,
      currentFlag: null,
      setOnClick: true
    });
    this.setState({ showData: false });
    setTimeout(() => {
      this.setState({ setOnClick: false });
    }, 50);
    this.props.history.push(url, {
      isFilter: false
    });
  }
  handleSearch(val, e) {
    this.setState({ showData: true });
    if (this.state.showSearchBar === false) {
      this.setState({
        currentFlag: null
      });
    }
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
      showSearchBar: false,
      currentFlag: null
    });
  }

  handleUpDownArrow(val) {
    this.setState({ showData: true });
    const currentSelectedIndex = this.state.currentFlag;
    let firstKeyWord =
      this.props.searchResult &&
      this.props.searchResult.suggestionsNew &&
      this.props.searchResult.suggestionsNew[0] &&
      this.props.searchResult.suggestionsNew[0].suggestedWord;

    if (val === "ArrowDown") {
      if (
        this.state.currentFlag !== null &&
        this.state.currentFlag <= this.searchDown.length - 2
      ) {
        this.setState({
          currentFlag: currentSelectedIndex + 1,
          searchString: ` ${
            this.searchDown[currentSelectedIndex + 1].suggestedWord
              ? this.searchDown[currentSelectedIndex + 1].suggestedWord
              : `${firstKeyWord} in ${
                  this.searchDown[currentSelectedIndex + 1].categoryName
                }`
          }`
        });
      } else if (this.state.currentFlag === this.searchDown.length - 1) {
        this.setState({
          currentFlag: this.state.currentFlag,
          searchString: ` ${
            this.searchDown[this.state.currentFlag].suggestedWord
              ? this.searchDown[this.state.currentFlag].suggestedWord
              : `${firstKeyWord} in ${
                  this.searchDown[this.state.currentFlag].categoryName
                }`
          }`
        });
      } else {
        this.setState({
          currentFlag: 0,
          searchString: ` ${
            this.searchDown[0].suggestedWord
              ? this.searchDown[0].suggestedWord
              : `${firstKeyWord} in ${this.searchDown[0].categoryName}`
          }`
        });
      }
      if (this.state.currentFlag > 3 && this.refs.elementScrollRefBottom) {
        this.refs.elementScrollRefBottom.scrollIntoView();
      }
    }
    if (val === "ArrowUp") {
      if (this.state.currentFlag !== null && this.state.currentFlag > 0) {
        this.setState({
          currentFlag: currentSelectedIndex - 1,
          searchString: `${
            this.searchDown[currentSelectedIndex - 1].suggestedWord
              ? this.searchDown[currentSelectedIndex - 1].suggestedWord
              : `${firstKeyWord} in ${
                  this.searchDown[currentSelectedIndex - 1].categoryName
                }`
          }`
        });
      } else {
        this.setState({
          currentFlag: 0,
          searchString: ` ${
            this.searchDown[0].suggestedWord
              ? this.searchDown[0].suggestedWord
              : `${firstKeyWord} in ${this.searchDown[0].categoryName}`
          }`
        });
      }
      if (this.state.currentFlag < 5 && this.refs.elementScrollRefTop) {
        this.refs.elementScrollRefTop.scrollIntoView(false);
      }
    }

    if (val === "Enter") {
      this.setState({ showData: false, searchString: null });
    }
  }

  render() {
    const data = this.props.searchResult;
    if (data) {
      if (
        this.props.searchResult.topBrands &&
        !this.props.searchResult.suggestionsNew &&
        !this.props.searchResult.topCategories
      ) {
        this.searchDown = [...this.props.searchResult.topBrands];
      }
      if (
        !this.props.searchResult.topBrands &&
        this.props.searchResult.suggestionsNew &&
        !this.props.searchResult.topCategories
      ) {
        this.searchDown = [...this.props.searchResult.suggestionsNew];
      }
      if (
        !this.props.searchResult.topBrands &&
        !this.props.searchResult.suggestionsNew &&
        this.props.searchResult.topCategories
      ) {
        this.searchDown = [...this.props.searchResult.topCategories];
      }
      if (
        this.props.searchResult.topBrands &&
        this.props.searchResult.suggestionsNew &&
        !this.props.searchResult.topCategories
      ) {
        this.searchDown = [
          ...this.props.searchResult.topBrands,
          ...this.props.searchResult.suggestionsNew
        ];
      }
      if (
        !this.props.searchResult.topBrands &&
        this.props.searchResult.suggestionsNew &&
        this.props.searchResult.topCategories
      ) {
        this.searchDown = [
          ...this.props.searchResult.suggestionsNew,
          ...this.props.searchResult.topCategories
        ];
      }
      if (
        this.props.searchResult.topBrands &&
        !this.props.searchResult.suggestionsNew &&
        this.props.searchResult.topCategories
      ) {
        this.searchDown = [
          ...this.props.searchResult.topCategories,
          ...this.props.searchResult.topBrands
        ];
      }
      if (
        this.props.searchResult.topBrands &&
        this.props.searchResult.topBrands &&
        this.props.searchResult.suggestionsNew
      ) {
        this.searchDown = [
          ...this.props.searchResult.topBrands,
          ...this.props.searchResult.suggestionsNew,
          ...this.props.searchResult.topCategories
        ];
      }
    }
    const firstSuggestedKeyWord = data && data.suggestionsNew;
    const suggestedKeyWord = data && data.suggestionsNew;
    return (
      <div className={styles.base}>
        <div className={styles.searchBar}>
          <SearchHeader
            setOnClick={this.state.setOnClick}
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
                data.topCategories &&
                data.topCategories.map((val, i) => {
                  return (
                    <SearchResultItem
                      key={i}
                      suggestedText={firstSuggestedKeyWord[0].suggestedWord}
                      categoryOrBrandText={val.categoryName}
                      singleWord={this.checkIfSingleWordinSearchString()}
                      onClick={() => {
                        this.handleCategoryClick(
                          val.categoryCode,
                          {
                            term: `${data.suggestionText[0]} in ${
                              val.categoryName
                            }`
                          },
                          i,
                          firstSuggestedKeyWord[0].suggestedWord
                        );
                      }}
                    />
                  );
                })}
              {suggestedKeyWord &&
                suggestedKeyWord.map((val, i) => {
                  return (
                    <SearchResultItem
                      key={i}
                      suggestedText={val.suggestedWord}
                      singleWord={this.checkIfSingleWordinSearchString()}
                      onClick={() => {
                        this.handleOnSearchString(val.suggestedWord);
                      }}
                    />
                  );
                })}
              {data &&
                data.topBrands &&
                data.topBrands.map((val, i) => {
                  return (
                    <SearchResultItem
                      key={i}
                      suggestedText={firstSuggestedKeyWord[0].suggestedWord}
                      categoryOrBrandText={val.categoryName}
                      singleWord={this.checkIfSingleWordinSearchString()}
                      onClick={() => {
                        this.handleBrandClick(
                          val.categoryCode,
                          {
                            term: `${data.suggestionText[0]} in ${
                              val.categoryName
                            }`
                          },
                          i,
                          data.suggestionText[0]
                        );
                      }}
                    />
                  );
                })}
            </div>
          )}
        </MobileOnly>
        <DesktopOnly>
          {this.state.showData && (
            <div className={styles.searchResults} ref={this.setWrapperRef}>
              {data &&
                data.topBrands &&
                data.topBrands.map((val, i) => {
                  return (
                    <div
                      ref={"elementScrollRefTop"}
                      className={
                        this.state.currentFlag === i
                          ? styles.color
                          : styles.back
                      }
                    >
                      <SearchResultItem
                        key={i}
                        suggestedText={firstSuggestedKeyWord[0].suggestedWord}
                        categoryOrBrandText={val.categoryName}
                        singleWord={this.checkIfSingleWordinSearchString()}
                        onClick={() => {
                          this.handleBrandClick(
                            val.categoryCode,
                            {
                              term: `${data.suggestionText[0]} in ${
                                val.categoryName
                              }`
                            },
                            i,
                            data.suggestionText[0]
                          );
                        }}
                      />
                    </div>
                  );
                })}
              {suggestedKeyWord &&
                suggestedKeyWord.map((val, i) => {
                  return (
                    <div
                      ref={"elementScrollRefBottom"}
                      className={
                        this.state.currentFlag ===
                        i +
                          (data.topBrands && data.topBrands.length > 0
                            ? data.topBrands.length
                            : 0)
                          ? styles.color
                          : styles.back
                      }
                    >
                      <SearchResultItem
                        key={i}
                        suggestedText={val.suggestedWord}
                        singleWord={this.checkIfSingleWordinSearchString()}
                        onClick={() => {
                          this.handleOnSearchString(val.suggestedWord);
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
                      className={
                        this.state.currentFlag ===
                        i +
                          (data.topBrands &&
                          data.topBrands.length &&
                          suggestedKeyWord &&
                          suggestedKeyWord.length
                            ? data.topBrands.length + suggestedKeyWord.length
                            : suggestedKeyWord && suggestedKeyWord.length > 0
                              ? suggestedKeyWord.length
                              : data.topBrands && data.topBrands.length > 0
                                ? data.topBrands.length
                                : 0)
                          ? styles.color
                          : styles.back
                      }
                    >
                      <SearchResultItem
                        key={i}
                        suggestedText={
                          firstSuggestedKeyWord &&
                          firstSuggestedKeyWord[0] &&
                          firstSuggestedKeyWord[0].suggestedWord
                        }
                        categoryOrBrandText={val.categoryName}
                        singleWord={this.checkIfSingleWordinSearchString()}
                        onClick={() => {
                          this.handleCategoryClick(
                            val.categoryCode,
                            {
                              term: `${data.suggestionText[0]} in ${
                                val.categoryName
                              }`
                            },
                            i,
                            firstSuggestedKeyWord[0].suggestedWord
                          );
                        }}
                      />
                    </div>
                  );
                })}
            </div>
          )}
        </DesktopOnly>
      </div>
    );
  }
}
