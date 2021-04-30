import React from "react";
import ReviewList from "./ReviewList";

export default class ReviewListSection extends React.Component {
    componentDidMount() {
        this.props.getPdpReviews();
    }

    render() {
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
