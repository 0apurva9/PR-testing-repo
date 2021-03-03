import React, { Component } from "react";
import styles from "./CustomerIssue.css";
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
      nextQuestions
    } = this.state;
    return (
      <div>
        <div className={styles.whiteCard}>
          <div className={styles.headerBox}>
            <div className={styles.header}>Your order details</div>
            <div className={styles.orderDetalsButton}>
              {/* <Button
                type="hollow"
                label="Go to recent orders"
                borderColor={""}
                color={"#da1c5c"}
                height={16}

                onClick={() => generateOtp()}
              /> */}
            </div>
          </div>

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
        </div>

        {this.props.isQuesryForm && (
          <CustomerQueryForm
            getQuestyTesting={() => this.props.getQuestyTesting()}
            selectedOrder={this.props.selectedOrder}
            uploadUserFile={(issueType, title, file) =>
              this.props.uploadUserFile(issueType, title, file)
            }
            uploadedAttachments={this.props.uploadedAttachments}
            userDetails={this.props.userDetails}
            submitCustomerForms={formaData =>
              this.props.submitCustomerForms(formaData)
            }
            displayToast={message => this.props.displayToast(message)}
            customerQueriesField={this.props.customerQueriesField}
            name={this.props.name}
            email={this.props.email}
            mobile={this.props.mobile}
            getCustomerQueriesFields={(webFormTemplate, isIssueOptions) =>
              this.props.getCustomerQueriesFields(
                webFormTemplate,
                isIssueOptions
              )
            }
            selectedQuestion={this.props.selectedQuestion}
          />
        )}
      </div>
    );
  }
}

export default OrderListDetails;
