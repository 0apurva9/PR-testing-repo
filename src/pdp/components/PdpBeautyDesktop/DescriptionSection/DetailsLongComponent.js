import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Collapse } from "react-collapse";

import styles from "./DetailsLongComponent.css";

const HEADING = "DETAILS";
const SUBHEADING = "What it is:";

export default class DetailsLongComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true
    };
  }

  openMenu() {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  }

  render() {
    let iconActive = styles.iconup;
    if (this.state.isOpen) {
      iconActive = styles.icon;
    }

    return (
      <div
        id="details-parent"
        className={styles.base}
        ref={this.props.detailsLongRef}
      >
        {this.props.detailsComponent && (
          <Fragment>
            <div
              className={
                this.props.hasStory
                  ? styles["details-what-it-is-sec"]
                  : styles["details-on-has-no-story"]
              }
            >
              <div
                className={styles.holder}
                onClick={() => {
                  this.openMenu();
                }}
              >
                {this.props.styleNotes && (
                  <Fragment>
                    <div className={styles["details-heading"]}>{HEADING}</div>
                    <div className={iconActive} />
                  </Fragment>
                )}
              </div>
              {this.props.styleNotes && (
                <Fragment>
                  <Collapse isOpened={this.state.isOpen}>
                    <div className={styles["details-complete-block"]}>
                      <div className={styles["details-what-it-is-block"]}>
                        <div className={styles["details-what-it-is-head"]}>
                          {SUBHEADING}
                        </div>
                        <div className={styles["details-what-it-is-desc"]}>
                          {this.props.styleNotes && this.props.styleNotes}
                        </div>
                      </div>
                      {this.props &&
                        this.props.setInformationContentSorted &&
                        this.props.setInformationContentSorted.length > 0 && (
                          <div className={styles["details-what-it-is-block"]}>
                            {this.props.setInformationHeading && (
                              <div
                                className={styles["details-what-it-is-head"]}
                              >
                                {this.props.setInformationHeading}
                              </div>
                            )}
                            <div className={styles["details-what-it-is-desc"]}>
                              <ul className={styles["set-information-list"]}>
                                {this.props.setInformationContentSorted.length >
                                  0 &&
                                  this.props.setInformationContentSorted.map(
                                    (el, i) => (
                                      <li key={i}>{`${el.key}:${el.value}`}</li>
                                    )
                                  )}
                              </ul>
                            </div>
                          </div>
                        )}
                      {this.props &&
                        this.props.whatElseYouNeedToKnowContent &&
                        this.props.whatElseYouNeedToKnowContent.length > 0 && (
                          <div className={styles["details-what-it-is-block"]}>
                            {this.props.whatElseYouNeedToKnowContent.map(
                              (el, i) => (
                                <Fragment key={i}>
                                  <div
                                    className={
                                      styles["details-what-it-is-head"]
                                    }
                                  >
                                    {el.key}
                                  </div>
                                  <div
                                    className={
                                      styles["details-what-it-is-desc"]
                                    }
                                  >
                                    {el.value}
                                  </div>
                                </Fragment>
                              )
                            )}
                          </div>
                        )}
                    </div>
                  </Collapse>
                </Fragment>
              )}
            </div>
            {((this.props.halfSetItems && this.props.halfSetItems.length > 0) ||
              (this.props.remSetItems &&
                this.props.remSetItems.length > 0)) && (
              <Collapse isOpened={this.state.isOpen}>
                <div className={styles["product-details-section"]}>
                  {this.props.halfSetItems &&
                    this.props.halfSetItems.length > 0 &&
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
                    this.props.remSetItems.length > 0 &&
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
              </Collapse>
            )}
          </Fragment>
        )}
      </div>
    );
  }
}

DetailsLongComponent.propTypes = {
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
