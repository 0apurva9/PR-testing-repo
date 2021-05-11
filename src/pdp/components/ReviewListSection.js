import React from "react";
import ReviewList from "./ReviewList";
import { REQUESTING } from "../../lib/constants";
import ReviewsSkeletonLoader from "./ReviewsSkeletonLoader";

export default class ReviewListSection extends React.Component {
    componentDidMount() {
        this.props.getPdpReviews();
    }

    render() {
        if (this.props.getPdpReviewsStatus === REQUESTING) {
            return <ReviewsSkeletonLoader />;
        }
        if (this.props.reviews && this.props.reviews.reviews) {
            return (
                <ReviewList
                    fromBeautyPdp={this.props.fromBeautyPdp}
                    limit={this.props.limit}
                    reviewList={this.props.reviews.reviews}
                />
            );
        } else {
            return null;
        }
    }
}
