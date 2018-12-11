import React from "react";
import PropTypes from "prop-types";
import queryString from "query-string";
import styles from "./FeedBackFrom.css";
import ControlTextArea from "../../general/components/ControlTextArea.js";
import FeedBackRateGrid from "./FeedBackRateGrid";
import { FEEDBACK, HOME_ROUTER } from "../../lib/constants";
import Button from "../../general/components/Button.js";
export default class FeedBackForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textDetails: ""
    };
    this.questionRatingArray = [];
  }
  componentDidMount() {
    let getUserDetails = queryString.parse(this.props.location.search);
    if (this.props.getFeedBackForm) {
      this.props.getFeedBackForm(getUserDetails);
    }
  }
  onclickQuestion = (rating, questionNumber) => {
    if (this.questionRatingArray.length !== 0) {
      const indexOfQuestionRatingArray = this.questionRatingArray.findIndex(
        questionRatingArrayDetails => {
          return (
            questionRatingArrayDetails.questionRatingArray === questionNumber
          );
        }
      );
      if (indexOfQuestionRatingArray !== -1) {
        this.questionRatingArray.splice(indexOfQuestionRatingArray, 1);
      }
      this.questionRatingArray.push({
        questionCode: questionNumber,
        rating: rating[0]
      });
    } else {
      this.questionRatingArray.push({
        questionCode: questionNumber,
        rating: rating[0]
      });
    }
  };
  onChange = val => {
    this.setState({ textDetails: val });
  };
  onReset = () => {
    this.questionRatingArray = [];
    this.setState({ textDetails: "" });
  };
  onContinueShopping() {
    this.props.history.push(HOME_ROUTER);
  }
  onSumbmit() {
    let getUserDetails = queryString.parse(this.props.location.search);
    this.props.postFeedBackForm(
      this.state.textDetails,
      this.questionRatingArray,
      getUserDetails.transactionId
    );
  }
  render() {
    let getData = this.props && this.props.feedBackDetails;
    let getMessage =
      this.props &&
      this.props.feedBackDetails &&
      this.props.feedBackDetails.message;
    return (
      <div className={styles.base}>
        <div className={styles.formWrapper}>
          {getMessage && (
            <div className={styles.afterSubMitReviewHolder}>
              <div className={styles.thankYouText}>Thank you!</div>
              <div className={styles.subText}>
                It appears that you have already provided feedback for the
                survey.
              </div>
              <div className={styles.buttonHolder}>
                <div className={styles.button}>
                  <Button
                    backgroundColor="#fff"
                    height={46}
                    borderRadius={23}
                    label="Continue Shopping"
                    width={246}
                    textStyle={{
                      color: "#ff1744",
                      fontSize: 14,
                      fontFamily: "semibold"
                    }}
                    onClick={() => this.onContinueShopping()}
                  />
                </div>
              </div>
            </div>
          )}
          {getData &&
            !getMessage && (
              <div className={styles.RatingHolderForCustomer}>
                <div className={styles.header}>Feedback Form</div>
                <div className={styles.feedBackCardHolder}>
                  {getData &&
                    getData.items.map((val, i) => {
                      return (
                        <div className={styles.feedBackDetailsHolder}>
                          <div className={styles.feedBackText}>
                            <div className={styles.countOfText}>
                              {val.questionCode}
                            </div>
                            <span> {val.questionName}</span>
                          </div>
                          <div className={styles.feedBackRatingAndTextHolder}>
                            <div className={styles.textOfRating}> Very Bad</div>
                            <div className={styles.ratingHolder}>
                              <FeedBackRateGrid
                                onSelect={rating =>
                                  this.onclickQuestion(rating, val.questionCode)
                                }
                              />
                            </div>
                            <div className={styles.endTextOfRating}>
                              {" "}
                              Very Good
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  <div className={styles.enterFeedBackHolder}>
                    <div className={styles.enterFeedBackTextHeader}>
                      Additional feedback
                    </div>
                    <div>
                      <ControlTextArea
                        value={this.state.textDetails}
                        height={175}
                        onChange={val => this.onChange(val)}
                      />
                    </div>
                    <div className={styles.resetAndSubmitButtonHolder}>
                      <div className={styles.submitAndResetButton}>
                        <Button
                          backgroundColor="#fff"
                          height={46}
                          borderRadius={23}
                          label="Reset"
                          borderColor="#ff1744"
                          width={246}
                          textStyle={{
                            color: "#ff1744",
                            fontSize: 14,
                            fontFamily: "semibold"
                          }}
                          onClick={() => this.onReset()}
                        />
                      </div>
                      <div className={styles.submitAndResetButton}>
                        <Button
                          type="primary"
                          height={46}
                          label="Submit"
                          width={246}
                          textStyle={{
                            fontSize: 14,
                            fontFamily: "semibold"
                          }}
                          onClick={() => this.onSumbmit()}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>
    );
  }
}
