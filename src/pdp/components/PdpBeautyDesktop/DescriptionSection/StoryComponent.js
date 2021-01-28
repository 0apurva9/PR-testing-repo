import PropTypes from "prop-types";
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
            isOpen: true,
        };
    }

    openMenu() {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen,
        }));
    }

    render() {
        let iconActive = styles.iconup;
        if (this.state.isOpen) {
            iconActive = styles.icon;
        }

        const productDetails = this.props && this.props.productDetails;
        const shortStorySmallContent = productDetails.shortStorySmall ? productDetails.shortStorySmall : [];
        const shortStoryLargeContent = productDetails.shortStoryLarge ? productDetails.shortStoryLarge : [];
        const setInformationContent =
            productDetails.setInformation && productDetails.setInformation.values
                ? productDetails.setInformation.values
                : [];
        const setInformationHeading = productDetails.setInformation && productDetails.setInformation.key;
        let shortStoryLargeContentSorted = [];
        let shortStorySmallContentSorted = [];
        shortStoryLargeContentSorted =
            shortStoryLargeContent.length > 0
                ? sortArrayOfObjectByIntegerKeyValue(shortStoryLargeContent, "order")
                : [];
        shortStorySmallContentSorted =
            shortStorySmallContent.length > 0
                ? sortArrayOfObjectByIntegerKeyValue(shortStorySmallContent, "order")
                : [];
        const styleNotes = productDetails && productDetails.styleNote;
        const whatElseYouNeedToKnowContent =
            productDetails && productDetails.whatElseYouNeedtoKnow ? productDetails.whatElseYouNeedtoKnow : [];
        const detailsSectionContent =
            productDetails && productDetails.detailsSection ? productDetails.detailsSection : [];
        let detailsSectionContentSorted = [];
        let setInformationContentSorted = [];
        let items = 0;
        let halfSet = 0;
        let halfSetItems,
            remSetItems = [];

        if (detailsSectionContent && detailsSectionContent.length > 0) {
            detailsSectionContentSorted = sortArrayOfObjectByIntegerKeyValue(detailsSectionContent, "order");
        }

        if (setInformationContent && setInformationContent.length > 0) {
            setInformationContentSorted = sortArrayOfObjectByIntegerKeyValue(setInformationContent, "order");
        }
        items = detailsSectionContentSorted.length;
        halfSet = Math.ceil(items / 2);
        halfSetItems = detailsSectionContentSorted.slice(0, halfSet);
        remSetItems = detailsSectionContentSorted.slice(halfSet, items);
        const hasStory =
            (shortStorySmallContent && shortStorySmallContent.length > 0) ||
            (shortStoryLargeContentSorted && shortStoryLargeContentSorted.length > 0);
        return (
            <React.Fragment>
                <div className={styles.container}>
                    <div
                        className={
                            this.state.isOpen ? styles["details-component"] : styles["details-component-hide-padding"]
                        }
                    >
                        <div className={styles.base}>
                            {((shortStorySmallContent && shortStorySmallContent.length > 0) ||
                                (shortStoryLargeContentSorted && shortStoryLargeContentSorted.length > 0)) && (
                                <div
                                    className={styles.holder}
                                    onClick={() => {
                                        this.openMenu();
                                    }}
                                >
                                    <React.Fragment>
                                        <div className={styles["details-heading"]}>{HEADING.toUpperCase()}</div>
                                        <div className={iconActive} />
                                    </React.Fragment>
                                </div>
                            )}
                            <Collapse isOpened={this.state.isOpen}>
                                {((shortStorySmallContentSorted && shortStorySmallContentSorted.length > 0) ||
                                    (shortStoryLargeContentSorted && shortStoryLargeContentSorted.length > 0)) && (
                                    <ShortAndLargeStoryComponent
                                        shortStorySmallContent={shortStorySmallContentSorted}
                                        shortStoryLargeContentSorted={shortStoryLargeContentSorted}
                                    />
                                )}

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

StoryComponent.propTypes = {
    detailsComponent: PropTypes.any,
    detailsLongRef: PropTypes.any,
    productDetails: PropTypes.any,
};
