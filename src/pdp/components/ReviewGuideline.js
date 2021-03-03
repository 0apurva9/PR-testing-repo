import React from "react";
import styles from "./ReviewGuideline.css";

export default class ReviewGuideline extends React.Component {
  render() {
    return (
      <div className={styles.base}>
        <div className={styles.headerForGuidelines}>
          How to write a good customer review
        </div>
        <div className={styles.reviewBody}>
          <div className={styles.reviewContentWrapper}>
            <div className={styles.contentHeader}>Do&#39;s</div>
            <ul className={styles.contentContainer}>
              <li className={styles.reviewTipsText}>
                Describe your experience using the product.
              </li>
              <li className={styles.reviewTipsText}>
                Share details about what you like or dislike.
              </li>
            </ul>
            <div className={styles.contentHeader}>Dont&#39;s</div>
            <ul className={styles.contentContainer}>
              <li className={styles.reviewTipsText}>
                Share personal information such as email address, phone number
                or order number.
              </li>
              <li className={styles.reviewTipsText}>
                Share prices or availability details from our site or our
                competitors.
              </li>
              <li className={styles.reviewTipsText}>
                Use inappropriate language, discriminatory language, or other
                languages not suitable for a public forum.
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
