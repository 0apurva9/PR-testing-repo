import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "../../general/components/Button.js";
import thankYou from "../components/img/thankYou.svg";
import styles from "./CustomerIssue.css";
import { ORDER_CODE } from "../../lib/constants";
const YES = "yes";
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
    const { question } = this.props;
    let newSolution = this.props.FAQquestion
      ? question.answer
      : question.solution;
    if (question.solution && question.solution.indexOf("<a") !== -1) {
      const startIndex = newSolution.indexOf("<a"),
        endIndex = newSolution.indexOf("</a>");
      const link = newSolution.slice(startIndex, endIndex + 4);
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
    let showContactUsButton = false;
    if (!this.props.FAQquestion) {
      if (
        question.call.toLowerCase() == YES ||
        question.chat.toLowerCase() == YES ||
        question.click2Call.toLowerCase() == YES ||
        question.webform.toLowerCase() == YES
      ) {
        showContactUsButton = true;
      } else {
        showContactUsButton = false;
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
            {this.props.orderRelatedQuestion ? question.issueType : null}
            {this.props.otherQuestion ? question.subIssueType : null}
          </div>
        )}
        <div
          className={styles.solution}
          dangerouslySetInnerHTML={{
            __html: newSolution
          }}
        />
        <div className={styles.feedBack}>
          <div className={styles.feedBackBox}>
            <div className={styles.feedBackHeader}>{`${
              showContactUsButton
                ? "Need more help?"
                : this.props.isAnswerHelpFull
                ? "Thank you"
                : "Was this helpful?"
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
            <div
              className={
                showContactUsButton
                  ? styles.contactUsBtn
                  : styles.feedBackButton
              }
            >
              {showContactUsButton ? (
                <Button
                  backgroundColor="#fff"
                  height={31}
                  label="Contact Us"
                  width={108}
                  borderRadius={20}
                  textStyle={{ color: "#da1c5c", fontSize: 14 }}
                  onClick={() => this.props.moreHelps()}
                />
              ) : (
                <React.Fragment>
                  <Button
                    backgroundColor="#fff"
                    height={28}
                    label="Yes"
                    width={90}
                    borderRadius={20}
                    textStyle={{ color: "#da1c5c", fontSize: 14 }}
                    onClick={() => this.props.feedBackHelpFull()}
                  />
                  <Button
                    backgroundColor="#fff"
                    height={28}
                    label="No"
                    width={90}
                    borderRadius={20}
                    textStyle={{ color: "#da1c5c", fontSize: 14 }}
                    onClick={() => this.props.feedBackHelpFull()}
                  />
                </React.Fragment>
              )}
            </div>
          )}
        </div>
        <div
          className={[
            styles.questionsAction,
            this.props.otherQuestion ? styles.maginBottom : null
          ].join(" ")}
        />
      </div>
    );
  }
}

QuestionFeedback.propTypes = {
  feedBackHelpFull: PropTypes.func,
  moreHelps: PropTypes.func,
  FAQquestion: PropTypes.bool,
  isAnswerHelpFull: PropTypes.bool,
  orderRelatedQuestion: PropTypes.bool,
  otherQuestion: PropTypes.bool,
  parentIssueType: PropTypes.string,
  selectedOrder:PropTypes.shape({
    cancellable:PropTypes.bool,
    orderId:PropTypes.number,
    isCDA:PropTypes.bool,
    isEgvOrder:PropTypes.bool,
    isPickupUpdatable:PropTypes.bool,
    isWalletPay:PropTypes.bool,
    isbundlingItemsAvailable:PropTypes.bool,
    orderDate:PropTypes.string,
    paymentMethod:PropTypes.string,
    recipientname:PropTypes.string,
    status:PropTypes.string,
    statusDisplay:PropTypes.string,
    type:PropTypes.string,
    resendAvailable:PropTypes.bool,
    resendAttemptedCount:PropTypes.number,
    products:PropTypes.arrayOf(
      PropTypes.shape({
        transactionId:PropTypes.string
      })
    )
  }),
  question: PropTypes.shape({
    UItemplateCode: PropTypes.string,
    call: PropTypes.string,
    chat: PropTypes.string,
    click2Call: PropTypes.string,
    l0: PropTypes.string,
    l1: PropTypes.string,
    l2: PropTypes.string,
    l3: PropTypes.string,
    l4: PropTypes.string,
    answer:PropTypes.string,
    solution: PropTypes.string,
    subIssueType: PropTypes.string,
    tat: PropTypes.string,
    ticketType: PropTypes.string,
    webform: PropTypes.string,
    issueType:PropTypes.string,
  })
};
