import React from "react";
import styles from "./ShopeByBrandLists.css";
import PropTypes from "prop-types";
import { Icon } from "xelpmoc-core";
import arrowIcon from "../../general/components/img/arrow.svg";
export default class ShopeByBrandLists extends React.Component {
  handleClick(val) {
    if (this.props.onClick) {
      this.props.onClick(val);
    }
  }
  render() {
    return (
      <div
        className={styles.base}
        onClick={val => this.handleClick({ value: this.props.brandList })}
      >
        <div className={styles.arrowHolder}>
          <Icon image={arrowIcon} size={16} />
        </div>
        {this.props.brandList}
      </div>
    );
  }
}
ShopeByBrandLists.propTypes = {
  onClick: PropTypes.func,
  brandList: PropTypes.string
};
