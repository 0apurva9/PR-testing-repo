import React from "react";
import { Collapse } from "react-collapse";

import styles from "./StoryComponent.css";
import DetailsLongComponent from "./DetailsLongComponent";
import ShortAndLargeStoryComponent from "./ShortAndLargeStoryComponent";
import { sortArrayOfObjectByIntegerKeyValue } from "../../../../pdp/reducers/utils";

const HEADING = "The Finer Details";

export default class StoryComponent extends React.Component {
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

    const productDetails = this.props && this.props.productDetails;
    const shortStorySmallContent = productDetails.shortStorySmall
      ? productDetails.shortStorySmall
      : [];
    const shortStoryLargeContent = productDetails.shortStoryLarge
      ? productDetails.shortStoryLarge
      : [];
    const setInformationContent =
      productDetails.setInformation && productDetails.setInformation.values
        ? productDetails.setInformation.values
        : [];
    const setInformationHeading =
      productDetails.setInformation && productDetails.setInformation.key;
    let shortStoryLargeContentSorted = [];
    shortStoryLargeContentSorted =
      shortStoryLargeContent.length > 0 &&
      sortArrayOfObjectByIntegerKeyValue(shortStoryLargeContent, "order");
    const styleNotes = productDetails && productDetails.styleNote;
    const whatElseYouNeedToKnowContent =
      productDetails && productDetails.whatElseYouNeedtoKnow
        ? productDetails.whatElseYouNeedtoKnow
        : [];
    const detailsSectionContent =
      productDetails && productDetails.detailsSection
        ? productDetails.detailsSection
        : [];
    let detailsSectionContentSorted = [];
    detailsSectionContentSorted =
      detailsSectionContent.length > 0 &&
      sortArrayOfObjectByIntegerKeyValue(detailsSectionContent, "order");
    let setInformationContentSorted = [];
    setInformationContentSorted =
      setInformationContent.length > 0 &&
      sortArrayOfObjectByIntegerKeyValue(setInformationContent, "order");
    const items = detailsSectionContentSorted.length;
    const halfSet = Math.ceil(items / 2);
    const halfSetItems = detailsSectionContentSorted.slice(0, halfSet);
    const remSetItems = detailsSectionContentSorted.slice(halfSet, items);
    const hasStory =
      (shortStorySmallContent && shortStorySmallContent.length > 0) ||
      (shortStoryLargeContentSorted && shortStoryLargeContentSorted.length > 0);
    return (
      <React.Fragment>
        <div className={styles.container}>
          <div
            className={
              this.state.isOpen
                ? styles["details-component"]
                : styles["details-component-hide-padding"]
            }
          >
            <div className={styles.base}>
              <div
                className={styles.holder}
                onClick={() => {
                  this.openMenu();
                }}
              >
                {((shortStorySmallContent &&
                  shortStorySmallContent.length > 0) ||
                  (shortStoryLargeContentSorted &&
                    shortStoryLargeContentSorted.length > 0)) && (
                  <React.Fragment>
                    <div className={styles["details-heading"]}>
                      {HEADING.toUpperCase()}
                    </div>
                    <div className={iconActive} />
                  </React.Fragment>
                )}
              </div>

              <Collapse isOpened={this.state.isOpen}>
                <ShortAndLargeStoryComponent
                  shortStorySmallContent={shortStorySmallContent}
                  shortStoryLargeContentSorted={shortStoryLargeContentSorted}
                />
                <DetailsLongComponent
                  hasStory={hasStory}
                  detailsLongRef={this.props.detailsLongRef}
                  halfSetItems={halfSetItems}
                  remSetItems={remSetItems}
                  styleNotes={styleNotes}
                  whatElseYouNeedToKnowContent={whatElseYouNeedToKnowContent}
                  setInformationContentSorted={setInformationContentSorted}
                  setInformationHeading={setInformationHeading}
                  detailsComponent={this.props.detailsComponent}
                />
              </Collapse>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
