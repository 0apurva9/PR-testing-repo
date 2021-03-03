import React from "react";
import styles from "./ReviewGuidelineModal.css";
export default class ReviewGuidelineModal extends React.Component {
  handleClose() {
    if (this.props.closeModal) {
      this.props.closeModal();
    }
  }

  render() {
    return (
      <div className={styles.base}>
        <div
          className={styles.cancel}
          onClick={() => {
            this.handleClose();
          }}
        />
        <div className={styles.content}>{this.props.children}</div>
      </div>
    );
  }
}
