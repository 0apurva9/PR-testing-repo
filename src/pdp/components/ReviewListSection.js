import React from "react";
import ReviewList from "./ReviewList";

export default class ReviewListSection extends React.Component {
  componentDidMount() {
    this.props.getProductReviews(0, "desc", "byDate");
  }
  render() {
    if (this.props.reviews && this.props.reviews.reviews) {
      return (
        <ReviewList
          fromBeautyPdp={this.props.fromBeautyPdp}
          limit={this.props.limit}
          reviewList={this.props.reviews.reviews}
          totalNoOfReviews={this.props.reviews.totalNoOfPages}
        />
      );
    } else {
      return null;
    }
  }
}
