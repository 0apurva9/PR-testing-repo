import React from "react";
import styles from "./CancelOrderPopUp.css";
import Button from "../../general/components/Button.js";
import BottomSlideModal from "../../general/components/BottomSlideModal.js";
import SecondaryLoader from "../../general/components/SecondaryLoader";
const Loader = () => {
  return (
    <div>
      <SecondaryLoader />
    </div>
  );
};
export default class CancelOrderPopUp extends React.Component {
  cancelProduct() {
    if (this.props.cancelProduct) {
      this.props.cancelProduct(
        this.props.data.cancelProductDetails,
        this.props.data.productDetails
      );
    }
  }

  cancelModal() {
    if (this.props.cancelModal) {
      this.props.cancelModal();
    }
  }

  render() {
    if (this.props.loadingForCancelProduct) {
      return <Loader />;
    }
    return (
      <BottomSlideModal>
        <div className={styles.base}>
          <div className={styles.cancelOrderTextHolder}>
            <div className={styles.cancelOrderText}>
              Are you sure you want to cancel your order ?
            </div>
          </div>
          <div className={styles.buttonHolderForCloseModal}>
            <div className={styles.button}>
              <Button
                type="secondary"
                height={40}
                label="NO"
                width={165}
                borderRadius={20}
                onClick={() => this.cancelModal()}
              />
            </div>
          </div>
          <div className={styles.buttonHolderForCancelOrder}>
            <div className={styles.button}>
              <Button
                type="primary"
                backgroundColor="#ff1744"
                height={40}
                label="YES"
                width={165}
                borderRadius={20}
                textStyle={{ color: "#FFF", fontSize: 14 }}
                onClick={() => this.cancelProduct()}
              />
            </div>
          </div>
        </div>
      </BottomSlideModal>
    );
  }
}
