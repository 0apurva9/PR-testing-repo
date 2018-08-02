import React from "react";
import PropTypes from "prop-types";
import styles from "./SlideModal.css";
export default class SlideModal extends React.Component {
  handleClose() {
    if (this.props.closeModal) {
      this.props.closeModal();
    }
  }
  render() {
    return (
      <div
        className={styles.base}
        style={{ width: this.props.width, height: this.props.height }}
      >
        <div className={styles.content}>{this.props.children}</div>
        <div
          className={styles.cancel}
          onClick={() => {
            this.handleClose();
          }}
        />
      </div>
    );
  }
}

SlideModal.propTypes = {
  closeModal: PropTypes.func,
  width: PropTypes.string
};
