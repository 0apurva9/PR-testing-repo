import React, { Component } from "react";
import styles from "./RnRRatingSectionComponent.css";
import PropTypes from "prop-types";

import InitialRatingStarGrey from "./img/InitialRatingStarGrey.jpg";
import oneStarRating from "./img/oneStarRating.jpg";
import twoStarRating from "./img/twoStarRating.jpg";
import threeStarRating from "./img/threeStarRating.jpg";
import fourStarRating from "./img/fourStarRating.jpg";
import fiveStarRating from "./img/fiveStarRating.jpg";
import RnREmptyRatingGreyStarComponent from "./RnREmptyRatingGreyStarComponent";

class RnRRatingSectionComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: 0,
        };
    }

    submitRating = rating => {
        this.setState({ rating });
        this.props.getUpdatedRating(rating);
    };

    getUIForSelectedRating = rating => {
        switch (rating) {
            case 1:
                return oneStarRating;

            case 2:
                return twoStarRating;

            case 3:
                return threeStarRating;

            case 4:
                return fourStarRating;

            case 5:
                return fiveStarRating;

            default:
                return null;
        }
    };

    render() {
        return (
            <div className={styles.base}>
                {/* no rating */}
                {this.state.rating === 0 ? (
                    <React.Fragment>
                        <div className={styles.heading}>Tell us how you felt about these product</div>
                        <img src={InitialRatingStarGrey} className={styles.ratingInitial} />
						<RnREmptyRatingGreyStarComponent
							submitRating={(rating) => this.submitRating(rating)}
						/>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <div className={styles.heading}>Thank you for Rating this product!</div>
                        <img src={this.getUIForSelectedRating(this.state.rating)} className={styles.ratingSuccess} />
                    </React.Fragment>
                )}
            </div>
        );
    }
}

RnRRatingSectionComponent.propTypes = {
    getUpdatedRating: PropTypes.func,
};

export default RnRRatingSectionComponent;
