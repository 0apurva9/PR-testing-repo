import React from "react";
import FilterSelect from "./FilterSelect";
import SearchInput from "../../general/components/SearchInput";
import styles from "./BrandFilterTabDesktop.css";
import * as UserAgent from "../../lib/UserAgent.js";
import DesktopOnly from "../../general/components/DesktopOnly.js";
import MobileOnly from "../../general/components/MobileOnly.js";
class BrandFilterTabDesktop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brandSearchString: ""
    };
  }
  onBrandSearch = val => {
    this.setState({ brandSearchString: val });
  };

  onFilterClick = val => {
    if (this.props.onFilterClick) {
      this.props.onFilterClick(val);
    }
  };
  render() {
    let brandsList = this.props.brandsList;
    if (this.state.brandSearchString !== "") {
      brandsList = brandsList.filter(brand => {
        return brand.name
          .toLowerCase()
          .includes(this.state.brandSearchString.toLowerCase());
      });
    }
    return (
      <div className={styles.base}>
        <div className={styles.search}>
          <SearchInput
            placeholder="Search by brands"
            onChange={this.onBrandSearch}
          />
        </div>
        <div className={styles.brandsList}>
          <React.Fragment>
            <MobileOnly>
              {brandsList &&
                brandsList.map((val, i) => {
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
            </MobileOnly>
            <DesktopOnly>
              {brandsList &&
                brandsList.map((val, i) => {
                  if (i < 5) {
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
                  }
                })}
            </DesktopOnly>
          </React.Fragment>
        </div>
      </div>
    );
  }
}

export default BrandFilterTabDesktop;
