import React, { Component } from "react";
import styles from "./CustomerIssue.css";

export default class QuestionList extends Component {
  componentDidMount() {
    window.scroll(0, 0);
  }

  render() {
    return (
      <div>
        {this.props.orderRelatedQuestion && (
          <div className={styles.questionListHeading}>
            Issues regarding your order
          </div>
        )}
        {this.props.parentIssueType && (
          <div className={styles.parentIssueT}>
            {this.props.parentIssueType.replace("&amp;", "&")}{" "}
            <span
              className={styles.staticContent}
              Browse
              all
              your
              website
              related
            >{`(Browse all your ${this.props.parentIssueType} issues and choose your help topic.)`}</span>
          </div>
        )}

        {/* {this.props.isOrderRelatedQuestion &&this.state.showFeedBack ? null : (
                <div className={styles.marginBottom}></div>
              )} */}

        <ul className={styles.listGroup}>
          {this.props.questionsList &&
            this.props.questionsList.map((listOfIssue, index) => {
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
                  {this.props.FAQquestion
                    ? listOfIssue.question_component
                    : null}
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
