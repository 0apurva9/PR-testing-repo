import React from "react";
import queryString from "query-string";
import styles from "./FeedBackFrom.css";
import ControlTextArea from "../../general/components/ControlTextArea.js";
import FeedBackRateGrid from "./FeedBackRateGrid";
import { HOME_ROUTER } from "../../lib/constants";
import Button from "../../general/components/Button.js";
import {
  setDataLayerForCartDirectCalls,
  ADOBE_DIRECT_CALL_FOR_CONTINUE_SHOPPING
} from "../../lib/adobeUtils";
export default class FeedBackForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textDetails: "",
      selected: false,
      isReset: false
    };
    this.questionRatingArray = [];
  }

  componentDidMount() {
    let getUserDetails = queryString.parse(this.props.location.search);
    if (this.props.getFeedBackForm) {
      this.props.getFeedBackForm(getUserDetails, this.isReturnJourney());
    }
    window.scrollTo(0, 0);
  }

  isReturnJourney = () => {
    return this.props.location.pathname.includes("ReturnNPSFeedbackForm");
  };

  onclickQuestion = (rating, questionNumber, questionName) => {
    if (this.questionRatingArray.length !== 0) {
      const indexOfQuestionRatingArray = this.questionRatingArray.findIndex(
        questionRatingArrayDetails => {
          return questionRatingArrayDetails.questionCode === questionNumber;
        }
      );
      if (indexOfQuestionRatingArray !== -1) {
        this.questionRatingArray.splice(indexOfQuestionRatingArray, 1);
      }
      this.questionRatingArray.push({
        questionCode: questionNumber,
        rating: rating[0],
        questionDesc: questionName
      });
    } else {
      this.questionRatingArray.push({
        questionCode: questionNumber,
        rating: rating[0],
        questionDesc: questionName
      });
    }
  };

  onChange = val => {
    this.setState({ textDetails: val, isReset: false });
  };

  onReset = () => {
    this.questionRatingArray = [];
    this.setState({ textDetails: "", isReset: true, selected: false });
  };

  onContinueShopping() {
    setDataLayerForCartDirectCalls(ADOBE_DIRECT_CALL_FOR_CONTINUE_SHOPPING);
    this.props.history.push(HOME_ROUTER);
  }

  onSumbmit() {
    let getUserDetails = queryString.parse(this.props.location.search);
    this.props.postFeedBackForm(
      this.state.textDetails,
      this.questionRatingArray,
      getUserDetails.transactionId,
      getUserDetails.originalUid,
      this.isReturnJourney()
    );
    window.scrollTo(0, 0);
  }

  render() {
    let getData = this.props && this.props.feedBackDetails;
    let getMessage =
      this.props &&
      ((this.props.feedBackDetails && this.props.feedBackDetails.message) ||
        (this.props.feedBackSent && this.props.feedBackSent.message));
    return (
      <div className={styles.base}>
        <div className={styles.formWrapper}>
          {getMessage && (
            <div className={styles.afterSubMitReviewHolder}>
              <div className={styles.thankYouText}>Thank you!</div>
              <div className={styles.subText}>{getMessage}</div>
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
          {getData && !getMessage && (
            <div className={styles.RatingHolderForCustomer}>
              <div className={styles.header}>Feedback Form</div>
              <div className={styles.feedBackCardHolder}>
                {getData &&
                  getData.items.map((val, i) => {
                    return (
                      <div className={styles.feedBackDetailsHolder} key={i}>
                        <div className={styles.feedBackText}>
                          <div className={styles.countOfText}>{i + 1}</div>
                          <span> {val.questionName}</span>
                        </div>
                        <div className={styles.feedBackRatingAndTextHolder}>
                          <div className={styles.textOfRating}> Very Bad</div>
                          <div className={styles.ratingHolder}>
                            <FeedBackRateGrid
                              selected={this.state.selected}
                              onSelect={rating =>
                                this.onclickQuestion(
                                  rating,
                                  val.questionCode,
                                  val.questionName
                                )
                              }
                              isReset={this.state.isReset}
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
                      placeholder="Enter SomeThing (optional)"
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
