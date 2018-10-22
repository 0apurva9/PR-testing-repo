import React from "react";
import FilterSelect from "./FilterSelect";
import styles from "./PriceFilterTabDesktop.css";
import Input2 from "../../general/components/Input2";
import Icon from "../../xelpmoc-core/Icon";
import CircleButton from "../../xelpmoc-core/CircleButton";
import ApplyPriceFilterIcon from "./img/arrow.svg";
const PRICE_FILTER_REG_EX = /(price:[,₹0-9]+-[,₹0-9]+)/;
export default class PriceFilterTabDesktop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minRange: "",
      maxRange: "",
      minPrice: "",
      maxprice: ""
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
      let currentAppliedFilters = decodeURIComponent(
        this.props.history.location.search
      );
      if (currentAppliedFilters) {
        if (PRICE_FILTER_REG_EX.test(currentAppliedFilters)) {
          currentAppliedFilters = currentAppliedFilters
            .substring(3)
            .replace(
              PRICE_FILTER_REG_EX,
              `price:${this.state.minRange}-${this.state.maxRange}`
            );
        } else {
          currentAppliedFilters = `${currentAppliedFilters.substring(
            3
          )}:price:${this.state.minRange}-${this.state.maxRange}`;
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
            .replace(
              PRICE_FILTER_REG_EX,
              `price:${this.state.minRange}-${this.state.maxRange}`
            );
        }
      }

      this.props.history.push({
        pathname: this.props.history.location.pathname,
        search: `q=${encodeURIComponent(currentAppliedFilters)}`
      });
    }
  };
  onFilterClick = val => {
    if (this.props.onFilterClick) {
      this.props.onFilterClick(val);
    }
  };

  getMinPrice = val => {
    let sym = /₹/gi;
    var value = val.replace(sym, "");
    var price = value.split("-");
    return price[0];
  };
  getMaxPrice = val => {
    let sym = /₹/gi;
    var value = val.replace(sym, "");
    var price = value.split("-");
    return price[1];
  };
  render() {
    return (
      <div className={styles.base}>
        <div className={styles.priceList}>
          {this.props.priceList &&
            this.props.priceList.map((val, i) => {
              return (
                <FilterSelect
                  onClick={this.onFilterClick}
                  selected={val.selected}
                  hexColor={val.hexColor}
                  label={val.name}
                  count={val.count}
                  url={val.url}
                  value={val.value}
                  history={this.props.history}
                />
              );
            })}
        </div>
        <div className={styles.inputPrice}>
          <span className={styles.priceRangeLabel}>Price Range</span>
          <div className={styles.inputWrapper}>
            <div className={styles.inputBox}>
              <Input2
                placeholder={this.getMinPrice(this.props.priceList[0].value)}
                onlyNumber
                maxLength={7}
                value={this.state.minRange}
                onChange={minRange => this.onChangeOfRange({ minRange })}
              />
            </div>
            <div className={styles.inputBox}>
              <Input2
                placeholder={this.getMaxPrice(
                  this.props.priceList[this.props.priceList.length - 1].value
                )}
                onlyNumber
                maxLength={7}
                value={this.state.maxRange}
                onChange={maxRange => this.onChangeOfRange({ maxRange })}
              />
            </div>
            <div className={styles.applyPriceRange}>
              <CircleButton
                icon={<Icon image={ApplyPriceFilterIcon} size={20} />}
                color={
                  this.state.maxRange.length > 2 &&
                  this.state.minRange.length > 0
                    ? "#fe214c"
                    : "#d8d8d8"
                }
                size={30}
                onClick={this.applyPriceManually}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
