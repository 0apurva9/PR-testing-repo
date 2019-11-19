import React from "react";
import styles from "./RatingAndReview.css";
import Button from "../../general/components/Button";
import Icon from "../../xelpmoc-core/Icon";
import crossIcon from "../../general/components/img/cancelBlack.svg";
import ProductImage from "../../general/components/ProductImage.js";
import {
  MY_ACCOUNT_PAGE,
  MY_ACCOUNT_GIFT_CARD_PAGE,
  RUPEE_SYMBOL,
  REVIEW_GUIDELINES
} from "../../lib/constants";
import DesktopOnly from "../../general/components/DesktopOnly";
import Input from "../../general/components/ControlInput";
import TextArea from "../../general/components/ControlTextArea";
import FillupRatingOrder from "./FillupRatingOrder";
export default class RatingAndReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      comment: "",
      rating: "",
      resetRating: false
    };
  }
  handleClick() {
    this.props.closeModal();
  }
  onClickImage() {
    if (!this.props.isEgvOrder && this.props.productCode) {
      this.props.history.push(`/p-${this.props.productCode.toLowerCase()}`);
    } else if (this.props.isEgvOrder) {
      this.props.history.push(`${MY_ACCOUNT_PAGE}${MY_ACCOUNT_GIFT_CARD_PAGE}`);
    }
  }
  render() {
    console.log("=====>", this.props);
    return (
      <div className={styles.base}>
        <div className={styles.header}>
          <div className={styles.headerText}>Ratings and Review</div>
          <div className={styles.close} onClick={() => this.handleClick()}>
            <Icon image={crossIcon} size={12} />
          </div>
        </div>
        <div className={styles.productImageHolder}>
          <div className={styles.productImage}>
            <ProductImage
              image={this.props.imageURL}
              onClickImage={() => this.onClick()}
            />
          </div>

          <div className={styles.productName}>{this.props.productName}</div>

          {this.props.productTitle && (
            <div className={styles.productTitle}>{this.props.productTitle}</div>
          )}
          {this.props.size &&
            this.props.size !== "NO SIZE" && (
              <div className={styles.sizeHolder}>
                <span className={styles.size}>size</span> {this.props.size}
              </div>
            )}
          {/* </div> */}
          <div className={styles.base}>
            <div className={styles.reviewHolder}>
              <div className={styles.reviewHeading}>Rate this product</div>
              <div className={styles.ratingBar}>
                <FillupRatingOrder
                  rating={5}
                  onChange={this.onRatingChange}
                  // resetRating={this.state.resetRating}
                />
              </div>
              <div className={styles.reviewGuidelinesBar}>
                <div
                  className={styles.reviewGuidelines}
                  onClick={() => {
                    this.showReviewGuidelineModal();
                  }}
                >
                  {REVIEW_GUIDELINES}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.input}>
            <Input
              placeholder={"Title"}
              value={this.state.title}
              title={this.props.title ? this.props.title : this.state.title}
              onChange={val => this.onChangeTitle(val)}
            />
          </div>
          <TextArea
            comments={
              this.props.comment ? this.props.comment : this.state.comment
            }
            value={this.state.comment}
            onChange={val => this.onChangeComment(val)}
            placeholder="Tell us what you think of this product (Minimum 50 characters)"
          />
          <DesktopOnly>
            <div className={styles.buttonHolder}>
              <div className={styles.buttonleft}>
                <div className={styles.button}>
                  <Button
                    type="hollow"
                    height={36}
                    label="Cancel"
                    width={160}
                    textStyle={{ color: "#212121", fontSize: 14 }}
                    onClick={() => this.onCancel()}
                  />
                </div>
              </div>
              <div className={styles.buttonRight}>
                <div className={styles.button}>
                  <Button
                    type="primary"
                    backgroundColor="#ff1744"
                    height={36}
                    label="Generate OTP"
                    width={160}
                    textStyle={{ color: "#FFF", fontSize: 14 }}
                    onClick={() => this.generateOtp()}
                  />
                </div>
              </div>
            </div>
          </DesktopOnly>
        </div>
      </div>
    );
  }
}
