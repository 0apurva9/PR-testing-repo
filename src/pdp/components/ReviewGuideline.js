import React from "react";
import styles from "./ReviewGuideline.css";

export default class ReviewGuideline extends React.Component {
  render() {
    return (
      <div className={styles.base}>
        <div className={styles.header}>
          <div className={styles.headerForGuidelines}>Review Guidelines </div>
        </div>
        <div className={styles.reviewBody}>
          <div className={styles.bodyHeading}>
            How To Write a Good Customer Review
          </div>
          <div className={styles.guide} />
        </div>
      </div>
    );
  }
}
