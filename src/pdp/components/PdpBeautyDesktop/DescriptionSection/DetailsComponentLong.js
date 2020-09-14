import React from "react";
import PropTypes from "prop-types";

import styles from "./DetailsComponentLong.css";

const HEADING = "DETAILS";
const SUBHEADING = "What it is:";

export default class DetailsComponentLong extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div class={styles["details-what-it-is-sec"]}>
          <div class={styles["details-heading"]}>{HEADING}</div>
          <div class={styles["details-what-it-is-block"]}>
            <div class={styles["details-what-it-is-head"]}>{SUBHEADING}</div>
            <div class={styles["details-what-it-is-desc"]}>
              {this.props.styleNotes}
            </div>
          </div>
          <div className={styles["details-what-it-is-block"]}>
            <div className={styles["details-what-it-is-head"]}>
              {this.props.setInformationHeading}
            </div>
            <div className={styles["details-what-it-is-desc"]}>
              <ul>
                {this.props.setInformationContentSorted.map((el, i) => (
                  <li>{`${el.key}:${el.value}`}</li>
                ))}
              </ul>
            </div>
          </div>
          <div class={styles["details-what-it-is-block"]}>
            {this.props.whatElseYouNeedToKnowContent.map((el, i) => (
              <React.Fragment>
                <div class={styles["details-what-it-is-head"]}>{el.key}</div>
                <div class={styles["details-what-it-is-desc"]}>{el.value}</div>
              </React.Fragment>
            ))}
          </div>
        </div>
        <div class={styles["product-details-section"]}>
          {this.props.halfSetItems.map((el, i) => (
            <div key={i} class={styles["product-details-block"]}>
              <div class={styles["product-details-col"]}>
                <span class={styles["product-details-head"]}>{el.key}:</span>
                {el.value}
              </div>
            </div>
          ))}
          {this.props.remSetItems.map((el, i) => (
            <div key={i} class={styles["product-details-block"]}>
              <div class={styles["product-details-col"]}>
                <span class={styles["product-details-head"]}>{el.key}:</span>
                {el.value}
              </div>
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

DetailsComponentLong.propTypes = {
  styleNotes: PropTypes.string,
  setInformationHeading: PropTypes.string,
  setInformationContentSorted: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.string,
      order: PropTypes.string
    })
  ),
  whatElseYouNeedToKnowContent: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.string
    })
  ),
  halfSetItems: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.string
    })
  ),
  remSetItems: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.string
    })
  )
};
