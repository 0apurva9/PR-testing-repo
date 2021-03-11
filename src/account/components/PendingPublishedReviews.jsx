import React, { Component } from 'react';
import styles from "./PendingPublishedReviews.css";
import PropTypes from 'prop-types';
import ReviewList from '../../pdp/components/ReviewList';
import SectionLoaderDesktop from '../../general/components/SectionLoaderDesktop';

class PendingPublishedReviews extends Component {
	constructor(props){
		super(props);
		this.state = {
			activeTab : 1,
			pendingReviewsDetails : null,
			publishedReviewsDetails : null,
		};
	}

	componentDidMount() {
		this.props.getPendingReviews();
		this.props.getPublishedReviews();
	}

	componentDidUpdate(prevProps) {
		if(this.props.pendingReviewsDetails !== prevProps.pendingReviewsDetails){
			this.setState({pendingReviewsDetails : this.props.pendingReviewsDetails});
		}
		if(this.props.publishedReviewsDetails !== prevProps.publishedReviewsDetails){
			this.setState({publishedReviewsDetails : this.props.publishedReviewsDetails});
		}
	}

	switchTabs = (section) => {
		this.setState({activeTab : section});
	};

	render() {
		return (
			<div className={styles.base}>
				<div className={styles.switches}>
					<div className={this.state.activeTab === 1 ? styles.pendingTitleActive : styles.pendingTitle} onClick={() => this.switchTabs(1)}>Pending</div>
					<div className={this.state.activeTab === 2 ? styles.publishedTitleActive : styles.publishedTitle} onClick={() => this.switchTabs(2)}>Published</div>
				</div>
				<div className={styles.tabs}>
					{this.state.activeTab === 1 ? (
						<div className={styles.reviewsBase}>
							{!this.state.pendingReviewsDetails ? (
								<SectionLoaderDesktop />
							) : null}
							{this.state.pendingReviewsDetails && this.state.pendingReviewsDetails.totalNoOfReviews ? (
								<div className={styles.reviews}>
									{this.state.pendingReviewsDetails.reviews &&
									this.state.pendingReviewsDetails.reviews.length > 0 && (
										<ReviewList
											reviewList={this.state.pendingReviewsDetails.reviews}
											totalNoOfReviews={this.state.pendingReviewsDetails.totalNoOfPages}
											NoOfReviews={this.state.pendingReviewsDetails.totalNoOfReviews}
											// currentreviewList={currentreviewList}
											limit={true}
											showProductDetails={true}
											submitRating={(rating, productCode, section) => this.props.submitRating(rating, productCode, section)}
										/>
									)}
								</div>
							) : (
								<div className={styles.noReviewsText}>No reviews</div>
							)}
						</div>
					) : null}

					{this.state.activeTab === 2 ? (
						<div className={styles.reviewsBase}>
							{!this.state.publishedReviewsDetails ? (
								<SectionLoaderDesktop />
							) : null}
							{this.state.publishedReviewsDetails && this.state.publishedReviewsDetails.totalNoOfReviews ? (
								<div className={styles.reviews}>
									{this.state.publishedReviewsDetails.reviews &&
									this.state.publishedReviewsDetails.reviews.length > 0 && (
										<div className={styles.reviewsContainer}>
											<ReviewList
												reviewList={this.state.publishedReviewsDetails.reviews}
												totalNoOfReviews={this.state.publishedReviewsDetails.totalNoOfPages}
												NoOfReviews={this.state.publishedReviewsDetails.totalNoOfReviews}
												// currentreviewList={currentreviewList}
												limit={true}
												showProductDetails={true}
												submitRating={(rating, productCode, section) => this.props.submitRating(rating, productCode, section)}
												isPublishedReview={true}
											/>
										</div>

									)}
								</div>
							) : (
								<div className={styles.noReviewsText}>No reviews</div>
							)}
						</div>
					) : null}
				</div>
			</div>
		);
	}
}

PendingPublishedReviews.propTypes = {
	getPendingReviews: PropTypes.func,
	getPublishedReviews: PropTypes.func,
	pendingReviewsDetails: PropTypes.object,
	publishedReviewsDetails: PropTypes.object,
};

export default PendingPublishedReviews;