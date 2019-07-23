import React from "react";
import Button from "./Button";
import styles from "./NotificationConfirmation.css";

export default class NotificationConfirmation extends React.Component {
  handleClose() {
    if (this.props.closeModal) {
      this.props.closeModal();
    }
  }
  render() {
    return (
      <div className={styles.base}>
        <div className={styles.header}>
          Get order update on <strong>Whatsapp</strong>
        </div>
        <div className={styles.buttonContainer}>
          <div className={styles.buttonHolder}>
            <Button
              label="DISMISS"
              type="secondary"
              width={165}
              height={40}
              onClick={() => this.closeModal()}
            />
          </div>
          <div className={styles.buttonHolder}>
            <Button
              label="YES"
              type="primary"
              width={165}
              height={40}
              onClick={() => this.closeModal()}
            />
          </div>
        </div>
      </div>
    );
  }
}
