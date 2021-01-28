import React from "react";
import styles from "./CheckBox.css";
import PropTypes from "prop-types";
export default class CheckBox extends React.Component {
  handleClick() {
    if (this.props.onClick) {
      this.props.onClick();
    }
  }

  render() {
    let className = styles.base;
    if (this.props.selected) {
      className = styles.selected;
    }
    let squareBox = styles.square;
    if (this.props.checked) {
      squareBox = styles.checked;
    }
    if (this.props.isFromProductBundling && !this.props.checked) {
      squareBox = styles.productBundlingUnchecked;
    }
    if (this.props.isFromProductBundling && this.props.checked) {
      squareBox = styles.productBundlingChecked;
    }
    return (
      <React.Fragment>
        {this.props.isCircle && (
          <div
            className={className}
            style={{ width: this.props.size, height: this.props.size }}
          />
        )}
        {!this.props.isCircle && (
          <div
            className={squareBox}
            style={{ width: this.props.size, height: this.props.size }}
            onClick={() => this.handleClick()}
          />
        )}
      </React.Fragment>
    );
  }
}
CheckBox.propTypes = {
  isCircle: PropTypes.bool,
  onClick: PropTypes.func,
  isFromProductBundling: PropTypes.bool,
  checked: PropTypes.bool,
  selected: PropTypes.bool,
  size: PropTypes.string
};
CheckBox.defaultProps = {
  size: "20px",
  isCircle: true
};
