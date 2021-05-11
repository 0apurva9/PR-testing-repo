import React, { Component } from "react";
import styles from "./RnRQualitiesSectionComponent.css";
import PropTypes from "prop-types";
import { setDataLayerForRatingReviewSection, ADOBE_RATING_REVIEW_MODAL_QUALITY_SECTION } from "../../lib/adobeUtils";

class RnRQualitiesSectionComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initialParams: null,
            initialParamsLength: 0,
            paramsFromUserProductReview: null,
            paramsFromUserProductReviewLength: 0,
        };
    }

    componentDidMount() {
        // if user is submiting params first time
        if (
            this.props.paramsEligibleToRateDetails &&
            this.props.paramsEligibleToRateDetails.eligibleParamToCaptureRating &&
            this.props.paramsEligibleToRateDetails.eligibleParamToCaptureRating.length > 0
        ) {
            this.setState({
                initialParams: this.props.paramsEligibleToRateDetails.eligibleParamToCaptureRating,
                initialParamsLength: this.props.paramsEligibleToRateDetails.eligibleParamToCaptureRating.length,
            });
        }

        // if user is editing rating/review from published review section
        if (
            this.props.userProductReviewDetails &&
            this.props.userProductReviewDetails.eligibleParamCaptured &&
            this.props.userProductReviewDetails.eligibleParamCaptured.length > 0
        ) {
            this.setState({
                paramsFromUserProductReview: this.props.userProductReviewDetails.eligibleParamCaptured,
                paramsFromUserProductReviewLength: this.props.userProductReviewDetails.eligibleParamCaptured.length,
            });
            // initially set submit btn active
            let paramsDataForAPI = this.props.userProductReviewDetails.eligibleParamCaptured.map(existingParam => {
                let { paramVisibility, ...otherParamsObj } = existingParam;
                if (otherParamsObj) {
                    return otherParamsObj;
                } else {
                    return paramVisibility;
                }
            });
            this.props.getUpdatedParameters(
                paramsDataForAPI,
                paramsDataForAPI,
                this.props.userProductReviewDetails.eligibleParamCaptured.length
            );
        }

        let data = { pageName: this.props.pageName ? this.props.pageName : null };
        setDataLayerForRatingReviewSection(ADOBE_RATING_REVIEW_MODAL_QUALITY_SECTION, data);
    }

    getClsNameHighRating = number => {
        switch (number) {
            case 1:
                return styles.ratingStatusHigh1;

            case 2:
                return styles.ratingStatusHigh2;

            case 3:
                return styles.ratingStatusHigh3;

            case 4:
                return styles.ratingStatusHigh4;

            case 5:
                return styles.ratingStatusHigh5;

            default:
                return styles.eachRating;
        }
    };

    getClsNameLowRating = number => {
        switch (number) {
            case 1:
                return styles.ratingStatusLow1;

            case 2:
                return styles.ratingStatusLow2;

            default:
                return styles.eachRating;
        }
    };

    getStatusBar = (number, rating) => {
        if (rating <= 2) {
            let ratingCountOne = 0;
            if (number <= Math.round(rating)) {
                ratingCountOne = number;
            }
            let classNameLowRating = this.getClsNameLowRating(ratingCountOne);
            return [styles.eachRating, classNameLowRating].join(" ");
        } else {
            let ratingCountTwo = 0;
            if (number <= Math.round(rating)) {
                ratingCountTwo = number;
            }
            let classNameHighRating = this.getClsNameHighRating(ratingCountTwo);
            return [styles.eachRating, classNameHighRating].join(" ");
        }
    };

    setParameters = (index, qtyParam, parameterName) => {
        if (this.state.paramsFromUserProductReview) {
            // if user is editing rating/review from published review section
            let existingParams = this.state.paramsFromUserProductReview;
            existingParams[index].parameterRating = qtyParam;
            this.setState({ paramsFromUserProductReview: existingParams });

            let paramsDataForAPI = existingParams.map(existingParam => {
                let { paramVisibility, ...otherParamsObj } = existingParam;
                if (otherParamsObj) {
                    return otherParamsObj;
                } else {
                    return paramVisibility;
                }
            });
            this.props.getUpdatedParameters(
                paramsDataForAPI,
                paramsDataForAPI,
                this.state.paramsFromUserProductReviewLength
            );
        } else {
            // if user is submiting params first time
            let paramsData = this.state.paramsData ? this.state.paramsData : {};
            paramsData[`${index}`] = qtyParam;
            this.setState({ paramsData });

            let paramsDataForAPI = this.state.paramsDataForAPI ? this.state.paramsDataForAPI : [];
            let eachParam = { parameterName: parameterName, parameterRating: qtyParam };

            if (paramsDataForAPI.length === 0) {
                paramsDataForAPI.push(eachParam);
                this.setState({ paramsDataForAPI });
            } else {
                let currentIndex;
                let alreadySelectedParam =
                    paramsDataForAPI &&
                    paramsDataForAPI.filter((data, index) => {
                        if (data.parameterName === parameterName) {
                            currentIndex = index;
                            return data;
                        }
                    });
                if (alreadySelectedParam.length === 0) {
                    paramsDataForAPI.push(eachParam);
                    this.setState({ paramsDataForAPI });
                } else {
                    paramsDataForAPI.splice(currentIndex, 1);
                    paramsDataForAPI.push(eachParam);
                    this.setState({ paramsDataForAPI });
                }
            }
            this.props.getUpdatedParameters(paramsData, paramsDataForAPI, this.state.initialParamsLength);
        }
    };

    componentWillUnmount() {
        this.props.getUpdatedParameters(null, null, 0);
    }

    render() {
        let params = this.state.initialParams;
        if (this.state.paramsFromUserProductReview) {
            params = this.state.paramsFromUserProductReview;
        }
        if (!params) {
            return null;
        }

        return (
            <React.Fragment>
                <div className={styles.heading}>Help us understand what you liked</div>
                <div className={styles.ratingDetailsContainer}>
                    {params &&
                        params.map((eachQuality, index) => {
                            let currentRating = this.state.paramsData && this.state.paramsData[index];
                            if (this.state.paramsFromUserProductReview) {
                                currentRating = eachQuality.parameterRating;
                            }
                            return (
                                <div key={eachQuality.parameterName}>
                                    {eachQuality.parameterCapture || eachQuality.paramVisibility ? (
                                        <React.Fragment>
                                            <div className={styles.qualityName}>{eachQuality.parameterName}</div>
                                            <div className={styles.eachRatingContainer}>
                                                <div
                                                    className={this.getStatusBar(1, currentRating)}
                                                    onClick={() =>
                                                        this.setParameters(index, 1, eachQuality.parameterName)
                                                    }
                                                >
                                                    1
                                                </div>
                                                <div
                                                    className={this.getStatusBar(2, currentRating)}
                                                    onClick={() =>
                                                        this.setParameters(index, 2, eachQuality.parameterName)
                                                    }
                                                >
                                                    2
                                                </div>
                                                <div
                                                    className={this.getStatusBar(3, currentRating)}
                                                    onClick={() =>
                                                        this.setParameters(index, 3, eachQuality.parameterName)
                                                    }
                                                >
                                                    3
                                                </div>
                                                <div
                                                    className={this.getStatusBar(4, currentRating)}
                                                    onClick={() =>
                                                        this.setParameters(index, 4, eachQuality.parameterName)
                                                    }
                                                >
                                                    4
                                                </div>
                                                <div
                                                    className={this.getStatusBar(5, currentRating)}
                                                    onClick={() =>
                                                        this.setParameters(index, 5, eachQuality.parameterName)
                                                    }
                                                    style={{
                                                        borderTopRightRadius: "4px",
                                                        borderBottomRightRadius: "4px",
                                                    }}
                                                >
                                                    5
                                                </div>

                                                {currentRating && (
                                                    <span className={styles.ratingCount}>
                                                        {currentRating}/<span className={styles.ffLight}>5</span>
                                                    </span>
                                                )}
                                            </div>
                                        </React.Fragment>
                                    ) : null}
                                </div>
                            );
                        })}
                </div>
            </React.Fragment>
        );
    }
}

RnRQualitiesSectionComponent.propTypes = {
    getUpdatedParameters: PropTypes.func,
    paramsEligibleToRateDetails: PropTypes.object,
    userProductReviewDetails: PropTypes.object,
    pageName: PropTypes.string,
};

export default RnRQualitiesSectionComponent;
