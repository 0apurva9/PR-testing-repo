import React from "react";
import styles from "./MultiSelectCheckbox.css";
import PropTypes from "prop-types";
export default class MultiSelectCheckbox extends React.Component {
  render() {
    let className = styles.base;
    if (this.props.selected) {
      className = styles.selected;
    }
    return (
      <React.Fragment>
        {/* {this.props.isCircle && ( */}
        <div
          className={className}
          style={{ width: this.props.size, height: this.props.size }}
        />
        {/* )} */}
        {/* {!this.props.isCircle && (
          <div
            className={squareBox}
            style={{ width: this.props.size, height: this.props.size }}
          />
        )} */}
      </React.Fragment>
    );
  }
}
MultiSelectCheckbox.propTypes = {
  isCircle: PropTypes.bool,
  selected: PropTypes.string,
  size: PropTypes.string,
  height: PropTypes.string
};
MultiSelectCheckbox.defaultProps = {
  size: "20px",
  isCircle: true
};
