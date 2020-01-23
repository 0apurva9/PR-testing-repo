import React from "react";
import styles from "./RatingAndReviewModal.css";
export default class RatingAndReviewModal extends React.Component {
  render() {
    return (
      <div className={styles.base}>
        <div className={styles.content}>{this.props.children}</div>
      </div>
    );
  }
}
