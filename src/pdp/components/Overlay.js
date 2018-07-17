import React from "react";
import PropTypes from "prop-types";
import styles from "./Overlay.css";
export default class Overlay extends React.Component {
  render() {
    return (
      <div className={styles.base}>
        {this.props.children}
        <div className={styles.overlay}>
          <div className={styles.overlayText}>{this.props.labelText}</div>
        </div>
      </div>
    );
  }
}
Overlay.propTypes = {
  labelText: PropTypes.string
};
