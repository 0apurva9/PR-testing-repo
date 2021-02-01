import React from "react";
import styles from "./RatingAndReview.css";
import Button from "../../general/components/Button";
import ProductImage from "../../general/components/ProductImage.js";
import checkIcon from "../../general/components/img/checkGreen.svg";
import { REVIEW_GUIDELINES } from "../../lib/constants";
import {
  setDataLayerForRatingAndReview,
  SET_DATA_LAYER_RATING_MODAL_STAR_CLICK,
  SET_DATA_LAYER_REVIEW_SUBMIT_CLICK,
  SET_DATA_LAYER_REVIEW_CANCEL_CLICK
} from "../../lib/adobeUtils";
import DesktopOnly from "../../general/components/DesktopOnly";
import Input from "../../general/components/ControlInput";
import TextArea from "../../general/components/ControlTextArea";
import commentArray from "../../mock/lang_profanity.json";
import FillupRatingOrder from "./FillupRatingOrder";
import PropTypes from "prop-types";

const ReviewTips = () => {
  return (
    <React.Fragment>
      <div className={styles.headerForGuidelines}>
        How to write a good customer review
      </div>
      <div className={styles.reviewBody}>
        <div className={styles.reviewContentWrapper}>
          <div className={styles.contentHeader}>Do&#39; s</div>
          <ul className={styles.contentContainer}>
            <li className={styles.reviewTipsText}>
              Describe your experience using the product.
            </li>
            <li className={styles.reviewTipsText}>
              Share details about what you like or dislike.
            </li>
          </ul>
          <div className={styles.contentHeader}>Dont&#39; s</div>
          <ul className={styles.contentContainer}>
            <li className={styles.reviewTipsText}>
              Share personal information such as email address, phone number or
              order number.
            </li>
            <li className={styles.reviewTipsText}>
              Share prices or availability details from our site or our
              competitors.
            </li>
            <li className={styles.reviewTipsText}>
              Use inappropriate language, discriminatory language, or other
              languages not suitable for a public forum.
            </li>
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};

export default class RatingAndReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: this.props.userRating ? this.props.userRating : this.props.rating,
      title: "",
      comment: "",
      showReviewGuidelines: false,
      showTitleError: false,
      showDescriptionError: false,
      showMinimumCharacterError: false,
      commentLength: 0
    };
  }

  mouseOut() {
    this.setState({ showReviewGuidelines: false });
  }

  mouseOver() {
    this.setState({ showReviewGuidelines: true });
  }

  onChangeTitle(val) {
    this.setState({ title: val });
    if (val) {
      this.setState({ showTitleError: false });
    } else {
      this.setState({ showTitleError: true });
    }
  }

  onChangeComment(val) {
    let commentLength = val.length;
    this.setState({ comment: val, commentLength: commentLength });
    if (val.length > 50 || val.length !== 0) {
      this.setState({ showMinimumCharacterError: false });
    }
    if (val) {
      this.setState({ showDescriptionError: false });
    } else {
      this.setState({ showDescriptionError: true });
    }
  }

  onRatingChange = value => {
    if (this.props.productDetails.userRating !== value) {
      setDataLayerForRatingAndReview(SET_DATA_LAYER_RATING_MODAL_STAR_CLICK, {
        rating: value,
        statusText: ""
      });
      this.setState({ rating: value });
      this.props.submitProductRatingByUser(value, this.props);
    }
  };

  onCancel = () => {
    if (this.props.closeModal) {
      setDataLayerForRatingAndReview(SET_DATA_LAYER_REVIEW_CANCEL_CLICK);
      this.props.closeModal();
    }
  };

  onSubmit = async () => {
    let { title, comment, rating } = this.state;
    let productReview = {
      comment: comment,
      rating: rating,
      headline: title
    };
    if (!productReview.headline) {
      this.setState({ showTitleError: true });
      return false;
    }
    if (!productReview.comment) {
      this.setState({ showDescriptionError: true });
      return false;
    }
    if (
      productReview.comment.length !== 0 &&
      productReview.comment.length < 50
    ) {
      this.setState({ showMinimumCharacterError: true });
      return false;
    }
    if (productReview.comment.length > 50) {
      this.setState({ showMinimumCharacterError: false });
    }
    if (productReview.comment) {
      this.setState({ showTitleError: false });
      this.setState({ showDescriptionError: false });

      var c = productReview.comment.toLowerCase().split(" ");
      let notCommentPossible = commentArray.words.find(words => {
        if (c.includes(words.toLowerCase())) {
          return true;
        }
      });
      if (notCommentPossible) {
        this.props.displayToast("Review comment contains profane words");
        return false;
      } else {
        await this.props.addProductReview(
          this.props.productDetails.productcode,
          productReview
        );
      }
    }
    setDataLayerForRatingAndReview(SET_DATA_LAYER_REVIEW_SUBMIT_CLICK);
  };

  render() {
    let { imageURL, productName } = this.props.productDetails;
    return (
      <div className={styles.base}>
        <div className={styles.reviewContainer}>
          <div className={styles.productDetailsHolder}>
            <div className={styles.productWrapper}>
              <div className={styles.productImage}>
                <ProductImage image={imageURL} />
              </div>
              <div className={styles.productData}>
                <div className={styles.productName}>{productName}</div>
                <div className={styles.ratingBar}>
                  <FillupRatingOrder
                    rating={this.state.rating}
                    onChange={val => this.onRatingChange(val)}
                    // resetRating={this.state.resetRating}
                  />
                  {this.state.rating && (
                    <span className={styles.submittedTextHolder}>
                      <span className={styles.submittedText}>Submitted</span>
                      <img
                        className={styles.checkMarkGreen}
                        src={checkIcon}
                        alt="check icon"
                      />
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.inputComponent}>
            <div className={styles.writeReviewHeadingContainer}>
              <div className={styles.writeReviewHeading}>Write a Review</div>
              <div className={styles.reviewGuidelines}>
                <span
                  onMouseOut={() => this.mouseOut()}
                  onMouseOver={() => this.mouseOver()}
                >
                  {REVIEW_GUIDELINES}
                </span>
              </div>
              {this.state.showReviewGuidelines && (
                <div className={styles.reviewTipsContainer}>
                  <ReviewTips />
                </div>
              )}
            </div>
            <div className={styles.feedbackHeader}>
              Please share your detailed product experience
            </div>
            <div className={styles.reviewWrapper}>
              <span className={styles.inputLabel}>Review Title</span>
              <div className={styles.input}>
                <Input
                  placeholder={"Headline for your review.."}
                  value={this.state.title}
                  title={this.props.title ? this.props.title : this.state.title}
                  onChange={val => this.onChangeTitle(val)}
                  textStyle={{ fontFamily: "regular", color: "#212121" }}
                />
                {this.state.showTitleError && (
                  <span className={styles.errorMessage}>
                    *Review Title is Required
                  </span>
                )}
              </div>
              <span className={styles.inputLabel}>Review Description</span>
              {this.state.commentLength <= 50 ? (
                <span className={styles.infoMessage}>
                  {this.state.commentLength}/50 Characters
                </span>
              ) : null}
              <div className={styles.inputComment}>
                <TextArea
                  comments={
                    this.props.comment ? this.props.comment : this.state.comment
                  }
                  value={this.state.comment}
                  onChange={val => this.onChangeComment(val)}
                  placeholder="Minimum 50 characters required.."
                />
                {this.state.showDescriptionError && (
                  <span className={styles.errorMessage}>
                    *Review Description is Required
                  </span>
                )}
                {this.state.showMinimumCharacterError && (
                  <span className={styles.errorMessage}>
                    *Minimum 50 Characters Required
                  </span>
                )}
              </div>
            </div>
            <DesktopOnly>
              <div className={styles.buttonHolder}>
                <div className={styles.buttonRight}>
                  <div className={styles.button}>
                    <Button
                      type="primary"
                      backgroundColor="#ff1744"
                      height={36}
                      label="SUBMIT NOW"
                      width={180}
                      textStyle={{ color: "#FFF", fontSize: 14 }}
                      onClick={() => this.onSubmit()}
                    />
                  </div>
                </div>
              </div>
            </DesktopOnly>
          </div>
        </div>
      </div>
    );
  }
}

RatingAndReview.propTypes = {
  closeModal: PropTypes.func,
  displayToast: PropTypes.func,
  userRating: PropTypes.number,
  rating:PropTypes.number,
  productDetails: PropTypes.object,
  submitProductRatingByUser: PropTypes.func,
  addProductReview: PropTypes.func,
  title: PropTypes.string,
  comment: PropTypes.string
};
