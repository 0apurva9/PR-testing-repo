import React from "react";
import styles from "./SearchPage.css";
import SearchHeader from "./SearchHeader";
import SearchResultItem from "./SearchResultItem";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";
import { HOME_ROUTER } from "../../lib/constants";
import { setDataLayerForAutoSuggestSearch } from "../../lib/adobeUtils";
import DesktopOnly from "../../general/components/DesktopOnly";
import MobileOnly from "../../general/components/MobileOnly";
import * as UserAgent from "../../lib/UserAgent.js";
import cloneDeep from "lodash.clonedeep";
import merge from "lodash.merge";
export default class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showResults: false,
      showSearchBar: false,
      searchString: null,
      currentFlag: null,
      showData: true,
      setOnClick: false,
      categoryAndBrandCode: null,
      categoryAndBrandIndex: null
    };
    this.searchDown = [];
    this.newSearchDown = [];
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
    const url = `/search/?searchCategory=all&text=${
      dtmDataObject.term
    }:relevance:brand:${brandCode}`;
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
    const url = `/search/?searchCategory=all&text=${
      dtmDataObject.term
    }:relevance:category:${categoryCode}`;
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
    let currentSearchString = searchString.trim();
    let code = this.state.categoryAndBrandCode.trim();
    if (code) {
      if (code.includes("MSH")) {
        this.handleCategoryClick(
          code,
          {
            term: currentSearchString
          },
          this.state.categoryAndBrandIndex
        );
      }
      if (code.includes("MBH")) {
        this.handleBrandClick(
          code,
          {
            term: currentSearchString
          },
          this.state.categoryAndBrandIndex
        );
      }
    } else {
      this.props.history.push(
        `/search/?searchCategory=all&text=${currentSearchString}`,
        {
          isFilter: false
        }
      );
    }
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
    const data = cloneDeep(this.props.searchResult);
    let firstSuggestedKeyWord =
      data && data.suggestionsNew ? data.suggestionsNew.splice(0, 1) : "";
    if (val === "ArrowDown") {
      if (
        this.state.currentFlag !== null &&
        this.state.currentFlag <= this.searchDown.length - 2
      ) {
        this.setState({
          currentFlag: currentSelectedIndex + 1,
          searchString: ` ${
            this.searchDown[currentSelectedIndex + 1].categoryName
              ? `${firstSuggestedKeyWord &&
                  firstSuggestedKeyWord[0] &&
                  firstSuggestedKeyWord[0].suggestedWord} in ${
                  this.searchDown[currentSelectedIndex + 1].categoryName
                }`
              : this.searchDown[currentSelectedIndex + 1].suggestedWord
          }`,
          categoryAndBrandCode: ` ${
            this.searchDown[currentSelectedIndex + 1].categoryCode
              ? this.searchDown[currentSelectedIndex + 1].categoryCode
              : ""
          }`,
          categoryAndBrandIndex: this.searchDown[currentSelectedIndex + 1].index
        });
      } else if (this.state.currentFlag === this.searchDown.length - 1) {
        this.setState({
          currentFlag: this.state.currentFlag,
          searchString: ` ${
            this.searchDown[this.state.currentFlag].categoryName
              ? `${firstSuggestedKeyWord &&
                  firstSuggestedKeyWord[0] &&
                  firstSuggestedKeyWord[0].suggestedWord} in ${
                  this.searchDown[this.state.currentFlag].categoryName
                }`
              : this.searchDown[this.state.currentFlag].suggestedWord
          }`,
          categoryAndBrandCode: ` ${
            this.searchDown[this.state.currentFlag].categoryCode
              ? this.searchDown[this.state.currentFlag].categoryCode
              : ""
          }`,
          categoryAndBrandIndex: this.searchDown[this.state.currentFlag].index
        });
      } else {
        this.setState({
          currentFlag: 0,
          searchString: ` ${
            this.searchDown[0].categoryName
              ? `${firstSuggestedKeyWord &&
                  firstSuggestedKeyWord[0] &&
                  firstSuggestedKeyWord[0].suggestedWord} in ${
                  this.searchDown[0].categoryName
                }`
              : this.searchDown[0].suggestedWord
          }`,
          categoryAndBrandCode: ` ${
            this.searchDown[0].categoryCode
              ? this.searchDown[0].categoryCode
              : ""
          }`,
          categoryAndBrandIndex: this.searchDown[0].index
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
            this.searchDown[currentSelectedIndex - 1].categoryName
              ? `${firstSuggestedKeyWord &&
                  firstSuggestedKeyWord[0] &&
                  firstSuggestedKeyWord[0].suggestedWord} in ${
                  this.searchDown[currentSelectedIndex - 1].categoryName
                }`
              : this.searchDown[currentSelectedIndex - 1].suggestedWord
          }`,
          categoryAndBrandCode: ` ${
            this.searchDown[currentSelectedIndex - 1].categoryCode
              ? this.searchDown[currentSelectedIndex - 1].categoryCode
              : ""
          }`,
          categoryAndBrandIndex: this.searchDown[currentSelectedIndex - 1].index
        });
      } else {
        this.setState({
          currentFlag: 0,
          searchString: ` ${
            this.searchDown[0].categoryName
              ? `${firstSuggestedKeyWord &&
                  firstSuggestedKeyWord[0] &&
                  firstSuggestedKeyWord[0].suggestedWord} in ${
                  this.searchDown[0].categoryName
                }`
              : this.searchDown[0].suggestedWord
          }`,
          categoryAndBrandCode: ` ${
            this.searchDown[0].categoryCode
              ? this.searchDown[0].categoryCode
              : ""
          }`,
          categoryAndBrandIndex: this.searchDown[0].index
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
    const data = cloneDeep(this.props.searchResult);
    let firstSuggestedKeyWord = "";
    firstSuggestedKeyWord =
      data && data.suggestionsNew ? data.suggestionsNew.splice(0, 1) : "";
    const suggestedKeyWord = data && data.suggestionsNew;

    if (data) {
      if (data) {
        const topBrands = this.props.searchResult.topBrands
          ? this.props.searchResult.topBrands
          : [];
        const suggestionsNew = suggestedKeyWord ? suggestedKeyWord : [];
        const topCategories = this.props.searchResult.topCategories
          ? this.props.searchResult.topCategories
          : [];
        const newArrayOfTopCategories =
          topCategories &&
          topCategories.map((element, i) => {
            return merge({}, element, { index: i });
          });
        const newArrayOfSuggestionsNew =
          suggestionsNew &&
          suggestionsNew.map((element, i) => {
            return merge({}, element, { index: i });
          });
        const newArrayOfTopBrands =
          topBrands &&
          topBrands.map((element, i) => {
            return merge({}, element, { index: i });
          });
        this.searchDown = [
          ...newArrayOfTopCategories,
          ...newArrayOfSuggestionsNew,
          ...newArrayOfTopBrands
        ];
      }
    }

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
                      suggestedText={
                        firstSuggestedKeyWord &&
                        firstSuggestedKeyWord[0] &&
                        firstSuggestedKeyWord[0].suggestedWord
                      }
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
                data.topCategories &&
                data.topCategories.map((val, i) => {
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
                            firstSuggestedKeyWord &&
                              firstSuggestedKeyWord[0] &&
                              firstSuggestedKeyWord[0].suggestedWord
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
                          (data.topCategories && data.topCategories.length > 0
                            ? data.topCategories.length
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
                data.topBrands &&
                data.topBrands.map((val, i) => {
                  return (
                    <div
                      className={
                        this.state.currentFlag ===
                        i +
                          (data.topCategories &&
                          data.topCategories.length &&
                          suggestedKeyWord &&
                          suggestedKeyWord.length
                            ? data.topCategories.length +
                              suggestedKeyWord.length
                            : suggestedKeyWord && suggestedKeyWord.length > 0
                              ? suggestedKeyWord.length
                              : data.topCategories && data.topBrands.length > 0
                                ? data.topCategories.length
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
            </div>
          )}
        </DesktopOnly>
      </div>
    );
  }
}
