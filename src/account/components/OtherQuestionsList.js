import React, { Component } from "react";
import styles from "./OtherQuestionsList.css";
import buying from "./img/buying.svg";
import EGV from "./img/EGV.svg";
import product from "./img/product.svg";
import promo from "./img/promo.svg";
import selling from "./img/selling.svg";
import website from "./img/website.svg";
export default class OtherQuestionsList extends Component {
  constructor(props) {
    super(props);
  }

  // image={
  //   this.state.parentIssueType== faq.FAQHeader?
  //   `${require("../components/img/" +
  //   faq.image.split(".")[0] +"active"+
  //   ".svg")}`

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
                  let bgImage = "";
                  if (parrentIssue.parentIssueType == "Website related") {
                    bgImage = website;
                  }
                  if (parrentIssue.parentIssueType == "Buying") {
                    bgImage = buying;
                  }
                  if (parrentIssue.parentIssueType == "Selling") {
                    bgImage = selling;
                  }
                  if (parrentIssue.parentIssueType == "Product related") {
                    bgImage = product;
                  }
                  if (parrentIssue.parentIssueType == "Promotions & Offers") {
                    bgImage = promo;
                  } else {
                    bgImage = EGV;
                  }
                  return (
                    <div
                      key={`key${index}`}
                      className={styles.listHolder}
                      onClick={() =>
                        this.props.selectOtehrQuestion(parrentIssue)
                      }
                      style={{ backgroundImage: "url(" + bgImage + ")" }}
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
