import React, { Component } from "react";
import FilterCategoryDetails from "./FilterCategoryDetails";
import FilterCategorySubList from "./FilterCategorySubList";
import PropTypes from "prop-types";

import styles from "./FilterCategory.css";
export default class FilterCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: []
    };
  }

  render() {
    return (
      <div className={styles.base}>
        {this.props.categoryTypeList.map((val, i) => {
          return (
            <FilterCategoryDetails
              category={val.categoryName}
              categoryCount={val.quantity}
              key={i}
              value={val.categoryCode}
              onClick={this.props.onClick}
            >
              {val.childFilters &&
                val.childFilters.map((data, i) => {
                  if (data.quantity > 0 && !data.childFilters) {
                    return (
                      <FilterCategorySubList
                        subListItem={data.categoryName}
                        key={i}
                        value={data.categoryCode}
                        onClick={this.props.onL3Click}
                        subListCount={data.quantity}
                        selected={data.selected}
                      />
                    );
                  }
                  if (data.childFilters && data.childFilters.length > 0) {
                    return (
                      <FilterCategoryDetails
                        category={data.categoryName}
                        categoryCount={data.quantity}
                        key={i}
                        value={data.categoryCode}
                        onClick={this.props.onClick}
                      >
                        {data.childFilters &&
                          data.childFilters.map((val, i) => {
                            if (val.quantity > 0) {
                              return (
                                <FilterCategorySubList
                                  subListItem={val.categoryName}
                                  key={i}
                                  value={val.categoryCode}
                                  onClick={this.props.onL3Click}
                                  subListCount={val.quantity}
                                  selected={val.selected}
                                />
                              );
                            }
                          })}
                      </FilterCategoryDetails>
                    );
                  }
                })}
            </FilterCategoryDetails>
          );
        })}
      </div>
    );
  }
}
FilterCategory.propTypes = {
  category: PropTypes.string,
  categoryCount: PropTypes.number,
  categoryTypeList: PropTypes.array,
  onClick: PropTypes.func,
  onL3Click: PropTypes.func,
  typeList: PropTypes.arrayOf(
    PropTypes.shape({
      subListItem: PropTypes.string,
      subListCount: PropTypes.number
    })
  )
};
