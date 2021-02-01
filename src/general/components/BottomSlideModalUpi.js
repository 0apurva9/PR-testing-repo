import React from "react";
import styles from "./BottomSlideModalUpi.css";
export default class BottomSlideModalUpi extends React.Component {
  handleClose() {
    if (this.props.closeModal) {
      this.props.closeModal();
    }
  }

  render() {
    return (
      <div className={styles.base}>
        {this.props.heading && (
          <div className={styles.header}>
            {this.props.heading}
            <div
              className={styles.cancel}
              onClick={() => {
                this.handleClose();
              }}
            />
          </div>
        )}
        <div className={styles.content}>{this.props.children}</div>
      </div>
    );
  }
}
