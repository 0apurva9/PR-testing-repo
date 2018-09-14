import React from "react";
import styles from "./CommonCenter.css";

export default class CommonCenter extends React.Component {
  render() {
    return (
      <div className={styles.base}>
        <div className={styles.center}>{this.props.children}</div>
      </div>
    );
  }
}
