import React from "react";
import styles from "./ReviewList.css";
import ReviewPage from "./ReviewPage";
import PropTypes from "prop-types";
import ProductDetailsWithEachReview from "./ProductDetailsWithEachReview";

export default class ReviewList extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className={styles.base}>
                    {this.props &&
                        this.props.limit &&
                        this.props.reviewList &&
                        this.props.reviewList
                            .filter((data, i) => {
                                return i < 5;
                            })
                            .map((data, i) => {
                                if (!data) return null;
                                let userName = data.userName;
                                let alias = data.alias;
                                return (
									<div key={i.toString()} className={this.props.showProductDetails ? styles.reviewContainer : null}>
										{this.props.showProductDetails ? (
											<React.Fragment>
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
												/>
											</React.Fragment>
										) :  null}

										{/* to show on pending/published review page conditionally */}
										{this.props.showProductDetails &&
										(data.isPendingForApproval || this.props.isPublishedReview) ? (
											<ReviewPage
												fromBeautyPdp={this.props.fromBeautyPdp}
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
											/>
										) : null}

										{/* to show on PDP/Review list page */}
										{!this.props.showProductDetails ? (
											<ReviewPage
												fromBeautyPdp={this.props.fromBeautyPdp}
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
											/>
										) : null}
									</div>
                                );
                            })}
                    {this.props &&
                        !this.props.limit &&
                        this.props.currentreviewList &&
                        this.props.currentreviewList.map((data, i) => {
                            if (!data) return null;
                            let userName = data.userName;
                            let alias = data.alias;
                            return (
                                <ReviewPage
                                    fromBeautyPdp={this.props.fromBeautyPdp}
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
                                />
                            );
                        })}
                </div>
            </React.Fragment>
        );
    }
}

ReviewList.propTypes = {
    reviewList: PropTypes.arrayOf(
        PropTypes.shape({
            rating: PropTypes.string,
            heading: PropTypes.string,
            text: PropTypes.string,
            label: PropTypes.string,
            colorlink: PropTypes.object,
            sizelink: PropTypes.object,
            eligibleParamCaptured: PropTypes.object,
        })
    ),
    limit: PropTypes.number,
    fromBeautyPdp: PropTypes.bool,
    currentreviewList: PropTypes.array,
	showProductDetails: PropTypes.bool,
	submitRating: PropTypes.func,
	isPublishedReview: PropTypes.bool,
};
