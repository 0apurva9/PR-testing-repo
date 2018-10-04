import React from "react";
import styles from "./writeReview.css";
import PropTypes from "prop-types";
import Input from "../../general/components/Input2";
import TextArea from "../../general/components/TextArea";
import FillupRating from "./FillupRating";
import Button from "../../general/components/Button";
import {
  CUSTOMER_ACCESS_TOKEN,
  LOGIN_PATH,
  WRITE_REVIEWS_WITH_SLUG,
  WRITE_REVIEWS,
  SUCCESS,
  ERROR
} from "../../lib/constants";
import { withRouter } from "react-router-dom";
import * as Cookie from "../../lib/Cookie";

let buttonColor = "#212121";
class WriteReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      comment: "",
      rating: 5,
      resetRating: false
    };
  }
  onChangeTitle(val) {
    if (this.props.onChangeTitle) {
      this.props.onChangeTitle(val);
    }
    this.setState({ title: val });
  }

  onChangeComment(val) {
    if (this.props.onChangeComment) {
      this.props.onChangeComment(val);
    }
    this.setState({ comment: val });
  }

  onRatingChange = val => {
    this.setState({ rating: val });
  };
  onCancel() {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  }
  onSubmit = async () => {
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
      }
    } else {
      const url = this.props.location.pathname;
      this.props.setUrlToRedirectToAfterAuth(url);
      this.props.history.push(LOGIN_PATH);
    }
  };
  render() {
    return (
      <div className={styles.base}>
        <div className={styles.ratingContainer}>
          <div className={styles.ratingHeader}>Rate this product</div>
          <div className={styles.ratingBar}>
            <FillupRating
              rating={5}
              onChange={this.onRatingChange}
              resetRating={this.state.resetRating}
            />
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
          placeholder="Tell us what you think of this product"
        />
        <div className={styles.buttonContainer}>
          {this.props.match.path !== WRITE_REVIEWS_WITH_SLUG &&
            this.props.match.path !== WRITE_REVIEWS && (
              <div
                className={styles.cancelButton}
                onClick={() => this.onCancel()}
              >
                Cancel
              </div>
            )}
          <div
            className={
              this.props.match.path === WRITE_REVIEWS_WITH_SLUG ||
              this.props.match.path === WRITE_REVIEWS
                ? styles.centerSubmitButton
                : styles.submitButtonHolder
            }
          >
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
  onCancel: PropTypes.func
};
