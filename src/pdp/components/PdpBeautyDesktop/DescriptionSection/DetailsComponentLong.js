import React from "react";
import PropTypes from "prop-types";

import styles from "./DetailsComponentLong.css";

const HEADING = "DETAILS";
const SUBHEADING = "What it is:";

export default class DetailsComponentLong extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div
          ref={this.props.detailsLongRef}
          className={styles["details-what-it-is-sec"]}
        >
          {this.props.styleNotes && (
            <React.Fragment>
              <div className={styles["details-heading"]}>{HEADING}</div>
              <div className={styles["details-what-it-is-block"]}>
                <div className={styles["details-what-it-is-head"]}>
                  {SUBHEADING}
                </div>
                <div className={styles["details-what-it-is-desc"]}>
                  {this.props.styleNotes && this.props.styleNotes}
                </div>
              </div>
            </React.Fragment>
          )}
          {this.props.setInformationContentSorted && (
            <div className={styles["details-what-it-is-block"]}>
              {this.props.setInformationHeading && (
                <div className={styles["details-what-it-is-head"]}>
                  {this.props.setInformationHeading &&
                    this.props.setInformationHeading}
                </div>
              )}
              <div className={styles["details-what-it-is-desc"]}>
                <ul>
                  {this.props.setInformationContentSorted &&
                    this.props.setInformationContentSorted.map((el, i) => (
                      <li key={i}>{`${el.key}:${el.value}`}</li>
                    ))}
                </ul>
              </div>
            </div>
          )}
          {this.props.whatElseYouNeedToKnowContent && (
            <div className={styles["details-what-it-is-block"]}>
              {this.props.whatElseYouNeedToKnowContent &&
                this.props.whatElseYouNeedToKnowContent.map((el, i) => (
                  <React.Fragment key={i}>
                    <div className={styles["details-what-it-is-head"]}>
                      {el.key}
                    </div>
                    <div className={styles["details-what-it-is-desc"]}>
                      {el.value}
                    </div>
                  </React.Fragment>
                ))}
            </div>
          )}
        </div>
        <div className={styles["product-details-section"]}>
          {this.props.halfSetItems &&
            this.props.halfSetItems.map((el, i) => (
              <div key={i} className={styles["product-details-block"]}>
                <div className={styles["product-details-col"]}>
                  <span className={styles["product-details-head"]}>
                    {el.key}:
                  </span>
                  {el.value}
                </div>
              </div>
            ))}
          {this.props.remSetItems &&
            this.props.remSetItems.map((el, i) => (
              <div key={i} className={styles["product-details-block"]}>
                <div className={styles["product-details-col"]}>
                  <span className={styles["product-details-head"]}>
                    {el.key}:
                  </span>
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
