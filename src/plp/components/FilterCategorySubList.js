import React from "react";
import styles from "./FilterCategorySubList.css";
import PropTypes from "prop-types";
export default class FilterCategorySubList extends React.Component {
  handleClick() {
    if (this.props.onClick) {
      this.props.onClick(
        this.props.value,
        "Category",
        this.props.subListItem,
        this.props.subListItem
      );
    }
  }

  render() {
    return (
      <div className={styles.base} onClick={() => this.handleClick()}>
        <div className={this.props.selected ? styles.active : styles.header}>
          <div
            className={
              this.props.selected
                ? styles.subCategoryListActive
                : styles.subCategoryList
            }
          >
            {this.props.subListItem}
          </div>
          <div
            className={
              this.props.selected
                ? styles.subCategoryListCountActive
                : styles.subCategoryListCount
            }
          >
            {this.props.subListCount}
          </div>
        </div>
      </div>
    );
  }
}
FilterCategorySubList.propTypes = {
  selectItem: PropTypes.func,
  subListItem: PropTypes.string,
  subListCount: PropTypes.number,
  onClick: PropTypes.func,
  value: PropTypes.string,
  selected: PropTypes.array
};
