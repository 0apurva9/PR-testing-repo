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
import DesktopOnly from "../../general/components/DesktopOnly";
import ShowBrandModal from "./ShowBrandModal";
import {
  setDataLayerForSelectedFilterDirectCalls,
  ADOBE_DIRECT_CALL_FOR_FILTER_OPTION
} from "../../lib/adobeUtils";
const BRAND = "Brand";
const COLOUR = "Colour";
const PRICE = "Price";
export default class FilterDesktop extends React.Component {
  constructor(props) {
    super();
    this.state = {
      openedFilters: [],
      openBrandPopUp: false
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
  onCategorySelect = (val, filterType, filterValue, isFilter) => {
    setDataLayerForSelectedFilterDirectCalls(
      ADOBE_DIRECT_CALL_FOR_FILTER_OPTION,
      filterType,
      filterValue
    );
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
  onL1Click = (val, filterType, filterValue) => {
    this.onCategorySelect(val, filterType, filterValue, true);
  };
  onL2Click = (val, filterType, filterValue) => {
    this.onCategorySelect(val, filterType, filterValue, true);
  };
  onL3Click = (val, filterType, filterValue) => {
    this.onCategorySelect(val, filterType, filterValue, false);
  };
  onFilterClick = (val, filterType, filterValue) => {
    console.log(filterType);
    console.log(filterValue);
    const url = val.replace("{pageNo}", 1);
    setDataLayerForSelectedFilterDirectCalls(
      ADOBE_DIRECT_CALL_FOR_FILTER_OPTION,
      filterType,
      filterValue
    );
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
  viewMore(brandData) {
    this.setState({ openBrandPopUp: true });
  }
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
      filterWithCollapse = cloneDeep(facetData).splice(4, 20);
    } else {
      return <div />;
    }
    return (
      <React.Fragment>
        {this.state.openBrandPopUp &&
          autoShowFilters.map((facetDataValues, i) => {
            return (
              facetDataValues &&
              facetDataValues.name === BRAND &&
              facetDataValues.values && (
                <ShowBrandModal
                  typeOfFilter={facetDataValues.name}
                  brandData={facetDataValues.values}
                  closeModal={() => this.setState({ openBrandPopUp: false })}
                  onSelect={(data, filterType, filterValue) =>
                    this.onFilterClick(data, filterType, filterValue)
                  }
                />
              )
            );
          })}
        <div className={styles.filterScroll} id="filterWrapper_desktop">
          <div className={styles.filterDetails} id="filter_desktop">
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
                  <div className={styles.catagoryHolder}>
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
                  </div>

                  {autoShowFilters.map((facetDataValues, i) => {
                    return (
                      facetDataValues && (
                        <div className={styles.facetData}>
                          <div className={styles.filterHeader}>
                            {facetDataValues.name}
                          </div>
                          <div className={styles.allDataHolder}>
                            {facetDataValues &&
                              facetDataValues.name === COLOUR &&
                              facetDataValues.values &&
                              facetDataValues.values.map((val, i) => {
                                return (
                                  <ColourSelect
                                    typeOfFilter={facetDataValues.name}
                                    colour={val.hexColor}
                                    onSelect={(data, filterType, filterValue) =>
                                      this.onFilterClick(
                                        data,
                                        filterType,
                                        filterValue
                                      )
                                    }
                                    selected={val.selected}
                                    value={val.url}
                                  />
                                );
                              })}
                          </div>
                          <div className={styles.filterBrandHolder}>
                            {facetDataValues &&
                              facetDataValues.name === BRAND &&
                              facetDataValues.values && (
                                <div>
                                  <BrandFilterTabDesktop
                                    typeOfFilter={facetDataValues.name}
                                    onFilterClick={this.onFilterClick}
                                    brandsList={facetDataValues.values}
                                    onBrandSearch={this.onBrandSearch}
                                    history={this.props.history}
                                  />
                                </div>
                              )}
                            <DesktopOnly>
                              {facetDataValues &&
                                facetDataValues.name === BRAND &&
                                facetDataValues.values.length > 5 && (
                                  <div
                                    className={styles.moreText}
                                    onClick={() =>
                                      this.viewMore(facetDataValues.values)
                                    }
                                  >
                                    More Brands
                                  </div>
                                )}
                            </DesktopOnly>
                          </div>
                          {facetDataValues &&
                            facetDataValues.name === PRICE && (
                              <div className={styles.filterPriceHolder}>
                                {facetDataValues.values && (
                                  <div>
                                    <PriceFilterTabDesktop
                                      typeOfFilter={facetDataValues.name}
                                      priceList={facetDataValues.values}
                                      history={this.props.history}
                                      onFilterClick={this.onFilterClick}
                                    />
                                  </div>
                                )}
                              </div>
                            )}
                          {facetDataValues &&
                            facetDataValues.name !== COLOUR &&
                            facetDataValues.name !== BRAND &&
                            facetDataValues.name !== PRICE && (
                              <div className={styles.filterPriceHolder}>
                                {facetDataValues.values && (
                                  <div>
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
                                          isBrand={
                                            facetDataValues.name === BRAND
                                          }
                                          categoryId={categoryId}
                                          history={this.props.history}
                                          typeOfFilter={facetDataValues.name}
                                        />
                                      );
                                    })}
                                  </div>
                                )}
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
                          this.state.openedFilters.includes(
                            facetDataValues.name
                          )
                        }
                        padding="0px 40px 0px 20px"
                        onOpen={() =>
                          this.onOpenAccordion(facetDataValues.name)
                        }
                      >
                        {facetDataValues &&
                          facetDataValues.name === COLOUR &&
                          facetDataValues.values && (
                            <div className={styles.allDataHolder}>
                              {facetDataValues.values.map((val, i) => {
                                return (
                                  <ColourSelect
                                    typeOfFilter={facetDataValues.name}
                                    colour={val.hexColor}
                                    onSelect={(data, filterType, filterValue) =>
                                      this.onFilterClick(
                                        data,
                                        filterType,
                                        filterValue
                                      )
                                    }
                                    selected={val.selected}
                                    value={val.url}
                                  />
                                );
                              })}
                            </div>
                          )}
                        <div className={styles.filtersSubTab}>
                          {facetDataValues &&
                            facetDataValues.name === BRAND && (
                              <div className={styles.allDataHolder}>
                                {facetDataValues.values && (
                                  <BrandFilterTabDesktop
                                    typeOfFilter={facetDataValues.name}
                                    brandsList={facetDataValues.values}
                                    onBrandSearch={this.onBrandSearch}
                                  />
                                )}
                              </div>
                            )}
                          {facetDataValues &&
                            facetDataValues.name === PRICE && (
                              <div className={styles.allDataHolder}>
                                {facetDataValues.values && (
                                  <PriceFilterTabDesktop
                                    typeOfFilter={facetDataValues.name}
                                    priceList={facetDataValues.values}
                                    history={this.props.history}
                                    onFilterClick={this.onFilterClick}
                                  />
                                )}
                              </div>
                            )}
                          {facetDataValues &&
                            facetDataValues.name !== COLOUR &&
                            facetDataValues.name !== BRAND &&
                            facetDataValues.name !== PRICE &&
                            facetDataValues.values && (
                              <div className={styles.allDataHolder}>
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
                                      typeOfFilter={facetDataValues.name}
                                    />
                                  );
                                })}
                              </div>
                            )}
                        </div>
                      </Accordion>
                    </div>
                  )
                );
              })}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
