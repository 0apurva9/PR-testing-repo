import React from "react";
import FilterSelect from "./FilterSelect";
import styles from "./PriceFilterTabDesktop.css";
import ControlInput from "../../general/components/ControlInput";
import Icon from "../../xelpmoc-core/Icon";
import CircleButton from "../../xelpmoc-core/CircleButton";
import ApplyPriceFilterIcon from "./img/arrow.svg";
import { TEXT_REGEX } from "./FilterUtils";
const PRICE_FILTER_REG_EX = /(:price:[,₹0-9]+-[,₹0-9]+)/g;
const ABOVE_PRICE_FILTER_REGEX = /(:price:[,₹0-9]+\+and\+Above)/g;
const LAST_PRICE_LIMIT_REGEX = /(:price:[,₹0-9]+\+-[,₹0-9]+)/g;
const MAX_PRICE = "Max Price";
const MIN_PRICE = "Min Price";
const PRICE_TAG = "price%3A";
export default class PriceFilterTabDesktop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minRange: "",
      maxRange: ""
    };
  }

  onChangeOfRange = val => {
    this.setState(val);
  };

  applyPriceManually = () => {
    if (
      this.state.minRange &&
      this.state.maxRange &&
      parseInt(this.state.minRange, 10) < parseInt(this.state.maxRange, 10)
    ) {
      let minRange =
        "₹" +
        this.state.minRange.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      let maxRange =
        "₹" +
        this.state.maxRange.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      let currentAppliedFilters = "   :relevance";
      let searchHistory = this.props.history.location.search;
      if (searchHistory.includes("icid") && this.props.query) {
        searchHistory = encodeURI(this.props.query);
      }
      if (/q=/.test(this.props.history.location.search)) {
        currentAppliedFilters = decodeURIComponent(searchHistory);
      } else {
        if (TEXT_REGEX.test(this.props.history.location.search)) {
          const textParam = TEXT_REGEX.exec(searchHistory);
          currentAppliedFilters = `   ${
            textParam && textParam[1] ? textParam[1] : ""
          }:relevance`;
        }
      }
      if (currentAppliedFilters) {
        if (PRICE_FILTER_REG_EX.test(currentAppliedFilters)) {
          if (/q=/.test(currentAppliedFilters)) {
            currentAppliedFilters = currentAppliedFilters
              .substring(3)
              .replace(PRICE_FILTER_REG_EX, `:price:${minRange}-${maxRange}`);
          } else {
            currentAppliedFilters = currentAppliedFilters.replace(
              PRICE_FILTER_REG_EX,
              `:price:${minRange}-${maxRange}`
            );
          }
        } else {
          if (/q=/.test(currentAppliedFilters)) {
            currentAppliedFilters = `${currentAppliedFilters.substring(
              3
            )}:price:${minRange}-${maxRange}`;
          } else {
            currentAppliedFilters = `${currentAppliedFilters}:price:${minRange}-${maxRange}`;
          }
        }
      } else {
        if (this.props.priceList[0] && this.props.priceList[0].url) {
          let newSearchUrl = decodeURIComponent(
            this.props.priceList[0].url.substring(
              this.props.priceList[0].url.indexOf("?")
            )
          );
          currentAppliedFilters = newSearchUrl
            .substring(3)
            .replace(PRICE_FILTER_REG_EX, `price:${minRange}-${maxRange}`);
        }
      }
      this.props.history.push({
        pathname: this.props.history.location.pathname,
        search: `q=${encodeURIComponent(currentAppliedFilters)}`
      });
    }
  };

  removePriceFilters = () => {
    let currentAppliedFilters = "";
    currentAppliedFilters = decodeURIComponent(
      this.props.history.location.search
    );

    if (currentAppliedFilters) {
      if (PRICE_FILTER_REG_EX.test(currentAppliedFilters)) {
        currentAppliedFilters = currentAppliedFilters
          .substring(3)
          .replace(PRICE_FILTER_REG_EX, "");
      }

      if (ABOVE_PRICE_FILTER_REGEX.test(currentAppliedFilters)) {
        currentAppliedFilters = currentAppliedFilters.replace(
          ABOVE_PRICE_FILTER_REGEX,
          ""
        );
        currentAppliedFilters = currentAppliedFilters.replace("?q=", "");
      }
      if (LAST_PRICE_LIMIT_REGEX.test(currentAppliedFilters)) {
        currentAppliedFilters = currentAppliedFilters.replace(
          LAST_PRICE_LIMIT_REGEX,
          ""
        );
        currentAppliedFilters = currentAppliedFilters.replace("?q=", "");
      }
      this.props.history.push({
        pathname: this.props.history.location.pathname,
        search: `q=${encodeURIComponent(currentAppliedFilters)}`
      });
    }
  };

  onFilterClick = (data, filterType, filterValue) => {
    if (this.props.onFilterClick) {
      this.props.onFilterClick(data, filterType, filterValue);
    }
  };

  geturl = () => {
    let url =
      this.props.priceList &&
      this.props.priceList[0] &&
      this.props.priceList[0].url;
    url = url.split("price");
    url = url[0];
    return url;
  };

  pricefilter = () => {
    let url = this.geturl();
    url = url + `${PRICE_TAG}${this.state.minRange}-${this.state.maxRange}`;
    if (this.props.onFilterClick) {
      this.props.onFilterClick(url);
    }
  };

  render() {
    return (
      <div className={styles.base}>
        {this.props.rangeApplied && (
          <div className={styles.resetPrice} onClick={this.removePriceFilters}>
            Any Price
          </div>
        )}

        <div className={styles.priceList}>
          {this.props.priceList &&
            this.props.priceList.map((val, i) => {
              return (
                <FilterSelect
                  onClick={this.onFilterClick}
                  selected={val.selected || this.props.customRange}
                  hexColor={val.hexColor}
                  label={val.name}
                  count={val.count}
                  url={val.url}
                  value={val.value}
                  history={this.props.history}
                  typeOfFilter={this.props.typeOfFilter}
                  key={i}
                />
              );
            })}
        </div>
        <div className={styles.inputPrice}>
          <span className={styles.priceRangeLabel}>Price Range</span>
          <div className={styles.inputWrapper}>
            <div className={styles.inputBox}>
              <ControlInput
                height={33}
                placeholder={MIN_PRICE}
                onlyNumber
                maxLength={7}
                value={this.state.minRange}
                onChange={minRange => this.onChangeOfRange({ minRange })}
              />
            </div>
            <div className={styles.inputBox}>
              <ControlInput
                height={33}
                placeholder={MAX_PRICE}
                onlyNumber
                maxLength={7}
                value={this.state.maxRange}
                onChange={maxRange => this.onChangeOfRange({ maxRange })}
              />
            </div>
            <div
              className={
                this.state.maxRange.length > 2 && this.state.minRange.length > 0
                  ? styles.clickableButton
                  : styles.applyPriceRange
              }
            >
              <CircleButton
                icon={<Icon image={ApplyPriceFilterIcon} size={20} />}
                color={
                  this.state.maxRange.length > 2 &&
                  this.state.minRange.length > 0
                    ? "#fe214c"
                    : "#d8d8d8"
                }
                size={33}
                onClick={() => this.applyPriceManually()}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
