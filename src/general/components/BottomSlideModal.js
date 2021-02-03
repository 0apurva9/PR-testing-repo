import React from "react";
import styles from "./BottomSlideModal.css";
export default class BottomSlideModal extends React.Component {
  handleClose() {
    if (this.props.closeModal) {
      this.props.closeModal();
    }
  }

  render() {
    return (
      <div className={styles.base}>
        {this.props.heading && (
          <div className={styles.header} data-test="bottom-slide-heading">
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
