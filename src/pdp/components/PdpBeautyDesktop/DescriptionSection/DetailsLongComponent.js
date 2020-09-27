import React, { Component } from "react";
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
      <div className={styles.base}>
        {this.props.detailsComponent && (
          <React.Fragment>
            <div
              ref={this.props.detailsLongRef}
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
                  <React.Fragment>
                    <div className={styles["details-heading"]}>{HEADING}</div>
                    <div className={iconActive} />
                  </React.Fragment>
                )}
              </div>
              {this.props.styleNotes && (
                <React.Fragment>
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
                      {this.props && this.props.setInformationContentSorted && (
                        <div className={styles["details-what-it-is-block"]}>
                          {this.props.setInformationHeading && (
                            <div className={styles["details-what-it-is-head"]}>
                              {this.props.setInformationHeading &&
                                this.props.setInformationHeading}
                            </div>
                          )}
                          <div className={styles["details-what-it-is-desc"]}>
                            <ul className={styles["set-information-list"]}>
                              {this.props.setInformationContentSorted.map(
                                (el, i) => (
                                  <li key={i}>{`${el.key}:${el.value}`}</li>
                                )
                              )}
                            </ul>
                          </div>
                        </div>
                      )}
                      {this.props && this.props.whatElseYouNeedToKnowContent && (
                        <div className={styles["details-what-it-is-block"]}>
                          {this.props.whatElseYouNeedToKnowContent.map(
                            (el, i) => (
                              <React.Fragment key={i}>
                                <div
                                  className={styles["details-what-it-is-head"]}
                                >
                                  {el.key}
                                </div>
                                <div
                                  className={styles["details-what-it-is-desc"]}
                                >
                                  {el.value}
                                </div>
                              </React.Fragment>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  </Collapse>
                </React.Fragment>
              )}
            </div>
            <Collapse isOpened={this.state.isOpen}>
              {(this.props.halfSetItems || this.props.remSetItems) && (
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
              )}
            </Collapse>
          </React.Fragment>
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
