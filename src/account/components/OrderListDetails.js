import React, { Component } from "react";
import styles from "./CustomerIssue.css";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import QuestionFeedback from "./QuestionFeedback";
import OrderActionButton from "./OrderActionButton";
import ProductImage from "../../general/components/ProductImage.js";
import { getDayNumberSuffix } from "../../lib/dateTimeFunction";
import CustomerQueryForm from "./CustomerQueryForm";
import QuestionList from "./QuestionList";
import {
  setDataLayerForCLiQCarePage,
  ADOBE_SELF_SERVE_NON_ORDER_QUESTION_CLICK,
} from "../../lib/adobeUtils";
const ORDER_IN_PROCESS = "Order in Process";
const READY_FOR_COLLECTION = "Ready for Collection";
const PICKUP_DATE = "Pickup Date:";
const SHIPPED = "Shipped";
const ORDER_CONFIRMED = "Order Confirmed";
const ITEM_PACKED = "Item Packed";
const OUT_FOR_DELIVERY = "Out For Delivery";
const ESTIMATED_DATE = "Estimated Delivery Date:";
const DELIVERY_TEXT = "Delivered on:";

class OrderListDetails extends Component {
  state = {
    question: null,
    showQuestionList: true,
    showFeedBack: false,
    currentQuestionIndex: 0,
    nextQuestions: null,
    showFaqSolution: null
  };

  componentDidMount() {
    window.scroll(0, 0);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.questionsList !== this.props.questionsList) {
      window.scroll(0, 0);
    }
  }

  feedbak(question) {
    return (
      <QuestionFeedback
        question={question}
        feedBackHelpFull={() => this.props.feedBackHelpFull()}
        isAnswerHelpFull={this.props.isAnswerHelpFull}
        moreHelps={() => this.props.moreHelps()}
        showAllQuestion={() => this.showAllQuestion()}
        nextQuestion={() => this.nextQuestion()}
        orderRelatedQuestion={this.props.orderRelatedQuestion}
        otherQuestion={this.props.otherQuestion}
        FAQquestion={this.props.FAQquestion}
        parentIssueType={this.props.parentIssueType}
        selectedOrder={this.props.selectedOrder}
      />
    );
  }

  showFaqSolutions(listOfIssue) {
    setDataLayerForCLiQCarePage(
      ADOBE_SELF_SERVE_NON_ORDER_QUESTION_CLICK,
      listOfIssue.question_component
    );
    if (this.state.showFaqSolution != listOfIssue.question_component) {
      this.props.updateThanks();
    }
    this.setState({ showFaqSolution: listOfIssue.question_component });
  }

  render() {
    const { selectedOrder, slectOrderData } = this.props;
    // const product = slectOrderData;
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
              {!this.props.isQuesryForm && this.props.FAQquestion && (
                <div>All Help Topics</div>
              )}
              {this.props.isQuesryForm && this.props.FAQquestion && (
                <div>{this.props.parentIssueType}</div>
              )}
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
            </div>
          </div>
          {this.props.question &&
            this.props.question.subIssueType &&
            this.props.isQuesryForm && (
              <div className={styles.subIssueType}>
                {this.props.question.subIssueType}
              </div>
            )}

          {slectOrderData && this.props.orderRelatedQuestion && (
            <div
              className={[
                styles.orderDetailsBox,
                this.props.isQuesryForm ? null : styles.orderDetailsSeperator
              ].join(" ")}
            >
              <div className={styles.orderDetailsCard}>
                <div className={styles.orderDetailsImgBox}>
                  <ProductImage image={slectOrderData.imageURL} />
                </div>
                <div className={styles.orderDetailsContent}>
                  <div className={styles.orderDesc}>
                    {slectOrderData.productName}
                  </div>
                  {slectOrderData && (
                    <div className={styles.orderDesc}>
                      <div className={styles.orderStatus}>
                        Order status:{" "}
                        <span className={styles.fontBold}>
                          {slectOrderData.statusDisplay ||
                            slectOrderData.displayStatusName}
                        </span>
                      </div>
                    </div>
                  )}
                  {slectOrderData.pickUpDateCNC ? (
                    slectOrderData.statusDisplay === ORDER_IN_PROCESS ||
                      slectOrderData.statusDisplay === READY_FOR_COLLECTION ? (
                        <div className={styles.orderStatus}>
                          {PICKUP_DATE}&nbsp;
                        <span className={styles.fontBold}>
                            {getDayNumberSuffix(
                              slectOrderData.pickUpDateCNC,
                              true
                            )}
                          </span>
                        </div>
                      ) : null
                  ) : (slectOrderData.statusDisplay === ORDER_CONFIRMED ||
                    slectOrderData.statusDisplay === ORDER_IN_PROCESS ||
                    slectOrderData.statusDisplay === SHIPPED ||
                    slectOrderData.statusDisplay === ITEM_PACKED ||
                    slectOrderData.statusDisplay === OUT_FOR_DELIVERY ||
                    slectOrderData.statusDisplay === READY_FOR_COLLECTION) &&
                    (slectOrderData.EDD ||
                      slectOrderData.estimateddeliverydate) ? (
                        <div className={styles.orderStatus}>
                          {ESTIMATED_DATE}&nbsp;
                      <span className={styles.fontBold}>
                            {getDayNumberSuffix(
                              slectOrderData.EDD ||
                              slectOrderData.estimateddeliverydate
                            )}
                          </span>
                        </div>
                      ) : selectedOrder &&
                        selectedOrder.products[0].deliveryDate ? (
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
              {this.props.questionsList.map((listOfIssue, index) => {
                return (
                  <div
                    key={`key${index}`}
                  >
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
                    Sorry, we don &apos;t have any relevant issues related to this order
                    right now.
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
            getCustomerQueriesFields={(webFormTemplate, isIssueOptions) =>
              this.props.getCustomerQueriesFields(
                webFormTemplate,
                isIssueOptions
              )
            }
            question={this.props.question}
            questionType={this.props.questionType}
            parentIssueType={this.props.parentIssueType}
            otherQuestion={this.props.otherQuestion}
            navigatePreviousPage={() => this.props.navigatePreviousPage()}
            formSubmit={this.props.formSubmit}
          />
        )}
      </div>
    );
  }
}
export default withRouter(OrderListDetails);
OrderListDetails.propTypes = {
  question: PropTypes.shape({
    UItemplateCode: PropTypes.string,
    chat: PropTypes.string,
    click2Call: PropTypes.string,
    issueType: PropTypes.string,
    l0: PropTypes.string,
    l1: PropTypes.string,
    l2: PropTypes.string,
    l3: PropTypes.string,
    solution: PropTypes.string,
    tat: PropTypes.string,
    ticketType: PropTypes.string,
    webform: PropTypes.string,
    subIssueType: PropTypes.string
  }),
  questionsList: PropTypes.arrayOf(
    PropTypes.shape({
      UItemplateCode: PropTypes.string,
      chat: PropTypes.string,
      click2Call: PropTypes.string,
      issueType: PropTypes.string,
      l0: PropTypes.string,
      l1: PropTypes.string,
      l2: PropTypes.string,
      l3: PropTypes.string,
      l4: PropTypes.string,
      solution: PropTypes.string,
      tat: PropTypes.string,
      ticketType: PropTypes.string,
      webform: PropTypes.string,
    })
  ),
  slectOrderData: PropTypes.shape({
    EDD: PropTypes.string,
    USSID: PropTypes.string,
    imageURL: PropTypes.string,
    isCncToHd: PropTypes.string,
    isGiveAway: PropTypes.string,
    isReviewed: PropTypes.string,
    price: PropTypes.string,
    productBrand: PropTypes.string,
    productName: PropTypes.string,
    productcode: PropTypes.string,
    sellerorderno: PropTypes.string,
    statusDisplay: PropTypes.string,
    transactionId: PropTypes.string,
    estimateddeliverydate: PropTypes.string,
    pickUpDateCNC: PropTypes.string,
    displayStatusName: PropTypes.string

  }),
  isAnswerHelpFull: PropTypes.bool,
  FAQquestion: PropTypes.bool,
  isQuesryForm: PropTypes.bool,
  isUserLogin: PropTypes.bool,
  orderRelatedQuestion: PropTypes.bool,
  otherQuestion: PropTypes.bool,
  showFeedBack: PropTypes.bool,
  showQuestionList: PropTypes.bool,
  feedBackHelpFull: PropTypes.func,
  getCustomerQueriesFields: PropTypes.func,
  navigateCliqCarePage: PropTypes.func,
  navigatePreviousPage: PropTypes.func,
  updateThanks: PropTypes.func,
  uploadUserFile: PropTypes.func,
  selectedOrder: PropTypes.object,
  formSubmit: PropTypes.func,
  parentIssueType: PropTypes.string,
  questionType: PropTypes.string,
  moreHelps: PropTypes.func,
  sendInvoice: PropTypes.func,
  submitCustomerForms: PropTypes.func,
  displayToast: PropTypes.func,
  customerQueriesField: PropTypes.object,
  userDetails: PropTypes.object,
  uploadedAttachments: PropTypes.object,
  selectQuestion: PropTypes.func,
};
