import React, { Component } from "react";
import styles from "./CustomerIssue.css";
import Button from "../../general/components/Button.js";
import Accordion from "../../general/components/Accordion";
import QuestionDetails from "./QuestionDetails";
import CustomerQueryForm from "./CustomerQueryForm";

class OrderListDetails extends Component {
  state = {
    question: null,
    showQuestionList: true,
    showFeedBack: false,
    isAnswerHelpFull: false,
    currentQuestionIndex: 0,
    nextQuestions: null
    // isQuesryForm:false,
    // isQuesryForm:true
  };
  selectQuestion(question, index) {
    this.setState({
      question: question,
      showQuestionList: false,
      showFeedBack: true
    });
    for (
      let i = 0;
      i < this.props.orderRelatedQuestionsData.listOfIssues.length;
      i++
    ) {
      if (i == index)
        this.setState({
          nextQuestions: this.props.orderRelatedQuestionsData.listOfIssues[
            i + 1
          ],
          currentQuestionIndex: i + 1
        });
    }
  }
  showAllQuestion() {
    this.setState({
      question: null,
      showQuestionList: true,
      showFeedBack: false,
      isAnswerHelpFull: false
    });
  }
  answerYes() {
    this.setState({ isAnswerHelpFull: true });
  }
  nextQuestion() {
    for (
      let i = 0;
      i < this.props.orderRelatedQuestionsData.listOfIssues.length;
      i++
    ) {
      if (i == this.state.currentQuestionIndex)
        this.setState({
          question: this.props.orderRelatedQuestionsData.listOfIssues[
            this.state.currentQuestionIndex
          ],
          nextQuestions: this.props.orderRelatedQuestionsData.listOfIssues[
            this.state.currentQuestionIndex + 1
          ],
          currentQuestionIndex: this.state.currentQuestionIndex + 1
        });
    }
  }
  // isQuesryFormAction(){
  //   this.setState({isQuesryForm:true})
  // }

  render() {
    const {
      question,
      showQuestionList,
      showFeedBack,
      isAnswerHelpFull,
      currentQuestionIndex,
      nextQuestions
    } = this.state;
    return (
      <div>
        <div className={styles.whiteCard}>
          <div className={styles.headerBox}>
            <div className={styles.header}>Your order details</div>
            <div className={styles.orderDetalsButton}>
              <Button
                type="hollow"
                label="Go to recent orders"
                borderColor={""}
                color={"#da1c5c"}
                height={16}

                // onClick={() => generateOtp()}
              />
              {/* <button className={styles.btn} type="button">Go to recent orders</button> */}
            </div>
          </div>
          <div className={styles.orderDetailsBox}>
            <div className={styles.orderDetailsCard}>
              <div className={styles.orderDetailsImgBox}>
                {/* <img
              className={styles.orderImg}
              src={props.selectedOrder.products[0].imageURL}
              alt="Product image"
              props.selectedOrder.products[0].productName
              props.selectedOrder.products[0].price
              {props.selectedOrder.orderDate}""
            /> */}
              </div>
              <div className={styles.orderDetailsContent}>
                <div className={styles.orderDesc}>
                  {"Ascot by Westside Indigo Self Patterned Slim…"}
                </div>
                <div className={styles.orderDesc}>{"₹999"}</div>
                <div className={styles.orderDesc}>
                  <span> {"M"} </span> | <span>{"Blue"}</span>
                </div>
                <div className={styles.orderDesc}>Qty {"1"}</div>
                <div className={styles.orderDesc}>
                  <span className={styles.fontBold}>
                    Delivery Delivered on:
                  </span>
                  22th Nov 2018
                </div>
              </div>
            </div>
            <div className={styles.moreAction}>
              <div className={styles.moreHeader}>More actions</div>
              <button className={styles.btn} type="button">
                Download Invoice
              </button>
              <button className={styles.btn} type="button">
                Return Order
              </button>
              <button className={styles.btn} type="button">
                Lorem Ipsum (Placeholder)
              </button>
            </div>
          </div>

          {!this.props.isQuesryForm && (
            <div className={styles.moreDetails}>
              <Accordion text="More Details">
                <h1>thid id d</h1>
              </Accordion>
            </div>
          )}

          {!this.props.isQuesryForm && showQuestionList && (
            <div className={styles.orderRelatedIssueList}>
              <div className={[styles.header, styles.paddingTB].join(" ")}>
                Issues regarding your order
              </div>
              <ul className={styles.listGroup}>
                {this.props.orderRelatedQuestionsData &&
                  this.props.orderRelatedQuestionsData.listOfIssues &&
                  this.props.orderRelatedQuestionsData.listOfIssues.map(
                    (listOfIssue, index) => {
                      return (
                        <li
                          className={styles.listGroupItem}
                          key={`unique${index}`}
                          onClick={() =>
                            this.selectQuestion(listOfIssue, index)
                          }
                        >
                          {listOfIssue.issueType}
                        </li>
                      );
                    }
                  )}
              </ul>
            </div>
          )}

          {!this.props.isQuesryForm && showFeedBack && (
            <QuestionDetails
              question={question}
              isAnswerHelpFull={isAnswerHelpFull}
              answerYes={() => this.answerYes()}
              issueOptions={question => this.props.issueOptions(question)}
              // issueOptions={()=>this.isQuesryFormAction()}
              showAllQuestion={() => this.showAllQuestion()}
              nextQuestion={() => this.nextQuestion()}
              nextQuestions={nextQuestions}
            />
          )}
          {/* {props.selectedOrder && props.selectedOrder} */}
        </div>
        {this.props.isQuesryForm && (
          <CustomerQueryForm
            customerQueriesField={this.props.customerQueriesField}
          />
        )}
      </div>
    );
  }
}

export default OrderListDetails;
