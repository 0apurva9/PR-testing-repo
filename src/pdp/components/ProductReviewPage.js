import React, { Component } from "react";
import ReviewList from "./ReviewList";
import styles from "./ProductReviewPage.css";
import ProductDetailsCard from "./ProductDetailsCard";
import WriteReview from "./WriteReview";
import PropTypes from "prop-types";
import RatingHolder from "./RatingHolder";
import PdpFrame from "./PdpFrame";
import throttle from "lodash/throttle";
import SelectBoxMobile2 from "../../general/components/SelectBoxMobile2.js";
import {
  PRODUCT_REVIEWS_PATH_SUFFIX,
  SUCCESS,
  LOGIN_PATH,
  WRITE_REVIEWS_WITH_SLUG,
  PRODUCT_CART_ROUTER,
  BUY_NOW_PRODUCT_DETAIL,
  BUY_NOW_ERROR_MESSAGE
} from "../../lib/constants";
import {
  renderMetaTags,
  renderMetaTagsWithoutSeoObject
} from "../../lib/seoUtils";
import * as Cookie from "../../lib/Cookie";
import {
  CUSTOMER_ACCESS_TOKEN,
  LOGGED_IN_USER_DETAILS
} from "../../lib/constants";
import commentArray from "../../mock/lang_profanity.json";
import { checkUserLoggedIn } from "../../lib/userUtils";
const WRITE_REVIEW_TEXT = "Write Review";
const PRODUCT_QUANTITY = "1";
class ProductReviewPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      sort: "byDate",
      orderBy: "desc",
      sortValue: "byDate_desc",
      sortLabel: "Newest First"
    };
    this.filterOptions = [
      { label: "Oldest First", value: "byDate_asc" },
      { label: "Newest First", value: "byDate_desc" },
      { label: "Negative First", value: "byRating_asc" },
      { label: "Positive First", value: "byRating_desc" }
    ];
  }

  handleScroll = () => {
    return throttle(() => {
      if (
        this.props.reviews &&
        this.props.reviews.pageNumber + 1 < this.props.reviews.totalNoOfPages
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
          this.props.getProductReviews(
            this.props.match.params[0],
            this.props.reviews.pageNumber + 1,
            this.state.orderBy,
            this.state.sort
          );
        }
      }
    }, 2000);
  };
  navigateToLogin() {
    const url = this.props.location.pathname;
    this.props.setUrlToRedirectToAfterAuth(url);
    this.props.history.push(LOGIN_PATH);
  }
  componentDidMount() {
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    this.throttledScroll = this.handleScroll();
    window.addEventListener("scroll", this.throttledScroll);
    this.props.getProductDescription(this.props.match.params[0]);
    this.props.getProductReviews(
      this.props.match.params[0],
      0,
      this.state.orderBy,
      this.state.sort
    );
    if (this.props.match.path === WRITE_REVIEWS_WITH_SLUG) {
      if (!userDetails || !customerCookie) {
        const url = this.props.location.pathname;
        this.props.setUrlToRedirectToAfterAuth(url);
        this.props.history.push(LOGIN_PATH);
      } else {
        this.setState({ visible: true });
      }
    }
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.throttledScroll);
  }

  reviewSection = () => {
    const userDetails = Cookie.getCookie(LOGGED_IN_USER_DETAILS);
    const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
    if (!userDetails || !customerCookie) {
      const url = this.props.location.pathname;
      this.props.setUrlToRedirectToAfterAuth(url);
      this.props.history.push(LOGIN_PATH);
    } else {
      this.setState(prevState => ({ visible: !prevState.visible }));
    }
  };

  onSubmit = productReview => {
    if (!productReview.rating) {
      this.props.displayToast("Please give rating");
      return false;
    }
    if (!productReview.headline) {
      this.props.displayToast("Please enter title");
      return false;
    }
    if (!productReview.comment) {
      this.props.displayToast("Please enter comment");
      return false;
    }
    if (productReview.comment) {
      let notCommentPossible = commentArray.words.find(words => {
        if (productReview.comment.toLowerCase().includes(words.toLowerCase())) {
          return true;
        }
      });
      if (notCommentPossible) {
        this.props.displayToast("Review comment contains profane words");
        return false;
      } else {
        if (this.props.match.path !== WRITE_REVIEWS_WITH_SLUG) {
          this.setState({ visible: false });
        }
        return this.props.addProductReview(
          this.props.productDetails.productListingId,
          productReview
        );
      }
    }
  };
  onCancel() {
    this.setState({ visible: false });
  }
  goToCart = () => {
    this.props.history.push({
      pathname: PRODUCT_CART_ROUTER
    });
  };
  renderReviewSection = () => {
    if (this.state.visible) {
      return (
        <WriteReview
          addReviewStatus={this.props.addReviewStatus}
          onSubmit={val => this.onSubmit(val)}
          onCancel={() => this.onCancel()}
        />
      );
    }
  };

  addProductToBag = async buyNowFlag => {
    let productDetails = {};
    productDetails.code = this.props.productDetails.productListingId;
    productDetails.quantity = PRODUCT_QUANTITY;
    productDetails.ussId = this.props.productDetails.winningUssID;
    if (buyNowFlag) {
      if (!checkUserLoggedIn()) {
        localStorage.setItem(
          BUY_NOW_PRODUCT_DETAIL,
          JSON.stringify(productDetails)
        );
        this.navigateToLogin();
      } else {
        const buyNowResponse = await this.props.buyNow(productDetails);
        if (buyNowResponse && buyNowResponse.status === SUCCESS) {
          this.props.history.push(PRODUCT_CART_ROUTER);
        } else {
          this.props.displayToast(BUY_NOW_ERROR_MESSAGE);
        }
      }
    } else {
      return this.props.addProductToCart(productDetails);
    }
  };

  goBack = () => {
    const url = this.props.location.pathname.replace(
      PRODUCT_REVIEWS_PATH_SUFFIX,
      ""
    );
    this.props.history.replace(url);
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.match.path !== WRITE_REVIEWS_WITH_SLUG) {
      if (nextProps.addReviewStatus === SUCCESS) {
        this.setState({ visible: false });
      }
    }
  }

  changeFilterValues = val => {
    let filterValues = val.value.split("_");
    this.setState({
      sort: filterValues[0],
      orderBy: filterValues[1],
      sortValue: val.value,
      sortLabel: val.label
    });

    this.props.getProductReviews(
      this.props.match.params[0],
      0,
      filterValues[1],
      filterValues[0]
    );
  };

  renderMetaTags = () => {
    const productDetails = this.props.productDetails;
    return productDetails.seo
      ? renderMetaTags(productDetails, true)
      : renderMetaTagsWithoutSeoObject(productDetails);
  };

  render() {
    if (this.props.loadingForAddProduct || this.props.loading) {
      this.props.showSecondaryLoader();
    } else {
      this.props.hideSecondaryLoader();
    }

    if (this.props.productDetails) {
      const mobileGalleryImages =
        this.props.productDetails &&
        this.props.productDetails.galleryImagesList
          .map(galleryImageList => {
            return galleryImageList.galleryImages.filter(galleryImages => {
              return galleryImages.key === "product";
            });
          })
          .map(image => {
            return image[0].value;
          });
      let seoDoublePrice = 0;
      if (
        this.props.productDetails.winningSellerPrice &&
        this.props.productDetails.winningSellerPrice.doubleValue
      ) {
        seoDoublePrice = this.props.productDetails.winningSellerPrice
          .doubleValue;
      } else if (
        this.props.productDetails.mrpPrice &&
        this.props.productDetails.mrpPrice.doubleValue
      ) {
        seoDoublePrice = this.props.productDetails.mrpPrice.doubleValue;
      }

      return (
        <PdpFrame
          {...this.props.productDetails}
          addProductToBag={buyNowFlag => this.addProductToBag(buyNowFlag)}
          gotoPreviousPage={() => this.goBack()}
          displayToast={message => this.props.displayToast(message)}
          goToCart={() => this.goToCart()}
        >
          {this.renderMetaTags()}
          <div
            className={styles.base}
            itemScope
            itemType="http://schema.org/Product"
          >
            {this.props.productDetails.seo
              ? renderMetaTags(this.props.productDetails)
              : renderMetaTagsWithoutSeoObject(this.props.productDetails)}
            <div className={styles.productBackground}>
              <ProductDetailsCard
                productImage={mobileGalleryImages[0]}
                brandName={this.props.productDetails.brandName}
                productName={this.props.productDetails.productName}
                price={
                  this.props.productDetails &&
                  this.props.productDetails.winningSellerPrice &&
                  this.props.productDetails.winningSellerPrice
                    .formattedValueNoDecimal
                }
                seoDoublePrice={seoDoublePrice}
                discountPrice={
                  this.props.productDetails &&
                  this.props.productDetails.mrpPrice &&
                  this.props.productDetails.mrpPrice.formattedValueNoDecimal
                }
                averageRating={this.props.productDetails.averageRating}
                numberOfReviews={this.props.productDetails.numberOfReviews}
              />
              <RatingHolder ratingData={this.props.ratingData} />
            </div>
            <div className={styles.dropDownHolder}>
              <div className={styles.dropdown}>
                <div className={styles.dropDownBox}>
                  <SelectBoxMobile2
                    value={this.state.sortValue}
                    label={this.state.sortLabel}
                    onChange={changedValue =>
                      this.changeFilterValues(changedValue)
                    }
                    options={this.filterOptions}
                    textStyle={{ fontSize: 14 }}
                  />
                </div>
                {this.props.match.path !== WRITE_REVIEWS_WITH_SLUG && (
                  <div
                    className={styles.reviewText}
                    onClick={this.reviewSection}
                  >
                    {WRITE_REVIEW_TEXT}
                  </div>
                )}
                {this.state.visible && (
                  <div className={styles.reviewHolder}>
                    {this.renderReviewSection()}
                  </div>
                )}
              </div>
              <div className={styles.reviews}>
                {this.props.reviews && (
                  <ReviewList
                    reviewList={this.props.reviews.reviews}
                    totalNoOfReviews={this.props.reviews.totalNoOfPages}
                  />
                )}
              </div>
            </div>
          </div>
        </PdpFrame>
      );
    } else {
      return <div />;
    }
  }
}

ProductReviewPage.propTypes = {
  label: PropTypes.string,
  ratingData: PropTypes.array,
  reviewList: PropTypes.array
};

export default ProductReviewPage;
