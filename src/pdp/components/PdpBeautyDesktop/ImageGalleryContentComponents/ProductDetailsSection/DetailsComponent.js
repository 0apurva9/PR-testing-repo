import React from "react";
import PropTypes from "prop-types";

import styles from "./DetailsComponent.css";

export default class DetailsComponent extends React.Component {
  handleDetailsScroll(e) {
    e.preventDefault();
    if (this.props.handleDetailsScroll) {
      this.props.handleDetailsScroll();
    }
  }

  render() {
    const productDetails = this.props && this.props.productDetails;
    const stylenotes = productDetails.styleNote;
    return (
      <div className={styles["story-component"]}>
        <div className={styles["what-it-is-block"]}>
          <div className={styles["what-it-is-heading"]}>What it is:</div>
          {stylenotes.length > 189 && (
            <div className={styles["what-it-is-desc"]}>
              {`${stylenotes.substring(0, 186)}..`}
              <a
                href={""}
                onClick={e => this.handleDetailsScroll(e)}
                className={styles["what-it-is-link"]}
              >
                More
              </a>
            </div>
          )}
          {stylenotes.length <= 189 && (
            <div className={styles["what-it-is-desc"]}>
              {`${stylenotes}..`}
              <a
                href={""}
                onClick={e => this.handleDetailsScroll(e)}
                className={styles["what-it-is-link"]}
              >
                More
              </a>
            </div>
          )}
        </div>
      </div>
    );
  }
}

DetailsComponent.propTypes = {
  productDetails: PropTypes.object
};
