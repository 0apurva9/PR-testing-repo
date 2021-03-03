import React, { Component } from "react";
import CustomButton from "../../general/components/CustomButton";
import PropTypes from "prop-types";
import styles from "./RatingAndReviewModalV2.css";
import RnRQualitiesSectionComponent from "./RnRQualitiesSectionComponent";
import RnRRatingSectionComponent from "./RnRRatingSectionComponent";
import RnRReviewSectionComponent from "./RnRReviewSectionComponent";

import rnrRatingBlank from "./img/rnrRatingBlank.svg";
import rnrRatingFilled from "./img/rnrRatingFilled.svg";
import rnrQualitiesBlank from "./img/rnrQualitiesBlank.svg";
// import rnrQualitiesFilled from "./img/rnrQualitiesFilled.svg";
import rnrReviewBlank from "./img/rnrReviewBlank.svg";
// import rnrReviewFilled from "./img/rnrReviewFilled.svg";

import Icon from "../../xelpmoc-core/Icon";

export default class RatingAndReviewModalV2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sectionActive: this.props.rating ? 2 : 1,
            currentRating: this.props.rating ? this.props.rating : null,
        };
    }

    activateSection = section => {
        this.setState({ sectionActive: section });
    };

    getUpdatedRating = rating => {
        this.setState({ currentRating: rating });
    };

    submitRating = () => {
        let productReview = {};
        productReview.rating = this.state.currentRating;
        this.props.addProductReview(this.props.productCode, productReview);
        this.activateSection(2);
    };

    render() {
        let classNameOne = styles.subSection;
        let classNameTwo = styles.subSection;
        let classNameThree = styles.subSection;

        if (this.state.sectionActive === 1) {
            classNameOne = styles.subSectionOneActive;
        }
        if (this.state.sectionActive === 2) {
            classNameTwo = styles.subSectionTwoActive;
        }
        if (this.state.sectionActive === 3) {
            classNameThree = styles.subSectionThreeActive;
        }

        return (
            <div className={styles.base}>
                <div className={styles.tabContent}>
                    {this.state.sectionActive === 1 && (
                        <RnRRatingSectionComponent getUpdatedRating={rating => this.getUpdatedRating(rating)} />
                    )}
                    {this.state.sectionActive === 2 && <RnRQualitiesSectionComponent />}
                    {this.state.sectionActive === 3 && <RnRReviewSectionComponent />}
                </div>
                <div className={styles.tabSwitches}>
                    <div className={classNameOne}>
                        <div className={styles.iconContainer}>
                            <span className={styles.currentRating}>
                                {this.state.currentRating ? this.state.currentRating : null}
                            </span>
                            <Icon image={!this.state.currentRating ? rnrRatingBlank : rnrRatingFilled} size={16} />
                        </div>
                        {this.props.rating || this.state.currentRating ? (
                            <span>You rated this product</span>
                        ) : (
                            <span>Rate this product</span>
                        )}
                    </div>
                    <div className={classNameTwo}>
                        <div className={styles.iconContainer}>
                            <Icon image={rnrQualitiesBlank} size={30} />
                        </div>
                        Qualities you liked
                    </div>
                    <div className={classNameThree}>
                        <div className={styles.iconContainer}>
                            <Icon image={rnrReviewBlank} size={26} />
                        </div>
                        Your Review
                    </div>
                </div>
                <div className={styles.buttonContainer}>
                    <CustomButton
                        text="Submit"
                        width="120px"
                        height="36px"
                        fontSize="12px"
                        color="#da1c5c"
                        border="1px solid #da1c5c"
                        borderRadius="4px"
                        fontFamily="regular"
                        handleClick={() => this.submitRating()}
                        disabled={this.state.currentRating ? false : true}
                    />
                </div>
            </div>
        );
    }
}

RatingAndReviewModalV2.propTypes = {
    rating: PropTypes.number,
    addProductReview: PropTypes.func,
    productCode: PropTypes.string,
};
