import React from "react";
import PropTypes from "prop-types";
import styles from "./CenterModal.css";
export default class CenterModal extends React.Component {
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
