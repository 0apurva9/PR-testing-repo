import React, { Component } from "react";
import PropTypes from "prop-types";
import shortStoryLarge from "../img/shortStoryLarge.svg";
import shortStorySmall from "../img/shortStorySmall.svg";
import styles from "./ShortAndLargeStoryComponent.css";

export default class ShortAndLargeStoryComponent extends Component {
  render() {
    return (
      <React.Fragment>
        {(this.props &&
          this.props.shortStorySmallContent &&
          this.props.shortStorySmallContent.length > 0) ||
        (this.props &&
          this.props.shortStoryLargeContentSorted &&
          this.props.shortStoryLargeContentSorted.length > 0) ? (
          <div className={styles["details-sections"]}>
            {this.props &&
              this.props.shortStorySmallContent &&
              this.props.shortStorySmallContent.length > 0 && (
                <div className={styles["perfume-guide-sec"]}>
                  {this.props.shortStorySmallContent.map((el, i) => (
                    <div key={i} className={styles["perfume-guide-blocks"]}>
                      <div
                        className={styles["perfume-guide-img"]}
                        style={{
                          backgroundImage: `url(${
                            el.imageURL ? el.imageURL : shortStorySmall
                          })`
                        }}
                      ></div>
                      {el.description ? (
                        <div className={styles["perfume-guide-description"]}>
                          {el.description}
                        </div>
                      ) : null}
                      {el.key ? (
                        <div className={styles["perfume-guide-heading"]}>
                          {el.key}
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              )}
            {this.props &&
              this.props.shortStoryLargeContentSorted &&
              this.props.shortStoryLargeContentSorted.length > 0 && (
                <div
                  className={[
                    styles["perfume-note-section"],
                    this.props.shortStorySmallContent &&
                    this.props.shortStorySmallContent.length === 0
                      ? ""
                      : styles["separator"]
                  ].join(" ")}
                >
                  {this.props.shortStoryLargeContentSorted.map((el, i) => (
                    <div key={i} className={styles["perfume-note-block"]}>
                      <div
                        className={styles["perfume-note-img"]}
                        style={{
                          backgroundImage: `url(${
                            el.imageURL ? el.imageURL : shortStoryLarge
                          })`
                        }}
                      ></div>
                      <div className={styles["perfume-note-head"]}>
                        {el.key}
                      </div>
                      <div className={styles["perfume-note-desc"]}>
                        {el.description}
                      </div>
                    </div>
                  ))}
                </div>
              )}
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}

ShortAndLargeStoryComponent.propTypes = {
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
  )
};
