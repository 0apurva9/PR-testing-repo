import React from "react";
import styles from "./SellerReviewSubmitRemovalPopup.css";
import cancelBlack from "../../general/components/img/cancelBlack.svg";
import StarRating from "../../general/components/StarRating";
import BottomSlideModal3 from "../../general/components/BottomSlideModal3.js";
export default class SellerReviewSubmitRemovalPopup extends React.Component {
  closeModal() {
    if (this.props.closeModal) {
      this.props.closeModal();
      localStorage.removeItem("rating");
      localStorage.removeItem("sellerName");
    }
  }

  render() {
    let rating = localStorage.getItem("rating");
    let sellerName = localStorage.getItem("sellerName");
    return (
      <BottomSlideModal3>
        <div className={styles.base}>
          <img
            className={styles.closeIcon}
            onClick={() => this.closeModal()}
            src={cancelBlack}
            alt="X"
          />
          {(rating || sellerName) && (
            <div className={styles.textHolder}>
              Thanks for your feeback
              {sellerName && (
                <div className={styles.sellerName}>You rated {sellerName}</div>
              )}
              {rating && (
                <div className={styles.ratingBar}>
                  <StarRating averageRating={parseInt(rating)} />
                </div>
              )}
            </div>
          )}
          {!sellerName && (
            <div className={styles.textHolder}>
              Your feedback has been successfully removed
            </div>
          )}
        </div>
      </BottomSlideModal3>
    );
  }
}
