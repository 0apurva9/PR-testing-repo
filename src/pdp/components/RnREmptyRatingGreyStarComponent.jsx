import React, { Component } from "react";
import EmptyRatingStarGrey from "./img/EmptyRatingStarGrey.svg";
import styles from "./RnREmptyRatingGreyStarComponent.css";
import PropTypes from "prop-types";

class RnREmptyRatingGreyStarComponent extends Component {
    submitRating = rating => {
        this.props.submitRating(rating);
    };

    render() {
        return (
            <div className={styles.emptyRatingStarGreyContainer}>
                <div className={styles.eachRatingContainer}>
                    <div className={styles.eachRating} onClick={() => this.submitRating(1)} />
                    <div className={styles.eachRating} onClick={() => this.submitRating(2)} />
                    <div className={styles.eachRating} onClick={() => this.submitRating(3)} />
                    <div className={styles.eachRating} onClick={() => this.submitRating(4)} />
                    <div className={styles.eachRating} onClick={() => this.submitRating(5)} />
                </div>
                {!this.props.isRatingClicked ? (
                    <img src={EmptyRatingStarGrey} className={styles.emptyRatingStarGrey} />
                ) : null}
            </div>
        );
    }
}

RnREmptyRatingGreyStarComponent.propTypes = {
    submitRating: PropTypes.func,
    isRatingClicked: PropTypes.bool,
};

export default RnREmptyRatingGreyStarComponent;
