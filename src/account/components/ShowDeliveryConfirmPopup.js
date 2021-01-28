import React from "react";
import styles from "./ShowDeliveryConfirmPopup.css";
import cancelBlack from "../../general/components/img/cancelBlack.svg";
import BottomSlideModal from "../../general/components/BottomSlideModal.js";
export default class ShowDeliveryConfirmPopup extends React.Component {
  closeModal() {
    if (this.props.closeModal) {
      this.props.closeModal();
      sessionStorage.removeItem("updateReturnForHOTC");
    }
  }

  render() {
    return (
      <BottomSlideModal>
        <div className={styles.base}>
          <img
            className={styles.closeIcon}
            onClick={() => this.closeModal()}
            src={cancelBlack}
            alt="X"
          />
          <div className={styles.textHolder}>
            Your request has been submitted. It may take about 2 minutes for the
            system to update the order status post which you can initiate the
            return.
          </div>
        </div>
      </BottomSlideModal>
    );
  }
}
