import React from "react";
import ratingSuccessStar from "./img/ratingSuccessStar.svg";
import styles from "./RatingSubmitSuccessToast.css";

export default class RatingSubmitSuccessToast extends React.Component {
  render() {
    return (
      <div className={styles.toastContainer}>
        <img
          src={ratingSuccessStar}
          alt="rating star"
          className={styles.ratingSuccessStar}
        />
        <div className={styles.successMessage}>SUBMITTED</div>
        <div className={styles.successMessage}>Thank you for rating</div>
      </div>
    );
  }
}
