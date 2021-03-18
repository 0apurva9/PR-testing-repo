import React, { Component } from "react";
import Icon from "../../xelpmoc-core/Icon";
import styles from "./RnRSuccessSectionComponent.css";
import PropTypes from "prop-types";
import rnrSuccessHighRating from "./img/rnrSuccessHighRating.jpg";
import rnrSuccessLowRating from "./img/rnrSuccessLowRating.jpg";
import ProductImage from "../../general/components/ProductImage";
import RnREmptyRatingGreyStarComponent from "./RnREmptyRatingGreyStarComponent";
import {WRITE_REVIEW} from "../../lib/constants";
class RnRSuccessSectionComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pendingReviewsDetails : null
		};
	}

	componentDidMount() {
		this.props.getPendingReviews(0, true);
	}

	componentDidUpdate(prevProps) {
		if(this.props.pendingReviewsDetails !== prevProps.pendingReviewsDetails){
			this.setState({pendingReviewsDetails: this.props.pendingReviewsDetails});
		}
	}

	openRatingReviewModal = (rating, productCode, productName) => {
		let productTitle = productName && productName.replaceAll(/[^a-zA-Z0-9]/g, "-").toLowerCase();
		let param = "";
		if(productTitle) {
			param = `/${productTitle}`;
		}
		this.props.history.push(`${param}/p-${productCode}${WRITE_REVIEW}`);
	};

    render() {
        return (
            <React.Fragment>
				{this.props.selectedRating > 2.5 ? (
					<React.Fragment>
						<div className={styles.heading}>Looks like we really CLiQed!</div>
						<div className={styles.iconContainer}>
							<Icon image={rnrSuccessHighRating} size={97} />
						</div>
					</React.Fragment>
				) : (
					<React.Fragment>
						<div className={styles.heading}>Thank you for your honest feedback.</div>
						<div className={styles.iconContainer}>
							<Icon image={rnrSuccessLowRating} size={97} />
						</div>
					</React.Fragment>
				)}

				{this.state.pendingReviewsDetails &&
				this.state.pendingReviewsDetails.reviews &&
				this.state.pendingReviewsDetails.reviews.length > 0 ? (
					<div className={styles.pendingReviewContainer}>
						<div className={styles.title}>Tell us how you felt about these products</div>
						<div className={styles.allReviewContainer}>
							{this.state.pendingReviewsDetails.reviews.map((data, i) => {
								if(!data) { return null };
								return (
									<div key={i.toString()} className={styles.eachReviewContainer}>
										<div className={styles.imageContainer}>
											<ProductImage
												image={data.productImageUrl}
											/>
										</div>
										<div className={styles.detailsContainer}>
											<div className={styles.brandName}>{data.brandName}</div>
											<div className={styles.productName}>{data.productTitle}</div>
										</div>
										<div className={styles.reviewHeading}>
											Rate This Product
										</div>
										<div className={styles.ratingBar}>
											<RnREmptyRatingGreyStarComponent
												submitRating={(rating) => this.openRatingReviewModal(rating, data.listingId, data.productTitle)}
											/>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				) : null}

            </React.Fragment>
        );
    }
}

RnRSuccessSectionComponent.propTypes = {
	selectedRating: PropTypes.number,
	getPendingReviews: PropTypes.func,
	pendingReviewsDetails: PropTypes.object,
	history: PropTypes.object,
};

export default RnRSuccessSectionComponent;
