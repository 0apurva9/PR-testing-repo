import React from "react";
import styles from "./RatingAndIconComponent.css";
import Icon from "../../../../xelpmoc-core/Icon";
import FilledStarGreen from "../img/green-filled-star.svg";
import PropTypes from "prop-types";

export default class RatingAndIconComponent extends React.Component {
    render() {
        return (
            <React.Fragment>
                {this.props.isReviewPage ? (
                    <div className={styles.ratingTextContainerReviewPage}>
                        <div className={styles.ratingTextReviewPage}>
                            {Math.round(this.props.averageRating * 10) / 10}
                        </div>
                        <div className={styles.starContainerReviewPage}>
                            <Icon image={FilledStarGreen} size={11} />
                        </div>
                    </div>
                ) : (
                    <div
                        className={this.props.isFluidUI ? styles.ratingTextContainer : styles.ratingTextContainerOther}
                    >
                        <div className={styles.ratingText}>{Math.round(this.props.averageRating * 10) / 10}</div>
                        <div className={this.props.isFluidUI ? styles.starContainer : styles.starContainerOther}>
                            <Icon image={FilledStarGreen} size={32} />
                        </div>
                    </div>
                )}
            </React.Fragment>
        );
    }
}

RatingAndIconComponent.propTypes = {
    isReviewPage: PropTypes.bool,
    averageRating: PropTypes.number,
    isFluidUI: PropTypes.bool,
};
