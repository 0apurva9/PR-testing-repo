import React, { Component } from "react";
import styles from "./CustomerIssue.css";
import Accordion from "../../general/components/Accordion";
import QuestionFeedback from "./QuestionFeedback";
import { getDayNumberSuffix } from "../../lib/dateTimeFunction";
import {
  setDataLayer,
  ADOBE_REQUEST_INVOICE_LINK_CLICKED
} from "../../lib/adobeUtils";
import CustomerQueryForm from "./CustomerQueryForm";
import QuestionList from "./QuestionList";

class OrderListDetails extends Component {
  state = {
    // question: this.props.isOrderRelatedQuestion
    //   ? null
    //   : this.props.orderRelatedQuestionsData&&this.props.orderRelatedQuestionsData[0],
    question: null,
    showQuestionList: true,
    // showFeedBack: this.props.isOrderRelatedQuestion ? false : true,
    showFeedBack: false,
    isAnswerHelpFull: false,
    currentQuestionIndex: 0,
    nextQuestions: null
    // isQuesryForm:false,
    // isQuesryForm:true
  };

  //   componentWillReceiveProps(){
  // }

  // componentDidMount(){
  //   if(this.props.orderRelatedQuestionsData&&this.props.orderRelatedQuestionsData.length>=2){
  //     this.setState({nextQuestions:this.props.orderRelatedQuestionsData[1],currentQuestionIndex:1})
  //   }
  // }

  selectQuestion(question, index) {
    this.setState({
      question: question,
      showQuestionList: true,
      showFeedBack: true
    });
    for (let i = 0; i < this.props.orderRelatedQuestionsData.length; i++) {
      if (i == index)
        this.setState({
          nextQuestions: this.props.orderRelatedQuestionsData[i + 1],
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
    for (let i = 0; i < this.props.orderRelatedQuestionsData.length; i++) {
      if (i == this.state.currentQuestionIndex)
        this.setState({
          question: this.props.orderRelatedQuestionsData[
            this.state.currentQuestionIndex
          ],
          nextQuestions: this.props.orderRelatedQuestionsData[
            this.state.currentQuestionIndex + 1
          ],
          currentQuestionIndex: this.state.currentQuestionIndex + 1
        });
    }
  }

  // isQuesryFormAction(){
  //   this.setState({isQuesryForm:true})
  // }

  // requestInvoice(lineID, orderNumber) {
  //   setDataLayer(ADOBE_REQUEST_INVOICE_LINK_CLICKED);
  //   if (this.props.sendInvoice) {
  //     this.props.sendInvoice(lineID, orderNumber);
  //   }
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
        {this.props.isQuesryForm && this.props.otherQuestion ? null : (
          <div className={styles.whiteCard}>
            <div className={styles.orderHeader}>
              <div className={styles.header}>
                {this.props.orderRelatedQuestion && (
                  <div>Your order details</div>
                )}
                {this.props.otherQuestion && !this.props.FAQquestion && (
                  <div>Other Issues</div>
                )}
                {this.props.FAQquestion && <div>Faq Issue</div>}
                {/* {this.props.isOrderRelatedQuestion
                ? 
                : ""} */}
              </div>
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

            {this.props.orderRelatedQuestion && (
              <div className={styles.orderDetailsBox}>
                <div className={styles.orderDetailsCard}>
                  <div className={styles.orderDetailsImgBox}>
                    <img
                      className={styles.orderImg}
                      src={this.props.selectedOrder.products[0].imageURL}
                      alt="Product image"
                    />
                  </div>
                  <div className={styles.orderDetailsContent}>
                    <div className={styles.orderDesc}>
                      {this.props.selectedOrder.products[0].productName}
                    </div>
                    <div className={styles.orderDesc}>
                      {this.props.selectedOrder.products[0].price}
                    </div>
                    <div className={styles.orderDesc}>
                      <span> {"M"} </span> | <span>{"Blue"}</span>
                    </div>
                    <div className={styles.orderDesc}>Qty {"1"}</div>
                    <div className={styles.orderDesc}>
                      <span className={styles.fontBold}>
                        Delivery Delivered on:{" "}
                      </span>
                      {getDayNumberSuffix(this.props.selectedOrder.orderDate)}
                    </div>
                  </div>
                </div>
                <div className={styles.moreAction}>
                  <div className={styles.moreHeader}>More actions</div>
                  {/* {products.isInvoiceAvailable &&
                                (products.consignmentStatus === "DELIVERED" ||
                                  products.consignmentStatus === "HOTC" ||
                                  products.consignmentStatus ===
                                    "ORDER_COLLECTED" ||
                                  products.consignmentStatus ===
                                    "RETURN_CANCELLED_CUS") && (
                                  <div
                                    className={styles.cancelProduct}
                                    onClick={() =>
                                      this.requestInvoice(
                                        products.transactionId,
                                        products.sellerorderno
                                      )
                                    }
                                  >
                                    {this.props.underlineButtonLabel}
                                  </div>
                                )} */}

                  <button className={styles.btn} type="button">
                    Download Invoice
                  </button>
                  <button className={styles.btn} type="button">
                    Return Order
                  </button>
                  {/* <button className={styles.btn} type="button">
                     Lorem Ipsum (Placeholder)
                 </button> */}
                </div>
              </div>
            )}

            {this.props.showFeedBack && (
              <QuestionFeedback
                question={this.props.question}
                isAnswerHelpFull={isAnswerHelpFull}
                answerYes={() => this.answerYes()}
                moreHelps={() => this.props.moreHelps()}
                // issueOptions={()=>this.isQuesryFormAction()}
                showAllQuestion={() => this.showAllQuestion()}
                nextQuestion={() => this.nextQuestion()}
                nextQuestions={nextQuestions}
                orderRelatedQuestion={this.props.orderRelatedQuestion}
                otherQuestion={this.props.otherQuestion}
                FAQquestion={this.props.FAQquestion}
                parentIssueType={this.props.parentIssueType}
                selectedOrder={this.props.selectedOrder}
              />
            )}

            {this.props.showQuestionList && (
              <div className={styles.orderRelatedIssueList}>
                {this.props.questionsList ? (
                  <QuestionList
                    // showQuestionList={this.state.showQuestionList}
                    parentIssueType={this.props.parentIssueType}
                    questionsList={this.props.questionsList}
                    orderRelatedQuestion={this.props.orderRelatedQuestion}
                    otherQuestion={this.props.otherQuestion}
                    FAQquestion={this.props.FAQquestion}
                    selectQuestion={(listOfIssue, index) =>
                      this.props.selectQuestion(listOfIssue, index)
                    }
                  />
                ) : (
                  <div className={styles.noQuestions}>
                    Sorry, we dont have any relevant issues related to this item
                    at this moment
                  </div>
                )}
              </div>
            )}
          </div>
        )}

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
            question={this.props.question}
            // selectedQuestion={this.props.selectedQuestion}
            questionType={this.props.questionType}
            parentIssueType={this.props.parentIssueType}
            otherQuestion={this.props.otherQuestion}
          />
        )}
      </div>
    );
  }
}

export default OrderListDetails;
