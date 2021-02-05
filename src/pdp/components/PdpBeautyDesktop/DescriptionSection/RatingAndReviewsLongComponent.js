import React from "react";

import ProductReviewListContainer from "../../../containers/ProductReviewListContainer";
import Icon from "../../../../xelpmoc-core/Icon";
import UnderLinedButton from "../../../../general/components/UnderLinedButton";
import styles from "./RatingAndReviewsLongComponent.css";
import {
    setDataLayerForPdpDirectCalls,
    SET_DATA_LAYER_FOR_VIEW_ALL_REVIEW_AND_RATING_EVENT,
} from "../../../../lib/adobeUtils";
import { PRODUCT_REVIEWS_PATH_SUFFIX } from "../../../../lib/constants";
import FilledStarBlack from "../../../../general/components/img/star-fill-black.svg";

export default class RatingsAndReviewsLongComponent extends React.Component {
    goToReviewPage = () => {
        setDataLayerForPdpDirectCalls(SET_DATA_LAYER_FOR_VIEW_ALL_REVIEW_AND_RATING_EVENT);
        let url = this.props.location.pathname;
        url = `${url.replace(/\/$/, "")}/${PRODUCT_REVIEWS_PATH_SUFFIX}`;
        this.props.history.push(url);
    };

    render() {
        const productDetails = this.props.productDetails;
        return productDetails.numberOfReviews &&
            (productDetails.numberOfReviews !== 0 || productDetails.numberOfReviews !== "0") ? (
            <div id="rating-parent" className={styles.container} ref={this.props.ratingReviewsRef}>
                <div className={styles.ratingReviewComponent}>
                    <div>
                        <div className={styles.reviewsHeader}>
                            <h3 className={styles.reviewsHeading}>RATINGS AND REVIEWS</h3>
                            <div className={styles.reviewsButton}>
                                <UnderLinedButton
                                    color="#ff1744"
                                    label="See All"
                                    fontFamily="light"
                                    onClick={this.goToReviewPage}
                                />
                            </div>
                        </div>
                        {productDetails.averageRating && (
                            <div className={styles.reviewListHolder}>
                                <div className={styles.ratingTextContainer}>
                                    <div className={styles.ratingText}>
                                        {Math.round(productDetails.averageRating * 10) / 10}
                                    </div>
                                    <div className={styles.starPLPElectronics}>
                                        <Icon image={FilledStarBlack} size={26} />
                                    </div>
                                </div>
                                <div className={styles.labelText}>
                                    <span className={styles.ratingLabel} itemProp="ratingCount">
                                        {productDetails.ratingCount}
                                    </span>
                                    <span>{productDetails.ratingCount > 1 ? "Ratings" : "Rating"}</span>
                                    {productDetails.numberOfReviews ? (
                                        <React.Fragment>
                                            {" &"}
                                            <span className={styles.ratingLabel} itemProp="reviewCount">
                                                {productDetails.numberOfReviews}
                                            </span>
                                            <span>{productDetails.numberOfReviews > 1 ? "Reviews" : "Review"}</span>
                                        </React.Fragment>
                                    ) : null}
                                </div>
                            </div>
                        )}
                        <ProductReviewListContainer
                            fromBeautyPdp={true}
                            limit={true}
                            productId={productDetails.productListingId}
                        />
                    </div>
                </div>
            </div>
        ) : null;
    }
}
