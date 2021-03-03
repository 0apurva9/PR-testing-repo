import React from "react";
import ProductReviewListContainer from "../../../containers/ProductReviewListContainer";
import styles from "./RatingAndReviewsLongComponent.css";
import {
    setDataLayerForPdpDirectCalls,
    SET_DATA_LAYER_FOR_VIEW_ALL_REVIEW_AND_RATING_EVENT,
} from "../../../../lib/adobeUtils";
import { PRODUCT_REVIEWS_PATH_SUFFIX } from "../../../../lib/constants";

import RatingReviewHeaderComponent from "./RatingReviewHeaderComponent";
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
                        <RatingReviewHeaderComponent
                            goToReviewPage={() => this.goToReviewPage()}
                            productDetails={productDetails}
                            reviews={this.props.reviews}
                        />

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
