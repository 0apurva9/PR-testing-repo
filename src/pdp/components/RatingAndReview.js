import React from "react";
import styles from "./RatingAndReview.css";
import Button from "../../general/components/Button";
import Icon from "../../xelpmoc-core/Icon";
import crossIcon from "../../general/components/img/cancelBlack.svg";
import ProductImage from "../../general/components/ProductImage.js";
import {
  MY_ACCOUNT_PAGE,
  MY_ACCOUNT_GIFT_CARD_PAGE,
  REVIEW_GUIDELINES
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
      title: "",
      comment: "",
      rating: "",
      showReviewGuidelines: false
    };
  }

  onClickImage() {
    if (!this.props.isEgvOrder && this.props.productCode) {
      this.props.history.push(`/p-${this.props.productCode.toLowerCase()}`);
    } else if (this.props.isEgvOrder) {
      this.props.history.push(`${MY_ACCOUNT_PAGE}${MY_ACCOUNT_GIFT_CARD_PAGE}`);
    }
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

  onCancel = () => {
    if (this.props.closeModal) {
      this.props.closeModal();
    }
    setDataLayerForRatingAndReview(SET_DATA_LAYER_REVIEW_CANCEL_CLICK);
  };
  onSubmit = () => {
    setDataLayerForRatingAndReview(SET_DATA_LAYER_REVIEW_SUBMIT_CLICK);
    console.log("submit");
  };

  render() {
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
                <ProductImage
                  image={this.props.imageURL}
                  onClickImage={() => this.onClick()}
                />
              </div>
              <div className={styles.productData}>
                <div className={styles.productName}>
                  {this.props.productName}
                </div>
                {this.props.deliveryDate && (
                  <div className={styles.deliveryDate}>
                    Delivered on {this.props.deliveryDate}
                  </div>
                )}
                <div className={styles.ratingBar}>
                  <FillupRatingOrder
                    rating={5}
                    onChange={this.onRatingChange}
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
                      onClick={this.onSubmit}
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
