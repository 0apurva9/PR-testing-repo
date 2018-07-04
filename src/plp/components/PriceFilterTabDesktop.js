import React from "react";
import FilterSelect from "./FilterSelect";
import styles from "./PriceFilterTabDesktop.css";
import Input from "../../xelpmoc-core/Input";
import CircleButton from "../../xelpmoc-core/CircleButton";
export default class PriceFilterTabDesktop extends React.Component {
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
              <Input placeholder="500" />
            </div>
            <div className={styles.inputBox}>
              <Input placeholder="1200" />
            </div>
            <div className={styles.applyPriceRange}>
              <CircleButton />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
