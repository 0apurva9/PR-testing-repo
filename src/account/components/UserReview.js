import React from "react";
import * as styles from "./UserReview.css";
import * as Cookie from "../../lib/Cookie";
import throttle from "lodash/throttle";
import ProductDetailsCard from "../../pdp/components/ProductDetailsCard";
import {
  LOGGED_IN_USER_DETAILS,
  CUSTOMER_ACCESS_TOKEN
} from "../../lib/constants";
import Loader from "../../general/components/Loader";
export default class UserReview extends React.Component {
  componentDidMount() {
    if (this.props.getUserReview) {
      const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
      const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
      this.throttledScroll = this.handleScroll();
      window.addEventListener("scroll", this.throttledScroll);
      if (userDetails && customerCookie) {
        this.props.getUserReview(0);
      }
    }
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.throttledScroll);
  }
  handleScroll = () => {
    return throttle(() => {
      if (
        this.props.userReview &&
        this.props.userReview.pageNumber + 1 <
          this.props.userReview.totalNoOfPages
      ) {
        const windowHeight =
          "innerHeight" in window
            ? window.innerHeight
            : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(
          body.scrollHeight,
          body.offsetHeight,
          html.clientHeight,
          html.scrollHeight,
          html.offsetHeight
        );
        const windowBottom = windowHeight + window.pageYOffset;
        if (windowBottom >= docHeight) {
          window.scrollBy(0, -200);
          this.props.getProductReviews(this.props.reviews.pageNumber + 1);
        }
      }
    }, 2000);
  };
  renderLoader() {
    return <Loader />;
  }
  render() {
    if (this.props.loadingForUserReview) {
      return this.renderLoader();
    }
    return (
      <div className={styles.base}>
        {this.props &&
        this.props.userReview &&
        this.props.userReview.reviews ? (
          <React.Fragment>
            <div className={styles.totalReview}>
              You have made{" "}
              <span className={styles.totalReviewLength}>
                {this.props.userReview.reviews.length} reviews
              </span>
            </div>
            {this.props.userReview.reviews.map((reviews, i) => {
              return (
                <div className={styles.reviewsHolder} key={i}>
                  <div className={styles.productDetails}>
                    <ProductDetailsCard
                      productImage={reviews.productImageUrl}
                      brandName={reviews.brandName}
                      productTitle={reviews.productTitle}
                      averageRating={reviews.rating}
                      showAverageRatingWithDays={true}
                      daysAgo={reviews.reviewAge}
                    />
                  </div>
                  <div className={styles.commentAndHeadlineHolder}>
                    <div className={styles.headline}>{reviews.headline} </div>
                    <div className={styles.comment}>{reviews.comment} </div>
                  </div>
                </div>
              );
            })}
          </React.Fragment>
        ) : (
          <div className={styles.noAlerts}>{"No Reviews"}</div>
        )}
      </div>
    );
  }
}
