import React from "react";
import Button from "./Button";
import styles from "./NotificationConfirmation.css";
import Whatsapp from "./img/whatsapp.svg";

export default class NotificationConfirmation extends React.Component {
  handleClose() {
    if (this.props.closeModal) {
      this.props.closeModal();
    }
  }

  handleWhatsappSubscribe() {
    if (this.props.handleWhatsappSubscribe) {
      this.props.handleWhatsappSubscribe();
    }
  }

  render() {
    return (
      <div className={styles.base}>
        <div className={styles.header}>
          Get order update on <strong>Whatsapp</strong>
          <div className={styles.whatsappImage}>
            <img src={Whatsapp} alt="" width="20px" height="20px" />
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <div className={styles.buttonHolder}>
            <Button
              label="DISMISS"
              type="secondary"
              width={165}
              height={40}
              onClick={() => this.handleClose()}
            />
          </div>
          <div className={styles.buttonHolder}>
            <Button
              label="YES"
              type="primary"
              width={165}
              height={40}
              onClick={() => this.handleWhatsappSubscribe()}
            />
          </div>
        </div>
      </div>
    );
  }
}
