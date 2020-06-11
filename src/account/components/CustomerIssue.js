import React from "react";
import styles from "./CustomerIssue.css";
import loginIcon from "../components/img/loginIcon.svg";
import Button from "../../general/components/Button.js";
import OtherQuestionsList from "./OtherQuestionsList";
import OrderList from "./OrderList";
import OrderListDetails from "./OrderListDetails";
import AllOrdersList from "./AllOrdersList";
export default class CustomerIssue extends React.Component {
  render() {
    return (
      <div>
        {this.props.orderAllList && (
          <AllOrdersList
            ordersTransactionData={this.props.ordersTransactionData}
            getOrderRelatedQuestions={orderData =>
              this.props.getOrderRelatedQuestions(orderData)
            }
            hideAllOrder={() => this.props.hideAllOrder()}
            getMoreOrder={() => this.props.getMoreOrder()}
          />
        )}

        {!this.props.orderAllList && (
          <div className={styles.base}>
            {this.props.orderList && (
              <div className={styles.whiteCard}>
                {!this.props.isUserLogin ? (
                  <div className={styles.loginBox}>
                    <div className={styles.loginImg}>
                      <img src={loginIcon} alt="Login icon"></img>
                    </div>
                    <div className={styles.loginHeading}>
                      Need help with recent orders
                    </div>
                    <div className={styles.loginButton}>
                      <Button
                        type="primary"
                        backgroundColor="#da1c5c"
                        height={40}
                        label="LOGIN"
                        borderRadius={6}
                        width={205}
                        textStyle={{ color: "#FFF", fontSize: 14 }}
                        onClick={() => this.props.navigateLogin()}
                      />
                    </div>
                  </div>
                ) : (
                  <OrderList
                    ordersTransactionData={this.props.ordersTransactionData}
                    getOrderRelatedQuestions={orderData =>
                      this.props.getOrderRelatedQuestions(orderData)
                    }
                    showAllOrdersList={() => this.props.showAllOrdersList()}
                  />
                )}
              </div>
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
                // name={this.props.name}
                // email={this.props.email}
                // mobile={this.props.mobile}
                getCustomerQueriesFields={(webFormTemplate, isIssueOptions) =>
                  this.props.getCustomerQueriesFields(
                    webFormTemplate,
                    isIssueOptions
                  )
                }
                // selectedQuestion={this.props.selectedQuestion}
                orderRelatedQuestion={this.props.orderRelatedQuestion}
                otherQuestion={this.props.otherQuestion}
                FAQquestion={this.props.FAQquestion}
                // isOrderRelatedQuestion={this.props.isOrderRelatedQuestion}
                parentIssueType={this.props.parentIssueType}
                questionType={this.props.questionType}
                showQuestionList={this.props.showQuestionList}
                sendInvoice={(ussid, sellerOrderNo) => {
                  this.props.sendInvoice(ussid, sellerOrderNo);
                }}
                navigatePreviousPage={() => this.props.navigatePreviousPage()}
              />
            )}
          </div>
        )}
      </div>
    );
  }
}
