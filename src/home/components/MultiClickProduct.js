import React from "react";

import styles from "./MultiClickProduct.css";

export default class MultiClickProduct extends React.Component {
  handleClick = () => {
    if (this.props.onClick) {
      this.props.onClick();
    }
  };
  render() {
    return (
      <div className={styles.base} onClick={this.handleClick}>
        <div className={styles.background} />
        <div className={styles.icon} />
        <div className={styles.content}>
          <div className={styles.bold}>Philips</div>
          <div className={styles.light}>Coffee maker HD7447/20</div>
          <div className={styles.light}>Rs. 2,400</div>
        </div>
      </div>
    );
  }
}
