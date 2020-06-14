import React, { Component } from "react";
import styles from "./CustomerIssue.css";
import { withRouter } from "react-router-dom";
import Accordion from "../../general/components/Accordion";
import QuestionFeedback from "./QuestionFeedback";
import format from "date-fns/format";
import OrderActionButton from "./OrderActionButton";
import Accordian from "../../general/components/Accordion";
import ProductImage from "../../general/components/ProductImage.js";
import { getDayNumberSuffix } from "../../lib/dateTimeFunction";
import {
  setDataLayer,
  ADOBE_REQUEST_INVOICE_LINK_CLICKED
} from "../../lib/adobeUtils";
import CustomerQueryForm from "./CustomerQueryForm";
import Button from "../../general/components/Button.js";
import QuestionList from "./QuestionList";
import { MY_ACCOUNT_PAGE, COSTUMER_CLIQ_CARE_ROUTE } from "../../lib/constants";
const dateFormat = "DD MM YYYY";
const ORDER_IN_PROCESS = "Order in Process";
const READY_FOR_COLLECTION = "Ready for Collection";
const PICKUP_DATE = "Pickup Date:";
const SHIPPED = "Shipped";
const ORDER_CONFIRMED = "Order Confirmed";
const ITEM_PACKED = "Item Packed";
const OUT_FOR_DELIVERY = "Out For Delivery";
// const READY_FOR_COLLECTION = "Ready for Collection";
const ESTIMATED_DATE = "Estimated Delivery Date:";
const DELIVERY_TEXT = "Delivered on:";

class OrderListDetails extends Component {
  state = {
    // question: this.props.isOrderRelatedQuestion
    //   ? null
    //   : this.props.orderRelatedQuestionsData&&this.props.orderRelatedQuestionsData[0],
    question: null,
    showQuestionList: true,
    // showFeedBack: this.props.isOrderRelatedQuestion ? false : true,
    showFeedBack: false,
    // isAnswerHelpFull: false,
    currentQuestionIndex: 0,
    nextQuestions: null,
    // isQuesryForm:false,
    // isQuesryForm:true,
    showFaqSolution: null
  };

  //   componentWillReceiveProps(){
  // }

  // componentDidMount(){
  //   if(this.props.orderRelatedQuestionsData&&this.props.orderRelatedQuestionsData.length>=2){
  //     this.setState({nextQuestions:this.props.orderRelatedQuestionsData[1],currentQuestionIndex:1})
  //   }
  // }

  componentDidMount() {
    window.scroll(0, 0);
  }

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

  // answerYes() {
  //   this.setState({ isAnswerHelpFull: true });
  // }

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

  feedbak(question) {
    return (
      <QuestionFeedback
        question={question}
        // isAnswerHelpFull={isAnswerHelpFull}
        feedBackHelpFull={() => this.props.feedBackHelpFull()}
        isAnswerHelpFull={this.props.isAnswerHelpFull}
        moreHelps={() => this.props.moreHelps()}
        // issueOptions={()=>this.isQuesryFormAction()}
        showAllQuestion={() => this.showAllQuestion()}
        nextQuestion={() => this.nextQuestion()}
        // nextQuestions={nextQuestions}
        orderRelatedQuestion={this.props.orderRelatedQuestion}
        otherQuestion={this.props.otherQuestion}
        FAQquestion={this.props.FAQquestion}
        parentIssueType={this.props.parentIssueType}
        selectedOrder={this.props.selectedOrder}
      />
    );
  }
  showFaqSolutions(listOfIssue) {
    // console.log("listOfIssue",listOfIssue);
    //  if (this.state.showFaqSolution){
    //     this.setState({showFaqSolution:null})
    //   }
    //   else{
    //     this.setState({showFaqSolution:listOfIssue.question_component})
    //   }
    if (this.state.showFaqSolution != listOfIssue.question_component) {
      console.log("fssssssssss");
      this.props.updateThanks();
    }

    this.setState({ showFaqSolution: listOfIssue.question_component });
  }

  render() {
    const { selectedOrder, slectOrderData } = this.props;
    const product = slectOrderData && slectOrderData.products[0];
    return (
      <div>
        <div className={styles.whiteCard}>
          <div className={styles.orderHeader}>
            <div className={styles.header}>
              {this.props.orderRelatedQuestion && <div>Your order details</div>}
              {this.props.otherQuestion && !this.props.FAQquestion && (
                <div>
                  {this.props.parentIssueType && this.props.isQuesryForm
                    ? this.props.parentIssueType
                    : "Other Issues"}
                </div>
              )}
              {/* {this.props.otherQuestion && this.props.question && (
                  <div>Other Issues</div>
                )} */}
              {!this.props.isQuesryForm && this.props.FAQquestion && (
                <div>All Help Topics</div>
              )}
              {this.props.isQuesryForm && this.props.FAQquestion && (
                <div>{this.props.parentIssueType}</div>
              )}
              {/* {this.props.isQuesryForm && <div>{this.props.parentIssueType}</div>} */}
            </div>
            <div className={styles.orderDetalsButton}>
              {this.props.isQuesryForm ? (
                <div
                  className={styles.customBtn}
                  onClick={() => this.props.navigateCliqCarePage()}
                >
                  Back to CLiQ Care Homepage
                </div>
              ) : (
                <div
                  className={styles.customBtn}
                  onClick={() => this.props.navigatePreviousPage()}
                >
                  Go Back to Previous Page
                </div>
              )}

              {/* {this.props.isQuesryForm ? (
                  <Button
                    type="hollow"
                    label="Back to CLiQ Care Homepage"
                    borderColor={""}
                    color={"#da1c5c"}
                    height={16}
                    onClick={() => this.props.navigateCliqCarePage()}
                  />
                ) : (
                  <Button
                    type="hollow"
                    label="Go Back to Previous Page"
                    borderColor={""}
                    color={"#da1c5c"}
                    height={16}
                    onClick={() => this.props.navigatePreviousPage()}
                  />
                )} */}
            </div>
          </div>
          {this.props.question &&
            this.props.question.subIssueType &&
            this.props.isQuesryForm && (
              <div className={styles.subIssueType}>
                {this.props.question.subIssueType}
              </div>
            )}

          {this.props.selectedOrder &&
            this.props.selectedOrder.products &&
            this.props.selectedOrder.products.length &&
            this.props.orderRelatedQuestion && (
              <div className={styles.orderDetailsBox}>
                <div className={styles.orderDetailsCard}>
                  <div className={styles.orderDetailsImgBox}>
                    <ProductImage
                      image={product.imageURL}
                      // flatImage={this.props.productName === "Gift Card"}
                    />
                  </div>
                  <div className={styles.orderDetailsContent}>
                    <div className={styles.orderDesc}>
                      {product.productName}
                    </div>
                    {this.props.selectedOrder &&
                      this.props.selectedOrder.products && (
                        <div className={styles.orderDesc}>
                          <span className={styles.fontBold}>Order Status:</span>{" "}
                          {product.statusDisplay}
                        </div>
                      )}

                    {product.pickUpDateCNC ? (
                      product.statusDisplay === ORDER_IN_PROCESS ||
                      product.statusDisplay === READY_FOR_COLLECTION ? (
                        <div className={styles.orderStatus}>
                          {PICKUP_DATE}&nbsp;
                          <span className={styles.fontBold}>
                            {getDayNumberSuffix(product.pickUpDateCNC, true)}
                          </span>
                        </div>
                      ) : null
                    ) : (product.statusDisplay === ORDER_CONFIRMED ||
                        product.statusDisplay === ORDER_IN_PROCESS ||
                        product.statusDisplay === SHIPPED ||
                        product.statusDisplay === ITEM_PACKED ||
                        product.statusDisplay === OUT_FOR_DELIVERY ||
                        product.statusDisplay === READY_FOR_COLLECTION) &&
                      (product.EDD || product.estimateddeliverydate) ? (
                      <div className={styles.orderStatus}>
                        {ESTIMATED_DATE}&nbsp;
                        <span className={styles.fontBold}>
                          {getDayNumberSuffix(
                            product.EDD || product.estimateddeliverydate
                          )}
                        </span>
                      </div>
                    ) : selectedOrder.products[0].deliveryDate ? (
                      <div className={styles.orderStatus}>
                        {DELIVERY_TEXT}&nbsp;
                        <span className={styles.fontBold}>
                          {getDayNumberSuffix(
                            selectedOrder.products[0].deliveryDate,
                            true
                          )}
                        </span>
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className={styles.moreAction}>
                  <div className={styles.moreHeader}>More actions</div>
                  <OrderActionButton
                    selectedOrder={this.props.selectedOrder}
                    sendInvoice={(ussid, sellerOrderNo) => {
                      this.props.sendInvoice(ussid, sellerOrderNo);
                    }}
                  />
                </div>
              </div>
            )}

          {this.props.showFeedBack && this.feedbak(this.props.question)}

          {this.props.FAQquestion && this.props.questionsList && (
            <div className={styles.accordianBox}>
              {/* {this.state.showParentIssue} */}
              <div className={styles.parentIssueBox}>
                <span className={styles.parentIssue}>
                  {this.props.parentIssueType.replace("&amp;", "&")}
                </span>{" "}
                <span
                  className={styles.staticContent}
                >{`(Browse all help topics related to ${this.props.parentIssueType.replace(
                  "&amp;",
                  "&"
                )})`}</span>
              </div>
              {this.props.questionsList.map(listOfIssue => {
                return (
                  <div>
                    <div
                      className={[
                        styles.faqHeading,
                        this.state.showFaqSolution ==
                        listOfIssue.question_component
                          ? styles.fontBold
                          : null
                      ].join(" ")}
                      onClick={() => this.showFaqSolutions(listOfIssue)}
                    >
                      {listOfIssue.question_component}
                    </div>
                    {this.state.showFaqSolution ==
                      listOfIssue.question_component &&
                      this.feedbak(listOfIssue)}
                  </div>
                );
              })}
            </div>
          )}

          {!this.props.FAQquestion && this.props.showQuestionList && (
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

        {this.props.isQuesryForm && (
          <CustomerQueryForm
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
            // name={this.props.name}
            // email={this.props.email}
            // mobile={this.props.mobile}
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
            navigatePreviousPage={() => this.props.navigatePreviousPage()}
          />
        )}
      </div>
    );
  }
}

export default withRouter(OrderListDetails);
