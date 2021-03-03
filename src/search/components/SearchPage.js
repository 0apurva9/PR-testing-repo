import React from "react";
import styles from "./SearchPage.css";
import SearchHeader from "./SearchHeader";
import SearchResultItem from "./SearchResultItem";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";
import { HOME_ROUTER, USER_SEARCH_LOCAL_STORAGE } from "../../lib/constants";
import { setDataLayerForAutoSuggestSearch } from "../../lib/adobeUtils";
import DesktopOnly from "../../general/components/DesktopOnly";
import MobileOnly from "../../general/components/MobileOnly";
import cloneDeep from "lodash.clonedeep";
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
      categoryAndBrandCode: null
    };
    this.searchDown = [];
    this.newSearchArray = [];
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.elementScrollRefTop = React.createRef();
    this.elementScrollRefBottom = React.createRef();
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({
        showData: false
      });
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

  handleBrandClick(
    webURL,
    dtmDataObject,
    position,
    currentString,
    isSetDataLayer
  ) {
    const data = this.props.searchResult;
    /*let firstSuggestedKeyWord = "";
    const firstSuggestionNew = cloneDeep(
      data && data.suggestionsNew ? data.suggestionsNew : ""
    );
    firstSuggestedKeyWord = firstSuggestionNew
      ? firstSuggestionNew.splice(0, 1)
      : ""; */
    const suggestedKeyWord = data && data.suggestionsNew;
    if (data) {
      const topBrands = this.props.searchResult.topBrands
        ? this.props.searchResult.topBrands
        : [];
      const suggestionsNew = suggestedKeyWord ? suggestedKeyWord : [];
      const topCategories = this.props.searchResult.topCategories
        ? this.props.searchResult.topCategories
        : [];
      this.newSearchArray = [...topCategories, ...suggestionsNew, ...topBrands];
    }
    let stringWithOutIn = dtmDataObject.term.split("in ");
    const indexOfCurrentBrands = this.newSearchArray.findIndex(brands => {
      return brands.categoryName === stringWithOutIn[1];
    });
    Object.assign(dtmDataObject, {
      position: indexOfCurrentBrands + 1
    });
    const brandCode = `${webURL}`.replace(TATA_CLIQ_ROOT, "$1");
    //const searchQuery = this.state.searchString;
    if (isSetDataLayer) {
      setDataLayerForAutoSuggestSearch(dtmDataObject);
    }

    this.props.clearSearchResults();
    this.setState({
      showResults: false,
      searchString: null,
      currentFlag: null,
      showSearchBar: false,
      setOnClick: true
    });
    this.setState({
      showData: false
    });
    setTimeout(() => {
      this.setState({
        setOnClick: false
      });
    }, 50);
    const url = `/search/?searchCategory=all&text=${currentString}:relevance:brand:${brandCode}`;
    this.props.history.push(url, {
      isFilter: false
    });
  }

  handleCategoryClick(
    webURL,
    dtmDataObject,
    position,
    currentString,
    isSetDataLayer
  ) {
    const data = this.props.searchResult;
    const categoryCode = `${webURL}`.replace(TATA_CLIQ_ROOT, "$1");
    //const searchQuery = this.state.searchString;
    /* let firstSuggestedKeyWord = "";
    const firstSuggestionNew = cloneDeep(
      data && data.suggestionsNew ? data.suggestionsNew : ""
    );
      firstSuggestedKeyWord = firstSuggestionNew
      ? firstSuggestionNew.splice(0, 1)
      : ""; */
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
        this.newSearchArray = [
          ...topCategories,
          ...suggestionsNew,
          ...topBrands
        ];
      }
    }
    let stringWithOutIn = dtmDataObject.term.split("in ");
    const indexOfCurrentBrands = this.newSearchArray.findIndex(brands => {
      return brands.categoryName === stringWithOutIn[1];
    });
    Object.assign(dtmDataObject, {
      position: indexOfCurrentBrands + 1
    });
    if (isSetDataLayer) {
      setDataLayerForAutoSuggestSearch(dtmDataObject);
    }
    const url = `/search/?searchCategory=all&text=${currentString}:relevance:category:${categoryCode}`;
    this.props.clearSearchResults();
    this.setState({
      showResults: false,
      searchString: null,
      showSearchBar: false,
      currentFlag: null,
      setOnClick: true
    });
    this.setState({
      showData: false
    });
    setTimeout(() => {
      this.setState({
        setOnClick: false
      });
    }, 50);
    this.props.history.push(url, {
      isFilter: false
    });
  }

  handleSearch(val) {
    this.setState({
      showData: true
    });
    if (this.state.showSearchBar === false) {
      this.setState({
        currentFlag: null
      });
    }
    if (this.props.getSearchResults) {
      this.setState({
        searchString: val
      });
      if (val.length > 2) {
        this.props.getSearchResults(val);
      } else {
        this.setState({ showResults: false });
        this.props.clearSearchResults();
      }
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
    var format = /[!@#$%^*_+=[\]{};:|<>?]+/;
    if (
      /\s*[0-9a-zA-Z]+/.test(searchString) &&
      !format.test(searchString) &&
      searchString !== null &&
      searchString !== undefined
    ) {
      let currentSearchString = searchString && searchString.trim();
      let code =
        this.state.categoryAndBrandCode &&
        this.state.categoryAndBrandCode.trim();
      let suggestedTerm =
        this.props.searchResult && this.props.searchResult.suggestedTerm;
      if (code) {
        if (code.includes("MSH")) {
          const topCategories =
            this.props.searchResult && this.props.searchResult.topCategories;
          const indexOfCurrentCategories =
            topCategories &&
            topCategories.findIndex(categories => {
              return categories.categoryCode === code;
            });
          this.handleCategoryClick(
            code,
            {
              term: currentSearchString
            },
            indexOfCurrentCategories,
            suggestedTerm,
            false
          );
        }
        if (code.includes("MBH")) {
          const topBrands = this.props.searchResult.topBrands;
          const indexOfCurrentBrands = topBrands.findIndex(brands => {
            return brands.categoryCode === code;
          });
          this.handleBrandClick(
            code,
            {
              term: currentSearchString
            },
            indexOfCurrentBrands,
            suggestedTerm,
            false
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
      this.setState(
        {
          showResults: false,
          searchString: null,
          showSearchBar: false,
          currentFlag: null,
          setOnClick: true
        },
        () => {
          this.setState({
            setOnClick: false
          });
        }
      );
    }
  }

  handleBlur() {
    if (!this.elementScrollRefTop && !this.elementScrollRefBottom) {
      this.setState(
        {
          showResults: false,
          searchString: null,
          showSearchBar: false,
          currentFlag: null,
          setOnClick: true
        },
        () => {
          this.setState({
            setOnClick: false
          });
        }
      );
    }
  }

  handleUpDownArrow(val) {
    this.setState({
      showData: true
    });
    const currentSelectedIndex = this.state.currentFlag;
    const data = this.props.searchResult;
    const firstSuggestionNew = cloneDeep(
      data && data.suggestionsNew ? data.suggestionsNew : ""
    );
    const firstSuggestedKeyWord = firstSuggestionNew
      ? firstSuggestionNew.splice(0, 1)
      : "";
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
          }`
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
          }`
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
          }`
        });
      }
      if (this.state.currentFlag > 3 && this.elementScrollRefBottom) {
        this.elementScrollRefBottom.scrollIntoView();
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
          }`
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
          }`
        });
      }
      if (this.state.currentFlag < 5 && this.elementScrollRefTop) {
        this.elementScrollRefTop.scrollIntoView(false);
      }
    }
    if (val === "Enter") {
      this.setState({
        showData: false,
        searchString: null,
        categoryAndBrandCode: null
      });
    }
  }

  handleStoreBrandMerClick(redirectUrl, searchString) {
    if (
      redirectUrl.indexOf("http") !== -1 ||
      redirectUrl.indexOf("https") !== -1
    ) {
      window.location.href = redirectUrl;
    } else {
      this.props.history.push(redirectUrl);
    }
    let searchResultHistory = [...this.state.searchItemsHistory];
    // searchResultHistory.push(searchString);
    if (searchResultHistory.indexOf(searchString) !== -1) {
      searchResultHistory.splice(searchResultHistory.indexOf(searchString), 1);
    }
    searchResultHistory.unshift(searchString);
    this.setState(
      {
        showResults: false,
        searchString,
        showSearchBar: false,
        searchItemsHistory: searchResultHistory,
        isSearchIconClicked: false,
        showSearchPageNew: true
      },
      () => {
        localStorage.setItem(
          USER_SEARCH_LOCAL_STORAGE,
          JSON.stringify(this.state.searchItemsHistory)
        );
        this.props.searchShowFooter();
      }
    );

    this.setState({
      boardAddModalShow: true
    });
  }

  render() {
    const data = this.props.searchResult;
    let firstSuggestedKeyWord = "";
    const firstSuggestionNew = cloneDeep(
      data && data.suggestionsNew ? data.suggestionsNew : ""
    );
    firstSuggestedKeyWord = firstSuggestionNew
      ? firstSuggestionNew.splice(0, 1)
      : "";
    const suggestedKeyWord = data && data.suggestionsNew;
    // Unused right now
    if (data) {
      const topBrands = this.props.searchResult.topBrands
        ? this.props.searchResult.topBrands
        : [];
      const suggestionsNew = suggestedKeyWord ? suggestedKeyWord : [];
      const topCategories = this.props.searchResult.topCategories
        ? this.props.searchResult.topCategories
        : [];
      this.searchDown = [...topCategories, ...suggestionsNew, ...topBrands];
    }
    // Unused code till here
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
            onBlur={event => this.handleBlur(event)}
          />
        </div>
        <MobileOnly>
          {" "}
          {this.state.showResults && (
            <div className={styles.searchResults}>
              {" "}
              {/* store details or brand details */}
              {suggestedKeyWord &&
              Array.isArray(suggestedKeyWord) &&
              suggestedKeyWord[0] &&
              suggestedKeyWord[0].storeDetails ? (
                <SearchResultItem
                  suggestedText={suggestedKeyWord[0].storeDetails.storeTitle}
                  imageUrl={suggestedKeyWord[0].storeDetails.storeImageUrl}
                  storeBrandMer={true}
                  onClick={() => {
                    this.handleStoreBrandMerClick(
                      suggestedKeyWord[0].storeDetails.storeDestinationUrl,
                      suggestedKeyWord[0].storeDetails.storeTitle
                    );
                  }}
                />
              ) : null}{" "}
              {/* category details */}
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
                            term: `${data.suggestionText[0]} in ${val.categoryName}`
                          },
                          i,
                          firstSuggestedKeyWord[0].suggestedWord,
                          true
                        );
                      }}
                    />
                  );
                })}
              {/* merchandise details */}
              {suggestedKeyWord &&
                suggestedKeyWord[0].merchandiseDetails &&
                suggestedKeyWord[0].merchandiseDetails.map((val, i) => {
                  return i < 5 ? (
                    <SearchResultItem
                      // key={j}
                      storeBrandMer={true}
                      merchandise={val.merchandiseTitle}
                      suggestedText={suggestedKeyWord[0].keyword + " "}
                      onClick={() =>
                        this.handleStoreBrandMerClick(
                          val.merchandiseLink,
                          val.merchandiseTitle
                        )
                      }
                    />
                  ) : null;
                })}
              {/* keyword details */}
              {suggestedKeyWord &&
                suggestedKeyWord.map((val, i) => {
                  return i < 5 ? (
                    <SearchResultItem
                      key={i}
                      suggestedText={val.suggestedWord}
                      singleWord={this.checkIfSingleWordinSearchString()}
                      onClick={() => {
                        this.handleOnSearchString(val.suggestedWord);
                      }}
                    />
                  ) : null;
                })}
              {/* brands details */}{" "}
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
                            term: `${data.suggestionText[0]} in ${val.categoryName}`
                          },
                          i,
                          data.suggestionText[0],
                          true
                        );
                      }}
                    />
                  );
                })}{" "}
            </div>
          )}{" "}
        </MobileOnly>
        <DesktopOnly>
          {" "}
          {this.state.searchString && (
            <div className={styles.searchHolder}>
              {" "}
              {this.state.showData && (
                <div className={styles.searchResults} ref={this.setWrapperRef}>
                  {" "}
                  {/* store details or brand details */}
                  {suggestedKeyWord && suggestedKeyWord[0].storeDetails ? (
                    <SearchResultItem
                      suggestedText={
                        suggestedKeyWord[0].storeDetails.storeTitle
                      }
                      imageUrl={suggestedKeyWord[0].storeDetails.storeImageUrl}
                      storeBrandMer={true}
                      onClick={() => {
                        this.handleStoreBrandMerClick(
                          suggestedKeyWord[0].storeDetails.storeDestinationUrl,
                          suggestedKeyWord[0].storeDetails.storeTitle
                        );
                      }}
                    />
                  ) : null}{" "}
                  {/* category details */}
                  {data &&
                    data.topCategories &&
                    data.topCategories.map((val, i) => {
                      return (
                        <div
                          key={i}
                          ref={this.elementScrollRefTop}
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
                                  term: `${data.suggestionText[0]} in ${val.categoryName}`
                                },
                                i,
                                firstSuggestedKeyWord &&
                                  firstSuggestedKeyWord[0] &&
                                  firstSuggestedKeyWord[0].suggestedWord,
                                true
                              );
                            }}
                          />
                        </div>
                      );
                    })}{" "}
                  {/* merchandise details */}
                  {suggestedKeyWord &&
                    suggestedKeyWord[0].merchandiseDetails &&
                    suggestedKeyWord[0].merchandiseDetails.map((val, i) => {
                      return i < 5 ? (
                        <SearchResultItem
                          // key={j}
                          storeBrandMer={true}
                          merchandise={val.merchandiseTitle}
                          suggestedText={suggestedKeyWord[0].keyword + " "}
                          onClick={() =>
                            this.handleStoreBrandMerClick(
                              val.merchandiseLink,
                              val.merchandiseTitle
                            )
                          }
                        />
                      ) : null;
                    })}
                  {/* keyword details */}{" "}
                  {suggestedKeyWord &&
                    suggestedKeyWord.map((val, i) => {
                      return (
                        <div
                          key={i}
                          ref={this.elementScrollRefBottom}
                          className={
                            this.state.currentFlag ===
                            i +
                              (data.topCategories &&
                              data.topCategories.length > 0
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
                    })}{" "}
                  {/* brands details */}{" "}
                  {data &&
                    data.topBrands &&
                    data.topBrands.map((val, i) => {
                      return (
                        <div
                          key={i}
                          className={
                            this.state.currentFlag ===
                            i +
                              (data.topCategories &&
                              data.topCategories.length &&
                              suggestedKeyWord &&
                              suggestedKeyWord.length
                                ? data.topCategories.length +
                                  suggestedKeyWord.length
                                : suggestedKeyWord &&
                                  suggestedKeyWord.length > 0
                                ? suggestedKeyWord.length
                                : data.topCategories &&
                                  data.topBrands.length > 0
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
                            categories={true}
                            categoryOrBrandText={val.categoryName}
                            singleWord={this.checkIfSingleWordinSearchString()}
                            onClick={() => {
                              this.handleBrandClick(
                                val.categoryCode,
                                {
                                  term: `${data.suggestionText[0]} in ${val.categoryName}`
                                },
                                i,
                                data.suggestionText[0],
                                true
                              );
                            }}
                          />
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          )}
        </DesktopOnly>
      </div>
    );
  }
}
