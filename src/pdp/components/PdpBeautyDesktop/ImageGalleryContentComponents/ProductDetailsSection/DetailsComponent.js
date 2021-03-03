import React from "react";
import PropTypes from "prop-types";

import styles from "./DetailsComponent.css";

export default class DetailsComponent extends React.Component {
  handleDetailsScroll(e, sectionToScroll) {
    e.preventDefault();
    if (this.props.handleDetailsScroll) {
      this.props.handleDetailsScroll(sectionToScroll);
    }
  }

  render() {
    const productDetails = this.props && this.props.productDetails;
    const stylenotes = productDetails.styleNote;
    return (
      <div className={styles["story-component"]}>
        <div
          className={styles["what-it-is-block"]}
          onClick={e => this.handleDetailsScroll(e, "detailsLong")}
        >
          <div className={styles["what-it-is-heading"]}>What it is:</div>
          {stylenotes && stylenotes.length > 189 && (
            <div className={styles["what-it-is-desc"]}>
              {`${stylenotes.substring(0, 215)}..`}
              <a
                href={""}
                onClick={e => this.handleDetailsScroll(e, "detailsLong")}
                className={styles["what-it-is-link"]}
              >
                More
              </a>
            </div>
          )}
          {stylenotes && stylenotes.length <= 215 && (
            <div className={styles["what-it-is-desc"]}>{`${stylenotes}`}</div>
          )}
        </div>
      </div>
    );
  }
}

DetailsComponent.propTypes = {
  productDetails: PropTypes.object,
  handleDetailsScroll: PropTypes.func
};
