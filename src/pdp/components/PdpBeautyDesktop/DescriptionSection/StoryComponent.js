import React from "react";

import styles from "./StoryComponent.css";
import DetailsComponentLong from "./DetailsComponentLong";

const HEADING = "THE PERFUME GUIDE";

export default class StoryComponent extends React.Component {
  render() {
    const productDetails = this.props && this.props.productDetails;
    const shortStorySmallContent = productDetails.shortStorySmall
      ? productDetails.shortStorySmall
      : [];
    const shortStoryLargeContent = productDetails.shortStoryLarge
      ? productDetails.shortStoryLarge
      : [];
    const shortStoryLargeContentSorted =
      shortStoryLargeContent.length > 0 &&
      shortStoryLargeContent.sort((comp1, comp2) => {
        const pos1 = parseInt(comp1.order);
        const pos2 = parseInt(comp2.order);
        if (pos1 && pos2 && pos1 < pos2) {
          return -1;
        }

        if (pos1 && pos2 && pos1 > pos2) {
          return 1;
        }

        return 0;
      });
    return (
      <div className={styles["container"]}>
        <div className={styles["details-component"]}>
          <div className={styles["details-heading"]}>{HEADING}</div>
          <div className={styles["details-sections"]}>
            <div className={styles["perfume-guide-sec"]}>
              {shortStorySmallContent.map((el, i) => (
                <div key={i} className={styles["perfume-guide-blocks"]}>
                  <div
                    className={styles["perfume-guide-img"]}
                    style={{ backgroundImage: `url(${el.imageURL})` }}
                  ></div>
                  <div className={styles["perfume-guide-heading"]}>
                    {el.key}
                  </div>
                </div>
              ))}
            </div>
            <div className={styles["perfume-note-section"]}>
              {shortStoryLargeContentSorted.map((el, i) => (
                <div key={i} className={styles["perfume-note-block"]}>
                  <div
                    className={styles["perfume-note-img"]}
                    style={{ backgroundImage: `url(${el.imageURL})` }}
                  ></div>
                  <div className={styles["perfume-note-head"]}>{el.key}</div>
                  <div className={styles["perfume-note-desc"]}>
                    {el.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {this.props.detailsComponent && <DetailsComponentLong />}
        </div>
      </div>
    );
  }
}
