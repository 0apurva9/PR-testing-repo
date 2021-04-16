import React from "react";
import styles from "./RatingReviewCountComponent.css";
import PropTypes from "prop-types";

export default class RatingReviewCountComponent extends React.Component {
    render() {
        return (
            <div className={styles.labelText}>
                <span className={styles.ratingLabel} itemProp="ratingCount">
                    {this.props.productDetails.ratingCount}
                </span>
                <span>{this.props.productDetails.ratingCount > 1 ? "Ratings" : "Rating"}</span>
                {this.props.productDetails.numberOfReviews ? (
                    <React.Fragment>
                        <span>{" &"}</span>
                        <span className={styles.ratingLabel} itemProp="reviewCount">
                            {this.props.productDetails.numberOfReviews}
                        </span>
                        <span>{this.props.productDetails.numberOfReviews > 1 ? "Reviews" : "Review"}</span>
                    </React.Fragment>
                ) : null}
            </div>
        );
    }
}

RatingReviewCountComponent.propTypes = {
    productDetails: PropTypes.objectOf(
        PropTypes.shape({
            ratingCount: PropTypes.number,
            numberOfReviews: PropTypes.number,
        })
    ),
};
