import React from "react";
import styles from "./RatingReviewHeaderComponent.css";
import RatingReviewCountComponent from "./RatingReviewCountComponent";
import RatingAndIconComponent from "./RatingAndIconComponent";
import RatingWithStatusBarComponent from "./RatingWithStatusBarComponent";
import RatingCountWithStatusBarComponent from "./RatingCountWithStatusBarComponent";
import PropTypes from "prop-types";

export default class RatingReviewHeaderComponent extends React.Component {
    getSumOfStarRating = totalCountOfEachStarRating => {
        let eachStarRatingArray = [];
        totalCountOfEachStarRating &&
            totalCountOfEachStarRating.length > 0 &&
            totalCountOfEachStarRating.forEach(eachStarRating => {
                eachStarRatingArray.push(eachStarRating.totalRatingCount);
            });
        const sumOfRating =
            eachStarRatingArray.length > 0 && eachStarRatingArray.reduce((total, value) => total + value);
        return sumOfRating;
    };

    getLength = data => {
        return data.length;
    };

    getComponentForTotalCount = (totalCountOfEachStarRating, sumOfStarRating) => {
        totalCountOfEachStarRating.map((eachStarRating, index) => {
            let statusBarWidth = Math.round((eachStarRating.totalRatingCount / sumOfStarRating) * 100);
            return (
                <RatingCountWithStatusBarComponent
                    key={JSON.stringify(index)}
                    rating={eachStarRating.starRating}
                    width={`${statusBarWidth}%`}
                    backgroundColor={eachStarRating.starRating > 2 ? "#499b1f" : "#f9cf15"}
                    ratingCount={eachStarRating.totalRatingCount}
                />
            );
        });
    };

    getComponentForParameterizedRating = parameterizedRating => {
        parameterizedRating.map((eachRating, index) => {
            if (eachRating.paramVisibility) {
                return (
                    <RatingWithStatusBarComponent
                        key={JSON.stringify(index)}
                        currentRating={eachRating.parameterAvgRating}
                        showCurrentRating={true}
                        ratingText={eachRating.parameterName}
                    />
                );
            } else {
                return null;
            }
        });
    };

    render() {
        const { parameterizedRating, totalCountOfEachStarRating } = this.props.reviews;
        const sumOfStarRating = this.getSumOfStarRating(totalCountOfEachStarRating);

        return (
            <React.Fragment>
                <div className={styles.reviewsHeader}>
                    <div className={styles.reviewsHeading}>RATINGS AND REVIEWS</div>
                    <div className={styles.reviewsButton} onClick={() => this.props.goToReviewPage()}>
                        See all
                    </div>
                </div>

                {this.props.productDetails.averageRating &&
                    this.props.reviews &&
                    !parameterizedRating &&
                    !totalCountOfEachStarRating && (
                        <div className={styles.reviewListHolder}>
                            <RatingAndIconComponent
                                averageRating={this.props.productDetails.averageRating}
                                isFluidUI={true}
                            />
                            <RatingReviewCountComponent productDetails={this.props.productDetails} isFluidUI={true} />
                            <div className={styles.bb} />
                        </div>
                    )}

                {this.props.productDetails.averageRating &&
                    this.props.reviews &&
                    (parameterizedRating || this.props.reviews.totalCountOfEachStarRating) && (
                        <div className={styles.reviewListHolderOther}>
                            <div className={styles.sectionOne}>
                                <RatingAndIconComponent
                                    averageRating={this.props.productDetails.averageRating}
                                    isFluidUI={false}
                                />
                                <RatingReviewCountComponent
                                    productDetails={this.props.productDetails}
                                    isFluidUI={false}
                                />
                            </div>

                            {totalCountOfEachStarRating && this.getLength(totalCountOfEachStarRating) > 0 ? (
                                <div className={styles.sectionTwo}>
                                    {this.getComponentForTotalCount(totalCountOfEachStarRating, sumOfStarRating)}
                                </div>
                            ) : null}

                            {parameterizedRating && this.getLength(parameterizedRating) > 0 ? (
                                <div className={styles.sectionThree}>
                                    {this.getComponentForParameterizedRating(parameterizedRating)}
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
        })
    ),
    reviews: PropTypes.objectOf(
        PropTypes.shape({
            parameterizedRating: PropTypes.array,
            totalCountOfEachStarRating: PropTypes.array,
        })
    ),
};
