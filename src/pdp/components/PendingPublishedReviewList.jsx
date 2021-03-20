import React from "react";
import styles from "./ReviewList.css";
import ReviewPage from "./ReviewPage";
import PropTypes from "prop-types";
import ProductDetailsWithEachReview from "./ProductDetailsWithEachReview";

export default class PendingPublishedReviewList extends React.Component {
    render() {
        return (
			<div className={styles.base}>
				{this.props.reviewList &&
				this.props.reviewList.length > 0 &&
				this.props.reviewList.map((data, i) => {
					if(!data) { return null }
					let userName = data.userName;
					let alias = data.alias;
						return (
							<div key={i.toString()} className={styles.reviewContainer}>
								<ProductDetailsWithEachReview
									imageUrl={data.productImageUrl}
									brandName={data.brandName}
									productName={data.productTitle}
									isPendingForApproval={data.isPendingForApproval}
									userRating={data.rating}
									isRated={data.isRated}
									isReviewed={data.isReviewed}
									isParamConfigured={data.isParamConfigured}
									isParamRatingPresent={data.isParamRatingPresent}
									productcode={data.listingId}
									submitRating={(rating, productCode, section) => this.props.submitRating(rating, productCode, section)}
									isPublishedReview={this.props.isPublishedReview}
									canEditDelete={data.canEditDelete}
									editRatingReview={(productcode, rating) => this.props.editRatingReview(productcode, rating)}
									openRatingReviewModal={this.props.openRatingReviewModal}
									showRatingReviewModal={(productcode, rating) => this.props.showRatingReviewModal(productcode, rating)}
								/>

								{/* to show on pending/published review page conditionally */}
								{(data.isPendingForApproval || this.props.isPublishedReview) ? (
									<ReviewPage
										rating={data && data.rating}
										heading={data && data.headline}
										text={data && data.comment}
										date={data && data.date}
										isBuyer={data && data.isBuyer}
										reviewAge={data && data.reviewAge}
										name={userName ? userName : alias}
										key={i}
										colorlink={data.colorlink}
										sizelink={data.sizelink}
										eligibleParamCaptured={data.eligibleParamCaptured}
										gender={data.gender}
									/>
								) : null}

							</div>
						);
					})
				}
            </div>
        );
    }
}

PendingPublishedReviewList.propTypes = {
    reviewList: PropTypes.array,
	submitRating: PropTypes.func,
	isPublishedReview: PropTypes.bool,
	editRatingReview: PropTypes.func,
};
