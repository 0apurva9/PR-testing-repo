import React from "react";
import PropTypes from "prop-types";
import styles from "./FooterButton.css";
import { Icon } from "xelpmoc-core";
export default class FooterButton extends React.Component {
  handleClick() {
    if (this.props.onClick) {
      this.props.onClick();
    }
  }
  render() {
    return (
      <div
        className={styles.base}
        style={{
          backgroundColor: this.props.backgroundColor,
          borderRight: `1px solid ${this.props.borderColor}`
        }}
        onClick={() => this.handleClick()}
      >
        {this.props.icon && (
          <div className={styles.iconHolder}>
            <Icon image={this.props.icon} size={20} />
          </div>
        )}
        <div
          className={styles.labelHolder}
          style={{ ...this.props.labelStyle }}
        >
          {this.props.label}
        </div>
      </div>
    );
  }
}
FooterButton.propTyes = {
  backgroundColor: PropTypes.string,
  borderColor: PropTypes.string,
  icon: PropTypes.string,
  onClick: PropTypes.func,
  labelStyle: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number,
    fontFamily: PropTypes.string
  })
};
FooterButton.defaultProps = {
  labelStyle: {
    color: "#8d8d8d",
    fontSize: 14,
    fontFamily: "semibold"
  }
};
