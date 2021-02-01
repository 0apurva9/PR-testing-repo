import React from "react";
import styles from "./CustomerIssue.css";
import noLogin from "../components/img/noLogin.svg";
import cliqCare from "../components/img/cliqCare.svg";
import Button from "../../general/components/Button.js";
import OtherQuestionsList from "./OtherQuestionsList";
import OrderList from "./OrderList";
import OrderListDetails from "./OrderListDetails";
import AllOrdersList from "./AllOrdersList";
export default class CustomerIssue extends React.Component {
  componentDidMount() {
    window.scroll(0, 0);
  }

  render() {
    return (
      <div>
        {this.props.orderAllList && (
          <AllOrdersList
            ordersTransactionData={this.props.ordersTransactionData}
            getOrderRelatedQuestions={(orderData, product) =>
              this.props.getOrderRelatedQuestions(orderData, product)
            }
            hideAllOrder={() => this.props.hideAllOrder()}
            getMoreOrder={() => this.props.getMoreOrder()}
          />
        )}

        {!this.props.orderAllList && (
          <div className={styles.base}>
            {this.props.orderList && (
              <React.Fragment>
                <div className={styles.cliqCare}>
                  <div className={styles.cliqCareBox}>
                    <div className={styles.cliqCareHeadingBox}>
                      <div className={styles.cliqCareHeading}>CLiQ Care</div>
                      <div className={styles.cliqCareSubHeading}>
                        Your one stop solution center.We are happy to help you.
                      </div>
                    </div>
                    <div className={styles.cliqCareIcon}>
                      <img src={cliqCare} alt="CLiQ Care" />
                    </div>
                  </div>
                </div>
                <div className={styles.whiteCard}>
                  {!this.props.isUserLogin ? (
                    <div className={styles.loginBox}>
                      <div className={styles.loginImg}>
                        <img src={noLogin} alt="noLogin" />
                      </div>
                      <div className={styles.loginHeading}>
                        Need help with recent orders?
                      </div>
                      <div className={styles.loginSubHeading}>
                        You have to login to TATA CLiQ app in order <br />
                        to view your recent orders.
                      </div>

                      <div className={styles.loginButton}>
                        <div
                          className={styles.loginBtn}
                          onClick={() => this.props.navigateLogin()}
                        >
                          LOGIN NOW
                        </div>
                      </div>
                    </div>
                  ) : (
                    <OrderList
                      ordersTransactionData={this.props.ordersTransactionData}
                      getOrderRelatedQuestions={(orderData, product) =>
                        this.props.getOrderRelatedQuestions(orderData, product)
                      }
                      showAllOrdersList={() => this.props.showAllOrdersList()}
                    />
                  )}
                </div>
              </React.Fragment>
            )}

            {this.props.orderList && (
              <OtherQuestionsList
                customerQueriesOtherIssueData={
                  this.props.customerQueriesOtherIssueData
                }
                selectOtehrQuestion={selectedOtehrQuestion =>
                  this.props.selectOtehrQuestion(selectedOtehrQuestion)
                }
              />
            )}

            {this.props.isOrderDatails && (
              <OrderListDetails
                selectedOrder={this.props.selectedOrder}
                isUserLogin={this.props.isUserLogin}
                moreHelps={() => this.props.moreHelps()}
                questionsList={this.props.questionsList}
                selectQuestion={(listOfIssue, index) =>
                  this.props.selectQuestion(listOfIssue, index)
                }
                showFeedBack={this.props.showFeedBack}
                question={this.props.question}
                isQuesryForm={this.props.isQuesryForm}
                uploadUserFile={(issueType, title, file) =>
                  this.props.uploadUserFile(issueType, title, file)
                }
                feedBackHelpFull={() => this.props.feedBackHelpFull()}
                isAnswerHelpFull={this.props.isAnswerHelpFull}
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
                orderRelatedQuestion={this.props.orderRelatedQuestion}
                otherQuestion={this.props.otherQuestion}
                FAQquestion={this.props.FAQquestion}
                parentIssueType={this.props.parentIssueType}
                questionType={this.props.questionType}
                showQuestionList={this.props.showQuestionList}
                sendInvoice={(ussid, sellerOrderNo) => {
                  this.props.sendInvoice(ussid, sellerOrderNo);
                }}
                navigatePreviousPage={() => this.props.navigatePreviousPage()}
                updateThanks={() => this.props.updateThanks()}
                navigateCliqCarePage={() => this.props.navigateCliqCarePage()}
                slectOrderData={this.props.slectOrderData}
                formSubmit={this.props.formSubmit}
              />
            )}
          </div>
        )}
      </div>
    );
  }
}
