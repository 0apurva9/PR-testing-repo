import React, { Component } from "react";
import CustomButton from "../../general/components/CustomButton";
import PropTypes from "prop-types";
import styles from "./RatingAndReviewModalV2.css";
import RnRQualitiesSectionComponent from "./RnRQualitiesSectionComponent";
import RnRRatingSectionComponent from "./RnRRatingSectionComponent";
import RnRReviewSectionComponent from "./RnRReviewSectionComponent";
import RnRSuccessSectionComponent from "./RnRSuccessSectionComponent";

import Icon from "../../xelpmoc-core/Icon";
import rnrRatingBlank from "./img/rnrRatingBlank.svg";
import rnrRatingFilled from "./img/rnrRatingFilled.svg";
import rnrQualitiesBlank from "./img/rnrQualitiesBlank.svg";
import rnrQualitiesFilled from "./img/rnrQualitiesFilled.svg";
import rnrReviewBlank from "./img/rnrReviewBlank.svg";
import rnrReviewFilled from "./img/rnrReviewFilled.svg";
import {
    setDataLayerForRatingReviewSection,
    ADOBE_RATING_REVIEW_MODAL_RATING_SUBMIT,
    ADOBE_RATING_REVIEW_MODAL_QUALITY_SUBMIT,
    ADOBE_RATING_REVIEW_MODAL_REVIEW_SUBMIT,
} from "../../lib/adobeUtils";

const success = "success";
const failure = "failure";
export default class RatingAndReviewModalV2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sectionActive: this.props.section ? this.props.section : 1,
            currentRating: this.props.rating ? this.props.rating : null,
            currentParamsData: null,
            qualities: null,
            disableReviewSubmit: true,
            title: null,
            reviewDetails: null,
            titleSuggestionsDetails: null,
            userProductReviewDetails: null,
            id: null,
            actualParamsCount: 0,
            paramsEligibleToRateDetails: null,
        };
    }

    componentDidMount() {
        let callgetUserProductReviewAPI = true;
        if (this.props.pageName === "productReview") {
            callgetUserProductReviewAPI = false;
        }
        this.props.getParametersEligibleToRate(this.props.productCode, callgetUserProductReviewAPI);
    }

    componentDidUpdate(prevProps) {
        if (this.props.addReviewDetails !== prevProps.addReviewDetails) {
            // handle submit for rating submit and redirect to parameter screen
            if (this.state.currentRating && !this.state.reviewDetails) {
                this.activateSection(2);
            }

            // handle submit for review screen and redirect to success screen
            if (this.state.currentRating && this.state.reviewDetails) {
                this.activateSection(4);
            }
        }

        // handle submit for parameter submit and redirect to review screen
        if (this.props.submitParameterRatingDetails !== prevProps.submitParameterRatingDetails) {
            this.activateSection(3);
        }

        // get title suggestions details
        if (this.props.getTitleSuggestionsDetails !== prevProps.getTitleSuggestionsDetails) {
            this.setState({ titleSuggestionsDetails: this.props.getTitleSuggestionsDetails });
        }

        // get params
        if (this.props.paramsEligibleToRateDetails !== prevProps.paramsEligibleToRateDetails) {
            this.setState({ paramsEligibleToRateDetails: this.props.paramsEligibleToRateDetails });
        }

        // get user reviews
        if (this.props.userProductReviewDetails !== prevProps.userProductReviewDetails) {
            this.setState({ userProductReviewDetails: this.props.userProductReviewDetails });
        }
    }

    activateSection = section => {
        if (section === 2) {
            if (
                this.props.paramsEligibleToRateDetails &&
                this.props.paramsEligibleToRateDetails.status &&
                this.props.paramsEligibleToRateDetails.status.toLowerCase() === success
            ) {
                this.setState({ sectionActive: 2 });
            }
            if (
                !this.props.paramsEligibleToRateDetails ||
                (this.props.paramsEligibleToRateDetails &&
                    this.props.paramsEligibleToRateDetails.status &&
                    this.props.paramsEligibleToRateDetails.status.toLowerCase() === failure)
            ) {
                this.props.getTitleSuggestions(this.props.productCode, this.state.currentRating);
                this.setState({ sectionActive: 3 });
            }
        } else {
            this.setState({ sectionActive: section });
        }

        if (section === 3) {
            this.props.getTitleSuggestions(this.props.productCode, this.state.currentRating);
        }
    };

    getUpdatedRating = rating => {
        this.setState({ currentRating: rating });
    };

    submitRating = () => {
        let productReview = {};
        productReview.rating = this.state.currentRating;
        this.props.addProductReview(this.props.productCode, productReview);
        let data = { pageName: this.props.pageName ? this.props.pageName : null };
        setDataLayerForRatingReviewSection(ADOBE_RATING_REVIEW_MODAL_RATING_SUBMIT, data);
    };

    getUpdatedParameters = (paramsData, paramsDataForAPI, actualParamsCount) => {
        this.setState({ currentParamsData: paramsData, actualParamsCount });
        let qualities = {
            userRating: this.state.currentRating,
            parameterRating: paramsDataForAPI,
        };
        this.setState({ qualities });
    };

    submitQualities = () => {
        this.props.submitParameterRating(this.props.productCode, this.state.qualities);
        let data = { pageName: this.props.pageName ? this.props.pageName : null, pageAction: "Submit" };
        setDataLayerForRatingReviewSection(ADOBE_RATING_REVIEW_MODAL_QUALITY_SUBMIT, data);
    };

    getStatusBarClass = acvtiveSession => {
        switch (acvtiveSession) {
            case 1:
                return null;

            case 2:
                return styles.width33;

            case 3:
                return styles.width66;

            default:
                return styles.width100;
        }
    };

    getUpdatedReviewDetails = (title, reviewDetails, id) => {
        if (title && reviewDetails) {
            this.setState({ disableReviewSubmit: false, title, reviewDetails, id });
        } else {
            this.setState({ disableReviewSubmit: true });
        }
    };

    submitReviews = () => {
        if (this.state.reviewDetails.length < 50) {
            this.props.displayToast("Please enter minimum 50 characters");
        } else {
            let productReview = {};
            productReview.rating = this.state.currentRating;
            productReview.headline = this.state.title;
            productReview.comment = this.state.reviewDetails;
            if (this.state.userProductReviewDetails && this.state.id) {
                productReview.id = this.state.id;
            }
            this.props.addProductReview(this.props.productCode, productReview);
            let data = { pageName: this.props.pageName ? this.props.pageName : null, pageAction: "Submit" };
            setDataLayerForRatingReviewSection(ADOBE_RATING_REVIEW_MODAL_REVIEW_SUBMIT, data);
        }
    };

    skipQualities = section => {
        let data = { pageName: this.props.pageName ? this.props.pageName : null, pageAction: "Skip" };
        setDataLayerForRatingReviewSection(ADOBE_RATING_REVIEW_MODAL_QUALITY_SUBMIT, data);
        this.activateSection(section);
    };

    skipReviews = section => {
        let data = { pageName: this.props.pageName ? this.props.pageName : null, pageAction: "Skip" };
        setDataLayerForRatingReviewSection(ADOBE_RATING_REVIEW_MODAL_REVIEW_SUBMIT, data);
        this.activateSection(section);
    };

    render() {
        const { rating, paramsEligibleToRateDetails } = this.props;

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

        let statusBar = this.getStatusBarClass(this.state.sectionActive);
        if (!this.state.disableReviewSubmit) {
            statusBar = styles.width100;
        }
        if (
            (!paramsEligibleToRateDetails ||
                (paramsEligibleToRateDetails &&
                    paramsEligibleToRateDetails.status &&
                    paramsEligibleToRateDetails.status.toLowerCase() === failure)) &&
            this.state.sectionActive === 3
        ) {
            statusBar = styles.width50;
        }

        let currentParamsDataLength = this.state.currentParamsData && Object.keys(this.state.currentParamsData).length;

        return (
            <div className={styles.base}>
                <div className={styles.tabContent}>
                    {this.state.sectionActive === 1 && (
                        <RnRRatingSectionComponent
                            getUpdatedRating={rating => this.getUpdatedRating(rating)}
                            selectedRating={this.state.currentRating}
                            pageName={this.props.pageName}
                        />
                    )}
                    {this.state.sectionActive === 2 && (
                        <React.Fragment>
                            {this.state.paramsEligibleToRateDetails && this.state.userProductReviewDetails ? (
                                <RnRQualitiesSectionComponent
                                    paramsEligibleToRateDetails={this.state.paramsEligibleToRateDetails}
                                    getUpdatedParameters={(paramsData, paramsDataForAPI, actualParamsCount) =>
                                        this.getUpdatedParameters(paramsData, paramsDataForAPI, actualParamsCount)
                                    }
                                    userProductReviewDetails={this.state.userProductReviewDetails}
                                    pageName={this.props.pageName}
                                />
                            ) : this.state.paramsEligibleToRateDetails && !this.state.userProductReviewDetails ? (
                                <RnRQualitiesSectionComponent
                                    paramsEligibleToRateDetails={this.state.paramsEligibleToRateDetails}
                                    getUpdatedParameters={(paramsData, paramsDataForAPI, actualParamsCount) =>
                                        this.getUpdatedParameters(paramsData, paramsDataForAPI, actualParamsCount)
                                    }
                                    pageName={this.props.pageName}
                                />
                            ) : !this.state.paramsEligibleToRateDetails && this.state.userProductReviewDetails ? (
                                <RnRQualitiesSectionComponent
                                    getUpdatedParameters={(paramsData, paramsDataForAPI, actualParamsCount) =>
                                        this.getUpdatedParameters(paramsData, paramsDataForAPI, actualParamsCount)
                                    }
                                    userProductReviewDetails={this.state.userProductReviewDetails}
                                    pageName={this.props.pageName}
                                />
                            ) : null}
                        </React.Fragment>
                    )}
                    {this.state.sectionActive === 3 && (
                        <RnRReviewSectionComponent
                            titleSuggestionsDetails={this.state.titleSuggestionsDetails}
                            getUpdatedReviewDetails={(title, reviewDetails, id) =>
                                this.getUpdatedReviewDetails(title, reviewDetails, id)
                            }
                            userProductReviewDetails={this.state.userProductReviewDetails}
                            pageName={this.props.pageName}
                        />
                    )}
                    {this.state.sectionActive === 4 && (
                        <RnRSuccessSectionComponent
                            selectedRating={this.state.currentRating}
                            getPendingReviewsSuccessScreen={currentPage =>
                                this.props.getPendingReviewsSuccessScreen(currentPage)
                            }
                            pendingReviewsDetails={this.props.pendingReviewsDetails}
                            history={this.props.history}
                        />
                    )}
                </div>

                {this.state.sectionActive !== 4 && (
                    <div className={styles.tabSwitches}>
                        <div className={statusBar} />
                        <div className={classNameOne} onClick={() => this.activateSection(1)}>
                            <div className={styles.iconContainer}>
                                <span className={styles.currentRating}>
                                    {this.state.currentRating ? this.state.currentRating : null}
                                </span>
                                <Icon image={!this.state.currentRating ? rnrRatingBlank : rnrRatingFilled} size={14} />
                            </div>
                            {rating || this.state.currentRating ? (
                                <span>You rated this product</span>
                            ) : (
                                <span>Rate this product</span>
                            )}
                        </div>
                        {paramsEligibleToRateDetails &&
                            paramsEligibleToRateDetails.status &&
                            paramsEligibleToRateDetails.status.toLowerCase() === success &&
                            paramsEligibleToRateDetails.eligibleParamToCaptureRating.length > 0 && (
                                <div className={classNameTwo} onClick={() => this.activateSection(2)}>
                                    <div className={styles.iconContainer}>
                                        <Icon
                                            image={
                                                currentParamsDataLength !== this.state.actualParamsCount
                                                    ? rnrQualitiesBlank
                                                    : rnrQualitiesFilled
                                            }
                                            size={30}
                                        />
                                    </div>
                                    Qualities you liked
                                </div>
                            )}
                        <div className={classNameThree} onClick={() => this.activateSection(3)}>
                            <div className={styles.iconContainer}>
                                <Icon
                                    image={this.state.disableReviewSubmit ? rnrReviewBlank : rnrReviewFilled}
                                    size={26}
                                />
                            </div>
                            Your Review
                        </div>
                    </div>
                )}

                <div className={styles.buttonContainer}>
                    {this.state.sectionActive === 1 && (
                        <CustomButton
                            text="Continue"
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
                    )}
                    {this.state.sectionActive === 2 && (
                        <React.Fragment>
                            <CustomButton
                                text="Skip"
                                width="auto"
                                height="36px"
                                fontSize="12px"
                                color="#494745"
                                border="none"
                                borderRadius="4px"
                                fontFamily="light"
                                handleClick={() => this.skipQualities(3)}
                                disabled={false}
                            />
                            <CustomButton
                                text="Continue"
                                width="120px"
                                height="36px"
                                fontSize="12px"
                                color="#da1c5c"
                                border="1px solid #da1c5c"
                                borderRadius="4px"
                                fontFamily="regular"
                                handleClick={() => this.submitQualities()}
                                disabled={currentParamsDataLength !== this.state.actualParamsCount ? true : false}
                            />
                        </React.Fragment>
                    )}
                    {this.state.sectionActive === 3 && (
                        <React.Fragment>
                            <CustomButton
                                text="Skip"
                                width="auto"
                                height="36px"
                                fontSize="12px"
                                color="#494745"
                                border="none"
                                borderRadius="4px"
                                fontFamily="light"
                                handleClick={() => this.skipReviews(4)}
                                disabled={false}
                            />
                            <CustomButton
                                text="Submit"
                                width="120px"
                                height="36px"
                                fontSize="12px"
                                color="#da1c5c"
                                border="1px solid #da1c5c"
                                borderRadius="4px"
                                fontFamily="regular"
                                handleClick={() => this.submitReviews()}
                                disabled={this.state.disableReviewSubmit ? true : false}
                            />
                        </React.Fragment>
                    )}
                </div>
            </div>
        );
    }
}

RatingAndReviewModalV2.propTypes = {
    rating: PropTypes.number,
    addProductReview: PropTypes.func,
    productCode: PropTypes.string,
    paramsEligibleToRateDetails: PropTypes.object,
    submitParameterRating: PropTypes.func,
    getTitleSuggestions: PropTypes.func,
    getTitleSuggestionsDetails: PropTypes.object,
    displayToast: PropTypes.func,
    addReviewDetails: PropTypes.object,
    submitParameterRatingDetails: PropTypes.object,
    section: PropTypes.number,
    userProductReviewDetails: PropTypes.object,
    pageName: PropTypes.string,
    getPendingReviewsSuccessScreen: PropTypes.func,
    pendingReviewsDetails: PropTypes.object,
    history: PropTypes.object,
    getParametersEligibleToRate: PropTypes.func,
};
