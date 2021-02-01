import React from "react";
import styles from "./BottomSlideModal2.css";
export default class BottomSlideModal extends React.Component {
  handleClose() {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  }

  render() {
    return (
      <div className={styles.base}>
        <div className={styles.header}>
          <div
            className={styles.cancel}
            onClick={() => {
              this.handleClose();
            }}
          />
        </div>
        <div className={styles.content}>{this.props.children}</div>
      </div>
    );
  }
}
