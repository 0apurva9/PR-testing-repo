import React from "react";
import styles from "./BottomSlideModal3.css";
export default class BottomSlideModal3 extends React.Component {
  handleClose() {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  }

  render() {
    return (
      <div className={styles.base}>
        <div className={styles.header} />
        <div className={styles.content}>{this.props.children}</div>
      </div>
    );
  }
}
