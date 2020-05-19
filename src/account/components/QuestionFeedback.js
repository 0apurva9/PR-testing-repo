import React, { Component } from "react";
import Button from "../../general/components/Button.js";
import feedbackYes from "../components/img/feedbackYes.png";
import likeIcon from "../components/img/like.png";
import styles from "./CustomerIssue.css";
import { ORDER_CODE } from "../../lib/constants";

export default class QuestionFeedback extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let newSolution = this.props.question.solution;
    if (
      this.props.question.solution &&
      this.props.question.solution.indexOf("<a") !== -1
    ) {
      let startIndex = newSolution.indexOf("<a"),
        endIndex = newSolution.indexOf("</a>");
      let link = newSolution.slice(startIndex, endIndex + 4);
      let div = document.createElement("div");
      div.innerHTML = link.trim();

      if (div.firstChild.href.indexOf(`/?${ORDER_CODE}=`) !== -1) {
        let newURL = div.firstChild.href.slice(
          0,
          div.firstChild.href.indexOf(`{`)
        );
        newURL = `${newURL}${this.props.selectedOrder.orderId}&transactionId=${this.props.selectedOrder.products[0].transactionId}`;
        div.firstChild.setAttribute("href", newURL);
        div.firstChild.setAttribute("target", "_blank");
        newSolution = `${newSolution.slice(0, startIndex)}${
          div.firstChild.outerHTML
        }${newSolution.slice(endIndex + 4)}`;
      }
    }

    return (
      <div className={styles.questionAnswer}>
        {this.props.parentIssueType && (
          <div className={styles.prentIssueType}>
            {this.props.parentIssueType}
          </div>
        )}

        <div className={styles.question}>
          {this.props.orderRelatedQuestion
            ? this.props.question.issueType
            : null}
          {this.props.otherQuestion ? this.props.question.subIssueType : null}
          {this.props.FAQquestion ? "faq list" : null}
          {/* {this.props.isOrderRelatedQuestion
            ? this.props.question.issueType
            : this.props.question.subIssueType} */}
        </div>
        <div className={styles.propleLike}>
          <div className={styles.likeIcon}>
            <img src={likeIcon} alt="like" />
          </div>
          <span className={styles.poopleLIke}>{"342"}</span>
          <span>People found it useful</span>
        </div>
        <div
          className={styles.solution}
          dangerouslySetInnerHTML={{
            __html: newSolution
          }}
        >
          {/* {this.props.question.solution} */}
        </div>
        <div className={styles.feedBack}>
          <div className={styles.feedBackBox}>
            <div className={styles.feedBackHeader}>{`${
              this.props.isAnswerHelpFull ? "Thank you" : "Was this helpful?"
            }`}</div>
            <div className={styles.feedBackContent}>
              {`${
                this.props.isAnswerHelpFull
                  ? "Your feedback is valuable for us to make us get better in addressing you issue."
                  : "Hi we hope that the above information answered your issue help us get better by letting us know"
              }`}
            </div>
          </div>
          {this.props.isAnswerHelpFull ? (
            <div className={styles.thankImg}>
              <img src={feedbackYes} alt="Thank you" />
            </div>
          ) : (
            <div className={styles.feedBackButton}>
              <Button
                backgroundColor="#fff"
                height={28}
                label="Yes"
                width={90}
                // color="#da1c5c"
                borderRadius="20px"
                textStyle={{ color: "#da1c5c", fontSize: 14 }}
                onClick={() => this.props.answerYes()}
              />
              <Button
                backgroundColor="#fff"
                height={28}
                label="No"
                width={90}
                // color="#da1c5c"
                borderRadius="20px"
                textStyle={{ color: "#da1c5c", fontSize: 14 }}
                onClick={() => this.props.moreHelps()}
              />
            </div>
          )}
        </div>
        {/* {this.props.isOrderRelatedQuestion && ( */}
        <div
          className={[
            styles.questionsAction,
            this.props.otherQuestion ? styles.maginBottom : null
          ].join(" ")}
        >
          {/* <Button
              type="hollow"
              label="Back"
              borderColor={""}
              width={40}
              height={0}
              color={"#da1c5c"}
              padding="0px 5px"
              onClick={() => this.props.showAllQuestion()}
            /> */}
          {/* <Button
              type="hollow"
              label="Next Issue"
              width={110}
              height={0}
              borderColor={""}
              color={"#da1c5c"}
              padding="0"
              disabled={this.props.nextQuestions ? false : true}
              onClick={() => this.props.nextQuestion()}
            /> */}
          {/* <div className={styles.nextIssue}>
              {this.props.nextQuestions && this.props.nextQuestions
                ? `(${
                    this.props.isOrderRelatedQuestion
                      ? this.props.nextQuestions.issueType
                      : this.props.nextQuestions.subIssueType
                  })`
                : null}
              {}
            </div> */}
        </div>
        {/* )} */}
      </div>
    );
  }
}

// const QuestionSetails = this.props => {

// };

// export default QuestionSetails;
