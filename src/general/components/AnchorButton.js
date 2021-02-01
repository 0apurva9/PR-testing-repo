import React from "react";
import PropTypes from "prop-types";
import styles from "./AnchorButton.css";
export default class AnchorButton extends React.Component {
  handleClick() {
    if (this.props.onClick && !this.props.disabled) {
      this.props.onClick();
    }
  }

  render() {
    return (
      <div
        id={this.props.id}
        className={this.props.disabled ? styles.disabled : styles.base}
        style={{
          color: this.props.color,
          fontSize: this.props.size,
          fontFamily: this.props.fontFamily
        }}
        onClick={() => {
          this.handleClick();
        }}
      >
        {this.props.label}
      </div>
    );
  }
}
AnchorButton.propTypes = {
  onClick: PropTypes.func,
  color: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string,
  fontFamily: PropTypes.string,
  disabled: PropTypes.bool,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
