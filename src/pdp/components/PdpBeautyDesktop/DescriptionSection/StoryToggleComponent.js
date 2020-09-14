import React, { Component } from "react";
import PropTypes from "prop-types";

import styles from "./StoryComponent.css";
import DetailsComponentLong from "./DetailsComponentLong";

export default class StoryToggleComponent extends Component {
  render() {
    return (
      <React.Fragment>
        <div className={styles["details-sections"]}>
          <div className={styles["perfume-guide-sec"]}>
            {this.props.shortStorySmallContent.map((el, i) => (
              <div key={i} className={styles["perfume-guide-blocks"]}>
                <div
                  className={styles["perfume-guide-img"]}
                  style={{ backgroundImage: `url(${el.imageURL})` }}
                ></div>
                <div className={styles["perfume-guide-heading"]}>{el.key}</div>
              </div>
            ))}
          </div>
          <div className={styles["perfume-note-section"]}>
            {this.props.shortStoryLargeContentSorted.map((el, i) => (
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
        {this.props.detailsComponent && (
          <DetailsComponentLong
            halfSetItems={this.props.halfSetItems}
            remSetItems={this.props.remSetItems}
            styleNotes={this.props.styleNotes}
            whatElseYouNeedToKnowContent={
              this.props.whatElseYouNeedToKnowContent
            }
            setInformationContentSorted={this.props.setInformationContentSorted}
            setInformationHeading={this.props.setInformationHeading}
          />
        )}
      </React.Fragment>
    );
  }
}

StoryToggleComponent.propTypes = {
  shortStorySmallContent: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      imageURL: PropTypes.string
    })
  ),
  shortStoryLargeContentSorted: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      imageURL: PropTypes.string,
      description: PropTypes.string
    })
  ),
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
