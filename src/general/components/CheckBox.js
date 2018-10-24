import React from "react";
import styles from "./CheckBox.css";
export default class CheckBox extends React.Component {
  render() {
    let className = this.props.shape == "box" ? styles.boxBase : styles.base;
    if (this.props.selected) {
      className =
        this.props.shape == "box" ? styles.boxSeleted : styles.selected;
    }

    return (
      <div
        className={className}
        style={{ width: this.props.size, height: this.props.size }}
      />
    );
  }
}
CheckBox.defaultProps = {
  size: "20px"
};
