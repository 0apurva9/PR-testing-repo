import React from "react";
import FilterTab from "./FilterTab";
import FilterSelect from "./FilterSelect";
import FilterCategory from "./FilterCategory";
import FilterCategoryL1 from "./FilterCategoryL1";
import SearchInput from "../../general/components/SearchInput";
import styles from "./FilterDesktop.css";
import queryString from "query-string";
import { createUrlFromQueryAndCategory } from "./FilterUtils.js";
import ColourSelect from "../../pdp/components/ColourSelect";
import Accordion from "../../general/components/Accordion";
import {
  CATEGORY_CAPTURE_REGEX,
  CATEGORY_REGEX
} from "../../plp/components/PlpBrandCategoryWrapper";
import { URL_ROOT } from "../../lib/apiRequest";
const BRAND = "Brand";
const COLOUR = "Colour";
export default class FilterDesktop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brandSearchString: ""
    };
  }
  onClear = () => {
    const parsedQueryString = queryString.parse(this.props.location.search);
    const query = parsedQueryString.q;
    if (query) {
      const firstChar = query.charAt(0);
      if (firstChar !== ":") {
        const splitQuery = query.split(":");
        const searchText = splitQuery[0];
        const url = `${this.props.location.pathname}?q=${searchText}`;

        this.props.history.push(url, {
          isFilter: false
        });
      } else {
        let brandOrCategoryId = null;
        brandOrCategoryId = /category:([a-zA-Z0-9]+)/.exec(query);
        if (!brandOrCategoryId) {
          brandOrCategoryId = /brand:([a-zA-Z0-9]+)/.exec(query);
        }

        if (brandOrCategoryId) {
          const brandOrCategoryIdIndex = brandOrCategoryId.index;
          const clearedQuery = query.substring(
            0,
            brandOrCategoryIdIndex + brandOrCategoryId[0].length
          );

          const url = `${this.props.location.pathname}?q=${clearedQuery}`;
          this.props.history.push(url, {
            isFilter: false
          });
        }
      }
    }
    if (this.props.onClear) {
      this.props.onClear();
    }
  };

  onApply = () => {
    this.props.onApply();
  };
  onBrandSearch = val => {
    this.setState({ brandSearchString: val });
  };
  onCategorySelect = (val, isFilter) => {
    this.props.setIsNotGoBackFromPDP();

    const parsedQueryString = queryString.parse(this.props.location.search);
    // special case the search category case
    let url;
    let query = parsedQueryString.q;
    let pathName = this.props.location.pathname;

    if (parsedQueryString.searchCategory) {
      const searchValue = this.props.location.search;
      url = `${pathName}${searchValue}`;
      url = createUrlFromQueryAndCategory(searchValue, url, val);
    } else {
      url = createUrlFromQueryAndCategory(query, pathName, val);
    }

    this.props.history.push(url, { isFilter });
    if (isFilter === false) {
      this.props.onL3CategorySelect();
    }
  };

  onL1Click = val => {
    this.onCategorySelect(val, true);
  };

  onL2Click = val => {
    this.onCategorySelect(val, true);
  };

  onL3Click = val => {
    this.onCategorySelect(val, false);
  };

  onFilterClick = val => {
    const url = val.replace("{pageNo}", 1);
    this.props.setIsNotGoBackFromPDP();
    this.props.history.push(url, {
      isFilter: false
    });
  };
  render() {
    const { facetData, facetdatacategory } = this.props;
    const url = this.props.location.pathname;
    let categoryId = null;
    if (CATEGORY_REGEX.test(url)) {
      categoryId = url.match(CATEGORY_CAPTURE_REGEX)[0];
    }
    return (
      <React.Fragment>
        <div className={styles.filterOpen}>
          <div className={styles.filterDetails}>
            <div className={styles.facetdatacategory}>
              <Accordion text="Categories" headerFontSize={16}>
                {this.props.isCategorySelected &&
                  facetdatacategory &&
                  facetdatacategory.filters &&
                  facetdatacategory.filters.map((val, i) => {
                    return (
                      <FilterCategoryL1
                        name={val.categoryName}
                        count={val.quantity}
                        value={val.categoryCode}
                        onClick={this.onL1Click}
                        isOpen={val.selected}
                      >
                        <FilterCategory
                          onClick={this.onL2Click}
                          onL3Click={this.onL3Click}
                          categoryTypeList={val.childFilters}
                        />
                      </FilterCategoryL1>
                    );
                  })}
              </Accordion>
            </div>
            {this.props.facetData &&
              facetData.map((facetDataValues, i) => {
                return (
                  facetDataValues && (
                    <div className={styles.facetData}>
                      <Accordion
                        key={i}
                        text={facetDataValues.name}
                        headerFontSize={16}
                      >
                        {facetDataValues.name === BRAND && (
                          <div className={styles.search}>
                            <SearchInput
                              placeholder="Search by brands"
                              onChange={val => this.onBrandSearch(val)}
                            />
                          </div>
                        )}
                        {facetDataValues &&
                          facetDataValues.name === COLOUR &&
                          facetDataValues.values &&
                          facetDataValues.values.map((val, i) => {
                            return (
                              <ColourSelect
                                colour={val.hexColor}
                                onSelect={data => this.onFilterClick(data)}
                                selected={val.selected}
                                value={val.url}
                              />
                            );
                          })}
                        {facetDataValues &&
                          facetDataValues.name !== COLOUR &&
                          facetDataValues.values &&
                          facetDataValues.values.map((val, i) => {
                            return (
                              <FilterSelect
                                onClick={this.onFilterClick}
                                selected={val.selected}
                                hexColor={val.hexColor}
                                label={val.name}
                                count={val.count}
                                url={val.url}
                                value={val.value}
                                isBrand={facetDataValues.name === BRAND}
                                categoryId={categoryId}
                                history={this.props.history}
                              />
                            );
                          })}
                      </Accordion>
                    </div>
                  )
                );
              })}
          </div>
        </div>
        {/* <div
          className={
            this.props.isFilterOpen ? styles.footerOpen : styles.footer
          }
        >
          <div className={styles.buttonHolder}>
            <div className={styles.button} onClick={this.onClear}>
              Reset
            </div>
          </div>
          <div className={styles.buttonHolder}>
            <div className={styles.redButton} onClick={() => this.onApply()}>
              Apply
            </div>
          </div>
        </div> */}
      </React.Fragment>
    );
  }
}
