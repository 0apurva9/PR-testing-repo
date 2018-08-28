import React from "react";
import cloneDeep from "lodash.clonedeep";
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
import BrandFilterTabDesktop from "./BrandFilterTabDesktop";
import PriceFilterTabDesktop from "./PriceFilterTabDesktop";

const BRAND = "Brand";
const COLOUR = "Colour";
const PRICE = "Price";
export default class FilterDesktop extends React.Component {
  constructor(props) {
    super();
    this.state = {
      openedFilters: []
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

  onCategorySelect = (val, isFilter) => {
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

    this.props.history.push(url, {
      isFilter: false
    });
  };
  onOpenAccordion = filterName => {
    const openedFilters = cloneDeep(this.state.openedFilters);
    const indexOfFilter = this.state.openedFilters.indexOf(filterName);
    if (indexOfFilter >= 0) {
      openedFilters.splice(indexOfFilter, 1);
      this.setState({ openedFilters });
    } else {
      openedFilters.push(filterName);
      this.setState({ openedFilters });
    }
  };
  render() {
    const { facetData, facetdatacategory } = this.props;

    const url = this.props.location.pathname;
    let categoryId = null;
    if (CATEGORY_REGEX.test(url)) {
      categoryId = url.match(CATEGORY_CAPTURE_REGEX)[0];
    }
    let autoShowFilters = [],
      filterWithCollapse = [];
    if (facetData) {
      autoShowFilters = cloneDeep(facetData).splice(0, 4);
      filterWithCollapse = cloneDeep(facetData).splice(3, 20);
    } else {
      return <div />;
    }
    return (
      <div className={styles.filterScroll} id="filterWrapper">
        <div className={styles.filterDetails} id="filter">
          <div className={styles.filtersOptionsList}>
            <Accordion
              text1="Refine"
              text2="Clear all"
              isOpen={true}
              headerFontSize={16}
              text1Size={14}
              text2Color={"#fe214c"}
              text2Size={14}
              textAlign={"right"}
              handleClick={() => this.onClear()}
              padding="0px 40px 0px 20px"
              backgroundColor="#f9f9f9"
            >
              <div className={styles.subFilterDetails}>
                <div className={styles.filterHeader}>Category</div>

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
                {autoShowFilters.map((facetDataValues, i) => {
                  return (
                    facetDataValues && (
                      <div className={styles.facetData}>
                        <div className={styles.filterHeader}>
                          {facetDataValues.name}
                        </div>

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
                          facetDataValues.name === BRAND &&
                          facetDataValues.values && (
                            <div className={styles.filtersSubTab}>
                              <BrandFilterTabDesktop
                                onFilterClick={this.onFilterClick}
                                brandsList={facetDataValues.values}
                                onBrandSearch={this.onBrandSearch}
                                history={this.props.history}
                              />
                            </div>
                          )}
                        {facetDataValues &&
                          facetDataValues.name === PRICE &&
                          facetDataValues.values && (
                            <div className={styles.filtersSubTab}>
                              <PriceFilterTabDesktop
                                priceList={facetDataValues.values}
                                history={this.props.history}
                                onFilterClick={this.onFilterClick}
                              />
                            </div>
                          )}
                        {facetDataValues &&
                          facetDataValues.name !== COLOUR &&
                          facetDataValues.name !== BRAND &&
                          facetDataValues.name !== PRICE &&
                          facetDataValues.values && (
                            <div className={styles.filtersSubTab}>
                              {facetDataValues.values.map((val, i) => {
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
                            </div>
                          )}
                      </div>
                    )
                  );
                })}
              </div>
            </Accordion>
          </div>
          <div className={styles.filtersOptions}>
            {filterWithCollapse.map((facetDataValues, i) => {
              return (
                facetDataValues && (
                  <div className={styles.facetData}>
                    <Accordion
                      key={i}
                      text={facetDataValues.name}
                      headerFontSize={16}
                      isOpen={
                        (facetDataValues.values &&
                          facetDataValues.values.filter(filter => {
                            return filter.selected;
                          }).length > 0) ||
                        this.state.openedFilters.includes(facetDataValues.name)
                      }
                      onOpen={() => this.onOpenAccordion(facetDataValues.name)}
                    >
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
                      <div className={styles.filtersSubTab}>
                        {facetDataValues &&
                          facetDataValues.name === BRAND &&
                          facetDataValues.values && (
                            <BrandFilterTabDesktop
                              brandsList={facetDataValues.values}
                              onBrandSearch={this.onBrandSearch}
                            />
                          )}
                        {facetDataValues &&
                          facetDataValues.name === PRICE &&
                          facetDataValues.values && (
                            <PriceFilterTabDesktop
                              priceList={facetDataValues.values}
                              history={this.props.history}
                              onFilterClick={this.onFilterClick}
                            />
                          )}
                        {facetDataValues &&
                          facetDataValues.name !== COLOUR &&
                          facetDataValues.name !== BRAND &&
                          facetDataValues.name !== PRICE &&
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
                      </div>
                    </Accordion>
                  </div>
                )
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
