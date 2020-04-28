import React from "react";
import styles from "./OtherQuestions.css";

const OtherQuestions = props => {
  console.log("props", props);
  return (
    <div className={styles.base}>
      <div className={styles.otherIsuueBox}>
        <div className={styles.otherIssueHeading}>Other Issues</div>
        <div className={styles.listBox}>
          {props.customerQueriesOtherIssueData &&
            props.customerQueriesOtherIssueData.parentIssueList &&
            props.customerQueriesOtherIssueData.parentIssueList.map(
              parrentIssue => {
                return (
                  <div className={styles.listHolder}>
                    {/* <div className={styles.circle}></div> */}
                    <div className={styles.listItem}>
                      <div className={styles.parrentIssue}>
                        {parrentIssue.parentIssueType}
                      </div>
                      <div className={styles.childIssue}>
                        Lorem ipsum dorem lorem lorem ipsum dore,
                      </div>
                    </div>
                  </div>
                );
              }
            )}
        </div>
      </div>
    </div>
  );
};

export default OtherQuestions;
