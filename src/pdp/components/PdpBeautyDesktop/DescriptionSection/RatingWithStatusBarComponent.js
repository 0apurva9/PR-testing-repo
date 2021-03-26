import React, { Component } from "react";
import styles from "./RatingWithStatusBarComponent.css";
import PropTypes from "prop-types";

export default class RatingWithStatusBarComponent extends Component {
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
                return styles.ratingStatus;
        }
    };

    getClsNameLowRating = number => {
        switch (number) {
            case 1:
                return styles.ratingStatusLow1;

            case 2:
                return styles.ratingStatusLow2;

            default:
                return styles.ratingStatus;
        }
    };

    getStatusBar = rating => {
        const numbers = [1, 2, 3, 4, 5];
        const listItems = numbers.map(number => {
            if (rating <= 2.5) {
                return (
                    <span className={styles.ratingStatus} key={number.toString()}>
                        <span className={this.getClsNameLowRating(number)} />
                    </span>
                );
            } else {
                let ratingCount = 0;
                if (number <= Math.round(rating)) {
                    ratingCount = number;
                }
                return (
                    <span className={styles.ratingStatus} key={number.toString()}>
                        <span className={this.getClsNameHighRating(ratingCount)} />
                    </span>
                );
            }
        });
        return <React.Fragment>{listItems}</React.Fragment>;
    };

    render() {
        return (
            <div className={styles.ratingWithStatusBarContainer}>
                <div className={this.props.isFluid ? styles.ratingWithStatusBarFluid : styles.ratingWithStatusBar}>
                    {this.props.currentRating && this.props.showCurrentRating ? (
                        <div className={styles.ratingContainer}>
                            <span className={styles.currentRatingText}>
								{Math.round(this.props.currentRating * 10) / 10}
							</span>
                            <span className={styles.ratingText}>/ 5</span>
                        </div>
                    ) : null}
                    {this.props.ratingTitle ? (
                        <div className={styles.ratingContainerFluid}>
                            <span className={styles.ratingText}>{this.props.ratingTitle}</span>
                        </div>
                    ) : null}
                    <div className={styles.statusBarContainer}>{this.getStatusBar(this.props.currentRating)}</div>
                </div>
                {this.props.ratingText ? <div className={styles.ratingText}>{this.props.ratingText}</div> : null}
            </div>
        );
    }
}

RatingWithStatusBarComponent.propTypes = {
    isFluid: PropTypes.bool,
    currentRating: PropTypes.number,
    showCurrentRating: PropTypes.bool,
    ratingTitle: PropTypes.string,
    ratingText: PropTypes.string,
};
