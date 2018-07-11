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
      let currentUrl = decodeURIComponent(this.props.history.location.search);
      if (PRICE_FILTER_REG_EX.test(currentUrl)) {
        currentUrl = currentUrl
          .substring(3)
          .replace(
            PRICE_FILTER_REG_EX,
            `price:${this.state.minRange}-${this.state.maxRange}`
          );
      } else {
        currentUrl = `${currentUrl.substring(3)}:price:${this.state.minRange}-${
          this.state.maxRange
        }`;
      }

      this.props.history.push({
        pathname: this.props.history.location.pathname,
        search: `q=${encodeURIComponent(currentUrl)}`
      });
    }
  };
  onFilterClick = val => {
    if (this.props.onFilterClick) {
      this.props.onFilterClick(val);
    }
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
                placeholder="500"
                onlyNumber
                maxLength={7}
                value={this.state.minRange}
                onChange={minRange => this.onChangeOfRange({ minRange })}
              />
            </div>
            <div className={styles.inputBox}>
              <Input2
                placeholder="1200"
                onlyNumber
                maxLength={7}
                value={this.state.maxRange}
                onChange={maxRange => this.onChangeOfRange({ maxRange })}
              />
            </div>
            <div className={styles.applyPriceRange}>
              <CircleButton
                icon={<Icon image={ApplyPriceFilterIcon} size={20} />}
                color={"#d8d8d8"}
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
