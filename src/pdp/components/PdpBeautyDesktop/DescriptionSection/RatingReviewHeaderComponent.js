import React from "react";
import styles from "./RatingReviewHeaderComponent.css";
import RatingReviewCountComponent from "./RatingReviewCountComponent";
import RatingAndIconComponent from "./RatingAndIconComponent";
import RatingWithStatusBarComponent from "./RatingWithStatusBarComponent";
import RatingCountWithStatusBarComponent from "./RatingCountWithStatusBarComponent";
import PropTypes from "prop-types";
import { setDataLayerForRatingReviewSection, ADOBE_RATING_REVIEW_PDP_REVIEW_PAGE } from "../../../../lib/adobeUtils";

export default class RatingReviewHeaderComponent extends React.Component {
    componentDidMount() {
        // on initial page load
        if (this.props.isReviewPage) {
            setDataLayerForRatingReviewSection(ADOBE_RATING_REVIEW_PDP_REVIEW_PAGE);
        }
    }

    getSumOfStarRating = totalCountOfEachStarRating => {
        let eachStarRatingArray = [];
        totalCountOfEachStarRating &&
            totalCountOfEachStarRating.length > 0 &&
            totalCountOfEachStarRating.forEach(eachStarRating => {
                if (eachStarRating.totalRatingCount) {
                    eachStarRatingArray.push(eachStarRating.totalRatingCount);
                }
            });
        const sumOfRating =
            eachStarRatingArray.length > 0 && eachStarRatingArray.reduce((total, value) => total + value);
        return sumOfRating;
    };

    getLength = data => {
        return data.length;
    };

    getComponentForTotalCount = (totalCountOfEachStarRating, sumOfStarRating) => {
        const totalCountComponent = totalCountOfEachStarRating.map((eachStarRating, index) => {
            let statusBarWidth = 0;
            if (eachStarRating.totalRatingCount) {
                statusBarWidth = Math.round((eachStarRating.totalRatingCount / sumOfStarRating) * 100);
            }
            return (
                <RatingCountWithStatusBarComponent
                    key={index.toString()}
                    rating={eachStarRating.starRating}
                    width={`${statusBarWidth}%`}
                    backgroundColor={eachStarRating.starRating > 2 ? "#499b1f" : "#f9cf15"}
                    ratingCount={eachStarRating.totalRatingCount}
                />
            );
        });
        return <React.Fragment>{totalCountComponent}</React.Fragment>;
    };

    getComponentForParameterizedRating = parameterizedRating => {
        const parameterizedRatingComponent = parameterizedRating.map((eachRating, index) => {
            if (eachRating.paramVisibility) {
                return (
                    <RatingWithStatusBarComponent
                        key={index.toString()}
                        currentRating={eachRating.parameterAvgRating}
                        showCurrentRating={true}
                        ratingText={eachRating.parameterName}
                    />
                );
            } else {
                return null;
            }
        });
        return <React.Fragment>{parameterizedRatingComponent}</React.Fragment>;
    };

    render() {
        if (!this.props.reviews) {
            return null;
        }
        const sumOfStarRating =
            this.props.productDetails &&
            this.props.productDetails.totalCountOfStarRating &&
            this.getSumOfStarRating(this.props.productDetails.totalCountOfStarRating);

        return (
            <React.Fragment>
                {!this.props.isReviewPage ? (
                    <div className={styles.reviewsHeader}>
                        <div className={styles.reviewsHeading}>RATINGS AND REVIEWS</div>
                        <div className={styles.reviewsButton} onClick={() => this.props.goToReviewPage()}>
                            See all
                        </div>
                    </div>
                ) : null}

                {this.props.productDetails.averageRating &&
                    this.props.reviews &&
                    !this.props.reviews.parameterizedRating &&
                    !this.props.productDetails.totalCountOfStarRating && (
                        <div className={styles.reviewListHolder}>
                            <RatingAndIconComponent
                                averageRating={this.props.productDetails.averageRating}
                                isFluidUI={true}
                            />
                            <RatingReviewCountComponent productDetails={this.props.productDetails} />
                            <div className={styles.bb} />
                        </div>
                    )}

                {this.props.productDetails.averageRating &&
                    this.props.reviews &&
                    (this.props.reviews.parameterizedRating || this.props.productDetails.totalCountOfStarRating) && (
                        <div className={styles.reviewListHolderOther}>
                            <div className={styles.sectionOne}>
                                <RatingAndIconComponent
                                    averageRating={this.props.productDetails.averageRating}
                                    isFluidUI={false}
                                />
                                <RatingReviewCountComponent productDetails={this.props.productDetails} />
                            </div>

                            {this.props.productDetails.totalCountOfStarRating &&
                            this.getLength(this.props.productDetails.totalCountOfStarRating) > 0 ? (
                                <div className={styles.sectionTwo}>
                                    {this.getComponentForTotalCount(
                                        this.props.productDetails.totalCountOfStarRating,
                                        sumOfStarRating
                                    )}
                                </div>
                            ) : null}

                            {this.props.reviews.parameterizedRating &&
                            this.getLength(this.props.reviews.parameterizedRating) > 0 ? (
                                <div className={styles.sectionThree}>
                                    {this.getComponentForParameterizedRating(this.props.reviews.parameterizedRating)}
                                </div>
                            ) : null}

                            <div className={styles.bb} />
                        </div>
                    )}
            </React.Fragment>
        );
    }
}

RatingReviewHeaderComponent.propTypes = {
    goToReviewPage: PropTypes.func,
    productDetails: PropTypes.objectOf(
        PropTypes.shape({
            averageRating: PropTypes.string,
            totalCountOfEachStarRating: PropTypes.array,
        })
    ),
    reviews: PropTypes.objectOf(
        PropTypes.shape({
            parameterizedRating: PropTypes.array,
        })
    ),
    isReviewPage: PropTypes.bool,
};
