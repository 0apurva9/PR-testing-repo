import React, { Component } from "react";
import ProductImage from "../../general/components/ProductImage";
import styles from "./ProductDetailsWithEachReview.css";
import PropTypes from "prop-types";
import RatingAndIconComponent from "./PdpBeautyDesktop/DescriptionSection/RatingAndIconComponent";
import RnREmptyRatingGreyStarComponent from "./RnREmptyRatingGreyStarComponent";
import Icon from "../../xelpmoc-core/Icon";
import editReview from "./img/editReview.svg";

class ProductDetailsWithEachReview extends Component {
	editRatingReview = (productcode, rating) => {
		this.props.editRatingReview(productcode, rating);
	};

	render() {
		return (
			<div className={styles.base}>
				{this.props.isPublishedReview && this.props.canEditDelete ? (
					<div className={styles.editButtonContainer} onClick={() => this.editRatingReview(this.props.productcode, this.props.userRating)}>
						<div className={styles.editIconContainer}>
							<Icon image={editReview} size={12} />
						</div>
						<div className={styles.editButton}>Edit</div>
					</div>
				) : null}
				<div className={styles.imageContainer}>
					<ProductImage
						image={this.props.imageUrl}
					/>
				</div>
				<div className={styles.detailsContainer}>
					<div className={styles.brandName}>{this.props.brandName}</div>
					<div className={styles.productName}>{this.props.productName}</div>
					{this.props.isPendingForApproval ? (
						<React.Fragment>
							<div className={styles.toModerateIcon} />
							<div className={styles.toModerate}>To be moderated</div>
						</React.Fragment>
					) : null}
				</div>

				{!this.props.isPendingForApproval && !this.props.isPublishedReview ? (
					<div className={styles.reviewHolder}>
						<div className={styles.reviewHeading}>
							{this.props.userRating && this.props.isRated ? "Your Rating" : "Rate this item"}
						</div>
						<div className={styles.ratingBar}>
							{this.props.userRating && this.props.isRated ? (
								<RatingAndIconComponent
									averageRating={this.props.userRating}
								/>
							) : (
								<RnREmptyRatingGreyStarComponent
									submitRating={(rating) => this.props.submitRating(rating, this.props.productcode)}
								/>
							)}
						</div>

						{!this.props.isReviewed && this.props.isRated && this.props.userRating ? (
							<React.Fragment>
								{this.props.isParamConfigured && !this.props.isParamRatingPresent ? (
								<div className={styles.writeReviewText}>
									<span
										className={styles.writeReviewTitle}
										onClick={() => this.props.submitRating(this.props.userRating, this.props.productcode, 2)}
									>
										Rate Qualities
									</span>
								</div>
								) : (
								<div className={styles.writeReviewText}>
									<span
										className={styles.writeReviewTitle}
										onClick={() => this.props.submitRating(this.props.userRating, this.props.productcode, 3)}
									>
										Write a Review
									</span>
								</div>
								)}
							</React.Fragment>
						) : null}

						{this.props.isRated && this.props.userRating && this.props.isReviewed ? (
							<div className={styles.reviewSuccess}>Rating and Review Submitted</div>
						) : null}
					</div>
				) : (
					<div className={styles.bb} />
				)}
			</div>
		);
	}
}

ProductDetailsWithEachReview.propTypes = {
	imageUrl: PropTypes.string,
	brandName: PropTypes.string,
	productName: PropTypes.string,
	isPendingForApproval: PropTypes.bool,
	userRating: PropTypes.number,
	isRated: PropTypes.bool,
	submitRating: PropTypes.func,
	isReviewed: PropTypes.bool,
	isParamConfigured: PropTypes.bool,
	isParamRatingPresent: PropTypes.bool,
	productcode: PropTypes.string,
	isPublishedReview: PropTypes.bool,
	canEditDelete: PropTypes.bool,
};

export default ProductDetailsWithEachReview;
