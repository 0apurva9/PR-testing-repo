import React from "react";
import styles from "./CheckBoxSquare.css";
import PropTypes from "prop-types";
export default class CheckBoxSquare extends React.Component {
  render() {
    let className = styles.base;
    if (this.props.selected) {
      className = styles.selected;
    }
    let squareBox = styles.square;
    if (this.props.checked) {
      squareBox = styles.checked;
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
          />
        )}
      </React.Fragment>
    );
  }
}
CheckBoxSquare.propTypes = {
  isCircle: PropTypes.bool,
  selected: PropTypes.bool,
  size: PropTypes.string,
  checked: PropTypes.bool
};
CheckBoxSquare.defaultProps = {
  size: "20px",
  isCircle: true
};
