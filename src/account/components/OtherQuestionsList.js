import React, { Component } from "react";
import styles from "./OtherQuestionsList.css";
export default class OtherQuestionsList extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    window.scroll(0, 0);
  }

  render() {
    let bgImage = null;
    return (
      <div className={styles.base}>
        <div className={styles.otherIsuueBox}>
          <div className={styles.otherIssueHeading}>Other Issues</div>
          <div className={styles.listBox}>
            {this.props.customerQueriesOtherIssueData &&
              this.props.customerQueriesOtherIssueData.parentIssueList &&
              Array.isArray(
                this.props.customerQueriesOtherIssueData.parentIssueList
              ) &&
              this.props.customerQueriesOtherIssueData.parentIssueList.length >
                0 &&
              this.props.customerQueriesOtherIssueData.parentIssueList.map(
                (parrentIssue, index) => {
                  bgImage = parrentIssue.parentIssueType.includes("EGV")
                    ? "egv-cliq-point"
                    : parrentIssue.parentIssueType.split(" ")[0];
                  return (
                    <div
                      key={`key${index}`}
                      className={styles.listHolder}
                      onClick={() =>
                        this.props.selectOtehrQuestion(parrentIssue)
                      }
                      style={{
                        background: `url(${require(`./img/${bgImage}.svg`)})`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat"
                      }}
                    >
                      <div className={styles.listItem}>
                        <div className={styles.parrentIssue}>
                          {parrentIssue.parentIssueType}
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
  }
}
