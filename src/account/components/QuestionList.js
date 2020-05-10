import React, { Component } from "react";
import styles from "./CustomerIssue.css";

export default class QuestionList extends Component {
  render() {
    return (
      <div>
        {this.props.orderRelatedQuestion && (
          <div className={styles.questionListHeading}>
            Issues regarding your order
          </div>
        )}
        {this.props.otherQuestion && (
          <div className={styles.parentIssueT}>
            {this.props.parentIssueType}
          </div>
        )}

        {/* {this.props.isOrderRelatedQuestion &&this.state.showFeedBack ? null : (
                <div className={styles.marginBottom}></div>
              )} */}

        <ul className={styles.listGroup}>
          {this.props.orderRelatedQuestionsData &&
            this.props.orderRelatedQuestionsData.map((listOfIssue, index) => {
              return (
                <li
                  className={styles.listGroupItem}
                  key={`unique${index}`}
                  onClick={() => this.props.selectQuestion(listOfIssue, index)}
                >
                  {this.props.orderRelatedQuestion
                    ? listOfIssue.issueType
                    : null}
                  {this.props.otherQuestion ? listOfIssue.subIssueType : null}
                  {this.props.FAQquestion ? "faq list" : null}
                  {/* {this.props.isOrderRelatedQuestion
                            ? listOfIssue.issueType
                            : listOfIssue.subIssueType} */}
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
}
