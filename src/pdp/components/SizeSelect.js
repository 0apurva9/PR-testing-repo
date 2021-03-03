import React from "react";
import styles from "./SizeSelect.css";
import PropTypes from "prop-types";

export default class SizeSelect extends React.Component {
  handleClick() {
    if (!this.props.disabled && this.props.onSelect) {
      this.props.onSelect();
    }
  }

  render() {
    let className = styles.base;
    if (this.props.disabled) {
      className = styles.disabled;
    } else if (this.props.selected && this.props.isSizeOrLength !== "Power") {
      className = styles.baseActive;
    } else if (
      this.props.selected &&
      this.props.categoryEyeWear &&
      this.props.isSizeOrLength === "Power"
    ) {
      className = styles.baseActiveEyeWear;
    } else if (
      this.props.categoryEyeWear &&
      this.props.isSizeOrLength === "Power"
    ) {
      className = styles.powerStyle;
    }
    let sizeText = this.props.size;
    if (this.props.isSizeOrLength === "Power" && this.props.size > 0) {
      sizeText = `+${this.props.size}`;
    }
    return (
      <div className={className} onClick={() => this.handleClick()}>
        <div
          className={this.props.selected ? styles.selected : styles.textHolder}
          style={{ fontSize: this.props.fontSize }}
        >
          <h4>{sizeText}</h4>
        </div>
      </div>
    );
  }
}
SizeSelect.propTypes = {
  size: PropTypes.string,
  selected: PropTypes.bool,
  disabled: PropTypes.bool,
  fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onSelect: PropTypes.func,
  isSizeOrLength: PropTypes.string,
  categoryEyeWear: PropTypes.bool,
};
SizeSelect.defaultProps = {
  fontSize: 14,
  disabled: false
};
