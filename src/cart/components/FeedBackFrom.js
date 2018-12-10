import React from "react";
import PropTypes from "prop-types";
import queryString from "query-string";
import styles from "./FeedBackFrom.css";
import TextArea from "../../general/components/TextArea.js";
import FeedBackRateGrid from "./FeedBackRateGrid";
import { FEEDBACK } from "../../lib/constants";
export default class FeedBackForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionRatingArray: [],
      toatalArray: null
    };
  }
  componentDidMount() {
    let getUserDetails = queryString.parse(this.props.location.search);
    console.log(getUserDetails);
    if (this.props.getFeedBackForm) {
      this.props.getFeedBackForm(getUserDetails);
    }
  }
  onclickQuestion = val => {
    let ratingVal = val[0];
    console.log(ratingVal);
  };

  render() {
    console.log(this.props.feedBackDetails);
    return (
      <div className={styles.base}>
        <div className={styles.formWrapper}>
          <div className={styles.feedBackCardHolder}>
            <div className={styles.feedBackDetailsHolder}>
              <div className={styles.feedBackText}>
                <div className={styles.countOfText}>1</div>
                <span> Please rate your experience on our website</span>
              </div>
              <div className={styles.feedBackRatingAndTextHolder}>
                <div className={styles.textOfRating}> Very Bad</div>
                <div className={styles.ratingHolder}>
                  <FeedBackRateGrid
                    onSelect={val => this.onclickQuestion(val)}
                  />
                </div>
                <div className={styles.endTextOfRating}> Very Good</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
