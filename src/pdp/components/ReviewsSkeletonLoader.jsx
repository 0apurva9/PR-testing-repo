import React, { Component } from "react";
import styles from "./ReviewsSkeletonLoader.css";

class ReviewsSkeletonLoader extends Component {
    render() {
        return (
            <div className={styles.reviewsSkeletonBase}>
                <div className={styles.base}>
                    <div className={styles.sectionOne}>
                        <div className={styles.circle} />
                        <div className={styles.barOne} />
                    </div>
                    <div className={styles.sectionTwo} />
                    <div className={styles.sectionThree} />
                    <div className={styles.sectionFour}>
                        <div className={styles.smallBar} />
                        <div className={styles.smallBar} />
                        <div className={styles.smallBar} />
                        <div className={styles.smallBar} />
                    </div>
                </div>
                <div className={styles.base}>
                    <div className={styles.sectionOne}>
                        <div className={styles.circle} />
                        <div className={styles.barOne} />
                    </div>
                    <div className={styles.sectionTwo} />
                    <div className={styles.sectionThree} />
                    <div className={styles.sectionFour}>
                        <div className={styles.smallBar} />
                        <div className={styles.smallBar} />
                        <div className={styles.smallBar} />
                        <div className={styles.smallBar} />
                    </div>
                </div>
            </div>
        );
    }
}

export default ReviewsSkeletonLoader;
