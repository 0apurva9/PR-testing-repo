import React from "react";

import styles from "./DetailsComponentLong.css";

const HEADING = "DETAILS";
const SUBHEADING = "WHAT IT IS";

export default class DetailsComponentLong extends React.Component {
  render() {
    const productDetails = this.props && this.props.productDetails;
    const styleNotes = productDetails && productDetails.styleNotes;
    const whatElseYouNeedToKnowContent =
      productDetails && productDetails.whatElseYouNeedtoKnow
        ? productDetails.whatElseYouNeedtoKnow
        : [];
    const detailsSectionContent =
      productDetails && productDetails.detailsSection
        ? productDetails.detailsSection
        : [];
    const detailsSectionContentSorted =
      detailsSectionContent.length > 0 &&
      detailsSectionContent.sort((comp1, comp2) => {
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
      <React.Fragment>
        <div class={styles["details-what-it-is-sec"]}>
          <div class={styles["details-heading"]}>{HEADING}</div>
          <div class={styles["details-what-it-is-block"]}>
            <div class={styles["details-what-it-is-head"]}>{SUBHEADING}</div>
            <div class={styles["details-what-it-is-desc"]}>{styleNotes}</div>
          </div>
          <div class={styles["details-what-it-is-block"]}>
            {whatElseYouNeedToKnowContent.map((el, i) => (
              <React.Fragment>
                <div class={styles["details-what-it-is-head"]}>{el.key}</div>
                <div class={styles["details-what-it-is-desc"]}>{el.value}</div>
              </React.Fragment>
            ))}
          </div>
        </div>
        {/* <div class={styles["product-details-section"]}>
            {detailsSectionContentSorted.map((el, i) => {
              const fullSet = (detailsSectionContentSorted.length)%4;
              const remSet = (detailsSectionContentSorted.length)/4;
              return (
                <div class={styles["product-details-block"]}>
                  <div class={styles["product-details-col"]}><span class={styles["product-details-head"]}>{el.key}</span>{el.value}</div>
                </div>
              )
            })}
          </div> */}
      </React.Fragment>
    );
  }
}
