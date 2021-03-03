import React from "react";
import styles from "./CancelOrderPopUp.css";
import Button from "../../general/components/Button";
import BottomSlideModal from "../../general/components/BottomSlideModal.js";
export default class ShowReturnConfirmPopup extends React.Component {
  onConfirmReturn(val) {
    if (this.props.onConfirmReturn) {
      this.props.onConfirmReturn(val);
    }
  }

  closeModal() {
    if (this.props.closeModal) {
      this.props.closeModal();
    }
  }

  render() {
    let confirmData = {};
    confirmData.orderId = this.props.orderId;
    confirmData.transactionId = this.props.transactionId;
    confirmData.value = "true";

    return (
      <BottomSlideModal>
        <div className={styles.base}>
          <div className={styles.cancelOrderTextHolder}>
            <div className={styles.cancelOrderText}>
              Has this order been delivered to you?
            </div>
          </div>
          <div className={styles.buttonHolderForCloseModal}>
            <div className={styles.button}>
              <Button
                type="secondary"
                height={40}
                label="GO BACK"
                width={165}
                borderRadius={20}
                onClick={() => this.closeModal()}
              />
            </div>
          </div>
          <div className={styles.buttonHolderForCancelOrder}>
            <div className={styles.button}>
              <Button
                type="primary"
                backgroundColor="#ff1744"
                height={40}
                label="CONFIRM"
                width={165}
                borderRadius={20}
                textStyle={{ color: "#FFF", fontSize: 14 }}
                onClick={() => this.onConfirmReturn(confirmData)}
              />
            </div>
          </div>
        </div>
      </BottomSlideModal>
    );
  }
}
