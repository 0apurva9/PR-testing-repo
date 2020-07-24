import React, { Component } from "react";
import Button from "../../general/components/Button.js";
import thankYou from "../components/img/thankYou.svg";
import likeIcon from "../components/img/like.png";
import styles from "./CustomerIssue.css";
import { ORDER_CODE } from "../../lib/constants";

export default class QuestionFeedback extends Component {
  componentDidMount() {
    if (!this.props.FAQquestion) {
      window.scroll(0, 0);
    }
  }

  constructor(props) {
    super(props);
  }
  render() {
    let newSolution = this.props.FAQquestion
      ? this.props.question.answer
      : this.props.question.solution;
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
      <div
        className={
          this.props.FAQquestion
            ? styles.faqQuestionAnswer
            : styles.otherQuestionAnswer
        }
      >
        {!this.props.FAQquestion && this.props.parentIssueType && (
          <div className={styles.prentIssueType}>
            {this.props.parentIssueType.replace("&amp;", "&")}
          </div>
        )}
        {!this.props.FAQquestion && (
          <div className={styles.question}>
            {this.props.orderRelatedQuestion
              ? this.props.question.issueType
              : null}
            {this.props.otherQuestion ? this.props.question.subIssueType : null}
          </div>
        )}
        <div
          className={styles.solution}
          dangerouslySetInnerHTML={{
            __html: newSolution
          }}
        ></div>
        <div className={styles.feedBack}>
          <div className={styles.feedBackBox}>
            <div className={styles.feedBackHeader}>{`${
              this.props.isAnswerHelpFull ? "Thank you" : "Was this helpful?"
            }`}</div>
            <div className={styles.feedBackContent}>
              {`${
                this.props.isAnswerHelpFull
                  ? "for your valuable feedback. This will help us to get better."
                  : "Let us know. We're here to help!"
              }`}
            </div>
          </div>
          {this.props.isAnswerHelpFull ? (
            <div className={styles.thankImg}>
              <img src={thankYou} alt="Thank you" />
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
                onClick={() => this.props.feedBackHelpFull()}
              />
              <Button
                backgroundColor="#fff"
                height={28}
                label="No"
                width={90}
                borderRadius="20px"
                textStyle={{ color: "#da1c5c", fontSize: 14 }}
                onClick={() => this.props.moreHelps()}
              />
            </div>
          )}
        </div>
        <div
          className={[
            styles.questionsAction,
            this.props.otherQuestion ? styles.maginBottom : null
          ].join(" ")}
        ></div>
      </div>
    );
  }
}
