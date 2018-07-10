import React from "react";
import FilterSelect from "./FilterSelect";
import styles from "./PriceFilterTabDesktop.css";
import Input2 from "../../general/components/Input2";
import Icon from "../../xelpmoc-core/Icon";
import CircleButton from "../../xelpmoc-core/CircleButton";
import ApplyPriceFilterIcon from "./img/arrow.svg";
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
    console.log("click me in circle button", this.state);
    if (
      this.state.minRange &&
      this.state.maxRange &&
      parseInt(this.state.minRange, 10) < parseInt(this.state.maxRange, 10)
    ) {
      console.log(this.state);
    }
  };
  onFilterClick = val => {
    if (this.props.onFilterClick) {
      console.log(val);
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
                value={this.state.minRange}
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
