import React from "react";
import styles from "./RatingAndReview.css";
import Button from "../../general/components/Button";
import Icon from "../../xelpmoc-core/Icon";
import crossIcon from "../../general/components/img/cancelBlack.svg";
import ProductImage from "../../general/components/ProductImage.js";
import {
  MY_ACCOUNT_PAGE,
  MY_ACCOUNT_GIFT_CARD_PAGE,
  REVIEW_GUIDELINES,
  SUCCESS
} from "../../lib/constants";
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
          <div className={styles.contentHeader}>Do's</div>
          <ul className={styles.contentContainer}>
            <li className={styles.reviewTipsText}>
              Describe your experience using the product.
            </li>
            <li className={styles.reviewTipsText}>
              Share details about what you like or dislike.
            </li>
          </ul>
          <div className={styles.contentHeader}>Dont's</div>
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
      rating: this.props.productDetails.userRating,
      title: "",
      comment: "",
      showReviewGuidelines: false
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
  }

  onChangeComment(val) {
    this.setState({ comment: val });
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
      this.props.displayToast("Please enter title");
      return false;
    }
    if (!productReview.comment) {
      this.props.displayToast("Please enter comment");
      return false;
    }
    if (productReview.comment.length < 50) {
      this.props.displayToast("Please enter minimum 50 acharacters");
      return false;
    }
    if (productReview.comment) {
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
    if (this.props.addReviewStatus === SUCCESS) {
      this.props.hideModal();
      if (this.props.clearOrderDetails && this.props.getAllOrdersDetails) {
        this.props.clearOrderDetails();
        this.props.getAllOrdersDetails();
      }
    }
  };

  render() {
    let { title, comment } = this.state;
    let isSubmitBtnDisabled = title && comment ? false : true;
    let { imageURL, productName, deliveryDate } = this.props.productDetails;
    return (
      <div className={styles.base}>
        <div className={styles.header}>
          <div className={styles.headerText}>Ratings and Review</div>
          <div className={styles.close} onClick={this.onCancel}>
            <Icon image={crossIcon} size={12} />
          </div>
        </div>
        <div className={styles.reviewContainer}>
          <div className={styles.productDetailsHolder}>
            <div className={styles.productWrapper}>
              <div className={styles.productImage}>
                <ProductImage image={imageURL} />
              </div>
              <div className={styles.productData}>
                <div className={styles.productName}>{productName}</div>
                {deliveryDate && (
                  <div className={styles.deliveryDate}>
                    Delivered on {deliveryDate}
                  </div>
                )}
                <div className={styles.ratingBar}>
                  <FillupRatingOrder
                    rating={this.state.rating}
                    onChange={val => this.onRatingChange(val)}
                    // resetRating={this.state.resetRating}
                  />
                </div>
              </div>
            </div>
            <div
              className={styles.reviewGuidelines}
              onMouseOut={() => this.mouseOut()}
              onMouseOver={() => this.mouseOver()}
            >
              {REVIEW_GUIDELINES}
            </div>
            {this.state.showReviewGuidelines && (
              <div className={styles.reviewTipsContainer}>
                <ReviewTips />
              </div>
            )}
          </div>
          <div className={styles.inputComponent}>
            <div className={styles.feedbackHeader}>
              Please share your valuable feedback regarding this product
            </div>
            <div className={styles.reviewWrapper}>
              <span>Review Title</span>
              <div className={styles.input}>
                <Input
                  placeholder={"Enter your remarks..."}
                  value={this.state.title}
                  title={this.props.title ? this.props.title : this.state.title}
                  onChange={val => this.onChangeTitle(val)}
                />
              </div>
              <span>Review</span>
              <div className={styles.inputComment}>
                <TextArea
                  comments={
                    this.props.comment ? this.props.comment : this.state.comment
                  }
                  value={this.state.comment}
                  onChange={val => this.onChangeComment(val)}
                  placeholder="More detailed reviews get more visibility..."
                />
              </div>
            </div>
            <DesktopOnly>
              <div className={styles.buttonHolder}>
                <div className={styles.buttonleft}>
                  <div className={styles.button}>
                    <Button
                      type="hollow"
                      height={36}
                      label="CANCEL"
                      width={180}
                      textStyle={{ color: "#212121", fontSize: 14 }}
                      onClick={this.onCancel}
                    />
                  </div>
                </div>
                <div className={styles.buttonRight}>
                  <div className={styles.button}>
                    <Button
                      type="primary"
                      backgroundColor="#ff1744"
                      height={36}
                      label="SUBMIT NOW"
                      width={180}
                      textStyle={{ color: "#FFF", fontSize: 14 }}
                      onClick={
                        !isSubmitBtnDisabled ? () => this.onSubmit() : null
                      }
                      disabled={isSubmitBtnDisabled}
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
  closeModal: PropTypes.func
};
