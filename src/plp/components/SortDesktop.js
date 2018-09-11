import React from "react";
import PropTypes from "prop-types";
import styles from "./SortDesktop.css";
import queryString from "query-string";
import { applySortToUrl } from "./SortUtils.js";
import SelectBoxDesktop from "../../general/components/SelectBoxDesktop";
import dropDownSortIcon from "../../general/components/img/sortIcon.svg";
export const ARRAY_OF_SORTS = [
  "relevance",
  "isProductNew",
  "name-asc",
  "name-desc",
  "price-asc",
  "price-desc",
  "isDiscountedPrice",
  "promotedpriority-asc"
];

export default class SortDesktop extends React.Component {
  onClick(val) {
    let searchText = "";
    let icid2 = null;
    let cid = null;
    if (this.props.onClick) {
      if (this.props.location.search) {
        const parsedQueryString = queryString.parse(this.props.location.search);
        if (parsedQueryString.icid2) {
          icid2 = parsedQueryString.icid2;
        }
        if (parsedQueryString.cid) {
          cid = parsedQueryString.cid;
        }
        if (parsedQueryString.q) {
          searchText = parsedQueryString.q;
        } else if (parsedQueryString.text) {
          searchText = parsedQueryString.text;
        }
      }

      const url = applySortToUrl(
        searchText,
        this.props.location.pathname,
        val.value,
        icid2,
        cid
      );
      this.props.history.push(url, {
        isFilter: false
      });
      this.props.onClick();
      this.props.setIfSortHasBeenClicked();
    }
  }
  handleCloseClick = () => {
    this.props.onCloseSort();
  };
  render() {
    return (
      <div className={styles.base}>
        <SelectBoxDesktop
          value={
            this.props.sort &&
            this.props.sort.find(item => item.selected === true).code
          }
          label={
            this.props.sort &&
            this.props.sort.find(item => item.selected === true).name
          }
          height={40}
          options={
            this.props.sort &&
            this.props.sort.map((val, i) => {
              return {
                value: val.code,
                label: val.name
              };
            })
          }
          image={dropDownSortIcon}
          onChange={val => this.onClick(val)}
          size={20}
          leftChild={"Sort by :"}
          rightChildSize={35}
          leftChildSize={80}
          labelWithLeftChild={true}
        />
      </div>
    );
  }
}

SortDesktop.PropTypes = {
  sortList: PropTypes.shape({ name: PropTypes.string, code: PropTypes.string }),
  onClick: PropTypes.func
};
