import React, { Component } from "react";
import styles from "./OtherQuestionsList.css";
export default class OtherQuestionsList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={styles.base}>
        <div className={styles.otherIsuueBox}>
          <div className={styles.otherIssueHeading}>Other Issues</div>
          <div className={styles.listBox}>
            {this.props.customerQueriesOtherIssueData &&
              this.props.customerQueriesOtherIssueData.parentIssueList &&
              this.props.customerQueriesOtherIssueData.parentIssueList.map(
                (parrentIssue, index) => {
                  return (
                    <div
                      key={`key${index}`}
                      className={styles.listHolder}
                      onClick={() =>
                        this.props.selectOtehrQuestion(parrentIssue)
                      }
                    >
                      {/* <div className={styles.circle}></div> */}
                      <div className={styles.listItem}>
                        <div className={styles.parrentIssue}>
                          {parrentIssue.parentIssueType}
                        </div>
                        {/* <div className={styles.childIssue}>
                          Lorem ipsum dorem lorem lorem ipsum dore,
                        </div> */}
                      </div>
                    </div>
                  );
                }
              )}
          </div>
        </div>
      </div>
    );
  }
}
// const OtherQuestions = props => {

// };

// export default OtherQuestions;
