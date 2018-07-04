import React from "react";
import FilterSelect from "./FilterSelect";
import SearchInput from "../../general/components/SearchInput";
import styles from "./BrandFilterTabDesktop.css";
class BrandFilterTabDesktop extends React.Component {
  onBrandSearch = value => {
    if (this.props.onBrandSearch) {
      this.props.onBrandSearch(value);
    }
  };
  render() {
    return (
      <div className={styles.base}>
        <div className={styles.search}>
          <SearchInput
            placeholder="Search by brands"
            onChange={this.onBrandSearch}
          />
        </div>
        <div className={styles.brandsList}>
          {this.props.brandsList &&
            this.props.brandsList.map((val, i) => {
              return (
                <FilterSelect
                  onClick={this.onFilterClick}
                  selected={val.selected}
                  hexColor={val.hexColor}
                  label={val.name}
                  count={val.count}
                  url={val.url}
                  value={val.value}
                  // isBrand={facetDataValues.name === BRAND}
                  // categoryId={categoryId}
                  history={this.props.history}
                />
              );
            })}
        </div>
      </div>
    );
  }
}

export default BrandFilterTabDesktop;
