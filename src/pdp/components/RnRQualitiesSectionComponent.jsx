import React, { Component } from "react";
import styles from "./RnRQualitiesSectionComponent.css";
import PropTypes from "prop-types";

class RnRQualitiesSectionComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
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
        this.props.getUpdatedParameters(paramsData, paramsDataForAPI);
    };

    render() {
        const { paramsEligibleToRateDetails } = this.props;

        return (
            <React.Fragment>
                <div className={styles.heading}>Help us understand what you liked</div>
                <div className={styles.ratingDetailsContainer}>
                    {paramsEligibleToRateDetails.eligibleParamToCaptureRating.map((eachQuality, index) => {
                        let currentRating = this.state.paramsData && this.state.paramsData[index];
                        return (
                            <div key={eachQuality.parameterName}>
                                {eachQuality.parameterCapture ? (
                                    <React.Fragment>
                                        <div className={styles.qualityName}>{eachQuality.parameterName}</div>
                                        <div className={styles.eachRatingContainer}>
                                            <div
                                                className={this.getStatusBar(1, currentRating)}
                                                onClick={() => this.setParameters(index, 1, eachQuality.parameterName)}
                                            >
                                                1
                                            </div>
                                            <div
                                                className={this.getStatusBar(2, currentRating)}
                                                onClick={() => this.setParameters(index, 2, eachQuality.parameterName)}
                                            >
                                                2
                                            </div>
                                            <div
                                                className={this.getStatusBar(3, currentRating)}
                                                onClick={() => this.setParameters(index, 3, eachQuality.parameterName)}
                                            >
                                                3
                                            </div>
                                            <div
                                                className={this.getStatusBar(4, currentRating)}
                                                onClick={() => this.setParameters(index, 4, eachQuality.parameterName)}
                                            >
                                                4
                                            </div>
                                            <div
                                                className={this.getStatusBar(5, currentRating)}
                                                onClick={() => this.setParameters(index, 5, eachQuality.parameterName)}
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
};

export default RnRQualitiesSectionComponent;
