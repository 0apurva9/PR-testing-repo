import React from "react";
import styles from "./writeReview.css";
import PropTypes from "prop-types";
import Input from "../../general/components/ControlInput";
import TextArea from "../../general/components/ControlTextArea";
import FillupRating from "./FillupRating";
import Button from "../../general/components/Button";
import {
  CUSTOMER_ACCESS_TOKEN,
  LOGIN_PATH,
  WRITE_REVIEWS_WITH_SLUG,
  WRITE_REVIEWS,
  REVIEW_GUIDELINES
} from "../../lib/constants";
import { withRouter } from "react-router-dom";
import * as Cookie from "../../lib/Cookie";
import {
  setDataLayerForPdpDirectCalls,
  ADOBE_DIRECT_CALL_FOR_REVIEW_RATE_THE_PRODUCT,
  ADOBE_REVIEW_SUBMIT_BUTTON,
  setDataLayer,
  ADOBE_REVIEW_STAR_RATING,
  setDataLayerForRatingAndReview,
  SET_DATA_LAYER_RATING_STAR_CLICK,
  SET_DATA_LAYER_REVIEW_SUBMIT_CLICK,
  SET_DATA_LAYER_REVIEW_CANCEL_CLICK,
  SET_DATA_LAYER_REVIEW_GUIDELINE
} from "../../lib/adobeUtils";
import DesktopOnly from "../../general/components/DesktopOnly";
import MobileOnly from "../../general/components/MobileOnly";
let buttonColor = "#212121";
class WriteReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      comment: "",
      rating: null,
      resetRating: false
    };
  }

  onChangeTitle(val) {
    this.setState({ title: val });
    if (this.props.onChangeTitle) {
      this.props.onChangeTitle(val);
    }
  }

  onChangeComment(val) {
    this.setState({ comment: val });

    if (this.props.onChangeComment) {
      this.props.onChangeComment(val);
    }
  }

  onRatingChange = val => {
    setDataLayerForPdpDirectCalls(
      ADOBE_DIRECT_CALL_FOR_REVIEW_RATE_THE_PRODUCT
    );
    setDataLayer(ADOBE_REVIEW_STAR_RATING);
    setDataLayerForRatingAndReview(SET_DATA_LAYER_RATING_STAR_CLICK, {
      rating: val,
      statusText: ""
    });
    this.setState({ rating: val });
  };

  onCancel() {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
    setDataLayerForRatingAndReview(SET_DATA_LAYER_REVIEW_CANCEL_CLICK);
  }

  showReviewGuidelineModal = () => {
    if (this.props.showReviewGuidelineModal) {
      this.props.showReviewGuidelineModal();
    }
    setDataLayerForRatingAndReview(SET_DATA_LAYER_REVIEW_GUIDELINE);
  };

  onSubmit = async () => {
    setDataLayer(ADOBE_REVIEW_SUBMIT_BUTTON);
    if (
      /\s*[0-9a-zA-Z]+/.test(this.state.comment) &&
      /\s*[0-9a-zA-Z]+/.test(this.state.title)
    ) {
      const customerCookie = Cookie.getCookie(CUSTOMER_ACCESS_TOKEN);
      if (customerCookie) {
        let getResponseOfAddReview = await this.props.onSubmit({
          comment: this.state.comment,
          rating: this.state.rating,
          headline: this.state.title
        });
        if (getResponseOfAddReview) {
          if (
            this.props.match.path === WRITE_REVIEWS_WITH_SLUG ||
            this.props.match.path === WRITE_REVIEWS
          ) {
            this.setState({
              resetRating: true,
              title: "",
              comment: ""
            });
            if (this.state.resetRating === true) {
              this.setState({ resetRating: false });
            }
          }
          // let url = this.props.location.pathname;
          // url = url.replace("/write-review", "");
          // this.props.history.push(url);
        }
      } else {
        const url = this.props.location.pathname;
        this.props.setUrlToRedirectToAfterAuth(url);
        this.props.history.push(LOGIN_PATH);
      }
    } else {
      await this.props.onSubmit({
        comment: this.state.comment,
        rating: this.state.rating,
        headline: this.state.title
      });
    }
    setDataLayerForRatingAndReview(SET_DATA_LAYER_REVIEW_SUBMIT_CLICK);
  };

  render() {
    return (
      <div className={styles.base}>
        <div className={styles.ratingContainer}>
          <div className={styles.ratingHeader}>Rate this product</div>
          <div className={styles.ratingBar}>
            <FillupRating
              rating={this.state.rating}
              onChange={this.onRatingChange}
              resetRating={this.state.resetRating}
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
        <div className={styles.buttonContainer}>
          <MobileOnly>
            {this.props.match.path !== WRITE_REVIEWS_WITH_SLUG &&
              this.props.match.path !== WRITE_REVIEWS && (
                <div
                  className={styles.cancelButton}
                  onClick={() => this.onCancel()}
                >
                  Cancel
                </div>
              )}
          </MobileOnly>
          <div
            className={
              this.props.match.path === WRITE_REVIEWS_WITH_SLUG ||
              this.props.match.path === WRITE_REVIEWS
                ? styles.centerSubmitButton
                : styles.submitButtonHolder
            }
          >
            <DesktopOnly>
              {this.props.match.path !== WRITE_REVIEWS_WITH_SLUG &&
                this.props.match.path !== WRITE_REVIEWS && (
                  <div
                    className={styles.cancelButton}
                    onClick={() => this.onCancel()}
                  >
                    Cancel
                  </div>
                )}
            </DesktopOnly>
            <div className={styles.submitButton}>
              <Button
                className={styles.ratingBar}
                label={"Submit"}
                type="secondary"
                color={buttonColor}
                width={120}
                onClick={this.onSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(WriteReview);
WriteReview.propTypes = {
  onChangeTitle: PropTypes.func,
  title: PropTypes.string,
  comment: PropTypes.string,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  location: PropTypes.object,
  history: PropTypes.object,
  match: PropTypes.object,
  onChangeComment: PropTypes.func,
  showReviewGuidelineModal: PropTypes.func,
  setUrlToRedirectToAfterAuth: PropTypes.func,
};
